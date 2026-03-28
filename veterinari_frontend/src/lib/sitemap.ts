// ── Sitemap Generator ──
// Generates a complete sitemap covering all routes.

import { siteConfig } from "@/config/site";
import {
  getAllRegions, getProvincesByRegion, getCitiesByProvince,
  getAllServices, getAllGuides, getAllClinics, getAllServiceAnimalPages,
  getClinicsByCity,
} from "@/data";
import {
  cityKeywordPatterns,
  animalCityKeywordPatterns,
  serviceCityKeywordPatterns,
  animalKeywordPages,
  specialtyKeywordPages,
} from "@/data/keywords";

interface SitemapEntry {
  loc: string;
  changefreq: "daily" | "weekly" | "monthly";
  priority: number;
  lastmod?: string;
}

const TODAY = new Date().toISOString().slice(0, 10);

export function generateSitemapEntries(): SitemapEntry[] {
  const entries: SitemapEntry[] = [];
  const base = siteConfig.url;
  const seen = new Set<string>();

  const add = (entry: SitemapEntry) => {
    const normalized = entry.loc.endsWith("/") ? entry.loc : entry.loc + "/";
    if (seen.has(normalized)) return;
    seen.add(normalized);
    entries.push({ ...entry, loc: normalized, lastmod: entry.lastmod || TODAY });
  };

  // ── Static pages ──
  add({ loc: `${base}/`, changefreq: "weekly", priority: 1.0 });
  add({ loc: `${base}/elenco/`, changefreq: "weekly", priority: 0.8 });
  add({ loc: `${base}/richiedi-assistenza/`, changefreq: "monthly", priority: 0.7 });
  add({ loc: `${base}/guide/`, changefreq: "weekly", priority: 0.8 });
  add({ loc: `${base}/servizi/`, changefreq: "weekly", priority: 0.9 });
  add({ loc: `${base}/come-funziona/`, changefreq: "monthly", priority: 0.7 });
  add({ loc: `${base}/mappa-sito/`, changefreq: "weekly", priority: 0.3 });
  add({ loc: `${base}/mappa-sito-dettagliata/`, changefreq: "weekly", priority: 0.4 });

  // ── Guide pages ──
  for (const guide of getAllGuides()) {
    add({ loc: `${base}/guide/${guide.slug}/`, changefreq: "monthly", priority: 0.6 });
  }

  // ── Service pages ──
  for (const service of getAllServices()) {
    add({ loc: `${base}/${service.slug}/`, changefreq: "monthly", priority: 0.7 });
  }

  // ── Region > Province > City hierarchy (from merged data) ──
  const allRegions = getAllRegions();
  for (const region of allRegions) {
    add({ loc: `${base}/${region.slug}/`, changefreq: "monthly", priority: 0.6 });

    const provinces = getProvincesByRegion(region.slug);
    for (const prov of provinces) {
      add({ loc: `${base}/${region.slug}/${prov.slug}/`, changefreq: "monthly", priority: 0.5 });

      const cities = getCitiesByProvince(prov.slug);
      for (const city of cities) {
        if (getClinicsByCity(city.slug).length > 0) {
          add({ loc: `${base}/${region.slug}/${prov.slug}/${city.slug}/`, changefreq: "weekly", priority: 0.6 });
        }
      }
    }
  }

  // Collect all city slugs for keyword generation
  const allCitySlugs = new Set<string>();
  for (const region of allRegions) {
    for (const prov of getProvincesByRegion(region.slug)) {
      for (const city of getCitiesByProvince(prov.slug)) {
        allCitySlugs.add(city.slug);
      }
    }
  }

  // ── Clinic profiles ──
  for (const clinic of getAllClinics()) {
    const prefix = clinic.type === "veterinario" ? "veterinario" : "struttura";
    add({ loc: `${base}/${prefix}/${clinic.slug}/`, changefreq: "monthly", priority: 0.5 });
  }

  // ── Keyword: Animal pages ──
  for (const page of Object.values(animalKeywordPages)) {
    add({ loc: `${base}/${page.slug}/`, changefreq: "monthly", priority: 0.7 });
  }

  // ── Keyword: Specialty pages ──
  for (const page of Object.values(specialtyKeywordPages)) {
    add({ loc: `${base}/${page.slug}/`, changefreq: "monthly", priority: 0.7 });
  }

  // ── Keyword: City patterns ──
  for (const pattern of cityKeywordPatterns) {
    for (const citySlug of allCitySlugs) {
      add({ loc: `${base}/${pattern.prefix}${citySlug}/`, changefreq: "weekly", priority: 0.8 });
    }
  }

  // ── Keyword: Animal + City patterns ──
  for (const pattern of animalCityKeywordPatterns) {
    for (const citySlug of allCitySlugs) {
      add({ loc: `${base}/${pattern.prefix}${citySlug}/`, changefreq: "weekly", priority: 0.7 });
    }
  }

  // ── Keyword: Service + City patterns ──
  for (const pattern of serviceCityKeywordPatterns) {
    for (const citySlug of allCitySlugs) {
      add({ loc: `${base}/${pattern.prefix}${citySlug}/`, changefreq: "weekly", priority: 0.7 });
    }
  }

  // ── Service + Animal pages ──
  for (const page of getAllServiceAnimalPages()) {
    add({ loc: `${base}/${page.slug}/`, changefreq: "monthly", priority: 0.8 });
  }

  return entries;
}

/** Max URLs per sitemap file (Google limit is 50,000) */
const MAX_URLS_PER_SITEMAP = 45000;

export function generateSitemapXml(entries?: SitemapEntry[]): string {
  const all = entries || generateSitemapEntries();
  const urls = all
    .map(
      (e) =>
        `  <url>\n    <loc>${escapeXml(e.loc)}</loc>\n    <lastmod>${e.lastmod || TODAY}</lastmod>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority.toFixed(1)}</priority>\n  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

/** Generate a sitemap index if URLs exceed the limit */
export function generateSitemapIndex(): { index: string; sitemaps: { name: string; xml: string }[] } | null {
  const entries = generateSitemapEntries();
  if (entries.length <= MAX_URLS_PER_SITEMAP) return null;

  const chunks: SitemapEntry[][] = [];
  for (let i = 0; i < entries.length; i += MAX_URLS_PER_SITEMAP) {
    chunks.push(entries.slice(i, i + MAX_URLS_PER_SITEMAP));
  }

  const sitemaps = chunks.map((chunk, i) => ({
    name: `sitemap-${i + 1}.xml`,
    xml: generateSitemapXml(chunk),
  }));

  const index = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps.map((s) => `  <sitemap>\n    <loc>${siteConfig.url}/${s.name}</loc>\n    <lastmod>${TODAY}</lastmod>\n  </sitemap>`).join("\n")}
</sitemapindex>`;

  return { index, sitemaps };
}

function escapeXml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
