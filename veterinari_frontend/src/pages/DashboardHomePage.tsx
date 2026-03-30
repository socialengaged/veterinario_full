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

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [me, reqs, chats] = await Promise.all([getMe(), getUserRequests(), getChats()]);
        if (!cancelled) {
          setName(me.full_name);
          setVerified(me.email_verified);
          setNRequests(reqs.length);
          setNChats(chats.length);
        }
      } catch (e) {
        if (!cancelled) setErr(e instanceof Error ? e.message : "Errore");
      }
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
              {nRequests === null ? "—" : nRequests}
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <p className="text-xs font-medium uppercase text-muted-foreground">Conversazioni</p>
            <p className="mt-2 font-display text-3xl font-bold text-foreground">
              {nChats === null ? "—" : nChats}
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

        {nRequests === null && !err && (
          <div className="flex items-center gap-2 text-muted-foreground mt-8">
            <Loader2 className="h-5 w-5 animate-spin" /> Caricamento…
          </div>
        )}
      </div>
    </>
  );
}
