import { describe, expect, it } from "vitest";

import { validateEnvironment } from "../src/platform/config/environment.js";

describe("environment validation", () => {
  it("applies safe local defaults", () => {
    const environment = validateEnvironment({});

    expect(environment).toMatchObject({
      API_PORT: 3001,
      APP_NAME: "Keystone",
      NODE_ENV: "development",
      S3_FORCE_PATH_STYLE: true,
    });
  });

  it("parses a false environment string as false", () => {
    const environment = validateEnvironment({ S3_FORCE_PATH_STYLE: "false" });

    expect(environment.S3_FORCE_PATH_STYLE).toBe(false);
  });

  it("rejects an invalid API port", () => {
    expect(() => validateEnvironment({ API_PORT: "70000" })).toThrow();
  });
});
