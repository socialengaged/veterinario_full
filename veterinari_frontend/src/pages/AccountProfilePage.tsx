import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PageMeta } from "@/components/PageMeta";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  deleteUserAddress,
  deleteUserAnimal,
  getUserProfile,
  patchUserProfile,
  postUserAddress,
  postUserAnimal,
  type AddressRow,
  type AnimalRow,
  type UserProfile,
} from "@/lib/api";
import { Loader2, MessageCircle, User } from "lucide-react";

export default function AccountProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [profileNotes, setProfileNotes] = useState("");

  const [addrForm, setAddrForm] = useState({ city: "", province: "", cap: "", street: "", label: "" });
  const [animalForm, setAnimalForm] = useState({ species: "", name: "", notes: "" });

  const load = async () => {
    try {
      const p = await getUserProfile();
      setProfile(p);
      setFullName(p.full_name);
      setPhone(p.phone ?? "");
      setProfileNotes(p.profile_notes_for_vets ?? "");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Errore");
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const saveCore = async () => {
    setSaving(true);
    setError("");
    try {
      const p = await patchUserProfile({
        full_name: fullName,
        phone: phone || null,
        profile_notes_for_vets: profileNotes || null,
      });
      setProfile(p);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Errore salvataggio");
    } finally {
      setSaving(false);
    }
  };

  const addAddress = async () => {
    if (!addrForm.city.trim() || !addrForm.province.trim()) {
      setError("Città e provincia sono obbligatorie.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      await postUserAddress({
        city: addrForm.city.trim(),
        province: addrForm.province.trim(),
        cap: addrForm.cap || null,
        street: addrForm.street || null,
        label: addrForm.label || null,
      });
      setAddrForm({ city: "", province: "", cap: "", street: "", label: "" });
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Errore");
    } finally {
      setSaving(false);
    }
  };

  const addAnimal = async () => {
    if (!animalForm.species.trim()) {
      setError("Specie obbligatoria.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      await postUserAnimal({
        species: animalForm.species.trim(),
        name: animalForm.name || null,
        notes: animalForm.notes || null,
      });
      setAnimalForm({ species: "", name: "", notes: "" });
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Errore");
    } finally {
      setSaving(false);
    }
  };

  const removeAddress = async (a: AddressRow) => {
    if (!confirm("Eliminare questo indirizzo?")) return;
    try {
      await deleteUserAddress(a.id);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Errore");
    }
  };

  const removeAnimal = async (a: AnimalRow) => {
    if (!confirm("Eliminare questo animale?")) return;
    try {
      await deleteUserAnimal(a.id);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Errore");
    }
  };

  return (
    <>
      <PageMeta
        title="Il mio profilo — VeterinarioVicino.it"
        description="Dati account, indirizzi, animali e note per i professionisti."
      />
      <div className="max-w-2xl">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground flex items-center gap-2">
              <User className="h-7 w-7" /> Il mio profilo
            </h1>
            <Button variant="outline" size="sm" asChild>
              <Link to="/dashboard/chat">
                <MessageCircle className="h-4 w-4 mr-1" /> Chat
              </Link>
            </Button>
          </div>

          {error && (
            <div className="p-4 rounded-xl border border-destructive/30 bg-destructive/10 text-destructive text-sm mb-4">
              {error}
            </div>
          )}

          {profile === null && !error && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" /> Caricamento…
            </div>
          )}

          {profile && (
            <div className="space-y-10">
              <section className="rounded-xl border border-border bg-card p-6 space-y-4">
                <h2 className="font-semibold text-lg">Dati account</h2>
                <p className="text-sm text-muted-foreground">{profile.email}</p>
                <div className="grid gap-2">
                  <Label htmlFor="fn">Nome e cognome</Label>
                  <Input id="fn" value={fullName} onChange={e => setFullName(e.target.value)} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="ph">Telefono</Label>
                  <Input id="ph" value={phone} onChange={e => setPhone(e.target.value)} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="pn">Note sul profilo (visibili ai professionisti sulle nuove richieste)</Label>
                  <Textarea
                    id="pn"
                    rows={4}
                    value={profileNotes}
                    onChange={e => setProfileNotes(e.target.value)}
                    placeholder="Allergie, farmaci, preferenze di contatto, ecc."
                  />
                  <p className="text-xs text-muted-foreground">
                    Le note specifiche di una singola richiesta restano nel messaggio della chat / modulo richiesta.
                  </p>
                </div>
                <Button onClick={() => void saveCore()} disabled={saving}>
                  {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Salva dati"}
                </Button>
              </section>

              {profile.linked_specialist && (
                <section className="rounded-xl border border-primary/30 bg-primary/5 p-6 text-sm">
                  <p className="font-semibold">Profilo professionista collegato</p>
                  <p className="mt-1">
                    {profile.linked_specialist.full_name} — {profile.linked_specialist.city} (
                    {profile.linked_specialist.province}) — attivo:{" "}
                    {profile.linked_specialist.is_active ? "sì" : "in attesa di verifica"}
                  </p>
                </section>
              )}

              <section className="rounded-xl border border-border bg-card p-6 space-y-4">
                <h2 className="font-semibold text-lg">Indirizzi</h2>
                <ul className="space-y-2">
                  {profile.addresses.map(a => (
                    <li key={a.id} className="flex flex-wrap justify-between gap-2 text-sm border-b border-border pb-2">
                      <span>
                        {a.city} ({a.province}) {a.cap ? `— CAP ${a.cap}` : ""}
                        {a.street ? ` — ${a.street}` : ""}
                        {a.label ? ` [${a.label}]` : ""}
                      </span>
                      <Button type="button" variant="ghost" size="sm" onClick={() => void removeAddress(a)}>
                        Elimina
                      </Button>
                    </li>
                  ))}
                </ul>
                <div className="grid sm:grid-cols-2 gap-3">
                  <Input
                    placeholder="Città"
                    value={addrForm.city}
                    onChange={e => setAddrForm(f => ({ ...f, city: e.target.value }))}
                  />
                  <Input
                    placeholder="Provincia (es. LE)"
                    value={addrForm.province}
                    onChange={e => setAddrForm(f => ({ ...f, province: e.target.value }))}
                  />
                  <Input
                    placeholder="CAP"
                    value={addrForm.cap}
                    onChange={e => setAddrForm(f => ({ ...f, cap: e.target.value }))}
                  />
                  <Input
                    placeholder="Via / indirizzo"
                    value={addrForm.street}
                    onChange={e => setAddrForm(f => ({ ...f, street: e.target.value }))}
                  />
                  <Input
                    className="sm:col-span-2"
                    placeholder="Etichetta (opzionale)"
                    value={addrForm.label}
                    onChange={e => setAddrForm(f => ({ ...f, label: e.target.value }))}
                  />
                </div>
                <Button type="button" variant="secondary" onClick={() => void addAddress()} disabled={saving}>
                  Aggiungi indirizzo
                </Button>
              </section>

              <section className="rounded-xl border border-border bg-card p-6 space-y-4">
                <h2 className="font-semibold text-lg">Animali</h2>
                <ul className="space-y-3">
                  {profile.animals.map(an => (
                    <li key={an.id} className="border-b border-border pb-3 text-sm">
                      <div className="flex justify-between gap-2">
                        <span className="font-medium capitalize">
                          {an.species}
                          {an.name ? ` — ${an.name}` : ""}
                        </span>
                        <Button type="button" variant="ghost" size="sm" onClick={() => void removeAnimal(an)}>
                          Elimina
                        </Button>
                      </div>
                      {an.notes && <p className="text-muted-foreground mt-1">{an.notes}</p>}
                    </li>
                  ))}
                </ul>
                <div className="grid gap-3">
                  <Input
                    placeholder="Specie (es. cane)"
                    value={animalForm.species}
                    onChange={e => setAnimalForm(f => ({ ...f, species: e.target.value }))}
                  />
                  <Input
                    placeholder="Nome (opzionale)"
                    value={animalForm.name}
                    onChange={e => setAnimalForm(f => ({ ...f, name: e.target.value }))}
                  />
                  <Textarea
                    placeholder="Note sull'animale"
                    value={animalForm.notes}
                    onChange={e => setAnimalForm(f => ({ ...f, notes: e.target.value }))}
                    rows={2}
                  />
                </div>
                <Button type="button" variant="secondary" onClick={() => void addAnimal()} disabled={saving}>
                  Aggiungi animale
                </Button>
              </section>
            </div>
          )}
      </div>
    </>
  );
}
