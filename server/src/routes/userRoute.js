import { Router } from 'express';
import { getMe, login, register } from '../controllers/userController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

export const userRouter = Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get('/me', authMiddleware, getMe);
