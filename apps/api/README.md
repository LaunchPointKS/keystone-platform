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

