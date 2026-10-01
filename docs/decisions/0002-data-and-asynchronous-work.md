# 0002 — Use PostgreSQL, Prisma, Redis, BullMQ, and a transactional outbox

Status: Accepted

## Context

Tenancy, permissions, scheduling, money, and inventory require relational integrity. Notifications, media work, and later ERP synchronization should not weaken or delay core writes.

## Decision

Use PostgreSQL 16 as the system of record, Prisma as the single ORM, raw SQL only where justified, Redis for cache and job coordination, BullMQ for workers, and a PostgreSQL transactional outbox for reliable side effects.

## Consequences

Schema ownership and migration review become important. Jobs and consumers must be idempotent. Redis is not a source of record. Kafka and multiple ORMs remain outside the initial architecture.
