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
import { EditorialInfo } from "@/components/EditorialInfo";
import { Disclaimer } from "@/components/Disclaimer";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { getService, getPublicServices, getAllCities, getPublicServiceAnimalPages } from "@/data";
import { serviceEditorials } from "@/data/service-editorial";
import { serviceImages } from "@/data/service-images";
import NotFound from "@/pages/NotFound";
import { siteConfig } from "@/config/site";
import { breadcrumbJsonLd, faqJsonLd, webPageJsonLd, serviceJsonLd } from "@/lib/seo";
import { CheckCircle, List } from "lucide-react";

export default function ServicePageTemplate() {
  const params = useParams();
  const serviceSlug = params.serviceSlug || params.slug || "";
  const service = getService(serviceSlug);
  if (!service) return <NotFound />;

  const allServices = getPublicServices();
  const relatedServices = service.relatedServices
    .map((slug) => allServices.find((x) => x.slug === slug))
    .filter((x): x is NonNullable<typeof x> => x != null);
  const sampleCities = getAllCities().filter(c => c.provinceSlug === "lecce").slice(0, 10);
  const animalPages = getPublicServiceAnimalPages().filter(p => p.serviceSlug === service.slug);
  const heroImage = serviceImages[service.slug];
  const editorial = serviceEditorials[service.slug];
  const canonicalPath = `/${service.slug}/`;
  const breadcrumbs = [{ name: service.name }];

  return (
    <>
      <PageMeta
        title={service.metaTitle}
        description={service.metaDescription}
        canonical={canonicalPath}
        jsonLd={[
          webPageJsonLd({ title: service.metaTitle, description: service.metaDescription, url: canonicalPath }),
          breadcrumbJsonLd(breadcrumbs),
          faqJsonLd(service.faq),
          serviceJsonLd({
            name: service.name,
            description: service.definition,
            url: canonicalPath,
            category: service.category,
          }),
        ]}
      />
      <Header />
      <main className="bg-background">
        <div className="container py-8 md:py-12 space-y-12 md:space-y-16 max-w-4xl">
          <Breadcrumbs items={[{ label: "Servizi", href: "/servizi/" }, { label: service.name }]} />

          {/* ── Direct answer section with hero image ── */}
          <section>
            {heroImage && (
              <div className="rounded-2xl overflow-hidden mb-6 aspect-[800/544]">
                <img
                  src={heroImage}
                  alt={service.name}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
            )}
            <div className="text-4xl mb-4">{service.icon}</div>
            <h1 className="font-display text-3xl md:text-4xl font-extrabold text-foreground mb-4">
              {service.name}
            </h1>
            <AnswerSummary>
              <strong>In breve:</strong> {service.definition}
            </AnswerSummary>
          </section>

          {/* ── Service per animale ── */}
          {animalPages.length > 0 && (
            <section>
              <h2 className="font-display text-xl font-bold text-foreground mb-3">
                {service.name} per animale
              </h2>
              <div className="flex flex-wrap gap-2">
                {animalPages.map(ap => (
                  <Link
                    key={ap.slug}
                    to={`/${ap.slug}/`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border bg-card text-sm font-medium text-foreground hover:border-primary/40 hover:bg-accent transition-all"
                  >
                    <span>{ap.animalEmoji}</span>
                    {ap.serviceName} {ap.animalName}
                  </Link>
                ))}
              </div>
            </section>
          )}

          <QuickFacts facts={[
            { label: "Servizio", value: service.name },
            { label: "Disponibilità", value: siteConfig.initialArea },
            { label: "Costo ricerca", value: "Gratuito" },
            { label: "A chi è rivolto", value: service.whoIsFor },
          ]} />

          {/* ── Cos'è questo servizio ── */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-3">
              Cos'è {service.name.charAt(0).toLowerCase() + service.name.slice(1)}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">{service.intro}</p>

            {/* Bullet point explanation */}
            <div className="p-6 rounded-xl border-2 border-primary/20 bg-accent">
              <h3 className="font-display text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                <List className="h-5 w-5 text-primary" /> Cosa comprende
              </h3>
              <ul className="space-y-2">
                {service.bulletPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                    <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* ── When it is needed ── */}
          <section className="grid md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl border border-border bg-card">
              <h2 className="font-display font-semibold text-foreground mb-2">Quando è necessario</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{service.whenToSeek}</p>
            </div>
            <div className="p-5 rounded-xl border border-border bg-card">
              <h2 className="font-display font-semibold text-foreground mb-2">Cosa aspettarsi</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{service.whatToExpect}</p>
            </div>
          </section>

          {/* ── Common situations ── */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              Situazioni comuni
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Ecco le situazioni più frequenti in cui si ricerca questo servizio:
            </p>
            <ul className="grid sm:grid-cols-2 gap-2">
              {service.commonSituations.map((situation, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground p-3 rounded-lg border border-border bg-card">
                  <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  {situation}
                </li>
              ))}
            </ul>
          </section>

          {/* ── Who it's for ── */}
          <section className="p-5 rounded-xl border border-border bg-card">
            <h2 className="font-display font-semibold text-foreground mb-2">A chi è rivolto</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{service.whoIsFor}</p>
          </section>

          {/* ── Editorial: practical advice, costs, how to choose ── */}
          {editorial && (
            <section className="space-y-6">
              <div className="p-6 rounded-xl border border-primary/15 bg-primary/5">
                <h2 className="font-display text-xl font-bold text-foreground mb-3">
                  💡 Consigli pratici
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{editorial.practicalAdvice}</p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-5 rounded-xl border border-border bg-card">
                  <h3 className="font-display font-semibold text-foreground mb-2">💰 Costi indicativi</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{editorial.costInfo}</p>
                </div>
                <div className="p-5 rounded-xl border border-border bg-card">
                  <h3 className="font-display font-semibold text-foreground mb-2">🔍 Come scegliere</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{editorial.howToChoose}</p>
                </div>
              </div>
            </section>
          )}

          <Disclaimer variant="info">{service.disclaimer}</Disclaimer>

          {/* ── Where to find nearby ── */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              Dove trovare {service.name.toLowerCase()} vicino a te
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Il nostro servizio è attivo in {siteConfig.initialArea}. Seleziona la tua città per trovare il professionista più vicino:
            </p>
            <div className="flex flex-wrap gap-2">
              {sampleCities.map(c => (
                <Link key={c.slug} to={`/${c.regionSlug}/${c.provinceSlug}/${c.slug}/${service.slug}/`}
                  className="px-3 py-1.5 rounded-lg border border-border bg-card text-xs font-medium text-foreground hover:border-primary/40 hover:bg-accent transition-all">
                  {service.name} a {c.name}
                </Link>
              ))}
            </div>
          </section>

          {relatedServices.length > 0 && (
            <RelatedLinks title="Servizi correlati"
              links={relatedServices.map(s => ({
                label: s!.name, href: `/${s!.slug}/`,
                description: s!.definition.slice(0, 100) + "…",
              }))}
            />
          )}

          <AreaCoverage />
          <EditorialInfo lastUpdated="2026-03-01" />
          <FaqSection items={service.faq} />
          <VetDisclaimer />
          <PageCTA title={`Hai bisogno di ${service.name.toLowerCase()}?`} href="/richiedi-assistenza/" />
        </div>
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
}
