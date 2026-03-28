import { Phone } from "lucide-react";
import { Disclaimer } from "@/components/Disclaimer";
import { siteConfig } from "@/config/site";

interface EmergencyBlockProps {
  cityName?: string;
}

export function EmergencyBlock({ cityName }: EmergencyBlockProps) {
  const location = cityName ? ` a ${cityName}` : "";
  return (
    <div className="p-6 md:p-8 rounded-2xl border-2 border-destructive/20 bg-destructive/5">
      <div className="flex items-start gap-4">
        <Phone className="h-8 w-8 text-destructive flex-shrink-0 mt-1" />
        <div>
          <h3 className="font-display text-xl font-bold text-foreground mb-2">
            Emergenza veterinaria{location}?
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            In caso di emergenza, contatta direttamente la clinica veterinaria con pronto soccorso
            più vicina{location ? ` nella zona di ${cityName}` : ""}.
            Non attendere una risposta dal nostro servizio.
          </p>
          <Disclaimer variant="warning">
            {siteConfig.name} non è un servizio medico di emergenza.
            Per situazioni che mettono in pericolo la vita dell'animale, recati immediatamente
            al pronto soccorso veterinario.
          </Disclaimer>
        </div>
      </div>
    </div>
  );
}
