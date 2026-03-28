import { useParams, Link } from "react-router-dom";
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
import { VetDisclaimer } from "@/components/VetDisclaimer";
import { EditorialInfo } from "@/components/EditorialInfo";
import { Disclaimer } from "@/components/Disclaimer";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { getCity, getProvince, getRegion, getService, getClinicsByCity, getAllServices } from "@/data";
import { cities as allCitiesMap } from "@/data/cities";
import { getServiceCityContent } from "@/data/service-city-content";
import { Clock, Euro, ClipboardList } from "lucide-react";
import NotFound from "@/pages/NotFound";
import { breadcrumbJsonLd, faqJsonLd, webPageJsonLd, veterinaryCareJsonLd, serviceJsonLd, itemListJsonLd } from "@/lib/seo";
import { siteConfig } from "@/config/site";

/** Replace {city}, {province}, {service} placeholders */
function interpolate(text: string, city: string, province: string, service: string): string {
  return text.replace(/\{city\}/g, city).replace(/\{province\}/g, province).replace(/\{service\}/g, service);
}

export default function CityServicePage() {
  const { regionSlug, provinceSlug, citySlug, serviceSlug } = useParams<{
    regionSlug: string; provinceSlug: string; citySlug: string; serviceSlug: string;
  }>();
  const city = getCity(citySlug || "");
  const province = getProvince(provinceSlug || "");
  const region = getRegion(regionSlug || "");
  const service = getService(serviceSlug || "");
  if (!city || !province || !region || !service) return <NotFound />;

  const clinics = getClinicsByCity(city.slug).filter(c => c.services.includes(service.slug));
  const allServices = getAllServices();
  const nearbyCities = city.nearbyCities.map(s => allCitiesMap[s]).filter(c => c && getClinicsByCity(c.slug).length > 0);
  const enrichment = getServiceCityContent(service.slug);

  const faq = [
    { q: `Dove trovare ${service.name.toLowerCase()} a ${city.name}?`, a: `In questa pagina trovi le strutture che offrono ${service.name.toLowerCase()} a ${city.name}. Se non trovi quello che cerchi, puoi inviare una richiesta di contatto gratuita.` },
    { q: `Quanto costa ${service.name.toLowerCase()} a ${city.name}?`, a: `I costi indicativi per ${service.name.toLowerCase()} sono ${enrichment.costRange}. Il prezzo finale dipende dalla struttura e dalla complessità del caso. Puoi richiedere un preventivo contattando direttamente le strutture.` },
    { q: `${service.name} è disponibile nel weekend a ${city.name}?`, a: "La disponibilità nel weekend varia per struttura. Contatta direttamente le cliniche per verificare gli orari." },
    { q: `Come contatto una struttura per ${service.name.toLowerCase()} a ${city.name}?`, a: `Puoi contattare direttamente le strutture elencate in questa pagina oppure compilare il modulo di richiesta di contatto per inoltrare la tua richiesta.` },
    { q: `Servono esami preliminari per ${service.name.toLowerCase()}?`, a: `Dipende dal tipo di servizio e dalle condizioni del tuo animale. Il veterinario ti indicherà eventuali esami o preparazioni necessarie al momento della prenotazione.` },
    { q: `Quanto dura ${service.name.toLowerCase()}?`, a: `La durata tipica per ${service.name.toLowerCase()} è di ${enrichment.duration}. I tempi possono variare in base alla complessità del caso e alle esigenze del tuo animale.` },
  ];

  const canonicalPath = `/${region.slug}/${province.slug}/${city.slug}/${service.slug}/`;
  const breadcrumbs = [
    { name: region.name, url: `/${region.slug}/` },
    { name: province.name, url: `/${region.slug}/${province.slug}/` },
    { name: city.name, url: `/${region.slug}/${province.slug}/${city.slug}/` },
    { name: service.name },
  ];

  return (
    <>
      <PageMeta
        title={`${service.name} a ${city.name} — ${city.metaTitle}`}
        description={`Trova ${service.name.toLowerCase()} a ${city.name}. Strutture e professionisti nella zona di ${city.name}, ${province.name}.`}
        canonical={canonicalPath}
        jsonLd={[
          webPageJsonLd({ title: `${service.name} a ${city.name}`, description: `Trova ${service.name.toLowerCase()} a ${city.name}.`, url: canonicalPath }),
          breadcrumbJsonLd(breadcrumbs),
          faqJsonLd(faq),
          veterinaryCareJsonLd({
            name: `${service.name} a ${city.name}`,
            areaServed: city.name,
            serviceType: service.name,
            url: canonicalPath,
            description: `Trova ${service.name.toLowerCase()} a ${city.name}, ${province.name}.`,
          }),
          serviceJsonLd({
            name: service.name,
            description: service.definition,
            url: canonicalPath,
            areaServed: city.name,
          }),
          clinics.length > 0 ? itemListJsonLd({
            name: `Strutture per ${service.name.toLowerCase()} a ${city.name}`,
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
          <Breadcrumbs items={[
            { label: region.name, href: `/${region.slug}/` },
            { label: province.name, href: `/${region.slug}/${province.slug}/` },
            { label: city.name, href: `/${region.slug}/${province.slug}/${city.slug}/` },
            { label: service.name },
          ]} />

          <section>
            <div className="text-3xl mb-3">{service.icon}</div>
            <h1 className="font-display text-3xl md:text-4xl font-extrabold text-foreground mb-4">
              {service.name} a {city.name}
            </h1>
            <AnswerSummary>
              Cerchi {service.name.toLowerCase()} a {city.name}? {siteConfig.name} elenca le strutture veterinarie
              disponibili nella zona.
              {clinics.length > 0
                ? ` Sono presenti ${clinics.length} strutture veterinarie nella zona di ${city.name}.`
                : ` Invia una richiesta di contatto gratuita per raggiungere i professionisti della zona.`}
            </AnswerSummary>
          </section>

          <QuickFacts facts={[
            { label: "Servizio", value: service.name },
            { label: "Città", value: `${city.name} (${city.cap})` },
            { label: "Strutture trovate", value: String(clinics.length) },
            { label: "Provincia", value: province.name },
            { label: "Costo indicativo", value: enrichment.costRange },
            { label: "Durata tipica", value: enrichment.duration },
          ]} />

          {/* ── Rich editorial prose ── */}
          <section className="space-y-4">
            <h2 className="font-display text-2xl font-bold text-foreground">
              {service.name} a {city.name}: guida completa
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {interpolate(enrichment.prose, city.name, province.name, service.name.toLowerCase())}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {interpolate(enrichment.localContext, city.name, province.name, service.name.toLowerCase())}
            </p>
          </section>

          {/* ── Info cards: cost, duration, preparation ── */}
          <section className="grid sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl border border-border bg-card flex flex-col items-start gap-2">
              <Euro className="h-5 w-5 text-primary" />
              <h3 className="font-display font-semibold text-foreground text-sm">Costo indicativo</h3>
              <p className="text-sm text-muted-foreground">{enrichment.costRange}</p>
            </div>
            <div className="p-5 rounded-xl border border-border bg-card flex flex-col items-start gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <h3 className="font-display font-semibold text-foreground text-sm">Durata tipica</h3>
              <p className="text-sm text-muted-foreground">{enrichment.duration}</p>
            </div>
            <div className="p-5 rounded-xl border border-border bg-card flex flex-col items-start gap-2">
              <ClipboardList className="h-5 w-5 text-primary" />
              <h3 className="font-display font-semibold text-foreground text-sm">Preparazione</h3>
              <p className="text-sm text-muted-foreground">{enrichment.preparation.length} passi consigliati</p>
            </div>
          </section>

          {/* ── Preparation checklist ── */}
          <section className="p-5 rounded-xl border-2 border-primary/20 bg-accent">
            <h2 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-primary" />
              Come prepararsi per {service.name.toLowerCase()} a {city.name}
            </h2>
            <ul className="space-y-2">
              {enrichment.preparation.map((step, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                  <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ul>
          </section>

          {/* When to seek + what to expect */}
          <section className="grid md:grid-cols-2 gap-5">
            <div className="p-5 rounded-xl border border-border bg-card">
              <h2 className="font-display font-semibold text-foreground mb-2">Quando è necessario</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{service.whenToSeek}</p>
            </div>
            <div className="p-5 rounded-xl border border-border bg-card">
              <h2 className="font-display font-semibold text-foreground mb-2">Cosa aspettarsi</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{service.whatToExpect}</p>
            </div>
          </section>

          {/* Bullet points — what's included */}
          {service.bulletPoints.length > 0 && (
            <section className="p-5 rounded-xl border border-border bg-surface">
              <h2 className="font-display font-semibold text-foreground mb-3">Cosa comprende {service.name.toLowerCase()} a {city.name}</h2>
              <ul className="space-y-1.5">
                {service.bulletPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-primary font-bold flex-shrink-0">✓</span>
                    {point}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Clinics */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              Strutture per {service.name.toLowerCase()} a {city.name}
            </h2>
            {clinics.length > 0 ? (
              <div className="grid sm:grid-cols-2 gap-4">
                {clinics.map(c => <ClinicCard key={c.slug} clinic={c} />)}
              </div>
            ) : (
              <div className="p-8 rounded-xl border border-border bg-surface space-y-4">
                <div className="text-center">
                  <h3 className="font-display font-semibold text-foreground mb-2">
                    Strutture per {service.name.toLowerCase()} a {city.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto">
                    Non abbiamo ancora strutture censite per questo servizio a {city.name}. Invia una richiesta di contatto per raggiungere i professionisti della zona.
                  </p>
                </div>
                <div className="flex justify-center">
                  <Link to={`/richiedi-assistenza/?localita=${encodeURIComponent(city.name)}&servizio=${encodeURIComponent(service.name)}`}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
                    Invia richiesta di contatto
                  </Link>
                </div>
                {nearbyCities.length > 0 && (
                  <div className="pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground mb-2 text-center">{service.name} nelle città vicine:</p>
                    <div className="flex flex-wrap gap-1.5 justify-center">
                      {nearbyCities.slice(0, 5).map(c => (
                        <Link key={c.slug} to={`/${region.slug}/${c.provinceSlug}/${c.slug}/${service.slug}/`}
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

          <Disclaimer variant="info">{service.disclaimer}</Disclaimer>

          {/* Nearby */}
          {nearbyCities.length > 0 && (
            <RelatedLinks
              title={`${service.name} nelle città vicine`}
              links={nearbyCities.map(c => ({
                label: `${service.name} a ${c.name}`,
                href: `/${region.slug}/${c.provinceSlug}/${c.slug}/${service.slug}/`,
              }))}
            />
          )}

          {/* Other services in city */}
          <section>
            <h2 className="font-display text-xl font-bold text-foreground mb-3">
              Altri servizi veterinari a {city.name}
            </h2>
            <div className="flex flex-wrap gap-2">
              {allServices.filter(s => s.slug !== service.slug).map(s => (
                <Link key={s.slug} to={`/${region.slug}/${province.slug}/${city.slug}/${s.slug}/`}
                  className="px-3 py-1.5 rounded-lg border border-border bg-card text-xs font-medium text-foreground hover:border-primary/40 hover:bg-accent transition-all">
                  {s.icon} {s.name}
                </Link>
              ))}
            </div>
          </section>

          <EditorialInfo lastUpdated="2026-03-01" />
          <FaqSection items={faq} />
          <VetDisclaimer />
          <PageCTA title={`Hai bisogno di ${service.name.toLowerCase()} a ${city.name}?`} href="/richiedi-assistenza/" />
        </div>
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
}
