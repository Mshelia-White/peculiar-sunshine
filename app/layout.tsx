import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Peculiar Sunshine Portfolio",
  description: "Social media strategy, content direction, paid advertising and growth by Peculiar Sunshine.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
