# Mobile application

Future Expo / React Native client for iOS, Android, and iPad. It supports field workflows through a local SQLite projection, an offline command queue, and the API sync protocol.

Likely first surfaces: assigned projects, tasks, photos, activity, and connection/sync status. Credentials use platform secure storage; file bytes are not stored in application state.

Phase 1A provides an API connection screen. Start it with `pnpm --filter @keystone/mobile dev`. A physical device must use the development computer’s LAN address for `EXPO_PUBLIC_API_URL`; `localhost` works only when the client and API share the same host context.
