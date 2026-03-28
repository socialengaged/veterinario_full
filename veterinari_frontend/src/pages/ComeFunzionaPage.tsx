import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageMeta } from "@/components/PageMeta";
import { VetDisclaimer } from "@/components/VetDisclaimer";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { getAllClinics } from "@/data";
import {
  Search, PawPrint, MapPin, Send, CheckCircle, Clock, Phone,
  ArrowRight, Building2, Stethoscope, Shield
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5 },
};

export default function ComeFunzionaPage() {
  const totalClinics = getAllClinics().length;

  return (
    <>
      <PageMeta
        title={`Come Funziona ${siteConfig.name} — Guida completa al servizio`}
        description={`Scopri come funziona ${siteConfig.name}. Servizio gratuito di ricerca e contatto veterinario con oltre ${totalClinics.toLocaleString("it-IT")} strutture in Italia.`}
        canonical="/come-funziona/"
      />
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-background pt-12 pb-16 md:pt-20 md:pb-24">
          <div className="container max-w-3xl text-center">
            <motion.h1
              className="font-display text-4xl md:text-5xl font-extrabold text-foreground leading-tight mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Come funziona <span className="text-primary">{siteConfig.name}</span>
            </motion.h1>
            <motion.p
              className="text-lg text-muted-foreground max-w-xl mx-auto mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {siteConfig.name} è il servizio gratuito che ti permette di cercare veterinari,
              cliniche veterinarie e pronto soccorso veterinario nella tua zona e inviare una richiesta di contatto.
              Ecco come funziona, passo dopo passo.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <Button variant="cta" size="lg" asChild>
                <Link to="/richiedi-assistenza/">Inizia subito — è gratuito <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Numeri chiave */}
        <section className="border-y border-border bg-surface py-8">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { num: totalClinics.toLocaleString("it-IT"), label: "Strutture veterinarie" },
                { num: "100%", label: "Gratuito per gli utenti" },
                { num: "24h", label: "Risposta media" },
                { num: "20+", label: "Regioni coperte" },
              ].map((s, i) => (
                <motion.div key={i} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.08 }}>
                  <p className="font-display text-3xl font-extrabold text-primary">{s.num}</p>
                  <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Steps */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container max-w-4xl">
            <motion.div {...fadeUp} className="text-center mb-14">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
                Trova un veterinario in 4 semplici passaggi
              </h2>
              <p className="text-muted-foreground">
                Il nostro processo è progettato per essere veloce, semplice e adatto a ogni esigenza.
              </p>
            </motion.div>

            <div className="space-y-8 md:space-y-12">
              {[
                {
                  icon: PawPrint, num: "1", title: "Seleziona il tuo animale",
                  desc: "Scegli tra oltre 30 specie animali: cani, gatti, conigli, tartarughe, cavalli, pappagalli e molti altri. Supportiamo animali domestici, esotici e da fattoria.",
                  detail: "Il tipo di animale ci aiuta a individuare veterinari con le competenze specifiche necessarie. Un veterinario per animali esotici ha formazione diversa da uno generico.",
                },
                {
                  icon: Stethoscope, num: "2", title: "Indica il servizio di cui hai bisogno",
                  desc: "Visita di routine, vaccinazioni, chirurgia, pronto soccorso, dermatologia, ortopedia, nutrizione, check-up annuale e molto altro. Indica il servizio di cui hai bisogno.",
                  detail: "Ogni servizio richiede competenze e attrezzature diverse. Specificando il servizio, possiamo indirizzarti verso strutture realmente attrezzate per il tuo caso.",
                },
                {
                  icon: Clock, num: "3", title: "Specifica l'urgenza e la tua posizione",
                  desc: "Dicci quanto è urgente la situazione (non urgente, da vedere presto, urgente oggi, emergenza) e indica la tua città o zona. Puoi anche attivare la geolocalizzazione per trovare strutture vicine.",
                  detail: "Per le emergenze, ti consigliamo sempre di recarti direttamente al pronto soccorso veterinario più vicino senza attendere la nostra risposta.",
                },
                {
                  icon: Send, num: "4", title: "Invia la richiesta e vieni ricontattato",
                  desc: "Compila il modulo con nome, telefono e una breve descrizione. La tua richiesta viene inoltrata alle strutture veterinarie della zona, che ti ricontatteranno direttamente.",
                  detail: "Le strutture rispondono generalmente entro 24 ore per le richieste non urgenti. Il servizio di inoltro è completamente gratuito.",
                },
              ].map((step, i) => (
                <motion.div key={i} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.08 }}
                  className="flex gap-5 md:gap-8 items-start">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-2xl bg-primary text-primary-foreground font-display font-bold text-2xl flex items-center justify-center shadow-md">
                      {step.num}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-foreground mb-2 flex items-center gap-2">
                      <step.icon className="h-5 w-5 text-primary" /> {step.title}
                    </h3>
                    <p className="text-muted-foreground mb-2">{step.desc}</p>
                    <p className="text-sm text-muted-foreground/80 italic">{step.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div {...fadeUp} className="text-center mt-12">
              <Button variant="cta" size="lg" asChild>
                <Link to="/richiedi-assistenza/">Compila il modulo ora <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Cosa puoi trovare */}
        <section className="py-16 md:py-24 bg-surface">
          <div className="container max-w-4xl">
            <motion.div {...fadeUp} className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
                Cosa puoi trovare su {siteConfig.name}
              </h2>
            </motion.div>
            <div className="grid sm:grid-cols-2 gap-5">
              {[
                { icon: Building2, title: "Cliniche veterinarie", desc: "Strutture attrezzate con diagnostica avanzata, chirurgia, ricovero e pronto soccorso." },
                { icon: Stethoscope, title: "Ambulatori veterinari", desc: "Studi veterinari per visite di routine, vaccinazioni, controlli e prestazioni di base." },
                { icon: Phone, title: "Pronto soccorso veterinario", desc: "Strutture con servizio di emergenza H24 o reperibilità notturna e festiva." },
                { icon: MapPin, title: "Veterinari a domicilio", desc: "Professionisti che effettuano visite direttamente a casa tua, ideale per animali stressati." },
                { icon: Search, title: "Specialisti veterinari", desc: "Dermatologi, ortopedici, cardiologi, oculisti, nutrizionisti e altri specialisti." },
                { icon: Shield, title: "Veterinari per animali esotici", desc: "Professionisti con competenze specifiche per rettili, uccelli, piccoli mammiferi." },
              ].map((item, i) => (
                <motion.div key={i} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.06 }}
                  className="p-5 rounded-xl border border-border bg-card flex gap-4">
                  <item.icon className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-display font-bold text-foreground mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Come cercare */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container max-w-3xl">
            <motion.div {...fadeUp} className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
                Modi per cercare un veterinario
              </h2>
              <p className="text-muted-foreground">
                Diversi modi per trovare l'assistenza veterinaria di cui hai bisogno.
              </p>
            </motion.div>
            <div className="space-y-5">
              {[
                {
                  title: "🔍 Compila il modulo di richiesta",
                  desc: "Il modo più efficace. Rispondi a poche domande sul tuo animale, il servizio necessario e la tua zona. La richiesta verrà inoltrata alle strutture disponibili.",
                  link: "/richiedi-assistenza/", cta: "Compila il modulo",
                },
                {
                  title: "📍 Cerca per zona",
                  desc: "Naviga per regione, provincia e città per scoprire le strutture veterinarie nella tua zona. Ogni pagina mostra l'elenco completo delle strutture disponibili con contatti e informazioni.",
                  link: "/elenco/", cta: "Esplora l'elenco",
                },
                {
                  title: "🩺 Cerca per servizio",
                  desc: "Parti dal servizio di cui hai bisogno — vaccinazioni, chirurgia, dermatologia, ortopedia — e scopri le strutture che lo offrono nella tua zona.",
                  link: "/servizi/", cta: "Vedi i servizi",
                },
                {
                  title: "📱 Usa la geolocalizzazione",
                  desc: "Attiva la posizione sul tuo smartphone dalla homepage per vedere automaticamente i veterinari più vicini a te, con indicazione della distanza in chilometri.",
                  link: "/", cta: "Vai alla homepage",
                },
              ].map((item, i) => (
                <motion.div key={i} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.08 }}
                  className="p-6 rounded-xl border border-border bg-card">
                  <h3 className="font-display text-lg font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground mb-3">{item.desc}</p>
                  <Button variant="outline" size="sm" asChild>
                    <Link to={item.link}>{item.cta} <ArrowRight className="ml-1 h-4 w-4" /></Link>
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ dedicate */}
        <section className="py-16 md:py-24 bg-surface">
          <div className="container max-w-3xl">
            <motion.div {...fadeUp} className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
                Domande frequenti
              </h2>
            </motion.div>
            <div className="space-y-4">
              {[
                { q: `${siteConfig.name} è davvero gratuito?`, a: `Sì, il servizio di ricerca e inoltro richieste è completamente gratuito per chi cerca un veterinario. Non ci sono costi nascosti, abbonamenti o commissioni.` },
                { q: "Come vengono scelte le strutture veterinarie?", a: `${siteConfig.name} non seleziona né raccomanda veterinari specifici. La tua richiesta viene inoltrata alle strutture veterinarie censite nella zona da te indicata. Il rapporto professionale si instaura direttamente tra te e la struttura.` },
                { q: "Posso scegliere io il veterinario?", a: "Assolutamente sì. Puoi esplorare liberamente l'elenco delle strutture veterinarie, consultare le informazioni disponibili e contattarle direttamente. Il modulo di richiesta è un'opzione aggiuntiva per chi preferisce inviare una richiesta di contatto." },
                { q: `${siteConfig.name} fornisce prestazioni mediche?`, a: `No. ${siteConfig.name} è un servizio di ricerca e inoltro richieste di contatto. Non forniamo consulenze veterinarie, diagnosi, terapie o prestazioni sanitarie di alcun tipo. Le informazioni sul sito hanno finalità puramente orientativa. Per qualsiasi problema di salute del tuo animale, consulta sempre un medico veterinario.` },
                { q: "Quanto tempo ci vuole per ricevere risposta?", a: "Per le richieste non urgenti, rispondiamo generalmente entro 24 ore. Per le urgenze, cerchiamo di essere più rapidi possibile. In caso di vera emergenza, ti consigliamo sempre di recarti direttamente al pronto soccorso veterinario." },
                { q: "In quali zone è attivo il servizio?", a: `${siteConfig.name} è attivo in tutta Italia con oltre ${totalClinics.toLocaleString("it-IT")} strutture veterinarie censite. La rete è in continua espansione.` },
                { q: "Come contattare il supporto?", a: `Puoi scriverci a ${siteConfig.contact.email} o chiamarci al ${siteConfig.contact.phone}. Siamo sempre disponibili per aiutarti.` },
              ].map((faq, i) => (
                <motion.div key={i} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.05 }}
                  className="p-5 rounded-xl border border-border bg-card">
                  <h3 className="font-display font-semibold text-foreground mb-2">{faq.q}</h3>
                  <p className="text-sm text-muted-foreground">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA finale */}
        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="container max-w-3xl text-center">
            <motion.div {...fadeUp}>
              <CheckCircle className="h-12 w-12 mx-auto mb-4 opacity-80" />
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">Pronto a cercare un veterinario?</h2>
              <p className="opacity-80 max-w-lg mx-auto mb-8">
                Compila il modulo gratuito e la tua richiesta verrà inoltrata alle strutture veterinarie
                della tua zona.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" size="lg" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                  <Link to="/richiedi-assistenza/">Compila il modulo <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
                <Button variant="outline" size="lg" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                  <Link to="/elenco/">Esplora le strutture <Building2 className="ml-2 h-5 w-5" /></Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        <div className="container max-w-3xl py-8">
          <VetDisclaimer />
        </div>
      </main>
      <Footer />
    </>
  );
}
