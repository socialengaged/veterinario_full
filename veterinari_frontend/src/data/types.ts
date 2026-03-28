// ── Types for the entire local SEO data system ──

export interface Region {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  provinces: string[];
  featuredCities: string[];
}

export interface Province {
  slug: string;
  name: string;
  regionSlug: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  cities: string[];
  cap?: string;
}

export interface City {
  slug: string;
  name: string;
  provinceSlug: string;
  regionSlug: string;
  cap: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  population?: string;
  nearbyCities: string[];
}

export type ServiceCategory = "diagnostica" | "specialistica" | "prevenzione" | "nutrizione" | "emergenza" | "generale" | "cura";

export interface ServicePage {
  slug: string;
  name: string;
  category?: ServiceCategory;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  definition: string;
  bulletPoints: string[];
  commonSituations: string[];
  emergencySigns: string[];
  whenToSeek: string;
  whatToExpect: string;
  whoIsFor: string;
  disclaimer: string;
  relatedServices: string[];
  icon: string;
  faq: { q: string; a: string }[];
}

export interface Clinic {
  slug: string;
  name: string;
  type: "clinica" | "ambulatorio" | "veterinario";
  citySlug: string;
  provinceSlug: string;
  regionSlug: string;
  address?: string;
  phone?: string;
  email?: string;
  lat?: number;
  lng?: number;
  image?: string;
  services: string[];
  animals: string[];
  openingHours?: string;
  emergencyAvailable: boolean;
  homeVisits: boolean;
  verified: boolean;
  featured: boolean;
  lastUpdated: string;
  description: string;
  ctaLabel: string;
  metaTitle: string;
  metaDescription: string;
  // CSV-imported fields
  website?: string;
  googleRating?: number;
  googleReviewsCount?: number;
  businessStatus?: string;
  source?: string;
  googleTypes?: string;
  // Scraped enrichment fields
  scrapedServices?: string[];
  scrapedPhones?: string[];
  scrapedEmails?: string[];
}

export interface Guide {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  definition: string;
  intro: string;
  keyPoints: string[];
  commonSituations: string[];
  emergencySigns: string[];
  whenToContact: string;
  whatToPrepare: string;
  content: string;
  relatedServices: string[];
  relatedCities: string[];
  animal?: string;
  disclaimer: string;
  faq: { q: string; a: string }[];
}

export interface FaqCluster {
  id: string;
  title: string;
  context: string; // "general" | "emergency" | "services" | city slug etc.
  items: { q: string; a: string }[];
}

// ── Service + Animal combo pages ──
export interface ServiceAnimalPage {
  slug: string;
  serviceSlug: string;
  animalId: string;
  animalName: string;
  animalEmoji: string;
  serviceName: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  answerSummary: string;
  quickFacts: { label: string; value: string }[];
  intro: string;
  whatIncludes: string[];
  whenToDo: { title: string; description: string }[];
  warningSignsTitle: string;
  warningSigns: string[];
  ageGuidance: { stage: string; recommendation: string }[];
  costRange?: string;
  faq: { q: string; a: string }[];
  relatedServiceAnimals: string[];
  disclaimer: string;
}
