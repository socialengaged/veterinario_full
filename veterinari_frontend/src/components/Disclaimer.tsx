import { cn } from "@/lib/utils";
import { AlertTriangle, Info } from "lucide-react";

interface DisclaimerProps {
  variant?: "info" | "warning";
  children: React.ReactNode;
  className?: string;
}

export function Disclaimer({ variant = "info", children, className }: DisclaimerProps) {
  return (
    <div
      className={cn(
        "flex gap-3 p-4 rounded-lg border text-sm",
        variant === "warning"
          ? "bg-warning/10 border-warning/30 text-foreground"
          : "bg-accent border-border text-muted-foreground",
        className
      )}
      role="alert"
    >
      {variant === "warning" ? (
        <AlertTriangle className="h-5 w-5 flex-shrink-0 text-warning mt-0.5" />
      ) : (
        <Info className="h-5 w-5 flex-shrink-0 text-primary mt-0.5" />
      )}
      <div>{children}</div>
    </div>
  );
}
