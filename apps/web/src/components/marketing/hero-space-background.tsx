"use client";

import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";

import { HeroSpaceScene } from "@/components/marketing/hero-space-scene";
import { cn } from "@/lib/utils";

export function HeroSpaceBackground() {
  const [ready, setReady] = useState(false);
  const [lowPower, setLowPower] = useState(false);
  const [staticFallback, setStaticFallback] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const narrow = window.innerWidth < 640;
    const coarse = window.matchMedia("(pointer: coarse)").matches;

    if (reduceMotion) {
      setStaticFallback(true);
      return;
    }

    setLowPower(narrow || coarse);
    setReady(true);
  }, []);

  if (staticFallback) {
    return (
      <div
        className="pointer-events-none absolute inset-0 -z-20"
        aria-hidden
      >
        <div className="absolute inset-0 bg-[#010208]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_100%,oklch(0_0_0_/_50%),transparent)]" />
      </div>
    );
  }

  if (!ready) {
    return (
      <div
        className="pointer-events-none absolute inset-0 -z-20 bg-[#050810]"
        aria-hidden
      />
    );
  }

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 -z-20 overflow-hidden",
        "opacity-0 transition-opacity duration-1000",
        ready && "opacity-100",
      )}
      aria-hidden
    >
      <Canvas
        camera={{ position: [0, 0, 9.5], fov: 52, near: 0.1, far: 100 }}
        dpr={[1, lowPower ? 1.25 : 1.75]}
        gl={{
          antialias: !lowPower,
          alpha: false,
          powerPreference: lowPower ? "low-power" : "high-performance",
        }}
        style={{ width: "100%", height: "100%" }}
      >
        <HeroSpaceScene lowPower={lowPower} />
      </Canvas>

      {/* Dark vignette — no colored glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/65 via-background/50 to-background/88" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_85%_at_50%_35%,transparent_5%,var(--background)_80%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_100%,oklch(0_0_0_/_35%),transparent_65%)]" />
      <div className="nova-grid absolute inset-0 opacity-[0.06]" />
    </div>
  );
}
