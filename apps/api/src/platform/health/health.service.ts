import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import type { HealthResponse } from "@keystone/contracts";

import type { Environment } from "../config/environment.js";

@Injectable()
export class HealthService {
  public constructor(
    @Inject(ConfigService)
    private readonly config: ConfigService<Environment, true>,
  ) {}

  public getHealth(): HealthResponse {
    return {
      name: this.config.get("APP_NAME", { infer: true }),
      status: "ok",
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.floor(process.uptime()),
      version: this.config.get("APP_VERSION", { infer: true }),
    };
  }
}
