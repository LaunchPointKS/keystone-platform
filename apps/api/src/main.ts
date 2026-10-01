import { Logger } from "nestjs-pino";
import { ConfigService } from "@nestjs/config";

import { createApiApplication } from "./bootstrap/create-api-application.js";
import type { Environment } from "./platform/config/environment.js";

async function bootstrap(): Promise<void> {
  const app = await createApiApplication();
  const logger = app.get(Logger);
  const config = app.get(ConfigService<Environment, true>);
  const port = config.get("API_PORT", { infer: true });

  app.useLogger(logger);
  await app.listen(port);

  logger.log(`API listening on http://localhost:${String(port)}/v1`);
  logger.log(`OpenAPI available at http://localhost:${String(port)}/docs`);
}

void bootstrap();
