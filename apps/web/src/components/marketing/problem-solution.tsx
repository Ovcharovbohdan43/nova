import { Lock, Rocket, Wallet } from "lucide-react";

import { Reveal } from "@/components/marketing/reveal";

const pains = [
  {
    icon: Lock,
    title: "Platform lock-in",
    description:
      "Hosted builders own your stack. When you leave, the project doesn't come with you.",
  },
  {
    icon: Wallet,
    title: "Unpredictable AI bills",
    description:
      "Every prompt hits a premium model. Side projects shouldn't cost $40/month in tokens.",
  },
  {
    icon: Rocket,
    title: "Empty repo paralysis",
    description:
      "Scaffolding eats your motivation before you write the idea that matters.",
  },
];

const outcomes = [
  "Export ZIP or push to your GitHub — full ownership",
  "Smart Router picks cheap models for simple tasks",
  "Go from prompt to git-ready project in one session",
];

export function ProblemSolution() {
  return (
    <section className="border-y border-border/40 bg-muted/20 px-4 py-16 sm:px-6 lg:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Built for indie nights, not enterprise Mondays
            </h2>
            <ul className="mt-8 space-y-4">
              {pains.map((item, i) => (
                <Reveal
                  as="li"
                  key={item.title}
                  delay={i * 80}
                  className="group nova-card-interactive flex gap-4 rounded-xl border border-border/30 bg-card/20 p-4"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-destructive/10 text-destructive ring-1 ring-destructive/20 transition-all duration-500 group-hover:bg-destructive/15 group-hover:ring-destructive/40 group-hover:shadow-[0_0_16px_-4px_oklch(0.577_0.245_27.325_/_30%)]">
                    <item.icon
                      className="size-5 transition-transform duration-500 group-hover:scale-110"
                      aria-hidden
                    />
                  </span>
                  <div>
                    <h3 className="font-medium transition-colors duration-300 group-hover:text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground transition-all duration-500 group-hover:translate-y-[-1px]">
                      {item.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={150} className="flex flex-col justify-center">
            <p className="nova-highlight-label text-sm font-medium uppercase tracking-wider text-primary">
              The NOVA way
            </p>
            <ul className="mt-6 space-y-3">
              {outcomes.map((text, i) => (
                <Reveal
                  as="li"
                  key={text}
                  delay={200 + i * 80}
                  className="group nova-card-interactive flex items-start gap-3 rounded-xl border border-border/40 bg-background/40 p-4 text-base text-foreground"
                >
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary ring-4 ring-primary/20 transition-all duration-500 group-hover:ring-primary/40 group-hover:shadow-[0_0_12px_2px_oklch(0.78_0.14_195_/_35%)]" />
                  <span className="transition-all duration-500 group-hover:translate-x-0.5">
                    {text}
                  </span>
                </Reveal>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
