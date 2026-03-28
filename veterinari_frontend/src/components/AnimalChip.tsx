import { cn } from "@/lib/utils";

interface AnimalChipProps {
  emoji: string;
  label: string;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

export function AnimalChip({ emoji, label, selected, onClick, className }: AnimalChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-1.5 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 border min-w-[80px]",
        selected
          ? "bg-primary text-primary-foreground border-primary shadow-md scale-105"
          : "bg-card text-foreground border-border hover:border-primary/40 hover:bg-accent hover:scale-[1.02]",
        className
      )}
    >
      <span className="text-2xl" aria-hidden="true">{emoji}</span>
      <span className="text-xs leading-tight text-center">{label}</span>
    </button>
  );
}
