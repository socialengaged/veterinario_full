/**
 * CSV Enricher — Reads the enriched CSV with scraped data (services, phones, emails)
 * and produces a lookup map keyed by clinic slug for merging into the main dataset.
 */

import enrichedRaw from "./veterinari-enriched.csv?raw";
import { provinceCodes } from "./province-codes";

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

function parseCsv(raw: string): string[][] {
  const rows: string[][] = [];
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

/** Clean phone numbers: remove duplicates, normalize */
function cleanPhones(raw: string): string[] {
  if (!raw) return [];
  return [...new Set(
    raw.split("|")
      .map(p => p.replace(/[\s\-]/g, "").replace(/^00/, "+").trim())
      .filter(p => p.length >= 6)
  )];
}

/** Clean emails: split, deduplicate, lowercase */
function cleanEmails(raw: string): string[] {
  if (!raw) return [];
  return [...new Set(
    raw.split("|")
      .map(e => e.trim().toLowerCase())
      .filter(e => e.includes("@"))
  )];
}

/** Clean scraped services: split, deduplicate, capitalize */
function cleanServices(raw: string): string[] {
  if (!raw) return [];
  return [...new Set(
    raw.split("|")
      .map(s => s.trim())
      .filter(Boolean)
      .map(s => s.charAt(0).toUpperCase() + s.slice(1))
  )];
}

// ── Parse enriched CSV ──

export interface EnrichedData {
  scrapedServices: string[];
  scrapedPhones: string[];
  scrapedEmails: string[];
}

const allRows = parseCsv(enrichedRaw);
const dataRows = allRows.slice(1).filter(r => r.length >= 17 && r[0]);

// Column indices for enriched fields
const COL = {
  name: 0,
  province: 2,
  city: 3,
  scrapedServices: 16,
  scrapedPhones: 17,
  scrapedEmails: 18,
};

export const enrichmentMap: Record<string, EnrichedData> = {};

let enrichedCount = 0;

for (const row of dataRows) {
  const name = row[COL.name] || "";
  const cityName = row[COL.city] || "";
  const provinceCode = row[COL.province] || "";

  if (!name || !cityName) continue;
  if (!provinceCodes[provinceCode]) continue;

  const clinicSlug = toSlug(name + " " + cityName);
  if (!clinicSlug) continue;

  const services = cleanServices(row[COL.scrapedServices] || "");
  const phones = cleanPhones(row[COL.scrapedPhones] || "");
  const emails = cleanEmails(row[COL.scrapedEmails] || "");

  // Only add if there's actually enrichment data
  if (services.length || phones.length || emails.length) {
    enrichmentMap[clinicSlug] = { scrapedServices: services, scrapedPhones: phones, scrapedEmails: emails };
    enrichedCount++;
  }
}

if (import.meta.env.DEV) {
  console.log(`[CSV Enricher] ${enrichedCount} cliniche arricchite con dati scraping`);
}
