import { earlierExperience, experience } from "../data/portfolio";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const spans = ["md:col-span-4", "md:col-span-2", "md:col-span-2", "md:col-span-4"];

export default function Experience() {
  const { role, company, period, highlights, episodes, stack } = experience;

  return (
    <section id="experience" className="scroll-mt-16 border-t border-line px-6 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="02" title="Experience" />

        <Reveal className="mt-10">
          <article className="card p-6 sm:p-8">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
              <div>
                <h3 className="font-display text-3xl font-normal leading-[1.15] tracking-[-0.01em]">{role}</h3>
                <p className="mt-1 text-ink-2">{company}</p>
              </div>
              <p className="index">{period}</p>
            </div>

            <ul className="mt-8 flex max-w-3xl flex-col gap-3 text-ink-2">
              {highlights.map((line) => (
                <li key={line} className="flex gap-3">
                  <span aria-hidden="true" className="mt-3 h-1 w-1 shrink-0 rounded-full bg-ink-3" />
                  {line}
                </li>
              ))}
            </ul>

            <ul className="mt-8 flex flex-wrap gap-2">
              {stack.map((tech) => (
                <li key={tech} className="tag">
                  {tech}
                </li>
              ))}
            </ul>
          </article>
        </Reveal>

        <Reveal className="mt-16">
          <h3 className="font-display text-2xl font-normal tracking-[-0.01em]">Features I worked on</h3>
        </Reveal>

        <div className="mt-6 grid gap-4 md:grid-cols-6">
          {episodes.map((episode, i) => (
            <Reveal key={episode.no} delay={(i % 2) * 50} className={`h-full ${spans[i % spans.length]}`}>
              <article className="card flex h-full flex-col p-6">
                <p className="index">{episode.no}</p>
                <h4 className="mt-4 text-xl font-medium">{episode.title}</h4>
                <p className="mt-2 text-[15px] leading-[1.65] text-ink-2">{episode.text}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12">
          <div className="grid gap-4 border-t border-line pt-8 md:grid-cols-[240px_1fr] md:gap-8">
            <div>
              <h3 className="font-medium">{earlierExperience.role}</h3>
              <p className="text-ink-2">{earlierExperience.company}</p>
            </div>
            <p className="max-w-xl text-ink-2">{earlierExperience.text}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
