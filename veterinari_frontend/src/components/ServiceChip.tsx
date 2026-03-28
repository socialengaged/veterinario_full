import { cn } from "@/lib/utils";

interface ServiceChipProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

export function ServiceChip({ label, selected, onClick, className }: ServiceChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 border",
        selected
          ? "bg-primary text-primary-foreground border-primary shadow-sm"
          : "bg-card text-foreground border-border hover:border-primary/40 hover:bg-accent",
        className
      )}
    >
      {label}
    </button>
  );
}
