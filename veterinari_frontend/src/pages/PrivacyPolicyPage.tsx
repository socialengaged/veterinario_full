import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageMeta } from "@/components/PageMeta";

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageMeta
        title="Privacy Policy — VeterinarioVicino.it"
        description="Informativa sulla privacy di VeterinarioVicino.it ai sensi del Reg. UE 2016/679 (GDPR). Come raccogliamo, utilizziamo e proteggiamo i tuoi dati personali."
        canonical="/privacy-policy/"
      />
      <Header />
      <main className="bg-background">
        <article className="container py-8 md:py-12 max-w-3xl prose prose-sm prose-headings:font-display prose-headings:text-foreground text-foreground">
          <h1>Informativa sulla Privacy</h1>
          <p className="text-muted-foreground text-sm">Ultimo aggiornamento: 26 marzo 2026</p>
          <p>
            Informativa resa ai sensi degli artt. 13-14 del Regolamento (UE) 2016/679 (GDPR)
            e della normativa italiana vigente in materia di protezione dei dati personali.
          </p>

          <h2>1. Titolare del trattamento</h2>
          <p>
            SEO SRL<br />
            P.IVA: IT 05151910758<br />
            Sede legale: Via Roma 163, 73021 Calimera (LE), Italia<br />
            Email: <a href="mailto:veterinariovicino.it@gmail.com" className="text-primary hover:underline">veterinariovicino.it@gmail.com</a><br />
            PEC: [inserire PEC]
          </p>

          <h2>2. Natura del servizio</h2>
          <p>
            veterinariovicino.it è un servizio di ricerca e inoltro richieste di contatto verso strutture
            veterinarie. <strong>Non eroga prestazioni sanitarie, non fornisce consulenze veterinarie, diagnosi
            o terapie, e non svolge attività di intermediazione sanitaria.</strong> Il servizio si limita a
            trasmettere la richiesta dell'utente alle strutture veterinarie della zona indicata.
          </p>

          <h2>3. Tipologie di dati raccolti</h2>
          <p>Raccogliamo i seguenti dati personali, forniti volontariamente dall'utente:</p>
          <ul>
            <li>Nome</li>
            <li>Numero di telefono</li>
            <li>CAP / città / località</li>
            <li>Informazioni sull'animale (specie, tipo di servizio richiesto, livello di urgenza)</li>
            <li>Note descrittive facoltative</li>
            <li>Preferenza di contatto (telefono o WhatsApp)</li>
          </ul>
          <p>
            <strong>Dati di navigazione:</strong> indirizzo IP, browser, sistema operativo, pagine visitate,
            durata della sessione — raccolti tramite cookie tecnici e, previo consenso, cookie analytics.
          </p>
          <p>
            Eventuali informazioni relative allo stato di salute dell'animale sono trattate solo
            se fornite volontariamente dall'utente. Tali informazioni non costituiscono dati sanitari
            dell'utente ai sensi dell'art. 9 GDPR. Ti invitiamo a non inserire informazioni sanitarie
            sensibili nel modulo di richiesta. I dati saranno utilizzati esclusivamente per inoltrare
            la richiesta ai professionisti presenti nella zona indicata.
          </p>

          <h2>4. Finalità e base giuridica del trattamento</h2>
          <table className="w-full text-sm">
            <thead>
              <tr><th className="text-left">Finalità</th><th className="text-left">Base giuridica</th></tr>
            </thead>
            <tbody>
              <tr><td>Inoltro della richiesta di contatto a strutture veterinarie</td><td>Esecuzione di misure precontrattuali su richiesta dell'interessato (art. 6.1.b GDPR)</td></tr>
              <tr><td>Gestione tecnica del servizio</td><td>Interesse legittimo (art. 6.1.f GDPR)</td></tr>
              <tr><td>Analisi statistica anonimizzata (Google Analytics)</td><td>Consenso (art. 6.1.a GDPR)</td></tr>
              <tr><td>Attività di marketing diretto</td><td>Consenso esplicito e separato (art. 6.1.a GDPR)</td></tr>
              <tr><td>Adempimenti di legge</td><td>Obbligo legale (art. 6.1.c GDPR)</td></tr>
            </tbody>
          </table>

          <h2>5. Modalità di trattamento</h2>
          <p>
            I dati sono trattati con strumenti informatici e telematici, con logiche strettamente
            correlate alle finalità indicate e con l'adozione di misure di sicurezza tecniche e
            organizzative adeguate a garantirne riservatezza, integrità e disponibilità.
          </p>

          <h2>6. Comunicazione e condivisione dei dati</h2>
          <p>I dati personali possono essere comunicati a:</p>
          <ul>
            <li><strong>Strutture veterinarie</strong> della zona indicata dall'utente, al solo fine di consentire il contatto diretto</li>
            <li><strong>Fornitori di servizi tecnici</strong> (hosting, analytics, servizi email) in qualità di responsabili del trattamento</li>
          </ul>
          <p>
            I dati <strong>non</strong> vengono venduti a terzi. La condivisione con le strutture veterinarie
            avviene esclusivamente sulla base del consenso esplicito dell'utente e per la sola finalità
            di consentire il contatto.
          </p>

          <h2>7. Trasferimento dati extra UE</h2>
          <p>
            Alcuni servizi terzi (es. Google LLC) possono comportare il trasferimento di dati verso
            paesi extra-UE. In tali casi, il trasferimento avviene nel rispetto delle garanzie previste
            dal GDPR (decisioni di adeguatezza, clausole contrattuali standard, certificazioni).
          </p>

          <h2>8. Periodo di conservazione</h2>
          <ul>
            <li><strong>Dati delle richieste di contatto:</strong> conservati per un massimo di 12 mesi dalla ricezione, dopodiché vengono cancellati</li>
            <li><strong>Dati di navigazione / analytics:</strong> conservati per un massimo di 26 mesi</li>
            <li><strong>Consensi:</strong> i log del consenso sono conservati per 5 anni a fini probatori</li>
            <li><strong>Dati per obblighi legali:</strong> conservati per il periodo previsto dalla legge applicabile</li>
          </ul>

          <h2>9. Diritti dell'interessato</h2>
          <p>Ai sensi degli artt. 15-22 del GDPR, l'utente ha diritto di:</p>
          <ul>
            <li>Accedere ai propri dati personali (art. 15)</li>
            <li>Ottenere la rettifica dei dati inesatti (art. 16)</li>
            <li>Ottenere la cancellazione dei dati (art. 17)</li>
            <li>Limitare il trattamento (art. 18)</li>
            <li>Ricevere i dati in formato strutturato — portabilità (art. 20)</li>
            <li>Opporsi al trattamento (art. 21)</li>
            <li><strong>Revocare il consenso</strong> in qualsiasi momento, senza pregiudicare la liceità del trattamento basato sul consenso prima della revoca</li>
          </ul>
          <p>
            Per esercitare i propri diritti, scrivere a:{" "}
            <a href="mailto:veterinariovicino.it@gmail.com" className="text-primary hover:underline">
              veterinariovicino.it@gmail.com
            </a>
          </p>

          <h2>10. Diritto di reclamo</h2>
          <p>
            L'utente ha il diritto di proporre reclamo all'Autorità Garante per la Protezione
            dei Dati Personali (
            <a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              www.garanteprivacy.it
            </a>
            ), Piazza Venezia 11, 00187 Roma.
          </p>

          <h2>11. Natura del conferimento</h2>
          <p>
            Il conferimento dei dati è facoltativo. Il mancato conferimento dei dati contrassegnati
            come obbligatori (nome, telefono, città) impedisce l'inoltro della richiesta di contatto.
          </p>

          <h2>12. Esclusione di responsabilità</h2>
          <p>
            veterinariovicino.it non è responsabile delle prestazioni sanitarie, degli accordi
            economici o di qualsiasi rapporto che si instauri direttamente tra l'utente e la
            struttura veterinaria contattata. Il servizio si limita all'inoltro della richiesta.
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}
