/**
 * Editorial content (~100 words) for each ServicePage.
 * Adds depth, practical advice and SEO value to service pages.
 */

export interface ServiceEditorial {
  /** Practical advice paragraph */
  practicalAdvice: string;
  /** Cost/duration context */
  costInfo: string;
  /** How to choose a specialist */
  howToChoose: string;
}

export const serviceEditorials: Record<string, ServiceEditorial> = {
  "visita-veterinaria": {
    practicalAdvice: "Prima della visita, osserva attentamente il tuo animale per almeno 24 ore: annota eventuali cambiamenti nell'appetito, nella sete, nelle feci e nel livello di attività. Porta con te il libretto sanitario aggiornato e una lista dei farmaci in corso. Se il tuo animale è particolarmente ansioso, chiedi al veterinario consigli su come ridurre lo stress durante il trasporto. Per cuccioli e gattini, le prime visite sono fondamentali per impostare un programma vaccinale corretto e identificare precocemente eventuali problemi congeniti.",
    costInfo: "Il costo medio di una visita veterinaria generale in Italia si aggira tra i 30 e i 60 euro per la prima visita, con variazioni significative tra Nord e Sud e tra ambulatori e cliniche specializzate. I controlli annuali di routine sono un investimento essenziale per prevenire patologie costose.",
    howToChoose: "Scegli un veterinario che dedichi tempo all'ascolto e alla spiegazione. Un buon professionista non ha fretta, risponde alle tue domande e ti coinvolge nelle decisioni terapeutiche. Verifica che la struttura sia pulita, attrezzata e che il personale tratti gli animali con gentilezza.",
  },
  "pronto-soccorso-veterinario": {
    practicalAdvice: "In caso di emergenza, mantieni la calma e proteggi prima te stesso: un animale sofferente può mordere o graffiare per istinto. Avvolgi il tuo animale in una coperta per contenerlo e trasportalo con delicatezza. Non somministrare farmaci umani e non tentare di indurre il vomito senza indicazione veterinaria. Salva il numero del pronto soccorso veterinario più vicino sul telefono prima che ne abbia bisogno — nei momenti critici, ogni minuto conta.",
    costInfo: "Le tariffe del pronto soccorso veterinario variano dai 50 ai 150 euro per la sola visita d'urgenza, con costi aggiuntivi per esami, interventi e ricovero. Molte cliniche offrono piani di pagamento rateizzato per le emergenze impreviste.",
    howToChoose: "Per le emergenze, la vicinanza è il fattore principale. Individua in anticipo le cliniche con servizio notturno e festivo nella tua zona. Verifica che abbiano un reparto di terapia intensiva e personale reperibile 24/7.",
  },
  "vaccinazioni": {
    practicalAdvice: "Le vaccinazioni rappresentano la forma più efficace di prevenzione per il tuo animale. Il protocollo vaccinale standard prevede le prime dosi tra le 6 e le 8 settimane di vita, con richiami a intervalli regolari. Non saltare i richiami annuali: l'immunità diminuisce nel tempo e il rischio di contrarre malattie gravi come cimurro, parvovirosi o panleucopenia aumenta sensibilmente. Per cani che frequentano aree pubbliche o pensioni, il vaccino contro la tosse dei canili è fortemente raccomandato.",
    costInfo: "Il costo di una singola vaccinazione varia tra 25 e 50 euro. I pacchetti per cuccioli che includono le prime tre dosi costano in media 80–150 euro. Molte strutture offrono piani vaccinali scontati se abbinati alla visita annuale.",
    howToChoose: "Preferisci strutture che utilizzino vaccini di ultima generazione e che personalizzino il protocollo in base allo stile di vita del tuo animale: un cane da appartamento e un cane da caccia hanno esigenze vaccinali diverse.",
  },
  "veterinario-a-domicilio": {
    practicalAdvice: "Il servizio a domicilio è ideale per animali anziani, con difficoltà di trasporto o particolarmente stressati dagli ambienti clinici. Prima dell'arrivo del veterinario, confina gli altri animali in un'altra stanza e prepara un'area tranquilla e ben illuminata. Tieni a portata di mano il libretto sanitario e i campioni di feci o urine se richiesti. Il domicilio permette al veterinario di osservare l'ambiente in cui vive l'animale, utile per diagnosi comportamentali e nutrizionali.",
    costInfo: "Il servizio a domicilio ha un sovrapprezzo rispetto alla visita in ambulatorio, generalmente tra 20 e 50 euro aggiuntivi per lo spostamento. In molte città il costo complessivo si aggira tra 50 e 100 euro, variabile in base alla distanza.",
    howToChoose: "Verifica che il veterinario a domicilio disponga di un kit diagnostico portatile adeguato e sia in grado di gestire anche piccole urgenze. Chiedi se offre servizi aggiuntivi come prelievi, vaccinazioni e microchip a casa.",
  },
  "veterinario-animali-esotici": {
    practicalAdvice: "Rettili, uccelli, conigli e piccoli mammiferi hanno esigenze mediche molto diverse dai cani e gatti. Non tutti i veterinari hanno formazione specifica sugli esotici: assicurati che il professionista abbia esperienza documentata con la tua specie. Per il trasporto, usa contenitori adeguati con temperatura controllata — gli animali esotici sono particolarmente sensibili allo stress termico. Porta informazioni dettagliate su alimentazione, habitat e comportamenti recenti.",
    costInfo: "Le visite per animali esotici costano mediamente tra 40 e 80 euro, con tariffe più elevate per specie rare o interventi specialistici. La diagnostica per rettili e uccelli richiede spesso attrezzature dedicate che incidono sul costo.",
    howToChoose: "Cerca veterinari con certificazione o master in medicina degli animali esotici. L'esperienza specifica è fondamentale: un coniglio non è un piccolo cane e richiede competenze dedicate in anestesiologia e chirurgia.",
  },
  "chirurgia-veterinaria": {
    practicalAdvice: "La chirurgia veterinaria richiede una preparazione accurata: il digiuno pre-operatorio è fondamentale per ridurre il rischio anestesiologico. Segui scrupolosamente le indicazioni del chirurgo su alimentazione e farmaci nei giorni precedenti. Dopo l'intervento, prepara uno spazio tranquillo e protetto per la convalescenza. Usa il collare elisabettiano anche se il tuo animale sembra a disagio — impedire che lecchi la ferita è essenziale per una corretta guarigione. Rispetta i tempi di riposo indicati.",
    costInfo: "I costi chirurgici variano enormemente in base alla complessità: da 150–300 euro per interventi semplici (asportazione di neoformazioni cutanee) a oltre 1.500 euro per chirurgia ortopedica o addominale complessa. L'anestesia e il ricovero sono spesso inclusi nel preventivo.",
    howToChoose: "Scegli una struttura con sala operatoria dedicata, monitoraggio anestesiologico completo e possibilità di ricovero post-operatorio. Chiedi il tasso di complicanze e se il chirurgo ha esperienza specifica con il tipo di intervento necessario.",
  },
  "esami-analisi": {
    practicalAdvice: "Gli esami del sangue e delle urine sono strumenti diagnostici fondamentali. Per risultati affidabili, rispetta il digiuno di 8-12 ore prima del prelievo (l'acqua è generalmente consentita). Se il tuo animale assume farmaci, segnalalo: alcuni principi attivi possono alterare i valori ematici. Per l'esame delle urine, il veterinario potrebbe chiederti di raccogliere un campione a casa — usa un contenitore sterile e consegnalo entro 2 ore.",
    costInfo: "Un esame emocromocitometrico completo costa tra 20 e 50 euro, un profilo biochimico tra 40 e 90 euro. Pacchetti completi di check-up ematologico si aggirano sui 60–120 euro. I risultati sono spesso disponibili in giornata.",
    howToChoose: "Preferisci cliniche con laboratorio interno per risultati rapidi, soprattutto in caso di urgenza. Per analisi specialistiche (ormoni, markers tumorali), i campioni vengono solitamente inviati a laboratori esterni con tempi di 2-5 giorni.",
  },
  "ecografia-radiologia": {
    practicalAdvice: "L'ecografia è un esame non invasivo e indolore che permette di visualizzare organi interni in tempo reale. Per un'ecografia addominale, il digiuno di 8-12 ore e la vescica piena migliorano la qualità delle immagini. La radiografia richiede spesso che l'animale stia fermo: in alcuni casi può essere necessaria una blanda sedazione, specialmente per animali agitati o doloranti. Entrambe le tecniche sono complementari e spesso vengono utilizzate insieme per una diagnosi completa.",
    costInfo: "Un'ecografia addominale costa mediamente tra 60 e 120 euro, una radiografia tra 40 e 80 euro per proiezione. Pacchetti combinati di diagnostica per immagini possono ridurre il costo complessivo del 15-20%.",
    howToChoose: "Verifica che la struttura disponga di apparecchiature di ultima generazione e che l'ecografista abbia formazione specialistica. La qualità diagnostica dipende tanto dall'attrezzatura quanto dall'esperienza dell'operatore.",
  },
  "veterinario-per-gatti": {
    practicalAdvice: "I gatti sono maestri nel nascondere il dolore e il malessere — quando mostrano sintomi evidenti, spesso la malattia è già in fase avanzata. Per questo, visite regolari almeno annuali (semestrali dopo i 7 anni) sono cruciali. Usa un trasportino coperto con un asciugamano per ridurre lo stress del viaggio. Le cliniche cat-friendly con sale d'attesa separate e approccio low-stress fanno un'enorme differenza nel benessere del tuo gatto durante la visita.",
    costInfo: "Le tariffe per gatti sono generalmente allineate a quelle per cani, con visite tra 30 e 60 euro. Alcune cliniche cat-friendly applicano un leggero sovrapprezzo per il tempo aggiuntivo dedicato alla gestione del paziente felino.",
    howToChoose: "Cerca cliniche certificate cat-friendly o con veterinari specializzati in medicina felina. I gatti hanno esigenze metaboliche, farmacologiche e comportamentali uniche che richiedono competenze specifiche — molti farmaci sicuri per i cani sono tossici per i gatti.",
  },
  "veterinario-per-cani": {
    practicalAdvice: "La prevenzione è la chiave per la salute del tuo cane: visite annuali, vaccinazioni, antiparassitari regolari e cure dentali possono allungare significativamente la sua aspettativa di vita. Ogni razza ha predisposizioni genetiche specifiche — i cani di taglia grande sono soggetti a displasia e torsione gastrica, quelli brachicefali a problemi respiratori. Comunica al veterinario la razza, l'età e lo stile di vita del cane per un piano di prevenzione personalizzato.",
    costInfo: "Un piano sanitario annuale completo per un cane adulto (visita, vaccinazioni, antiparassitari, esami base) può costare tra 150 e 300 euro. La prevenzione è sempre meno costosa del trattamento di patologie avanzate.",
    howToChoose: "Un buon veterinario per cani tiene conto della razza, dell'età e dello stile di vita dell'animale. Preferisci professionisti che spiegano chiaramente diagnosi e opzioni terapeutiche e che non abbiano fretta durante la visita.",
  },
  "radiografia-veterinaria": {
    practicalAdvice: "La radiografia è essenziale per valutare ossa, articolazioni, torace e addome. L'animale deve rimanere immobile durante l'esposizione — in molti casi è sufficiente il contenimento manuale, ma animali molto agitati o in forte dolore possono richiedere sedazione. Per le radiografie ortopediche ufficiali (displasia dell'anca, displasia del gomito), è necessaria l'anestesia generale per ottenere posizionamenti standardizzati. I raggi X sono sicuri e l'esposizione è minima.",
    costInfo: "Una singola proiezione radiografica costa tra 35 e 70 euro. Studi completi (2-3 proiezioni) si aggirano sui 60–120 euro. Per radiografie ufficiali con certificazione, il costo può salire a 150–250 euro inclusa la sedazione.",
    howToChoose: "Scegli strutture con radiologia digitale, che offre immagini di qualità superiore con esposizione ridotta e risultati immediati. Per studi ortopedici ufficiali, verifica che il veterinario sia abilitato alle certificazioni richieste.",
  },
  "ecografia-veterinaria": {
    practicalAdvice: "L'ecografia è lo strumento d'elezione per esaminare organi addominali, cuore e apparato riproduttivo senza invasività. Preparare l'animale è semplice: digiuno di 8-12 ore per l'addome, vescica piena quando possibile. Il veterinario raderà una piccola area di pelo per migliorare il contatto della sonda. L'esame dura 15-30 minuti e l'animale rimane sveglio. L'ecocardiografia richiede competenze specialistiche e va eseguita da un cardiologo veterinario certificato.",
    costInfo: "L'ecografia addominale costa tra 60 e 120 euro, l'ecocardiografia tra 80 e 150 euro. Ecografie mirate (singolo organo) hanno costi inferiori, tra 40 e 70 euro. In caso di gravidanza, l'ecografia conferma la gestazione e monitora lo sviluppo dei cuccioli.",
    howToChoose: "La qualità dell'ecografia dipende dall'operatore quanto dall'apparecchiatura. Cerca ecografisti con formazione post-laurea specifica e apparecchi di ultima generazione con sonde ad alta frequenza per i piccoli animali.",
  },
  "analisi-sangue-veterinarie": {
    practicalAdvice: "Le analisi del sangue rivelano informazioni invisibili all'esame clinico: funzionalità epatica e renale, glicemia, emocromo, stato infiammatorio e molto altro. Per il tuo animale anziano (oltre i 7 anni), un check-up ematico annuale può individuare precocemente insufficienza renale, diabete o problemi tiroidei. Il prelievo è rapido e generalmente ben tollerato. Per i gatti, la vena giugulare è spesso preferita per ottenere campioni adeguati con minor stress.",
    costInfo: "L'emocromo base costa 20-40 euro, il profilo biochimico completo 50-100 euro. Un profilo geriatrico completo (emocromo, biochimica, elettroliti, urine) si aggira sui 80–150 euro. I tempi di refertazione variano da 20 minuti (laboratorio interno) a 2-3 giorni (laboratorio esterno).",
    howToChoose: "Le strutture con analizzatori interni forniscono risultati in 15-30 minuti, cruciali per le urgenze. Per analisi di routine, anche i laboratori esterni garantiscono accuratezza elevata con costi spesso inferiori.",
  },
  "test-allergie-veterinario": {
    practicalAdvice: "Le allergie negli animali si manifestano con prurito persistente, otiti ricorrenti, dermatiti e problemi gastrointestinali. I test allergologici — intradermici o sierologici — identificano gli allergeni specifici per impostare una terapia desensibilizzante mirata. Prima del test, potrebbe essere necessario sospendere antistaminici e cortisonici per 2-4 settimane. La dieta ad eliminazione è il gold standard per diagnosticare le allergie alimentari e richiede 8-12 settimane di rigore alimentare.",
    costInfo: "I test allergologici sierologici costano tra 100 e 250 euro per pannello. I test intradermici, più accurati, costano 150-300 euro. La terapia desensibilizzante ha un costo mensile di 30-60 euro per le fiale vaccinali.",
    howToChoose: "Rivolgiti a un dermatologo veterinario certificato per i casi complessi. L'interpretazione dei test allergologici richiede esperienza specifica — test mal interpretati portano a terapie inefficaci e frustrazione.",
  },
  "dermatologia-veterinaria": {
    practicalAdvice: "I problemi dermatologici sono tra i motivi più frequenti di visita veterinaria. Prurito, perdita di pelo, arrossamenti e lesioni cutanee possono avere cause molto diverse: parassiti, allergie, infezioni fungine o batteriche, malattie autoimmuni. Non utilizzare prodotti per uso umano sulla pelle del tuo animale. Evita bagni troppo frequenti che alterano il pH cutaneo. Fotografa le lesioni nel tempo per documentare l'evoluzione e aiutare il dermatologo nella diagnosi.",
    costInfo: "Una visita dermatologica specialistica costa tra 60 e 120 euro. Raschiati cutanei, esami citologici e colture fungine hanno costi aggiuntivi di 20-50 euro ciascuno. Le terapie dermatologiche croniche richiedono un budget mensile di 30-80 euro.",
    howToChoose: "Un buon dermatologo veterinario utilizza la videodermatoscopia e ha esperienza con le patologie specifiche della razza del tuo animale. Cerca specialisti che approfondiscano la causa invece di limitarsi a trattare i sintomi.",
  },
  "ortopedia-veterinaria": {
    practicalAdvice: "Zoppie, rigidità articolare e difficoltà nel movimento richiedono una valutazione ortopedica accurata. Prima della visita, filma il tuo animale mentre cammina e corre — i video sono preziosi per il veterinario perché molti animali mascherano la zoppia in ambulatorio. Per razze predisposte a displasia (Labrador, Pastore Tedesco, Golden Retriever), lo screening radiografico precoce a 12-18 mesi è fortemente raccomandato. La fisioterapia e l'idroterapia accelerano il recupero post-chirurgico.",
    costInfo: "Una visita ortopedica specialistica costa tra 60 e 100 euro. Le chirurgie ortopediche vanno da 800 euro (stabilizzazione di lussazione rotulea) a oltre 2.500 euro (TPLO per la rottura del crociato). La fisioterapia costa 30-60 euro a seduta.",
    howToChoose: "L'ortopedia veterinaria richiede esperienza chirurgica specifica. Chiedi quanti interventi del tipo necessario il chirurgo esegue annualmente. Strutture con fisioterapia integrata offrono un percorso riabilitativo più completo.",
  },
  "oftalmologia-veterinaria": {
    practicalAdvice: "Gli occhi degli animali sono organi delicati e le patologie oculari possono progredire rapidamente. Lacrimazione eccessiva, arrossamento, opacità del cristallino, occhio chiuso o sfregamento insistente sono segnali che richiedono una visita oculistica tempestiva. Non applicare colliri umani senza indicazione veterinaria: alcuni contengono principi attivi pericolosi. Le razze brachicefale (Bulldog, Carlino, Persiano) e quelle con occhi prominenti sono particolarmente predisposte a ulcere corneali.",
    costInfo: "La visita oculistica specialistica costa tra 60 e 120 euro e include esame con lampada a fessura, test di Schirmer e tonometria. Interventi chirurgici oculari (cataratta, entropion) vanno da 400 a 2.000 euro per occhio.",
    howToChoose: "L'oftalmologia veterinaria è una specializzazione avanzata. Cerca diplomati del College Europeo (ECVO) o veterinari con formazione specifica. L'attrezzatura diagnostica dedicata (lampada a fessura, tonometro, elettroretinografo) è indice di competenza.",
  },
  "cardiologia-veterinaria": {
    practicalAdvice: "Le cardiopatie sono comuni nei cani di taglia grande (cardiomiopatia dilatativa) e nei gatti (cardiomiopatia ipertrofica). Tosse notturna, affaticamento, respiro accelerato e svenimenti sono sintomi d'allarme. L'ecocardiografia è l'esame di riferimento per diagnosticare e monitorare le patologie cardiache. Per razze a rischio (Cavalier King, Dobermann, Maine Coon), lo screening cardiologico annuale a partire dai 3-4 anni è fondamentale per una diagnosi precoce.",
    costInfo: "L'ecocardiografia cardiologica costa tra 100 e 200 euro. Un work-up cardiologico completo (visita, ECG, eco, radiografie toraciche) si aggira sui 200-350 euro. Le terapie cardiologiche croniche hanno un costo mensile di 30-80 euro.",
    howToChoose: "La cardiologia veterinaria richiede competenze e attrezzature altamente specializzate. Cerca diplomati ECVIM-CA (Cardiology) o veterinari con formazione avanzata. L'ecocardiografia deve essere eseguita da un operatore esperto per essere diagnostica.",
  },
  "neurologia-veterinaria": {
    practicalAdvice: "Convulsioni, paralisi, inclinazione della testa, movimenti circolari e alterazioni del comportamento possono indicare patologie neurologiche. In caso di crisi convulsive, non tentare di aprire la bocca dell'animale: proteggi l'ambiente da oggetti pericolosi e cronometra la durata della crisi. Filma l'episodio — i video sono strumenti diagnostici preziosi per il neurologo. La risonanza magnetica è l'esame d'elezione per le patologie cerebrali e spinali.",
    costInfo: "Una visita neurologica specialistica costa tra 80 e 150 euro. La risonanza magnetica cerebrale o spinale costa 500-1.200 euro (inclusa anestesia). L'analisi del liquor cefalorachidiano costa 100-200 euro aggiuntivi.",
    howToChoose: "La neurologia è tra le specializzazioni più complesse. Cerca strutture con risonanza magnetica veterinaria dedicata e neurologi con esperienza documentata. La possibilità di eseguire diagnostica avanzata e neurochirurgia nella stessa struttura è un plus significativo.",
  },
  "oncologia-veterinaria": {
    practicalAdvice: "La diagnosi di tumore nel tuo animale è un momento difficile, ma molte neoplasie sono curabili se individuate precocemente. Controlla regolarmente il corpo del tuo animale alla ricerca di noduli, gonfiori o lesioni che non guariscono. La citologia con ago aspirato è il primo passo diagnostico per qualsiasi massa sospetta — è rapido, poco invasivo e spesso eseguibile senza sedazione. Discuti con l'oncologo tutte le opzioni: chirurgia, chemioterapia, radioterapia e cure palliative.",
    costInfo: "Una visita oncologica costa tra 60 e 120 euro. La citologia con ago aspirato costa 30-60 euro. Un ciclo di chemioterapia varia da 500 a 3.000 euro in base al protocollo. La radioterapia, disponibile in pochi centri, ha costi significativi.",
    howToChoose: "Cerca oncologi veterinari con accesso a diagnostica avanzata (istologia, immunoistochimica, staging completo). Un buon oncologo discute apertamente prognosi, qualità della vita e opzioni terapeutiche proporzionate.",
  },
  "microchip": {
    practicalAdvice: "Il microchip è obbligatorio per legge in Italia per tutti i cani e fortemente raccomandato per i gatti. È una capsula grande quanto un chicco di riso, iniettata sottocute nella regione del collo sinistro. La procedura è rapida, simile a una vaccinazione, e non richiede sedazione. Dopo l'impianto, il veterinario registra il codice nell'Anagrafe Canina regionale associandolo ai tuoi dati. Aggiorna i tuoi recapiti in caso di trasloco o cambio di numero — un microchip con dati obsoleti non serve.",
    costInfo: "L'applicazione del microchip costa tra 20 e 50 euro, inclusa la registrazione all'anagrafe. È un investimento una tantum per tutta la vita dell'animale. Alcune ASL offrono giornate di microchippatura gratuita.",
    howToChoose: "Qualsiasi veterinario abilitato può applicare il microchip. L'importante è verificare che la registrazione nell'Anagrafe Canina venga effettivamente completata — chiedi conferma e conserva il certificato con il codice.",
  },
  "sterilizzazione-animali": {
    practicalAdvice: "La sterilizzazione è uno degli interventi chirurgici più comuni e sicuri in medicina veterinaria. Per le femmine, la sterilizzazione precoce (prima del primo calore) riduce drasticamente il rischio di tumori mammari. Per i maschi, la castrazione riduce comportamenti indesiderati come marcatura, fughe e aggressività. L'animale deve essere a digiuno dalla sera precedente. La ripresa è rapida: la maggior parte dei cani e gatti torna alla normalità in 3-5 giorni.",
    costInfo: "La sterilizzazione della femmina costa tra 150 e 400 euro (cagna) e 100-250 euro (gatta). La castrazione del maschio costa tra 100 e 250 euro (cane) e 80-180 euro (gatto). I costi includono anestesia, intervento e farmaci post-operatori.",
    howToChoose: "Scegli una struttura con monitoraggio anestesiologico completo e possibilità di gestire eventuali complicanze. Chiedi quale tecnica chirurgica viene utilizzata (laparoscopia vs tradizionale) e se è incluso il ricovero giornaliero.",
  },
  "castrazione-animali": {
    practicalAdvice: "La castrazione è un intervento semplice e routinario che viene eseguito in anestesia generale. Per il cane maschio, l'intervento dura 20-40 minuti con dimissione in giornata. Per il gatto, è ancora più rapido. Dopo l'intervento, limita l'attività fisica per 7-10 giorni e utilizza il collare elisabettiano per proteggere la ferita. Gli effetti sul comportamento (riduzione della marcatura, minor tendenza alle fughe) si manifestano progressivamente nelle settimane successive.",
    costInfo: "La castrazione del cane maschio costa tra 100 e 250 euro, del gatto maschio tra 80 e 180 euro. I costi includono generalmente la visita pre-operatoria, l'anestesia e i farmaci. Alcune strutture offrono pacchetti che includono anche il microchip.",
    howToChoose: "L'esperienza del chirurgo è importante soprattutto per i cani criptorchidi (testicolo ritenuto), dove l'intervento è più complesso. Verifica che la struttura effettui un esame pre-anestesiologico e monitoraggio durante l'intervento.",
  },
  "check-up-veterinario": {
    practicalAdvice: "Il check-up veterinario completo va oltre la semplice visita clinica: include esami del sangue, delle urine e, per animali anziani, ecografia addominale e radiografia toracica. È lo strumento migliore per la medicina preventiva. Per cani e gatti sopra i 7 anni, un check-up semestrale può individuare precocemente insufficienza renale, diabete, patologie tiroidee e neoplasie. Porta con te una lista di domande e osservazioni — non trascurare cambiamenti sottili come aumento della sete o del volume urinario.",
    costInfo: "Un check-up base (visita + emocromo + biochimica) costa tra 80 e 150 euro. Un check-up completo geriatrico (aggiungendo urine, ecografia, radiografie) si aggira sui 200-350 euro. È un investimento che può prevenire spese molto più elevate.",
    howToChoose: "Preferisci strutture che offrano pacchetti check-up strutturati con protocolli basati sull'età e sulle esigenze specifiche della razza del tuo animale. La continuità con lo stesso veterinario è un valore aggiunto per il confronto nel tempo.",
  },
  "nutrizione-veterinaria": {
    practicalAdvice: "L'alimentazione è alla base della salute del tuo animale. Un veterinario nutrizionista può formulare diete personalizzate per crescita, mantenimento, gravidanza o gestione di patologie specifiche. Non improvvisare diete casalinghe senza supervisione: il rischio di carenze nutrizionali è concreto. Per il passaggio a un nuovo alimento, procedi gradualmente in 7-10 giorni mescolando vecchio e nuovo cibo in proporzioni crescenti per evitare disturbi gastrointestinali.",
    costInfo: "Una consulenza nutrizionale specialistica costa tra 50 e 100 euro e include la formulazione di un piano alimentare personalizzato. Il costo dell'alimentazione mensile varia enormemente in base alla tipologia (commerciale premium, casalinga, medicata).",
    howToChoose: "Cerca veterinari con specializzazione o master in nutrizione animale. Diffidate di chi consiglia un singolo brand commerciale senza valutare le esigenze specifiche del vostro animale.",
  },
  "consulenza-dieta-animale": {
    practicalAdvice: "La consulenza dietetica è fondamentale per animali con patologie metaboliche, allergie alimentari, obesità o esigenze nutrizionali particolari. Il veterinario nutrizionista analizza peso, condizione corporea, esami del sangue e stile di vita per formulare un piano alimentare su misura. Per le diete ad eliminazione, la compliance totale è essenziale: anche un piccolo sgarro può invalidare settimane di lavoro. Tieni un diario alimentare dettagliato da condividere con il professionista.",
    costInfo: "Una consulenza dietetica completa costa tra 50 e 100 euro. Le diete terapeutiche commerciali hanno un costo mensile di 40-120 euro in base alla taglia dell'animale. Le diete casalinghe formulate richiedono integratori specifici (20-40 euro al mese).",
    howToChoose: "Il nutrizionista veterinario ideale utilizza un approccio scientifico, basato su evidenze, e adatta la dieta alle condizioni cliniche, all'età e alle preferenze alimentari dell'animale. Evita chi propone approcci ideologici senza basi scientifiche.",
  },
  "trattamento-obesita-animale": {
    practicalAdvice: "L'obesità colpisce oltre il 40% degli animali domestici ed è un fattore di rischio per diabete, artrosi, malattie cardiache e riduzione dell'aspettativa di vita. La perdita di peso deve essere graduale (1-2% a settimana) e monitorata dal veterinario. Non ridurre semplicemente la quantità del cibo attuale: è necessaria una dieta ipocalorica bilanciata per evitare carenze. L'attività fisica va aumentata progressivamente. Elimina tutti gli snack fuori pasto e coinvolgi tutta la famiglia nel programma.",
    costInfo: "Il programma di dimagrimento con controlli periodici (pesate mensili, aggiustamento dieta) costa tra 30 e 60 euro per visita di follow-up. Le diete ipocaloriche commerciali costano il 20-30% in più rispetto ai mangimi standard.",
    howToChoose: "Scegli un veterinario che affronti il sovrappeso come una vera patologia, con obiettivi chiari e controlli regolari. Un buon programma include valutazione del BCS (Body Condition Score), piano alimentare personalizzato e programma di attività fisica.",
  },
  "veterinario-notturno": {
    practicalAdvice: "Sapere dove trovare un veterinario notturno prima che ne serva uno può salvare la vita al tuo animale. Salva i numeri delle cliniche con servizio notturno nella tua zona e verifica periodicamente che siano ancora attivi. Di notte, chiama prima di recarti alla struttura per confermare la disponibilità e descrivere la situazione. Trasporta l'animale in modo sicuro, con un trasportino o avvolto in una coperta. Porta il libretto sanitario e la lista dei farmaci assunti.",
    costInfo: "Le visite notturne hanno un sovrapprezzo del 30-100% rispetto alle tariffe diurne, generalmente tra 70 e 200 euro per la sola visita. È un costo giustificato dalla reperibilità del personale specializzato in orari non ordinari.",
    howToChoose: "Verifica che la struttura notturna abbia personale medico e non solo infermieristico presente. La possibilità di eseguire diagnostica d'urgenza (radiografie, ecografie, esami del sangue) e interventi chirurgici notturni è un criterio fondamentale.",
  },
  "veterinario-h24": {
    practicalAdvice: "Le cliniche veterinarie H24 garantiscono assistenza continuativa, incluso il ricovero con monitoraggio costante. Sono la scelta ideale per emergenze gravi, post-operatori complessi e animali in condizioni critiche. A differenza del semplice servizio notturno su chiamata, le strutture H24 hanno personale medico sempre presente in sede. Individua la clinica H24 più vicina e salva il numero: in emergenza, non avrai tempo di cercare.",
    costInfo: "Le tariffe delle strutture H24 possono essere leggermente superiori per via dei costi operativi della presenza continua. La visita d'urgenza costa tra 50 e 150 euro, il ricovero giornaliero con monitoraggio tra 100 e 300 euro.",
    howToChoose: "Una vera clinica H24 ha medici veterinari in sede — non solo reperibili telefonicamente — 24 ore su 24, 365 giorni l'anno. Verifica le attrezzature disponibili: terapia intensiva, ossigenoterapia, diagnostica d'urgenza e sala operatoria sempre pronta.",
  },
  "veterinario-emergenza": {
    practicalAdvice: "In emergenza, la rapidità è tutto. Chiama la struttura mentre sei in viaggio per anticipare il tuo arrivo e permettere al team di prepararsi. Descrivi brevemente i sintomi, il peso approssimativo e l'età dell'animale. Durante il trasporto, parla al tuo animale con tono calmo e rassicurante. Per emorragie, applica pressione con un panno pulito. Per sospetto avvelenamento, porta con te il contenitore della sostanza ingerita. Non dare cibo, acqua o farmaci senza indicazione veterinaria.",
    costInfo: "I costi dell'emergenza veterinaria variano in base alla gravità: da 50-100 euro per la visita d'urgenza a migliaia di euro per interventi chirurgici d'emergenza e ricovero in terapia intensiva. Molte strutture accettano pagamento rateizzato per le emergenze.",
    howToChoose: "Per le emergenze, la priorità è la vicinanza e la disponibilità immediata. Verifica in anticipo quali strutture nella tua zona offrono servizio d'urgenza e in quali orari. Salva almeno 2-3 numeri per avere alternative.",
  },
  "veterinario-rurale": {
    practicalAdvice: "Il veterinario rurale si occupa di animali da reddito (bovini, ovini, caprini, suini, avicoli) e animali da cortile. A differenza della medicina dei piccoli animali, l'approccio è spesso di mandria piuttosto che individuale. Il veterinario aziendale effettua visite programmate, gestisce i piani vaccinali obbligatori, certifica la salubrità dei prodotti e supervisiona il benessere degli animali. La collaborazione continua tra allevatore e veterinario è la chiave per produzioni sane e redditizie.",
    costInfo: "Le tariffe del veterinario rurale sono spesso calcolate per visita aziendale (100-200 euro) o per contratto annuale di assistenza. I piani sanitari obbligatori e le certificazioni hanno costi regolamentati dalle ASL veterinarie.",
    howToChoose: "Il veterinario rurale ideale conosce il territorio, le normative sanitarie locali e ha esperienza specifica con le specie allevate nella tua azienda. La disponibilità per le urgenze (parti difficili, patologie acute) è un criterio fondamentale.",
  },
  "veterinario-equino": {
    practicalAdvice: "I cavalli richiedono un approccio veterinario specializzato: le patologie equine hanno tempistiche e gravità diverse dagli animali da compagnia. Le coliche — tra le emergenze più frequenti — possono diventare fatali in poche ore e richiedono intervento immediato. Programma visite dentistiche annuali, vaccinazioni (tetano, influenza), vermifugazioni strategiche e controlli ortopedici regolari. Il monitoraggio quotidiano dei parametri vitali (temperatura, frequenza cardiaca, motilità intestinale) è fondamentale.",
    costInfo: "Una visita equina in scuderia costa tra 80 e 150 euro più lo spostamento. La dentistica equina costa 80-200 euro a seduta. Le ecografie muscoloscheletriche costano 80-120 euro per arto. Le chirurgie delle coliche possono superare i 5.000 euro.",
    howToChoose: "Scegli un veterinario equino con esperienza documentata e attrezzatura portatile adeguata (ecografo, radiografo digitale). Per la chirurgia, verifica la disponibilità di una clinica equina con sala operatoria e possibilità di ricovero.",
  },
  "tac-veterinaria": {
    practicalAdvice: "La TAC (Tomografia Assiale Computerizzata) veterinaria è una diagnostica avanzata che produce immagini tridimensionali dettagliate di ossa, organi e tessuti molli. Richiede l'anestesia generale per mantenere l'animale perfettamente immobile durante l'acquisizione. Il digiuno pre-anestesiologico è obbligatorio (12 ore per il cibo, 2-4 ore per l'acqua). L'esame dura 15-30 minuti ma l'anestesia complessiva richiede 1-2 ore. È indicata per patologie neurologiche, nasali, oncologiche e ortopediche complesse.",
    costInfo: "Una TAC veterinaria costa tra 400 e 800 euro, inclusa l'anestesia generale e il referto specialistico. TAC con mezzo di contrasto hanno un costo aggiuntivo di 50-100 euro. È disponibile solo in centri specializzati e cliniche di referenza.",
    howToChoose: "La TAC veterinaria è disponibile in poche strutture di referenza. Verifica che il radiologo abbia formazione specifica nell'interpretazione delle immagini TC veterinarie e che l'anestesista sia esperto di anestesia nei piccoli animali.",
  },
  "risonanza-magnetica-veterinaria": {
    practicalAdvice: "La risonanza magnetica (RM) è l'esame d'eccellenza per le patologie del sistema nervoso centrale, della colonna vertebrale e dei tessuti molli. A differenza della TAC, non utilizza radiazioni ma campi magnetici, offrendo un contrasto superiore per cervello, midollo spinale e articolazioni. Richiede anestesia generale prolungata (45-90 minuti di acquisizione). È fondamentale per diagnosticare ernie discali, tumori cerebrali, encefaliti e patologie articolari complesse.",
    costInfo: "La RM veterinaria costa tra 600 e 1.500 euro, inclusa anestesia e referto del neurologo/radiologo. I centri che offrono questo servizio in Italia sono ancora limitati, il che può richiedere spostamenti significativi.",
    howToChoose: "Cerca centri con RM ad alto campo (1.5 Tesla o superiore) e neurologi/radiologi veterinari specializzati nell'interpretazione delle immagini. La collaborazione tra neurologo e radiologo è essenziale per una diagnosi accurata.",
  },
  "endoscopia-veterinaria": {
    practicalAdvice: "L'endoscopia permette di visualizzare direttamente l'interno dell'apparato digerente, respiratorio e urinario attraverso una sonda flessibile con telecamera. È utilizzata sia per la diagnosi (biopsie, visualizzazione di lesioni) sia per il trattamento (rimozione di corpi estranei, polipectomia). L'animale deve essere a digiuno da 12-24 ore e l'esame richiede anestesia generale. La gastroscopia e la colonscopia sono le procedure più comuni. Il recupero è rapido con dimissione solitamente in giornata.",
    costInfo: "Un'endoscopia diagnostica costa tra 300 e 600 euro (inclusa anestesia). La rimozione endoscopica di corpi estranei costa 400-800 euro. Le biopsie hanno un costo aggiuntivo di 50-100 euro per l'esame istologico.",
    howToChoose: "L'endoscopia richiede attrezzatura specifica e operatori esperti. Verifica che la struttura disponga di endoscopi flessibili e rigidi di diverso diametro, adatti alla taglia del paziente, e che l'operatore abbia formazione dedicata.",
  },
  "endocrinologia-veterinaria": {
    practicalAdvice: "Le malattie endocrine (diabete, ipotiroidismo, ipertiroidismo, Cushing, Addison) richiedono diagnosi precisa e terapia a lungo termine. I sintomi sono spesso subdoli: aumento della sete e della minzione, variazioni di peso, alterazioni del pelo e letargia. La diagnosi si basa su esami del sangue specifici (ormoni tiroidei, cortisolo, glicemia, fruttosamina). Una volta in terapia, i controlli periodici sono essenziali per aggiustare i dosaggi farmacologici.",
    costInfo: "Gli esami endocrini specifici costano tra 40 e 120 euro per test (T4, cortisolo basale, test di stimolazione). La terapia farmacologica cronica ha un costo mensile di 20-80 euro. I controlli periodici (ogni 3-6 mesi) richiedono esami del sangue di monitoraggio.",
    howToChoose: "L'endocrinologia veterinaria richiede competenze specifiche per l'interpretazione di test diagnostici complessi. Cerca veterinari con esperienza documentata nella gestione a lungo termine di pazienti diabetici, ipotiroidei o con sindrome di Cushing.",
  },
  "asilo-per-animali": {
    practicalAdvice: "L'asilo per animali (pensione) ospita il tuo animale durante le tue assenze. Prima del soggiorno, verifica che le vaccinazioni siano aggiornate — la maggior parte delle strutture richiede libretto sanitario con vaccini in regola e trattamento antiparassitario recente. Porta il cibo abituale per evitare disturbi gastrointestinali da cambio alimentare. Un oggetto con il tuo odore (maglietta, coperta) può ridurre lo stress della separazione. Effettua una visita preventiva alla struttura prima di prenotare.",
    costInfo: "Le tariffe giornaliere variano da 15 a 40 euro per cani e 10-25 euro per gatti, con sconti per soggiorni prolungati. Le pensioni di lusso con servizi aggiuntivi (passeggiate, grooming, webcam) possono costare 40-80 euro al giorno.",
    howToChoose: "Visita la struttura di persona: controlla pulizia, dimensioni dei box, aree di sgambamento e rapporto operatori/animali. Chiedi se gli animali vengono separati per taglia e temperamento. La presenza di un veterinario convenzionato è un plus importante.",
  },
  "pet-sitter": {
    practicalAdvice: "Il pet-sitter accudisce il tuo animale a casa tua o presso la propria abitazione, offrendo un'alternativa meno stressante alla pensione. Prima dell'incarico, organizza un incontro conoscitivo tra pet-sitter e animale. Lascia istruzioni scritte dettagliate su alimentazione, farmaci, abitudini e numeri di emergenza (veterinario di fiducia, tuo recapito). Assicurati che il pet-sitter sappia come gestire situazioni impreviste e dove si trova il veterinario più vicino.",
    costInfo: "Un pet-sitter a domicilio costa tra 10 e 30 euro per visita (1-2 ore) o 30-60 euro per una giornata intera. Il pernottamento a casa tua costa tra 40 e 80 euro. I costi variano in base alla zona, al numero di animali e ai servizi richiesti.",
    howToChoose: "Cerca pet-sitter con referenze verificabili e, possibilmente, con assicurazione RC. L'esperienza con la tua specie animale è importante. Chiedi come gestisce le emergenze mediche e se ha competenze di primo soccorso animale.",
  },
  "dog-walking": {
    practicalAdvice: "Il dog-walking professionale è un servizio prezioso per chi lavora a tempo pieno e non può garantire al cane le uscite quotidiane necessarie. Un buon dog-walker gestisce piccoli gruppi (massimo 3-4 cani compatibili tra loro) e conosce i percorsi sicuri della zona. Comunica le esigenze specifiche del tuo cane: teme altri cani, tira al guinzaglio, ha richiamo? Verifica che il dog-walker sia assicurato e che trasporti i cani in sicurezza.",
    costInfo: "Una passeggiata di 30-45 minuti costa tra 8 e 15 euro, un'uscita di un'ora tra 12 e 25 euro. Pacchetti settimanali (5 uscite) offrono sconti del 10-20%. Uscite individuali costano di più rispetto ai gruppi.",
    howToChoose: "Il dog-walker ideale è puntuale, affidabile e sa leggere il linguaggio corporeo dei cani. Chiedi come gestisce incontri con cani liberi e situazioni impreviste. Referenze di altri clienti e assicurazione RC sono imprescindibili.",
  },
  "toelettatura": {
    practicalAdvice: "La toelettatura non è solo estetica: è prevenzione. Un pelo trascurato può nascondere parassiti, irritazioni cutanee e noduli. La frequenza del bagno dipende dalla razza e dallo stile di vita: ogni 4-8 settimane per la maggior parte dei cani, meno frequentemente per i gatti. Non usare prodotti per umani — il pH della pelle animale è diverso. La toelettatura è anche un momento di controllo: un toelettatore esperto può segnalare anomalie cutanee, noduli o parassiti al tuo veterinario.",
    costInfo: "Un bagno con asciugatura costa tra 20 e 50 euro in base alla taglia. Taglio completo con bagno: 30-80 euro. Stripping per razze a pelo duro: 50-100 euro. Trattamenti aggiuntivi (denti, orecchie, ghiandole anali) costano 5-15 euro ciascuno.",
    howToChoose: "Scegli un toelettatore che conosca le specificità della razza del tuo cane e che utilizzi prodotti professionali di qualità. L'ambiente deve essere pulito, ben ventilato e privo di odori sgradevoli. Chiedi come gestisce gli animali ansiosi o non collaborativi.",
  },
};
