import { test, expect } from "@playwright/test";
import { fillRichiediAssistenza } from "./helpers-forms";
import { isApiHealthy, uniqueEmail } from "./helpers";

test.describe("Percorsi anonimi — navigazione (senza API)", () => {
  test("home: titolo e link al modulo richiesta", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(page).toHaveTitle(/Veterinario/i);
    await expect(page.locator('a[href="/richiedi-assistenza/"]').first()).toBeVisible();
  });

  test("servizi e come funziona caricano", async ({ page }) => {
    await page.goto("/servizi/", { waitUntil: "domcontentloaded" });
    await expect(page.locator("body")).toBeVisible();
    await page.goto("/come-funziona/", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { name: /Come funziona/i })).toBeVisible();
  });

  test("registrati: intestazione visibile", async ({ page }) => {
    await page.goto("/registrati/", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { name: /Crea un account|account/i })).toBeVisible();
  });

  test("verify-email senza token: messaggio errore", async ({ page }) => {
    await page.goto("/verify-email", { waitUntil: "domcontentloaded" });
    await expect(page.getByText(/Link non valido|non valido|incompleto/i)).toBeVisible({ timeout: 15_000 });
  });
});

test.describe("Percorsi anonimi — richiedono API attiva", () => {
  let apiOk = false;

  test.beforeAll(async ({ request }) => {
    apiOk = await isApiHealthy(request);
  });

  test.beforeEach(({}, testInfo) => {
    testInfo.skip(!apiOk, "API non raggiungibile (GET /health)");
  });

  test("accedi: credenziali errate → 401", async ({ page }) => {
    await page.goto("/accedi/", { waitUntil: "networkidle" });
    const responsePromise = page.waitForResponse(
      r => r.url().includes("/auth/login") && r.request().method() === "POST",
      { timeout: 25_000 },
    );
    await page.fill("#email", "e2e-non-esiste@example.com");
    await page.fill("#password", "WrongPass999!");
    await page.getByRole("button", { name: "Accedi" }).click();
    const loginRes = await responsePromise;
    expect([401, 422]).toContain(loginRes.status());
  });

  test("richiedi assistenza: invio completo → redirect dashboard chat", async ({ page }) => {
    const email = uniqueEmail("e2e.anon");
    const password = "E2ETestPass99!";
    await page.goto("/richiedi-assistenza/", { waitUntil: "networkidle" });
    await expect(
      page.getByRole("heading", { name: /Invia una richiesta di contatto veterinario/i }),
    ).toBeVisible();

    await fillRichiediAssistenza(page, {
      email,
      password,
      fullName: "Test Anonimo E2E",
      animal: "cane",
      serviceCategory: "visita",
      subService: "visita-base",
      description: "Test Playwright anonimo.",
      contact: "email",
    });

    const respPromise = page.waitForResponse(
      r => r.url().endsWith("/requests") && r.request().method() === "POST",
      { timeout: 60_000 },
    );
    await page.getByRole("button", { name: /Crea account e apri chat/i }).click();
    const resp = await respPromise;
    expect(resp.ok(), `POST /requests ${resp.status()}`).toBeTruthy();

    await page.waitForURL(/\/dashboard\/chat\//, { timeout: 30_000 });
    await expect(page.getByRole("heading", { name: /Conversazione|Chat/i })).toBeVisible({ timeout: 15_000 });
  });

  test("richiedi assistenza con query: animale + località", async ({ page }) => {
    await page.goto("/richiedi-assistenza/?animale=gatto&localita=Gallipoli", { waitUntil: "networkidle" });
    await expect(
      page.getByRole("heading", { name: /Invia una richiesta di contatto veterinario/i }),
    ).toBeVisible({ timeout: 30_000 });
    const animal = page.locator("select").first();
    await expect(animal).toHaveValue("gatto");
    await expect(page.getByLabel("Città *")).toHaveValue(/Gallipoli/i);
  });

  test("richiedi assistenza: canale WhatsApp + telefono → chat", async ({ page }) => {
    await page.goto("/richiedi-assistenza/", { waitUntil: "networkidle" });
    const email = uniqueEmail("e2e.wa");
    await fillRichiediAssistenza(page, {
      email,
      password: "E2ETestPass99!",
      contact: "whatsapp",
      phone: "+39 340 0000000",
      animal: "coniglio",
      serviceCategory: "visita",
      subService: "visita-base",
    });
    const respPromise = page.waitForResponse(
      r => r.url().endsWith("/requests") && r.request().method() === "POST",
      { timeout: 60_000 },
    );
    await page.getByRole("button", { name: /Crea account e apri chat/i }).click();
    await respPromise;
    await page.waitForURL(/\/dashboard\/chat\//, { timeout: 60_000 });
  });

  test("iscrizione veterinari: pagina e caricamento specialità", async ({ page }) => {
    await page.goto("/iscrizione-veterinari/", { waitUntil: "networkidle" });
    await expect(page.getByRole("heading", { name: /Iscrizione professionista/i })).toBeVisible({ timeout: 15_000 });
    await expect(page.locator("form").first()).toBeVisible({ timeout: 15_000 });
  });
});
