# Domain boundaries

## Platform core

| Context             | Owns                                                    | Key rule                                                |
| ------------------- | ------------------------------------------------------- | ------------------------------------------------------- |
| Identity and access | App users, memberships, roles, permissions, invitations | Authentication is external; authorization is owned here |
| Organizations       | Tenant settings, branding, plan stub                    | Organization is the hard tenant boundary                |
| Files               | Metadata, storage keys, scan state, retention           | File bytes stay in private S3                           |
| Activity            | Append-only organization and project events             | Other domains emit; activity projects a feed            |
| Notifications       | Devices, preferences, intents, delivery attempts        | Delivery is asynchronous                                |
| Sync                | Cursors, change feed, device scope, conflicts           | Server remains authoritative                            |
| Jobs and outbox     | Durable events, job dispatch, retry state               | Business write and outbox write share a transaction     |

## Product modules

| Context                      | Phase                   | Owns                                                                                         |
| ---------------------------- | ----------------------- | -------------------------------------------------------------------------------------------- |
| Projects and field execution | 1                       | Projects, phases, tasks, checklists, assignees, status, time entries, client updates         |
| Teams                        | 1                       | Crews, organization units, project team membership                                           |
| Relationships and sites      | 3                       | Prospect-to-client lifecycle, customer relationships, physical sites                         |
| Bids                         | 3                       | Commercial pursuits, status history, acceptance state and orchestration                      |
| Estimates                    | 3                       | Bid-scoped estimate versions, labor and material line items, alternates, issued revisions    |
| Engineering and design       | 3 foundation / later    | Bid-scoped design versions, accepted design baseline, later project design and BIM workflows |
| Customer portal              | Cross-domain experience | Proposal review, signatures, selections, status, and approved shared project data            |
| Procurement                  | 3                       | Vendors, purchase orders, vendor orders, receiving, audit history                            |
| Inventory                    | 3                       | Items, stock, locations, kits, staging, allocations, serials, warranties                     |
| Scheduling                   | 2                       | Calendars, resource plans, technician assignments, field notifications                       |
| Safety and compliance        | 2+                      | Checklists, incidents, certifications, supporting files                                      |
| Closeout                     | Later planning          | As-builts, O&M manuals, warranty packages, handover state                                    |
| Billing                      | 3                       | Progress billing, final invoices, payment state, commission calculations                     |
| Accounting integrations      | 1 stub / 3 live         | Connection config, external mappings, synchronization jobs                                   |
| CRM growth experiences       | 4                       | Advanced prospecting, sales activity, geographic pipeline views, map-based CRM               |
| Analytics                    | 4                       | Metric definitions, read models, exports                                                     |
| AI assistant                 | 4                       | Conversations, tool allowlists, audit trail                                                  |

The [project lifecycle](../product/project-lifecycle.md) is the approved user-flow map. Lifecycle stages and backend modules are intentionally not one-to-one: client experiences coordinate domain services while ownership of rules and data remains explicit.

## Commercial conversion boundary

Before a win, the bid owns the commercial pursuit while estimate and design modules own their independently versioned artifacts. `AcceptBid` is a synchronous application workflow that uses public module services to validate the chosen versions, promote the prospect relationship to client, create the project, and persist an immutable as-sold baseline in one transaction. It emits `BidAccepted` through the transactional outbox after the business state is durable.

The accepted bid is a conversion record or state, not another tenant or operational project. The source bid and selected versions remain available for audit. Project-owned revisions after acceptance do not rewrite the pre-win originals. See the [preliminary commercial domain model](../product/domain-model.md) and [backend dependency map](dependency-map.md).

## Collaboration boundary

A general contractor’s organization owns a project. A subcontractor remains a separate organization and receives restricted access through project membership. Inviting a subcontractor never merges tenant data or grants access to the general contractor’s other projects, inventory, payroll, or private administration.

## Integration rule

Prefer meaningful events such as `ProjectTaskCompleted`, `FileAttached`, and `PurchaseOrderReceived` over cross-module writes. Activity and notifications subscribe to events. Direct application-service calls are acceptable when a synchronous answer is part of the use case.
