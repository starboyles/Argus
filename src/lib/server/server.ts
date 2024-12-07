import express from 'express';
import dotenv from 'dotenv';
import db from '../server/db-connect.ts';

const app = express();
dotenv.config();


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port 8000}`);
});
