import { useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageMeta } from "@/components/PageMeta";
import { PageCTA } from "@/components/PageCTA";
import { FaqSection } from "@/components/FaqSection";
import { AnswerSummary } from "@/components/AnswerSummary";
import { QuickFacts } from "@/components/QuickFacts";
import { VetDisclaimer } from "@/components/VetDisclaimer";
import { EditorialInfo } from "@/components/EditorialInfo";
import { Disclaimer } from "@/components/Disclaimer";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { ClinicMap } from "@/components/ClinicMap";
import { ContactGate } from "@/components/ContactGate";
import { getClinicImage } from "@/data/clinic-images";
import { getClinic, getCity, getService } from "@/data";
import { getAccessToken } from "@/lib/api";
import { generateProfileProse } from "@/lib/content-generators";
import { MapPin, Star, Globe, Stethoscope, Phone, Mail } from "lucide-react";
import NotFound from "@/pages/NotFound";
import { siteConfig } from "@/config/site";
import { breadcrumbJsonLd, faqJsonLd, localBusinessJsonLd } from "@/lib/seo";

export default function ProfilePage() {
  const { slug } = useParams<{ slug: string }>();
  const clinic = getClinic(slug || "");
  if (!clinic) return <NotFound />;

  const city = getCity(clinic.citySlug);
  const serviceDetails = clinic.services.map(s => getService(s)).filter(Boolean);
  const clinicImage = getClinicImage(slug || "") || clinic.image;

  const isLoggedIn = !!getAccessToken();

  const typeLabels: Record<string, string> = {
    clinica: "Clinica veterinaria",
    ambulatorio: "Ambulatorio veterinario",
    veterinario: "Medico veterinario",
  };

  const breadcrumbBase = city
    ? [
        { label: city.name, href: `/${clinic.regionSlug}/${clinic.provinceSlug}/${clinic.citySlug}/` },
      ]
    : [];

  const allServiceNames = [
    ...serviceDetails.filter(Boolean).map(s => s!.name.toLowerCase()),
    ...(clinic.scrapedServices || []).filter(s => !serviceDetails.some(sd => sd && s.toLowerCase().includes(sd.name.toLowerCase()))),
  ];

  const faq = [
    { q: "Le informazioni su questo profilo sono verificate?", a: clinic.verified ? "Sì, questo profilo è stato verificato dal nostro team. I dati sono aggiornati e confermati." : "Questo profilo non è ancora stato verificato. Le informazioni sono raccolte da fonti pubbliche (Google Maps, sito web della struttura) e potrebbero non essere aggiornate. Contattaci per segnalare eventuali inesattezze." },
    { q: "Come posso richiedere un appuntamento?", a: `Puoi contattare direttamente ${clinic.name}${clinic.phone ? " al numero indicato" : ""} oppure inviare una richiesta gratuita tramite il nostro servizio. Ti risponderemo il prima possibile con le opzioni disponibili nella zona.` },
    { q: `Quali servizi offre ${clinic.name}?`, a: allServiceNames.length > 0 ? `${clinic.name} offre ${allServiceNames.slice(0, 10).join(", ")}${allServiceNames.length > 10 ? ` e altri ${allServiceNames.length - 10} servizi` : ""}. Contatta la struttura per confermare disponibilità, orari e costi.` : `Contatta direttamente ${clinic.name} per informazioni sui servizi disponibili.` },
    { q: `${clinic.name} ha orari estesi o reperibilità?`, a: "Orari e modalità di contatto dipendono dalla struttura. Ti consigliamo di chiamare per confermare disponibilità prima di recarti." },
    { q: `Quali animali tratta ${clinic.name}?`, a: clinic.animals.length > 0 ? `${clinic.name} tratta ${clinic.animals.join(", ")}. Per animali esotici o non convenzionali, ti consigliamo di verificare direttamente con la struttura la disponibilità di competenze specifiche.` : `Contatta direttamente la struttura per informazioni sulle specie trattate.` },
    ...(clinic.googleRating ? [{ q: `Qual è la valutazione di ${clinic.name}?`, a: `${clinic.name} ha una valutazione Google di ${clinic.googleRating}/5${clinic.googleReviewsCount ? ` basata su ${clinic.googleReviewsCount} recensioni` : ""}. ${clinic.googleRating >= 4.5 ? "Un punteggio eccellente che indica un alto livello di soddisfazione tra i clienti." : clinic.googleRating >= 4.0 ? "Un buon punteggio che riflette un servizio apprezzato dai proprietari di animali." : "Ti consigliamo di leggere le recensioni per farti un'idea più completa del servizio."}` }] : []),
    ...(clinic.homeVisits ? [{ q: `${clinic.name} offre visite a domicilio?`, a: `Sì, ${clinic.name} offre il servizio di visite veterinarie a domicilio, ideale per animali anziani, di grossa taglia o particolarmente stressati dal trasporto. Contatta la struttura per verificare disponibilità e copertura geografica.` }] : []),
    { q: "Sei il titolare di questa struttura?", a: `Se gestisci questa struttura e vuoi aggiornare o verificare il profilo, contattaci a ${siteConfig.contact.email}. Il processo di verifica è gratuito e ti permette di gestire le informazioni pubblicate.` },
  ];

  const profilePath = clinic.type === "veterinario" ? `/veterinario/${clinic.slug}/` : `/struttura/${clinic.slug}/`;
  const breadcrumbsSchema = [
    ...(city ? [{ name: city.name, url: `/${clinic.regionSlug}/${clinic.provinceSlug}/${clinic.citySlug}/` }] : []),
    { name: clinic.name },
  ];

  /** Show only CAP + city from address for non-logged users */
  const publicAddress = city ? `${city.cap} ${city.name}` : undefined;

  return (
    <>
      <PageMeta
        title={clinic.metaTitle}
        description={clinic.metaDescription}
        canonical={profilePath}
        jsonLd={[
          localBusinessJsonLd({
            name: clinic.name,
            description: clinic.description,
            address: clinic.address,
            city: city?.name,
            province: clinic.provinceSlug,
            region: clinic.regionSlug,
            postalCode: city?.cap,
            phone: clinic.phone,
            email: clinic.email,
            openingHours: clinic.openingHours,
            url: profilePath,
            services: serviceDetails.map(s => s!.name),
            emergencyAvailable: clinic.emergencyAvailable,
          }),
          breadcrumbJsonLd(breadcrumbsSchema),
          faqJsonLd(faq),
        ]}
      />
      <Header />
      <main className="bg-background">
        <div className="container py-8 md:py-12 space-y-8 md:space-y-10 max-w-4xl">
          <Breadcrumbs items={[...breadcrumbBase, { label: clinic.name }]} />

          {/* Header */}
          <section>
            <div className="flex items-start justify-between flex-wrap gap-3">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                  {typeLabels[clinic.type] || clinic.type}
                </p>
                <h1 className="font-display text-3xl md:text-4xl font-extrabold text-foreground mb-2">
                  {clinic.name}
                </h1>
                {publicAddress && (
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 text-primary" />
                    {publicAddress}
                  </div>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {clinic.googleRating && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-semibold">
                    <Star className="h-3.5 w-3.5 fill-current text-yellow-500" />
                    {clinic.googleRating}/5
                    {clinic.googleReviewsCount && <span className="font-normal text-muted-foreground">({clinic.googleReviewsCount})</span>}
                  </span>
                )}
                {clinic.verified ? (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-success/10 text-success text-xs font-medium">
                    ✓ Verificato
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs">
                    Non verificato
                  </span>
                )}
              </div>
            </div>
          </section>

          {/* Mappa — ora subito sotto il titolo */}
          {clinic.lat && clinic.lng && (
            <ClinicMap lat={clinic.lat} lng={clinic.lng} name={clinic.name} address={clinic.address} />
          )}

          <AnswerSummary>
            {clinic.name} è {typeLabels[clinic.type]?.toLowerCase() || "una struttura veterinaria"} a {city?.name || "zona non specificata"}.
            {clinic.googleRating ? ` Valutazione Google: ${clinic.googleRating}/5${clinic.googleReviewsCount ? ` (${clinic.googleReviewsCount} recensioni)` : ""}.` : ""}
            {allServiceNames.length > 0 ? ` Servizi: ${allServiceNames.slice(0, 6).join(", ")}${allServiceNames.length > 6 ? ` e altri ${allServiceNames.length - 6}` : ""}.` : ""}
            {clinic.homeVisits ? " Disponibile per visite a domicilio." : ""}
            {clinic.animals.length > 0 ? ` Tratta: ${clinic.animals.slice(0, 5).join(", ")}.` : ""}
          </AnswerSummary>

          <QuickFacts facts={[
            { label: "Tipo", value: typeLabels[clinic.type] || clinic.type },
            { label: "Città", value: city ? `${city.name} (${city.cap})` : "-" },
            ...(clinic.googleRating ? [{ label: "Valutazione Google", value: `⭐ ${clinic.googleRating}/5 (${clinic.googleReviewsCount || 0} recensioni)` }] : []),
            { label: "Visite a domicilio", value: clinic.homeVisits ? "Disponibili" : "Non disponibili" },
            ...(clinic.openingHours ? [{ label: "Orari", value: clinic.openingHours }] : []),
            ...(clinic.website ? [{ label: "Sito web", value: clinic.website }] : []),
            { label: "Verificato", value: clinic.verified ? "Sì" : "In attesa" },
          ]} />

          {/* ── Rich description ── */}
          <section className="space-y-4">
            <h2 className="font-display text-xl font-bold text-foreground">
              Informazioni su {clinic.name}
            </h2>
            {generateProfileProse(clinic, city?.name).split("\n\n").map((p, i) => (
              <p key={i} className="text-sm text-muted-foreground leading-relaxed">{p}</p>
            ))}
          </section>

          {/* Contatti — gated */}
          <ContactGate
            phone={clinic.phone}
            email={clinic.email}
            address={clinic.address}
            isLoggedIn={isLoggedIn}
            contactLoginRequired={clinic.contactLoginRequired}
          />

          {/* Scraped extra contacts — gated */}
          {(clinic.scrapedPhones?.length || clinic.scrapedEmails?.length) ? (
            <section className="p-5 rounded-xl border border-border bg-card space-y-3">
              <h2 className="font-display font-semibold text-foreground flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" /> Contatti aggiuntivi
              </h2>
              {isLoggedIn ? (
                <div className="space-y-2">
                  {clinic.scrapedPhones?.map((p, i) => (
                    <a key={i} href={`tel:${p}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                      <Phone className="h-3.5 w-3.5 shrink-0" /> {p}
                    </a>
                  ))}
                  {clinic.scrapedEmails?.map((e, i) => (
                    <a key={i} href={`mailto:${e}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                      <Mail className="h-3.5 w-3.5 shrink-0" /> {e}
                    </a>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  <a href="/accedi/" className="text-primary hover:underline font-medium">Accedi</a> per visualizzare {clinic.scrapedPhones?.length || 0} numeri e {clinic.scrapedEmails?.length || 0} email aggiuntivi.
                </p>
              )}
            </section>
          ) : null}

          {/* Details grid */}
          <section className="grid md:grid-cols-2 gap-5">
            <div className="p-5 rounded-xl border border-border bg-card">
              <h2 className="font-display font-semibold text-foreground mb-3">Servizi offerti</h2>
              <div className="flex flex-wrap gap-1.5">
                {serviceDetails.map(s => s && (
                  <span key={s.slug} className="px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-medium">
                    {s.icon} {s.name}
                  </span>
                ))}
              </div>
            </div>
            <div className="p-5 rounded-xl border border-border bg-card">
              <h2 className="font-display font-semibold text-foreground mb-3">Animali trattati</h2>
              <div className="flex flex-wrap gap-1.5">
                {clinic.animals.map(a => (
                  <span key={a} className="px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-medium capitalize">{a}</span>
                ))}
              </div>
            </div>
          </section>

          {/* Scraped services from website */}
          {clinic.scrapedServices?.length ? (
            <section className="p-5 rounded-xl border border-border bg-card">
              <h2 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2">
                <Stethoscope className="h-4 w-4 text-primary" /> Servizi dal sito web della struttura
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {clinic.scrapedServices.map((s, i) => (
                  <span key={i} className="px-3 py-1 rounded-full bg-secondary/10 text-secondary-foreground text-xs font-medium">
                    {s}
                  </span>
                ))}
              </div>
              <p className="text-[11px] text-muted-foreground mt-3">
                Servizi rilevati automaticamente dal sito web della struttura. Contatta direttamente per confermare disponibilità.
              </p>
            </section>
          ) : null}

          {/* Immagine struttura */}
          {clinicImage && (
            <section className="rounded-xl border border-border overflow-hidden">
              <img src={clinicImage} alt={`Sede di ${clinic.name}`} className="w-full h-48 md:h-64 object-cover" loading="lazy" decoding="async" />
            </section>
          )}

          <EditorialInfo lastUpdated={clinic.lastUpdated} verified={clinic.verified} />

          {!clinic.verified && (
            <Disclaimer variant="info">
              Questo profilo non è ancora stato verificato dal nostro team. Le informazioni sono raccolte da fonti pubbliche
              e potrebbero non essere aggiornate. Se sei il titolare, contattaci a {siteConfig.contact.email} per aggiornare e verificare il profilo.
            </Disclaimer>
          )}

          <FaqSection items={faq} />
          <VetDisclaimer />
          <PageCTA title={`Vuoi contattare ${clinic.name}?`} href="/richiedi-assistenza/" />
        </div>
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
}
