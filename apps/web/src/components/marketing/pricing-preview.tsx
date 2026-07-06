import { Check } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Reveal } from "@/components/marketing/reveal";
import { WaitlistForm } from "@/components/marketing/waitlist-form";
import { pricingTiers } from "@/lib/brand";
import { cn } from "@/lib/utils";

export function PricingPreview() {
  return (
    <section id="pricing" className="nova-section-glow px-4 py-16 sm:px-6 lg:py-24">
      <div className="relative mx-auto max-w-5xl">
        <Reveal className="text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Pricing that respects indie budgets
          </h2>
          <p className="mt-3 text-muted-foreground">
            Start free with local models. Upgrade when you need the full router.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {pricingTiers.map((tier, i) => (
            <Reveal key={tier.id} delay={i * 120}>
              <Card
                className={cn(
                  "group nova-card-interactive relative flex h-full flex-col border-border/60 bg-card/40",
                  tier.highlighted &&
                    "nova-card-glow border-primary/40 ring-1 ring-primary/20",
                )}
              >
                {tier.highlighted && "badge" in tier && tier.badge && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground shadow-[0_0_20px_-4px_oklch(0.78_0.14_195_/_50%)]">
                    {tier.badge}
                  </Badge>
                )}
                <CardHeader>
                  <CardTitle className="transition-colors duration-300 group-hover:text-foreground">
                    {tier.name}
                  </CardTitle>
                  <CardDescription>{tier.description}</CardDescription>
                  <p className="pt-2">
                    <span className="text-3xl font-semibold transition-all duration-500 group-hover:text-primary">
                      {tier.price}
                    </span>
                    <span className="text-muted-foreground">{tier.period}</span>
                  </p>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2.5">
                    {tier.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-sm text-muted-foreground transition-all duration-300 group-hover:translate-x-0.5"
                      >
                        <Check className="mt-0.5 size-4 shrink-0 text-primary transition-transform duration-500 group-hover:scale-110" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <WaitlistForm
                    intent={tier.id as "free" | "pro" | "team"}
                    source={`pricing-${tier.id}`}
                    compact
                  />
                </CardFooter>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
