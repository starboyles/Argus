import { Pinecone, RecordMetadata } from "@pinecone-database/pinecone";
import { downloadFromS3 } from "./server/s3-server";
import { convertToAscii } from "./utils";
import { getEmbeddings } from "../lib/embeddings";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import md5 from "md5";
import {
  Document,
  RecursiveCharacterTextSplitter,
} from "@pinecone-database/doc-splitter";
let pinecone: Pinecone | null = null;

export const getPineconeClient = () => {
  if (!pinecone) {
    pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY!,
    });
  }
  return pinecone;
};

interface PineconeVector {
  id: string;
  values: number[];
  metadata?: {
    text?: string;
    pageNumber?: number;
    [key: string]: any;
  };
}

type PDFPage = {
  pageContent: string;
  metadata: {
    loc: { pageNumber: number };
  };
};

export async function loadS3IntoPinecone(fileKey: string) {
  //1. Obtain the .pdf download and read from it

  //   console.log("Downloading file from S3 into file system");
  const file_name = await downloadFromS3(fileKey);
  if (!file_name) {
    throw new Error("Could not download file from S3");
  }
  const loader = new PDFLoader(file_name);
  const pages = (await loader.load()) as unknown as PDFPage[];

  //2. Split and segment the pdf
  const documents = await Promise.all(pages.map(prepareDocument));
  //3. vectorize and embed individual documents
  const vectors = await Promise.all(documents.flat().map(embedDocument));

  //upload to pinecone
  const client = getPineconeClient();
  const namespace = convertToAscii(fileKey);
  const pineconeIndex = client.Index("argus").namespace(namespace);

  console.log(`Uploading vectors vectors to Pinecone`);

  try {
    await pineconeIndex.upsert(vectors);
    console.log(`Successfully uploaded vectors to Pinecone`);
    return documents[0];
  } catch (error) {
    console.log("Error uploading to Pinecone", error);
    throw error;
  }
}

async function embedDocument(doc: Document) {
  try {
    const embeddings = await getEmbeddings(doc.pageContent);
    const hash = md5(doc.pageContent);

    return {
      id: hash,
      values: embeddings,
      metadata: {
        text: doc.metadata.text,
        pageNumber: doc.metadata.pageNumber,
      },
    } as PineconeVector;
  } catch (error) {
    console.log("error embedding document", error);
    throw error;
  }
}

export const truncateStringByBytes = (str: string, bytes: number) => {
  const enc = new TextEncoder();
  return new TextDecoder("utf-8").decode(enc.encode(str).slice(0, bytes));
};

export async function prepareDocument(page: PDFPage) {
  let { pageContent, metadata } = page;
  pageContent = pageContent.replace(/\n/g, "");
  // split the docs
  const splitter = new RecursiveCharacterTextSplitter();
  const docs = await splitter.splitDocuments([
    new Document({
      pageContent,
      metadata: {
        pageNumber: metadata.loc.pageNumber,
        text: truncateStringByBytes(pageContent, 36000),
      },
    }),
  ]);

  return docs;
}
