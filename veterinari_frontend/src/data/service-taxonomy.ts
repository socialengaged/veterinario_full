// ── Service Taxonomy ──
// Structured as Category → Subcategory for easy expansion.
// To add a new subcategory, just add an entry to the `sub` array.
// To add a new category, add a new object to `serviceTaxonomy`.

export interface ServiceSubcategory {
  id: string;
  label: string;
  description?: string;
}

export interface ServiceTaxonomyCategory {
  id: string;
  label: string;
  emoji: string;
  sub: ServiceSubcategory[];
}

export const serviceTaxonomy: ServiceTaxonomyCategory[] = [
  {
    id: "visita",
    label: "Visita e controllo",
    emoji: "🩺",
    sub: [
      { id: "visita-base", label: "Visita di base", description: "Prima visita o controllo generale" },
      { id: "checkup-annuale", label: "Check-up annuale", description: "Controllo periodico completo" },
      { id: "visita-domicilio", label: "Visita a domicilio", description: "Il veterinario viene a casa tua" },
      { id: "seconda-opinione", label: "Seconda opinione", description: "Consulto su diagnosi o terapia esistente" },
      { id: "certificato-salute", label: "Certificato di salute", description: "Per viaggi, adozioni o documenti" },
    ],
  },
  {
    id: "diagnostica",
    label: "Diagnostica per immagini",
    emoji: "🔬",
    sub: [
      { id: "radiografia", label: "Radiografia (raggi X)", description: "Ossa, torace, addome" },
      { id: "ecografia", label: "Ecografia", description: "Organi addominali, gravidanza, cuore" },
      { id: "tac", label: "TAC (tomografia computerizzata)", description: "Immagini 3D ad alta risoluzione" },
      { id: "risonanza", label: "Risonanza magnetica (RM)", description: "Cervello, midollo spinale, tessuti molli" },
      { id: "endoscopia", label: "Endoscopia", description: "Esplorazione interna non invasiva" },
      { id: "fluoroscopia", label: "Fluoroscopia", description: "Radiografia in tempo reale" },
    ],
  },
  {
    id: "analisi",
    label: "Analisi e laboratorio",
    emoji: "🧪",
    sub: [
      { id: "esami-sangue", label: "Esami del sangue", description: "Emocromo, biochimica, profili specifici" },
      { id: "esame-urine", label: "Esame delle urine", description: "Analisi chimico-fisica e sedimento" },
      { id: "esame-feci", label: "Esame delle feci", description: "Parassitologia e coprologico" },
      { id: "citologia", label: "Citologia", description: "Analisi cellulare di masse e lesioni" },
      { id: "istologia", label: "Istologia / biopsia", description: "Analisi dei tessuti" },
      { id: "test-allergici", label: "Test allergici", description: "Pannelli allergologici cutanei e sierologici" },
      { id: "microbiologia", label: "Microbiologia e colture", description: "Antibiogramma e colture batteriche" },
    ],
  },
  {
    id: "chirurgia",
    label: "Chirurgia",
    emoji: "🏥",
    sub: [
      { id: "chirurgia-generale", label: "Chirurgia generale", description: "Interventi addominali e dei tessuti molli" },
      { id: "sterilizzazione", label: "Sterilizzazione / castrazione", description: "Ovariectomia, orchiectomia" },
      { id: "chirurgia-ortopedica", label: "Chirurgia ortopedica", description: "Fratture, legamenti, TPLO, protesi" },
      { id: "chirurgia-oncologica", label: "Chirurgia oncologica", description: "Rimozione tumori e masse" },
      { id: "chirurgia-oculistica", label: "Chirurgia oculistica", description: "Interventi su occhi e palpebre" },
      { id: "chirurgia-dentale", label: "Chirurgia dentale", description: "Estrazioni, igiene sotto sedazione" },
      { id: "chirurgia-mininvasiva", label: "Chirurgia mininvasiva", description: "Laparoscopia e toracoscopia" },
      { id: "chirurgia-urgenza", label: "Chirurgia d'urgenza", description: "Interventi immediati salvavita" },
    ],
  },
  {
    id: "specialistica",
    label: "Visite specialistiche",
    emoji: "⚕️",
    sub: [
      { id: "dermatologia", label: "Dermatologia", description: "Allergie, dermatiti, otiti, pelo" },
      { id: "ortopedia", label: "Ortopedia", description: "Ossa, articolazioni, legamenti, displasia" },
      { id: "cardiologia", label: "Cardiologia", description: "Ecocardiografia, aritmie, insufficienza" },
      { id: "neurologia", label: "Neurologia", description: "Convulsioni, paresi, ernie discali" },
      { id: "oftalmologia", label: "Oftalmologia", description: "Occhi, cataratta, glaucoma, ulcere" },
      { id: "oncologia", label: "Oncologia", description: "Tumori, chemioterapia, stadiazione" },
      { id: "endocrinologia", label: "Endocrinologia", description: "Diabete, tiroide, Cushing, Addison" },
      { id: "gastroenterologia", label: "Gastroenterologia", description: "Vomito cronico, IBD, pancreatite" },
      { id: "nefrologia", label: "Nefrologia / Urologia", description: "Insufficienza renale, calcoli, cistiti" },
      { id: "pneumologia", label: "Pneumologia", description: "Asma, bronchite, versamento pleurico" },
      { id: "riproduzione", label: "Riproduzione / Ostetricia", description: "Accoppiamento, gravidanza, parto" },
      { id: "comportamento", label: "Medicina comportamentale", description: "Ansia, aggressività, fobie" },
    ],
  },
  {
    id: "prevenzione",
    label: "Prevenzione",
    emoji: "🛡️",
    sub: [
      { id: "vaccinazioni", label: "Vaccinazioni", description: "Piano vaccinale e richiami" },
      { id: "antiparassitari", label: "Antiparassitari", description: "Pulci, zecche, vermi, filaria" },
      { id: "microchip", label: "Microchip", description: "Identificazione e registrazione anagrafe" },
      { id: "profilassi-filaria", label: "Profilassi filariosi", description: "Prevenzione della filaria cardiopolmonare" },
      { id: "profilassi-leishmania", label: "Profilassi leishmaniosi", description: "Vaccino e prevenzione leishmaniosi" },
      { id: "esame-preconcezionale", label: "Esame preconcezionale", description: "Screening prima dell'accoppiamento" },
    ],
  },
  {
    id: "nutrizione",
    label: "Nutrizione e dieta",
    emoji: "🥗",
    sub: [
      { id: "consulenza-alimentare", label: "Consulenza alimentare", description: "Piano alimentare personalizzato" },
      { id: "dieta-terapeutica", label: "Dieta terapeutica", description: "Alimentazione per patologie specifiche" },
      { id: "gestione-peso", label: "Gestione del peso", description: "Sovrappeso, obesità, sottopeso" },
      { id: "nutrizione-cucciolo", label: "Nutrizione cucciolo/gattino", description: "Alimentazione in fase di crescita" },
      { id: "nutrizione-senior", label: "Nutrizione senior", description: "Dieta per animali anziani" },
      { id: "intolleranze-alimentari", label: "Intolleranze alimentari", description: "Diete di eliminazione e test" },
    ],
  },
  {
    id: "emergenza",
    label: "Emergenza e urgenza",
    emoji: "🚨",
    sub: [
      { id: "pronto-soccorso", label: "Pronto soccorso H24", description: "Emergenza medica immediata" },
      { id: "terapia-intensiva", label: "Terapia intensiva", description: "Ricovero e monitoraggio continuo" },
      { id: "avvelenamento", label: "Avvelenamento", description: "Ingestione di sostanze tossiche" },
      { id: "trauma", label: "Trauma / incidente", description: "Investimento, caduta, morso" },
      { id: "difficolta-respiratoria", label: "Difficoltà respiratoria", description: "Dispnea, ostruzione, collasso" },
      { id: "torsione-gastrica", label: "Torsione gastrica (GDV)", description: "Emergenza chirurgica addominale" },
      { id: "colpo-calore", label: "Colpo di calore", description: "Ipertermia da esposizione" },
    ],
  },
  {
    id: "riabilitazione",
    label: "Riabilitazione e fisioterapia",
    emoji: "🏃",
    sub: [
      { id: "fisioterapia", label: "Fisioterapia", description: "Recupero post-operatorio e funzionale" },
      { id: "idroterapia", label: "Idroterapia", description: "Riabilitazione in acqua" },
      { id: "laserterapia", label: "Laserterapia", description: "Trattamento antinfiammatorio e antalgico" },
      { id: "elettrostimolazione", label: "Elettrostimolazione", description: "Stimolazione muscolare e nervosa" },
      { id: "agopuntura", label: "Agopuntura veterinaria", description: "Medicina integrativa per dolore e infiammazione" },
    ],
  },
  {
    id: "odontoiatria",
    label: "Odontoiatria",
    emoji: "🦷",
    sub: [
      { id: "detartrasi", label: "Detartrasi (pulizia denti)", description: "Rimozione tartaro sotto sedazione" },
      { id: "estrazione-dentale", label: "Estrazione dentale", description: "Denti fratturati, ascessi, resorption" },
      { id: "radiografia-dentale", label: "Radiografia dentale", description: "RX endorale per radici e strutture" },
      { id: "trattamento-gengivite", label: "Trattamento gengivite/stomatite", description: "Infiammazione gengivale e orale" },
    ],
  },
  {
    id: "cura",
    label: "Cura e benessere",
    emoji: "🏡",
    sub: [
      { id: "pensione", label: "Asilo / Pensione", description: "Ospitalità durante le tue assenze" },
      { id: "pet-sitter", label: "Pet sitter", description: "Assistenza a domicilio" },
      { id: "dog-walking", label: "Dog walking", description: "Passeggiate professionali" },
      { id: "toelettatura", label: "Toelettatura / grooming", description: "Bagno, taglio pelo, igiene" },
      { id: "educazione", label: "Educazione cinofila", description: "Addestramento e socializzazione" },
      { id: "trasporto", label: "Trasporto animali", description: "Accompagnamento in clinica o aeroporto" },
    ],
  },
  {
    id: "animali-esotici",
    label: "Animali esotici e non convenzionali",
    emoji: "🦎",
    sub: [
      { id: "visita-esotici", label: "Visita per esotici", description: "Rettili, uccelli, piccoli mammiferi" },
      { id: "chirurgia-esotici", label: "Chirurgia esotici", description: "Interventi su specie non convenzionali" },
      { id: "nutrizione-esotici", label: "Nutrizione esotici", description: "Alimentazione specifica per specie" },
      { id: "sessaggio", label: "Sessaggio", description: "Determinazione del sesso (rettili, uccelli)" },
      { id: "cites-documentazione", label: "Documentazione CITES", description: "Certificati per specie protette" },
    ],
  },
  {
    id: "rurale",
    label: "Veterinaria rurale e equina",
    emoji: "🐴",
    sub: [
      { id: "visita-rurale", label: "Visita rurale", description: "Assistenza in azienda agricola" },
      { id: "profilassi-allevamento", label: "Profilassi allevamento", description: "Vaccinazioni e piani sanitari" },
      { id: "riproduzione-equina", label: "Riproduzione equina", description: "Fecondazione, gestione gravidanza" },
      { id: "ferratura", label: "Mascalcia / ferratura", description: "Cura degli zoccoli" },
      { id: "dentistica-equina", label: "Dentistica equina", description: "Limatura e cura dentale" },
      { id: "medicina-sportiva", label: "Medicina sportiva equina", description: "Performance e riabilitazione" },
      { id: "consulenza-zootecnica", label: "Consulenza zootecnica", description: "Gestione sanitaria dell'allevamento" },
    ],
  },
];

// ── Helper functions ──

/** Get all categories */
export const getTaxonomyCategories = () => serviceTaxonomy;

/** Get a category by ID */
export const getTaxonomyCategory = (id: string) =>
  serviceTaxonomy.find((c) => c.id === id);

/** Get subcategories for a category */
export const getSubcategories = (categoryId: string) =>
  serviceTaxonomy.find((c) => c.id === categoryId)?.sub || [];

/** Get a specific subcategory */
export const getSubcategory = (categoryId: string, subId: string) =>
  getSubcategories(categoryId).find((s) => s.id === subId);

/** Flat list of all subcategories with their parent category */
export const getAllSubcategoriesFlat = () =>
  serviceTaxonomy.flatMap((cat) =>
    cat.sub.map((sub) => ({ ...sub, categoryId: cat.id, categoryLabel: cat.label, categoryEmoji: cat.emoji }))
  );
