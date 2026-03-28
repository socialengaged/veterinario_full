import { test, expect } from "@playwright/test";
import { fillRichiediAssistenza } from "./helpers-forms";
import { isApiHealthy, uniqueEmail } from "./helpers";

/**
 * Varie combinazioni animale × categoria servizio × sottoservizio (tutte anonime → POST /requests).
 * Eseguite in parallelo; email sempre univoca.
 */
const password = "E2EComboPass99!";

const combos: {
  name: string;
  animal: string;
  serviceCategory: string;
  subService: string;
  contact?: "email" | "sms";
}[] = [
  { name: "cane-visita-base", animal: "cane", serviceCategory: "visita", subService: "visita-base" },
  { name: "gatto-chirurgia-sterilizzazione", animal: "gatto", serviceCategory: "chirurgia", subService: "sterilizzazione" },
  { name: "lucertola-esotici", animal: "lucertola", serviceCategory: "animali-esotici", subService: "visita-esotici" },
  { name: "canarino-prevenzione", animal: "canarino", serviceCategory: "prevenzione", subService: "vaccinazioni" },
  { name: "cavallo-rurale", animal: "cavallo", serviceCategory: "rurale", subService: "visita-rurale" },
  { name: "cane-sms", animal: "cane", serviceCategory: "diagnostica", subService: "radiografia", contact: "sms" },
];

test.describe("Combinazioni servizio × animale (anonimo)", () => {
  test.describe.configure({ mode: "parallel" });

  let apiOk = false;
  test.beforeAll(async ({ request }) => {
    apiOk = await isApiHealthy(request);
  });

  test.beforeEach(({}, testInfo) => {
    testInfo.skip(!apiOk, "API non raggiungibile (GET /health)");
  });

  for (const c of combos) {
    test(`richiesta: ${c.name}`, async ({ page }) => {
      const email = uniqueEmail(`e2e.combo.${c.name.replace(/[^a-z0-9]/gi, "")}`);
      await page.goto("/richiedi-assistenza/", { waitUntil: "networkidle" });
      await fillRichiediAssistenza(page, {
        email,
        password,
        animal: c.animal,
        serviceCategory: c.serviceCategory,
        subService: c.subService,
        description: `E2E combo ${c.name}`,
        contact: c.contact ?? "email",
        phone: c.contact === "sms" ? "+39 340 1112233" : undefined,
      });
      const respPromise = page.waitForResponse(
        r => r.url().endsWith("/requests") && r.request().method() === "POST",
        { timeout: 90_000 },
      );
      await page.getByRole("button", { name: /Crea account e apri chat/i }).click();
      const resp = await respPromise;
      expect(resp.ok(), `POST /requests ${resp.status()}`).toBeTruthy();
      await page.waitForURL(/\/dashboard\/chat\//, { timeout: 45_000 });
    });
  }
});
