# Contracts

Future home of transport-level conventions that genuinely belong to both clients and the API, such as pagination envelopes, error shapes, sync commands, and event names.

This package must not contain domain behavior, database models, Prisma types, or vendor SDK types. OpenAPI-generated request and response types belong in `packages/api-client`.

Phase 1A includes only the transport-neutral health response used to prove workspace package resolution. Business contracts will be introduced with their owning feature, and generated HTTP client types will remain in `packages/api-client`.
