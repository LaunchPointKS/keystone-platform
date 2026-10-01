# 0006 — Use a pnpm and Turborepo TypeScript workspace

Status: Accepted

## Context

The platform needs coordinated NestJS, Next.js, Expo, shared contract, and Prisma projects. The initial team benefits from one install, one lockfile, consistent checks, and independent deployable applications.

## Decision

Use pnpm workspaces and Turborepo with a pinned Node 24 and pnpm 11 toolchain. Use strict TypeScript throughout. Run PostgreSQL 16, Redis 7.4, and MinIO through Docker Compose for local development. Keep the API and worker as separate composition roots in one NestJS codebase. Use GitHub Actions to enforce formatting, linting, type checking, Prisma validation, tests, and builds.

Phase 1A uses development defaults and no hosted credentials. Authentication, domain migrations, queue consumers, and generated OpenAPI clients enter with the feature slices that need them.

## Consequences

The repository has one dependency graph and lockfile. Applications remain independently runnable while sharing contracts and configuration. Docker Desktop is required to run local infrastructure, but repository checks remain runnable without containers. Product naming remains a working title and may be changed before release.
