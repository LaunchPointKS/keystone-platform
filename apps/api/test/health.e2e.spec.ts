import type { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import request from "supertest";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import type { HealthResponse } from "@keystone/contracts";

import { AppModule } from "../src/app.module.js";
import { configureApi } from "../src/bootstrap/configure-api.js";

describe("GET /v1/health", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = testingModule.createNestApplication();
    app.useLogger(false);
    configureApi(app);
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it("returns the versioned service health contract", async () => {
    const response = await request(app.getHttpServer())
      .get("/v1/health")
      .expect(200);
    const body = response.body as HealthResponse;

    expect(body).toMatchObject({
      name: "Keystone",
      status: "ok",
      version: "0.1.0",
    });
    expect(body.uptimeSeconds).toBeGreaterThanOrEqual(0);
    expect(Number.isNaN(Date.parse(body.timestamp))).toBe(false);
    expect(response.headers["x-request-id"]).toBeTypeOf("string");
  });
});
