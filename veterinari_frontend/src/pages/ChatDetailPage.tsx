import { useEffect, useState, useRef, FormEvent } from "react";
import { Link, useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageMeta } from "@/components/PageMeta";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { getChat, postChatMessage, type ConversationDetail, type MessageOut } from "@/lib/api";
import { Loader2, ArrowLeft } from "lucide-react";
import { EmailVerificationBanner } from "@/components/EmailVerificationBanner";

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
    load();
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

  return (
    <>
      <PageMeta title="Chat — VeterinarioVicino.it" description="Messaggi sulla tua richiesta." />
      <Header />
      <EmailVerificationBanner />
      <main className="bg-background min-h-[70vh] flex flex-col">
        <div className="container max-w-2xl py-6 flex-1 flex flex-col">
          <div className="mb-4">
            <Button variant="ghost" size="sm" asChild className="mb-2 -ml-2">
              <Link to="/dashboard/chats">
                <ArrowLeft className="h-4 w-4 mr-1" /> Tutte le chat
              </Link>
            </Button>
            <h1 className="font-display text-xl font-bold text-foreground">Conversazione</h1>
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
      </main>
      <Footer />
    </>
  );
}
