# VeterinarioVicino.it — Sintesi Tecnica Completa

> Ultimo aggiornamento: 12 marzo 2026  
> Versione: 1.0

---

## 1. Panoramica del Progetto

**VeterinarioVicino.it** è una piattaforma web di ricerca e scoperta di servizi veterinari in Italia.  
L'obiettivo è collegare proprietari di animali con veterinari e strutture nella loro zona, attraverso un'interfaccia ottimizzata per SEO locale, AI-search e UX mobile-first.

- **Dominio**: https://veterinariovicino.it
- **Area iniziale**: Salento / Puglia (espandibile a tutta Italia)
- **Stack**: React 18 + Vite + TypeScript + Tailwind CSS + Framer Motion
- **Componenti UI**: shadcn/ui (Radix UI)
- **Routing**: React Router v6
- **Backend**: Nessuno al momento (dati statici in `src/data/`)

---

## 2. Architettura dei File

```
src/
├── App.tsx                    # Router principale
├── main.tsx                   # Entry point
├── index.css                  # Design tokens CSS (HSL)
│
├── config/
│   └── site.ts                # Configurazione globale, animali, servizi, aree
│
├── data/                      # Layer dati centralizzato
│   ├── types.ts               # Interfacce TypeScript (Region, Province, City, Clinic, Service, Guide)
│   ├── index.ts               # Funzioni di accesso dati (getCity, getClinic, etc.)
│   ├── regions.ts             # Regioni italiane
│   ├── provinces.ts           # Province
│   ├── cities.ts              # Città con metadati SEO
│   ├── clinics.ts             # Strutture veterinarie
│   ├── services.ts            # Servizi veterinari (20+)
│   ├── guides.ts              # Guide editoriali (20+)
│   ├── keywords.ts            # Pattern URL per SEO programmatico
│   └── faqs.ts                # FAQ globali
│
├── components/                # Componenti riutilizzabili
│   ├── Header.tsx             # Navbar con logo e navigazione
│   ├── Footer.tsx             # Footer con link e branding
│   ├── SmartFinder.tsx        # Finder multi-step → redirect /richiedi-assistenza/ (stesso flusso account+chat)
│   ├── AnswerSummary.tsx      # Blocco risposta diretta per AI-search
│   ├── QuickFacts.tsx         # Griglia fatti rapidi strutturati
│   ├── ClinicCard.tsx         # Card per struttura veterinaria
│   ├── ServiceCard.tsx        # Card per servizio
│   ├── AnimalCard.tsx         # Card per animale
│   ├── FaqSection.tsx         # Sezione FAQ con accordion
│   ├── EmergencyBlock.tsx     # Blocco informazioni emergenza
│   ├── VetDisclaimer.tsx      # Disclaimer medico-veterinario
│   ├── EditorialInfo.tsx      # Info editoriali e ultimo aggiornamento
│   ├── AreaCoverage.tsx       # Zone coperte dal servizio
│   ├── PageMeta.tsx           # Meta tag + JSON-LD
│   ├── PageCTA.tsx            # Call-to-action di pagina
│   ├── Breadcrumbs.tsx        # Breadcrumb navigazione
│   ├── RelatedLinks.tsx       # Link correlati
│   ├── StickyMobileCTA.tsx    # CTA mobile sticky bottom
│   ├── TrustBadge.tsx         # Badge di fiducia
│   ├── TrustModules.tsx       # Moduli fiducia homepage
│   ├── Disclaimer.tsx         # Disclaimer generico
│   └── ui/                    # Componenti shadcn/ui (40+)
│
├── pages/                     # Pagine con routing diretto
│   ├── Index.tsx              # Homepage
│   ├── DirectoryPage.tsx      # /elenco/ — directory strutture
│   ├── RequestPage.tsx        # /richiedi-assistenza/ — form richiesta
│   ├── ServiziPage.tsx        # /servizi/ — hub servizi per categoria
│   ├── GuidesIndex.tsx        # /guide/ — indice guide
│   ├── SitemapPage.tsx        # /sitemap-dynamic — XML sitemap
│   ├── SitemapHtmlPage.tsx    # /mappa-sito/ — sitemap HTML
│   ├── SingleSlugResolver.tsx # Disambiguatore per rotte /:slug/
│   └── NotFound.tsx           # 404
│
├── templates/                 # Template riutilizzabili per SEO programmatico
│   ├── RegionPage.tsx         # /:regionSlug/
│   ├── ProvincePage.tsx       # /:regionSlug/:provinceSlug/
│   ├── CityPage.tsx           # /:regionSlug/:provinceSlug/:citySlug/
│   ├── CityServicePage.tsx    # /:regionSlug/:provinceSlug/:citySlug/:serviceSlug/
│   ├── ServicePage.tsx        # /:serviceSlug/ (servizio generico)
│   ├── ProfilePage.tsx        # /struttura/:slug/ (profilo clinica)
│   ├── GuidePage.tsx          # /guide/:guideSlug/
│   ├── KeywordCityPage.tsx         # /veterinario-{city}/, /veterinario-h24-{city}/, etc.
│   ├── KeywordAnimalCityPage.tsx   # /veterinario-cane-{city}/, /veterinario-esotici-{city}/
│   ├── KeywordServiceCityPage.tsx  # /veterinario-dermatologia-{city}/, /veterinario-ortopedia-{city}/
│   ├── KeywordAnimalPage.tsx       # /veterinario-cane/, /veterinario-gatto/ (senza città)
│   └── KeywordSpecialtyPage.tsx    # /veterinario-nutrizionista/, /veterinario-ortopedico/
│
├── lib/
│   ├── seo.ts                 # Generatori JSON-LD (WebPage, FAQ, Breadcrumb)
│   ├── sitemap.ts             # Generatore sitemap XML dinamica
│   └── utils.ts               # Utility (cn, merge classi)
│
└── hooks/
    ├── use-mobile.tsx         # Hook per rilevamento mobile
    └── use-toast.ts           # Hook per toast notifications
```

---

## 3. Sistema di Routing e URL

### 3.1 Rotte Statiche

| URL | Pagina | Descrizione |
|-----|--------|-------------|
| `/` | Index | Homepage con finder, servizi, animali, guide |
| `/servizi/` | ServiziPage | Hub servizi raggruppati per categoria |
| `/elenco/` | DirectoryPage | Elenco strutture veterinarie |
| `/richiedi-assistenza/` | RequestPage | Form richiesta assistenza |
| `/guide/` | GuidesIndex | Indice guide veterinarie |
| `/mappa-sito/` | SitemapHtmlPage | Sitemap HTML navigabile |
| `/sitemap-dynamic` | SitemapPage | Sitemap XML per motori di ricerca |

### 3.2 Rotte Gerarchiche (Geo)

| Pattern URL | Template | Esempio |
|------------|----------|---------|
| `/:regionSlug/` | RegionPage | `/puglia/` |
| `/:regionSlug/:provinceSlug/` | ProvincePage | `/puglia/lecce/` |
| `/:regionSlug/:provinceSlug/:citySlug/` | CityPage | `/puglia/lecce/lecce/` |
| `/:regionSlug/:provinceSlug/:citySlug/:serviceSlug/` | CityServicePage | `/puglia/lecce/lecce/visita-veterinaria/` |

### 3.3 Rotte Keyword SEO (Pattern Programmatici)

Tutte gestite da `SingleSlugResolver.tsx` → `resolveKeywordSlug()`:

| Pattern | Template | Esempio | Tipo |
|---------|----------|---------|------|
| `/veterinario-{city}/` | KeywordCityPage | `/veterinario-lecce/` | city |
| `/clinica-veterinaria-{city}/` | KeywordCityPage | `/clinica-veterinaria-lecce/` | city |
| `/veterinario-h24-{city}/` | KeywordCityPage | `/veterinario-h24-lecce/` | city |
| `/pronto-soccorso-veterinario-{city}/` | KeywordCityPage | `/pronto-soccorso-veterinario-lecce/` | city |
| `/veterinario-cane-{city}/` | KeywordAnimalCityPage | `/veterinario-cane-lecce/` | animal-city |
| `/veterinario-gatto-{city}/` | KeywordAnimalCityPage | `/veterinario-gatto-lecce/` | animal-city |
| `/veterinario-esotici-{city}/` | KeywordAnimalCityPage | `/veterinario-esotici-lecce/` | animal-city |
| `/veterinario-cavallo-{city}/` | KeywordAnimalCityPage | `/veterinario-cavallo-lecce/` | animal-city |
| `/veterinario-dermatologia-{city}/` | KeywordServiceCityPage | `/veterinario-dermatologia-lecce/` | service-city |
| `/veterinario-ortopedia-{city}/` | KeywordServiceCityPage | `/veterinario-ortopedia-lecce/` | service-city |
| `/veterinario-cardiologia-{city}/` | KeywordServiceCityPage | `/veterinario-cardiologia-lecce/` | service-city |
| `/veterinario-nutrizione-{city}/` | KeywordServiceCityPage | `/veterinario-nutrizione-lecce/` | service-city |
| `/veterinario-oftalmologia-{city}/` | KeywordServiceCityPage | `/veterinario-oftalmologia-lecce/` | service-city |
| `/veterinario-ecografia-{city}/` | KeywordServiceCityPage | `/veterinario-ecografia-lecce/` | service-city |
| `/veterinario-radiografia-{city}/` | KeywordServiceCityPage | `/veterinario-radiografia-lecce/` | service-city |
| `/veterinario-chirurgia-{city}/` | KeywordServiceCityPage | `/veterinario-chirurgia-lecce/` | service-city |
| `/veterinario-cane/` | KeywordAnimalPage | — | animal (no city) |
| `/veterinario-gatto/` | KeywordAnimalPage | — | animal (no city) |
| `/veterinario-nutrizionista/` | KeywordSpecialtyPage | — | specialty |
| `/veterinario-ortopedico/` | KeywordSpecialtyPage | — | specialty |

### 3.4 Come Funziona il Resolver

Il file `src/pages/SingleSlugResolver.tsx` gestisce tutte le rotte `/:slug/`.  
La funzione `resolveKeywordSlug(slug)` in `src/data/keywords.ts` risolve gli slug nell'ordine:

1. **Match esatto**: pagine animale (`veterinario-cane`) e specialty (`veterinario-nutrizionista`)
2. **Prefisso service-city**: pattern più lunghi prima (es. `veterinario-dermatologia-`)
3. **Prefisso animal-city**: (es. `veterinario-cane-`)
4. **Prefisso city**: ordinati per lunghezza decrescente (es. `pronto-soccorso-veterinario-` prima di `veterinario-`)
5. **Servizio**: match su slug servizio (`visita-veterinaria`, etc.)
6. **Regione**: match su slug regione (`puglia`, etc.)
7. **404**: se nessun match

---

## 4. Layer Dati (`src/data/`)

### 4.1 Struttura Dati

Tutti i dati sono in file TypeScript statici. Le interfacce sono definite in `src/data/types.ts`:

#### Region
```typescript
interface Region {
  slug: string;           // "puglia"
  name: string;           // "Puglia"
  metaTitle: string;
  metaDescription: string;
  intro: string;
  provinces: string[];    // ["lecce", "brindisi", "taranto", "bari"]
  featuredCities: string[];
}
```

#### Province
```typescript
interface Province {
  slug: string;           // "lecce"
  name: string;           // "Lecce"
  regionSlug: string;     // "puglia"
  metaTitle: string;
  metaDescription: string;
  intro: string;
  cities: string[];       // ["lecce", "gallipoli", "nardo", ...]
  cap?: string;
}
```

#### City
```typescript
interface City {
  slug: string;           // "lecce"
  name: string;           // "Lecce"
  provinceSlug: string;   // "lecce"
  regionSlug: string;     // "puglia"
  cap: string;            // "73100"
  metaTitle: string;
  metaDescription: string;
  intro: string;          // Testo introduttivo unico per la città
  population?: string;    // "~95.000"
  nearbyCities: string[]; // ["nardo", "galatina", "copertino"]
}
```

#### Clinic
```typescript
interface Clinic {
  slug: string;
  name: string;
  type: "clinica" | "ambulatorio" | "veterinario";
  citySlug: string;
  provinceSlug: string;
  regionSlug: string;
  address?: string;
  phone?: string;
  email?: string;
  services: string[];         // slug dei servizi offerti
  animals: string[];          // ID degli animali trattati
  openingHours?: string;
  emergencyAvailable: boolean;
  homeVisits: boolean;
  verified: boolean;
  featured: boolean;
  lastUpdated: string;
  description: string;
  ctaLabel: string;
  metaTitle: string;
  metaDescription: string;
}
```

#### ServicePage
```typescript
interface ServicePage {
  slug: string;               // "visita-veterinaria"
  name: string;               // "Visita veterinaria"
  category?: ServiceCategory; // "diagnostica" | "specialistica" | "prevenzione" | "nutrizione" | "emergenza" | "generale"
  icon: string;               // emoji
  metaTitle: string;
  metaDescription: string;
  definition: string;         // Definizione breve per AI-search
  intro: string;
  bulletPoints: string[];
  commonSituations: string[];
  emergencySigns: string[];
  whenToSeek: string;
  whatToExpect: string;
  whoIsFor: string;
  disclaimer: string;
  relatedServices: string[];
  faq: { q: string; a: string }[];
}
```

#### Guide
```typescript
interface Guide {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  definition: string;
  intro: string;
  keyPoints: string[];
  commonSituations: string[];
  emergencySigns: string[];
  whenToContact: string;
  whatToPrepare: string;
  content: string;
  relatedServices: string[];
  relatedCities: string[];
  animal?: string;
  disclaimer: string;
  faq: { q: string; a: string }[];
}
```

### 4.2 Funzioni di Accesso (src/data/index.ts)

```typescript
getCity(slug: string): City | undefined
getProvince(slug: string): Province | undefined
getRegion(slug: string): Region | undefined
getService(slug: string): ServicePage | undefined
getClinic(slug: string): Clinic | undefined
getGuide(slug: string): Guide | undefined
getClinicsByCity(citySlug: string): Clinic[]
getClinicsByProvince(provinceSlug: string): Clinic[]
getClinicsByAnimal(animalId: string): Clinic[]
getClinicsWithEmergency(): Clinic[]
getClinicsWithHomeVisits(): Clinic[]
getFeaturedClinics(): Clinic[]
getAllServices(): ServicePage[]
getAllCities(): City[]
getAllGuides(): Guide[]
```

### 4.3 Dati Attualmente Presenti

| Dataset | Quantità | Note |
|---------|----------|------|
| Regioni | 1 | Puglia |
| Province | 4 | Lecce, Brindisi, Taranto, Bari |
| Città | ~20 | Lecce, Gallipoli, Nardò, Otranto, Galatina, Maglie, Casarano, Tricase, Copertino, Ugento, Brindisi, Ostuni, Fasano, Francavilla Fontana, Mesagne, Taranto, Martina Franca, Manduria, Grottaglie, Massafra, Bari, Monopoli, Altamura, Bitonto, Conversano |
| Cliniche | ~15 | Strutture di esempio (non verificate) |
| Servizi | 20+ | Distribuiti in 6 categorie |
| Guide | 20 | Sintomi, emergenze, prevenzione, nutrizione, viaggio |
| Animali | 30+ | In 5 categorie |

---

## 5. Categorie Animali

Definite in `src/config/site.ts`:

### 5.1 Animali da compagnia 🏠
cane, gatto, coniglio, furetto, criceto, cavia, gerbillo, cincillà

### 5.2 Animali esotici 🦎
tartaruga, serpente, lucertola, iguana, geco, rana, pesci ornamentali

### 5.3 Uccelli 🦜
pappagallo, canarino, parrocchetto, rapaci, avicoli ornamentali

### 5.4 Animali da fattoria 🐴
cavallo, mucca, pecora, capra, maiale, gallina, tacchino

### 5.5 Animali da lavoro 🏇
cavallo sportivo, cane da caccia, cane pastore

Il sistema SmartFinder usa un flusso a 2 step: l'utente seleziona prima la **categoria** e poi l'**animale specifico**.  
I servizi disponibili cambiano in base alla categoria dell'animale (es. servizi equini per i cavalli).

---

## 6. Catalogo Servizi Veterinari

Definiti in `src/data/services.ts`, raggruppati per categoria:

### 6.1 Generale
- Visita veterinaria (`visita-veterinaria`)
- Vaccinazioni (`vaccinazioni`)
- Chirurgia veterinaria (`chirurgia-veterinaria`)
- Veterinario a domicilio (`veterinario-a-domicilio`)
- Veterinario per gatti (`veterinario-per-gatti`)
- Veterinario animali esotici (`veterinario-animali-esotici`)
- Veterinario equino (`veterinario-equino`)
- Veterinario rurale (`veterinario-rurale`)

### 6.2 Diagnostica
- Esami e analisi del sangue (`esami-analisi`)
- Ecografia e radiologia (`ecografia-radiologia`)
- Radiografia veterinaria (`radiografia-veterinaria`)
- Test allergie veterinario (`test-allergie-veterinario`)
- Analisi urine veterinario (`analisi-urine-veterinario`)

### 6.3 Specialistica
- Dermatologia veterinaria (`dermatologia-veterinaria`)
- Ortopedia veterinaria (`ortopedia-veterinaria`)
- Oftalmologia veterinaria (`oftalmologia-veterinaria`)
- Cardiologia veterinaria (`cardiologia-veterinaria`)
- Neurologia veterinaria (`neurologia-veterinaria`)
- Oncologia veterinaria (`oncologia-veterinaria`)

### 6.4 Prevenzione
- Microchip (`microchip`)
- Sterilizzazione (`sterilizzazione`)
- Check-up veterinario (`check-up-veterinario`)
- Prevenzione antiparassitaria (`prevenzione-antiparassitaria`)

### 6.5 Nutrizione
- Nutrizione veterinaria (`nutrizione-veterinaria`)
- Consulenza dieta animale (`consulenza-dieta-animale`)
- Obesità animali (`obesita-animali`)

### 6.6 Emergenza
- Pronto soccorso veterinario (`pronto-soccorso-veterinario`)
- Veterinario H24 (`veterinario-h24`)
- Veterinario notturno (`veterinario-notturno`)
- Urgenze veterinarie (`urgenze-veterinarie`)

---

## 7. Guide Editoriali

Definite in `src/data/guides.ts`. Ogni guida include: definizione, introduzione, punti chiave, situazioni comuni, segnali d'emergenza, quando contattare il veterinario, cosa preparare, FAQ e disclaimer.

### Guida attualmente presenti:

| Slug | Titolo | Animale |
|------|--------|---------|
| `cane-vomita-quando-chiamare-veterinario` | Il cane vomita: quando chiamare il veterinario? | Cane |
| `gatto-non-mangia-cosa-fare` | Il gatto non mangia: cosa fare? | Gatto |
| `quando-andare-pronto-soccorso-veterinario` | Quando andare al pronto soccorso veterinario | — |
| `prima-visita-cucciolo-cosa-sapere` | Prima visita del cucciolo: cosa sapere | Cane |
| `sterilizzazione-gatto-quando-farla` | Sterilizzazione del gatto | Gatto |
| `cane-zoppica-cause-cosa-fare` | Il cane zoppica: possibili cause e cosa fare | Cane |
| `cane-diarrea-quando-preoccuparsi` | Diarrea nel cane: quando preoccuparsi | Cane |
| `cane-non-mangia-cause-rimedi` | Il cane non mangia: cause e rimedi | Cane |
| `gatto-vomita-quando-preoccuparsi` | Il gatto vomita: quando preoccuparsi | Gatto |
| `gatto-perde-pelo-cause` | Il gatto perde pelo: cause | Gatto |
| `cane-avvelenato-cosa-fare` | Cane avvelenato: cosa fare | Cane |
| `gatto-avvelenato-cosa-fare` | Gatto avvelenato: cosa fare | Gatto |
| `primo-soccorso-cani-guida` | Primo soccorso per cani | Cane |
| `vaccinazioni-cane-guida` | Vaccinazioni del cane | Cane |
| `vaccinazioni-gatto-guida` | Vaccinazioni del gatto | Gatto |
| `microchip-cane-obbligatorio-guida` | Microchip per cani | Cane |
| `prevenzione-parassiti-cane-gatto` | Prevenzione antiparassitaria | — |
| `alimentazione-casalinga-cane` | Alimentazione casalinga per cani | Cane |
| `alimentazione-casalinga-gatto` | Alimentazione casalinga per gatti | Gatto |
| `viaggiare-con-cane-guida` | Viaggiare con il cane | Cane |
| `viaggiare-con-gatto-consigli` | Viaggiare con il gatto | Gatto |

---

## 8. Pattern SEO Programmatico

### 8.1 City Keyword Patterns (`cityKeywordPatterns`)
4 pattern × N città = pagine generate:
- `veterinario-{city}`
- `clinica-veterinaria-{city}`
- `veterinario-h24-{city}`
- `pronto-soccorso-veterinario-{city}`

### 8.2 Animal-City Patterns (`animalCityKeywordPatterns`)
4 pattern × N città:
- `veterinario-cane-{city}`
- `veterinario-gatto-{city}`
- `veterinario-esotici-{city}`
- `veterinario-cavallo-{city}`

### 8.3 Service-City Patterns (`serviceCityKeywordPatterns`)
8 pattern × N città:
- `veterinario-dermatologia-{city}`
- `veterinario-ortopedia-{city}`
- `veterinario-cardiologia-{city}`
- `veterinario-nutrizione-{city}`
- `veterinario-oftalmologia-{city}`
- `veterinario-ecografia-{city}`
- `veterinario-radiografia-{city}`
- `veterinario-chirurgia-{city}`

### 8.4 Animal Pages (senza città)
5 pagine:
- `veterinario-cane`
- `veterinario-gatto`
- `veterinario-cavallo`
- `veterinario-uccelli`
- `veterinario-animali-esotici`

### 8.5 Specialty Pages (senza città)
6 pagine:
- `veterinario-nutrizionista`
- `veterinario-ortopedico`
- `veterinario-dermatologo`
- `veterinario-cardiologo`
- `veterinario-oculista`
- `veterinario-notturno`

### 8.6 Calcolo URL Totali

Con N città:
- Statiche: ~7
- Geo (regione/provincia/città): 1 + 4 + N
- Geo + servizio: N × 20+
- Keyword city: N × 4
- Keyword animal-city: N × 4
- Keyword service-city: N × 8
- Cliniche: ~15
- Guide: 20
- Animal pages: 5
- Specialty pages: 6

**Con 20 città attuali**: ~900+ URL  
**Con 8.000 comuni italiani**: ~300.000+ URL (serve sitemap index)

---

## 9. Ottimizzazione SEO e AI-Search

### 9.1 Componenti SEO

- **PageMeta**: inserisce `<title>`, `<meta description>`, `<link rel="canonical">` e JSON-LD
- **JSON-LD**: WebPage, BreadcrumbList, FAQPage per ogni pagina
- **AnswerSummary**: blocco di risposta diretta in cima alla pagina (parseable da AI)
- **QuickFacts**: griglia di fatti strutturati

### 9.2 Struttura Tipo di Pagina (AI-Optimized)

Ogni pagina segue questo schema:
1. **H1** con keyword principale
2. **AnswerSummary** — risposta diretta alla query
3. **QuickFacts** — dati strutturati (zona, CAP, servizio)
4. **Introduzione** — spiegazione dettagliata
5. **Contenuto specifico** (cliniche, servizi, emergenza)
6. **Animali trattati** — link a pagine animale-città
7. **Servizi disponibili** — link a pagine servizio-città
8. **FAQ** — domande e risposte
9. **CTA** — call-to-action per richiesta assistenza
10. **Disclaimer veterinario**

### 9.3 Empty State (Nessuna Clinica)

Quando una città non ha cliniche censite, invece di mostrare "0 risultati":
- Titolo: "Stiamo espandendo la rete a {Città}"
- Spiegazione: messaggio che invita a inviare una richiesta
- CTA prominente: "Richiedi assistenza veterinaria"
- Link città vicine: "In caso di urgenza, considera le strutture nelle città vicine"

---

## 10. Design System

### 10.1 Token CSS

Tutti i colori usano variabili CSS in HSL definite in `src/index.css`:
- `--background`, `--foreground`
- `--primary`, `--primary-foreground`
- `--secondary`, `--muted`, `--accent`
- `--destructive`, `--border`, `--input`
- `--card`, `--popover`
- Varianti dark mode incluse

### 10.2 Font

- Display: font `font-display` (definito in tailwind.config.ts)
- Body: font di default del sistema

### 10.3 Componenti UI

Basati su **shadcn/ui** (Radix UI):
- Accordion, Button, Card, Dialog, Form, Input, Select, Toast, Tooltip, etc.
- Tutti personalizzati con i token del design system

---

## 11. Come Espandere il Progetto

### 11.1 Aggiungere una Nuova Città

Aggiungi un record in `src/data/cities.ts`:

```typescript
"roma": {
  slug: "roma",
  name: "Roma",
  provinceSlug: "roma",
  regionSlug: "lazio",
  cap: "00100",
  metaTitle: "Veterinario a Roma — Trova il veterinario giusto a Roma",
  metaDescription: "Cerca un veterinario a Roma...",
  intro: "Roma, capitale d'Italia, offre...",
  population: "~2.800.000",
  nearbyCities: ["fiumicino", "guidonia", "tivoli"],
}
```

Poi assicurati che la **provincia** e la **regione** esistano nei rispettivi file.

### 11.2 Aggiungere una Nuova Regione

1. Aggiungi in `src/data/regions.ts`
2. Aggiungi le province in `src/data/provinces.ts`
3. Aggiungi le città in `src/data/cities.ts`

### 11.3 Aggiungere una Nuova Clinica

Aggiungi in `src/data/clinics.ts`:

```typescript
"nome-clinica-citta": {
  slug: "nome-clinica-citta",
  name: "Nome Clinica",
  type: "clinica",           // "clinica" | "ambulatorio" | "veterinario"
  citySlug: "roma",
  provinceSlug: "roma",
  regionSlug: "lazio",
  address: "Via ...",
  phone: "+39 ...",
  services: ["visita-veterinaria", "vaccinazioni"],  // slug dei servizi
  animals: ["cane", "gatto"],                        // ID animali
  emergencyAvailable: false,
  homeVisits: true,
  verified: false,
  featured: false,
  lastUpdated: "2026-03-12",
  description: "...",
  ctaLabel: "Richiedi informazioni",
  metaTitle: "Nome Clinica — Roma",
  metaDescription: "...",
}
```

### 11.4 Aggiungere un Nuovo Servizio

Aggiungi in `src/data/services.ts` seguendo l'interfaccia `ServicePage`.

### 11.5 Aggiungere una Nuova Guida

Aggiungi in `src/data/guides.ts` seguendo l'interfaccia `Guide`.

### 11.6 Aggiungere un Nuovo Pattern Keyword

Per un nuovo pattern URL, aggiungi l'entry nell'array appropriato in `src/data/keywords.ts`:
- `cityKeywordPatterns` per pattern `{prefisso}{city}`
- `animalCityKeywordPatterns` per pattern `veterinario-{animale}-{city}`
- `serviceCityKeywordPatterns` per pattern `veterinario-{servizio}-{city}`

---

## 12. Scalabilità Nazionale

### 12.1 Strategia

Il progetto è già predisposto per espandersi a livello nazionale:
- I template sono **riutilizzabili**: aggiungendo una città al dataset, tutte le pagine keyword vengono generate automaticamente
- La sitemap è **dinamica**: calcola automaticamente tutte le combinazioni
- Gli empty state sono **gestiti**: le città senza cliniche mostrano contenuto utile

### 12.2 Dataset Necessari per Espansione

Per scalare a tutta Italia serve:

1. **Dataset comuni italiani** (~8.000 comuni):
   - slug, nome, provincia, regione, CAP, popolazione, coordinate, comuni vicini
   - Fonte: ISTAT, OpenData

2. **Dataset province** (107 province):
   - slug, nome, regione, lista comuni

3. **Dataset regioni** (20 regioni):
   - slug, nome, province

4. **Dataset cliniche** (da fonti pubbliche o scraping):
   - Ordine dei Medici Veterinari (FNOVI)
   - Pagine Gialle / Google Maps

### 12.3 Ottimizzazioni per Scala

Con 8.000+ comuni, sarà necessario:
- **Sitemap index** con sitemap multiple (max 50.000 URL per sitemap)
- **Lazy loading** dei dati delle città (code splitting per regione)
- **Server-Side Rendering** o **Static Site Generation** per performance SEO
- **Canonical URL** per evitare duplicati

---

## 13. Flusso Richiesta Assistenza

Il form in `/richiedi-assistenza/` e i form inline nelle pagine **servizio × animale** inviano a **`POST /api/requests`**: creano account (email + password obbligatoria), salvano la richiesta e reindirizzano alla **chat** (`/dashboard/chats/:id`). Stesso flusso della registrazione.

Campi principali:
- **Animale**, **categoria/sottoservizio** (taxonomy), **urgenza**
- **Città**, provincia, CAP
- **Nome, email, password**, telefono (opzionale)
- **Messaggio**, canali secondari (SMS/WhatsApp), consensi

Pre-compilazione da query string (anche `citta` dalla home / SmartFinder):
- `?localita=Lecce` o `?citta=Lecce`
- `?animale=cane&localita=Lecce`
- `?servizio=slug-pagina-servizio` (es. `dermatologia-veterinaria`) o id categoria taxonomy; `sottoservizio` opzionale

---

## 14. Note Tecniche

- **Backend API**: richieste e utenti tramite FastAPI (`/requests`, auth JWT); frontend con `VITE_API_BASE_URL` in produzione
- **Favicon**: icona personalizzata a forma di faccia di cane
- **Logo**: stessa immagine della favicon usata come logo nel header
- **Branding**: VeterinarioVicino.it con colori primari del design system
- **Mobile**: layout responsive, CTA sticky su mobile
- **Performance**: lazy loading dei template con `React.lazy()` e `Suspense`
- **Test**: configurazione Vitest presente con file di esempio

---

## 15. Prossimi Passi Consigliati

1. **Espansione geografica**: importare dataset ISTAT dei comuni italiani
2. **Cliniche reali**: raccolta dati da fonti pubbliche (FNOVI, registri ASL)
3. **Backend**: attivare Lovable Cloud per persistenza dati e gestione richieste
4. **SSR/SSG**: migrare a pre-rendering per performance SEO su scala
5. **Analytics**: integrare tracking per monitorare conversioni
6. **Contenuti**: espandere guide a 50+ per coprire più keyword long-tail
7. **User profiles**: area riservata per veterinari per gestire il proprio profilo
