import { useState, useEffect } from "react";
import { siteConfig } from "@/config/site";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageMeta } from "@/components/PageMeta";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { Disclaimer } from "@/components/Disclaimer";
import { Button } from "@/components/ui/button";
import { animals } from "@/config/site";
import { serviceTaxonomy, getSubcategories } from "@/data/service-taxonomy";
import { cn } from "@/lib/utils";
import { CheckCircle, Shield, Loader2 } from "lucide-react";
import { webPageJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { postRequests, setAccessToken } from "@/lib/api";
import { buildCreateRequestPayload } from "@/lib/build-request-payload";
import { resolveTaxonomyFromQuery } from "@/lib/request-taxonomy";

export default function RequestPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [form, setForm] = useState({
    animal: "",
    serviceCategory: "",
    subService: "",
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

  useEffect(() => {
    const servizio = params.get("servizio") || "";
    const r = resolveTaxonomyFromQuery(servizio);
    const city = params.get("citta") || params.get("localita") || "";
    const sottoservizio = params.get("sottoservizio") || "";
    setForm((f) => ({
      ...f,
      animal: params.get("animale") || f.animal,
      serviceCategory: r.serviceCategory || f.serviceCategory,
      subService: sottoservizio || r.subService || f.subService,
      city: city || f.city,
    }));
  }, [params]);

  const set = (field: string, value: string | boolean) =>
    setForm(prev => ({ ...prev, [field]: value }));

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
      setSubmitError("Inserisci un numero di cellulare valido per SMS o WhatsApp.");
      return;
    }

    setSubmitting(true);
    setSubmitError("");

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
      setSubmitError(err instanceof Error ? err.message : "Invio non riuscito");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm";

  return (
    <>
      <PageMeta
        title="Invia richiesta di contatto veterinario — VeterinarioVicino.it"
        description="Compila il modulo per inviare una richiesta di contatto alle strutture veterinarie della tua zona. Servizio gratuito."
        canonical="/richiedi-assistenza/"
        jsonLd={[
          webPageJsonLd({ title: "Invia richiesta di contatto veterinario", description: "Compila il modulo per inviare una richiesta di contatto alle strutture veterinarie della tua zona.", url: "/richiedi-assistenza/" }),
          breadcrumbJsonLd([{ name: "Richiedi contatto" }]),
        ]}
      />
      <Header />
      <main className="bg-background">
        <div className="container max-w-2xl py-8 md:py-12 space-y-6">
          <Breadcrumbs items={[{ label: "Invia richiesta di contatto" }]} />

          <section>
            <h1 className="font-display text-3xl font-extrabold text-foreground mb-2">
              Invia una richiesta di contatto veterinario
            </h1>
            <p className="text-muted-foreground">
              Compilando il modulo crei un account con email e password: dopo l&apos;invio accedi subito alla chat del servizio.
              Riceverai anche un messaggio per verificare la tua email (controlla anche lo spam): solo dopo la verifica
              inoltriamo la richiesta ai veterinari della tua zona. Il servizio è gratuito.
            </p>
          </section>

          <form onSubmit={handleSubmit} className="bg-card rounded-2xl border border-border shadow-sm p-6 md:p-8 space-y-5">
            {/* Animal */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Animale *</label>
              <select value={form.animal} onChange={e => set("animal", e.target.value)} className={inputClass} required>
                <option value="">Seleziona animale</option>
                {animals.map(a => <option key={a.id} value={a.id}>{a.emoji} {a.label}</option>)}
              </select>
            </div>

            {/* Service Category + SubService */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Categoria servizio *</label>
                <select value={form.serviceCategory} onChange={e => handleServiceCategoryChange(e.target.value)} className={inputClass} required>
                  <option value="">Seleziona categoria</option>
                  {serviceTaxonomy.map(s => <option key={s.id} value={s.id}>{s.emoji} {s.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Servizio specifico</label>
                <select
                  value={form.subService}
                  onChange={e => set("subService", e.target.value)}
                  className={inputClass}
                  disabled={!subcategories.length}
                >
                  <option value="">{subcategories.length ? "Seleziona dettaglio" : "Scegli prima la categoria"}</option>
                  {subcategories.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                </select>
              </div>
            </div>

            {/* Location */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-foreground mb-1.5">Città *</label>
                <input
                  type="text"
                  value={form.city}
                  onChange={e => set("city", e.target.value)}
                  placeholder="es. Lecce"
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Provincia *</label>
                <input
                  type="text"
                  value={form.province}
                  onChange={e => set("province", e.target.value.toUpperCase().slice(0, 2))}
                  placeholder="LE"
                  maxLength={2}
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">CAP</label>
                <input
                  type="text"
                  value={form.cap}
                  onChange={e => set("cap", e.target.value)}
                  placeholder="73100"
                  maxLength={10}
                  className={inputClass}
                />
              </div>
            </div>

            <hr className="border-border" />

            {/* Personal info */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Nome e cognome *</label>
                <input type="text" required value={form.name} onChange={e => set("name", e.target.value)} placeholder="Mario Rossi" className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Email *</label>
                <input type="email" required value={form.email} onChange={e => set("email", e.target.value)} placeholder="nome@email.it" className={inputClass} autoComplete="email" />
                <p className="text-xs text-muted-foreground mt-1">
                  Riceverai qui il link di verifica. Senza verifica non possiamo inoltrare la richiesta alle strutture.
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Cellulare {needsPhoneForChannels ? "*" : "(facoltativo)"}
                </label>
                <input
                  type="tel"
                  required={needsPhoneForChannels}
                  value={form.phone}
                  onChange={e => set("phone", e.target.value)}
                  placeholder="+39 333 123 4567"
                  className={inputClass}
                  autoComplete="tel"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Obbligatorio solo se scegli anche SMS o WhatsApp come canale.
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Password *</label>
                <input
                  type="password"
                  value={form.password}
                  onChange={e => set("password", e.target.value)}
                  placeholder="Min. 8 caratteri"
                  minLength={8}
                  className={inputClass}
                  autoComplete="new-password"
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">Serve per creare l&apos;account e accedere alla chat e a &quot;Accedi&quot; in seguito.</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Note aggiuntive</label>
              <textarea
                rows={3}
                value={form.description}
                onChange={e => set("description", e.target.value)}
                placeholder="Descrivi brevemente il problema o la necessità del tuo animale…"
                className={cn(inputClass, "resize-none")}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Preferenze di contatto</label>
              <p className="text-xs text-muted-foreground mb-3">
                L&apos;email è sempre usata per conferme e aggiornamenti. Puoi aggiungere un secondo canale (SMS o WhatsApp).
              </p>
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
                onChange={e => set("emailVerificationAck", e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-input accent-primary"
                required
              />
              <span className="text-xs text-muted-foreground leading-relaxed">
                Ho compreso che devo verificare il mio indirizzo email (controllare anche la cartella spam) perché la richiesta
                possa essere inoltrata ai veterinari nella mia zona per trovare la prima disponibilità tra i vostri contatti. *
              </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.registrationConsent}
                onChange={e => set("registrationConsent", e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-input accent-primary"
                required
              />
              <span className="text-xs text-muted-foreground leading-relaxed">
                Voglio registrarmi al sito e creare un account con questa email e password per accedere alla chat e alle
                funzioni riservate. *
              </span>
            </label>

            {/* GDPR consent - required */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.consent}
                onChange={e => set("consent", e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-input accent-primary"
                required
              />
              <span className="text-xs text-muted-foreground leading-relaxed">
                Acconsento al trattamento dei miei dati personali ai sensi del Reg. UE 2016/679 (GDPR) e della{" "}
                <a href="/privacy-policy/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
                  Privacy Policy
                </a>{" "}
                e autorizzo {siteConfig.name} a trasmettere la mia richiesta di contatto a veterinari e strutture veterinarie della zona
                affinché possano ricontattarmi direttamente. *
              </span>
            </label>

            {/* Marketing consent - optional */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.marketing}
                onChange={e => set("marketing", e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-input accent-primary"
              />
              <span className="text-xs text-muted-foreground leading-relaxed">
                Acconsento a ricevere comunicazioni promozionali e aggiornamenti su servizi veterinari nella mia zona. (facoltativo)
              </span>
            </label>

            {/* Lead sharing disclosure */}
            <p className="text-xs text-muted-foreground bg-accent/50 rounded-lg p-3 border border-border">
              ℹ️ I dati inseriti verranno trasmessi a strutture veterinarie della zona selezionata al solo fine di consentire
              il contatto diretto tra te e il professionista. {siteConfig.name} non seleziona né raccomanda alcun veterinario specifico.
              Per maggiori informazioni consulta la nostra{" "}
              <a href="/privacy-policy/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
                Privacy Policy
              </a>.
            </p>

            {submitError && (
              <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm border border-destructive/20">
                {submitError}
              </div>
            )}

            <Button
              type="submit"
              variant="cta"
              size="lg"
              className="w-full"
              disabled={
                !form.consent ||
                !form.registrationConsent ||
                !form.emailVerificationAck ||
                !form.name ||
                !form.email ||
                !form.animal ||
                !form.serviceCategory ||
                !form.city ||
                !form.province ||
                (needsPhoneForChannels && form.phone.trim().length < 3) ||
                !form.password ||
                form.password.length < 8 ||
                submitting
              }
            >
              {submitting ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Invio in corso…</>
              ) : (
                "Crea account e apri chat"
              )}
            </Button>
          </form>

          {/* Trust modules */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-border bg-surface">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-semibold text-foreground">Servizio gratuito e sicuro</h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Non applichiamo costi né commissioni. I tuoi dati vengono utilizzati esclusivamente per
                gestire la tua richiesta.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-border bg-surface">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-semibold text-foreground">Rispondiamo entro 24 ore</h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Il nostro team gestisce le richieste in arrivo e le inoltra alle strutture della zona;
                di solito ricevi un riscontro entro 24 ore lavorative.
              </p>
            </div>
          </div>

          <Disclaimer variant="warning">
            <strong>Importante:</strong> {siteConfig.name} non è un servizio medico e non fornisce consulenze, diagnosi o prestazioni veterinarie.
            L&apos;invio del modulo non costituisce richiesta di prestazione sanitaria: è solo un contatto informativo verso strutture della zona.
          </Disclaimer>
        </div>
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
}
