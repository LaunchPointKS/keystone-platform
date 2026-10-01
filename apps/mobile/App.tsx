import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import type { HealthResponse } from "@keystone/contracts";

const apiUrl = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:3001/v1";
const appName = process.env.EXPO_PUBLIC_APP_NAME ?? "Keystone";

type ConnectionState =
  | { readonly kind: "checking" }
  | { readonly kind: "connected"; readonly health: HealthResponse }
  | { readonly kind: "unavailable"; readonly message: string };

export default function App() {
  const [state, setState] = useState<ConnectionState>({ kind: "checking" });

  const checkApi = useCallback(async () => {
    setState({ kind: "checking" });
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5_000);

    try {
      const response = await fetch(`${apiUrl}/health`, {
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
      clearTimeout(timeout);
    }
  }, []);

  useEffect(() => {
    void checkApi();
  }, [checkApi]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <View style={styles.container}>
        <Text style={styles.eyebrow}>PHASE 1A · TECHNICAL FOUNDATION</Text>
        <Text style={styles.title}>{appName}</Text>
        <Text style={styles.summary}>
          The mobile client is running. This screen verifies the Expo workspace
          and versioned API connection before field features and offline storage
          are added.
        </Text>

        <View style={styles.statusCard}>
          <View style={styles.statusHeading}>
            {state.kind === "checking" ? (
              <ActivityIndicator color="#f76835" />
            ) : (
              <View
                style={[
                  styles.statusDot,
                  state.kind === "connected"
                    ? styles.statusDotConnected
                    : styles.statusDotUnavailable,
                ]}
              />
            )}
            <Text style={styles.statusTitle}>
              {state.kind === "checking" && "Checking API"}
              {state.kind === "connected" && "API connected"}
              {state.kind === "unavailable" && "API unavailable"}
            </Text>
          </View>

          {state.kind === "connected" && (
            <Text style={styles.statusDetail}>
              {state.health.name} API {state.health.version} is healthy.
            </Text>
          )}

          {state.kind === "unavailable" && (
            <>
              <Text style={styles.statusDetail}>{state.message}</Text>
              <Pressable
                accessibilityRole="button"
                onPress={() => void checkApi()}
                style={({ pressed }) => [
                  styles.button,
                  pressed && styles.buttonPressed,
                ]}
              >
                <Text style={styles.buttonText}>Retry connection</Text>
              </Pressable>
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#080b0f",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 28,
  },
  eyebrow: {
    color: "#ff8154",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.8,
    marginBottom: 16,
  },
  title: {
    color: "#f5f7f9",
    fontSize: 52,
    fontWeight: "800",
    letterSpacing: -2.5,
  },
  summary: {
    color: "#b7c0ca",
    fontSize: 17,
    lineHeight: 27,
    marginBottom: 28,
    marginTop: 18,
  },
  statusCard: {
    padding: 20,
    borderColor: "#27323d",
    borderRadius: 16,
    borderWidth: 1,
    backgroundColor: "#111921",
  },
  statusHeading: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  statusDot: {
    width: 11,
    height: 11,
    borderRadius: 6,
  },
  statusDotConnected: {
    backgroundColor: "#3ddc84",
  },
  statusDotUnavailable: {
    backgroundColor: "#f05252",
  },
  statusTitle: {
    color: "#f5f7f9",
    fontSize: 16,
    fontWeight: "700",
  },
  statusDetail: {
    color: "#aeb8c2",
    lineHeight: 22,
    marginTop: 10,
  },
  button: {
    alignSelf: "flex-start",
    borderColor: "#f76835",
    borderRadius: 9,
    borderWidth: 1,
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 11,
  },
  buttonPressed: {
    backgroundColor: "#3b1c13",
  },
  buttonText: {
    color: "#f5f7f9",
    fontWeight: "600",
  },
});
