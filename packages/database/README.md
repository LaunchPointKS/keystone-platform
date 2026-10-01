# Database package

This package owns the shared Prisma configuration, schema, migrations, and generated client. Phase 1A intentionally contains no domain tables.

Run `pnpm db:validate` from the repository root to validate the schema and `pnpm db:generate` to produce the ignored client output. Migrations begin in Phase 1B with identity and tenancy.

Database ownership still follows module boundaries: models live in one physical schema for the modular monolith, while each domain owns changes to its tables and relations.
