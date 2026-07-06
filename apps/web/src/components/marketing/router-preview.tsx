import { Cpu, Sparkles, Zap } from "lucide-react";

import { Reveal } from "@/components/marketing/reveal";

const routes = [
  {
    icon: Cpu,
    level: "Low complexity",
    tasks: "Autocomplete, formatting, lint fixes",
    model: "Ollama / local",
    cost: "~$0",
  },
  {
    icon: Zap,
    level: "Medium",
    tasks: "Explain code, simple refactors",
    model: "Gemini · Groq · Haiku",
    cost: "Low",
  },
  {
    icon: Sparkles,
    level: "High complexity",
    tasks: "Architecture, large refactors",
    model: "GPT-4 · Claude Opus",
    cost: "Premium",
  },
];

export function RouterPreview() {
  return (
    <section className="relative overflow-hidden border-y border-border/40 bg-muted/20 px-4 py-16 sm:px-6 lg:py-24">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-72 w-96 -translate-x-1/2 rounded-full bg-primary/8 blur-[100px]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-5xl">
        <Reveal className="max-w-2xl">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Smart AI Router
          </h2>
          <p className="mt-3 text-muted-foreground">
            You don&apos;t pick models — NOVA does. Every request is analyzed for
            complexity, cost, and latency before a single token is spent.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {routes.map((route, i) => (
            <Reveal key={route.level} delay={i * 100}>
              <div className="group nova-card-interactive h-full rounded-xl border border-border/50 bg-background/60 p-5">
                <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/20 transition-all duration-500 group-hover:bg-primary/20 group-hover:shadow-[0_0_20px_-4px_oklch(0.78_0.14_195_/_40%)]">
                  <route.icon
                    className="size-5 text-primary transition-transform duration-500 group-hover:scale-110"
                    aria-hidden
                  />
                </span>
                <p className="nova-highlight-label mt-3 text-sm font-medium text-primary">
                  {route.level}
                </p>
                <p className="mt-2 text-sm text-muted-foreground transition-colors duration-300 group-hover:text-foreground/80">
                  {route.tasks}
                </p>
                <div className="mt-4 flex items-end justify-between border-t border-border/40 pt-4 transition-colors duration-300 group-hover:border-primary/20">
                  <span className="font-mono text-xs text-foreground">
                    {route.model}
                  </span>
                  <span className="rounded-full border border-primary/20 bg-primary/10 px-2 py-0.5 text-xs text-primary transition-all duration-500 group-hover:border-primary/40 group-hover:bg-primary/20 group-hover:shadow-[0_0_12px_-2px_oklch(0.78_0.14_195_/_40%)]">
                    {route.cost}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={350} className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Execution Guard blocks over-budget requests. Budget dashboard on Pro.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
