import { cn } from "@/lib/utils";

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  className?: string;
  onClick?: () => void;
}

export function ServiceCard({ icon, title, description, className, onClick }: ServiceCardProps) {
  return (
    <article
      onClick={onClick}
      className={cn(
        "group p-6 rounded-xl border border-border bg-card hover:shadow-lg hover:border-primary/20 transition-all duration-300 cursor-pointer",
        className
      )}
    >
      <span className="text-3xl block mb-3" aria-hidden="true">{icon}</span>
      <h3 className="font-display font-semibold text-lg mb-1 text-foreground group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </article>
  );
}
