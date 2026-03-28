// ── Keyword Architecture for SEO ──
// Maps search patterns to page configurations.

import type { City } from "./types";

// ── City keyword prefixes ──
export interface CityKeywordPattern {
  prefix: string;
  label: string;
  serviceContext?: string; // maps to service slug
  angle: "general" | "emergency" | "clinic" | "h24";
  metaTitleTemplate: (city: string) => string;
  metaDescTemplate: (city: string) => string;
  introTemplate: (city: string) => string;
  h1Template: (city: string) => string;
  summaryTemplate: (city: string) => string;
}

export const cityKeywordPatterns: CityKeywordPattern[] = [
  {
    prefix: "veterinario-",
    label: "Veterinario",
    angle: "general",
    h1Template: (c) => `Veterinario a ${c}`,
    metaTitleTemplate: (c) => `Veterinario a ${c} — Strutture veterinarie disponibili`,
    metaDescTemplate: (c) => `Cerchi un veterinario a ${c}? Consulta le strutture veterinarie disponibili nella zona. Visite, vaccinazioni e visite a domicilio.`,
    introTemplate: (c) => `Stai cercando un veterinario a ${c}? Consulta l'elenco delle strutture veterinarie disponibili nella zona. Che tu abbia bisogno di una visita di routine, vaccinazioni o un servizio specifico, puoi inviare una richiesta di contatto gratuita.`,
    summaryTemplate: (c) => `Veterinari disponibili a ${c}: consulta strutture, servizi offerti e disponibilità. Servizio gratuito di ricerca e contatto.`,
  },
  {
    prefix: "clinica-veterinaria-",
    label: "Clinica veterinaria",
    angle: "clinic",
    h1Template: (c) => `Clinica veterinaria a ${c}`,
    metaTitleTemplate: (c) => `Clinica Veterinaria a ${c} — Strutture e ambulatori a ${c}`,
    metaDescTemplate: (c) => `Cerchi una clinica veterinaria a ${c}? Scopri le strutture disponibili per la cura del tuo animale: visite, chirurgia e diagnostica.`,
    introTemplate: (c) => `A ${c} sono presenti diverse cliniche veterinarie con una gamma ampia di servizi, inclusa la possibilità di ricovero, diagnostica avanzata e interventi chirurgici. Consulta le strutture disponibili nella zona.`,
    summaryTemplate: (c) => `Cliniche veterinarie a ${c}: strutture attrezzate per visite, diagnostica, chirurgia e ricovero. Cerca nella tua zona.`,
  },
];

// ── Animal + City keyword patterns ──
// e.g. /veterinario-cane-lecce/, /veterinario-esotici-lecce/
export interface AnimalCityKeywordPattern {
  prefix: string;
  animalId: string;
  animalName: string;
  animalNamePlural: string;
  emoji: string;
  h1Template: (city: string) => string;
  metaTitleTemplate: (city: string) => string;
  metaDescTemplate: (city: string) => string;
  introTemplate: (city: string) => string;
  summaryTemplate: (city: string) => string;
}

export const animalCityKeywordPatterns: AnimalCityKeywordPattern[] = [
  {
    prefix: "veterinario-cane-",
    animalId: "cane",
    animalName: "cane",
    animalNamePlural: "cani",
    emoji: "🐕",
    h1Template: (c) => `Veterinario per cani a ${c}`,
    metaTitleTemplate: (c) => `Veterinario per Cani a ${c} — Strutture disponibili`,
    metaDescTemplate: (c) => `Cerchi un veterinario per cani a ${c}? Consulta le strutture disponibili per visite, vaccinazioni e cure per il tuo cane.`,
    introTemplate: (c) => `Stai cercando un veterinario per cani a ${c}? Consulta l'elenco delle strutture con esperienza nella cura dei cani nella tua zona. Che tu abbia bisogno di una visita di routine, vaccinazioni o un servizio specifico per il tuo cane, puoi inviare una richiesta di contatto gratuita.`,
    summaryTemplate: (c) => `Veterinari per cani a ${c}: consulta strutture, servizi per cani e disponibilità. Servizio gratuito.`,
  },
  {
    prefix: "veterinario-gatto-",
    animalId: "gatto",
    animalName: "gatto",
    animalNamePlural: "gatti",
    emoji: "🐈",
    h1Template: (c) => `Veterinario per gatti a ${c}`,
    metaTitleTemplate: (c) => `Veterinario per Gatti a ${c} — Specialista felino`,
    metaDescTemplate: (c) => `Cerchi un veterinario per gatti a ${c}? Consulta le strutture con esperienza felina per visite, vaccinazioni e cure specifiche.`,
    introTemplate: (c) => `I gatti hanno esigenze mediche particolari che richiedono un approccio specializzato. A ${c} puoi consultare le strutture con esperienza felina disponibili nella zona.`,
    summaryTemplate: (c) => `Veterinario per gatti a ${c}: trova professionisti con approccio cat-friendly nella tua zona.`,
  },
  {
    prefix: "veterinario-esotici-",
    animalId: "esotici",
    animalName: "animale esotico",
    animalNamePlural: "animali esotici",
    emoji: "🦎",
    h1Template: (c) => `Veterinario per animali esotici a ${c}`,
    metaTitleTemplate: (c) => `Veterinario Animali Esotici a ${c} — Rettili, uccelli e piccoli mammiferi`,
    metaDescTemplate: (c) => `Cerchi un veterinario per animali esotici a ${c}? Consulta le strutture per rettili, uccelli, conigli, roditori e furetti.`,
    introTemplate: (c) => `Gli animali esotici richiedono veterinari con competenze specializzate. A ${c} puoi consultare le strutture con esperienza nella cura di rettili, uccelli, conigli, roditori e altri animali non convenzionali.`,
    summaryTemplate: (c) => `Veterinario per animali esotici a ${c}: trova specialisti per rettili, uccelli, conigli e altri piccoli animali.`,
  },
  {
    prefix: "veterinario-cavallo-",
    animalId: "cavallo",
    animalName: "cavallo",
    animalNamePlural: "cavalli",
    emoji: "🐴",
    h1Template: (c) => `Veterinario per cavalli a ${c}`,
    metaTitleTemplate: (c) => `Veterinario Equino a ${c} — Specialista cavalli`,
    metaDescTemplate: (c) => `Cerchi un veterinario per cavalli a ${c}? Consulta le strutture con esperienza equina per visite, vaccinazioni e cure.`,
    introTemplate: (c) => `La medicina equina è una specializzazione che richiede competenze dedicate. A ${c} e dintorni, puoi consultare le strutture con esperienza nella cura dei cavalli.`,
    summaryTemplate: (c) => `Veterinario equino a ${c}: trova professionisti per la cura dei cavalli nella tua zona.`,
  },
];

// ── Animal keyword pages ──
export interface AnimalKeywordPage {
  slug: string;        // e.g. "veterinario-cane"
  animalId: string;    // maps to animals config
  animalName: string;
  animalNamePlural: string;
  emoji: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  summary: string;
  intro: string;
  whenToSeek: string;
  commonServices: string[];
  faq: { q: string; a: string }[];
}

export const animalKeywordPages: Record<string, AnimalKeywordPage> = {
  "veterinario-cane": {
    slug: "veterinario-cane",
    animalId: "cane",
    animalName: "cane",
    animalNamePlural: "cani",
    emoji: "🐕",
    metaTitle: "Veterinario per Cani — Strutture veterinarie disponibili",
    metaDescription: "Cerchi un veterinario per cani? Consulta le strutture disponibili: visite, vaccinazioni, chirurgia e servizi per il tuo cane.",
    h1: "Veterinario per cani",
    summary: "Consulta le strutture veterinarie per la cura dei cani: visite di routine, vaccinazioni, chirurgia e servizi nella tua zona.",
    intro: "Il cane è il compagno più diffuso nelle famiglie italiane e merita cure veterinarie attente e regolari. Dalla prima visita del cucciolo ai controlli geriatrici, un veterinario accompagna il tuo cane in ogni fase della vita. Consulta le strutture disponibili nella tua zona.",
    whenToSeek: "Porta il tuo cane dal veterinario per le visite annuali, il piano vaccinale, quando noti cambiamenti nel comportamento o nell'appetito, per problemi dermatologici o ortopedici.",
    commonServices: ["visita-veterinaria", "vaccinazioni", "chirurgia-veterinaria", "veterinario-a-domicilio"],
    faq: [
      { q: "Ogni quanto devo portare il mio cane dal veterinario?", a: "I cani adulti sani dovrebbero fare un controllo veterinario almeno una volta l'anno. Cuccioli e cani anziani possono richiedere visite più frequenti." },
      { q: "Quali vaccinazioni sono obbligatorie per il cane?", a: "In Italia la vaccinazione antirabbica non è più obbligatoria su tutto il territorio, ma è necessaria per viaggiare all'estero. Il veterinario consiglierà un piano vaccinale in base allo stile di vita del tuo cane." },
      { q: "Come scelgo il veterinario per il mio cane?", a: "Considera la vicinanza, gli orari di apertura e la possibilità di visite a domicilio. Puoi consultare l'elenco delle strutture disponibili nella tua zona." },
    ],
  },
  "veterinario-gatto": {
    slug: "veterinario-gatto",
    animalId: "gatto",
    animalName: "gatto",
    animalNamePlural: "gatti",
    emoji: "🐈",
    metaTitle: "Veterinario per Gatti — Trova uno specialista felino",
    metaDescription: "Cerchi un veterinario per gatti? Consulta le strutture con esperienza felina: visite, vaccinazioni e cure specifiche per il tuo gatto.",
    h1: "Veterinario per gatti",
    summary: "Consulta le strutture veterinarie con esperienza felina: ambiente adatto, tecniche specifiche e conoscenza delle patologie feline.",
    intro: "I gatti hanno esigenze mediche particolari che beneficiano di un approccio specializzato. Un veterinario con esperienza felina sa come gestire lo stress della visita, riconoscere i segnali specifici dei gatti e offrire cure mirate.",
    whenToSeek: "Cerca un veterinario per il tuo gatto per visite di routine, vaccinazioni, problemi urinari, comportamentali, patologie renali o dentali, e per le sterilizzazioni.",
    commonServices: ["visita-veterinaria", "vaccinazioni", "veterinario-a-domicilio", "chirurgia-veterinaria"],
    faq: [
      { q: "Il mio gatto ha paura del veterinario, cosa posso fare?", a: "Molti veterinari offrono approcci cat-friendly per ridurre lo stress. Le visite a domicilio sono un'ottima alternativa per gatti particolarmente ansiosi." },
      { q: "Ogni quanto devo portare il gatto dal veterinario?", a: "Un gatto adulto sano dovrebbe fare un controllo annuale. I gatti anziani (oltre 7 anni) beneficiano di controlli semestrali per individuare precocemente patologie comuni." },
      { q: "Quali vaccinazioni servono per il mio gatto?", a: "Il veterinario consiglierà un piano vaccinale in base allo stile di vita del gatto: i gatti che escono di casa o vivono con altri gatti possono richiedere vaccinazioni aggiuntive." },
    ],
  },
  "veterinario-cavallo": {
    slug: "veterinario-cavallo",
    animalId: "cavallo",
    animalName: "cavallo",
    animalNamePlural: "cavalli",
    emoji: "🐴",
    metaTitle: "Veterinario per Cavalli — Veterinario equino nella tua zona",
    metaDescription: "Cerchi un veterinario per cavalli? Trova un veterinario equino per visite, vaccinazioni e cure dentali per i tuoi cavalli.",
    h1: "Veterinario per cavalli",
    summary: "Consulta le strutture veterinarie equine nella tua zona: visite, cure dentali e vaccinazioni.",
    intro: "La medicina equina è una branca specializzata della veterinaria che richiede competenze specifiche e attrezzature dedicate. I cavalli hanno esigenze mediche uniche, dalla cura degli zoccoli alla gestione di coliche. Le visite si svolgono quasi sempre presso la scuderia o il maneggio.",
    whenToSeek: "Contatta un veterinario equino per i controlli periodici, le vaccinazioni, la cura dei denti, la ferratura problematica, le coliche, le zoppie e qualsiasi cambiamento nel comportamento del cavallo.",
    commonServices: ["visita-veterinaria", "vaccinazioni", "veterinario-a-domicilio"],
    faq: [
      { q: "Il veterinario equino viene in scuderia?", a: "Sì, nella grande maggioranza dei casi il veterinario equino effettua le visite direttamente presso la scuderia o il maneggio." },
      { q: "Ogni quanto devo far visitare il mio cavallo?", a: "Un cavallo sano dovrebbe avere un controllo veterinario almeno due volte l'anno, oltre ai controlli dentali e alla ferratura periodica." },
      { q: "Come trovo un veterinario equino in Puglia?", a: "I veterinari equini sono meno numerosi rispetto a quelli per piccoli animali. Puoi consultare l'elenco delle strutture disponibili nella tua zona." },
    ],
  },
  "veterinario-uccelli": {
    slug: "veterinario-uccelli",
    animalId: "uccelli",
    animalName: "uccello",
    animalNamePlural: "uccelli",
    emoji: "🐦",
    metaTitle: "Veterinario per Uccelli — Specialista aviare nella tua zona",
    metaDescription: "Cerchi un veterinario per uccelli? Consulta le strutture con esperienza in medicina aviare per pappagalli, canarini e altri volatili.",
    h1: "Veterinario per uccelli",
    summary: "Consulta le strutture veterinarie con esperienza in medicina aviare per la cura di pappagalli, canarini, rapaci e altri volatili domestici.",
    intro: "Gli uccelli domestici — pappagalli, canarini, inseparabili, calopsite e altri volatili — richiedono un veterinario con formazione specifica in medicina aviare. Questi animali tendono a nascondere i sintomi di malattia, rendendo fondamentale rivolgersi a un professionista che sappia riconoscere i segnali precoci.",
    whenToSeek: "Porta il tuo uccello dal veterinario aviare per i controlli periodici, quando noti variazioni nell'appetito, nel piumaggio, nella respirazione o nel comportamento.",
    commonServices: ["veterinario-animali-esotici", "visita-veterinaria"],
    faq: [
      { q: "Tutti i veterinari curano gli uccelli?", a: "No, la medicina aviare è una specializzazione. Molti veterinari generici non hanno esperienza con gli uccelli. È importante cercare un professionista con formazione specifica." },
      { q: "Come capisco se il mio uccello sta male?", a: "Gli uccelli tendono a nascondere i sintomi. Segnali d'allarme includono: piumaggio arruffato, inappetenza, difficoltà respiratorie, variazioni nelle feci, apatia. In caso di dubbio, consulta il veterinario." },
    ],
  },
  "veterinario-animali-esotici": {
    slug: "veterinario-animali-esotici",
    animalId: "esotici",
    animalName: "animale esotico",
    animalNamePlural: "animali esotici",
    emoji: "🦎",
    metaTitle: "Veterinario per Animali Esotici — Specialista rettili, uccelli e piccoli mammiferi",
    metaDescription: "Cerchi un veterinario per animali esotici? Consulta le strutture per rettili, uccelli, conigli, furetti e roditori.",
    h1: "Veterinario per animali esotici",
    summary: "Consulta le strutture veterinarie per animali esotici: rettili, uccelli, conigli, furetti, roditori e altri animali non convenzionali.",
    intro: "Gli animali esotici — rettili, uccelli, conigli, furetti, roditori e altri piccoli mammiferi — hanno esigenze mediche molto specifiche che richiedono veterinari con competenze specializzate. Non tutti i veterinari trattano questi animali. Consulta le strutture disponibili nella tua zona.",
    whenToSeek: "Cerca un veterinario per animali esotici quando acquisti o adotti un nuovo animale, per i controlli periodici, quando noti comportamenti anomali, problemi alimentari o alterazioni fisiche.",
    commonServices: ["visita-veterinaria", "veterinario-a-domicilio"],
    faq: [
      { q: "Perché serve un veterinario specializzato in esotici?", a: "Gli animali esotici hanno fisiologie molto diverse da cani e gatti. Un veterinario generico potrebbe non avere le competenze per diagnosticare e trattare correttamente le loro patologie." },
      { q: "Quali animali rientrano tra gli esotici?", a: "Rettili (tartarughe, gechi, iguane, serpenti), uccelli (pappagalli, canarini), conigli, furetti, porcellini d'India, criceti, chinchilla, e altri animali non convenzionali." },
      { q: "Il veterinario per esotici costa di più?", a: "Le tariffe possono essere leggermente superiori per la specializzazione richiesta. Il servizio di ricerca è gratuito." },
    ],
  },
};

// ── Service specialty keyword pages ──
export interface SpecialtyKeywordPage {
  slug: string;
  specialtyName: string;
  emoji: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  summary: string;
  intro: string;
  whatTheyDo: string;
  whenToSeek: string;
  whatToExpect: string;
  relatedServices: string[];
  faq: { q: string; a: string }[];
}

export const specialtyKeywordPages: Record<string, SpecialtyKeywordPage> = {
  "veterinario-nutrizionista": {
    slug: "veterinario-nutrizionista",
    specialtyName: "Veterinario nutrizionista",
    emoji: "🥗",
    metaTitle: "Veterinario Nutrizionista — Alimentazione e dieta per il tuo animale",
    metaDescription: "Cerchi un veterinario nutrizionista? Trova un esperto in alimentazione animale per diete personalizzate, intolleranze e nutrizione clinica.",
    h1: "Veterinario nutrizionista",
    summary: "Trova un veterinario nutrizionista per diete personalizzate, gestione del peso, intolleranze alimentari e nutrizione clinica per il tuo animale.",
    intro: "Il veterinario nutrizionista è un professionista specializzato nell'alimentazione degli animali domestici. Può aiutarti a formulare una dieta personalizzata in base all'età, alla razza, allo stato di salute e allo stile di vita del tuo animale. La nutrizione è un pilastro fondamentale della salute: un'alimentazione corretta previene molte patologie.",
    whatTheyDo: "Il veterinario nutrizionista valuta le esigenze alimentari specifiche del tuo animale, formula piani dietetici personalizzati, gestisce allergie e intolleranze alimentari, e supporta la nutrizione in caso di patologie croniche come diabete, insufficienza renale o problemi epatici.",
    whenToSeek: "Consulta un veterinario nutrizionista se il tuo animale ha problemi di peso (sovrappeso o sottopeso), allergie alimentari, patologie croniche che richiedono una dieta specifica, problemi digestivi ricorrenti, o se desideri passare a un'alimentazione casalinga.",
    whatToExpect: "Durante la consulenza, il veterinario valuterà lo stato nutrizionale del tuo animale, analizzerà l'alimentazione attuale e formulerà un piano dietetico personalizzato con indicazioni precise su quantità, frequenza e tipo di alimenti.",
    relatedServices: ["visita-veterinaria", "esami-analisi"],
    faq: [
      { q: "Quando serve un veterinario nutrizionista?", a: "È utile per animali con problemi di peso, allergie alimentari, patologie croniche, o quando si vuole impostare un'alimentazione casalinga equilibrata." },
      { q: "Il veterinario nutrizionista sostituisce il veterinario generico?", a: "No, è un servizio complementare. La consulenza nutrizionale è spesso consigliata dal veterinario curante per supportare il trattamento di specifiche patologie." },
      { q: "Quanto costa una consulenza nutrizionale veterinaria?", a: "I costi variano in base al professionista e alla complessità del caso. Il servizio di ricerca è gratuito." },
    ],
  },
  "veterinario-ortopedico": {
    slug: "veterinario-ortopedico",
    specialtyName: "Veterinario ortopedico",
    emoji: "🦴",
    metaTitle: "Veterinario Ortopedico — Specialista ossa e articolazioni animali",
    metaDescription: "Cerchi un veterinario ortopedico? Trova un chirurgo specializzato in ortopedia veterinaria per fratture, displasia e patologie articolari.",
    h1: "Veterinario ortopedico",
    summary: "Trova un veterinario ortopedico per fratture, displasia, patologie articolari, riabilitazione e chirurgia ortopedica per il tuo animale.",
    intro: "L'ortopedia veterinaria si occupa della diagnosi e del trattamento di problemi a ossa, articolazioni, legamenti e muscoli negli animali. Un veterinario ortopedico è fondamentale in caso di fratture, displasia dell'anca o del gomito, rottura dei legamenti crociati e altre patologie dell'apparato muscolo-scheletrico.",
    whatTheyDo: "Il veterinario ortopedico diagnostica e tratta fratture, displasie, lussazioni, rotture legamentose e patologie articolari degenerative. Esegue interventi chirurgici come osteosintesi, TPLO, protesi e artroscopie.",
    whenToSeek: "Rivolgiti a un veterinario ortopedico in caso di zoppia persistente, dopo traumi o incidenti, per displasia dell'anca o del gomito, per problemi di deambulazione nei cani anziani, e quando il veterinario curante consiglia un parere specialistico.",
    whatToExpect: "La visita ortopedica include un esame fisico approfondito dell'apparato locomotore, spesso supportato da radiografie o TAC. Il veterinario proporrà un piano terapeutico che può includere trattamenti conservativi o chirurgici.",
    relatedServices: ["chirurgia-veterinaria", "ecografia-radiologia", "visita-veterinaria"],
    faq: [
      { q: "Il mio cane zoppica, devo andare dall'ortopedico?", a: "Una zoppia che persiste per più di 1-2 giorni merita una valutazione veterinaria. Il tuo veterinario curante potrà poi indirizzarti all'ortopedico se necessario." },
      { q: "La displasia dell'anca si può curare?", a: "La displasia può essere gestita con terapie conservative o chirurgiche a seconda della gravità. Una diagnosi precoce è fondamentale per le migliori opzioni di trattamento." },
    ],
  },
  "veterinario-dermatologo": {
    slug: "veterinario-dermatologo",
    specialtyName: "Veterinario dermatologo",
    emoji: "🔍",
    metaTitle: "Veterinario Dermatologo — Specialista pelle e pelo animali",
    metaDescription: "Cerchi un veterinario dermatologo? Trova un specialista in dermatologia veterinaria per allergie, dermatiti e problemi cutanei del tuo animale.",
    h1: "Veterinario dermatologo",
    summary: "Trova un veterinario dermatologo per allergie, dermatiti, otiti, problemi del pelo e patologie cutanee del tuo animale.",
    intro: "La dermatologia veterinaria si occupa delle malattie della pelle, del pelo, delle unghie e delle orecchie negli animali domestici. I problemi dermatologici sono tra i motivi più frequenti di visita veterinaria e possono avere cause allergiche, parassitarie, infettive o autoimmuni. Un dermatologo veterinario sa individuare la causa sottostante e impostare la terapia più efficace.",
    whatTheyDo: "Il veterinario dermatologo diagnostica e tratta allergie (alimentari e ambientali), dermatiti, otiti croniche, infezioni cutanee, parassitosi, malattie autoimmuni della pelle e problemi del mantello.",
    whenToSeek: "Consulta un dermatologo veterinario quando il tuo animale presenta prurito persistente, perdita di pelo anomala, arrossamenti o lesioni cutanee ricorrenti, otiti croniche, o quando i trattamenti standard non hanno dato risultati.",
    whatToExpect: "La visita dermatologica include un esame dettagliato della pelle e del pelo, possibili prelievi citologici, test allergici o biopsie cutanee. Il dermatologo imposterà un piano terapeutico mirato.",
    relatedServices: ["visita-veterinaria", "esami-analisi"],
    faq: [
      { q: "Il mio cane si gratta continuamente, è un problema dermatologico?", a: "Il prurito persistente è uno dei segni più comuni di patologie dermatologiche. Le cause possono essere allergie, parassiti o infezioni. Una visita specialistica può individuare la causa." },
      { q: "Le allergie alimentari del cane si possono diagnosticare?", a: "Sì, attraverso diete di eliminazione guidate dal veterinario. I test allergici ambientali sono disponibili per le allergie non alimentari." },
    ],
  },
  "veterinario-cardiologo": {
    slug: "veterinario-cardiologo",
    specialtyName: "Veterinario cardiologo",
    emoji: "❤️",
    metaTitle: "Veterinario Cardiologo — Specialista cuore animali",
    metaDescription: "Cerchi un veterinario cardiologo? Trova un specialista in cardiologia veterinaria per soffi cardiaci, insufficienza e monitoraggio.",
    h1: "Veterinario cardiologo",
    summary: "Trova un veterinario cardiologo per soffi cardiaci, insufficienza cardiaca, aritmie e monitoraggio cardiologico del tuo animale.",
    intro: "La cardiologia veterinaria è la branca che si occupa della diagnosi e del trattamento delle malattie cardiache negli animali. I problemi cardiaci possono essere congeniti o acquisiti e colpiscono sia cani che gatti, con alcune razze particolarmente predisposte. Un cardiologo veterinario dispone di competenze e strumenti specifici per una valutazione approfondita del cuore.",
    whatTheyDo: "Il veterinario cardiologo esegue ecocardiografie, elettrocardiogrammi e misurazioni della pressione arteriosa. Diagnostica e gestisce soffi cardiaci, cardiomiopatie, insufficienza cardiaca, aritmie e valvulopatie.",
    whenToSeek: "Consulta un cardiologo veterinario quando il veterinario rileva un soffio cardiaco, in caso di tosse persistente (soprattutto nei cani), affaticamento, difficoltà respiratorie, svenimenti, o per screening di razze predisposte.",
    whatToExpect: "La visita cardiologica include l'auscultazione, l'ecocardiografia (ecografia del cuore), spesso un elettrocardiogramma e la misurazione della pressione. Il cardiologo imposterà la terapia più adeguata.",
    relatedServices: ["ecografia-radiologia", "visita-veterinaria", "esami-analisi"],
    faq: [
      { q: "Il veterinario ha sentito un soffio cardiaco, è grave?", a: "Non tutti i soffi cardiaci indicano una malattia grave. L'ecocardiografia è l'esame fondamentale per valutare l'origine e la gravità del soffio." },
      { q: "Quali razze di cani sono più soggette a problemi cardiaci?", a: "Cavalier King, Boxer, Dobermann, Dogue de Bordeaux e alcune razze giganti sono predisposte. Anche i gatti (Maine Coon, Ragdoll, Persiani) possono sviluppare cardiomiopatie." },
    ],
  },
  "veterinario-oculista": {
    slug: "veterinario-oculista",
    specialtyName: "Veterinario oculista",
    emoji: "👁️",
    metaTitle: "Veterinario Oculista — Specialista occhi animali",
    metaDescription: "Cerchi un veterinario oculista? Trova un oftalmologo veterinario per problemi agli occhi del tuo animale: cataratta, glaucoma e ulcere corneali.",
    h1: "Veterinario oculista",
    summary: "Trova un veterinario oculista per cataratta, glaucoma, ulcere corneali e tutte le patologie oculari del tuo animale.",
    intro: "L'oftalmologia veterinaria si occupa delle malattie degli occhi negli animali domestici. I problemi oculari possono variare da condizioni lievi a quadri più complessi. Un oftalmologo veterinario dispone di strumentazione specifica per una diagnosi accurata e trattamenti mirati.",
    whatTheyDo: "Il veterinario oculista diagnostica e tratta cataratta, glaucoma, ulcere corneali, congiuntiviti croniche, entropion, ectropion, cheratocongiuntivite secca e tumori oculari. Esegue interventi chirurgici specifici.",
    whenToSeek: "Consulta un oculista veterinario in caso di occhi arrossati o gonfi, lacrimazione eccessiva, opacità del cristallino, cambiamenti nella dimensione della pupilla, strabismo improvviso, o quando il veterinario consiglia un parere specialistico.",
    whatToExpect: "La visita oculistica include l'esame con lampada a fessura, tonometria (misurazione della pressione oculare), test della lacrimazione e, se necessario, oftalmoscopia indiretta per valutare la retina.",
    relatedServices: ["visita-veterinaria", "chirurgia-veterinaria"],
    faq: [
      { q: "Il mio cane ha un occhio rosso, devo preoccuparmi?", a: "Un occhio rosso può indicare diverse condizioni, da una semplice congiuntivite a un glaucoma. Se il rossore persiste per più di 24 ore, consulta il veterinario." },
      { q: "La cataratta del cane si può operare?", a: "Sì, la chirurgia della cataratta è disponibile anche in veterinaria e può restituire la vista. L'oftalmologo valuterà se il tuo animale è un candidato adatto." },
    ],
  },
};

// ── Service + City keyword patterns ──
// e.g. /veterinario-dermatologia-lecce/, /veterinario-ortopedia-lecce/
export interface ServiceCityKeywordPattern {
  prefix: string;
  serviceSlug: string;
  serviceName: string;
  emoji: string;
  h1Template: (city: string) => string;
  metaTitleTemplate: (city: string) => string;
  metaDescTemplate: (city: string) => string;
  introTemplate: (city: string) => string;
  summaryTemplate: (city: string) => string;
}

export const serviceCityKeywordPatterns: ServiceCityKeywordPattern[] = [
  {
    prefix: "veterinario-dermatologia-",
    serviceSlug: "dermatologia-veterinaria",
    serviceName: "Dermatologia veterinaria",
    emoji: "🔍",
    h1Template: (c) => `Dermatologia veterinaria a ${c}`,
    metaTitleTemplate: (c) => `Dermatologia Veterinaria a ${c} — Specialista pelle animali`,
    metaDescTemplate: (c) => `Cerchi un dermatologo veterinario a ${c}? Trova specialisti in allergie, dermatiti e problemi cutanei per il tuo animale.`,
    introTemplate: (c) => `Stai cercando un veterinario dermatologo a ${c}? Consulta le strutture con esperienza in problemi della pelle, del pelo e delle orecchie nella zona di ${c}. Allergie, dermatiti, otiti croniche e alopecia sono tra i motivi più frequenti di visita specialistica.`,
    summaryTemplate: (c) => `Trova un dermatologo veterinario a ${c}: allergie, dermatiti, otiti e problemi del pelo. Servizio di ricerca gratuito.`,
  },
  {
    prefix: "veterinario-ortopedia-",
    serviceSlug: "ortopedia-veterinaria",
    serviceName: "Ortopedia veterinaria",
    emoji: "🦴",
    h1Template: (c) => `Ortopedia veterinaria a ${c}`,
    metaTitleTemplate: (c) => `Ortopedia Veterinaria a ${c} — Specialista ossa e articolazioni`,
    metaDescTemplate: (c) => `Cerchi un ortopedico veterinario a ${c}? Trova specialisti per fratture, displasia, zoppia e problemi articolari.`,
    introTemplate: (c) => `Cerchi un veterinario ortopedico a ${c}? Le patologie muscolo-scheletriche sono molto comuni negli animali domestici. Consulta le strutture con esperienza in ortopedia veterinaria nella zona di ${c} per fratture, displasie, rotture legamentose e artrosi.`,
    summaryTemplate: (c) => `Trova un ortopedico veterinario a ${c}: fratture, displasia, zoppia e chirurgia ortopedica. Ricerca gratuita.`,
  },
  {
    prefix: "veterinario-cardiologia-",
    serviceSlug: "cardiologia-veterinaria",
    serviceName: "Cardiologia veterinaria",
    emoji: "❤️",
    h1Template: (c) => `Cardiologia veterinaria a ${c}`,
    metaTitleTemplate: (c) => `Cardiologia Veterinaria a ${c} — Specialista cuore animali`,
    metaDescTemplate: (c) => `Cerchi un cardiologo veterinario a ${c}? Trova specialisti per soffi cardiaci, cardiomiopatie e monitoraggio cardiologico.`,
    introTemplate: (c) => `I problemi cardiaci negli animali richiedono competenze specialistiche. A ${c} puoi consultare le strutture con esperienza in cardiologia veterinaria per ecocardiografie, diagnosi di soffi cardiaci e gestione dell'insufficienza cardiaca.`,
    summaryTemplate: (c) => `Cardiologo veterinario a ${c}: ecocardiografia, soffi cardiaci e monitoraggio. Ricerca gratuita.`,
  },
  {
    prefix: "veterinario-nutrizione-",
    serviceSlug: "nutrizione-veterinaria",
    serviceName: "Nutrizione veterinaria",
    emoji: "🥗",
    h1Template: (c) => `Nutrizionista veterinario a ${c}`,
    metaTitleTemplate: (c) => `Nutrizionista Veterinario a ${c} — Dieta e alimentazione animali`,
    metaDescTemplate: (c) => `Cerchi un nutrizionista veterinario a ${c}? Trova specialisti in alimentazione animale per diete personalizzate e gestione del peso.`,
    introTemplate: (c) => `L'alimentazione è fondamentale per la salute del tuo animale. A ${c} puoi consultare le strutture con esperienza in nutrizione veterinaria per diete personalizzate, gestione del peso, allergie alimentari e nutrizione clinica.`,
    summaryTemplate: (c) => `Nutrizionista veterinario a ${c}: diete personalizzate, gestione peso e allergie. Ricerca gratuita.`,
  },
  {
    prefix: "veterinario-oftalmologia-",
    serviceSlug: "oftalmologia-veterinaria",
    serviceName: "Oftalmologia veterinaria",
    emoji: "👁️",
    h1Template: (c) => `Oculista veterinario a ${c}`,
    metaTitleTemplate: (c) => `Oculista Veterinario a ${c} — Specialista occhi animali`,
    metaDescTemplate: (c) => `Cerchi un oculista veterinario a ${c}? Trova specialisti per cataratta, glaucoma, ulcere corneali e problemi oculari.`,
    introTemplate: (c) => `I problemi oculari negli animali richiedono un veterinario con competenze specifiche. A ${c} puoi consultare le strutture con esperienza in oftalmologia veterinaria per cataratta, glaucoma, ulcere corneali e altre patologie dell'occhio.`,
    summaryTemplate: (c) => `Oculista veterinario a ${c}: cataratta, glaucoma e patologie oculari. Ricerca gratuita.`,
  },
  {
    prefix: "veterinario-ecografia-",
    serviceSlug: "ecografia-veterinaria",
    serviceName: "Ecografia veterinaria",
    emoji: "📡",
    h1Template: (c) => `Ecografia veterinaria a ${c}`,
    metaTitleTemplate: (c) => `Ecografia Veterinaria a ${c} — Diagnostica per immagini`,
    metaDescTemplate: (c) => `Cerchi un servizio di ecografia veterinaria a ${c}? Consulta le strutture attrezzate per ecografie addominali, cardiache e gravidanza.`,
    introTemplate: (c) => `L'ecografia è uno strumento diagnostico fondamentale in medicina veterinaria. A ${c} puoi consultare le strutture attrezzate per ecografie addominali, cardiache e di gravidanza per il tuo animale.`,
    summaryTemplate: (c) => `Ecografia veterinaria a ${c}: diagnostica per immagini addominale, cardiaca e gravidanza.`,
  },
  {
    prefix: "veterinario-radiografia-",
    serviceSlug: "radiografia-veterinaria",
    serviceName: "Radiografia veterinaria",
    emoji: "📷",
    h1Template: (c) => `Radiografia veterinaria a ${c}`,
    metaTitleTemplate: (c) => `Radiografia Veterinaria a ${c} — Raggi X per animali`,
    metaDescTemplate: (c) => `Cerchi un servizio di radiografia veterinaria a ${c}? Consulta le strutture con apparecchiature per raggi X e diagnostica per immagini.`,
    introTemplate: (c) => `La radiografia veterinaria è essenziale per la diagnosi di fratture, patologie polmonari, cardiache e addominali. A ${c} puoi consultare le strutture attrezzate per raggi X veterinari.`,
    summaryTemplate: (c) => `Radiografia veterinaria a ${c}: raggi X per diagnosi di fratture, patologie polmonari e altro.`,
  },
  {
    prefix: "veterinario-chirurgia-",
    serviceSlug: "chirurgia-veterinaria",
    serviceName: "Chirurgia veterinaria",
    emoji: "🔪",
    h1Template: (c) => `Chirurgia veterinaria a ${c}`,
    metaTitleTemplate: (c) => `Chirurgia Veterinaria a ${c} — Interventi chirurgici per animali`,
    metaDescTemplate: (c) => `Cerchi un chirurgo veterinario a ${c}? Consulta le strutture per sterilizzazioni, interventi ortopedici e chirurgia dei tessuti molli.`,
    introTemplate: (c) => `La chirurgia veterinaria comprende un'ampia gamma di interventi, dalle sterilizzazioni alla chirurgia ortopedica e oncologica. A ${c} puoi consultare le strutture con servizi chirurgici nella tua zona.`,
    summaryTemplate: (c) => `Chirurgo veterinario a ${c}: sterilizzazioni, ortopedia e chirurgia dei tessuti molli.`,
  },
];

// ── Helper: resolve keyword slug ──
export interface KeywordResolution {
  type: "city" | "animal" | "specialty" | "animal-city" | "service-city";
  pattern?: CityKeywordPattern;
  animalCityPattern?: AnimalCityKeywordPattern;
  serviceCityPattern?: ServiceCityKeywordPattern;
  city?: string;    // city slug
  animal?: AnimalKeywordPage;
  specialty?: SpecialtyKeywordPage;
}

export function resolveKeywordSlug(slug: string): KeywordResolution | null {
  // Check animal pages first (exact match)
  if (animalKeywordPages[slug]) {
    return { type: "animal", animal: animalKeywordPages[slug] };
  }

  // Check specialty pages (exact match)
  if (specialtyKeywordPages[slug]) {
    return { type: "specialty", specialty: specialtyKeywordPages[slug] };
  }

  // Check service+city patterns (longest prefix first)
  const sortedServiceCityPatterns = [...serviceCityKeywordPatterns].sort((a, b) => b.prefix.length - a.prefix.length);
  for (const pattern of sortedServiceCityPatterns) {
    if (slug.startsWith(pattern.prefix)) {
      const citySlug = slug.slice(pattern.prefix.length);
      if (citySlug) {
        return { type: "service-city", serviceCityPattern: pattern, city: citySlug };
      }
    }
  }

  // Check animal+city patterns BEFORE generic city patterns (longer prefixes first)
  for (const pattern of animalCityKeywordPatterns) {
    if (slug.startsWith(pattern.prefix)) {
      const citySlug = slug.slice(pattern.prefix.length);
      if (citySlug) {
        return { type: "animal-city", animalCityPattern: pattern, city: citySlug };
      }
    }
  }

  // Check city keyword patterns (prefix match — longest prefix first to avoid partial matches)
  const sortedCityPatterns = [...cityKeywordPatterns].sort((a, b) => b.prefix.length - a.prefix.length);
  for (const pattern of sortedCityPatterns) {
    if (slug.startsWith(pattern.prefix)) {
      const citySlug = slug.slice(pattern.prefix.length);
      if (citySlug) {
        return { type: "city", pattern, city: citySlug };
      }
    }
  }

  return null;
}
