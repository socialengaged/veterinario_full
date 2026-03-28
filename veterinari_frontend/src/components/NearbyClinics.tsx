import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ClinicCard } from "@/components/ClinicCard";
import { ClinicsMap } from "@/components/ClinicsMapWrapper";
import { useGeoContext } from "@/contexts/GeolocationContext";
import { haversineKm } from "@/hooks/useGeolocation";
import { getAllClinics } from "@/data";
import type { Clinic } from "@/data/types";
import type { MapMarker } from "@/components/ClinicsMapWrapper";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5 },
};

interface ClinicWithDistance extends Clinic {
  distanceKm: number;
}

const RADIUS_OPTIONS = [10, 25, 50, 100];

export function NearbyClinics() {
  const { position, loading, error, requestPermission, denied } = useGeoContext();
  const [maxRadius, setMaxRadius] = useState(50);

  const nearby = useMemo<ClinicWithDistance[]>(() => {
    if (!position) return [];
    const all = getAllClinics();
    const withDist: ClinicWithDistance[] = [];
    for (const c of all) {
      if (c.lat && c.lng) {
        const d = haversineKm(position.lat, position.lng, c.lat, c.lng);
        if (d <= maxRadius) {
          withDist.push({ ...c, distanceKm: d });
        }
      }
    }
    withDist.sort((a, b) => a.distanceKm - b.distanceKm);
    return withDist.slice(0, 12);
  }, [position, maxRadius]);

  const mapMarkers = useMemo<MapMarker[]>(() => {
    return nearby
      .filter(c => c.lat && c.lng)
      .map(c => ({
        lat: c.lat!,
        lng: c.lng!,
        name: c.name,
        detail: `${c.distanceKm.toFixed(1)} km${c.address ? ` — ${c.address}` : ""}`,
        href: c.type === "veterinario" ? `/veterinario/${c.slug}/` : `/struttura/${c.slug}/`,
      }));
  }, [nearby]);

  // Not yet asked — show CTA
  if (!position && !loading && !error) {
    return (
      <section className="py-12 md:py-16 bg-surface border-b border-border">
        <div className="container max-w-3xl text-center">
          <motion.div {...fadeUp}>
            <div className="p-8 rounded-2xl border-2 border-primary/20 bg-primary/5">
              <Navigation className="h-10 w-10 text-primary mx-auto mb-4" />
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
                Trova i veterinari vicino a te
              </h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Attiva la geolocalizzazione per scoprire le strutture veterinarie più vicine alla tua posizione.
              </p>
              <Button variant="cta" size="lg" onClick={requestPermission}>
                <MapPin className="mr-2 h-5 w-5" /> Usa la mia posizione
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  if (loading) {
    return (
      <section className="py-12 bg-surface border-b border-border">
        <div className="container text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-3" />
          <p className="text-muted-foreground text-sm">Ricerca strutture vicine in corso…</p>
        </div>
      </section>
    );
  }

  if (denied || error) return null;

  if (position && nearby.length === 0) {
    return (
      <section className="py-12 bg-surface border-b border-border">
        <div className="container max-w-2xl text-center">
          <MapPin className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
          <h2 className="font-display text-xl font-bold text-foreground mb-2">Nessuna struttura nelle vicinanze</h2>
          <p className="text-muted-foreground text-sm">
            Non abbiamo trovato strutture veterinarie entro {maxRadius} km dalla tua posizione. Prova ad aumentare il raggio.
            Prova a cercare per regione o provincia.
          </p>
        </div>
      </section>
    );
  }

  const displayCards = nearby.slice(0, 6);

  return (
    <section className="py-12 md:py-16 bg-surface border-b border-border">
      <div className="container">
        <motion.div {...fadeUp} className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            <MapPin className="h-4 w-4" />
            Strutture vicino a te
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
            Veterinari vicini alla tua posizione
          </h2>
          <p className="text-muted-foreground text-sm mb-4">
            Abbiamo trovato {nearby.length} strutture entro {maxRadius} km da te.
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {RADIUS_OPTIONS.map(r => (
              <button
                key={r}
                onClick={() => setMaxRadius(r)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  maxRadius === r
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-accent"
                }`}
              >
                {r} km
              </button>
            ))}
          </div>
        </motion.div>

        {/* Map */}
        {position && mapMarkers.length > 0 && (
          <motion.div {...fadeUp} className="mb-8">
            <ClinicsMap
              markers={mapMarkers}
              userLat={position.lat}
              userLng={position.lng}
              height="400px"
              title="Strutture veterinarie vicine a te"
            />
          </motion.div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayCards.map((c, i) => (
            <motion.div key={c.slug} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.05 }}>
              <ClinicCard clinic={c} distanceKm={c.distanceKm} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
