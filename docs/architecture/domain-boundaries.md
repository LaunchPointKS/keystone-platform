# Domain boundaries

## Platform core

| Context | Owns | Key rule |
| --- | --- | --- |
| Identity and access | App users, memberships, roles, permissions, invitations | Authentication is external; authorization is owned here |
| Organizations | Tenant settings, branding, plan stub | Organization is the hard tenant boundary |
| Files | Metadata, storage keys, scan state, retention | File bytes stay in private S3 |
| Activity | Append-only organization and project events | Other domains emit; activity projects a feed |
| Notifications | Devices, preferences, intents, delivery attempts | Delivery is asynchronous |
| Sync | Cursors, change feed, device scope, conflicts | Server remains authoritative |
| Jobs and outbox | Durable events, job dispatch, retry state | Business write and outbox write share a transaction |

## Product modules

| Context | Phase | Owns |
| --- | --- | --- |
| Projects and tasks | 1 | Projects, phases, tasks, assignees, status |
| Teams | 1 | Crews, organization units, project team membership |
| Scheduling | 2 | Calendars, job schedules, resource assignment |
| Safety and compliance | 2+ | Checklists, incidents, certifications, supporting files |
| Estimates | 3 | Bids, versions, line items, project conversion |
| Inventory and purchasing | 3 | Items, stock, locations, purchase orders, receipts |
| Billing integrations | 1 stub / 3 live | Connection config, mappings, synchronization jobs |
| Map CRM | 4 | Accounts, contacts, locations, pipeline |
| Analytics | 4 | Metric definitions, read models, exports |
| AI assistant | 4 | Conversations, tool allowlists, audit trail |

## Collaboration boundary

A general contractor’s organization owns a project. A subcontractor remains a separate organization and receives restricted access through project membership. Inviting a subcontractor never merges tenant data or grants access to the general contractor’s other projects, inventory, payroll, or private administration.

## Integration rule

Prefer meaningful events such as `ProjectTaskCompleted`, `FileAttached`, and `PurchaseOrderReceived` over cross-module writes. Activity and notifications subscribe to events. Direct application-service calls are acceptable when a synchronous answer is part of the use case.

