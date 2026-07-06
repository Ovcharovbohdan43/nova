import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/marketing/reveal";
import { faqItems } from "@/lib/brand";

export function FaqSection() {
  return (
    <section id="faq" className="px-4 py-16 sm:px-6 lg:py-24">
      <div className="mx-auto max-w-2xl">
        <Reveal className="text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Questions
          </h2>
        </Reveal>
        <Accordion className="mt-10 w-full space-y-2">
          {faqItems.map((item, i) => (
            <Reveal key={item.question} delay={i * 60}>
              <AccordionItem
                value={`item-${i}`}
                className="group nova-card-interactive rounded-xl border border-border/40 bg-card/20 px-4 not-last:border-b"
              >
                <AccordionTrigger className="text-left transition-colors duration-300 hover:no-underline group-hover:text-foreground">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            </Reveal>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
