import { Shield, Eye, RefreshCw, Users } from "lucide-react";
import { siteConfig } from "@/config/site";

export function TrustModules() {
  const modules = [
    {
      icon: <Users className="h-6 w-6" />,
      title: "Elenco di veterinari e cliniche veterinarie",
      description: `${siteConfig.name} censisce veterinari e cliniche veterinarie in Italia. Non siamo un marketplace né un intermediario sanitario: il nostro obiettivo è facilitare il contatto diretto tra utenti e strutture veterinarie della zona.`,
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Come raccogliamo i dati",
      description: `Censiamo le strutture veterinarie — ambulatori, cliniche e pronto soccorso — attraverso fonti pubbliche e segnalazioni dirette. Non operiamo selezioni basate su pagamento né raccomandiamo professionisti specifici. Qualsiasi veterinario abilitato può richiedere l'inserimento nell'elenco di ${siteConfig.name}.`,
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: "Stato di verifica dei profili",
      description: "I profili delle strutture veterinarie possono essere verificati su richiesta del titolare. I profili non verificati sono chiaramente indicati. Le informazioni pubblicate sono di natura puramente indicativa.",
    },
    {
      icon: <RefreshCw className="h-6 w-6" />,
      title: "Aggiornamento dati",
      description: `I dati pubblicati su ${siteConfig.name} vengono aggiornati periodicamente. Ogni profilo riporta la data dell'ultimo aggiornamento. I professionisti possono contattarci per aggiornare o rimuovere le proprie informazioni in qualsiasi momento.`,
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-surface">
      <div className="container max-w-4xl">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3 text-center">
          Un servizio trasparente
        </h2>
        <p className="text-muted-foreground text-center max-w-lg mx-auto mb-10">
          {siteConfig.name} è un servizio di ricerca e contatto, non un intermediario sanitario.
          Ecco come funziona il nostro approccio alla raccolta e gestione dei dati.
        </p>
        <div className="grid md:grid-cols-2 gap-5">
          {modules.map((m, i) => (
            <div key={i} className="flex gap-4 p-5 rounded-xl border border-border bg-card">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-accent text-accent-foreground flex items-center justify-center">
                {m.icon}
              </div>
              <div>
                <h3 className="font-display font-semibold text-foreground mb-1">{m.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{m.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
