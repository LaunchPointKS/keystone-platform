import type { INestApplicationContext } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

import { WorkerModule } from "../workers/worker.module.js";

export async function createWorkerApplication(): Promise<INestApplicationContext> {
  return NestFactory.createApplicationContext(WorkerModule, {
    bufferLogs: true,
  });
}
