import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { EmailVerificationBanner } from "@/components/EmailVerificationBanner";
import { cn } from "@/lib/utils";
import { LayoutDashboard, ClipboardList, MessageCircle, User, Shield } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";

const nav = [
  { to: "/dashboard", label: "Panoramica", icon: LayoutDashboard, end: true },
  { to: "/dashboard/richieste", label: "Le mie richieste", icon: ClipboardList, end: false },
  { to: "/dashboard/chat", label: "Chat", icon: MessageCircle, end: false },
  { to: "/dashboard/profilo", label: "Profilo e animali", icon: User, end: false },
  { to: "/dashboard/account", label: "Account", icon: Shield, end: false },
];

export default function DashboardLayout() {
  return (
    <>
      <Header />
      <EmailVerificationBanner />
      <main className="bg-background min-h-[50vh] border-t border-border">
        <div className="container flex flex-col gap-8 py-8 md:py-10 md:flex-row md:gap-10">
          <aside className="shrink-0 md:w-56">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-3">Area riservata</p>
            <nav className="flex flex-wrap gap-2 md:flex-col md:gap-1" aria-label="Area riservata">
              {nav.map(({ to, label, icon: Icon, end }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    cn(
                      "inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "bg-card text-muted-foreground hover:bg-accent hover:text-accent-foreground border border-border",
                    )
                  }
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {label}
                </NavLink>
              ))}
            </nav>
          </aside>
          <div className="min-w-0 flex-1">
            <Outlet />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
