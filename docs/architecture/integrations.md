# Integrations

Accounting is an external system of record, not a subsystem Keystone will recreate.

The billing module will define an application-owned interface for connect, disconnect, customer/vendor synchronization, invoice creation, payment status, and a limited chart of accounts. QuickBooks and NetSuite implementations keep vendor OAuth, schemas, limits, and webhook behavior at the edge.

Phase 1 reserves the interface, a fake implementation, connection concepts, and ID-mapping design. Live accounting begins in Phase 3 after projects, line items, outbox behavior, and error operations are stable.

Mappings will identify the organization, external system, local type and ID, external ID, last synchronization time, and content hash. Retries, dead-letter handling, and administrator-visible failures belong to the worker pipeline.

The future AI gateway follows the same rule: model tools call authorized application services using the requesting `Principal`; the model never queries persistence or bypasses authorization directly.
