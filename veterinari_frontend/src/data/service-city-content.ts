// ── Rich parametric content for CityServicePage (Phase 3) ──
// Each service gets preparation tips, cost range, duration, and a prose template.
// Use {city}, {province}, {service} as placeholders in prose.

export interface ServiceCityEnrichment {
  /** Introductory paragraph with placeholders */
  prose: string;
  /** How to prepare for this service */
  preparation: string[];
  /** Indicative cost range */
  costRange: string;
  /** Typical duration */
  duration: string;
  /** Additional local context paragraph */
  localContext: string;
}

const defaultEnrichment: ServiceCityEnrichment = {
  prose: "Se stai cercando {service} a {city}, è importante affidarsi a professionisti qualificati che conoscano il territorio e le esigenze degli animali nella zona di {province}. Il nostro servizio gratuito ti permette di confrontare le strutture disponibili e scegliere quella più adatta alle tue necessità, risparmiando tempo e garantendo la migliore assistenza per il tuo animale.",
  preparation: [
    "Porta con te il libretto sanitario aggiornato del tuo animale",
    "Annota eventuali sintomi, cambiamenti di comportamento o allergie note",
    "Se possibile, tieni l'animale a digiuno nelle 6-8 ore precedenti (chiedi conferma al veterinario)",
    "Prepara un trasportino adeguato per il tragitto",
  ],
  costRange: "Variabile in base alla struttura e alla complessità",
  duration: "30-60 minuti",
  localContext: "Le strutture veterinarie a {city} e nei comuni limitrofi della provincia di {province} offrono standard qualitativi elevati. Ti consigliamo di verificare la disponibilità e prenotare in anticipo, specialmente nei periodi di maggiore affluenza come l'estate e le festività.",
};

export const serviceCityContent: Record<string, Partial<ServiceCityEnrichment>> = {
  "visita-veterinaria": {
    prose: "La visita veterinaria a {city} rappresenta il primo e più importante passo per la salute del tuo animale domestico. I veterinari della zona di {province} effettuano controlli completi che includono l'esame fisico, la valutazione del peso, il controllo di cuore e polmoni, e una consulenza personalizzata su vaccinazioni e alimentazione. Che si tratti di un cucciolo appena adottato o di un animale anziano che necessita di monitoraggio costante, trovare il professionista giusto vicino a {city} fa la differenza.",
    preparation: [
      "Porta il libretto sanitario con le vaccinazioni aggiornate",
      "Annota i sintomi osservati negli ultimi giorni (appetito, energia, comportamento)",
      "Prepara una lista di domande per il veterinario",
      "Utilizza un trasportino sicuro per gatti e animali di piccola taglia",
      "Per i cani, porta guinzaglio e museruola se necessario",
    ],
    costRange: "30–80 €",
    duration: "20-40 minuti",
    localContext: "A {city} e nei comuni vicini della provincia di {province}, le visite veterinarie di routine sono disponibili su appuntamento presso ambulatori e cliniche. Molte strutture offrono anche pacchetti di check-up annuali che includono esami del sangue e controllo parassitario, particolarmente utili nel clima mediterraneo della regione.",
  },

  "pronto-soccorso-veterinario": {
    prose: "Il pronto soccorso veterinario a {city} è un servizio essenziale per le emergenze che richiedono intervento immediato. Avvelenamenti, traumi, difficoltà respiratorie e colpi di calore sono tra le situazioni più frequenti nella zona di {province}. Conoscere in anticipo quale struttura offre pronto soccorso h24 vicino a {city} può fare la differenza tra la vita e la morte del tuo animale.",
    preparation: [
      "Salva in anticipo il numero di telefono del pronto soccorso veterinario più vicino",
      "Non somministrare farmaci umani all'animale senza indicazione veterinaria",
      "Mantieni la calma e immobilizza l'animale se necessario durante il trasporto",
      "Porta con te il libretto sanitario se riesci a recuperarlo rapidamente",
      "Annota l'ora di inizio dei sintomi e qualsiasi sostanza ingerita",
    ],
    costRange: "80–250 € (visita urgente + interventi base)",
    duration: "Variabile in base alla gravità",
    localContext: "Nel territorio di {city} e in provincia di {province}, i servizi di pronto soccorso veterinario sono attivi h24 presso le cliniche attrezzate. Durante i mesi estivi, le emergenze più comuni includono colpi di calore e morsi di vipera, mentre in inverno si registrano maggiori casi di intossicazione da sostanze tossiche domestiche.",
  },

  "vaccinazioni": {
    prose: "Le vaccinazioni veterinarie a {city} sono fondamentali per proteggere il tuo animale da malattie potenzialmente letali come il cimurro, la parvovirosi, la leptospirosi e la rabbia. I protocolli vaccinali seguiti nella zona di {province} tengono conto delle patologie endemiche locali, come la leishmaniosi trasmessa dai flebotomi, particolarmente diffusa nelle aree mediterranee. Un piano vaccinale personalizzato è il modo migliore per garantire una copertura completa.",
    preparation: [
      "L'animale deve essere in buona salute il giorno della vaccinazione",
      "Porta il libretto sanitario per registrare la somministrazione",
      "Comunica al veterinario eventuali reazioni avverse a vaccinazioni precedenti",
      "Dopo la vaccinazione, monitora l'animale per 24-48 ore",
    ],
    costRange: "25–60 € per singola dose; pacchetti annuali 80–150 €",
    duration: "15-30 minuti",
    localContext: "A {city} e nei comuni limitrofi, i veterinari raccomandano particolarmente la vaccinazione contro la leishmaniosi, data la presenza endemica del parassita nel territorio di {province}. Le campagne vaccinali primaverili sono il momento ideale per aggiornare il piano vaccinale del tuo animale.",
  },

  "sterilizzazione-animali": {
    prose: "La sterilizzazione a {city} è un intervento chirurgico sicuro e routinario che offre numerosi benefici per la salute del tuo animale e contribuisce al controllo del randagismo nella zona di {province}. L'intervento riduce significativamente il rischio di tumori mammari nelle femmine e di patologie prostatiche nei maschi, oltre a eliminare comportamenti indesiderati legati agli ormoni sessuali.",
    preparation: [
      "L'animale deve essere a digiuno dalla sera precedente (almeno 8-12 ore)",
      "Non somministrare acqua nelle 4 ore precedenti l'intervento",
      "Assicurati che l'animale sia sverminato e vaccinato",
      "Prepara uno spazio tranquillo e caldo per la convalescenza a casa",
      "Procurati un collare elisabettiano per evitare che lecchi la ferita",
    ],
    costRange: "150–400 € (varia per specie, sesso e taglia)",
    duration: "30-90 minuti (+ osservazione post-operatoria)",
    localContext: "Le strutture veterinarie a {city} e in provincia di {province} offrono la sterilizzazione con tecniche mini-invasive e protocolli anestesiologici sicuri. Alcune ASL territoriali propongono programmi di sterilizzazione a tariffe agevolate per il controllo del randagismo.",
  },

  "castrazione-animali": {
    prose: "La castrazione a {city} è un intervento chirurgico comune che contribuisce alla salute a lungo termine del tuo animale maschio e al contenimento del fenomeno del randagismo in provincia di {province}. Oltre a prevenire la riproduzione indesiderata, la castrazione riduce l'aggressività, il vagabondaggio e il rischio di patologie prostatiche e testicolari.",
    preparation: [
      "Digiuno di almeno 8-12 ore prima dell'intervento",
      "Evitare la somministrazione di acqua nelle 4 ore precedenti",
      "Portare il libretto sanitario con le vaccinazioni aggiornate",
      "Preparare un ambiente domestico tranquillo per il recupero",
      "Prevedere un collare elisabettiano per i giorni successivi",
    ],
    costRange: "120–300 € (varia per specie e taglia)",
    duration: "20-60 minuti (+ osservazione post-operatoria)",
    localContext: "A {city} e nei comuni della provincia di {province}, la castrazione viene eseguita con protocolli anestesiologici moderni e monitoraggio costante. I veterinari locali consigliano l'intervento tra i 6 e i 12 mesi di età per la maggior parte delle razze.",
  },

  "ecografia-veterinaria": {
    prose: "L'ecografia veterinaria a {city} è un esame diagnostico non invasivo e indolore che permette di visualizzare in tempo reale gli organi interni del tuo animale. Nella zona di {province}, le cliniche dotate di ecografo veterinario offrono diagnosi precise per patologie addominali, cardiache e riproduttive, senza necessità di sedazione nella maggior parte dei casi.",
    preparation: [
      "L'animale dovrebbe essere a digiuno da 8-12 ore per ecografie addominali",
      "La vescica deve essere piena: evita l'ultima passeggiata prima dell'esame",
      "Potrebbe essere necessaria la tosatura dell'area da esaminare",
      "Non è richiesta sedazione nella maggior parte dei casi",
    ],
    costRange: "60–150 € (singolo distretto); 100–200 € (addome completo)",
    duration: "20-40 minuti",
    localContext: "Le strutture veterinarie a {city} e in provincia di {province} dispongono di ecografi di ultima generazione che permettono diagnosi accurate anche per patologie complesse. L'ecografia è particolarmente utile nel monitoraggio delle gravidanze e nella diagnosi precoce di tumori addominali.",
  },

  "radiografia-veterinaria": {
    prose: "La radiografia veterinaria a {city} è un esame diagnostico fondamentale per identificare fratture, corpi estranei, patologie polmonari e alterazioni scheletriche nel tuo animale. Le strutture dotate di radiologia digitale nella zona di {province} garantiscono immagini ad alta risoluzione con tempi di esposizione ridotti e dosaggi minimi di radiazioni.",
    preparation: [
      "Potrebbe essere necessaria una breve sedazione per animali agitati",
      "Comunica al veterinario eventuali sospetti di gravidanza",
      "Per radiografie addominali, il digiuno può migliorare la qualità delle immagini",
      "Porta eventuali radiografie precedenti per confronto",
    ],
    costRange: "50–120 € (singola proiezione); 80–200 € (studio completo)",
    duration: "15-30 minuti",
    localContext: "A {city} e nei comuni della provincia di {province}, la radiologia digitale veterinaria permette diagnosi rapide e precise. Le immagini possono essere trasmesse telematicamente a specialisti per un secondo parere, un servizio sempre più diffuso nelle strutture della zona.",
  },

  "tac-veterinaria": {
    prose: "La TAC veterinaria a {city} è un esame di diagnostica avanzata che produce immagini tridimensionali dettagliate, essenziali per la diagnosi di patologie neurologiche, ortopediche e oncologiche complesse. Non tutte le strutture nella zona di {province} dispongono di questa tecnologia: il nostro servizio ti aiuta a individuare la clinica più vicina e attrezzata.",
    preparation: [
      "Richiede anestesia generale: l'animale deve essere a digiuno da 12 ore",
      "Sono necessari esami del sangue preliminari per valutare l'idoneità all'anestesia",
      "Il veterinario potrebbe richiedere la sospensione di alcuni farmaci",
      "Prevedi circa mezza giornata per l'intera procedura incluso il risveglio",
    ],
    costRange: "300–800 € (varia per distretto e mezzo di contrasto)",
    duration: "30-60 minuti (+ preparazione e risveglio: 3-4 ore totali)",
    localContext: "Le cliniche di riferimento per la TAC veterinaria nella zona di {city} e {province} offrono apparecchiature multi-slice di ultima generazione. Questo esame è spesso il passo decisivo per pianificare interventi chirurgici complessi o trattamenti oncologici mirati.",
  },

  "risonanza-magnetica-veterinaria": {
    prose: "La risonanza magnetica veterinaria a {city} è l'esame gold-standard per la diagnosi di patologie neurologiche, spinali e dei tessuti molli. Nella provincia di {province}, poche strutture dispongono di questa tecnologia avanzata, rendendo il nostro servizio di ricerca particolarmente utile per individuare il centro più vicino e qualificato.",
    preparation: [
      "Richiede anestesia generale: digiuno di almeno 12 ore",
      "Esami del sangue preliminari obbligatori",
      "Rimuovere eventuali oggetti metallici (collari, medagliette)",
      "Prevedi l'intera giornata per la procedura completa",
    ],
    costRange: "400–1.200 € (varia per distretto anatomico)",
    duration: "45-90 minuti (+ anestesia e risveglio: 4-6 ore totali)",
    localContext: "Nel territorio di {city} e in provincia di {province}, la risonanza magnetica veterinaria è disponibile presso centri specializzati di riferimento. È l'esame d'elezione per ernie discali, epilessia, tumori cerebrali e patologie articolari complesse.",
  },

  "chirurgia-veterinaria": {
    prose: "La chirurgia veterinaria a {city} comprende un ampio spettro di interventi, dalla chirurgia dei tessuti molli alla chirurgia ortopedica e oncologica. I chirurghi veterinari nella zona di {province} operano in sale chirurgiche attrezzate con anestesia inalatoria, monitoraggio multiparametrico e protocolli di gestione del dolore post-operatorio all'avanguardia.",
    preparation: [
      "Digiuno di almeno 12 ore prima dell'intervento",
      "Esami pre-operatori (emocromo, profilo biochimico, eventuale ECG)",
      "Comunicare tutti i farmaci assunti dall'animale",
      "Preparare uno spazio di convalescenza tranquillo a casa",
      "Prevedere collare elisabettiano e materiale per medicazioni",
    ],
    costRange: "200–2.000+ € (varia enormemente per tipo di intervento)",
    duration: "30 minuti – 4 ore (+ degenza post-operatoria)",
    localContext: "Le strutture chirurgiche a {city} e in provincia di {province} garantiscono interventi sicuri grazie a team anestesiologici dedicati. Per interventi complessi, alcune cliniche offrono servizi di degenza con monitoraggio continuo nei giorni successivi all'operazione.",
  },

  "dermatologia-veterinaria": {
    prose: "La dermatologia veterinaria a {city} si occupa di diagnosticare e trattare le patologie della cute, del pelo e delle unghie del tuo animale. Nella zona di {province}, le allergie cutanee, le dermatiti da pulci e le micosi sono tra le problematiche più frequenti, complici il clima caldo e l'umidità che favoriscono la proliferazione di parassiti e funghi durante gran parte dell'anno.",
    preparation: [
      "Non lavare l'animale nei 3-5 giorni precedenti la visita dermatologica",
      "Non applicare pomate o trattamenti topici prima dell'esame",
      "Annota quando sono comparsi i sintomi e se sono stagionali",
      "Porta informazioni sull'alimentazione attuale dell'animale",
    ],
    costRange: "60–150 € (visita specialistica); test allergologici 150–400 €",
    duration: "30-60 minuti",
    localContext: "A {city} e nei comuni della provincia di {province}, le patologie dermatologiche sono particolarmente frequenti nei mesi caldi. I dermatologi veterinari della zona utilizzano test allergologici intradermici e sierologici per identificare le cause e impostare terapie desensibilizzanti mirate.",
  },

  "cardiologia-veterinaria": {
    prose: "La cardiologia veterinaria a {city} si occupa della diagnosi e del trattamento delle patologie cardiache negli animali domestici. Mediante ecocardiografia, elettrocardiogramma e misurazione della pressione arteriosa, i cardiologi veterinari nella zona di {province} possono identificare precocemente malattie valvolari, cardiomiopatie e aritmie che, se trascurate, possono compromettere gravemente la qualità di vita del tuo animale.",
    preparation: [
      "Non far fare sforzi fisici intensi all'animale prima della visita",
      "Porta la lista completa dei farmaci assunti",
      "Annota frequenza e circostanze di eventuali episodi di tosse o affanno",
      "Non è necessario il digiuno per l'ecocardiogramma",
    ],
    costRange: "80–200 € (ecocardiografia); 40–80 € (ECG)",
    duration: "30-60 minuti",
    localContext: "Le strutture cardiologiche a {city} e in provincia di {province} dispongono di ecografi con sonde dedicate alla cardiologia veterinaria. Razze predisposte come Cavalier King, Dobermann e Maine Coon necessitano di screening cardiaci periodici fin dalla giovane età.",
  },

  "neurologia-veterinaria": {
    prose: "La neurologia veterinaria a {city} si occupa di diagnosticare e trattare le patologie del sistema nervoso centrale e periferico negli animali domestici. Convulsioni, paralisi, perdita di equilibrio e alterazioni comportamentali improvvise sono i principali motivi di consulto neurologico nella zona di {province}.",
    preparation: [
      "Filma eventuali episodi di crisi (convulsioni, tremori) con lo smartphone",
      "Annota frequenza, durata e circostanze degli episodi neurologici",
      "Porta tutta la documentazione medica precedente",
      "Potrebbe essere necessaria diagnostica avanzata (RM, TAC)",
    ],
    costRange: "80–200 € (visita neurologica); diagnostica avanzata 300–1.200 €",
    duration: "45-90 minuti (visita); diagnostica: mezza giornata",
    localContext: "I neurologi veterinari a {city} e in provincia di {province} utilizzano protocolli diagnostici avanzati che includono esame neurologico completo, analisi del liquor cerebrospinale e diagnostica per immagini. La diagnosi precoce è fondamentale per il successo delle terapie neurologiche.",
  },

  "oftalmologia-veterinaria": {
    prose: "L'oftalmologia veterinaria a {city} è una specializzazione dedicata alla diagnosi e al trattamento delle patologie oculari negli animali. Congiuntiviti, ulcere corneali, cataratta e glaucoma sono tra le condizioni più comuni trattate dagli oculisti veterinari nella zona di {province}. Una visita oculistica specialistica può prevenire la perdita della vista e migliorare significativamente la qualità di vita del tuo animale.",
    preparation: [
      "Non applicare colliri o pomate oculari nelle 24 ore precedenti",
      "Annota da quanto tempo sono presenti i sintomi",
      "Osserva se l'animale si strofina gli occhi o evita la luce",
      "Non è necessario il digiuno (salvo indicazione per interventi)",
    ],
    costRange: "70–180 € (visita oculistica); interventi 300–1.500 €",
    duration: "30-45 minuti",
    localContext: "A {city} e nei comuni limitrofi della provincia di {province}, le strutture oftalmologiche veterinarie dispongono di lampade a fessura, tonometri e apparecchiature per la retinoscopia. Le razze brachicefale (Bulldog, Carlino, Persiano) richiedono controlli oculistici più frequenti.",
  },

  "oncologia-veterinaria": {
    prose: "L'oncologia veterinaria a {city} offre diagnosi e trattamenti per i tumori negli animali domestici, inclusi chirurgia oncologica, chemioterapia e cure palliative. I progressi della medicina veterinaria permettono oggi di trattare molte neoplasie con ottimi risultati nella zona di {province}, migliorando la qualità e la durata della vita degli animali affetti.",
    preparation: [
      "Porta tutti gli esami diagnostici precedenti (radiografie, ecografie, analisi)",
      "Annota la cronologia della crescita di eventuali masse visibili",
      "L'animale potrebbe dover essere a digiuno se sono previsti prelievi o biopsie",
      "Preparati a discutere le opzioni terapeutiche e la prognosi con il veterinario",
    ],
    costRange: "100–300 € (consulto + staging); chemioterapia 150–500 € per ciclo",
    duration: "45-90 minuti (prima visita oncologica)",
    localContext: "Le strutture oncologiche a {city} e in provincia di {province} offrono approcci multimodali al trattamento dei tumori, combinando chirurgia, chemioterapia e terapie di supporto. La diagnosi precoce attraverso screening periodici è il fattore più importante per il successo terapeutico.",
  },

  "ortopedia-veterinaria": {
    prose: "L'ortopedia veterinaria a {city} si occupa della diagnosi e del trattamento delle patologie muscolo-scheletriche: fratture, lussazioni, displasia dell'anca e del gomito, rottura dei legamenti crociati e artrosi. I chirurghi ortopedici nella zona di {province} utilizzano tecniche chirurgiche avanzate e protocolli riabilitativi per restituire mobilità e qualità di vita al tuo animale.",
    preparation: [
      "Limita i movimenti dell'animale prima della visita per non aggravare la lesione",
      "Porta radiografie precedenti se disponibili",
      "Annota da quanto tempo è presente la zoppia e in quali circostanze peggiora",
      "Per interventi, saranno necessari esami pre-operatori completi",
    ],
    costRange: "80–200 € (visita ortopedica); interventi 500–3.000 €",
    duration: "30-60 minuti (visita); interventi: variabile",
    localContext: "A {city} e in provincia di {province}, le cliniche ortopediche veterinarie offrono tecniche chirurgiche moderne come TPLO, TTA e protesi articolari. La fisioterapia e l'idroterapia post-operatoria sono sempre più disponibili per accelerare il recupero funzionale.",
  },

  "endocrinologia-veterinaria": {
    prose: "L'endocrinologia veterinaria a {city} si occupa delle patologie ormonali che colpiscono gli animali domestici: diabete mellito, ipotiroidismo, ipertiroidismo felino, morbo di Cushing e morbo di Addison. Una diagnosi accurata nella zona di {province} richiede test ormonali specifici e un follow-up costante per calibrare le terapie.",
    preparation: [
      "L'animale dovrebbe essere a digiuno da 8-12 ore per i prelievi ematici",
      "Porta la lista di tutti i farmaci e integratori somministrati",
      "Annota cambiamenti di peso, sete, appetito e urinazione",
      "Non sospendere le terapie in corso senza indicazione veterinaria",
    ],
    costRange: "80–200 € (visita + profilo ormonale base); monitoraggio 40–100 € per controllo",
    duration: "30-45 minuti (visita); risultati esami in 2-5 giorni",
    localContext: "I veterinari endocrinologi a {city} e nei comuni della provincia di {province} gestiscono patologie croniche che richiedono monitoraggio a lungo termine. L'ipotiroidismo nel cane e l'ipertiroidismo nel gatto sono tra le endocrinopatie più frequenti nella pratica clinica locale.",
  },

  "endoscopia-veterinaria": {
    prose: "L'endoscopia veterinaria a {city} è una procedura diagnostica e terapeutica minimamente invasiva che permette di esplorare l'apparato digerente, respiratorio e urinario del tuo animale senza ricorrere alla chirurgia tradizionale. Nella zona di {province}, questa tecnica è utilizzata per l'estrazione di corpi estranei, biopsie e diagnosi di patologie gastrointestinali croniche.",
    preparation: [
      "Digiuno di almeno 12-24 ore (necessario per la visualizzazione)",
      "Potrebbe essere necessaria una preparazione intestinale specifica",
      "L'esame richiede anestesia generale",
      "Prevedi mezza giornata per la procedura completa",
    ],
    costRange: "200–600 € (diagnostica); estrazione corpi estranei 300–800 €",
    duration: "30-60 minuti (+ anestesia e risveglio)",
    localContext: "Le strutture endoscopiche a {city} e in provincia di {province} utilizzano endoscopi flessibili e rigidi di ultima generazione. L'endoscopia è spesso l'alternativa più sicura alla chirurgia esplorativa, con tempi di recupero significativamente ridotti per l'animale.",
  },

  "analisi-sangue-veterinarie": {
    prose: "Le analisi del sangue veterinarie a {city} sono uno strumento diagnostico fondamentale per valutare lo stato di salute del tuo animale. Emocromo, profilo biochimico, test ormonali e sierologici forniscono informazioni preziose su fegato, reni, pancreas, tiroide e sistema immunitario. Nella zona di {province}, molte strutture dispongono di laboratori interni per risultati in giornata.",
    preparation: [
      "L'animale deve essere a digiuno da almeno 8-12 ore",
      "Non sospendere farmaci in corso salvo diversa indicazione",
      "Annota eventuali sintomi recenti da comunicare al veterinario",
      "Il prelievo è rapido e generalmente ben tollerato",
    ],
    costRange: "30–80 € (emocromo + biochimico base); profili completi 80–200 €",
    duration: "10-15 minuti (prelievo); risultati in 1-24 ore",
    localContext: "A {city} e nei comuni della provincia di {province}, le analisi del sangue veterinarie sono disponibili sia con laboratorio interno (risultati in giornata) sia con invio a laboratori esterni specializzati per test più complessi come i pannelli endocrini e le sierologie per malattie infettive.",
  },

  "check-up-veterinario": {
    prose: "Il check-up veterinario a {city} è un pacchetto completo di controlli preventivi che include visita clinica, analisi del sangue, esame delle urine e valutazione dello stato nutrizionale. Nella zona di {province}, i check-up annuali rappresentano lo strumento più efficace per la diagnosi precoce di patologie e il mantenimento del benessere del tuo animale nel tempo.",
    preparation: [
      "L'animale dovrebbe essere a digiuno da 8-12 ore per le analisi",
      "Porta un campione di urine fresco (se possibile) raccolto la mattina stessa",
      "Porta il libretto sanitario aggiornato",
      "Prepara una lista di dubbi o cambiamenti notati",
    ],
    costRange: "80–200 € (pacchetto base); 150–350 € (check-up completo con imaging)",
    duration: "45-90 minuti",
    localContext: "Le strutture veterinarie a {city} e in provincia di {province} offrono pacchetti di check-up personalizzati per età e specie. Per gli animali sopra i 7 anni, è raccomandato un controllo semestrale anziché annuale per individuare precocemente patologie legate all'invecchiamento.",
  },

  "test-allergie-veterinario": {
    prose: "I test allergologici veterinari a {city} permettono di identificare le sostanze che causano reazioni allergiche nel tuo animale. Prurito persistente, otiti ricorrenti, dermatiti e problemi gastrointestinali possono avere origine allergica. Nella zona di {province}, le allergie ambientali (pollini, acari della polvere) e alimentari sono particolarmente frequenti.",
    preparation: [
      "Sospendere i corticosteroidi almeno 3-4 settimane prima del test (su indicazione del veterinario)",
      "Sospendere gli antistaminici 7-14 giorni prima",
      "Non lavare l'animale nei giorni precedenti",
      "Porta informazioni dettagliate sull'alimentazione attuale",
    ],
    costRange: "150–400 € (test intradermici o sierologici); dieta eliminazione: costo del cibo",
    duration: "30-60 minuti (test); diagnosi completa: 6-12 settimane",
    localContext: "A {city} e in provincia di {province}, le allergie stagionali ai pollini di graminacee, olivo e parietaria sono molto diffuse tra gli animali. I dermatologi veterinari locali propongono sia test sierologici che intradermici, seguiti da protocolli di immunoterapia desensibilizzante.",
  },

  "nutrizione-veterinaria": {
    prose: "La consulenza nutrizionale veterinaria a {city} è un servizio specialistico che elabora piani alimentari personalizzati per il tuo animale, tenendo conto di età, razza, peso, livello di attività e patologie eventualmente presenti. I nutrizionisti veterinari della zona di {province} possono aiutarti a gestire diete specifiche per allergie, insufficienza renale, diabete e obesità.",
    preparation: [
      "Porta la lista completa degli alimenti attualmente somministrati (marca, quantità)",
      "Annota eventuali intolleranze o reazioni alimentari osservate",
      "Se disponibili, porta gli ultimi esami del sangue",
      "Pesa l'animale prima della visita o comunica il peso recente",
    ],
    costRange: "50–120 € (consulenza nutrizionale); piano alimentare personalizzato incluso",
    duration: "30-45 minuti",
    localContext: "A {city} e nei comuni della provincia di {province}, i veterinari nutrizionisti tengono conto dei prodotti locali e del clima caldo nella formulazione delle diete. L'alimentazione corretta è la base della prevenzione di molte patologie e del mantenimento di un peso ottimale.",
  },

  "consulenza-dieta-animale": {
    prose: "La consulenza dietetica per animali a {city} aiuta i proprietari a scegliere l'alimentazione più corretta per il proprio pet. Che si tratti di gestire il sovrappeso, di affrontare un'allergia alimentare o di passare a una dieta casalinga bilanciata, i professionisti nella zona di {province} offrono piani personalizzati basati sulle esigenze specifiche di ogni animale.",
    preparation: [
      "Porta un diario alimentare di almeno una settimana",
      "Annota marche e quantità di cibo, snack e integratori",
      "Porta gli ultimi esami ematici se disponibili",
      "Pesa l'animale prima della consulenza",
    ],
    costRange: "40–100 €",
    duration: "30-45 minuti",
    localContext: "Le strutture veterinarie a {city} e in provincia di {province} propongono consulenze dietetiche integrate con il monitoraggio clinico. Un'alimentazione equilibrata, adattata al clima mediterraneo e allo stile di vita dell'animale, è fondamentale per la prevenzione di patologie metaboliche.",
  },

  "trattamento-obesita-animale": {
    prose: "Il trattamento dell'obesità animale a {city} è un percorso terapeutico multidisciplinare che combina dieta personalizzata, programma di esercizio fisico graduale e monitoraggio veterinario costante. L'obesità è una delle patologie più diffuse tra gli animali domestici nella zona di {province} e può causare diabete, artropatie, malattie cardiovascolari e riduzione dell'aspettativa di vita.",
    preparation: [
      "Pesa l'animale prima della visita",
      "Annota tutte le fonti alimentari (pasti, snack, avanzi della tavola)",
      "Porta gli ultimi esami ematici se disponibili",
      "Descrivi il livello di attività fisica quotidiana",
    ],
    costRange: "50–120 € (consulenza + piano); controlli periodici 30–60 €",
    duration: "30-45 minuti (prima visita); programma di 3-6 mesi",
    localContext: "A {city} e nei comuni della provincia di {province}, l'obesità negli animali domestici è in aumento. I veterinari locali propongono programmi di dimagrimento controllato con pesate mensili e aggiustamenti dietetici progressivi.",
  },

  "veterinario-a-domicilio": {
    prose: "Il servizio di veterinario a domicilio a {city} è la soluzione ideale per animali difficili da trasportare, anziani, di grossa taglia o particolarmente stressati dalla visita in ambulatorio. I professionisti che operano a domicilio nella zona di {province} possono effettuare visite di routine, vaccinazioni, prelievi, medicazioni e cure palliative direttamente a casa tua.",
    preparation: [
      "Prepara un ambiente tranquillo e ben illuminato per la visita",
      "Tieni l'animale in una stanza accessibile e sicura",
      "Porta il libretto sanitario e la lista dei farmaci in corso",
      "Isola altri animali presenti in casa durante la visita",
    ],
    costRange: "50–120 € (visita base + supplemento domicilio)",
    duration: "30-60 minuti",
    localContext: "A {city} e nei comuni della provincia di {province}, il servizio veterinario a domicilio è particolarmente apprezzato per gli animali anziani e per i gatti, che spesso vivono il trasporto come un forte stress. Il supplemento per il servizio a domicilio varia in base alla distanza.",
  },

  "veterinario-notturno": {
    prose: "Il servizio di veterinario notturno a {city} garantisce assistenza veterinaria durante le ore serali e notturne, quando la maggior parte degli ambulatori è chiusa. Nella zona di {province}, conoscere in anticipo quale struttura offre reperibilità notturna è fondamentale per gestire le emergenze senza panico.",
    preparation: [
      "Salva i numeri delle cliniche con servizio notturno prima che serva",
      "In caso di emergenza, chiama prima di recarti in struttura",
      "Non somministrare farmaci umani senza indicazione veterinaria",
      "Prepara il trasportino e i documenti dell'animale",
    ],
    costRange: "80–200 € (visita notturna con supplemento orario)",
    duration: "Variabile in base alla situazione clinica",
    localContext: "A {city} e nei comuni della provincia di {province}, il servizio notturno veterinario è garantito dalle cliniche h24 e dai sistemi di reperibilità. Ti consigliamo di verificare in anticipo quali strutture nella tua zona offrono questo servizio.",
  },

  "veterinario-emergenza": {
    prose: "Il veterinario d'emergenza a {city} è un servizio vitale per le situazioni acute che richiedono intervento immediato: traumi, avvelenamenti, crisi respiratorie, torsione gastrica e colpi di calore. Nella zona di {province}, le strutture con pronto soccorso veterinario sono attrezzate per la stabilizzazione, la chirurgia d'urgenza e la terapia intensiva.",
    preparation: [
      "Chiama la struttura per avvisare del tuo arrivo e descrivere la situazione",
      "Non cercare di far vomitare l'animale senza indicazione veterinaria",
      "Immobilizza l'animale traumatizzato con un asciugamano durante il trasporto",
      "Annota l'ora di inizio dei sintomi e qualsiasi sostanza ingerita",
    ],
    costRange: "100–300 € (visita urgente); interventi d'emergenza 300–2.000+ €",
    duration: "Variabile: dalla stabilizzazione (1-2 ore) alla degenza (giorni)",
    localContext: "Le strutture d'emergenza a {city} e in provincia di {province} dispongono di sale chirurgiche, laboratori d'analisi rapide e reparti di terapia intensiva. La tempestività di intervento è il fattore chiave: in molte emergenze, le prime 1-2 ore sono decisive.",
  },

  "veterinario-per-cani": {
    prose: "Trovare un veterinario specializzato per cani a {city} è semplice con il nostro servizio gratuito. I professionisti della zona di {province} offrono cure complete per tutte le razze e le età: dalle prime vaccinazioni del cucciolo ai controlli geriatrici, dalla prevenzione antiparassitaria alla gestione delle patologie croniche. Il cane è l'animale da compagnia più diffuso in Italia e merita un veterinario di riferimento competente e vicino.",
    preparation: [
      "Porta il libretto sanitario con vaccinazioni e trattamenti antiparassitari",
      "Utilizza guinzaglio e museruola se il cane è reattivo",
      "Annota eventuali cambiamenti di comportamento, appetito o sete",
      "Per cuccioli: porta informazioni sull'allevamento di provenienza",
    ],
    costRange: "30–80 € (visita base); pacchetti annuali 150–350 €",
    duration: "20-40 minuti",
    localContext: "A {city} e nei comuni della provincia di {province}, i veterinari per cani offrono servizi completi che includono medicina preventiva, chirurgia, diagnostica e consulenza comportamentale. La prevenzione contro la leishmaniosi è particolarmente raccomandata nel territorio.",
  },

  "veterinario-per-gatti": {
    prose: "Trovare un veterinario specializzato per gatti a {city} è fondamentale per garantire al tuo felino le cure più appropriate. I gatti hanno esigenze cliniche specifiche e spesso nascondono i sintomi di malessere. I professionisti della zona di {province} esperti in medicina felina sanno riconoscere i segnali sottili e creare un ambiente di visita cat-friendly per ridurre lo stress.",
    preparation: [
      "Utilizza un trasportino coperto con un panno per ridurre lo stress",
      "Abitua gradualmente il gatto al trasportino nei giorni precedenti",
      "Porta il libretto sanitario e informazioni su eventuali cambiamenti urinari",
      "Non far digiunare il gatto senza indicazione specifica del veterinario",
    ],
    costRange: "30–80 € (visita base); profili felini completi 100–250 €",
    duration: "20-40 minuti",
    localContext: "Le strutture veterinarie a {city} e in provincia di {province} offrono ambulatori cat-friendly progettati per ridurre lo stress del gatto durante la visita. L'ipertiroidismo felino, la malattia renale cronica e il diabete sono tra le patologie più frequentemente diagnosticate nei gatti della zona.",
  },

  "veterinario-animali-esotici": {
    prose: "Il veterinario per animali esotici a {city} è un professionista specializzato nella cura di rettili, uccelli, piccoli mammiferi (conigli, furetti, criceti) e altri animali non convenzionali. Non tutti i veterinari nella zona di {province} hanno la formazione specifica per queste specie: il nostro servizio ti aiuta a individuare i professionisti qualificati più vicini.",
    preparation: [
      "Trasporta l'animale in un contenitore adeguato alla specie (terrario portatile per rettili, gabbietta per uccelli)",
      "Mantieni la temperatura adeguata durante il trasporto",
      "Porta informazioni su alimentazione, tipo di terrario/gabbia e habitat",
      "Annota eventuali cambiamenti di comportamento o alimentazione",
    ],
    costRange: "50–120 € (visita specialistica esotici)",
    duration: "30-60 minuti",
    localContext: "A {city} e nei comuni della provincia di {province}, i veterinari per animali esotici sono meno numerosi rispetto ai generalisti. La nostra piattaforma ti permette di individuare rapidamente i professionisti con competenze specifiche per la tua specie.",
  },

  "veterinario-equino": {
    prose: "Il veterinario equino a {city} è un professionista specializzato nella cura e nella gestione sanitaria dei cavalli, sia da sport che da compagnia. Nella zona di {province}, l'ippica e l'allevamento equino hanno una lunga tradizione, e i veterinari equini operano prevalentemente con visite in scuderia per gestire vaccinazioni, ferrature, patologie ortopediche e coliche.",
    preparation: [
      "Assicurati che il cavallo sia in un box pulito e accessibile",
      "Informa lo stalliere della visita programmata",
      "Porta il passaporto equino con le vaccinazioni aggiornate",
      "Se il problema è una zoppia, prepara una superficie piana per il trotto diagnostico",
    ],
    costRange: "80–200 € (visita in scuderia); diagnostica 150–500 €",
    duration: "30-90 minuti",
    localContext: "A {city} e in provincia di {province}, i veterinari equini operano prevalentemente a domicilio presso le scuderie. La gestione sanitaria del cavallo include un piano vaccinale specifico (influenza, tetano, West Nile) e controlli dentistici periodici.",
  },

  "veterinario-rurale": {
    prose: "Il veterinario rurale a {city} è il professionista di riferimento per gli animali da reddito e da allevamento: bovini, ovini, caprini, suini e pollame. Nella zona di {province}, la zootecnia è un settore economico importante e il veterinario rurale svolge un ruolo fondamentale nella prevenzione delle malattie, nella sicurezza alimentare e nel benessere animale in allevamento.",
    preparation: [
      "Assicurati che gli animali siano contenuti in modo sicuro e accessibile",
      "Prepara la documentazione sanitaria dell'allevamento (registro BDN)",
      "Comunica il numero e la specie degli animali da visitare",
      "Prevedi acqua corrente e illuminazione adeguata nell'area di visita",
    ],
    costRange: "Visita aziendale 80–200 € + costo per capo",
    duration: "Variabile in base al numero di capi",
    localContext: "I veterinari rurali a {city} e in provincia di {province} collaborano con le ASL e con l'Istituto Zooprofilattico per i piani di profilassi obbligatoria (brucellosi, tubercolosi, leucosi). Il benessere animale in allevamento è oggi un tema centrale anche per la qualità delle produzioni tipiche del territorio.",
  },

  "asilo-per-animali": {
    prose: "L'asilo per animali a {city} offre servizi di custodia diurna per il tuo pet in un ambiente sicuro e stimolante mentre sei al lavoro o fuori casa. Nella zona di {province}, queste strutture propongono attività ludiche, socializzazione guidata e sorveglianza continua, garantendo al tuo animale una giornata serena e attiva.",
    preparation: [
      "Verifica che il tuo animale sia vaccinato e sverminato (solitamente richiesto)",
      "Porta il libretto sanitario per la registrazione",
      "Comunica eventuali allergie, intolleranze o paure dell'animale",
      "Porta il cibo abituale del tuo animale se la struttura lo richiede",
    ],
    costRange: "15–35 € al giorno; pacchetti settimanali/mensili disponibili",
    duration: "Mezza giornata o giornata intera",
    localContext: "A {city} e in provincia di {province}, gli asili per animali offrono aree di sgambamento, piscine estive e attività di arricchimento ambientale. Verifica sempre che la struttura sia autorizzata e disponga di personale qualificato.",
  },

  "pet-sitter": {
    prose: "Il servizio di pet sitter a {city} ti permette di affidare il tuo animale a un professionista di fiducia direttamente a casa tua o nella sua abitazione, durante le vacanze o le assenze prolungate. Nella zona di {province}, i pet sitter qualificati offrono passeggiate, somministrazione di pasti e farmaci, e aggiornamenti quotidiani sullo stato del tuo animale.",
    preparation: [
      "Comunica le abitudini quotidiane del tuo animale (pasti, passeggiate, farmaci)",
      "Lascia i recapiti del veterinario di fiducia e il libretto sanitario",
      "Fai un incontro conoscitivo tra il pet sitter e il tuo animale prima dell'affidamento",
      "Prepara una scorta di cibo e materiali sufficienti per il periodo",
    ],
    costRange: "15–40 € al giorno (casa del proprietario); 20–50 € al giorno (casa del pet sitter)",
    duration: "Servizio giornaliero o per periodi prolungati",
    localContext: "A {city} e nei comuni della provincia di {province}, i pet sitter professionisti offrono servizi flessibili e personalizzati. Verifica sempre le referenze e, se possibile, scegli professionisti assicurati per la custodia animale.",
  },

  "dog-walking": {
    prose: "Il servizio di dog walking a {city} offre passeggiate professionali per il tuo cane quando non puoi portarlo fuori personalmente. I dog walker nella zona di {province} gestiscono passeggiate individuali o in piccoli gruppi, garantendo esercizio fisico adeguato, socializzazione e stimolazione mentale per il tuo amico a quattro zampe.",
    preparation: [
      "Assicurati che il cane sia vaccinato e abbia un'assicurazione RC",
      "Comunica le abitudini del cane (reattività, paure, allergie)",
      "Fornisci guinzaglio, sacchetti per le deiezioni e acqua",
      "Stabilisci il percorso e la durata della passeggiata",
    ],
    costRange: "8–20 € per passeggiata (30-60 minuti)",
    duration: "30-60 minuti per uscita",
    localContext: "A {city} e in provincia di {province}, i servizi di dog walking sono disponibili sia per passeggiate singole che con abbonamenti settimanali. Verifica che il professionista sia coperto da assicurazione e abbia esperienza con la razza del tuo cane.",
  },

  "toelettatura": {
    prose: "La toelettatura professionale a {city} non è solo estetica ma anche un servizio di igiene e prevenzione per il tuo animale. I toelettatori nella zona di {province} offrono bagnetto, tosatura, taglio unghie, pulizia delle orecchie e trattamenti antiparassitari. Una toelettatura regolare permette di individuare precocemente problemi cutanei, nodi dolorosi e parassiti.",
    preparation: [
      "Spazzola l'animale prima della toelettatura per rimuovere i nodi più grossi",
      "Comunica allergie cutanee o zone sensibili",
      "Porta il libretto vaccinale se la struttura lo richiede",
      "Specifica se desideri un taglio specifico per la razza",
    ],
    costRange: "25–80 € (varia per taglia, tipo di pelo e servizi inclusi)",
    duration: "1-3 ore (in base alla taglia e al tipo di trattamento)",
    localContext: "A {city} e nei comuni della provincia di {province}, le toelettature professionali offrono anche servizi di spa per animali, trattamenti per la cute e bagni medicati. Nelle stagioni calde, la tosatura e i trattamenti antiparassitari sono particolarmente richiesti.",
  },

  "esami-analisi": {
    prose: "Gli esami e le analisi veterinarie a {city} comprendono un'ampia gamma di test diagnostici: emocromo, biochimico, analisi delle urine, coprologico, citologico e test sierologici. I laboratori veterinari nella zona di {province} offrono risultati rapidi e affidabili per supportare il tuo veterinario nella diagnosi e nel monitoraggio delle terapie.",
    preparation: [
      "Digiuno di 8-12 ore per gli esami ematici",
      "Raccogli un campione di urine o feci fresco se richiesto",
      "Porta la lista dei farmaci in corso",
      "Non sospendere terapie senza indicazione veterinaria",
    ],
    costRange: "30–200 € (in base al pannello richiesto)",
    duration: "10-15 minuti (prelievo); risultati in 1-48 ore",
    localContext: "Le strutture veterinarie a {city} e in provincia di {province} dispongono sia di laboratori interni per analisi urgenti sia di convenzioni con laboratori esterni specializzati per test complessi e istologici.",
  },
};

/** Returns enrichment for a service slug, falling back to defaults */
export function getServiceCityContent(serviceSlug: string): ServiceCityEnrichment {
  const specific = serviceCityContent[serviceSlug];
  return {
    ...defaultEnrichment,
    ...specific,
  };
}
