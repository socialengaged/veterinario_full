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

export default function DashboardRequestsPage() {
  const [items, setItems] = useState<UserRequestSummary[] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const list = await getUserRequests();
        if (!cancelled) setItems(list);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Errore caricamento");
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
          Ogni richiesta ha una chat dedicata per messaggi con il team dopo l&apos;inoltro.
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
          <ul className="space-y-3">
            {items.map((r) => (
              <li
                key={r.id}
                className="rounded-xl border border-border bg-card p-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between"
              >
                <div className="min-w-0">
                  <p className="font-medium text-foreground">{r.specialty_name || r.specialty_slug || "Richiesta"}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(r.created_at)}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    <span className="font-medium text-foreground">{statusLabel(r.status)}</span>
                    {r.urgency && r.urgency !== "normale" ? ` · Urgenza: ${r.urgency}` : ""}
                  </p>
                  {r.description_preview && (
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{r.description_preview}</p>
                  )}
                </div>
                <div className="shrink-0 flex flex-wrap gap-2">
                  {r.conversation_id && (
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/dashboard/chat/${r.conversation_id}`}>
                        <MessageCircle className="h-4 w-4 mr-1" /> Chat
                      </Link>
                    </Button>
                  )}
                </div>
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
