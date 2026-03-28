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
    emergenza: "emergenze",
    riabilitazione: "visita_generica",
    odontoiatria: "chirurgia",
    cura: "visita_generica",
    "animali-esotici": "visita_generica",
    rurale: "visita_generica",
  };
  return byCategory[categoryId] ?? "visita_generica";
}
