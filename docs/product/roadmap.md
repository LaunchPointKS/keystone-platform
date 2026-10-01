# Delivery roadmap

Dates remain open. The order reflects technical and product dependencies. This roadmap controls implementation order; the [construction project lifecycle](project-lifecycle.md) controls the intended end-to-end user journey. A later lifecycle stage may be built before every capability in an earlier stage when dependencies and the first usable field loop require it.

## Phase 1 — Foundation and core field loop

Goal: run a project with tasks, photos, activity, real permissions, and offline mobile support through one API.

- Repository and implementation scaffolds, OpenAPI, CI, and container deployment
- PostgreSQL and Prisma, Redis and BullMQ, private S3 uploads
- Clerk authentication boundary and application-owned RBAC
- Organizations, memberships, invitations, and contractor/subcontractor project access
- Basic teams, projects, tasks, assignees, and status workflow
- File metadata and photo upload path
- Persisted activity feed and focused Socket.IO delivery
- Device registration and a small Expo Push event set
- SQLite mobile store, pull/push sync, versioning, and conflict feedback
- Transactional outbox and worker process
- Accounting interface, fake implementation, and mapping design only
- Structured logs, request IDs, basic metrics, and error reporting

## Phase 2 — Field operations depth

- Scheduling and crew assignments
- Richer project-management workflows, time tracking, daily logs, and checklists
- Broader offline coverage and stronger conflict UX
- First safety checklists and incident workflows
- Notification preferences and more event types
- Initial closeout document collection where it naturally follows field work

## Phase 3 — Commercial and ERP

- Versioned estimates and proposals
- Customer proposal review, approval, and document signing
- Procurement, inventory, locations, kits, serials, and receipts
- Progress billing, final invoices, payment state, and commission rules
- Production QuickBooks and NetSuite implementations
- Invoice and payment synchronization with administrator mapping UI

## Phase 4 — Growth and intelligence

- Prospecting, accounts, opportunities, sales activity, and map-based CRM
- Expanded engineering and design workflows after their source formats and collaboration needs are validated
- Business reporting and analytics read models
- RBAC-scoped AI assistant
- Search upgrades and targeted worker/service extraction where measurements justify it

## Triggered work

CDN rollout, multiple regions, data residency, formal SOC 2 or ISO programs, and service extraction happen when performance, customer commitments, regulation, team ownership, or operational risk creates a concrete requirement.
