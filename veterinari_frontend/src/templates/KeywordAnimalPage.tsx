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
import { getClinicsByAnimal, getPublicServices, getAllCities } from "@/data";
import { generateAnimalPageProse } from "@/lib/content-generators";
import { type AnimalKeywordPage, animalKeywordPages, cityKeywordPatterns } from "@/data/keywords";
import { siteConfig } from "@/config/site";
import { breadcrumbJsonLd, faqJsonLd, webPageJsonLd, serviceJsonLd, itemListJsonLd } from "@/lib/seo";

interface Props {
  page: AnimalKeywordPage;
}

export default function KeywordAnimalPageTemplate({ page }: Props) {
  const clinics = getClinicsByAnimal(page.animalId);
  const relatedServices = page.commonServices.map(s => getPublicServices().find(x => x.slug === s)).filter(Boolean);
  const sampleCities = getAllCities().filter(c => c.provinceSlug === "lecce").slice(0, 8);

  const canonicalPath = `/${page.slug}/`;

  // Related animal pages
  const otherAnimals = Object.values(animalKeywordPages).filter(a => a.slug !== page.slug).slice(0, 4);

  return (
    <>
      <PageMeta
        title={page.metaTitle}
        description={page.metaDescription}
        canonical={canonicalPath}
        jsonLd={[
          webPageJsonLd({ title: page.metaTitle, description: page.metaDescription, url: canonicalPath }),
          breadcrumbJsonLd([{ name: page.h1 }]),
          faqJsonLd(page.faq),
          serviceJsonLd({
            name: `Veterinario per ${page.animalNamePlural}`,
            description: page.summary,
            url: canonicalPath,
          }),
          clinics.length > 0 ? itemListJsonLd({
            name: `Veterinari per ${page.animalNamePlural}`,
            url: canonicalPath,
            items: clinics.slice(0, 10).map((c, i) => ({
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
          <Breadcrumbs items={[{ label: page.h1 }]} />

          <section>
            <div className="text-4xl mb-4">{page.emoji}</div>
            <h1 className="font-display text-3xl md:text-4xl font-extrabold text-foreground mb-4">
              {page.h1}
            </h1>
            <AnswerSummary>{page.summary}</AnswerSummary>
          </section>

          <QuickFacts facts={[
            { label: "Animale", value: `${page.emoji} ${page.animalName.charAt(0).toUpperCase() + page.animalName.slice(1)}` },
            { label: "Copertura", value: siteConfig.initialArea },
            { label: "Costo ricerca", value: "Gratuito" },
            { label: "Strutture disponibili", value: `${clinics.length} nella zona` },
          ]} />

          {/* ── Rich editorial prose ── */}
          <section className="space-y-4">
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">
              Veterinari disponibili per {page.animalNamePlural}
            </h2>
            {generateAnimalPageProse(
              page.animalName,
              page.animalNamePlural,
              clinics.length,
              page.commonServices,
            ).split("\n\n").map((p, i) => (
              <p key={i} className="text-muted-foreground leading-relaxed">{p}</p>
            ))}
          </section>

          <section className="p-5 rounded-xl border border-border bg-card">
            <h2 className="font-display font-semibold text-foreground mb-2">Quando portare il tuo {page.animalName} dal veterinario</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{page.whenToSeek}</p>
          </section>

          {/* Clinics treating this animal */}
          {clinics.length > 0 && (
            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                Veterinari per {page.animalNamePlural} nella zona
              </h2>
              <div className="grid gap-4">
                {clinics.slice(0, 6).map(clinic => (
                  <ClinicCard key={clinic.slug} clinic={clinic} />
                ))}
              </div>
              {clinics.length > 6 && (
                <p className="text-sm text-muted-foreground mt-4">
                  e altre {clinics.length - 6} strutture. <Link to="/elenco/" className="text-primary hover:underline">Vedi tutte →</Link>
                </p>
              )}
            </section>
          )}

          {/* Related services */}
          {relatedServices.length > 0 && (
            <RelatedLinks
              title={`Servizi per ${page.animalNamePlural}`}
              links={relatedServices.map(s => ({
                label: s!.name,
                href: `/${s!.slug}/`,
                description: s!.intro.slice(0, 80) + "…",
              }))}
            />
          )}

          {/* City keyword pages for this search */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              Trova un veterinario per {page.animalNamePlural} nella tua città
            </h2>
            <div className="flex flex-wrap gap-2">
              {sampleCities.map(c => (
                <Link
                  key={c.slug}
                  to={`/veterinario-${c.slug}/`}
                  className="px-3 py-1.5 rounded-lg border border-border bg-card text-xs font-medium text-foreground hover:border-primary/40 hover:bg-accent transition-all"
                >
                  Veterinario a {c.name}
                </Link>
              ))}
            </div>
          </section>

          {/* Other animal pages */}
          <RelatedLinks
            title="Veterinari per altri animali"
            links={otherAnimals.map(a => ({
              label: a.h1,
              href: `/${a.slug}/`,
              description: a.summary.slice(0, 80) + "…",
            }))}
          />

          <AreaCoverage />
          <EditorialInfo lastUpdated="2026-03-01" />
          <FaqSection items={page.faq} />
          <VetDisclaimer />
          <PageCTA
            title={`Cerchi assistenza per il tuo ${page.animalName}?`}
            href={`/richiedi-assistenza/?animale=${page.animalId}`}
          />
        </div>
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
}
