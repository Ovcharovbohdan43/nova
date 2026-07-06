"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

const LINE_ONE = "Ship faster. ";
const LINE_TWO = "Spend less.";
const CHAR_MS = 42;
const PAUSE_MS = 280;

export function HeroTitle() {
  const [lineOneCount, setLineOneCount] = useState(0);
  const [lineTwoCount, setLineTwoCount] = useState(0);
  const [phase, setPhase] = useState<"line1" | "pause" | "line2" | "done">(
    "line1",
  );
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      const reduced = mq.matches;
      setReduceMotion(reduced);
      if (reduced) {
        setLineOneCount(LINE_ONE.length);
        setLineTwoCount(LINE_TWO.length);
        setPhase("done");
      }
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (reduceMotion || phase === "done") return;

    if (phase === "line1") {
      if (lineOneCount >= LINE_ONE.length) {
        setPhase("pause");
        return;
      }
      const timer = setTimeout(
        () => setLineOneCount((n) => n + 1),
        CHAR_MS,
      );
      return () => clearTimeout(timer);
    }

    if (phase === "pause") {
      const timer = setTimeout(() => setPhase("line2"), PAUSE_MS);
      return () => clearTimeout(timer);
    }

    if (phase === "line2") {
      if (lineTwoCount >= LINE_TWO.length) {
        setPhase("done");
        return;
      }
      const timer = setTimeout(
        () => setLineTwoCount((n) => n + 1),
        CHAR_MS,
      );
      return () => clearTimeout(timer);
    }
  }, [phase, lineOneCount, lineTwoCount, reduceMotion]);

  const showCursor = phase !== "done";

  return (
    <h1
      className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl"
      aria-label={`${LINE_ONE}${LINE_TWO}`}
    >
      <span aria-hidden>
        {LINE_ONE.slice(0, lineOneCount)}
        {lineTwoCount > 0 && (
          <span className="nova-hero-accent bg-gradient-to-r from-zinc-300 via-white to-zinc-400 bg-clip-text text-transparent">
            {LINE_TWO.slice(0, lineTwoCount)}
          </span>
        )}
        {showCursor && (
          <span
            className={cn(
              "nova-typewriter-cursor ml-0.5 inline-block font-normal text-zinc-500",
              phase === "pause" && "nova-typewriter-cursor-pause",
            )}
            aria-hidden
          >
            |
          </span>
        )}
      </span>
    </h1>
  );
}
