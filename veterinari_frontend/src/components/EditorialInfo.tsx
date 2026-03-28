import { Calendar, Shield, Info } from "lucide-react";
import { siteConfig } from "@/config/site";

interface EditorialInfoProps {
  lastUpdated?: string;
  verified?: boolean;
  source?: string;
}

/**
 * EEAT trust block — shows editorial responsibility, last update, verification status.
 */
export function EditorialInfo({ lastUpdated, verified, source }: EditorialInfoProps) {
  return (
    <aside
      className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground py-3 border-y border-border"
      aria-label="Informazioni editoriali"
    >
      {lastUpdated && (
        <span className="inline-flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5" />
          Aggiornato: {lastUpdated}
        </span>
      )}
      {verified !== undefined && (
        <span className="inline-flex items-center gap-1.5">
          <Shield className="h-3.5 w-3.5" />
          {verified ? "Informazioni verificate" : "In attesa di verifica"}
        </span>
      )}
      <span className="inline-flex items-center gap-1.5">
        <Info className="h-3.5 w-3.5" />
        Redazione {siteConfig.name}
      </span>
      {source && (
        <span className="inline-flex items-center gap-1.5">
          Fonte: {source}
        </span>
      )}
    </aside>
  );
}
