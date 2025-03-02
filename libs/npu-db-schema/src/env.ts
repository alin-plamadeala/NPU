import {z} from 'zod';
import * as process from "node:process";

const envSchema = z.object({
  DB_NAME: z.string().min(1),
  DB_HOST: z.string().min(1),
  DB_PORT: z.coerce.number().min(1),
  DB_USER: z.string().min(1),
  DB_USER_PASSWORD: z.string().min(1),
});

const env = envSchema.parse(process.env);

export const dbCredentials = {
  host: env.DB_HOST,
  port: env.DB_PORT,
  user: env.DB_USER,
  password: env.DB_USER_PASSWORD,
  database: env.DB_NAME,
  ssl: false
};
