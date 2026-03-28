import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageMeta } from "@/components/PageMeta";
import { Link } from "react-router-dom";
import { generateSitemapEntries } from "@/lib/sitemap";
import { siteConfig } from "@/config/site";
import { useState } from "react";

export default function SitemapHtmlPage() {
  const [entries] = useState(() => generateSitemapEntries());

  const grouped = entries.reduce<Record<string, { loc: string; path: string }[]>>((acc, e) => {
    const path = e.loc.replace(siteConfig.url, "") || "/";
    let group = "Altre";
    if (path === "/") group = "Homepage";
    else if (path.startsWith("/guide")) group = "Guide";
    else if (path.startsWith("/struttura/") || path.startsWith("/veterinario/")) group = "Strutture";
    else if (path.includes("/") && path.split("/").filter(Boolean).length >= 2) group = "Pagine locali";
    else if (path.startsWith("/veterinario-") || path.startsWith("/clinica-") || path.startsWith("/pronto-soccorso-")) group = "Ricerche";
    else group = "Servizi e pagine";
    if (!acc[group]) acc[group] = [];
    acc[group].push({ loc: e.loc, path });
    return acc;
  }, {});

  const order = ["Homepage", "Servizi e pagine", "Guide", "Pagine locali", "Ricerche", "Strutture", "Altre"];

  return (
    <>
      <PageMeta title="Mappa del sito — VeterinarioVicino.it" description="Elenco di tutte le pagine del sito." />
      <Header />
      <main className="bg-background">
        <div className="container py-8 md:py-12 max-w-3xl">
          <h1 className="font-display text-2xl font-extrabold text-foreground mb-2">Mappa del sito</h1>
          <p className="text-sm text-muted-foreground mb-6">
            {entries.length.toLocaleString("it-IT")} pagine •{" "}
            <Link to="/mappa-sito-dettagliata/" className="text-primary underline">Mappa organizzata per sezioni</Link> •{" "}
            <a href="/sitemap-dynamic" className="text-primary underline">XML</a>
          </p>
          {order.map(group => {
            const items = grouped[group];
            if (!items?.length) return null;
            // For huge groups, show summary + link
            if (items.length > 100) {
              return (
                <section key={group} className="mb-6">
                  <h2 className="font-display text-base font-bold text-foreground mb-1">
                    {group} <span className="text-sm font-normal text-muted-foreground">({items.length.toLocaleString("it-IT")})</span>
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {items.length.toLocaleString("it-IT")} pagine in questa sezione.{" "}
                    <Link to="/mappa-sito-dettagliata/" className="text-primary underline">Vedi mappa organizzata →</Link>
                  </p>
                </section>
              );
            }
            return (
              <section key={group} className="mb-6">
                <h2 className="font-display text-base font-bold text-foreground mb-2">
                  {group} <span className="text-sm font-normal text-muted-foreground">({items.length})</span>
                </h2>
                <ul className="grid sm:grid-cols-2 gap-1">
                  {items.map(e => (
                    <li key={e.path}>
                      <Link to={e.path} className="text-sm text-primary hover:underline truncate block">{e.path}</Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </main>
      <Footer />
    </>
  );
}
