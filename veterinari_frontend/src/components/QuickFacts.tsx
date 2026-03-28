import { cn } from "@/lib/utils";

interface QuickFact {
  label: string;
  value: string;
}

interface QuickFactsProps {
  facts: QuickFact[];
  className?: string;
}

/**
 * Quick facts box — structured key-value data for easy scanning by users and AI.
 */
export function QuickFacts({ facts, className }: QuickFactsProps) {
  if (!facts.length) return null;
  return (
    <div
      className={cn("rounded-xl border border-border bg-card overflow-hidden", className)}
      role="region"
      aria-label="Informazioni rapide"
    >
      <div className="px-5 py-3 bg-muted/50 border-b border-border">
        <h3 className="text-sm font-semibold text-foreground">Informazioni rapide</h3>
      </div>
      <dl className="divide-y divide-border">
        {facts.map((f, i) => (
          <div key={i} className="flex justify-between gap-4 px-5 py-3 text-sm">
            <dt className="text-muted-foreground flex-shrink-0">{f.label}</dt>
            <dd className="font-medium text-foreground text-right">{f.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
