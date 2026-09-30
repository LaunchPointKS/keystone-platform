# Contributing

Keystone is still in architecture planning. Until implementation starts, changes should improve product scope, architectural clarity, or repository conventions without introducing production dependencies.

## Working agreement

- Create a focused branch for each change.
- Keep pull requests small enough to review as one coherent decision.
- Update architecture documentation when a change alters a boundary or data flow.
- Add or supersede an architecture decision record when changing a locked decision.
- Never commit credentials, local environment files, customer data, or production exports.
- Preserve the dependency direction described in the root README and system overview.

## Architecture decisions

Use the template in [`docs/decisions/README.md`](docs/decisions/README.md). Decisions are immutable history: supersede an accepted decision with a new record instead of rewriting the old rationale.

