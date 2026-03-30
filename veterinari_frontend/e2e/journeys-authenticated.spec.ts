import { test, expect } from "@playwright/test";
import {
  apiCreateRequest,
  buildDefaultRequestBody,
  clearSession,
  defaultApiUrl,
  injectAccessToken,
  isApiHealthy,
  uniqueEmail,
} from "./helpers";

const API = defaultApiUrl();

test.describe("Utente loggato — chat, profilo, login UI", () => {
  test.describe.configure({ mode: "serial" });

  let email = "";
  const password = "E2EAuthPass99!";
  let token = "";
  let conversationId = "";
  /** false se /health fallisce o POST /requests fallisce */
  let setupOk = false;

  test.beforeAll(async ({ request }) => {
    const healthy = await isApiHealthy(request);
    if (!healthy) return;
    email = uniqueEmail("e2e.auth");
    try {
      const out = await apiCreateRequest(request, API, buildDefaultRequestBody(email, password));
      token = out.access_token;
      conversationId = out.conversation_id;
      setupOk = true;
    } catch {
      setupOk = false;
    }
  });

  test.beforeEach(({}, testInfo) => {
    testInfo.skip(!setupOk, "API non raggiungibile o setup POST /requests fallito");
  });

  test("dashboard chat: invio messaggio nella conversazione", async ({ page }) => {
    await injectAccessToken(page, token);
    await page.goto(`/dashboard/chat/${conversationId}`, { waitUntil: "networkidle" });
    await expect(page.locator("h1").first()).toBeVisible({ timeout: 20_000 });
    await expect(page.getByText(/Messaggio automatico test E2E/i)).toBeVisible({ timeout: 15_000 });
    const msg = `Messaggio E2E ${Date.now()}`;
    await page.getByPlaceholder(/Scrivi un messaggio/i).fill(msg);
    await page.getByRole("button", { name: /^Invia$/ }).click();
    await expect(page.getByText(msg)).toBeVisible({ timeout: 15_000 });
  });

  test("lista chat e link profilo", async ({ page }) => {
    await injectAccessToken(page, token);
    await page.goto("/dashboard/chat", { waitUntil: "networkidle" });
    await expect(page.getByRole("heading", { name: /Le mie chat/i })).toBeVisible({ timeout: 15_000 });
    await page.getByRole("link", { name: /Profilo e animali/i }).click();
    await expect(page).toHaveURL(/\/dashboard\/profilo/);
    await expect(page.getByRole("heading", { name: /Il mio profilo/i })).toBeVisible();
  });

  test("profilo: salvataggio note (PATCH)", async ({ page }) => {
    await injectAccessToken(page, token);
    await page.goto("/dashboard/profilo", { waitUntil: "networkidle" });
    const note = `Nota E2E ${Date.now()}`;
    await page.getByLabel(/Note sul profilo/i).fill(note);
    const patch = page.waitForResponse(
      r => r.url().includes("/users/me") && r.request().method() === "PATCH" && r.ok(),
      { timeout: 20_000 },
    );
    await page.getByRole("button", { name: /Salva dati/i }).click();
    await patch;
    await page.reload({ waitUntil: "networkidle" });
    await expect(page.getByLabel(/Note sul profilo/i)).toHaveValue(note);
  });

  test("logout locale e login da /accedi", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await clearSession(page);
    await page.goto(`/dashboard/chat/${conversationId}`, { waitUntil: "networkidle" });
    await expect(page).toHaveURL(/\/accedi\//);
    await page.fill("#email", email);
    await page.fill("#password", password);
    const loginPost = page.waitForResponse(
      r => r.url().includes("/auth/login") && r.request().method() === "POST",
      { timeout: 30_000 },
    );
    await page.getByRole("button", { name: "Accedi" }).click();
    const loginRes = await loginPost;
    expect(loginRes.ok(), `login ${loginRes.status()}`).toBeTruthy();
    await page.waitForURL(/\/dashboard\/?$/, { timeout: 25_000 });
  });
});
