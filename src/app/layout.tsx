import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "North Star Roofing ? Logo",
  description: "Download the North Star Roofing logo as SVG or PNG.",
  metadataBase: new URL("https://agentic-b2aacae8.vercel.app"),
  openGraph: {
    title: "North Star Roofing ? Logo",
    description: "Brand logo assets",
    url: "/",
    siteName: "North Star Roofing",
    type: "website",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
