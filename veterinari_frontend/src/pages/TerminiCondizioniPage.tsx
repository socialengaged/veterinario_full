import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageMeta } from "@/components/PageMeta";

export default function TerminiCondizioniPage() {
  return (
    <>
      <PageMeta
        title="Termini e Condizioni — VeterinarioVicino.it"
        description="Termini e condizioni d'uso di VeterinarioVicino.it. Condizioni del servizio di ricerca e contatto veterinari."
        canonical="/termini-condizioni/"
      />
      <Header />
      <main className="bg-background">
        <article className="container py-8 md:py-12 max-w-3xl prose prose-sm prose-headings:font-display prose-headings:text-foreground text-foreground">
          <h1>Termini e Condizioni d'Uso</h1>
          <p className="text-muted-foreground text-sm">Ultimo aggiornamento: 26 marzo 2026</p>

          <h2>1. Definizioni</h2>
          <ul>
            <li><strong>"Piattaforma"</strong>: il sito web veterinariovicino.it</li>
            <li><strong>"Titolare"</strong>: SEO SRL, P.IVA IT 05151910758, Via Roma 163, 73021 Calimera (LE)</li>
            <li><strong>"Utente"</strong>: chiunque utilizzi la Piattaforma</li>
            <li><strong>"Struttura veterinaria"</strong>: veterinario, clinica, ambulatorio o altro professionista censito sulla Piattaforma</li>
          </ul>

          <h2>2. Oggetto e natura del servizio</h2>
          <p>
            La Piattaforma è un servizio di ricerca e inoltro richieste di contatto
            verso strutture veterinarie. <strong>La Piattaforma NON è una struttura sanitaria,
            non eroga prestazioni veterinarie, non fornisce consulenze mediche, diagnosi o terapie,
            e non svolge attività di intermediazione sanitaria attiva.</strong>
          </p>
          <p>
            Il servizio si limita a:
          </p>
          <ul>
            <li>Pubblicare un elenco di strutture veterinarie con informazioni di contatto</li>
            <li>Consentire all'utente di inviare una richiesta di contatto che viene inoltrata alle strutture della zona</li>
            <li>Fornire informazioni orientative di carattere generale (non medico) sulla cura degli animali</li>
          </ul>

          <h2>3. Esclusione di responsabilità</h2>
          <p>Il Titolare <strong>non è responsabile</strong> per:</p>
          <ul>
            <li>La qualità, l'adeguatezza o l'esito delle prestazioni rese dalle strutture veterinarie</li>
            <li>La disponibilità, la tempestività o la reperibilità dei professionisti</li>
            <li>L'esattezza, la completezza o l'aggiornamento delle informazioni fornite dalle strutture veterinarie</li>
            <li>Qualsiasi danno diretto o indiretto derivante dall'utilizzo del servizio o dall'affidamento sulle informazioni pubblicate</li>
            <li>Il rapporto contrattuale, economico o sanitario tra utente e struttura veterinaria</li>
          </ul>
          <p>
            L'utente riconosce che ogni decisione relativa alla salute del proprio animale è presa sotto
            la propria esclusiva responsabilità e in consultazione diretta con un medico veterinario abilitato.
          </p>

          <h2>4. Assenza di rapporto professionale</h2>
          <p>
            L'utilizzo della Piattaforma non instaura alcun rapporto professionale, contrattuale o sanitario
            tra l'utente e il Titolare. Qualsiasi rapporto professionale o economico si instaura esclusivamente
            e direttamente tra l'utente e la struttura veterinaria.
          </p>
          <p>
            <strong>Non esiste alcun rapporto di collaborazione, rappresentanza o subordinazione tra
            VeterinarioVicino.it e i professionisti censiti.</strong> VeterinarioVicino.it non gestisce elenchi
            classificati né ordina i professionisti sulla base di criteri qualitativi. Il servizio non costituisce
            in alcun modo attività di intermediazione sanitaria.
          </p>

          <h2>5. Inoltro richieste di contatto</h2>
          <p>
            I dati inseriti dall'utente nel modulo di richiesta vengono trasmessi alle strutture veterinarie
            della zona indicata, al solo fine di consentire il contatto diretto. Il Titolare non interviene
            nella gestione del rapporto successivo tra utente e struttura.
          </p>

          <h2>6. Informazioni pubblicate</h2>
          <p>
            Le informazioni pubblicate sulla Piattaforma (incluse guide, articoli e schede informative)
            hanno <strong>finalità puramente orientativa e divulgativa</strong>. Non costituiscono consulenza
            veterinaria e non devono essere utilizzate come sostituto del parere di un medico veterinario qualificato.
          </p>

          <h2>7. Limitazioni del servizio</h2>
          <p>
            <strong>La Piattaforma non fornisce consulenza medica veterinaria in tempo reale né prestazioni sanitarie.</strong>{" "}
            L'utente è responsabile di rivolgersi tempestivamente a una struttura veterinaria idonea quando l'animale necessita di cure immediate.
          </p>

          <h2>8. Pagamenti</h2>
          <p>
            Il servizio di ricerca e inoltro richieste è gratuito per l'utente. Eventuali pagamenti per
            prestazioni veterinarie avvengono esclusivamente tra utente e struttura veterinaria.
            La Piattaforma non gestisce, intermedia né garantisce alcun pagamento.
          </p>

          <h2>9. Obblighi dell'utente</h2>
          <p>L'utente si impegna a:</p>
          <ul>
            <li>Fornire dati veritieri e accurati</li>
            <li>Non utilizzare il servizio per scopi illeciti o fraudolenti</li>
            <li>Non utilizzare la Piattaforma per sostituire il contatto diretto con un medico veterinario quando necessario per la salute dell'animale</li>
          </ul>

          <h2>10. Proprietà intellettuale</h2>
          <p>
            Tutti i contenuti della Piattaforma (testi, grafica, loghi, software) sono di proprietà
            del Titolare o utilizzati su licenza. È vietata la riproduzione senza autorizzazione.
          </p>

          <h2>11. Limitazione di responsabilità</h2>
          <p>
            Nella misura massima consentita dalla legge, il Titolare non sarà responsabile per danni
            diretti, indiretti, incidentali o consequenziali derivanti dall'uso o dall'impossibilità
            di uso della Piattaforma.
          </p>

          <h2>12. Accordi commerciali</h2>
          <p>
            Il servizio può prevedere accordi commerciali con alcuni professionisti per la gestione
            delle richieste. Tali accordi non influenzano la posizione o la visibilità dei professionisti
            nell'elenco e non implicano alcuna garanzia o raccomandazione da parte del Titolare.
          </p>

          <h2>13. Modifiche ai termini</h2>
          <p>
            Il Titolare si riserva il diritto di modificare i presenti termini in qualsiasi momento.
            Le modifiche saranno efficaci dalla pubblicazione sulla Piattaforma. L'uso continuato del
            servizio dopo la pubblicazione delle modifiche costituisce accettazione dei nuovi termini.
          </p>

          <h2>14. Legge applicabile e foro competente</h2>
          <p>
            I presenti Termini sono regolati dalla legge italiana. Per qualsiasi controversia derivante
            dall'utilizzo della Piattaforma, il foro competente è quello di Lecce, salvo il foro
            inderogabile del consumatore ai sensi dell'art. 66-bis del Codice del Consumo.
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}
