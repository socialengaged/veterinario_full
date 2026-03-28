import { expect, type Page } from "@playwright/test";

export type RichiediOptions = {
  email: string;
  password: string;
  fullName?: string;
  animal?: string;
  serviceCategory?: string;
  subService?: string;
  city?: string;
  province?: string;
  cap?: string;
  description?: string;
  /** default solo email */
  contact?: "email" | "sms" | "whatsapp";
  phone?: string;
};

/**
 * Compila il modulo /richiedi-assistenza/ (tutti i campi obbligatori + consensi).
 * Usa label accessibili come nel componente React.
 */
export async function fillRichiediAssistenza(page: Page, o: RichiediOptions): Promise<void> {
  const name = o.fullName ?? "Utente E2E Test";
  await page.getByLabel("Animale *").selectOption(o.animal ?? "cane");
  await page.getByLabel("Categoria servizio *").selectOption(o.serviceCategory ?? "visita");
  const sub = o.subService ?? "visita-base";
  const subSelect = page.getByLabel("Servizio specifico");
  await expect(subSelect).toBeEnabled({ timeout: 10_000 });
  await subSelect.selectOption(sub);

  await page.getByLabel("Città *").fill(o.city ?? "Lecce");
  await page.getByLabel("Provincia *").fill(o.province ?? "LE");
  const cap = page.getByLabel("CAP");
  if (await cap.isVisible()) {
    await cap.fill(o.cap ?? "73100");
  }

  await page.getByLabel("Nome e cognome *").fill(name);
  await page.getByLabel("Email *").fill(o.email);

  const contact = o.contact ?? "email";
  if (contact === "sms") {
    await page.getByRole("radio", { name: "Email e SMS" }).check();
    await page.locator('input[type="tel"]').first().fill(o.phone ?? "+39 333 1234567");
  } else if (contact === "whatsapp") {
    await page.getByRole("radio", { name: "Email e WhatsApp" }).check();
    await page.locator('input[type="tel"]').first().fill(o.phone ?? "+39 333 1234567");
  } else {
    await page.getByRole("radio", { name: "Solo email" }).check();
  }

  await page.getByLabel("Password *").fill(o.password);

  if (o.description) {
    await page.getByLabel("Note aggiuntive").fill(o.description);
  }

  await page.getByRole("checkbox", { name: /Ho compreso che devo verificare/i }).check();
  await page.getByRole("checkbox", { name: /Voglio registrarmi al sito/i }).check();
  await page.getByRole("checkbox", { name: /Acconsento al trattamento dei miei dati personali/i }).check();
}
