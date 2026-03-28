import { lazy, Suspense } from "react";
import { MapPin } from "lucide-react";
import type { MapMarker } from "./ClinicsMapInner";

const LazyClinicsMap = lazy(() => import("./ClinicsMapInner"));

interface Props {
  markers: MapMarker[];
  userLat?: number;
  userLng?: number;
  height?: string;
  title?: string;
}

export function ClinicsMap({ markers, userLat, userLng, height = "350px", title = "Mappa strutture" }: Props) {
  if (markers.length === 0) return null;

  return (
    <div className="rounded-xl border border-border overflow-hidden">
      <div className="flex items-center gap-2 px-5 py-3 bg-card border-b border-border">
        <MapPin className="h-4 w-4 text-primary" />
        <h3 className="font-display font-semibold text-foreground text-sm">{title}</h3>
        <span className="text-xs text-muted-foreground ml-auto">{markers.length} strutture</span>
      </div>
      <div style={{ height }} className="w-full">
        <Suspense fallback={
          <div className="h-full w-full bg-muted flex items-center justify-center">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        }>
          <LazyClinicsMap markers={markers} userLat={userLat} userLng={userLng} />
        </Suspense>
      </div>
    </div>
  );
}

export type { MapMarker };
