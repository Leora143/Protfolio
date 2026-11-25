import { Plus } from "lucide-react";
import {
  MorphingDialog,
  MorphingDialogClose,
  MorphingDialogContainer,
  MorphingDialogContent,
  MorphingDialogDescription,
  MorphingDialogSubtitle,
  MorphingDialogTitle,
  MorphingDialogTrigger,
} from "@/components/core/morphing-dialog";
import { projects } from "../data/portfolio";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { ExternalIcon, GithubIcon } from "./icons";

const linkClass =
  "inline-flex items-center gap-2 text-accent-text underline decoration-1 underline-offset-4 hover:decoration-2";

export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-16 border-t border-line px-6 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="03" title="Projects" />
        <p className="mt-6 max-w-xl text-ink-2">Open a project to read what it does and what it is built with.</p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal key={project.title} delay={(i % 2) * 50} className="h-full">
              <MorphingDialog transition={{ type: "spring", bounce: 0.05, duration: 0.3 }}>
                <MorphingDialogTrigger
                  style={{ borderRadius: 16 }}
                  className="card flex h-full min-h-[184px] flex-col justify-between p-6 transition-colors duration-150 hover:border-[color-mix(in_srgb,var(--ink)_28%,transparent)] sm:p-8"
                >
                  <span className="index">{String(i + 1).padStart(2, "0")}</span>
                  <div className="flex items-end justify-between gap-4">
                    <MorphingDialogTitle className="font-display text-2xl font-normal leading-[1.2] tracking-[-0.01em]">
                      {project.title}
                    </MorphingDialogTitle>
                    <span
                      aria-hidden="true"
                      className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-line text-ink-2"
                    >
                      <Plus size={16} strokeWidth={1.5} />
                    </span>
                  </div>
                </MorphingDialogTrigger>

                <MorphingDialogContainer>
                  <MorphingDialogContent
                    style={{ borderRadius: 24 }}
                    className="pointer-events-auto relative flex max-h-[85svh] w-full flex-col border border-line bg-card text-ink sm:w-[560px]"
                  >
                    <div className="overflow-y-auto p-6 sm:p-8">
                      <p className="index">{String(i + 1).padStart(2, "0")}</p>
                      <MorphingDialogTitle className="mt-4 pr-10 font-display text-3xl font-normal leading-[1.15] tracking-[-0.01em]">
                        {project.title}
                      </MorphingDialogTitle>
                      <MorphingDialogSubtitle className="mt-4">
                        <ul className="flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <li key={tag} className="tag">
                              {tag}
                            </li>
                          ))}
                        </ul>
                      </MorphingDialogSubtitle>
                      <MorphingDialogDescription
                        variants={{
                          initial: { opacity: 0, y: 16 },
                          animate: { opacity: 1, y: 0 },
                          exit: { opacity: 0, y: 16 },
                        }}
                      >
                        <p className="mt-6 leading-[1.7] text-ink-2">{project.text}</p>
                        {(project.demo || project.code) && (
                          <div className="mt-6 flex flex-wrap gap-6 text-sm font-medium">
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
                      </MorphingDialogDescription>
                    </div>
                    <MorphingDialogClose className="grid h-9 w-9 place-items-center rounded-lg border border-line text-ink-2 transition-colors duration-150 hover:bg-raise hover:text-ink" />
                  </MorphingDialogContent>
                </MorphingDialogContainer>
              </MorphingDialog>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}