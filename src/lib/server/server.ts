import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from '../server/db-connect.ts';
import { createChat } from "../../app/api/controllers/chat-controller";

const app = express();
dotenv.config();
dotenv.config({path: ".env.local"});

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.post("/api/v1/create-chat", createChat);

// Start server
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;