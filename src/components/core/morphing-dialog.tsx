import {
  AnimatePresence,
  MotionConfig,
  motion,
  type Transition,
  type Variant,
} from "motion/react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface DialogContextType {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  uniqueId: string;
  triggerRef: RefObject<HTMLDivElement | null>;
}

const DialogContext = createContext<DialogContextType | null>(null);

function useDialog() {
  const ctx = useContext(DialogContext);
  if (!ctx) throw new Error("useDialog must be used within a MorphingDialog");
  return ctx;
}

export function MorphingDialog({ children, transition }: { children: ReactNode; transition?: Transition }) {
  const [isOpen, setIsOpen] = useState(false);
  const uniqueId = useId();
  const triggerRef = useRef<HTMLDivElement>(null);
  const value = useMemo(() => ({ isOpen, setIsOpen, uniqueId, triggerRef }), [isOpen, uniqueId]);

  return (
    <DialogContext.Provider value={value}>
      <MotionConfig transition={transition}>{children}</MotionConfig>
    </DialogContext.Provider>
  );
}

export function MorphingDialogTrigger({
  children,
  className,
  style,
  triggerRef,
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  triggerRef?: RefObject<HTMLDivElement>;
}) {
  const { setIsOpen, isOpen, uniqueId, triggerRef: ctxRef } = useDialog();

  const handleClick = useCallback(() => setIsOpen(!isOpen), [isOpen, setIsOpen]);
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        setIsOpen(!isOpen);
      }
    },
    [isOpen, setIsOpen],
  );

  return (
    <motion.div
      ref={(triggerRef as RefObject<HTMLDivElement>) ?? ctxRef}
      layoutId={`dialog-${uniqueId}`}
      className={cn("relative cursor-pointer", className)}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      style={style}
      role="button"
      tabIndex={0}
      aria-haspopup="dialog"
      aria-expanded={isOpen}
      aria-controls={`motion-ui-morphing-dialog-content-${uniqueId}`}
    >
      {children}
    </motion.div>
  );
}

export function MorphingDialogContent({
  children,
  className,
  style,
  labelledBy,
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  labelledBy?: string;
}) {
  const { setIsOpen, isOpen, uniqueId, triggerRef } = useDialog();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        return;
      }
      if (event.key !== "Tab" || !containerRef.current) return;
      const focusables = containerRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [setIsOpen]);

  useEffect(() => {
    const trigger = triggerRef.current;
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
      containerRef.current?.focus({ preventScroll: true });
    } else {
      document.body.classList.remove("overflow-hidden");
      trigger?.focus({ preventScroll: true });
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [isOpen, triggerRef]);

  return (
    <motion.div
      ref={containerRef}
      layoutId={`dialog-${uniqueId}`}
      className={cn("overflow-hidden outline-none", className)}
      style={style}
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy ?? `motion-ui-morphing-dialog-title-${uniqueId}`}
      id={`motion-ui-morphing-dialog-content-${uniqueId}`}
      tabIndex={-1}
    >
      {children}
    </motion.div>
  );
}

export function MorphingDialogContainer({ children }: { children: ReactNode }) {
  const { isOpen, uniqueId } = useDialog();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence initial={false} mode="sync">
      {isOpen && (
        <>
          <motion.div
            key={`backdrop-${uniqueId}`}
            className="fixed inset-0 z-[100] h-full w-full bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <div className="pointer-events-none fixed inset-0 z-[101] flex items-center justify-center p-4">{children}</div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
}

export function MorphingDialogTitle({ children, className }: { children: ReactNode; className?: string }) {
  const { uniqueId } = useDialog();
  return (
    <motion.div layoutId={`dialog-title-container-${uniqueId}`} className={className} layout>
      <span id={`motion-ui-morphing-dialog-title-${uniqueId}`} className="contents">
        {children}
      </span>
    </motion.div>
  );
}

export function MorphingDialogSubtitle({ children, className }: { children: ReactNode; className?: string }) {
  const { uniqueId } = useDialog();
  return (
    <motion.div layoutId={`dialog-subtitle-container-${uniqueId}`} className={className}>
      {children}
    </motion.div>
  );
}

export function MorphingDialogDescription({
  children,
  className,
  variants,
}: {
  children: ReactNode;
  className?: string;
  disableLayoutAnimation?: boolean;
  variants?: { initial: Variant; animate: Variant; exit: Variant };
}) {
  const { uniqueId } = useDialog();
  return (
    <motion.div
      key={`dialog-description-${uniqueId}`}
      className={className}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      id={`dialog-description-${uniqueId}`}
    >
      {children}
    </motion.div>
  );
}

export function MorphingDialogClose({ className }: { className?: string }) {
  const { setIsOpen, uniqueId } = useDialog();
  return (
    <motion.button
      type="button"
      onClick={() => setIsOpen(false)}
      className={cn("absolute right-4 top-4", className)}
      aria-label="Close dialog"
      key={`dialog-close-${uniqueId}`}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={{ initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }}
    >
      <X size={18} strokeWidth={1.5} />
    </motion.button>
  );
}
