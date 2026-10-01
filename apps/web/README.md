# Web application

Future Next.js client for office and administrative workflows. It calls the NestJS `/v1` API and consumes the generated API client. It must not become a second business backend.

Likely first surfaces: organization setup, membership and invitation management, projects, tasks, project teams, files, and activity.

Phase 1A provides a small connection screen that verifies the browser can reach `GET /v1/health`. Start it with `pnpm --filter @keystone/web dev` after starting the API.
