import { skillGroups } from "../data/portfolio";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-16 border-t border-line px-6 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="01" title="Skills" />

        <div className="mt-10 divide-y divide-line">
          {skillGroups.map((group, i) => (
            <Reveal key={group.title} delay={(i % 3) * 50}>
              <div className="grid gap-4 py-8 md:grid-cols-[240px_1fr] md:gap-8">
                <h3 className="text-lg font-medium">{group.title}</h3>
                <ul className="sep flex flex-wrap gap-y-2 text-ink-2">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
