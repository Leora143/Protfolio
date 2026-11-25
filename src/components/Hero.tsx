import { useEffect, useRef, useState, type CSSProperties } from "react";
import { TextEffect } from "@/components/core/text-effect";
import { profile } from "../data/portfolio";
import { DownloadIcon } from "./icons";

const delay = (seconds: number) => ({ "--d": `${seconds}s` }) as CSSProperties;

export default function Hero({ ready }: { ready: boolean }) {
  const anim = ready ? "hero-anim" : "opacity-0";
  const ref = useRef<HTMLElement>(null);
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Scroll: a little parallax on the photo and the cue fades out
    const onScroll = () => {
      el.style.setProperty("--sy", String(Math.min(window.scrollY, window.innerHeight)));
      setAtTop(window.scrollY < 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Cursor: the clear spot in the photo and the gap in the curtain follow the pointer
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let cx = 0;
    let cy = 0;
    let tx = 0;
    let ty = 0;

    const rest = () => {
      const b = el.getBoundingClientRect();
      tx = b.width * 0.7;
      ty = b.height * 0.5;
    };
    const paint = () => {
      const b = el.getBoundingClientRect();
      cx += (tx - cx) * 0.1;
      cy += (ty - cy) * 0.1;
      el.style.setProperty("--mx", `${cx.toFixed(1)}px`);
      el.style.setProperty("--my", `${cy.toFixed(1)}px`);
      el.style.setProperty("--tx", `${((cx - b.width / 2) * -0.05).toFixed(1)}`);
      raf = Math.abs(tx - cx) > 0.5 || Math.abs(ty - cy) > 0.5 ? requestAnimationFrame(paint) : 0;
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(paint);
    };
    const onMove = (e: PointerEvent) => {
      const b = el.getBoundingClientRect();
      tx = e.clientX - b.left;
      ty = e.clientY - b.top;
      kick();
    };
    const onLeave = () => {
      rest();
      kick();
    };

    if (fine && !reduce) {
      rest();
      cx = tx;
      cy = ty;
      paint();
      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={ref}
      id="top"
      className="relative isolate flex min-h-svh items-center overflow-hidden px-6 pb-24 pt-28 sm:px-8"
    >
      {/* Photo, soft behind the words. The pointer opens a clear spot in it. */}
      <div aria-hidden="true" className="hero-photo absolute inset-0 -z-10">
        <div className="hero-parallax absolute inset-x-0 -inset-y-[8%]">
          <img
            src={profile.photo}
            alt=""
            width={1000}
            height={1777}
            className="hero-photo-blur absolute inset-y-0 right-0 h-full w-full object-cover object-[50%_40%] lg:w-[62%]"
          />
        </div>
        <div className="hero-clear absolute inset-0 hidden lg:block">
          <div className="hero-parallax absolute inset-x-0 -inset-y-[8%]">
            <img
              src={profile.photo}
              alt=""
              width={1000}
              height={1777}
              className="hero-photo-clear absolute inset-y-0 right-0 h-full w-[62%] object-cover object-[50%_40%]"
            />
          </div>
        </div>
        <div className="hero-scrim absolute inset-0" />
        {/* Curtain over the whole hero, parted around the pointer */}
        <div className="hero-curtain absolute inset-0">
          <div className="hero-curtain-folds absolute inset-y-0 -inset-x-[6%]" />
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl">
        <div className="max-w-3xl">
          <p className={`${anim} flex items-center gap-2 text-sm text-ink-2`} style={delay(0)}>
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-accent" />
            Open to full-time roles and freelance projects
          </p>

          <h1 className="mt-8 text-[44px] font-normal leading-[1.06] tracking-[-0.02em] sm:text-[60px] xl:text-[72px]">
            <span className="sr-only">Front end on the surface. Full stack underneath.</span>
            <span aria-hidden="true" className="block">
              <TextEffect as="span" per="word" preset="fade-in-blur" trigger={ready} delay={0.05} className="block">
                Front end on the surface.
              </TextEffect>
              <TextEffect
                as="span"
                per="word"
                preset="fade-in-blur"
                trigger={ready}
                delay={0.55}
                className="block text-ink-2"
              >
                Full stack underneath.
              </TextEffect>
            </span>
          </h1>

          <p className={`${anim} mt-6 max-w-xl text-lg leading-[1.7] text-ink-2`} style={delay(0.7)}>
            React developer — polished interfaces up front, solid APIs underneath.
          </p>

          <div className={`${anim} mt-10 flex flex-wrap gap-3`} style={delay(0.8)}>
            <a href="#contact" className="btn btn-primary">
              Hire me
            </a>
            <a href={profile.resume} download className="btn btn-secondary">
              <DownloadIcon />
              Download resume
            </a>
          </div>
        </div>
      </div>

      <a
        href="#skills"
        aria-label="Scroll to skills"
        tabIndex={atTop ? 0 : -1}
        className={`${anim} scroll-cue absolute bottom-12 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 font-mono text-xs text-ink-2 transition-opacity duration-300 hover:text-ink ${
          atTop ? "" : "pointer-events-none !opacity-0"
        }`}
        style={delay(1.1)}
      >
        Scroll
        <span aria-hidden="true" className="scroll-cue-line" />
      </a>

      <p
        className={`${anim} absolute inset-x-6 bottom-6 flex flex-wrap items-baseline justify-between gap-x-6 font-mono text-xs text-ink-2 sm:inset-x-8`}
        style={delay(0.9)}
      >
        <span>{profile.name}</span>
        <span>{profile.location}</span>
      </p>
    </section>
  );
}