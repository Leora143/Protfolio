import { useState, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardFlipProps {
  front: ReactNode;
  back: ReactNode;
  label: string;
  className?: string;
  /** Show the back from outside (for example while scrolling). Hover and tap still work. */
  showBack?: boolean;
  /** Stagger, in ms, applied to the flip. */
  delay?: number;
}

/** Two-faced card. Hover flips it on pointer devices, click, tap or Enter/Space pins it. */
export default function CardFlip({ front, back, label, className, showBack = false, delay = 0 }: CardFlipProps) {
  const [hover, setHover] = useState(false);
  const [pinned, setPinned] = useState(false);
  const flipped = showBack !== (hover || pinned); // hover or tap flips the opposite side

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setPinned((v) => !v);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={pinned}
      aria-label={`${label}, flip card`}
      onClick={() => setPinned((v) => !v)}
      onKeyDown={onKeyDown}
      onPointerEnter={(e) => e.pointerType === "mouse" && setHover(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setHover(false)}
      className={cn("flip group cursor-pointer rounded-2xl outline-offset-4", flipped && "is-flipped", className)}
    >
      <div className="flip-inner" style={{ transitionDelay: `${delay}ms` }}>
        <div className="flip-face flip-front" aria-hidden={flipped}>
          {front}
        </div>
        <div className="flip-face flip-back" aria-hidden={!flipped}>
          {back}
        </div>
      </div>
    </div>
  );
}