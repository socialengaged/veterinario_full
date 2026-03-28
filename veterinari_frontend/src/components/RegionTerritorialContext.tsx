import { cityEnrichmentData } from "@/data/city-enrichment";
import { getCitiesByProvince, getClinicsByCity, getProvincesByRegion } from "@/data";
import { MapPin, Users, Building2, TreePine } from "lucide-react";

interface Props {
  regionSlug: string;
  regionName: string;
}

function parsePop(intro: string): number {
  const m = intro.match(/popolazione di ([\d.]+) abitanti/);
  if (!m) return 0;
  return parseInt(m[1].replace(/\./g, ""), 10);
}

function formatPop(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(".", ",")} milioni`;
  return `${(n / 1000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}mila`;
}

export function RegionTerritorialContext({ regionSlug, regionName }: Props) {
  const provs = getProvincesByRegion(regionSlug);
  
  // Gather all cities across all provinces
  const allCityData = provs.flatMap(prov => {
    const cities = getCitiesByProvince(prov.slug);
    return cities.map(c => ({
      city: c,
      province: prov,
      enrich: cityEnrichmentData[c.slug],
      clinicCount: getClinicsByCity(c.slug).length,
    }));
  }).filter(x => x.enrich);

  if (allCityData.length < 5) return null;

  const totalPop = allCityData.reduce((s, x) => s + parsePop(x.enrich.intro), 0);
  const citiesWithClinics = allCityData.filter(x => x.clinicCount > 0);
  const totalClinics = allCityData.reduce((s, x) => s + x.clinicCount, 0);

  // Top cities by population
  const topByPop = [...allCityData]
    .sort((a, b) => parsePop(b.enrich.intro) - parsePop(a.enrich.intro))
    .slice(0, 8);

  // Geographic snippets from the largest cities
  const geoSnippets = topByPop.slice(0, 4)
    .map(x => {
      const sentences = x.enrich.intro.split(/\. /);
      const geo = sentences.find((s, i) => i > 0 && (
        s.includes("territorio") || s.includes("situato") || s.includes("confin") ||
        s.includes("pianura") || s.includes("collina") || s.includes("costa") ||
        s.includes("mare") || s.includes("montagna") || s.includes("zona") ||
        s.includes("fiume") || s.includes("lago")
      ));
      return geo ? `${geo.trim()}.` : null;
    })
    .filter(Boolean);

  // Unique attraction snippets
  const attractionSnippets: string[] = [];
  for (const x of topByPop) {
    if (!x.enrich.attractions) continue;
    const first = x.enrich.attractions.split(/[.!]/)[0]?.trim();
    if (first && first.length > 20) {
      attractionSnippets.push(`${first} (${x.city.name})`);
    }
    if (attractionSnippets.length >= 4) break;
  }

  // Province breakdown
  const provBreakdown = provs.map(prov => {
    const provCities = allCityData.filter(x => x.province.slug === prov.slug);
    const provClinics = provCities.reduce((s, x) => s + x.clinicCount, 0);
    return { name: prov.name, cities: provCities.length, clinics: provClinics };
  }).filter(p => p.cities > 0).sort((a, b) => b.clinics - a.clinics);

  return (
    <section className="p-6 rounded-xl border border-border bg-card space-y-5">
      <h2 className="font-display text-lg font-bold text-foreground flex items-center gap-2">
        <MapPin className="h-5 w-5 text-primary" />
        Il territorio della {regionName}
      </h2>

      {/* Key stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {totalPop > 0 && (
          <div className="p-3 rounded-lg bg-muted/50 text-center">
            <Users className="h-4 w-4 text-primary mx-auto mb-1" />
            <div className="text-sm font-semibold text-foreground">{formatPop(totalPop)}</div>
            <div className="text-xs text-muted-foreground">abitanti coperti</div>
          </div>
        )}
        <div className="p-3 rounded-lg bg-muted/50 text-center">
          <Building2 className="h-4 w-4 text-primary mx-auto mb-1" />
          <div className="text-sm font-semibold text-foreground">{totalClinics}</div>
          <div className="text-xs text-muted-foreground">strutture censite</div>
        </div>
        <div className="p-3 rounded-lg bg-muted/50 text-center">
          <MapPin className="h-4 w-4 text-primary mx-auto mb-1" />
          <div className="text-sm font-semibold text-foreground">{citiesWithClinics.length}</div>
          <div className="text-xs text-muted-foreground">comuni con cliniche</div>
        </div>
        <div className="p-3 rounded-lg bg-muted/50 text-center">
          <TreePine className="h-4 w-4 text-primary mx-auto mb-1" />
          <div className="text-sm font-semibold text-foreground">{allCityData.length}</div>
          <div className="text-xs text-muted-foreground">comuni mappati</div>
        </div>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed">
        La {regionName} comprende {allCityData.length} comuni censiti nella nostra piattaforma, distribuiti su {provs.length} province.
        {totalPop > 0 && ` La popolazione complessiva coperta è di circa ${formatPop(totalPop)} di abitanti.`}
        {citiesWithClinics.length > 0 && ` Attualmente ${citiesWithClinics.length} comuni dispongono di almeno una struttura veterinaria, per un totale di ${totalClinics} strutture censite.`}
        {" "}I centri principali — {topByPop.slice(0, 5).map(x => x.city.name).join(", ")} — sono i poli di riferimento per i servizi veterinari della regione.
      </p>

      {geoSnippets.length > 0 && (
        <p className="text-sm text-muted-foreground leading-relaxed">
          {geoSnippets.join(" ")}
          {" "}La varietà territoriale della {regionName} influenza la distribuzione dei servizi veterinari e le esigenze sanitarie degli animali.
        </p>
      )}

      {/* Province breakdown */}
      {provBreakdown.length > 1 && (
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-2">Copertura per provincia</h3>
          <div className="grid sm:grid-cols-2 gap-2">
            {provBreakdown.slice(0, 8).map((p, i) => (
              <div key={i} className="flex items-center justify-between text-sm px-3 py-2 rounded-lg bg-muted/30">
                <span className="text-foreground font-medium">{p.name}</span>
                <span className="text-muted-foreground text-xs">{p.cities} comuni · {p.clinics} strutture</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {attractionSnippets.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-2">Punti di riferimento nel territorio</h3>
          <ul className="space-y-1.5">
            {attractionSnippets.map((s, i) => (
              <li key={i} className="text-sm text-muted-foreground leading-relaxed flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                {s}.
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}