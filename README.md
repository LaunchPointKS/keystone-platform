# Keystone Platform

Keystone is a planned construction management platform for general contractors, subcontractors, office teams, and field crews. This repository will hold the unified web, mobile, API, worker, shared-contract, and infrastructure projects.

> **Current status:** architecture skeleton only. No application code, dependencies, infrastructure, or deployment targets have been created yet.

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

Start with the [system overview](docs/architecture/system-overview.md), [domain boundaries](docs/architecture/domain-boundaries.md), and [roadmap](docs/product/roadmap.md).

## Before implementation begins

The team should settle naming and branding, Phase 1 acceptance criteria, AWS account and region, environment strategy, Clerk tenant setup, package manager and Node version, API error conventions, and the initial permission matrix. Record durable technical choices as ADRs in `docs/decisions`.

