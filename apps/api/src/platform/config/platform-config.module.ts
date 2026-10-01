import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { validateEnvironment } from "./environment.js";

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      expandVariables: false,
      isGlobal: true,
      validate: validateEnvironment,
    }),
  ],
  exports: [ConfigModule],
})
export class PlatformConfigModule {}
