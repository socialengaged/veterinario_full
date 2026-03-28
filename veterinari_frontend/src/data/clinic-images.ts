// Clinic image mapping – assigns a unique cartoon building to each clinic
import clinic01 from "@/assets/clinics/clinic-01.jpg";
import clinic02 from "@/assets/clinics/clinic-02.jpg";
import clinic03 from "@/assets/clinics/clinic-03.jpg";
import clinic04 from "@/assets/clinics/clinic-04.jpg";
import clinic05 from "@/assets/clinics/clinic-05.jpg";
import clinic06 from "@/assets/clinics/clinic-06.jpg";
import clinic07 from "@/assets/clinics/clinic-07.jpg";
import clinic08 from "@/assets/clinics/clinic-08.jpg";
import clinic09 from "@/assets/clinics/clinic-09.jpg";
import clinic10 from "@/assets/clinics/clinic-10.jpg";
import clinic11 from "@/assets/clinics/clinic-11.jpg";
import clinic12 from "@/assets/clinics/clinic-12.jpg";
import clinic13 from "@/assets/clinics/clinic-13.jpg";

const clinicImages: Record<string, string> = {
  // Seed clinics
  "clinica-veterinaria-salento-lecce": clinic01,
  "ambulatorio-verde-lecce": clinic06,
  "dott-ferraro-lecce": clinic09,
  "ambulatorio-rossi-gallipoli": clinic03,
  "clinica-ionica-gallipoli": clinic02,
  "dott-bianchi-nardo": clinic05,
  "ambulatorio-nardo-centro": clinic03,
  "clinica-otranto-vet": clinic07,
  "ambulatorio-maglie-sud": clinic06,
  "dott-greco-galatina": clinic09,
  "ambulatorio-galatina-pet": clinic06,
  "ambulatorio-tricase-sud": clinic03,
  "dott-conte-casarano": clinic09,
  "ambulatorio-casarano-vet": clinic05,
  "ambulatorio-copertino-vet": clinic03,
  "dott-de-luca-ugento": clinic05,
  "clinica-salento-sud-tricase": clinic11,
  "dott-morelli-maglie": clinic09,
  // Real clinics
  "ambulatorio-veterinario-copertino": clinic01,
  "clinica-veterinaria-madaro-copertino": clinic04,
  "ambulatorio-veterinario-lecce": clinic03,
  "ambulatorio-veterinario-dottor-pietro-de-rocco-lecce": clinic05,
  "ambulatorio-veterinario-leucavet-lecce": clinic06,
  "clinica-veterinaria-l-arca-lecce": clinic08,
  "clinica-veterinaria-lecce-sud-lecce": clinic11,
  "clinica-veterinaria-privata-citta-di-lecce-lecce": clinic02,
  "dottoressa-piera-bruno-lecce": clinic09,
  "marina-previtero-otranto": clinic07,
  "clinica-veterinaria-san-francesco-san-cesario-di-lecce": clinic13,
  "clinica-veterinaria-san-francesco-taviano": clinic12,
  "ambulatorio-veterinario-sant-antonio-tricase": clinic10,
};

export function getClinicImage(slug: string): string | undefined {
  return clinicImages[slug];
}
