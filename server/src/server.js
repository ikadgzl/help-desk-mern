import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import { errorHandler } from './middlewares/errorHandler.js';
import { userRouter } from './routes/userRoute.js';

const app = express();

app.use(express.json());

app.use('/api/user', userRouter);

app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    app.listen(process.env.PORT, () => {
      console.log('Server is up and running.');
    });
  } catch (error) {
    console.log(error);
  }
};

start();
