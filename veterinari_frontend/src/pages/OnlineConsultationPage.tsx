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
import { CheckCircle, Shield, Loader2, Video, Euro } from "lucide-react";
import { webPageJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { postRequests, setAccessToken } from "@/lib/api";
import { buildOnlineConsultationPayload, type ConsultationTier } from "@/lib/build-request-payload";

const ONLINE_ANIMALS = animals.filter((a) => a.id === "cane" || a.id === "gatto");

const PAYPAL_EMAIL =
  (import.meta.env.VITE_ONLINE_CONSULT_PAYPAL_EMAIL as string | undefined)?.trim() || "vet.stella@gmail.com";

const TIER_OPTIONS: { id: ConsultationTier; title: string; detail: string }[] = [
  {
    id: "std_15_30",
    title: "15 minuti",
    detail: "30 € — consulenza semplice (monitoraggio terapia, iter diagnostico)",
  },
  {
    id: "std_30_50",
    title: "30 minuti (max)",
    detail: "50 € — second opinion o consulenza casi cronici",
  },
  { id: "specialist_100", title: "Specialistica", detail: "100 € — consulenza veterinaria specialistica" },
];

export default function OnlineConsultationPage() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
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
    if (!form.city.trim()) missing.push("città");
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
    "Pagamento consulenza online — VeterinarioVicino.it",
  )}`;

  return (
    <>
      <PageMeta
        title="Consulenza veterinaria online — video Google Meet — VeterinarioVicino.it"
        description="Consulenza online per cani e gatti: videochiamata Google Meet. Tariffe da 30 € a 100 €. Pagamento PayPal."
        canonical="/consulenza-veterinaria-online/"
        jsonLd={[
          webPageJsonLd({
            title: "Consulenza veterinaria online",
            description:
              "Servizio di consulenza veterinaria online via Google Meet per cani e gatti, con tariffe chiare e pagamento PayPal.",
            url: "/consulenza-veterinaria-online/",
          }),
          breadcrumbJsonLd([{ name: "Consulenza online" }]),
        ]}
      />
      <Header />
      <main className="bg-background">
        <div className="container max-w-2xl py-8 md:py-12 space-y-8">
          <Breadcrumbs items={[{ label: "Consulenza veterinaria online" }]} />

          <section className="space-y-3">
            <h1 className="font-display text-3xl font-extrabold text-foreground">
              Consulenza veterinaria online
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              Parla con un veterinario in <strong>videochiamata Google Meet</strong>, comodamente da casa. Il servizio è
              dedicato a <strong>cani e gatti</strong>. Dopo l&apos;invio del modulo crei un account e accedi alla chat
              per coordinare orario e ricevere il link Meet; il <strong>pagamento</strong> avviene tramite{" "}
              <strong>PayPal</strong> all&apos;indirizzo convenzionato indicato sotto.
            </p>
          </section>

          <section className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
              <Video className="h-8 w-8 text-primary mb-2" />
              <h2 className="font-semibold text-foreground text-sm">Come funziona</h2>
              <p className="text-xs text-muted-foreground mt-1">
                Prenoti la consulenza dal modulo. Ricevi email di conferma, paghi con PayPal, poi ti inviamo il link
                Google Meet.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
              <Euro className="h-8 w-8 text-primary mb-2" />
              <h2 className="font-semibold text-foreground text-sm">Tariffe</h2>
              <ul className="text-xs text-muted-foreground mt-1 space-y-1 list-disc list-inside">
                <li>
                  <strong>15 minuti</strong> — 30 € (standard)
                </li>
                <li>
                  <strong>30 minuti</strong> (massimo) — 50 € (standard)
                </li>
                <li>
                  <strong>Specialistica</strong> — 100 €
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
              <Shield className="h-8 w-8 text-primary mb-2" />
              <h2 className="font-semibold text-foreground text-sm">Pagamento PayPal</h2>
              <p className="text-xs text-muted-foreground mt-1 break-all">
                Destinatario:{" "}
                <a className="text-primary font-medium hover:underline" href={paypalMailto}>
                  {PAYPAL_EMAIL}
                </a>
              </p>
            </div>
          </section>

          <section
            id="modulo"
            className="rounded-2xl border border-dashed border-primary/30 bg-primary/5 p-4 text-sm text-foreground"
          >
            <p className="font-medium mb-1">Importante</p>
            <p className="text-muted-foreground">
              La consulenza online ha durata massima di <strong>mezz&apos;ora</strong> per le fasce standard; scegli la
              tariffa che preferisci nel modulo. Per la consulenza <strong>specialistica</strong> applica il costo di{" "}
              <strong>100 €</strong>. Il team ti guiderà su pagamento e orario dopo la verifica email.
            </p>
          </section>

          <form
            onSubmit={handleSubmit}
            className="bg-card rounded-2xl border border-border shadow-sm p-6 md:p-8 space-y-5"
          >
            <h2 className="font-display text-xl font-bold text-foreground">Prenota la consulenza</h2>

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
                  Città *
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
                placeholder="Sintomi, dubbi, terapie in corso…"
                className={cn(inputClass, "resize-none")}
              />
            </div>

            <div>
              <label htmlFor="vv-online-exams" className="block text-sm font-medium text-foreground mb-1.5">
                Esami già eseguiti (facoltativo)
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
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Invio in corso…
                </>
              ) : (
                "Invia richiesta di consulenza online"
              )}
            </Button>
          </form>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-border bg-surface">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-semibold text-foreground">Pagamento sicuro</h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Usa PayPal verso <strong>{PAYPAL_EMAIL}</strong>. In alternativa puoi usare il link nell&apos;email di
                conferma dopo l&apos;invio.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-border bg-surface">
              <div className="flex items-center gap-2 mb-2">
                <Video className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-semibold text-foreground">Google Meet</h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Riceverai il link per la videochiamata dopo aver verificato l&apos;email e concordato data e ora con lo
                staff.
              </p>
            </div>
          </div>

          <Disclaimer variant="warning">
            <strong>Importante:</strong> la consulenza online non sostituisce una visita clinica in presenza se il
            veterinario ritiene necessario un esame diretto. In emergenza rivolgiti subito a una clinica o pronto soccorso
            veterinario.
          </Disclaimer>
        </div>
      </main>
      <Footer />
      <StickyMobileCTA ctaTo="/consulenza-veterinaria-online/#modulo" ctaLabel="Prenota consulenza online" />
    </>
  );
}
