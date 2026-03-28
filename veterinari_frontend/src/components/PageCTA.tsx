import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { siteConfig } from "@/config/site";

interface PageCTAProps {
  title?: string;
  description?: string;
  buttonLabel?: string;
  href?: string;
}

export function PageCTA({
  title = "Cerchi un veterinario nella tua zona?",
  description = `Compila il modulo gratuito di ${siteConfig.name} e la tua richiesta verrà inoltrata alle strutture veterinarie della tua zona.`,
  buttonLabel = "Invia richiesta di contatto",
  href = "/richiedi-assistenza/",
}: PageCTAProps) {
  return (
    <div className="p-8 rounded-2xl bg-primary text-primary-foreground text-center">
      <h3 className="font-display text-2xl font-bold mb-2">{title}</h3>
      <p className="opacity-80 max-w-md mx-auto mb-6 text-sm">{description}</p>
      <Button variant="cta" size="lg" asChild>
        <Link to={href}>
          {buttonLabel} <ArrowRight className="ml-1 h-5 w-5" />
        </Link>
      </Button>
    </div>
  );
}
