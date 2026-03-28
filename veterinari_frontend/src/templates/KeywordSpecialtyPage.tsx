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
import { VetDisclaimer } from "@/components/VetDisclaimer";
import { EditorialInfo } from "@/components/EditorialInfo";
import { AreaCoverage } from "@/components/AreaCoverage";
import { Disclaimer } from "@/components/Disclaimer";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { getAllServices, getAllCities } from "@/data";
import { generateSpecialtyProse } from "@/lib/content-generators";
import { type SpecialtyKeywordPage, specialtyKeywordPages } from "@/data/keywords";
import { siteConfig } from "@/config/site";
import { breadcrumbJsonLd, faqJsonLd, webPageJsonLd, serviceJsonLd } from "@/lib/seo";

interface Props {
  page: SpecialtyKeywordPage;
}

export default function KeywordSpecialtyPageTemplate({ page }: Props) {
  const relatedServices = page.relatedServices.map(s => getAllServices().find(x => x.slug === s)).filter(Boolean);
  const sampleCities = getAllCities().filter(c => c.provinceSlug === "lecce").slice(0, 10);

  const canonicalPath = `/${page.slug}/`;

  // Other specialty pages
  const otherSpecialties = Object.values(specialtyKeywordPages).filter(s => s.slug !== page.slug).slice(0, 4);

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
            name: page.specialtyName,
            description: page.summary,
            url: canonicalPath,
          }),
        ]}
      />
      <Header />
      <main className="bg-background">
        <div className="container py-8 md:py-12 space-y-12 md:space-y-16 max-w-4xl">
          <Breadcrumbs items={[{ label: "Servizi", href: "/" }, { label: page.specialtyName }]} />

          <section>
            <div className="text-4xl mb-4">{page.emoji}</div>
            <h1 className="font-display text-3xl md:text-4xl font-extrabold text-foreground mb-4">
              {page.h1}
            </h1>
            <AnswerSummary>{page.summary}</AnswerSummary>
          </section>

          <QuickFacts facts={[
            { label: "Specializzazione", value: page.specialtyName },
            { label: "Copertura", value: siteConfig.initialArea },
            { label: "Costo ricerca", value: "Gratuito" },
          ]} />

          {/* ── Rich editorial prose ── */}
          <section className="space-y-4">
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">
              La {page.specialtyName.toLowerCase()} per il tuo animale
            </h2>
            {generateSpecialtyProse(
              page.specialtyName,
              page.summary,
              relatedServices.map(s => s!.name),
            ).split("\n\n").map((p, i) => (
              <p key={i} className="text-muted-foreground leading-relaxed">{p}</p>
            ))}
          </section>

          <section className="grid md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl border border-border bg-card">
              <h2 className="font-display font-semibold text-foreground mb-2">Cosa fa il {page.specialtyName.toLowerCase()}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{page.whatTheyDo}</p>
            </div>
            <div className="p-5 rounded-xl border border-border bg-card">
              <h2 className="font-display font-semibold text-foreground mb-2">Quando rivolgersi a uno specialista</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{page.whenToSeek}</p>
            </div>
          </section>

          <section className="p-5 rounded-xl border border-border bg-card">
            <h2 className="font-display font-semibold text-foreground mb-2">Cosa aspettarsi dalla visita</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{page.whatToExpect}</p>
          </section>

          <Disclaimer variant="info">
            Consulta le strutture disponibili nella tua zona. Non tutti i veterinari offrono servizi specialistici: verifica la disponibilità nella tua area.
          </Disclaimer>

          {/* Local pages */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              Trova un {page.specialtyName.toLowerCase()} nella tua città
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

          {/* Related services */}
          {relatedServices.length > 0 && (
            <RelatedLinks
              title="Servizi correlati"
              links={relatedServices.map(s => ({
                label: s!.name,
                href: `/${s!.slug}/`,
                description: s!.intro.slice(0, 80) + "…",
              }))}
            />
          )}

          {/* Other specialties */}
          <RelatedLinks
            title="Altre specializzazioni veterinarie"
            links={otherSpecialties.map(s => ({
              label: s.specialtyName,
              href: `/${s.slug}/`,
              description: s.summary.slice(0, 80) + "…",
            }))}
          />

          <AreaCoverage />
          <EditorialInfo lastUpdated="2026-03-01" />
          <FaqSection items={page.faq} />
          <VetDisclaimer />
          <PageCTA
            title={`Cerchi un ${page.specialtyName.toLowerCase()}?`}
            href="/richiedi-assistenza/"
          />
        </div>
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
}
