import type { Metadata } from "next";
import { siteConfig, siteUrl } from "@/lib/site-config";
import "./book.css";
import { StructuredData } from "@/components/structured-data";
import { socialImage } from "@/lib/social-metadata";
import { GoogleAnalytics } from "@/components/google-analytics";

const title = "Sites by Agents - Build and Launch Your Own Website";
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description: siteConfig.description,
  alternates: {
    canonical: "/",
    types: { "text/markdown": `${siteUrl}/index.md` },
  },
  openGraph: {
    title,
    description: siteConfig.description,
    url: siteUrl,
    siteName: siteConfig.name,
    type: "website",
    locale: "en_AU",
    images: [socialImage],
  },
  twitter: { card: "summary_large_image", title, description: siteConfig.description, images: [socialImage] },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="describedby" href="/llms.txt" type="text/plain" />
      </head>
      <body>
        <StructuredData
          data={{
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                "@id": `${siteConfig.validAgendaUrl}#organization`,
                name: "Valid Agenda",
                legalName: "Valid Agenda Pty Ltd",
                description: "Valid Agenda helps business owners choose and build their next technology project, with AI advice and practical delivery support.",
                sameAs: ["https://www.linkedin.com/company/valid-agenda/"],
                contactPoint: {
                  "@type": "ContactPoint",
                  email: siteConfig.contactEmail,
                  contactType: "customer support",
                  url: `${siteUrl}/contact`,
                },
                url: siteConfig.validAgendaUrl,
                logo: `${siteUrl}/images/valid-agenda-color.svg`,
              },
              {
                "@type": "WebSite",
                "@id": `${siteUrl}/#website`,
                name: siteConfig.name,
                url: siteUrl,
                description: siteConfig.description,
                inLanguage: "en",
                publisher: {
                  "@id": `${siteConfig.validAgendaUrl}#organization`,
                },
              },
            ],
          }}
        />
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  );
}
