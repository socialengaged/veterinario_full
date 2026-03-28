const TOKEN_KEY = "vv_access_token";

export function getApiBaseUrl(): string {
  const u = import.meta.env.VITE_API_BASE_URL;
  if (!u || typeof u !== "string") {
    return "http://127.0.0.1:8060";
  }
  return u.replace(/\/$/, "");
}

export function getAccessToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setAccessToken(token: string): void {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch {
    /* ignore */
  }
}

export function clearAccessToken(): void {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch {
    /* ignore */
  }
}

function parseApiError(detail: unknown): string {
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail)) {
    const first = detail[0];
    if (first && typeof first === "object" && "msg" in first) {
      return String((first as { msg: string }).msg);
    }
    return JSON.stringify(detail);
  }
  return "Errore di rete o server";
}

export type CreateRequestPayload = {
  email: string;
  phone?: string | null;
  city: string;
  province: string;
  cap?: string | null;
  full_name: string;
  animal_species: string;
  animal_name?: string | null;
  service: string;
  sub_service?: string | null;
  urgency?: string;
  description?: string | null;
  contact_method?: string;
  contact_secondary?: string | null;
  email_verification_ack: boolean;
  registration_consent: boolean;
  marketing_consent?: boolean;
  password?: string | null;
};

export type CreateRequestResponse = {
  success: boolean;
  user_id: string;
  request_id: string;
  conversation_id: string;
  email_verified: boolean;
  redirect_url: string;
  access_token: string;
  token_type: string;
};

export type ConversationListItem = {
  id: string;
  request_id: string;
  created_at: string;
  last_message_preview: string | null;
};

export type MessageOut = {
  id: string;
  sender_role: string;
  body: string;
  created_at: string;
};

export type ConversationDetail = {
  id: string;
  request_id: string;
  created_at: string;
  messages: MessageOut[];
};

type FetchOpts = {
  method?: string;
  body?: unknown;
  auth?: boolean;
};

export async function apiFetch<T>(path: string, opts: FetchOpts = {}): Promise<T> {
  const { method = "GET", body, auth = true } = opts;
  const headers: Record<string, string> = {
    Accept: "application/json",
  };
  if (body !== undefined) {
    headers["Content-Type"] = "application/json";
  }
  if (auth) {
    const t = getAccessToken();
    if (t) headers.Authorization = `Bearer ${t}`;
  }

  const res = await fetch(`${getApiBaseUrl()}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();
  let json: unknown = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    json = null;
  }

  if (!res.ok) {
    const errObj = json && typeof json === "object" ? (json as Record<string, unknown>) : {};
    const detail = errObj.detail;
    throw new Error(parseApiError(detail ?? (text || res.statusText)));
  }

  return json as T;
}

export async function postRequests(payload: CreateRequestPayload): Promise<CreateRequestResponse> {
  return apiFetch<CreateRequestResponse>("/requests", {
    method: "POST",
    body: payload,
    auth: false,
  });
}

export async function postLogin(email: string, password: string): Promise<{ access_token: string; token_type: string }> {
  return apiFetch("/auth/login", {
    method: "POST",
    body: { email, password },
    auth: false,
  });
}

export async function getChats(): Promise<ConversationListItem[]> {
  return apiFetch<ConversationListItem[]>("/dashboard/chats", { auth: true });
}

export async function getChat(conversationId: string): Promise<ConversationDetail> {
  return apiFetch<ConversationDetail>(`/dashboard/chats/${conversationId}`, { auth: true });
}

export async function postChatMessage(conversationId: string, body: string): Promise<MessageOut> {
  return apiFetch<MessageOut>(`/dashboard/chats/${conversationId}/messages`, {
    method: "POST",
    body: { body },
    auth: true,
  });
}

export type UserMe = {
  id: string;
  email: string;
  full_name: string;
  phone: string | null;
  email_verified: boolean;
};

export async function getMe(): Promise<UserMe> {
  return apiFetch<UserMe>("/auth/me", { auth: true });
}

export async function postVerifyEmail(token: string): Promise<{ ok: boolean }> {
  return apiFetch<{ ok: boolean }>("/auth/verify-email", {
    method: "POST",
    body: { token },
    auth: false,
  });
}

export async function postResendVerification(): Promise<{ ok: boolean }> {
  return apiFetch<{ ok: boolean }>("/auth/resend-verification", {
    method: "POST",
    body: {},
    auth: true,
  });
}

export type AddressRow = {
  id: string;
  city: string;
  province: string;
  cap: string | null;
  street: string | null;
  label: string | null;
  created_at: string;
};

export type AnimalRow = {
  id: string;
  species: string;
  name: string | null;
  notes: string | null;
  created_at: string;
};

export type SpecialistLink = {
  id: string;
  full_name: string;
  email: string;
  city: string;
  province: string;
  is_active: boolean;
};

export type UserProfile = {
  id: string;
  email: string;
  full_name: string;
  phone: string | null;
  email_verified: boolean;
  profile_notes_for_vets: string | null;
  addresses: AddressRow[];
  animals: AnimalRow[];
  linked_specialist: SpecialistLink | null;
};

export async function getUserProfile(): Promise<UserProfile> {
  return apiFetch<UserProfile>("/users/me/profile", { auth: true });
}

export async function patchUserProfile(body: {
  full_name?: string;
  phone?: string | null;
  profile_notes_for_vets?: string | null;
}): Promise<UserProfile> {
  return apiFetch<UserProfile>("/users/me", { method: "PATCH", body, auth: true });
}

export async function postUserAddress(body: {
  city: string;
  province: string;
  cap?: string | null;
  street?: string | null;
  label?: string | null;
}): Promise<AddressRow> {
  return apiFetch<AddressRow>("/users/me/addresses", { method: "POST", body, auth: true });
}

export async function patchUserAddress(
  id: string,
  body: {
    city?: string;
    province?: string;
    cap?: string | null;
    street?: string | null;
    label?: string | null;
  },
): Promise<AddressRow> {
  return apiFetch<AddressRow>(`/users/me/addresses/${id}`, { method: "PATCH", body, auth: true });
}

export async function deleteUserAddress(id: string): Promise<void> {
  await apiFetch<unknown>(`/users/me/addresses/${id}`, { method: "DELETE", auth: true });
}

export async function postUserAnimal(body: {
  species: string;
  name?: string | null;
  notes?: string | null;
}): Promise<AnimalRow> {
  return apiFetch<AnimalRow>("/users/me/animals", { method: "POST", body, auth: true });
}

export async function patchUserAnimal(
  id: string,
  body: { species?: string; name?: string | null; notes?: string | null },
): Promise<AnimalRow> {
  return apiFetch<AnimalRow>(`/users/me/animals/${id}`, { method: "PATCH", body, auth: true });
}

export async function deleteUserAnimal(id: string): Promise<void> {
  await apiFetch<unknown>(`/users/me/animals/${id}`, { method: "DELETE", auth: true });
}

export type SpecialtyPublic = { slug: string; name: string; category: string };

export async function getSpecialtiesPublic(): Promise<SpecialtyPublic[]> {
  return apiFetch<SpecialtyPublic[]>("/specialists/specialties", { auth: false });
}

export type SpecialistDuplicateDetail = {
  candidates: {
    id: string;
    full_name: string;
    email: string;
    city: string;
    province: string;
    cap: string | null;
    street_address: string | null;
  }[];
};

export async function postSpecialistRegister(
  body: Record<string, unknown>,
): Promise<{ success: boolean; user_id: string; email_verified: boolean; merge_pending: boolean }> {
  const res = await fetch(`${getApiBaseUrl()}/specialists/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  let json: unknown = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    json = null;
  }
  if (res.status === 409 && json && typeof json === "object" && json !== null && "detail" in json) {
    const err = new Error("DUPLICATE_CANDIDATES");
    const det = (json as { detail: unknown }).detail;
    (err as Error & { detail: SpecialistDuplicateDetail }).detail =
      typeof det === "object" && det !== null && "candidates" in (det as object)
        ? (det as SpecialistDuplicateDetail)
        : { candidates: [] };
    throw err;
  }
  if (!res.ok) {
    const errObj = json && typeof json === "object" ? (json as Record<string, unknown>) : {};
    throw new Error(parseApiError(errObj.detail ?? text));
  }
  return json as { success: boolean; user_id: string; email_verified: boolean; merge_pending: boolean };
}
