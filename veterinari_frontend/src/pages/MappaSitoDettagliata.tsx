import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageMeta } from "@/components/PageMeta";
import { siteConfig } from "@/config/site";
import {
  getAllRegions, getProvincesByRegion,
  getPublicServices, getAllGuides, getAllClinics, getAllServiceAnimalPages,
} from "@/data";
import {
  animalKeywordPages, specialtyKeywordPages,
  cityKeywordPatterns, animalCityKeywordPatterns, serviceCityKeywordPatterns,
} from "@/data/keywords";
import { ChevronDown, ChevronRight, MapPin, Stethoscope, BookOpen, Building2, PawPrint, Search, FileText } from "lucide-react";
import { useState, useMemo } from "react";

/* ── Collapsible Section ── */
function Section({ title, icon: Icon, count, children, defaultOpen = false }: {
  title: string; icon: React.ElementType; count: number; children: React.ReactNode; defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <section className="border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center gap-3 px-5 py-4 bg-card hover:bg-accent/40 transition-colors text-left"
      >
        <Icon className="h-5 w-5 text-primary flex-shrink-0" />
        <span className="font-display font-bold text-foreground flex-1">{title}</span>
        <span className="text-xs text-muted-foreground bg-muted px-2.5 py-0.5 rounded-full">{count}</span>
        {open ? <ChevronDown className="h-4 w-4 text-muted-foreground" /> : <ChevronRight className="h-4 w-4 text-muted-foreground" />}
      </button>
      {open && <div className="px-5 py-5 border-t border-border bg-background">{children}</div>}
    </section>
  );
}

/* ── Link item ── */
function SitemapLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <li>
      <Link to={to} className="text-sm text-primary hover:underline hover:text-primary/80 transition-colors">
        {children}
      </Link>
    </li>
  );
}

export default function MappaSitoDettagliata() {
  const regions = useMemo(() => getAllRegions().sort((a, b) => a.name.localeCompare(b.name)), []);
  const services = useMemo(() => getPublicServices(), []);
  const guides = useMemo(() => getAllGuides(), []);
  const clinics = useMemo(() => getAllClinics(), []);
  const serviceAnimalPages = useMemo(() => getPublicServiceAnimalPages(), []);

  const totalClinics = clinics.length;

  const uniqueCities = useMemo(() => {
    const s = new Set<string>();
    clinics.forEach(c => s.add(c.citySlug));
    return s.size;
  }, [clinics]);

  const animalPages = Object.values(animalKeywordPages);
  const specialtyPages = Object.values(specialtyKeywordPages);

  return (
    <>
      <PageMeta
        title={`Mappa del sito — ${siteConfig.name}`}
        description={`Mappa del sito di ${siteConfig.name}: tutte le sezioni organizzate per categoria. Strutture veterinarie, servizi, guide e pagine locali.`}
        canonical="/mappa-sito-dettagliata/"
      />
      <Header />
      <main className="bg-background">
        <div className="container py-8 md:py-12 max-w-3xl">
          <h1 className="font-display text-3xl md:text-4xl font-extrabold text-foreground mb-2">
            Mappa del sito
          </h1>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Tutte le sezioni di <strong>{siteConfig.name}</strong> organizzate per categoria.
            Usa questa pagina per esplorare i contenuti del sito o trovare rapidamente ciò che cerchi.
          </p>

          <div className="space-y-3">

            {/* ── 1. Pagine principali ── */}
            <Section title="Pagine principali" icon={FileText} count={7} defaultOpen>
              <ul className="grid sm:grid-cols-2 gap-2">
                <SitemapLink to="/">Homepage</SitemapLink>
                <SitemapLink to="/servizi/">Tutti i servizi veterinari</SitemapLink>
                <SitemapLink to="/elenco/">Elenco strutture veterinarie</SitemapLink>
                <SitemapLink to="/richiedi-assistenza/">Invia richiesta di contatto</SitemapLink>
                <SitemapLink to="/guide/">Guide veterinarie</SitemapLink>
                <SitemapLink to="/come-funziona/">Come funziona</SitemapLink>
                <SitemapLink to="/mappa-sito/">Mappa semplificata</SitemapLink>
              </ul>
              <div className="mt-4 pt-3 border-t border-border">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Legale</p>
                <ul className="grid sm:grid-cols-2 gap-1.5">
                  <SitemapLink to="/privacy-policy/">Privacy Policy</SitemapLink>
                  <SitemapLink to="/cookie-policy/">Cookie Policy</SitemapLink>
                  <SitemapLink to="/termini-condizioni/">Termini e condizioni</SitemapLink>
                  <SitemapLink to="/veterinari-termini/">Termini per veterinari</SitemapLink>
                </ul>
              </div>
            </Section>

            {/* ── 2. Servizi veterinari ── */}
            <Section title="Servizi veterinari" icon={Stethoscope} count={services.length}>
              <div className="space-y-4">
                {["base", "diagnostica", "specialistica", "prevenzione", "nutrizione", "benessere"].map(cat => {
                  const catServices = services.filter(s => (s as any).category === cat || (!('category' in s) && cat === "base"));
                  if (!catServices.length) return null;
                  const labels: Record<string, string> = {
                    base: "Servizi di base", diagnostica: "Diagnostica", specialistica: "Specialistica",
                    prevenzione: "Prevenzione", nutrizione: "Nutrizione", benessere: "Benessere",
                  };
                  return (
                    <div key={cat}>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">{labels[cat]}</p>
                      <ul className="grid sm:grid-cols-2 gap-1.5">
                        {catServices.map(s => (
                          <SitemapLink key={s.slug} to={`/${s.slug}/`}>{s.name}</SitemapLink>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </Section>

            {/* ── 3. Servizio + Animale ── */}
            <Section title="Servizi per tipo di animale" icon={PawPrint} count={serviceAnimalPages.length}>
              <p className="text-sm text-muted-foreground mb-3">
                Pagine dedicate a ogni combinazione servizio + animale, ad esempio "Vaccinazioni gatto" o "Check-up cane".
              </p>
              <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-1.5">
                {serviceAnimalPages.sort((a, b) => a.slug.localeCompare(b.slug)).slice(0, 30).map(p => (
                  <SitemapLink key={p.slug} to={`/${p.slug}/`}>{p.serviceName} {p.animalName}</SitemapLink>
                ))}
              </ul>
              {serviceAnimalPages.length > 30 && (
                <p className="text-xs text-muted-foreground mt-3">
                  ...e altre {serviceAnimalPages.length - 30} combinazioni servizio + animale.
                </p>
              )}
            </Section>

            {/* ── 4. Veterinario per animale + specialità ── */}
            <Section title="Veterinari per animale e specialità" icon={PawPrint} count={animalPages.length + specialtyPages.length}>
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Per tipo di animale</p>
                  <ul className="grid sm:grid-cols-2 gap-1.5">
                    {animalPages.map(p => (
                      <SitemapLink key={p.slug} to={`/${p.slug}/`}>{p.emoji} {p.h1}</SitemapLink>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Per specialità</p>
                  <ul className="grid sm:grid-cols-2 gap-1.5">
                    {specialtyPages.map(p => (
                      <SitemapLink key={p.slug} to={`/${p.slug}/`}>{p.emoji} {p.specialtyName}</SitemapLink>
                    ))}
                  </ul>
                </div>
              </div>
            </Section>

            {/* ── 5. Pagine locali (regioni) ── */}
            <Section title="Pagine per zona geografica" icon={MapPin} count={regions.length}>
              <p className="text-sm text-muted-foreground mb-4">
                Il sito copre {regions.length} regioni, con pagine dedicate per ogni provincia e città con strutture veterinarie.
                Seleziona una regione per esplorare le province e i comuni disponibili.
              </p>
              <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {regions.map(r => {
                  const provCount = getProvincesByRegion(r.slug).length;
                  return (
                    <SitemapLink key={r.slug} to={`/${r.slug}/`}>
                      {r.name} ({provCount} prov.)
                    </SitemapLink>
                  );
                })}
              </ul>
            </Section>

            {/* ── 6. Ricerche locali (keyword + città) ── */}
            <Section title="Ricerche locali" icon={Search} count={cityKeywordPatterns.length + animalCityKeywordPatterns.length + serviceCityKeywordPatterns.length}>
              <p className="text-sm text-muted-foreground mb-4">
                Il sito genera automaticamente pagine per le ricerche più comuni combinando servizi, animali e città.
                Ecco i tipi di ricerca disponibili per ciascuna delle {uniqueCities} città coperte:
              </p>
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                    Ricerche generiche ({cityKeywordPatterns.length} tipi)
                  </p>
                  <ul className="grid sm:grid-cols-2 gap-1.5">
                    {cityKeywordPatterns.map(p => (
                      <li key={p.prefix} className="text-sm text-foreground">
                        {p.label}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                    Per animale + città ({animalCityKeywordPatterns.length} tipi)
                  </p>
                  <ul className="grid sm:grid-cols-2 gap-1.5">
                    {animalCityKeywordPatterns.map(p => (
                      <li key={p.prefix} className="text-sm text-foreground">
                        {p.emoji} {p.animalName} + città
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                    Per servizio + città ({serviceCityKeywordPatterns.length} tipi)
                  </p>
                  <ul className="grid sm:grid-cols-2 gap-1.5">
                    {serviceCityKeywordPatterns.map(p => (
                      <li key={p.prefix} className="text-sm text-foreground">
                        {p.emoji} {p.serviceName} + città
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Section>

            {/* ── 7. Strutture ── */}
            <Section title="Strutture veterinarie" icon={Building2} count={totalClinics}>
              <p className="text-sm text-muted-foreground mb-3">
                {totalClinics.toLocaleString("it-IT")} schede strutture con informazioni di contatto, servizi e mappa.
              </p>
              <Link
                to="/elenco/"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                Consulta l'elenco completo delle strutture →
              </Link>
            </Section>

            {/* ── 8. Guide ── */}
            <Section title="Guide veterinarie" icon={BookOpen} count={guides.length}>
              <ul className="grid sm:grid-cols-2 gap-2">
                {guides.map(g => (
                  <SitemapLink key={g.slug} to={`/guide/${g.slug}/`}>{g.title}</SitemapLink>
                ))}
              </ul>
            </Section>

          </div>

          {/* ── Link XML ── */}
          <p className="text-xs text-muted-foreground mt-8 text-center">
            <a href="/sitemap-dynamic" className="text-primary underline">Sitemap XML per motori di ricerca</a>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
