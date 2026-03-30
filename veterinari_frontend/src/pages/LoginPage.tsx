import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageMeta } from "@/components/PageMeta";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, LogIn, Loader2 } from "lucide-react";
import { postLogin, setAccessToken } from "@/lib/api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from || "/dashboard";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { access_token } = await postLogin(email.trim(), password);
      setAccessToken(access_token);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Credenziali non valide");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageMeta title="Accedi — VeterinarioVicino.it" description="Accedi al tuo account per le chat sulle richieste di assistenza." />
      <Header />
      <main className="bg-background min-h-[70vh] flex items-center justify-center py-12">
        <div className="w-full max-w-md mx-auto px-4">
          <div className="p-8 rounded-2xl border border-border bg-card shadow-sm">
            <div className="text-center mb-8">
              <LogIn className="h-10 w-10 text-primary mx-auto mb-3" />
              <h1 className="font-display text-2xl font-bold text-foreground">Accedi</h1>
              <p className="text-sm text-muted-foreground mt-1">Email e password usati in registrazione o impostati sul modulo richiesta</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="email" type="email" placeholder="la-tua@email.it" value={email} onChange={e => setEmail(e.target.value)} className="pl-10" required autoComplete="email" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="password" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} className="pl-10" required autoComplete="current-password" />
                </div>
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm border border-destructive/20">
                  {error}
                </div>
              )}

              <Button type="submit" variant="cta" className="w-full" disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Accedi"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              Non hai un account?{" "}
              <Link to="/registrati/" className="text-primary font-medium hover:underline">Registrati</Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
