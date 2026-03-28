import type { APIRequestContext, Page } from "@playwright/test";

/** Allineato a `veterinari_frontend/src/lib/api.ts` */
export const ACCESS_TOKEN_KEY = "vv_access_token";

export const defaultApiUrl = () =>
  (process.env.E2E_API_URL ?? "https://api.veterinariovicino.it").replace(/\/$/, "");

/** GET /health con retry (gateway 502 transitori). */
export async function isApiHealthy(request: APIRequestContext, retries = 3): Promise<boolean> {
  const base = defaultApiUrl();
  for (let i = 0; i < retries; i++) {
    try {
      const res = await request.get(`${base}/health`);
      if (res.ok()) {
        const j = await res.json().catch(() => null);
        if (j && typeof j === "object" && (j as { status?: string }).status === "ok") return true;
      }
    } catch {
      /* rete / TLS */
    }
    await new Promise(r => setTimeout(r, 2000));
  }
  return false;
}

/** Email univoca per non collidere con utenti reali / run precedenti. */
export function uniqueEmail(prefix: string): string {
  const t = Date.now();
  const r = Math.random().toString(36).slice(2, 8);
  return `${prefix}.${t}.${r}@e2e.example.com`;
}

export type CreateRequestApiBody = {
  email: string;
  full_name: string;
  phone?: string | null;
  city: string;
  province: string;
  cap?: string | null;
  animal_species: string;
  service: string;
  sub_service?: string | null;
  description?: string | null;
  contact_secondary?: string | null;
  email_verification_ack: boolean;
  registration_consent: boolean;
  marketing_consent?: boolean;
  password: string;
};

export type CreateRequestApiResponse = {
  access_token: string;
  conversation_id: string;
  user_id: string;
  request_id: string;
};

/** Crea utente + richiesta via API (stesso contratto del modulo /richiedi-assistenza). */
export async function apiCreateRequest(
  request: APIRequestContext,
  apiUrl: string,
  body: CreateRequestApiBody,
): Promise<CreateRequestApiResponse> {
  const res = await request.post(`${apiUrl}/requests`, {
    data: body,
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok()) {
    const txt = await res.text();
    throw new Error(`POST /requests failed ${res.status()}: ${txt}`);
  }
  return res.json() as Promise<CreateRequestApiResponse>;
}

export function buildDefaultRequestBody(email: string, password: string): CreateRequestApiBody {
  return {
    email,
    full_name: "E2E Test User",
    phone: null,
    city: "Lecce",
    province: "LE",
    cap: "73100",
    animal_species: "cane",
    service: "visita_generica",
    sub_service: null,
    description: "Messaggio automatico test E2E.",
    contact_secondary: null,
    email_verification_ack: true,
    registration_consent: true,
    marketing_consent: false,
    password,
  };
}

/** Imposta JWT prima del primo caricamento pagina (area dashboard). */
export async function injectAccessToken(page: Page, token: string): Promise<void> {
  await page.addInitScript(
    ([key, value]) => {
      localStorage.setItem(key, value);
    },
    [ACCESS_TOKEN_KEY, token] as [string, string],
  );
}

export async function clearSession(page: Page): Promise<void> {
  await page.context().clearCookies();
  await page.evaluate(() => {
    try {
      localStorage.clear();
    } catch {
      /* ignore */
    }
  });
}
