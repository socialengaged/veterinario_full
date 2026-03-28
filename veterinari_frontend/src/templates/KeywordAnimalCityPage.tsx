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
import { VetDisclaimer } from "@/components/VetDisclaimer";
import { EditorialInfo } from "@/components/EditorialInfo";
import { AreaCoverage } from "@/components/AreaCoverage";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { getCity, getClinicsByCity, getClinicsByAnimal, getPublicServices, getAllCities, getProvince } from "@/data";
import { generateAnimalCityProse } from "@/lib/content-generators";
import { animalCityKeywordPatterns, type AnimalCityKeywordPattern } from "@/data/keywords";
import { siteConfig } from "@/config/site";
import { breadcrumbJsonLd, faqJsonLd, webPageJsonLd, veterinaryCareJsonLd, itemListJsonLd } from "@/lib/seo";
import NotFound from "@/pages/NotFound";

interface Props {
  pattern: AnimalCityKeywordPattern;
  citySlug: string;
}

export default function KeywordAnimalCityPage({ pattern, citySlug }: Props) {
  const city = getCity(citySlug);
  if (!city) return <NotFound />;

  // Clinics in city that treat this animal
  const cityClinics = getClinicsByCity(citySlug);
  const animalClinics = cityClinics.filter(c => c.animals.includes(pattern.animalId));
  // Fallback: all clinics treating this animal in the region
  const fallbackClinics = animalClinics.length === 0
    ? getClinicsByAnimal(pattern.animalId).slice(0, 4)
    : [];

  const allServices = getPublicServices();
  const nearbyCities = city.nearbyCities.map(s => getCity(s)).filter(c => c && getClinicsByCity(c.slug).length > 0);
  const province = getProvince(city.provinceSlug);
  const provinceName = province?.name || city.provinceSlug;

  const canonicalPath = `/${pattern.prefix}${citySlug}/`;
  const h1 = pattern.h1Template(city.name);

  const faq = [
    { q: `Come trovo un veterinario per ${pattern.animalNamePlural} a ${city.name}?`, a: `In questa pagina sono elencate le strutture disponibili a ${city.name}. Puoi anche inviare una richiesta di contatto gratuita tramite il modulo.` },
    { q: `Ci sono veterinari specializzati in ${pattern.animalNamePlural} a ${city.name}?`, a: `La disponibilità di specialisti per ${pattern.animalNamePlural} può variare. Consulta le strutture elencate nella zona di ${city.name} e dintorni.` },
    { q: `Come scelgo la struttura giusta per ${pattern.animalNamePlural} a ${city.name}?`, a: `Confronta le strutture elencate, orari e servizi offerti. Puoi anche inviare una richiesta di contatto dal modulo per essere ricontattato.` },
    { q: "Quanto costa una visita?", a: "I costi variano in base alla struttura e al tipo di prestazione. Il nostro servizio di ricerca è gratuito." },
  ];

  return (
    <>
      <PageMeta
        title={pattern.metaTitleTemplate(city.name)}
        description={pattern.metaDescTemplate(city.name)}
        canonical={canonicalPath}
        jsonLd={[
          webPageJsonLd({ title: pattern.metaTitleTemplate(city.name), description: pattern.metaDescTemplate(city.name), url: canonicalPath }),
          breadcrumbJsonLd([
            { name: city.name, url: `/${city.regionSlug}/${city.provinceSlug}/${city.slug}/` },
            { name: h1 },
          ]),
          faqJsonLd(faq),
          veterinaryCareJsonLd({
            name: h1,
            areaServed: city.name,
            url: canonicalPath,
            description: pattern.metaDescTemplate(city.name),
          }),
          animalClinics.length > 0 ? itemListJsonLd({
            name: `Veterinari per ${pattern.animalNamePlural} a ${city.name}`,
            url: canonicalPath,
            items: animalClinics.slice(0, 10).map((c, i) => ({
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
            { label: `${pattern.emoji} ${pattern.animalNamePlural.charAt(0).toUpperCase() + pattern.animalNamePlural.slice(1)}` },
          ]} />

          {/* ── Direct answer ── */}
          <section>
            <div className="text-4xl mb-4">{pattern.emoji}</div>
            <h1 className="font-display text-3xl md:text-4xl font-extrabold text-foreground mb-4">
              {h1}
            </h1>
            <AnswerSummary>
              <strong>In breve:</strong> {pattern.summaryTemplate(city.name)}
            </AnswerSummary>
          </section>

          <QuickFacts facts={[
            { label: "Animale", value: `${pattern.emoji} ${pattern.animalName.charAt(0).toUpperCase() + pattern.animalName.slice(1)}` },
            { label: "Zona", value: city.name },
            { label: "Provincia", value: provinceName },
            { label: "Costo ricerca", value: "Gratuito" },
          ]} />

          {/* ── Rich editorial prose ── */}
          <section className="space-y-4">
            <h2 className="font-display text-2xl font-bold text-foreground mb-3">
              Veterinario per {pattern.animalNamePlural} a {city.name}
            </h2>
            {generateAnimalCityProse(
              pattern.animalName,
              pattern.animalNamePlural,
              city.name,
              animalClinics.length,
              provinceName,
            ).split("\n\n").map((p, i) => (
              <p key={i} className="text-muted-foreground leading-relaxed">{p}</p>
            ))}
          </section>

          {/* ── Available services ── */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              Servizi veterinari per {pattern.animalNamePlural}
            </h2>
            <div className="flex flex-wrap gap-2">
              {allServices.slice(0, 8).map(s => (
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

          {/* ── Clinics ── */}
          {animalClinics.length > 0 && (
            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                Strutture per {pattern.animalNamePlural} a {city.name}
              </h2>
              <div className="grid gap-4">
                {animalClinics.map(clinic => (
                  <ClinicCard key={clinic.slug} clinic={clinic} />
                ))}
              </div>
            </section>
          )}

          {animalClinics.length === 0 && fallbackClinics.length > 0 && (
            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">
                Strutture per {pattern.animalNamePlural} nelle vicinanze
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                Non abbiamo ancora strutture specifiche per {pattern.animalNamePlural} registrate a {city.name}. Ecco le più vicine nella provincia.
              </p>
              <div className="grid gap-4">
                {fallbackClinics.map(clinic => (
                  <ClinicCard key={clinic.slug} clinic={clinic} />
                ))}
              </div>
            </section>
          )}

          {animalClinics.length === 0 && fallbackClinics.length === 0 && (
            <section className="p-8 rounded-xl border border-border bg-card space-y-4">
              <div className="text-center">
                <h3 className="font-display font-semibold text-foreground mb-2">
                  Strutture per {pattern.animalNamePlural} a {city.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto">
                  Al momento non sono presenti strutture censite per {pattern.animalNamePlural} a {city.name}. Puoi comunque inviare una richiesta di contatto per raggiungere i professionisti della zona.
                </p>
              </div>
              <div className="flex justify-center">
                <Link to={`/richiedi-assistenza/?animale=${pattern.animalId}&localita=${encodeURIComponent(city.name)}`}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
                  Invia richiesta di contatto
                </Link>
              </div>
              {nearbyCities.length > 0 && (
                <div className="pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground mb-2 text-center">
                    Puoi consultare anche le strutture nelle città vicine:
                  </p>
                  <div className="flex flex-wrap gap-1.5 justify-center">
                    {nearbyCities.slice(0, 5).map(c => (
                      <Link key={c!.slug} to={`/${pattern.prefix}${c!.slug}/`}
                        className="px-2.5 py-1 rounded-full bg-accent text-accent-foreground text-[11px] font-medium hover:bg-primary hover:text-primary-foreground transition-colors">
                        {c!.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}

          {/* ── Nearby cities ── */}
          {nearbyCities.length > 0 && (
            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                Veterinario per {pattern.animalNamePlural} nelle zone limitrofe
              </h2>
              <div className="flex flex-wrap gap-2">
                {nearbyCities.map(c => (
                  <Link
                    key={c!.slug}
                    to={`/${pattern.prefix}${c!.slug}/`}
                    className="px-3 py-1.5 rounded-lg border border-border bg-card text-xs font-medium text-foreground hover:border-primary/40 hover:bg-accent transition-all"
                  >
                    {pattern.emoji} {pattern.h1Template(c!.name)}
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* ── Other animal types in this city ── */}
          <RelatedLinks
            title={`Altri animali a ${city.name}`}
            links={animalCityKeywordPatterns
              .filter(p => p.prefix !== pattern.prefix)
              .map(p => ({
                label: p.h1Template(city.name),
                href: `/${p.prefix}${city.slug}/`,
                description: p.summaryTemplate(city.name).slice(0, 80) + "…",
              }))}
          />

          <AreaCoverage />
          <EditorialInfo lastUpdated="2026-03-01" />
          <FaqSection items={faq} />
          <VetDisclaimer />
          <PageCTA
            title={`Cerchi un veterinario per ${pattern.animalNamePlural} a ${city.name}?`}
            href={`/richiedi-assistenza/?animale=${pattern.animalId}&localita=${encodeURIComponent(city.name)}`}
          />
        </div>
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
}
