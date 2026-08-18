import type { ExperienceItem, ProcessStep } from "@/types";
import { FadeIn } from "@/components/motion/fade-in";

type TimelineProps = {
  items: ExperienceItem[] | ProcessStep[];
  variant?: "experience" | "process";
};

function isExperience(
  item: ExperienceItem | ProcessStep,
): item is ExperienceItem {
  return "org" in item;
}

export function Timeline({ items, variant = "process" }: TimelineProps) {
  return (
    <ol className="space-y-0 border-l border-border">
      {items.map((item, index) => (
        <FadeIn key={item.id} delay={index * 0.05}>
          <li className="relative ml-6 pb-10 last:pb-0 sm:ml-8">
            <span
              className="absolute -left-[1.9rem] top-1.5 h-2.5 w-2.5 rounded-full bg-accent sm:-left-[2.15rem]"
              aria-hidden
            />
            {isExperience(item) ? (
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.16em] text-foreground-subtle">
                  {item.period}
                </p>
                <h3 className="text-lg text-foreground">
                  {item.role}
                  <span className="text-foreground-muted"> — {item.org}</span>
                </h3>
                <p className="max-w-2xl text-sm leading-relaxed text-foreground-muted">
                  {item.summary}
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.16em] text-foreground-subtle">
                  {variant === "process" ? `Step ${index + 1}` : null}
                </p>
                <h3 className="text-lg text-foreground">{item.title}</h3>
                <p className="max-w-2xl text-sm leading-relaxed text-foreground-muted">
                  {item.description}
                </p>
              </div>
            )}
          </li>
        </FadeIn>
      ))}
    </ol>
  );
}
