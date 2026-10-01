import { ApiStatus } from "../components/api-status";

const appName = process.env.NEXT_PUBLIC_APP_NAME ?? "Keystone";

export default function HomePage() {
  return (
    <main className="shell">
      <section className="hero" aria-labelledby="page-title">
        <p className="eyebrow">Phase 1A · Technical foundation</p>
        <h1 id="page-title">{appName}</h1>
        <p className="summary">
          The web client is running. This page verifies the shared workspace and
          the versioned NestJS API connection before product features are
          introduced.
        </p>
        <ApiStatus />
      </section>
    </main>
  );
}
