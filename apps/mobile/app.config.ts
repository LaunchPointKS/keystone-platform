import type { ConfigContext, ExpoConfig } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: process.env.EXPO_PUBLIC_APP_NAME ?? "Keystone",
  slug: "keystone-mobile",
  version: "0.1.0",
  orientation: "default",
  userInterfaceStyle: "dark",
  ios: {
    supportsTablet: true,
  },
});
