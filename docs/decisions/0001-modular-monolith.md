# 0001 — Begin with a NestJS modular monolith

Status: Accepted

## Context

The initial team needs one backend for web and mobile, while product boundaries will continue to change. Early microservices would add deployment, data consistency, and operational cost before independent scaling or ownership exists.

## Decision

Build one TypeScript NestJS codebase with clear platform and product modules. Run API and worker processes from that codebase. Use REST `/v1` and OpenAPI as the primary client contract, with Socket.IO for focused live updates.

## Consequences

Transactions and local development stay simple. Modules must enforce ownership and dependency rules so later extraction remains possible. Service extraction requires evidence from scaling, release cadence, ownership, or failure isolation.
