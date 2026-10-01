export interface HealthResponse {
  readonly name: string;
  readonly status: "ok";
  readonly timestamp: string;
  readonly uptimeSeconds: number;
  readonly version: string;
}
