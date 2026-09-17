"use client";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { ValidAgendaLogo } from "./valid-agenda-logo";
import { ArrowLeft, ArrowRight, ChevronDown } from "lucide-react";
import { bookPages, bookNavigation } from "@/content/book";
import { BookPageContent } from "./book-page";
import { canScrollInDirection, wheelPixels } from "@/lib/book-scroll";

const mobileQuery = "(max-width: 900px)";
function subscribeMobile(callback: () => void) {
  const query = window.matchMedia(mobileQuery);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}
function getMobile() {
  return window.matchMedia(mobileQuery).matches;
}
const getServerMobile = () => false;
type Turn = { from: number; to: number; forward: boolean };

export function ScrollBook() {
  const mobile = useSyncExternalStore(
    subscribeMobile,
    getMobile,
    getServerMobile,
  );
  const unit = mobile ? 1 : 2;
  const viewCount = Math.ceil(bookPages.length / unit);
  const [index, setIndex] = useState(0);
  const [turn, setTurn] = useState<Turn | null>(null);
  const current = useRef(0);
  const busy = useRef(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const previousUnit = useRef(unit);
  const initialHashRead = useRef(false);
  const navigate = useCallback(
    (page: number) => {
      const target = Math.floor(page / unit);
      window.scrollTo({
        top: target * window.innerHeight * 0.85,
        behavior: "instant",
      });
    },
    [unit],
  );

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const next = Math.min(
        viewCount - 1,
        Math.max(0, Math.round(window.scrollY / (window.innerHeight * 0.85))),
      );
      if (busy.current || next === current.current) return;
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduced) {
        current.current = next;
        setIndex(next);
        setTurn(null);
        return;
      }
      busy.current = true;
      setTurn({
        from: current.current,
        to: next,
        forward: next > current.current,
      });
      timeout.current = setTimeout(() => {
        current.current = next;
        setIndex(next);
        setTurn(null);
        busy.current = false;
        update();
      }, 680);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onResize = () => {
      window.scrollTo({
        top:
          Math.min(current.current, viewCount - 1) * window.innerHeight * 0.85,
        behavior: "instant",
      });
      onScroll();
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey)
        return;
      const el = event.target as HTMLElement;
      if (el.closest('input,textarea,select,button,a,[contenteditable="true"]'))
        return;
      const reader = el.closest(".paper-content") as HTMLElement | null;
      if (
        reader &&
        event.key === "PageDown" &&
        reader.scrollTop + reader.clientHeight < reader.scrollHeight - 2
      )
        return;
      if (reader && event.key === "PageUp" && reader.scrollTop > 0) return;
      if (
        [
          "ArrowRight",
          "PageDown",
          "ArrowLeft",
          "PageUp",
          "Home",
          "End",
        ].includes(event.key)
      ) {
        event.preventDefault();
        const next =
          event.key === "Home"
            ? 0
            : event.key === "End"
              ? viewCount - 1
              : current.current +
                (["ArrowRight", "PageDown"].includes(event.key) ? 1 : -1);
        navigate(Math.max(0, Math.min(viewCount - 1, next)) * unit);
      }
    };
    let boundaryDelta = 0;
    let lastWheelAt = 0;
    // Hidden overflow on the decorative book ancestors can swallow native
    // scroll chaining. Handle the boundary explicitly, while letting the
    // browser scroll the readable page (and nested code blocks) normally.
    const readerAtBoundary = (target: EventTarget | null, delta: number) => {
      if (!(target instanceof Element)) return false;
      const reader = target.closest<HTMLElement>(".book-spread .paper-content");
      if (!reader || target.closest('input,textarea,select,[contenteditable="true"]')) return false;
      let nested: Element | null = target;
      while (nested && nested !== reader) {
        if (/auto|scroll/.test(getComputedStyle(nested).overflowY) && canScrollInDirection(nested, delta)) return false;
        nested = nested.parentElement;
      }
      return !canScrollInDirection(reader, delta);
    };
    const turnAtBoundary = (delta: number) => {
      const next = Math.max(0, Math.min(viewCount - 1, current.current + Math.sign(delta)));
      if (next !== current.current) navigate(next * unit);
    };
    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.metaKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      if (busy.current && event.target instanceof Element && event.target.closest(".open-book")) {
        event.preventDefault();
        boundaryDelta = 0;
        return;
      }
      const delta = wheelPixels(event.deltaY, event.deltaMode, window.innerHeight);
      if (!delta || !readerAtBoundary(event.target, delta)) {
        boundaryDelta = 0;
        return;
      }
      event.preventDefault();
      const now = performance.now();
      const gap = now - lastWheelAt;
      lastWheelAt = now;
      if (busy.current) { boundaryDelta = 0; return; }
      if (gap > 180 || Math.sign(boundaryDelta) !== Math.sign(delta)) boundaryDelta = 0;
      boundaryDelta += delta;
      if (Math.abs(boundaryDelta) >= 60) {
        boundaryDelta = 0;
        turnAtBoundary(delta);
      }
    };
    let touchY: number | null = null;
    let touchDelta = 0;
    let touchTurned = false;
    const onTouchStart = (event: TouchEvent) => {
      touchY = event.touches.length === 1 ? event.touches[0].clientY : null;
      touchDelta = 0;
      touchTurned = false;
    };
    const onTouchMove = (event: TouchEvent) => {
      if (touchY === null || event.touches.length !== 1) return;
      const delta = touchY - event.touches[0].clientY;
      touchY = event.touches[0].clientY;
      if (!readerAtBoundary(event.target, delta)) { touchDelta = 0; return; }
      if (event.cancelable) event.preventDefault();
      if (busy.current || touchTurned) return;
      if (Math.sign(touchDelta) !== Math.sign(delta)) touchDelta = 0;
      touchDelta += delta;
      if (Math.abs(touchDelta) >= 60) {
        touchTurned = true;
        turnAtBoundary(delta);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKey);
    if (previousUnit.current !== unit) {
      navigate(current.current * previousUnit.current);
      previousUnit.current = unit;
    }
    if (!initialHashRead.current) {
      const hashPage = bookNavigation.find(
        (item) => `#${item.hash}` === window.location.hash,
      )?.page;
      if (hashPage !== undefined) navigate(hashPage);
      initialHashRead.current = true;
    }
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", onKey);
      cancelAnimationFrame(frame);
      if (timeout.current) clearTimeout(timeout.current);
      busy.current = false;
    };
  }, [navigate, unit, viewCount]);

  const active = Math.min(index, viewCount - 1);
  const left = turn
    ? (turn.forward ? turn.from : turn.to) * unit
    : active * unit;
  const right = turn
    ? (turn.forward ? turn.to : turn.from) * unit + 1
    : active * unit + 1;
  const go = (page: number) => {
    navigate(page);
  };
  return (
    <div
      className="book-scroll-track"
      style={{ height: `${100 + (viewCount - 1) * 85}svh` }}
    >
      <div className="book-stage">
        <div className="book-world-layer" aria-hidden="true"><Image
          className="book-world"
          src="/images/valid-agenda-book-world.webp"
          alt=""
          fill
          sizes="100vw"
          preload
        /></div>
        <div className="book-world-shade" aria-hidden="true" />
        <header className="book-site-header">
          <a
            className="book-brand"
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              history.replaceState(null, "", "#top");
              go(0);
            }}
          >
            <strong>Sites by Agents</strong>
            <span>by Valid Agenda</span>
          </a>
          <nav aria-label="Book chapters">
            {bookNavigation.map((item) => (
              <a
                key={item.hash}
                href={`#${item.hash}`}
                onClick={(e) => {
                  e.preventDefault();
                  history.replaceState(null, "", `#${item.hash}`);
                  go(item.page);
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <button
            className="book-button orange header-build"
            onClick={() => go(2)}
          >
            Start building <ArrowRight aria-hidden="true" size={17} />
          </button>
        </header>
        <div className="book-desk">
          <span className="world-margin-note left" aria-hidden="true">
            A MORE
            <br />
            OPEN WEB
          </span>
          <span className="world-margin-note right" aria-hidden="true">
            SMALL IDEAS.
            <br />
            BIGGER
            <br />
            TOMORROW.
          </span>
          <main
            id="main"
            className={`open-book ${mobile ? "single-page" : ""} ${turn ? "is-turning" : ""}`}
            tabIndex={-1}
            aria-label="Sites by Agents interactive book"
          >
            <div className="book-cover" aria-hidden="true" />
            <div className="book-page-edges" aria-hidden="true" />
            <div className="book-spread" inert={!!turn}>
              <article
                className="paper paper-left"
                key={`left-${mobile ? active : left}`}
                aria-label={`Page ${(mobile ? active : left) + 1}`}
              >
                <BookPageContent page={mobile ? active : left} navigate={go} />
              </article>
              {!mobile && (
                <article
                  className="paper paper-right"
                  key={`right-${right}`}
                  aria-label={`Page ${right + 1}`}
                >
                  <BookPageContent page={right} navigate={go} />
                </article>
              )}
            </div>
            <div className="book-gutter" aria-hidden="true" />
            {turn && !mobile && (
              <div
                key={`${turn.from}-${turn.to}`}
                className={`turning-leaf ${turn.forward ? "turn-forward" : "turn-back"}`}
                aria-hidden="true"
                inert
              >
                <div className="leaf-face leaf-front">
                  <BookPageContent
                    page={
                      turn.forward ? turn.from * unit + 1 : turn.from * unit
                    }
                    navigate={() => {}}
                    decorative
                  />
                </div>
                <div className="leaf-face leaf-back">
                  <BookPageContent
                    page={turn.forward ? turn.to * unit : turn.to * unit + 1}
                    navigate={() => {}}
                    decorative
                  />
                </div>
              </div>
            )}
            {turn && mobile && (
              <div
                className={`mobile-page-turn ${turn.forward ? "" : "reverse"}`}
                aria-hidden="true"
              />
            )}
          </main>
        </div>
        <div className="book-controls">
          <button
            onClick={() => go(Math.max(0, active - 1) * unit)}
            disabled={active === 0 || !!turn}
            aria-label="Previous pages"
          >
            <ArrowLeft aria-hidden="true" size={18} />
            <span>Previous</span>
          </button>
          <div>
            <span
              className="page-counter"
              aria-live="polite"
              aria-atomic="true"
            >
              {mobile
                ? `Page ${active + 1}`
                : `Pages ${active * 2 + 1}–${Math.min(active * 2 + 2, bookPages.length)}`}{" "}
              <span>/ {bookPages.length}</span>
            </span>
            <span className="scroll-cue">
              {active === viewCount - 1
                ? "YOUR NEXT CHAPTER STARTS HERE"
                : "SCROLL TO READ · KEEP SCROLLING TO TURN"}
              <ChevronDown aria-hidden="true" size={15} />
            </span>
          </div>
          <button
            onClick={() => go(Math.min(viewCount - 1, active + 1) * unit)}
            disabled={active === viewCount - 1 || !!turn}
            aria-label="Next pages"
          >
            <span>Next</span>
            <ArrowRight aria-hidden="true" size={18} />
          </button>
        </div>
        <footer className="book-site-footer">
          <ValidAgendaLogo />
          <nav aria-label="Site information"><Link href="/about">About</Link><Link href="/guide">Written guide</Link><Link href="/get-help">Get help ↗</Link><Link href="/agents">For agents</Link><Link href="/contact">Contact</Link><Link href="/privacy">Privacy</Link></nav>
        </footer>
      </div>
    </div>
  );
}
