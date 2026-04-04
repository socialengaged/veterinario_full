import { Link } from "react-router-dom";
import { Sparkles, Video } from "lucide-react";

/**
 * Banner promozionale in cima a tutte le pagine.
 * `Header` usa sticky `top-[2.75rem] md:top-[3.5rem]` per restare sotto al banner (stessa altezza minima).
 */
export function PromoBanner() {
  return (
    <div
      className="sticky top-0 z-[100] flex min-h-[2.75rem] w-full items-center justify-center border-b border-primary/50 bg-gradient-to-r from-primary/55 via-emerald-500/48 to-teal-500/42 px-2 py-1.5 shadow-md shadow-primary/20 ring-1 ring-inset ring-primary/40 backdrop-blur-md sm:px-4 md:min-h-[3.5rem] md:py-2"
      role="region"
      aria-label="Promozione consulenza online"
    >
      <Link
        to="/consulenza-veterinaria-online/"
        className="group flex w-full max-w-5xl flex-row flex-wrap items-center justify-center gap-x-2 gap-y-1.5 sm:gap-x-4"
      >
        <span className="inline-flex shrink-0 items-center gap-1.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/35 text-primary shadow-inner ring-2 ring-primary/45 md:h-8 md:w-8">
            <Video className="h-3.5 w-3.5 md:h-4 md:w-4" aria-hidden />
          </span>
          <Sparkles className="h-4 w-4 shrink-0 text-amber-300 drop-shadow-md md:h-4 md:w-4" aria-hidden />
        </span>
        <span className="min-w-0 max-w-[min(100%,32rem)] flex-1 text-center text-xs font-bold leading-snug tracking-tight text-foreground sm:text-left md:max-w-none md:text-sm md:leading-tight">
          <span className="text-primary drop-shadow-sm">Veterinario online</span>
          {" — "}
          <span className="font-semibold text-foreground/95">
            consulenza video da casa, senza file in sala d&apos;attesa
          </span>
        </span>
        <span className="inline-flex shrink-0 items-center rounded-full bg-primary px-2.5 py-1 text-[11px] font-bold text-primary-foreground shadow-lg shadow-primary/35 ring-1 ring-amber-400/50 transition hover:scale-[1.02] hover:bg-primary/95 hover:ring-amber-300/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:px-3 sm:text-xs md:px-4 md:py-1.5 md:text-sm">
          Scopri come funziona
        </span>
      </Link>
    </div>
  );
}
