import { Config, defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";
import { z } from "zod";
dotenv.config({path: ".env.local"});

const envSchema = z.object({
    DB_USER: z.string().min(1, "DB_USER is required"),
    DB_PASSWORD: z.string().min(1, "DB_PASSWORD is required"),
    DB_NAME: z.string().min(1, "DB_NAME is required"),
    DB_HOST: z.string().default("localhost"), 
});

const env = envSchema.parse(process.env);

export default defineConfig({
    dialect: "postgresql",
    schema: "./src/lib/server/schema.ts",
    dbCredentials: {
        host: "localhost",
        user: process.env.DB_USER || "",
        password: process.env.DB_PASSWORD || "",
        database: process.env.DB_NAME || "",
    },
});
    

