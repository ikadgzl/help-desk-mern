import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';

const app = express();

mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(process.env.PORT, () => {
    console.log('Server is up and running.');
  });
});
