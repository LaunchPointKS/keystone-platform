import { Controller, Get, Inject } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";

import type { HealthResponse } from "@keystone/contracts";

import { HealthService } from "./health.service.js";

@ApiTags("system")
@Controller("health")
export class HealthController {
  public constructor(
    @Inject(HealthService) private readonly healthService: HealthService,
  ) {}

  @Get()
  @ApiOperation({ summary: "Report API process health" })
  @ApiOkResponse({
    schema: {
      example: {
        name: "Keystone",
        status: "ok",
        timestamp: "2026-10-01T12:00:00.000Z",
        uptimeSeconds: 42,
        version: "0.1.0",
      },
    },
  })
  public getHealth(): HealthResponse {
    return this.healthService.getHealth();
  }
}
