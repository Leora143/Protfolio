import Reveal from "./Reveal";

interface SectionHeadingProps {
  index: string;
  title: string;
}

export default function SectionHeading({ index, title }: SectionHeadingProps) {
  return (
    <Reveal>
      <div className="flex items-baseline gap-4 border-b border-line pb-6">
        <span className="index">{index}</span>
        <h2 className="text-4xl font-normal leading-[1.1] tracking-[-0.02em] sm:text-5xl">{title}</h2>
      </div>
    </Reveal>
  );
}
