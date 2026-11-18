import { certifications, education } from "../data/portfolio";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Education() {
  return (
    <section id="education" className="scroll-mt-16 border-t border-line px-6 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="04" title="Education" />

        <div className="mt-10 grid items-start gap-12 lg:grid-cols-2">
          <Reveal className="h-full">
            <div className="card h-full p-6 sm:p-8">
              <p className="index">
                {education.period} · {education.grade}
              </p>
              <h3 className="mt-4 font-display text-2xl font-normal leading-[1.2] tracking-[-0.01em]">
                {education.degree}
              </h3>
              <p className="mt-2 text-ink-2">{education.school}</p>
              <p className="mt-8 text-sm text-ink-3">Relevant coursework</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {education.coursework.map((course) => (
                  <li key={course} className="tag">
                    {course}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={50}>
            <h3 className="font-display text-2xl font-normal tracking-[-0.01em]">Certifications</h3>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {certifications.map((cert) => (
                <li key={cert.title} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4">
                  <p className="font-medium">{cert.title}</p>
                  <p className="text-[15px] text-ink-2">{cert.issuer}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
