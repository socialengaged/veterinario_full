// ── Parametric content generators for all page types ──
// Generates 300+ words of unique prose from page data without AI calls.

import type { Clinic, City } from "@/data/types";
import { cityEnrichmentData } from "@/data/city-enrichment";

// ── Helpers ──
const pluralize = (n: number, singular: string, plural: string) =>
  n === 1 ? `${n} ${singular}` : `${n} ${plural}`;

const listJoin = (items: string[], max = 5): string => {
  const shown = items.slice(0, max);
  const rest = items.length - max;
  return rest > 0
    ? `${shown.join(", ")} e altre ${rest}`
    : shown.length > 1
      ? `${shown.slice(0, -1).join(", ")} e ${shown[shown.length - 1]}`
      : shown[0] || "";
};

// ── 1) ProfilePage – ~300-400 words from clinic data ──
export function generateProfileProse(clinic: Clinic, cityName?: string): string {
  const typeMap: Record<string, string> = {
    clinica: "una clinica veterinaria",
    ambulatorio: "un ambulatorio veterinario",
    veterinario: "uno studio di medicina veterinaria",
  };
  const typeDesc = typeMap[clinic.type] || "una struttura veterinaria";
  const location = cityName || "la zona";

  const serviceNames = clinic.services.slice(0, 8);
  const animalNames = clinic.animals.slice(0, 6);
  const scrapedSvcs = clinic.scrapedServices || [];

  const parts: string[] = [];

  // ── Opening paragraph with location context ──
  parts.push(
    `${clinic.name} è ${typeDesc} situata a ${location}. ` +
    `La struttura è operativa nel settore veterinario e si occupa della cura e del benessere degli animali.` +
    (clinic.website ? ` Dispone di un sito web dedicato per informazioni aggiornate.` : "")
  );

  // ── Services paragraph — combine platform + scraped ──
  if (serviceNames.length > 0 || scrapedSvcs.length > 0) {
    let svcText = "";
    if (serviceNames.length > 0) {
      svcText = `Tra i servizi principali figurano ${listJoin(serviceNames.map(s => s.replace(/-/g, " ")))}`;
    }
    if (scrapedSvcs.length > 0) {
      const extraSvcs = scrapedSvcs.filter(s => !serviceNames.some(sn => s.toLowerCase().includes(sn.replace(/-/g, " "))));
      if (extraSvcs.length > 0 && svcText) {
        svcText += `. Il sito della struttura segnala inoltre: ${listJoin(extraSvcs, 6)}`;
      } else if (extraSvcs.length > 0) {
        svcText = `Dal sito web della struttura risultano disponibili: ${listJoin(extraSvcs, 8)}`;
      }
    }
    if (svcText) {
      svcText += ". ";
      svcText += clinic.emergencyAvailable
        ? `La struttura è dotata di servizio di pronto soccorso veterinario, garantendo assistenza anche in caso di emergenze urgenti, un aspetto fondamentale per la tranquillità dei proprietari.`
        : `Per le emergenze, è consigliabile contattare preventivamente la struttura per verificare la disponibilità e gli orari del servizio urgenze.`;
      parts.push(svcText);
    }
  }

  // ── Animals — categorized prose ──
  if (animalNames.length > 0) {
    const domestici = animalNames.filter(a => ["cane", "gatto", "cani", "gatti"].includes(a.toLowerCase()));
    const esotici = animalNames.filter(a => ["rettili", "uccelli", "pesci", "esotici", "tartaruga", "serpente", "pappagallo", "iguana"].includes(a.toLowerCase()));
    const altri = animalNames.filter(a => !domestici.includes(a) && !esotici.includes(a));

    let animalText = `${clinic.name} accoglie ${listJoin(animalNames)}`;
    if (esotici.length > 0) {
      animalText += `, con competenze specifiche anche per animali non convenzionali ed esotici — un servizio non sempre facile da trovare`;
    }
    animalText += `. L'approccio clinico è personalizzato in base alla specie, alla taglia e all'età del paziente, per garantire diagnosi accurate e terapie mirate.`;
    parts.push(animalText);
  }

  // ── Google Reviews — detailed analysis ──
  if (clinic.googleRating) {
    const r = clinic.googleRating;
    const count = clinic.googleReviewsCount || 0;
    const ratingDesc = r >= 4.7 ? "eccellente" : r >= 4.3 ? "molto positiva" : r >= 4.0 ? "buona" : r >= 3.5 ? "discreta" : "nella media";
    let reviewText = `Con una valutazione Google di ${r}/5`;
    if (count > 0) {
      reviewText += ` basata su ${count} ${count === 1 ? "recensione" : "recensioni"}`;
    }
    reviewText += `, ${clinic.name} gode di una reputazione ${ratingDesc} tra i proprietari di animali della zona.`;

    // Add context based on review volume
    if (count >= 100) {
      reviewText += ` L'elevato numero di recensioni indica una struttura consolidata con un'ampia base di pazienti fidelizzati.`;
    } else if (count >= 50) {
      reviewText += ` Il buon volume di feedback suggerisce una struttura apprezzata e frequentata nella comunità locale.`;
    } else if (count >= 20) {
      reviewText += ` Le recensioni disponibili offrono un quadro utile per valutare la qualità dell'assistenza offerta.`;
    }

    // Add sentiment cues
    if (r >= 4.5 && count >= 30) {
      reviewText += ` I proprietari apprezzano particolarmente la professionalità del personale, la chiarezza delle spiegazioni e l'attenzione verso il paziente animale.`;
    }
    parts.push(reviewText);
  }

  // ── Home visits ──
  if (clinic.homeVisits) {
    parts.push(
      `La struttura offre anche visite veterinarie a domicilio, un servizio particolarmente apprezzato ` +
      `per animali anziani con mobilità ridotta, soggetti di grossa taglia difficili da trasportare, ` +
      `o pazienti che soffrono di forte stress da trasporto. Il veterinario porta l'attrezzatura necessaria ` +
      `direttamente a casa del proprietario.`
    );
  }

  // ── Opening hours — parsed for richness ──
  if (clinic.openingHours) {
    const hours = clinic.openingHours;
    const hasWeekend = /sabato|domenica/i.test(hours) && !/chiuso/i.test(hours.split(/sabato/i)[1]?.split("|")[0] || "");
    const hasContinuato = /08:.*?(?:19|20)/i.test(hours) || /orario continuato/i.test(hours);
    let hoursText = `Gli orari di apertura sono: ${hours}. `;
    if (hasWeekend) {
      hoursText += `La disponibilità nel fine settimana è un plus importante per chi lavora durante la settimana. `;
    }
    if (hasContinuato) {
      hoursText += `L'orario continuato facilita l'accesso anche nelle ore centrali della giornata. `;
    }
    hoursText += `Si consiglia di contattare la struttura per confermare la disponibilità e prenotare un appuntamento.`;
    parts.push(hoursText);
  }

  // ── Practical advice paragraph (always) ──
  parts.push(
    `Prima di recarti presso ${clinic.name}, ti consigliamo di preparare il libretto sanitario del tuo animale, ` +
    `annotare eventuali sintomi osservati e portare la documentazione medica precedente. ` +
    `Un buon rapporto continuativo con il proprio veterinario è la base per una gestione sanitaria efficace ` +
    `e per la prevenzione delle patologie più comuni.`
  );

  return parts.join("\n\n");
}

// ── 2) CityPage – ~400-500 words from city + clinic data + enrichment ──
export function generateCityProse(
  city: City,
  clinicsCount: number,
  emergencyCount: number,
  homeVisitsCount: number,
  topServices: string[],
  provinceName: string,
): string {
  const parts: string[] = [];
  const enrichment = cityEnrichmentData[city.slug];

  // ── Opening — combine local context with veterinary intro ──
  if (enrichment?.intro) {
    // Extract useful facts from the intro (population, geography)
    const introText = enrichment.intro;
    parts.push(
      `${introText} ` +
      `L'assistenza veterinaria a ${city.name} è garantita da una rete di ` +
      `${pluralize(clinicsCount, "struttura veterinaria", "strutture veterinarie")} ` +
      `che coprono un'ampia gamma di servizi per animali domestici e da compagnia.`
    );
  } else {
    parts.push(
      `L'assistenza veterinaria a ${city.name} (CAP ${city.cap}) è garantita da una rete di ` +
      `${pluralize(clinicsCount, "struttura veterinaria", "strutture veterinarie")} ` +
      `che coprono un'ampia gamma di servizi per animali domestici e da compagnia. ` +
      `La città, situata in provincia di ${provinceName}, dispone di professionisti qualificati ` +
      `pronti a rispondere alle esigenze dei proprietari di animali della zona.`
    );
  }

  // ── Services available locally ──
  if (topServices.length > 0) {
    parts.push(
      `I servizi veterinari più richiesti a ${city.name} includono ${listJoin(topServices.map(s => s.replace(/-/g, " ")))}. ` +
      `Le strutture della zona sono attrezzate per offrire dalla medicina preventiva di base ` +
      `fino alla diagnostica avanzata e alle specialità chirurgiche. ` +
      `Per ogni esigenza specifica, il nostro servizio gratuito ti aiuta a individuare il professionista ` +
      `disponibile nella zona di ${provinceName}, confrontando le opzioni presenti.`
    );
  }

  // ── Emergency ──
  if (emergencyCount > 0) {
    parts.push(
      `Per le situazioni di emergenza, ${pluralize(emergencyCount, "struttura offre", "strutture offrono")} ` +
      `servizio di pronto soccorso veterinario a ${city.name}, garantendo assistenza anche ` +
      `nelle ore notturne e nei giorni festivi. In caso di urgenza — avvelenamento, trauma, ` +
      `difficoltà respiratoria o convulsioni — chiama prima di recarti per avvisare del tuo arrivo.`
    );
  } else {
    parts.push(
      `Al momento, nessuna struttura censita a ${city.name} offre servizio di pronto soccorso veterinario dedicato. ` +
      `In caso di emergenza, è consigliabile contattare le cliniche h24 nelle città limitrofe ` +
      `della provincia di ${provinceName} o inviare una richiesta tramite il nostro servizio per trovare ` +
      `rapidamente la struttura più vicina con pronto soccorso.`
    );
  }

  // ── Home visits ──
  if (homeVisitsCount > 0) {
    parts.push(
      `A ${city.name}, ${pluralize(homeVisitsCount, "professionista offre", "professionisti offrono")} ` +
      `il servizio di visite veterinarie a domicilio, particolarmente utile per animali anziani, ` +
      `di grossa taglia o per proprietari con difficoltà di spostamento. Il veterinario porta ` +
      `l'attrezzatura necessaria direttamente a casa, riducendo lo stress per l'animale.`
    );
  }

  // ── Local context — attractions tied to pet life ──
  if (enrichment?.attractions) {
    // Extract first attraction/landmark for local color
    const attrText = enrichment.attractions;
    const firstSentences = attrText.split(/[.!]/).slice(0, 2).join(". ").trim();
    if (firstSentences.length > 40) {
      parts.push(
        `${city.name} è anche una città ricca di storia e punti di interesse. ${firstSentences}. ` +
        `Chi possiede un animale domestico a ${city.name} può contare su un contesto urbano ` +
        `che spesso offre aree verdi e spazi all'aperto ideali per le passeggiate quotidiane con il proprio pet. ` +
        `Tuttavia, è importante ricordare che in aree di pregio storico e naturalistico ` +
        `i cani devono essere sempre al guinzaglio e muniti di museruola a portata di mano, come previsto dalla normativa vigente.`
      );
    }
  }

  // ── Aree verdi e parchi dog-friendly ──
  if (enrichment?.attractions && enrichment.attractions.length > 50) {
    const hasParks = /parco|giardino|villa comunale|verde|pineta|bosco|lago|lungomare|spiaggia/i.test(enrichment.attractions);
    if (hasParks) {
      parts.push(
        `${city.name} offre diverse aree verdi e spazi all'aperto ideali per passeggiate con il tuo animale. ` +
        `Prima di portare il cane in parchi pubblici e giardini, verifica la presenza di aree sgambamento dedicate ` +
        `dove poter lasciare il cane libero in sicurezza. Nelle altre aree è obbligatorio guinzaglio (max 1,5 m) ` +
        `e museruola a portata di mano. Porta sempre sacchetti per la raccolta e acqua fresca, ` +
        `soprattutto nei mesi estivi quando l'asfalto può raggiungere temperature pericolose per i cuscinetti plantari.`
      );
    } else {
      parts.push(
        `Se porti il tuo animale nelle aree pubbliche di ${city.name}, ricorda il guinzaglio obbligatorio ` +
        `(massimo 1,5 m) e la museruola a portata di mano. Individua le eventuali aree sgambamento cani ` +
        `del comune e porta sempre sacchetti igienici e acqua fresca per il tuo pet.`
      );
    }
  }

  // ── Closing — practical advice ──
  parts.push(
    `La scelta del veterinario a ${city.name} dipende dalle esigenze specifiche del tuo animale. ` +
    `Ti consigliamo di valutare la vicinanza, i servizi offerti, le recensioni di altri proprietari e ` +
    `la disponibilità di servizi specialistici. Prima della visita, prepara il libretto sanitario, ` +
    `annota i sintomi osservati e porta la documentazione medica precedente. ` +
    `Il nostro servizio è completamente gratuito e ti permette di consultare le strutture disponibili nella zona.`
  );

  return parts.join("\n\n");
}

// ── 3) KeywordCityPage – ~200 words based on angle ──
export function generateKeywordCityProse(
  angle: string,
  cityName: string,
  clinicsCount: number,
  emergencyCount: number,
  provinceName: string,
): string {
  const parts: string[] = [];

  if (angle === "emergency" || angle === "h24") {
    parts.push(
      `In caso di emergenza veterinaria a ${cityName}, la tempestività di intervento è il fattore più importante. ` +
      `Avvelenamenti, traumi stradali, difficoltà respiratorie, crisi convulsive e torsione gastrica ` +
      `sono tra le situazioni che richiedono assistenza immediata e non possono attendere il giorno successivo.`
    );
    parts.push(
      emergencyCount > 0
        ? `A ${cityName} sono presenti ${pluralize(emergencyCount, "struttura con servizio di emergenza", "strutture con servizio di emergenza")} veterinaria. ` +
          `Ti consigliamo di salvare in anticipo il numero di telefono della clinica h24 più vicina, ` +
          `così da poter agire rapidamente quando il tuo animale ha bisogno di aiuto urgente.`
        : `Al momento non risultano strutture con pronto soccorso dedicato a ${cityName}. ` +
          `In caso di emergenza, contatta le cliniche h24 nella provincia di ${provinceName} ` +
          `o utilizza il nostro servizio per individuare rapidamente la struttura più vicina.`
    );
    parts.push(
      `Prima di recarti al pronto soccorso veterinario, chiama per avvisare del tuo arrivo ` +
      `e descrivere la situazione. Non somministrare farmaci umani all'animale senza indicazione ` +
      `del veterinario e annota l'ora di inizio dei sintomi e qualsiasi sostanza potenzialmente ingerita.`
    );
  } else if (angle === "clinic") {
    parts.push(
      `Le cliniche veterinarie a ${cityName} offrono un livello di assistenza superiore rispetto ` +
      `ai semplici ambulatori, grazie alla disponibilità di sale chirurgiche attrezzate, ` +
      `reparti di diagnostica per immagini, laboratori d'analisi interni e possibilità di ricovero.`
    );
    parts.push(
      `Scegliere una clinica veterinaria a ${cityName} è particolarmente indicato quando il tuo animale ` +
      `necessita di interventi chirurgici, esami diagnostici avanzati (TAC, risonanza magnetica, ecografia), ` +
      `o un monitoraggio post-operatorio prolungato. Le cliniche dispongono generalmente di equipe ` +
      `multidisciplinari con specialisti in diverse branche della medicina veterinaria.`
    );
    parts.push(
      `In provincia di ${provinceName}, la rete di cliniche veterinarie garantisce standard qualitativi elevati. ` +
      `Il nostro servizio gratuito ti aiuta a confrontare le strutture disponibili a ${cityName} ` +
      `e a individuare quella disponibile nella zona per le esigenze specifiche del tuo animale.`
    );
  } else {
    // general
    parts.push(
      `Trovare un veterinario affidabile a ${cityName} è fondamentale per garantire la salute ` +
      `e il benessere del tuo animale domestico. Che si tratti di un controllo di routine, ` +
      `di vaccinazioni, di un problema comportamentale o di un'esigenza specialistica, ` +
      `la scelta del veterinario fa la differenza.`
    );
    parts.push(
      clinicsCount > 0
        ? `A ${cityName} sono presenti ${pluralize(clinicsCount, "struttura veterinaria censita", "strutture veterinarie censite")} ` +
          `nella nostra piattaforma, tra ambulatori, cliniche e studi professionali. ` +
          `Ogni struttura offre una combinazione diversa di servizi, orari e specializzazioni.`
        : `Al momento non sono presenti strutture censite a ${cityName}. Puoi inviare una richiesta ` +
          `di contatto gratuita per raggiungere i professionisti della zona.`
    );
    parts.push(
      `Per individuare il veterinario a ${cityName}, considera la vicinanza alla tua abitazione, ` +
      `i servizi offerti, la disponibilità di pronto soccorso, le recensioni degli altri proprietari ` +
      `e la possibilità di visite a domicilio. Il nostro servizio di ricerca è completamente gratuito ` +
      `e ti guida nella scelta migliore per il tuo animale.`
    );
  }

  return parts.join("\n\n");
}

// ── 4) KeywordAnimalCityPage – ~200 words ──
export function generateAnimalCityProse(
  animalName: string,
  animalNamePlural: string,
  cityName: string,
  animalClinicsCount: number,
  provinceName: string,
): string {
  const parts: string[] = [];

  parts.push(
    `Se hai ${animalName === "cane" || animalName === "gatto" ? `un ${animalName}` : `un/una ${animalName}`} a ${cityName}, ` +
    `trovare un veterinario con esperienza specifica è importante per garantire cure appropriate ` +
    `e personalizzate. Non tutti i veterinari hanno la stessa esperienza con ogni specie: ` +
    `affidarsi a un professionista che conosce le peculiarità ${animalName === "cane" ? "dei cani" : animalName === "gatto" ? "dei gatti" : `dei ${animalNamePlural}`} ` +
    `significa diagnosi più accurate e trattamenti più efficaci.`
  );

  parts.push(
    animalClinicsCount > 0
      ? `Nella zona di ${cityName} abbiamo individuato ${pluralize(animalClinicsCount, "struttura che tratta", "strutture che trattano")} ` +
        `${animalNamePlural}. Queste strutture offrono servizi specifici per questa specie, ` +
        `dalla medicina preventiva alla diagnostica, dalla chirurgia alle cure dentali.`
      : `Al momento non sono presenti strutture censite per ${animalNamePlural} a ${cityName}. ` +
        `Invia una richiesta di contatto gratuita per raggiungere i professionisti con esperienza ` +
        `specifica nella zona di ${provinceName}.`
  );

  parts.push(
    `I controlli periodici sono fondamentali per ${animalNamePlural}: una visita annuale ` +
    `permette di monitorare lo stato di salute, aggiornare il piano vaccinale e prevenire ` +
    `patologie comuni. Per ${animalNamePlural} anziani o con patologie croniche, sono consigliati ` +
    `controlli più frequenti, ogni 6 mesi.`
  );

  parts.push(
    `Il nostro servizio gratuito ti permette di consultare le strutture per ${animalNamePlural} disponibili ` +
    `a ${cityName} e nei comuni limitrofi, confrontando strutture, servizi offerti e disponibilità.`
  );

  return parts.join("\n\n");
}

// ── 5) KeywordServiceCityPage – ~200 words ──
export function generateServiceCityProse(
  serviceName: string,
  cityName: string,
  clinicsCount: number,
  provinceName: string,
): string {
  const sn = serviceName.toLowerCase();
  const parts: string[] = [];

  parts.push(
    `Stai cercando un servizio di ${sn} a ${cityName}? ` +
    `Trovare una struttura veterinaria qualificata per ${sn} nella zona di ${provinceName} ` +
    `è il primo passo per garantire al tuo animale le cure migliori. ` +
    `Il nostro servizio gratuito ti aiuta a individuare i professionisti più adatti ` +
    `nella tua zona, confrontando competenze, attrezzature e disponibilità.`
  );

  parts.push(
    clinicsCount > 0
      ? `A ${cityName} sono presenti ${pluralize(clinicsCount, "struttura veterinaria che offre", "strutture veterinarie che offrono")} ` +
        `${sn}. Ti consigliamo di contattare le strutture per verificare la disponibilità ` +
        `e concordare un appuntamento, soprattutto per i servizi specialistici.`
      : `Al momento non sono presenti strutture censite per ${sn} a ${cityName}. ` +
        `Puoi inviare una richiesta di contatto gratuita per raggiungere ` +
        `i professionisti disponibili nella provincia di ${provinceName}.`
  );

  parts.push(
    `Il costo di ${sn} può variare in base alla struttura, alla complessità del caso ` +
    `e alla specie animale. Prima della visita, è utile preparare il libretto sanitario ` +
    `dell'animale, annotare eventuali sintomi e portare la documentazione medica precedente. ` +
    `Un buon rapporto con il veterinario di riferimento è la base per una gestione sanitaria ` +
    `efficace e continuativa del tuo animale.`
  );

  return parts.join("\n\n");
}

// ── 6) KeywordAnimalPage (national) – ~200 words ──
export function generateAnimalPageProse(
  animalName: string,
  animalNamePlural: string,
  clinicsCount: number,
  commonServices: string[],
): string {
  const parts: string[] = [];

  parts.push(
    `Trovare un veterinario esperto per ${animalNamePlural} è essenziale per garantire ` +
    `una vita sana e serena al tuo animale. I ${animalNamePlural} hanno esigenze sanitarie ` +
    `specifiche che richiedono competenze dedicate: dalla medicina preventiva alla diagnostica, ` +
    `dalla nutrizione alla gestione delle patologie più comuni della specie.`
  );

  if (commonServices.length > 0) {
    parts.push(
      `I servizi veterinari più richiesti per ${animalNamePlural} includono ` +
      `${listJoin(commonServices.map(s => s.replace(/-/g, " ")))}. ` +
      `Un piano sanitario regolare, con visite annuali e vaccinazioni aggiornate, ` +
      `è la base per prevenire patologie e intervenire tempestivamente in caso di problemi.`
    );
  }

  parts.push(
    clinicsCount > 0
      ? `Nel nostro elenco sono presenti ${pluralize(clinicsCount, "struttura che tratta", "strutture che trattano")} ` +
        `${animalNamePlural} in tutta Italia. Consulta l'elenco per individuare ` +
        `le strutture disponibili nella tua zona.`
      : `Stiamo ampliando l'elenco di strutture per ${animalNamePlural}. ` +
        `Invia una richiesta di contatto gratuita per raggiungere i professionisti della tua zona.`
  );

  parts.push(
    `Il nostro servizio è completamente gratuito per i proprietari di ${animalNamePlural}. ` +
    `Puoi consultare le strutture disponibili nella tua zona, ` +
    `confrontando servizi offerti e disponibilità.`
  );

  return parts.join("\n\n");
}

// ── 7) KeywordSpecialtyPage – ~200 words ──
export function generateSpecialtyProse(
  specialtyName: string,
  summary: string,
  relatedServiceNames: string[],
): string {
  const sn = specialtyName.toLowerCase();
  const parts: string[] = [];

  parts.push(
    `La ${sn} è una branca della medicina veterinaria sempre più richiesta ` +
    `dai proprietari di animali domestici attenti alla salute del proprio pet. ` +
    `${summary}`
  );

  if (relatedServiceNames.length > 0) {
    parts.push(
      `I servizi correlati alla ${sn} includono ${listJoin(relatedServiceNames)}. ` +
      `Questi servizi sono spesso complementari e possono essere necessari ` +
      `per una diagnosi completa o un percorso terapeutico efficace. ` +
      `Attraverso il nostro servizio gratuito puoi individuare le strutture con competenze ` +
      `in ${sn} disponibili nella tua zona.`
    );
  }

  parts.push(
    `La scelta di un veterinario specializzato in ${sn} è particolarmente ` +
    `importante per patologie complesse che richiedono strumentazione dedicata ` +
    `e formazione specifica. Le strutture con specialisti in ${sn} offrono ` +
    `diagnosi più accurate, piani terapeutici mirati e migliori esiti clinici.`
  );

  parts.push(
    `Attraverso il nostro servizio gratuito puoi consultare le strutture disponibili, ` +
    `verificare le specializzazioni offerte e inviare una richiesta di contatto.`
  );

  return parts.join("\n\n");
}
