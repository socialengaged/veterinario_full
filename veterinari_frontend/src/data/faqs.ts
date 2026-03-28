import type { FaqCluster } from "./types";

export const faqClusters: FaqCluster[] = [
  {
    id: "generale",
    title: "Domande generali",
    context: "general",
    items: [
      { q: "VeterinarioVicino.it è un servizio gratuito?", a: "Sì, il servizio di ricerca e inoltro richieste è completamente gratuito per chi cerca un veterinario. Non applichiamo costi né commissioni." },
      { q: "Come funziona il servizio?", a: "Compili il modulo indicando il tuo animale, il servizio di cui hai bisogno, l'urgenza e la tua posizione. La tua richiesta viene inoltrata alle strutture veterinarie della zona, che potranno ricontattarti direttamente." },
      { q: "Posso scegliere il veterinario?", a: "Sì. Puoi esplorare liberamente l'elenco delle strutture veterinarie e contattarle direttamente. Il modulo di richiesta è un'opzione aggiuntiva: la tua richiesta viene inoltrata alle strutture della zona che potranno ricontattarti." },
      { q: "In quali zone è attivo il servizio?", a: "Il servizio è attivo in tutta Italia con un elenco di oltre migliaia di strutture veterinarie censite. L'elenco è in continuo aggiornamento." },
    ],
  },
  {
    id: "tempi-risposta",
    title: "Tempi e risposte",
    context: "general",
    items: [
      { q: "Quanto tempo ci vuole per ricevere una risposta?", a: "Per le richieste non urgenti, le strutture rispondono generalmente entro 24 ore lavorative. In caso di emergenza, contatta direttamente un pronto soccorso veterinario senza attendere risposta." },
      { q: "Come verrò contattato?", a: "Verrai contattato direttamente dalla struttura veterinaria attraverso il metodo che hai indicato nel modulo: telefono o WhatsApp." },
      { q: "Cosa succede dopo che invio la richiesta?", a: "La tua richiesta viene inoltrata alle strutture veterinarie della zona. Saranno le strutture stesse a ricontattarti direttamente per fornirti informazioni e fissare un appuntamento." },
    ],
  },
  {
    id: "emergenze",
    title: "Emergenze e urgenze",
    context: "emergency",
    items: [
      { q: "VeterinarioVicino.it è un servizio di emergenza?", a: "No. VeterinarioVicino.it non è un servizio medico e non fornisce prestazioni sanitarie. In caso di pericolo per la vita dell'animale, recati immediatamente al pronto soccorso veterinario più vicino senza attendere risposta." },
      { q: "Cosa fare in caso di emergenza veterinaria?", a: "In caso di emergenza, contatta direttamente la clinica veterinaria con pronto soccorso più vicina. Puoi consultare l'elenco delle strutture per trovare quelle con pronto soccorso nella tua zona." },
      { q: "Ci sono pronto soccorso veterinari aperti di notte?", a: "La disponibilità notturna varia per struttura e zona. Ti consigliamo di verificare in anticipo gli orari delle cliniche con pronto soccorso nella tua zona, così da essere preparato in caso di necessità." },
    ],
  },
  {
    id: "profili",
    title: "Profili e strutture",
    context: "general",
    items: [
      { q: "Le informazioni sui veterinari sono verificate?", a: "Le informazioni pubblicate sono raccolte da fonti pubbliche e segnalazioni dirette. I profili non ancora verificati sono chiaramente contrassegnati. I professionisti possono contattarci per aggiornare e verificare il proprio profilo." },
      { q: "Come vengono censite le strutture veterinarie?", a: "Censiamo le strutture veterinarie attraverso fonti pubbliche e segnalazioni dirette. Non operiamo selezioni basate su pagamento o sponsorizzazioni. Qualsiasi professionista abilitato può richiedere l'inserimento nell'elenco." },
      { q: "Sono un veterinario: come posso aggiornare il mio profilo?", a: "Se sei un veterinario o gestisci una struttura, contattaci via email per aggiornare le informazioni del tuo profilo o per richiedere la verifica. Il servizio è gratuito anche per i professionisti." },
    ],
  },
  {
    id: "servizi-veterinari",
    title: "Servizi veterinari",
    context: "services",
    items: [
      { q: "Che differenza c'è tra clinica, ambulatorio e studio veterinario?", a: "La clinica veterinaria è una struttura con possibilità di ricovero e spesso dotata di apparecchiature diagnostiche avanzate. L'ambulatorio veterinario offre visite e servizi base senza ricovero. Lo studio veterinario è la struttura più semplice, spesso gestita da un singolo professionista." },
      { q: "Tutti i veterinari visitano animali esotici?", a: "No. Gli animali esotici (rettili, uccelli, roditori) richiedono competenze specializzate. Non tutti i veterinari hanno formazione ed esperienza per trattarli. Nell'elenco puoi cercare specificamente le strutture con competenze per animali esotici." },
      { q: "È possibile richiedere una visita veterinaria a domicilio?", a: "Sì, molti veterinari offrono visite a domicilio. Puoi indicarlo come preferenza nella tua richiesta di contatto. Tieni presente che non tutti i servizi possono essere erogati a domicilio." },
    ],
  },
  {
    id: "costi",
    title: "Costi e pagamenti",
    context: "general",
    items: [
      { q: "Quanto costa una visita veterinaria?", a: "I costi variano in base alla struttura, al tipo di prestazione e alla zona. Il servizio di ricerca e inoltro richieste è gratuito. I costi delle prestazioni veterinarie saranno comunicati direttamente dalla struttura contattata." },
      { q: "VeterinarioVicino.it prende commissioni?", a: "No. Non prendiamo commissioni né dal proprietario dell'animale né dal veterinario. Il servizio di inoltro richieste è gratuito." },
    ],
  },
  {
    id: "privacy",
    title: "Privacy e dati",
    context: "general",
    items: [
      { q: "Come vengono trattati i miei dati personali?", a: "I tuoi dati vengono utilizzati esclusivamente per inoltrare la tua richiesta di contatto alle strutture veterinarie della zona. Non vendiamo dati a terzi. Per maggiori dettagli, consulta la nostra Privacy Policy." },
      { q: "Posso cancellare i miei dati?", a: "Sì, puoi richiedere la cancellazione dei tuoi dati in qualsiasi momento scrivendo a veterinariovicino.it@gmail.com. Provvederemo alla rimozione entro i tempi previsti dalla normativa GDPR." },
    ],
  },
  {
    id: "animali-esotici",
    title: "Animali esotici",
    context: "services",
    items: [
      { q: "Quali animali sono considerati 'esotici'?", a: "In ambito veterinario, vengono generalmente considerati esotici tutti gli animali diversi da cani e gatti: rettili (tartarughe, lucertole, serpenti), uccelli (pappagalli, canarini), roditori (criceti, cavie), conigli, furetti e altri piccoli mammiferi." },
      { q: "È difficile trovare un veterinario per animali esotici?", a: "I veterinari specializzati in animali esotici sono meno numerosi rispetto a quelli generalisti. Nell'elenco puoi cercare specificamente le strutture con competenze per animali esotici nella tua zona." },
    ],
  },
];
