import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SmartFinder, FinderResult } from "@/components/SmartFinder";
import { TrustBadge } from "@/components/TrustBadge";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { PageMeta } from "@/components/PageMeta";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { ArrowRight } from "lucide-react";
import { faqJsonLd, webPageJsonLd, itemListJsonLd } from "@/lib/seo";
import { getHomepageFaqs } from "@/pages/homepageFaqs";

const IndexBelowFold = lazy(() => import("./IndexBelowFold"));

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5 },
};

const Index = () => {
  const navigate = useNavigate();
  const homepageFaqs = getHomepageFaqs(siteConfig.listedClinicCount);

  const handleFinderComplete = (result: FinderResult) => {
    const params = new URLSearchParams({
      animale: result.animal,
      servizio: result.service,
      sottoservizio: result.subService,
      citta: result.location,
    });
    navigate(`/richiedi-assistenza/?${params.toString()}`);
  };

  return (
    <>
      <PageMeta
        title={siteConfig.meta.title}
        description={siteConfig.meta.description}
        canonical="/"
        jsonLd={[
          webPageJsonLd({ title: siteConfig.meta.title, description: siteConfig.meta.description, url: "/" }),
          faqJsonLd(homepageFaqs),
          itemListJsonLd({
            name: "Servizi veterinari",
            description: "Tutti i servizi veterinari disponibili su VeterinarioVicino.it",
            url: "/servizi/",
            items: [
              { name: "Visita veterinaria", url: "/visita-veterinaria/" },
              { name: "Vaccinazioni", url: "/vaccinazioni/" },
              { name: "Chirurgia veterinaria", url: "/chirurgia-veterinaria/" },
              { name: "Check-up veterinario", url: "/check-up-veterinario/" },
              { name: "Dermatologia veterinaria", url: "/dermatologia-veterinaria/" },
              { name: "Ortopedia veterinaria", url: "/ortopedia-veterinaria/" },
              { name: "Nutrizione veterinaria", url: "/nutrizione-veterinaria/" },
            ],
          }),
        ]}
      />
      <Header />
      <main>
        <section className="bg-background pt-12 pb-16 md:pt-20 md:pb-24">
          <div className="container text-center max-w-3xl">
            <motion.h1
              className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Cerca un <span className="text-primary">veterinario</span>{" "}
              <span className="text-secondary">vicino a te</span>
            </motion.h1>
            <motion.p
              className="text-lg text-muted-foreground max-w-xl mx-auto mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Cerca veterinari e cliniche veterinarie nella tua zona.
              {siteConfig.name}: servizio gratuito di ricerca e contatto veterinario in {siteConfig.initialArea}.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
            >
              <SmartFinder onComplete={handleFinderComplete} />
            </motion.div>
          </div>
        </section>

        <section className="border-y border-border bg-surface py-6">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <TrustBadge icon="🏥" title="Rete veterinaria locale" description="Cliniche e professionisti del territorio" />
              <TrustBadge icon="📋" title="Inoltro richieste" description="Trasmettiamo la tua richiesta ai veterinari della zona" />
              <TrustBadge icon="📞" title="Contatto diretto" description="Supporto chiaro e trasparente" />
              <TrustBadge icon="📍" title={`Attivo in ${siteConfig.initialArea}`} description="In espansione in tutta Italia" />
            </div>
          </div>
        </section>

        <section id="come-funziona" className="py-16 md:py-24 bg-background">
          <div className="container max-w-4xl">
            <motion.div {...fadeUp} className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">Come funziona</h2>
              <p className="text-muted-foreground max-w-lg mx-auto">Un percorso semplice per trovare assistenza veterinaria nella tua zona.</p>
            </motion.div>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { num: "1", title: "Seleziona l'animale", desc: "Scegli il tipo di animale che ha bisogno di cure" },
                { num: "2", title: "Indica il servizio", desc: "Seleziona il tipo di visita o assistenza necessaria" },
                { num: "3", title: "Indica la zona", desc: "Inserisci la città o attiva la geolocalizzazione" },
                { num: "4", title: "Vieni ricontattato", desc: "La tua richiesta viene inoltrata ai veterinari della zona" },
              ].map((s, i) => (
                <motion.div key={i} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.1 }} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground font-display font-bold text-xl flex items-center justify-center mx-auto mb-4">{s.num}</div>
                  <h3 className="font-display font-semibold text-foreground mb-1">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="servizi" className="py-16 md:py-24 bg-surface">
          <div className="container">
            <motion.div {...fadeUp} className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">I nostri servizi veterinari</h2>
              <p className="text-muted-foreground">Le prestazioni veterinarie che puoi richiedere attraverso la nostra piattaforma.</p>
            </motion.div>

            <motion.div {...fadeUp} className="mb-8">
              <div className="grid sm:grid-cols-2 gap-5">
                <Link to="/visita-veterinaria/" className="group p-6 rounded-2xl border-2 border-primary/20 bg-primary/5 hover:border-primary/40 hover:shadow-lg transition-all">
                  <div className="text-4xl mb-3">🩺</div>
                  <h3 className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">Visita veterinaria</h3>
                  <p className="text-sm text-muted-foreground">Visita di base, prima visita e controllo generale per il tuo animale domestico.</p>
                </Link>
                <Link to="/check-up-veterinario/" className="group p-6 rounded-2xl border-2 border-primary/20 bg-primary/5 hover:border-primary/40 hover:shadow-lg transition-all">
                  <div className="text-4xl mb-3">📋</div>
                  <h3 className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">Check-up annuale</h3>
                  <p className="text-sm text-muted-foreground">Controllo periodico completo per prevenire patologie e mantenere il benessere del tuo animale.</p>
                </Link>
              </div>
            </motion.div>

            <motion.div {...fadeUp} className="mb-8">
              <div className="grid sm:grid-cols-3 gap-5">
                <Link to="/chirurgia-veterinaria/" className="group p-6 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-md transition-all">
                  <div className="text-3xl mb-3">🏥</div>
                  <h3 className="font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-1">Chirurgia veterinaria</h3>
                  <p className="text-sm text-muted-foreground">Interventi chirurgici programmati con anestesia e monitoraggio.</p>
                </Link>
                <Link to="/sterilizzazione-veterinaria/" className="group p-6 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-md transition-all">
                  <div className="text-3xl mb-3">✂️</div>
                  <h3 className="font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-1">Sterilizzazione e castrazione</h3>
                  <p className="text-sm text-muted-foreground">Sterilizzazione e castrazione sicure per cani, gatti e altri animali domestici.</p>
                </Link>
                <Link to="/consulenza-veterinaria-online/" className="group p-6 rounded-xl border-2 border-primary/30 bg-primary/5 hover:border-primary/50 hover:shadow-lg transition-all">
                  <div className="text-3xl mb-3">💻</div>
                  <h3 className="font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-1">Veterinario online</h3>
                  <p className="text-sm text-muted-foreground">Consulenza veterinaria in videochiamata: parla con un veterinario da casa tua.</p>
                </Link>
              </div>
            </motion.div>

            <motion.div {...fadeUp}>
              <h3 className="font-display text-xl font-bold text-foreground mb-2 text-center">Cura e benessere animale</h3>
              <p className="text-sm text-muted-foreground text-center mb-5 max-w-lg mx-auto">
                Pensione, pet sitter, passeggiate e toelettatura: servizi per il benessere quotidiano del tuo animale.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { slug: "asilo-per-animali", icon: "🏡", name: "Asilo e Pensione", desc: "Strutture sicure per ospitare il tuo animale durante le assenze" },
                  { slug: "pet-sitter", icon: "🧑‍🤝‍🧑", name: "Pet Sitter", desc: "Assistenza personalizzata a domicilio per il tuo animale" },
                  { slug: "dog-walking", icon: "🐕‍🦺", name: "Dog Walking", desc: "Passeggiate professionali per mantenere il cane attivo e felice" },
                  { slug: "toelettatura", icon: "✂️🐾", name: "Toelettatura e Grooming", desc: "Igiene, taglio pelo e cura estetica professionale" },
                ].map((s) => (
                  <Link
                    key={s.slug}
                    to={`/${s.slug}/`}
                    className="group p-5 rounded-2xl border-2 border-secondary/20 bg-secondary/5 hover:border-secondary/40 hover:shadow-lg transition-all flex items-start gap-4"
                  >
                    <span className="text-3xl flex-shrink-0">{s.icon}</span>
                    <div>
                      <h4 className="font-display font-bold text-foreground group-hover:text-primary transition-colors mb-1">{s.name}</h4>
                      <p className="text-xs text-muted-foreground">{s.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>

            <motion.div {...fadeUp} className="mt-8">
              <h3 className="font-display text-xl font-bold text-foreground mb-5 text-center">Servizi specialistici</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {[
                  { slug: "dermatologia-veterinaria", icon: "🔬", name: "Dermatologia" },
                  { slug: "ortopedia-veterinaria", icon: "🦴", name: "Ortopedia" },
                  { slug: "oncologia-veterinaria", icon: "🎗️", name: "Oncologia" },
                  { slug: "cardiologia-veterinaria", icon: "❤️", name: "Cardiologia" },
                  { slug: "oftalmologia-veterinaria", icon: "👁️", name: "Oftalmologia" },
                  { slug: "neurologia-veterinaria", icon: "🧠", name: "Neurologia" },
                  { slug: "endocrinologia-veterinaria", icon: "⚗️", name: "Endocrinologia" },
                  { slug: "nutrizione-veterinaria", icon: "🥗", name: "Nutrizione" },
                ].map((s) => (
                  <Link
                    key={s.slug}
                    to={`/${s.slug}/`}
                    className="group flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-sm transition-all"
                  >
                    <span className="text-2xl">{s.icon}</span>
                    <span className="font-display text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{s.name}</span>
                  </Link>
                ))}
              </div>
            </motion.div>

            <div className="text-center mt-6">
              <Button variant="outline" size="sm" asChild>
                <Link to="/servizi/">
                  Vedi tutti i servizi <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <Suspense
          fallback={
            <div className="min-h-[12rem] border-y border-border/60 bg-muted/20 flex items-center justify-center" aria-hidden>
              <div className="h-6 w-6 animate-spin rounded-full border-[3px] border-primary border-t-transparent" />
            </div>
          }
        >
          <IndexBelowFold faqItems={homepageFaqs} />
        </Suspense>
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default Index;
