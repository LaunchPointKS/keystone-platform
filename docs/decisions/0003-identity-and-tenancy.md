# 0003 — Separate authentication from application authorization

Status: Accepted

## Context

An identity provider can handle credentials and MFA, but Keystone needs organization and project roles, cross-organization project collaboration, and resource-level checks.

## Decision

Use Clerk initially behind an auth interface. Map its subject to application-owned users and memberships, then resolve an internal `Principal`. Store RBAC and tenant relationships in PostgreSQL. General contractors own projects; subcontractors remain separate organizations and join through restricted project membership.

## Consequences

Product modules avoid Clerk types and can survive a provider change. Every service must scope data by tenant and resource, even after guards run. Permission checks use permission strings rather than role-name conditionals.
