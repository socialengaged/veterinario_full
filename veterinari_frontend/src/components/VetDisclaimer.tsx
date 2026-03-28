import { siteConfig } from "@/config/site";
import { Disclaimer } from "@/components/Disclaimer";

interface VetDisclaimerProps {
  className?: string;
}

/**
 * Standard veterinary medical disclaimer for trust and EEAT.
 */
export function VetDisclaimer({ className }: VetDisclaimerProps) {
  return (
    <Disclaimer variant="info" className={className}>
      <strong>Disclaimer:</strong> {siteConfig.name} si limita a trasmettere le richieste degli utenti
      ai professionisti presenti nella zona, senza effettuare alcuna selezione, valutazione o raccomandazione.
      Non forniamo diagnosi, consulti medici, terapie né prestazioni veterinarie dirette.
      Non esiste alcun rapporto di collaborazione, rappresentanza o subordinazione tra {siteConfig.name} e i professionisti.
      Le informazioni pubblicate hanno scopo puramente orientativo e non sostituiscono il parere di un medico veterinario qualificato.
    </Disclaimer>
  );
}
