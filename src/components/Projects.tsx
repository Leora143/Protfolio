import { projects } from "../data/portfolio";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { ExternalIcon, GithubIcon } from "./icons";

const linkClass =
  "inline-flex items-center gap-2 text-accent underline decoration-1 underline-offset-4 hover:decoration-2";

export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-16 border-t border-line px-6 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="03" title="Projects" />

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {projects.map((project, i) => {
            const lead = i === 0;
            return (
              <Reveal
                key={project.title}
                delay={lead ? 0 : (i - 1) * 50}
                className={`h-full ${lead ? "md:col-span-3" : ""}`}
              >
                <article
                  className={`card flex h-full flex-col p-6 ${
                    lead ? "gap-6 md:flex-row md:items-end md:justify-between md:p-8" : ""
                  }`}
                >
                  <div className="flex-1">
                    <h3
                      className={
                        lead
                          ? "font-display text-3xl font-normal leading-[1.15] tracking-[-0.01em]"
                          : "text-xl font-medium"
                      }
                    >
                      {project.title}
                    </h3>
                    <p className={`mt-3 leading-[1.65] text-ink-2 ${lead ? "max-w-2xl" : "text-[15px]"}`}>
                      {project.text}
                    </p>
                  </div>

                  <div className={lead ? "md:max-w-xs" : "mt-6"}>
                    <ul className={`flex flex-wrap gap-2 ${lead ? "md:justify-end" : ""}`}>
                      {project.tags.map((tag) => (
                        <li key={tag} className="tag">
                          {tag}
                        </li>
                      ))}
                    </ul>

                    {(project.demo || project.code) && (
                      <div className={`mt-6 flex flex-wrap gap-6 text-sm font-medium ${lead ? "md:justify-end" : ""}`}>
                        {project.demo && (
                          <a href={project.demo} target="_blank" rel="noreferrer" className={linkClass}>
                            <ExternalIcon />
                            Live demo
                          </a>
                        )}
                        {project.code && (
                          <a href={project.code} target="_blank" rel="noreferrer" className={linkClass}>
                            <GithubIcon />
                            Code
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
