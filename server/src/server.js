import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import { errorHandler } from './middlewares/errorHandler.js';
import { userRouter } from './routes/userRoute.js';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000'
  })
);

app.use('/api/users', userRouter);

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
