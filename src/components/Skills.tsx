import { skillGroups } from "../data/portfolio";
import CardFlip from "./kokonutui/card-flip";
import { groupIcons, skillIcon } from "./skillIcons";
import SectionHeading from "./SectionHeading";
import { Undo2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Skills() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [entered, setEntered] = useState(false);

  // Cards are always in the layout. When the grid scrolls into view they flip in from edge-on, one after another.
  useEffect(() => {
    const el = gridRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setEntered(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEntered(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="skills" className="scroll-mt-16 border-t border-line px-6 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="01" title="Skills" />
        <p className="mt-6 max-w-xl text-ink-2">Hover or tap a card to see what is inside.</p>

        <div ref={gridRef} className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3" style={{ perspective: 1400 }}>
          {skillGroups.map((group, i) => {
            const GroupIcon = groupIcons[group.title] ?? skillIcon(group.title);
            return (
              <div
                key={group.title}
                className="h-full"
                style={{
                  transform: entered ? "none" : "rotateY(90deg)",
                  transition: "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
                  transitionDelay: entered ? `${i * 100}ms` : "0ms",
                }}
              >
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
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}