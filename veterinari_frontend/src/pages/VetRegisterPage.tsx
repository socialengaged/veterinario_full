import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageMeta } from "@/components/PageMeta";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  getSpecialtiesPublic,
  postSpecialistRegister,
  type SpecialistDuplicateDetail,
  type SpecialtyPublic,
} from "@/lib/api";
import { Loader2 } from "lucide-react";

const SPECIES_SUGGESTIONS = ["cane", "gatto", "coniglio", "uccello", "rettile", "altro"];

export default function VetRegisterPage() {
  const [specs, setSpecs] = useState<SpecialtyPublic[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [candidates, setCandidates] = useState<
    {
      id: string;
      full_name: string;
      email: string;
      city: string;
      province: string;
      cap: string | null;
      street_address: string | null;
    }[]
  >([]);
  const [mergeId, setMergeId] = useState<string | null>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [cap, setCap] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [selectedSlugs, setSelectedSlugs] = useState<Set<string>>(new Set());
  const [speciesTags, setSpeciesTags] = useState<Set<string>>(new Set());
  const [terms, setTerms] = useState(false);
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    let c = false;
    (async () => {
      try {
        const s = await getSpecialtiesPublic();
        if (!c) setSpecs(s);
      } catch {
        if (!c) setError("Impossibile caricare le specialità. Riprova.");
      } finally {
        if (!c) setLoading(false);
      }
    })();
    return () => {
      c = true;
    };
  }, []);

  const toggleSlug = (slug: string) => {
    setSelectedSlugs(prev => {
      const n = new Set(prev);
      if (n.has(slug)) n.delete(slug);
      else n.add(slug);
      return n;
    });
  };

  const toggleSpecies = (s: string) => {
    setSpeciesTags(prev => {
      const n = new Set(prev);
      if (n.has(s)) n.delete(s);
      else n.add(s);
      return n;
    });
  };

  const submit = async (forcedMergeId: string | null) => {
    setError("");
    if (!terms || !consent) {
      setError("Accetta termini e consensi per continuare.");
      return;
    }
    if (selectedSlugs.size === 0) {
      setError("Seleziona almeno una specialità.");
      return;
    }
    setSubmitting(true);
    try {
      await postSpecialistRegister({
        email: email.trim(),
        password,
        full_name: fullName.trim(),
        phone: phone.trim() || null,
        street_address: street.trim() || null,
        cap: cap.trim() || null,
        city: city.trim(),
        province: province.trim(),
        specialty_slugs: Array.from(selectedSlugs),
        species_tags: Array.from(speciesTags),
        terms_ack: terms,
        registration_consent: consent,
        merge_candidate_specialist_id: forcedMergeId || undefined,
      });
      setDone(true);
      setCandidates([]);
      setMergeId(null);
    } catch (e) {
      if (e instanceof Error && e.message === "DUPLICATE_CANDIDATES") {
        const d = (e as Error & { detail?: SpecialistDuplicateDetail }).detail;
        const list = d?.candidates ?? [];
        setCandidates(list);
        setError(
          "Rilevato un profilo professionista simile. Seleziona quello corretto e invia di nuovo per unire l'account dopo la verifica email.",
        );
      } else {
        setError(e instanceof Error ? e.message : "Errore invio");
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <>
        <PageMeta title="Iscrizione professionista — VeterinarioVicino.it" />
        <Header />
        <main className="container max-w-lg py-16">
          <h1 className="font-display text-2xl font-bold mb-4">Controlla la tua email</h1>
          <p className="text-muted-foreground mb-6">
            Ti abbiamo inviato un link per verificare l&apos;indirizzo email. Dopo la verifica il profilo professionista
            sarà attivato.
          </p>
          <Button asChild>
            <Link to="/accedi/">Vai al login</Link>
          </Button>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <PageMeta
        title="Iscrizione professionista — VeterinarioVicino.it"
        description="Registrazione veterinari e strutture su VeterinarioVicino.it"
      />
      <Header />
      <main className="bg-background min-h-[70vh]">
        <div className="container max-w-xl py-10 md:py-14">
          <h1 className="font-display text-2xl md:text-3xl font-bold mb-2">Iscrizione professionista</h1>
          <p className="text-muted-foreground text-sm mb-8">
            Compila i dati della struttura o studio. Dovrai verificare l&apos;email prima dell&apos;attivazione. Leggi i{" "}
            <Link to="/veterinari-termini/" className="text-primary underline">
              termini per i professionisti
            </Link>
            .
          </p>

          {error && (
            <div className="p-4 rounded-xl border border-destructive/30 bg-destructive/10 text-destructive text-sm mb-6">
              {error}
            </div>
          )}

          {candidates.length > 0 && (
            <div className="mb-6 rounded-xl border border-amber-500/40 bg-amber-500/10 p-4 text-sm">
              <p className="font-semibold mb-2">Profili esistenti compatibili</p>
              <ul className="space-y-2">
                {candidates.map(c => (
                  <li key={c.id}>
                    <label className="flex gap-2 items-start cursor-pointer">
                      <input
                        type="radio"
                        name="merge"
                        checked={mergeId === c.id}
                        onChange={() => setMergeId(c.id)}
                        className="mt-1"
                      />
                      <span>
                        <strong>{c.full_name}</strong> — {c.city} ({c.province}) — {c.email}
                        {c.cap ? ` — CAP ${c.cap}` : ""}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
              <Button
                className="mt-4"
                disabled={!mergeId || submitting}
                onClick={() => void submit(mergeId)}
              >
                {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Conferma unione e invia"}
              </Button>
            </div>
          )}

          {loading ? (
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          ) : (
            <form
              className="space-y-5"
              onSubmit={e => {
                e.preventDefault();
                void submit(null);
              }}
            >
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="pw">Password</Label>
                <Input id="pw" type="password" required minLength={8} value={password} onChange={e => setPassword(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="fn">Nome struttura / professionista</Label>
                <Input id="fn" required value={fullName} onChange={e => setFullName(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="ph">Telefono</Label>
                <Input id="ph" value={phone} onChange={e => setPhone(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="st">Indirizzo</Label>
                <Input id="st" value={street} onChange={e => setStreet(e.target.value)} />
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="grid gap-2">
                  <Label htmlFor="cap">CAP</Label>
                  <Input id="cap" value={cap} onChange={e => setCap(e.target.value)} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="pr">Provincia</Label>
                  <Input id="pr" required value={province} onChange={e => setProvince(e.target.value)} />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="ct">Città</Label>
                <Input id="ct" required value={city} onChange={e => setCity(e.target.value)} />
              </div>

              <div>
                <Label className="mb-2 block">Specialità (almeno una)</Label>
                <div className="max-h-48 overflow-y-auto border border-border rounded-md p-3 space-y-2 text-sm">
                  {specs.map(s => (
                    <label key={s.slug} className="flex items-center gap-2 cursor-pointer">
                      <Checkbox
                        checked={selectedSlugs.has(s.slug)}
                        onCheckedChange={() => toggleSlug(s.slug)}
                      />
                      <span>{s.name}</span>
                      <span className="text-muted-foreground text-xs">({s.category})</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <Label className="mb-2 block">Specie seguite (opzionale)</Label>
                <div className="flex flex-wrap gap-2">
                  {SPECIES_SUGGESTIONS.map(s => (
                    <Button
                      key={s}
                      type="button"
                      variant={speciesTags.has(s) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleSpecies(s)}
                    >
                      {s}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Checkbox id="terms" checked={terms} onCheckedChange={v => setTerms(Boolean(v))} />
                <Label htmlFor="terms" className="text-sm font-normal leading-snug">
                  Dichiaro di aver letto e accettato i{" "}
                  <Link to="/veterinari-termini/" className="underline">
                    termini per i professionisti
                  </Link>
                  .
                </Label>
              </div>
              <div className="flex items-start gap-2">
                <Checkbox id="gdpr" checked={consent} onCheckedChange={v => setConsent(Boolean(v))} />
                <Label htmlFor="gdpr" className="text-sm font-normal leading-snug">
                  Consenso al trattamento dei dati per la gestione dell&apos;iscrizione.
                </Label>
              </div>

              <Button type="submit" disabled={submitting || candidates.length > 0}>
                {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Registrati"}
              </Button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
