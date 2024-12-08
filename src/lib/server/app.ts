import express from "express";
import { createChat } from "../../app/api/controllers/chat-controller";

const app = express();

app.use(express.json());

app.use("/api/v1/chat", createChat);

module.exports = app;
