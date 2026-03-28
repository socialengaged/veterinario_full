import { useEffect } from "react";
import { siteConfig } from "@/config/site";
import { organizationJsonLd, webSiteJsonLd } from "@/lib/seo";

interface PageMetaProps {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  canonical?: string;
  robots?: string;
  jsonLd?: (Record<string, unknown> | null)[] | Record<string, unknown>;
}

// Global schemas injected on every page
const globalSchemas = [organizationJsonLd(), webSiteJsonLd()];

/** Normalize a path to always have a trailing slash */
function normalizeCanonical(path: string): string {
  if (!path) return "/";
  // Remove query strings and hashes
  const clean = path.split("?")[0].split("#")[0];
  return clean.endsWith("/") ? clean : clean + "/";
}

export function PageMeta({
  title,
  description,
  ogTitle,
  ogDescription,
  canonical,
  robots,
  jsonLd,
}: PageMetaProps) {
  useEffect(() => {
    document.title = title;

    const setMeta = (name: string, content: string, attr = "name") => {
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("description", description);
    setMeta("robots", robots || "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
    setMeta("og:title", ogTitle || title, "property");
    setMeta("og:description", ogDescription || description, "property");
    setMeta("og:type", "website", "property");
    setMeta("og:locale", "it_IT", "property");
    setMeta("og:site_name", siteConfig.name, "property");

    // Canonical — always enforce trailing slash, strip query params
    const canonicalPath = canonical
      ? normalizeCanonical(canonical)
      : normalizeCanonical(window.location.pathname);
    const canonicalUrl = `${siteConfig.url}${canonicalPath}`;

    setMeta("og:url", canonicalUrl, "property");

    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = canonicalUrl;

    // JSON-LD injection: global schemas + page-specific
    const existingScripts = document.querySelectorAll('script[data-seo-jsonld]');
    existingScripts.forEach((s) => s.remove());

    const pageSchemas = jsonLd
      ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd])
      : [];

    [...globalSchemas, ...pageSchemas].filter(Boolean).forEach((schema) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-seo-jsonld", "true");
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    return () => {
      document.querySelectorAll('script[data-seo-jsonld]').forEach((s) => s.remove());
    };
  }, [title, description, ogTitle, ogDescription, canonical, robots, jsonLd]);

  return null;
}
