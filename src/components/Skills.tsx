import { skillGroups } from "../data/portfolio";
import CardFlip from "./kokonutui/card-flip";
import { groupIcons, skillIcon } from "./skillIcons";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { Undo2 } from "lucide-react";

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-16 border-t border-line px-6 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="01" title="Skills" />
        <p className="mt-6 max-w-xl text-ink-2">Hover or tap a card to see what is inside.</p>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => {
            const GroupIcon = groupIcons[group.title] ?? skillIcon(group.title);
            return (
              <Reveal key={group.title} delay={(i % 3) * 50} className="h-full">
                <CardFlip
                  label={group.title}
                  className="h-full"
                  front={
                    <div className="flex h-full flex-col justify-between p-6 sm:p-8">
                      <div className="flex items-start justify-between">
                        <span className="index">{String(i + 1).padStart(2, "0")}</span>
                        <GroupIcon size={28} className="text-ink-3" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="font-display text-4xl font-normal leading-[1.1] tracking-[-0.02em]">{group.title}</h3>
                        <p className="mt-2 text-sm text-ink-3 tabular-nums">{group.items.length} skills</p>
                      </div>
                    </div>
                  }
                  back={
                    <div className="flex h-full flex-col p-6 sm:p-8">
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-medium">{group.title}</h3>
                        <Undo2 size={16} strokeWidth={1.5} className="text-[var(--on-back-2)]" aria-hidden="true" />
                      </div>
                      <ul className="mt-5 grid grid-cols-2 content-start gap-x-4 gap-y-3 text-[14px] leading-tight">
                        {group.items.map((item) => {
                          const Icon = skillIcon(item);
                          return (
                            <li key={item} className="flex items-start gap-2.5">
                              <Icon size={16} className="mt-px shrink-0 text-[var(--on-back-2)]" aria-hidden="true" />
                              <span>{item}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  }
                />
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
