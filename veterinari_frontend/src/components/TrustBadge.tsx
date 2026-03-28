import { cn } from "@/lib/utils";

interface TrustBadgeProps {
  icon: string;
  title: string;
  description?: string;
  className?: string;
}

export function TrustBadge({ icon, title, description, className }: TrustBadgeProps) {
  return (
    <div className={cn("flex items-center gap-3 text-left", className)}>
      <span className="text-2xl flex-shrink-0" aria-hidden="true">{icon}</span>
      <div>
        <p className="font-semibold text-sm text-foreground">{title}</p>
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
      </div>
    </div>
  );
}
