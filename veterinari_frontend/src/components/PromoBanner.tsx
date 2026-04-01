import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

/** Banner promozionale in cima a tutte le pagine (sotto al browser chrome). */
export function PromoBanner() {
  return (
    <div
      className="sticky top-0 z-[100] w-full border-b border-primary/20 bg-gradient-to-r from-primary/15 via-primary/10 to-emerald-500/10 px-3 py-2 text-center text-sm shadow-sm"
      role="region"
      aria-label="Promozione consulenza online"
    >
      <Link
        to="/consulenza-veterinaria-online/"
        className="inline-flex flex-wrap items-center justify-center gap-1.5 font-medium text-foreground hover:text-primary transition-colors"
      >
        <Sparkles className="h-4 w-4 shrink-0 text-primary" aria-hidden />
        <span>Prova il nuovo servizio di veterinario online</span>
        <span className="text-primary underline underline-offset-2">Scopri di più</span>
      </Link>
    </div>
  );
}
