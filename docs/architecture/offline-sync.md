# Offline sync

Mobile uses a server-authoritative model with optimistic local writes.

## Pull

`GET /sync/changes?since={cursor}` will return ordered mutations filtered to the active organization, user, and project memberships. Syncable aggregates carry `id`, `org_id`, `version`, `updated_at`, and `deleted_at` from their first migration.

## Push

`POST /sync/push` will accept commands with client-generated UUIDs, a base version, and the intended patch or domain command. UUIDs make retries idempotent. The server validates current authorization when queued work arrives.

## Initial conflict policies

| Data                        | Phase 1 policy                                                                                     |
| --------------------------- | -------------------------------------------------------------------------------------------------- |
| Task status and notes       | Last write wins by server version; losing client receives the current record and a conflict notice |
| Photos and file attachments | Append-only when authorization remains valid                                                       |
| Inventory quantities        | Explicit server decision or merge when inventory ships; never generic last write wins              |
| Safety sign-offs            | Explicit server decision when safety ships; never generic last write wins                          |

The client clearly exposes offline, pending, failed, conflicted, and synchronized states. A full CRDT model is outside the current scope.
