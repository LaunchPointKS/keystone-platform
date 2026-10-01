import { Logger } from "nestjs-pino";

import { createWorkerApplication } from "./bootstrap/create-worker-application.js";

async function bootstrap(): Promise<void> {
  const app = await createWorkerApplication();
  const logger = app.get(Logger);

  app.useLogger(logger);
  logger.log(
    "Worker composition root initialized; queue consumers begin in Phase 1C",
  );

  await app.close();
}

void bootstrap();
