"use client";

import dynamic from "next/dynamic";

const HeroSpaceBackground = dynamic(
  () =>
    import("@/components/marketing/hero-space-background").then(
      (m) => m.HeroSpaceBackground,
    ),
  { ssr: false },
);

export function HeroBackground() {
  return <HeroSpaceBackground />;
}
