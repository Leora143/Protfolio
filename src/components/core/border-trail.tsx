import { motion, type Transition } from "motion/react";
import { cn } from "@/lib/utils";

export type BorderTrailProps = {
  className?: string;
  size?: number;
  radius?: number;
  transition?: Transition;
  onAnimationComplete?: () => void;
  style?: React.CSSProperties;
};

export function BorderTrail({ className, size = 60, radius = 16, transition, onAnimationComplete, style }: BorderTrailProps) {
  const BASE_TRANSITION: Transition = { repeat: Infinity, duration: 5, ease: "linear" };

  return (
    <div
      aria-hidden="true"
      className="border-trail pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]"
    >
      <motion.div
        className={cn("absolute aspect-square bg-zinc-500", className)}
        style={{ width: size, offsetPath: `rect(0 auto auto 0 round ${radius}px)`, ...style }}
        animate={{ offsetDistance: ["0%", "100%"] }}
        transition={{ ...BASE_TRANSITION, ...transition }}
        onAnimationComplete={onAnimationComplete}
      />
    </div>
  );
}
