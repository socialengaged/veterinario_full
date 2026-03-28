import { siteConfig } from "@/config/site";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-12">
        <div className="grid md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="font-display font-bold text-lg mb-2">{siteConfig.name}</h3>
            <p className="text-sm opacity-80 leading-relaxed mb-4">
              {siteConfig.name} è un servizio gratuito di ricerca e contatto veterinario in Italia.
              Consulta l&apos;elenco di veterinari e cliniche nella tua zona e invia una richiesta di contatto.
            </p>
            <div className="text-xs opacity-60 leading-relaxed border-t border-primary-foreground/20 pt-3 mt-3">
              <p className="font-semibold mb-1">Disclaimer</p>
              <p>
                {siteConfig.name} si limita a trasmettere le richieste degli utenti ai professionisti presenti nella zona,
                senza effettuare alcuna selezione, valutazione o raccomandazione. Non esiste alcun rapporto di collaborazione,
                rappresentanza o subordinazione tra {siteConfig.name} e i professionisti. {siteConfig.name} non è responsabile
                delle prestazioni, diagnosi o trattamenti effettuati dai professionisti. Le informazioni presenti sul sito
                hanno finalità puramente informativa e non sostituiscono il parere di un medico veterinario.
                Per la salute del tuo animale rivolgiti sempre a un professionista abilitato.
              </p>
            </div>
          </div>

          {/* Servizi veterinari */}
          <div>
            <h4 className="font-semibold text-sm mb-3 uppercase tracking-wide opacity-70">Servizi veterinari</h4>
            <nav className="space-y-2 text-sm" aria-label="Servizi veterinari">
              <Link to="/servizi/" className="block opacity-80 hover:opacity-100 transition-opacity font-semibold">Tutti i servizi veterinari</Link>
              <Link to="/visita-veterinaria/" className="block opacity-80 hover:opacity-100 transition-opacity">Visita veterinaria</Link>
              <Link to="/vaccinazioni/" className="block opacity-80 hover:opacity-100 transition-opacity">Vaccinazioni animali</Link>
              <Link to="/veterinario-a-domicilio/" className="block opacity-80 hover:opacity-100 transition-opacity">Veterinario a domicilio</Link>
              <Link to="/chirurgia-veterinaria/" className="block opacity-80 hover:opacity-100 transition-opacity">Chirurgia veterinaria</Link>
              <Link to="/dermatologia-veterinaria/" className="block opacity-80 hover:opacity-100 transition-opacity">Dermatologia veterinaria</Link>
              <Link to="/ortopedia-veterinaria/" className="block opacity-80 hover:opacity-100 transition-opacity">Ortopedia veterinaria</Link>
            </nav>
          </div>

          {/* Zone e navigazione */}
          <div>
            <h4 className="font-semibold text-sm mb-3 uppercase tracking-wide opacity-70">Cerca per zona</h4>
            <nav className="space-y-2 text-sm" aria-label="Cerca veterinario per zona">
              <Link to="/puglia/" className="block opacity-80 hover:opacity-100 transition-opacity">Veterinario in Puglia</Link>
              <Link to="/puglia/lecce/" className="block opacity-80 hover:opacity-100 transition-opacity">Veterinario a Lecce</Link>
              <Link to="/puglia/lecce/gallipoli/" className="block opacity-80 hover:opacity-100 transition-opacity">Veterinario a Gallipoli</Link>
              <Link to="/puglia/lecce/nardo/" className="block opacity-80 hover:opacity-100 transition-opacity">Veterinario a Nardò</Link>
              <Link to="/elenco/" className="block opacity-80 hover:opacity-100 transition-opacity">Elenco cliniche veterinarie</Link>
              <Link to="/guide/" className="block opacity-80 hover:opacity-100 transition-opacity">Guide veterinarie</Link>
              <Link to="/mappa-sito/" className="block opacity-80 hover:opacity-100 transition-opacity">Mappa del sito</Link>
              <Link to="/mappa-sito-dettagliata/" className="block opacity-80 hover:opacity-100 transition-opacity font-semibold">Mappa completa dettagliata</Link>
            </nav>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-semibold text-sm mb-3 uppercase tracking-wide opacity-70">Informazioni</h4>
            <nav className="space-y-2 text-sm" aria-label="Informazioni e contatti">
              <Link to="/come-funziona/" className="block opacity-80 hover:opacity-100 transition-opacity font-semibold">Come funziona {siteConfig.name}</Link>
              <a href="#come-funziona" className="block opacity-80 hover:opacity-100 transition-opacity">Panoramica rapida</a>
              <Link to="/veterinari-termini/" className="block opacity-80 hover:opacity-100 transition-opacity">Sei un veterinario?</Link>
              <Link to="/richiedi-assistenza/" className="block opacity-80 hover:opacity-100 transition-opacity">Invia richiesta di contatto</Link>
            </nav>
            <h4 className="font-semibold text-sm mt-5 mb-2 uppercase tracking-wide opacity-70">Contatti</h4>
            <div className="space-y-1 text-sm opacity-80">
              <p>{siteConfig.contact.email}</p>
              <p>{siteConfig.contact.phone}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-10 pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs opacity-60">
            <p>© {new Date().getFullYear()} {siteConfig.name} — Servizio gratuito di ricerca veterinaria in Italia.</p>
            <div className="flex flex-wrap gap-x-4 gap-y-2 justify-center sm:justify-end items-center">
              <Link to="/privacy-policy/" className="hover:opacity-100 transition-opacity">Privacy Policy</Link>
              <Link to="/cookie-policy/" className="hover:opacity-100 transition-opacity">Cookie Policy</Link>
              <Link to="/termini-condizioni/" className="hover:opacity-100 transition-opacity">Termini di servizio</Link>
              <Link to="/iscrizione-veterinari/" className="hover:opacity-100 transition-opacity text-primary-foreground/90 underline underline-offset-2">
                Iscrizione professionisti
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
