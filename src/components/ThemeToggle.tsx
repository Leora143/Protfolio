import type { Theme } from "../hooks/useTheme";
import { MoonIcon, SunIcon } from "./icons";

interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
}

export default function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const dark = theme === "dark";
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={dark}
      className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-line text-ink-2 transition-colors duration-150 hover:bg-raise hover:text-ink"
    >
      {dark ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}
