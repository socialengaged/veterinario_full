import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/** Maps plural animal keyword slugs to their correct singular form */
const pluralToSingular: Record<string, string> = {
  "/veterinario-cani/": "/veterinario-cane/",
  "/veterinario-gatti/": "/veterinario-gatto/",
  "/veterinario-conigli/": "/veterinario-coniglio/",
  "/veterinario-cavalli/": "/veterinario-cavallo/",
  "/veterinario-tartarughe/": "/veterinario-tartaruga/",
  "/veterinario-pappagalli/": "/veterinario-pappagallo/",
  "/veterinario-furetti/": "/veterinario-furetto/",
  "/veterinario-criceti/": "/veterinario-criceto/",
  "/veterinario-serpenti/": "/veterinario-serpente/",
};

export function PluralRedirects() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const target = pluralToSingular[location.pathname];
    if (target) {
      navigate(target, { replace: true });
    }
  }, [location.pathname, navigate]);

  return null;
}
