import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageMeta } from "@/components/PageMeta";
import { PageCTA } from "@/components/PageCTA";
import { FaqSection } from "@/components/FaqSection";
import { RelatedLinks } from "@/components/RelatedLinks";
import { AnswerSummary } from "@/components/AnswerSummary";
import { QuickFacts } from "@/components/QuickFacts";
import { ClinicCard } from "@/components/ClinicCard";
import { EmergencyBlock } from "@/components/EmergencyBlock";
import { VetDisclaimer } from "@/components/VetDisclaimer";
import { EditorialInfo } from "@/components/EditorialInfo";
import { AreaCoverage } from "@/components/AreaCoverage";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { getCity, getClinicsByCity, getAllServices, getAllCities, getClinicsWithEmergency, getProvince } from "@/data";
import { generateKeywordCityProse } from "@/lib/content-generators";
import { cityKeywordPatterns, animalCityKeywordPatterns, type CityKeywordPattern } from "@/data/keywords";
import { animalCategories } from "@/config/site";
import { siteConfig } from "@/config/site";
import { breadcrumbJsonLd, faqJsonLd, webPageJsonLd, veterinaryCareJsonLd, itemListJsonLd } from "@/lib/seo";
import NotFound from "@/pages/NotFound";

interface KeywordCityPageProps {
  pattern: CityKeywordPattern;
  citySlug: string;
}

export default function KeywordCityPage({ pattern, citySlug }: KeywordCityPageProps) {
  const city = getCity(citySlug);
  if (!city) return <NotFound />;

  const clinics = getClinicsByCity(citySlug);
  const allServices = getAllServices();
  const nearbyCities = city.nearbyCities.map(s => getCity(s)).filter(c => c && getClinicsByCity(c.slug).length > 0);
  const province = getProvince(city.provinceSlug);
  const provinceName = province?.name || city.provinceSlug;

  // Filter clinics based on angle
  const relevantClinics = pattern.angle === "emergency" || pattern.angle === "h24"
    ? clinics.filter(c => c.emergencyAvailable)
    : clinics;

  // If no local emergency clinics, show regional ones
  const emergencyClinics = pattern.angle === "emergency" || pattern.angle === "h24"
    ? (relevantClinics.length > 0 ? relevantClinics : getClinicsWithEmergency().slice(0, 4))
    : [];

  const canonicalPath = `/${pattern.prefix}${citySlug}/`;
  const h1 = pattern.h1Template(city.name);

  const faq = [
    { q: `Come trovo un ${pattern.label.toLowerCase()} a ${city.name}?`, a: `In questa pagina sono elencate le strutture disponibili a ${city.name} e dintorni. Puoi anche inviare una richiesta di contatto gratuita tramite il modulo.` },
    ...(pattern.angle === "emergency" || pattern.angle === "h24" ? [
      { q: `C'è un pronto soccorso veterinario a ${city.name}?`, a: `La disponibilità di servizi veterinari di emergenza a ${city.name} può variare. Il nostro servizio ti aiuta a trovare la struttura più vicina con disponibilità per urgenze.` },
      { q: "Cosa faccio se il mio animale ha un'emergenza di notte?", a: "In caso di emergenza notturna, cerca una clinica con reperibilità H24 o pronto soccorso. Se non trovi una struttura aperta, contatta il servizio veterinario di guardia della tua ASL." },
    ] : [
      { q: `Quanto costa una visita veterinaria a ${city.name}?`, a: "I costi variano in base alla struttura e al tipo di prestazione. Il nostro servizio di ricerca è gratuito e ti mette in contatto con il professionista che potrà fornirti un preventivo." },
    ]),
    { q: `Ci sono veterinari con visite a domicilio a ${city.name}?`, a: `Alcuni professionisti nella zona di ${city.name} offrono il servizio di visita a domicilio. Specificalo nella tua richiesta di contatto.` },
  ];

  // Related keyword pages for this city
  const otherPatterns = cityKeywordPatterns.filter(p => p.prefix !== pattern.prefix);

  return (
    <>
      <PageMeta
        title={pattern.metaTitleTemplate(city.name)}
        description={pattern.metaDescTemplate(city.name)}
        canonical={canonicalPath}
        jsonLd={[
          webPageJsonLd({ title: pattern.metaTitleTemplate(city.name), description: pattern.metaDescTemplate(city.name), url: canonicalPath }),
          breadcrumbJsonLd([{ name: city.name, url: `/${city.regionSlug}/${city.provinceSlug}/${city.slug}/` }, { name: pattern.label }]),
          faqJsonLd(faq),
          veterinaryCareJsonLd({
            name: h1,
            areaServed: city.name,
            url: canonicalPath,
            description: pattern.metaDescTemplate(city.name),
          }),
          relevantClinics.length > 0 ? itemListJsonLd({
            name: `${pattern.label} a ${city.name}`,
            url: canonicalPath,
            items: relevantClinics.slice(0, 10).map((c, i) => ({
              name: c.name,
              url: c.type === "veterinario" ? `/veterinario/${c.slug}/` : `/struttura/${c.slug}/`,
              position: i + 1,
            })),
          }) : null,
        ]}
      />
      <Header />
      <main className="bg-background">
        <div className="container py-8 md:py-12 space-y-12 md:space-y-16 max-w-4xl">
          <Breadcrumbs items={[
            { label: city.name, href: `/${city.regionSlug}/${city.provinceSlug}/${city.slug}/` },
            { label: pattern.label },
          ]} />

          <section>
            <h1 className="font-display text-3xl md:text-4xl font-extrabold text-foreground mb-4">
              {h1}
            </h1>
            <AnswerSummary>{pattern.summaryTemplate(city.name)}</AnswerSummary>
          </section>

          <QuickFacts facts={[
            { label: "Zona", value: city.name },
            { label: "Provincia", value: provinceName },
            { label: "CAP", value: city.cap },
            { label: "Servizio", value: pattern.label },
          ]} />

          {/* ── Rich editorial prose ── */}
          <section className="space-y-4">
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">
              {pattern.label} a {city.name}: cosa sapere
            </h2>
            {generateKeywordCityProse(
              pattern.angle,
              city.name,
              clinics.length,
              clinics.filter(c => c.emergencyAvailable).length,
              provinceName,
            ).split("\n\n").map((p, i) => (
              <p key={i} className="text-muted-foreground leading-relaxed">{p}</p>
            ))}
          </section>

          {(pattern.angle === "emergency" || pattern.angle === "h24") && (
            <EmergencyBlock />
          )}

          {/* Clinics */}
          {relevantClinics.length > 0 && (
            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                {pattern.angle === "emergency" || pattern.angle === "h24"
                  ? `Strutture con servizio di emergenza a ${city.name}`
                  : `Strutture veterinarie a ${city.name}`}
              </h2>
              <div className="grid gap-4">
                {relevantClinics.map(clinic => (
                  <ClinicCard key={clinic.slug} clinic={clinic} />
                ))}
              </div>
            </section>
          )}

          {relevantClinics.length === 0 && emergencyClinics.length > 0 && (
            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">
                Strutture con servizio di emergenza nelle vicinanze
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                Non abbiamo ancora strutture con pronto soccorso registrate a {city.name}. Ecco le più vicine nella provincia.
              </p>
              <div className="grid gap-4">
                {emergencyClinics.map(clinic => (
                  <ClinicCard key={clinic.slug} clinic={clinic} />
                ))}
              </div>
            </section>
          )}

          {relevantClinics.length === 0 && emergencyClinics.length === 0 && (
            <section className="p-8 rounded-xl border border-border bg-card space-y-4">
              <div className="text-center">
                <h3 className="font-display font-semibold text-foreground mb-2">
                  Stiamo espandendo la rete a {city.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto">
                  Non sono ancora presenti strutture censite a {city.name} per questo servizio. Invia comunque una richiesta di contatto per raggiungere i professionisti della zona.
                </p>
              </div>
              <div className="flex justify-center">
                <Link to={`/richiedi-assistenza/?localita=${encodeURIComponent(city.name)}`}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
                  Invia richiesta di contatto
                </Link>
              </div>
            </section>
          )}

          {/* Animals commonly treated */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              Animali assistiti a {city.name}
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              I veterinari a {city.name} trattano diverse specie animali. Consulta le strutture disponibili per il tuo animale:
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {animalCityKeywordPatterns.map(ap => (
                <Link
                  key={ap.prefix}
                  to={`/${ap.prefix}${city.slug}/`}
                  className="flex items-center gap-2 p-3 rounded-lg border border-border bg-card text-sm font-medium text-foreground hover:border-primary/40 hover:bg-accent transition-all"
                >
                  <span className="text-lg">{ap.emoji}</span>
                  {ap.h1Template(city.name)}
                </Link>
              ))}
            </div>
          </section>

          {/* Services available */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              Servizi veterinari a {city.name}
            </h2>
            <div className="flex flex-wrap gap-2">
              {allServices.slice(0, 10).map(s => (
                <Link
                  key={s.slug}
                  to={`/${city.regionSlug}/${city.provinceSlug}/${city.slug}/${s.slug}/`}
                  className="px-3 py-1.5 rounded-lg border border-border bg-card text-xs font-medium text-foreground hover:border-primary/40 hover:bg-accent transition-all"
                >
                  {s.icon} {s.name}
                </Link>
              ))}
            </div>
          </section>

          {/* Other keyword pages for this city */}
          <RelatedLinks
            title={`Cerca anche a ${city.name}`}
            links={otherPatterns.map(p => ({
              label: p.h1Template(city.name),
              href: `/${p.prefix}${city.slug}/`,
              description: p.summaryTemplate(city.name).slice(0, 80) + "…",
            }))}
          />

          {/* Nearby cities */}
          {nearbyCities.length > 0 && (
            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                {pattern.label} nelle zone limitrofe
              </h2>
              <div className="flex flex-wrap gap-2">
                {nearbyCities.map(c => (
                  <Link
                    key={c!.slug}
                    to={`/${pattern.prefix}${c!.slug}/`}
                    className="px-3 py-1.5 rounded-lg border border-border bg-card text-xs font-medium text-foreground hover:border-primary/40 hover:bg-accent transition-all"
                  >
                    {pattern.label} a {c!.name}
                  </Link>
                ))}
              </div>
            </section>
          )}

          <AreaCoverage />
          <EditorialInfo lastUpdated="2026-03-01" />
          <FaqSection items={faq} />
          <VetDisclaimer />
          <PageCTA
            title={`Hai bisogno di un ${pattern.label.toLowerCase()} a ${city.name}?`}
            href={`/richiedi-assistenza/?localita=${encodeURIComponent(city.name)}`}
          />
        </div>
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
}
