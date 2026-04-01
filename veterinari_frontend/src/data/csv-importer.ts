/**
 * CSV Importer — Parses veterinari.csv + veterinari_italia_wave.csv and produces Clinic[], Province[], City[].
 *
 * L'onda Italia (source italia_pg_*) usa la colonna opzionale `profile_slug` (allineata all'import DB).
 */

import csvRaw from "./veterinari.csv?raw";
import csvWaveRaw from "./veterinari_italia_wave.csv?raw";
import { provinceCodes, regionNameToSlug } from "./province-codes";
import type { Clinic, Province, City } from "./types";

// ── Helpers ──

function toSlug(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['`'']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function detectType(name: string): "clinica" | "ambulatorio" | "veterinario" {
  const lower = name.toLowerCase();
  if (lower.includes("clinica") || lower.includes("ospedale")) return "clinica";
  if (lower.includes("ambulatorio")) return "ambulatorio";
  return "veterinario";
}

/** Parse a CSV string handling quoted fields with commas */
function parseCsv(raw: string): string[][] {
  const rows: string[][] = [];
  // Remove BOM
  const text = raw.replace(/^\uFEFF/, "");
  const lines = text.split("\n");

  for (const line of lines) {
    if (!line.trim()) continue;
    const fields: string[] = [];
    let current = "";
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (inQuotes) {
        if (ch === '"') {
          if (i + 1 < line.length && line[i + 1] === '"') {
            current += '"';
            i++;
          } else {
            inQuotes = false;
          }
        } else {
          current += ch;
        }
      } else {
        if (ch === '"') {
          inQuotes = true;
        } else if (ch === ",") {
          fields.push(current.trim());
          current = "";
        } else {
          current += ch;
        }
      }
    }
    fields.push(current.trim());
    rows.push(fields);
  }
  return rows;
}

// Extract CAP from address string (5-digit Italian postal code)
function extractCap(address: string): string {
  const match = address.match(/\b(\d{5})\b/);
  return match ? match[1] : "";
}

// ── Parse CSV (principale + onda Italia PG) ──

const parsedMain = parseCsv(csvRaw);
const parsedWave = parseCsv(csvWaveRaw);
const dataRows = [
  ...parsedMain.slice(1).filter(r => r.length >= 6 && r[0]),
  ...parsedWave.slice(1).filter(r => r.length >= 6 && r[0]),
];

// Column indices
const COL = {
  name: 0,
  region: 1,
  province: 2,
  city: 3,
  address: 4,
  phone: 5,
  website: 6,
  lat: 7,
  lon: 8,
  openingHours: 9,
  googleRating: 10,
  googleReviews: 11,
  businessStatus: 12,
  googleTypes: 13,
  source: 14,
  /** Slug profilo esplicito (onda italia_pg); se assente si usa toSlug(name + city) */
  profileSlug: 15,
};

// ── Build imported clinics ──

const importedClinics: Record<string, Clinic> = {};
const csvProvinces: Record<string, Province> = {};
const csvCities: Record<string, City> = {};

// Track city counts per province for featuredCities
const cityClinicsCount: Record<string, number> = {};

for (const row of dataRows) {
  const name = row[COL.name] || "";
  const regionName = row[COL.region] || "";
  const provinceCode = row[COL.province] || "";
  const cityName = row[COL.city] || "";
  const address = row[COL.address] || "";
  const phone = row[COL.phone] || "";
  const website = row[COL.website] || "";
  const lat = parseFloat(row[COL.lat]) || undefined;
  const lon = parseFloat(row[COL.lon]) || undefined;
  const openingHours = row[COL.openingHours] || "";
  const googleRating = parseFloat(row[COL.googleRating]) || undefined;
  const googleReviews = parseInt(row[COL.googleReviews]) || undefined;
  const businessStatus = row[COL.businessStatus] || "";
  const googleTypes = row[COL.googleTypes] || "";
  const source = row[COL.source] || "";

  // Skip non-operational
  if (businessStatus && businessStatus !== "OPERATIONAL") continue;

  // Resolve location slugs
  const provEntry = provinceCodes[provinceCode];
  if (!provEntry) continue; // Unknown province code

  const regionSlug = provEntry.regionSlug;
  const provinceSlug = provEntry.slug;
  const citySlug = toSlug(cityName);
  const explicitSlug = (row[COL.profileSlug] || "").trim();
  const clinicSlug = explicitSlug || toSlug(name + " " + cityName);

  if (!clinicSlug || !citySlug) continue;

  // Create clinic
  const clinic: Clinic = {
    slug: clinicSlug,
    name,
    type: detectType(name),
    citySlug,
    provinceSlug,
    regionSlug,
    address: address || undefined,
    phone: phone ? (phone.startsWith("+") || phone.startsWith("0") ? phone : `0${phone}`) : undefined,
    lat,
    lng: lon,
    services: [],
    animals: [],
    openingHours: openingHours || undefined,
    emergencyAvailable: openingHours?.toLowerCase().includes("24 ore") || false,
    homeVisits: false,
    verified: false,
    featured: false,
    lastUpdated: "2026-03-19",
    description: `${name} è ${detectType(name) === "clinica" ? "una clinica veterinaria" : detectType(name) === "ambulatorio" ? "un ambulatorio veterinario" : "un medico veterinario"} a ${cityName}${address ? `, ${address}` : ""}. Contatta la struttura per informazioni sui servizi disponibili.`,
    ctaLabel: "Richiedi informazioni",
    metaTitle: `${name} — ${cityName}`,
    metaDescription: `${name} a ${cityName}. Trova informazioni, orari e contatti per questa struttura veterinaria.`,
    website: website || undefined,
    googleRating,
    googleReviewsCount: googleReviews,
    businessStatus: businessStatus || undefined,
    source: source || undefined,
    googleTypes: googleTypes || undefined,
    contactLoginRequired: (source || "").startsWith("italia_pg"),
  };

  importedClinics[clinicSlug] = clinic;

  // Track city clinic count
  cityClinicsCount[citySlug] = (cityClinicsCount[citySlug] || 0) + 1;

  // Auto-generate province entry if not exists
  if (!csvProvinces[provinceSlug]) {
    csvProvinces[provinceSlug] = {
      slug: provinceSlug,
      name: provEntry.name,
      regionSlug,
      metaTitle: `Veterinario in provincia di ${provEntry.name} — Trova assistenza veterinaria`,
      metaDescription: `Cerca un veterinario in provincia di ${provEntry.name}. Servizio gratuito di ricerca veterinaria.`,
      intro: `La provincia di ${provEntry.name} offre numerose strutture veterinarie distribuite sul territorio. Consulta l'elenco disponibile.`,
      cities: [],
    };
  }

  // Auto-generate city entry if not exists
  if (!csvCities[citySlug]) {
    const cap = extractCap(address);
    csvCities[citySlug] = {
      slug: citySlug,
      name: cityName,
      provinceSlug,
      regionSlug,
      cap: cap || "00000",
      metaTitle: `Veterinario a ${cityName} — Trova assistenza veterinaria`,
      metaDescription: `Cerca un veterinario a ${cityName}. Trova informazioni, orari e contatti delle strutture veterinarie.`,
      intro: `Strutture veterinarie disponibili a ${cityName}. Consulta l'elenco e invia una richiesta di contatto gratuita.`,
      nearbyCities: [],
    };

    // Add city to province cities list
    if (!csvProvinces[provinceSlug].cities.includes(citySlug)) {
      csvProvinces[provinceSlug].cities.push(citySlug);
    }
  }
}

// Mark top-rated clinics as featured (top 3 per city by rating*reviews)
const clinicsByCity: Record<string, Clinic[]> = {};
for (const c of Object.values(importedClinics)) {
  if (!clinicsByCity[c.citySlug]) clinicsByCity[c.citySlug] = [];
  clinicsByCity[c.citySlug].push(c);
}
for (const cityClinics of Object.values(clinicsByCity)) {
  cityClinics
    .sort((a, b) => {
      const scoreA = (a.googleRating || 0) * Math.log10((a.googleReviewsCount || 1) + 1);
      const scoreB = (b.googleRating || 0) * Math.log10((b.googleReviewsCount || 1) + 1);
      return scoreB - scoreA;
    })
    .slice(0, 3)
    .forEach(c => { c.featured = true; });
}

export { importedClinics, csvProvinces, csvCities };
export const csvImportStats = {
  totalClinics: Object.keys(importedClinics).length,
  totalCities: Object.keys(csvCities).length,
  totalProvinces: Object.keys(csvProvinces).length,
};
