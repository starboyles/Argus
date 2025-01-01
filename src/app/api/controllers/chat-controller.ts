import { Request, Response } from "express";
import { chats } from "../../../lib/server/schema";
import { loadS3IntoPinecone } from "../../../lib/pinecone";
import db from "../../../lib/server/db-connect";
import { getS3Url } from "../../../lib/server/s3";
import { useAuth } from "@clerk/clerk-react";

export const createChat = async (req: Request, res: Response) => {
  const { userId } = useAuth();
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
    await db.insert(chats).values({
      fileKey: file_key,
      pdfName: file_name,
      pdfUrl: getS3Url(file_key),
      userId: "user_id",
    });

    res.status(200).json({
      status: "success",
      data: {
        file_key,
        file_name,
        pages,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      status: "Fail",
      message: (error as Error).message,
    });
  }
};
