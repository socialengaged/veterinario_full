import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface RelatedLink {
  label: string;
  href: string;
  description?: string;
}

interface RelatedLinksProps {
  title: string;
  links: RelatedLink[];
}

export function RelatedLinks({ title, links }: RelatedLinksProps) {
  if (!links.length) return null;
  return (
    <div className="p-6 rounded-xl border border-border bg-card">
      <h3 className="font-display font-semibold text-lg text-foreground mb-4">{title}</h3>
      <ul className="space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              to={l.href}
              className="group flex items-start gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowRight className="h-4 w-4 mt-0.5 flex-shrink-0 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              <div>
                <span className="font-medium text-foreground group-hover:text-primary transition-colors">{l.label}</span>
                {l.description && <p className="text-xs mt-0.5">{l.description}</p>}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
