import { useParams } from "react-router-dom";
import { getService, getRegion, getServiceAnimalPage } from "@/data";
import { resolveKeywordSlug } from "@/data/keywords";
import ServicePageTemplate from "@/templates/ServicePage";
import RegionPage from "@/templates/RegionPage";
import KeywordCityPage from "@/templates/KeywordCityPage";
import KeywordAnimalPageTemplate from "@/templates/KeywordAnimalPage";
import KeywordSpecialtyPageTemplate from "@/templates/KeywordSpecialtyPage";
import KeywordAnimalCityPage from "@/templates/KeywordAnimalCityPage";
import KeywordServiceCityPage from "@/templates/KeywordServiceCityPage";
import ServiceAnimalPageTemplate from "@/templates/ServiceAnimalPage";
import NotFound from "@/pages/NotFound";

// This component disambiguates single-segment dynamic routes:
// /:slug/ can be a service, region, keyword, or service-animal page
export default function SingleSlugResolver() {
  const { slug } = useParams<{ slug: string }>();
  const s = slug || "";

  // 1. Check service+animal pages first (most specific content pages)
  const serviceAnimal = getServiceAnimalPage(s);
  if (serviceAnimal) {
    return <ServiceAnimalPageTemplate slug={s} />;
  }

  // 2. Check keyword patterns (veterinario-lecce, etc.)
  const keyword = resolveKeywordSlug(s);
  if (keyword) {
    if (keyword.type === "service-city" && keyword.serviceCityPattern && keyword.city) {
      return <KeywordServiceCityPage pattern={keyword.serviceCityPattern} citySlug={keyword.city} />;
    }
    if (keyword.type === "animal-city" && keyword.animalCityPattern && keyword.city) {
      return <KeywordAnimalCityPage pattern={keyword.animalCityPattern} citySlug={keyword.city} />;
    }
    if (keyword.type === "city" && keyword.pattern && keyword.city) {
      return <KeywordCityPage pattern={keyword.pattern} citySlug={keyword.city} />;
    }
    if (keyword.type === "animal" && keyword.animal) {
      return <KeywordAnimalPageTemplate page={keyword.animal} />;
    }
    if (keyword.type === "specialty" && keyword.specialty) {
      return <KeywordSpecialtyPageTemplate page={keyword.specialty} />;
    }
  }

  // 3. Check if it's a known service
  const service = getService(s);
  if (service) return <ServicePageTemplate />;

  // 4. Check if it's a known region
  const region = getRegion(s);
  if (region) return <RegionPage />;

  return <NotFound />;
}
