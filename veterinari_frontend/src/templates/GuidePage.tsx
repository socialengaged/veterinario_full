import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageMeta } from "@/components/PageMeta";
import { PageCTA } from "@/components/PageCTA";
import { FaqSection } from "@/components/FaqSection";
import { RelatedLinks } from "@/components/RelatedLinks";
import { AnswerSummary } from "@/components/AnswerSummary";
import { VetDisclaimer } from "@/components/VetDisclaimer";
import { EditorialInfo } from "@/components/EditorialInfo";
import { AreaCoverage } from "@/components/AreaCoverage";
import { Disclaimer } from "@/components/Disclaimer";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { getGuide, getService, getCity } from "@/data";
import { guideRichContent } from "@/data/guide-content";
import { AlertTriangle, CheckCircle, FileText, List } from "lucide-react";
import NotFound from "@/pages/NotFound";
import { siteConfig } from "@/config/site";
import { breadcrumbJsonLd, faqJsonLd, articleJsonLd } from "@/lib/seo";

// Guide images
import caneVomitaImg from "@/assets/guides/cane-vomita.jpg";
import gattoNonMangiaImg from "@/assets/guides/gatto-non-mangia.jpg";
import prontoSoccorsoImg from "@/assets/guides/pronto-soccorso-veterinario.jpg";
import primaVisitaImg from "@/assets/guides/prima-visita-cucciolo.jpg";
import sterilizzazioneGattoImg from "@/assets/guides/sterilizzazione-gatto.jpg";
import caneZoppicaImg from "@/assets/guides/cane-zoppica.jpg";
import caneDiarreaImg from "@/assets/guides/cane-diarrea.jpg";
import caneNonMangiaImg from "@/assets/guides/cane-non-mangia.jpg";
import gattoVomitaImg from "@/assets/guides/gatto-vomita.jpg";
import gattoPerdePeloImg from "@/assets/guides/gatto-perde-pelo.jpg";
import caneAvvelenatoImg from "@/assets/guides/cane-avvelenato.jpg";
import caneAnzianoImg from "@/assets/guides/cane-anziano-cure.jpg";
import gattoAvvelenatoImg from "@/assets/guides/gatto-avvelenato.jpg";
import primoSoccorsoImg from "@/assets/guides/primo-soccorso-cane.jpg";
import vaccinazioniCaneImg from "@/assets/guides/vaccinazioni-cane.jpg";
import vaccinazioniGattoImg from "@/assets/guides/vaccinazioni-gatto.jpg";
import microchipCaneImg from "@/assets/guides/microchip-cane.jpg";
import prevenzioneParassitiImg from "@/assets/guides/prevenzione-parassiti.jpg";
import alimentazioneCaneImg from "@/assets/guides/alimentazione-cane.jpg";
import alimentazioneGattoImg from "@/assets/guides/alimentazione-gatto.jpg";
import viaggiareCaneImg from "@/assets/guides/viaggiare-cane.jpg";
import viaggiareGattoImg from "@/assets/guides/viaggiare-gatto.jpg";

// Animal fallback images
import caneImg from "@/assets/animals/cane.jpg";
import gattoImg from "@/assets/animals/gatto.jpg";

const guideImages: Record<string, string> = {
  "cane-vomita-quando-chiamare-veterinario": caneVomitaImg,
  "gatto-non-mangia-cosa-fare": gattoNonMangiaImg,
  "quando-andare-pronto-soccorso-veterinario": prontoSoccorsoImg,
  "prima-visita-cucciolo-cosa-sapere": primaVisitaImg,
  "sterilizzazione-gatto-quando-farla": sterilizzazioneGattoImg,
  "cane-zoppica-cause-cosa-fare": caneZoppicaImg,
  "cane-diarrea-quando-preoccuparsi": caneDiarreaImg,
  "cane-non-mangia-cause-rimedi": caneNonMangiaImg,
  "gatto-vomita-quando-preoccuparsi": gattoVomitaImg,
  "gatto-perde-pelo-cause": gattoPerdePeloImg,
  "cane-avvelenato-cosa-fare": caneAvvelenatoImg,
  "cane-anziano-cure-veterinarie": caneAnzianoImg,
  "gatto-avvelenato-cosa-fare": gattoAvvelenatoImg,
  "primo-soccorso-cane-guida": primoSoccorsoImg,
  "vaccinazioni-cane-guida": vaccinazioniCaneImg,
  "vaccinazioni-gatto-guida": vaccinazioniGattoImg,
  "microchip-cane-obbligatorio-guida": microchipCaneImg,
  "prevenzione-parassiti-cane-gatto": prevenzioneParassitiImg,
  "alimentazione-casalinga-cane": alimentazioneCaneImg,
  "alimentazione-casalinga-gatto": alimentazioneGattoImg,
  "viaggiare-con-cane-guida": viaggiareCaneImg,
  "viaggiare-con-gatto-consigli": viaggiareGattoImg,
};

const animalFallbackImages: Record<string, string> = {
  cane: caneImg,
  gatto: gattoImg,
};

export default function GuidePage() {
  const { guideSlug } = useParams<{ guideSlug: string }>();
  const guide = getGuide(guideSlug || "");
  if (!guide) return <NotFound />;

  const heroImage = guideImages[guide.slug] || (guide.animal ? animalFallbackImages[guide.animal] : undefined);

  const relatedServices = guide.relatedServices.map(s => getService(s)).filter(Boolean);
  const relatedCities = guide.relatedCities.map(s => getCity(s)).filter(Boolean);

  const canonicalPath = `/guide/${guide.slug}/`;

  return (
    <>
      <PageMeta
        title={guide.metaTitle}
        description={guide.metaDescription}
        canonical={canonicalPath}
        jsonLd={[
          articleJsonLd({ title: guide.metaTitle, description: guide.metaDescription, url: canonicalPath }),
          breadcrumbJsonLd([{ name: "Guide", url: "/guide/" }, { name: guide.title }]),
          faqJsonLd(guide.faq),
        ]}
      />
      <Header />
      <main className="bg-background">
        <article className="container py-8 md:py-12 space-y-10 md:space-y-14 max-w-4xl">
          <Breadcrumbs items={[{ label: "Guide", href: "/guide/" }, { label: guide.title }]} />

          {/* ── Hero with image ── */}
          <section className="grid md:grid-cols-[1fr_300px] gap-8 items-start">
            <header>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                <FileText className="h-4 w-4" />
                <span>Guida informativa</span>
                {guide.animal && <span className="capitalize">· {guide.animal}</span>}
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-extrabold text-foreground mb-4">
                {guide.title}
              </h1>
              <AnswerSummary>
                <strong>In breve:</strong> {guide.definition}
              </AnswerSummary>
            </header>
            {heroImage && (
              <div className="rounded-2xl overflow-hidden border border-border shadow-md hidden md:block">
                <img
                  src={heroImage}
                  alt={guide.title}
                  className="w-full h-64 object-cover"
                  loading="eager"
                  decoding="async"
                />
              </div>
            )}
          </section>

          {/* ── Mobile image ── */}
          {heroImage && (
            <div className="rounded-2xl overflow-hidden border border-border shadow-md md:hidden">
              <img
                src={heroImage}
                alt={guide.title}
                className="w-full h-48 object-cover"
                loading="eager"
                decoding="async"
              />
            </div>
          )}

          <EditorialInfo lastUpdated="2026-03-01" source="Redazione editoriale" />

          <Disclaimer variant="warning">{guide.disclaimer}</Disclaimer>

          {/* ── Key points (bullet format for AI) ── */}
          <section className="p-6 rounded-xl border-2 border-primary/20 bg-accent">
            <h2 className="font-display text-lg font-bold text-foreground mb-3 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" /> Punti chiave
            </h2>
            <ul className="space-y-2">
              {guide.keyPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                  <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </section>

          {/* ── Main content ── */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-3">Approfondimento</h2>
            {guideRichContent[guide.slug] ? (
              <div className="space-y-4">
                {guideRichContent[guide.slug].content.split("\n\n").map((p, i) => (
                  <p key={i} className="text-muted-foreground leading-relaxed">{p}</p>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground leading-relaxed">{guide.content}</p>
            )}
          </section>

          {/* ── Common situations ── */}
          {guide.commonSituations.length > 0 && (
            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <List className="h-5 w-5 text-primary" /> Situazioni comuni
              </h2>
              <ul className="grid sm:grid-cols-2 gap-2">
                {guide.commonSituations.map((situation, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground p-3 rounded-lg border border-border bg-card">
                    <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    {situation}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* ── Emergency signs ── */}
          {guide.emergencySigns.length > 0 && (
            <section className="p-6 rounded-xl border border-destructive/20 bg-destructive/5">
              <h2 className="font-display text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" /> Segnali di emergenza — Contatta subito il veterinario
              </h2>
              <p className="text-sm text-muted-foreground mb-3">
                In presenza di uno o più di questi segnali, contatta immediatamente un veterinario o recati al pronto soccorso veterinario:
              </p>
              <ul className="space-y-2">
                {guide.emergencySigns.map((sign, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                    <span className="text-destructive font-bold flex-shrink-0">⚠</span>
                    {sign}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* ── When to contact ── */}
          <section className="p-6 rounded-xl border border-warning/20 bg-warning/5">
            <h2 className="font-display text-lg font-bold text-foreground mb-3 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" /> Quando contattare il veterinario
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{guide.whenToContact}</p>
          </section>

          {/* ── What to prepare ── */}
          <section className="p-6 rounded-xl border border-border bg-card">
            <h2 className="font-display text-lg font-bold text-foreground mb-3">
              Cosa preparare prima di chiamare il veterinario
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{guide.whatToPrepare}</p>
          </section>

          {/* ── Where to find nearby ── */}
          {relatedCities.length > 0 && (
            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                Trova un veterinario vicino a te
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                Il nostro servizio è attivo in {siteConfig.initialArea}. Trova il professionista più vicino:
              </p>
              <div className="flex flex-wrap gap-2">
                {relatedCities.map(c => (
                  <Link
                    key={c!.slug}
                    to={`/${c!.regionSlug}/${c!.provinceSlug}/${c!.slug}/`}
                    className="px-3 py-1.5 rounded-lg border border-border bg-card text-xs font-medium text-foreground hover:border-primary/40 hover:bg-accent transition-all"
                  >
                    Veterinario a {c!.name}
                  </Link>
                ))}
              </div>
            </section>
          )}

          {relatedServices.length > 0 && (
            <RelatedLinks title="Servizi correlati"
              links={relatedServices.map(s => ({
                label: s!.name, href: `/${s!.slug}/`,
                description: s!.definition.slice(0, 100) + "…",
              }))}
            />
          )}

          <AreaCoverage />
          <FaqSection items={guide.faq} />
          <VetDisclaimer />
          <PageCTA title="Cerchi un veterinario nella tua zona?" description="Invia una richiesta di contatto gratuita alle strutture veterinarie disponibili nella tua zona." href="/richiedi-assistenza/" />
        </article>
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
}
