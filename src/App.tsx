import { useState } from "react";
import DrapeBackground from "./components/kokonutui/drape-background";
import Intro from "./components/Intro";
import Contact from "./components/Contact";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import ScrollProgress from "./components/ScrollProgress";
import Skills from "./components/Skills";
import { useTheme } from "./hooks/useTheme";

export default function App() {
  const { theme, toggle } = useTheme();
  const [ready, setReady] = useState(false);
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-on-accent"
      >
        Skip to content
      </a>
      {!introDone && <Intro onReveal={() => setReady(true)} onDone={() => setIntroDone(true)} />}
      <DrapeBackground />
      <ScrollProgress />
      <Navbar theme={theme} onToggleTheme={toggle} />

      <main id="main">
        <Hero ready={ready} />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
