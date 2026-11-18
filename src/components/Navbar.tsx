import { useState } from "react";
import { profile } from "../data/portfolio";
import { useActiveSection } from "../hooks/useActiveSection";
import type { Theme } from "../hooks/useTheme";
import ThemeToggle from "./ThemeToggle";
import { CloseIcon, MenuIcon } from "./icons";

const links = [
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
];
const ids = ["top", ...links.map((l) => l.id)];

interface NavbarProps {
  theme: Theme;
  onToggleTheme: () => void;
}

export default function Navbar({ theme, onToggleTheme }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const active = useActiveSection(ids);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-bg/95">
      <div className="px-6 sm:px-8">
        <div className="mx-auto grid h-16 max-w-6xl grid-cols-[1fr_auto] items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
          <a
            href="#top"
            aria-label={`${profile.name}, back to top`}
            className="justify-self-start font-display text-xl font-medium tracking-[-0.01em]"
          >
            {profile.name}
          </a>

          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {links.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    aria-current={active === link.id ? "true" : undefined}
                    className="block rounded-lg px-4 py-2 text-[15px] text-ink-2 transition-colors duration-150 hover:text-ink aria-[current=true]:bg-raise aria-[current=true]:text-ink"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2 justify-self-end">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            <a href="#contact" className="btn btn-primary btn-sm hidden sm:inline-flex">
              Hire me
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid h-10 w-10 place-items-center rounded-lg border border-line text-ink-2 transition-colors duration-150 hover:bg-raise hover:text-ink md:hidden"
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" className="border-t border-line bg-bg px-6 py-4 sm:px-8 md:hidden">
          <ul className="flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 text-ink-2 transition-colors duration-150 hover:bg-raise hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-4">
              <a href="#contact" onClick={() => setOpen(false)} className="btn btn-primary w-full">
                Hire me
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
