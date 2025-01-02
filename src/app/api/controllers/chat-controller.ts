import { Request, Response } from "express";
import { chats } from "../../../lib/server/schema";
import { loadS3IntoPinecone } from "../../../lib/pinecone";
import db from "../../../lib/server/db-connect";
import { getS3Url } from "../../../lib/server/s3";
import { requireAuth } from "@clerk/express";

interface AuthenticatedRequest extends Request {
  auth: {
    userId: string;
  };
}

export const createChatController = [
  requireAuth(),
  async (req: AuthenticatedRequest, res: Response) => {
    const { userId } = req.auth;
    if (!userId) {
      res.status(401).json({
        status: "Fail",
        message: "Unauthorized",
      });
      return;
    }
    try {
      const { file_key, file_name } = req.body;
      console.log("file_key:", file_key);
      console.log("file_name:", file_name);
      const pages = await loadS3IntoPinecone(file_key);
      const chat_id = await db
        .insert(chats)
        .values({
          fileKey: file_key,
          pdfName: file_name,
          pdfUrl: getS3Url(file_key),
          userId: req.auth.userId,
        })
        .returning({
          insertedId: chats.id,
        });
      res.status(200).json({
        status: "success",
        data: {
          chat_id: chat_id[0].insertedId,
          // file_key,
          // file_name,
          // pages,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({
        status: "Fail",
        message: (error as Error).message,
      });
    }
  },
];
