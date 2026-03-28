import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { siteConfig } from "@/config/site";

interface AreaCoverageProps {
  currentArea?: string;
  className?: string;
}

/**
 * Transparent area coverage block for EEAT and AI-search context.
 */
export function AreaCoverage({ currentArea, className }: AreaCoverageProps) {
  return (
    <div className={`p-5 rounded-xl border border-border bg-surface text-sm ${className || ""}`}>
      <div className="flex items-center gap-2 mb-2">
        <MapPin className="h-4 w-4 text-primary" />
        <h3 className="font-semibold text-foreground">Copertura del servizio veterinario</h3>
      </div>
      <p className="text-muted-foreground leading-relaxed mb-3">
        {siteConfig.name} — servizio gratuito di ricerca e contatto veterinario — è attivo in <strong>{siteConfig.initialArea}</strong>.
        {currentArea && ` Questa pagina riguarda veterinari, cliniche veterinarie e servizi veterinari nella zona di ${currentArea}.`}
        {" "}L'elenco di strutture veterinarie è in continuo aggiornamento.
      </p>
      <p className="text-xs text-muted-foreground">
        Puoi{" "}
        <Link to="/richiedi-assistenza/" className="text-primary hover:underline">inviare una richiesta di contatto gratuita</Link>
        {" "}che verrà inoltrata alle strutture veterinarie della tua zona.
      </p>
    </div>
  );
}
