import { cn } from "@/lib/utils";

/**
 * Fabric folds hanging from the top of the page. Built from layered
 * repeating gradients with different periods so the pleats never line up.
 * Colours come from --fold-a (lit side) and --fold-b (shadow side).
 */
export default function DrapeBackground({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("drape pointer-events-none fixed inset-0 -z-10 overflow-hidden", className)}>
      <div className="drape-sway absolute -inset-x-[6%] inset-y-0" />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[var(--bg)] to-transparent opacity-60" />
    </div>
  );
}
