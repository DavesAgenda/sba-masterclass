"use client";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Code2,
  GitBranch,
  Globe2,
  Lightbulb,
  Play,
  Triangle,
  Network,
  BookOpen,
  Box,
  Monitor,
} from "lucide-react";
import { useState } from "react";
import { bookPages, bookInstructions } from "@/content/book";
import { starterPrompt, prompts } from "@/content/prompts";
import { steps } from "@/content/tutorial";
import { siteConfig, youtubeEmbedUrl } from "@/lib/site-config";
import { CopyBlock } from "./prompt-card";

export function BookPageContent({
  page,
  navigate,
  decorative = false,
}: {
  page: number;
  navigate: (page: number) => void;
  decorative?: boolean;
}) {
  const data = bookPages[page];
  if (!data) return null;
  const kind = data.kind;
  const step = steps.find(
    (s) =>
      s.id ===
      (
        {
          brief: "prompt",
          build: "build",
          github: "github",
          deploy: "deploy",
          domain: "domain",
        } as Record<string, string>
      )[kind],
  );
  return (
    <div
      className={`paper-content page-${kind}`}
      tabIndex={decorative ? -1 : 0}
      aria-label={`Page ${page + 1}: ${data.title}`}
    >
      <div className="page-running-head">
        <span>{data.chapter}</span>
        <span>{data.label}</span>
      </div>
      {kind === "intro" ? <h1>{data.title}</h1> : <h2>{data.title}</h2>}
      {kind === "intro" && (
        <>
          <p className="book-lead">
            A practical, step-by-step guide based on our live webinar. Learn the
            process, try the prompts and publish your site.
          </p>
          <div className="book-mini-flow">
            <span>
              <Code2 aria-hidden="true" />
              Agent
            </span>
            <ArrowRight aria-hidden="true" />
            <span>
              <GitBranch aria-hidden="true" />
              GitHub
            </span>
            <ArrowRight aria-hidden="true" />
            <span>
              <Triangle aria-hidden="true" />
              Hosting
            </span>
            <ArrowRight aria-hidden="true" />
            <span>
              <Globe2 aria-hidden="true" />
              Domain
            </span>
          </div>
          <div className="book-actions">
            <button className="book-button orange" onClick={() => navigate(10)}>
              <Play aria-hidden="true" size={16} />
              Watch the webinar
            </button>
            <button className="book-button outline" onClick={() => navigate(2)}>
              Start with step 1 <ArrowRight aria-hidden="true" size={17} />
            </button>
          </div>
          <div className="page-landscape">
            <Image
              src="/images/valid-agenda-book-world.webp"
              alt=""
              fill
              sizes="(max-width: 760px) 90vw, 600px"
            />
            <span>
              REAL PROJECTS.
              <br />
              REAL OWNERSHIP.
            </span>
          </div>
        </>
      )}
      {kind === "process" && (
        <>
          <ol className="book-process">
            {steps.map((s, i) => {
              const Icon = [Lightbulb, Code2, GitBranch, Triangle, Globe2][i];
              return (
                <li key={s.id}>
                  <button onClick={() => navigate([2, 4, 6, 7, 8][i])}>
                    <span className="process-number">{s.number}</span>
                    <span className="process-icon">
                      <Icon aria-hidden="true" size={24} strokeWidth={1.4} />
                    </span>
                    <span>
                      <strong>
                        {s.name === "Prompt"
                          ? "Your idea + an agent"
                          : s.name === "Build"
                            ? "Your local project"
                            : s.name === "Deploy"
                              ? "Vercel"
                              : s.name === "Domain"
                                ? "Your domain"
                                : s.name}
                      </strong>
                      <small>{s.summary}</small>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
          <p className="handwritten">
            A real website.
            <br />
            Yours.
          </p>
          <p className="book-note">
            You make the decisions. The agent is your development partner.
          </p>
        </>
      )}
      {step && (
        <>
          <p className="book-deck">{step.objective}</p>
          <p className="book-needs">
            <strong>You’ll need</strong> {step.needs}
          </p>
          <ol className="book-instructions">
            {(bookInstructions[step.id] ?? step.actions).map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ol>
          {kind === "build" && (
            <CopyBlock
              text={"npm install\nnpm run dev"}
              label="In your project folder"
            />
          )}
          {kind === "brief" && (
            <button className="book-button outline" onClick={() => navigate(3)}>
              Turn to the starter prompt <ArrowRight aria-hidden="true" size={16} />
            </button>
          )}
          <p className="book-result">
            <Check aria-hidden="true" size={16} />
            <span>
              <strong>Ready when</strong>
              {step.result}
            </span>
          </p>
          {step.link && (
            <a
              className="book-source"
              href={step.link.href}
              target="_blank"
              rel="noreferrer"
            >
              {step.link.label}
              <ArrowUpRight aria-hidden="true" size={14} />
            </a>
          )}
        </>
      )}
      {kind === "starter" && (
        <>
          <p className="book-deck">
            Fill in the brackets. Give the agent a clear first version to build.
          </p>
          <CopyBlock text={starterPrompt} label="Your starter prompt" />
          <p className="book-note">
            Be specific about the audience and content. “A one-page site for a
            local architect, with three projects and an email link” is a useful
            starting point.
          </p>
        </>
      )}
      {kind === "refine" && (
        <>
          <p className="book-deck">
            You don’t need special syntax. Describe the change, then look at the
            result.
          </p>
          <div className="iteration-notes">
            {[
              "Make the heading smaller.",
              "Reduce the spacing between these sections.",
              "Make this usable on mobile.",
              "Replace the three columns with one horizontal process diagram.",
            ].map((t) => (
              <blockquote key={t}>{t}</blockquote>
            ))}
          </div>
          <div className="book-callout">
            <Monitor aria-hidden="true" size={28} />
            <div>
              <strong>Keep the preview open.</strong>
              <p>
                Try one change at a time. Test the links and check the page at a
                narrow width. If something breaks, give the full error to your
                agent.
              </p>
            </div>
          </div>
          <p className="handwritten">
            Same idea.
            <br />
            More you.
          </p>
        </>
      )}
      {kind === "dns" && (
        <>
          <p className="book-deck">
            Your domain is the address. DNS tells that address where your
            website lives.
          </p>
          <div className="book-dns">
            {[
              [Globe2, siteConfig.domain, "The address people type"],
              [Network, "DNS", "Points the address to your host"],
              [Triangle, "Vercel", "Builds and serves the files"],
              [BookOpen, "Your website", "Opens in your visitor’s browser"],
            ].map(([Icon, label, desc], i) => {
              const Symbol = Icon as typeof Globe2;
              return (
                <div key={String(label)}>
                  <span>
                    <Symbol size={25} />
                  </span>
                  <div>
                    <strong>{String(label)}</strong>
                    <small>{String(desc)}</small>
                  </div>
                  {i < 3 && <ArrowRight aria-hidden="true" className="dns-arrow" size={18} />}
                </div>
              );
            })}
          </div>
          <p className="book-note">
            Use the exact DNS records Vercel gives your project. Preserve
            unrelated records, especially email. DNS changes can take time to
            propagate.
          </p>
          <p className="handwritten">
            An address you own.
            <br />A place to build on.
          </p>
        </>
      )}
      {kind === "webinar" && (
        <>
          <p className="book-deck">
            The thing you’re learning to build is the thing you’re looking at.
            Follow the full process, from prompt to domain.
          </p>
          <BookVideo decorative={decorative} />
          <ul className="book-checks">
            <li>
              <Check aria-hidden="true" />
              Build and refine with an agent
            </li>
            <li>
              <Check aria-hidden="true" />
              Publish to GitHub and Vercel
            </li>
            <li>
              <Check aria-hidden="true" />
              Connect your own domain
            </li>
          </ul>
        </>
      )}
      {["mobile", "design", "preflight"].includes(kind) && (
        <>
          <p className="book-deck">
            {
              prompts[
                { mobile: 0, design: 1, preflight: 2 }[
                  kind as "mobile" | "design" | "preflight"
                ]
              ].description
            }
          </p>
          <CopyBlock
            text={
              prompts[
                { mobile: 0, design: 1, preflight: 2 }[
                  kind as "mobile" | "design" | "preflight"
                ]
              ].text
            }
            label="Copy this prompt"
          />
          {kind === "mobile" ? (
            <>
              <div className="book-device-diagram">
                <Monitor aria-hidden="true" size={66} strokeWidth={1} />
                <ArrowRight aria-hidden="true" />
                <div className="phone-frame">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
              <p className="book-note">
                Check at 375px, 768px and desktop widths. Text should stay
                readable, buttons easy to tap, and code scroll within its own
                block.
              </p>
            </>
          ) : kind === "design" ? (
            <>
              <div className="book-palette">
                <i />
                <i />
                <i />
                <i />
              </div>
              <p className="book-note">
                Give the agent a reference, explain what you like about it, and
                ask for a coherent design. You choose what fits your brand.
              </p>
              <p className="handwritten">
                A little direction
                <br />
                goes a long way.
              </p>
            </>
          ) : (
            <>
              <ul className="book-checks">
                <li>
                  <Check aria-hidden="true" />
                  Production build and lint pass
                </li>
                <li>
                  <Check aria-hidden="true" />
                  Links, copy buttons and video work
                </li>
                <li>
                  <Check aria-hidden="true" />
                  Mobile layout stays within the screen
                </li>
                <li>
                  <Check aria-hidden="true" />
                  Keyboard navigation is usable
                </li>
              </ul>
              <p className="book-note">
                After publishing, check the actual deployed address too. A good
                local preview is only the first check.
              </p>
            </>
          )}
        </>
      )}
      {kind === "tools" && (
        <>
          <p className="book-deck">
            These are examples, not permanent vendor choices. The useful model
            is agent → Git → host → domain.
          </p>
          <dl className="book-tools">
            {[
              [
                "Build",
                "Codex / Claude Code",
                "A coding agent helps you write and refine the site.",
              ],
              ["Source", "GitHub", "Your source files and version history."],
              ["Host", "Vercel", "Publishes the website for visitors."],
              [
                "Domain",
                "Any registrar",
                "Registers the address you want to own.",
              ],
              [
                "DNS",
                "Your DNS provider",
                "Connects the address to the hosting.",
              ],
            ].map(([label, title, desc]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>
                  <strong>{title}</strong>
                  <span>{desc}</span>
                </dd>
              </div>
            ))}
          </dl>
          <p className="book-note">
            Keep a copy of the source. Your content, repository and domain
            remain yours to move and maintain.
          </p>
        </>
      )}
      {kind === "about" && (
        <>
          <p className="book-lead">
            Start with one useful page. Improve it, commit it, push it. Your
            website can grow with you.
          </p>
          <div className="about-mark">
            <Box aria-hidden="true" size={60} strokeWidth={1} />
            <div>
              <strong>Sites by Agents</strong>
              <span>by Valid Agenda</span>
            </div>
          </div>
          <p>
            This site is built using the process it teaches: an agent as a
            development partner, source code you control and an address you own.
          </p>
          <p className="book-note">
            You don’t need to become a web developer to own and operate a
            capable modern website. You do need to stay curious and make the
            decisions.
          </p>
          <button className="book-button orange" onClick={() => navigate(2)}>
            Start building your site <ArrowRight aria-hidden="true" size={17} />
          </button>
          <p className="handwritten">
            Your next chapter
            <br />
            starts with an idea.
          </p>
        </>
      )}
      <div className="page-bottom">
        <span>{String(page + 1).padStart(2, "0")}</span>
        <span>SITES BY AGENTS</span>
      </div>
    </div>
  );
}

function BookVideo({ decorative }: { decorative: boolean }) {
  const [loaded, setLoaded] = useState(false);
  const embed = youtubeEmbedUrl(siteConfig.webinarUrl);
  return (
    <>
      <div className="book-video">
        {loaded && embed && !decorative ? (
          <iframe
            title="Sites by Agents live webinar"
            src={embed}
            allow="encrypted-media; picture-in-picture; fullscreen"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <>
            <Image
              src="/images/valid-agenda-book-world.webp"
              alt=""
              fill
              sizes="(max-width:760px) 85vw, 600px"
            />
            <span className="book-video-label">BUILD. DEPLOY. OWN IT.</span>
            {embed ? (
              <button
                onClick={() => setLoaded(true)}
                aria-label="Load webinar video"
              >
                <Play aria-hidden="true" fill="currentColor" size={25} />
              </button>
            ) : (
              <span>Recording coming soon</span>
            )}
          </>
        )}
      </div>
      {embed && (
        <a
          className="book-source"
          href={siteConfig.webinarUrl}
          target="_blank"
          rel="noreferrer"
        >
          Watch on YouTube
          <ArrowUpRight aria-hidden="true" size={14} />
        </a>
      )}
    </>
  );
}
