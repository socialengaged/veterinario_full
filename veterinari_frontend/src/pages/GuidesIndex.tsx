import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageMeta } from "@/components/PageMeta";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { AnswerSummary } from "@/components/AnswerSummary";
import { FaqSection } from "@/components/FaqSection";
import { VetDisclaimer } from "@/components/VetDisclaimer";
import { getAllGuides } from "@/data";
import { FileText } from "lucide-react";
import { webPageJsonLd, breadcrumbJsonLd, itemListJsonLd, faqJsonLd } from "@/lib/seo";

export default function GuidesIndex() {
  const guides = getAllGuides();

  const faq = [
    { q: "Cosa trovo nelle guide veterinarie?", a: "Informazioni pratiche su sintomi, emergenze, prevenzione e cura degli animali domestici. Ogni guida ti aiuta a capire quando è il momento di contattare un veterinario." },
    { q: "Le guide sostituiscono il veterinario?", a: "No, le guide sono informative e non sostituiscono mai il parere di un professionista. In caso di dubbio, contatta sempre un veterinario." },
    { q: "Quante guide sono disponibili?", a: `Attualmente sono disponibili ${guides.length} guide su argomenti diversi, dalla prevenzione alle emergenze veterinarie.` },
    { q: "Le guide riguardano tutti gli animali?", a: "Sì, le guide coprono cani, gatti, animali esotici, uccelli e animali da fattoria. Ogni guida specifica a quale animale si riferisce." },
    { q: "Come posso trovare un veterinario dopo aver letto una guida?", a: "In fondo a ogni guida trovi un link diretto per richiedere assistenza veterinaria nella tua zona, completamente gratuito." },
  ];

  return (
    <>
      <PageMeta
        title="Guide veterinarie — Consigli utili per la salute del tuo animale"
        description="Guide informative su sintomi, emergenze e cura degli animali domestici. Quando chiamare il veterinario e come prepararsi."
        canonical="/guide/"
        jsonLd={[
          webPageJsonLd({ title: "Guide veterinarie", description: "Guide informative su sintomi, emergenze e cura degli animali domestici.", url: "/guide/" }),
          breadcrumbJsonLd([{ name: "Guide" }]),
          faqJsonLd(faq),
          itemListJsonLd({
            name: "Guide veterinarie",
            url: "/guide/",
            items: guides.slice(0, 20).map((g, i) => ({
              name: g.title,
              url: `/guide/${g.slug}/`,
              position: i + 1,
            })),
          }),
        ]}
      />
      <Header />
      <main className="bg-background">
        <div className="container py-8 md:py-12 space-y-10 max-w-4xl">
          <Breadcrumbs items={[{ label: "Guide" }]} />

          <section>
            <h1 className="font-display text-3xl md:text-4xl font-extrabold text-foreground mb-4">
              Guide veterinarie
            </h1>
            <AnswerSummary>
              Le nostre guide veterinarie ti aiutano a riconoscere sintomi, capire quando chiamare il veterinario
              e come prepararti al meglio per una visita. Risorse gratuite per cani, gatti e animali esotici.
            </AnswerSummary>
          </section>

          <div className="grid gap-4">
            {guides.map((g) => (
              <Link
                key={g.slug}
                to={`/guide/${g.slug}/`}
                className="group p-5 rounded-xl border border-border bg-card hover:shadow-md hover:border-primary/20 transition-all"
              >
                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h2 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors">
                      {g.title}
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{g.intro}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <FaqSection items={faq} />
          <VetDisclaimer />
        </div>
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
}
