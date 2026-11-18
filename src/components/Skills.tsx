
import {
  PanelsTopLeft,
  Server,
  Database,
  Braces,
  ShieldCheck,
  Workflow,
  Code2,
  FileCode2,
  Globe,
  Palette,
  Layers,
  Zap,
  Component,
  Route,
  RefreshCw,
  ListChecks,
  Network,
  KeyRound,
  Send,
  Terminal,
  Table2,
  GitBranch,
  Bot,
  Search,
  Bug,
  TestTube,
  Rocket,
  BookOpen,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

import { skillGroups } from "../data/portfolio";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const groupIcons: Record<string, LucideIcon> = {
  Frontend: PanelsTopLeft,
  Backend: Server,
  Databases: Database,
  Languages: Braces,
  "AI & Security": ShieldCheck,
  Workflow: Workflow,
};

const skillIcons: Record<string, LucideIcon> = {
  "React.js": Component,
  "JavaScript (ES6+)": FileCode2,
  "TypeScript (basics)": FileCode2,
  HTML5: Globe,
  CSS3: Palette,
  "Tailwind CSS": Palette,
  Bootstrap: Layers,
  Vite: Zap,
  "React Hooks": Component,
  "React Router": Route,
  "TanStack Router": Route,
  "TanStack Query": RefreshCw,
  "TanStack Form": ListChecks,
  "Context API": Network,
  "Node.js": Server,
  "Express.js": Server,
  Hono: Zap,
  Bun: Zap,
  "REST APIs": Network,
  Axios: Send,
  "Fetch API": Globe,
  "JWT auth": KeyRound,
  Postman: Send,
  MongoDB: Database,
  Mongoose: Database,
  PostgreSQL: Database,
  MySQL: Table2,
  SQL: Table2,
  Prisma: Database,
  Redis: Database,
  Python: Code2,
  PHP: Code2,
  "OpenAI API": Bot,
  "AI-assisted development": Bot,
  "SIEM monitoring": Search,
  "Log analysis": Search,
  "Penetration testing": ShieldCheck,
  "Ethical hacking": ShieldCheck,
  Git: GitBranch,
  GitHub: GitBranch,
  "VS Code": Code2,
npm: Layers, 
 "Linux (basics)": Terminal,
  Debugging: Bug,
  Testing: TestTube,
  Deployment: Rocket,
  Agile: Workflow,
  "Technical documentation": BookOpen,
};



export default function Skills() {
  return (
    <section
      id="skills"
      className="scroll-mt-16 border-t border-line px-6 py-24 sm:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="01" title="Skills" />

        <div className="mt-10 divide-y divide-line">
          {skillGroups.map((group, i) => {
            const GroupIcon = groupIcons[group.title] || Code2;

            return (
              <Reveal key={group.title} delay={(i % 3) * 50}>
                <div className="grid gap-4 py-8 md:grid-cols-[240px_1fr] md:gap-8">
                  <div className="flex items-center gap-3">
                    <GroupIcon
                      size={17}
                      strokeWidth={1.5}
                      className="shrink-0 text-ink-2"
                    />
                    <h3 className="text-lg font-medium">
                      {group.title}
                    </h3>
                  </div>

                  <ul className="flex flex-wrap items-center gap-x-5 gap-y-3">
                    {group.items.map((item) => {
                      const SkillIcon = skillIcons[item] || Code2;

                      return (
                        <li
                          key={item}
                          className="group flex items-center gap-2 text-ink-2 transition-colors duration-200 hover:text-ink"
                        >
                          <SkillIcon
                            size={20}
                            strokeWidth={1.5}
                            className="shrink-0 opacity-60 transition-opacity group-hover:opacity-100"
                          />
                          <span className="text-[15px]">
                            {item}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
