import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { getMe, postResendVerification } from "@/lib/api";
import { AlertCircle, Loader2 } from "lucide-react";

export function EmailVerificationBanner() {
  const [show, setShow] = useState<boolean | null>(null);
  const [resending, setResending] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const me = await getMe();
        if (!cancelled) setShow(!me.email_verified);
      } catch {
        if (!cancelled) setShow(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const onResend = async () => {
    setNotice("");
    setResending(true);
    try {
      await postResendVerification();
      setNotice("Ti abbiamo inviato un nuovo link. Controlla anche la cartella spam.");
    } catch (e) {
      setNotice(e instanceof Error ? e.message : "Invio non riuscito");
    } finally {
      setResending(false);
    }
  };

  if (show !== true) return null;

  return (
    <div className="border-b border-amber-500/40 bg-amber-500/10 text-foreground">
      <div className="container max-w-2xl py-3 px-4 flex flex-col sm:flex-row sm:items-center gap-3 text-sm">
        <div className="flex gap-2 min-w-0">
          <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="min-w-0">
            <p className="font-medium">Conferma la tua email</p>
            <p className="text-muted-foreground text-xs mt-0.5">
              Finché non confermi, la richiesta non viene inoltrata ai veterinari della zona. Controlla la posta (anche spam) e clicca sul link.
            </p>
            {notice && <p className="text-xs mt-2 text-foreground">{notice}</p>}
          </div>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="shrink-0 self-start sm:self-center"
          disabled={resending}
          onClick={onResend}
        >
          {resending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Reinvia link"}
        </Button>
      </div>
    </div>
  );
}
