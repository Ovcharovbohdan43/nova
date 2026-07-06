import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { Hero } from "@/components/marketing/hero";
import { ProductDemo } from "@/components/marketing/product-demo";
import { ProblemSolution } from "@/components/marketing/problem-solution";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { RouterPreview } from "@/components/marketing/router-preview";
import { PricingPreview } from "@/components/marketing/pricing-preview";
import { RoadmapSection } from "@/components/marketing/roadmap";
import { FaqSection } from "@/components/marketing/faq";
import { FinalCta } from "@/components/marketing/final-cta";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <ProductDemo />
        <ProblemSolution />
        <HowItWorks />
        <RouterPreview />
        <PricingPreview />
        <RoadmapSection />
        <FaqSection />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
