import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense } from "react";
import { CookieBanner } from "@/components/CookieBanner";
import { ErrorBoundary } from "@/components/ErrorBoundary";

import { PluralRedirects } from "@/components/PluralRedirects";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { GeolocationProvider } from "@/contexts/GeolocationContext";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";

const ProvincePage = lazy(() => import("./templates/ProvincePage"));
const CityPage = lazy(() => import("./templates/CityPage"));
const CityServicePage = lazy(() => import("./templates/CityServicePage"));
const ProfilePage = lazy(() => import("./templates/ProfilePage"));
const GuidePage = lazy(() => import("./templates/GuidePage"));
const GuidesIndex = lazy(() => import("./pages/GuidesIndex"));
const SingleSlugResolver = lazy(() => import("./pages/SingleSlugResolver"));
const DirectoryPage = lazy(() => import("./pages/DirectoryPage"));
const RequestPage = lazy(() => import("./pages/RequestPage"));
const OnlineConsultationPage = lazy(() => import("./pages/OnlineConsultationPage"));
const SitemapPage = lazy(() => import("./pages/SitemapPage"));
const SitemapHtmlPage = lazy(() => import("./pages/SitemapHtmlPage"));
const ServiziPage = lazy(() => import("./pages/ServiziPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const PrivacyPolicyPage = lazy(() => import("./pages/PrivacyPolicyPage"));
const CookiePolicyPage = lazy(() => import("./pages/CookiePolicyPage"));
const TerminiCondizioniPage = lazy(() => import("./pages/TerminiCondizioniPage"));
const VeterinariTerminiPage = lazy(() => import("./pages/VeterinariTerminiPage"));
const ComeFunzionaPage = lazy(() => import("./pages/ComeFunzionaPage"));
const MappaSitoDettagliata = lazy(() => import("./pages/MappaSitoDettagliata"));
const ContentAuditPage = lazy(() => import("./pages/ContentAuditPage"));
const ChatsListPage = lazy(() => import("./pages/ChatsListPage"));
const ChatDetailPage = lazy(() => import("./pages/ChatDetailPage"));
const VerifyEmailPage = lazy(() => import("./pages/VerifyEmailPage"));
const AccountProfilePage = lazy(() => import("./pages/AccountProfilePage"));
const VetRegisterPage = lazy(() => import("./pages/VetRegisterPage"));
const DashboardLayout = lazy(() => import("./components/dashboard/DashboardLayout"));
const DashboardHomePage = lazy(() => import("./pages/DashboardHomePage"));
const DashboardRequestsPage = lazy(() => import("./pages/DashboardRequestsPage"));
const DashboardAccountPage = lazy(() => import("./pages/DashboardAccountPage"));

const queryClient = new QueryClient();

const Loading = () => (
  <div className="flex min-h-screen flex-col bg-background">
    <div className="flex min-h-[60vh] flex-1 items-center justify-center">
      <div className="text-center">
        <div className="h-8 w-8 mx-auto animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <p className="mt-3 text-sm text-muted-foreground">Caricamento...</p>
      </div>
    </div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <GeolocationProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ErrorBoundary>
          <Suspense fallback={<Loading />}>
            <PluralRedirects />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/elenco/" element={<DirectoryPage />} />
              <Route path="/mappa-sito/" element={<SitemapHtmlPage />} />
              <Route path="/mappa-sito-dettagliata/" element={<MappaSitoDettagliata />} />
              <Route path="/sitemap-dynamic" element={<SitemapPage />} />
              <Route path="/richiedi-assistenza/" element={<RequestPage />} />
              <Route path="/consulenza-veterinaria-online/" element={<OnlineConsultationPage />} />
              <Route path="/servizi/" element={<ServiziPage />} />
              <Route path="/accedi/" element={<LoginPage />} />
              <Route path="/registrati/" element={<RegisterPage />} />
              <Route path="/verify-email" element={<VerifyEmailPage />} />
              <Route path="/iscrizione-veterinari/" element={<VetRegisterPage />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<DashboardHomePage />} />
                <Route path="richieste" element={<DashboardRequestsPage />} />
                <Route path="account" element={<DashboardAccountPage />} />
                <Route path="chat" element={<ChatsListPage />} />
                <Route path="chat/:conversationId" element={<ChatDetailPage />} />
                <Route path="chats" element={<ChatsListPage />} />
                <Route path="chats/:conversationId" element={<ChatDetailPage />} />
                <Route path="profilo" element={<AccountProfilePage />} />
              </Route>
              <Route path="/privacy-policy/" element={<PrivacyPolicyPage />} />
              <Route path="/cookie-policy/" element={<CookiePolicyPage />} />
              <Route path="/termini-condizioni/" element={<TerminiCondizioniPage />} />
              <Route path="/veterinari-termini/" element={<VeterinariTerminiPage />} />
              <Route path="/come-funziona/" element={<ComeFunzionaPage />} />
              <Route path="/content-audit/" element={<ContentAuditPage />} />
              <Route path="/guide/" element={<GuidesIndex />} />
              <Route path="/guide/:guideSlug/" element={<GuidePage />} />
              <Route path="/struttura/:slug/" element={<ProfilePage />} />
              <Route path="/veterinario/:slug/" element={<ProfilePage />} />
              <Route path="/:regionSlug/:provinceSlug/:citySlug/:serviceSlug/" element={<CityServicePage />} />
              <Route path="/:regionSlug/:provinceSlug/:citySlug/" element={<CityPage />} />
              <Route path="/:regionSlug/:provinceSlug/" element={<ProvincePage />} />
              <Route path="/:slug/" element={<SingleSlugResolver />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          </ErrorBoundary>
          <CookieBanner />
        </BrowserRouter>
      </GeolocationProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
