// ── Centralized data access layer ──
// All templates consume data through these helpers.
// Hand-crafted data takes priority over CSV imports.
// To update CSV data, replace src/data/veterinari.csv and rebuild.

import { regions } from "./regions";
import { provinces } from "./provinces";
import { cities } from "./cities";
import { services } from "./services";
import { clinics } from "./clinics";
import { guides } from "./guides";
import { faqClusters } from "./faqs";
import { serviceAnimalPages } from "./service-animals";
import { farmAnimalPages } from "./service-animals-farm";
import { generatedServiceAnimalPages } from "./service-animals-generated";
import { importedClinics, csvProvinces, csvCities, csvImportStats } from "./csv-importer";
import { enrichmentMap } from "./csv-enricher";
import type { Region, Province, City, ServicePage, Clinic, Guide, FaqCluster, ServiceAnimalPage } from "./types";

export type { Region, Province, City, ServicePage, Clinic, Guide, FaqCluster, ServiceAnimalPage };

// Hand-written pages override generated ones for richer content
const allServiceAnimalPages: Record<string, ServiceAnimalPage> = {
  ...generatedServiceAnimalPages,
  ...serviceAnimalPages,
  ...farmAnimalPages,
};

// ── Merged data: hand-crafted overrides CSV imports ──

// Clinics: CSV first, then hand-crafted on top (hand-crafted wins)
const allClinicsMap: Record<string, Clinic> = {
  ...importedClinics,
  ...clinics,
};

// Apply enrichment data (scraped services, phones, emails) to all clinics
for (const [slug, enrichment] of Object.entries(enrichmentMap)) {
  const clinic = allClinicsMap[slug];
  if (clinic) {
    if (enrichment.scrapedServices.length) clinic.scrapedServices = enrichment.scrapedServices;
    if (enrichment.scrapedPhones.length) clinic.scrapedPhones = enrichment.scrapedPhones;
    if (enrichment.scrapedEmails.length) clinic.scrapedEmails = enrichment.scrapedEmails;
  }
}

// Provinces: CSV-generated first, then hand-crafted on top
const allProvincesMap: Record<string, Province> = {
  ...csvProvinces,
  ...provinces,
};

// Cities: CSV-generated first, then hand-crafted on top
const allCitiesMap: Record<string, City> = {
  ...csvCities,
  ...cities,
};

// Ensure all regions have their province lists updated
const allRegionsMap: Record<string, Region> = { ...regions };
for (const prov of Object.values(allProvincesMap)) {
  const region = allRegionsMap[prov.regionSlug];
  if (region && !region.provinces.includes(prov.slug)) {
    region.provinces.push(prov.slug);
  }
}

// Update region featuredCities from cities that have clinics
for (const city of Object.values(allCitiesMap)) {
  const region = allRegionsMap[city.regionSlug];
  if (region && !region.featuredCities.includes(city.slug)) {
    // Only add cities that have clinics
    const hasClinics = Object.values(allClinicsMap).some(c => c.citySlug === city.slug);
    if (hasClinics && region.featuredCities.length < 15) {
      region.featuredCities.push(city.slug);
    }
  }
}

// Log import stats in dev
if (import.meta.env.DEV) {
  console.log(`[CSV Import] ${csvImportStats.totalClinics} cliniche importate, ${csvImportStats.totalCities} città, ${csvImportStats.totalProvinces} province`);
  console.log(`[Data Totals] ${Object.keys(allClinicsMap).length} cliniche, ${Object.keys(allCitiesMap).length} città, ${Object.keys(allProvincesMap).length} province`);
}

// Regions
export const getRegion = (slug: string): Region | undefined => allRegionsMap[slug];
export const getAllRegions = (): Region[] => Object.values(allRegionsMap);

// Provinces
export const getProvince = (slug: string): Province | undefined => allProvincesMap[slug];
export const getProvincesByRegion = (regionSlug: string): Province[] =>
  Object.values(allProvincesMap).filter((p) => p.regionSlug === regionSlug);

// Cities
export const getCity = (slug: string): City | undefined => allCitiesMap[slug];
export const getCitiesByProvince = (provinceSlug: string): City[] =>
  Object.values(allCitiesMap).filter((c) => c.provinceSlug === provinceSlug);
export const getAllCities = (): City[] => Object.values(allCitiesMap);

// Services
export const getService = (slug: string): ServicePage | undefined => services[slug];
export const getAllServices = (): ServicePage[] => Object.values(services);

// Clinics
export const getClinic = (slug: string): Clinic | undefined => allClinicsMap[slug];
export const getClinicsByCity = (citySlug: string): Clinic[] =>
  Object.values(allClinicsMap).filter((c) => c.citySlug === citySlug);
export const getClinicsByService = (serviceSlug: string): Clinic[] =>
  Object.values(allClinicsMap).filter((c) => c.services.includes(serviceSlug));
export const getClinicsByAnimal = (animalId: string): Clinic[] =>
  Object.values(allClinicsMap).filter((c) => c.animals.includes(animalId));
export const getFeaturedClinics = (): Clinic[] =>
  Object.values(allClinicsMap).filter((c) => c.featured);
export const getClinicsWithHomeVisits = (): Clinic[] =>
  Object.values(allClinicsMap).filter((c) => c.homeVisits);
export const getClinicsWithEmergency = (): Clinic[] =>
  Object.values(allClinicsMap).filter((c) => c.emergencyAvailable);
export const getAllClinics = (): Clinic[] => Object.values(allClinicsMap);

// Guides
export const getGuide = (slug: string): Guide | undefined => guides[slug];
export const getAllGuides = (): Guide[] => Object.values(guides);

// FAQs
export const getFaqsByContext = (context: string): FaqCluster[] =>
  faqClusters.filter((f) => f.context === context);
export const getAllFaqs = (): FaqCluster[] => faqClusters;
export const getFaqCluster = (id: string): FaqCluster | undefined =>
  faqClusters.find((f) => f.id === id);

// Service + Animal pages
export const getServiceAnimalPage = (slug: string): ServiceAnimalPage | undefined =>
  allServiceAnimalPages[slug];
export const getAllServiceAnimalPages = (): ServiceAnimalPage[] =>
  Object.values(allServiceAnimalPages);
export const getServiceAnimalPagesByService = (serviceSlug: string): ServiceAnimalPage[] =>
  Object.values(allServiceAnimalPages).filter((p) => p.serviceSlug === serviceSlug);
