# Keystone Platform

Keystone is a planned construction management platform for general contractors, subcontractors, office teams, and field crews. This repository will hold the unified web, mobile, API, worker, shared-contract, and infrastructure projects.

> **Current status:** Phase 1A technical foundation. The monorepo, local dependencies, health path, and CI are scaffolded; product domains begin in Phase 1B.

## Product shape

- **Web:** Next.js for office and administrative workflows.
- **Mobile:** Expo / React Native for iOS, Android, and iPad, with offline SQLite storage.
- **Backend:** NestJS modular monolith exposing REST `/v1`, OpenAPI, and focused Socket.IO updates.
- **Data:** PostgreSQL with Prisma, Redis with BullMQ, and private S3 object storage.
- **Identity:** Clerk for authentication behind an application-owned interface; authorization remains in Keystone.
- **Cloud:** AWS in one region for the first release.

## Repository map

```text
apps/
  api/                  NestJS API and background-worker entrypoints
  web/                  Next.js office and admin client
  mobile/               Expo field client
packages/
  api-client/           Generated client for the versioned OpenAPI contract
  contracts/            Shared transport conventions and generated types
  config/               Shared, non-secret project configuration
  database/             Prisma schema, migrations, and generated client
infrastructure/
  aws/                  Future AWS infrastructure definitions
  local/                Future local development services
docs/
  architecture/         System boundaries and data-flow documentation
  decisions/            Architecture decision records
  product/              Scope, roadmap, and product terminology
```

## Architecture rules

1. The API begins as one modular monolith. A domain is extracted only after a measured scaling, release-cadence, ownership, or blast-radius need appears.
2. Platform code may be used by product modules. Platform code must never import product modules.
3. A feature owns its data and behavior. Other features use its public application services or consume its domain events.
4. Controllers and gateways call application services. Vendor SDKs and persistence stay behind interfaces and implementations.
5. Every tenant-owned record carries `org_id`; project-scoped records also carry `project_id`.
6. Web and mobile use the Nest API as the system boundary. Next.js route handlers are not a second business backend.
7. Cross-cutting side effects use a transactional outbox and workers rather than slowing or weakening core writes.

Start with the [rebuild guardrails](docs/product/rebuild-guardrails.md), [project lifecycle](docs/product/project-lifecycle.md), [system overview](docs/architecture/system-overview.md), [domain boundaries](docs/architecture/domain-boundaries.md), and [delivery roadmap](docs/product/roadmap.md).

## Local development

Phase 1A requires Node.js 24.19+, pnpm 11.19+, and Docker Desktop for the local PostgreSQL, Redis, and MinIO services.

```bash
pnpm install
pnpm infra:up
pnpm db:validate
pnpm dev:api
```

Run `pnpm dev:web` or `pnpm dev:mobile` in another terminal. The API serves health at `http://localhost:3001/v1/health` and OpenAPI at `http://localhost:3001/docs`.

See the complete [development setup](docs/development/setup.md), including environment configuration and verification commands.

## Before implementation begins

The working title remains replaceable through configuration. Before Phase 1B, the team should settle naming and branding, identity terminology, the initial permission matrix, and organization invitation behavior. Record durable technical choices as ADRs in `docs/decisions`.
