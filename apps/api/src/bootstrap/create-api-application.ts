import { NestFactory } from "@nestjs/core";
import type { INestApplication } from "@nestjs/common";

import { AppModule } from "../app.module.js";
import { configureApi } from "./configure-api.js";

export async function createApiApplication(): Promise<INestApplication> {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  configureApi(app);
  return app;
}
