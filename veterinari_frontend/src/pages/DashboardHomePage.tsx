import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PageMeta } from "@/components/PageMeta";
import { Button } from "@/components/ui/button";
import { getChats, getMe, getUserRequests } from "@/lib/api";
import { Loader2, MessageCircle, ClipboardList, ArrowRight } from "lucide-react";

export default function DashboardHomePage() {
  const [name, setName] = useState<string | null>(null);
  const [verified, setVerified] = useState<boolean | null>(null);
  const [nRequests, setNRequests] = useState<number | null>(null);
  const [nChats, setNChats] = useState<number | null>(null);
  const [err, setErr] = useState("");
  const [partialWarn, setPartialWarn] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setErr("");
      setPartialWarn("");
      setLoading(true);
      const [meRes, reqsRes, chatsRes] = await Promise.allSettled([getMe(), getUserRequests(), getChats()]);
      if (cancelled) return;

      if (meRes.status === "fulfilled") {
        setName(meRes.value.full_name);
        setVerified(meRes.value.email_verified);
      } else {
        setErr(meRes.reason instanceof Error ? meRes.reason.message : "Impossibile caricare il profilo");
      }

      if (reqsRes.status === "fulfilled") {
        setNRequests(reqsRes.value.length);
      } else {
        setNRequests(null);
        const msg = reqsRes.reason instanceof Error ? reqsRes.reason.message : "errore sconosciuto";
        setPartialWarn((w) => (w ? `${w} Elenco richieste: ${msg}.` : `Elenco richieste: ${msg}.`));
      }

      if (chatsRes.status === "fulfilled") {
        setNChats(chatsRes.value.length);
      } else {
        setNChats(null);
        const msg = chatsRes.reason instanceof Error ? chatsRes.reason.message : "errore sconosciuto";
        setPartialWarn((w) => (w ? `${w} Chat: ${msg}.` : `Chat: ${msg}.`));
      }

      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <PageMeta title="Area riservata — VeterinarioVicino.it" description="La tua area personale su VeterinarioVicino." />
      <div className="max-w-2xl">
        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
          Ciao{name ? `, ${name.split(/\s+/)[0]}` : ""}
        </h1>
        <p className="text-muted-foreground text-sm mb-8">
          Gestisci richieste, chat con il team e i dati utili per essere ricontattato dai professionisti.
        </p>

        {err && (
          <div className="p-4 rounded-xl border border-destructive/30 bg-destructive/10 text-destructive text-sm mb-6">
            {err}
          </div>
        )}

        {partialWarn && !err && (
          <div className="p-4 rounded-xl border border-amber-500/40 bg-amber-500/10 text-foreground text-sm mb-6">
            <strong>Attenzione:</strong> {partialWarn}
          </div>
        )}

        {verified === false && (
          <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-foreground mb-8">
            <strong>Email non ancora verificata.</strong> Controlla la posta (anche spam) e usa il link di conferma per
            inoltrare le richieste ai veterinari.
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2 mb-10">
          <div className="rounded-xl border border-border bg-card p-5">
            <p className="text-xs font-medium uppercase text-muted-foreground">Richieste inviate</p>
            <p className="mt-2 font-display text-3xl font-bold text-foreground">
              {loading ? "—" : nRequests ?? "—"}
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <p className="text-xs font-medium uppercase text-muted-foreground">Conversazioni</p>
            <p className="mt-2 font-display text-3xl font-bold text-foreground">
              {loading ? "—" : nChats ?? "—"}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="cta" asChild>
            <Link to="/richiedi-assistenza/">
              Nuova richiesta <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/dashboard/richieste">
              <ClipboardList className="h-4 w-4 mr-1" /> Le mie richieste
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/dashboard/chat">
              <MessageCircle className="h-4 w-4 mr-1" /> Chat
            </Link>
          </Button>
        </div>

        {loading && (
          <div className="flex items-center gap-2 text-muted-foreground mt-8">
            <Loader2 className="h-5 w-5 animate-spin" /> Caricamento…
          </div>
        )}
      </div>
    </>
  );
}
