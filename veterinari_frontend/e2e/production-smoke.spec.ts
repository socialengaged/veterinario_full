import { test, expect } from "@playwright/test";

const API = process.env.E2E_API_URL ?? "https://api.veterinariovicino.it";

test.describe("Produzione — smoke", () => {
  test("GET /health risponde ok", async ({ request }) => {
    const res = await request.get(`${API.replace(/\/$/, "")}/health`);
    expect(res.ok(), `HTTP ${res.status()}`).toBeTruthy();
    const body = await res.json();
    expect(body).toMatchObject({ status: "ok" });
  });

  test("Home: titolo e caricamento", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(page).toHaveTitle(/Veterinario/i);
    await expect(page.locator("body")).toBeVisible();
  });

  test("Pagina Accedi: form e chiamata API su submit", async ({ page }) => {
    await page.goto("/accedi/", { waitUntil: "networkidle" });
    await expect(page.getByRole("heading", { name: "Accedi" })).toBeVisible();
    await expect(page.locator("#email")).toBeVisible();
    await expect(page.locator("#password")).toBeVisible();

    const loginUrl = `${API.replace(/\/$/, "")}/auth/login`;
    const responsePromise = page.waitForResponse(
      res => res.url() === loginUrl && res.request().method() === "POST",
      { timeout: 25_000 }
    );

    await page.fill("#email", "e2e-smoke-nonexistent@example.com");
    await page.fill("#password", "WrongPassword123!");
    await page.getByRole("button", { name: "Accedi" }).click();

    const loginRes = await responsePromise;
    expect([401, 422]).toContain(loginRes.status());
  });

  test("Pagina Registrati: form visibile", async ({ page }) => {
    await page.goto("/registrati/", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { name: "Crea un account" })).toBeVisible();
  });

  test("Richiedi assistenza: titolo e checkbox verifica email + registrazione sito", async ({ page }) => {
    await page.goto("/richiedi-assistenza/", { waitUntil: "domcontentloaded" });
    await expect(
      page.getByRole("heading", { name: "Invia una richiesta di contatto veterinario" })
    ).toBeVisible();
    await expect(page.getByRole("checkbox", { name: /Ho compreso che devo verificare/i })).toBeVisible();
    await expect(page.getByRole("checkbox", { name: /Voglio registrarmi al sito/i })).toBeVisible();
  });

  test("Verify-email senza token: messaggio link non valido", async ({ page }) => {
    await page.goto("/verify-email", { waitUntil: "domcontentloaded" });
    await expect(page.getByText("Link non valido o incompleto.")).toBeVisible({ timeout: 10_000 });
  });
});
