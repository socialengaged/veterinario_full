import { getService } from "@/data";
import { getTaxonomyCategory, getSubcategories } from "@/data/service-taxonomy";
import type { ServiceCategory } from "@/data/types";

/**
 * Mappa categoria/sottoservizio UI → campo `service` per POST /requests
 * (allineato a SERVICE_TO_SPECIALTY_SLUG nel backend).
 */
export function resolveServiceForRequest(categoryId: string, subServiceId: string): string {
  if (subServiceId === "toelettatura") {
    return "toelettatura";
  }
  const byCategory: Record<string, string> = {
    visita: "visita_generica",
    diagnostica: "diagnostica",
    analisi: "analisi",
    chirurgia: "chirurgia",
    specialistica: "visita_generica",
    prevenzione: "visita_generica",
    nutrizione: "visita_generica",
    riabilitazione: "visita_generica",
    odontoiatria: "chirurgia",
    cura: "visita_generica",
    "animali-esotici": "visita_generica",
    rurale: "visita_generica",
  };
  return byCategory[categoryId] ?? "visita_generica";
}

const SERVICE_CATEGORY_TO_TAXONOMY: Partial<Record<ServiceCategory | "generale", string>> = {
  diagnostica: "diagnostica",
  specialistica: "specialistica",
  prevenzione: "prevenzione",
  nutrizione: "nutrizione",
  generale: "visita",
  cura: "cura",
  emergenza: "visita",
};

/** Da slug query (?servizio=) o id categoria tassonomia → valori per i select del modulo. */
export function resolveTaxonomyFromQuery(servizioParam: string): { serviceCategory: string; subService: string } {
  const p = servizioParam.trim();
  if (!p) return { serviceCategory: "", subService: "" };
  if (getTaxonomyCategory(p)) {
    return { serviceCategory: p, subService: "" };
  }
  const page = getService(p);
  if (!page) return { serviceCategory: "", subService: "" };

  let serviceCategory =
    (page.category && SERVICE_CATEGORY_TO_TAXONOMY[page.category]) ||
    inferTaxonomyCategoryFromSlug(page.slug);
  const subs = getSubcategories(serviceCategory);
  if (!subs.length) {
    serviceCategory = "visita";
  }
  const subs2 = getSubcategories(serviceCategory);
  const slug = page.slug;
  const stripped = slug
    .replace(/-veterinari[ao]?$/i, "")
    .replace(/-veterinaria$/i, "")
    .replace(/-ippic[ao]$/i, "");
  const exact = subs2.find((s) => s.id === stripped);
  if (exact) return { serviceCategory, subService: exact.id };
  const partial = subs2.find(
    (s) => slug.includes(s.id) || stripped.includes(s.id) || s.id.includes(stripped.split("-")[0] || "")
  );
  if (partial) return { serviceCategory, subService: partial.id };
  return { serviceCategory, subService: subs2[0]?.id ?? "" };
}

function inferTaxonomyCategoryFromSlug(slug: string): string {
  const s = slug.toLowerCase();
  if (s.includes("chirurgia") || s.includes("sterilizz") || s.includes("castrazione")) return "chirurgia";
  if (s.includes("vaccin")) return "prevenzione";
  if (
    s.includes("diagnostica") ||
    s.includes("ecografia") ||
    s.includes("radiografia") ||
    s.includes("tac-veterin") ||
    s.includes("risonanza") ||
    s.includes("endoscopia")
  )
    return "diagnostica";
  if (s.includes("analisi") || s.includes("sangue") || s.includes("laboratorio") || s.includes("esami-")) return "analisi";
  if (s.includes("nutrizione") || s.includes("dieta") || s.includes("obesita")) return "nutrizione";
  if (s.includes("esotico") || s.includes("rettil") || s.includes("pappagallo")) return "animali-esotici";
  if (s.includes("equino") || s.includes("rurale") || s.includes("cavallo") || s.includes("mucca") || s.includes("pecora"))
    return "rurale";
  if (s.includes("toelett") || s.includes("pet-sitter") || s.includes("dog-walking") || s.includes("asilo")) return "cura";
  if (s.includes("odontoiat") || s.includes("dentale")) return "odontoiatria";
  if (s.includes("fisio") || s.includes("riabilit")) return "riabilitazione";
  return "visita";
}
