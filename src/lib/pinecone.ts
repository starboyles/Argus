import { Pinecone } from '@pinecone-database/pinecone';

let pinecone: Pinecone | null = null;

const pc = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!,
});