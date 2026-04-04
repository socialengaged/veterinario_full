import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageMeta } from "@/components/PageMeta";
import { PageCTA } from "@/components/PageCTA";
import { FaqSection } from "@/components/FaqSection";
import { ClinicCard } from "@/components/ClinicCard";
import { RelatedLinks } from "@/components/RelatedLinks";
import { AnswerSummary } from "@/components/AnswerSummary";
import { QuickFacts } from "@/components/QuickFacts";
import { AreaCoverage } from "@/components/AreaCoverage";
import { VetDisclaimer } from "@/components/VetDisclaimer";
import { EditorialInfo } from "@/components/EditorialInfo";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { Disclaimer } from "@/components/Disclaimer";
import { getCity, getProvince, getRegion, getClinicsByCity, getPublicServices } from "@/data";
import { generateCityProse } from "@/lib/content-generators";
import { cities as allCitiesMap } from "@/data/cities";
import { cityRichContent } from "@/data/city-content";
import { cityEnrichmentData } from "@/data/city-enrichment";
import { Filter, Lightbulb } from "lucide-react";
import NotFound from "@/pages/NotFound";
import { siteConfig } from "@/config/site";
import { breadcrumbJsonLd, faqJsonLd, webPageJsonLd, veterinaryCareJsonLd, itemListJsonLd } from "@/lib/seo";

export default function CityPage() {
  const { regionSlug, provinceSlug, citySlug } = useParams<{
    regionSlug: string; provinceSlug: string; citySlug: string;
  }>();

  const [filterService, setFilterService] = useState<string>("");
  const [filterDomicilio, setFilterDomicilio] = useState(false);

  const city = getCity(citySlug || "");
  const province = getProvince(provinceSlug || "");
  const region = getRegion(regionSlug || "");
  if (!city || !province || !region) return <NotFound />;

  const clinicsList = getClinicsByCity(city.slug);
  const services = getPublicServices();
  const nearbyCities = city.nearbyCities.map(s => allCitiesMap[s]).filter(c => c && getClinicsByCity(c.slug).length > 0);
  const richContent = cityRichContent[city.slug];
  const cityEnrich = cityEnrichmentData[city.slug];

  let filtered = clinicsList;
  if (filterService) filtered = filtered.filter(c => c.services.includes(filterService));
  if (filterDomicilio) filtered = filtered.filter(c => c.homeVisits);

  // Compute service stats for enriched FAQ
  const allCityServices = [...new Set(clinicsList.flatMap(c => c.services))];
  const avgRating = clinicsList.filter(c => c.googleRating).length > 0
    ? (clinicsList.filter(c => c.googleRating).reduce((s, c) => s + (c.googleRating || 0), 0) / clinicsList.filter(c => c.googleRating).length).toFixed(1)
    : null;

  const baseFaq = [
    { q: `Come trovo un veterinario a ${city.name}?`, a: `Usa il nostro strumento di ricerca in homepage oppure sfoglia le ${clinicsList.length} strutture elencate in questa pagina. Puoi filtrare per servizio e visite a domicilio per trovare la soluzione ideale per il tuo animale.` },
    { q: `Quante cliniche veterinarie ci sono a ${city.name}?`, a: `Abbiamo censito ${clinicsList.length} strutture veterinarie a ${city.name}, tra ambulatori, cliniche e studi professionali. Il numero è in costante aggiornamento.` },
    { q: `Quali servizi veterinari sono disponibili a ${city.name}?`, a: allCityServices.length > 0 ? `A ${city.name} sono disponibili ${allCityServices.length} tipologie di servizi, tra cui ${allCityServices.slice(0, 6).map(s => s.replace(/-/g, " ")).join(", ")}${allCityServices.length > 6 ? ` e altri ${allCityServices.length - 6}` : ""}. Contatta le strutture per verificare disponibilità e costi.` : `Contatta le strutture elencate per informazioni sui servizi disponibili.` },
    { q: `Quanto costa una visita veterinaria a ${city.name}?`, a: `Il costo di una visita base a ${city.name} varia indicativamente tra 30 e 70 €, a seconda della struttura e della complessità del caso. Per servizi specialistici (ecografia, radiografia, chirurgia) i costi possono essere superiori. Attraverso ${siteConfig.name} puoi confrontare le opzioni disponibili.` },
    { q: `I veterinari a ${city.name} fanno visite a domicilio?`, a: clinicsList.some(c => c.homeVisits) ? `Sì, ${clinicsList.filter(c => c.homeVisits).length} strutture a ${city.name} offrono visite veterinarie a domicilio, ideali per animali anziani o di grossa taglia.` : `Al momento non risultano strutture con servizio a domicilio a ${city.name}. Invia una richiesta di contatto per raggiungere i professionisti della zona.` },
    ...(avgRating ? [{ q: `Qual è la valutazione media dei veterinari a ${city.name}?`, a: `La valutazione media Google delle strutture veterinarie a ${city.name} è di ${avgRating}/5. Consulta le recensioni dei singoli profili per un quadro più dettagliato.` }] : []),
    { q: "Le informazioni sulle strutture sono verificate?", a: `Le informazioni sono raccolte da fonti pubbliche (Google Maps, siti web). I profili non ancora verificati sono chiaramente contrassegnati. I professionisti possono contattarci per aggiornare i propri dati.` },
  ];
  const faq = richContent ? [...richContent.faq, ...baseFaq] : baseFaq;

  // Parametric local tips when no richContent
  const parametricTips = !richContent ? [
    `Cerca un veterinario vicino a casa: a ${city.name} la vicinanza facilita visite e follow-up.`,
    `Porta sempre con te il libretto sanitario del tuo animale e la documentazione delle vaccinazioni quando ti rechi dal veterinario.`,
    ...(cityEnrich?.attractions ? [`Se porti il cane nelle aree verdi e nei luoghi storici di ${city.name}, ricorda guinzaglio obbligatorio e sacchetti per la raccolta.`] : []),
    ...(clinicsList.some(c => c.homeVisits) ? [`Per animali anziani o stressati dal trasporto, valuta il servizio di visite a domicilio disponibile presso alcune strutture di ${city.name}.`] : []),
  ] : [];

  const hasNoClinics = clinicsList.length === 0;
  const canonicalPath = hasNoClinics
    ? `/${region.slug}/${province.slug}/`
    : `/${region.slug}/${province.slug}/${city.slug}/`;
  const robotsMeta = hasNoClinics ? "noindex, follow" : undefined;
  const breadcrumbs = [
    { name: region.name, url: `/${region.slug}/` },
    { name: province.name, url: `/${region.slug}/${province.slug}/` },
    { name: city.name },
  ];

  // ── Enhanced JSON-LD schemas ──
  const cityGeo = cityEnrich ? {
    "@type": "GeoCoordinates",
    // Use province-level approximate if no exact coords
    name: city.name,
  } : undefined;

  const medicalBusinessSchema = clinicsList.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: `Servizi Veterinari a ${city.name}`,
    description: `${clinicsList.length} strutture veterinarie a ${city.name} (${city.cap}), provincia di ${province.name}. Servizi: ${allCityServices.slice(0, 8).map(s => s.replace(/-/g, " ")).join(", ")}.`,
    url: `${siteConfig.url}${canonicalPath}`,
    areaServed: {
      "@type": "City",
      name: city.name,
      ...(cityEnrich?.cap ? { postalCode: cityEnrich.cap } : {}),
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: province.name,
        containedInPlace: {
          "@type": "AdministrativeArea",
          name: region.name,
          containedInPlace: { "@type": "Country", name: "Italia" },
        },
      },
    },
    ...(avgRating ? {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: avgRating,
        ratingCount: clinicsList.filter(c => c.googleReviewsCount).reduce((s, c) => s + (c.googleReviewsCount || 0), 0),
        bestRating: 5,
      },
    } : {}),
    numberOfItems: clinicsList.length,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Servizi veterinari a ${city.name}`,
      itemListElement: allCityServices.slice(0, 12).map(s => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.replace(/-/g, " ") },
      })),
    },
  } : null;

  // About schema for enriched cities
  const aboutSchema = cityEnrich ? {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    mainEntity: {
      "@type": "City",
      name: city.name,
      description: cityEnrich.intro?.slice(0, 300),
      containedInPlace: { "@type": "AdministrativeArea", name: province.name },
      ...(cityEnrich.cap ? { postalCode: cityEnrich.cap } : {}),
    },
  } : null;

  return (
    <>
      <PageMeta
        title={city.metaTitle}
        description={city.metaDescription}
        canonical={canonicalPath}
        robots={robotsMeta}
        jsonLd={[
          webPageJsonLd({ title: city.metaTitle, description: city.metaDescription, url: canonicalPath }),
          breadcrumbJsonLd(breadcrumbs),
          faqJsonLd(faq),
          veterinaryCareJsonLd({
            name: `Veterinario a ${city.name}`,
            areaServed: city.name,
            url: canonicalPath,
            description: city.metaDescription,
          }),
          medicalBusinessSchema,
          aboutSchema,
          clinicsList.length > 0 ? itemListJsonLd({
            name: `Veterinari e cliniche a ${city.name}`,
            url: canonicalPath,
            items: clinicsList.slice(0, 10).map((c, i) => ({
              name: c.name,
              url: c.type === "veterinario" ? `/veterinario/${c.slug}/` : `/struttura/${c.slug}/`,
              position: i + 1,
            })),
          }) : null,
        ]}
      />
      <Header />
      <main className="bg-background">
        <div className="container py-8 md:py-12 space-y-12 md:space-y-16 max-w-5xl">
          <Breadcrumbs items={[
            { label: region.name, href: `/${region.slug}/` },
            { label: province.name, href: `/${region.slug}/${province.slug}/` },
            { label: city.name },
          ]} />

          <section>
            <h1 className="font-display text-3xl md:text-4xl font-extrabold text-foreground mb-4">
              Veterinario a {city.name}
            </h1>
            <AnswerSummary>
              Cerchi un veterinario a {city.name}? {siteConfig.name} ha censito {clinicsList.length} strutture veterinarie
              — tra cliniche veterinarie, ambulatori e veterinari — a {city.name} ({city.cap}), provincia di {province.name}.
              {avgRating && ` Valutazione media Google: ${avgRating}/5.`}
              {" "}Puoi cercare per servizio veterinario o richiedere assistenza tramite il modulo di contatto.
            </AnswerSummary>
          </section>

          <QuickFacts facts={[
            { label: "Città", value: city.name },
            { label: "CAP", value: cityEnrich?.cap || city.cap },
            { label: "Provincia", value: cityEnrich?.provincia || province.name },
            { label: "Strutture censite", value: String(clinicsList.length) },
            { label: "Visite a domicilio", value: String(clinicsList.filter(c => c.homeVisits).length) },
            ...(avgRating ? [{ label: "Rating medio", value: `${avgRating}/5 ⭐` }] : []),
            ...(allCityServices.length > 0 ? [{ label: "Servizi disponibili", value: String(allCityServices.length) }] : []),
          ]} />

          {/* ── Rich editorial content ── */}
          <section className="space-y-4" itemScope itemType="https://schema.org/Article">
            <h2 className="font-display text-2xl font-bold text-foreground" itemProp="headline">
              Assistenza veterinaria a {city.name}
            </h2>
            <div itemProp="articleBody">
              {richContent ? (
                richContent.richContent.split("\n\n").map((paragraph, i) => (
                  <p key={i} className="text-muted-foreground leading-relaxed mb-4">{paragraph}</p>
                ))
              ) : (
                <>
                  {generateCityProse(
                    city,
                    clinicsList.length,
                    clinicsList.filter(c => c.emergencyAvailable).length,
                    clinicsList.filter(c => c.homeVisits).length,
                    [...new Set(clinicsList.flatMap(c => c.services))].slice(0, 5),
                    province.name,
                  ).split("\n\n").map((p, i) => (
                    <p key={i} className="text-muted-foreground leading-relaxed mb-4">{p}</p>
                  ))}
                </>
              )}
            </div>
          </section>

          {/* ── Local context from enrichment ── */}
          {cityEnrich?.attractions && !richContent && (
            <section className="p-6 rounded-xl border border-border bg-card">
              <h2 className="font-display text-lg font-bold text-foreground mb-3">
                📍 {city.name}: contesto territoriale
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {cityEnrich.attractions.split(/[.!]/).slice(0, 3).join(". ").trim()}.
                {" "}Conoscere il territorio aiuta a scegliere il veterinario più comodo da raggiungere
                e a individuare aree verdi sicure per le passeggiate con il proprio animale.
              </p>
            </section>
          )}

          {/* ── Local tips ── */}
          {(richContent?.localTips?.length || parametricTips.length > 0) && (
            <section className="p-6 rounded-xl border-2 border-primary/20 bg-accent">
              <h2 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                Consigli per chi ha animali a {city.name}
              </h2>
              <ul className="space-y-3">
                {(richContent?.localTips || parametricTips).map((tip, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                    <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    {tip}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Trust block */}
          <section className="p-5 rounded-xl border border-border bg-surface">
            <h2 className="font-display font-semibold text-foreground mb-2">Servizi veterinari disponibili a {city.name}</h2>
            <p className="text-sm text-muted-foreground">
              In questa pagina trovi veterinari, cliniche veterinarie e ambulatori censiti a {city.name} e nei dintorni.
              {allCityServices.length > 0 && ` Sono disponibili ${allCityServices.length} tipologie di servizi, tra cui ${allCityServices.slice(0, 5).map(s => s.replace(/-/g, " ")).join(", ")}.`}
              {" "}Puoi filtrare per tipo di servizio veterinario, visite veterinarie a domicilio o richiedere un contatto tramite {siteConfig.name}.
            </p>
          </section>

          {/* Services in city */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">Servizi veterinari a {city.name}</h2>
            <div className="flex flex-wrap gap-2">
              {services.map((s) => (
                <Link key={s.slug} to={`/${region.slug}/${province.slug}/${city.slug}/${s.slug}/`}
                  className="px-3 py-1.5 rounded-lg border border-border bg-card text-xs font-medium text-foreground hover:border-primary/40 hover:bg-accent transition-all">
                  {s.icon} {s.name}
                </Link>
              ))}
            </div>
          </section>

          {/* Clinics with filters */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">Veterinari e cliniche a {city.name}</h2>

            <div className="flex flex-wrap gap-2 mb-5 p-4 rounded-xl bg-surface border border-border">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mr-2">
                <Filter className="h-3.5 w-3.5" /> Filtra:
              </div>
              <select value={filterService} onChange={(e) => setFilterService(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-input bg-background text-xs">
                <option value="">Tutti i servizi</option>
                {services.map(s => <option key={s.slug} value={s.slug}>{s.name}</option>)}
              </select>
              <label className="inline-flex items-center gap-1.5 text-xs cursor-pointer">
                <input type="checkbox" checked={filterDomicilio} onChange={e => setFilterDomicilio(e.target.checked)} className="rounded" />
                Visite a domicilio
              </label>
            </div>

            {filtered.length > 0 ? (
              <div className="grid sm:grid-cols-2 gap-4">
                {filtered.map((c) => <ClinicCard key={c.slug} clinic={c} />)}
              </div>
            ) : (
              <div className="p-8 rounded-xl border border-border bg-surface space-y-4">
                <div className="text-center">
                  <h3 className="font-display font-semibold text-foreground mb-2">
                    {clinicsList.length === 0
                      ? `Stiamo espandendo la rete veterinaria a ${city.name}`
                      : "Nessuna struttura corrisponde ai filtri selezionati"}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto">
                    {clinicsList.length === 0
                      ? `Al momento non sono presenti strutture censite a ${city.name}. Puoi comunque inviare una richiesta di contatto per raggiungere i professionisti della zona.`
                      : "Prova a modificare i filtri oppure invia una richiesta di contatto."}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link to={`/richiedi-assistenza/?localita=${encodeURIComponent(city.name)}`}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
                    Invia richiesta di contatto
                  </Link>
                </div>
                {clinicsList.length === 0 && nearbyCities.length > 0 && (
                  <div className="pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground mb-2 text-center">Veterinari nelle città vicine:</p>
                    <div className="flex flex-wrap gap-1.5 justify-center">
                      {nearbyCities.slice(0, 5).map(c => (
                        <Link key={c.slug} to={`/${region.slug}/${c.provinceSlug}/${c.slug}/`}
                          className="px-2.5 py-1 rounded-full bg-accent text-accent-foreground text-[11px] font-medium hover:bg-primary hover:text-primary-foreground transition-colors">
                          {c.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </section>

          {/* Nearby */}
          {nearbyCities.length > 0 && (
            <RelatedLinks
              title="Città vicine"
              links={nearbyCities.map(c => ({
                label: `Veterinario a ${c.name}`,
                href: `/${region.slug}/${c.provinceSlug}/${c.slug}/`,
                description: `CAP ${c.cap}`,
              }))}
            />
          )}

          <AreaCoverage currentArea={city.name} />
          <EditorialInfo lastUpdated="2026-03-01" />
          <FaqSection items={faq} />
          <VetDisclaimer />
          <PageCTA title={`Cerchi un veterinario a ${city.name}?`} href="/richiedi-assistenza/" />
        </div>
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
}
