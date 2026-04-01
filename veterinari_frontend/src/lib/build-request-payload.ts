import type { CreateRequestPayload } from "@/lib/api";
import { resolveServiceForRequest } from "@/lib/request-taxonomy";

export type RequestFormFields = {
  email: string;
  full_name: string;
  phone: string;
  city: string;
  province: string;
  cap?: string;
  animal: string;
  serviceCategory: string;
  subService: string;
  description: string;
  /** "" | "sms" | "whatsapp" — email sempre inclusa */
  contactSecondary: string;
  marketing: boolean;
  emailVerificationAck: boolean;
  registrationConsent: boolean;
  password?: string;
};

export function buildCreateRequestPayload(f: RequestFormFields): CreateRequestPayload {
  const service = resolveServiceForRequest(f.serviceCategory, f.subService);
  const pw = f.password?.trim();
  const sec = f.contactSecondary.trim().toLowerCase();
  const contact_secondary =
    sec === "sms" || sec === "whatsapp" ? sec : null;
  const phoneTrim = f.phone?.trim() || "";

  return {
    email: f.email.trim(),
    full_name: f.full_name.trim(),
    phone: phoneTrim || null,
    city: f.city.trim(),
    province: f.province.trim().toUpperCase().slice(0, 8),
    cap: f.cap?.trim() || null,
    animal_species: f.animal,
    animal_name: null,
    service,
    sub_service: f.subService || null,
    urgency: "normale",
    description: f.description?.trim() || null,
    contact_secondary,
    email_verification_ack: f.emailVerificationAck,
    registration_consent: f.registrationConsent,
    marketing_consent: f.marketing,
    password: pw ? pw : null,
  };
}

export type ConsultationTier = "std_15_30" | "std_30_50" | "specialist_100";

/** Modulo consulenza online (solo cani/gatti) — allinea a POST /requests con service consultazione_online. */
export function buildOnlineConsultationPayload(
  f: Omit<RequestFormFields, "serviceCategory" | "subService"> & { consultationTier: ConsultationTier },
): CreateRequestPayload {
  const pw = f.password?.trim();
  const sec = f.contactSecondary.trim().toLowerCase();
  const contact_secondary =
    sec === "sms" || sec === "whatsapp" ? sec : null;
  const phoneTrim = f.phone?.trim() || "";

  return {
    email: f.email.trim(),
    full_name: f.full_name.trim(),
    phone: phoneTrim || null,
    city: f.city.trim(),
    province: f.province.trim().toUpperCase().slice(0, 8),
    cap: f.cap?.trim() || null,
    animal_species: f.animal,
    animal_name: null,
    service: "consultazione_online",
    sub_service: null,
    urgency: "normale",
    description: f.description?.trim() || null,
    contact_secondary,
    email_verification_ack: f.emailVerificationAck,
    registration_consent: f.registrationConsent,
    marketing_consent: f.marketing,
    password: pw ? pw : null,
    source_page: "/consulenza-veterinaria-online/",
    consultation_online: true,
    consultation_tier: f.consultationTier,
  };
}
