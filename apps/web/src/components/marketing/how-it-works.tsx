import { Download, MessageCircle, Wand2 } from "lucide-react";

import { Reveal } from "@/components/marketing/reveal";

const steps = [
  {
    icon: MessageCircle,
    step: "01",
    title: "Describe your idea",
    description:
      "Tell NOVA what you're building — a micro-SaaS, landing, API, or full app. No config.yaml required to start.",
  },
  {
    icon: Wand2,
    step: "02",
    title: "Agent builds in the studio",
    description:
      "Watch files appear in a real workspace. Edit in Monaco or steer via chat. Smart Router controls model cost.",
  },
  {
    icon: Download,
    step: "03",
    title: "Export & continue locally",
    description:
      "Download ZIP or push to GitHub. Open in VS Code tomorrow. Your repo, your keys, your deployment.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="nova-section-glow px-4 py-16 sm:px-6 lg:py-24">
      <div className="relative mx-auto max-w-5xl">
        <Reveal className="text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Three steps. One evening.
          </h2>
          <p className="mt-3 text-muted-foreground">
            From idea to repository without leaving the browser.
          </p>
        </Reveal>

        <ol className="mt-14 grid gap-8 md:grid-cols-3">
          {steps.map((item, i) => (
            <Reveal key={item.step} as="li" delay={i * 120}>
              <div className="group nova-card-interactive h-full rounded-2xl border border-border/50 bg-card/40 p-6 ring-1 ring-white/5">
                <span className="nova-highlight-label font-mono text-xs text-primary">
                  {item.step}
                </span>
                <span className="mt-4 flex size-11 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/20 transition-all duration-500 group-hover:bg-primary/20 group-hover:ring-primary/35 group-hover:shadow-[0_0_24px_-6px_oklch(0.78_0.14_195_/_45%)]">
                  <item.icon
                    className="size-5 text-primary/90 transition-all duration-500 group-hover:scale-110 group-hover:text-primary"
                    aria-hidden
                  />
                </span>
                <h3 className="mt-4 text-lg font-medium transition-colors duration-300 group-hover:text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground transition-all duration-500 group-hover:translate-y-[-1px]">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
