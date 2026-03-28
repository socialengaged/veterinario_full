import { cn } from "@/lib/utils";

interface AnimalCardProps {
  emoji: string;
  label: string;
  className?: string;
  onClick?: () => void;
}

export function AnimalCard({ emoji, label, className, onClick }: AnimalCardProps) {
  return (
    <article
      onClick={onClick}
      className={cn(
        "group flex flex-col items-center gap-3 p-6 rounded-xl border border-border bg-card hover:shadow-lg hover:border-primary/20 transition-all duration-300 cursor-pointer",
        className
      )}
    >
      <span className="text-5xl group-hover:scale-110 transition-transform duration-300" aria-hidden="true">{emoji}</span>
      <h3 className="font-display font-semibold text-foreground">{label}</h3>
    </article>
  );
}
