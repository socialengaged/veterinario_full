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
import { getCity, getClinicsByCity, getService, getAllServices, getProvince } from "@/data";
import { generateServiceCityProse } from "@/lib/content-generators";
import { serviceCityKeywordPatterns, cityKeywordPatterns, type ServiceCityKeywordPattern } from "@/data/keywords";
import { animalCategories } from "@/config/site";
import { breadcrumbJsonLd, faqJsonLd, webPageJsonLd, veterinaryCareJsonLd, serviceJsonLd, itemListJsonLd } from "@/lib/seo";
import NotFound from "@/pages/NotFound";

interface Props {
  pattern: ServiceCityKeywordPattern;
  citySlug: string;
}

export default function KeywordServiceCityPage({ pattern, citySlug }: Props) {
  const city = getCity(citySlug);
  if (!city) return <NotFound />;

  const clinics = getClinicsByCity(citySlug);
  const service = getService(pattern.serviceSlug);
  const relevantClinics = clinics.filter(c => c.services.includes(pattern.serviceSlug));
  const nearbyCities = city.nearbyCities.map(s => getCity(s)).filter(c => c && getClinicsByCity(c.slug).length > 0);
  const allServices = getAllServices();
  const province = getProvince(city.provinceSlug);
  const provinceName = province?.name || city.provinceSlug;

  const canonicalPath = `/${pattern.prefix}${citySlug}/`;
  const h1 = pattern.h1Template(city.name);

  const faq = [
    { q: `Come trovo un servizio di ${pattern.serviceName.toLowerCase()} a ${city.name}?`, a: `In questa pagina sono elencate le strutture disponibili a ${city.name} e dintorni. Puoi anche inviare una richiesta di contatto gratuita tramite il nostro modulo.` },
    { q: `Quanto costa ${pattern.serviceName.toLowerCase()} a ${city.name}?`, a: "I costi variano in base alla struttura, alla complessità della prestazione e all'animale. Contatta direttamente le strutture per un preventivo." },
    { q: `Ci sono strutture con ${pattern.serviceName.toLowerCase()} vicino a ${city.name}?`, a: `Se non ci sono strutture disponibili direttamente a ${city.name}, puoi consultare le città limitrofe o inviare una richiesta di contatto.` },
    { q: `Serve un appuntamento per ${pattern.serviceName.toLowerCase()}?`, a: "In generale sì, soprattutto per i servizi specialistici. Contatta direttamente la struttura per concordare data e orario." },
  ];

  // Other service-city patterns for this city
  const otherServicePatterns = serviceCityKeywordPatterns.filter(p => p.prefix !== pattern.prefix);

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
            { name: pattern.serviceName },
          ]),
          faqJsonLd(faq),
          veterinaryCareJsonLd({
            name: h1,
            areaServed: city.name,
            serviceType: pattern.serviceName,
            url: canonicalPath,
            description: pattern.metaDescTemplate(city.name),
          }),
          serviceJsonLd({
            name: pattern.serviceName,
            description: pattern.introTemplate(city.name),
            url: canonicalPath,
            areaServed: city.name,
          }),
          relevantClinics.length > 0 ? itemListJsonLd({
            name: `Strutture con ${pattern.serviceName.toLowerCase()} a ${city.name}`,
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
            { label: pattern.serviceName },
          ]} />

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
            { label: "Servizio", value: `${pattern.emoji} ${pattern.serviceName}` },
            { label: "Zona", value: city.name },
            { label: "CAP", value: city.cap },
            { label: "Provincia", value: provinceName },
          ]} />

          {/* ── Rich editorial prose ── */}
          <section className="space-y-4">
            <h2 className="font-display text-2xl font-bold text-foreground mb-3">
              {pattern.serviceName} a {city.name}
            </h2>
            {generateServiceCityProse(
              pattern.serviceName,
              city.name,
              relevantClinics.length,
              provinceName,
            ).split("\n\n").map((p, i) => (
              <p key={i} className="text-muted-foreground leading-relaxed">{p}</p>
            ))}
          </section>

          {/* What this service involves */}
          {service && (
            <section className="p-5 rounded-xl border border-border bg-card">
              <h2 className="font-display text-lg font-semibold text-foreground mb-3">Cos'è {pattern.serviceName.toLowerCase()}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{service.definition}</p>
              {service.bulletPoints.length > 0 && (
                <ul className="space-y-1.5">
                  {service.bulletPoints.slice(0, 5).map((bp, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-0.5">✓</span> {bp}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )}

          {/* Animals commonly treated */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              Animali trattati
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Il servizio di {pattern.serviceName.toLowerCase()} è disponibile per diverse specie animali. Ecco le categorie più comuni:
            </p>
            <div className="flex flex-wrap gap-2">
              {animalCategories.slice(0, 3).flatMap(cat => cat.animals.slice(0, 3)).map(a => (
                <span key={a.id} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-accent text-accent-foreground text-xs font-medium">
                  {a.emoji} {a.label}
                </span>
              ))}
            </div>
          </section>

          {/* Clinics */}
          {relevantClinics.length > 0 ? (
            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                Strutture con {pattern.serviceName.toLowerCase()} a {city.name}
              </h2>
              <div className="grid gap-4">
                {relevantClinics.map(clinic => (
                  <ClinicCard key={clinic.slug} clinic={clinic} />
                ))}
              </div>
            </section>
          ) : (
            <section className="p-8 rounded-xl border border-border bg-card space-y-4">
              <div className="text-center">
                <h3 className="font-display font-semibold text-foreground mb-2">
                  Stiamo espandendo la rete per {pattern.serviceName.toLowerCase()} a {city.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto">
                  Al momento non sono presenti strutture censite per {pattern.serviceName.toLowerCase()} a {city.name}. Puoi comunque inviare una richiesta di contatto per raggiungere i professionisti della zona.
                </p>
              </div>
              <div className="flex justify-center">
                <Link to={`/richiedi-assistenza/?localita=${encodeURIComponent(city.name)}&servizio=${encodeURIComponent(pattern.serviceName)}`}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
                  Invia richiesta di contatto
                </Link>
              </div>
              {nearbyCities.length > 0 && (
                <div className="pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground mb-2 text-center">
                    In caso di urgenza, considera anche le strutture nelle città vicine:
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

          <EmergencyBlock />

          {/* Other services in this city */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              Altri servizi veterinari a {city.name}
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

          {/* Related service-city pages */}
          <RelatedLinks
            title={`Servizi specialistici a ${city.name}`}
            links={otherServicePatterns.slice(0, 6).map(p => ({
              label: p.h1Template(city.name),
              href: `/${p.prefix}${city.slug}/`,
              description: p.summaryTemplate(city.name).slice(0, 80) + "…",
            }))}
          />

          {/* General keyword pages for this city */}
          <RelatedLinks
            title={`Cerca anche a ${city.name}`}
            links={cityKeywordPatterns.slice(0, 4).map(p => ({
              label: p.h1Template(city.name),
              href: `/${p.prefix}${city.slug}/`,
            }))}
          />

          {/* Nearby cities */}
          {nearbyCities.length > 0 && (
            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                {pattern.serviceName} nelle zone limitrofe
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

          <AreaCoverage />
          <EditorialInfo lastUpdated="2026-03-01" />
          <FaqSection items={faq} />
          <VetDisclaimer />
          <PageCTA
            title={`Cerchi ${pattern.serviceName.toLowerCase()} a ${city.name}?`}
            href={`/richiedi-assistenza/?localita=${encodeURIComponent(city.name)}&servizio=${encodeURIComponent(pattern.serviceName)}`}
          />
        </div>
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
}
