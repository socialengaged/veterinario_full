import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FinderResult } from "@/components/SmartFinder";
import { cn } from "@/lib/utils";
import { CheckCircle, ArrowLeft, Loader2 } from "lucide-react";
import { submitToWeb3Forms } from "@/lib/web3forms";

interface RequestFormProps {
  finderResult: FinderResult;
  onBack: () => void;
}

export function RequestForm({ finderResult, onBack }: RequestFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    description: "",
    contactMethod: "telefono",
    consent: false,
    marketing: false,
  });

  const handleChange = (field: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.consent || !form.name || !form.phone) return;

    setSubmitting(true);
    setSubmitError("");

    const result = await submitToWeb3Forms({
      nome: form.name,
      telefono: form.phone,
      animal: finderResult.animalLabel,
      servizio: finderResult.serviceLabel,
      dettaglio_servizio: finderResult.subServiceLabel,
      
      citta: finderResult.location,
      note: form.description,
      contatto_preferito: form.contactMethod,
      consenso_marketing: form.marketing ? "Sì" : "No",
      location: finderResult.location,
    });

    setSubmitting(false);

    if (result.success) {
      setSubmitted(true);
    } else {
      setSubmitError(result.message);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-lg mx-auto text-center py-12 px-6"
      >
        <CheckCircle className="h-16 w-16 text-success mx-auto mb-4" />
        <h2 className="font-display text-2xl font-bold text-foreground mb-2">Richiesta inviata!</h2>
        <p className="text-muted-foreground mb-6">
          Abbiamo ricevuto la tua richiesta di contatto. La inoltreremo alle strutture veterinarie
          della tua zona, che potranno ricontattarti direttamente.
        </p>
        <Button variant="outline" onClick={onBack}>Torna alla home</Button>
      </motion.div>
    );
  }

  const inputClass = "w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      <div className="bg-card rounded-2xl border border-border shadow-lg p-6 md:p-8">
        <button onClick={onBack} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Modifica ricerca
        </button>

        <h2 className="font-display text-2xl font-bold text-foreground mb-2">Completa la tua richiesta</h2>
        <p className="text-sm text-muted-foreground mb-6">Inserisci i tuoi dati per inoltrare la richiesta di contatto</p>

        {/* Summary */}
        <div className="grid grid-cols-2 gap-3 mb-6 p-4 rounded-xl bg-surface text-sm">
          <div><span className="text-muted-foreground">Animale:</span> <strong>{finderResult.animalLabel}</strong></div>
          <div><span className="text-muted-foreground">Servizio:</span> <strong>{finderResult.serviceLabel}</strong></div>
          <div><span className="text-muted-foreground">Dettaglio:</span> <strong>{finderResult.subServiceLabel}</strong></div>
          
          <div className="col-span-2"><span className="text-muted-foreground">Zona:</span> <strong>{finderResult.location}</strong></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Nome *</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Mario"
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
            <label className="block text-sm font-medium text-foreground mb-1">Note aggiuntive</label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Descrivi brevemente il problema o la necessità..."
              className={cn(inputClass, "resize-none")}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Metodo di contatto preferito</label>
            <div className="flex gap-3">
              {["telefono", "whatsapp"].map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => handleChange("contactMethod", m)}
                  className={cn(
                    "px-4 py-2 rounded-lg border text-sm font-medium capitalize transition-all",
                    form.contactMethod === m
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background text-foreground border-input hover:bg-accent"
                  )}
                >
                  {m === "whatsapp" ? "WhatsApp" : "Telefono"}
                </button>
              ))}
            </div>
          </div>

          {/* GDPR consent - required */}
          <label className="flex items-start gap-3 cursor-pointer pt-2">
            <input
              type="checkbox"
              checked={form.consent}
              onChange={(e) => handleChange("consent", e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-input accent-primary"
              required
            />
            <span className="text-xs text-muted-foreground leading-relaxed">
              Acconsento al trattamento dei miei dati personali ai sensi del Reg. UE 2016/679 (GDPR) e della{" "}
              <a href="/privacy-policy/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
                Privacy Policy
              </a>{" "}
              e autorizzo veterinariovicino.it a trasmettere la mia richiesta di contatto a veterinari e strutture veterinarie della zona
              affinché possano ricontattarmi direttamente. *
            </span>
          </label>

          {/* Marketing consent - optional */}
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.marketing}
              onChange={(e) => handleChange("marketing", e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-input accent-primary"
            />
            <span className="text-xs text-muted-foreground leading-relaxed">
              Acconsento a ricevere comunicazioni promozionali e aggiornamenti su servizi veterinari nella mia zona. (facoltativo)
            </span>
          </label>

          {/* Lead sharing disclosure */}
          <p className="text-xs text-muted-foreground bg-accent/50 rounded-lg p-3 border border-border">
            I dati saranno trasmessi alle strutture veterinarie presenti nella zona indicata per consentire il contatto diretto. Ti invitiamo a non inserire informazioni sanitarie sensibili.
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
            disabled={!form.consent || !form.name || !form.phone || submitting}
          >
            {submitting ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Invio in corso…</>
            ) : (
              "Invia richiesta"
            )}
          </Button>
        </form>
      </div>
    </motion.div>
  );
}
