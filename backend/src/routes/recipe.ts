import express from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import authMiddleware from '../middleware/middleware';
import multer from 'multer';
import path from 'path';
import sharp from 'sharp';
import fs from 'fs';

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

const router = express.Router();
const prisma = new PrismaClient();
const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });



router.use(authMiddleware);

const recipeSchema = z.object({
    title: z.string().min(1, "Title is required"),
    ingredients: z.array(z.string()).min(1, "At least one ingredient is required"),
    instructions: z.string().min(1, "Instructions are required"),
    prepTime: z.number().positive("Preparation time must be a positive number"),
    cookTime: z.number().positive("Cooking time must be a positive number"),
    servings: z.number().positive("Servings must be a positive number"),
    difficulty: z.enum(["easy", "medium", "hard"]).optional(),
    mealType: z.enum(["breakfast", "lunch", "dinner"]),
});

router.post('/addRecipes', upload.single('image'), async (req, res) => {
    console.log('Uploaded File:', req.file);
    const body = req.body;
    const authorId = req.userId;

    if (!authorId) {
        return res.status(401).json({ message: 'Unauthorized: No author ID found' });
    }

    try {
        let imageUrl = null;

        if (req.file) {
            const imageFileName = `image-${Date.now()}-${Math.round(Math.random() * 1e9)}.webp`;
            const imagePath = path.join(uploadsDir, imageFileName);

            await sharp(req.file.buffer)
                .webp({
                    quality: 100,
                    lossless: true
                })
                .toFile(imagePath);

            imageUrl = `uploads/${imageFileName}`;
        }

        // Save recipe data along with the image URL
        await prisma.recipe.create({
            data: {
                title: body.title,
                ingredients: body.ingredients,
                instructions: body.instructions,
                prepTime: parseInt(body.prepTime, 10),
                cookTime: parseInt(body.cookTime, 10),
                servings: parseInt(body.servings, 10),
                difficulty: body.difficulty,
                mealType: body.mealType,
                authorId: authorId,
                image: imageUrl,
            },
        });

        return res.json({ msg: 'Recipe Uploaded' });
    } catch (e) {
        console.error(e);
        return res.status(500).json({
            msg: 'Error in posting!',
        });
    }
});

router.get('/getRecipes', async (req, res) => {
    const userId = req.userId;
    try {
        const recipes = await prisma.recipe.findMany({
            include: {
                author: {
                    select: { name: true }, // Adjust according to your User model
                },
            },
        });

        res.status(200).json(recipes);
    } catch (error) {
        console.error('Error fetching recipes with publishers:', error);
        res.status(500).json({ message: 'Error fetching recipes with publishers' });
    }
});


router.get('/getRecipe/:input', async (req, res) => {
    const userId = req.userId;
    const input = req.params.input;

    try {
        const recipeId = parseInt(input);

        if (isNaN(recipeId)) {
            return res.status(400).json({ message: 'Invalid recipe ID format' });
        }

        const recipe = await prisma.recipe.findUnique({
            where: {
                id: recipeId, 
            },
            include: {
                author: {
                    select: { name: true }, 
                },
            },
        });

        
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        res.status(200).json(recipe);
    } catch (error) {
        console.error('Error fetching recipe:', error);
        res.status(500).json({ message: 'Error fetching recipe' });
    }
});



router.get('/search/:input',async (req,res)=>{
    const userId = req.userId;
    const input = req.params.input;
    console.log(input);

    try{
        const response = await prisma.recipe.findMany({
            where : {
                title: {
                    contains: input,
                    mode: 'insensitive',
                }
            },
            include: {
                author: {
                    select: { name: true }, // Adjust according to your User model
                },
            },
        })

        res.status(200).json(response);
    }catch(e){
        res.status(400).json({
            "msg": "No Results Found"
        })
    }
});

router.post('/upvote', async (req, res) => {
    const recipeId = parseInt(req.body.id, 10); 
    const userId = req.userId;

    if (!recipeId || !userId) {
        return res.status(400).json({ message: 'Missing recipe ID or user ID' });
    }

    try {
        const existingLike = await prisma.like.findUnique({
            where: {
                userId_postId: {
                    userId,
                    postId: recipeId,
                },
            },
        });

        if (existingLike) {
            return res.status(400).json({ message: 'You have already liked this post.' });
        }

        await prisma.like.create({
            data: {
                user: { connect: { id: userId } },
                post: { connect: { id: recipeId } },
            },
        });

        await prisma.recipe.update({
            where: { id: recipeId },
            data: { upvotes: { increment: 1 } },
        });

        res.status(200).json({ message: 'Post liked successfully.' });
    } catch (error) {
        console.error('Error liking post:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

export default router;
