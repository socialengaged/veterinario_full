import { Link } from "react-router-dom";
import { Sparkles, Video } from "lucide-react";

/**
 * Banner promozionale in cima a tutte le pagine.
 * `Header` usa sticky `top-[5.5rem] md:top-[7rem]` per restare sotto al banner (stessa altezza minima).
 */
export function PromoBanner() {
  return (
    <div
      className="sticky top-0 z-[100] flex min-h-[5.5rem] w-full items-center justify-center border-b border-primary/50 bg-gradient-to-r from-primary/55 via-emerald-500/48 to-teal-500/42 px-3 py-3.5 shadow-lg shadow-primary/25 ring-1 ring-inset ring-primary/40 backdrop-blur-xl sm:px-5 md:min-h-[7rem] md:py-4"
      role="region"
      aria-label="Promozione consulenza online"
    >
      <Link
        to="/consulenza-veterinaria-online/"
        className="group flex w-full max-w-5xl flex-row flex-wrap items-center justify-center gap-x-3 gap-y-3 sm:gap-x-5"
      >
        <span className="inline-flex shrink-0 items-center gap-2">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/35 text-primary shadow-inner ring-2 ring-primary/45 md:h-14 md:w-14">
            <Video className="h-5 w-5 md:h-6 md:w-6" aria-hidden />
          </span>
          <Sparkles className="h-5 w-5 shrink-0 text-amber-300 drop-shadow-md md:h-6 md:w-6" aria-hidden />
        </span>
        <span className="min-w-0 max-w-[min(100%,32rem)] flex-1 text-center text-base font-bold leading-snug tracking-tight text-foreground sm:text-left md:max-w-none md:text-lg lg:text-xl">
          <span className="text-primary drop-shadow-sm">Veterinario online</span>
          {" — "}
          <span className="font-semibold text-foreground/95">
            consulenza video da casa, senza file in sala d&apos;attesa
          </span>
        </span>
        <span className="inline-flex shrink-0 items-center rounded-full bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground shadow-xl shadow-primary/40 ring-2 ring-amber-400/55 transition hover:scale-[1.02] hover:bg-primary/95 hover:ring-amber-300/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:px-5 sm:text-base md:px-6 md:py-3 md:text-lg">
          Scopri come funziona
        </span>
      </Link>
    </div>
  );
}
