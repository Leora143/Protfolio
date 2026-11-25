import { profile } from "../data/portfolio";
import { useActiveSection } from "../hooks/useActiveSection";
import type { Theme } from "../hooks/useTheme";
import MorphicNavbar from "./kokonutui/morphic-navbar";
import ThemeToggle from "./ThemeToggle";

const links = [
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
];
const ids = ["top", ...links.map((l) => l.id), "contact"];

interface NavbarProps {
  theme: Theme;
  onToggleTheme: () => void;
}

export default function Navbar({ theme, onToggleTheme }: NavbarProps) {
  const active = useActiveSection(ids);
  return (
    <MorphicNavbar
      brand={profile.name}
      links={links}
      active={active}
      cta={{ href: "#contact", label: "Hire me" }}
      actions={<ThemeToggle theme={theme} onToggle={onToggleTheme} />}
    />
  );
}
