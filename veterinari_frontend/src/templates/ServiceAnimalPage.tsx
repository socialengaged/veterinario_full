import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
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
import { CheckCircle, AlertTriangle, Clock, Send, ArrowRight, Loader2, Lock, Mail, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { animals } from "@/config/site";
import { serviceTaxonomy, getSubcategories } from "@/data/service-taxonomy";
import { postRequests, setAccessToken } from "@/lib/api";
import { buildCreateRequestPayload } from "@/lib/build-request-payload";
import { resolveTaxonomyFromQuery } from "@/lib/request-taxonomy";

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
            serviceSlug={page.serviceSlug}
            animalId={page.animalId}
            serviceName={page.serviceName}
            animalName={page.animalName}
            animalEmoji={page.animalEmoji}
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
            href={`/richiedi-assistenza/?animale=${encodeURIComponent(page.animalId)}&servizio=${encodeURIComponent(page.serviceSlug)}`}
          />
        </div>
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
}

// ── Inline Request Form: stesso flusso di Registrazione (account + chat) ──
function InlineRequestForm({
  serviceSlug,
  animalId,
  serviceName,
  animalName,
  animalEmoji,
}: {
  serviceSlug: string;
  animalId: string;
  serviceName: string;
  animalName: string;
  animalEmoji: string;
}) {
  const navigate = useNavigate();
  const initialTax = useMemo(() => resolveTaxonomyFromQuery(serviceSlug), [serviceSlug]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    animal: animalId,
    serviceCategory: initialTax.serviceCategory,
    subService: initialTax.subService,
    city: "",
    province: "",
    cap: "",
    description: "",
    contactSecondary: "" as "" | "sms" | "whatsapp",
    emailVerificationAck: false,
    registrationConsent: false,
    marketing: false,
    consent: false,
  });

  const set = (field: string, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleServiceCategoryChange = (value: string) => {
    set("serviceCategory", value);
    set("subService", "");
  };

  const subcategories = getSubcategories(form.serviceCategory);
  const needsPhoneForChannels =
    form.contactSecondary === "sms" || form.contactSecondary === "whatsapp";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !form.consent ||
      !form.registrationConsent ||
      !form.emailVerificationAck ||
      !form.name ||
      !form.email ||
      !form.password ||
      form.password.length < 8 ||
      !form.animal ||
      !form.serviceCategory ||
      !form.city ||
      !form.province
    ) {
      return;
    }
    if (needsPhoneForChannels && form.phone.trim().length < 3) {
      setError("Inserisci un numero di cellulare valido per SMS o WhatsApp.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const payload = buildCreateRequestPayload({
        email: form.email,
        full_name: form.name,
        phone: form.phone,
        city: form.city,
        province: form.province,
        cap: form.cap,
        animal: form.animal,
        serviceCategory: form.serviceCategory,
        subService: form.subService,
        description: form.description,
        contactSecondary: form.contactSecondary,
        emailVerificationAck: form.emailVerificationAck,
        registrationConsent: form.registrationConsent,
        marketing: form.marketing,
        password: form.password,
      });
      const res = await postRequests(payload);
      setAccessToken(res.access_token);
      navigate(`/dashboard/chat/${res.conversation_id}`, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invio non riuscito");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm";

  return (
    <section className="p-6 md:p-8 rounded-2xl border-2 border-primary/30 bg-gradient-to-b from-primary/5 to-background">
      <div className="flex items-center gap-3 mb-2">
        <Send className="h-5 w-5 text-primary" />
        <h2 className="font-display text-xl font-bold text-foreground">
          Richiedi {serviceName.toLowerCase()} per il tuo {animalName.toLowerCase()} {animalEmoji}
        </h2>
      </div>
      <p className="text-sm text-muted-foreground mb-6">
        Crea un account con email e password: dopo l&apos;invio entri nella chat del servizio (come dalla pagina Registrati).
        Il servizio di ricerca è gratuito.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Nome e cognome *</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="Mario Rossi"
                className={cn(inputClass, "pl-10")}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Email *</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                placeholder="nome@email.it"
                className={cn(inputClass, "pl-10")}
                autoComplete="email"
              />
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-foreground mb-1">Password * (min. 8 caratteri)</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="password"
                required
                minLength={8}
                value={form.password}
                onChange={(e) => set("password", e.target.value)}
                placeholder="Scegli una password sicura"
                className={cn(inputClass, "pl-10")}
                autoComplete="new-password"
              />
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-foreground mb-1">
              Cellulare {needsPhoneForChannels ? "*" : "(facoltativo)"}
            </label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => set("phone", e.target.value)}
              placeholder="+39 333 123 4567"
              className={inputClass}
              required={needsPhoneForChannels}
              autoComplete="tel"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Animale *</label>
          <select
            value={form.animal}
            onChange={(e) => set("animal", e.target.value)}
            className={inputClass}
            required
          >
            <option value="">Seleziona animale</option>
            {animals.map((a) => (
              <option key={a.id} value={a.id}>
                {a.emoji} {a.label}
              </option>
            ))}
          </select>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Categoria servizio *</label>
            <select
              value={form.serviceCategory}
              onChange={(e) => handleServiceCategoryChange(e.target.value)}
              className={inputClass}
              required
            >
              <option value="">Seleziona categoria</option>
              {serviceTaxonomy.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.emoji} {s.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Servizio specifico</label>
            <select
              value={form.subService}
              onChange={(e) => set("subService", e.target.value)}
              className={inputClass}
              disabled={!subcategories.length}
            >
              <option value="">{subcategories.length ? "Seleziona dettaglio" : "Scegli prima la categoria"}</option>
              {subcategories.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Città *</label>
            <input
              type="text"
              required
              value={form.city}
              onChange={(e) => set("city", e.target.value)}
              placeholder="Lecce"
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Provincia *</label>
            <input
              type="text"
              required
              maxLength={2}
              value={form.province}
              onChange={(e) => set("province", e.target.value.toUpperCase().slice(0, 2))}
              placeholder="LE"
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">CAP</label>
            <input
              type="text"
              value={form.cap}
              onChange={(e) => set("cap", e.target.value)}
              placeholder="73100"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Note</label>
          <textarea
            rows={2}
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            placeholder={`Opzionale — situazione del tuo ${animalName.toLowerCase()}`}
            className={cn(inputClass, "resize-none")}
          />
        </div>

        <div>
          <span className="block text-sm font-medium text-foreground mb-2">Preferenze di contatto</span>
          <div className="space-y-2 rounded-xl border border-border p-4 bg-muted/30">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="inlineContactSec"
                checked={form.contactSecondary === ""}
                onChange={() => set("contactSecondary", "")}
                className="h-4 w-4 accent-primary"
              />
              <span className="text-sm">Solo email</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="inlineContactSec"
                checked={form.contactSecondary === "sms"}
                onChange={() => set("contactSecondary", "sms")}
                className="h-4 w-4 accent-primary"
              />
              <span className="text-sm">Email e SMS</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="inlineContactSec"
                checked={form.contactSecondary === "whatsapp"}
                onChange={() => set("contactSecondary", "whatsapp")}
                className="h-4 w-4 accent-primary"
              />
              <span className="text-sm">Email e WhatsApp</span>
            </label>
          </div>
        </div>

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={form.emailVerificationAck}
            onChange={(e) => set("emailVerificationAck", e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-input accent-primary"
            required
          />
          <span className="text-xs text-muted-foreground leading-relaxed">
            Ho compreso che devo verificare il mio indirizzo email (anche in spam) perché la richiesta possa essere inoltrata ai
            veterinari nella mia zona. *
          </span>
        </label>

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={form.registrationConsent}
            onChange={(e) => set("registrationConsent", e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-input accent-primary"
            required
          />
          <span className="text-xs text-muted-foreground leading-relaxed">
            Voglio registrarmi al sito e creare un account con questa email e password per accedere alla chat e alle funzioni
            riservate. *
          </span>
        </label>

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={form.consent}
            onChange={(e) => set("consent", e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-input accent-primary"
            required
          />
          <span className="text-xs text-muted-foreground leading-relaxed">
            Acconsento al trattamento dei dati personali (GDPR) e autorizzo l&apos;invio della richiesta alle strutture veterinarie
            della zona. *
          </span>
        </label>

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={form.marketing}
            onChange={(e) => set("marketing", e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-input accent-primary"
          />
          <span className="text-xs text-muted-foreground">Comunicazioni promozionali (facoltativo)</span>
        </label>

        {error && (
          <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm border border-destructive/20">{error}</div>
        )}

        <Button
          type="submit"
          variant="cta"
          size="lg"
          className="w-full"
          disabled={
            submitting ||
            !form.emailVerificationAck ||
            !form.registrationConsent ||
            !form.consent ||
            (needsPhoneForChannels && form.phone.trim().length < 3)
          }
        >
          {submitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Invio in corso…
            </>
          ) : (
            <>
              Crea account e apri chat <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </form>

      <p className="text-center text-xs text-muted-foreground mt-4">
        Stesso modulo anche nella{" "}
        <Link
          to={`/richiedi-assistenza/?animale=${encodeURIComponent(animalId)}&servizio=${encodeURIComponent(serviceSlug)}`}
          className="text-primary hover:underline font-medium"
        >
          pagina dedicata alla richiesta
        </Link>
        .
      </p>
    </section>
  );
}
