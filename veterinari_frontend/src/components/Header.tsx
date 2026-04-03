import { siteConfig } from "@/config/site";
import {
  Menu,
  X,
  Download,
  LogIn,
  Share,
  MoreVertical,
  MapPin,
  Loader2,
  MessageCircle,
  LogOut,
  LayoutDashboard,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { clearAccessToken, getAccessToken } from "@/lib/api";
import logoImg from "@/assets/logo.png";
import { usePwaInstall } from "@/hooks/usePwaInstall";
import { useGeoContext } from "@/contexts/GeolocationContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function InstallInstructions({ platform }: { platform: string }) {
  if (platform === "ios") {
    return (
      <ol className="space-y-3 text-sm text-foreground">
        <li className="flex items-start gap-2">
          <span className="font-bold text-primary">1.</span>
          <span>Tocca l'icona <Share className="inline h-4 w-4 text-primary" /> <strong>Condividi</strong> in basso (Safari)</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="font-bold text-primary">2.</span>
          <span>Scorri e tocca <strong>"Aggiungi alla schermata Home"</strong></span>
        </li>
        <li className="flex items-start gap-2">
          <span className="font-bold text-primary">3.</span>
          <span>Tocca <strong>"Aggiungi"</strong> in alto a destra</span>
        </li>
      </ol>
    );
  }
  return (
    <ol className="space-y-3 text-sm text-foreground">
      <li className="flex items-start gap-2">
        <span className="font-bold text-primary">1.</span>
        <span>Tocca il menu <MoreVertical className="inline h-4 w-4 text-primary" /> del browser (⋮)</span>
      </li>
      <li className="flex items-start gap-2">
        <span className="font-bold text-primary">2.</span>
        <span>Seleziona <strong>"Installa app"</strong> o <strong>"Aggiungi alla schermata Home"</strong></span>
      </li>
    </ol>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [showInstallDialog, setShowInstallDialog] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";
  const sessionToken = getAccessToken();
  const { canInstall, hasNativePrompt, install, platform } = usePwaInstall();
  const geo = useGeoContext();

  const scrollTo = (id: string) => {
    if (isHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
    setOpen(false);
  };

  const handleInstall = async () => {
    if (hasNativePrompt) {
      await install();
    } else {
      setShowInstallDialog(true);
    }
    setOpen(false);
  };

  const navItems: {
    label: string;
    href: string;
    scrollId?: string;
  }[] = [
    { label: "Elenco", href: "/elenco/" },
    { label: "Zone coperte", href: "/puglia/", scrollId: "zone" },
    { label: "Guide", href: "/guide/" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur-sm">
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <img src={logoImg} alt={siteConfig.name} className="h-9 w-9" width={36} height={36} />
            <span className="font-display font-bold text-xl text-primary">
              {siteConfig.name}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-muted-foreground" aria-label="Navigazione principale">
            {/* Geolocation button */}
            {!geo.position && !geo.denied && (
              <button
                onClick={geo.requestPermission}
                disabled={geo.loading}
                className="flex items-center gap-1.5 hover:text-primary transition-colors"
                aria-label="Attiva geolocalizzazione"
              >
                {geo.loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <MapPin className="h-4 w-4" />
                )}
                <span className="hidden lg:inline">Vicino a me</span>
              </button>
            )}
            {geo.position && (
              <span className="flex items-center gap-1.5 text-primary text-xs font-semibold">
                <MapPin className="h-3.5 w-3.5" />
                Localizzato
              </span>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex items-center gap-1 rounded-md text-sm font-medium text-muted-foreground outline-none ring-offset-background transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[state=open]:text-foreground">
                Servizi
                <ChevronDown className="h-4 w-4 opacity-70" aria-hidden />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="z-[110] w-56">
                {isHome && (
                  <DropdownMenuItem
                    className="cursor-pointer font-medium"
                    onSelect={() => scrollTo("servizi")}
                  >
                    Servizi in homepage
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem asChild>
                  <Link to="/servizi/">Tutti i servizi</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link
                    to="/consulenza-veterinaria-online/"
                    className="font-semibold text-primary focus:text-primary"
                  >
                    Veterinario online
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {navItems.map((item) =>
              isHome && item.scrollId ? (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => scrollTo(item.scrollId!)}
                  className="hover:text-foreground transition-colors"
                >
                  {item.label}
                </button>
              ) : (
                <Link key={item.label} to={item.href} className="hover:text-foreground transition-colors">
                  {item.label}
                </Link>
              ),
            )}
            {canInstall && (
              <button
                onClick={handleInstall}
                className="flex items-center gap-1.5 hover:text-foreground transition-colors"
                aria-label="Installa app"
              >
                <Download className="h-4 w-4" />
                Installa
              </button>
            )}
            {sessionToken ? (
              <>
                <Link
                  to="/dashboard"
                  className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
                >
                  <LayoutDashboard className="h-4 w-4" /> Area riservata
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    clearAccessToken();
                    navigate("/");
                  }}
                  className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <LogOut className="h-4 w-4" /> Esci
                </button>
              </>
            ) : (
              <Link to="/accedi/" className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors">
                <LogIn className="h-4 w-4" /> Accedi
              </Link>
            )}
            {isHome ? (
              <Button variant="cta" size="sm" onClick={() => scrollTo("smart-finder")}>
                Cerca veterinario
              </Button>
            ) : (
              <Button variant="cta" size="sm" asChild>
                <Link to="/">Cerca veterinario</Link>
              </Button>
            )}
          </nav>

          {/* Mobile toggle */}
          <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile nav */}
        {open && (
          <nav className="md:hidden border-t border-border bg-card p-4 space-y-3" aria-label="Menu mobile">
            {/* Mobile geo button */}
            {!geo.position && !geo.denied && (
              <button
                onClick={() => { geo.requestPermission(); setOpen(false); }}
                disabled={geo.loading}
                className="flex items-center gap-2 text-sm font-medium text-primary"
              >
                {geo.loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <MapPin className="h-4 w-4" />}
                📍 Veterinari vicino a me
              </button>
            )}
            {geo.position && (
              <span className="flex items-center gap-2 text-xs font-semibold text-primary">
                <MapPin className="h-3.5 w-3.5" /> Posizione attiva — risultati ordinati per distanza
              </span>
            )}
            <div className="rounded-lg border border-border bg-muted/40 p-3 space-y-2">
              <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">Servizi</p>
              {isHome && (
                <button
                  type="button"
                  className="block w-full text-left text-sm font-medium text-foreground"
                  onClick={() => {
                    scrollTo("servizi");
                    setOpen(false);
                  }}
                >
                  Servizi in homepage
                </button>
              )}
              <Link
                to="/servizi/"
                onClick={() => setOpen(false)}
                className="block text-sm font-medium text-foreground"
              >
                Tutti i servizi
              </Link>
              <Link
                to="/consulenza-veterinaria-online/"
                onClick={() => setOpen(false)}
                className="block text-sm font-semibold text-primary"
              >
                Veterinario online
              </Link>
            </div>
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                onClick={() => setOpen(false)}
                className="block text-sm font-medium text-foreground"
              >
                {item.label}
              </Link>
            ))}
            {canInstall && (
              <button
                onClick={handleInstall}
                className="flex items-center gap-2 text-sm font-medium text-primary"
              >
                <Download className="h-4 w-4" />
                📲 Installa l'app
              </button>
            )}
            {sessionToken ? (
              <>
                <Link to="/dashboard" onClick={() => setOpen(false)} className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <LayoutDashboard className="h-4 w-4" /> Area riservata
                </Link>
                <Link to="/dashboard/chat" onClick={() => setOpen(false)} className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <MessageCircle className="h-4 w-4" /> Le mie chat
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    clearAccessToken();
                    setOpen(false);
                    navigate("/");
                  }}
                  className="flex items-center gap-2 text-sm font-medium text-muted-foreground w-full text-left"
                >
                  <LogOut className="h-4 w-4" /> Esci
                </button>
              </>
            ) : (
              <Link to="/accedi/" onClick={() => setOpen(false)} className="flex items-center gap-2 text-sm font-medium text-foreground">
                <LogIn className="h-4 w-4" /> Accedi / Registrati
              </Link>
            )}
            <Button variant="cta" size="sm" className="w-full" asChild>
              <Link to="/" onClick={() => setOpen(false)}>Cerca veterinario</Link>
            </Button>
          </nav>
        )}
      </header>

      {/* Install instructions dialog */}
      <Dialog open={showInstallDialog} onOpenChange={setShowInstallDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Download className="h-5 w-5 text-primary" />
              Installa VeterinarioVicino
            </DialogTitle>
            <DialogDescription>
              Aggiungi l'app alla schermata Home per accedere rapidamente ai veterinari nella tua zona.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <InstallInstructions platform={platform} />
          </div>
          <p className="text-xs text-muted-foreground">
            L'app funziona anche offline e si aggiorna automaticamente.
          </p>
        </DialogContent>
      </Dialog>
    </>
  );
}
