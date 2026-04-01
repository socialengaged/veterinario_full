import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

type StickyMobileCTAProps = {
  /** Override CTA fuori home (default: richiesta contatto locale) */
  ctaTo?: string;
  ctaLabel?: string;
};

export function StickyMobileCTA(props: StickyMobileCTAProps = {}) {
  const { ctaTo, ctaLabel } = props;
  const location = useLocation();
  const isHome = location.pathname === "/";

  const handleClick = () => {
    if (isHome) {
      document.getElementById("smart-finder")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const fallbackTo = ctaTo ?? "/richiedi-assistenza/";
  const fallbackLabel = ctaLabel ?? "Invia richiesta di contatto";

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-3 bg-card/95 backdrop-blur-sm border-t border-border md:hidden">
      {isHome ? (
        <Button variant="cta" size="lg" className="w-full" onClick={handleClick}>
          Cerca un veterinario
        </Button>
      ) : (
        <Button variant="cta" size="lg" className="w-full" asChild>
          <Link to={fallbackTo}>{fallbackLabel}</Link>
        </Button>
      )}
    </div>
  );
}
