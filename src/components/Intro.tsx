import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { TextEffect } from "@/components/core/text-effect";

interface IntroProps {
  /** The curtain has started to lift, the page can begin its entrance. */
  onReveal: () => void;
  /** The curtain is gone. */
  onDone: () => void;
}

/** Black screen, "Me?" types in, then the screen lifts away. About two seconds, every visit. */
export default function Intro({ onReveal, onDone }: IntroProps) {
  const reduce = useReducedMotion();
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";

    const liftAt = reduce ? 1000 : 1350;
    const doneAt = reduce ? 1350 : 2100;
    const lift = window.setTimeout(() => {
      setLeaving(true);
      onReveal();
    }, liftAt);
    const done = window.setTimeout(() => {
      root.style.overflow = previous;
      onDone();
    }, doneAt);

    return () => {
      window.clearTimeout(lift);
      window.clearTimeout(done);
      root.style.overflow = previous;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-0 z-[300] grid place-items-center bg-black"
      initial={false}
      animate={reduce ? { opacity: leaving ? 0 : 1 } : { y: leaving ? "-100%" : "0%" }}
      transition={reduce ? { duration: 0.3 } : { duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
    >
      {reduce ? (
        <p className="font-display text-[clamp(96px,22vw,280px)] font-normal leading-none tracking-[-0.03em] text-[#f4ebdd]">Me?</p>
      ) : (
        <TextEffect
          as="p"
          per="char"
          preset="fade-in-blur"
          speedReveal={1.2}
          delay={0.15}
          className="font-display text-[clamp(96px,22vw,280px)] font-normal leading-none tracking-[-0.03em] text-[#f4ebdd]"
        >
          Me?
        </TextEffect>
      )}
    </motion.div>
  );
}
