"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const middleware_1 = __importDefault(require("../middleware/middleware"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = __importDefault(require("fs"));
const uploadsDir = path_1.default.join(__dirname, 'uploads');
if (!fs_1.default.existsSync(uploadsDir)) {
    fs_1.default.mkdirSync(uploadsDir, { recursive: true });
}
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: storage });
router.use(middleware_1.default);
const recipeSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, "Title is required"),
    ingredients: zod_1.z.array(zod_1.z.string()).min(1, "At least one ingredient is required"),
    instructions: zod_1.z.string().min(1, "Instructions are required"),
    prepTime: zod_1.z.number().positive("Preparation time must be a positive number"),
    cookTime: zod_1.z.number().positive("Cooking time must be a positive number"),
    servings: zod_1.z.number().positive("Servings must be a positive number"),
    difficulty: zod_1.z.enum(["easy", "medium", "hard"]).optional(),
    mealType: zod_1.z.enum(["breakfast", "lunch", "dinner"]),
});
router.post('/addRecipes', upload.single('image'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
            const imagePath = path_1.default.join(uploadsDir, imageFileName);
            yield (0, sharp_1.default)(req.file.buffer)
                .webp({
                quality: 100,
                lossless: true
            })
                .toFile(imagePath);
            imageUrl = `uploads/${imageFileName}`;
        }
        // Save recipe data along with the image URL
        yield prisma.recipe.create({
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
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({
            msg: 'Error in posting!',
        });
    }
}));
router.get('/getRecipes', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    try {
        const recipes = yield prisma.recipe.findMany({
            include: {
                author: {
                    select: { name: true }, // Adjust according to your User model
                },
            },
        });
        res.status(200).json(recipes);
    }
    catch (error) {
        console.error('Error fetching recipes with publishers:', error);
        res.status(500).json({ message: 'Error fetching recipes with publishers' });
    }
}));
router.get('/getRecipe/:input', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const input = req.params.input;
    try {
        const recipeId = parseInt(input);
        if (isNaN(recipeId)) {
            return res.status(400).json({ message: 'Invalid recipe ID format' });
        }
        const recipe = yield prisma.recipe.findUnique({
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
    }
    catch (error) {
        console.error('Error fetching recipe:', error);
        res.status(500).json({ message: 'Error fetching recipe' });
    }
}));
router.get('/search/:input', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const input = req.params.input;
    console.log(input);
    try {
        const response = yield prisma.recipe.findMany({
            where: {
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
        });
        res.status(200).json(response);
    }
    catch (e) {
        res.status(400).json({
            "msg": "No Results Found"
        });
    }
}));
router.post('/upvote', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const recipeId = parseInt(req.body.id, 10);
    const userId = req.userId;
    if (!recipeId || !userId) {
        return res.status(400).json({ message: 'Missing recipe ID or user ID' });
    }
    try {
        const existingLike = yield prisma.like.findUnique({
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
        yield prisma.like.create({
            data: {
                user: { connect: { id: userId } },
                post: { connect: { id: recipeId } },
            },
        });
        yield prisma.recipe.update({
            where: { id: recipeId },
            data: { upvotes: { increment: 1 } },
        });
        res.status(200).json({ message: 'Post liked successfully.' });
    }
    catch (error) {
        console.error('Error liking post:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
}));
exports.default = router;
