import { Coins, GitBranch, Route } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { HeroBackground } from "@/components/marketing/hero-background";
import { HeroTitle } from "@/components/marketing/hero-title";
import { WaitlistForm } from "@/components/marketing/waitlist-form";

const differentiators = [
  {
    icon: Coins,
    title: "Save tokens",
    description: "Simple tasks → local or cheap models. Premium only when needed.",
  },
  {
    icon: Route,
    title: "Smart routing",
    description: "Build bigger projects on the same budget — automatically.",
  },
  {
    icon: GitBranch,
    title: "You own the repo",
    description: "Export ZIP or push to GitHub. No platform lock-in.",
  },
];

export function Hero() {
  return (
    <section className="relative min-h-[92vh] overflow-hidden px-4 pb-16 pt-16 sm:px-6 sm:pt-24 lg:pb-24">
      <HeroBackground />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <Badge
          variant="outline"
          className="mb-6 border-primary/30 bg-primary/5 text-primary transition-colors hover:border-primary/50 hover:bg-primary/10"
        >
          Browser AI studio · Smart model routing
        </Badge>

        <HeroTitle />

        <p
          className="mx-auto mt-5 max-w-2xl animate-fade-up text-pretty text-lg leading-relaxed sm:text-xl"
          style={{ animationDelay: "1.45s" }}
        >
          NOVA is a browser-based AI dev studio that automatically chooses the
          cheapest model that can handle your task — so you build more and waste
          nothing on tokens.
        </p>

        <p
          className="mx-auto mt-4 max-w-xl animate-fade-up text-pretty text-sm text-muted-foreground sm:text-base"
          style={{ animationDelay: "1.6s" }}
        >
          Full repo workflow · BYOK-ready · Cost-aware AI built for indie
          developers
        </p>

        <div className="mx-auto mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
          {differentiators.map((item, i) => (
            <div
              key={item.title}
              className="group nova-card-interactive animate-fade-up rounded-xl border border-border/50 bg-card/30 p-4 text-left"
              style={{ animationDelay: `${0.15 + i * 0.1}s` }}
            >
              <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/20 transition-all duration-500 group-hover:bg-primary/20 group-hover:ring-primary/40 group-hover:shadow-[0_0_20px_-4px_oklch(0.78_0.14_195_/_40%)]">
                <item.icon
                  className="size-4 text-primary transition-transform duration-500 group-hover:scale-110"
                  aria-hidden
                />
              </span>
              <p className="mt-3 text-sm font-medium transition-colors duration-300 group-hover:text-foreground">
                {item.title}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground transition-all duration-500 group-hover:text-muted-foreground/90">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div id="waitlist" className="mx-auto mt-10 max-w-md text-left">
          <WaitlistForm intent="pro" source="hero" />
        </div>
      </div>
    </section>
  );
}
