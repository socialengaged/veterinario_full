import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PageMeta } from "@/components/PageMeta";
import { Button } from "@/components/ui/button";
import { getChats, type ConversationListItem } from "@/lib/api";
import { Loader2, MessageCircle } from "lucide-react";

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString("it-IT", { dateStyle: "short", timeStyle: "short" });
  } catch {
    return iso;
  }
}

export default function ChatsListPage() {
  const [items, setItems] = useState<ConversationListItem[] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const list = await getChats();
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
      <PageMeta title="Le mie chat — VeterinarioVicino.it" description="Conversazioni sulle tue richieste di assistenza veterinaria." />
      <div className="max-w-2xl">
        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">Le mie chat</h1>
        <p className="text-muted-foreground text-sm mb-8">Le conversazioni legate alle tue richieste di contatto.</p>

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
          <p className="text-muted-foreground">Non hai ancora conversazioni. Invia una richiesta dalla home.</p>
        )}

        {items && items.length > 0 && (
          <ul className="space-y-3">
            {items.map((c) => (
              <li key={c.id}>
                <Link
                  to={`/dashboard/chat/${c.id}`}
                  className="block p-4 rounded-xl border border-border bg-card hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <MessageCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-foreground">
                        {c.specialty_name ? c.specialty_name : `Richiesta ${c.request_id.slice(0, 8)}…`}
                      </p>
                      <p className="text-xs text-muted-foreground">{formatDate(c.created_at)}</p>
                      {c.last_message_preview && (
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{c.last_message_preview}</p>
                      )}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-10 flex flex-wrap gap-3">
          <Button variant="outline" asChild>
            <Link to="/dashboard/profilo">Profilo e animali</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/richiedi-assistenza/">Nuova richiesta</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
