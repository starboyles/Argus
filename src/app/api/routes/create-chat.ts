//api/create-chat
import { Router } from 'express';
import { createChatController } from "../controllers/chat-controller";
import { RequestHandler} from 'express'

const createChat = Router();

createChat.post("/api/v1/create-chat", ...createChatController as unknown as RequestHandler[]);

export { createChat };
