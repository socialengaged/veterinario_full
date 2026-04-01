import { Link } from "react-router-dom";
import type { Clinic } from "@/data/types";
import { MapPin, Clock, Phone, Home, AlertCircle, Star, Globe, Navigation, Lock } from "lucide-react";
import { getAccessToken } from "@/lib/api";
import { cn } from "@/lib/utils";
import { useGeoContext } from "@/contexts/GeolocationContext";

interface ClinicCardProps {
  clinic: Clinic;
  className?: string;
  distanceKm?: number;
}

export function ClinicCard({ clinic, className, distanceKm: propDistance }: ClinicCardProps) {
  const isLoggedIn = !!getAccessToken();
  const geo = useGeoContext();
  const profileUrl = clinic.type === "veterinario"
    ? `/veterinario/${clinic.slug}/`
    : `/struttura/${clinic.slug}/`;

  // Use prop distance if provided, otherwise calculate from context
  const dist = propDistance ?? (clinic.lat && clinic.lng ? geo.distanceKm(clinic.lat, clinic.lng) : null);

  return (
    <article className={cn("p-5 rounded-xl border border-border bg-card hover:shadow-md hover:border-primary/20 transition-all relative", className)}>
      {/* Distance badge */}
      {dist !== null && (
        <span className="absolute top-3 right-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-[11px] font-bold shadow z-10">
          <Navigation className="h-3 w-3" />
          {dist < 1 ? `${Math.round(dist * 1000)} m` : `${dist.toFixed(1)} km`}
        </span>
      )}
      <div className="flex items-start justify-between mb-2">
        <div>
          <Link to={profileUrl} className="font-display font-semibold text-foreground hover:text-primary transition-colors">
            {clinic.name}
          </Link>
          <p className="text-xs text-muted-foreground capitalize mt-0.5">{clinic.type}</p>
        </div>
        {clinic.googleRating && (
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent text-accent-foreground">
            <Star className="h-3.5 w-3.5 fill-current text-yellow-500" />
            <span className="text-xs font-semibold">{clinic.googleRating}</span>
            {clinic.googleReviewsCount && (
              <span className="text-[10px] text-muted-foreground">({clinic.googleReviewsCount})</span>
            )}
          </div>
        )}
      </div>

      {clinic.contactLoginRequired && !isLoggedIn ? (
        <p className="text-xs text-muted-foreground border border-primary/20 rounded-lg p-2.5 bg-primary/5 mb-2">
          <Lock className="inline h-3.5 w-3.5 mr-1 text-primary align-text-bottom" />
          <Link to="/accedi/" className="text-primary font-semibold hover:underline">Accedi</Link>
          {" "}per visualizzare tutti i dati di contatto (indirizzo, telefono, sito).
        </p>
      ) : (
        <>
          {clinic.address && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1.5">
              <MapPin className="h-3.5 w-3.5 shrink-0" /> <span className="line-clamp-1">{clinic.address}</span>
            </div>
          )}
          {clinic.openingHours && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1.5">
              <Clock className="h-3.5 w-3.5 shrink-0" /> <span className="line-clamp-1">{clinic.openingHours}</span>
            </div>
          )}
          {clinic.phone && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1.5">
              <Phone className="h-3.5 w-3.5 shrink-0" /> {clinic.phone}
            </div>
          )}
          {clinic.website && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1.5">
              <Globe className="h-3.5 w-3.5 shrink-0" />
              <a href={clinic.website} target="_blank" rel="noopener noreferrer" className="hover:text-primary truncate">
                {clinic.website.replace(/^https?:\/\//, "").replace(/\/$/, "")}
              </a>
            </div>
          )}
        </>
      )}

      <div className="flex flex-wrap gap-1.5 mb-3 mt-2">
        {clinic.emergencyAvailable && (
          <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-destructive/10 text-destructive font-medium">
            <AlertCircle className="h-3 w-3" /> Pronto soccorso
          </span>
        )}
        {clinic.homeVisits && (
          <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-secondary/10 text-secondary font-medium">
            <Home className="h-3 w-3" /> Domicilio
          </span>
        )}
        {!clinic.verified && (
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">Non verificato</span>
        )}
      </div>

      <Link
        to={profileUrl}
        className="text-xs font-medium text-primary hover:underline"
      >
        Vedi profilo →
      </Link>
    </article>
  );
}
