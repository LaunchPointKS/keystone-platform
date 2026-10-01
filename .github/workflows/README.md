# Workflows

`ci.yml` installs the pinned Node and pnpm toolchain, then checks formatting, linting, types, the Prisma schema, tests, and all builds. It runs on pull requests and pushes to `main`.

Generated OpenAPI drift, migration safety, dependency review, and secret scanning will be added when their corresponding artifacts enter the repository.
