# Local environment

The root `compose.yaml` defines the local dependencies:

| Service       | Default address  | Purpose                       |
| ------------- | ---------------- | ----------------------------- |
| PostgreSQL 16 | `localhost:5432` | System of record              |
| Redis 7.4     | `localhost:6379` | Cache and BullMQ coordination |
| MinIO         | `localhost:9000` | S3-compatible object storage  |
| MinIO console | `localhost:9001` | Local storage administration  |

Copy `.env.example` to `.env`, then run `pnpm infra:up`. The one-shot `minio-init` service creates the configured local bucket. Run `pnpm infra:down` to stop services without deleting their named volumes.

Docker Desktop is a development prerequisite for this environment. Application formatting, linting, type checking, unit tests, and compilation do not require the containers to be running.
