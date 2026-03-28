import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageMeta } from "@/components/PageMeta";
import { PageCTA } from "@/components/PageCTA";
import { FaqSection } from "@/components/FaqSection";
import { ClinicCard } from "@/components/ClinicCard";
import { AnswerSummary } from "@/components/AnswerSummary";
import { QuickFacts } from "@/components/QuickFacts";
import { AreaCoverage } from "@/components/AreaCoverage";
import { VetDisclaimer } from "@/components/VetDisclaimer";
import { EditorialInfo } from "@/components/EditorialInfo";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { getProvince, getRegion, getCitiesByProvince, getClinicsByCity, getPublicServices } from "@/data";
import { provinceRichContent } from "@/data/province-content";
import { MapPin, Building2, Lightbulb } from "lucide-react";
import { ProvinceTerritorialContext, getProvinceAggregatedStats } from "@/components/ProvinceTerritorialContext";
import NotFound from "@/pages/NotFound";
import { siteConfig } from "@/config/site";
import { breadcrumbJsonLd, faqJsonLd, webPageJsonLd, itemListJsonLd, aboutPageJsonLd } from "@/lib/seo";

export default function ProvincePage() {
  const { regionSlug, provinceSlug } = useParams<{ regionSlug: string; provinceSlug: string }>();
  const province = getProvince(provinceSlug || "");
  const region = getRegion(regionSlug || "");
  if (!province || !region) return <NotFound />;

  const allCitiesList = getCitiesByProvince(province.slug);
  const services = getPublicServices();
  const allClinics = allCitiesList.flatMap((c) => getClinicsByCity(c.slug));
  // Only show cities that have at least 1 clinic
  const citiesList = allCitiesList.filter(c => getClinicsByCity(c.slug).length > 0);
  const richContent = provinceRichContent[province.slug];

  const baseFaq = [
    { q: `Quanti veterinari sono disponibili in provincia di ${province.name}?`, a: `Il nostro database è in costante aggiornamento. Attualmente abbiamo ${allClinics.length} strutture censite in ${citiesList.length} comuni. Il numero cresce man mano che nuovi professionisti aderiscono.` },
    { q: `Come trovo un veterinario nella mia città in provincia di ${province.name}?`, a: "Seleziona la tua città dalla lista in questa pagina, oppure usa lo strumento di ricerca in homepage per una ricerca personalizzata." },
    { q: `Come scelgo la struttura giusta in provincia di ${province.name}?`, a: "Confronta servizi offerti, recensioni e distanza dalla tua abitazione. Puoi filtrare l'elenco per città e inviare una richiesta di contatto dal modulo dedicato." },
    { q: `Quanto costa il servizio di ${siteConfig.name}?`, a: `Il servizio di ricerca è completamente gratuito. I costi delle prestazioni veterinarie variano in base alla struttura e al servizio richiesto.` },
    { q: "Il servizio copre anche i comuni più piccoli?", a: "Stiamo lavorando per coprire tutti i comuni della provincia. Se il tuo comune non è ancora elencato, puoi comunque inviare una richiesta indicando la tua posizione." },
    { q: `Quali servizi veterinari sono disponibili in provincia di ${province.name}?`, a: `In provincia di ${province.name} sono disponibili servizi come visite generiche, vaccinazioni, chirurgia, diagnostica avanzata e molto altro. Esplora i servizi nella sezione dedicata.` },
  ];

  const faq = richContent ? [...richContent.faq, ...baseFaq] : baseFaq;

  const canonicalPath = `/${region.slug}/${province.slug}/`;
  const breadcrumbs = [
    { name: region.name, url: `/${region.slug}/` },
    { name: `Provincia di ${province.name}` },
  ];

  const aggStats = getProvinceAggregatedStats(province.slug);

  return (
    <>
      <PageMeta
        title={province.metaTitle}
        description={province.metaDescription}
        canonical={canonicalPath}
        jsonLd={[
          webPageJsonLd({ title: province.metaTitle, description: province.metaDescription, url: canonicalPath }),
          breadcrumbJsonLd(breadcrumbs),
          faqJsonLd(faq),
          itemListJsonLd({
            name: `Comuni in provincia di ${province.name}`,
            url: canonicalPath,
            items: citiesList.slice(0, 20).map((c, i) => ({
              name: `Veterinario a ${c.name}`,
              url: `/${region.slug}/${province.slug}/${c.slug}/`,
              position: i + 1,
            })),
          }),
          aboutPageJsonLd({
            name: `Veterinario in provincia di ${province.name}`,
            description: province.metaDescription,
            url: canonicalPath,
            areaServed: province.name,
            regionName: region.name,
            population: aggStats?.totalPopulation,
            totalCities: aggStats?.totalCities,
            citiesWithClinics: aggStats?.citiesWithClinics,
            totalClinics: allClinics.length,
            dateModified: "2026-03-20",
          }),
        ]}
      />
      <Header />
      <main className="bg-background">
        <div className="container py-8 md:py-12 space-y-12 md:space-y-16 max-w-5xl">
          <Breadcrumbs items={[
            { label: region.name, href: `/${region.slug}/` },
            { label: `Provincia di ${province.name}` },
          ]} />

          <section>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
              <Building2 className="h-4 w-4" />
              {allClinics.length} strutture in provincia di {province.name}
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-extrabold text-foreground mb-4">
              Veterinario in provincia di {province.name}
            </h1>
            <AnswerSummary>
              Cerchi un veterinario in provincia di {province.name}? {siteConfig.name} elenca
              {allClinics.length} strutture veterinarie
              censite in {citiesList.length} comuni. Servizio di ricerca e contatto gratuito.
            </AnswerSummary>
          </section>

          <QuickFacts facts={[
            { label: "Provincia", value: province.name },
            { label: "Comuni coperti", value: String(citiesList.length) },
            { label: "Strutture censite", value: String(allClinics.length) },
            { label: "Servizio", value: "Gratuito" },
          ]} />

          {/* ── Rich editorial content ── */}
          <section className="space-y-4">
            <h2 className="font-display text-2xl font-bold text-foreground">
              Assistenza veterinaria in provincia di {province.name}
            </h2>
            {richContent ? (
              richContent.richContent.split("\n\n").map((paragraph, i) => (
                <p key={i} className="text-muted-foreground leading-relaxed">{paragraph}</p>
              ))
            ) : (
              <p className="text-muted-foreground leading-relaxed">{province.intro}</p>
            )}
          </section>

          {/* ── Territorial context from CSV data ── */}
          <ProvinceTerritorialContext
            provinceSlug={province.slug}
            provinceName={province.name}
            regionName={region.name}
          />

          {/* ── Local tips ── */}
          {richContent && richContent.localTips.length > 0 && (
            <section className="p-6 rounded-xl border-2 border-primary/20 bg-accent">
              <h2 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                Consigli per chi ha animali in provincia di {province.name}
              </h2>
              <ul className="space-y-3">
                {richContent.localTips.map((tip, i) => (
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

          {/* Cities */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-6">Comuni coperti</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {citiesList.map((c) => (
                <Link key={c.slug} to={`/${region.slug}/${province.slug}/${c.slug}/`}
                  className="group flex items-center gap-2 p-4 rounded-xl border border-border bg-card hover:shadow-md hover:border-primary/20 transition-all">
                  <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                  <div>
                    <span className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">{c.name}</span>
                    <span className="text-[10px] text-muted-foreground block">CAP {c.cap}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Services */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-6">Servizi più richiesti in provincia</h2>
            <div className="flex flex-wrap gap-2">
              {services.slice(0, 8).map((s) => (
                <Link key={s.slug} to={`/${s.slug}/`}
                  className="px-4 py-2 rounded-lg border border-border bg-card text-sm font-medium text-foreground hover:border-primary/40 hover:bg-accent transition-all">
                  {s.icon} {s.name}
                </Link>
              ))}
            </div>
          </section>

          {/* Clinics */}
          {allClinics.length > 0 && (
            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">Strutture in evidenza</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {allClinics.filter(c => c.featured).slice(0, 6).map((c) => (
                  <ClinicCard key={c.slug} clinic={c} />
                ))}
              </div>
            </section>
          )}

          <AreaCoverage currentArea={`provincia di ${province.name}`} />
          <EditorialInfo lastUpdated="2026-03-01" />
          <FaqSection items={faq} />
          <VetDisclaimer />
          <PageCTA href="/richiedi-assistenza/" />
        </div>
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
}
