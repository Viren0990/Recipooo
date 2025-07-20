import express from 'express'
import userRouter from './user'
import recipeRouter from './recipe';
import path from 'path';

const router = express.Router();


router.use('/uploads', express.static(path.join(__dirname, 'routes', 'uploads')));
router.use('/user',userRouter);
router.use('/recipe',recipeRouter);

export default router;
