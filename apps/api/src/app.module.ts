import { Module } from "@nestjs/common";

import { HealthModule } from "./platform/health/health.module.js";
import { PlatformConfigModule } from "./platform/config/platform-config.module.js";
import { PlatformLoggingModule } from "./platform/logging/platform-logging.module.js";

@Module({
  imports: [PlatformConfigModule, PlatformLoggingModule, HealthModule],
})
export class AppModule {}
