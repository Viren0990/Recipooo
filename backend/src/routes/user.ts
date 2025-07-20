import express from 'express'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
import zod from 'zod'
import bcrypt from 'bcrypt';

const router = express();
const prisma = new PrismaClient();
const saltRounds = 10;



const signupSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(6), 
    name: zod.string().min(3) 
});

router.post("/signup",async (req,res)=>{
    const body = req.body;
    const { success, error } = signupSchema.safeParse(body);
    if (!success) {
        return res.status(400).json({
            message: "Incorrect inputs: " + error.errors.map(e => e.message).join(", ")
        });
    }
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        await prisma.user.create({
            data: {
                email: body.email,
                name: body.name,
                password: hashedPassword
            }
        })
    
        return res.json({
            "msg": "Account Created"
        })
    }catch(e){
        return res.json({
            Error: "error in signing up"
          })
    }
})

const signinSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(6)
});


router.post("/signin", async (req, res) => {
    const body = req.body;
    console.log(body);

    const { success, error } = signinSchema.safeParse(body);
    if (!success) {
        return res.status(400).json({
            message: "Incorrect inputs: " + error.errors.map(e => e.message).join(", ")
        });
    }

    try {
        const user: any = await prisma.user.findUnique({
            where: {
                email: body.email
            }
        });

        if (!user) {
            return res.status(411).json({
                "msg": "No user found"
            });
        }

        const pass = user?.password || "";
        const match = await bcrypt.compare(body.password, pass);

        if (match) {
            const token = jwt.sign({
                id: user.id
            }, process.env.JWT_SECRET as string);// Set token expiration time

            
            return res.json({
                token: token
              });
        } else {
            return res.status(411).json({
                "msg": "Wrong Password"
            });
        }
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: 'Error in logging in' });
    }
});


export default router;
