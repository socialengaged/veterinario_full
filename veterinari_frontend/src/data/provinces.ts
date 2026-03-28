import type { Province } from "./types";

export const provinces: Record<string, Province> = {
  lecce: {
    slug: "lecce",
    name: "Lecce",
    regionSlug: "puglia",
    metaTitle: "Veterinario in provincia di Lecce — Strutture veterinarie nel Salento",
    metaDescription: "Cerca un veterinario in provincia di Lecce. Servizio gratuito di ricerca e contatto veterinario nel Salento.",
    intro: "La provincia di Lecce, cuore del Salento, è servita da numerosi ambulatori e cliniche veterinarie. Dalle città costiere come Gallipoli e Otranto ai centri interni come Maglie e Galatina, consulta l'elenco delle strutture veterinarie disponibili nella zona.",
    cities: ["lecce", "gallipoli", "nardo", "otranto", "maglie", "galatina", "tricase", "casarano", "copertino", "ugento", "santa-maria-di-leuca", "san-cesario-di-lecce", "taviano"],
  },
  brindisi: {
    slug: "brindisi",
    name: "Brindisi",
    regionSlug: "puglia",
    metaTitle: "Veterinario in provincia di Brindisi — Strutture veterinarie locali",
    metaDescription: "Cerca un veterinario in provincia di Brindisi. Servizio gratuito di ricerca e contatto veterinario.",
    intro: "La provincia di Brindisi, tra la Valle d'Itria e il Salento settentrionale, offre diverse strutture veterinarie distribuite tra Ostuni, Fasano, Francavilla Fontana e il capoluogo.",
    cities: ["brindisi", "ostuni", "fasano", "mesagne"],
  },
  taranto: {
    slug: "taranto",
    name: "Taranto",
    regionSlug: "puglia",
    metaTitle: "Veterinario in provincia di Taranto — Strutture veterinarie",
    metaDescription: "Cerca un veterinario in provincia di Taranto. Servizio gratuito di ricerca e contatto veterinario.",
    intro: "La provincia di Taranto, dalla città dei due mari alla splendida Martina Franca, è un territorio dove il nostro servizio di ricerca veterinaria è in fase di attivazione.",
    cities: ["taranto", "martina-franca"],
  },
  bari: {
    slug: "bari",
    name: "Bari",
    regionSlug: "puglia",
    metaTitle: "Veterinario in provincia di Bari — Strutture veterinarie",
    metaDescription: "Cerca un veterinario in provincia di Bari. Servizio gratuito di ricerca e contatto veterinario.",
    intro: "La provincia di Bari, il capoluogo della Puglia, è il centro nevralgico della regione con un'ampia offerta di servizi veterinari.",
    cities: ["bari", "monopoli", "conversano"],
  },
};
