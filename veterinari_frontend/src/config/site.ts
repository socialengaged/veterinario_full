export const siteConfig = {
  name: "VeterinarioVicino.it",
  tagline: "Cerca un veterinario vicino a te",
  description: "VeterinarioVicino.it è un servizio gratuito di ricerca e contatto veterinario in Italia. Consulta l'elenco di veterinari e cliniche nella tua zona e invia una richiesta di contatto.",
  url: "https://veterinariovicino.it",
  /** Strutture censite (arrotondato; aggiornare se necessario rispetto all’elenco) */
  listedClinicCount: 2300,
  initialArea: "Italia",
  contact: {
    email: "veterinariovicino.it@gmail.com",
    phone: "+39 320 486 4478",
  },
  meta: {
    title: "VeterinarioVicino.it — Cerca veterinario e clinica veterinaria vicino a te",
    description: "Cerca veterinari nella tua zona. VeterinarioVicino.it: servizio gratuito di ricerca e contatto veterinario per cani, gatti e animali esotici in Italia.",
  },
};

export interface AnimalEntry {
  id: string;
  label: string;
  emoji: string;
}

export interface AnimalCategory {
  id: string;
  label: string;
  emoji: string;
  animals: AnimalEntry[];
}

export const animalCategories: AnimalCategory[] = [
  {
    id: "compagnia",
    label: "Animali da compagnia",
    emoji: "🏠",
    animals: [
      { id: "cane", label: "Cane", emoji: "🐕" },
      { id: "gatto", label: "Gatto", emoji: "🐈" },
      { id: "coniglio", label: "Coniglio", emoji: "🐇" },
      { id: "furetto", label: "Furetto", emoji: "🦡" },
      { id: "criceto", label: "Criceto", emoji: "🐹" },
      { id: "cavia", label: "Cavia", emoji: "🐹" },
      { id: "gerbillo", label: "Gerbillo", emoji: "🐭" },
      { id: "cincillà", label: "Cincillà", emoji: "🐭" },
    ],
  },
  {
    id: "esotici",
    label: "Animali esotici",
    emoji: "🦎",
    animals: [
      { id: "tartaruga", label: "Tartaruga", emoji: "🐢" },
      { id: "serpente", label: "Serpente", emoji: "🐍" },
      { id: "lucertola", label: "Lucertola", emoji: "🦎" },
      { id: "iguana", label: "Iguana", emoji: "🦎" },
      { id: "geco", label: "Geco", emoji: "🦎" },
      { id: "rana", label: "Rana", emoji: "🐸" },
      { id: "pesci-ornamentali", label: "Pesci ornamentali", emoji: "🐠" },
      { id: "axolotl", label: "Axolotl", emoji: "🦎" },
      { id: "petauro", label: "Petauro dello zucchero", emoji: "🐿️" },
      { id: "riccio-africano", label: "Riccio africano", emoji: "🦔" },
      { id: "cincilla-nano", label: "Cincillà nano", emoji: "🐭" },
    ],
  },
  {
    id: "uccelli",
    label: "Uccelli",
    emoji: "🦜",
    animals: [
      { id: "pappagallo", label: "Pappagallo", emoji: "🦜" },
      { id: "canarino", label: "Canarino", emoji: "🐦" },
      { id: "parrocchetto", label: "Parrocchetto", emoji: "🦜" },
      { id: "rapaci", label: "Rapaci", emoji: "🦅" },
      { id: "avicoli-ornamentali", label: "Avicoli ornamentali", emoji: "🐓" },
    ],
  },
  {
    id: "fattoria",
    label: "Animali da fattoria",
    emoji: "🐴",
    animals: [
      { id: "cavallo", label: "Cavallo", emoji: "🐴" },
      { id: "mucca", label: "Mucca", emoji: "🐄" },
      { id: "pecora", label: "Pecora", emoji: "🐑" },
      { id: "capra", label: "Capra", emoji: "🐐" },
      { id: "maiale", label: "Maiale", emoji: "🐷" },
      { id: "gallina", label: "Gallina", emoji: "🐔" },
      { id: "tacchino", label: "Tacchino", emoji: "🦃" },
    ],
  },
  {
    id: "sport",
    label: "Animali per sport",
    emoji: "🏇",
    animals: [
      { id: "cavallo-sportivo", label: "Cavallo sportivo", emoji: "🏇" },
      { id: "cane-da-caccia", label: "Cane da caccia", emoji: "🐕‍🦺" },
      { id: "cane-pastore", label: "Cane pastore", emoji: "🐕" },
    ],
  },
];

// Flat list for backward compatibility
export const animals = animalCategories.flatMap((c) => c.animals);

export type AnimalId = string;

const standardPetServices = [
  { id: "visita", label: "Visita veterinaria" },
  { id: "vaccinazioni", label: "Vaccinazioni" },
  { id: "domicilio", label: "Visita a domicilio" },
  { id: "esami", label: "Esami / analisi del sangue" },
  { id: "chirurgia", label: "Chirurgia / sterilizzazione" },
  { id: "ecografia", label: "Ecografia / radiografia" },
  { id: "dermatologia", label: "Dermatologia" },
  { id: "ortopedia", label: "Ortopedia" },
  { id: "cardiologia", label: "Cardiologia" },
  { id: "nutrizione", label: "Nutrizione / dieta" },
  { id: "microchip", label: "Microchip" },
  { id: "check-up", label: "Check-up annuale" },
];

const exoticServices = [
  { id: "visita-esotici", label: "Visita per animali esotici" },
  { id: "consulenza", label: "Consulenza specialistica" },
  { id: "controllo", label: "Controllo generale" },
  { id: "nutrizione", label: "Nutrizione / dieta" },
  { id: "esami", label: "Esami / analisi" },
];

const farmServices = [
  { id: "visita-rurale", label: "Visita veterinaria rurale" },
  { id: "profilassi", label: "Profilassi e vaccinazioni" },
  { id: "riproduzione", label: "Assistenza riproduzione" },
  { id: "consulenza", label: "Consulenza zootecnica" },
  { id: "ortopedia", label: "Ortopedia" },
  { id: "nutrizione", label: "Nutrizione" },
];

const equineServices = [
  { id: "visita-equina", label: "Visita veterinaria equina" },
  { id: "ortopedia", label: "Ortopedia / zoppie" },
  { id: "dentistica", label: "Dentistica equina" },
  { id: "riproduzione", label: "Riproduzione" },
  { id: "nutrizione", label: "Nutrizione sportiva" },
  { id: "medicina-sportiva", label: "Medicina sportiva" },
];

const categoryServiceMap: Record<string, typeof standardPetServices> = {
  compagnia: standardPetServices,
  esotici: exoticServices,
  uccelli: exoticServices,
  fattoria: farmServices,
  lavoro: standardPetServices,
};

// Build servicesByAnimal from categories
export const servicesByAnimal: Record<string, { id: string; label: string }[]> = {};
for (const cat of animalCategories) {
  const svc = categoryServiceMap[cat.id] || exoticServices;
  for (const a of cat.animals) {
    servicesByAnimal[a.id] = svc;
  }
}
// Override for equine animals
servicesByAnimal["cavallo"] = equineServices;
servicesByAnimal["cavallo-sportivo"] = equineServices;

export const coveredAreas = [
  { province: "Lecce", cities: ["Lecce", "Gallipoli", "Otranto", "Nardò", "Galatina", "Maglie", "Casarano"] },
  { province: "Brindisi", cities: ["Brindisi", "Fasano", "Ostuni", "Francavilla Fontana", "Mesagne"] },
  { province: "Taranto", cities: ["Taranto", "Martina Franca", "Manduria", "Grottaglie", "Massafra"] },
  { province: "Bari", cities: ["Bari", "Altamura", "Monopoli", "Bitonto", "Conversano"] },
];

export const popularServices = [
  { id: "visita", title: "Visita veterinaria", description: "Controllo di routine o prima visita per il tuo animale", icon: "🩺" },
  { id: "vaccinazioni", title: "Vaccinazioni", description: "Piano vaccinale completo e richiami periodici", icon: "💉" },
  { id: "chirurgia", title: "Chirurgia", description: "Interventi chirurgici e sterilizzazioni", icon: "🏥" },
  { id: "domicilio", title: "Visita a domicilio", description: "Il veterinario viene direttamente a casa tua", icon: "🏠" },
  { id: "esotici", title: "Animali esotici", description: "Cure specializzate per rettili, uccelli e piccoli mammiferi", icon: "🦎" },
  { id: "dermatologia", title: "Dermatologia", description: "Allergie, dermatiti, otiti e problemi cutanei", icon: "🔬" },
  { id: "ortopedia", title: "Ortopedia", description: "Fratture, displasia, legamenti e articolazioni", icon: "🦴" },
  { id: "nutrizione", title: "Nutrizione", description: "Piani alimentari personalizzati e gestione del peso", icon: "🥗" },
  { id: "check-up", title: "Check-up annuale", description: "Controllo completo dello stato di salute", icon: "📋" },
];
