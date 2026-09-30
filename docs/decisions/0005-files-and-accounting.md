# 0005 — Keep files and accounting integrations at the edge

Status: Accepted

## Context

Large files should not traverse the API, and vendor accounting availability should not block field work. QuickBooks and NetSuite have distinct schemas and OAuth behavior.

## Decision

Store file bytes in private S3 using authorized presigned transfers. Put accounting behind an application-owned interface and workers, with only a fake implementation and mapping design in Phase 1.

## Consequences

The API owns file metadata, authorization, confirmation, and audit events while S3 carries bytes. Accounting failures are retried and shown to administrators without rolling back project operations. Live ERP work waits until Phase 3.

