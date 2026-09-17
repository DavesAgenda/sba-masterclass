import type { Metadata } from "next";
import { siteConfig, siteUrl } from "@/lib/site-config";
import "./book.css";

const title = "Sites by Agents - Build and Launch Your Own Website";
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description: siteConfig.description,
    url: siteUrl,
    siteName: siteConfig.name,
    type: "website",
    locale: "en_AU",
  },
  twitter: { card: "summary", title, description: siteConfig.description },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
