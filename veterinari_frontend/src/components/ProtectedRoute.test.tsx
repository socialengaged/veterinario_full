import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "@/components/ProtectedRoute";

const { mockGetAccessToken } = vi.hoisted(() => ({
  mockGetAccessToken: vi.fn<[], string | null>(),
}));

vi.mock("@/lib/api", async importOriginal => {
  const mod = await importOriginal<typeof import("@/lib/api")>();
  return { ...mod, getAccessToken: () => mockGetAccessToken() };
});

describe("ProtectedRoute", () => {
  it("reindirizza a /accedi/ se non c'è token (utente non loggato)", () => {
    mockGetAccessToken.mockReturnValue(null);
    render(
      <MemoryRouter initialEntries={["/dashboard/profilo"]}>
        <Routes>
          <Route path="/accedi/" element={<div>Pagina accesso</div>} />
          <Route
            path="/dashboard/profilo"
            element={
              <ProtectedRoute>
                <div>Area protetta</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>,
    );
    expect(screen.getByText("Pagina accesso")).toBeInTheDocument();
  });

  it("mostra i figli se c'è token (utente loggato)", () => {
    mockGetAccessToken.mockReturnValue("fake-jwt-token");
    render(
      <MemoryRouter initialEntries={["/dashboard/profilo"]}>
        <Routes>
          <Route path="/accedi/" element={<div>Pagina accesso</div>} />
          <Route
            path="/dashboard/profilo"
            element={
              <ProtectedRoute>
                <div>Area protetta</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>,
    );
    expect(screen.getByText("Area protetta")).toBeInTheDocument();
  });
});
