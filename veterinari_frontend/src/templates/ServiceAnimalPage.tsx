import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
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
import { Button } from "@/components/ui/button";
import { getServiceAnimalPage } from "@/data";
import { serviceAnimalRichContent } from "@/data/service-animal-content";
import NotFound from "@/pages/NotFound";
import { siteConfig } from "@/config/site";
import { breadcrumbJsonLd, faqJsonLd, webPageJsonLd, serviceJsonLd } from "@/lib/seo";
import { CheckCircle, AlertTriangle, Clock, Send, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Animal images map
import caneImg from "@/assets/animals/cane.jpg";
import gattoImg from "@/assets/animals/gatto.jpg";
import coniglioImg from "@/assets/animals/coniglio.jpg";
import cavalloImg from "@/assets/animals/cavallo.jpg";
import tartarugaImg from "@/assets/animals/tartaruga.jpg";
import cricetoImg from "@/assets/animals/criceto.jpg";
import pappagalloImg from "@/assets/animals/pappagallo.jpg";
import furettoImg from "@/assets/animals/furetto.jpg";
import muccaImg from "@/assets/animals/mucca.jpg";
import pecoraImg from "@/assets/animals/pecora.jpg";
import capraImg from "@/assets/animals/capra.jpg";
import maialeImg from "@/assets/animals/maiale.jpg";
import asinoImg from "@/assets/animals/asino.jpg";

// Service-specific images
import tacImg from "@/assets/services/tac-veterinaria.jpg";
import rmImg from "@/assets/services/risonanza-magnetica.jpg";
import endoscopiaImg from "@/assets/services/endoscopia-veterinaria.jpg";
import radiografiaImg from "@/assets/services/radiografia-veterinaria.jpg";

const animalImages: Record<string, string> = {
  cane: caneImg,
  gatto: gattoImg,
  coniglio: coniglioImg,
  cavallo: cavalloImg,
  tartaruga: tartarugaImg,
  criceto: cricetoImg,
  pappagallo: pappagalloImg,
  furetto: furettoImg,
  mucca: muccaImg,
  pecora: pecoraImg,
  capra: capraImg,
  maiale: maialeImg,
  asino: asinoImg,
};

const serviceImages: Record<string, string> = {
  "tac-veterinaria": tacImg,
  "risonanza-magnetica-veterinaria": rmImg,
  "endoscopia-veterinaria": endoscopiaImg,
  "radiografia": radiografiaImg,
};

interface ServiceAnimalPageTemplateProps {
  slug: string;
}

export default function ServiceAnimalPageTemplate({ slug }: ServiceAnimalPageTemplateProps) {
  const page = getServiceAnimalPage(slug);
  if (!page) return <NotFound />;

  const canonicalPath = `/${page.slug}/`;
  const breadcrumbs = [
    { label: "Servizi", href: "/servizi/" },
    { label: page.serviceName, href: `/${page.serviceSlug}/` },
    { label: page.animalName },
  ];

  const animalImage = animalImages[page.animalId];
  const serviceImage = serviceImages[page.serviceSlug];
  const heroImage = serviceImage || animalImage;

  return (
    <>
      <PageMeta
        title={page.metaTitle}
        description={page.metaDescription}
        canonical={canonicalPath}
        jsonLd={[
          webPageJsonLd({ title: page.metaTitle, description: page.metaDescription, url: canonicalPath }),
          breadcrumbJsonLd([{ name: "Servizi", url: "/servizi/" }, { name: `${page.serviceName} ${page.animalName}` }]),
          faqJsonLd(page.faq),
          serviceJsonLd({
            name: `${page.serviceName} ${page.animalName}`,
            description: page.answerSummary,
            url: canonicalPath,
          }),
        ]}
      />
      <Header />
      <main className="bg-background">
        <div className="container py-8 md:py-12 space-y-10 md:space-y-14 max-w-4xl">
          <Breadcrumbs items={breadcrumbs} />

          {/* ── Hero Section ── */}
          <section className="grid md:grid-cols-[1fr_300px] gap-8 items-start">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-3xl">{page.animalEmoji}</span>
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider">
                  {page.serviceName}
                </span>
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-extrabold text-foreground mb-4">
                {page.h1}
              </h1>
              <AnswerSummary>
                {page.answerSummary}
              </AnswerSummary>
            </div>
            {heroImage && (
              <div className="rounded-2xl overflow-hidden border border-border shadow-md hidden md:block">
                <img
                  src={heroImage}
                  alt={`${page.serviceName} per il ${page.animalName.toLowerCase()}`}
                  className="w-full h-64 object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            )}
          </section>

          <QuickFacts facts={page.quickFacts} />

          {/* ── Mobile image ── */}
          {heroImage && (
            <div className="rounded-2xl overflow-hidden border border-border shadow-md md:hidden">
              <img
                src={heroImage}
                alt={`${page.serviceName} per il ${page.animalName.toLowerCase()}`}
                className="w-full h-48 object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          )}

          {/* ── Intro ── */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-3">
              {page.serviceName} per il {page.animalName.toLowerCase()}: perché è importante
            </h2>
            <p className="text-muted-foreground leading-relaxed">{page.intro}</p>
            {serviceAnimalRichContent[page.slug] && (
              <div className="mt-4 space-y-4">
                {serviceAnimalRichContent[page.slug].richIntro.split("\n\n").map((p, i) => (
                  <p key={i} className="text-muted-foreground leading-relaxed">{p}</p>
                ))}
              </div>
            )}
          </section>

          {/* ── What it includes ── */}
          <section>
            <div className="p-6 rounded-xl border-2 border-primary/20 bg-accent">
              <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                Cosa include il {page.serviceName.toLowerCase()} per il {page.animalName.toLowerCase()}
              </h2>
              <ul className="space-y-3">
                {page.whatIncludes.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                    <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* ── When to do it ── */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              Quando è il momento giusto
            </h2>
            <div className="grid gap-4">
              {page.whenToDo.map((item, i) => (
                <div key={i} className="p-5 rounded-xl border border-border bg-card">
                  <h3 className="font-display font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Warning signs ── */}
          {page.warningSigns.length > 0 && (
            <section className="p-6 rounded-xl border border-destructive/20 bg-destructive/5">
              <h2 className="font-display text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                {page.warningSignsTitle}
              </h2>
              <ul className="space-y-2">
                {page.warningSigns.map((sign, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                    <span className="text-destructive font-bold flex-shrink-0">⚠</span>
                    {sign}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* ── Age guidance ── */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              {page.serviceName} per età del {page.animalName.toLowerCase()}
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              {page.ageGuidance.map((item, i) => (
                <div key={i} className="p-5 rounded-xl border border-border bg-card">
                  <h3 className="font-display font-semibold text-foreground mb-2 text-sm">{item.stage}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.recommendation}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Inline Contact Form ── */}
          <InlineRequestForm
            serviceName={page.serviceName}
            animalName={page.animalName}
            animalEmoji={page.animalEmoji}
            slug={page.slug}
          />

          <Disclaimer variant="info">{page.disclaimer}</Disclaimer>

          {/* ── Related service-animal pages ── */}
          {page.relatedServiceAnimals.length > 0 && (
            <section>
              <h2 className="font-display text-xl font-bold text-foreground mb-4">
                Altri servizi per il {page.animalName.toLowerCase()}
              </h2>
              <div className="flex flex-wrap gap-2">
                {page.relatedServiceAnimals.map((relSlug) => (
                  <Link
                    key={relSlug}
                    to={`/${relSlug}/`}
                    className="px-4 py-2 rounded-lg border border-border bg-card text-sm font-medium text-foreground hover:border-primary/40 hover:bg-accent transition-all"
                  >
                    {relSlug.replace(/-/g, " ").replace(/^\w/, c => c.toUpperCase())}
                  </Link>
                ))}
              </div>
            </section>
          )}

          <EditorialInfo lastUpdated="2026-03-01" />
          <FaqSection items={page.faq} />
          <VetDisclaimer />

          {/* ── Secondary CTA ── */}
          <PageCTA
            title={`Cerchi un veterinario per ${page.serviceName.toLowerCase()} del ${page.animalName.toLowerCase()}?`}
            href={`/richiedi-assistenza/?servizio=${encodeURIComponent(page.serviceSlug)}&animale=${encodeURIComponent(page.animalId)}`}
          />
        </div>
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
}

// ── Inline Request Form Component ──
function InlineRequestForm({
  serviceName,
  animalName,
  animalEmoji,
  slug,
}: {
  serviceName: string;
  animalName: string;
  animalEmoji: string;
  slug: string;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "",
    description: "",
    consent: false,
  });

  const handleChange = (field: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.consent || !form.name || !form.phone) return;
    console.log("Service-animal request:", { slug, ...form });
    setSubmitted(true);
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm";

  if (submitted) {
    return (
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-8 rounded-2xl border-2 border-primary/30 bg-primary/5 text-center"
      >
        <CheckCircle className="h-12 w-12 text-primary mx-auto mb-3" />
        <h2 className="font-display text-xl font-bold text-foreground mb-2">Richiesta inviata!</h2>
        <p className="text-sm text-muted-foreground">
          Ti contatteremo al più presto per metterti in contatto con un veterinario qualificato
          per {serviceName.toLowerCase()} del {animalName.toLowerCase()} nella tua zona.
        </p>
      </motion.section>
    );
  }

  return (
    <section className="p-6 md:p-8 rounded-2xl border-2 border-primary/30 bg-gradient-to-b from-primary/5 to-background">
      <div className="flex items-center gap-3 mb-2">
        <Send className="h-5 w-5 text-primary" />
        <h2 className="font-display text-xl font-bold text-foreground">
          Richiedi {serviceName.toLowerCase()} per il tuo {animalName.toLowerCase()} {animalEmoji}
        </h2>
      </div>
      <p className="text-sm text-muted-foreground mb-6">
        Compila il modulo e ti metteremo in contatto con un veterinario qualificato nella tua zona. Il servizio di ricerca è gratuito.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Nome e cognome *</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Mario Rossi"
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Telefono *</label>
            <input
              type="tel"
              required
              value={form.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="+39 333 123 4567"
              className={inputClass}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Città o zona</label>
          <input
            type="text"
            value={form.city}
            onChange={(e) => handleChange("city", e.target.value)}
            placeholder="Es. Lecce, Milano, Roma..."
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Note aggiuntive</label>
          <textarea
            rows={3}
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder={`Descrivi brevemente la situazione del tuo ${animalName.toLowerCase()}...`}
            className={cn(inputClass, "resize-none")}
          />
        </div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={form.consent}
            onChange={(e) => handleChange("consent", e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-input accent-primary"
          />
          <span className="text-xs text-muted-foreground leading-relaxed">
            Acconsento al trattamento dei miei dati personali per la gestione della richiesta veterinaria,
            ai sensi del GDPR. I dati saranno utilizzati esclusivamente per metterti in contatto con il veterinario adatto.
          </span>
        </label>
        <Button
          type="submit"
          variant="cta"
          size="lg"
          className="w-full"
          disabled={!form.consent || !form.name || !form.phone}
        >
          Invia richiesta gratuita <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </form>

      <p className="text-center text-xs text-muted-foreground mt-4">
        Oppure vai alla{" "}
        <Link
          to={`/richiedi-assistenza/?servizio=${encodeURIComponent(serviceName)}&animale=${encodeURIComponent(animalName)}`}
          className="text-primary hover:underline font-medium"
        >
          pagina di richiesta completa
        </Link>
      </p>
    </section>
  );
}
