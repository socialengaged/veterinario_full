import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqItem {
  q: string;
  a: string;
}

interface FaqSectionProps {
  items: FaqItem[];
  title?: string;
}

export function FaqSection({ items, title = "Domande frequenti" }: FaqSectionProps) {
  if (!items.length) return null;
  return (
    <div>
      <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">{title}</h2>
      <Accordion type="single" collapsible className="space-y-3">
        {items.map((faq, i) => (
          <AccordionItem key={i} value={`faq-${i}`} className="border border-border rounded-xl px-5 bg-card">
            <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary py-4">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
