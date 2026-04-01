import { Link } from "react-router-dom";
import { Lock, Phone, Mail, MapPin, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ContactGateProps {
  phone?: string;
  email?: string;
  address?: string;
  isLoggedIn?: boolean;
  /** Se true, mostra sempre il blocco "Accedi" per anonimi (scheda onda PG senza contatti pubblici). */
  contactLoginRequired?: boolean;
}

/** Masks the street name in an address, e.g. "Via Roma 42, 73100 Lecce" → "Via ********* 42, 73100 Lecce" */
function maskAddress(address: string): string {
  // Match patterns like "Via/Viale/Piazza/Corso NAME NUMBER, CAP CITY"
  const match = address.match(/^(Via|Viale|Piazza|Piazzale|Corso|Largo|Vicolo|SS|Strada|Contrada)\s+(.+?)\s+(\d+.*)/i);
  if (match) {
    return `${match[1]} ********* ${match[3]}`;
  }
  // If no number found, try just masking the name part
  const match2 = address.match(/^(Via|Viale|Piazza|Piazzale|Corso|Largo|Vicolo|SS|Strada|Contrada)\s+(.+?)(\s*,\s*.+)/i);
  if (match2) {
    return `${match2[1]} *********${match2[3]}`;
  }
  return address;
}

export function ContactGate({
  phone,
  email,
  address,
  isLoggedIn = false,
  contactLoginRequired = false,
}: ContactGateProps) {
  if (isLoggedIn) {
    const hasAny = !!(address || phone || email);
    if (!contactLoginRequired && !hasAny) return null;
    return (
      <section className="p-5 rounded-xl border border-border bg-surface">
        <h2 className="font-display font-semibold text-foreground mb-3">Contatti</h2>
        {!hasAny && contactLoginRequired ? (
          <p className="text-sm text-muted-foreground">
            Nessun telefono o indirizzo completo disponibile in anagrafe. Puoi comunque richiedere un contatto tramite il modulo del sito.
          </p>
        ) : (
          <div className="space-y-2">
            {address && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" /> {address}
              </div>
            )}
            {phone && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                <a href={`tel:${phone}`} className="hover:text-primary transition-colors">{phone}</a>
              </div>
            )}
            {email && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <a href={`mailto:${email}`} className="hover:text-primary transition-colors">{email}</a>
              </div>
            )}
          </div>
        )}
      </section>
    );
  }

  if (!contactLoginRequired && !phone && !email && !address) {
    return null;
  }

  return (
    <section className="p-5 rounded-xl border border-primary/20 bg-primary/5">
      <div className="flex items-start gap-3">
        <Lock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <h2 className="font-display font-semibold text-foreground mb-1">Contatti</h2>
          <div className="space-y-1.5 mb-4">
            {address && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" /> {maskAddress(address)}
              </div>
            )}
            {phone && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-3.5 w-3.5" /> +39 0*** *** ***
              </div>
            )}
            {email && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-3.5 w-3.5" /> ****@****.it
              </div>
            )}
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            Effettua il login per visualizzare i dati di contatto completi.
          </p>
          <div className="flex gap-2">
            <Button variant="cta" size="sm" asChild>
              <Link to="/accedi/"><LogIn className="h-3.5 w-3.5 mr-1.5" /> Accedi</Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link to="/registrati/">Registrati gratis</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
