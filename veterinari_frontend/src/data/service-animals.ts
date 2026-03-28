import type { ServiceAnimalPage } from "./types";

export const serviceAnimalPages: Record<string, ServiceAnimalPage> = {
  "checkup-cane": {
    slug: "checkup-cane",
    serviceSlug: "check-up-veterinario",
    animalId: "cane",
    animalName: "Cane",
    animalEmoji: "🐕",
    serviceName: "Check-up",
    metaTitle: "Check-up Cane — Visita di controllo completa per il tuo cane",
    metaDescription:
      "Tutto sul check-up veterinario per il cane: cosa include, quando farlo, costi indicativi e segnali d'allarme. Richiedi un appuntamento.",
    h1: "Check-up veterinario per il cane",
    answerSummary:
      "Il check-up veterinario per il cane è un esame clinico completo che valuta lo stato di salute generale attraverso il controllo di peso, cuore, polmoni, addome, cute, denti, occhi e orecchie. È raccomandato almeno una volta l'anno per cani adulti e ogni 6 mesi per cuccioli e cani anziani.",
    quickFacts: [
      { label: "Animale", value: "🐕 Cane" },
      { label: "Servizio", value: "Check-up completo" },
      { label: "Frequenza raccomandata", value: "1 volta/anno (adulti)" },
      { label: "Durata media", value: "20-40 minuti" },
      { label: "Costo indicativo", value: "40–80 €" },
    ],
    intro:
      "Il check-up annuale è il pilastro della medicina preventiva canina. Consente al veterinario di individuare precocemente patologie silenti — come malattie cardiache, problemi renali o tumori — prima che diventino clinicamente evidenti. Il cane, a differenza dell'uomo, non può riferire i propri sintomi: un controllo periodico è spesso l'unico modo per cogliere segnali precoci.",
    whatIncludes: [
      "Pesatura e valutazione del Body Condition Score (BCS), l'indice corporeo che indica se il cane è in sovrappeso, sottopeso o in forma",
      "Auscultazione cardiopolmonare per rilevare soffi, aritmie o suoni respiratori anomali",
      "Palpazione addominale per valutare organi interni (fegato, milza, reni, intestino) e individuare masse anomale",
      "Esame del cavo orale: tartaro, gengiviti, denti fratturati o ascessi che nel cane sono spesso sottovalutati",
      "Controllo oculare: lacrimazione, opacità del cristallino (frequente nei cani anziani), arrossamento congiuntivale",
      "Ispezione delle orecchie: cerume, infezioni, acari — specialmente nelle razze con orecchie pendenti (Cocker, Basset Hound)",
      "Valutazione della cute e del mantello: perdita di pelo, forfora, parassiti, noduli cutanei",
      "Controllo dei linfonodi periferici per escludere linfoadenopatie",
      "Aggiornamento del piano vaccinale e del trattamento antiparassitario",
      "Colloquio con il proprietario su alimentazione, comportamento, attività fisica e abitudini",
    ],
    whenToDo: [
      {
        title: "Adozione di un nuovo cane",
        description:
          "Alla prima visita il veterinario valuterà lo stato generale, imposterà il piano vaccinale e antiparassitario, verificherà la presenza del microchip e darà indicazioni sull'alimentazione più adatta all'età e alla taglia.",
      },
      {
        title: "Controllo annuale di routine",
        description:
          "Per cani adulti sani tra 1 e 7 anni è sufficiente un check-up annuale. È il momento ideale per aggiornare vaccini, valutare il peso e discutere eventuali cambiamenti nel comportamento.",
      },
      {
        title: "Check-up semestrale per cani anziani",
        description:
          "Dai 7 anni in su (5 anni per razze giganti come Alano e San Bernardo) è consigliabile un controllo ogni 6 mesi, spesso con esami del sangue per monitorare funzionalità renale ed epatica.",
      },
      {
        title: "Cambio di alimentazione o stile di vita",
        description:
          "Se hai cambiato dieta al cane, se ha iniziato a fare più o meno esercizio fisico, o se noti variazioni nel peso, un check-up aiuta a verificare che tutto sia in ordine.",
      },
    ],
    warningSignsTitle: "Segnali che indicano la necessità di un controllo urgente nel cane",
    warningSigns: [
      "Perdita di appetito che dura più di 2 giorni",
      "Aumento anomalo della sete e della minzione (possibile diabete, insufficienza renale o Cushing)",
      "Letargia, riluttanza a muoversi o a giocare",
      "Perdita di peso non giustificata da cambio di alimentazione",
      "Tosse persistente, soprattutto notturna (possibile cardiopatia)",
      "Noduli o masse cutanee nuove o in crescita",
      "Alito cattivo (può indicare problemi dentali o metabolici)",
      "Zoppia o rigidità articolare, soprattutto al risveglio",
    ],
    ageGuidance: [
      {
        stage: "Cucciolo (0-12 mesi)",
        recommendation:
          "Visite ogni 3-4 settimane per il ciclo vaccinale. Controllo della crescita, sviluppo osseo, chiusura della fontanella nelle razze toy e consulenza su socializzazione e alimentazione.",
      },
      {
        stage: "Adulto (1-7 anni)",
        recommendation:
          "Check-up annuale con aggiornamento vaccinale. Valutazione dentale, controllo del peso e prevenzione antiparassitaria. Nelle razze predisposte, screening cardiaco o ortopedico.",
      },
      {
        stage: "Senior (7+ anni)",
        recommendation:
          "Check-up ogni 6 mesi con esami ematochimici, profilo tiroideo e analisi delle urine. Monitoraggio della funzionalità renale, epatica e cardiaca. Valutazione del dolore cronico e della mobilità articolare.",
      },
    ],
    costRange: "40–80 €",
    faq: [
      {
        q: "Ogni quanto portare il cane dal veterinario per un check-up?",
        a: "Per cani adulti sani, una volta all'anno è sufficiente. I cuccioli necessitano di visite più frequenti (ogni 3-4 settimane durante il ciclo vaccinale), mentre per i cani senior (oltre i 7 anni) si consigliano controlli semestrali.",
      },
      {
        q: "Cosa comprende un check-up completo per il cane?",
        a: "Un check-up completo include esame fisico (peso, cuore, polmoni, addome), controllo di denti, occhi e orecchie, valutazione della cute e del mantello, aggiornamento vaccinale e colloquio su alimentazione e comportamento.",
      },
      {
        q: "Quanto costa un check-up per il cane?",
        a: "Il costo varia in base alla zona e alla struttura, generalmente tra 40 e 80 euro per la visita di base. Esami del sangue o diagnostica aggiuntiva comportano costi supplementari. Il nostro servizio di ricerca è gratuito.",
      },
      {
        q: "Il check-up è doloroso per il cane?",
        a: "No, il check-up è indolore. Si tratta di un esame fisico in cui il veterinario osserva, palpa e ausculta. Solo eventuali prelievi di sangue possono causare un leggero fastidio momentaneo.",
      },
      {
        q: "Devo portare qualcosa alla visita?",
        a: "Porta il libretto sanitario del cane, annota eventuali cambiamenti osservati (appetito, comportamento, sintomi) e prepara domande per il veterinario. Se il cane è in terapia, porta i farmaci attuali.",
      },
    ],
    relatedServiceAnimals: ["sterilizzazione-cane", "vaccinazioni-cane"],
    disclaimer:
      "Le informazioni riportate hanno scopo informativo e orientativo. Non sostituiscono il parere di un medico veterinario. Ogni cane è un individuo: il piano di check-up deve essere personalizzato dal professionista.",
  },

  "sterilizzazione-gatto": {
    slug: "sterilizzazione-gatto",
    serviceSlug: "sterilizzazione-animali",
    animalId: "gatto",
    animalName: "Gatto",
    animalEmoji: "🐈",
    serviceName: "Sterilizzazione",
    metaTitle: "Sterilizzazione Gatto — Guida completa a castrazione e sterilizzazione felina",
    metaDescription:
      "Tutto sulla sterilizzazione del gatto: età ideale, procedura, costi, vantaggi e recupero post-operatorio. Richiedi un appuntamento.",
    h1: "Sterilizzazione del gatto",
    answerSummary:
      "La sterilizzazione del gatto è un intervento chirurgico che previene la riproduzione e riduce significativamente il rischio di tumori mammari, piometra (nella gatta) e comportamenti indesiderati come marcatura urinaria e fughe (nel gatto maschio). È raccomandata a partire dai 5-6 mesi di età.",
    quickFacts: [
      { label: "Animale", value: "🐈 Gatto" },
      { label: "Intervento", value: "Ovariectomia (femmina) / Orchiectomia (maschio)" },
      { label: "Età consigliata", value: "5-6 mesi" },
      { label: "Durata intervento", value: "15-30 minuti" },
      { label: "Recupero", value: "7-10 giorni" },
      { label: "Costo indicativo", value: "80–200 €" },
    ],
    intro:
      "La sterilizzazione è uno degli interventi più comuni e più importanti nella medicina felina. Oltre a prevenire gravidanze indesiderate — un problema particolarmente rilevante per i gatti con accesso all'esterno — offre benefici concreti per la salute e il benessere del gatto. Nel maschio riduce la marcatura territoriale con urina, l'aggressività verso altri gatti e la tendenza a vagare, riducendo il rischio di incidenti e malattie infettive (FIV, FeLV). Nella femmina elimina il rischio di piometra (infezione uterina potenzialmente letale) e riduce drasticamente l'incidenza di tumori mammari se eseguita prima del primo calore.",
    whatIncludes: [
      "Visita pre-operatoria per valutare l'idoneità all'anestesia",
      "Esami del sangue pre-chirurgici (emocromo, profilo renale ed epatico) per escludere rischi anestesiologici",
      "Anestesia generale con monitoraggio costante di frequenza cardiaca, ossigenazione e temperatura",
      "Nella gatta: ovariectomia (asportazione delle ovaie) o ovarioisterectomia (ovaie + utero) tramite incisione addominale di pochi centimetri",
      "Nel gatto maschio: orchiectomia (asportazione dei testicoli), intervento più breve e meno invasivo",
      "Terapia antidolorifica pre e post-operatoria per garantire il massimo comfort",
      "Risveglio assistito e monitoraggio post-anestesia",
      "Visita di controllo a 7-10 giorni per la rimozione dei punti (se presenti) e verifica della guarigione",
    ],
    whenToDo: [
      {
        title: "Sterilizzazione precoce (5-6 mesi)",
        description:
          "L'età ideale per la sterilizzazione del gatto è tra i 5 e i 6 mesi, prima della pubertà. Nella gatta, sterilizzare prima del primo calore riduce il rischio di tumori mammari del 90%.",
      },
      {
        title: "Gatto adulto non sterilizzato",
        description:
          "La sterilizzazione può essere eseguita a qualsiasi età nell'adulto. Nel maschio adulto, riduce la marcatura urinaria nel 90% dei casi, anche se il comportamento è già instaurato.",
      },
      {
        title: "Dopo il parto (nella gatta)",
        description:
          "Se la gatta ha già avuto una cucciolata, la sterilizzazione può essere programmata dopo lo svezzamento dei gattini, generalmente a 6-8 settimane dal parto.",
      },
    ],
    warningSignsTitle: "Segnali di complicazioni post-operatorie da monitorare",
    warningSigns: [
      "Gonfiore, rossore o secrezioni dalla ferita chirurgica",
      "Febbre (orecchie e polpastrelli molto caldi, apatia marcata)",
      "Rifiuto totale del cibo per più di 24 ore dopo l'intervento",
      "Leccarsi insistente della ferita (usare il collare elisabettiano!)",
      "Vomito ripetuto o diarrea nelle 24-48 ore post-operatorie",
      "Letargia estrema o mancata ripresa dell'attività dopo 48 ore",
    ],
    ageGuidance: [
      {
        stage: "Gattino (5-6 mesi)",
        recommendation:
          "Età ideale. Intervento più rapido, recupero più veloce, massimo beneficio preventivo contro tumori e infezioni riproduttive.",
      },
      {
        stage: "Adulto (1-7 anni)",
        recommendation:
          "Intervento perfettamente fattibile. Consigliati esami pre-operatori più approfonditi. Il maschio adulto vedrà riduzione della marcatura e dell'aggressività in 2-4 settimane.",
      },
      {
        stage: "Senior (8+ anni)",
        recommendation:
          "Possibile ma richiede valutazione anestesiologica più attenta con esami del sangue completi, ECG e valutazione renale. Il rapporto rischio-beneficio va discusso con il veterinario.",
      },
    ],
    costRange: "80–200 €",
    faq: [
      {
        q: "A che età sterilizzare il gatto?",
        a: "L'età consigliata è tra i 5 e i 6 mesi, prima della maturità sessuale. Nella gatta, sterilizzare prima del primo calore offre la massima protezione contro i tumori mammari.",
      },
      {
        q: "Il gatto ingrassa dopo la sterilizzazione?",
        a: "Il metabolismo rallenta leggermente dopo la sterilizzazione, ma l'aumento di peso è evitabile con un'alimentazione adeguata (cibo specifico per gatti sterilizzati) e stimolazione al gioco e al movimento.",
      },
      {
        q: "Quanto dura il recupero dalla sterilizzazione?",
        a: "Il gatto maschio si riprende generalmente in 2-3 giorni. La gatta in 7-10 giorni. È importante limitare salti e attività intensa nei primi giorni e usare il collare elisabettiano per proteggere la ferita.",
      },
      {
        q: "La sterilizzazione cambia il carattere del gatto?",
        a: "Non cambia la personalità del gatto. Riduce comportamenti legati agli ormoni sessuali: marcatura urinaria, vocalizzazioni notturne in calore, aggressività verso altri gatti e tendenza a fuggire.",
      },
      {
        q: "Quanto costa sterilizzare un gatto?",
        a: "Il costo varia tra 80 e 200 euro in base a sesso (il maschio costa meno), struttura e zona. Il prezzo include generalmente la visita pre-operatoria, l'anestesia, l'intervento e il controllo post-operatorio.",
      },
    ],
    relatedServiceAnimals: ["checkup-gatto", "vaccinazioni-gatto"],
    disclaimer:
      "Le informazioni hanno scopo orientativo e non sostituiscono il parere del veterinario. La decisione di sterilizzare e il momento più adatto vanno sempre concordati con il professionista.",
  },

  "vaccinazioni-coniglio": {
    slug: "vaccinazioni-coniglio",
    serviceSlug: "vaccinazioni",
    animalId: "coniglio",
    animalName: "Coniglio",
    animalEmoji: "🐇",
    serviceName: "Vaccinazioni",
    metaTitle: "Vaccinazioni Coniglio — Guida completa ai vaccini per conigli",
    metaDescription:
      "Tutto sulle vaccinazioni per il coniglio: mixomatosi, MEV1, MEV2, calendario vaccinale, costi e rischi. Richiedi un appuntamento.",
    h1: "Vaccinazioni per il coniglio",
    answerSummary:
      "Le vaccinazioni per il coniglio proteggono da due malattie virali letali: la mixomatosi e la malattia emorragica virale (MEV/RHD) nelle varianti 1 e 2. Sono raccomandate per tutti i conigli, anche quelli che vivono esclusivamente in casa, poiché i virus possono essere trasmessi da insetti o portati involontariamente dall'esterno.",
    quickFacts: [
      { label: "Animale", value: "🐇 Coniglio" },
      { label: "Vaccini fondamentali", value: "Mixomatosi + MEV1 + MEV2" },
      { label: "Prima vaccinazione", value: "Dalle 5-6 settimane di vita" },
      { label: "Richiami", value: "Annuali (o semestrali in zone a rischio)" },
      { label: "Costo indicativo", value: "30–60 € per vaccino" },
    ],
    intro:
      "Le vaccinazioni sono essenziali per la salute del coniglio domestico, anche se non esce mai di casa. La mixomatosi e la malattia emorragica virale (MEV, nota anche come RHD — Rabbit Haemorrhagic Disease) sono malattie virali con tassi di mortalità altissimi (fino al 99% per la MEV) e per le quali non esiste una cura efficace. L'unica protezione è la prevenzione vaccinale. Dal 2010, la variante MEV2 (RHD2) si è diffusa in Europa con un quadro clinico diverso e non coperto dai vaccini tradizionali, rendendo necessario un vaccino specifico.",
    whatIncludes: [
      "Vaccino contro la mixomatosi: protegge dalla malattia trasmessa da zanzare, pulci e contatto diretto, che causa edemi, noduli cutanei e spesso è letale",
      "Vaccino contro la MEV1 (RHD1): previene la forma classica della malattia emorragica, che causa morte improvvisa senza sintomi evidenti",
      "Vaccino contro la MEV2 (RHD2): protegge dalla variante più recente, con decorso subacuto caratterizzato da ittero, perdita di peso e mortalità elevata",
      "Vaccini combinati disponibili: esistono formulazioni che coprono mixomatosi + MEV1 + MEV2 in una singola somministrazione annuale (es. Nobivac Myxo-RHD Plus)",
      "Visita clinica contestuale alla vaccinazione: il veterinario controlla peso, denti, orecchie, cute e condizioni generali",
      "Consulenza sulla prevenzione antiparassitaria (spot-on per conigli, mai usare prodotti per cani o gatti)",
    ],
    whenToDo: [
      {
        title: "Prima vaccinazione del coniglietto",
        description:
          "Il primo vaccino può essere somministrato a partire dalle 5-6 settimane di vita (a seconda del prodotto). È fondamentale non ritardare, soprattutto in zone dove mixomatosi e MEV sono endemiche.",
      },
      {
        title: "Richiami annuali",
        description:
          "La protezione vaccinale richiede richiami regolari, generalmente annuali. In aree ad alto rischio o durante epidemie, il veterinario potrebbe consigliare richiami semestrali per la mixomatosi.",
      },
      {
        title: "Coniglio adulto mai vaccinato",
        description:
          "Un coniglio adulto che non è mai stato vaccinato può iniziare il protocollo in qualsiasi momento. Il veterinario imposterà il calendario adeguato in base all'anamnesi e alla zona geografica.",
      },
    ],
    warningSignsTitle: "Segnali di possibile infezione in un coniglio non vaccinato",
    warningSigns: [
      "Gonfiore delle palpebre, del naso o dei genitali (mixomatosi)",
      "Noduli cutanei multipli (forma nodulare della mixomatosi)",
      "Inappetenza improvvisa con letargia (possibile MEV)",
      "Ittero (colorazione gialla delle mucose e dell'interno delle orecchie — MEV2)",
      "Sanguinamento dal naso o dalla bocca (MEV1 in fase avanzata)",
      "Morte improvvisa senza sintomi (forma iperacuta della MEV1)",
    ],
    ageGuidance: [
      {
        stage: "Coniglietto (5 settimane - 6 mesi)",
        recommendation:
          "Prima vaccinazione dalle 5-6 settimane con vaccino combinato. Richiamo dopo 4 settimane se si usano vaccini monovalenti. Contestuale prima visita veterinaria completa.",
      },
      {
        stage: "Adulto (6 mesi - 5 anni)",
        recommendation:
          "Richiami annuali regolari. Visita veterinaria annuale con controllo dentale (i problemi dentali sono la patologia più comune nel coniglio adulto).",
      },
      {
        stage: "Senior (5+ anni)",
        recommendation:
          "Continuare le vaccinazioni annuali. Aggiungere esami del sangue per monitorare funzionalità renale ed epatica. Controllo dentale semestrale.",
      },
    ],
    costRange: "30–60 € per vaccino",
    faq: [
      {
        q: "Il coniglio da appartamento ha bisogno di vaccinazioni?",
        a: "Assolutamente sì. La mixomatosi è trasmessa da zanzare e moscerini che entrano in casa. La MEV può essere portata involontariamente sulle scarpe, sui vestiti o tramite fieno contaminato.",
      },
      {
        q: "Quali vaccini servono al coniglio?",
        a: "I vaccini fondamentali sono tre: mixomatosi, MEV1 (malattia emorragica virale classica) e MEV2 (variante recente). Esistono vaccini combinati che li coprono tutti in un'unica somministrazione.",
      },
      {
        q: "Ogni quanto vaccinare il coniglio?",
        a: "Generalmente una volta all'anno con vaccino combinato. In zone ad alto rischio, il veterinario potrebbe raccomandare richiami semestrali per la mixomatosi.",
      },
      {
        q: "Le vaccinazioni hanno effetti collaterali nel coniglio?",
        a: "Effetti collaterali lievi come un piccolo nodulo nel punto di iniezione e leggera apatia per 24-48 ore sono possibili e normali. Reazioni gravi sono molto rare.",
      },
      {
        q: "Posso vaccinare il mio coniglio se è malato?",
        a: "No. La vaccinazione va effettuata su animali sani. Se il coniglio è malato, in terapia antibiotica o stressato, il veterinario rimanderà la vaccinazione a quando sarà guarito.",
      },
    ],
    relatedServiceAnimals: ["checkup-coniglio", "sterilizzazione-coniglio"],
    disclaimer:
      "Le informazioni hanno scopo orientativo. Il protocollo vaccinale deve essere stabilito dal veterinario in base all'anamnesi, alla zona geografica e al rischio epidemiologico.",
  },

  // ══════════════════════════════════════════════
  // VACCINAZIONI CANE
  // ══════════════════════════════════════════════
  "vaccinazioni-cane": {
    slug: "vaccinazioni-cane",
    serviceSlug: "vaccinazioni",
    animalId: "cane",
    animalName: "Cane",
    animalEmoji: "🐕",
    serviceName: "Vaccinazioni",
    metaTitle: "Vaccinazioni Cane — Calendario vaccinale completo e guida ai vaccini",
    metaDescription:
      "Tutto sulle vaccinazioni per il cane: vaccini obbligatori e consigliati, calendario, richiami, costi e reazioni avverse. Richiedi un appuntamento.",
    h1: "Vaccinazioni per il cane",
    answerSummary:
      "Le vaccinazioni proteggono il cane da malattie virali gravi e potenzialmente letali come cimurro, parvovirosi, epatite infettiva e leptospirosi. Il protocollo vaccinale inizia a 6-8 settimane di vita con richiami ogni 3-4 settimane fino ai 4 mesi, poi richiamo annuale o triennale a seconda del vaccino.",
    quickFacts: [
      { label: "Animale", value: "🐕 Cane" },
      { label: "Vaccini core", value: "Cimurro, Parvo, Epatite, Leptospirosi" },
      { label: "Prima dose", value: "6-8 settimane di vita" },
      { label: "Richiami cucciolo", value: "Ogni 3-4 settimane fino a 16 settimane" },
      { label: "Costo indicativo", value: "30–60 € per seduta" },
    ],
    intro:
      "La vaccinazione è la forma più efficace di prevenzione contro le malattie infettive del cane. In Italia il protocollo vaccinale segue le linee guida WSAVA (World Small Animal Veterinary Association) che distinguono tra vaccini core (essenziali per tutti i cani) e vaccini non-core (raccomandati in base al rischio ambientale e allo stile di vita). I vaccini core proteggono da cimurro, parvovirosi canina, adenovirus (epatite infettiva) e leptospirosi — malattie con alta morbilità e mortalità. I vaccini non-core includono la protezione contro tosse dei canili (Bordetella, parainfluenza), Borrelia (Lyme) e Leishmania.",
    whatIncludes: [
      "Vaccino polivalente (CHP o CHPPi): protegge da cimurro, epatite infettiva (adenovirus tipo 2), parvovirosi e parainfluenza canina in un'unica somministrazione",
      "Vaccino contro la leptospirosi (L4): copre 4 sierogruppi della Leptospira, batterio trasmesso da urine di roditori e acqua contaminata, pericoloso anche per l'uomo (zoonosi)",
      "Vaccino antirabbico: obbligatorio per espatrio e raccomandato in zone endemiche. Unica dose a partire dai 3 mesi con richiamo annuale o triennale",
      "Vaccino contro la leishmaniosi: raccomandato in aree endemiche (Sud Italia, isole). Richiede prima un test sierologico per escludere infezione in corso",
      "Vaccino contro la tosse dei canili (Bordetella + parainfluenza): consigliato per cani che frequentano pensioni, aree sgambamento, mostre o corsi di addestramento",
      "Visita clinica completa ad ogni seduta vaccinale: il veterinario verifica peso, temperatura, mucose, linfonodi e condizioni generali prima di vaccinare",
    ],
    whenToDo: [
      {
        title: "Protocollo cucciolo (6-16 settimane)",
        description:
          "Prima dose a 6-8 settimane con vaccino polivalente + leptospirosi. Richiami ogni 3-4 settimane fino a 16 settimane di vita. L'ultima dose del ciclo primario è la più importante perché garantisce la risposta immunitaria in assenza degli anticorpi materni.",
      },
      {
        title: "Primo richiamo annuale (12-15 mesi)",
        description:
          "Un anno dopo l'ultima dose del ciclo cucciolo. Questo richiamo è fondamentale per consolidare l'immunità a lungo termine. Include polivalente + leptospirosi.",
      },
      {
        title: "Richiami adulto",
        description:
          "Vaccini core (cimurro, parvo, epatite): richiamo ogni 3 anni secondo le linee guida WSAVA. Leptospirosi: richiamo annuale obbligatorio perché la protezione dura circa 12 mesi. Antirabbica: annuale o triennale a seconda del prodotto.",
      },
      {
        title: "Cane adulto mai vaccinato",
        description:
          "Un cane adulto mai vaccinato necessita di 2 dosi a distanza di 3-4 settimane per il ciclo primario, poi richiami regolari. Non servono più dosi rispetto a un cucciolo.",
      },
    ],
    warningSignsTitle: "Possibili reazioni avverse da monitorare dopo la vaccinazione",
    warningSigns: [
      "Gonfiore del muso, delle labbra o delle palpebre (reazione allergica — contattare immediatamente il veterinario)",
      "Difficoltà respiratorie o respiro affannoso dopo la vaccinazione",
      "Vomito ripetuto o diarrea intensa nelle prime 24 ore",
      "Febbre alta persistente oltre 24 ore dopo la somministrazione",
      "Nodulo dolente nel punto di iniezione che non si riassorbe entro 2-3 settimane",
      "Letargia marcata che dura più di 48 ore",
    ],
    ageGuidance: [
      {
        stage: "Cucciolo (6 settimane - 4 mesi)",
        recommendation:
          "Ciclo vaccinale primario: 3 sedute a distanza di 3-4 settimane. Polivalente + leptospirosi. Prima dose di antirabbica a 3 mesi se necessaria. Evitare contatti con cani non vaccinati e ambienti a rischio fino a 2 settimane dopo l'ultima dose.",
      },
      {
        stage: "Adulto (1-7 anni)",
        recommendation:
          "Richiamo triennale per vaccini core, annuale per leptospirosi. Valutare vaccini non-core in base allo stile di vita: leishmaniosi per cani in zone endemiche, Bordetella per cani che frequentano pensioni o gruppi.",
      },
      {
        stage: "Senior (7+ anni)",
        recommendation:
          "Continuare i richiami regolari. Il sistema immunitario del cane anziano può essere meno reattivo. Il veterinario valuterà la titolazione anticorpale come alternativa al richiamo automatico.",
      },
    ],
    costRange: "30–60 € per seduta",
    faq: [
      {
        q: "Quali vaccini sono obbligatori per il cane in Italia?",
        a: "In Italia non esistono vaccini legalmente obbligatori per i cani, ma cimurro, parvovirosi, epatite e leptospirosi sono considerati essenziali da tutte le linee guida. L'antirabbica è obbligatoria per viaggiare all'estero e in alcune regioni italiane.",
      },
      {
        q: "Ogni quanto vaccinare il cane adulto?",
        a: "I vaccini core (cimurro, parvo, epatite) hanno richiamo triennale. La leptospirosi richiede richiamo annuale. L'antirabbica dipende dal prodotto usato (annuale o triennale).",
      },
      {
        q: "Il cane può uscire dopo la prima vaccinazione?",
        a: "È consigliabile attendere 2 settimane dopo l'ultima dose del ciclo primario (a 16 settimane) per la protezione completa. Prima, evitare contatto con cani sconosciuti e ambienti ad alto rischio come parchi affollati.",
      },
      {
        q: "Quanto costa vaccinare un cane?",
        a: "Ogni seduta vaccinale costa generalmente tra 30 e 60 euro, inclusa la visita. Il ciclo cucciolo completo (3 sedute) ha un costo totale indicativo di 90-180 euro. Il nostro servizio di ricerca è gratuito.",
      },
      {
        q: "Le vaccinazioni hanno effetti collaterali nel cane?",
        a: "Effetti lievi come lieve apatia o un piccolo nodulo nel punto di iniezione sono normali e si risolvono in 24-48 ore. Reazioni allergiche gravi sono rare ma richiedono intervento veterinario immediato.",
      },
    ],
    relatedServiceAnimals: ["checkup-cane", "sterilizzazione-cane"],
    disclaimer:
      "Le informazioni hanno scopo informativo. Il protocollo vaccinale deve essere personalizzato dal veterinario in base all'età, alla salute e allo stile di vita del cane.",
  },

  // ══════════════════════════════════════════════
  // CHECK-UP GATTO
  // ══════════════════════════════════════════════
  "checkup-gatto": {
    slug: "checkup-gatto",
    serviceSlug: "check-up-veterinario",
    animalId: "gatto",
    animalName: "Gatto",
    animalEmoji: "🐈",
    serviceName: "Check-up",
    metaTitle: "Check-up Gatto — Visita di controllo completa per il tuo gatto",
    metaDescription:
      "Tutto sul check-up veterinario per il gatto: cosa comprende, frequenza, costi e segnali d'allarme felini. Richiedi un appuntamento.",
    h1: "Check-up veterinario per il gatto",
    answerSummary:
      "Il check-up veterinario per il gatto è una visita clinica completa che valuta peso, cuore, polmoni, addome, denti, occhi, orecchie e cute. È raccomandato almeno una volta all'anno per gatti adulti e ogni 6 mesi per gattini e gatti senior. I gatti sono maestri nel nascondere il dolore e le malattie, rendendo i controlli regolari ancora più importanti.",
    quickFacts: [
      { label: "Animale", value: "🐈 Gatto" },
      { label: "Servizio", value: "Check-up completo" },
      { label: "Frequenza raccomandata", value: "1 volta/anno (adulti)" },
      { label: "Durata media", value: "20-30 minuti" },
      { label: "Costo indicativo", value: "40–70 €" },
    ],
    intro:
      "Il gatto è un animale che per natura tende a mascherare i segni di malattia — un istinto ereditato dai felini selvatici per non mostrarsi vulnerabili. Questo significa che quando i sintomi diventano evidenti, la patologia è spesso già in fase avanzata. Il check-up periodico è l'unico strumento per intercettare precocemente problemi renali (la prima causa di morte nel gatto anziano), diabete, ipertiroidismo, malattie dentali e cardiomiopatie. L'AAFP (American Association of Feline Practitioners) raccomanda visite annuali per i gatti adulti e semestrali per i gatti oltre i 7 anni.",
    whatIncludes: [
      "Pesatura accurata e valutazione del Body Condition Score (BCS): la perdita di peso graduale è spesso il primo segnale di malattia cronica nel gatto",
      "Auscultazione cardiaca: i soffi cardiaci nel gatto possono indicare cardiomiopatia ipertrofica (HCM), la cardiopatia felina più comune",
      "Palpazione tiroidea: noduli tiroidei palpabili sono frequenti nei gatti sopra i 10 anni e indicano possibile ipertiroidismo",
      "Esame del cavo orale: stomatite, gengivite, lesioni da riassorbimento odontoclastico (FORL) colpiscono fino al 70% dei gatti adulti",
      "Palpazione renale: reni piccoli e irregolari possono suggerire insufficienza renale cronica, rilevabile precocemente con esami del sangue",
      "Controllo della pressione arteriosa (nei gatti senior): l'ipertensione felina è frequente e può causare danni retinici e cecità improvvisa",
      "Valutazione dello stato di idratazione: il test della plica cutanea e delle mucose indica disidratazione, comune nei gatti con patologie renali",
      "Esame della cute e del mantello: pelo opaco, alopecia, prurito o forfora possono indicare allergie, parassiti o malattie sistemiche",
      "Discussione su alimentazione, attività fisica, uso della lettiera e eventuali cambiamenti comportamentali",
    ],
    whenToDo: [
      {
        title: "Adozione di un nuovo gatto",
        description:
          "La prima visita include valutazione generale, test FIV/FeLV (fondamentali se il gatto proviene dalla strada o da colonie), piano vaccinale e antiparassitario, consulenza su alimentazione e ambientamento.",
      },
      {
        title: "Controllo annuale (1-7 anni)",
        description:
          "Per i gatti adulti sani, un check-up annuale è sufficiente. È il momento per aggiornare le vaccinazioni, controllare il peso e discutere eventuali cambiamenti nel comportamento o nell'uso della lettiera.",
      },
      {
        title: "Check-up semestrale per gatti senior (7+ anni)",
        description:
          "Dai 7 anni il rischio di malattie croniche aumenta notevolmente. Check-up ogni 6 mesi con esami ematochimici, profilo tiroideo e analisi delle urine per monitorare funzionalità renale e metabolismo.",
      },
    ],
    warningSignsTitle: "Segnali che indicano la necessità di un controllo urgente nel gatto",
    warningSigns: [
      "Perdita di peso graduale anche con appetito conservato (possibile ipertiroidismo, diabete o malattia renale)",
      "Aumento della sete e della minzione (poliuria/polidipsia — segnale di diabete o insufficienza renale)",
      "Cambiamento nell'uso della lettiera: minzione fuori dalla lettiera, sforzo a urinare (possibile cistite o blocco urinario — emergenza nel maschio)",
      "Vomito frequente (più di 1-2 volte al mese non è normale nel gatto)",
      "Alito cattivo o difficoltà a mangiare (malattia dentale avanzata)",
      "Nascondersi continuamente o riduzione dell'interazione sociale (dolore o malessere)",
      "Pelo opaco, arruffato o perdita di pelo a chiazze",
      "Respirazione a bocca aperta (nel gatto è SEMPRE anomalo e richiede visita urgente)",
    ],
    ageGuidance: [
      {
        stage: "Gattino (0-12 mesi)",
        recommendation:
          "Visite ogni 3-4 settimane per completare il ciclo vaccinale. Test FIV/FeLV se lo stato è sconosciuto. Consulenza su sterilizzazione, alimentazione e socializzazione.",
      },
      {
        stage: "Adulto (1-7 anni)",
        recommendation:
          "Check-up annuale. Controllo del peso (l'obesità colpisce il 40% dei gatti domestici), salute dentale e aggiornamento vaccinale. Monitoraggio del comportamento e dell'uso della lettiera.",
      },
      {
        stage: "Senior (7-14 anni)",
        recommendation:
          "Check-up semestrali con esami del sangue (emocromo, profilo biochimico, T4), analisi delle urine e misurazione della pressione. Screening per malattia renale cronica, ipertiroidismo e diabete.",
      },
      {
        stage: "Geriatrico (15+ anni)",
        recommendation:
          "Controlli ogni 4-6 mesi. Monitoraggio stretto di funzionalità renale, pressione arteriosa e peso. Valutazione della qualità della vita e gestione del dolore cronico (artrosi).",
      },
    ],
    costRange: "40–70 €",
    faq: [
      {
        q: "Ogni quanto portare il gatto dal veterinario?",
        a: "Per gatti adulti sani (1-7 anni) una visita annuale è raccomandata. Per gatti senior (7+) ogni 6 mesi. Per gattini, visite ogni 3-4 settimane durante il ciclo vaccinale.",
      },
      {
        q: "Il mio gatto sta bene, serve comunque il check-up?",
        a: "Assolutamente sì. I gatti sono maestri nel nascondere il dolore e i sintomi. Molte malattie comuni (renale cronica, ipertiroidismo, diabete) sono silenti nelle fasi iniziali e rilevabili solo con esami clinici.",
      },
      {
        q: "Come trasportare il gatto dal veterinario senza stress?",
        a: "Usa un trasportino rigido. Lascialo aperto in casa nei giorni precedenti con una coperta familiare dentro. Copri il trasportino con un telo durante il viaggio. In sala d'attesa, tienilo in alto e lontano dai cani.",
      },
      {
        q: "Quanto costa un check-up per il gatto?",
        a: "La visita clinica di base costa generalmente tra 40 e 70 euro. Esami del sangue aggiuntivi (raccomandati per gatti senior) hanno un costo supplementare di 40-80 euro. Il nostro servizio di ricerca è gratuito.",
      },
      {
        q: "Quali esami del sangue servono per il gatto anziano?",
        a: "Emocromo completo, profilo biochimico (creatinina, BUN, ALT, glicemia), T4 (ormone tiroideo) e analisi delle urine con rapporto proteine/creatinina. Il veterinario può aggiungere SDMA per la diagnosi precoce della malattia renale.",
      },
    ],
    relatedServiceAnimals: ["sterilizzazione-gatto", "vaccinazioni-gatto"],
    disclaimer:
      "Le informazioni hanno scopo orientativo e non sostituiscono la consulenza veterinaria. Il piano di check-up deve essere personalizzato dal professionista in base all'età, allo stato di salute e allo stile di vita del gatto.",
  },

  // ══════════════════════════════════════════════
  // STERILIZZAZIONE CANE
  // ══════════════════════════════════════════════
  "sterilizzazione-cane": {
    slug: "sterilizzazione-cane",
    serviceSlug: "sterilizzazione-animali",
    animalId: "cane",
    animalName: "Cane",
    animalEmoji: "🐕",
    serviceName: "Sterilizzazione",
    metaTitle: "Sterilizzazione Cane — Guida completa a castrazione e sterilizzazione canina",
    metaDescription:
      "Tutto sulla sterilizzazione del cane: età ideale per razza, procedura, vantaggi, costi e recupero post-operatorio. Richiedi un appuntamento.",
    h1: "Sterilizzazione del cane",
    answerSummary:
      "La sterilizzazione del cane previene la riproduzione e offre benefici importanti per la salute: nella femmina riduce il rischio di tumori mammari (del 99% se fatta prima del primo calore) e previene la piometra; nel maschio riduce aggressività, marcatura e vagabondaggio. L'età ideale varia in base alla taglia: 6-9 mesi per razze piccole, 12-18 mesi per razze grandi e giganti.",
    quickFacts: [
      { label: "Animale", value: "🐕 Cane" },
      { label: "Intervento", value: "Ovariectomia (femmina) / Orchiectomia (maschio)" },
      { label: "Età consigliata", value: "6-18 mesi (dipende dalla taglia)" },
      { label: "Durata intervento", value: "30-60 minuti" },
      { label: "Recupero", value: "10-14 giorni" },
      { label: "Costo indicativo", value: "150–350 €" },
    ],
    intro:
      "La sterilizzazione del cane è un intervento chirurgico di routine che, oltre a prevenire gravidanze indesiderate, offre benefici sanitari documentati. La decisione sull'età ottimale della sterilizzazione è però più complessa nel cane rispetto al gatto, perché varia significativamente in base alla taglia e alla razza. Studi recenti (Hart et al., 2020, UC Davis) hanno evidenziato che nelle razze grandi e giganti la sterilizzazione troppo precoce può aumentare il rischio di alcuni problemi articolari e di certi tumori. Per questo, le raccomandazioni attuali tendono a posticipare l'intervento nelle razze di taglia grande, attendendo la maturità scheletrica.",
    whatIncludes: [
      "Visita pre-operatoria con valutazione cardiorespiratoria e idoneità anestesiologica",
      "Esami del sangue pre-chirurgici: emocromo, profilo epatico e renale per valutare il rischio anestesiologico",
      "Nella femmina: ovariectomia (asportazione delle ovaie) o ovarioisterectomia (ovaie + utero). La scelta dipende dall'età e dalle indicazioni cliniche",
      "Nel maschio: orchiectomia bilaterale (asportazione di entrambi i testicoli). Intervento più breve e con recupero più rapido",
      "Anestesia generale con intubazione endotracheale e monitoraggio multiparametrico (ECG, pulsossimetria, capnografia, pressione)",
      "Terapia antidolorifica multimodale: analgesia pre-operatoria (premed), intraoperatoria e post-operatoria per 3-5 giorni",
      "Sutura intradermica o con punti riassorbibili per ridurre il disagio e semplificare il post-operatorio",
      "Collare elisabettiano e istruzioni dettagliate per la gestione domiciliare",
      "Visita di controllo a 10-14 giorni per verifica della guarigione",
    ],
    whenToDo: [
      {
        title: "Razze piccole e medie (<20 kg da adulti)",
        description:
          "Per razze come Chihuahua, Barboncino, Beagle, Cocker: la sterilizzazione è consigliata tra i 6 e i 9 mesi, prima o intorno alla maturità sessuale. In questa finestra i benefici preventivi sono massimi.",
      },
      {
        title: "Razze grandi (20-40 kg da adulti)",
        description:
          "Per razze come Labrador, Golden Retriever, Pastore Tedesco: è consigliabile attendere i 12-15 mesi per permettere la completa maturazione scheletrica. Nelle femmine, discutere con il veterinario il rapporto rischio-beneficio del primo calore.",
      },
      {
        title: "Razze giganti (>40 kg da adulti)",
        description:
          "Per razze come Alano, San Bernardo, Rottweiler: attendere i 15-18 mesi o anche i 24 mesi. La maturazione ossea è più lenta e la sterilizzazione precoce può aumentare il rischio di displasia e rottura del legamento crociato.",
      },
      {
        title: "Cane adulto non sterilizzato",
        description:
          "La sterilizzazione è possibile e sicura a qualsiasi età nell'adulto sano. Nella femmina adulta, il beneficio preventivo sui tumori mammari si riduce progressivamente dopo il secondo calore ma resta significativo.",
      },
    ],
    warningSignsTitle: "Segnali di complicazioni post-operatorie nel cane",
    warningSigns: [
      "Gonfiore, arrossamento o secrezioni maleodoranti dalla ferita chirurgica",
      "Febbre (tartufo caldo e secco, gengive arrossate, apatia marcata)",
      "Rifiuto totale del cibo per più di 24 ore dopo l'intervento",
      "Leccarsi o mordicchiarsi insistentemente la ferita",
      "Difficoltà a urinare o defecare oltre 24 ore dall'intervento",
      "Vomito persistente nelle 48 ore successive all'anestesia",
      "Sanguinamento dalla ferita o ematomi che crescono di dimensione",
    ],
    ageGuidance: [
      {
        stage: "Cucciolo (6-12 mesi) — razze piccole",
        recommendation:
          "Finestra ideale per la sterilizzazione nelle razze piccole e medie. Massimo beneficio preventivo su tumori mammari e piometra nella femmina. Intervento rapido e recupero veloce.",
      },
      {
        stage: "Giovane adulto (12-24 mesi) — razze grandi/giganti",
        recommendation:
          "Attendere la maturità scheletrica. Discutere col veterinario le evidenze specifiche per la razza del proprio cane. Valutare la gestione temporanea del calore nella femmina.",
      },
      {
        stage: "Adulto (2-7 anni)",
        recommendation:
          "Sterilizzazione perfettamente fattibile. Esami pre-operatori standard. Nella femmina, il beneficio sui tumori mammari diminuisce ma la prevenzione della piometra resta importante.",
      },
      {
        stage: "Senior (8+ anni)",
        recommendation:
          "Possibile ma richiede valutazione anestesiologica approfondita (esami del sangue completi, ECG, ecocardiografia se indicata). Spesso indicata per ragioni mediche (piometra, tumori testicolari).",
      },
    ],
    costRange: "150–350 €",
    faq: [
      {
        q: "A che età sterilizzare il cane?",
        a: "Dipende dalla taglia: razze piccole/medie tra 6 e 9 mesi, razze grandi tra 12 e 15 mesi, razze giganti tra 15 e 24 mesi. Il veterinario valuterà il caso specifico in base alla razza e allo stato di salute.",
      },
      {
        q: "Il cane ingrassa dopo la sterilizzazione?",
        a: "Il metabolismo rallenta del 25-30%. L'aumento di peso è prevenibile riducendo la razione del 20-25% o passando a un alimento per cani sterilizzati, e mantenendo un buon livello di esercizio fisico.",
      },
      {
        q: "Quanto costa sterilizzare un cane?",
        a: "Il costo varia da 150 a 350 euro in base a sesso (la femmina costa di più), taglia (maggior consumo di anestetico), struttura e zona geografica. Include visita, anestesia, intervento e controllo post-operatorio.",
      },
      {
        q: "La sterilizzazione è dolorosa per il cane?",
        a: "L'intervento è in anestesia generale, quindi indolore. Il dolore post-operatorio è gestito con farmaci antidolorifici per 3-5 giorni. La maggior parte dei cani riprende l'attività normale in 2-3 giorni.",
      },
      {
        q: "Conviene aspettare il primo calore nella femmina?",
        a: "Per le razze piccole, sterilizzare prima del primo calore offre la massima protezione contro i tumori mammari. Per le razze grandi, alcune evidenze suggeriscono di attendere il primo calore per completare la maturazione. Discutine col veterinario.",
      },
    ],
    relatedServiceAnimals: ["checkup-cane", "vaccinazioni-cane"],
    disclaimer:
      "Le informazioni hanno scopo orientativo. La decisione sull'età e sulla modalità di sterilizzazione deve essere presa insieme al veterinario, considerando razza, taglia, stato di salute e stile di vita del cane.",
  },

  // ══════════════════════════════════════════════
  // CHECK-UP CONIGLIO
  // ══════════════════════════════════════════════
  "checkup-coniglio": {
    slug: "checkup-coniglio",
    serviceSlug: "check-up-veterinario",
    animalId: "coniglio",
    animalName: "Coniglio",
    animalEmoji: "🐇",
    serviceName: "Check-up",
    metaTitle: "Check-up Coniglio — Visita veterinaria completa per il tuo coniglio",
    metaDescription:
      "Guida completa al check-up veterinario per il coniglio: cosa include, frequenza, salute dentale, costi e segnali d'allarme. Richiedi un appuntamento.",
    h1: "Check-up veterinario per il coniglio",
    answerSummary:
      "Il check-up per il coniglio è una visita clinica specializzata che valuta denti (la causa più comune di problemi nel coniglio), peso, apparato digerente, cute e apparato respiratorio. È raccomandato almeno una volta l'anno, idealmente ogni 6 mesi, dato che il coniglio è un animale preda che nasconde i sintomi fino a stadi avanzati di malattia.",
    quickFacts: [
      { label: "Animale", value: "🐇 Coniglio" },
      { label: "Servizio", value: "Check-up completo" },
      { label: "Frequenza raccomandata", value: "Ogni 6-12 mesi" },
      { label: "Durata media", value: "20-30 minuti" },
      { label: "Costo indicativo", value: "35–60 €" },
      { label: "Specialista", value: "Veterinario esperto in esotici" },
    ],
    intro:
      "Il coniglio è il terzo animale domestico più diffuso in Italia, ma la sua medicina è molto diversa da quella di cane e gatto. È fondamentale rivolgersi a un veterinario esperto in animali esotici o con formazione specifica sui lagomorfi. Il coniglio è un animale preda: istintivamente nasconde dolore e malattia per non apparire vulnerabile. Quando i sintomi diventano evidenti, la situazione è spesso critica. I problemi dentali rappresentano la patologia più frequente (i denti del coniglio crescono continuamente per tutta la vita a 2-3 mm/settimana), seguiti da disturbi gastrointestinali, malattie respiratorie e patologie uterine nella femmina non sterilizzata.",
    whatIncludes: [
      "Esame dentale approfondito: controllo dei denti incisivi (visibili) e dei molari (con otoscopio o speculum) per rilevare malocclusione, speroni e ascessi. I denti del coniglio crescono continuamente e devono essere allineati",
      "Pesatura accurata: il peso è un indicatore cruciale nel coniglio. Variazioni del 5-10% possono essere clinicamente significative",
      "Auscultazione toracica: i conigli sono soggetti a infezioni respiratorie (Pasteurella, Bordetella) con sintomi sottili come starnuti e scolo nasale",
      "Palpazione addominale: valutazione della motilità intestinale (il blocco gastrointestinale — GI stasis — è un'emergenza frequente), dimensione del cieco e presenza di masse",
      "Esame della cute e del mantello: parassiti (Cheyletiella, Psoroptes), funghi, pododermatite (piaghe da appoggio sui tarsi)",
      "Controllo delle unghie: il taglio delle unghie è parte della visita e previene lesioni da unghie troppo lunghe",
      "Esame della regione perineale: controllo della pulizia (il coniglio obeso non riesce a pulirsi), presenza di miasi (larve di mosca) in estate",
      "Consulenza su alimentazione: fieno illimitato (80% della dieta), verdure fresche appropriate e pellet di qualità in quantità limitata",
      "Aggiornamento vaccinale: mixomatosi e MEV1/MEV2",
    ],
    whenToDo: [
      {
        title: "Primo check-up dopo l'adozione",
        description:
          "Fondamentale entro la prima settimana. Il veterinario valuterà lo stato generale, i denti, lo stato di nutrizione, verificherà il sesso (errori frequenti nei negozi), imposterà vaccinazioni e antiparassitari e darà indicazioni sull'alimentazione corretta.",
      },
      {
        title: "Controllo semestrale",
        description:
          "La frequenza ideale per il coniglio è ogni 6 mesi, data la rapidità con cui possono insorgere problemi dentali e gastrointestinali. Ad ogni visita si controllano denti, peso e si aggiornano le vaccinazioni.",
      },
      {
        title: "Coniglio anziano (5+ anni)",
        description:
          "Visite ogni 4-6 mesi con possibili esami del sangue per monitorare funzionalità renale ed epatica. Attenzione particolare a problemi articolari (spondilosi), cataratta e patologie uterine nella femmina non sterilizzata.",
      },
    ],
    warningSignsTitle: "Segnali di emergenza nel coniglio — agire immediatamente",
    warningSigns: [
      "Blocco intestinale (GI stasis): il coniglio smette di mangiare e di produrre feci, o produce feci piccolissime e scure — EMERGENZA",
      "Testa inclinata (head tilt): inclinazione improvvisa della testa, perdita di equilibrio, movimenti oculari rapidi — possibile Encephalitozoon cuniculi o otite media",
      "Difficoltà respiratorie: respiro a bocca aperta, narici che si dilatano, respiro rumoroso — nel coniglio è obbligatoria la respirazione nasale",
      "Diarrea acquosa: nel coniglio è una vera emergenza medica, soprattutto nei giovani. Non confondere con i ciecotrofi (feci molli normali prodotte di notte)",
      "Paralisi degli arti posteriori: possibile frattura vertebrale (le ossa del coniglio sono molto fragili) o E. cuniculi",
      "Gonfiore mandibolare o mascellare: ascesso dentale, richiede intervento specialistico",
      "Coniglio apatico che si nasconde e rifiuta il cibo: in un animale preda, questo indica dolore o malattia grave",
    ],
    ageGuidance: [
      {
        stage: "Coniglietto (0-6 mesi)",
        recommendation:
          "Prima visita subito dopo l'adozione. Vaccinazioni a partire dalle 5-6 settimane. Determinazione corretta del sesso. Consulenza su sterilizzazione (consigliata a 4-6 mesi). Educazione alimentare per il proprietario.",
      },
      {
        stage: "Adulto (6 mesi - 5 anni)",
        recommendation:
          "Check-up ogni 6-12 mesi con controllo dentale approfondito. Richiami vaccinali annuali. Monitoraggio del peso. Nella femmina non sterilizzata: palpazione uterina (il rischio di adenocarcinoma uterino supera il 50% dopo i 4 anni).",
      },
      {
        stage: "Senior (5+ anni)",
        recommendation:
          "Check-up ogni 4-6 mesi. Esami del sangue annuali. Attenzione a spondilosi, cataratta, problemi renali e tumori uterini. Valutazione della mobilità e gestione del dolore articolare.",
      },
    ],
    costRange: "35–60 €",
    faq: [
      {
        q: "Ogni quanto portare il coniglio dal veterinario?",
        a: "Idealmente ogni 6 mesi. Il coniglio nasconde i sintomi di malattia e i problemi dentali possono aggravarsi rapidamente. Se il coniglio mangia, beve e produce feci normalmente, un controllo annuale è il minimo.",
      },
      {
        q: "Serve un veterinario specializzato per il coniglio?",
        a: "Sì, è fortemente raccomandato un veterinario esperto in animali esotici o con formazione specifica sui lagomorfi. La medicina del coniglio è molto diversa da quella di cane e gatto: anestesia, farmaci e chirurgia richiedono competenze specifiche.",
      },
      {
        q: "Come capire se il coniglio sta male?",
        a: "I segnali più importanti sono: smettere di mangiare, riduzione o assenza di feci, apatia, denti che cigolano (dolore), testa inclinata, starnuti frequenti. Qualsiasi cambiamento nel comportamento alimentare va preso seriamente.",
      },
      {
        q: "Quanto costa un check-up per il coniglio?",
        a: "La visita di base costa generalmente tra 35 e 60 euro. I costi possono essere leggermente superiori rispetto a cane e gatto perché richiede un veterinario specializzato. Esami aggiuntivi hanno costi supplementari.",
      },
      {
        q: "Il coniglio deve essere sterilizzato?",
        a: "È fortemente consigliato, soprattutto per le femmine: il rischio di adenocarcinoma uterino supera il 50% dopo i 4 anni di età. Nel maschio, la castrazione riduce la marcatura territoriale e l'aggressività.",
      },
    ],
    relatedServiceAnimals: ["vaccinazioni-coniglio", "sterilizzazione-coniglio"],
    disclaimer:
      "Le informazioni hanno scopo orientativo. Rivolgersi sempre a un veterinario esperto in animali esotici per la cura del coniglio. Non somministrare mai farmaci senza indicazione veterinaria.",
  },

  // ══════════════════════════════════════════════
  // CHIRURGIA CANE
  // ══════════════════════════════════════════════
  "chirurgia-cane": {
    slug: "chirurgia-cane",
    serviceSlug: "chirurgia-veterinaria",
    animalId: "cane",
    animalName: "Cane",
    animalEmoji: "🐕",
    serviceName: "Chirurgia",
    metaTitle: "Chirurgia Cane — Guida completa agli interventi chirurgici veterinari",
    metaDescription:
      "Tutto sulla chirurgia veterinaria per il cane: interventi comuni, anestesia, preparazione, costi e recupero post-operatorio. Richiedi un appuntamento.",
    h1: "Chirurgia veterinaria per il cane",
    answerSummary:
      "La chirurgia veterinaria per il cane comprende interventi dei tessuti molli (asportazione di masse, chirurgia addominale, toracica) e chirurgia ortopedica (fratture, legamento crociato, displasia). I protocolli anestesiologici moderni garantiscono elevati standard di sicurezza con monitoraggio multiparametrico. Il recupero varia da pochi giorni per interventi minori a 8-12 settimane per chirurgia ortopedica.",
    quickFacts: [
      { label: "Animale", value: "🐕 Cane" },
      { label: "Categorie", value: "Tessuti molli + Ortopedia" },
      { label: "Anestesia", value: "Generale con monitoraggio" },
      { label: "Recupero", value: "3 giorni – 12 settimane" },
      { label: "Costo indicativo", value: "200–2.000+ €" },
    ],
    intro:
      "La chirurgia è una componente fondamentale della medicina veterinaria canina. Spazia da interventi di routine come la rimozione di neoformazioni cutanee fino a procedure complesse come la chirurgia toracica, la chirurgia della colonna vertebrale e la ricostruzione articolare. I progressi in anestesiologia veterinaria, monitoraggio intraoperatorio e gestione del dolore hanno reso gli interventi significativamente più sicuri. La scelta della struttura è importante: interventi complessi richiedono attrezzature specifiche (radiografia intraoperatoria, artroscopia, ventilatore meccanico) e competenze chirurgiche avanzate.",
    whatIncludes: [
      "Visita pre-operatoria approfondita con anamnesi, esame obiettivo e valutazione del rischio anestesiologico (classificazione ASA)",
      "Esami pre-chirurgici: emocromo, profilo biochimico (renale, epatico, proteine), coagulazione. ECG ed ecocardiografia per cani anziani o cardiopatici",
      "Pianificazione chirurgica: nel caso di masse, possibile citologia o biopsia pre-operatoria; per l'ortopedia, radiografie o TAC pre-operatorie",
      "Premedicazione e induzione anestesiologica con farmaci selezionati in base all'età, alle condizioni e al tipo di intervento",
      "Anestesia generale con intubazione endotracheale, ventilazione assistita e monitoraggio continuo (ECG, SpO2, EtCO2, pressione, temperatura)",
      "Intervento chirurgico in ambiente sterile con strumentazione dedicata",
      "Analgesia multimodale: combinazione di oppioidi, FANS, anestesia loco-regionale per il massimo controllo del dolore",
      "Risveglio assistito in ambiente riscaldato con monitoraggio continuo fino alla completa coscienza",
      "Dimissione con terapia domiciliare, istruzioni dettagliate e programmazione dei controlli post-operatori",
    ],
    whenToDo: [
      {
        title: "Chirurgia d'urgenza",
        description:
          "Torsione gastrica (GDV), corpi estranei intestinali, rottura di milza, ferite penetranti, cesario d'urgenza. In questi casi l'intervento è necessario entro poche ore per salvare la vita del cane.",
      },
      {
        title: "Chirurgia programmata — tessuti molli",
        description:
          "Asportazione di masse cutanee o sottocutanee, chirurgia dell'orecchio (otoematoma), chirurgia palpebrale (entropion/ectropion), cistotomia (calcoli vescicali), splenectomia. Interventi che possono essere programmati dopo una diagnosi accurata.",
      },
      {
        title: "Chirurgia ortopedica",
        description:
          "Rottura del legamento crociato anteriore (TPLO, TTA), fratture ossee (osteosintesi con placche e viti), lussazione rotulea, protesi d'anca. Richiedono strutture attrezzate e spesso chirurghi ortopedici specializzati.",
      },
      {
        title: "Chirurgia oncologica",
        description:
          "Asportazione di tumori con margini chirurgici adeguati. Può richiedere stadiazione pre-operatoria (radiografia toracica, ecografia addominale, linfonodo sentinella) per pianificare l'intervento e la terapia successiva.",
      },
    ],
    warningSignsTitle: "Segnali post-operatori che richiedono contatto immediato col veterinario",
    warningSigns: [
      "Sanguinamento attivo dalla ferita chirurgica o drenaggio con sangue rosso vivo",
      "Sutura che si apre (deiscenza) con esposizione dei tessuti sottostanti",
      "Gonfiore progressivo e dolente attorno alla ferita",
      "Febbre alta: gengive arrossate, apatia marcata, tremori",
      "Vomito persistente oltre 24 ore dall'anestesia",
      "Rifiuto totale di cibo e acqua per più di 24 ore",
      "Difficoltà respiratorie, tosse o respiro affannoso",
      "Il cane non urina entro 18-24 ore dall'intervento",
    ],
    ageGuidance: [
      {
        stage: "Cucciolo/Giovane (<2 anni)",
        recommendation:
          "Rischio anestesiologico generalmente basso. Interventi comuni: sterilizzazione, correzione di difetti congeniti (palatoschisi, ernia ombelicale), rimozione di corpi estranei ingeriti. Recupero rapido.",
      },
      {
        stage: "Adulto (2-7 anni)",
        recommendation:
          "Fascia d'età con il miglior rapporto rischio-beneficio per la chirurgia. Esami pre-operatori standard. Interventi più frequenti: asportazione masse, chirurgia ortopedica, chirurgia dentale.",
      },
      {
        stage: "Senior (8+ anni)",
        recommendation:
          "Rischio anestesiologico aumentato ma gestibile con protocolli dedicati. Esami pre-operatori approfonditi obbligatori. L'età da sola non è una controindicazione alla chirurgia se le condizioni generali lo permettono.",
      },
    ],
    costRange: "200–2.000+ €",
    faq: [
      {
        q: "Quanto è rischiosa l'anestesia per il cane?",
        a: "Con i protocolli moderni e il monitoraggio multiparametrico, il rischio anestesiologico per un cane sano è molto basso (circa 0,1-0,2%). Il rischio aumenta con l'età, la presenza di patologie concomitanti e la complessità dell'intervento.",
      },
      {
        q: "Come preparare il cane per un intervento chirurgico?",
        a: "Digiuno di cibo dalla sera precedente (12 ore). L'acqua può essere lasciata fino a 2-4 ore prima. Portare il libretto sanitario e comunicare tutti i farmaci in corso. Preparare un ambiente tranquillo a casa per il recupero.",
      },
      {
        q: "Quanto costa un intervento chirurgico per il cane?",
        a: "Varia enormemente: da 200 euro per interventi semplici (rimozione di piccole masse) a 1.500-2.500 euro per chirurgia ortopedica (TPLO, protesi d'anca). Il preventivo include visita, esami, anestesia, intervento e controlli.",
      },
      {
        q: "Quanto dura il recupero post-operatorio?",
        a: "Dipende dall'intervento: 3-5 giorni per chirurgia dei tessuti molli minore, 10-14 giorni per interventi addominali, 8-12 settimane per chirurgia ortopedica con fisioterapia riabilitativa.",
      },
      {
        q: "Posso stare vicino al mio cane dopo l'intervento?",
        a: "Al risveglio il cane resta sotto osservazione veterinaria. Una volta dimesso, la tua presenza a casa è importante per il recupero. Segui le istruzioni sulla limitazione del movimento e sulla somministrazione dei farmaci.",
      },
    ],
    relatedServiceAnimals: ["checkup-cane", "sterilizzazione-cane"],
    disclaimer:
      "Le informazioni hanno scopo orientativo. La decisione chirurgica, il tipo di intervento e i rischi specifici vanno discussi con il chirurgo veterinario in base al caso clinico individuale.",
  },

  // ══════════════════════════════════════════════
  // DERMATOLOGIA GATTO
  // ══════════════════════════════════════════════
  "dermatologia-gatto": {
    slug: "dermatologia-gatto",
    serviceSlug: "dermatologia-veterinaria",
    animalId: "gatto",
    animalName: "Gatto",
    animalEmoji: "🐈",
    serviceName: "Dermatologia",
    metaTitle: "Dermatologia Gatto — Guida a malattie della pelle e del pelo del gatto",
    metaDescription:
      "Tutto sulla dermatologia felina: allergie, dermatiti, funghi, parassiti, alopecia e prurito nel gatto. Diagnosi, cure e costi. Richiedi un appuntamento.",
    h1: "Dermatologia veterinaria per il gatto",
    answerSummary:
      "La dermatologia felina si occupa delle malattie della pelle e del pelo del gatto: allergie (alimentari, ambientali, da pulci), dermatite miliare, dermatofitosi (tigna), alopecia psicogena, granuloma eosinofilico e tumori cutanei. Il gatto manifesta i problemi dermatologici in modo diverso dal cane: spesso con autotraumatismo (leccarsi fino a creare alopecia), piuttosto che con il prurito evidente.",
    quickFacts: [
      { label: "Animale", value: "🐈 Gatto" },
      { label: "Servizio", value: "Visita dermatologica" },
      { label: "Patologie comuni", value: "Allergie, tigna, eosinofilico" },
      { label: "Durata visita", value: "30-45 minuti" },
      { label: "Costo indicativo", value: "60–120 €" },
    ],
    intro:
      "Le malattie dermatologiche sono tra le ragioni più frequenti di visita veterinaria nel gatto, ma spesso vengono sottovalutate perché i sintomi sono meno evidenti rispetto al cane. Il gatto raramente si gratta in modo vistoso: più spesso si lecca in modo eccessivo, creando aree di alopecia (assenza di pelo) che il proprietario nota solo quando sono già estese. La dermatologia felina è complessa perché le stesse manifestazioni cliniche (dermatite miliare, alopecia simmetrica, placche eosinofiliche) possono essere causate da allergie alimentari, allergie ambientali (atopia), allergia alle pulci, infezioni fungine o stress. Una diagnosi accurata richiede un approccio sistematico e spesso test specifici.",
    whatIncludes: [
      "Anamnesi dettagliata: stile di vita (indoor/outdoor), dieta, contatto con altri animali, stagionalità dei sintomi, trattamenti antiparassitari in corso",
      "Esame dermatologico completo con lampada di Wood (per screening della dermatofitosi), lente d'ingrandimento e dermatoscopio",
      "Raschiato cutaneo: prelievo di cellule superficiali e profonde per ricerca di acari (Demodex, Notoedres) al microscopio",
      "Esame citologico: apposizione o tampone delle lesioni per identificare batteri, lieviti (Malassezia) o cellule infiammatorie (eosinofili)",
      "Coltura fungina (DTM): test per confermare o escludere la dermatofitosi (tigna), con risultato in 7-14 giorni",
      "Tricogramma: esame microscopico del pelo per valutare rottura (autotraumatismo) vs caduta (alopecia endocrina) e presenza di spore fungine",
      "Dieta ad esclusione: se si sospetta allergia alimentare, il dermatologo imposta un protocollo con proteina idrolizzata o proteina singola nuova per 8-12 settimane",
      "Test allergologici sierologici o intradermici per identificare gli allergeni ambientali responsabili dell'atopia felina",
      "Piano terapeutico personalizzato: può includere farmaci (corticosteroidi, ciclosporina, oclacitinib), immunoterapia specifica, shampoo medicati e gestione ambientale",
    ],
    whenToDo: [
      {
        title: "Prurito persistente o autotraumatismo",
        description:
          "Se il gatto si lecca, si morde o si gratta in modo eccessivo, causando perdita di pelo, croste o ferite, è necessaria una visita dermatologica per identificare la causa (allergia, parassiti, stress).",
      },
      {
        title: "Perdita di pelo (alopecia)",
        description:
          "Alopecia simmetrica sull'addome e sulle zampe posteriori è tipica dell'autotraumatismo da allergia o stress. Alopecia a chiazze irregolari può indicare dermatofitosi (tigna), soprattutto nei gattini.",
      },
      {
        title: "Lesioni cutanee visibili",
        description:
          "Croste diffuse (dermatite miliare), placche rosse rilevate (placca eosinofilica), ulcere sul labbro superiore (ulcera indolente) o noduli sottocutanei richiedono diagnosi dermatologica.",
      },
      {
        title: "Sospetta tigna (dermatofitosi)",
        description:
          "Chiazze circolari senza pelo, croste e desquamazione. Particolarmente comune nei gattini e nei gatti immunodepressi. È una zoonosi: può trasmettersi all'uomo, rendendo la diagnosi e il trattamento urgenti.",
      },
    ],
    warningSignsTitle: "Segnali dermatologici che richiedono visita urgente nel gatto",
    warningSigns: [
      "Lesioni cutanee che si diffondono rapidamente o coinvolgono il muso e le orecchie",
      "Prurito talmente intenso da causare ferite sanguinanti da grattamento",
      "Perdita di pelo nelle persone a contatto con il gatto (sospetta tigna — zoonosi)",
      "Gonfiore improvviso del labbro, del mento o della palpebra (possibile reazione allergica o complesso eosinofilico)",
      "Noduli cutanei che crescono rapidamente o ulcerano (possibile tumore cutaneo)",
      "Croste gialle con pus (piodermite — infezione batterica secondaria)",
    ],
    ageGuidance: [
      {
        stage: "Gattino (0-12 mesi)",
        recommendation:
          "Patologie più comuni: dermatofitosi (tigna — molto contagiosa), acari auricolari (Otodectes), dermatite da pulci. Attenzione alla tigna soprattutto in gattini provenienti da allevamenti o colonie.",
      },
      {
        stage: "Adulto (1-7 anni)",
        recommendation:
          "Età in cui si manifestano le allergie (alimentare, atopica, da pulci). Diagnosi differenziale tra le cause di prurito con approccio sistematico. Il complesso eosinofilico felino è tipico di questa fascia d'età.",
      },
      {
        stage: "Senior (7+ anni)",
        recommendation:
          "Aumenta il rischio di tumori cutanei (carcinoma squamocellulare, soprattutto nei gatti bianchi sulle orecchie e sul naso). Possibili dermatopatie endocrine (iperadrenocorticismo, diabete) con alterazioni del mantello.",
      },
    ],
    costRange: "60–120 €",
    faq: [
      {
        q: "Perché il mio gatto si lecca troppo?",
        a: "Il leccamento eccessivo (overgrooming) nel gatto è solitamente causato da allergie (pulci, cibo, ambiente) nel 70-80% dei casi. Lo stress psicogeno è meno frequente di quanto si pensi. Una visita dermatologica può distinguere le cause.",
      },
      {
        q: "La tigna del gatto è contagiosa per l'uomo?",
        a: "Sì, la dermatofitosi (tigna) è una zoonosi. Il fungo (Microsporum canis) può trasmettersi all'uomo per contatto diretto con il gatto infetto o con il suo ambiente. È importante trattare il gatto e decontaminare l'ambiente.",
      },
      {
        q: "Quanto dura la dieta ad esclusione per allergia alimentare?",
        a: "La dieta ad esclusione deve durare almeno 8 settimane (idealmente 12) con una proteina che il gatto non ha mai mangiato o con alimento idrolizzato. Durante questo periodo, NESSUN altro cibo, snack o integratore è permesso.",
      },
      {
        q: "Quanto costa una visita dermatologica per il gatto?",
        a: "La visita dermatologica specialistica costa generalmente tra 60 e 120 euro, inclusi esami di base (lampada di Wood, raschiato, citologia). Test allergologici, colture fungine e biopsie hanno costi aggiuntivi.",
      },
      {
        q: "Il gatto può avere allergie alimentari?",
        a: "Sì, le allergie alimentari nel gatto sono relativamente comuni. Le proteine più allergizzanti sono pollo, pesce e manzo. Si manifestano con prurito (testa, collo), dermatite miliare e talvolta sintomi gastrointestinali.",
      },
    ],
    relatedServiceAnimals: ["checkup-gatto", "sterilizzazione-gatto"],
    disclaimer:
      "Le informazioni hanno scopo orientativo. La diagnosi dermatologica richiede una visita specialistica con esami specifici. Non applicare creme o farmaci senza indicazione veterinaria.",
  },

  // ══════════════════════════════════════════════
  // VACCINAZIONI GATTO
  // ══════════════════════════════════════════════
  "vaccinazioni-gatto": {
    slug: "vaccinazioni-gatto",
    serviceSlug: "vaccinazioni",
    animalId: "gatto",
    animalName: "Gatto",
    animalEmoji: "🐈",
    serviceName: "Vaccinazioni",
    metaTitle: "Vaccinazioni Gatto — Calendario vaccini, costi e guida completa",
    metaDescription: "Guida completa alle vaccinazioni per il gatto: vaccini core (trivalente), FeLV, richiami, costi e reazioni. Richiedi un appuntamento.",
    h1: "Vaccinazioni per il gatto",
    answerSummary: "Le vaccinazioni proteggono il gatto da malattie virali gravi: panleucopenia (parvo felina), herpesvirus, calicivirus e leucemia felina (FeLV). Il vaccino trivalente (RCP) è considerato core per tutti i gatti. Il protocollo inizia a 8-9 settimane con richiami ogni 3-4 settimane fino a 16 settimane.",
    quickFacts: [
      { label: "Animale", value: "🐈 Gatto" },
      { label: "Vaccini core", value: "Trivalente RCP (Herpes, Calici, Panleucopenia)" },
      { label: "Prima dose", value: "8-9 settimane di vita" },
      { label: "FeLV", value: "Raccomandato per gatti outdoor" },
      { label: "Costo indicativo", value: "30–50 € per seduta" },
    ],
    intro: "La vaccinazione del gatto segue le linee guida WSAVA e ABCD (European Advisory Board on Cat Diseases). Il vaccino trivalente RCP protegge da tre malattie potenzialmente letali: la panleucopenia felina (simile al parvovirus canino, con mortalità altissima nei gattini), l'herpesvirus felino (causa di rinite, congiuntivite e ulcere corneali croniche) e il calicivirus felino (stomatite, ulcere orali, polmonite). Il vaccino FeLV (leucemia felina) è raccomandato per tutti i gattini e per i gatti adulti con accesso all'esterno o contatto con gatti di stato sconosciuto.",
    whatIncludes: [
      "Vaccino trivalente RCP: protegge da panleucopenia, herpesvirus e calicivirus felino in un'unica iniezione",
      "Vaccino FeLV (leucemia felina): raccomandato per gatti outdoor, gatti che vivono con altri gatti FeLV-positivi o di stato sconosciuto. Richiede test FIV/FeLV negativo prima della somministrazione",
      "Vaccino antirabbico: obbligatorio per viaggiare all'estero con il gatto. Singola dose a partire dai 3 mesi",
      "Test FIV/FeLV pre-vaccinale: esame rapido su sangue per escludere infezioni retrovirali prima di iniziare il protocollo",
      "Visita clinica completa ad ogni seduta: peso, temperatura, mucose, auscultazione, palpazione addominale",
      "Consulenza su sverminazione e antiparassitari appropriati per il gatto (mai usare prodotti per cani contenenti permetrina, tossica per i felini)",
    ],
    whenToDo: [
      { title: "Ciclo gattino (8-16 settimane)", description: "Prima dose RCP a 8-9 settimane, richiamo a 12 settimane, ultimo richiamo a 16 settimane. FeLV: prima dose a 8-9 settimane con richiamo a 3-4 settimane. L'ultima dose è cruciale per garantire immunità dopo la scomparsa degli anticorpi materni." },
      { title: "Primo richiamo annuale (15-16 mesi)", description: "Un anno dopo l'ultima dose del ciclo gattino. RCP + FeLV. Consolida l'immunità a lungo termine." },
      { title: "Richiami adulto", description: "RCP: ogni 3 anni per gatti indoor a basso rischio, annuale per gatti outdoor o in comunità. FeLV: annuale per gatti a rischio. Antirabbica: secondo normativa." },
    ],
    warningSignsTitle: "Reazioni post-vaccinali da monitorare nel gatto",
    warningSigns: [
      "Gonfiore del muso o delle orecchie (reazione allergica — contattare immediatamente il veterinario)",
      "Difficoltà respiratorie dopo la vaccinazione",
      "Nodulo nel punto di iniezione che persiste oltre 3 mesi o supera i 2 cm (raro rischio di sarcoma — far valutare)",
      "Febbre e apatia che durano più di 48 ore",
      "Vomito ripetuto nelle prime 24 ore",
      "Zoppia persistente se il vaccino è stato somministrato nella zampa posteriore",
    ],
    ageGuidance: [
      { stage: "Gattino (8-16 settimane)", recommendation: "Ciclo primario completo RCP + FeLV. Test FIV/FeLV. Contestuale prima visita veterinaria completa con consulenza su alimentazione e socializzazione." },
      { stage: "Adulto (1-7 anni)", recommendation: "Richiami RCP ogni 1-3 anni in base al rischio. FeLV annuale per gatti outdoor. Valutare il rischio individuale con il veterinario." },
      { stage: "Senior (7+ anni)", recommendation: "Continuare i richiami. Il veterinario valuterà il rapporto rischio-beneficio in base allo stato di salute. I gatti indoor anziani possono avere protocolli ridotti." },
    ],
    costRange: "30–50 € per seduta",
    faq: [
      { q: "Il gatto da appartamento deve essere vaccinato?", a: "Sì. Il vaccino trivalente RCP è raccomandato per tutti i gatti, anche quelli che vivono esclusivamente in casa. I virus possono essere portati involontariamente su scarpe e vestiti." },
      { q: "Cos'è il vaccino FeLV e serve al mio gatto?", a: "Il vaccino FeLV protegge dalla leucemia felina, un retrovirus trasmesso per contatto diretto (saliva, morsi). È raccomandato per tutti i gattini e per i gatti adulti con accesso all'esterno." },
      { q: "Il vaccino può causare un tumore nel gatto?", a: "Il sarcoma al sito di iniezione è una complicanza molto rara. Per ridurre il rischio, i veterinari somministrano i vaccini in siti periferici (zampe, coda). Qualsiasi nodulo persistente oltre 3 mesi va fatto controllare." },
      { q: "Quanto costa vaccinare un gatto?", a: "Ogni seduta costa generalmente tra 30 e 50 euro. Il ciclo gattino completo (3 sedute RCP + FeLV) costa indicativamente 90-150 euro totali." },
    ],
    relatedServiceAnimals: ["checkup-gatto", "sterilizzazione-gatto"],
    disclaimer: "Le informazioni hanno scopo orientativo. Il protocollo vaccinale deve essere personalizzato dal veterinario in base allo stato di salute e allo stile di vita del gatto.",
  },

  // ══════════════════════════════════════════════
  // NUTRIZIONE CANE
  // ══════════════════════════════════════════════
  "nutrizione-cane": {
    slug: "nutrizione-cane",
    serviceSlug: "nutrizione-veterinaria",
    animalId: "cane",
    animalName: "Cane",
    animalEmoji: "🐕",
    serviceName: "Nutrizione",
    metaTitle: "Nutrizione Cane — Dieta, alimentazione e piani personalizzati",
    metaDescription: "Guida alla nutrizione del cane: alimentazione corretta per età e taglia, gestione del peso, intolleranze alimentari e diete terapeutiche. Richiedi consulenza.",
    h1: "Nutrizione e alimentazione del cane",
    answerSummary: "La nutrizione veterinaria per il cane prevede piani alimentari personalizzati in base a età, taglia, razza, stato di salute e livello di attività. Una dieta corretta previene obesità (colpisce il 40% dei cani), patologie articolari, disturbi gastrointestinali e contribuisce a una vita più lunga e sana.",
    quickFacts: [
      { label: "Animale", value: "🐕 Cane" },
      { label: "Servizio", value: "Consulenza nutrizionale" },
      { label: "Obesità canina", value: "Colpisce il 40% dei cani" },
      { label: "Durata consulenza", value: "30-45 minuti" },
      { label: "Costo indicativo", value: "50–100 €" },
    ],
    intro: "L'alimentazione è il fondamento della salute del cane. Una dieta inadeguata è alla base di molte patologie croniche: obesità, diabete, pancreatite, malattie renali, allergie alimentari e problemi articolari. La nutrizione veterinaria va oltre la semplice scelta del cibo: considera il fabbisogno calorico individuale, il rapporto tra proteine, grassi e carboidrati, l'integrazione di micronutrienti specifici e la gestione di patologie attraverso diete terapeutiche.",
    whatIncludes: [
      "Valutazione del Body Condition Score (BCS) e del peso ideale in base a razza, età e struttura corporea",
      "Calcolo del fabbisogno calorico giornaliero (MER — Maintenance Energy Requirement) personalizzato",
      "Analisi dell'alimentazione attuale: qualità del cibo, quantità, frequenza dei pasti, snack e integratori",
      "Piano alimentare personalizzato: scelta tra cibo commerciale (crocchette, umido), dieta casalinga o dieta BARF/raw con integrazione adeguata",
      "Diete terapeutiche per patologie specifiche: renale, epatica, gastrointestinale, urinaria, dermatologica, cardiaca",
      "Dieta ad esclusione per sospette allergie o intolleranze alimentari (protocollo di 8-12 settimane)",
      "Programma di dimagrimento per cani obesi con obiettivi di peso e controlli periodici",
      "Consulenza sull'alimentazione del cucciolo in crescita e del cane anziano con esigenze specifiche",
    ],
    whenToDo: [
      { title: "Cucciolo in crescita", description: "L'alimentazione del cucciolo deve supportare una crescita equilibrata senza eccessi (soprattutto nelle razze grandi dove una crescita troppo rapida causa problemi ortopedici). Il veterinario nutrizionista imposta il piano in base alla taglia adulta prevista." },
      { title: "Cane in sovrappeso o obeso", description: "Se il cane è sopra il peso forma (BCS > 6/9), un piano di dimagrimento controllato previene diabete, artrosi e malattie cardiovascolari. La riduzione deve essere graduale: 1-2% del peso corporeo a settimana." },
      { title: "Sospetta allergia o intolleranza alimentare", description: "Prurito, otiti ricorrenti, diarrea cronica o vomito possono indicare un'allergia alimentare. La dieta ad esclusione con proteina idrolizzata o novel protein è il gold standard diagnostico." },
      { title: "Patologie croniche", description: "Insufficienza renale, epatica, diabete, calcoli urinari e pancreatite richiedono diete terapeutiche specifiche che sono parte integrante della terapia." },
    ],
    warningSignsTitle: "Segnali di problemi nutrizionali nel cane",
    warningSigns: [
      "Aumento o perdita di peso inspiegabile nonostante la stessa alimentazione",
      "Pelo opaco, secco, con forfora o perdita eccessiva",
      "Feci molli croniche, flatulenza eccessiva o diarrea ricorrente",
      "Prurito persistente (possibile allergia alimentare)",
      "Sete eccessiva (possibile diabete o patologia renale legata alla dieta)",
      "Letargia e scarsa resistenza all'esercizio",
    ],
    ageGuidance: [
      { stage: "Cucciolo (0-12 mesi)", recommendation: "Alimento specifico per cuccioli (puppy), 3-4 pasti al giorno fino a 4 mesi, poi 2-3. Per razze grandi, crocchette large breed puppy per crescita controllata. Evitare integrazioni di calcio se non prescritte." },
      { stage: "Adulto (1-7 anni)", recommendation: "2 pasti al giorno. Monitoraggio del peso ogni 3-6 mesi. Alimento adatto alla taglia e al livello di attività. Cani sterilizzati: ridurre le calorie del 20-25%." },
      { stage: "Senior (7+ anni)", recommendation: "Alimento senior con proteine di alta qualità, ridotto in calorie, arricchito di condroprotettori e antiossidanti. Controllo del peso più frequente. Valutare dieta renale o epatica se indicato." },
    ],
    costRange: "50–100 €",
    faq: [
      { q: "Quante volte al giorno deve mangiare il cane?", a: "Il cucciolo 3-4 volte al giorno, il cane adulto 2 volte. Il pasto singolo è sconsigliato soprattutto nelle razze grandi per il rischio di torsione gastrica." },
      { q: "Meglio crocchette o cibo umido?", a: "Entrambi possono essere adeguati se di buona qualità. Le crocchette hanno il vantaggio di contribuire all'igiene dentale. Molti veterinari consigliano un'alimentazione mista. La scelta va fatta in base alle esigenze individuali." },
      { q: "La dieta casalinga è consigliabile per il cane?", a: "Può essere adatta se formulata con il supporto di un veterinario nutrizionista. Una dieta casalinga improvvisata è quasi sempre sbilanciata e può causare carenze di calcio, zinco, vitamina D e acidi grassi essenziali." },
      { q: "Quanto costa una consulenza nutrizionale per il cane?", a: "Una consulenza nutrizionale veterinaria costa generalmente tra 50 e 100 euro. Include la valutazione, il piano alimentare personalizzato e i controlli di follow-up." },
    ],
    relatedServiceAnimals: ["checkup-cane", "dermatologia-cane"],
    disclaimer: "Le informazioni hanno scopo orientativo. Il piano nutrizionale deve essere personalizzato dal veterinario in base alle condizioni specifiche del cane.",
  },

  // ══════════════════════════════════════════════
  // NUTRIZIONE GATTO
  // ══════════════════════════════════════════════
  "nutrizione-gatto": {
    slug: "nutrizione-gatto",
    serviceSlug: "nutrizione-veterinaria",
    animalId: "gatto",
    animalName: "Gatto",
    animalEmoji: "🐈",
    serviceName: "Nutrizione",
    metaTitle: "Nutrizione Gatto — Alimentazione, diete e consulenza veterinaria",
    metaDescription: "Guida alla nutrizione del gatto: alimentazione corretta, gestione peso, allergie alimentari, dieta per gatto sterilizzato e patologie renali. Richiedi consulenza.",
    h1: "Nutrizione e alimentazione del gatto",
    answerSummary: "La nutrizione del gatto richiede attenzione particolare perché è un carnivoro stretto con esigenze metaboliche uniche: necessita di taurina, acido arachidonico e vitamina A preformata che non può sintetizzare. Una dieta inadeguata può causare cardiomiopatia (carenza di taurina), cecità e patologie epatiche.",
    quickFacts: [
      { label: "Animale", value: "🐈 Gatto" },
      { label: "Servizio", value: "Consulenza nutrizionale" },
      { label: "Tipo metabolico", value: "Carnivoro stretto (obbligato)" },
      { label: "Obesità felina", value: "Colpisce il 40-50% dei gatti indoor" },
      { label: "Costo indicativo", value: "50–100 €" },
    ],
    intro: "Il gatto è un carnivoro obbligato: il suo metabolismo è progettato per ricavare energia principalmente dalle proteine animali. A differenza del cane, non può adattarsi a una dieta vegetariana o povera di proteine senza conseguenze gravi. Ha bisogno di nutrienti specifici che si trovano solo nei tessuti animali: taurina (essenziale per cuore e vista), acido arachidonico, vitamina A preformata e niacina. La nutrizione felina deve anche considerare la tendenza naturale del gatto a bere poco, rendendo l'idratazione attraverso il cibo un fattore cruciale per la prevenzione di malattie renali e urinarie.",
    whatIncludes: [
      "Valutazione del BCS (Body Condition Score) felino e del peso ideale",
      "Analisi dell'assunzione idrica: il gatto tende a bere poco e l'idratazione attraverso il cibo umido è cruciale per la salute renale e urinaria",
      "Piano alimentare bilanciato con rapporto proteico adeguato (minimo 26% su sostanza secca per l'adulto, idealmente 30-45%)",
      "Gestione della transizione alimentare: il gatto è neofobico e i cambi di dieta devono essere graduali (7-10 giorni)",
      "Dieta per gatto sterilizzato: riduzione calorica del 20-30% con controllo dell'apporto di magnesio e fosforo per prevenzione urinaria",
      "Diete terapeutiche per insufficienza renale (ridotto fosforo, proteine di alta qualità), diabete (alto proteico, basso in carboidrati), struvite e ossalati",
      "Dieta ad esclusione per allergie alimentari (8-12 settimane con proteina idrolizzata o novel protein)",
      "Strategia di alimentazione multipla: fontanelle d'acqua, puzzle feeder per stimolazione mentale e controllo del peso",
    ],
    whenToDo: [
      { title: "Gattino in crescita", description: "L'alimentazione del gattino richiede cibo specifico kitten con alto contenuto proteico e calorico. Pasti frequenti (3-4 al giorno) fino ai 6 mesi, poi 2-3 al giorno." },
      { title: "Dopo la sterilizzazione", description: "La sterilizzazione riduce il fabbisogno calorico del 20-30%. Passare a un alimento per gatti sterilizzati è fondamentale per prevenire l'obesità, che predispone a diabete e lipidosi epatica." },
      { title: "Gatto in sovrappeso", description: "L'obesità nel gatto è pericolosa: aumenta il rischio di diabete mellito (7 volte), lipidosi epatica, artrosi e cistite interstiziale. Un programma di dimagrimento controllato è essenziale." },
      { title: "Malattia renale cronica", description: "La dieta renale è pilastro della terapia: riduzione del fosforo, proteine di alta qualità in quantità moderata, arricchimento in omega-3. Prolunga significativamente la sopravvivenza e la qualità della vita." },
    ],
    warningSignsTitle: "Segnali di problemi nutrizionali nel gatto",
    warningSigns: [
      "Perdita di peso graduale anche con appetito normale (ipertiroidismo, diabete, malattia renale)",
      "Aumento di peso progressivo, soprattutto dopo la sterilizzazione",
      "Vomito frequente dopo i pasti (possibile intolleranza, palle di pelo o alimentazione inadeguata)",
      "Pelo opaco e arruffato (carenze nutrizionali o malassorbimento)",
      "Rifiuto di bere: il gatto che beve poco è a rischio di calcoli urinari e problemi renali",
      "Ittero (mucose giallastre): nel gatto obeso che smette di mangiare può indicare lipidosi epatica — EMERGENZA",
    ],
    ageGuidance: [
      { stage: "Gattino (0-12 mesi)", recommendation: "Alimento kitten con almeno 30% proteine. 3-4 pasti al giorno. Cibo umido per abituare all'idratazione. Mai dare latte vaccino (la maggior parte dei gatti è intollerante al lattosio)." },
      { stage: "Adulto (1-7 anni)", recommendation: "2-3 pasti al giorno. Mix di umido e secco per idratazione. Alimento per sterilizzati se necessario. Puzzle feeder per stimolazione. Monitoraggio peso ogni 3 mesi." },
      { stage: "Senior (7+ anni)", recommendation: "Alimento senior con proteine altamente digeribili. Aumentare la componente umida per supportare la funzionalità renale. Integrare omega-3 per articolazioni e cute. Controlli del peso mensili." },
    ],
    costRange: "50–100 €",
    faq: [
      { q: "Il gatto può mangiare cibo per cani?", a: "No. Il cibo per cani non contiene taurina e acido arachidonico in quantità sufficiente per il gatto. Una dieta a base di cibo per cani causa cardiomiopatia dilatativa e degenerazione retinica nel gatto." },
      { q: "Meglio cibo umido o crocchette per il gatto?", a: "L'ideale è una combinazione: il cibo umido fornisce idratazione fondamentale per prevenire problemi renali e urinari; le crocchette offrono praticità e contribuiscono all'igiene dentale." },
      { q: "Il gatto può essere vegetariano?", a: "Assolutamente no. Il gatto è un carnivoro obbligato e non può sopravvivere senza nutrienti di origine animale (taurina, vitamina A preformata, acido arachidonico). Una dieta vegetariana causa patologie gravi." },
      { q: "Quanto costa una consulenza nutrizionale per il gatto?", a: "La consulenza veterinaria nutrizionista costa tra 50 e 100 euro. Include valutazione, piano personalizzato e indicazioni per il follow-up." },
    ],
    relatedServiceAnimals: ["checkup-gatto", "dermatologia-gatto"],
    disclaimer: "Le informazioni hanno scopo orientativo. L'alimentazione del gatto deve essere supervisionata dal veterinario, soprattutto in presenza di patologie.",
  },

  // ══════════════════════════════════════════════
  // ORTOPEDIA CANE
  // ══════════════════════════════════════════════
  "ortopedia-cane": {
    slug: "ortopedia-cane",
    serviceSlug: "ortopedia-veterinaria",
    animalId: "cane",
    animalName: "Cane",
    animalEmoji: "🐕",
    serviceName: "Ortopedia",
    metaTitle: "Ortopedia Cane — Displasia, legamento crociato, fratture e zoppie",
    metaDescription: "Guida all'ortopedia veterinaria per il cane: displasia anca e gomito, rottura legamento crociato, lussazione rotulea, fratture e riabilitazione.",
    h1: "Ortopedia veterinaria per il cane",
    answerSummary: "L'ortopedia veterinaria canina tratta patologie muscolo-scheletriche: displasia dell'anca e del gomito, rottura del legamento crociato anteriore (la più comune causa di zoppia nel cane adulto), lussazione rotulea, fratture e artrosi. La diagnosi si basa su visita ortopedica, radiografie e talvolta TAC o artroscopia.",
    quickFacts: [
      { label: "Animale", value: "🐕 Cane" },
      { label: "Servizio", value: "Visita ortopedica" },
      { label: "Patologie comuni", value: "Crociato, displasia, rotula" },
      { label: "Durata visita", value: "30-45 minuti" },
      { label: "Costo indicativo", value: "60–120 €" },
    ],
    intro: "I problemi ortopedici sono tra le patologie più frequenti nel cane, specialmente nelle razze medio-grandi e giganti. La rottura del legamento crociato anteriore è la prima causa di zoppia nel cane adulto e richiede quasi sempre un intervento chirurgico (TPLO, TTA). La displasia dell'anca colpisce fino al 50% degli individui in alcune razze (Pastore Tedesco, Labrador, Rottweiler). La lussazione rotulea è invece tipica delle razze piccole (Yorkshire, Chihuahua, Barboncino nano). Una diagnosi precoce e un trattamento appropriato sono fondamentali per prevenire l'artrosi secondaria e preservare la qualità della vita.",
    whatIncludes: [
      "Visita ortopedica completa con valutazione dell'andatura, dei range di movimento articolare e dei test ortopedici specifici (test del cassetto per il crociato, test di Ortolani per la displasia dell'anca)",
      "Radiografie ortopediche in sedazione per valutare articolazioni, ossa e segni di artrosi",
      "Pianificazione chirurgica per patologie che richiedono intervento: TPLO/TTA per il crociato, protesi d'anca per displasia grave, trasposizione della cresta tibiale per lussazione rotulea",
      "Gestione conservativa dell'artrosi: FANS veterinari, condroprotettori (glucosamina, condroitina, acidi grassi omega-3), controllo del peso",
      "Programma di fisioterapia e riabilitazione post-chirurgica: idroterapia, laser, esercizi controllati",
      "Screening ortopedico per razze predisposte: radiografie ufficiali per displasia anca/gomito (protocollo PennHIP o BVA/ENCI)",
    ],
    whenToDo: [
      { title: "Zoppia improvvisa", description: "Una zoppia comparsa all'improvviso, soprattutto dopo un salto o una corsa, può indicare rottura del legamento crociato, frattura o lussazione. Visita ortopedica urgente." },
      { title: "Zoppia cronica o rigidità", description: "Rigidità al risveglio, difficoltà a salire le scale o a saltare in auto, riluttanza a correre: possibili segni di artrosi, displasia o patologia articolare progressiva." },
      { title: "Screening cucciolo di razza grande", description: "Per razze predisposte a displasia (Labrador, Golden, Pastore Tedesco, Rottweiler), è consigliabile una valutazione ortopedica a 4-6 mesi per intervento precoce se necessario." },
      { title: "Pre-riproduzione", description: "I cani destinati alla riproduzione dovrebbero avere radiografie ufficiali di anca e gomito (certificazione ENCI/FSA) per non trasmettere la displasia alla prole." },
    ],
    warningSignsTitle: "Segnali ortopedici urgenti nel cane",
    warningSigns: [
      "Zoppia grave con impossibilità di appoggiare la zampa (possibile frattura o lussazione)",
      "Gonfiore visibile di un'articolazione, caldo al tatto",
      "Scricchiolii o crepitii articolari palpabili",
      "Il cane si siede in modo anomalo con le zampe posteriori lateralizzate (displasia, crociato)",
      "Atrofia muscolare visibile su una zampa (indica patologia cronica non trattata)",
      "Difficoltà ad alzarsi da sdraiato, soprattutto dopo il riposo (artrosi avanzata)",
    ],
    ageGuidance: [
      { stage: "Cucciolo (4-12 mesi)", recommendation: "Screening per razze predisposte. Lussazione rotulea diagnosticabile già dalla prima visita. Crescita controllata nelle razze grandi per ridurre stress articolare." },
      { stage: "Adulto (1-7 anni)", recommendation: "Fascia d'età con maggiore incidenza di rottura del crociato (cani 4-7 anni, 20-50 kg). Qualsiasi zoppia >24 ore va valutata. Controllo del peso fondamentale per prevenire artrosi." },
      { stage: "Senior (8+ anni)", recommendation: "Gestione dell'artrosi con approccio multimodale: peso forma, antidolorifici appropriati, integratori articolari, fisioterapia, adattamenti ambientali (rampe, tappetini antiscivolo)." },
    ],
    costRange: "60–120 € (visita); 800–2.500 € (chirurgia)",
    faq: [
      { q: "Come capire se il cane ha un problema ortopedico?", a: "I segni principali sono: zoppia, rigidità al risveglio, riluttanza a saltare o correre, difficoltà a salire le scale, seduta asimmetrica, leccamento insistente di un'articolazione. Anche cambiamenti comportamentali come irritabilità possono indicare dolore." },
      { q: "La displasia dell'anca è curabile?", a: "La displasia non è curabile ma è gestibile. Nei casi lievi: peso forma, esercizio moderato, integratori e FANS al bisogno. Nei casi gravi: chirurgia (protesi d'anca, sinfisiodesi pubica giovanile nel cucciolo)." },
      { q: "Quanto costa un intervento al crociato nel cane?", a: "L'intervento di TPLO o TTA costa generalmente tra 1.200 e 2.500 euro, includendo diagnostica, chirurgia, ospedalizzazione e controlli post-operatori. Il costo varia in base alla struttura e al peso del cane." },
      { q: "La fisioterapia serve dopo un intervento ortopedico?", a: "È fortemente raccomandata. La riabilitazione accelera il recupero, migliora il risultato funzionale e riduce il rischio di complicazioni. Include idroterapia (tapis roulant in acqua), laser, mobilizzazioni passive e esercizi controllati." },
    ],
    relatedServiceAnimals: ["chirurgia-cane", "checkup-cane"],
    disclaimer: "Le informazioni hanno scopo orientativo. La diagnosi e il trattamento ortopedico richiedono visita specialistica con diagnostica per immagini. Non somministrare antidolorifici umani al cane.",
  },

  // ══════════════════════════════════════════════
  // EMERGENZA CANE
  // ══════════════════════════════════════════════
  "emergenza-cane": {
    slug: "emergenza-cane",
    serviceSlug: "veterinario-emergenza",
    animalId: "cane",
    animalName: "Cane",
    animalEmoji: "🐕",
    serviceName: "Emergenza",
    metaTitle: "Emergenza Veterinaria Cane — Pronto soccorso e situazioni urgenti",
    metaDescription: "Guida alle emergenze veterinarie per il cane: torsione gastrica, avvelenamento, trauma, convulsioni. Come riconoscerle e cosa fare.",
    h1: "Emergenza veterinaria per il cane",
    answerSummary: "Le emergenze veterinarie nel cane più frequenti sono: torsione gastrica (GDV), avvelenamento, trauma da investimento, ostruzione da corpo estraneo, colpo di calore e difficoltà respiratorie acute. In caso di emergenza, contattare immediatamente il veterinario o il pronto soccorso veterinario più vicino.",
    quickFacts: [
      { label: "Animale", value: "🐕 Cane" },
      { label: "Servizio", value: "Pronto soccorso veterinario" },
      { label: "Quando", value: "Situazioni che richiedono intervento immediato" },
      { label: "Disponibilità", value: "H24 presso strutture specializzate" },
      { label: "Costo indicativo", value: "80–300+ € (visita urgente)" },
    ],
    intro: "Riconoscere un'emergenza veterinaria nel cane e agire rapidamente può fare la differenza tra la vita e la morte. La torsione gastrica (dilatazione-torsione dello stomaco) è l'emergenza chirurgica più temuta nelle razze grandi e giganti: senza intervento entro 1-2 ore è fatale. L'avvelenamento (lumachicida, veleno per topi, cioccolato, uva, xilitolo) richiede decontaminazione immediata. I traumi da investimento necessitano di valutazione urgente anche se il cane sembra stare bene, perché le lesioni interne possono manifestarsi ore dopo.",
    whatIncludes: [
      "Triage e stabilizzazione: valutazione immediata delle funzioni vitali (ABC: vie aeree, respirazione, circolazione)",
      "Accesso venoso d'emergenza e fluidoterapia per stabilizzare la pressione e combattere lo shock",
      "Diagnostica d'urgenza: radiografie, ecografia FAST addominale, esami del sangue rapidi (lattati, ematocrito, glicemia)",
      "Intervento chirurgico d'urgenza per torsione gastrica, corpi estranei, emorragie interne, cesareo",
      "Decontaminazione in caso di avvelenamento: induzione del vomito (se indicata), carbone attivo, lavanda gastrica",
      "Ossigenoterapia e monitoraggio continuo per pazienti critici",
      "Ricovero intensivo con monitoraggio multiparametrico nelle prime 24-48 ore",
    ],
    whenToDo: [
      { title: "Torsione gastrica (GDV)", description: "Il cane cerca di vomitare senza riuscirci, addome gonfio e teso, salivazione eccessiva, agitazione seguita da prostrazione. Razze a rischio: Alano, Pastore Tedesco, Setter, Dobermann. EMERGENZA ASSOLUTA: corri dal veterinario." },
      { title: "Avvelenamento sospetto", description: "Vomito, diarrea, tremori, salivazione, convulsioni, letargia improvvisa dopo possibile ingestione di veleno, farmaci, cioccolato, uva/uvetta, xilitolo o piante tossiche. NON indurre il vomito senza indicazione veterinaria." },
      { title: "Trauma / Investimento", description: "Anche se il cane cammina dopo un incidente, le lesioni interne (emorragie, pneumotorace, rottura vescicale) possono manifestarsi ore dopo. Portare SEMPRE al pronto soccorso per valutazione." },
      { title: "Difficoltà respiratorie acute", description: "Respiro affannoso, mucose blu/viola (cianosi), respiro a bocca aperta nel cane che normalmente non lo fa, tosse con sangue. EMERGENZA: non attendere." },
    ],
    warningSignsTitle: "Situazioni che richiedono pronto soccorso veterinario IMMEDIATO",
    warningSigns: [
      "Tentativo ripetuto di vomitare senza riuscirci + addome gonfio (torsione gastrica — minuti contano)",
      "Convulsioni: movimenti incontrollati, perdita di coscienza, salivazione — stare a distanza dalla bocca, cronometrare la durata",
      "Emorragia che non si ferma con pressione diretta per 5 minuti",
      "Mucose bianche (gengive pallide) — possibile emorragia interna o shock",
      "Mucose blu/viola (cianosi) — insufficienza respiratoria grave",
      "Collasso improvviso, incapacità di alzarsi",
      "Colpo di calore: temperatura >40°C, salivazione densa, barcollamento, vomito — bagnare con acqua fresca (non ghiacciata) e correre dal veterinario",
      "Ingestione di corpo estraneo con successivo vomito, inappetenza o dolore addominale",
    ],
    ageGuidance: [
      { stage: "Cucciolo (0-12 mesi)", recommendation: "Emergenze più frequenti: ingestione di corpi estranei (calzini, giocattoli, ossa), ipoglicemia (razze toy), parvovirosi (se non vaccinato). Il cucciolo è curioso e mette tutto in bocca." },
      { stage: "Adulto (1-7 anni)", recommendation: "Traumi, avvelenamenti, torsione gastrica (razze grandi), reazioni allergiche acute, ostruzioni urinarie (raro nel maschio). Cani attivi: lesioni muscolo-scheletriche traumatiche." },
      { stage: "Senior (8+ anni)", recommendation: "Scompenso cardiaco, emorragia da rottura di masse spleniche, crisi diabetiche, colpo di calore (termoregolazione compromessa). Il cane anziano è più fragile e le emergenze possono precipitare rapidamente." },
    ],
    costRange: "80–300+ € (visita urgente + stabilizzazione)",
    faq: [
      { q: "Come trovo un pronto soccorso veterinario aperto di notte?", a: "Utilizza il nostro servizio per trovare strutture con servizio H24 o notturno nella tua zona. Tieni sempre a portata di mano il numero del pronto soccorso veterinario più vicino." },
      { q: "Cosa fare se il cane è stato investito?", a: "Mantieni la calma. Avvicina il cane con cautela (può mordere per il dolore). Se possibile, immobilizzalo su una superficie rigida. Non dargli da bere o mangiare. Portalo immediatamente al pronto soccorso veterinario." },
      { q: "Il cioccolato è davvero pericoloso per il cane?", a: "Sì, il cioccolato contiene teobromina, tossica per il cane. Il cioccolato fondente è il più pericoloso. Dosi di 20 mg/kg di teobromina causano sintomi (60-100g di fondente per un cane di 10 kg). Contattare subito il veterinario." },
      { q: "Quanto costa un'emergenza veterinaria?", a: "La visita d'emergenza costa generalmente tra 80 e 150 euro. Se servono esami, stabilizzazione o ricovero, il costo può salire a 300-1.000+ euro. Molte strutture offrono piani di pagamento." },
    ],
    relatedServiceAnimals: ["checkup-cane", "chirurgia-cane"],
    disclaimer: "Queste informazioni hanno scopo orientativo per aiutarti a riconoscere le emergenze. In caso di dubbio, contatta SEMPRE il veterinario. Non tentare di curare il cane da solo in situazioni di emergenza.",
  },

  // ══════════════════════════════════════════════
  // EMERGENZA GATTO
  // ══════════════════════════════════════════════
  "emergenza-gatto": {
    slug: "emergenza-gatto",
    serviceSlug: "veterinario-emergenza",
    animalId: "gatto",
    animalName: "Gatto",
    animalEmoji: "🐈",
    serviceName: "Emergenza",
    metaTitle: "Emergenza Veterinaria Gatto — Pronto soccorso e situazioni urgenti",
    metaDescription: "Guida alle emergenze veterinarie per il gatto: blocco urinario, avvelenamento, trauma, difficoltà respiratorie. Come riconoscerle e agire.",
    h1: "Emergenza veterinaria per il gatto",
    answerSummary: "Le emergenze più frequenti nel gatto sono: ostruzione urinaria nel maschio (emergenza che può essere fatale in 24-48 ore), avvelenamento (permetrina, gigli, paracetamolo), trauma da caduta o investimento, difficoltà respiratorie e tromboembolismo aortico. Il gatto nasconde il dolore: quando mostra sintomi evidenti, la situazione è spesso critica.",
    quickFacts: [
      { label: "Animale", value: "🐈 Gatto" },
      { label: "Servizio", value: "Pronto soccorso veterinario" },
      { label: "Emergenza #1", value: "Blocco urinario (maschio)" },
      { label: "Disponibilità", value: "H24 presso strutture specializzate" },
      { label: "Costo indicativo", value: "80–300+ €" },
    ],
    intro: "Il gatto è maestro nel nascondere il dolore e i sintomi di malattia. Quando mostra segni evidenti di malessere, la situazione è spesso già grave. L'ostruzione urinaria nel gatto maschio è l'emergenza felina più comune e più sottovalutata: il gatto fa ripetuti tentativi in lettiera senza urinare, e senza intervento entro 24-48 ore può sviluppare insufficienza renale acuta, iperkaliemia (aumento del potassio nel sangue) e arresto cardiaco. I gatti sono particolarmente sensibili a sostanze apparentemente innocue per l'uomo: il paracetamolo è LETALE per il gatto, i gigli (tutte le parti della pianta) causano insufficienza renale acuta irreversibile, e i prodotti antiparassitari a base di permetrina (per cani) sono mortali per i felini.",
    whatIncludes: [
      "Triage felino: i gatti in emergenza necessitano di un approccio delicato e rapido — lo stress può peggiorare il quadro clinico",
      "Cateterizzazione urinaria d'urgenza per ostruzione uretrale nel maschio",
      "Diagnostica rapida: radiografie, ecografia, esami del sangue con risultati in 15-30 minuti",
      "Ossigenoterapia: il gatto in distress respiratorio va messo in gabbia a ossigeno prima di qualsiasi manipolazione",
      "Decontaminazione in caso di avvelenamento con protocolli specifici per il gatto",
      "Monitoraggio cardiaco per iperkaliemia (blocco urinario) o tromboembolismo aortico",
      "Ricovero in terapia intensiva con ambiente tranquillo, separato dai cani",
    ],
    whenToDo: [
      { title: "Blocco urinario (gatto maschio)", description: "Il gatto entra e esce dalla lettiera ripetutamente, si sforza, piange, si lecca i genitali in modo ossessivo. Se non urina da 12+ ore: EMERGENZA ASSOLUTA. L'iperkaliemia da blocco causa arresto cardiaco." },
      { title: "Avvelenamento", description: "Salivazione, vomito, tremori, pupille dilatate, letargia. Cause comuni: permetrina (antipulci per cani applicata al gatto — LETALE), paracetamolo (LETALE anche una compressa), gigli, antigelo." },
      { title: "Caduta dall'alto (sindrome del gatto volante)", description: "I gatti caduti dal balcone o dalla finestra necessitano SEMPRE di valutazione, anche se sembrano illesi. Fratture del palato, pneumotorace e lesioni interne sono frequenti." },
      { title: "Respirazione a bocca aperta", description: "Nel gatto è SEMPRE anomala (a differenza del cane). Indica grave distress respiratorio: versamento pleurico, asma severa, cardiomiopatia con edema polmonare. Non stressare il gatto, portalo subito al PS." },
    ],
    warningSignsTitle: "Emergenze che richiedono pronto soccorso IMMEDIATO nel gatto",
    warningSigns: [
      "Respira a bocca aperta — nel gatto è SEMPRE un'emergenza",
      "Non urina da 12+ ore con tentativi ripetuti in lettiera (blocco urinario)",
      "Paralisi improvvisa delle zampe posteriori, zampe fredde (tromboembolismo aortico — emergenza cardiaca)",
      "Convulsioni: perdita di coscienza, movimenti involontari, salivazione",
      "Mucose bianche o blu (emorragia o insufficienza respiratoria)",
      "Caduta da finestra o balcone (anche se sembra stare bene)",
      "Contatto con permetrina (antiparassitario per cani): tremori, convulsioni — lavare immediatamente e correre dal veterinario",
      "Ingestione di gigli: anche piccole quantità causano insufficienza renale acuta irreversibile",
    ],
    ageGuidance: [
      { stage: "Gattino (0-12 mesi)", recommendation: "Emergenze più comuni: infezioni respiratorie gravi (rinotracheite), ipotermia e disidratazione (gattini orfani), corpi estranei (fili, elastici), trauma da caduta." },
      { stage: "Adulto (1-7 anni)", recommendation: "Blocco urinario (maschio), avvelenamento, trauma, asma felina acuta. I gatti maschi sterilizzati sovrappeso sono i più a rischio di ostruzione urinaria." },
      { stage: "Senior (7+ anni)", recommendation: "Scompenso cardiaco (cardiomiopatia ipertrofica), tromboembolismo aortico, crisi renale, crisi diabetica (chetoacidosi). Il gatto anziano decompensa rapidamente." },
    ],
    costRange: "80–300+ €",
    faq: [
      { q: "Come capire se il gatto ha un blocco urinario?", a: "Il gatto va ripetutamente in lettiera, si sforza, piange, produce solo gocce o nulla. Può leccarsi ossessivamente i genitali. Se il gatto maschio non urina da 12 ore con questi sintomi, è un'emergenza assoluta." },
      { q: "Il paracetamolo è pericoloso per il gatto?", a: "Il paracetamolo è LETALE per il gatto. Anche una singola compressa da 500 mg può uccidere un gatto adulto. I gatti non hanno l'enzima per metabolizzarlo. NON dare MAI paracetamolo o aspirina al gatto." },
      { q: "Cosa fare se il gatto cade dal balcone?", a: "Portarlo immediatamente al pronto soccorso veterinario, anche se sembra illeso. Le fratture del palato, il pneumotorace e le lesioni interne sono frequenti e possono non essere immediatamente evidenti." },
      { q: "I gigli sono davvero pericolosi per i gatti?", a: "Sì, tutti i gigli del genere Lilium e Hemerocallis sono tossici per il gatto. Tutte le parti della pianta (fiori, foglie, polline, acqua del vaso) causano insufficienza renale acuta irreversibile. Rimuoverli da casa." },
    ],
    relatedServiceAnimals: ["checkup-gatto", "vaccinazioni-gatto"],
    disclaimer: "Queste informazioni hanno scopo orientativo. In caso di emergenza, contatta IMMEDIATAMENTE il pronto soccorso veterinario. Non tentare di curare il gatto da solo.",
  },



  // ══════════════════════════════════════════════
  // STERILIZZAZIONE CONIGLIO
  // ══════════════════════════════════════════════
  "sterilizzazione-coniglio": {
    slug: "sterilizzazione-coniglio",
    serviceSlug: "sterilizzazione-animali",
    animalId: "coniglio",
    animalName: "Coniglio",
    animalEmoji: "🐇",
    serviceName: "Sterilizzazione",
    metaTitle: "Sterilizzazione Coniglio — Guida completa, costi e benefici",
    metaDescription: "Tutto sulla sterilizzazione del coniglio: perché è importante, età ideale, procedura, costi e recupero. Riduce il rischio di tumore uterino oltre il 50%.",
    h1: "Sterilizzazione del coniglio",
    answerSummary: "La sterilizzazione del coniglio è fortemente raccomandata, soprattutto per le femmine: il rischio di adenocarcinoma uterino supera il 50-80% dopo i 4-5 anni di età. Nel maschio riduce la marcatura territoriale con urina, l'aggressività e il comportamento di monta. L'intervento è sicuro se eseguito da un veterinario esperto in esotici, con protocolli anestesiologici specifici per il coniglio.",
    quickFacts: [
      { label: "Animale", value: "🐇 Coniglio" },
      { label: "Intervento", value: "Ovarioisterectomia (femmina) / Orchiectomia (maschio)" },
      { label: "Età consigliata", value: "4-6 mesi" },
      { label: "Rischio tumore uterino", value: ">50% dopo i 4 anni (non sterilizzata)" },
      { label: "Recupero", value: "5-7 giorni" },
      { label: "Costo indicativo", value: "100–250 €" },
    ],
    intro: "La sterilizzazione è uno degli interventi più importanti per la salute del coniglio domestico. Nella femmina, l'adenocarcinoma uterino è il tumore più comune in assoluto: la sua incidenza supera il 50-80% dopo i 4-5 anni di età nelle femmine non sterilizzate. La sterilizzazione precoce elimina questo rischio. Nel maschio, la castrazione riduce drasticamente la marcatura territoriale (urina spruzzata su pareti e mobili), l'aggressività verso altri conigli e il comportamento di monta. L'anestesia nel coniglio richiede competenze specifiche: il coniglio ha vie aeree delicate e non può vomitare (quindi non necessita di digiuno pre-operatorio — anzi, il digiuno è CONTROINDICATO nel coniglio perché causa GI stasis).",
    whatIncludes: [
      "Visita pre-operatoria con veterinario esperto in animali esotici",
      "IMPORTANTE: nel coniglio NON si fa il digiuno pre-operatorio (a differenza di cane e gatto). Il digiuno causa blocco gastrointestinale (GI stasis)",
      "Anestesia con protocolli specifici per il coniglio: premedicazione, induzione con agenti inalatori, monitoraggio della temperatura (il coniglio è soggetto a ipotermia)",
      "Nella femmina: ovarioisterectomia (rimozione di ovaie e utero) — intervento più complesso rispetto al maschio",
      "Nel maschio: orchiectomia bilaterale — intervento rapido con recupero veloce. Attenzione: resta fertile per 4-6 settimane dopo la castrazione",
      "Terapia antidolorifica con farmaci sicuri per il coniglio (meloxicam, buprenorfina). Mai usare FANS per cani o gatti senza indicazione",
      "Monitoraggio post-operatorio: il coniglio deve riprendere a mangiare entro poche ore dall'intervento",
      "Controllo della ferita a 7-10 giorni. Il collare elisabettiano nel coniglio è difficile da gestire — alternative: body post-chirurgico",
    ],
    whenToDo: [
      { title: "Sterilizzazione precoce (4-6 mesi)", description: "Età ideale per entrambi i sessi. La femmina può essere sterilizzata a partire dai 4-5 mesi, il maschio dai 3-4 mesi (quando i testicoli sono discesi). Massimo beneficio preventivo." },
      { title: "Coniglio adulto non sterilizzato", description: "La sterilizzazione è fattibile a qualsiasi età nell'adulto sano, ma il rischio anestesiologico aumenta leggermente con l'età. Nelle femmine adulte è particolarmente importante per la prevenzione dell'adenocarcinoma uterino." },
      { title: "Problemi comportamentali", description: "Marcatura con urina, aggressività, monta ossessiva: la castrazione riduce significativamente questi comportamenti nel maschio. Nella femmina, le false gravidanze con strappamento di pelo possono essere eliminate dalla sterilizzazione." },
    ],
    warningSignsTitle: "Segnali post-operatori da monitorare nel coniglio",
    warningSigns: [
      "Il coniglio non mangia entro 4-6 ore dall'intervento — EMERGENZA (rischio GI stasis)",
      "Assenza di feci per più di 12 ore dopo il risveglio",
      "Gonfiore o secrezioni dalla ferita",
      "Apatia estrema con rifiuto di muoversi per più di 24 ore",
      "Diarrea acquosa (non confondere con ciecotrofi molli — normali)",
      "Automutilazione della ferita (rosicchiamento dei punti)",
    ],
    ageGuidance: [
      { stage: "Giovane (3-6 mesi)", recommendation: "Età ideale. Il maschio può essere castrato a 3-4 mesi quando i testicoli sono discesi. La femmina a 4-5 mesi. Intervento più breve, recupero più rapido, massimo beneficio preventivo." },
      { stage: "Adulto (6 mesi - 5 anni)", recommendation: "Perfettamente fattibile. Esami pre-operatori raccomandati (emocromo, funzionalità renale). Nella femmina, il beneficio della prevenzione dell'adenocarcinoma uterino giustifica l'intervento a qualsiasi età." },
      { stage: "Senior (5+ anni)", recommendation: "Possibile ma con valutazione anestesiologica approfondita. Se la femmina non sterilizzata mostra scolo vaginale o perdite ematiche, l'ecografia uterina è urgente per escludere neoplasia." },
    ],
    costRange: "100–250 €",
    faq: [
      { q: "Il coniglio deve digiunare prima dell'intervento?", a: "ASSOLUTAMENTE NO. A differenza di cane e gatto, il coniglio NON deve mai essere messo a digiuno. Il suo apparato digerente deve funzionare continuamente; il digiuno causa blocco gastrointestinale (GI stasis), complicanza potenzialmente fatale." },
      { q: "A che età sterilizzare il coniglio?", a: "Il maschio può essere castrato dai 3-4 mesi, la femmina dai 4-5 mesi. Prima è, meglio è per la prevenzione. Non c'è un'età massima, ma il rischio anestesiologico aumenta con l'età." },
      { q: "Il coniglio maschio castrato può ancora montare?", a: "Sì, il comportamento di monta può persistere per 4-6 settimane dopo la castrazione perché gli ormoni circolanti impiegano tempo a diminuire. Resta anche fertile in questo periodo." },
      { q: "Quanto costa sterilizzare un coniglio?", a: "Il costo varia tra 100 e 250 euro. La femmina costa di più (intervento più complesso). Rivolgersi SOLO a veterinari esperti in animali esotici: i protocolli anestesiologici del coniglio sono diversi da quelli di cane e gatto." },
    ],
    relatedServiceAnimals: ["checkup-coniglio", "vaccinazioni-coniglio"],
    disclaimer: "Le informazioni hanno scopo orientativo. La sterilizzazione del coniglio deve essere eseguita SOLO da veterinari con esperienza specifica in animali esotici.",
  },

  // ══════════════════════════════════════════════
  // CHECKUP FURETTO
  // ══════════════════════════════════════════════
  "checkup-furetto": {
    slug: "checkup-furetto",
    serviceSlug: "check-up-veterinario",
    animalId: "furetto",
    animalName: "Furetto",
    animalEmoji: "🦡",
    serviceName: "Check-up",
    metaTitle: "Check-up Furetto — Visita veterinaria per furetto domestico",
    metaDescription: "Guida al check-up veterinario per il furetto: cosa include, malattie comuni, insulinoma, malattia surrenalica, costi e frequenza raccomandata.",
    h1: "Check-up veterinario per il furetto",
    answerSummary: "Il check-up per il furetto è una visita specialistica che valuta peso, denti, cute, linfonodi e ghiandole surrenali. Il furetto è predisposto a patologie specifiche come insulinoma, malattia surrenalica e linfoma, che richiedono diagnosi precoce. Sono raccomandate visite ogni 6 mesi per furetti sotto i 3 anni e ogni 3-4 mesi per furetti sopra i 3 anni.",
    quickFacts: [
      { label: "Animale", value: "🦡 Furetto" },
      { label: "Servizio", value: "Check-up completo" },
      { label: "Frequenza", value: "Ogni 6 mesi (<3 anni) / ogni 3-4 mesi (>3 anni)" },
      { label: "Durata media", value: "20-30 minuti" },
      { label: "Costo indicativo", value: "40–70 €" },
      { label: "Specialista", value: "Veterinario esperto in esotici" },
    ],
    intro: "Il furetto domestico (Mustela putorius furo) è un animale affascinante ma con una medicina complessa. Ha una vita media di 5-8 anni e, soprattutto dopo i 3 anni, è soggetto a patologie molto specifiche. L'insulinoma (tumore del pancreas) e la malattia surrenalica sono le due patologie più frequenti nel furetto sopra i 3 anni, con incidenze che arrivano al 20-30%. Il linfoma è il tumore più comune in assoluto. Tutte queste condizioni beneficiano enormemente dalla diagnosi precoce. È fondamentale rivolgersi a un veterinario esperto in animali esotici.",
    whatIncludes: [
      "Pesatura: il peso è un indicatore critico nel furetto. Perdita di peso può indicare insulinoma, malattia surrenalica o linfoma",
      "Palpazione addominale: milza (la splenomegalia è frequente nel furetto), linfonodi mesenterici, masse addominali",
      "Palpazione delle ghiandole surrenali: l'ingrossamento può indicare malattia surrenalica (alopecia, prurito, ingrossamento vulvare nella femmina sterilizzata)",
      "Esame della cute: alopecia bilaterale simmetrica è il segno classico di malattia surrenalica",
      "Misurazione della glicemia: glicemia <70 mg/dL suggerisce insulinoma (i sintomi sono letargia, debolezza posteriore, salivazione, convulsioni)",
      "Controllo dei denti: il tartaro è frequente e le malattie dentali causano dolore e inappetenza",
      "Vaccinazione cimurro: il furetto è molto sensibile al cimurro canino (quasi sempre letale). Vaccino specifico per furetto",
      "Consulenza su alimentazione: il furetto è un carnivoro obbligato, necessita di dieta ad alto contenuto proteico animale",
    ],
    whenToDo: [
      { title: "Primo check-up dopo l'adozione", description: "Visita entro la prima settimana per valutare lo stato di salute, impostare il calendario vaccinale (cimurro, antirabbica) e ricevere consulenza su alimentazione, ambientamento e sicurezza domestica." },
      { title: "Visite semestrali (fino a 3 anni)", description: "Ogni 6 mesi per monitorare peso, denti, cute e aggiornare le vaccinazioni. Il furetto giovane ha un metabolismo rapido e le patologie possono insorgere velocemente." },
      { title: "Visite trimestrali (oltre 3 anni)", description: "Dopo i 3 anni l'incidenza di insulinoma, malattia surrenalica e linfoma aumenta notevolmente. Check-up ogni 3-4 mesi con glicemia e palpazione attenta." },
    ],
    warningSignsTitle: "Segnali d'allarme nel furetto — visita urgente",
    warningSigns: [
      "Letargia improvvisa, debolezza delle zampe posteriori, sguardo fisso (possibile ipoglicemia da insulinoma — dare miele sulle gengive e correre dal veterinario)",
      "Alopecia progressiva (perdita di pelo) bilaterale, soprattutto su coda e fianchi (malattia surrenalica)",
      "Ingrossamento della vulva nella femmina sterilizzata (malattia surrenalica)",
      "Difficoltà a urinare nel maschio (ingrossamento prostatico da malattia surrenalica)",
      "Perdita di peso nonostante appetito conservato (linfoma, insulinoma)",
      "Diarrea nera (melena) o vomito (possibile corpo estraneo — il furetto ingerisce spesso oggetti in gomma)",
    ],
    ageGuidance: [
      { stage: "Giovane (0-3 anni)", recommendation: "Vaccinazioni (cimurro obbligatorio, antirabbica). Check-up semestrali. Consulenza su dieta (no frutta, no carboidrati, no cibo per cani/gatti generico). Prevenzione ingestione corpi estranei." },
      { stage: "Mezza età (3-5 anni)", recommendation: "Check-up ogni 3-4 mesi con glicemia. Iniziare screening per insulinoma e malattia surrenalica. Monitoraggio del pelo e della cute. Ecografia addominale annuale raccomandata." },
      { stage: "Senior (5+ anni)", recommendation: "Controlli ogni 3 mesi. Esami del sangue completi. Ecografia addominale. Gestione delle patologie croniche (insulinoma con dieta e farmaci, malattia surrenalica con impianto di deslorelina). Valutazione della qualità della vita." },
    ],
    costRange: "40–70 €",
    faq: [
      { q: "Il furetto deve essere vaccinato?", a: "Sì, il vaccino contro il cimurro è fondamentale (il cimurro è quasi sempre fatale nel furetto). L'antirabbica è raccomandata. Usare SOLO vaccini approvati per il furetto — mai vaccini vivi attenuati per cani." },
      { q: "Cos'è l'insulinoma del furetto?", a: "L'insulinoma è un tumore benigno del pancreas che produce eccesso di insulina, causando ipoglicemia (calo degli zuccheri nel sangue). Si manifesta con letargia, debolezza, salivazione e nei casi gravi convulsioni. Gestibile con dieta e farmaci." },
      { q: "Serve un veterinario specializzato per il furetto?", a: "Assolutamente sì. La medicina del furetto è molto diversa da quella di cane e gatto. Anestesia, farmaci e chirurgia richiedono competenze specifiche. Un veterinario generico potrebbe non riconoscere patologie tipiche del furetto." },
      { q: "Quanto vive un furetto?", a: "La vita media del furetto domestico è di 5-8 anni. Con check-up regolari e diagnosi precoce delle patologie tipiche, molti furetti raggiungono i 7-8 anni con buona qualità di vita." },
    ],
    relatedServiceAnimals: ["vaccinazioni-furetto", "sterilizzazione-furetto"],
    disclaimer: "Le informazioni hanno scopo orientativo. Rivolgersi sempre a un veterinario esperto in animali esotici per la cura del furetto.",
  },

  // ══════════════════════════════════════════════
  // CHECKUP CAVALLO
  // ══════════════════════════════════════════════
  "checkup-cavallo": {
    slug: "checkup-cavallo",
    serviceSlug: "check-up-veterinario",
    animalId: "cavallo",
    animalName: "Cavallo",
    animalEmoji: "🐴",
    serviceName: "Check-up",
    metaTitle: "Check-up Cavallo — Visita veterinaria equina completa",
    metaDescription: "Guida al check-up veterinario per il cavallo: esame clinico, dentistica, vaccinazioni, esame feci e visita pre-acquisto. Richiedi un appuntamento.",
    h1: "Check-up veterinario per il cavallo",
    answerSummary: "Il check-up equino è una visita clinica completa che valuta apparato cardiovascolare, respiratorio, muscolo-scheletrico, dentale e gastroenterico del cavallo. Include spesso esame delle feci per parassiti e aggiornamento vaccinale. È raccomandato almeno 2 volte l'anno, con controllo dentale annuale.",
    quickFacts: [
      { label: "Animale", value: "🐴 Cavallo" },
      { label: "Servizio", value: "Check-up equino" },
      { label: "Frequenza", value: "2 volte/anno (minimo)" },
      { label: "Dentistica", value: "Annuale (limatura denti)" },
      { label: "Costo indicativo", value: "80–200 €" },
    ],
    intro: "Il cavallo è un animale atletico con un'anatomia e una fisiologia complesse. La medicina preventiva equina comprende non solo visite cliniche regolari, ma anche gestione dentale (i denti del cavallo crescono continuamente e sviluppano punte e ganci che causano dolore e difficoltà alimentari), programmi di sverminazione basati su esame delle feci (FEC), vaccinazioni e valutazione della performance sportiva. Il veterinario equino visita solitamente a domicilio (in scuderia) ed è fondamentale stabilire un rapporto continuativo per conoscere il cavallo nel suo stato normale e rilevare rapidamente le anomalie.",
    whatIncludes: [
      "Esame obiettivo generale: temperatura, frequenza cardiaca e respiratoria, tempo di riempimento capillare (TRC), mucose",
      "Auscultazione cardiaca e polmonare: soffi, aritmie (comuni nel cavallo atleta), rumori respiratori",
      "Auscultazione addominale: i suoni intestinali nel cavallo sono fondamentali — la loro assenza è segno di colica",
      "Esame dentale con speculum orale: ricerca di punte, ganci, onde, diastemi e patologie dei denti incisivi e molari",
      "Limatura dei denti (rasping/floating) se necessario — procedura di routine nella dentistica equina",
      "Valutazione della condizione corporea (BCS equino da 1 a 9) e dello stato del mantello",
      "Esame degli zoccoli: qualità della parete, suola, fettone, segni di laminite o navicolite",
      "Esame delle feci (FEC — Fecal Egg Count) per pianificare la sverminazione mirata anziché trattamenti a tappeto",
      "Aggiornamento vaccinale: tetano, influenza equina, herpesvirus equino (EHV)",
      "Valutazione dell'apparato muscolo-scheletrico: andatura in linea retta e in circolo, test di flessione se indicati",
    ],
    whenToDo: [
      { title: "Check-up primaverile", description: "Inizio della stagione sportiva: vaccinazioni, dentistica, esame feci, valutazione del peso dopo l'inverno. Ottimo momento per pianificare la gestione sanitaria annuale." },
      { title: "Check-up autunnale", description: "Fine stagione: valutazione delle condizioni prima dell'inverno, sverminazione se indicata dal FEC, controllo degli zoccoli, richiami vaccinali." },
      { title: "Visita pre-acquisto", description: "Visita approfondita con esami diagnostici (radiografie, ecografie, esami del sangue) per valutare lo stato di salute del cavallo prima dell'acquisto. Comprende test di flessione e valutazione delle vie aeree." },
      { title: "Cavallo anziano (>15 anni)", description: "Visite più frequenti (ogni 4-6 mesi) con attenzione a malattia di Cushing (PPID), problemi dentali avanzati, artrosi e perdita di peso." },
    ],
    warningSignsTitle: "Segnali di emergenza nel cavallo",
    warningSigns: [
      "Colica: il cavallo si guarda i fianchi, si rotola, scalcia l'addome, si sdraia ripetutamente — EMERGENZA ASSOLUTA",
      "Laminite: calore e dolore intenso agli zoccoli, postura tipica con i posteriori sotto il corpo e gli anteriori avanti (stance laminitic)",
      "Febbre >38.5°C con abbattimento, scolo nasale e inappetenza (possibile infezione virale)",
      "Zoppia grave improvvisa con impossibilità di appoggiare l'arto",
      "Ferita profonda, specialmente nella zona degli arti (rischio di coinvolgimento di strutture sinoviali)",
      "Sudorazione profusa senza motivo, tremori, tachicardia (possibile miopatia da sforzo o colica)",
    ],
    ageGuidance: [
      { stage: "Puledro (0-2 anni)", recommendation: "Vaccinazioni di base (tetano, influenza). Primo controllo dentale a 12-18 mesi (denti da latte, eventuale ritenzione). Sverminazione guidata da FEC. Gestione della crescita." },
      { stage: "Adulto (3-15 anni)", recommendation: "Check-up semestrale. Dentistica annuale. Esame feci 2-4 volte/anno. Vaccinazioni annuali. Per cavalli sportivi: valutazione dell'apparato muscolo-scheletrico e della performance." },
      { stage: "Senior (15+ anni)", recommendation: "Check-up ogni 4-6 mesi. Screening per Cushing (PPID — test ACTH). Dentistica più frequente (i denti anziani si consumano in modo irregolare). Monitoraggio del peso e della condizione corporea." },
    ],
    costRange: "80–200 €",
    faq: [
      { q: "Ogni quanto il cavallo deve vedere il veterinario?", a: "Minimo 2 volte l'anno per un check-up generale. La dentistica va fatta annualmente. I cavalli sportivi e gli anziani possono richiedere visite più frequenti." },
      { q: "Il cavallo ha bisogno di limatura dei denti?", a: "Sì, i denti del cavallo crescono continuamente e sviluppano punte che causano dolore, difficoltà a masticare e problemi comportamentali. La limatura (floating) è una procedura di routine da fare almeno una volta l'anno." },
      { q: "Cos'è l'esame delle feci (FEC)?", a: "Il Fecal Egg Count conta le uova dei parassiti nelle feci del cavallo. Permette di sverminare solo quando necessario, evitando trattamenti inutili che creano resistenza ai farmaci. È il metodo moderno di gestione parassitaria." },
      { q: "Quanto costa un check-up per il cavallo?", a: "La visita di base costa tra 80 e 200 euro, inclusa la visita a domicilio. Dentistica, esami del sangue e radiografie hanno costi aggiuntivi. La visita pre-acquisto completa può costare 300-800 euro." },
    ],
    relatedServiceAnimals: ["emergenza-cavallo"],
    disclaimer: "Le informazioni hanno scopo orientativo. La gestione sanitaria del cavallo deve essere concordata con il veterinario equino di riferimento.",
  },

  // ══════════════════════════════════════════════
  // CHECKUP TARTARUGA
  // ══════════════════════════════════════════════
  "checkup-tartaruga": {
    slug: "checkup-tartaruga",
    serviceSlug: "check-up-veterinario",
    animalId: "tartaruga",
    animalName: "Tartaruga",
    animalEmoji: "🐢",
    serviceName: "Check-up",
    metaTitle: "Check-up Tartaruga — Visita veterinaria per tartaruga terrestre e acquatica",
    metaDescription: "Guida al check-up per tartaruga: cosa include, problemi comuni, alimentazione, UVB, letargo e gestione corretta. Richiedi un appuntamento.",
    h1: "Check-up veterinario per la tartaruga",
    answerSummary: "Il check-up per la tartaruga valuta carapace, plastrone, occhi, naso, cavità orale, peso e condizione corporea. Le tartarughe sono rettili che nascondono molto bene i sintomi di malattia; quando i segni diventano evidenti, la patologia è spesso avanzata. È fondamentale rivolgersi a un veterinario esperto in rettili.",
    quickFacts: [
      { label: "Animale", value: "🐢 Tartaruga" },
      { label: "Servizio", value: "Check-up rettili" },
      { label: "Frequenza", value: "Annuale (idealmente prima e dopo il letargo)" },
      { label: "Durata media", value: "20-30 minuti" },
      { label: "Costo indicativo", value: "40–70 €" },
      { label: "Specialista", value: "Veterinario esperto in rettili" },
    ],
    intro: "Le tartarughe — sia terrestri (Testudo hermanni, Testudo graeca) che acquatiche (Trachemys scripta, Emys orbicularis) — sono tra i rettili più diffusi come animali domestici in Italia. La loro medicina è però molto specializzata e diversa da quella dei mammiferi. Le tartarughe hanno un metabolismo lentissimo e i sintomi di malattia possono comparire settimane o mesi dopo l'inizio del problema. Gli errori di gestione (alimentazione sbagliata, mancanza di luce UVB, temperature inadeguate, letargo improvvisato) sono la causa principale di patologia. Un check-up annuale con un veterinario esperto in rettili è fondamentale per prevenire problemi.",
    whatIncludes: [
      "Esame del carapace e del plastrone: consistenza (un carapace molle indica carenza di calcio/UVB), forma, eventuali lesioni, crescita anomala delle scute",
      "Pesatura e confronto con il rapporto lunghezza/peso della specie (indice di Jackson per Testudo hermanni)",
      "Esame degli occhi: gonfiore delle palpebre è il segno più comune di carenza di vitamina A nelle tartarughe acquatiche",
      "Esame della cavità orale: stomatite (infezione della bocca), esame del becco corneo",
      "Esame delle narici: scolo nasale indica infezione respiratoria (rinite/polmonite)",
      "Palpazione della fossa prefemorale (nelle terrestri): permette di valutare la presenza di uova, calcoli o masse",
      "Valutazione dell'habitat: il veterinario discuterà temperatura, illuminazione UVB, umidità e dieta — i parametri ambientali sono fondamentali",
      "Esame delle feci: i parassiti intestinali sono molto comuni nelle tartarughe (ossiuri, flagellati)",
      "Consulenza sul letargo: valutazione pre-letargo (peso, stato di salute) e post-letargo (ripresa alimentare)",
    ],
    whenToDo: [
      { title: "Prima del letargo (settembre-ottobre)", description: "Fondamentale per le tartarughe terrestri che vanno in letargo: valutare che il peso sia adeguato, che non ci siano infezioni o parassiti attivi. Una tartaruga malata NON deve andare in letargo." },
      { title: "Dopo il letargo (marzo-aprile)", description: "Controllo della ripresa: peso, idratazione, eventuale scolo nasale, ripresa dell'alimentazione. Se la tartaruga non mangia entro 2 settimane dal risveglio, visita urgente." },
      { title: "Dopo l'adozione", description: "Visita iniziale con valutazione della specie (molte tartarughe vengono identificate erroneamente), stato di salute, esame feci e consulenza completa su habitat, alimentazione e gestione." },
    ],
    warningSignsTitle: "Segnali d'allarme nella tartaruga",
    warningSigns: [
      "Carapace molle o deformato (malattia metabolica dell'osso — carenza di calcio/UVB)",
      "Occhi gonfi, chiusi o con secrezioni (carenza di vitamina A, infezione)",
      "Scolo nasale, starnuti, respiro a bocca aperta (infezione respiratoria)",
      "Rifiuto del cibo per più di 2 settimane (fuori dal periodo di letargo)",
      "Nuoto asimmetrico (la tartaruga acquatica nuota inclinata) — possibile polmonite",
      "Carapace con macchie bianche, erosioni o cattivo odore (infezione fungina o batterica del guscio)",
      "Letargia estrema, incapacità di ritrarsi nel guscio o debolezza generale",
    ],
    ageGuidance: [
      { stage: "Giovane (0-5 anni)", recommendation: "Crescita corretta: il carapace deve essere duro e liscio. Fondamentale l'apporto di calcio e la lampada UVB. Esame feci per parassiti. Consulenza sulla dieta specifica per la specie." },
      { stage: "Adulta (5-30 anni)", recommendation: "Check-up annuale pre e post letargo. Nella femmina: rischio di ritenzione delle uova (distocia) se non ha un'area adatta per la deposizione. Monitoraggio del peso e della forma del carapace." },
      { stage: "Anziana (30+ anni)", recommendation: "Le tartarughe possono vivere 50-100+ anni. Problemi artrosici, renali e epatici possibili. Il veterinario valuterà la necessità di esami del sangue. Il letargo va monitorato con più attenzione." },
    ],
    costRange: "40–70 €",
    faq: [
      { q: "Serve un veterinario specializzato per la tartaruga?", a: "Sì, è fondamentale. La medicina dei rettili è molto diversa da quella dei mammiferi. Un veterinario generico potrebbe non riconoscere i segni di malattia o prescrivere farmaci in dosi inadeguate." },
      { q: "La tartaruga terrestre ha bisogno della lampada UVB?", a: "Sì, la luce UVB è essenziale per sintetizzare la vitamina D3 e metabolizzare il calcio. Senza UVB il carapace diventa molle (malattia metabolica dell'osso). Le lampade vanno sostituite ogni 6-12 mesi anche se funzionano." },
      { q: "Cosa mangia la tartaruga terrestre?", a: "Erbe di campo (tarassaco, trifoglio, piantaggine), verdure a foglia scura. MAI lattuga iceberg, frutta in eccesso, pane, pasta o cibo per cani/gatti. L'alimentazione sbagliata è la causa principale di malattia." },
      { q: "La tartaruga deve andare in letargo?", a: "Le specie mediterranee (Testudo hermanni, T. graeca) devono fare il letargo per il loro benessere. Il letargo va gestito correttamente: temperatura costante 4-8°C, ambiente buio e ventilato. Una tartaruga malata o sottopeso NON deve andare in letargo." },
    ],
    relatedServiceAnimals: ["checkup-coniglio"],
    disclaimer: "Le informazioni hanno scopo orientativo. La cura dei rettili richiede competenze veterinarie specialistiche. Non somministrare farmaci senza indicazione di un veterinario esperto.",
  },

  // ══════════════════════════════════════════════
  // CHECKUP PAPPAGALLO
  // ══════════════════════════════════════════════
  "checkup-pappagallo": {
    slug: "checkup-pappagallo",
    serviceSlug: "check-up-veterinario",
    animalId: "pappagallo",
    animalName: "Pappagallo",
    animalEmoji: "🦜",
    serviceName: "Check-up",
    metaTitle: "Check-up Pappagallo — Visita veterinaria per pappagalli e uccelli",
    metaDescription: "Guida al check-up veterinario per pappagallo: cosa include, malattie comuni, alimentazione, piumaggio e segnali d'allarme. Richiedi un appuntamento.",
    h1: "Check-up veterinario per il pappagallo",
    answerSummary: "Il check-up per il pappagallo valuta piumaggio, peso, becco, narici, occhi, zampe e condizione corporea. Gli uccelli nascondono istintivamente i sintomi di malattia (comportamento da preda); quando mostrano segni evidenti, la situazione è spesso critica. Check-up annuali con veterinario aviare sono essenziali.",
    quickFacts: [
      { label: "Animale", value: "🦜 Pappagallo" },
      { label: "Servizio", value: "Check-up aviare" },
      { label: "Frequenza", value: "Annuale" },
      { label: "Durata media", value: "20-30 minuti" },
      { label: "Costo indicativo", value: "40–80 €" },
      { label: "Specialista", value: "Veterinario aviare" },
    ],
    intro: "I pappagalli (Psittaciformi) sono animali longevi e intelligenti con una medicina molto specifica. Le specie più comuni come cocorite (pappagallini ondulati), calopsite, inseparabili, parrocchetti e pappagalli grandi (ara, cenerino, amazzone, cacatua) hanno esigenze diverse ma condividono la tendenza istintiva a nascondere i sintomi di malattia. In natura un uccello malato viene isolato dal gruppo; per questo i pappagalli domestici mostrano segni evidenti solo quando la malattia è avanzata. Un check-up annuale con veterinario aviare permette di individuare precocemente patologie metaboliche, infettive e comportamentali.",
    whatIncludes: [
      "Pesatura accurata: variazioni di peso anche minime (5-10%) sono clinicamente significative. Il peso è l'indicatore più affidabile dello stato di salute",
      "Valutazione del piumaggio: qualità delle penne, presenza di penne rotte o masticate (possibile deplumazione psicogena), presenza di polverino (normale in cenerini e cacatua)",
      "Esame del becco: forma, simmetria, crescita anomala (possibile malattia del becco e delle penne — PBFD)",
      "Esame delle narici (cere nel pappagallino): scolo, ipertrofia, croste",
      "Palpazione della carena (sterno): la carena prominente indica perdita di peso e scarsa condizione corporea",
      "Esame delle zampe e degli anelli: zampe gonfie, arrossate o con croste possono indicare bumblefoot (pododermatite) o acari",
      "Tampone cloacale o esame delle feci per batteri, lieviti (Candida, Macrorhabdus) e parassiti",
      "Esami del sangue (per specie medio-grandi): emocromo e biochimico per funzionalità epatica e renale",
      "Consulenza su alimentazione (la dieta a soli semi è carente e causa malattie epatiche), arricchimento ambientale e socializzazione",
    ],
    whenToDo: [
      { title: "Dopo l'adozione", description: "Prima visita entro la prima settimana per valutazione generale, test per malattie infettive (chlamydiosi/psittacosi, PBFD), consulenza su alimentazione e gestione. Quarantena da altri uccelli fino ai risultati dei test." },
      { title: "Check-up annuale", description: "Visita annuale con pesatura, esame del piumaggio e delle feci. Per i pappagalli che mangiano prevalentemente semi, il veterinario può raccomandare esami epatici (la lipidosi epatica da dieta a semi è molto comune)." },
      { title: "Cambio di comportamento", description: "Se il pappagallo cambia vocalizzazioni, smette di parlare, diventa aggressivo, inizia a strapparsi le piume o modifica le abitudini alimentari, una visita è opportuna per escludere cause mediche." },
    ],
    warningSignsTitle: "Segnali d'allarme nel pappagallo — visita urgente",
    warningSigns: [
      "Pappagallo che sta sul fondo della gabbia, piumato (gonfio), con gli occhi chiusi — EMERGENZA",
      "Scolo nasale, starnuti, respiro rumoroso o affannoso (infezione respiratoria, possibile chlamydiosi)",
      "Coda che si muove ritmicamente su e giù durante la respirazione (sforzo respiratorio — bob tail)",
      "Rifiuto di cibo per più di 24 ore (negli uccelli piccoli come le cocorite, anche 12 ore senza cibo sono critiche)",
      "Feci anomale: diarrea verde-giallo (possibile malattia epatica), sangue nelle feci, feci acquose",
      "Deplumazione: il pappagallo si strappa le piume (cause mediche da escludere prima di attribuire a stress)",
      "Vomito/rigurgito su se stesso (diverso dal rigurgito affettuoso su persone o oggetti, che è normale)",
    ],
    ageGuidance: [
      { stage: "Giovane (0-2 anni)", recommendation: "Prima visita e test infettivi. Educazione alimentare (transizione da semi a estrusi + verdure fresche). Socializzazione. Le cocorite vivono 7-15 anni, i cenerini fino a 50-60 anni." },
      { stage: "Adulto (2-15 anni)", recommendation: "Check-up annuale. Monitoraggio del peso e del piumaggio. Attenzione alla dieta: la lipidosi epatica da dieta a soli semi è la patologia metabolica più comune. Arricchimento ambientale per prevenire problemi comportamentali." },
      { stage: "Senior (variabile per specie)", recommendation: "Le specie grandi vivono decenni. Negli anziani: esami del sangue annuali, attenzione a patologie renali ed epatiche, artrosi delle zampe, cataratta. Adattamento della gabbia per mobilità ridotta." },
    ],
    costRange: "40–80 €",
    faq: [
      { q: "Serve un veterinario specializzato per i pappagalli?", a: "Sì, la medicina aviare è molto specifica. I dosaggi dei farmaci, l'anestesia e la diagnostica negli uccelli sono completamente diversi da quelli dei mammiferi. Un veterinario generico potrebbe fare più danni che benefici." },
      { q: "I semi bastano come alimentazione?", a: "No, una dieta a soli semi è gravemente sbilanciata: troppi grassi, poche vitamine (A), poco calcio. Causa lipidosi epatica, la malattia metabolica più comune nei pappagalli. La dieta ideale è: 60-70% estrusi/pellet + 20-30% verdure e frutta fresca + semi come premio." },
      { q: "Perché il mio pappagallo si strappa le piume?", a: "La deplumazione ha cause mediche (infezioni, malattie epatiche, allergie, carenze nutrizionali) e comportamentali (noia, stress, solitudine, mancanza di stimoli). Il primo passo è escludere le cause mediche con una visita veterinaria." },
      { q: "La psittacosi è pericolosa per l'uomo?", a: "Sì, la chlamydiosi (psittacosi) è una zoonosi trasmissibile dal pappagallo all'uomo. Nell'uomo causa sintomi simil-influenzali che possono evolvere in polmonite. Un test al momento dell'adozione è fortemente raccomandato." },
    ],
    relatedServiceAnimals: ["checkup-coniglio", "checkup-furetto"],
    disclaimer: "Le informazioni hanno scopo orientativo. La cura degli uccelli richiede competenze veterinarie aviari specialistiche. Non somministrare farmaci senza indicazione veterinaria.",
  },

  // ══════════════════════════════════════════════
  // CHECKUP CRICETO
  // ══════════════════════════════════════════════
  "checkup-criceto": {
    slug: "checkup-criceto",
    serviceSlug: "check-up-veterinario",
    animalId: "criceto",
    animalName: "Criceto",
    animalEmoji: "🐹",
    serviceName: "Check-up",
    metaTitle: "Check-up Criceto — Visita veterinaria per criceto domestico",
    metaDescription: "Guida al check-up per il criceto: cosa include, malattie comuni, alimentazione, tasche guanciali e segnali d'allarme. Richiedi un appuntamento.",
    h1: "Check-up veterinario per il criceto",
    answerSummary: "Il check-up per il criceto valuta peso, denti, tasche guanciali, cute e comportamento. Il criceto ha una vita breve (2-3 anni) e un metabolismo rapido: le malattie progrediscono velocemente. I problemi più comuni sono ascessi, tumori, malattia delle tasche guanciali, wet tail e problemi dentali. Veterinario esperto in esotici essenziale.",
    quickFacts: [
      { label: "Animale", value: "🐹 Criceto" },
      { label: "Servizio", value: "Check-up piccoli mammiferi" },
      { label: "Vita media", value: "2-3 anni" },
      { label: "Frequenza", value: "Ogni 6 mesi" },
      { label: "Costo indicativo", value: "30–50 €" },
      { label: "Specialista", value: "Veterinario esperto in esotici" },
    ],
    intro: "Il criceto domestico (dorato/siriano, russo, roborovski, Campbell) è un piccolo mammifero con esigenze veterinarie specifiche. La sua vita breve (2-3 anni in media) e il metabolismo rapido fanno sì che le malattie progrediscano molto velocemente: un criceto che sta male nel pomeriggio può essere in pericolo di vita la mattina dopo. È fondamentale rivolgersi a un veterinario esperto in animali esotici o piccoli mammiferi, e riconoscere i segnali di malessere il prima possibile.",
    whatIncludes: [
      "Pesatura: il peso è l'indicatore più importante. Il criceto dorato adulto pesa 100-150g, il russo 30-45g. Variazioni del 10% sono significative",
      "Esame dei denti incisivi: crescita continua, possibile malocclusione che impedisce l'alimentazione",
      "Ispezione delle tasche guanciali: impaction (materiale incastrato), ascessi, tumori delle tasche",
      "Esame della cute: acari (Demodex), funghi, alopecia. Il criceto russo/Campbell è soggetto a demodicosi",
      "Palpazione addominale: masse, gonfiore (il criceto femmina è soggetta a piometra, il maschio a tumori testicolari)",
      "Controllo delle ghiandole del fianco (criceto dorato): ipertrofia, infezione o tumore",
      "Esame degli occhi e delle narici: scolo, croste, gonfiore",
      "Consulenza sull'habitat: dimensione della gabbia (minimo 4.000 cm²), ruota adeguata, substrato sicuro, temperatura",
      "Consulenza alimentare: mix di semi di qualità + verdure fresche + proteine (occasionalmente)",
    ],
    whenToDo: [
      { title: "Dopo l'adozione", description: "Visita entro la prima settimana per valutare lo stato di salute, i denti, la cute e ricevere consulenza su gabbia, alimentazione e gestione. Importante determinare il sesso correttamente." },
      { title: "Check-up semestrale", description: "Ogni 6 mesi per monitorare peso, denti e condizioni generali. Dato che il criceto vive solo 2-3 anni, i check-up semestrali coprono una porzione significativa della vita." },
      { title: "Criceto anziano (>18 mesi)", description: "Dopo i 18 mesi il rischio di tumori aumenta significativamente. Palpazione più attenta per masse, monitoraggio del peso e della mobilità." },
    ],
    warningSignsTitle: "Segnali di emergenza nel criceto — agire SUBITO",
    warningSigns: [
      "Wet tail (coda bagnata): diarrea acquosa con regione perianale bagnata — EMERGENZA, il criceto può morire in 24-48 ore",
      "Il criceto non mangia e non beve da 12+ ore",
      "Apatia, il criceto non si muove dalla tana e non reagisce agli stimoli",
      "Difficoltà respiratorie, starnuti frequenti, scolo nasale",
      "Massa o gonfiore visibile sul corpo (i tumori crescono rapidamente nel criceto)",
      "Denti rotti o storti con impossibilità di mangiare",
      "Perdita di pelo estesa con prurito intenso (acari)",
    ],
    ageGuidance: [
      { stage: "Giovane (0-6 mesi)", recommendation: "Prima visita con valutazione generale. Consulenza su gabbia e alimentazione. Attenzione al wet tail, più comune nei giovani criceti appena adottati (stress da trasferimento)." },
      { stage: "Adulto (6-18 mesi)", recommendation: "Check-up semestrali. Monitoraggio del peso e dei denti. Nella femmina: rischio di piometra se non sterilizzata. Arricchimento ambientale per prevenire stereotipie." },
      { stage: "Anziano (18+ mesi)", recommendation: "Il criceto è considerato anziano da 18 mesi. Controlli più frequenti. Attenzione a tumori (molto comuni), cardiopatia, amiloidosi renale. Adattamento della gabbia se la mobilità diminuisce." },
    ],
    costRange: "30–50 €",
    faq: [
      { q: "Serve il veterinario per un criceto?", a: "Sì. Anche se il criceto è piccolo e ha una vita breve, merita cure veterinarie adeguate. Le malattie progrediscono rapidamente e molte sono curabili se diagnosticate in tempo. Rivolgersi a un veterinario esperto in esotici." },
      { q: "Cos'è il wet tail?", a: "Il wet tail (coda bagnata) è un'enterite batterica grave che colpisce soprattutto i giovani criceti. Si manifesta con diarrea acquosa profusa. Senza trattamento antibiotico immediato, il criceto muore in 24-48 ore per disidratazione." },
      { q: "Come capire se il criceto sta male?", a: "I segnali principali sono: non mangia, non esce dalla tana, pelo arruffato, occhi semichiusi, respiro anomalo, coda bagnata, massa visibile. Un criceto che sta in posizione immobile e gonfia (piumato) sta molto male." },
      { q: "Quanto costa portare il criceto dal veterinario?", a: "La visita costa tra 30 e 50 euro. È importante rivolgersi a un veterinario esperto in esotici o piccoli mammiferi: la medicina del criceto richiede competenze specifiche." },
    ],
    relatedServiceAnimals: ["checkup-coniglio", "checkup-furetto"],
    disclaimer: "Le informazioni hanno scopo orientativo. La cura del criceto richiede un veterinario esperto in animali esotici. Data la rapidità delle patologie, non ritardare la visita.",
  },

  // ══════════════════════════════════════════════
  // CHIRURGIA GATTO
  // ══════════════════════════════════════════════
  "chirurgia-gatto": {
    slug: "chirurgia-gatto",
    serviceSlug: "chirurgia-veterinaria",
    animalId: "gatto",
    animalName: "Gatto",
    animalEmoji: "🐈",
    serviceName: "Chirurgia",
    metaTitle: "Chirurgia Gatto — Interventi chirurgici veterinari per il gatto",
    metaDescription: "Guida alla chirurgia veterinaria per il gatto: sterilizzazione, asportazione masse, chirurgia addominale, preparazione e recupero post-operatorio.",
    h1: "Chirurgia veterinaria per il gatto",
    answerSummary: "La chirurgia veterinaria felina comprende interventi di routine (sterilizzazione, ovariectomia) e procedure specialistiche (asportazione masse, chirurgia addominale, ortopedia). Il gatto necessita di anestesia e monitoraggio specifici per la specie. Il recupero è generalmente rapido grazie alla resilienza del gatto.",
    quickFacts: [
      { label: "Animale", value: "🐈 Gatto" },
      { label: "Servizio", value: "Chirurgia veterinaria" },
      { label: "Intervento più comune", value: "Sterilizzazione/castrazione" },
      { label: "Anestesia", value: "Generale inalatoria" },
      { label: "Costo indicativo", value: "100–500 €" },
    ],
    intro: "La chirurgia veterinaria nel gatto è una disciplina che richiede competenze specifiche legate alla fisiologia felina. Il gatto metabolizza i farmaci in modo diverso dal cane (deficit di glucuronidazione epatica), ha una taglia che richiede strumenti miniaturizzati e reagisce allo stress ospedaliero in modo peculiare. L'anestesia felina è oggi molto sicura grazie a protocolli moderni con monitoraggio multiparametrico.",
    whatIncludes: [
      "Visita pre-operatoria con esami del sangue (emocromo, biochimico, coagulazione) per valutare il rischio anestesiologico",
      "Digiuno pre-operatorio secondo protocolli aggiornati (6-8 ore per il cibo, acqua disponibile fino a 2 ore prima)",
      "Premedicazione con analgesia preventiva (il controllo del dolore inizia PRIMA dell'intervento)",
      "Anestesia generale con intubazione endotracheale e anestesia inalatoria (isoflurano/sevoflurano)",
      "Monitoraggio durante l'intervento: ECG, pulsossimetria, capnografia, pressione arteriosa, temperatura",
      "Mantenimento della temperatura corporea (il gatto perde calore rapidamente sotto anestesia)",
      "Terapia del dolore post-operatoria multimodale (FANS + oppioidi se necessario)",
      "Collare elisabettiano o body post-chirurgico per proteggere la ferita",
    ],
    whenToDo: [
      { title: "Sterilizzazione/castrazione", description: "Intervento di routine raccomandato a partire dai 4-6 mesi. La sterilizzazione precoce riduce il rischio di tumori mammari (quasi a zero se prima del primo calore) e previene piometra e gravidanze indesiderate." },
      { title: "Asportazione di masse", description: "Noduli cutanei, masse sottocutanee o tumori interni. Nel gatto, molte masse sono maligne (fibrosarcoma, carcinoma mammario): la diagnosi precoce e l'asportazione con margini ampi sono cruciali." },
      { title: "Chirurgia d'urgenza", description: "Ostruzione uretrale (gatto maschio), corpo estraneo intestinale (filo, spago, elastici per capelli), torsione d'organo. Sono emergenze che richiedono intervento immediato." },
    ],
    warningSignsTitle: "Segnali che richiedono valutazione chirurgica",
    warningSigns: [
      "Massa o nodulo che cresce rapidamente o cambia aspetto",
      "Gatto maschio che va ripetutamente in lettiera senza urinare o con miagolii di dolore (possibile ostruzione uretrale — EMERGENZA)",
      "Vomito ripetuto con inappetenza (possibile corpo estraneo, specialmente se gioca con fili/elastici)",
      "Ferita profonda o morso da combattimento con ascesso",
      "Zoppia grave con arto che pende (possibile frattura)",
      "Distensione addominale con dolore alla palpazione",
    ],
    ageGuidance: [
      { stage: "Gattino (2-6 mesi)", recommendation: "Sterilizzazione/castrazione a partire dai 4 mesi. In gattini sani il rischio anestesiologico è molto basso. La sterilizzazione precoce è raccomandata dalle principali associazioni veterinarie." },
      { stage: "Adulto (1-10 anni)", recommendation: "Esami pre-operatori di base prima di qualsiasi intervento. Il gatto adulto sano tollera bene la chirurgia. Attenzione ai gatti obesi: rischio anestesiologico aumentato." },
      { stage: "Senior (10+ anni)", recommendation: "Esami pre-operatori completi obbligatori (sangue + urine + eventuale ecocardiografia). Il rischio anestesiologico aumenta ma non è una controindicazione. Il beneficio dell'intervento va valutato caso per caso." },
    ],
    costRange: "100–500 €",
    faq: [
      { q: "La sterilizzazione del gatto è dolorosa?", a: "Grazie ai protocolli moderni di analgesia multimodale, il dolore è controllato efficacemente. Il gatto riceve antidolorifici prima, durante e dopo l'intervento. La maggior parte dei gatti è attiva già il giorno successivo." },
      { q: "Quanto dura il recupero post-operatorio?", a: "Per la sterilizzazione: 7-10 giorni (rimozione punti). Per interventi più complessi: 2-4 settimane. Il gatto va tenuto al chiuso e con il collare elisabettiano fino alla guarigione." },
      { q: "Il gatto deve restare a digiuno prima dell'intervento?", a: "Sì, digiuno alimentare di 6-8 ore prima dell'anestesia. L'acqua può essere lasciata disponibile fino a 2 ore prima. Seguire le indicazioni specifiche del veterinario." },
      { q: "Quanto costa un intervento chirurgico per il gatto?", a: "La sterilizzazione costa 100-250€, la castrazione 80-150€. Interventi più complessi (masse, chirurgia addominale, ortopedia) variano da 300 a 1.500€ a seconda della complessità." },
    ],
    relatedServiceAnimals: ["sterilizzazione-gatto", "emergenza-gatto", "checkup-gatto"],
    disclaimer: "Le informazioni hanno scopo orientativo. Ogni intervento chirurgico deve essere valutato dal veterinario in base alle condizioni specifiche del paziente.",
  },

  // ══════════════════════════════════════════════
  // ORTOPEDIA GATTO
  // ══════════════════════════════════════════════
  "ortopedia-gatto": {
    slug: "ortopedia-gatto",
    serviceSlug: "ortopedia-veterinaria",
    animalId: "gatto",
    animalName: "Gatto",
    animalEmoji: "🐈",
    serviceName: "Ortopedia",
    metaTitle: "Ortopedia Gatto — Fratture, lussazioni e problemi articolari felini",
    metaDescription: "Guida all'ortopedia veterinaria per il gatto: fratture, lussazioni, artrosi, displasia e riabilitazione. Richiedi un consulto ortopedico.",
    h1: "Ortopedia veterinaria per il gatto",
    answerSummary: "L'ortopedia felina tratta fratture (spesso da cadute dall'alto o investimenti), lussazioni, artrosi e malattie articolari. Il gatto nasconde il dolore muscolo-scheletrico molto bene: la zoppia nel gatto è sempre significativa. L'artrosi è sottovalutata ma colpisce oltre l'80% dei gatti anziani secondo studi radiografici.",
    quickFacts: [
      { label: "Animale", value: "🐈 Gatto" },
      { label: "Servizio", value: "Ortopedia veterinaria" },
      { label: "Causa più comune", value: "Cadute dall'alto / investimenti" },
      { label: "Artrosi nei gatti anziani", value: ">80% (studi radiografici)" },
      { label: "Costo indicativo", value: "150–1.500 €" },
    ],
    intro: "I problemi ortopedici nel gatto sono più comuni di quanto si pensi. Le fratture da caduta dall'alto (sindrome del gatto volante) e da investimento stradale sono le emergenze più frequenti, ma l'artrosi è la patologia muscolo-scheletrica più diffusa: studi radiografici mostrano segni di artrosi in oltre l'80% dei gatti sopra i 12 anni. Il gatto compensa il dolore riducendo l'attività anziché zoppicare, rendendo la diagnosi clinica più difficile rispetto al cane.",
    whatIncludes: [
      "Visita ortopedica con valutazione dell'andatura, della postura e della mobilità articolare",
      "Palpazione di tutte le articolazioni: anca, ginocchio, gomito, carpo, tarso, colonna vertebrale",
      "Radiografie in sedazione (il gatto non collabora per le proiezioni standard senza sedazione)",
      "Valutazione neurologica se presente deficit propriocettivo (frequente nelle cadute dall'alto)",
      "TC o risonanza magnetica per casi complessi (fratture vertebrali, ernie discali)",
      "Chirurgia ortopedica: osteosintesi con placche/viti, fissazione esterna, artroplastica",
      "Piano di riabilitazione e gestione del dolore cronico (artrosi)",
    ],
    whenToDo: [
      { title: "Trauma acuto", description: "Caduta dal balcone, investimento stradale, morso da cane. Il gatto va portato immediatamente al veterinario per stabilizzazione e diagnostica. Le cadute dall'alto causano spesso fratture di mandibola, femore e bacino contemporaneamente." },
      { title: "Zoppia persistente", description: "Qualsiasi zoppia nel gatto è significativa e merita indagine. Il gatto non zoppica 'per capriccio': se zoppica, c'è un problema. Una zoppia che dura più di 24 ore richiede visita." },
      { title: "Gatto anziano meno attivo", description: "Se il gatto salta meno, non sale più sui mobili, è riluttante a usare la lettiera con bordi alti o dorme di più, potrebbe avere artrosi. La valutazione ortopedica e radiografica permette di impostare una terapia del dolore adeguata." },
    ],
    warningSignsTitle: "Segnali di problema ortopedico nel gatto",
    warningSigns: [
      "Zoppia su qualsiasi arto (nel gatto è SEMPRE significativa)",
      "Arto che pende o angolazione anomala (frattura)",
      "Riluttanza a saltare, salire le scale o entrare nella lettiera",
      "Il gatto non appoggia un arto a terra",
      "Gonfiore articolare caldo e dolente",
      "Paralisi improvvisa degli arti posteriori (possibile tromboembolia aortica — EMERGENZA ASSOLUTA)",
    ],
    ageGuidance: [
      { stage: "Gattino (0-1 anno)", recommendation: "Le fratture nei gattini spesso guariscono bene grazie al potenziale rigenerativo dell'osso giovane. Attenzione alle cadute dai balconi: anche il gattino che sembra stare bene dopo una caduta può avere fratture interne." },
      { stage: "Adulto (1-10 anni)", recommendation: "Traumi da cadute e investimenti. Lussazione rotulea. Nel gatto indoor: fratture da salti sbagliati (raro ma possibile). Gestione chirurgica spesso necessaria." },
      { stage: "Senior (10+ anni)", recommendation: "Artrosi diffusa in >80% dei gatti. Gestione multimodale del dolore: FANS approvati per il gatto (meloxicam a lungo termine sotto controllo renale), nutraceutici (glucosamina, omega-3), adattamenti ambientali (scalini, lettiera bassa)." },
    ],
    costRange: "150–1.500 €",
    faq: [
      { q: "Come capisco se il mio gatto ha dolore alle articolazioni?", a: "Il gatto non zoppica come il cane. I segni di dolore articolare sono: riduzione dell'attività, riluttanza a saltare, meno gioco, pelo trascurato in zone difficili da raggiungere, irritabilità quando toccato in certe zone, cambio nella postura del sonno." },
      { q: "L'artrosi del gatto si può curare?", a: "L'artrosi non si guarisce ma si gestisce efficacemente con FANS sicuri per il gatto (sotto controllo veterinario), integratori, fisioterapia, controllo del peso e adattamenti dell'ambiente domestico." },
      { q: "Il gatto caduto dal balcone va sempre portato dal veterinario?", a: "Sì, SEMPRE. Anche se sembra stare bene, può avere fratture interne, pneumotorace, rottura della vescica o emorragie non visibili. Le lesioni più gravi possono manifestarsi ore dopo la caduta." },
      { q: "Quanto costa un'operazione ortopedica nel gatto?", a: "Dalla semplice riduzione di lussazione (150-400€) all'osteosintesi con placche e viti per fratture complesse (800-1.500€). La TC pre-operatoria e la fisioterapia post-operatoria hanno costi aggiuntivi." },
    ],
    relatedServiceAnimals: ["chirurgia-gatto", "emergenza-gatto", "checkup-gatto"],
    disclaimer: "Le informazioni hanno scopo orientativo. I traumi richiedono sempre valutazione veterinaria urgente. Non somministrare antidolorifici umani al gatto (il paracetamolo è TOSSICO e potenzialmente letale).",
  },

  // ══════════════════════════════════════════════
  // EMERGENZA CONIGLIO
  // ══════════════════════════════════════════════
  "emergenza-coniglio": {
    slug: "emergenza-coniglio",
    serviceSlug: "veterinario-emergenza",
    animalId: "coniglio",
    animalName: "Coniglio",
    animalEmoji: "🐇",
    serviceName: "Emergenza",
    metaTitle: "Emergenza Coniglio — Pronto soccorso veterinario per il coniglio",
    metaDescription: "Guida alle emergenze veterinarie del coniglio: stasi gastrointestinale, blocco urinario, colpo di calore e segnali d'allarme critici.",
    h1: "Emergenza veterinaria per il coniglio",
    answerSummary: "Le emergenze più frequenti nel coniglio sono la stasi gastrointestinale (GI stasis), il blocco urinario, il colpo di calore e le fratture vertebrali. Il coniglio è un animale preda che nasconde i sintomi: quando mostra segni evidenti, la situazione è spesso critica. Un coniglio che non mangia da 12 ore è un'emergenza.",
    quickFacts: [
      { label: "Animale", value: "🐇 Coniglio" },
      { label: "Servizio", value: "Emergenza veterinaria" },
      { label: "Emergenza più comune", value: "Stasi gastrointestinale" },
      { label: "Soglia critica", value: "12h senza mangiare = emergenza" },
      { label: "Specialista", value: "Veterinario esperto in esotici" },
    ],
    intro: "Il coniglio è un erbivoro con un sistema digestivo delicato e complesso. La stasi gastrointestinale (arresto della motilità intestinale) è l'emergenza più comune e può essere fatale in 24-48 ore se non trattata. Il coniglio è anche molto sensibile allo stress, al calore (non tollera temperature >28°C) e alle fratture vertebrali (per movimenti bruschi durante la contenzione). È fondamentale avere un veterinario esperto in esotici di riferimento PRIMA dell'emergenza.",
    whatIncludes: [
      "Triage: valutazione rapida dei parametri vitali (temperatura, frequenza cardiaca e respiratoria, stato di idratazione)",
      "Auscultazione addominale: i suoni intestinali assenti o ridotti indicano stasi gastrointestinale",
      "Fluidoterapia (sottocutanea o endovenosa) per reidratazione e ripristino della motilità",
      "Somministrazione di procinetici (metoclopramide, cisapride) per riavviare la motilità intestinale",
      "Analgesia: il dolore addominale peggiora la stasi. Il controllo del dolore è parte della terapia",
      "Alimentazione assistita con siringa (Critical Care) se il coniglio non mangia autonomamente",
      "Radiografie addominali per escludere ostruzione, gas eccessivo o corpi estranei",
      "Gestione del colpo di calore: raffreddamento graduale, fluidoterapia, monitoraggio organi",
    ],
    whenToDo: [
      { title: "Il coniglio non mangia da 12+ ore", description: "EMERGENZA. Il coniglio deve mangiare costantemente per mantenere la motilità intestinale. Un digiuno di 12 ore può innescare una stasi gastrointestinale che diventa rapidamente fatale. Non aspettare: portalo dal veterinario." },
      { title: "Assenza di feci o feci anomale", description: "Feci assenti, molto piccole, deformate o con muco sono segno di problema gastrointestinale. Diarrea vera (acquosa) nel coniglio adulto è RARA e molto grave." },
      { title: "Colpo di calore (temperatura >28°C)", description: "Il coniglio non suda e non ansima efficacemente. Se è esposto a temperature elevate e appare abbattuto, con respiro rapido e orecchie molto calde, bagnare le orecchie con acqua fresca (non gelata) e correre dal veterinario." },
      { title: "Paralisi posteriore improvvisa", description: "Frattura vertebrale da caduta, manipolazione scorretta o movimento improvviso. Non muovere il coniglio inutilmente, trasportarlo su una superficie piatta e rigida. EMERGENZA ASSOLUTA." },
    ],
    warningSignsTitle: "Segnali di emergenza nel coniglio — AGIRE SUBITO",
    warningSigns: [
      "Non mangia da 12+ ore (il coniglio DEVE mangiare continuamente)",
      "Assenza di feci per 12+ ore",
      "Denti che digrignano forte (bruxismo di dolore, diverso dal leggero grinding di piacere)",
      "Postura raccolta, immobilità, riluttanza a muoversi (dolore addominale)",
      "Respiro rapido e affannoso, narici che si allargano",
      "Inclinazione della testa (head tilt) — possibile Encephalitozoon cuniculi o otite",
      "Paralisi degli arti posteriori (frattura vertebrale o tromboembolia)",
      "Temperatura >40°C o <37°C (emergenza termica)",
    ],
    ageGuidance: [
      { stage: "Giovane (0-1 anno)", recommendation: "Rischio di stasi da dieta scorretta (troppo pellet, poche fibre). Diarrea nei giovani conigli è più grave che negli adulti. Ostruzione intestinale da ingestione di materiali estranei." },
      { stage: "Adulto (1-5 anni)", recommendation: "Stasi gastrointestinale la più comune emergenza. Nella femmina non sterilizzata: piometra, torsione uterina, adenocarcinoma uterino (incidenza fino all'80% dopo i 4 anni nelle femmine intere)." },
      { stage: "Senior (5+ anni)", recommendation: "Aumento del rischio di tumori. Problemi renali. Spondilartrosi della colonna. Le emergenze nei conigli anziani richiedono particolare cautela nella gestione dello stress da ospedalizzazione." },
    ],
    costRange: "60–300 €",
    faq: [
      { q: "Perché il coniglio che non mangia è un'emergenza?", a: "Il sistema digestivo del coniglio richiede un flusso costante di fibra per funzionare. Senza cibo, la motilità si ferma (stasi), i batteri intestinali fermentano producendo gas tossici, il fegato va in lipidosi. In 24-48 ore può essere fatale." },
      { q: "Il colpo di calore nel coniglio è pericoloso?", a: "Sì, potenzialmente letale. Il coniglio non può sudare e ansima molto poco. Sopra i 28°C è a rischio. Sopra i 30°C è in pericolo imminente. Mantenere sempre in ambiente fresco con ventilazione." },
      { q: "Cosa fare se il coniglio ha la testa inclinata?", a: "L'head tilt (torcicollo) può essere causato da Encephalitozoon cuniculi (parassita), otite media/interna o ictus. Visita urgente per diagnosi e terapia. Molti casi rispondono al trattamento se diagnosticati rapidamente." },
      { q: "Posso dare antidolorifici umani al coniglio?", a: "MAI. I farmaci umani possono essere tossici per il coniglio. Solo il veterinario esperto in esotici può prescrivere antidolorifici sicuri (meloxicam è il più usato nei conigli, a dosaggio specifico)." },
    ],
    relatedServiceAnimals: ["checkup-coniglio", "sterilizzazione-coniglio", "vaccinazioni-coniglio", "nutrizione-coniglio"],
    disclaimer: "Le informazioni hanno scopo orientativo. Le emergenze nel coniglio richiedono intervento veterinario immediato. Non ritardare la visita.",
  },

  // ══════════════════════════════════════════════
  // NUTRIZIONE CONIGLIO
  // ══════════════════════════════════════════════
  "nutrizione-coniglio": {
    slug: "nutrizione-coniglio",
    serviceSlug: "nutrizione-veterinaria",
    animalId: "coniglio",
    animalName: "Coniglio",
    animalEmoji: "🐇",
    serviceName: "Nutrizione",
    metaTitle: "Nutrizione Coniglio — Alimentazione corretta per il coniglio domestico",
    metaDescription: "Guida alla nutrizione del coniglio: dieta corretta a base di fieno, verdure, pellet, alimenti vietati e consulenza veterinaria nutrizionale.",
    h1: "Nutrizione e alimentazione del coniglio",
    answerSummary: "La dieta corretta del coniglio è composta per l'80% da fieno di qualità (disponibile 24h/24), 15% verdure fresche a foglia verde e 5% pellet di qualità senza semi/cereali. L'alimentazione sbagliata è la causa principale di malattia nel coniglio domestico, in particolare stasi gastrointestinale e problemi dentali.",
    quickFacts: [
      { label: "Animale", value: "🐇 Coniglio" },
      { label: "Servizio", value: "Consulenza nutrizionale" },
      { label: "Alimento base", value: "Fieno (80% della dieta)" },
      { label: "Verdure", value: "15% — foglia verde quotidiana" },
      { label: "Pellet", value: "5% — max 1 cucchiaio/kg/giorno" },
    ],
    intro: "L'alimentazione è il fondamento della salute del coniglio. Il coniglio è un erbivoro stretto con un sistema digestivo specializzato che richiede un flusso costante di fibra lunga (fieno) per funzionare correttamente. Gli errori alimentari più comuni — troppo pellet, semi, pane, frutta in eccesso — causano obesità, stasi gastrointestinale, problemi dentali e disbiosi intestinale. Una consulenza nutrizionale veterinaria può prevenire la maggior parte delle patologie del coniglio domestico.",
    whatIncludes: [
      "Valutazione del peso e della condizione corporea (BCS specifico per coniglio)",
      "Analisi della dieta attuale: tipo di fieno, quantità di pellet, verdure offerte, premi",
      "Piano alimentare personalizzato per specie, età, peso e condizioni di salute",
      "Lista delle verdure sicure e di quelle da evitare",
      "Gestione della transizione alimentare (deve essere graduale per non causare disbiosi)",
      "Consulenza su integratori: vitamina D (per conigli indoor), probiotici specifici",
      "Gestione dell'obesità o del sottopeso",
      "Educazione sui cibi VIETATI (pane, pasta, biscotti, cioccolato, semi, cereali, lattuga iceberg)",
    ],
    whenToDo: [
      { title: "Adozione di un coniglio", description: "Fondamentale impostare la dieta corretta fin dall'inizio. Molti conigli arrivano dal negozio con diete a base di semi misti, completamente inadeguate. La transizione al fieno + verdure va fatta gradualmente." },
      { title: "Problemi dentali ricorrenti", description: "I denti del coniglio crescono continuamente (2-3 mm/settimana). Se non consumati dal fieno, si sviluppa malocclusione con speroni dentali dolorosi. La dieta corretta PREVIENE i problemi dentali." },
      { title: "Stasi gastrointestinale", description: "Dopo un episodio di stasi, la consulenza nutrizionale è essenziale per prevenire recidive. Spesso la causa è la carenza di fibra lunga (fieno insufficiente) nella dieta." },
    ],
    warningSignsTitle: "Segnali di alimentazione sbagliata nel coniglio",
    warningSigns: [
      "Feci piccole, irregolari o assenti (dieta carente di fibra)",
      "Ciecotrofi non consumati (palline molli e grappolo attaccate al pelo perianale) — spesso da eccesso di pellet/zuccheri",
      "Obesità (non si sentono le costole alla palpazione, pieghe di grasso sotto il mento eccessive)",
      "Problemi dentali ricorrenti (malocclusione da insufficiente consumo di fieno)",
      "Pelo opaco, forfora, muta eccessiva",
      "Diarrea vera (acquosa) — emergenza: può essere enterotossiemia",
    ],
    ageGuidance: [
      { stage: "Cucciolo (0-6 mesi)", recommendation: "Fieno a volontà (erba medica/alfalfa fino a 6 mesi per il calcio), pellet in quantità adeguata alla crescita, introduzione graduale delle verdure a partire dai 3-4 mesi (una alla volta per verificare tolleranza)." },
      { stage: "Adulto (6 mesi-5 anni)", recommendation: "Fieno di graminacee (Timothy, festuca) a volontà, pellet limitato a 1 cucchiaio/kg/giorno, verdure a foglia verde (radicchio, cicoria, sedano, finocchio). Frutta solo come premio (max 1 cucchiaino/giorno)." },
      { stage: "Senior (5+ anni)", recommendation: "Mantenere la stessa dieta dell'adulto. Monitorare il peso (tendenza a dimagrire o ingrassare). Attenzione alla capacità di masticare il fieno (problemi dentali). Se sottopeso, possibile aumentare leggermente il pellet." },
    ],
    costRange: "40–70 €",
    faq: [
      { q: "Il coniglio può mangiare solo pellet?", a: "Assolutamente no. Il pellet è solo il 5% della dieta. Il fieno deve essere l'80% perché la fibra lunga è essenziale per la motilità intestinale e per consumare i denti. Un coniglio a solo pellet svilupperà problemi dentali e gastrointestinali." },
      { q: "Che tipo di fieno è migliore per il coniglio?", a: "Per gli adulti: fieno di graminacee (Timothy hay, festuca, fleolo). Per i cuccioli sotto i 6 mesi: erba medica (alfalfa), più ricca di calcio per la crescita. Il fieno deve essere fresco, profumato e verde, non polveroso." },
      { q: "Il pane secco fa bene ai denti del coniglio?", a: "NO, è un mito pericolosissimo. Il pane è ricco di amido che causa disbiosi intestinale e non consuma i denti (solo il fieno lo fa, grazie al movimento laterale della masticazione). Il pane è uno degli alimenti più dannosi per il coniglio." },
      { q: "Quali verdure posso dare al coniglio?", a: "Sì: radicchio, cicoria, sedano, finocchio, rucola, basilico, menta, prezzemolo (moderato). Da evitare: lattuga iceberg (tossica), patate, fagioli, cipolla, aglio, avocado. Introdurre una verdura nuova alla volta." },
    ],
    relatedServiceAnimals: ["checkup-coniglio", "emergenza-coniglio", "sterilizzazione-coniglio"],
    disclaimer: "Le informazioni hanno scopo orientativo. La dieta del coniglio va personalizzata con il veterinario esperto in esotici in base a età, peso e condizioni di salute.",
  },

  // ══════════════════════════════════════════════
  // CARDIOLOGIA CANE
  // ══════════════════════════════════════════════
  "cardiologia-cane": {
    slug: "cardiologia-cane",
    serviceSlug: "cardiologia-veterinaria",
    animalId: "cane",
    animalName: "Cane",
    animalEmoji: "🐕",
    serviceName: "Cardiologia",
    metaTitle: "Cardiologia Cane — Visita cardiologica e ecocardiografia per il cane",
    metaDescription: "Guida alla cardiologia veterinaria per il cane: malattie cardiache, ecocardiografia, soffio cardiaco, insufficienza e terapia. Richiedi un consulto.",
    h1: "Cardiologia veterinaria per il cane",
    answerSummary: "Le malattie cardiache sono comuni nel cane, con prevalenza crescente nell'età adulta e senile. La malattia valvolare degenerativa (endocardiosi mitralica) è la cardiopatia più frequente nelle razze piccole, mentre la cardiomiopatia dilatativa colpisce le razze grandi. La diagnosi precoce con ecocardiografia permette di iniziare terapie che prolungano significativamente la vita.",
    quickFacts: [
      { label: "Animale", value: "🐕 Cane" },
      { label: "Servizio", value: "Cardiologia veterinaria" },
      { label: "Malattia più comune", value: "Endocardiosi mitralica" },
      { label: "Esame principale", value: "Ecocardiografia" },
      { label: "Costo indicativo", value: "100–250 €" },
    ],
    intro: "Le malattie cardiache nel cane sono molto diffuse e rappresentano una delle principali cause di mortalità nelle razze predisposte. L'endocardiosi mitralica (degenerazione della valvola mitrale) colpisce fino al 75% dei Cavalier King Charles Spaniel sopra i 10 anni e ha alta incidenza in tutte le razze piccole. La cardiomiopatia dilatativa (DCM) è tipica delle razze grandi e giganti (Dobermann, Alano, Boxer). La diagnosi precoce tramite ecocardiografia e la terapia tempestiva possono rallentare significativamente la progressione e migliorare la qualità della vita.",
    whatIncludes: [
      "Auscultazione cardiaca approfondita: classificazione del soffio (grado I-VI), ritmo, frequenza",
      "Ecocardiografia Doppler: valutazione delle dimensioni delle camere cardiache, funzione sistolica e diastolica, flussi valvolari",
      "Elettrocardiogramma (ECG): rilevazione di aritmie, disturbi di conduzione",
      "Misurazione della pressione arteriosa (Doppler o oscillometrico)",
      "Radiografie toraciche: dimensioni del cuore (VHS), segni di insufficienza cardiaca congestizia",
      "Esami del sangue: NT-proBNP (marker di stress cardiaco), troponina, funzionalità renale",
      "Stadiazione della malattia cardiaca secondo le linee guida ACVIM (stadi A-D)",
      "Impostazione della terapia farmacologica: pimobendan, ACE-inibitori, diuretici, antiaritmici",
    ],
    whenToDo: [
      { title: "Soffio cardiaco riscontrato alla visita", description: "Se il veterinario rileva un soffio, è raccomandato un ecocardiogramma per determinarne la causa e la gravità. Molti soffi sono benigni nei cuccioli ma significativi negli adulti." },
      { title: "Razze predisposte — screening", description: "Cavalier King Charles Spaniel, Dobermann, Boxer, Alano: screening ecocardiografico raccomandato annualmente a partire dai 3-5 anni per diagnosi precoce prima dei sintomi clinici." },
      { title: "Tosse, affanno, intolleranza all'esercizio", description: "Tosse notturna, respiro affannoso, sincopi (svenimenti), ridotta tolleranza alla passeggiata: possibili segni di insufficienza cardiaca che richiedono valutazione cardiologica urgente." },
    ],
    warningSignsTitle: "Segnali di problema cardiaco nel cane",
    warningSigns: [
      "Tosse persistente, soprattutto notturna o dopo l'attività fisica",
      "Respiro affannoso a riposo o frequenza respiratoria a riposo >30 atti/min",
      "Sincope (il cane sviene durante l'attività o l'eccitazione)",
      "Distensione addominale (ascite — liquido nell'addome da insufficienza cardiaca destra)",
      "Intolleranza all'esercizio: il cane si stanca rapidamente o rifiuta la passeggiata",
      "Mucose pallide o cianotiche (grigio-bluastre)",
    ],
    ageGuidance: [
      { stage: "Cucciolo (0-1 anno)", recommendation: "Screening per cardiopatie congenite (stenosi polmonare, stenosi aortica, dotto arterioso pervio) se presente soffio alla prima visita. Molte sono trattabili chirurgicamente." },
      { stage: "Adulto (1-7 anni)", recommendation: "Screening annuale per razze predisposte. ECG per Boxer (cardiomiopatia aritmogena). Ecocardiografia per Dobermann (DCM) e Cavalier King (MVD). Diagnosi precoce = terapia tempestiva." },
      { stage: "Senior (7+ anni)", recommendation: "L'incidenza di malattia valvolare aumenta significativamente. Monitoraggio della frequenza respiratoria a riposo (il proprietario può farlo a casa). Terapia cronica con pimobendan, ACE-inibitori e diuretici se indicato." },
    ],
    costRange: "100–250 €",
    faq: [
      { q: "Cosa significa se il mio cane ha un soffio cardiaco?", a: "Un soffio è un rumore anomalo del flusso sanguigno attraverso il cuore. Può essere innocente (nei cuccioli) o indicare una malattia valvolare o una cardiopatia. L'ecocardiografia è necessaria per determinare la causa e la gravità." },
      { q: "L'endocardiosi mitralica si cura?", a: "Non esiste una cura definitiva, ma la terapia con pimobendan (studio EPIC) ritarda significativamente la progressione verso l'insufficienza cardiaca. Iniziare la terapia allo stadio giusto è fondamentale — per questo lo screening precoce è importante." },
      { q: "Quanto costa una visita cardiologica per il cane?", a: "La visita con ecocardiografia costa tra 100 e 250€. Include auscultazione, eco Doppler e referto. ECG e radiografie possono avere costi aggiuntivi di 30-80€ ciascuno." },
      { q: "Il mio cane può fare esercizio con una malattia cardiaca?", a: "Dipende dallo stadio. In fase iniziale (stadi A-B1), l'attività normale è raccomandata. Con insufficienza cardiaca (stadi C-D), l'esercizio va moderato e adattato alla tolleranza del cane. Il cardiologo darà indicazioni specifiche." },
    ],
    relatedServiceAnimals: ["checkup-cane", "emergenza-cane"],
    disclaimer: "Le informazioni hanno scopo orientativo. La gestione delle cardiopatie richiede monitoraggio veterinario regolare e terapia personalizzata.",
  },







  // ══════════════════════════════════════════════
  // OFTALMOLOGIA GATTO
  // ══════════════════════════════════════════════
  "oftalmologia-gatto": {
    slug: "oftalmologia-gatto",
    serviceSlug: "oftalmologia-veterinaria",
    animalId: "gatto",
    animalName: "Gatto",
    animalEmoji: "🐈",
    serviceName: "Oftalmologia",
    metaTitle: "Oftalmologia Gatto — Visita oculistica veterinaria per il gatto",
    metaDescription: "Guida all'oftalmologia felina: herpesvirus, ulcere corneali, uveite, glaucoma e sequestro corneale. Richiedi un consulto oculistico.",
    h1: "Oftalmologia veterinaria per il gatto",
    answerSummary: "Le malattie oculari nel gatto sono spesso legate all'herpesvirus felino (FHV-1), che causa congiuntiviti ricorrenti, ulcere corneali dendritiche e sequestro corneale. Altre patologie comuni sono uveite (spesso associata a FIP, FIV o FeLV), glaucoma e tumori intraoculari. La diagnosi precoce e la terapia adeguata sono fondamentali.",
    quickFacts: [
      { label: "Animale", value: "🐈 Gatto" },
      { label: "Servizio", value: "Oftalmologia felina" },
      { label: "Causa più comune", value: "Herpesvirus felino (FHV-1)" },
      { label: "Patologie", value: "Ulcere, uveite, sequestro, glaucoma" },
      { label: "Costo indicativo", value: "80–200 € (visita)" },
    ],
    intro: "L'oftalmologia felina è dominata dall'herpesvirus felino (FHV-1): la maggior parte dei gatti è infettata durante i primi mesi di vita e il virus rimane latente a vita, riattivandosi nei momenti di stress. Le recidive causano congiuntivite, cheratite, ulcere corneali dendritiche e, nel cronico, sequestro corneale (una placca scura sulla cornea tipica del gatto). L'uveite (infiammazione intraoculare) è un'altra patologia frequente, spesso associata a malattie sistemiche gravi come FIP, FIV o FeLV.",
    whatIncludes: [
      "Esame con lampada a fessura: valutazione dettagliata della cornea per ulcere, sequestro corneale, edema",
      "Test alla fluoresceina: evidenzia ulcere corneali (le ulcere dendritiche da herpesvirus hanno un pattern ramificato caratteristico)",
      "Test di Schirmer: produzione lacrimale (nel gatto la KCS è meno comune che nel cane)",
      "Tonometria: pressione intraoculare per glaucoma (nel gatto spesso secondario a uveite)",
      "Oftalmoscopia: esame del fondo per corioretinite, distacco retinico (ipertensione), tumori",
      "Valutazione della simmetria pupillare (anisocoria è frequente nella patologia oculare felina)",
      "Test per malattie sistemiche se sospetta uveite: FIV, FeLV, FIP, toxoplasmosi",
    ],
    whenToDo: [
      { title: "Occhio chiuso con lacrimazione", description: "Nel gatto è spesso una riattivazione di herpesvirus: congiuntivite, cheratite, ulcera corneale. Visita entro 24-48 ore. Non trattare da soli con colliri generici — le ulcere herpetiche richiedono terapia specifica." },
      { title: "Cambio di colore dell'iride", description: "Un'iride che cambia colore (diventa rossastra, scura o con macchie) può indicare uveite, melanosi iridea o melanoma dell'iride. Visita oculistica raccomandata." },
      { title: "Gattino con congiuntivite", description: "La congiuntivite neonatale (occhi incollati nel gattino prima dell'apertura palpebrale) è un'emergenza: gli occhi vanno aperti e trattati rapidamente per evitare danni permanenti." },
    ],
    warningSignsTitle: "Segnali di emergenza oculare nel gatto",
    warningSigns: [
      "Occhio gonfio, rosso e dolente (possibile glaucoma o uveite grave)",
      "Macchia scura sulla cornea (sequestro corneale — tipico del gatto, doloroso e progressivo)",
      "Perdita improvvisa della vista: pupille dilatate fisse (possibile distacco retinico da ipertensione)",
      "Anisocoria (pupille di dimensioni diverse) senza causa nota",
      "Sanguinamento intraoculare visibile (ifema)",
      "Proptosi (occhio fuori dall'orbita) dopo trauma — EMERGENZA ASSOLUTA",
    ],
    ageGuidance: [
      { stage: "Gattino (0-1 anno)", recommendation: "Congiuntivite da herpesvirus molto frequente. Oftalmia neonatale se gli occhi non si aprono entro 10-14 giorni. Molti gattini di strada hanno cicatrici corneali permanenti da infezioni non trattate." },
      { stage: "Adulto (1-10 anni)", recommendation: "Recidive herpetiche nei momenti di stress. Sequestro corneale (razze predisposte: Persiano, Himalayano, Birmano). Uveite da FIV/FeLV/FIP. Melanosi iridea da monitorare." },
      { stage: "Senior (10+ anni)", recommendation: "Ipertensione arteriosa → distacco retinico → cecità improvvisa (il gatto iperteso è spesso ipertiroideo). Melanoma dell'iride. Cataratta (meno comune che nel cane). Glaucoma secondario." },
    ],
    costRange: "80–200 €",
    faq: [
      { q: "L'herpesvirus oculare del gatto si cura definitivamente?", a: "No, il virus resta latente a vita e può riattivarsi. Si gestiscono le recidive con antivirali topici (cidofovir, idoxuridina) e orali (famciclovir). Ridurre lo stress è fondamentale per prevenire le riattivazioni." },
      { q: "Cos'è il sequestro corneale del gatto?", a: "È una placca scura (marrone-nera) sulla cornea, tipica del gatto e rara in altre specie. È causata da necrosi corneale, spesso conseguenza di herpesvirus cronico. È dolorosa e richiede spesso asportazione chirurgica (cheratectomia) + innesto." },
      { q: "Il gatto può diventare cieco improvvisamente?", a: "Sì. La causa più comune di cecità improvvisa nel gatto anziano è il distacco retinico da ipertensione arteriosa. Se diagnosticata rapidamente e la pressione viene controllata, la vista può recuperare parzialmente. Ogni gatto anziano dovrebbe avere la pressione controllata." },
      { q: "L'uveite nel gatto è grave?", a: "L'uveite è sempre seria perché spesso indica una malattia sistemica sottostante (FIP, FIV, FeLV, toxoplasmosi, linfoma). Oltre a trattare l'occhio, bisogna diagnosticare e trattare la causa." },
    ],
    relatedServiceAnimals: ["checkup-gatto", "emergenza-gatto"],
    disclaimer: "Le informazioni hanno scopo orientativo. Le emergenze oculari richiedono visita veterinaria immediata. Non applicare farmaci umani o colliri veterinari senza indicazione specifica.",
  },

  // ══════════════════════════════════════════════
  // EMERGENZA CAVALLO
  // ══════════════════════════════════════════════
  "emergenza-cavallo": {
    slug: "emergenza-cavallo",
    serviceSlug: "veterinario-emergenza",
    animalId: "cavallo",
    animalName: "Cavallo",
    animalEmoji: "🐴",
    serviceName: "Emergenza",
    metaTitle: "Emergenza Cavallo — Pronto soccorso veterinario equino",
    metaDescription: "Guida alle emergenze veterinarie del cavallo: colica, laminite, ferite, coliche chirurgiche e primo soccorso equino. Richiedi intervento urgente.",
    h1: "Emergenza veterinaria per il cavallo",
    answerSummary: "Le emergenze più frequenti nel cavallo sono la colica (dolore addominale — la principale causa di morte nel cavallo adulto), la laminite, le ferite traumatiche e le miopatie da sforzo. Il cavallo è un animale di grossa taglia con un tratto gastrointestinale lungo e fragile. Le emergenze equine richiedono intervento rapido e competenze specialistiche.",
    quickFacts: [
      { label: "Animale", value: "🐴 Cavallo" },
      { label: "Servizio", value: "Emergenza equina" },
      { label: "Emergenza più comune", value: "Colica" },
      { label: "Mortalità colica", value: "5-10% (medica), >50% (chirurgica)" },
      { label: "Specialista", value: "Veterinario equino" },
    ],
    intro: "La colica è la condizione di emergenza più comune e temuta nel cavallo. Il termine 'colica' indica genericamente dolore addominale, ma le cause sono numerose: spasmo intestinale, impaction (occlusione da materiale fecale), spostamento o torsione dell'intestino, strozzamento. Alcune coliche si risolvono con terapia medica (fluidoterapia, spasmolitici, analgesia), altre richiedono chirurgia d'urgenza (laparotomia esplorativa). Riconoscere precocemente i segni e contattare il veterinario equino è spesso la differenza tra la vita e la morte.",
    whatIncludes: [
      "Triage telefonico: il veterinario guida il proprietario nella valutazione iniziale (frequenza cardiaca, mucose, suoni intestinali, comportamento)",
      "Visita d'urgenza in scuderia: parametri vitali, esplorazione rettale, sondaggio naso-gastrico",
      "Analgesia: gestione del dolore con FANS (flunixin meglumine) e/o butorfanolo",
      "Fluidoterapia endovenosa o con sondaggio naso-gastrico per reidratazione e risoluzione dell'impaction",
      "Decisione medica vs chirurgica: i criteri per il referral chirurgico sono cruciali e tempo-dipendenti",
      "Gestione delle ferite: lavaggio, sutura, valutazione del coinvolgimento di strutture sinoviali",
      "Gestione della laminite acuta: ghiaccio, analgesia, supporto podale, rimozione della causa",
    ],
    whenToDo: [
      { title: "Colica — dolore addominale", description: "Il cavallo si guarda i fianchi, scalcia l'addome, si rotola, si sdraia e rialza ripetutamente, suda. Chiamare SUBITO il veterinario. Camminare il cavallo (passeggiata tranquilla) in attesa dell'arrivo del veterinario, non farlo rotolare." },
      { title: "Laminite acuta", description: "Calore e polso digitale aumentato agli zoccoli, il cavallo è riluttante a camminare o assume la postura laminitic (posteriori sotto, anteriori avanti). EMERGENZA: applicare ghiaccio agli zoccoli fino all'arrivo del veterinario." },
      { title: "Ferita profonda all'arto", description: "Qualsiasi ferita nella zona di articolazioni e tendini degli arti va trattata come potenziale emergenza: il coinvolgimento di strutture sinoviali (guaine tendinee, articolazioni) è potenzialmente catastrofico." },
    ],
    warningSignsTitle: "Segnali di emergenza nel cavallo — CHIAMARE SUBITO IL VETERINARIO",
    warningSigns: [
      "Colica: il cavallo si rotola, scalcia l'addome, guarda i fianchi, suda, si sdraia ripetutamente",
      "Frequenza cardiaca >60 bpm a riposo (normale: 28-44 bpm) — indica dolore intenso o shock",
      "Mucose rosso scuro, grigie o cianotiche (indicano shock cardiovascolare)",
      "Assenza completa di suoni intestinali (borborigmi) — segno di ileo paralitico",
      "Laminite: zoppia su tutti e 4 gli arti, postura tipica, polso digitale forte",
      "Ferita con liquido sinoviale (liquido chiaro e viscoso come albume) — emergenza articolare",
      "Emorragia profusa non controllabile con pressione diretta",
      "Incapacità di alzarsi (decubito prolungato nel cavallo causa danni muscolari rapidamente)",
    ],
    ageGuidance: [
      { stage: "Puledro (0-1 anno)", recommendation: "Coliche da meconio (prime feci) nel neonato. Diarrea neonatale. Rottura di vescica. Mancato trasferimento di immunità passiva (IgG basse). Ernie ombelicali. Polmonite da Rhodococcus equi." },
      { stage: "Adulto (1-15 anni)", recommendation: "Colica da impaction, spostamento, torsione. Laminite. Ferite traumatiche (calci, recinzioni). Miopatia da sforzo (rabdomiolisi). Coliche post-parto nella fattrice." },
      { stage: "Senior (15+ anni)", recommendation: "Coliche da lipoma peduncolato (tipiche del cavallo anziano — richiedono chirurgia). Laminite da Cushing (PPID). Coliche da impaction più frequenti per ridotta motilità." },
    ],
    costRange: "150–500 €",
    faq: [
      { q: "Come riconosco una colica nel cavallo?", a: "Il cavallo mostra segni di dolore addominale: guarda i fianchi, scalcia la pancia, si sdraia e rialza, si rotola, suda, rifiuta il cibo. La gravità varia: alcuni camminano nervosamente, altri si rotolano violentemente. Chiamare sempre il veterinario." },
      { q: "La colica è sempre chirurgica?", a: "No, l'80-90% delle coliche si risolve con terapia medica (analgesia, fluidoterapia, sondaggio). La chirurgia è necessaria nel 10-20% dei casi: torsioni, strangolamenti, spostamenti che non si risolvono. La decisione tempestiva è cruciale." },
      { q: "Quanto tempo ho per agire in caso di colica?", a: "Dipende dalla causa. Una torsione intestinale può essere fatale in poche ore. Una colica da impaction dà più tempo ma va comunque trattata. Regola: chiamare sempre il veterinario ai primi segni e non aspettare." },
      { q: "La laminite si può curare?", a: "La laminite acuta è un'emergenza. Se trattata precocemente (ghiaccio, analgesia, rimozione della causa), molti casi hanno buon esito. La laminite cronica con rotazione/affondamento della terza falange richiede gestione a lungo termine con il maniscalco e il veterinario." },
    ],
    relatedServiceAnimals: ["checkup-cavallo"],
    disclaimer: "Le informazioni hanno scopo orientativo. Le emergenze equine richiedono intervento veterinario immediato. In caso di colica, contattare il veterinario PRIMA di somministrare qualsiasi farmaco.",
  },

  // ══════════════════════════════════════════════
  // VACCINAZIONI FURETTO
  // ══════════════════════════════════════════════
  "vaccinazioni-furetto": {
    slug: "vaccinazioni-furetto",
    serviceSlug: "vaccinazioni",
    animalId: "furetto",
    animalName: "Furetto",
    animalEmoji: "🦡",
    serviceName: "Vaccinazioni",
    metaTitle: "Vaccinazioni Furetto — Piano vaccinale per il furetto domestico",
    metaDescription: "Guida alle vaccinazioni del furetto: cimurro, rabbia, calendario vaccinale, rischio di reazione e protocollo. Richiedi un appuntamento.",
    h1: "Vaccinazioni per il furetto domestico",
    answerSummary: "Il furetto deve essere vaccinato contro il cimurro (malattia mortale nel 100% dei casi nel furetto non vaccinato) e la rabbia (obbligatoria per legge in alcune situazioni). Il protocollo prevede vaccinazioni a 8, 11 e 14 settimane con richiamo annuale. Attenzione alle reazioni anafilattiche post-vaccinali, più frequenti nel furetto che in cane e gatto.",
    quickFacts: [
      { label: "Animale", value: "🦡 Furetto" },
      { label: "Servizio", value: "Vaccinazioni" },
      { label: "Vaccino essenziale", value: "Cimurro (mortalità 100%)" },
      { label: "Richiamo", value: "Annuale" },
      { label: "Costo indicativo", value: "40–70 €/vaccino" },
    ],
    intro: "La vaccinazione è fondamentale per il furetto domestico. Il cimurro canino (CDV) è letale nel 100% dei casi nel furetto non vaccinato — non esiste terapia efficace una volta contratta la malattia. La rabbia è l'altro vaccino raccomandato (e obbligatorio in alcune regioni e per l'espatrio). Il furetto ha una peculiarità importante: il rischio di reazione anafilattica post-vaccinale è più alto rispetto a cane e gatto, per cui il veterinario tiene in osservazione il furetto per almeno 30 minuti dopo la vaccinazione.",
    whatIncludes: [
      "Visita clinica completa prima della vaccinazione (si vaccina solo un furetto sano)",
      "Vaccinazione contro il cimurro canino (CDV) con vaccino specifico per furetto o vaccino vivo attenuato canino approvato",
      "Vaccinazione antirabbica (obbligatoria per espatrio e raccomandata)",
      "Osservazione post-vaccinale di 30-60 minuti per monitorare eventuali reazioni anafilattiche",
      "Rilascio del libretto sanitario/passaporto con registrazione dei vaccini",
      "Programmazione del calendario vaccinale e dei richiami",
    ],
    whenToDo: [
      { title: "Primo ciclo vaccinale (cucciolo)", description: "Prima dose a 8 settimane, seconda a 11 settimane, terza a 14 settimane. Il cucciolo non è protetto fino al completamento del ciclo: evitare il contatto con altri animali non vaccinati." },
      { title: "Richiamo annuale", description: "Il richiamo annuale è raccomandato per mantenere la protezione. Il cimurro è una malattia ancora presente nell'ambiente e il furetto non vaccinato è a rischio letale." },
      { title: "Prima dell'espatrio", description: "Per viaggiare all'estero con il furetto serve il passaporto europeo con vaccinazione antirabbica valida (almeno 21 giorni prima della partenza). In alcuni Paesi è richiesta la titolazione anticorpale." },
    ],
    warningSignsTitle: "Segnali di reazione vaccinale nel furetto",
    warningSigns: [
      "Vomito entro 30 minuti dalla vaccinazione (possibile reazione anafilattica)",
      "Diarrea, ipersalivazione, letargia improvvisa post-vaccinazione",
      "Gonfiore del muso, orticaria, difficoltà respiratoria (anafilassi — EMERGENZA)",
      "Febbre >39.5°C nelle 24-48 ore successive (reazione vaccinale comune ma da monitorare)",
    ],
    ageGuidance: [
      { stage: "Cucciolo (6-16 settimane)", recommendation: "Ciclo vaccinale completo: 3 dosi di cimurro a 8, 11, 14 settimane. Rabbia a 12-16 settimane. Osservazione post-vaccinale obbligatoria di 30-60 minuti." },
      { stage: "Adulto (1-4 anni)", recommendation: "Richiamo annuale cimurro e rabbia. Il furetto adulto sano tollera bene le vaccinazioni. Pre-trattamento con antistaminico a discrezione del veterinario per ridurre il rischio di reazione." },
      { stage: "Senior (4+ anni)", recommendation: "Continuare i richiami annuali. Nel furetto anziano con patologie concomitanti (insulinoma, malattia surrenalica), il veterinario valuterà il rapporto rischio/beneficio della vaccinazione." },
    ],
    costRange: "40–70 €",
    faq: [
      { q: "Il cimurro è davvero mortale al 100% nel furetto?", a: "Sì, il cimurro canino (CDV) nel furetto non vaccinato ha una mortalità del 100%. Non esiste terapia efficace. La vaccinazione è l'unica protezione e va mantenuta con richiami annuali." },
      { q: "Perché il furetto deve restare in osservazione dopo il vaccino?", a: "Il furetto ha un rischio di anafilassi post-vaccinale superiore a cane e gatto. Le reazioni compaiono tipicamente entro 30 minuti. Il veterinario ha a disposizione adrenalina e farmaci per gestire l'eventuale emergenza." },
      { q: "Posso usare il vaccino del cane per il furetto?", a: "Solo vaccini specifici o approvati per il furetto. Non tutti i vaccini canini sono sicuri per il furetto. Il veterinario esperto in esotici sa quali prodotti utilizzare." },
      { q: "Il furetto indoor deve essere vaccinato?", a: "Sì. Il cimurro può essere portato in casa dalle scarpe, dai vestiti o da altri animali. Anche il furetto che non esce deve essere vaccinato contro il cimurro." },
    ],
    relatedServiceAnimals: ["checkup-furetto", "sterilizzazione-furetto"],
    disclaimer: "Le informazioni hanno scopo orientativo. Il protocollo vaccinale va discusso con il veterinario esperto in esotici in base alla situazione specifica.",
  },

  // ══════════════════════════════════════════════
  // STERILIZZAZIONE FURETTO
  // ══════════════════════════════════════════════
  "sterilizzazione-furetto": {
    slug: "sterilizzazione-furetto",
    serviceSlug: "sterilizzazione-animali",
    animalId: "furetto",
    animalName: "Furetto",
    animalEmoji: "🦡",
    serviceName: "Sterilizzazione",
    metaTitle: "Sterilizzazione Furetto — Chirurgica vs impianto deslorelin nel furetto",
    metaDescription: "Guida alla sterilizzazione del furetto: chirurgica vs impianto di deslorelin, malattia surrenalica, rischi e raccomandazioni veterinarie.",
    h1: "Sterilizzazione del furetto: chirurgica vs impianto",
    answerSummary: "La sterilizzazione del furetto è essenziale, soprattutto nella femmina (il calore persistente causa aplasia midollare fatale). Oggi si preferisce l'impianto di deslorelin (GnRH agonista) alla sterilizzazione chirurgica, perché la chirurgia è associata a malattia surrenalica. L'impianto è reversibile, dura 1.5-4 anni e non ha gli effetti collaterali della gonadectomia.",
    quickFacts: [
      { label: "Animale", value: "🦡 Furetto" },
      { label: "Servizio", value: "Sterilizzazione" },
      { label: "Metodo preferito", value: "Impianto di deslorelin" },
      { label: "Durata impianto", value: "1.5-4 anni" },
      { label: "Costo indicativo", value: "80–150 €" },
    ],
    intro: "La sterilizzazione nel furetto è una necessità medica, non solo di gestione. La furetta in calore resta in estro persistente se non si accoppia: l'iperestrogenismo causa aplasia midollare (il midollo osseo smette di produrre cellule del sangue), condizione fatale senza trattamento. Tradizionalmente si eseguiva la gonadectomia chirurgica, ma oggi sappiamo che la rimozione delle gonadi nel furetto è il principale fattore predisponente alla malattia surrenalica (iperadrenocorticismo), una patologia molto diffusa nei furetti sterilizzati chirurgicamente. L'impianto di deslorelin (Suprelorin) è diventato il metodo di sterilizzazione preferito in Europa.",
    whatIncludes: [
      "Visita clinica completa e valutazione dello stato di salute",
      "Discussione delle opzioni: impianto di deslorelin vs chirurgia, pro e contro di ciascun metodo",
      "Impianto di deslorelin (Suprelorin 4.7mg o 9.4mg): procedura ambulatoriale rapida, impianto sottocutaneo",
      "Oppure gonadectomia chirurgica: ovarioisterectomia (femmina) o castrazione (maschio) in anestesia generale",
      "Monitoraggio post-procedura e programmazione del prossimo impianto (se deslorelin)",
      "Consulenza sulla malattia surrenalica e sulla prevenzione",
    ],
    whenToDo: [
      { title: "Furetta in calore", description: "URGENTE se la furetta è in calore da più di 2-4 settimane. L'estro persistente causa iperestrogenismo → aplasia midollare → anemia non rigenerativa → morte. L'impianto di deslorelin fa regredire il calore in 2-3 settimane." },
      { title: "Prevenzione (prima del primo calore)", description: "L'impianto di deslorelin può essere posizionato a partire dai 4-6 mesi per prevenire il calore nella femmina e il comportamento sessuale aggressivo nel maschio." },
      { title: "Furetto maschio con comportamento aggressivo", description: "Il maschio intero può diventare aggressivo, marcare il territorio con urina e avere un odore molto forte. L'impianto riduce questi comportamenti in poche settimane." },
    ],
    warningSignsTitle: "Segnali di calore pericoloso nella furetta",
    warningSigns: [
      "Vulva gonfia per più di 2-4 settimane senza regressione (estro persistente)",
      "Letargia, inappetenza, perdita di pelo nella furetta in calore (inizio aplasia midollare)",
      "Mucose pallide (anemia da iperestrogenismo) — EMERGENZA",
      "Petecchie (puntini rossi sulla pelle) o ecchimosi (lividi) — trombocitopenia da aplasia midollare",
      "Debolezza agli arti posteriori nella furetta in calore prolungato",
    ],
    ageGuidance: [
      { stage: "Giovane (4-12 mesi)", recommendation: "Primo impianto di deslorelin a 4-6 mesi, prima del primo calore nella femmina. Nel maschio: prima che sviluppi comportamento aggressivo e odore intenso. L'impianto è preferito alla chirurgia." },
      { stage: "Adulto (1-4 anni)", recommendation: "Sostituzione dell'impianto di deslorelin quando l'effetto termina (ritorno dei segni di calore nella femmina, aumento dell'odore/aggressività nel maschio). Tipicamente ogni 1.5-3 anni." },
      { stage: "Senior (4+ anni)", recommendation: "Continuare con gli impianti. Screening per malattia surrenalica (ecografia addominale) soprattutto se il furetto è stato sterilizzato chirurgicamente in passato. Se il furetto ha già malattia surrenalica, il deslorelin ha anche effetto terapeutico." },
    ],
    costRange: "80–150 €",
    faq: [
      { q: "Perché l'impianto è meglio della chirurgia nel furetto?", a: "La gonadectomia chirurgica rimuove le gonadi, eliminando il feedback ormonale sull'asse ipotalamo-ipofisi. Questo stimola cronicamente le ghiandole surrenali, causando malattia surrenalica nel 70%+ dei furetti sterilizzati chirurgicamente. L'impianto di deslorelin mantiene la soppressione ormonale senza rimuovere le gonadi." },
      { q: "L'impianto di deslorelin è doloroso?", a: "No, è una procedura ambulatoriale simile a un'iniezione sottocutanea (l'impianto è grande come un chicco di riso). Non richiede anestesia generale, solo eventuale sedazione leggera. Il furetto riprende immediatamente le attività normali." },
      { q: "Cosa succede se la furetta resta in calore troppo a lungo?", a: "L'estro persistente causa iperestrogenismo: gli estrogeni tossici inibiscono il midollo osseo, causando aplasia midollare con anemia, trombocitopenia e leucopenia. Senza trattamento, è fatale. È un'emergenza medica." },
      { q: "Il deslorelin ha effetti collaterali?", a: "Nelle prime 2-3 settimane può causare un iniziale aumento dei segni di calore (effetto flare-up), poi la soppressione è completa. Alcuni furetti possono ingrassare leggermente. Non sono noti effetti collaterali gravi." },
    ],
    relatedServiceAnimals: ["checkup-furetto", "vaccinazioni-furetto"],
    disclaimer: "Le informazioni hanno scopo orientativo. La scelta del metodo di sterilizzazione va discussa con il veterinario esperto in esotici in base alla situazione specifica del furetto.",
  },

  // ══════════════════════════════════════════════
  // DERMATOLOGIA CONIGLIO
  // ══════════════════════════════════════════════
  "dermatologia-coniglio": {
    slug: "dermatologia-coniglio",
    serviceSlug: "dermatologia-veterinaria",
    animalId: "coniglio",
    animalName: "Coniglio",
    animalEmoji: "🐇",
    serviceName: "Dermatologia",
    metaTitle: "Dermatologia Coniglio — Problemi cutanei e del pelo nel coniglio",
    metaDescription: "Guida alla dermatologia del coniglio: rogna, micosi, pododermatite, perdita di pelo, acari e trattamento. Richiedi un consulto dermatologico.",
    h1: "Dermatologia veterinaria per il coniglio",
    answerSummary: "I problemi dermatologici nel coniglio sono molto comuni: rogna auricolare (Psoroptes cuniculi), micosi (dermatofitosi), pododermatite (piaghe ai piedi), ascessi cutanei e perdita di pelo anomala. La diagnosi richiede raschiati cutanei, esame microscopico e coltura fungina. Il trattamento è spesso lungo e richiede un veterinario esperto in esotici.",
    quickFacts: [
      { label: "Animale", value: "🐇 Coniglio" },
      { label: "Servizio", value: "Dermatologia veterinaria" },
      { label: "Patologia frequente", value: "Rogna auricolare, micosi, pododermatite" },
      { label: "Zoonosi", value: "Sì (dermatofitosi trasmissibile all'uomo)" },
      { label: "Costo indicativo", value: "40–100 €" },
    ],
    intro: "La dermatologia del coniglio è una specialità che richiede conoscenze specifiche. La pelle del coniglio è molto sottile e delicata, e molte patologie cutanee sono legate a errori di gestione (substrato inadeguato, igiene insufficiente, dieta sbagliata). La rogna auricolare da Psoroptes cuniculi è tra le infestazioni più comuni, mentre la dermatofitosi (Trichophyton mentagrophytes) è una zoonosi trasmissibile all'uomo. La pododermatite (bumblefoot) è frequente nei conigli sovrappeso o tenuti su superfici dure.",
    whatIncludes: [
      "Esame clinico della cute e del mantello: distribuzione della perdita di pelo, lesioni, croste, arrossamento",
      "Esame delle orecchie: croste, cerume anomalo, prurito (rogna auricolare)",
      "Raschiato cutaneo per ricerca di acari (Psoroptes, Cheyletiella, Sarcoptes)",
      "Lampada di Wood ed esame microscopico dei peli per dermatofiti (funghi)",
      "Coltura fungina (dermatophyte test medium — DTM) per diagnosi definitiva di micosi",
      "Esame delle zampe: piaghe plantari, ispessimento della cute, infezione (pododermatite)",
      "Piano terapeutico: antiparassitari (ivermectina, selamectina), antifungini, antibiotici se necessario",
      "Consulenza sulla gestione ambientale: substrato, igiene, dieta (fattori predisponenti)",
    ],
    whenToDo: [
      { title: "Prurito intenso alle orecchie", description: "Il coniglio scuote la testa, si gratta le orecchie, le orecchie hanno croste marroni: probabile rogna auricolare (Psoroptes cuniculi). Visita necessaria per conferma e trattamento con ivermectina." },
      { title: "Perdita di pelo a chiazze", description: "Aree circolari senza pelo con possibile desquamazione: sospetta dermatofitosi (micosi). È una zoonosi: può trasmettersi all'uomo. Diagnosi con coltura fungina e trattamento con antifungini." },
      { title: "Piaghe ai piedi (pododermatite)", description: "Zone arrossate, senza pelo, con croste o ulcere sulla parte plantare delle zampe posteriori. Comune nei conigli sovrappeso, su pavimenti duri o lettiera inadeguata. Richiede trattamento e correzione ambientale." },
    ],
    warningSignsTitle: "Segnali di problema dermatologico nel coniglio",
    warningSigns: [
      "Perdita di pelo a chiazze con desquamazione (possibile micosi — zoonosi!)",
      "Croste spesse nelle orecchie con prurito intenso (rogna auricolare)",
      "Forfora abbondante sul dorso (possibile Cheyletiella — 'forfora che cammina')",
      "Piaghe sanguinanti ai piedi (pododermatite avanzata — rischio di osteomielite)",
      "Ascesso cutaneo (masse piene di pus denso e caseoso — nel coniglio gli ascessi sono diversi da quelli del cane/gatto)",
      "Prurito generalizzato con automutilazione",
    ],
    ageGuidance: [
      { stage: "Giovane (0-1 anno)", recommendation: "Dermatofitosi più frequente nei giovani conigli (sistema immunitario in sviluppo). Rogna possibile in conigli di allevamento o appena adottati. Visita dermatologica se perdita di pelo anomala." },
      { stage: "Adulto (1-5 anni)", recommendation: "Pododermatite nei soggetti sovrappeso o su superfici inadeguate. Ascessi cutanei (spesso da morsi se convive con altri conigli). Rogna auricolare." },
      { stage: "Senior (5+ anni)", recommendation: "Tumori cutanei più frequenti. Pododermatite cronica. Difficoltà nella cura del pelo (il coniglio anziano potrebbe non riuscire a fare cecotrofia, causando pelo imbrattato nella zona perianale)." },
    ],
    costRange: "40–100 €",
    faq: [
      { q: "La micosi del coniglio è contagiosa per l'uomo?", a: "Sì, la dermatofitosi (Trichophyton mentagrophytes) è una zoonosi. Nell'uomo causa lesioni circolari arrossate e pruriginose (tinea). Usare guanti per maneggiare il coniglio infetto e lavare bene le mani. Trattare il coniglio e disinfettare l'ambiente." },
      { q: "Come si cura la rogna auricolare?", a: "Con ivermectina (iniezione o topica) per 2-3 trattamenti a distanza di 14 giorni. NON rimuovere le croste dalle orecchie (sono dolorose e la rimozione causa sanguinamento). Le croste cadranno da sole con il trattamento." },
      { q: "Come prevengo la pododermatite?", a: "Substrato morbido (non griglie metalliche), peso nella norma, igiene della lettiera, movimento adeguato (il coniglio in gabbia piccola è più a rischio). Se già presente, trattamento topico + fasciature + correzione ambientale." },
      { q: "Perché il mio coniglio perde pelo?", a: "Le cause più comuni sono: muta fisiologica (stagionale), barbering (il coniglio o un compagno strappa il pelo), dermatofitosi, acari, carenze nutrizionali. Se la perdita è a chiazze, irregolare o con desquamazione, visita dermatologica necessaria." },
    ],
    relatedServiceAnimals: ["checkup-coniglio", "emergenza-coniglio", "nutrizione-coniglio"],
    disclaimer: "Le informazioni hanno scopo orientativo. La dermatofitosi è una zoonosi: in caso di sospetto, consultare anche il medico per i contatti umani.",
  },

  // ── PAGINE MANUALI AD ALTO VALORE: SPECIALISTICHE ──

  "oftalmologia-cane": {
    slug: "oftalmologia-cane",
    serviceSlug: "oftalmologia-veterinaria",
    animalId: "cane",
    animalName: "Cane",
    animalEmoji: "🐕",
    serviceName: "Oftalmologia",
    metaTitle: "Oftalmologia Cane — Malattie oculari, diagnosi e cura",
    metaDescription: "Guida completa all'oftalmologia veterinaria per il cane: cataratta, glaucoma, ulcere corneali, cherry eye, KCS. Sintomi, diagnosi e trattamenti.",
    h1: "Oftalmologia veterinaria per il cane",
    answerSummary: "L'oftalmologia veterinaria per il cane si occupa di diagnosticare e trattare tutte le patologie dell'occhio e degli annessi oculari. Il cane è particolarmente soggetto a malattie oculari ereditarie legate alla razza: cataratta nel Cocker Spaniel, glaucoma nel Beagle, entropion nel Shar Pei, cherry eye nel Bulldog. La diagnosi precoce è fondamentale perché molte patologie oculari, se trascurate, portano a cecità irreversibile.",
    quickFacts: [
      { label: "Animale", value: "🐕 Cane" },
      { label: "Servizio", value: "Visita oculistica specialistica" },
      { label: "Durata media", value: "30–60 minuti" },
      { label: "Strumenti principali", value: "Lampada a fessura, tonometro, oftalmoscopio" },
      { label: "Costo indicativo", value: "80–150 €" },
    ],
    intro: "Gli occhi del cane sono organi complessi e delicati. A differenza dell'uomo, il cane non può riferire un calo della vista o un fastidio oculare: spesso i sintomi vengono notati solo quando la patologia è già avanzata. Per questo le visite oculistiche periodiche, soprattutto nelle razze predisposte, sono un pilastro della medicina preventiva canina. Un oftalmologo veterinario dispone di strumentazione specializzata — lampada a fessura, tonometro, oftalmoscopio indiretto — che consente diagnosi impossibili con una visita di base.",
    whatIncludes: [
      "Esame biomicroscopico con lampada a fessura: valutazione di cornea, iride, cristallino e camera anteriore a forte ingrandimento",
      "Tonometria: misurazione della pressione intraoculare (IOP) per la diagnosi di glaucoma — il killer silenzioso della vista canina",
      "Test di Schirmer: misurazione della produzione lacrimale per diagnosticare la cheratocongiuntivite secca (KCS/occhio secco)",
      "Test alla fluoresceina: colorante che evidenzia ulcere e abrasioni corneali invisibili a occhio nudo",
      "Oftalmoscopia diretta e indiretta: esame del fondo oculare (retina, nervo ottico, vasi retinici)",
      "Gonioscopia: valutazione dell'angolo irido-corneale per lo screening del glaucoma nelle razze predisposte",
      "Ecografia oculare: quando i mezzi diottrici sono opachi (cataratta matura) per valutare lo stato della retina",
      "ERG (elettroretinogramma): test della funzionalità retinica, obbligatorio prima di un intervento di cataratta",
    ],
    whenToDo: [
      {
        title: "Razze predisposte a patologie oculari",
        description: "Cocker Spaniel (cataratta, glaucoma), Bulldog e Cane Corso (cherry eye, entropion), Shar Pei (entropion grave), Barboncino (atrofia retinica progressiva), Siberian Husky (cataratta giovanile), Beagle (glaucoma). Per queste razze è consigliato uno screening oculistico annuale fin dal primo anno.",
      },
      {
        title: "Occhio rosso, gonfio o dolorante",
        description: "L'arrossamento persistente, il gonfiore palpebrale, lo strabismo (blefarospasmo) e la fotofobia indicano dolore oculare e richiedono una visita urgente. Il glaucoma acuto è un'emergenza: senza trattamento entro 24-48 ore si perde la vista.",
      },
      {
        title: "Opacità del cristallino o calo della vista",
        description: "Se noti un riflesso bluastro o bianco nella pupilla del cane, potrebbe trattarsi di sclerosi nucleare (fisiologica nell'anziano) o cataratta (patologica). Solo l'oftalmologo può distinguerle. La cataratta è operabile con ottimi risultati se diagnosticata in tempo.",
      },
      {
        title: "Lacrimazione eccessiva o assente",
        description: "Lacrimazione abbondante e costante (epifora) può indicare ostruzione dei dotti naso-lacrimali, ciglia ectopiche o entropion. La mancanza di lacrime causa la KCS, molto comune in razze come Cavalier King, West Highland e Bulldog.",
      },
    ],
    warningSignsTitle: "Segnali oculari nel cane che richiedono una visita urgente",
    warningSigns: [
      "Occhio rosso intenso con dolore evidente (il cane si gratta, tiene l'occhio chiuso)",
      "Opacità improvvisa della cornea (aspetto 'velato' o bluastro)",
      "Pupilla dilatata e fissa, non reattiva alla luce (possibile glaucoma acuto)",
      "Massa o rigonfiamento sulla terza palpebra (cherry eye o neoplasia)",
      "Secrezione oculare muco-purulenta persistente",
      "Perdita improvvisa della vista (il cane sbatte contro oggetti, è disorientato)",
      "Protrusione del bulbo oculare (proptosi — emergenza nei brachicefali)",
      "Macchia bianca o gialla sulla cornea che si allarga (ulcera corneale in progressione)",
    ],
    ageGuidance: [
      {
        stage: "Cucciolo (0-12 mesi)",
        recommendation: "Primo screening oculistico a 8-12 settimane, soprattutto nelle razze predisposte. Si valutano difetti congeniti: atresia dei punti lacrimali, microptalmo, displasia retinica, persistent pupillary membranes (PPM). Il cherry eye compare tipicamente tra i 3 e i 9 mesi.",
      },
      {
        stage: "Adulto (1-7 anni)",
        recommendation: "Controllo oculistico annuale per razze a rischio. Per le altre razze, visita in caso di sintomi. Screening per PRA (atrofia retinica progressiva) nei riproduttori. Trattamento tempestivo di ulcere corneali e KCS.",
      },
      {
        stage: "Senior (7+ anni)",
        recommendation: "Controllo semestrale. Monitoraggio della cataratta senile e del glaucoma cronico. Valutazione della sclerosi nucleare (fisiologica vs cataratta). Screening per tumori palpebrali e melanoma uveale, più frequenti nell'anziano.",
      },
    ],
    costRange: "80–150 €",
    faq: [
      { q: "Come si opera la cataratta nel cane?", a: "L'intervento si chiama facoemulsificazione: il cristallino opaco viene frantumato con ultrasuoni e aspirato, poi si impianta una lente artificiale intraoculare (IOL). L'intervento dura circa 30-45 minuti per occhio, richiede anestesia generale e ha un tasso di successo dell'85-95%. È fondamentale un ERG pre-operatorio per verificare che la retina funzioni." },
      { q: "Il glaucoma nel cane si può curare?", a: "Il glaucoma primario nel cane è una malattia cronica che si gestisce ma non si guarisce. Il trattamento medico (colliri ipotensivi) rallenta la progressione; in casi avanzati si ricorre a chirurgia laser (ciclofotocoagulazione) o impianti drenanti. La diagnosi precoce è essenziale: una volta persa, la vista non si recupera." },
      { q: "Cos'è il cherry eye e come si cura?", a: "Il cherry eye è il prolasso della ghiandola della terza palpebra, che appare come una massa rossa-rosata nell'angolo interno dell'occhio. La cura è chirurgica: la ghiandola va riposizionata (tecnica a tasca di Morgan), MAI rimossa, perché produce circa il 40% delle lacrime. L'asportazione causa KCS cronica." },
      { q: "La KCS (occhio secco) è curabile?", a: "La KCS si gestisce con terapia cronica a base di ciclosporina o tacrolimus in collirio, che stimolano la produzione lacrimale. Nella maggior parte dei casi la terapia è a vita. Se non trattata, causa ulcere corneali ricorrenti, pigmentazione e cecità. La risposta al trattamento è generalmente buona se iniziato precocemente." },
      { q: "Quanto costa una visita oculistica per il cane?", a: "La visita oculistica specialistica costa indicativamente 80-150 € e include tutti i test di base (Schirmer, fluoresceina, tonometria, biomicroscopia). Esami aggiuntivi come ecografia oculare o ERG hanno costi supplementari. L'intervento di cataratta costa 1.500-3.000 € per occhio." },
    ],
    relatedServiceAnimals: ["checkup-cane", "neurologia-cane", "ecografia-cane", "emergenza-cane"],
    disclaimer: "Le informazioni hanno scopo orientativo e non sostituiscono la visita di un oftalmologo veterinario. Molte patologie oculari richiedono diagnosi e trattamento tempestivo per preservare la vista.",
  },

  "neurologia-gatto": {
    slug: "neurologia-gatto",
    serviceSlug: "neurologia-veterinaria",
    animalId: "gatto",
    animalName: "Gatto",
    animalEmoji: "🐱",
    serviceName: "Neurologia",
    metaTitle: "Neurologia Gatto — Epilessia, paralisi e malattie neurologiche",
    metaDescription: "Guida completa alla neurologia veterinaria per il gatto: epilessia, vestibolare, paralisi, FIP neurologica. Sintomi, diagnosi (RMN, TAC) e terapie.",
    h1: "Neurologia veterinaria per il gatto",
    answerSummary: "La neurologia veterinaria per il gatto si occupa delle malattie del sistema nervoso centrale e periferico: cervello, midollo spinale, nervi e muscoli. Nel gatto le patologie neurologiche più frequenti sono l'epilessia, la sindrome vestibolare, la FIP nella forma neurologica, le ernie discali e i tumori cerebrali (meningioma). La diagnosi si basa su esame neurologico, RMN e analisi del liquor cefalorachidiano.",
    quickFacts: [
      { label: "Animale", value: "🐱 Gatto" },
      { label: "Servizio", value: "Visita neurologica specialistica" },
      { label: "Durata media", value: "30–60 minuti" },
      { label: "Diagnostica avanzata", value: "RMN, TAC, analisi liquor" },
      { label: "Costo indicativo", value: "80–150 €" },
    ],
    intro: "Il sistema nervoso del gatto è particolarmente vulnerabile a patologie infettive (FIP, toxoplasmosi), metaboliche (encefalopatia epatica) e neoplastiche (meningioma — il tumore cerebrale più comune nel gatto anziano). A differenza del cane, il gatto tende a mascherare i sintomi neurologici fino a fasi avanzate: un proprietario attento può cogliere segnali precoci come lievi cambiamenti di comportamento, iperestesia cutanea o una lieve inclinazione della testa. La visita neurologica specialistica include test dei riflessi, valutazione della propriocezione, del tono muscolare e dei nervi cranici.",
    whatIncludes: [
      "Esame neurologico completo: valutazione dello stato mentale, postura, andatura e coordinazione",
      "Test dei riflessi spinali: riflesso patellare, flessorio, perineale — per localizzare la lesione nel midollo spinale",
      "Valutazione dei nervi cranici: risposta pupillare, riflesso palpebrale, simmetria facciale, deglutizione",
      "Test propriocettivi: reazione posturale, placing tattile e visivo — rilevano deficit anche lievi",
      "RMN (risonanza magnetica): gold standard per l'imaging del cervello e del midollo spinale, senza radiazioni",
      "TAC (tomografia computerizzata): utile per lesioni ossee, fratture vertebrali e alcune patologie cerebrali",
      "Analisi del liquor cefalorachidiano (CSF): prelievo e analisi del liquido che bagna il sistema nervoso, fondamentale per diagnosticare meningiti, FIP e linfomi",
      "Elettromiografia (EMG): valutazione dell'attività elettrica dei muscoli e dei nervi periferici",
    ],
    whenToDo: [
      {
        title: "Convulsioni o episodi epilettici",
        description: "Le convulsioni nel gatto sono meno comuni che nel cane ma spesso indicano patologie gravi: FIP, tumori cerebrali, intossicazioni, encefalopatia epatica. A differenza del cane, l'epilessia idiopatica nel gatto è rara — quasi sempre c'è una causa sottostante da indagare con RMN e analisi del liquor.",
      },
      {
        title: "Testa inclinata e perdita di equilibrio",
        description: "La sindrome vestibolare causa inclinazione della testa, nistagmo (movimenti oculari rapidi), atassia e tendenza a cadere da un lato. Può essere periferica (otite media/interna — prognosi buona) o centrale (tumore, FIP — prognosi più riservata). La distinzione richiede l'esame neurologico.",
      },
      {
        title: "Paralisi o debolezza degli arti",
        description: "La paraparesi (debolezza posteriore) o paraplegia (paralisi) nel gatto può essere causata da tromboembolismo aortico (emergenza cardiologica), ernia discale, trauma spinale o mielopatia. Il tromboembolismo aortico è tipico dei gatti con cardiomiopatia e si presenta con arti posteriori freddi e doloranti.",
      },
      {
        title: "Cambiamenti di comportamento inspiegabili",
        description: "Aggressività improvvisa, disorientamento, circling (camminare in cerchio), pressione della testa contro il muro (head pressing) o vocalizzazioni anomale possono indicare patologie cerebrali: tumori (meningioma nel gatto anziano), encefaliti, encefalopatia epatica.",
      },
    ],
    warningSignsTitle: "Segnali neurologici nel gatto che richiedono una visita urgente",
    warningSigns: [
      "Convulsioni: il gatto cade su un lato, pedala, saliva, perde coscienza — NON mettere le mani in bocca",
      "Paralisi improvvisa degli arti posteriori con arti freddi e doloranti (tromboembolismo aortico — emergenza)",
      "Head pressing: il gatto preme la testa contro il muro o superfici dure senza motivo apparente",
      "Inclinazione della testa persistente con perdita di equilibrio (sindrome vestibolare)",
      "Circling: il gatto cammina ossessivamente in cerchio, sempre dallo stesso lato",
      "Cecità improvvisa con pupille dilatate e fisse (possibile ipertensione, distacco retinico)",
      "Iperestesia: reazioni esagerate al tatto, spasmi cutanei, episodi di agitazione violenta",
      "Andatura rigida, passi corti e scoordinati (atassia cerebellare o spinale)",
    ],
    ageGuidance: [
      {
        stage: "Gattino (0-12 mesi)",
        recommendation: "Le patologie neurologiche congenite includono ipoplasia cerebellare (da Parvovirus in utero), idrocefalo e malformazioni spinali. La FIP secca colpisce frequentemente gattini di 3-18 mesi con sintomi neurologici. Trauma cranico e spinale da cadute.",
      },
      {
        stage: "Adulto (1-10 anni)",
        recommendation: "Epilessia (indagare sempre la causa), traumi, intossicazioni (permetrina, giglio, glicole etilenico), FIP. In caso di convulsioni di nuova insorgenza, sempre consigliata RMN + analisi liquor.",
      },
      {
        stage: "Senior (10+ anni)",
        recommendation: "Meningioma cerebrale (il tumore più comune — spesso operabile con buona prognosi), encefalopatia epatica da insufficienza epatica cronica, ipertensione arteriosa con conseguenze neurologiche. Controlli neurologici consigliati ogni 6 mesi.",
      },
    ],
    costRange: "80–150 €",
    faq: [
      { q: "L'epilessia nel gatto si può curare?", a: "L'epilessia sintomatica (da causa identificabile) si cura trattando la causa. L'epilessia idiopatica (rara nel gatto) si controlla con farmaci anticonvulsivanti: fenobarbital o levetiracetam (Keppra). Il fenobarbital richiede monitoraggio epatico e dei livelli ematici. Molti gatti raggiungono un buon controllo delle crisi." },
      { q: "Quanto costa una RMN per il gatto?", a: "La RMN cerebrale o spinale costa indicativamente 500-1.000 € e richiede anestesia generale (il gatto deve restare immobile per 30-60 minuti). Il costo include anestesia e referto del radiologo. È l'esame gold standard per cervello e midollo: la TAC è un'alternativa meno costosa ma con minor risoluzione per i tessuti molli." },
      { q: "Il meningioma nel gatto è operabile?", a: "Sì, il meningioma è il tumore cerebrale più comune e più favorevole nel gatto. A differenza del cane, nel gatto è spesso ben delimitato e asportabile chirurgicamente. La sopravvivenza mediana dopo chirurgia è di 2-3 anni, con buona qualità di vita. Senza trattamento la prognosi è di poche settimane-mesi." },
      { q: "Cos'è il tromboembolismo aortico nel gatto?", a: "È un'emergenza in cui un coagulo, originato dal cuore (cardiomiopatia), si blocca nella biforcazione aortica interrompendo il flusso sanguigno agli arti posteriori. Si presenta con paralisi improvvisa, arti freddi, dolore intenso e assenza di polso femorale. La prognosi è riservata ma non sempre fatale: dipende dalla gravità e dalla cardiopatia sottostante." },
      { q: "La FIP neurologica si può trattare?", a: "Sì, i nuovi antivirali (GS-441524 e analoghi) hanno rivoluzionato il trattamento della FIP, anche nella forma neurologica. Il trattamento dura 84 giorni e il tasso di remissione è del 80-90%. I farmaci attraversano la barriera ematoencefalica ma a dosi più alte. La diagnosi si basa su analisi del liquor, RMN e PCR." },
    ],
    relatedServiceAnimals: ["checkup-gatto", "oftalmologia-gatto", "oncologia-gatto", "emergenza-gatto"],
    disclaimer: "Le informazioni hanno scopo orientativo. Le patologie neurologiche richiedono diagnosi e trattamento specialistico tempestivo. In caso di convulsioni, paralisi improvvisa o trauma cranico, contattare immediatamente un pronto soccorso veterinario.",
  },

  "oncologia-cane": {
    slug: "oncologia-cane",
    serviceSlug: "oncologia-veterinaria",
    animalId: "cane",
    animalName: "Cane",
    animalEmoji: "🐕",
    serviceName: "Oncologia",
    metaTitle: "Oncologia Cane — Tumori, diagnosi e trattamenti",
    metaDescription: "Guida all'oncologia veterinaria per il cane: linfoma, mastocitoma, osteosarcoma, emangiosarcoma. Diagnosi, chemioterapia, chirurgia e prognosi.",
    h1: "Oncologia veterinaria per il cane",
    answerSummary: "L'oncologia veterinaria per il cane si occupa della diagnosi e del trattamento dei tumori. Il cancro è la prima causa di morte nei cani sopra i 10 anni. I tumori più comuni sono il linfoma, il mastocitoma cutaneo, l'emangiosarcoma splenico e l'osteosarcoma. La diagnosi si basa su citologia, biopsia, ecografia e diagnostica per immagini avanzata (TAC). La chemioterapia nel cane è generalmente ben tollerata con effetti collaterali minimi.",
    quickFacts: [
      { label: "Animale", value: "🐕 Cane" },
      { label: "Servizio", value: "Consulenza oncologica veterinaria" },
      { label: "Durata prima visita", value: "45–90 minuti" },
      { label: "Diagnostica", value: "Citologia, biopsia, ecografia, TAC" },
      { label: "Costo indicativo", value: "100–200 €" },
    ],
    intro: "Il cancro colpisce circa 1 cane su 4 nel corso della vita e il rischio aumenta con l'età. Alcune razze sono particolarmente predisposte: Golden Retriever e Boxer (linfoma), Bernese e Rottweiler (osteosarcoma e istiocitosi), Labrador e Pastore Tedesco (emangiosarcoma). La diagnosi precoce è fondamentale: molti tumori canini, se individuati in fase iniziale, sono curabili o controllabili per anni. L'oncologo veterinario propone un piano terapeutico personalizzato che bilancia efficacia e qualità di vita.",
    whatIncludes: [
      "Esame clinico oncologico: palpazione sistematica dei linfonodi, della cute e dell'addome",
      "Agoaspirato (citologia): prelievo con ago sottile di cellule da masse o linfonodi sospetti — rapido e poco invasivo",
      "Biopsia incisionale o escissionale: prelievo di tessuto per l'esame istologico — fornisce diagnosi definitiva e grading",
      "Staging: valutazione dell'estensione della malattia con ecografia addominale, radiografie toraciche e/o TAC total body",
      "Esami ematochimici completi: emocromo, biochimico, profilo coagulativo per valutare l'idoneità alla terapia",
      "Chemioterapia: protocolli specifici per tipo tumorale (CHOP per linfoma, vinblastina per mastocitoma, carboplatino per osteosarcoma)",
      "Chirurgia oncologica: resezione con margini adeguati, amputazione (osteosarcoma), splenectomia (emangiosarcoma)",
      "Terapia palliativa e gestione del dolore: antidolorifici, radioterapia palliativa, supporto nutrizionale",
    ],
    whenToDo: [
      {
        title: "Massa o nodulo cutaneo nuovo o in crescita",
        description: "Qualsiasi nodulo nuovo nel cane merita un agoaspirato. I mastocitomi cutanei — il tumore cutaneo più comune nel cane — possono sembrare innocui ma essere aggressivi. La regola è: se cresce, cambia aspetto o persiste per più di 2 settimane, va aspirato.",
      },
      {
        title: "Linfonodi ingrossati",
        description: "L'ingrossamento non dolente dei linfonodi superficiali (sottomandibolari, prescapolari, poplitei) è il segno più comune del linfoma, il tumore più frequente nel cane. La diagnosi è spesso possibile con un semplice agoaspirato.",
      },
      {
        title: "Zoppia persistente in cane di taglia grande",
        description: "Nei cani di taglia grande e gigante (Alano, Rottweiler, Pastore Tedesco), una zoppia che non migliora con il riposo può indicare osteosarcoma. La radiografia mostra tipicamente lisi ossea. La diagnosi precoce consente di pianificare il trattamento (amputazione + chemioterapia).",
      },
      {
        title: "Debolezza improvvisa con addome disteso",
        description: "La rottura di un emangiosarcoma splenico causa emorragia addominale acuta: il cane diventa improvvisamente debole, le mucose impallidiscono, l'addome si distende. È un'emergenza chirurgica. L'ecografia addominale periodica nei cani anziani può individuare masse spleniche prima della rottura.",
      },
    ],
    warningSignsTitle: "Segnali nel cane che possono indicare un tumore",
    warningSigns: [
      "Massa cutanea che cresce rapidamente o cambia aspetto",
      "Linfonodi ingrossati, duri e non dolenti (visibili sotto la mandibola, davanti alle spalle, dietro le ginocchia)",
      "Perdita di peso progressiva nonostante appetito conservato",
      "Zoppia persistente non responsiva agli antinfiammatori (soprattutto in razze grandi)",
      "Sanguinamento anomalo: epistassi, sangue nelle urine o nelle feci senza causa evidente",
      "Debolezza improvvisa con mucose pallide (possibile emorragia interna)",
      "Difficoltà respiratorie progressive senza causa cardiaca o polmonare evidente",
      "Ulcere orali o masse gengivali che non guariscono (melanoma orale)",
    ],
    ageGuidance: [
      {
        stage: "Giovane (0-3 anni)",
        recommendation: "I tumori sono rari ma possibili: linfoma giovanile, istiocitoma cutaneo benigno (regredisce spontaneamente), tumori ossei. L'istiocitoma è il 'nodulo del cucciolo' — appare improvvisamente sulla testa o sugli arti e scompare in 2-3 mesi.",
      },
      {
        stage: "Adulto (3-7 anni)",
        recommendation: "Iniziare la palpazione sistematica dei noduli cutanei e dei linfonodi. Nelle razze predisposte, ecografia addominale annuale dai 5 anni. Il mastocitoma può comparire a qualsiasi età.",
      },
      {
        stage: "Senior (7+ anni)",
        recommendation: "Controllo oncologico semestrale. Screening ecografico per masse spleniche ed epatiche. Monitoraggio dei noduli cutanei (mappatura). Il 50% dei cani sopra i 10 anni svilupperà un tumore: la diagnosi precoce migliora drasticamente la prognosi.",
      },
    ],
    costRange: "100–200 €",
    faq: [
      { q: "La chemioterapia nel cane fa soffrire?", a: "No, la chemioterapia veterinaria è molto meglio tollerata rispetto a quella umana. I dosaggi sono calibrati per mantenere una buona qualità di vita: meno del 5% dei cani presenta effetti collaterali gravi. I più comuni sono nausea transitoria e inappetenza per 1-2 giorni. Il pelo non cade (tranne in razze a crescita continua come Barboncino e Bichon)." },
      { q: "Il linfoma nel cane si può curare?", a: "Il linfoma multicentrico si tratta con protocollo CHOP (4-5 farmaci in combinazione). La remissione completa si ottiene nell'80-90% dei casi. La sopravvivenza mediana con chemioterapia è di 12-14 mesi; senza trattamento, 4-6 settimane. Alcuni cani vivono 2-3 anni. La 'cura' definitiva è rara, ma la qualità di vita durante il trattamento è generalmente ottima." },
      { q: "Quanto costa la chemioterapia per il cane?", a: "Il costo dipende dal protocollo e dalla taglia del cane. Un protocollo CHOP per linfoma costa indicativamente 2.000-4.000 € per il ciclo completo (6 mesi). Singole sedute di chemioterapia variano da 100 a 300 €. Molte strutture offrono piani di pagamento rateizzato." },
      { q: "Il mio cane ha un nodulo: devo preoccuparmi?", a: "Non tutti i noduli sono tumori maligni, ma tutti meritano un controllo. L'agoaspirato è un esame rapido (5 minuti), poco invasivo e poco costoso (30-60 €) che nella maggior parte dei casi fornisce una diagnosi. Lipomi (benigni) sono molto comuni, ma è impossibile distinguerli dai tumori maligni senza esame citologico." },
    ],
    relatedServiceAnimals: ["checkup-cane", "ecografia-cane", "tac-cane", "chirurgia-cane"],
    disclaimer: "Le informazioni hanno scopo orientativo. L'oncologia veterinaria richiede competenze specialistiche: affidarsi sempre a un oncologo veterinario per diagnosi, staging e piano terapeutico personalizzato.",
  },

  "cardiologia-gatto": {
    slug: "cardiologia-gatto",
    serviceSlug: "cardiologia-veterinaria",
    animalId: "gatto",
    animalName: "Gatto",
    animalEmoji: "🐱",
    serviceName: "Cardiologia",
    metaTitle: "Cardiologia Gatto — Cardiomiopatia, soffio e malattie cardiache",
    metaDescription: "Guida alla cardiologia veterinaria per il gatto: cardiomiopatia ipertrofica (HCM), tromboembolismo, soffio cardiaco. Diagnosi, ecocardiografia e terapie.",
    h1: "Cardiologia veterinaria per il gatto",
    answerSummary: "La cardiologia veterinaria per il gatto si occupa della diagnosi e del trattamento delle malattie cardiache. La cardiomiopatia ipertrofica (HCM) è la cardiopatia più comune nel gatto, colpendo fino al 15% della popolazione felina. È spesso asintomatica fino a complicazioni gravi: insufficienza cardiaca congestizia, tromboembolismo aortico o morte improvvisa. L'ecocardiografia è l'unico esame che consente la diagnosi.",
    quickFacts: [
      { label: "Animale", value: "🐱 Gatto" },
      { label: "Servizio", value: "Visita cardiologica specialistica" },
      { label: "Durata media", value: "30–60 minuti" },
      { label: "Esame chiave", value: "Ecocardiografia Doppler" },
      { label: "Costo indicativo", value: "100–200 €" },
    ],
    intro: "Il cuore del gatto è un organo piccolo ma efficientissimo — e particolarmente vulnerabile alla cardiomiopatia ipertrofica (HCM), una malattia in cui le pareti del ventricolo sinistro si ispessiscono progressivamente. La HCM è insidiosa: il gatto può apparire perfettamente sano per anni mentre il cuore si deteriora silenziosamente. Le razze più colpite sono Maine Coon, Ragdoll, British Shorthair, Sphynx e Persiano, ma anche i gatti comuni europei sono a rischio. Lo screening ecocardiografico è l'unico modo per una diagnosi precoce.",
    whatIncludes: [
      "Auscultazione cardiaca: identificazione di soffi, aritmie e ritmo di galoppo (S3/S4 — segno di insufficienza cardiaca nel gatto)",
      "Ecocardiografia Doppler: misurazione dello spessore delle pareti cardiache, dimensioni delle camere, funzione sistolica e diastolica",
      "Elettrocardiogramma (ECG): rilevamento di aritmie (blocchi, tachicardie ventricolari, fibrillazione atriale)",
      "Radiografia toracica: valutazione della silhouette cardiaca e dei polmoni per edema polmonare o versamento pleurico",
      "Misurazione della pressione arteriosa: l'ipertensione nel gatto anziano causa ispessimento cardiaco secondario",
      "Test genetico per HCM: disponibile per Maine Coon (mutazione MyBPC3-A31P) e Ragdoll (MyBPC3-R820W)",
      "Dosaggio NT-proBNP e troponina cardiaca: biomarker ematici che supportano la diagnosi di cardiopatia",
      "Monitoraggio Holter: registrazione ECG 24 ore per aritmie intermittenti",
    ],
    whenToDo: [
      {
        title: "Razze predisposte a HCM",
        description: "Maine Coon, Ragdoll, British Shorthair, Sphynx, Persiano, Scottish Fold, Bengal e Norwegian Forest Cat. Per queste razze è raccomandato un ecocardiogramma a 1 anno di età, poi annualmente. I riproduttori devono essere testati prima di ogni accoppiamento.",
      },
      {
        title: "Soffio cardiaco rilevato alla visita di routine",
        description: "Nel gatto il soffio cardiaco non è sempre patologico: i soffi 'dinamici' (da stress o anemia) sono frequenti. Ma ogni soffio nuovo merita un ecocardiogramma per escludere HCM, specialmente se il gatto ha più di 5 anni o è di razza predisposta.",
      },
      {
        title: "Difficoltà respiratorie",
        description: "La respirazione a bocca aperta nel gatto è SEMPRE patologica (a differenza del cane). La tachipnea a riposo (>40 respiri/minuto) e la dispnea indicano possibile edema polmonare o versamento pleurico da insufficienza cardiaca. È un'emergenza.",
      },
      {
        title: "Prima dell'anestesia generale",
        description: "L'anestesia in un gatto con HCM non diagnosticata può essere fatale. Un ecocardiogramma pre-anestesia è consigliato per gatti di razza predisposta, gatti con soffio cardiaco e gatti sopra i 7 anni prima di interventi chirurgici.",
      },
    ],
    warningSignsTitle: "Segnali cardiaci nel gatto che richiedono una visita urgente",
    warningSigns: [
      "Respirazione a bocca aperta a riposo (SEMPRE patologica nel gatto)",
      "Tachipnea a riposo: più di 40 respiri al minuto mentre dorme o è rilassato",
      "Paralisi improvvisa degli arti posteriori con arti freddi e doloranti (tromboembolismo aortico)",
      "Letargia improvvisa, il gatto si nasconde e non mangia",
      "Svenimento (sincope) durante il gioco o lo sforzo",
      "Distensione addominale con difficoltà respiratoria (possibile versamento pericardico o pleurico)",
      "Vocalizzazioni di dolore intense e improvvise (associabili a tromboembolismo)",
    ],
    ageGuidance: [
      {
        stage: "Gattino (0-12 mesi)",
        recommendation: "Primo screening ecocardiografico a 12 mesi nelle razze predisposte. Rilevamento di cardiopatie congenite (rare): difetto del setto interventricolare, displasia della valvola mitrale. Molti gattini con HCM genetica hanno ecocardiogrammi normali a questa età.",
      },
      {
        stage: "Adulto (1-8 anni)",
        recommendation: "Ecocardiogramma annuale per razze a rischio. Per gatti comuni, ecocardiogramma in caso di soffio cardiaco, prima di anestesia o in presenza di sintomi. La HCM può comparire a qualsiasi età ma il picco di diagnosi è tra 4 e 7 anni.",
      },
      {
        stage: "Senior (8+ anni)",
        recommendation: "Screening cardiologico annuale con ecocardiogramma + misurazione della pressione arteriosa (l'ipertensione è frequente). Monitoraggio della funzionalità tiroidea (l'ipertiroidismo causa ispessimento cardiaco reversibile). NT-proBNP come screening nei check-up di routine.",
      },
    ],
    costRange: "100–200 €",
    faq: [
      { q: "La HCM nel gatto si può curare?", a: "La HCM non si cura ma si gestisce. Nelle forme lievi-moderate asintomatiche spesso non serve terapia, solo monitoraggio. Nelle forme avanzate si usano atenololo (beta-bloccante), clopidogrel (antitrombotico per prevenire il tromboembolismo) e furosemide (in caso di insufficienza cardiaca). Molti gatti vivono anni con una buona qualità di vita." },
      { q: "Quanto costa un ecocardiogramma per il gatto?", a: "L'ecocardiografia Doppler costa indicativamente 100-200 € e include la visita cardiologica. Non richiede anestesia né sedazione nella maggior parte dei gatti. L'esame dura 20-30 minuti. È l'unico esame affidabile per diagnosticare la HCM." },
      { q: "Il test genetico per HCM è affidabile?", a: "Il test genetico è disponibile per Maine Coon e Ragdoll (mutazioni MyBPC3). Un test positivo indica predisposizione, non certezza di malattia. Un test negativo non esclude la HCM (esistono altre mutazioni non ancora identificate). Il test genetico è utile per la selezione dei riproduttori ma l'ecocardiogramma resta l'esame diagnostico di riferimento." },
      { q: "Il mio gatto ha un soffio: è grave?", a: "Non necessariamente. Nel gatto i soffi 'innocenti' o dinamici (da stress, anemia, ipertiroidismo) sono frequenti. Ma un soffio può anche essere il primo segno di HCM. L'unico modo per distinguere è l'ecocardiogramma. Regola pratica: soffio nel gatto giovane di razza predisposta → ecocardiogramma. Soffio nel gatto anziano → ecocardiogramma + esami tiroidei." },
    ],
    relatedServiceAnimals: ["checkup-gatto", "ecografia-gatto", "neurologia-gatto", "emergenza-gatto"],
    disclaimer: "Le informazioni hanno scopo orientativo. Le cardiopatie feline richiedono diagnosi e monitoraggio da parte di un cardiologo veterinario. Il tromboembolismo aortico è un'emergenza: in caso di paralisi improvvisa degli arti, recarsi immediatamente al pronto soccorso.",
  },

  "dermatologia-cane": {
    slug: "dermatologia-cane",
    serviceSlug: "dermatologia-veterinaria",
    animalId: "cane",
    animalName: "Cane",
    animalEmoji: "🐕",
    serviceName: "Dermatologia",
    metaTitle: "Dermatologia Cane — Allergie, dermatiti e malattie della pelle",
    metaDescription: "Guida alla dermatologia veterinaria per il cane: dermatite atopica, allergie alimentari, piodermite, otiti. Diagnosi, test allergici e terapie.",
    h1: "Dermatologia veterinaria per il cane",
    answerSummary: "La dermatologia veterinaria per il cane si occupa delle malattie della pelle, del mantello e delle orecchie. Le patologie cutanee sono il motivo più frequente di visita veterinaria nel cane. La dermatite atopica (allergia ambientale) colpisce fino al 15% dei cani, seguita da allergie alimentari, piodermiti, otiti e dermatiti da parassiti. La diagnosi richiede un approccio sistematico: raschiati cutanei, citologie, colture, dieta ad esclusione e test intradermici.",
    quickFacts: [
      { label: "Animale", value: "🐕 Cane" },
      { label: "Servizio", value: "Visita dermatologica specialistica" },
      { label: "Durata prima visita", value: "45–90 minuti" },
      { label: "Esami principali", value: "Citologia, raschiato, coltura, biopsia" },
      { label: "Costo indicativo", value: "80–150 €" },
    ],
    intro: "La pelle è l'organo più grande del cane e il primo a manifestare squilibri interni ed esterni. Le malattie dermatologiche canine sono spesso croniche e multifattoriali: la dermatite atopica, ad esempio, coinvolge predisposizione genetica, barriera cutanea difettosa, risposta immunitaria anomala e infezioni secondarie. Un dermatologo veterinario affronta il problema alla radice, evitando il circolo vizioso di cortisone-miglioramento-recidiva che frustra proprietari e veterinari generalisti.",
    whatIncludes: [
      "Esame dermatologico completo: mappatura delle lesioni, distribuzione del prurito, valutazione di pelo, unghie e cuscinetti",
      "Citologia cutanea e auricolare: raccolta di cellule con nastro adesivo o tampone per identificare batteri, lieviti (Malassezia) e cellule infiammatorie",
      "Raschiato cutaneo: superficiale (Sarcoptes, Cheyletiella) e profondo (Demodex) per la ricerca di acari",
      "Tricogramma: esame microscopico del pelo per valutare fase di crescita, difetti strutturali e spore fungine",
      "Coltura dermatofitica: esame per la diagnosi di micosi (Microsporum canis, Trichophyton)",
      "Test intradermico (gold standard per allergie ambientali): iniezione di allergeni nella pelle per identificare la causa della dermatite atopica",
      "Dieta ad esclusione: protocollo di 8-12 settimane con proteina e carboidrato novel per diagnosticare allergie alimentari",
      "Biopsia cutanea: prelievo di tessuto per esame istologico in caso di lesioni atipiche o non responsive",
    ],
    whenToDo: [
      {
        title: "Prurito cronico o ricorrente",
        description: "Se il cane si gratta, si lecca le zampe, strofina il muso o ha otiti ricorrenti da più di 6 settimane, è probabile una dermatite atopica o un'allergia alimentare. Il prurito stagionale (primavera-autunno) suggerisce allergia ambientale; il prurito costante tutto l'anno suggerisce allergia alimentare o entrambe.",
      },
      {
        title: "Perdita di pelo a chiazze",
        description: "L'alopecia focale o multifocale può indicare demodicosi (cuccioli e immunodepressi), micosi (dermatofitosi — zoonosi!), piodermite profonda o malattie autoimmuni (pemfigo, lupus). Il raschiato cutaneo e la citologia sono i primi esami da eseguire.",
      },
      {
        title: "Otiti ricorrenti (più di 3 episodi/anno)",
        description: "Le otiti croniche nel cane non sono una malattia a sé: sono quasi sempre il sintomo di una patologia sottostante — dermatite atopica (80% dei casi), allergia alimentare o disturbi endocrini. Trattare solo l'otite senza indagare la causa porta a recidive continue.",
      },
      {
        title: "Razze con predisposizione dermatologica",
        description: "Bulldog Francese e Inglese, Shar Pei, West Highland White Terrier, Labrador, Golden Retriever, Pastore Tedesco sono razze ad alto rischio dermatologico. Un primo screening dermatologico al comparire dei primi sintomi (di solito tra 6 mesi e 3 anni) evita anni di terapie inappropriate.",
      },
    ],
    warningSignsTitle: "Segnali dermatologici nel cane che richiedono attenzione",
    warningSigns: [
      "Prurito intenso che impedisce al cane di dormire o alimentarsi",
      "Lesioni cutanee ulcerate, crostose o essudative che si espandono rapidamente",
      "Perdita di pelo simmetrica bilaterale (possibile patologia endocrina: ipotiroidismo, Cushing)",
      "Noduli cutanei multipli che crescono o si ulcerano",
      "Otite con secrezione purulenta, dolore e gonfiore del canale auricolare",
      "Zampe costantemente arrossate e umide (pododermatite da allergia o da Malassezia)",
      "Croste nasali e depigmentazione (possibile lupus o pemfigo — malattie autoimmuni)",
    ],
    ageGuidance: [
      {
        stage: "Cucciolo (0-12 mesi)",
        recommendation: "Demodicosi giovanile localizzata (comune, spesso autolimitante), micosi, piodermiti superficiali. Il prurito prima dei 6 mesi è raramente allergico. La demodicosi generalizzata giovanile richiede trattamento e ha implicazioni genetiche (non usare per la riproduzione).",
      },
      {
        stage: "Giovane adulto (1-3 anni)",
        recommendation: "Età tipica di esordio della dermatite atopica. Primo episodio di otite, prurito alle zampe e al muso, congiuntivite. Iniziare l'iter diagnostico allergologico prima possibile per impostare l'immunoterapia (desensibilizzazione) che è più efficace se iniziata precocemente.",
      },
      {
        stage: "Adulto/Senior (3+ anni)",
        recommendation: "Gestione a lungo termine di atopia e allergie. Monitoraggio delle infezioni secondarie. Screening per patologie endocrine che causano alopecia (ipotiroidismo, iperadrenocorticismo). Valutazione di noduli cutanei per escludere tumori (mastocitoma, istiocitoma, adenomi).",
      },
    ],
    costRange: "80–150 €",
    faq: [
      { q: "Come si diagnostica l'allergia alimentare nel cane?", a: "L'unico metodo affidabile è la dieta ad esclusione (dieta privativa) per 8-12 settimane con una singola proteina e un singolo carboidrato mai mangiati prima (es. cervo e patate, o cibo idrolizzato). I test del sangue per allergie alimentari NON sono affidabili e non sono raccomandati dalla comunità dermatologica veterinaria." },
      { q: "L'immunoterapia (desensibilizzazione) funziona nel cane?", a: "Sì, l'immunoterapia allergen-specifica (basata su test intradermico) ha un tasso di successo del 60-80% nel controllare la dermatite atopica. Funziona 'rieducando' il sistema immunitario a tollerare gli allergeni. La risposta richiede 6-12 mesi e il trattamento è a lungo termine. È l'unica terapia che agisce sulla causa e non solo sui sintomi." },
      { q: "Il cortisone è dannoso per il cane?", a: "Il cortisone (prednisone) è un farmaco eccellente per il controllo rapido del prurito ma l'uso cronico causa effetti collaterali: aumento di sete e fame, predisposizione a infezioni, assottigliamento cutaneo, calcinosi cutis e iperadrenocorticismo iatrogeno. Le alternative moderne (oclacitinib/Apoquel, lokivetmab/Cytopoint) sono più sicure per l'uso a lungo termine." },
      { q: "Quanto costa il trattamento della dermatite atopica?", a: "La prima visita dermatologica costa 80-150 €. I test intradermici circa 200-300 €. L'immunoterapia costa circa 200-400 €/anno. L'Apoquel costa circa 2-3 €/giorno (variabile con il peso), il Cytopoint circa 50-100 €/iniezione ogni 4-8 settimane. Il costo totale dipende dalla gravità e dalla strategia terapeutica scelta." },
    ],
    relatedServiceAnimals: ["checkup-cane", "test-allergie-cane", "nutrizione-cane", "oftalmologia-cane"],
    disclaimer: "Le informazioni hanno scopo orientativo. Le malattie dermatologiche croniche richiedono un approccio diagnostico sistematico. Non somministrare farmaci senza prescrizione veterinaria.",
  },

  // ══════════════════════════════════════════════
  // ECOGRAFIA CANE (premium manual)
  // ══════════════════════════════════════════════
  "ecografia-cane": {
    slug: "ecografia-cane",
    serviceSlug: "ecografia-veterinaria",
    animalId: "cane",
    animalName: "Cane",
    animalEmoji: "🐕",
    serviceName: "Ecografia",
    metaTitle: "Ecografia Cane — Ecografia addominale e cardiaca veterinaria",
    metaDescription: "Guida completa all'ecografia veterinaria per il cane: ecografia addominale, ecocardiografia, diagnosi di gravidanza, costi, preparazione e quando farla.",
    h1: "Ecografia veterinaria per il cane",
    answerSummary: "L'ecografia veterinaria per il cane è un esame diagnostico non invasivo e indolore che utilizza gli ultrasuoni per visualizzare in tempo reale gli organi interni. L'ecografia addominale valuta fegato, milza, reni, vescica, prostata/utero e intestino; l'ecocardiografia studia il cuore. È uno degli esami più richiesti nella diagnostica veterinaria moderna e non richiede anestesia nella maggior parte dei casi.",
    quickFacts: [
      { label: "Animale", value: "🐕 Cane" },
      { label: "Tipologie", value: "Addominale, cardiaca, oculare, muscoloscheletrica" },
      { label: "Durata", value: "15–40 minuti" },
      { label: "Anestesia", value: "Non necessaria (di norma)" },
      { label: "Preparazione", value: "Digiuno 8-12h per l'addominale" },
      { label: "Costo indicativo", value: "80–180 €" },
    ],
    intro: "L'ecografia è diventata uno strumento diagnostico irrinunciabile nella medicina veterinaria canina. A differenza della radiografia, che fornisce immagini statiche bidimensionali, l'ecografia permette di osservare gli organi in tempo reale, valutandone struttura, dimensioni, vascolarizzazione e motilità. È particolarmente utile per la diagnosi di patologie addominali (epatiche, renali, spleniche, urinarie), per la valutazione cardiaca (ecocardiografia Doppler), per la diagnosi e il monitoraggio della gravidanza e come guida per prelievi ecoguidati (agoaspirati e biopsie). L'esame è sicuro, ripetibile, privo di radiazioni ionizzanti e generalmente ben tollerato dal cane senza necessità di sedazione.",
    whatIncludes: [
      "Ecografia addominale completa: fegato (dimensioni, ecogenicità, noduli, vie biliari), milza (splenomegalia, noduli — importanti per escludere emangiosarcoma), reni (dimensioni, ecogenicità, calcoli, cisti), vescica (calcoli, masse, spessore della parete), intestino (spessore parietale, motilità, linfonodi mesenterici)",
      "Valutazione di prostata (nel maschio intero: iperplasia, cisti, ascessi, tumori) o utero (nella femmina: piometra, gravidanza, tumori)",
      "Ecocardiografia Doppler: misurazione delle camere cardiache, spessore parietale, funzione valvolare, flussi sanguigni. Fondamentale per diagnosi di valvulopatia mitralica (MMVD), cardiomiopatia dilatativa (DCM) e stenosi",
      "Ecografia oculare: valutazione delle strutture intraoculari quando i mezzi diottrici sono opachi (cataratta matura, emorragia) — esclude distacco retinico pre-chirurgico",
      "Ecografia muscoloscheletrica: tendini, legamenti e masse dei tessuti molli — utile per lesioni tendinee e biopsie ecoguidate",
      "FAST (Focused Assessment with Sonography for Trauma): protocollo rapido per identificare versamento addominale o toracico in emergenza — salva-vita nel paziente traumatizzato",
      "Prelievi ecoguidati: agoaspirato (FNA) di masse, linfonodi, organi; cistocentesi (prelievo di urina sterile dalla vescica); toracocentesi e addominocentesi guidate",
    ],
    whenToDo: [
      {
        title: "Sospetta patologia addominale",
        description: "Vomito cronico, diarrea persistente, perdita di peso, aumento della sete/minzione, dolore addominale, ittero. L'ecografia visualizza in tempo reale fegato, reni, milza, intestino e linfonodi addominali per identificare masse, infiammazioni, ostruzioni o alterazioni strutturali.",
      },
      {
        title: "Massa addominale o splenica",
        description: "Il cane (soprattutto Golden Retriever e Pastore Tedesco sopra gli 8 anni) è predisposto all'emangiosarcoma splenico, un tumore aggressivo. L'ecografia è il primo esame per valutare masse spleniche: dimensioni, vascolarizzazione e presenza di versamento addominale libero (emoaddome).",
      },
      {
        title: "Diagnosi e monitoraggio di gravidanza",
        description: "L'ecografia conferma la gravidanza già a 25 giorni dall'accoppiamento, verifica la vitalità fetale (battito cardiaco) e monitora lo sviluppo. Non è affidabile per contare i feti (per il conteggio si usa la radiografia dopo il 45° giorno).",
      },
      {
        title: "Screening cardiaco per razze predisposte",
        description: "L'ecocardiografia è raccomandata annualmente per Cavalier King Charles (MMVD), Dobermann (DCM), Boxer (ARVC), Irish Wolfhound (DCM e fibrillazione atriale) e altre razze predisposte. Diagnosi precoce = terapia tempestiva e prognosi migliore.",
      },
      {
        title: "Sospetta piometra nella femmina",
        description: "Femmina non sterilizzata con febbre, aumento della sete, perdite vaginali o addome disteso 4-8 settimane dopo il calore: l'ecografia è l'esame d'elezione per diagnosticare la piometra (utero pieno di pus), un'emergenza chirurgica.",
      },
    ],
    warningSignsTitle: "Quando l'ecografia è urgente nel cane",
    warningSigns: [
      "Addome disteso e dolente con mucose pallide (possibile emoaddome da rottura di massa splenica — emergenza)",
      "Collasso improvviso con mucose bianche (emorragia interna — FAST ecografico immediato)",
      "Difficoltà a urinare nel maschio con addome teso (ostruzione uretrale, calcoli vescicali)",
      "Vomito incoercibile con sospetto corpo estraneo intestinale (osso, giocattolo, calzino)",
      "Femmina intera con febbre alta e perdite vaginali post-calore (piometra)",
      "Ittero (gengive e sclere gialle) — l'ecografia distingue tra cause epatiche e post-epatiche",
      "Versamento addominale (ascite): l'ecografia guida la centesi diagnostica e valuta la causa",
    ],
    ageGuidance: [
      {
        stage: "Cucciolo (0-12 mesi)",
        recommendation: "Ecografia indicata in caso di vomito/diarrea persistenti (corpi estranei sono comuni nei cuccioli), addome disteso, malformazioni congenite sospette (shunt portosistemico nel Yorkshire, Maltese, Schnauzer nano) o prima di chirurgia complessa.",
      },
      {
        stage: "Adulto (1-7 anni)",
        recommendation: "Ecografia su indicazione clinica. Ecocardiografia annuale per razze cardiopredisposte. Diagnosi e monitoraggio di gravidanza. Ecografia addominale in caso di sintomi gastrointestinali, urinari o perdita di peso inspiegabile.",
      },
      {
        stage: "Senior (7+ anni)",
        recommendation: "Ecografia addominale annuale consigliata come screening: masse spleniche ed epatiche, reni (nefropatia cronica), prostata (nel maschio intero), surreni. L'emangiosarcoma splenico ha il picco di incidenza tra 8 e 12 anni — la diagnosi precoce può essere salva-vita.",
      },
    ],
    costRange: "80–180 €",
    faq: [
      { q: "Il cane deve essere sedato per l'ecografia?", a: "Nella grande maggioranza dei casi no. Il cane viene posizionato su un fianco o sulla schiena su un materassino e la zona viene rasata (per permettere il contatto della sonda). La maggior parte dei cani tollera bene l'esame, che è completamente indolore. La sedazione può essere necessaria solo in cani molto ansiosi, aggressivi o doloranti." },
      { q: "Quanto costa un'ecografia addominale per il cane?", a: "L'ecografia addominale completa costa indicativamente tra 80 e 150 €. L'ecocardiografia (ecografia cardiaca) costa 100-180 €. Prelievi ecoguidati (agoaspirati) hanno un costo aggiuntivo di 30-80 €. I prezzi variano in base alla struttura e alla zona." },
      { q: "Come preparare il cane per l'ecografia?", a: "Per l'ecografia addominale: digiuno di 8-12 ore (lo stomaco pieno crea artefatti). Vescica piena (non farlo urinare prima dell'esame). Il pelo dell'addome verrà rasato. Per l'ecocardiografia non è necessario il digiuno ma anche qui il pelo del torace viene rasato." },
      { q: "L'ecografia può sostituire la radiografia?", a: "Sono esami complementari, non sostitutivi. L'ecografia eccelle nella visualizzazione dei tessuti molli e dei fluidi; la radiografia è superiore per le strutture ossee e per visualizzare la distribuzione di gas nell'intestino (occlusioni). Spesso si eseguono entrambi per una diagnosi completa." },
      { q: "L'ecografia rileva tutti i tumori?", a: "L'ecografia può identificare masse e alterazioni strutturali degli organi, ma non tutti i tumori sono visibili ecograficamente. Tumori infiltrativi (senza massa evidente) possono sfuggire. L'ecografia identifica la massa ma la diagnosi istologica richiede sempre un prelievo (agoaspirato o biopsia ecoguidata)." },
    ],
    relatedServiceAnimals: ["checkup-cane", "tac-cane", "radiografia-cane", "cardiologia-cane", "oncologia-cane"],
    disclaimer: "Le informazioni hanno scopo orientativo. L'interpretazione dell'ecografia richiede competenza specialistica. Affidarsi a strutture dotate di ecografo veterinario di qualità e a operatori con formazione specifica in diagnostica per immagini.",
  },
};
