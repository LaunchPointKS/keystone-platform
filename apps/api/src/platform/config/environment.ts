import { z } from "zod";

const environmentBoolean = z.preprocess((value) => {
  if (typeof value === "string") {
    if (value.toLowerCase() === "true") return true;
    if (value.toLowerCase() === "false") return false;
  }

  return value;
}, z.boolean());

export const environmentSchema = z.object({
  API_PORT: z.coerce.number().int().min(1).max(65_535).default(3001),
  APP_NAME: z.string().trim().min(1).default("Keystone"),
  APP_VERSION: z.string().trim().min(1).default("0.1.0"),
  CORS_ORIGINS: z.string().default("http://localhost:3000"),
  DATABASE_URL: z
    .string()
    .url()
    .default(
      "postgresql://keystone:keystone_local@localhost:5432/keystone?schema=public",
    ),
  LOG_LEVEL: z
    .enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"])
    .default("info"),
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  REDIS_URL: z.string().url().default("redis://localhost:6379"),
  S3_ACCESS_KEY_ID: z.string().min(1).default("keystone"),
  S3_BUCKET: z.string().min(1).default("keystone-local"),
  S3_ENDPOINT: z.string().url().default("http://localhost:9000"),
  S3_FORCE_PATH_STYLE: environmentBoolean.default(true),
  S3_REGION: z.string().min(1).default("us-east-1"),
  S3_SECRET_ACCESS_KEY: z.string().min(1).default("keystone_local_storage"),
});

export type Environment = z.infer<typeof environmentSchema>;

export function validateEnvironment(
  values: Record<string, unknown>,
): Environment {
  return environmentSchema.parse(values);
}
