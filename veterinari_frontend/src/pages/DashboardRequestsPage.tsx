import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PageMeta } from "@/components/PageMeta";
import { Button } from "@/components/ui/button";
import { getUserRequests, type UserRequestSummary } from "@/lib/api";
import { Loader2, MessageCircle } from "lucide-react";

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString("it-IT", { dateStyle: "short", timeStyle: "short" });
  } catch {
    return iso;
  }
}

function statusLabel(s: string) {
  const m: Record<string, string> = {
    open: "In lavorazione",
    pending_verification: "In attesa verifica email",
    closed: "Chiusa",
    cancelled: "Annullata",
  };
  return m[s] || s;
}

function contactMethodLabel(raw: string | null | undefined) {
  if (!raw) return "—";
  const s = raw.toLowerCase();
  if (s === "email") return "Email";
  if (s === "telefono" || s === "phone") return "Telefono";
  if (s.startsWith("email+")) {
    if (s.includes("sms")) return "Email e SMS";
    if (s.includes("whatsapp")) return "Email e WhatsApp";
  }
  return raw;
}

export default function DashboardRequestsPage() {
  const [items, setItems] = useState<UserRequestSummary[] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const list = await getUserRequests();
        if (!cancelled) {
          setItems(list);
          setError("");
        }
      } catch (e) {
        if (!cancelled) {
          setItems(null);
          setError(e instanceof Error ? e.message : "Errore caricamento");
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <PageMeta title="Le mie richieste — VeterinarioVicino.it" description="Storico delle richieste di assistenza veterinaria." />
      <div className="max-w-3xl">
        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">Le mie richieste</h1>
        <p className="text-muted-foreground text-sm mb-8">
          Qui trovi tutti i dati che hai inviato con ogni richiesta. Ogni richiesta ha una chat dedicata con il team dopo
          l&apos;inoltro.
        </p>

        {error && (
          <div className="p-4 rounded-xl border border-destructive/30 bg-destructive/10 text-destructive text-sm mb-4">
            {error}
          </div>
        )}

        {items === null && !error && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" /> Caricamento…
          </div>
        )}

        {items && items.length === 0 && (
          <p className="text-muted-foreground mb-6">Non hai ancora inviato richieste.</p>
        )}

        {items && items.length > 0 && (
          <ul className="space-y-4">
            {items.map((r) => (
              <li key={r.id} className="rounded-xl border border-border bg-card p-5 space-y-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="font-display font-semibold text-lg text-foreground">
                      {r.specialty_name || r.specialty_slug || "Richiesta"}
                    </p>
                    <p className="text-xs text-muted-foreground">{formatDate(r.created_at)}</p>
                  </div>
                  {r.conversation_id && (
                    <Button variant="outline" size="sm" asChild className="shrink-0 w-fit">
                      <Link to={`/dashboard/chat/${r.conversation_id}`}>
                        <MessageCircle className="h-4 w-4 mr-1" /> Apri chat
                      </Link>
                    </Button>
                  )}
                </div>

                <dl className="grid gap-2 text-sm sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <dt className="text-xs font-medium uppercase text-muted-foreground">Stato richiesta</dt>
                    <dd className="text-foreground">{statusLabel(r.status)}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium uppercase text-muted-foreground">Urgenza</dt>
                    <dd className="text-foreground capitalize">{r.urgency || "—"}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium uppercase text-muted-foreground">Preferenza contatto</dt>
                    <dd className="text-foreground">{contactMethodLabel(r.contact_method)}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium uppercase text-muted-foreground">Animale</dt>
                    <dd className="text-foreground capitalize">
                      {r.animal_species || "—"}
                      {r.animal_name ? ` (${r.animal_name})` : ""}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium uppercase text-muted-foreground">Zona</dt>
                    <dd className="text-foreground">
                      {[r.city, r.province].filter(Boolean).join(" — ") || "—"}
                      {r.cap ? ` — CAP ${r.cap}` : ""}
                    </dd>
                  </div>
                  {r.sub_service && (
                    <div className="sm:col-span-2">
                      <dt className="text-xs font-medium uppercase text-muted-foreground">Dettaglio servizio</dt>
                      <dd className="text-foreground">{r.sub_service}</dd>
                    </div>
                  )}
                  {(r.description || r.description_preview) && (
                    <div className="sm:col-span-2 rounded-lg bg-muted/50 p-3 border border-border/60">
                      <dt className="text-xs font-medium uppercase text-muted-foreground mb-1">Testo della richiesta</dt>
                      <dd className="text-foreground whitespace-pre-wrap">{r.description ?? r.description_preview}</dd>
                    </div>
                  )}
                </dl>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-10">
          <Button variant="cta" asChild>
            <Link to="/richiedi-assistenza/">Nuova richiesta</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
