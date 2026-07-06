import Link from "next/link";

import { LogoMark } from "@/components/brand/logo-mark";
import { brand } from "@/lib/brand";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="group flex items-center gap-2.5 transition-opacity hover:opacity-90"
        >
          <LogoMark
            size="lg"
            className="transition-transform duration-300 group-hover:scale-105"
          />
          <span className="font-semibold tracking-tight">
            {brand.shortName}
            <span className="text-muted-foreground font-normal">
              {" "}
              AI Studio
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#how" className="nova-nav-link hover:text-foreground">
            How it works
          </a>
          <a href="#pricing" className="nova-nav-link hover:text-foreground">
            Pricing
          </a>
          <a href="#roadmap" className="nova-nav-link hover:text-foreground">
            Roadmap
          </a>
          <a href="#faq" className="nova-nav-link hover:text-foreground">
            FAQ
          </a>
        </nav>

        <Button asChild size="sm" className="hidden sm:inline-flex">
          <a href="#waitlist">Join waitlist</a>
        </Button>
      </div>
    </header>
  );
}
