import { Reveal } from "@/components/marketing/reveal";
import { WaitlistForm } from "@/components/marketing/waitlist-form";

export function FinalCta() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:py-24">
      <Reveal>
        <div className="nova-cta-panel mx-auto max-w-2xl rounded-2xl border border-primary/30 bg-gradient-to-b from-primary/10 to-transparent p-8 text-center sm:p-12">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Be first in the studio
        </h2>
        <p className="mt-3 text-muted-foreground">
          Join the waitlist for early access and founding member pricing on Pro.
        </p>
        <div className="mx-auto mt-8 max-w-md text-left">
          <WaitlistForm intent="pro" source="footer-cta" />
        </div>
        </div>
      </Reveal>
    </section>
  );
}
