import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export interface MapMarker {
  lat: number;
  lng: number;
  name: string;
  detail?: string;
  href?: string;
}

interface Props {
  markers: MapMarker[];
  userLat?: number;
  userLng?: number;
  height?: string;
}

const clinicIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function ClinicsMapInner({ markers, userLat, userLng }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!ref.current || mapRef.current) return;

    const center: L.LatLngExpression = userLat && userLng
      ? [userLat, userLng]
      : markers.length > 0
        ? [markers[0].lat, markers[0].lng]
        : [41.9, 12.5]; // Italy center

    const map = L.map(ref.current, { scrollWheelZoom: false }).setView(center, userLat ? 11 : 6);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>',
    }).addTo(map);

    // User marker
    if (userLat && userLng) {
      const userIcon = L.divIcon({
        html: '<div style="background:#3b82f6;width:14px;height:14px;border-radius:50%;border:3px solid #fff;box-shadow:0 0 6px rgba(0,0,0,.3)"></div>',
        iconSize: [14, 14],
        iconAnchor: [7, 7],
        className: "",
      });
      L.marker([userLat, userLng], { icon: userIcon })
        .addTo(map)
        .bindPopup("<strong>La tua posizione</strong>");
    }

    // Clinic markers
    for (const m of markers) {
      const popup = m.href
        ? `<strong><a href="${m.href}" style="color:#16a34a">${m.name}</a></strong>${m.detail ? `<br/><span style="font-size:12px">${m.detail}</span>` : ""}`
        : `<strong>${m.name}</strong>${m.detail ? `<br/><span style="font-size:12px">${m.detail}</span>` : ""}`;
      L.marker([m.lat, m.lng], { icon: clinicIcon }).addTo(map).bindPopup(popup);
    }

    // Fit bounds
    if (markers.length > 1) {
      const pts: L.LatLngExpression[] = markers.map(m => [m.lat, m.lng]);
      if (userLat && userLng) pts.push([userLat, userLng]);
      map.fitBounds(L.latLngBounds(pts), { padding: [40, 40], maxZoom: 14 });
    }

    mapRef.current = map;
    return () => { map.remove(); mapRef.current = null; };
  }, [markers, userLat, userLng]);

  return <div ref={ref} className="h-full w-full z-0" />;
}
