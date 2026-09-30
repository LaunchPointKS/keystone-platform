# Tenancy and authorization

## Tenant model

- An organization is the primary tenant boundary.
- A user may hold memberships in multiple organizations.
- Every request selects one active organization membership.
- Tenant-owned tables include `org_id`; project-owned tables include both `org_id` and `project_id`.
- Cross-organization project access is represented explicitly by project membership.

Client-provided organization or project identifiers are selectors, never proof of access. Services constrain reads and writes using the resolved `Principal` and resource ownership.

## Authentication boundary

Clerk initially handles signup, login, MFA, password reset, and session verification. Only the authentication implementation knows the Clerk SDK. It maps the verified provider subject to the application user and returns an internal `Principal`. An Auth0 implementation may replace it later without changing product modules.

## Authorization model

Effective access combines an organization role with any active project role. Features check permission strings such as `project.read`, `task.write`, `file.upload`, and `billing.sync`; they do not hard-code role names.

The first role pack is:

| Role | Intent |
| --- | --- |
| `org_owner` / `org_admin` | Organization, billing settings, and member administration |
| `pm` | Project creation, management, and invitations |
| `field` | Assigned-project tasks, photos, and activity |
| `subcontractor` | Restricted project collaboration |
| `viewer` | Read-only access |

The detailed permission matrix remains a required pre-implementation decision.

