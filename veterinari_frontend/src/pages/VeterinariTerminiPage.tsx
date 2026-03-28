import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageMeta } from "@/components/PageMeta";

export default function VeterinariTerminiPage() {
  return (
    <>
      <PageMeta
        title="Condizioni per i Veterinari Partner — VeterinarioVicino.it"
        description="Condizioni di utilizzo della piattaforma VeterinarioVicino.it per veterinari e strutture veterinarie partner."
        canonical="/veterinari-termini/"
      />
      <Header />
      <main className="bg-background">
        <article className="container py-8 md:py-12 max-w-3xl prose prose-sm prose-headings:font-display prose-headings:text-foreground text-foreground">
          <h1>Condizioni per i Veterinari Partner</h1>
          <p className="text-muted-foreground text-sm">Ultimo aggiornamento: 19 marzo 2026</p>

          <h2>1. Oggetto del servizio</h2>
          <p>veterinariovicino.it è una piattaforma digitale che facilita il contatto tra utenti e strutture veterinarie.</p>

          <h2>2. Natura della piattaforma</h2>
          <p>La piattaforma non è una struttura sanitaria e non eroga servizi veterinari. Non svolge attività di intermediazione sanitaria.</p>

          <h2>3. Requisiti del veterinario</h2>
          <p>Il veterinario dichiara:</p>
          <ul>
            <li>di essere regolarmente abilitato alla professione</li>
            <li>di rispettare la normativa vigente</li>
            <li>di fornire informazioni veritiere e aggiornate</li>
          </ul>

          <h2>4. Gestione dei contatti (lead)</h2>
          <p>I contatti ricevuti tramite la piattaforma sono richieste di informazioni da parte degli utenti. Il veterinario è responsabile della gestione del rapporto con l'utente.</p>

          <h2>5. Prestazioni e pagamenti</h2>
          <p>Qualsiasi prestazione veterinaria è erogata direttamente dal veterinario. I pagamenti avvengono esclusivamente tra utente e veterinario.</p>

          <h2>6. Assenza di responsabilità della piattaforma</h2>
          <p>SEO SRL non è responsabile:</p>
          <ul>
            <li>delle prestazioni sanitarie</li>
            <li>degli accordi economici</li>
            <li>delle informazioni fornite dal veterinario</li>
          </ul>

          <h2>7. Commissioni e servizi futuri</h2>
          <p>La piattaforma potrà introdurre servizi a pagamento o commissioni sui lead, previa comunicazione.</p>

          <h2>8. Sospensione o rimozione</h2>
          <p>La piattaforma può sospendere o rimuovere un veterinario in caso di violazioni o comportamenti non conformi.</p>

          <h2>9. Legge applicabile</h2>
          <p>Legge italiana.</p>
        </article>
      </main>
      <Footer />
    </>
  );
}
