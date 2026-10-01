# Files, events, and jobs

## Files

The planned upload flow is:

1. Client requests a presigned upload.
2. API authorizes the organization, project, type, size, and quota.
3. Client uploads directly to private S3.
4. Client confirms the upload with checksum and metadata.
5. API records the file and emits an event.
6. Workers create derivatives and run future malware or content checks.

Downloads use short-lived authorized URLs. Buckets remain private.

## Activity events

Activity is an append-only projection of domain events. Entries include organization, optional project, actor, type, payload, and creation time. Project feeds use cursor pagination and may publish new entries to `project:{id}` Socket.IO rooms.

## Transactional outbox

Business mutations and their outbox messages commit together. A worker claims and publishes messages idempotently. Each consumer records enough state to tolerate redelivery. External downtime must not roll back core project work.
