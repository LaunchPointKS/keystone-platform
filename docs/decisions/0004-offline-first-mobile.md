# 0004 — Include real offline mobile sync in Phase 1

Status: Accepted

## Context

Field users routinely work with poor connectivity. Adding offline behavior later would force identity, IDs, deletions, versioning, and mutation semantics to be redesigned.

## Decision

Expo mobile will keep a SQLite projection, queue commands with client UUIDs, pull ordered changes by opaque cursor, and submit base versions. The server remains authoritative and returns explicit conflict information.

## Consequences

Syncable tables need version and soft-delete fields from their first migration. Each domain defines conflict behavior. The UI must expose sync state. Full peer-to-peer or CRDT synchronization remains out of scope.

