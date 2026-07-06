import type { Metadata } from "next";
import Link from "next/link";

import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Terms — ${brand.name}`,
};

export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
        <h1 className="text-3xl font-semibold tracking-tight">Terms of Service</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Last updated: July 6, 2026
        </p>
        <div className="prose prose-invert mt-8 max-w-none space-y-4 text-sm text-muted-foreground">
          <p>
            By joining the {brand.name} waitlist, you agree to receive
            product-related emails. The service is in pre-release; features and
            pricing may change before general availability.
          </p>
          <p>
            AI-generated code is provided as-is. You are responsible for
            reviewing, testing, and deploying any code produced by the platform.
          </p>
          <p>
            Founding member pricing applies to waitlist signups who convert to
            paid plans within the offer window announced at launch.
          </p>
        </div>
        <Link
          href="/"
          className="mt-10 inline-block text-sm text-primary hover:underline"
        >
          ← Back to home
        </Link>
      </main>
      <SiteFooter />
    </>
  );
}
