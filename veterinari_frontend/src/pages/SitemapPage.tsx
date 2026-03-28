import { useEffect, useRef } from "react";
import { generateSitemapXml } from "@/lib/sitemap";

/**
 * Client-side fallback for sitemap rendering.
 * In production, /sitemap.xml is a static file generated at build time.
 * This page at /sitemap-dynamic serves as a dev/fallback viewer.
 */
export default function SitemapPage() {
  const ref = useRef<HTMLPreElement>(null);

  useEffect(() => {
    const xml = generateSitemapXml();
    if (ref.current) {
      ref.current.textContent = xml;
    }
  }, []);

  return (
    <div className="bg-white min-h-screen p-4">
      <pre
        ref={ref}
        className="text-xs font-mono whitespace-pre-wrap break-all text-gray-800"
        style={{ maxWidth: "100vw" }}
      >
        Generazione sitemap in corso…
      </pre>
    </div>
  );
}
