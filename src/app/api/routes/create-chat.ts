//api/create-chat
import express from "express";
import { createChat as createChatController } from "../controllers/chat-controller";

const createChat = express.Router();

createChat.route("/").post(createChatController);
