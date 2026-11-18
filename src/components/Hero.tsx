import type { CSSProperties } from "react";
import { profile } from "../data/portfolio";
import { DownloadIcon } from "./icons";

const delay = (seconds: number) => ({ "--d": `${seconds}s` }) as CSSProperties;

export default function Hero() {
  return (
    <section id="top" className="flex min-h-svh items-center px-6 pb-16 pt-28 sm:px-8">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div>
          <p className="hero-anim flex items-center gap-2 text-sm text-ink-2" style={delay(0)}>
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-accent" />
            Open to full-time roles and freelance projects
          </p>

          <h1
            className="hero-anim mt-8 text-[40px] font-normal leading-[1.08] tracking-[-0.02em] sm:text-[52px] xl:text-[64px]"
            style={delay(0.05)}
          >
            React developer who builds the interface and the API behind it
          </h1>

          <p className="hero-anim mt-6 max-w-xl text-lg leading-[1.7] text-ink-2" style={delay(0.1)}>
            Full stack intern at Varsha Info Services. I worked on four product features across React, the API behind
            them and an OpenAI integration.
          </p>

          <div className="hero-anim mt-10 flex flex-wrap gap-3" style={delay(0.15)}>
            <a href="#contact" className="btn btn-primary">
              Hire me
            </a>
            <a href={profile.resume} download className="btn btn-secondary">
              <DownloadIcon />
              Download resume
            </a>
          </div>
        </div>

        <figure className="hero-anim mx-auto w-full max-w-md lg:mx-0 lg:justify-self-end" style={delay(0.1)}>
          <div className="aspect-[4/5] overflow-hidden rounded-2xl border border-line bg-[var(--slot)]">
            <img
              src={profile.photo}
              alt={profile.photoAlt}
              width={400}
              height={500}
              className="h-full w-full object-cover"
            />
          </div>
          <figcaption className="mt-4 flex items-baseline justify-between gap-4 font-mono text-xs text-ink-3">
            <span>{profile.name}</span>
            <span>{profile.location}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
