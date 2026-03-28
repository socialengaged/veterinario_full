import { cityEnrichmentData } from "@/data/city-enrichment";
import { getCitiesByProvince, getClinicsByCity } from "@/data";
import { MapPin } from "lucide-react";

interface Props {
  provinceSlug: string;
  provinceName: string;
  regionName: string;
}

/** Extract population from intro text */
function parsePop(intro: string): number {
  const m = intro.match(/popolazione di ([\d.]+) abitanti/);
  if (!m) return 0;
  return parseInt(m[1].replace(/\./g, ""), 10);
}

/** Returns aggregated stats for a province from CSV enrichment data */
export function getProvinceAggregatedStats(provinceSlug: string) {
  const cities = getCitiesByProvince(provinceSlug);
  const enriched = cities
    .map(c => ({ city: c, enrich: cityEnrichmentData[c.slug], clinicCount: getClinicsByCity(c.slug).length }))
    .filter(x => x.enrich);
  if (enriched.length < 2) return null;

  const totalPop = enriched.reduce((s, x) => s + parsePop(x.enrich.intro), 0);
  const citiesWithClinics = enriched.filter(x => x.clinicCount > 0).length;
  const totalClinics = enriched.reduce((s, x) => s + x.clinicCount, 0);
  return { totalPopulation: totalPop, totalCities: enriched.length, citiesWithClinics, totalClinics };
}

/** Returns aggregated stats for a region across all its provinces */
export function getRegionAggregatedStats(provinceSlugs: string[]) {
  let totalPop = 0, totalCities = 0, citiesWithClinics = 0, totalClinics = 0;
  let hasData = false;
  for (const ps of provinceSlugs) {
    const stats = getProvinceAggregatedStats(ps);
    if (stats) {
      hasData = true;
      totalPop += stats.totalPopulation;
      totalCities += stats.totalCities;
      citiesWithClinics += stats.citiesWithClinics;
      totalClinics += stats.totalClinics;
    }
  }
  return hasData ? { totalPopulation: totalPop, totalCities, citiesWithClinics, totalClinics } : null;
}

/**
 * Aggregates city-level CSV enrichment data to build a territorial
 * context section for province pages. Shows population, key landmarks,
 * and veterinary-relevant geographic context.
 */
export function ProvinceTerritorialContext({ provinceSlug, provinceName, regionName }: Props) {
  const cities = getCitiesByProvince(provinceSlug);
  
  // Gather enrichment for cities in this province
  const enrichedCities = cities
    .map(c => ({ city: c, enrich: cityEnrichmentData[c.slug], clinicCount: getClinicsByCity(c.slug).length }))
    .filter(x => x.enrich);

  if (enrichedCities.length < 2) return null;

  const totalPop = enrichedCities.reduce((s, x) => s + parsePop(x.enrich.intro), 0);
  const topByPop = [...enrichedCities]
    .sort((a, b) => parsePop(b.enrich.intro) - parsePop(a.enrich.intro))
    .slice(0, 6);

  // Collect unique attraction snippets from top cities
  const attractionSnippets: string[] = [];
  for (const x of topByPop) {
    if (!x.enrich.attractions) continue;
    // Take the first sentence of attractions
    const first = x.enrich.attractions.split(/[.!]/)[0]?.trim();
    if (first && first.length > 20) {
      attractionSnippets.push(`${first} (${x.city.name})`);
    }
    if (attractionSnippets.length >= 3) break;
  }

  // Gather geographic/intro context from the 2-3 largest cities
  const geoSnippets = topByPop.slice(0, 3)
    .map(x => {
      const sentences = x.enrich.intro.split(/\. /);
      // Find a sentence with geographic/territorial info (skip the first generic one)
      const geo = sentences.find((s, i) => i > 0 && (
        s.includes("territorio") || s.includes("situato") || s.includes("confin") ||
        s.includes("pianura") || s.includes("collina") || s.includes("costa") ||
        s.includes("mare") || s.includes("montagna") || s.includes("zona") ||
        s.includes("fiume") || s.includes("lago")
      ));
      return geo ? `${geo.trim()}.` : null;
    })
    .filter(Boolean);

  const topCityNames = topByPop.slice(0, 5).map(x => x.city.name);
  const citiesWithClinics = enrichedCities.filter(x => x.clinicCount > 0);

  return (
    <section className="p-6 rounded-xl border border-border bg-card space-y-4">
      <h2 className="font-display text-lg font-bold text-foreground flex items-center gap-2">
        <MapPin className="h-5 w-5 text-primary" />
        Il territorio della provincia di {provinceName}
      </h2>

      <p className="text-sm text-muted-foreground leading-relaxed">
        La provincia di {provinceName}, in {regionName}, comprende {enrichedCities.length} comuni
        {totalPop > 0 && ` per una popolazione complessiva di circa ${(totalPop / 1000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}mila abitanti`}.
        I centri principali — {topCityNames.join(", ")} — rappresentano i poli di riferimento
        per i servizi veterinari del territorio.
        {citiesWithClinics.length > 0 && ` Attualmente ${citiesWithClinics.length} comuni della provincia dispongono di almeno una struttura veterinaria censita.`}
      </p>

      {geoSnippets.length > 0 && (
        <p className="text-sm text-muted-foreground leading-relaxed">
          {geoSnippets.join(" ")}
          {" "}Queste caratteristiche territoriali influenzano la distribuzione dei servizi veterinari
          e le esigenze sanitarie degli animali domestici nella provincia.
        </p>
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
          <p className="text-xs text-muted-foreground mt-2 italic">
            Conoscere i punti di interesse del territorio aiuta a individuare il veterinario
            più comodo da raggiungere e le aree verdi sicure per gli animali.
          </p>
        </div>
      )}
    </section>
  );
}
