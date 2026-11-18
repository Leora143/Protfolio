import { profile } from "../data/portfolio";
import { ArrowUpIcon } from "./icons";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-bg">
      <div className="px-6 py-8 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-medium">{profile.name}</p>
            <p className="text-sm text-ink-3">React developer · Built with React, TypeScript and Tailwind CSS</p>
          </div>
          <a
            href="#top"
            className="inline-flex h-9 items-center gap-2 rounded-lg border border-line px-4 text-sm text-ink-2 transition-colors duration-150 hover:bg-raise hover:text-ink"
          >
            <ArrowUpIcon />
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
