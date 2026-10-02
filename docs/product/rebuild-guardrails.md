# Rebuild guardrails

These guardrails are the product and engineering filter for the Keystone rebuild. The approved lifecycle describes the intended user journey, the roadmap determines implementation order, and architecture documents define technical boundaries. The original application and its handoff material are historical evidence: they help explain real workflows and failure modes, but they are not the specification for this system.

Change a locked architectural rule through an architecture decision record (ADR). Change product scope or sequencing explicitly in the product documents rather than allowing an implementation detail to become an accidental decision.

## Product intent

Keystone is a configurable, multi-tenant operations platform for contractors and subcontractors. It connects office, administrative, and field work around a project from opportunity through billing. The web application serves office and administrative workflows; the native mobile application supports field work, including unreliable or absent connectivity.

The bid is the commercial center before a win, and the project is the operational center after a win. Neither erases the distinction between organizations, prospects or clients, physical sites, people, commercial versions, and contracts. Those records can exist before a project and can relate to more than one project over time.

Security and low-voltage integration workflows are the strongest current reference case. Whether the first market is specifically security integrators or a broader group of specialty contractors remains a product decision. Domain names and configuration should stay contractor-oriented until that choice is made.

## Sources of truth

When sources disagree, use this order:

1. Accepted ADRs define locked technical decisions.
2. The [construction project lifecycle](project-lifecycle.md) defines the intended end-to-end experience.
3. The [commercial domain model](domain-model.md) defines the current provisional identity and conversion model.
4. The [delivery roadmap](roadmap.md) defines implementation order.
5. Current architecture documents define system and domain boundaries.
6. Historical application material supplies examples, lessons, and requirements to validate.

## Concepts to preserve

| Concept                                      | Why it matters                                                                                            | Early design implication                                                                          |
| -------------------------------------------- | --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Bid before project                           | Potential work needs commercial history without polluting operational job lists.                          | Prospects, bids, estimate versions, and design versions stay distinct from projects.              |
| Project as the operating center after a win  | Delivery work, communication, files, assignments, and progress converge on a project.                     | Acceptance creates the project and an immutable as-sold baseline; lost bids create no project.    |
| Customer, location, and project are distinct | One customer may operate many locations, and a location may have many projects.                           | Do not collapse these records into a single account or job table.                                 |
| Visibility and mutation are separate         | A person may need awareness of work they cannot change.                                                   | Permissions distinguish viewing, assigning, approving, and editing.                               |
| Structured field execution                   | Repeatable phases, systems, checklists, evidence, flags, and completion history make field work reliable. | Tasks support templates, assignments, files, state history, and later phase grouping.             |
| Planning tied to real resources              | Work must eventually connect dates, projects, people or crews, and locations.                             | Preserve date-only semantics where appropriate and model conflicts as visible decisions.          |
| Manual knowledge has precedence              | A deliberate correction must survive later imports.                                                       | Store source and confidence; lower-confidence input cannot silently overwrite verified data.      |
| Ambiguity is explicit                        | Forced guesses corrupt operational data.                                                                  | Matching and ingestion can produce review queues and unresolved records.                          |
| History is durable                           | Construction work needs accountability and reconstruction of what happened.                               | Prefer state transitions, cancellation, and append-only activity over destructive deletion.       |
| Notifications follow business events         | Delivery failure must not undo completed work.                                                            | Persist events and recipients, then deliver asynchronously with retry history.                    |
| Reporting is role-specific                   | Field, project, operations, and executive users need different decisions from the same data.              | Keep operational data consistent and build views around decisions rather than generic dashboards. |

## Patterns to redesign

| Historical pattern                                                      | Rebuild rule                                                                                          |
| ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| One Next.js application containing UI, business actions, and direct SQL | Keep Next.js as a web client and place business behavior behind the API and domain services.          |
| Custom signed-cookie authentication                                     | Use the identity provider through an application-owned identity interface.                            |
| Numeric user levels and scattered authorization checks                  | Use named permissions, organization and project membership, and centralized resource checks.          |
| Incomplete or hand-maintained schema history                            | Every schema change has a committed, reproducible migration from the beginning.                       |
| Imports that mutate operational records row by row                      | Stage, validate, match, review, and commit imports as auditable and idempotent runs.                  |
| Files stored on an application server                                   | Store objects in S3-compatible storage and metadata in the database.                                  |
| Large action, component, and stylesheet files                           | Keep domain behavior cohesive, interfaces typed, and UI components bounded by a clear responsibility. |
| Hard-coded offices, zones, roles, and targets                           | Treat business configuration as tenant-owned data with safe defaults.                                 |
| PWA as the only field client                                            | Use the Expo application for native, offline-capable field workflows.                                 |
| Manual pull, build, and restart deployment                              | Use repeatable CI and deployment pipelines with immutable artifacts.                                  |

## Capabilities deliberately deferred

These capabilities belong in the product direction, but they do not belong in the first build slice:

- live QuickBooks, NetSuite, D-Tools, ERP, payroll, or CRM connectors;
- the full scheduling and dispatch engine;
- estimating, procurement, inventory, progress billing, and commission workflows;
- the customer portal, CRM map, forecasting, and advanced analytics;
- AI assistance and cross-product search;
- vertical-specific design tools such as a rack builder; and
- microservices, multi-region deployment, or formal compliance programs before scale or customers require them.

Early schemas and interfaces must leave room for these capabilities without implementing speculative abstractions for them.

## Prohibited implementation patterns

The following patterns must not enter the codebase:

- trusting a client-supplied organization, project, or user identifier as authorization proof;
- running tenant-owned queries without an explicit organization boundary;
- checking display role names inside feature code instead of permissions;
- importing another domain's repository or database implementation directly;
- placing vendor SDK calls inside domain logic;
- completing a business write and then relying on an untracked, non-transactional side effect;
- forcing an ambiguous import or entity match;
- allowing lower-confidence data to overwrite verified or manually maintained values silently;
- using external display strings as internal primary keys;
- representing prospects or bids as organizations, or using a `bidding` project status for pre-win work;
- hard-deleting activity, approvals, completed work, or other audit-worthy records;
- changing the database without a migration;
- committing credentials, customer exports, runtime uploads, or environment files;
- creating a second backend in Next.js route handlers or server actions; or
- designing a mobile-synchronized record without conflict, retry, and idempotency behavior.

## Data and integration guardrails

Internal records use stable application identifiers. References from another system are stored separately with their source system, external type, external identifier, and any useful source version or effective date. External identifiers must be unique within the correct tenant and source scope, not globally by assumption.

An ingestion flow follows five explicit steps: retain the source payload, validate and normalize it, propose deterministic matches, route ambiguity to review, and commit accepted changes idempotently. Each run records what changed, what was skipped, what failed, and how to repair or reverse an incorrect result.

Data precedence is explicit. A reasonable starting order is manually verified data, deterministic trusted-source data, imported candidates, then unresolved values. A source may fill missing data only when its policy allows it; absence in a source is not permission to erase a known value.

## Tenancy and authorization guardrails

Organization membership is the primary tenant wall. Project participation is explicit and can grant a narrower view within that organization relationship. Subcontractor membership never implies access to every general-contractor project.

Authentication produces an application principal. Authorization uses named permissions plus resource context. Services enforce the resource check even when a client has already hidden or disabled the corresponding control. Broad operational visibility and narrow mutation rights can be granted separately.

## Delivery guardrails

Build vertical slices that finish a usable path through the API and the relevant client. Each slice addresses authorization, migrations, audit or activity behavior, observability, failure handling, and tests appropriate to its risk. Any data used by mobile also addresses offline reads, queued writes, retries, and conflict behavior.

Dependencies use frozen installs. CI must protect formatting, types, builds, migrations, and meaningful tests. Operational side effects use the outbox and worker path when they must survive process failure. Interfaces to identity, storage, messaging, and accounting keep provider details outside domain behavior.

## Phase 1 constraints

Phase 1 establishes the secure project and field-work loop. Phase 1A supplies the technical foundation. Before Phase 1B expands product domains, the team should settle or explicitly time-box these decisions:

- the initial market position and vocabulary;
- the working product name and identity terminology;
- the first role-to-permission matrix;
- organization invitation, membership, suspension, and removal behavior;
- initial project and task states, including cancellation and reopening;
- the external-reference and source-attribution shape; and
- baseline activity retention and audit expectations.

The first product slice should prove that an authorized organization member can enter, view, and update a project-scoped unit of work through the API, with its change history visible and its mobile synchronization behavior defined. Phase 1 may create a project directly and must identify that source explicitly; it does not create placeholder bids or prospects. Later Phase 1 slices can add files, collaboration, real-time updates, notifications, and accounting boundaries without weakening that path.

## Change review filter

Before accepting a feature or schema change, answer:

1. Which lifecycle stage and user decision does it support?
2. Which domain owns the behavior and data?
3. What is the organization and project authorization boundary?
4. What history must remain after the current state changes?
5. Does mobile need the data offline, and how are retries or conflicts handled?
6. Can external identifiers or imported data touch it, and with what precedence?
7. What happens when a dependency, delivery attempt, or match fails?
8. How will the team observe and verify the behavior?

The product name, first market, visual design, providers, and later feature ordering remain changeable. The dependency direction, tenant isolation, centralized authorization, durable migrations, auditable state changes, reliable side effects, and offline-aware mobile design are architectural invariants unless an accepted ADR changes them.
