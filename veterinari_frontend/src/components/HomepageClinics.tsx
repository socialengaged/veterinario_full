import { useState, useMemo } from "react";
import { Building2, Map } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ClinicCard } from "@/components/ClinicCard";
import { ClinicsMap } from "@/components/ClinicsMapWrapper";
import { Button } from "@/components/ui/button";
import { getAllClinics, getAllRegions, getProvincesByRegion } from "@/data";
import { ArrowRight } from "lucide-react";
import { useGeoContext } from "@/contexts/GeolocationContext";
import { haversineKm } from "@/hooks/useGeolocation";
import type { MapMarker } from "@/components/ClinicsMapWrapper";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5 },
};

const PAGE_SIZE = 12;

export function HomepageClinics() {
  const allClinics = useMemo(() => getAllClinics(), []);
  const allRegions = useMemo(() => getAllRegions().sort((a, b) => a.name.localeCompare(b.name)), []);

  const [regionFilter, setRegionFilter] = useState("");
  const [provinceFilter, setProvinceFilter] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [showMap, setShowMap] = useState(false);
  const [maxRadius, setMaxRadius] = useState(0); // 0 = no filter

  const RADIUS_OPTIONS = [10, 25, 50, 100];

  const availableProvinces = useMemo(() => {
    if (!regionFilter) return [];
    return getProvincesByRegion(regionFilter).sort((a, b) => a.name.localeCompare(b.name));
  }, [regionFilter]);

  const geo = useGeoContext();

  const filtered = useMemo(() => {
    let result = allClinics;
    if (regionFilter) result = result.filter(c => c.regionSlug === regionFilter);
    if (provinceFilter) result = result.filter(c => c.provinceSlug === provinceFilter);

    // If geolocated, sort by distance and optionally filter by radius
    if (geo.position) {
      const withCoords = result
        .filter(c => {
          if (!c.lat || !c.lng) return false;
          if (maxRadius > 0) {
            return haversineKm(geo.position!.lat, geo.position!.lng, c.lat, c.lng) <= maxRadius;
          }
          return true;
        })
        .sort((a, b) => 
          haversineKm(geo.position!.lat, geo.position!.lng, a.lat!, a.lng!) -
          haversineKm(geo.position!.lat, geo.position!.lng, b.lat!, b.lng!)
        );
      const withoutCoords = maxRadius > 0 ? [] : result.filter(c => !c.lat || !c.lng);
      return [...withCoords, ...withoutCoords];
    }

    return result.sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      const rA = (a.googleRating || 0) * Math.log10((a.googleReviewsCount || 1) + 1);
      const rB = (b.googleRating || 0) * Math.log10((b.googleReviewsCount || 1) + 1);
      return rB - rA;
    });
  }, [regionFilter, provinceFilter, allClinics, geo.position, maxRadius]);

  const mapMarkers = useMemo<MapMarker[]>(() => {
    if (!showMap) return [];
    // Show up to 100 markers with coordinates
    return filtered
      .filter(c => c.lat && c.lng)
      .slice(0, 100)
      .map(c => ({
        lat: c.lat!,
        lng: c.lng!,
        name: c.name,
        detail: c.address,
        href: c.type === "veterinario" ? `/veterinario/${c.slug}/` : `/struttura/${c.slug}/`,
      }));
  }, [filtered, showMap]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const selectClass = "px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground";

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <motion.div {...fadeUp} className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            <Building2 className="h-4 w-4" />
            {allClinics.length.toLocaleString("it-IT")} strutture veterinarie in Italia
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
            Strutture Veterinarie in Italia
          </h2>
          <p className="text-muted-foreground">
            Esplora oltre {allClinics.length.toLocaleString("it-IT")} strutture veterinarie censite su tutto il territorio nazionale.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          <select
            value={regionFilter}
            onChange={e => { setRegionFilter(e.target.value); setProvinceFilter(""); setVisibleCount(PAGE_SIZE); }}
            className={selectClass}
          >
            <option value="">Tutte le regioni</option>
            {allRegions.map(r => (
              <option key={r.slug} value={r.slug}>{r.name}</option>
            ))}
          </select>
          <select
            value={provinceFilter}
            onChange={e => { setProvinceFilter(e.target.value); setVisibleCount(PAGE_SIZE); }}
            className={selectClass}
            disabled={!regionFilter}
          >
            <option value="">Tutte le province</option>
            {availableProvinces.map(p => (
              <option key={p.slug} value={p.slug}>{p.name}</option>
            ))}
          </select>
          {(regionFilter || provinceFilter) && (
            <button
              onClick={() => { setRegionFilter(""); setProvinceFilter(""); setVisibleCount(PAGE_SIZE); }}
              className="text-xs text-muted-foreground hover:text-foreground px-3 py-2"
            >
              ✕ Reset
            </button>
          )}
          <Button
            variant={showMap ? "default" : "outline"}
            size="sm"
            onClick={() => setShowMap(v => !v)}
            className="gap-1.5"
          >
            <Map className="h-4 w-4" />
            {showMap ? "Nascondi mappa" : "Mostra mappa"}
          </Button>
          <span className="text-xs text-muted-foreground self-center">
            {filtered.length.toLocaleString("it-IT")} strutture
          </span>
        </div>

        {/* Radius filter - only when geolocated */}
        {geo.position && (
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            <span className="text-xs text-muted-foreground self-center mr-1">Raggio:</span>
            <button
              onClick={() => setMaxRadius(0)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                maxRadius === 0
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-accent"
              }`}
            >
              Tutti
            </button>
            {RADIUS_OPTIONS.map(r => (
              <button
                key={r}
                onClick={() => { setMaxRadius(r); setVisibleCount(PAGE_SIZE); }}
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
        )}

        {/* Map */}
        {showMap && mapMarkers.length > 0 && (
          <motion.div {...fadeUp} className="mb-8">
            <ClinicsMap
              markers={mapMarkers}
              height="450px"
              title={`Mappa strutture veterinarie${regionFilter ? "" : " — Italia"}`}
            />
          </motion.div>
        )}

        {/* Clinics grid */}
        {visible.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {visible.map((c, i) => (
              <motion.div key={c.slug} {...fadeUp} transition={{ ...fadeUp.transition, delay: Math.min(i, 6) * 0.04 }}>
                <ClinicCard clinic={c} />
              </motion.div>
            ))}
          </div>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            Nessuna struttura trovata per i filtri selezionati.
          </div>
        )}

        {hasMore && (
          <div className="text-center mb-8">
            <Button variant="outline" onClick={() => setVisibleCount(v => v + PAGE_SIZE)}>
              Mostra altre strutture ({filtered.length - visibleCount} rimanenti)
            </Button>
          </div>
        )}

        <div className="text-center">
          <Button variant="outline" asChild>
            <Link to="/elenco/">Vedi tutte le strutture <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
