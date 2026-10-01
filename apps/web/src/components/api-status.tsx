"use client";

import { useCallback, useEffect, useState } from "react";

import type { HealthResponse } from "@keystone/contracts";

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/v1";

type ConnectionState =
  | { readonly kind: "checking" }
  | { readonly kind: "connected"; readonly health: HealthResponse }
  | { readonly kind: "unavailable"; readonly message: string };

export function ApiStatus() {
  const [state, setState] = useState<ConnectionState>({ kind: "checking" });

  const checkApi = useCallback(async () => {
    setState({ kind: "checking" });
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 5_000);

    try {
      const response = await fetch(`${apiUrl}/health`, {
        cache: "no-store",
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`API returned ${String(response.status)}`);
      }

      const health = (await response.json()) as HealthResponse;
      setState({ health, kind: "connected" });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unknown connection error";
      setState({ kind: "unavailable", message });
    } finally {
      window.clearTimeout(timeout);
    }
  }, []);

  useEffect(() => {
    void checkApi();
  }, [checkApi]);

  return (
    <div className="status-card" aria-live="polite">
      <div>
        <span
          className={`status-dot status-dot--${state.kind}`}
          aria-hidden="true"
        />
        <strong>
          {state.kind === "checking" && "Checking API"}
          {state.kind === "connected" && "API connected"}
          {state.kind === "unavailable" && "API unavailable"}
        </strong>
      </div>
      {state.kind === "connected" && (
        <p>
          {state.health.name} API {state.health.version} is healthy.
        </p>
      )}
      {state.kind === "unavailable" && (
        <>
          <p>{state.message}. Start the API and try again.</p>
          <button type="button" onClick={() => void checkApi()}>
            Retry connection
          </button>
        </>
      )}
    </div>
  );
}
