import { randomUUID } from "node:crypto";

import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { LoggerModule } from "nestjs-pino";

import type { Environment } from "../config/environment.js";
import { PlatformConfigModule } from "../config/platform-config.module.js";

@Module({
  imports: [
    LoggerModule.forRootAsync({
      imports: [PlatformConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService<Environment, true>) => {
        const isDevelopment =
          config.get("NODE_ENV", { infer: true }) === "development";

        return {
          pinoHttp: {
            customProps: () => ({ service: "api" }),
            enabled: config.get("NODE_ENV", { infer: true }) !== "test",
            genReqId: (request, response) => {
              const incomingId = request.headers["x-request-id"];
              const requestId =
                typeof incomingId === "string" && incomingId.length > 0
                  ? incomingId
                  : randomUUID();

              response.setHeader("x-request-id", requestId);
              return requestId;
            },
            level: config.get("LOG_LEVEL", { infer: true }),
            transport: isDevelopment
              ? {
                  target: "pino-pretty",
                  options: {
                    colorize: true,
                    singleLine: true,
                    translateTime: "SYS:standard",
                  },
                }
              : undefined,
          },
        };
      },
    }),
  ],
  exports: [LoggerModule],
})
export class PlatformLoggingModule {}
