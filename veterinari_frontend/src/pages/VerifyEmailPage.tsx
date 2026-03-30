import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageMeta } from "@/components/PageMeta";
import { Button } from "@/components/ui/button";
import { postVerifyEmail } from "@/lib/api";
import { CheckCircle, Loader2, XCircle } from "lucide-react";

export default function VerifyEmailPage() {
  const [params] = useSearchParams();
  const token = params.get("token") || "";
  const [status, setStatus] = useState<"loading" | "ok" | "err">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("err");
      setMessage("Link non valido o incompleto.");
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        await postVerifyEmail(token);
        if (!cancelled) {
          setStatus("ok");
          setMessage("Email verificata. La tua richiesta può essere inoltrata ai veterinari della zona.");
        }
      } catch (e) {
        if (!cancelled) {
          setStatus("err");
          setMessage(e instanceof Error ? e.message : "Verifica non riuscita");
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [token]);

  return (
    <>
      <PageMeta title="Verifica email — VeterinarioVicino.it" description="Conferma il tuo indirizzo email." />
      <Header />
      <main className="bg-background min-h-[60vh] flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full text-center space-y-4">
          {status === "loading" && (
            <>
              <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
              <p className="text-muted-foreground">Verifica in corso…</p>
            </>
          )}
          {status === "ok" && (
            <>
              <CheckCircle className="h-14 w-14 text-success mx-auto" />
              <h1 className="font-display text-xl font-bold text-foreground">Perfetto!</h1>
              <p className="text-muted-foreground text-sm">{message}</p>
              <Button variant="cta" asChild className="mt-4">
                <Link to="/dashboard">Vai all&apos;area riservata</Link>
              </Button>
            </>
          )}
          {status === "err" && (
            <>
              <XCircle className="h-14 w-14 text-destructive mx-auto" />
              <h1 className="font-display text-xl font-bold text-foreground">Errore</h1>
              <p className="text-muted-foreground text-sm">{message}</p>
              <Button variant="outline" asChild className="mt-4">
                <Link to="/accedi/">Accedi</Link>
              </Button>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
