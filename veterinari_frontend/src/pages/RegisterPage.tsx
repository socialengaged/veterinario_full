import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageMeta } from "@/components/PageMeta";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, User, UserPlus, Loader2 } from "lucide-react";
import { animals, urgencyLevels } from "@/config/site";
import { serviceTaxonomy, getSubcategories } from "@/data/service-taxonomy";
import { cn } from "@/lib/utils";
import { postRequests, setAccessToken } from "@/lib/api";
import { buildCreateRequestPayload } from "@/lib/build-request-payload";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    animal: "",
    serviceCategory: "",
    subService: "",
    urgency: "non-urgente",
    city: "",
    province: "",
    cap: "",
    description: "",
    contactSecondary: "" as "" | "sms" | "whatsapp",
    emailVerificationAck: false,
    marketing: false,
  });

  const set = (field: string, value: string | boolean) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const handleServiceCategoryChange = (value: string) => {
    set("serviceCategory", value);
    set("subService", "");
  };

  const subcategories = getSubcategories(form.serviceCategory);
  const inputClass = "w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm";

  const needsPhoneForChannels =
    form.contactSecondary === "sms" || form.contactSecondary === "whatsapp";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !form.name ||
      !form.email ||
      !form.password ||
      form.password.length < 8 ||
      !form.emailVerificationAck ||
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
        urgency: form.urgency || "normale",
        description: form.description,
        contactSecondary: form.contactSecondary,
        emailVerificationAck: form.emailVerificationAck,
        marketing: form.marketing,
        password: form.password,
      });
      const res = await postRequests(payload);
      setAccessToken(res.access_token);
      navigate(`/dashboard/chats/${res.conversation_id}`, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registrazione non riuscita");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <PageMeta title="Registrati — VeterinarioVicino.it" description="Crea un account e invia una richiesta di contatto alle strutture veterinarie." />
      <Header />
      <main className="bg-background min-h-[70vh] py-12">
        <div className="container max-w-2xl mx-auto px-4">
          <div className="p-6 md:p-8 rounded-2xl border border-border bg-card shadow-sm">
            <div className="text-center mb-8">
              <UserPlus className="h-10 w-10 text-primary mx-auto mb-3" />
              <h1 className="font-display text-2xl font-bold text-foreground">Crea un account</h1>
              <p className="text-sm text-muted-foreground mt-1">Compila i campi per registrarti e aprire una conversazione con il servizio</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome e cognome *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="name" placeholder="Mario Rossi" value={form.name} onChange={e => set("name", e.target.value)} className="pl-10" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="email" type="email" placeholder="la-tua@email.it" value={form.email} onChange={e => set("email", e.target.value)} className="pl-10" required />
                  </div>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="password">Password * (min. 8 caratteri)</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="password" type="password" placeholder="Scegli una password sicura" value={form.password} onChange={e => set("password", e.target.value)} className="pl-10" minLength={8} required autoComplete="new-password" />
                  </div>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="phone">
                    Cellulare {needsPhoneForChannels ? "*" : "(facoltativo)"}
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+39 333 123 4567"
                    value={form.phone}
                    onChange={e => set("phone", e.target.value)}
                    required={needsPhoneForChannels}
                    autoComplete="tel"
                  />
                  <p className="text-xs text-muted-foreground">Obbligatorio se scegli SMS o WhatsApp.</p>
                </div>
              </div>

              <hr className="border-border" />

              <div>
                <label className="block text-sm font-medium mb-1.5">Animale *</label>
                <select value={form.animal} onChange={e => set("animal", e.target.value)} className={inputClass} required>
                  <option value="">Seleziona animale</option>
                  {animals.map(a => <option key={a.id} value={a.id}>{a.emoji} {a.label}</option>)}
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Categoria servizio *</label>
                  <select value={form.serviceCategory} onChange={e => handleServiceCategoryChange(e.target.value)} className={inputClass} required>
                    <option value="">Seleziona categoria</option>
                    {serviceTaxonomy.map(s => <option key={s.id} value={s.id}>{s.emoji} {s.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Servizio specifico</label>
                  <select value={form.subService} onChange={e => set("subService", e.target.value)} className={inputClass} disabled={!subcategories.length}>
                    <option value="">{subcategories.length ? "Seleziona dettaglio" : "Scegli prima la categoria"}</option>
                    {subcategories.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Città *</label>
                  <input type="text" value={form.city} onChange={e => set("city", e.target.value)} className={inputClass} required placeholder="Lecce" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Provincia *</label>
                  <input type="text" value={form.province} onChange={e => set("province", e.target.value.toUpperCase().slice(0, 2))} maxLength={2} className={inputClass} required placeholder="LE" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">CAP</label>
                  <input type="text" value={form.cap} onChange={e => set("cap", e.target.value)} className={inputClass} placeholder="73100" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">Urgenza</label>
                <select value={form.urgency} onChange={e => set("urgency", e.target.value)} className={inputClass}>
                  <option value="normale">Normale</option>
                  {urgencyLevels.map(u => (
                    <option key={u.id} value={u.id}>{u.label}</option>
                  ))}
                  <option value="emergenza">Emergenza</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">Note</label>
                <textarea rows={2} value={form.description} onChange={e => set("description", e.target.value)} className={cn(inputClass, "resize-none")} placeholder="Opzionale" />
              </div>

              <div>
                <span className="block text-sm font-medium mb-2">Preferenze di contatto</span>
                <p className="text-xs text-muted-foreground mb-2">Email sempre attiva; puoi aggiungere SMS o WhatsApp.</p>
                <div className="space-y-2 rounded-xl border border-border p-4 bg-muted/30">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="regContactSec" checked={form.contactSecondary === ""} onChange={() => set("contactSecondary", "")} className="h-4 w-4 accent-primary" />
                    <span className="text-sm">Solo email</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="regContactSec" checked={form.contactSecondary === "sms"} onChange={() => set("contactSecondary", "sms")} className="h-4 w-4 accent-primary" />
                    <span className="text-sm">Email e SMS</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="regContactSec" checked={form.contactSecondary === "whatsapp"} onChange={() => set("contactSecondary", "whatsapp")} className="h-4 w-4 accent-primary" />
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
                  Ho compreso che devo verificare il mio indirizzo email (anche in spam) perché la richiesta possa essere inoltrata ai veterinari nella mia zona. *
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" checked={form.marketing} onChange={e => set("marketing", e.target.checked)} className="mt-1 h-4 w-4 rounded border-input accent-primary" />
                <span className="text-xs text-muted-foreground">Acconsento a ricevere comunicazioni promozionali (facoltativo)</span>
              </label>

              {error && (
                <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm border border-destructive/20">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                variant="cta"
                className="w-full"
                disabled={
                  submitting ||
                  !form.emailVerificationAck ||
                  (needsPhoneForChannels && form.phone.trim().length < 3)
                }
              >
                {submitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Invio in corso…</> : "Registrati e apri chat"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              Hai già un account?{" "}
              <Link to="/accedi/" className="text-primary font-medium hover:underline">Accedi</Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
