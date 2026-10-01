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
| Projects and field execution | 1 | Projects, phases, tasks, checklists, assignees, status, time entries, client updates |
| Teams | 1 | Crews, organization units, project team membership |
| Sales / CRM | 4 | Accounts, opportunities, sales activity, geographic pipeline views |
| Engineering and design | Later planning | Site surveys, system designs, drawing sets, plan and BIM references |
| Estimates | 3 | Bids, versions, labor and material line items, alternates, project conversion |
| Customer portal | Cross-domain experience | Proposal review, signatures, selections, status, and approved shared project data |
| Procurement | 3 | Vendors, purchase orders, vendor orders, receiving, audit history |
| Inventory | 3 | Items, stock, locations, kits, staging, allocations, serials, warranties |
| Scheduling | 2 | Calendars, resource plans, technician assignments, field notifications |
| Safety and compliance | 2+ | Checklists, incidents, certifications, supporting files |
| Closeout | Later planning | As-builts, O&M manuals, warranty packages, handover state |
| Billing | 3 | Progress billing, final invoices, payment state, commission calculations |
| Accounting integrations | 1 stub / 3 live | Connection config, external mappings, synchronization jobs |
| Analytics | 4 | Metric definitions, read models, exports |
| AI assistant | 4 | Conversations, tool allowlists, audit trail |

The [project lifecycle](../product/project-lifecycle.md) is the approved user-flow map. Lifecycle stages and backend modules are intentionally not one-to-one: client experiences coordinate domain services while ownership of rules and data remains explicit.

## Collaboration boundary

A general contractor’s organization owns a project. A subcontractor remains a separate organization and receives restricted access through project membership. Inviting a subcontractor never merges tenant data or grants access to the general contractor’s other projects, inventory, payroll, or private administration.

## Integration rule

Prefer meaningful events such as `ProjectTaskCompleted`, `FileAttached`, and `PurchaseOrderReceived` over cross-module writes. Activity and notifications subscribe to events. Direct application-service calls are acceptable when a synchronous answer is part of the use case.

