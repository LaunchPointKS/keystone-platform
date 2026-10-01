# Development setup

## Prerequisites

- Node.js 24.19 or a compatible Node 24 release
- pnpm 11.19
- Docker Desktop with Docker Compose
- Git

The root `.nvmrc`, `packageManager`, and `engines` fields define the supported toolchain. The working product name is configuration rather than a domain identifier so it can change later.

## First setup

1. Copy `.env.example` to `.env` and keep `.env` untracked.
2. Install dependencies with `pnpm install`.
3. Start PostgreSQL, Redis, and MinIO with `pnpm infra:up`.
4. Validate Prisma configuration with `pnpm db:validate`.
5. Start the API with `pnpm dev:api`.
6. Start the web client with `pnpm dev:web` in a second terminal.
7. Start Expo with `pnpm dev:mobile` when mobile development is needed.

The API defaults to port 3001 and exposes:

- Health: `http://localhost:3001/v1/health`
- OpenAPI UI: `http://localhost:3001/docs`
- OpenAPI JSON: `http://localhost:3001/docs/openapi.json`

The web client defaults to `http://localhost:3000`.

## Mobile API address

An iOS simulator on macOS can generally use `localhost`. Android emulators commonly use `10.0.2.2` for the host computer. A physical device must use the computer’s LAN address and be on the same network, for example:

```text
EXPO_PUBLIC_API_URL=http://192.168.1.20:3001/v1
```

Keep machine-specific addresses in the untracked `.env` file.

## Verification

Run the complete repository gate before opening a pull request:

```bash
pnpm check
pnpm db:validate
```

The checks do not require running infrastructure. Tests that require PostgreSQL, Redis, or S3 will be introduced alongside the features that use them.

## Local data

Compose stores state in named volumes. `pnpm infra:down` preserves it. Removing volumes is intentionally not exposed as a package script because it deletes local data; run that operation only when a deliberate clean reset is required.
