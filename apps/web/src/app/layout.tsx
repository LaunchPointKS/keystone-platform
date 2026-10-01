import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./styles.css";

const appName = process.env.NEXT_PUBLIC_APP_NAME ?? "Keystone";

export const metadata: Metadata = {
  title: `${appName} | Foundation`,
  description: "Construction management platform foundation",
};

interface RootLayoutProps {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
