import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/oswald";
import "./globals.css";
import { site } from "@/data/site";

const title = `${site.name} | Industrial Transportation & Material Supply in Bhavnagar, Gujarat`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s | ${site.name}` },
  description: site.description,
  keywords: [
    "Rajmomai Transport",
    "industrial transportation Bhavnagar",
    "bulk material transport Gujarat",
    "coal supply",
    "industrial salt supply",
    "raw glass materials",
    "minerals supply",
    "sand supply",
    "logistics Gujarat",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title,
    description: site.description,
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image", title, description: site.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#101010", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN">
      <body>{children}</body>
    </html>
  );
}
