import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SmartFinder, FinderResult } from "@/components/SmartFinder";
import { TrustBadge } from "@/components/TrustBadge";
import { ServiceCard } from "@/components/ServiceCard";
import { AnimalCard } from "@/components/AnimalCard";
import { ClinicCard } from "@/components/ClinicCard";
import { TrustModules } from "@/components/TrustModules";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { FaqSection } from "@/components/FaqSection";
import { PageMeta } from "@/components/PageMeta";
import { VetDisclaimer } from "@/components/VetDisclaimer";
import { Button } from "@/components/ui/button";
import { siteConfig, animals, popularServices, coveredAreas, animalCategories } from "@/config/site";
import { getClinicsWithHomeVisits, getAllGuides, getAllClinics } from "@/data";
import { HomepageClinics } from "@/components/HomepageClinics";
import { NearbyClinics } from "@/components/NearbyClinics";
import { ArrowRight, MapPin, Building2, BookOpen } from "lucide-react";
import { faqJsonLd, webPageJsonLd, itemListJsonLd } from "@/lib/seo";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5 },
};

const serviceSlugMap: Record<string, string> = {
  visita: "visita-veterinaria",
  vaccinazioni: "vaccinazioni",
  chirurgia: "chirurgia-veterinaria",
  domicilio: "veterinario-a-domicilio",
  esotici: "veterinario-animali-esotici",
  dermatologia: "dermatologia-veterinaria",
  ortopedia: "ortopedia-veterinaria",
  nutrizione: "nutrizione-veterinaria",
};

const Index = () => {
  const navigate = useNavigate();
  const homeVisitClinics = getClinicsWithHomeVisits();
  const totalClinics = getAllClinics().length;
  const guides = getAllGuides().slice(0, 3);

  const handleFinderComplete = (result: FinderResult) => {
    const params = new URLSearchParams({
      animale: result.animal,
      servizio: result.service,
      sottoservizio: result.subService,
      
      citta: result.location,
    });
    navigate(`/richiedi-assistenza/?${params.toString()}`);
  };

  const homepageFaqs = [
    { q: "Il servizio di VeterinarioVicino.it è gratuito?", a: `Sì, ${siteConfig.name} è completamente gratuito per chi cerca un veterinario. Il nostro obiettivo è facilitare il contatto tra utenti e strutture veterinarie nella tua zona.` },
    { q: "Come funziona il servizio?", a: `Dopo aver compilato il modulo, ${siteConfig.name} inoltra la tua richiesta a veterinari e strutture veterinarie della zona in base all'animale, al servizio richiesto e alla tua posizione. Il veterinario ti ricontatterà direttamente.` },
    { q: "In quali zone è attivo il servizio?", a: `Il servizio di ${siteConfig.name} è attivo in ${siteConfig.initialArea} con oltre ${totalClinics.toLocaleString("it-IT")} strutture veterinarie censite — tra veterinari, cliniche veterinarie e ambulatori. L'elenco è in continuo aggiornamento.` },
    { q: "Quanto tempo ci vuole per ricevere risposta?", a: "Le strutture rispondono di solito entro 24 ore lavorative. I tempi dipendono dalla disponibilità locale." },
    { q: `${siteConfig.name} fornisce consulenze veterinarie online?`, a: `No. ${siteConfig.name} non è un servizio medico, non fornisce consulenze veterinarie né prestazioni sanitarie: mette in contatto con strutture della zona.` },
    { q: "Posso scegliere il veterinario?", a: `${siteConfig.name} inoltra la tua richiesta alle strutture veterinarie della zona. Puoi anche esplorare autonomamente l'elenco delle strutture e contattarle direttamente.` },
  ];

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
        {/* ── Hero ── */}
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

        {/* ── Trust Strip ── */}
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

        {/* ── Come funziona ── */}
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

        {/* ── Servizi veterinari ── */}
        <section id="servizi" className="py-16 md:py-24 bg-surface">
          <div className="container">
            <motion.div {...fadeUp} className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">I nostri servizi veterinari</h2>
              <p className="text-muted-foreground">Le prestazioni veterinarie che puoi richiedere attraverso la nostra piattaforma.</p>
            </motion.div>

            {/* ── In primo piano: Visita + Check-up ── */}
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

            {/* ── Chirurgia e Sterilizzazione ── */}
            <motion.div {...fadeUp} className="mb-8">
              <div className="grid sm:grid-cols-2 gap-5">
                <Link to="/chirurgia-veterinaria/" className="group p-6 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-md transition-all">
                  <div className="text-3xl mb-3">🏥</div>
                  <h3 className="font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-1">Chirurgia veterinaria</h3>
                  <p className="text-sm text-muted-foreground">Interventi chirurgici programmati con anestesia e monitoraggio.</p>
                </Link>
                <Link to="/sterilizzazione-veterinaria/" className="group p-6 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-md transition-all">
                  <div className="text-3xl mb-3">✂️</div>
                  <h3 className="font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-1">Sterilizzazione e castrazione</h3>
                  <p className="text-sm text-muted-foreground">Sterilizzazione e castrazione sicure per cani, gatti e altri animali domestici.</p>
                </Link>
              </div>
            </motion.div>

            {/* ── Cura e benessere ── */}
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
                  <Link key={s.slug} to={`/${s.slug}/`}
                    className="group p-5 rounded-2xl border-2 border-secondary/20 bg-secondary/5 hover:border-secondary/40 hover:shadow-lg transition-all flex items-start gap-4">
                    <span className="text-3xl flex-shrink-0">{s.icon}</span>
                    <div>
                      <h4 className="font-display font-bold text-foreground group-hover:text-primary transition-colors mb-1">{s.name}</h4>
                      <p className="text-xs text-muted-foreground">{s.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* ── Servizi specialistici ── */}
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
                ].map((s, i) => (
                  <Link key={s.slug} to={`/${s.slug}/`}
                    className="group flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-sm transition-all">
                    <span className="text-2xl">{s.icon}</span>
                    <span className="font-display text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{s.name}</span>
                  </Link>
                ))}
              </div>
            </motion.div>

            <div className="text-center mt-6">
              <Button variant="outline" size="sm" asChild>
                <Link to="/servizi/">Vedi tutti i servizi <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </section>

        {/* ── Nearby clinics (geolocation) ── */}
        <NearbyClinics />

        {/* ── Featured clinics with region/province filters ── */}
        <HomepageClinics />

        {/* ── Quick find sections ── */}
        <section className="py-12 bg-surface border-y border-border">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Home visits */}
              <div className="p-5 rounded-xl border border-border bg-card">
                <h3 className="font-display font-semibold text-foreground mb-2 flex items-center gap-2">
                  🏠 Visite a domicilio
                </h3>
                <p className="text-xs text-muted-foreground mb-3">
                  {homeVisitClinics.length} professionisti con servizio a domicilio
                </p>
                <div className="space-y-1.5">
                  {homeVisitClinics.slice(0, 3).map(c => (
                    <Link key={c.slug} to={c.type === "veterinario" ? `/veterinario/${c.slug}/` : `/struttura/${c.slug}/`}
                      className="block text-xs font-medium text-foreground hover:text-primary transition-colors">
                      {c.name} — <span className="text-muted-foreground">{c.citySlug}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Quick city find */}
              <div className="p-5 rounded-xl border border-border bg-card">
                <h3 className="font-display font-semibold text-foreground mb-2 flex items-center gap-2">
                  📍 Cerca per città
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {["lecce", "gallipoli", "nardo", "otranto", "maglie", "galatina", "tricase", "casarano"].map(slug => (
                    <Link key={slug} to={`/puglia/lecce/${slug}/`}
                      className="px-2.5 py-1 rounded-full bg-accent text-accent-foreground text-[11px] font-medium hover:bg-primary hover:text-primary-foreground transition-colors capitalize">
                      {slug === "nardo" ? "Nardò" : slug.charAt(0).toUpperCase() + slug.slice(1)}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Animali ── */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container">
            <motion.div {...fadeUp} className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">Animali per cui puoi richiedere contatto</h2>
              <p className="text-muted-foreground">Dal cane al rettile, cerca strutture veterinarie disponibili nella tua zona.</p>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {animalCategories.map((cat, ci) => (
                <motion.div key={cat.id} {...fadeUp} transition={{ ...fadeUp.transition, delay: ci * 0.08 }}
                  className="p-5 rounded-xl border border-border bg-card">
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

        {/* ── Zone coperte ── */}
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
                <Link to="/puglia/">Esplora tutte le zone <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </section>

        {/* ── Trust modules ── */}
        <TrustModules />

        {/* ── Guides preview ── */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container max-w-4xl">
            <motion.div {...fadeUp} className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">Guide utili</h2>
              <p className="text-muted-foreground">Risorse per aiutarti a prenderti cura del tuo animale.</p>
            </motion.div>
            <div className="grid gap-4 mb-8">
              {guides.map((g, i) => (
                <motion.div key={g.slug} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.08 }}>
                  <Link to={`/guide/${g.slug}/`}
                    className="group flex items-start gap-3 p-5 rounded-xl border border-border bg-card hover:shadow-md hover:border-primary/20 transition-all">
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
                <Link to="/guide/">Tutte le guide <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </section>

        {/* ── Per veterinari ── */}
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

        {/* ── FAQ ── */}
        <section id="faq" className="py-16 md:py-24 bg-background">
          <div className="container max-w-3xl">
            <motion.div {...fadeUp}>
              <FaqSection items={homepageFaqs} />
              <div className="mt-8">
                <VetDisclaimer />
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default Index;
