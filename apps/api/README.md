# API application

Future home of the NestJS modular monolith and its worker entrypoints. The API serves both clients through REST `/v1`, publishes OpenAPI, and uses Socket.IO only for live updates.

## Intended internal shape

```text
src/
  platform/             Shared capabilities; never imports product modules
  modules/              Product bounded contexts
  workers/              Outbox, notification, media, and integration consumers
  bootstrap/            HTTP, realtime, and worker composition roots
```

Each feature should expose controllers or gateways, application services, interfaces, and infrastructure implementations without creating ceremonial empty layers. Prisma, Clerk, S3, Expo Push, and other vendor concerns belong behind interfaces.

## Phase 1A commands

- `pnpm --filter @keystone/api dev` starts the HTTP API on port 3001.
- `pnpm --filter @keystone/api dev:worker` validates the worker composition root. Queue consumers arrive with the first asynchronous feature.
- `pnpm --filter @keystone/api test` verifies the versioned health endpoint.

OpenAPI UI is served at `http://localhost:3001/docs`; its JSON document is at `http://localhost:3001/docs/openapi.json`.
