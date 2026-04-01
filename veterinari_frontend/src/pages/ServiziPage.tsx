import { Link } from "react-router-dom";
import { Video, ArrowRight } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageMeta } from "@/components/PageMeta";
import { PageCTA } from "@/components/PageCTA";
import { FaqSection } from "@/components/FaqSection";
import { AnswerSummary } from "@/components/AnswerSummary";
import { VetDisclaimer } from "@/components/VetDisclaimer";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { getPublicServices, getServiceAnimalPagesByService } from "@/data";
import { siteConfig } from "@/config/site";
import { breadcrumbJsonLd, faqJsonLd, webPageJsonLd, itemListJsonLd } from "@/lib/seo";
import type { ServicePage } from "@/data/types";

interface ServiceGroup {
  category: string;
  label: string;
  emoji: string;
  description: string;
  services: ServicePage[];
}

export default function ServiziPage() {
  const allServices = getPublicServices();

  const groups: ServiceGroup[] = [
    {
      category: "generale",
      label: "Servizi veterinari principali",
      emoji: "🩺",
      description: "Visite, vaccinazioni, chirurgia e assistenza a domicilio: i servizi più richiesti per la salute del tuo animale.",
      services: allServices.filter(s => !s.category || s.category === "generale"),
    },
    {
      category: "diagnostica",
      label: "Diagnostica",
      emoji: "🔬",
      description: "Esami del sangue, radiografie, ecografie e test allergici per una diagnosi accurata.",
      services: allServices.filter(s => s.category === "diagnostica"),
    },
    {
      category: "specialistica",
      label: "Servizi specialistici",
      emoji: "🏥",
      description: "Dermatologia, ortopedia, cardiologia, neurologia, oftalmologia e oncologia veterinaria.",
      services: allServices.filter(s => s.category === "specialistica"),
    },
    {
      category: "prevenzione",
      label: "Prevenzione",
      emoji: "🛡️",
      description: "Microchip, sterilizzazione, check-up annuali e prevenzione antiparassitaria.",
      services: allServices.filter(s => s.category === "prevenzione"),
    },
    {
      category: "nutrizione",
      label: "Nutrizione",
      emoji: "🥗",
      description: "Piani alimentari personalizzati, consulenza dietetica e gestione del peso.",
      services: allServices.filter(s => s.category === "nutrizione"),
    },
    {
      category: "cura",
      label: "Cura e benessere animale",
      emoji: "🏡",
      description: "Asilo, pensione, pet sitter, dog walking e toelettatura: servizi per il benessere quotidiano del tuo animale.",
      services: allServices.filter(s => s.category === "cura"),
    },
  ].filter(g => g.services.length > 0);

  const faq = [
    { q: "Quali servizi veterinari posso richiedere?", a: `Attraverso ${siteConfig.name} puoi richiedere visite di routine, vaccinazioni, interventi chirurgici, diagnostica, servizi specialistici e visite a domicilio.` },
    { q: "Il servizio di ricerca è gratuito?", a: `Sì, ${siteConfig.name} è completamente gratuito per chi cerca un veterinario. Puoi consultare le strutture disponibili e inviare una richiesta di contatto.` },
    { q: "In quali zone sono disponibili i servizi?", a: `Attualmente il servizio è attivo in ${siteConfig.initialArea} e in espansione su tutto il territorio italiano.` },
    { q: "Come faccio a richiedere un servizio specifico?", a: "Usa il nostro strumento di ricerca in homepage: seleziona l'animale, il servizio desiderato e la tua posizione." },
    { q: "Posso richiedere una visita specialistica direttamente?", a: "Sì, specifica il tipo di servizio nella tua richiesta di contatto e la inoltreremo alle strutture con la competenza appropriata nella tua zona." },
  ];

  const canonicalPath = "/servizi/";
  const metaTitle = "Servizi Veterinari — Tutti i servizi per il tuo animale";
  const metaDescription = "Scopri tutti i servizi veterinari disponibili: visite, diagnostica, chirurgia, nutrizione e prevenzione. Consulta le strutture nella tua zona.";

  return (
    <>
      <PageMeta
        title={metaTitle}
        description={metaDescription}
        canonical={canonicalPath}
        jsonLd={[
          webPageJsonLd({ title: metaTitle, description: metaDescription, url: canonicalPath }),
          breadcrumbJsonLd([{ name: "Servizi veterinari" }]),
          faqJsonLd(faq),
          itemListJsonLd({
            name: "Tutti i servizi veterinari",
            description: metaDescription,
            url: canonicalPath,
            items: allServices.map((s, i) => ({
              name: s.name,
              url: `/${s.slug}/`,
              position: i + 1,
            })),
          }),
        ]}
      />
      <Header />
      <main className="bg-background">
        <div className="container py-8 md:py-12 space-y-12 md:space-y-16 max-w-5xl">
          <section>
            <h1 className="font-display text-3xl md:text-4xl font-extrabold text-foreground mb-4">
              Servizi veterinari
            </h1>
            <AnswerSummary>
              Tutti i servizi veterinari che puoi richiedere attraverso {siteConfig.name}: visite,
              diagnostica, chirurgia, specialistica, prevenzione e nutrizione.
            </AnswerSummary>
          </section>

          <section aria-labelledby="servizio-online-heading">
            <Link
              to="/consulenza-veterinaria-online/"
              className="group flex flex-col gap-4 rounded-2xl border-2 border-primary/40 bg-gradient-to-br from-primary/15 via-emerald-500/12 to-teal-500/10 p-6 shadow-lg shadow-primary/15 ring-1 ring-primary/30 transition hover:border-primary/60 hover:shadow-xl hover:shadow-primary/20 md:flex-row md:items-center md:justify-between md:p-8"
            >
              <div className="flex min-w-0 flex-1 items-start gap-4">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/25 text-primary ring-2 ring-primary/35">
                  <Video className="h-7 w-7" aria-hidden />
                </span>
                <div>
                  <h2 id="servizio-online-heading" className="font-display text-xl font-bold text-foreground md:text-2xl">
                    Veterinario online
                  </h2>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground md:text-base">
                    Consulenza in video da casa: niente file in sala d&apos;attesa. Scegli la durata, paga in sicurezza e
                    parla con un professionista via Meet.
                  </p>
                </div>
              </div>
              <span className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-md transition group-hover:bg-primary/90 md:self-center">
                Scopri tariffe e prenotazione
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden />
              </span>
            </Link>
          </section>

          {groups.map((group) => (
            <section key={group.category}>
              <div className="mb-6">
                <h2 className="font-display text-2xl font-bold text-foreground mb-2 flex items-center gap-2">
                  <span>{group.emoji}</span> {group.label}
                </h2>
                <p className="text-sm text-muted-foreground">{group.description}</p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {group.services.map((service) => {
                  const animalPages = getServiceAnimalPagesByService(service.slug);
                  return (
                    <div
                      key={service.slug}
                      className="p-5 rounded-xl border border-border bg-card hover:shadow-md hover:border-primary/30 transition-all"
                    >
                      <Link to={`/${service.slug}/`} className="group block">
                        <div className="text-2xl mb-2">{service.icon}</div>
                        <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                          {service.name}
                        </h3>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {service.definition.slice(0, 120)}…
                        </p>
                      </Link>
                      {animalPages.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-border/60 flex flex-wrap gap-1.5">
                          {animalPages.map((ap) => (
                            <Link
                              key={ap.slug}
                              to={`/${ap.slug}/`}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-accent text-[11px] font-medium text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                              title={`${ap.serviceName} per ${ap.animalName.toLowerCase()}`}
                            >
                              <span>{ap.animalEmoji}</span>
                              <span>{ap.animalName}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          ))}

          <FaqSection items={faq} />
          <VetDisclaimer />
          <PageCTA title="Hai bisogno di un servizio veterinario?" href="/richiedi-assistenza/" />
        </div>
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
}
