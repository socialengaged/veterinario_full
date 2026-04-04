import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { TrustModules } from "@/components/TrustModules";
import { FaqSection } from "@/components/FaqSection";
import { VetDisclaimer } from "@/components/VetDisclaimer";
import { Button } from "@/components/ui/button";
import { siteConfig, coveredAreas, animalCategories } from "@/config/site";
import { guides } from "@/data/guides";
import { ArrowRight, MapPin, Building2, BookOpen } from "lucide-react";
import type { HomepageFaqItem } from "@/pages/homepageFaqs";

// Lazy-load componenti che dipendono dal dataset cliniche (4.1MB)
// Vengono caricati solo quando l'utente scrolla fino a questa sezione
const HomepageClinics = lazy(() => import("@/components/HomepageClinics").then(m => ({ default: m.HomepageClinics })));
const NearbyClinics = lazy(() => import("@/components/NearbyClinics").then(m => ({ default: m.NearbyClinics })));

const ClinicsLoader = () => (
  <div className="py-12 bg-surface border-b border-border flex items-center justify-center">
    <div className="h-6 w-6 animate-spin rounded-full border-[3px] border-primary border-t-transparent" />
  </div>
);

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5 },
};

type Props = { faqItems: HomepageFaqItem[] };

export default function IndexBelowFold({ faqItems }: Props) {
  const topGuides = Object.values(guides).slice(0, 3);

  return (
    <>
      <Suspense fallback={<ClinicsLoader />}>
        <NearbyClinics />
      </Suspense>

      <Suspense fallback={<ClinicsLoader />}>
        <HomepageClinics />
      </Suspense>

      <section className="py-12 bg-surface border-y border-border">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl border border-border bg-card">
              <h3 className="font-display font-semibold text-foreground mb-2 flex items-center gap-2">
                🏠 Visite a domicilio
              </h3>
              <p className="text-xs text-muted-foreground mb-3">
                Professionisti con servizio a domicilio nella tua zona
              </p>
              <Link
                to="/elenco/"
                className="inline-flex items-center text-xs font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Cerca veterinari a domicilio <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </div>

            <div className="p-5 rounded-xl border border-border bg-card">
              <h3 className="font-display font-semibold text-foreground mb-2 flex items-center gap-2">
                📍 Cerca per città
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {["lecce", "gallipoli", "nardo", "otranto", "maglie", "galatina", "tricase", "casarano"].map((slug) => (
                  <Link
                    key={slug}
                    to={`/puglia/lecce/${slug}/`}
                    className="px-2.5 py-1 rounded-full bg-accent text-accent-foreground text-[11px] font-medium hover:bg-primary hover:text-primary-foreground transition-colors capitalize"
                  >
                    {slug === "nardo" ? "Nardò" : slug.charAt(0).toUpperCase() + slug.slice(1)}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">Animali per cui puoi richiedere contatto</h2>
            <p className="text-muted-foreground">Dal cane al rettile, cerca strutture veterinarie disponibili nella tua zona.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {animalCategories.map((cat, ci) => (
              <motion.div
                key={cat.id}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: ci * 0.08 }}
                className="p-5 rounded-xl border border-border bg-card"
              >
                <h3 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2">
                  <span className="text-xl">{cat.emoji}</span> {cat.label}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cat.animals.map((a) => (
                    <span key={a.id} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-accent text-accent-foreground text-xs font-medium">
                      {a.emoji} {a.label}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="zone" className="py-16 md:py-24 bg-surface">
        <div className="container max-w-4xl">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">Zone attualmente coperte</h2>
            <p className="text-muted-foreground">
              Il servizio è attivo in <strong>{siteConfig.initialArea}</strong> e in continua espansione.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-5">
            {coveredAreas.map((area, i) => (
              <motion.div key={area.province} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.1 }}>
                <div className="p-5 rounded-xl border border-border bg-card">
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <h3 className="font-display font-semibold text-lg text-foreground">Provincia di {area.province}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {area.cities.map((city) => (
                      <span key={city} className="px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-medium">
                        {city}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" asChild>
              <Link to="/puglia/">
                Esplora tutte le zone <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <TrustModules />

      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-4xl">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">Guide utili</h2>
            <p className="text-muted-foreground">Risorse per aiutarti a prenderti cura del tuo animale.</p>
          </motion.div>
          <div className="grid gap-4 mb-8">
            {topGuides.map((g, i) => (
              <motion.div key={g.slug} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.08 }}>
                <Link
                  to={`/guide/${g.slug}/`}
                  className="group flex items-start gap-3 p-5 rounded-xl border border-border bg-card hover:shadow-md hover:border-primary/20 transition-all"
                >
                  <BookOpen className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors">{g.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{g.intro}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="text-center">
            <Button variant="outline" asChild>
              <Link to="/guide/">
                Tutte le guide <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="per-veterinari" className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container max-w-3xl text-center">
          <motion.div {...fadeUp}>
            <Building2 className="h-12 w-12 mx-auto mb-4 opacity-80" />
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">Sei un veterinario o gestisci una clinica?</h2>
            <p className="opacity-80 max-w-lg mx-auto mb-8">
              Entra nel nostro elenco e ricevi richieste da parte di proprietari
              di animali nella tua zona. Nessun costo di attivazione.
            </p>
            <Button variant="outline" size="lg" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
              Scopri come aderire <ArrowRight className="ml-1 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      <section id="faq" className="py-16 md:py-24 bg-background">
        <div className="container max-w-3xl">
          <motion.div {...fadeUp}>
            <FaqSection items={faqItems} />
            <div className="mt-8">
              <VetDisclaimer />
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
