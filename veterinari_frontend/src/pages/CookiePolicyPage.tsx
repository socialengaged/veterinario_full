import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageMeta } from "@/components/PageMeta";

export default function CookiePolicyPage() {
  return (
    <>
      <PageMeta
        title="Cookie Policy — VeterinarioVicino.it"
        description="Informativa sull'uso dei cookie su VeterinarioVicino.it. Tipologie di cookie utilizzati, finalità e modalità di gestione."
        canonical="/cookie-policy/"
      />
      <Header />
      <main className="bg-background">
        <article className="container py-8 md:py-12 max-w-3xl prose prose-sm prose-headings:font-display prose-headings:text-foreground text-foreground">
          <h1>Cookie Policy</h1>
          <p className="text-muted-foreground text-sm">Ultimo aggiornamento: 26 marzo 2026</p>
          <p>
            Questa Cookie Policy descrive le tipologie di cookie utilizzati da veterinariovicino.it
            (di seguito "il Sito"), gestito da SEO SRL, le finalità del loro utilizzo e le modalità
            con cui l'utente può gestire le proprie preferenze.
          </p>

          <h2>1. Cosa sono i cookie</h2>
          <p>
            I cookie sono piccoli file di testo memorizzati dal browser sul dispositivo dell'utente
            durante la navigazione. Servono a migliorare l'esperienza di navigazione, ricordare
            preferenze e raccogliere dati statistici anonimi.
          </p>

          <h2>2. Tipologie di cookie utilizzati</h2>

          <h3>2.1 Cookie tecnici (necessari)</h3>
          <p>Essenziali per il funzionamento del sito. Non richiedono consenso.</p>
          <table className="w-full text-sm">
            <thead>
              <tr><th className="text-left">Nome</th><th className="text-left">Finalità</th><th className="text-left">Durata</th></tr>
            </thead>
            <tbody>
              <tr><td>cookie_consent</td><td>Memorizza la scelta sui cookie</td><td>12 mesi</td></tr>
              <tr><td>cookie_consent_log</td><td>Log del consenso per compliance</td><td>12 mesi</td></tr>
              <tr><td>cookie_analytics</td><td>Preferenza analytics</td><td>12 mesi</td></tr>
              <tr><td>cookie_marketing</td><td>Preferenza marketing</td><td>12 mesi</td></tr>
            </tbody>
          </table>

          <h3>2.2 Cookie analytics (previo consenso)</h3>
          <p>Utilizzati per raccogliere informazioni statistiche aggregate sull'utilizzo del sito.</p>
          <table className="w-full text-sm">
            <thead>
              <tr><th className="text-left">Servizio</th><th className="text-left">Fornitore</th><th className="text-left">Privacy</th></tr>
            </thead>
            <tbody>
              <tr>
                <td>Google Analytics 4</td>
                <td>Google LLC</td>
                <td>
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    Privacy Policy Google
                  </a>
                </td>
              </tr>
            </tbody>
          </table>

          <h3>2.3 Cookie di marketing (previo consenso)</h3>
          <p>Utilizzati per campagne pubblicitarie e remarketing.</p>
          <table className="w-full text-sm">
            <thead>
              <tr><th className="text-left">Servizio</th><th className="text-left">Fornitore</th><th className="text-left">Privacy</th></tr>
            </thead>
            <tbody>
              <tr>
                <td>Google Ads</td>
                <td>Google LLC</td>
                <td>
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    Privacy Policy Google
                  </a>
                </td>
              </tr>
            </tbody>
          </table>

          <h2>3. Gestione del consenso</h2>
          <p>
            Al primo accesso al sito, viene mostrato un banner che consente di:
          </p>
          <ul>
            <li><strong>Accettare tutti</strong> i cookie</li>
            <li><strong>Rifiutare tutti</strong> i cookie non necessari</li>
            <li><strong>Personalizzare</strong> le preferenze per categoria (analytics, marketing)</li>
          </ul>
          <p>
            I cookie analytics e marketing vengono attivati <strong>solo dopo il consenso esplicito</strong>.
            L'utente può modificare le proprie preferenze in qualsiasi momento cancellando i cookie
            dal browser, il che provocherà la ricomparsa del banner al successivo accesso.
          </p>

          <h2>4. Come disabilitare i cookie dal browser</h2>
          <p>L'utente può gestire i cookie anche tramite le impostazioni del proprio browser:</p>
          <ul>
            <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Chrome</a></li>
            <li><a href="https://support.mozilla.org/it/kb/Gestione%20dei%20cookie" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Mozilla Firefox</a></li>
            <li><a href="https://support.apple.com/it-it/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Safari</a></li>
            <li><a href="https://support.microsoft.com/it-it/microsoft-edge/eliminare-i-cookie-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Microsoft Edge</a></li>
          </ul>
          <p>
            La disabilitazione dei cookie tecnici potrebbe compromettere il funzionamento di alcune
            funzionalità del sito.
          </p>

          <h2>5. Trasferimenti extra-UE</h2>
          <p>
            Google LLC può trattare dati in paesi extra-UE. I trasferimenti avvengono nel rispetto
            delle garanzie previste dal GDPR (Data Privacy Framework, clausole contrattuali standard).
          </p>

          <h2>6. Titolare del trattamento</h2>
          <p>
            SEO SRL — Via Roma 163, 73021 Calimera (LE), Italia<br />
            Email: <a href="mailto:veterinariovicino.it@gmail.com" className="text-primary hover:underline">veterinariovicino.it@gmail.com</a>
          </p>

          <h2>7. Aggiornamenti</h2>
          <p>
            Questa Cookie Policy può essere aggiornata periodicamente. La data dell'ultimo aggiornamento
            è indicata in cima alla pagina.
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}
