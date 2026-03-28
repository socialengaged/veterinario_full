import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageMeta } from "@/components/PageMeta";
import { PageCTA } from "@/components/PageCTA";
import { FaqSection } from "@/components/FaqSection";
import { RelatedLinks } from "@/components/RelatedLinks";
import { AnswerSummary } from "@/components/AnswerSummary";
import { QuickFacts } from "@/components/QuickFacts";
import { AreaCoverage } from "@/components/AreaCoverage";
import { VetDisclaimer } from "@/components/VetDisclaimer";
import { RegionTerritorialContext } from "@/components/RegionTerritorialContext";
import { EditorialInfo } from "@/components/EditorialInfo";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { getRegion, getProvincesByRegion, getPublicServices } from "@/data";
import { cities } from "@/data/cities";
import { regionRichContent } from "@/data/region-content";
import { MapPin, Lightbulb } from "lucide-react";
import NotFound from "@/pages/NotFound";
import { siteConfig } from "@/config/site";
import { breadcrumbJsonLd, faqJsonLd, webPageJsonLd, itemListJsonLd, aboutPageJsonLd } from "@/lib/seo";
import { getRegionAggregatedStats } from "@/components/ProvinceTerritorialContext";

export default function RegionPage() {
  const params = useParams();
  const regionSlug = params.regionSlug || params.slug || "";
  const region = getRegion(regionSlug);
  if (!region) return <NotFound />;

  const provs = getProvincesByRegion(region.slug);
  const services = getPublicServices();
  const featuredCities = region.featuredCities.map((s) => cities[s]).filter(Boolean);
  const richContent = regionRichContent[region.slug];

  const baseFaq = [
    { q: `Il servizio è disponibile in tutta la ${region.name}?`, a: `Attualmente il servizio è attivo nelle province di ${provs.map(p => p.name).join(", ")}. Stiamo lavorando per espandere la copertura a tutta la regione.` },
    { q: "Come faccio a trovare un veterinario nella mia zona?", a: "Usa il modulo di ricerca in homepage: seleziona il tuo animale, il servizio di cui hai bisogno e la tua posizione. La richiesta verrà inoltrata alle strutture della zona." },
    { q: "Il servizio è gratuito?", a: `Sì, ${siteConfig.name} è completamente gratuito per chi cerca un veterinario. Non ci sono costi nascosti per la ricerca.` },
    { q: `Quante strutture veterinarie ci sono in ${region.name}?`, a: `L'elenco in ${region.name} copre ${provs.length} province con strutture veterinarie in continuo aggiornamento. Seleziona la tua provincia per vedere le strutture disponibili.` },
    { q: `Quali servizi veterinari sono disponibili in ${region.name}?`, a: `Attraverso ${siteConfig.name} puoi trovare veterinari per visite generiche, vaccinazioni, chirurgia, diagnostica avanzata, nutrizione e molto altro in tutta la ${region.name}.` },
  ];

  const faq = richContent ? [...richContent.faq, ...baseFaq] : baseFaq;

  const breadcrumbs = [{ name: region.name }];
  const canonicalPath = `/${region.slug}/`;
  const regionStats = getRegionAggregatedStats(provs.map(p => p.slug));

  return (
    <>
      <PageMeta
        title={region.metaTitle}
        description={region.metaDescription}
        canonical={canonicalPath}
        jsonLd={[
          webPageJsonLd({ title: region.metaTitle, description: region.metaDescription, url: canonicalPath }),
          breadcrumbJsonLd(breadcrumbs),
          faqJsonLd(faq),
          itemListJsonLd({
            name: `Province in ${region.name}`,
            url: canonicalPath,
            items: provs.map((p, i) => ({
              name: `Provincia di ${p.name}`,
              url: `/${region.slug}/${p.slug}/`,
              position: i + 1,
            })),
          }),
          aboutPageJsonLd({
            name: `Veterinario in ${region.name}`,
            description: region.metaDescription,
            url: canonicalPath,
            areaServed: region.name,
            regionName: region.name,
            level: "region",
            population: regionStats?.totalPopulation,
            totalCities: regionStats?.totalCities,
            citiesWithClinics: regionStats?.citiesWithClinics,
            totalClinics: regionStats?.totalClinics,
            dateModified: "2026-03-20",
          }),
        ]}
      />
      <Header />
      <main className="bg-background">
        <div className="container py-8 md:py-12 space-y-12 md:space-y-16 max-w-5xl">
          <Breadcrumbs items={[{ label: region.name }]} />

          <section>
            <h1 className="font-display text-3xl md:text-4xl font-extrabold text-foreground mb-4">
              Veterinario in {region.name}
            </h1>
            <AnswerSummary>
              {siteConfig.name} ti aiuta a trovare il veterinario o la clinica veterinaria
              adatta alle tue esigenze in {region.name}. Il servizio di ricerca e contatto è gratuito e attivo nelle province di {provs.map(p => p.name).join(", ")}.
            </AnswerSummary>
          </section>

          <QuickFacts facts={[
            { label: "Regione", value: region.name },
            { label: "Province coperte", value: `${provs.length} province` },
            ...(regionStats?.totalPopulation ? [{ label: "Popolazione coperta", value: regionStats.totalPopulation >= 1_000_000 ? `~${(regionStats.totalPopulation / 1_000_000).toFixed(1).replace(".", ",")} milioni` : `~${Math.round(regionStats.totalPopulation / 1000)}mila` }] : []),
            ...(regionStats?.totalClinics ? [{ label: "Strutture veterinarie", value: String(regionStats.totalClinics) }] : []),
            ...(regionStats?.totalCities ? [{ label: "Comuni mappati", value: String(regionStats.totalCities) }] : []),
            ...(regionStats?.citiesWithClinics ? [{ label: "Comuni con cliniche", value: String(regionStats.citiesWithClinics) }] : []),
            { label: "Città principali", value: featuredCities.slice(0, 5).map(c => c.name).join(", ") || "–" },
            { label: "Costo del servizio", value: "Gratuito" },
          ]} />

          {/* ── Rich editorial content ── */}
          <section className="space-y-4">
            <h2 className="font-display text-2xl font-bold text-foreground">
              Assistenza veterinaria in {region.name}
            </h2>
            {richContent ? (
              richContent.richContent.split("\n\n").map((paragraph, i) => (
                <p key={i} className="text-muted-foreground leading-relaxed">{paragraph}</p>
              ))
            ) : (
              <p className="text-muted-foreground leading-relaxed">{region.intro}</p>
            )}
          </section>

          {/* ── Regional tips ── */}
          {richContent && richContent.regionalTips.length > 0 && (
            <section className="p-6 rounded-xl border-2 border-primary/20 bg-accent">
              <h2 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                Consigli per chi ha animali in {region.name}
              </h2>
              <ul className="space-y-3">
                {richContent.regionalTips.map((tip, i) => (
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

          {/* Territorial context aggregated from CSV */}
          <RegionTerritorialContext regionSlug={region.slug} regionName={region.name} />

          {/* Province */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-6">Province coperte</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {provs.map((p) => (
                <Link key={p.slug} to={`/${region.slug}/${p.slug}/`}
                  className="group p-5 rounded-xl border border-border bg-card hover:shadow-md hover:border-primary/20 transition-all">
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className="h-4 w-4 text-primary" />
                    <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors">{p.name}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground">{p.cities.length} comuni coperti</p>
                </Link>
              ))}
            </div>
          </section>

          {/* Featured cities */}
          {featuredCities.length > 0 && (
            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">Città principali</h2>
              <div className="flex flex-wrap gap-2">
                {featuredCities.map((c) => (
                  <Link key={c.slug} to={`/${region.slug}/${c.provinceSlug}/${c.slug}/`}
                    className="px-4 py-2 rounded-lg border border-border bg-card text-sm font-medium text-foreground hover:border-primary/40 hover:bg-accent transition-all">
                    {c.name}
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Services */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-6">Servizi disponibili</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map((s) => (
                <Link key={s.slug} to={`/${s.slug}/`}
                  className="group p-5 rounded-xl border border-border bg-card hover:shadow-md hover:border-primary/20 transition-all">
                  <span className="text-2xl mb-2 block">{s.icon}</span>
                  <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors">{s.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{s.intro.slice(0, 100)}…</p>
                </Link>
              ))}
            </div>
          </section>

          <AreaCoverage currentArea={region.name} />
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
