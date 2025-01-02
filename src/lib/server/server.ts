import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { clerkMiddleware } from '@clerk/express'
import { createChat } from '../../app/api/routes/create-chat';

const app = express();
dotenv.config();
dotenv.config({path: ".env.local"});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(clerkMiddleware());

// Routes
app.use(createChat);

// Start server
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;