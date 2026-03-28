import { cn } from "@/lib/utils";

interface AnswerSummaryProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Short answer summary block for AI-search readability.
 * Place at the top of pages to provide a quick, parseable answer.
 */
export function AnswerSummary({ children, className }: AnswerSummaryProps) {
  return (
    <div
      className={cn(
        "p-5 rounded-xl border-l-4 border-primary bg-accent/50 text-sm text-foreground leading-relaxed",
        className
      )}
      role="region"
      aria-label="Riepilogo"
    >
      {children}
    </div>
  );
}
