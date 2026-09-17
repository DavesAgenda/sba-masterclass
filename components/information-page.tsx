import type { Metadata } from "next";
import Link from "next/link";
import { informationPage, informationPages } from "@/content/information";
import { siteConfig, siteUrl } from "@/lib/site-config";
import { ValidAgendaLogo } from "./valid-agenda-logo";
import { CopyBlock } from "./prompt-card";
import { StructuredData } from "./structured-data";
import { LessonVideo } from "./lesson-video";

export function informationMetadata(slug: string): Metadata {
  const page = informationPage(slug);
  return {
    title: `${page.label} | Sites by Agents`,
    description: page.description,
    alternates: {
      canonical: `/${slug}`,
      types: { "text/markdown": `${siteUrl}/${slug}.md` },
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `${siteUrl}/${slug}`,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: page.title,
      description: page.description,
    },
  };
}

export function InformationPageView({ slug }: { slug: string }) {
  const page = informationPage(slug);
  const structured = {
    "@context": "https://schema.org",
    "@type": slug === "faq" ? "FAQPage" : "WebPage",
    "@id": `${siteUrl}/${slug}#page`,
    url: `${siteUrl}/${slug}`,
    name: page.title,
    description: page.description,
    isPartOf: { "@id": `${siteUrl}/#website` },
    publisher: { "@id": `${siteConfig.validAgendaUrl}#organization` },
    ...(slug === "faq"
      ? {
          mainEntity: page.sections.map((s) => ({
            "@type": "Question",
            name: s.title,
            acceptedAnswer: {
              "@type": "Answer",
              text: s.paragraphs?.join(" "),
            },
          })),
        }
      : {}),
  };
  return (
    <div className="information-site">
      <StructuredData data={structured} />
      <header className="information-header">
        <Link className="book-brand" href="/">
          <strong>Sites by Agents</strong>
          <span>The practical website field guide</span>
        </Link>
        <ValidAgendaLogo />
      </header>
      <nav className="information-nav" aria-label="Site navigation">
        <Link href="/">Open the book</Link>
        {informationPages
          .filter((p) => p.slug !== "agents")
          .map((p) => (
            <Link
              key={p.slug}
              href={`/${p.slug}`}
              aria-current={p.slug === slug ? "page" : undefined}
            >
              {p.label}
            </Link>
          ))}
      </nav>
      <main id="main" className="information-paper" tabIndex={-1}>
        <div className="information-running-head">
          <span>{page.eyebrow}</span>
          <a href={`/${slug}.md`}>Read as Markdown ↗</a>
        </div>
        <h1>{page.title}</h1>
        <p className="information-intro">{page.description}</p>
        {slug === "get-help" && (
          <a
            className="book-button orange information-primary-action"
            href={siteConfig.validAgendaBookingUrl}
          >
            Talk to Valid Agenda <span aria-hidden="true">↗</span>
          </a>
        )}
        <div className="information-sections">
          {page.sections.map((section, index) => (
            <section id={section.id} key={section.title} aria-labelledby={`section-${index}`}>
              <span className="information-number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h2 id={`section-${index}`}>{section.title}</h2>
                {section.paragraphs?.map((p) => (
                  <p key={p}>{p}</p>
                ))}
                {section.items && (
                  <ul>
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
                {section.code && (
                  <CopyBlock text={section.code} label={section.title} />
                )}
                {section.video && <LessonVideo clip={section.video} />}
                {section.links && (
                  <div className="information-links">
                    {section.links.map((link) => (
                      <a key={link.href} href={link.href}>
                        {link.label} <span aria-hidden="true">↗</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </section>
          ))}
        </div>
        {slug !== "get-help" && slug !== "agents" && (
          <aside className="advice-invitation">
            <div>
              <span className="eyebrow">A HUMAN NEXT STEP</span>
              <h2>Want a little help, or a bigger plan?</h2>
              <p>
                Talk to Valid Agenda about your build or the technology
                decisions beyond it.
              </p>
            </div>
            <Link className="book-button orange" href="/get-help">
              Find the right help →
            </Link>
          </aside>
        )}
      </main>
      <footer className="information-footer">
        <ValidAgendaLogo />
        <p>Build with an agent. Keep the decisions yours.</p>
        <nav aria-label="Resources">
          <Link href="/agents">For agents</Link>
          <a href="/llms.txt">llms.txt</a>
          <a href={siteConfig.githubUrl}>Source code</a>
          <a href={siteConfig.validAgendaBookingUrl}>Talk to Valid Agenda ↗</a>
        </nav>
      </footer>
    </div>
  );
}
