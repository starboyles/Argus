import { Request, Response } from "express";


export const createChat = async (req: Request, res: Response) => {
    try {
        // console.log('Full Request body:', req.body);
        const { file_key, file_name } = req.body;
        console.log('file_key:', file_key);
        console.log('file_name:', file_name);
        
        res.status(200).json({
            status: 'success',
            data: {file_key, file_name}
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            status: "Fail",
            message: (error as Error).message,
        })
    }
};
