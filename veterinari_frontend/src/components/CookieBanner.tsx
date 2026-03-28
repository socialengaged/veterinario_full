import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

type CookieConsent = "accepted" | "rejected" | "custom" | null;

interface ConsentLog {
  timestamp: string;
  choice: string;
  policyVersion: string;
  analytics: boolean;
  marketing: boolean;
}

const POLICY_VERSION = "1.0";

function getConsent(): CookieConsent {
  return localStorage.getItem("cookie_consent") as CookieConsent;
}

function setConsent(value: "accepted" | "rejected" | "custom", analyticsOn: boolean, marketingOn: boolean) {
  localStorage.setItem("cookie_consent", value);

  // Log consent for compliance
  const log: ConsentLog = {
    timestamp: new Date().toISOString(),
    choice: value,
    policyVersion: POLICY_VERSION,
    analytics: analyticsOn,
    marketing: marketingOn,
  };
  localStorage.setItem("cookie_consent_log", JSON.stringify(log));

  // Dispatch event so analytics can react
  window.dispatchEvent(new CustomEvent("cookie_consent_change", { detail: value }));
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(true);

  useEffect(() => {
    const consent = getConsent();
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!visible) return null;

  const handleAccept = () => {
    setConsent("accepted", true, true);
    setVisible(false);
  };

  const handleReject = () => {
    setConsent("rejected", false, false);
    setVisible(false);
  };

  const handleSavePrefs = () => {
    if (analytics && marketing) {
      setConsent("accepted", true, true);
    } else if (!analytics && !marketing) {
      setConsent("rejected", false, false);
    } else {
      localStorage.setItem("cookie_analytics", analytics ? "1" : "0");
      localStorage.setItem("cookie_marketing", marketing ? "1" : "0");
      setConsent("custom", analytics, marketing);
    }
    setVisible(false);
  };

  return (
    <div className="fixed bottom-0 inset-x-0 z-[100] p-4 md:p-6">
      <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-card shadow-2xl p-5 md:p-6">
        {!showPrefs ? (
          <>
            <p className="text-sm text-foreground leading-relaxed mb-4">
              Utilizziamo cookie per migliorare la tua esperienza.
              Puoi accettare tutti i cookie o gestire le preferenze.{" "}
              <Link to="/cookie-policy/" className="text-primary hover:underline font-medium">
                Cookie Policy
              </Link>
            </p>
            <div className="flex flex-wrap gap-2">
              <Button onClick={handleAccept} size="sm" variant="cta">
                Accetta tutto
              </Button>
              <Button onClick={handleReject} size="sm" variant="outline">
                Rifiuta tutto
              </Button>
              <Button onClick={() => setShowPrefs(true)} size="sm" variant="ghost">
                Personalizza
              </Button>
            </div>
          </>
        ) : (
          <>
            <h3 className="font-display font-semibold text-foreground mb-3">Gestisci preferenze cookie</h3>
            <div className="space-y-3 mb-4">
              <label className="flex items-center justify-between">
                <span className="text-sm text-foreground">Cookie tecnici (necessari)</span>
                <input type="checkbox" checked disabled className="h-4 w-4 accent-primary" />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm text-foreground">Cookie analytics (Google Analytics)</span>
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                  className="h-4 w-4 accent-primary"
                />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm text-foreground">Cookie marketing (Google Ads)</span>
                <input
                  type="checkbox"
                  checked={marketing}
                  onChange={(e) => setMarketing(e.target.checked)}
                  className="h-4 w-4 accent-primary"
                />
              </label>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSavePrefs} size="sm" variant="cta">
                Salva preferenze
              </Button>
              <Button onClick={() => setShowPrefs(false)} size="sm" variant="ghost">
                Indietro
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/** Check if analytics cookies are allowed */
export function isAnalyticsAllowed(): boolean {
  const consent = getConsent();
  if (consent === "accepted") return true;
  if (consent === "rejected") return false;
  if (consent === "custom") return localStorage.getItem("cookie_analytics") === "1";
  return false;
}

/** Check if marketing cookies are allowed */
export function isMarketingAllowed(): boolean {
  const consent = getConsent();
  if (consent === "accepted") return true;
  if (consent === "rejected") return false;
  if (consent === "custom") return localStorage.getItem("cookie_marketing") === "1";
  return false;
}
