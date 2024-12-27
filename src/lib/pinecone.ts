import { Pinecone } from '@pinecone-database/pinecone';
import { downloadFromS3 } from './server/s3-server';

let pinecone: Pinecone | null = null;

export const getPineconeClient = () => {
    if (!pinecone) {
        pinecone = new Pinecone({
            apiKey: process.env.PINECONE_API_KEY!
        });
    }
    return pinecone;
};

export async function loadS3IntoPinecone(fileKey: string) {
    //1. Obtain the pdf. download and read from it
    console.log("Downloading file from S3 into file system")
    const file_name = await downloadFromS3(fileKey);


} 