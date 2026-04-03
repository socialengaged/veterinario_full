import { useState } from "react";
import { siteConfig } from "@/config/site";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageMeta } from "@/components/PageMeta";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { Disclaimer } from "@/components/Disclaimer";
import { Button } from "@/components/ui/button";
import { animals } from "@/config/site";
import { cn } from "@/lib/utils";
import {
  CheckCircle,
  Shield,
  Loader2,
  Video,
  Euro,
  GraduationCap,
  Stethoscope,
  Award,
  MapPin,
  Clock,
  ChevronDown,
  ChevronUp,
  PawPrint,
} from "lucide-react";
import { webPageJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { postRequests, setAccessToken } from "@/lib/api";
import { buildOnlineConsultationPayload, type ConsultationTier } from "@/lib/build-request-payload";
import drStellaAvatar from "@/assets/dr-stella-avatar.svg";

const ONLINE_ANIMALS = animals.filter((a) => a.id === "cane" || a.id === "gatto");

const PAYPAL_EMAIL =
  (import.meta.env.VITE_ONLINE_CONSULT_PAYPAL_EMAIL as string | undefined)?.trim() || "vet.stella@gmail.com";

const TIER_OPTIONS: { id: ConsultationTier; title: string; detail: string }[] = [
  {
    id: "std_15_30",
    title: "15 minuti",
    detail: "30 \€ \— consulenza semplice (monitoraggio terapia, iter diagnostico)",
  },
  {
    id: "std_30_50",
    title: "30 minuti (max)",
    detail: "50 \€ \— second opinion o consulenza casi cronici",
  },
  { id: "specialist_100", title: "Specialistica", detail: "100 \€ \— consulenza veterinaria specialistica" },
];

const PAGE_FAQS = [
  {
    q: "Come funziona la visita veterinaria online?",
    a: "Compili il modulo di prenotazione su questa pagina, verifichi la tua email e concordi data e orario con il veterinario tramite la chat dedicata. Ricevi il link Google Meet per la videochiamata e il pagamento avviene in modo sicuro tramite PayPal.",
  },
  {
    q: "Quali animali possono essere visitati online?",
    a: "Il servizio di veterinario online \è dedicato a cani e gatti. Il Dott. Andrea Stella, medico veterinario iscritto all\’Ordine di Lecce (n. 436), effettua consulenze per problematiche generali e specialistiche di oncologia.",
  },
  {
    q: "Quanto costa una consulenza veterinaria online?",
    a: "Le tariffe partono da 30 \€ per 15 minuti di consulenza standard, 50 \€ per 30 minuti (second opinion o casi cronici) e 100 \€ per la consulenza specialistica. Il pagamento avviene tramite PayPal.",
  },
  {
    q: "La consulenza veterinaria online sostituisce la visita in presenza?",
    a: "La consulenza online \è utile per second opinion, monitoraggio terapie, consigli su alimentazione e iter diagnostici. Non sostituisce la visita clinica in presenza quando il veterinario ritiene necessario un esame fisico diretto dell\’animale.",
  },
  {
    q: "Come avviene il pagamento per il veterinario online?",
    a: "Il pagamento avviene tramite PayPal in modo sicuro. Dopo aver inviato la richiesta e verificato l\’email, riceverai le istruzioni per completare il pagamento prima della videochiamata.",
  },
  {
    q: "Posso inviare referti ed esami al veterinario online?",
    a: "S\ì, durante la prenotazione puoi allegare fino a 8 file (PDF o immagini) con referti, radiografie, analisi del sangue e foto. Il veterinario li consulter\à prima della videochiamata per una consulenza pi\ù accurata.",
  },
  {
    q: "Chi \è il veterinario che effettua le consulenze online?",
    a: "Le consulenze sono effettuate dal Dott. Andrea Stella, medico veterinario laureato presso l\’Universit\à degli Studi di Bari, iscritto all\’Ordine dei Medici Veterinari della Provincia di Lecce con il numero 436. \È Direttore Sanitario dell\’Ambulatorio Veterinario \“Citt\à di Melendugno\” e ha specializzazione in oncologia veterinaria.",
  },
  {
    q: "Il veterinario online \è disponibile anche di sera o nel weekend?",
    a: "Gli orari della consulenza online vengono concordati direttamente con il Dott. Stella tramite la chat dopo la prenotazione. La flessibilit\à della videochiamata permette di trovare un orario compatibile anche fuori dai classici orari ambulatoriali.",
  },
];

/* ── Schema.org structured data ── */
function buildJsonLd() {
  const base = siteConfig.url;
  return [
    webPageJsonLd({
      title: "Veterinario Online \— Consulenza Veterinaria in Videochiamata",
      description:
        "Consulenza veterinaria online per cani e gatti con il Dott. Andrea Stella. Videochiamata Google Meet, tariffe da 30 \€. Prenota ora.",
      url: "/consulenza-veterinaria-online/",
    }),
    breadcrumbJsonLd([{ name: "Veterinario online" }]),
    faqJsonLd(PAGE_FAQS),
    // Service schema
    {
      "@context": "https://schema.org",
      "@type": "MedicalBusiness",
      name: "Veterinario Online \— VeterinarioVicino.it",
      description:
        "Servizio di consulenza veterinaria online via videochiamata Google Meet per cani e gatti. Consulenza generale e specialistica in oncologia veterinaria.",
      url: `${base}/consulenza-veterinaria-online/`,
      telephone: "+39 328 092 6528",
      email: "vet.stella@gmail.com",
      areaServed: { "@type": "Country", name: "Italia" },
      medicalSpecialty: "Veterinary",
      availableService: TIER_OPTIONS.map((t) => ({
        "@type": "MedicalProcedure",
        name: `Consulenza veterinaria online \— ${t.title}`,
        description: t.detail,
      })),
      provider: {
        "@type": "Organization",
        name: siteConfig.name,
        url: base,
      },
    },
    // Physician / Veterinarian schema
    {
      "@context": "https://schema.org",
      "@type": "Physician",
      name: "Dott. Andrea Stella",
      jobTitle: "Medico Veterinario",
      description:
        "Medico veterinario specializzato in oncologia, laureato all\’Universit\à degli Studi di Bari. Direttore Sanitario dell\’Ambulatorio Veterinario Citt\à di Melendugno. Iscritto all\’Ordine dei Medici Veterinari di Lecce n. 436.",
      medicalSpecialty: "Oncology",
      alumniOf: {
        "@type": "EducationalOrganization",
        name: "Universit\à degli Studi di Bari",
      },
      memberOf: {
        "@type": "Organization",
        name: "Ordine dei Medici Veterinari della Provincia di Lecce",
      },
      workLocation: {
        "@type": "VeterinaryCare",
        name: "Ambulatorio Veterinario Citt\à di Melendugno",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Via Martano, 24",
          addressLocality: "Melendugno",
          addressRegion: "LE",
          postalCode: "73026",
          addressCountry: "IT",
        },
      },
    },
    // Offer schema for rich results
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Veterinario Online",
      serviceType: "Consulenza veterinaria online",
      description:
        "Prenota una consulenza veterinaria online con videochiamata Google Meet. Servizio per cani e gatti, con tariffe chiare e pagamento sicuro PayPal.",
      url: `${base}/consulenza-veterinaria-online/`,
      provider: {
        "@type": "Physician",
        name: "Dott. Andrea Stella",
      },
      areaServed: { "@type": "Country", name: "Italia" },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Tariffe consulenza veterinaria online",
        itemListElement: [
          {
            "@type": "Offer",
            name: "Consulenza standard 15 minuti",
            price: "30",
            priceCurrency: "EUR",
            description: "Consulenza semplice: monitoraggio terapia, iter diagnostico",
          },
          {
            "@type": "Offer",
            name: "Consulenza standard 30 minuti",
            price: "50",
            priceCurrency: "EUR",
            description: "Second opinion o consulenza per casi cronici",
          },
          {
            "@type": "Offer",
            name: "Consulenza specialistica",
            price: "100",
            priceCurrency: "EUR",
            description: "Consulenza veterinaria specialistica in oncologia",
          },
        ],
      },
    },
  ];
}

export default function OnlineConsultationPage() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [examFiles, setExamFiles] = useState<File[]>([]);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState({
    animal: "",
    consultationTier: "" as ConsultationTier | "",
    city: "",
    province: "",
    cap: "",
    name: "",
    email: "",
    phone: "",
    password: "",
    description: "",
    contactSecondary: "" as "" | "sms" | "whatsapp",
    emailVerificationAck: false,
    registrationConsent: false,
    consent: false,
    marketing: false,
  });

  const set = (field: string, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const needsPhoneForChannels =
    form.contactSecondary === "sms" || form.contactSecondary === "whatsapp";

  const describeIssues = (): string | null => {
    if (needsPhoneForChannels && form.phone.trim().length < 3) {
      return "Inserisci un numero di cellulare valido per SMS o WhatsApp.";
    }
    const missing: string[] = [];
    if (!form.animal) missing.push("cane o gatto");
    if (!form.consultationTier) missing.push("durata / tipo di consulenza (tariffa)");
    if (!form.name.trim()) missing.push("nome e cognome");
    if (!form.email.trim()) missing.push("email");
    if (!form.password || form.password.length < 8) missing.push("password (almeno 8 caratteri)");
    if (!form.city.trim()) missing.push("citt\à");
    if (!form.province.trim()) missing.push("provincia (sigla)");
    if (!form.emailVerificationAck) missing.push("conferma sulla verifica email (in fondo al modulo)");
    if (!form.registrationConsent) missing.push("consenso per creare l'account");
    if (!form.consent) missing.push("consenso privacy e trattamento dati");
    if (missing.length === 0) return null;
    return `Completa ancora: ${missing.join("; ")}.`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const issues = describeIssues();
    if (issues) {
      setSubmitError(issues);
      return;
    }
    const tier = form.consultationTier as ConsultationTier;

    setSubmitting(true);
    setSubmitError("");

    try {
      const payload = buildOnlineConsultationPayload({
        email: form.email,
        full_name: form.name,
        phone: form.phone,
        city: form.city,
        province: form.province,
        cap: form.cap,
        animal: form.animal,
        description: form.description,
        contactSecondary: form.contactSecondary,
        emailVerificationAck: form.emailVerificationAck,
        registrationConsent: form.registrationConsent,
        marketing: form.marketing,
        password: form.password,
        consultationTier: tier,
      });
      const res = await postRequests(payload, examFiles.length > 0 ? examFiles : undefined);
      setAccessToken(res.access_token);
      navigate(`/dashboard/chat/${res.conversation_id}`, { replace: true });
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Invio non riuscito");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm";

  const paypalMailto = `mailto:${PAYPAL_EMAIL}?subject=${encodeURIComponent(
    "Pagamento consulenza online \— VeterinarioVicino.it",
  )}`;

  return (
    <>
      <PageMeta
        title="Veterinario Online: Consulenza Veterinaria in Videochiamata | Cani e Gatti"
        description="Veterinario online per cani e gatti: consulenza veterinaria in videochiamata Google Meet con il Dott. Andrea Stella, specialista in oncologia. Tariffe da 30 \€. Prenota subito la tua visita veterinaria online."
        canonical="/consulenza-veterinaria-online/"
        jsonLd={buildJsonLd()}
      />
      <Header />
      <main className="bg-background">
        <div className="container max-w-4xl py-8 md:py-12 space-y-10">
          <Breadcrumbs items={[{ label: "Veterinario online" }]} />

          {/* ── Hero section ── */}
          <section className="space-y-4">
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground leading-tight">
              Veterinario Online: Consulenza Veterinaria in Videochiamata
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Parla con un <strong>veterinario online</strong> comodamente da casa tua tramite{" "}
              <strong>videochiamata Google Meet</strong>. Il servizio di consulenza veterinaria online
              \è dedicato a <strong>cani e gatti</strong> ed \è effettuato dal{" "}
              <strong>Dott. Andrea Stella</strong>, medico veterinario specializzato in oncologia.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="#modulo"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition hover:bg-primary/90"
              >
                <Video className="h-4 w-4" />
                Prenota consulenza online
              </a>
              <a
                href="#veterinario"
                className="inline-flex items-center gap-2 rounded-full border-2 border-primary/30 px-5 py-3 text-sm font-semibold text-primary transition hover:bg-primary/5"
              >
                <Stethoscope className="h-4 w-4" />
                Scopri il veterinario
              </a>
            </div>
          </section>

          {/* ── Come funziona + Tariffe + Pagamento ── */}
          <section className="grid gap-4 sm:grid-cols-3" aria-label="Informazioni sul servizio">
            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <Video className="h-8 w-8 text-primary mb-3" />
              <h2 className="font-semibold text-foreground text-base mb-1">Come funziona</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Compili il modulo, verifichi l&apos;email e concordi l&apos;orario in chat.
                Ricevi il link <strong>Google Meet</strong> per la videochiamata con il veterinario.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <Euro className="h-8 w-8 text-primary mb-3" />
              <h2 className="font-semibold text-foreground text-base mb-1">Tariffe veterinario online</h2>
              <ul className="text-sm text-muted-foreground space-y-1.5 list-disc list-inside">
                <li>
                  <strong>15 minuti</strong> \— 30 \€ (standard)
                </li>
                <li>
                  <strong>30 minuti</strong> (max) \— 50 \€ (standard)
                </li>
                <li>
                  <strong>Specialistica</strong> \— 100 \€
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <Shield className="h-8 w-8 text-primary mb-3" />
              <h2 className="font-semibold text-foreground text-base mb-1">Pagamento sicuro</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Pagamento tramite <strong>PayPal</strong> prima della consulenza.
                <br />
                <a className="text-primary font-medium hover:underline" href={paypalMailto}>
                  {PAYPAL_EMAIL}
                </a>
              </p>
            </div>
          </section>

          {/* ── Perch\é scegliere il veterinario online ── */}
          <section className="space-y-4">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              Perch\é scegliere il veterinario online
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-surface border border-border">
                <Clock className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground text-sm">Niente sala d&apos;attesa</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Collegati da casa in videochiamata: risparmi tempo e riduci lo stress per il tuo animale.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-xl bg-surface border border-border">
                <GraduationCap className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground text-sm">Second opinion qualificata</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Ideale per avere un secondo parere veterinario su diagnosi, terapie in corso o casi complessi.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-xl bg-surface border border-border">
                <PawPrint className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground text-sm">Specialista in oncologia</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Il Dott. Stella offre consulenze specialistiche in oncologia veterinaria per cani e gatti.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-xl bg-surface border border-border">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground text-sm">Referti e immagini inclusi</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Puoi allegare radiografie, analisi del sangue e foto per una consulenza pi\ù precisa.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ── Card veterinario ── */}
          <section
            id="veterinario"
            className="rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent p-6 md:p-8 space-y-4"
            aria-label="Il veterinario"
          >
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="shrink-0 flex flex-col items-center sm:items-start gap-3">
                <img
                  src={drStellaAvatar}
                  alt="Dott. Andrea Stella — Medico Veterinario"
                  width={112}
                  height={112}
                  className="w-28 h-28 rounded-2xl border-2 border-primary/20 bg-primary/5"
                />
              </div>
              <div className="space-y-3 flex-1">
                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground">
                    Dott. Andrea Stella
                  </h2>
                  <p className="text-primary font-semibold text-sm">Medico Veterinario</p>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Il <strong>Dott. Andrea Stella</strong> \è un medico veterinario laureato presso l&apos;
                  <strong>Universit\à degli Studi di Bari</strong>, iscritto all&apos;Ordine dei Medici Veterinari
                  della Provincia di Lecce con il <strong>numero di iscrizione 436</strong>.
                  \È <strong>Direttore Sanitario</strong> dell&apos;Ambulatorio Veterinario &quot;Citt\à di
                  Melendugno&quot; ed \è specializzato in <strong>oncologia veterinaria</strong>.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <Award className="h-4 w-4 text-primary shrink-0" />
                    <span>Albo n. 436 \— Lecce</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <GraduationCap className="h-4 w-4 text-primary shrink-0" />
                    <span>Universit\à di Bari</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <Stethoscope className="h-4 w-4 text-primary shrink-0" />
                    <span>Specialistica: Oncologia</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <PawPrint className="h-4 w-4 text-primary shrink-0" />
                    <span>Cani e Gatti</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <MapPin className="h-4 w-4 text-primary shrink-0" />
                    <span>Melendugno (LE)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <Video className="h-4 w-4 text-primary shrink-0" />
                    <span>Consulenze online</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── Avviso importante ── */}
          <section
            className="rounded-2xl border border-dashed border-primary/30 bg-primary/5 p-4 text-sm text-foreground"
          >
            <p className="font-medium mb-1">Importante</p>
            <p className="text-muted-foreground">
              La consulenza veterinaria online ha durata massima di <strong>mezz&apos;ora</strong> per le fasce
              standard; scegli la tariffa che preferisci nel modulo. Per la consulenza{" "}
              <strong>specialistica in oncologia</strong> si applica il costo di <strong>100 \€</strong>. Il team ti
              guider\à su pagamento e orario dopo la verifica email.
            </p>
          </section>

          {/* ── Modulo prenotazione ── */}
          <form
            id="modulo"
            onSubmit={handleSubmit}
            className="bg-card rounded-2xl border border-border shadow-sm p-6 md:p-8 space-y-5"
          >
            <h2 className="font-display text-xl font-bold text-foreground">
              Prenota la tua consulenza veterinaria online
            </h2>
            <p className="text-sm text-muted-foreground">
              Compila il modulo per prenotare la videochiamata con il Dott. Andrea Stella.
              Dopo l&apos;invio crei un account per la chat e il coordinamento.
            </p>

            <div>
              <label htmlFor="vv-online-animal" className="block text-sm font-medium text-foreground mb-1.5">
                Animale *
              </label>
              <select
                id="vv-online-animal"
                value={form.animal}
                onChange={(e) => set("animal", e.target.value)}
                className={inputClass}
                required
              >
                <option value="">Solo cani e gatti</option>
                {ONLINE_ANIMALS.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.emoji} {a.label}
                  </option>
                ))}
              </select>
            </div>

            <fieldset className="space-y-2">
              <legend className="block text-sm font-medium text-foreground mb-2">Tipo e durata (tariffa) *</legend>
              <div className="space-y-2">
                {TIER_OPTIONS.map((opt) => (
                  <label
                    key={opt.id}
                    className={cn(
                      "flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition-colors",
                      form.consultationTier === opt.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:bg-muted/40",
                    )}
                  >
                    <input
                      type="radio"
                      name="consultationTier"
                      value={opt.id}
                      checked={form.consultationTier === opt.id}
                      onChange={() => set("consultationTier", opt.id)}
                      className="mt-1 h-4 w-4 border-input accent-primary"
                    />
                    <span>
                      <span className="font-medium text-foreground">{opt.title}</span>
                      <span className="block text-xs text-muted-foreground">{opt.detail}</span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="md:col-span-1">
                <label htmlFor="vv-online-city" className="block text-sm font-medium text-foreground mb-1.5">
                  Citt\à *
                </label>
                <input
                  id="vv-online-city"
                  type="text"
                  value={form.city}
                  onChange={(e) => set("city", e.target.value)}
                  placeholder="es. Lecce"
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label htmlFor="vv-online-province" className="block text-sm font-medium text-foreground mb-1.5">
                  Provincia *
                </label>
                <input
                  id="vv-online-province"
                  type="text"
                  value={form.province}
                  onChange={(e) => set("province", e.target.value.toUpperCase().slice(0, 2))}
                  placeholder="LE"
                  maxLength={2}
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label htmlFor="vv-online-cap" className="block text-sm font-medium text-foreground mb-1.5">
                  CAP
                </label>
                <input
                  id="vv-online-cap"
                  type="text"
                  value={form.cap}
                  onChange={(e) => set("cap", e.target.value)}
                  placeholder="73100"
                  maxLength={10}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="vv-online-name" className="block text-sm font-medium text-foreground mb-1.5">
                  Nome e cognome *
                </label>
                <input
                  id="vv-online-name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="vv-online-email" className="block text-sm font-medium text-foreground mb-1.5">
                  Email *
                </label>
                <input
                  id="vv-online-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  className={inputClass}
                  autoComplete="email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Cellulare {needsPhoneForChannels ? "*" : "(facoltativo)"}
                </label>
                <input
                  type="tel"
                  required={needsPhoneForChannels}
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  className={inputClass}
                  autoComplete="tel"
                />
              </div>
              <div>
                <label htmlFor="vv-online-password" className="block text-sm font-medium text-foreground mb-1.5">
                  Password *
                </label>
                <input
                  id="vv-online-password"
                  type="password"
                  value={form.password}
                  onChange={(e) => set("password", e.target.value)}
                  minLength={8}
                  className={inputClass}
                  autoComplete="new-password"
                />
              </div>
            </div>

            <div>
              <label htmlFor="vv-online-description" className="block text-sm font-medium text-foreground mb-1.5">
                Motivo della consulenza (facoltativo ma consigliato)
              </label>
              <textarea
                id="vv-online-description"
                rows={3}
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
                placeholder="Sintomi, dubbi, terapie in corso\…"
                className={cn(inputClass, "resize-none")}
              />
            </div>

            <div>
              <label htmlFor="vv-online-exams" className="block text-sm font-medium text-foreground mb-1.5">
                Esami gi\à eseguiti (facoltativo)
              </label>
              <input
                id="vv-online-exams"
                type="file"
                multiple
                accept=".pdf,.png,.jpg,.jpeg,.webp,.gif,application/pdf,image/*"
                onChange={(e) => {
                  const list = e.target.files;
                  if (!list?.length) {
                    setExamFiles([]);
                    return;
                  }
                  setExamFiles(Array.from(list).slice(0, 8));
                }}
                className={cn(inputClass, "py-2 file:mr-3 file:rounded-lg file:border-0 file:bg-primary/10 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-primary")}
              />
              <p className="text-xs text-muted-foreground mt-1.5">
                Puoi allegare <strong>PDF</strong> o <strong>immagini</strong> (referti, radiografie, foto). Massimo{" "}
                <strong>8 file</strong>, fino a <strong>8 MB</strong> ciascuno.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Preferenze di contatto</label>
              <div className="space-y-2 rounded-xl border border-border p-4 bg-muted/30">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="contactSec"
                    checked={form.contactSecondary === ""}
                    onChange={() => set("contactSecondary", "")}
                    className="h-4 w-4 border-input accent-primary"
                  />
                  <span className="text-sm">Solo email</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="contactSec"
                    checked={form.contactSecondary === "sms"}
                    onChange={() => set("contactSecondary", "sms")}
                    className="h-4 w-4 border-input accent-primary"
                  />
                  <span className="text-sm">Email e SMS</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="contactSec"
                    checked={form.contactSecondary === "whatsapp"}
                    onChange={() => set("contactSecondary", "whatsapp")}
                    className="h-4 w-4 border-input accent-primary"
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
                Ho compreso che devo verificare il mio indirizzo email (anche spam) per procedere con la consulenza online
                e le comunicazioni. *
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
                Voglio registrarmi e creare un account con questa email e password per la chat e l&apos;area riservata. *
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
                Acconsento al trattamento dei dati (GDPR) e alla{" "}
                <a href="/privacy-policy/" target="_blank" rel="noopener noreferrer" className="text-primary font-medium">
                  Privacy Policy
                </a>
                . Autorizzo {siteConfig.name} a gestire la mia richiesta di <strong>consulenza veterinaria online</strong>{" "}
                e a contattarmi per organizzare Meet e pagamento. *
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

            {submitError && (
              <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm border border-destructive/20">
                {submitError}
              </div>
            )}

            <Button type="submit" variant="cta" size="lg" className="w-full" disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Invio in corso\…
                </>
              ) : (
                "Invia richiesta di consulenza online"
              )}
            </Button>
          </form>

          {/* ── Trust cards below form ── */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-border bg-surface">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-semibold text-foreground">Pagamento sicuro con PayPal</h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Usa PayPal verso <strong>{PAYPAL_EMAIL}</strong>. In alternativa puoi usare il link nell&apos;email di
                conferma dopo l&apos;invio.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-border bg-surface">
              <div className="flex items-center gap-2 mb-2">
                <Video className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-semibold text-foreground">Videochiamata Google Meet</h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Riceverai il link per la videochiamata dopo aver verificato l&apos;email e concordato data e ora con il
                Dott. Stella.
              </p>
            </div>
          </div>

          {/* ── FAQ Section ── */}
          <section className="space-y-5" aria-label="Domande frequenti sul veterinario online">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              Domande frequenti sul veterinario online
            </h2>
            <div className="space-y-2">
              {PAGE_FAQS.map((faq, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-border bg-card overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex w-full items-center justify-between gap-3 p-4 text-left"
                    aria-expanded={openFaq === i}
                  >
                    <h3 className="font-semibold text-foreground text-sm pr-2">{faq.q}</h3>
                    {openFaq === i ? (
                      <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                    )}
                  </button>
                  {openFaq === i && (
                    <div className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed border-t border-border pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* ── SEO content section ── */}
          <section className="prose prose-sm max-w-none text-muted-foreground space-y-4">
            <h2 className="font-display text-2xl font-bold text-foreground">
              Consulenza veterinaria online: cosa sapere
            </h2>
            <p>
              Il servizio di <strong>veterinario online</strong> di VeterinarioVicino.it permette ai proprietari di{" "}
              <strong>cani e gatti</strong> in tutta Italia di accedere a una consulenza veterinaria professionale senza
              doversi spostare. La <strong>visita veterinaria online</strong> avviene tramite videochiamata{" "}
              <strong>Google Meet</strong> ed \è condotta dal{" "}
              <strong>Dott. Andrea Stella</strong>, medico veterinario con studio a Melendugno (Lecce), iscritto
              all&apos;Ordine dei Medici Veterinari con il numero 436.
            </p>
            <p>
              La consulenza \è particolarmente indicata per <strong>second opinion veterinaria</strong>,{" "}
              <strong>monitoraggio di terapie in corso</strong>, consigli su alimentazione e nutrizione, e{" "}
              <strong>consulenze specialistiche in oncologia veterinaria</strong>. Prima della videochiamata puoi
              inviare referti, radiografie e analisi del sangue per una valutazione pi\ù completa.
            </p>
            <p>
              Le tariffe del veterinario online partono da <strong>30 \€ per 15 minuti</strong> di consulenza
              standard fino a <strong>100 \€ per la consulenza specialistica</strong>. Il pagamento avviene in modo
              sicuro tramite PayPal. Dopo la prenotazione, concordi data e orario direttamente con il veterinario
              attraverso la chat dedicata.
            </p>
          </section>

          <Disclaimer variant="warning">
            <strong>Importante:</strong> la consulenza veterinaria online non sostituisce una visita clinica in presenza
            se il veterinario ritiene necessario un esame diretto dell&apos;animale. In caso di emergenza rivolgiti
            subito a una clinica o pronto soccorso veterinario.
          </Disclaimer>
        </div>
      </main>
      <Footer />
      <StickyMobileCTA ctaTo="/consulenza-veterinaria-online/#modulo" ctaLabel="Prenota consulenza online" />
    </>
  );
}
