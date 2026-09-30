# Workers

Workers will run BullMQ jobs for outbox publication, push delivery, file processing, scheduled digests, offline reconciliation, and later accounting integrations. Jobs must be idempotent, observable, retryable, and safe to send to a dead-letter path.

