import { lazy, Suspense } from "react";
import { MapPin } from "lucide-react";

const LazyClinicMap = lazy(() => import("./ClinicMapInner"));

interface ClinicMapProps {
  lat: number;
  lng: number;
  name: string;
  address?: string;
}

export function ClinicMap(props: ClinicMapProps) {
  return (
    <section className="rounded-xl border border-border overflow-hidden">
      <div className="flex items-center gap-2 px-5 py-3 bg-card border-b border-border">
        <MapPin className="h-4 w-4 text-primary" />
        <h2 className="font-display font-semibold text-foreground text-sm">Posizione sulla mappa</h2>
      </div>
      <div className="h-[300px] md:h-[400px] w-full">
        <Suspense fallback={
          <div className="h-full w-full bg-muted flex items-center justify-center">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        }>
          <LazyClinicMap {...props} />
        </Suspense>
      </div>
    </section>
  );
}
