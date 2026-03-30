import { useEffect, useState, useRef, FormEvent } from "react";
import { Link, useParams } from "react-router-dom";
import { PageMeta } from "@/components/PageMeta";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { getChat, postChatMessage, type ConversationDetail, type MessageOut } from "@/lib/api";
import { Loader2, ArrowLeft } from "lucide-react";

function formatTime(iso: string) {
  try {
    return new Date(iso).toLocaleString("it-IT", { dateStyle: "short", timeStyle: "short" });
  } catch {
    return iso;
  }
}

function roleLabel(role: string) {
  if (role === "user") return "Tu";
  if (role === "system") return "Sistema";
  return "Specialista";
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

export default function ChatDetailPage() {
  const { conversationId } = useParams<{ conversationId: string }>();
  const [detail, setDetail] = useState<ConversationDetail | null>(null);
  const [error, setError] = useState("");
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const load = async () => {
    if (!conversationId) return;
    try {
      const d = await getChat(conversationId);
      setDetail(d);
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Errore");
    }
  };

  useEffect(() => {
    void load();
  }, [conversationId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [detail?.messages.length]);

  const onSend = async (e: FormEvent) => {
    e.preventDefault();
    if (!conversationId || !body.trim() || sending) return;
    setSending(true);
    try {
      const msg: MessageOut = await postChatMessage(conversationId, body.trim());
      setBody("");
      setDetail(prev =>
        prev
          ? { ...prev, messages: [...prev.messages, msg] }
          : prev
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invio fallito");
    } finally {
      setSending(false);
    }
  };

  if (!conversationId) {
    return null;
  }

  const ctx = detail?.request_context;
  const pageTitle = ctx?.specialty_name ? `Chat — ${ctx.specialty_name}` : "Chat — VeterinarioVicino.it";

  return (
    <>
      <PageMeta title={pageTitle} description="Messaggi sulla tua richiesta." />
      <div className="max-w-2xl flex flex-col flex-1">
        <div className="mb-4">
          <Button variant="ghost" size="sm" asChild className="mb-2 -ml-2">
            <Link to="/dashboard/chat">
              <ArrowLeft className="h-4 w-4 mr-1" /> Tutte le chat
            </Link>
          </Button>
          <h1 className="font-display text-xl font-bold text-foreground">
            {ctx?.specialty_name ?? "Conversazione"}
          </h1>
        </div>

        {error && !detail && (
          <div className="p-4 rounded-xl border border-destructive/30 bg-destructive/10 text-destructive text-sm">
            {error}
          </div>
        )}

        {!detail && !error && (
          <div className="flex items-center gap-2 text-muted-foreground py-12">
            <Loader2 className="h-5 w-5 animate-spin" /> Caricamento messaggi…
          </div>
        )}

        {detail && ctx && (
          <section className="rounded-xl border border-border bg-card p-4 mb-4 text-sm space-y-2">
            <h2 className="font-semibold text-foreground">La tua richiesta</h2>
            <dl className="grid gap-1 text-muted-foreground">
              <div>
                <dt className="inline font-medium text-foreground">Stato: </dt>
                <dd className="inline">{statusLabel(ctx.status)}</dd>
              </div>
              <div>
                <dt className="inline font-medium text-foreground">Animale: </dt>
                <dd className="inline capitalize">
                  {ctx.animal_species}
                  {ctx.animal_name ? ` (${ctx.animal_name})` : ""}
                </dd>
              </div>
              <div>
                <dt className="inline font-medium text-foreground">Zona: </dt>
                <dd className="inline">
                  {ctx.city} ({ctx.province})
                  {ctx.cap ? ` — CAP ${ctx.cap}` : ""}
                </dd>
              </div>
              <div>
                <dt className="inline font-medium text-foreground">Urgenza: </dt>
                <dd className="inline">{ctx.urgency}</dd>
              </div>
              {ctx.sub_service && (
                <div>
                  <dt className="inline font-medium text-foreground">Dettaglio: </dt>
                  <dd className="inline">{ctx.sub_service}</dd>
                </div>
              )}
              {ctx.description && (
                <div className="pt-2 border-t border-border mt-2">
                  <dt className="font-medium text-foreground block mb-1">Testo della richiesta</dt>
                  <dd className="text-foreground whitespace-pre-wrap">{ctx.description}</dd>
                </div>
              )}
            </dl>
          </section>
        )}

        {detail && (
          <>
            <div className="flex-1 space-y-3 mb-4 max-h-[min(60vh,520px)] overflow-y-auto rounded-xl border border-border bg-card p-4">
              {detail.messages.map(m => (
                <div
                  key={m.id}
                  className={
                    m.sender_role === "user"
                      ? "ml-8 rounded-lg bg-primary/10 p-3 text-sm"
                      : "mr-8 rounded-lg bg-muted/80 p-3 text-sm"
                  }
                >
                  <p className="text-xs font-semibold text-muted-foreground mb-1">
                    {roleLabel(m.sender_role)} · {formatTime(m.created_at)}
                  </p>
                  <p className="text-foreground whitespace-pre-wrap">{m.body}</p>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {error && <p className="text-destructive text-sm mb-2">{error}</p>}

            <form onSubmit={onSend} className="space-y-2">
              <Textarea
                value={body}
                onChange={e => setBody(e.target.value)}
                placeholder="Scrivi un messaggio…"
                rows={3}
                className="resize-none"
              />
              <Button type="submit" variant="cta" disabled={sending || !body.trim()}>
                {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Invia"}
              </Button>
            </form>
          </>
        )}
      </div>
    </>
  );
}
