import { siteConfig } from "@/config/site";

export type HomepageFaqItem = { q: string; a: string };

/** Testi FAQ homepage (JSON-LD + sezione FAQ). `listedCount` da siteConfig.listedClinicCount. */
export function getHomepageFaqs(listedCount: number): HomepageFaqItem[] {
  const n = listedCount.toLocaleString("it-IT");
  return [
    {
      q: "Il servizio di VeterinarioVicino.it è gratuito?",
      a: `Sì, ${siteConfig.name} è completamente gratuito per chi cerca un veterinario. Il nostro obiettivo è facilitare il contatto tra utenti e strutture veterinarie nella tua zona.`,
    },
    {
      q: "Come funziona il servizio?",
      a: `Dopo aver compilato il modulo, ${siteConfig.name} inoltra la tua richiesta a veterinari e strutture veterinarie della zona in base all'animale, al servizio richiesto e alla tua posizione. Il veterinario ti ricontatterà direttamente.`,
    },
    {
      q: "In quali zone è attivo il servizio?",
      a: `Il servizio di ${siteConfig.name} è attivo in ${siteConfig.initialArea} con oltre ${n} strutture veterinarie censite — tra veterinari, cliniche veterinarie e ambulatori. L'elenco è in continuo aggiornamento.`,
    },
    {
      q: "Quanto tempo ci vuole per ricevere risposta?",
      a: "Le strutture rispondono di solito entro 24 ore lavorative. I tempi dipendono dalla disponibilità locale.",
    },
    {
      q: `${siteConfig.name} fornisce consulenze veterinarie online?`,
      a: `No. ${siteConfig.name} non è un servizio medico, non fornisce consulenze veterinarie né prestazioni sanitarie: mette in contatto con strutture della zona.`,
    },
    {
      q: "Posso scegliere il veterinario?",
      a: `${siteConfig.name} inoltra la tua richiesta alle strutture veterinarie della zona. Puoi anche esplorare autonomamente l'elenco delle strutture e contattarle direttamente.`,
    },
  ];
}
