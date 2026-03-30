import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PageMeta } from "@/components/PageMeta";
import { Button } from "@/components/ui/button";
import { clearAccessToken, getMe, postResendVerification } from "@/lib/api";
import { Loader2, LogOut, Mail } from "lucide-react";

export default function DashboardAccountPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string | null>(null);
  const [verified, setVerified] = useState<boolean | null>(null);
  const [error, setError] = useState("");
  const [resending, setResending] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const me = await getMe();
        if (!cancelled) {
          setEmail(me.email);
          setVerified(me.email_verified);
        }
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Errore");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const logout = () => {
    clearAccessToken();
    navigate("/", { replace: true });
  };

  const resend = async () => {
    setResending(true);
    setError("");
    try {
      await postResendVerification();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invio non riuscito");
    } finally {
      setResending(false);
    }
  };

  return (
    <>
      <PageMeta title="Account — VeterinarioVicino.it" description="Impostazioni account e sicurezza." />
      <div className="max-w-xl">
        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">Account</h1>
        <p className="text-muted-foreground text-sm mb-8">
          Email di accesso, verifica e documenti legali. Per nome, telefono e animali usa{" "}
          <Link to="/dashboard/profilo" className="text-primary underline-offset-4 hover:underline">
            Profilo e animali
          </Link>
          .
        </p>

        {error && (
          <div className="p-4 rounded-xl border border-destructive/30 bg-destructive/10 text-destructive text-sm mb-4">
            {error}
          </div>
        )}

        {email === null && !error && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" /> Caricamento…
          </div>
        )}

        {email !== null && (
          <div className="space-y-8">
            <section className="rounded-xl border border-border bg-card p-6 space-y-4">
              <h2 className="font-semibold text-lg flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" /> Email
              </h2>
              <p className="text-sm text-foreground break-all">{email}</p>
              <p className="text-sm text-muted-foreground">
                Stato:{" "}
                {verified ? (
                  <span className="text-emerald-700 dark:text-emerald-400 font-medium">verificata</span>
                ) : (
                  <span className="text-amber-700 dark:text-amber-400 font-medium">in attesa di verifica</span>
                )}
              </p>
              {!verified && (
                <Button type="button" variant="secondary" size="sm" onClick={() => void resend()} disabled={resending}>
                  {resending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Reinvia email di verifica"}
                </Button>
              )}
            </section>

            <section className="rounded-xl border border-border bg-card p-6 space-y-3">
              <h2 className="font-semibold text-lg">Privacy e condizioni</h2>
              <ul className="text-sm space-y-2">
                <li>
                  <Link to="/privacy-policy/" className="text-primary hover:underline">
                    Privacy policy
                  </Link>
                </li>
                <li>
                  <Link to="/cookie-policy/" className="text-primary hover:underline">
                    Cookie policy
                  </Link>
                </li>
                <li>
                  <Link to="/termini-condizioni/" className="text-primary hover:underline">
                    Termini e condizioni
                  </Link>
                </li>
              </ul>
            </section>

            <Button type="button" variant="outline" onClick={logout} className="w-full sm:w-auto">
              <LogOut className="h-4 w-4 mr-2" /> Esci dall&apos;account
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
