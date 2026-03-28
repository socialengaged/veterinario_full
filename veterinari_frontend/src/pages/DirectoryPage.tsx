import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageMeta } from "@/components/PageMeta";
import { PageCTA } from "@/components/PageCTA";
import { ClinicCard } from "@/components/ClinicCard";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { AnswerSummary } from "@/components/AnswerSummary";
import { getAllClinics, getAllServices, getAllCities, getAllRegions, getProvincesByRegion } from "@/data";
import { animals } from "@/config/site";
import { Filter, X, Search, MapPin, Building2, Navigation, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { webPageJsonLd, breadcrumbJsonLd, itemListJsonLd } from "@/lib/seo";
import { useGeoContext } from "@/contexts/GeolocationContext";
import { haversineKm } from "@/hooks/useGeolocation";

const DIR_PAGE_SIZE = 24;

export default function DirectoryPage() {
  const geo = useGeoContext();
  const allClinics = useMemo(() => getAllClinics(), []);
  const allServices = getAllServices();
  const allCities = getAllCities();
  const allRegions = getAllRegions();

  const [region, setRegion] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [service, setService] = useState("");
  const [animal, setAnimal] = useState("");
  const [profileType, setProfileType] = useState("");
  const [emergency, setEmergency] = useState(false);
  const [homeVisit, setHomeVisit] = useState(false);
  const [search, setSearch] = useState("");
  const [maxRadius, setMaxRadius] = useState<number>(0); // 0 = no limit
  const [visibleCount, setVisibleCount] = useState(DIR_PAGE_SIZE);

  const availableProvinces = useMemo(() => {
    if (!region) return [];
    return getProvincesByRegion(region);
  }, [region]);

  const filteredCities = useMemo(() => {
    if (province) return allCities.filter(c => c.provinceSlug === province);
    if (region) return allCities.filter(c => c.regionSlug === region);
    return allCities;
  }, [region, province, allCities]);

  const activeFilters = [region, province, city, service, animal, profileType, emergency, homeVisit, search, maxRadius].filter(Boolean).length;

  const filtered = useMemo(() => {
    let result = allClinics;
    if (region) result = result.filter(c => c.regionSlug === region);
    if (province) result = result.filter(c => c.provinceSlug === province);
    if (city) result = result.filter(c => c.citySlug === city);
    if (service) result = result.filter(c => c.services.includes(service));
    if (animal) result = result.filter(c => c.animals.includes(animal));
    if (profileType) result = result.filter(c => c.type === profileType);
    if (emergency) result = result.filter(c => c.emergencyAvailable);
    if (homeVisit) result = result.filter(c => c.homeVisits);
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(c =>
        c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)
      );
    }

    // Sort by distance if geolocated, otherwise by featured/rating
    if (geo.position) {
      const withCoords = result
        .filter(c => c.lat && c.lng)
        .map(c => ({ clinic: c, dist: haversineKm(geo.position!.lat, geo.position!.lng, c.lat!, c.lng!) }))
        .filter(({ dist }) => maxRadius === 0 || dist <= maxRadius)
        .sort((a, b) => a.dist - b.dist)
        .map(({ clinic }) => clinic);
      const withoutCoords = maxRadius === 0 ? result.filter(c => !c.lat || !c.lng) : [];
      return [...withCoords, ...withoutCoords];
    }

    return result.sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      const rA = (a.googleRating || 0) * Math.log10((a.googleReviewsCount || 1) + 1);
      const rB = (b.googleRating || 0) * Math.log10((b.googleReviewsCount || 1) + 1);
      return rB - rA;
    });
  }, [region, province, city, service, animal, profileType, emergency, homeVisit, search, allClinics, geo.position, maxRadius]);

  const visibleClinics = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const clearFilters = () => {
    setRegion(""); setProvince(""); setCity(""); setService(""); setAnimal(""); setProfileType("");
    setEmergency(false); setHomeVisit(false); setSearch(""); setMaxRadius(0); setVisibleCount(DIR_PAGE_SIZE);
  };

  const selectClass = "px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground";

  return (
    <>
      <PageMeta
        title="Trova un veterinario in Italia — Elenco strutture e professionisti"
        description="Cerca tra le strutture veterinarie in Italia. Filtra per regione, provincia, città, servizio, animale, urgenza e disponibilità di visite a domicilio."
        canonical="/elenco/"
        jsonLd={[
          webPageJsonLd({ title: "Elenco veterinari in Italia", description: "Cerca tra le strutture veterinarie in Italia.", url: "/elenco/" }),
          breadcrumbJsonLd([{ name: "Elenco veterinari" }]),
          filtered.length > 0 ? itemListJsonLd({
            name: "Strutture veterinarie in Italia",
            url: "/elenco/",
            items: filtered.slice(0, 20).map((c, i) => ({
              name: c.name,
              url: c.type === "veterinario" ? `/veterinario/${c.slug}/` : `/struttura/${c.slug}/`,
              position: i + 1,
            })),
          }) : null,
        ]}
      />
      <Header />
      <main className="bg-background">
        <div className="container py-8 md:py-12 space-y-8">
          <Breadcrumbs items={[{ label: "Elenco veterinari" }]} />

          <section>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
              <Building2 className="h-4 w-4" />
              {allClinics.length.toLocaleString("it-IT")} strutture veterinarie censite
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-extrabold text-foreground mb-2">
              Veterinari e cliniche in Italia
            </h1>
            <AnswerSummary>
              Cerca tra {allClinics.length.toLocaleString("it-IT")} strutture veterinarie in tutta Italia. Filtra per regione, città, servizio o animale
              per individuare le strutture veterinarie nella tua zona. Il servizio è completamente gratuito.
            </AnswerSummary>
          </section>

          {/* Filters */}
          <section className="p-5 rounded-xl bg-surface border border-border space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Filter className="h-4 w-4 text-primary" /> Filtra risultati
                {activeFilters > 0 && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary text-primary-foreground">
                    {activeFilters}
                  </span>
                )}
              </div>
              {activeFilters > 0 && (
                <button onClick={clearFilters} className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
                  <X className="h-3 w-3" /> Cancella filtri
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              <select value={region} onChange={e => { setRegion(e.target.value); setProvince(""); setCity(""); }} className={selectClass}>
                <option value="">Tutte le regioni</option>
                {allRegions.map(r => <option key={r.slug} value={r.slug}>{r.name}</option>)}
              </select>

              <select value={province} onChange={e => { setProvince(e.target.value); setCity(""); }} className={selectClass} disabled={!region}>
                <option value="">Tutte le province</option>
                {availableProvinces.map(p => <option key={p.slug} value={p.slug}>{p.name}</option>)}
              </select>

              <select value={city} onChange={e => setCity(e.target.value)} className={selectClass}>
                <option value="">Tutte le città</option>
                {filteredCities.map(c => <option key={c.slug} value={c.slug}>{c.name}</option>)}
              </select>

              <select value={service} onChange={e => setService(e.target.value)} className={selectClass}>
                <option value="">Tutti i servizi</option>
                {allServices.map(s => <option key={s.slug} value={s.slug}>{s.name}</option>)}
              </select>

              <select value={animal} onChange={e => setAnimal(e.target.value)} className={selectClass}>
                <option value="">Tutti gli animali</option>
                {animals.map(a => <option key={a.id} value={a.id}>{a.label}</option>)}
              </select>

              <select value={profileType} onChange={e => setProfileType(e.target.value)} className={selectClass}>
                <option value="">Tipo struttura</option>
                <option value="clinica">Clinica</option>
                <option value="ambulatorio">Ambulatorio</option>
                <option value="veterinario">Veterinario</option>
              </select>
            </div>

            <div className="flex flex-wrap gap-3 items-center">
              <label className="inline-flex items-center gap-1.5 text-sm cursor-pointer">
                <input type="checkbox" checked={emergency} onChange={e => setEmergency(e.target.checked)} className="rounded accent-primary" />
                Pronto soccorso
              </label>
              <label className="inline-flex items-center gap-1.5 text-sm cursor-pointer">
                <input type="checkbox" checked={homeVisit} onChange={e => setHomeVisit(e.target.checked)} className="rounded accent-primary" />
                Visite a domicilio
              </label>
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Cerca per nome o descrizione…"
                    className="w-full pl-9 pr-3 py-2 rounded-lg border border-input bg-background text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Geo sorting indicator & radius filter */}
            {geo.position && (
              <div className="flex flex-wrap items-center gap-3">
                <span className="flex items-center gap-1.5 text-xs text-primary font-semibold">
                  <Navigation className="h-3.5 w-3.5" />
                  Ordinati per distanza
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-muted-foreground">Raggio:</span>
                  {[
                    { label: "Tutti", value: 0 },
                    { label: "10 km", value: 10 },
                    { label: "25 km", value: 25 },
                    { label: "50 km", value: 50 },
                    { label: "100 km", value: 100 },
                  ].map(r => (
                    <button
                      key={r.value}
                      onClick={() => { setMaxRadius(r.value); setVisibleCount(DIR_PAGE_SIZE); }}
                      className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                        maxRadius === r.value
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {!geo.position && !geo.denied && (
              <Button variant="outline" size="sm" onClick={geo.requestPermission} disabled={geo.loading} className="gap-1.5">
                {geo.loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <MapPin className="h-3.5 w-3.5" />}
                Ordina per distanza
              </Button>
            )}
          </section>

          {/* Results */}
          <section>
            <p className="text-sm text-muted-foreground mb-4">
              {filtered.length} {filtered.length === 1 ? "risultato" : "risultati"} trovati
            </p>

            {filtered.length > 0 ? (
              <>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {visibleClinics.map(c => <ClinicCard key={c.slug} clinic={c} />)}
                </div>
                {hasMore && (
                  <div className="text-center mt-6">
                    <Button variant="outline" onClick={() => setVisibleCount(v => v + DIR_PAGE_SIZE)}>
                      Mostra altre strutture ({(filtered.length - visibleCount).toLocaleString("it-IT")} rimanenti)
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="p-10 rounded-2xl border border-border bg-surface text-center">
                <MapPin className="h-10 w-10 text-muted-foreground/40 mx-auto mb-3" />
                <h3 className="font-display font-semibold text-foreground mb-2">Nessun risultato trovato</h3>
                <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto">
                  Non abbiamo trovato strutture che corrispondano ai tuoi filtri.
                  Prova ad ampliare la ricerca o a rimuovere alcuni filtri.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button variant="outline" size="sm" onClick={clearFilters}>
                    Rimuovi tutti i filtri
                  </Button>
                  <Button variant="cta" size="sm" asChild>
                    <Link to="/richiedi-assistenza/">Invia richiesta di contatto</Link>
                  </Button>
                </div>

                {city && (
                  <div className="mt-6 pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground mb-2">Prova nelle città vicine:</p>
                    <div className="flex flex-wrap gap-1.5 justify-center">
                      {allCities
                        .filter(c => c.slug !== city)
                        .slice(0, 5)
                        .map(c => (
                          <button
                            key={c.slug}
                            onClick={() => setCity(c.slug)}
                            className="px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
                          >
                            {c.name}
                          </button>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </section>

          <PageCTA
            title="Non trovi quello che cerchi?"
            description="Invia una richiesta di contatto gratuita per raggiungere le strutture veterinarie della tua zona."
            href="/richiedi-assistenza/"
          />
        </div>
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
}
