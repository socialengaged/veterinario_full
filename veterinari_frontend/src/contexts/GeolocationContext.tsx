import { createContext, useContext, useState, useCallback, useMemo, type ReactNode } from "react";
import { haversineKm } from "@/hooks/useGeolocation";

interface GeoPosition {
  lat: number;
  lng: number;
}

interface GeolocationContextValue {
  position: GeoPosition | null;
  loading: boolean;
  error: string | null;
  denied: boolean;
  requestPermission: () => void;
  distanceKm: (lat: number, lng: number) => number | null;
}

const GeolocationContext = createContext<GeolocationContextValue | null>(null);

export function GeolocationProvider({ children }: { children: ReactNode }) {
  const [position, setPosition] = useState<GeoPosition | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [denied, setDenied] = useState(false);

  const requestPermission = useCallback(() => {
    if (position) return; // already have position
    if (!navigator.geolocation) {
      setError("Geolocalizzazione non supportata dal browser");
      return;
    }
    setLoading(true);
    setError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLoading(false);
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          setDenied(true);
          setError("Permesso di geolocalizzazione negato");
        } else {
          setError("Impossibile ottenere la posizione");
        }
        setLoading(false);
      },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 300000 }
    );
  }, [position]);

  const distanceKm = useCallback(
    (lat: number, lng: number) => {
      if (!position) return null;
      return haversineKm(position.lat, position.lng, lat, lng);
    },
    [position]
  );

  const value = useMemo(
    () => ({ position, loading, error, denied, requestPermission, distanceKm }),
    [position, loading, error, denied, requestPermission, distanceKm]
  );

  return (
    <GeolocationContext.Provider value={value}>
      {children}
    </GeolocationContext.Provider>
  );
}

export function useGeoContext() {
  const ctx = useContext(GeolocationContext);
  if (!ctx) throw new Error("useGeoContext must be used within GeolocationProvider");
  return ctx;
}
