import type { Metadata } from "next";
import Link from "next/link";

import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Privacy — ${brand.name}`,
};

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
        <h1 className="text-3xl font-semibold tracking-tight">Privacy Policy</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Last updated: July 6, 2026
        </p>
        <div className="prose prose-invert mt-8 max-w-none space-y-4 text-sm text-muted-foreground">
          <p>
            {brand.name} (&quot;we&quot;, &quot;us&quot;) collects your email
            address when you join the waitlist. We use it to notify you about
            product updates and beta access.
          </p>
          <p>
            We do not sell your personal data. You may request deletion by
            emailing support (address to be added).
          </p>
          <p>
            When the studio launches, project code will be stored in your
            connected accounts (e.g. GitHub) or exported files you control.
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
