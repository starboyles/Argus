import { Request, Response } from "express";


export const createChat = async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const { file_key, file_name } = body;
        console.log('file_key:', file_key);
        console.log('file_name:', file_name);
    } catch (error) {
        console.error(error);
        res.status(400).json({
            status: "Fail",
            message: (error as Error).message,
        })
    }
};
