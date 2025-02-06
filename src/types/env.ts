/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-namespace */
import z from "zod";

const envSchema = z.object({
  API_URL: z.string().min(1),
});

const envParse = envSchema.safeParse({
  API_URL: process.env.API_URL,
});

if (!envParse.success) {
  throw new Error("Error ENV Validation");
  process.exit(1);
}

type TENV = z.infer<typeof envSchema>;

declare global {
  namespace NodeJS {
    interface ProcessEnv extends TENV {}
  }
}
