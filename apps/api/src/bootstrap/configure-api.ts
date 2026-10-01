import type { INestApplication } from "@nestjs/common";
import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import type { Environment } from "../platform/config/environment.js";

export function configureApi(app: INestApplication): void {
  const config = app.get(ConfigService<Environment, true>);
  const allowedOrigins = config
    .get("CORS_ORIGINS", { infer: true })
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  app.setGlobalPrefix("v1");
  app.enableCors({ origin: allowedOrigins });
  app.enableShutdownHooks();
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      transform: true,
      whitelist: true,
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle(config.get("APP_NAME", { infer: true }))
    .setDescription("Unified API for Keystone web and mobile clients")
    .setVersion(config.get("APP_VERSION", { infer: true }))
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup("docs", app, document, {
    jsonDocumentUrl: "docs/openapi.json",
  });
}
