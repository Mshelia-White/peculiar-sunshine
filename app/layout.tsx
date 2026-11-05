import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Peculiar Sunshine — Social Media Strategist, AI Video & UGC Creator, Graphic Designer",
  description: "Peculiar Sunshine helps brands grow with social media strategy, content marketing, AI video ads, UGC content and scroll-stopping graphic design.",
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
