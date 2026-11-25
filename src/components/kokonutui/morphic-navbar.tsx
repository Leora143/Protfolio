import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";
import { Menu, X } from "lucide-react";

export interface MorphicLink {
  id: string;
  label: string;
}

interface MorphicNavbarProps {
  brand: string;
  links: MorphicLink[];
  active: string;
  actions: ReactNode;
  cta: { href: string; label: string };
}

/**
 * Floating pill. At the top of the page it shows every link. Once you scroll it
 * folds down to the brand and the current section, and opens again on hover or focus.
 */
export default function MorphicNavbar({ brand, links, active, actions, cta }: MorphicNavbarProps) {
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [engaged, setEngaged] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 120);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const expanded = !scrolled || engaged;
  const current = links.find((l) => l.id === active)?.label ?? "Top";
  const t = reduce ? { duration: 0 } : { type: "spring" as const, bounce: 0.12, duration: 0.5 };

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex flex-col items-center px-4">
      {/* Desktop */}
      <motion.nav
        layout
        transition={t}
        style={{ borderRadius: 999 }}
        aria-label="Main"
        onPointerEnter={(e) => e.pointerType === "mouse" && setEngaged(true)}
        onPointerLeave={() => setEngaged(false)}
        onFocus={() => setEngaged(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) setEngaged(false);
        }}
        className="hidden h-12 items-center gap-1 border border-line bg-[var(--nav)] pl-5 pr-1.5 shadow-[0_8px_24px_-12px_rgb(0_0_0/0.5)] md:flex"
      >
        <motion.a layout="position" transition={t} href="#top" aria-label={`${brand}, back to top`} className="mr-2 whitespace-nowrap font-display text-lg font-medium tracking-[-0.01em]">
          {brand}
        </motion.a>

        <AnimatePresence mode="popLayout" initial={false}>
          {expanded ? (
            <motion.ul
              key="links"
              layout="position"
              transition={t}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center"
            >
              {links.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    aria-current={active === link.id ? "true" : undefined}
                    className="block rounded-full px-3.5 py-2 text-[15px] text-ink-2 transition-colors duration-150 hover:text-ink aria-[current=true]:bg-raise aria-[current=true]:text-ink"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </motion.ul>
          ) : (
            <motion.span
              key="current"
              layout="position"
              transition={t}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mx-2 whitespace-nowrap rounded-full bg-raise px-3.5 py-2 text-[15px] text-ink"
            >
              {current}
            </motion.span>
          )}
        </AnimatePresence>

        <motion.div layout="position" transition={t} className="ml-1 flex items-center gap-1.5">
          {actions}
          {expanded && (
            <a href={cta.href} className="btn btn-primary btn-sm !rounded-full">
              {cta.label}
            </a>
          )}
        </motion.div>
      </motion.nav>

      {/* Mobile */}
      <div className="w-full max-w-md md:hidden">
        <div className="flex h-12 items-center justify-between rounded-full border border-line bg-[var(--nav)] pl-5 pr-1.5">
          <a href="#top" aria-label={`${brand}, back to top`} className="font-display text-lg font-medium">
            {brand}
          </a>
          <div className="flex items-center gap-1.5">
            {actions}
            <button
              type="button"
              onClick={() => setMenu((v) => !v)}
              aria-expanded={menu}
              aria-controls="mobile-menu"
              aria-label={menu ? "Close menu" : "Open menu"}
              className="grid h-9 w-9 place-items-center rounded-full border border-line text-ink-2 transition-colors duration-150 hover:bg-raise hover:text-ink"
            >
              {menu ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
            </button>
          </div>
        </div>

        {menu && (
          <div id="mobile-menu" className="mt-2 rounded-2xl border border-line bg-[var(--nav)] p-2">
            <ul className="flex flex-col">
              {links.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={() => setMenu(false)}
                    className="block rounded-xl px-4 py-3 text-ink-2 transition-colors duration-150 hover:bg-raise hover:text-ink"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="p-2">
                <a href={cta.href} onClick={() => setMenu(false)} className="btn btn-primary w-full">
                  {cta.label}
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
