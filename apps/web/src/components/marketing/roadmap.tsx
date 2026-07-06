"use client";

import { useEffect, useRef, useState } from "react";

import { roadmap } from "@/lib/brand";
import { cn } from "@/lib/utils";

export function RoadmapSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -60px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="roadmap"
      className={cn(
        "nova-roadmap-section relative overflow-hidden border-y border-border/40 bg-muted/20 px-4 py-16 sm:px-6 lg:py-24",
        inView && "nova-roadmap-in-view",
      )}
    >
      <div
        className="pointer-events-none absolute right-0 top-1/4 h-64 w-64 rounded-full bg-primary/10 blur-[100px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-48 w-48 rounded-full bg-sky-400/5 blur-[80px]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-3xl">
        <div className="text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Transparent roadmap
          </h2>
          <p className="mt-3 text-muted-foreground">
            We&apos;re building in public. Waitlist members shape priority.
          </p>
        </div>

        <ol className="relative mt-14 space-y-0">
          <div
            className="nova-roadmap-track absolute left-[11px] top-3 bottom-3 w-0.5 md:left-1/2 md:-translate-x-px"
            aria-hidden
          />
          <div
            className="nova-roadmap-track-glow absolute left-[11px] top-3 bottom-3 w-px md:left-1/2 md:-translate-x-px"
            aria-hidden
          />

          {roadmap.map((item, index) => (
            <li
              key={item.title}
              className={cn(
                "nova-roadmap-item relative flex gap-6 pb-10 md:gap-0",
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse",
              )}
              style={{ "--nova-roadmap-delay": `${index * 150}ms` } as React.CSSProperties}
            >
              <div className="hidden flex-1 md:block" />

              <div
                className={cn(
                  "nova-roadmap-dot relative z-10 flex size-6 shrink-0 items-center justify-center rounded-full ring-4 ring-background transition-all duration-500",
                  item.status === "active"
                    ? "nova-roadmap-dot-active bg-primary shadow-[0_0_20px_-2px_oklch(0.78_0.14_195_/_60%)]"
                    : "bg-muted-foreground/30",
                )}
              >
                <span className="sr-only">{item.status}</span>
                {item.status === "active" && (
                  <span className="size-2 rounded-full bg-primary-foreground" />
                )}
              </div>

              <div className="flex-1 md:px-8">
                <div
                  className={cn(
                    "group nova-card-interactive nova-roadmap-card rounded-xl border p-4 transition-all duration-500",
                    item.status === "active"
                      ? "border-primary/40 bg-primary/5 shadow-[0_0_32px_-8px_oklch(0.78_0.14_195_/_35%)]"
                      : "border-border/30 bg-card/20 md:border-border/30",
                  )}
                >
                  <p className="nova-highlight-label font-mono text-xs text-primary">
                    {item.phase}
                  </p>
                  <h3 className="mt-1 font-medium transition-colors duration-300 group-hover:text-foreground">
                    {item.title}
                  </h3>
                  {item.status === "active" && (
                    <p className="nova-roadmap-active-badge mt-2 inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-xs text-primary">
                      You are here
                    </p>
                  )}
                  {item.status === "upcoming" && (
                    <p className="mt-2 text-sm text-muted-foreground opacity-60 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      On the horizon
                    </p>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
