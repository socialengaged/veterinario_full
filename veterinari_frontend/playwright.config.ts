import { defineConfig, devices } from "@playwright/test";

/**
 * E2E contro produzione (default) o locale:
 *   E2E_BASE_URL=https://veterinariovicino.it E2E_API_URL=https://api.veterinariovicino.it npx playwright test
 * Locale (dev server su 8080 + API 8060):
 *   E2E_BASE_URL=http://127.0.0.1:8080 E2E_API_URL=http://127.0.0.1:8060 npx playwright test
 * Avvio automatico Vite (solo se non già in ascolto su 8080):
 *   E2E_START_WEBSERVER=1 E2E_BASE_URL=http://127.0.0.1:8080 E2E_API_URL=http://127.0.0.1:8060 npx playwright test
 */
const baseURL = process.env.E2E_BASE_URL ?? "https://veterinariovicino.it";

const webServer =
  process.env.E2E_START_WEBSERVER === "1"
    ? {
        command: "npm run dev -- --host 127.0.0.1 --port 8080",
        url: "http://127.0.0.1:8080",
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
      }
    : undefined;

export default defineConfig({
  ...(webServer ? { webServer } : {}),
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : Number(process.env.PLAYWRIGHT_WORKERS) || 4,
  reporter: [["list"], ["html", { open: "never" }]],
  timeout: 60_000,
  use: {
    baseURL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    ignoreHTTPSErrors: false,
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});
