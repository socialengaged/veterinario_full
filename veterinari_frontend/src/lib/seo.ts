// ── JSON-LD Structured Data Utilities ──
// Generates schema.org JSON-LD for SEO and AI-search readability.

import { siteConfig } from "@/config/site";

export interface BreadcrumbItem {
  name: string;
  url?: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface LocalBusinessData {
  name: string;
  type?: string;
  address?: string;
  city?: string;
  province?: string;
  region?: string;
  postalCode?: string;
  phone?: string;
  email?: string;
  url?: string;
  openingHours?: string;
  description?: string;
  services?: string[];
  emergencyAvailable?: boolean;
}

// ── Organization ──
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    contactPoint: {
      "@type": "ContactPoint",
      email: siteConfig.contact.email,
      telephone: siteConfig.contact.phone,
      contactType: "customer service",
      availableLanguage: "Italian",
    },
    areaServed: {
      "@type": "Place",
      name: "Italia",
    },
  };
}

// ── WebSite (with SearchAction for sitelinks search box) ──
export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "it",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/elenco/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

// ── BreadcrumbList ──
export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  const baseUrl = siteConfig.url;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      ...items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: item.name,
        ...(item.url ? { item: `${baseUrl}${item.url}` } : {}),
      })),
    ],
  };
}

// ── FAQPage ──
export function faqJsonLd(items: FaqItem[]) {
  if (!items.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

// ── LocalBusiness / VeterinaryCare (real clinic) ──
export function localBusinessJsonLd(data: LocalBusinessData) {
  return {
    "@context": "https://schema.org",
    "@type": "VeterinaryCare",
    name: data.name,
    description: data.description,
    ...(data.url ? { url: `${siteConfig.url}${data.url}` } : {}),
    ...(data.phone ? { telephone: data.phone } : {}),
    ...(data.email ? { email: data.email } : {}),
    ...(data.openingHours ? { openingHoursSpecification: { "@type": "OpeningHoursSpecification", description: data.openingHours } } : {}),
    ...(data.address || data.city
      ? {
          address: {
            "@type": "PostalAddress",
            ...(data.address ? { streetAddress: data.address } : {}),
            ...(data.city ? { addressLocality: data.city } : {}),
            ...(data.province ? { addressRegion: data.province } : {}),
            ...(data.postalCode ? { postalCode: data.postalCode } : {}),
            addressCountry: "IT",
          },
        }
      : {}),
    ...(data.services?.length
      ? {
          makesOffer: data.services.map((s) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: s },
          })),
        }
      : {}),
  };
}

// ── VeterinaryCare (for city/area pages — NOT a real clinic) ──
export function veterinaryCareJsonLd(opts: {
  name: string;
  areaServed: string;
  serviceType?: string;
  url: string;
  description?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "VeterinaryCare",
    name: opts.name,
    url: `${siteConfig.url}${opts.url}`,
    ...(opts.description ? { description: opts.description } : {}),
    areaServed: {
      "@type": "City",
      name: opts.areaServed,
    },
    ...(opts.serviceType ? { additionalType: opts.serviceType } : {}),
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

// ── Service schema ──
export function serviceJsonLd(opts: {
  name: string;
  description: string;
  url: string;
  areaServed?: string;
  category?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    url: `${siteConfig.url}${opts.url}`,
    ...(opts.category ? { serviceType: opts.category } : {}),
    ...(opts.areaServed
      ? { areaServed: { "@type": "Place", name: opts.areaServed } }
      : { areaServed: { "@type": "Country", name: "Italia" } }),
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

// ── ItemList (for listing pages) ──
export function itemListJsonLd(opts: {
  name: string;
  description?: string;
  url: string;
  items: { name: string; url: string; position?: number }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: opts.name,
    ...(opts.description ? { description: opts.description } : {}),
    url: `${siteConfig.url}${opts.url}`,
    numberOfItems: opts.items.length,
    itemListElement: opts.items.map((item, i) => ({
      "@type": "ListItem",
      position: item.position || i + 1,
      name: item.name,
      url: `${siteConfig.url}${item.url}`,
    })),
  };
}

// ── WebPage ──
export function webPageJsonLd(opts: {
  title: string;
  description: string;
  url: string;
  dateModified?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: opts.title,
    description: opts.description,
    url: `${siteConfig.url}${opts.url}`,
    isPartOf: { "@type": "WebSite", name: siteConfig.name, url: siteConfig.url },
    ...(opts.dateModified ? { dateModified: opts.dateModified } : {}),
    inLanguage: "it",
  };
}

// ── Article (for guides) ──
export function articleJsonLd(opts: {
  title: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    url: `${siteConfig.url}${opts.url}`,
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    inLanguage: "it",
    ...(opts.datePublished ? { datePublished: opts.datePublished } : {}),
    ...(opts.dateModified ? { dateModified: opts.dateModified } : {}),
  };
}

// ── AboutPage (for province/region territory pages with aggregated data) ──
export function aboutPageJsonLd(opts: {
  name: string;
  description: string;
  url: string;
  areaServed: string;
  regionName: string;
  level?: "province" | "region";
  population?: number;
  totalCities?: number;
  citiesWithClinics?: number;
  totalClinics?: number;
  dateModified?: string;
}) {
  const level = opts.level || "province";
  const areaLabel = level === "region" ? opts.areaServed : `Provincia di ${opts.areaServed}`;

  const aboutPlace = level === "region"
    ? {
        "@type": "AdministrativeArea" as const,
        name: opts.areaServed,
        containedInPlace: { "@type": "Country" as const, name: "Italia" },
        ...(opts.population ? { population: opts.population } : {}),
      }
    : {
        "@type": "AdministrativeArea" as const,
        name: `Provincia di ${opts.areaServed}`,
        containedInPlace: {
          "@type": "AdministrativeArea" as const,
          name: opts.regionName,
          containedInPlace: { "@type": "Country" as const, name: "Italia" },
        },
        ...(opts.population ? { population: opts.population } : {}),
      };

  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: opts.name,
    description: opts.description,
    url: `${siteConfig.url}${opts.url}`,
    inLanguage: "it",
    isPartOf: { "@type": "WebSite", name: siteConfig.name, url: siteConfig.url },
    about: aboutPlace,
    mainEntity: {
      "@type": "MedicalOrganization",
      name: `Servizi veterinari ${level === "region" ? "in" : "in provincia di"} ${opts.areaServed}`,
      areaServed: { "@type": "AdministrativeArea", name: areaLabel },
      ...(opts.totalClinics
        ? { numberOfEmployees: { "@type": "QuantitativeValue", value: opts.totalClinics, unitText: "strutture veterinarie" } }
        : {}),
    },
    ...(opts.dateModified ? { dateModified: opts.dateModified } : {}),
  };
}
