import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageMeta } from "@/components/PageMeta";

// ── Internal thin-content audit (noindex) ──

interface AuditRow {
  tipo: string;
  totale: number;
  conContenutoRicco: number;
  thin: number;
  note: string;
}

const data: AuditRow[] = [
  // ── GEO ──
  { tipo: "Regioni", totale: 20, conContenutoRicco: 20, thin: 0, note: "✅ 100 % — AI premium su tutte" },
  { tipo: "Province", totale: 107, conContenutoRicco: 107, thin: 0, note: "✅ 100 % — AI content su tutte le 107 province italiane" },
  { tipo: "Città (con cliniche)", totale: 780, conContenutoRicco: 630, thin: 150, note: "✅ 609 città arricchite con dati territoriali (intro, attrazioni, gastronomia) + 21 con AI premium. ~150 ancora con solo generatore base" },
  { tipo: "Città × Servizio", totale: 780 * 40, conContenutoRicco: 37, thin: 780 * 40 - 37, note: "🔴 Quasi tutte parametriche. 37 combinazioni hanno contenuto dedicato" },

  // ── SERVIZI ──
  { tipo: "Servizi (landing)", totale: 40, conContenutoRicco: 40, thin: 0, note: "✅ 100 % — Editorial + immagini + consigli/costi" },
  { tipo: "Servizio × Animale", totale: 319, conContenutoRicco: 319, thin: 0, note: "✅ 100 % — 319 combinazioni con specificFacts (34 animali × 25 servizi). Copertura specificFacts: 100%" },

  // ── GUIDE ──
  { tipo: "Guide", totale: 21, conContenutoRicco: 21, thin: 0, note: "✅ 100 % — Contenuto AI + immagini editoriali" },

  // ── KEYWORD ──
  { tipo: "Keyword × Città (veterinario-{città})", totale: 4 * 780, conContenutoRicco: 0, thin: 4 * 780, note: "🔴 Tutte parametriche (4 pattern generali × ~780 città)" },
  { tipo: "Keyword Animale × Città", totale: 4 * 780, conContenutoRicco: 0, thin: 4 * 780, note: "🔴 Tutte parametriche (4 pattern animale × ~780 città)" },
  { tipo: "Keyword Specialità × Città", totale: 7 * 780, conContenutoRicco: 0, thin: 7 * 780, note: "🔴 Tutte parametriche (7 pattern specialità × ~780 città)" },

  // ── PROFILI ──
  { tipo: "Profili cliniche/veterinari", totale: 3148, conContenutoRicco: 3148, thin: 0, note: "✅ 100% — Generatore parametrico arricchito: servizi scraping, analisi recensioni, consigli pratici, FAQ 7-8 voci. ~300-400 parole per profilo" },
];

const totalPages = data.reduce((s, r) => s + r.totale, 0);
const totalRich = data.reduce((s, r) => s + r.conContenutoRicco, 0);
const totalThin = data.reduce((s, r) => s + r.thin, 0);

function pct(n: number, tot: number) {
  return tot > 0 ? `${((n / tot) * 100).toFixed(1)}%` : "—";
}

function statusColor(thin: number, totale: number) {
  const ratio = thin / totale;
  if (ratio === 0) return "bg-emerald-100 text-emerald-800";
  if (ratio < 0.5) return "bg-amber-100 text-amber-800";
  return "bg-red-100 text-red-800";
}

export default function ContentAuditPage() {
  return (
    <>
      <PageMeta
        title="Content Audit — Mappa interna thin content"
        description="Audit interno dei contenuti thin"
        canonical="/content-audit/"
        robots="noindex, nofollow"
      />
      <Header />
      <main className="bg-background min-h-screen">
        <div className="container py-8 md:py-12 max-w-5xl space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">🔒 Pagina interna — noindex</span>
            <h1 className="font-display text-3xl font-extrabold text-foreground">
              Mappa Thin Content
            </h1>
            <p className="text-muted-foreground text-sm max-w-2xl">
              Panoramica della copertura editoriale su tutte le tipologie di pagina.
              Le pagine "thin" usano il generatore parametrico o dati minimi CSV — non hanno contenuto AI editoriale dedicato.
            </p>
          </div>

          {/* Summary cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <SummaryCard label="Pagine totali" value={totalPages.toLocaleString("it-IT")} />
            <SummaryCard label="Con contenuto ricco" value={totalRich.toLocaleString("it-IT")} accent />
            <SummaryCard label="Thin content" value={totalThin.toLocaleString("it-IT")} warn />
            <SummaryCard label="Copertura ricca" value={pct(totalRich, totalPages)} />
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 text-left">
                  <th className="px-4 py-3 font-semibold">Tipo pagina</th>
                  <th className="px-4 py-3 font-semibold text-right">Totale</th>
                  <th className="px-4 py-3 font-semibold text-right">Ricche</th>
                  <th className="px-4 py-3 font-semibold text-right">Thin</th>
                  <th className="px-4 py-3 font-semibold text-right">Copertura</th>
                  <th className="px-4 py-3 font-semibold">Note</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, i) => (
                  <tr key={i} className="border-t border-border hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 font-medium">{row.tipo}</td>
                    <td className="px-4 py-3 text-right tabular-nums">{row.totale.toLocaleString("it-IT")}</td>
                    <td className="px-4 py-3 text-right tabular-nums">{row.conContenutoRicco.toLocaleString("it-IT")}</td>
                    <td className="px-4 py-3 text-right tabular-nums">
                      <span className={`inline-block px-2 py-0.5 rounded-md text-xs font-semibold ${statusColor(row.thin, row.totale)}`}>
                        {row.thin.toLocaleString("it-IT")}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums font-medium">{pct(row.conContenutoRicco, row.totale)}</td>
                    <td className="px-4 py-3 text-xs text-muted-foreground max-w-xs">{row.note}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-border bg-muted/50 font-bold">
                  <td className="px-4 py-3">TOTALE</td>
                  <td className="px-4 py-3 text-right tabular-nums">{totalPages.toLocaleString("it-IT")}</td>
                  <td className="px-4 py-3 text-right tabular-nums">{totalRich.toLocaleString("it-IT")}</td>
                  <td className="px-4 py-3 text-right tabular-nums">{totalThin.toLocaleString("it-IT")}</td>
                  <td className="px-4 py-3 text-right tabular-nums">{pct(totalRich, totalPages)}</td>
                  <td className="px-4 py-3"></td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Priority list */}
          <section className="space-y-4">
            <h2 className="font-display text-2xl font-bold text-foreground">Priorità di intervento</h2>
            <ol className="space-y-3 text-sm">
              <PriorityItem n={1} label="Profili cliniche" impact="Completato" effort="—"
                desc="✅ Tutti i 3.148 profili con generatore parametrico arricchito: servizi scraping, analisi recensioni Google, FAQ dinamiche 7-8 voci, ~300-400 parole per profilo." />
              <PriorityItem n={2} label="Città rimanenti" impact="Medio" effort="Basso"
                desc="~150 città minori ancora con generatore parametrico base. Le 630 principali sono arricchite con dati territoriali (attrazioni, gastronomia, contesto locale)." />
              <PriorityItem n={3} label="Province" impact="Completato" effort="—"
                desc="✅ Tutte le 107 province italiane con contenuto AI editoriale premium. Copertura 100%." />
              <PriorityItem n={4} label="Servizio × Animale" impact="Completato" effort="—"
                desc="✅ Tutte le 319 combinazioni (34 animali × 25 servizi) con specificFacts unici. Copertura 100%." />
              <PriorityItem n={5} label="Keyword × Città" impact="Medio" effort="Alto"
                desc="~11.700 pagine keyword tutte parametriche. Migliorare il generatore parametrico con più varianti e dati locali reali." />
              <PriorityItem n={6} label="Città × Servizio" impact="Basso" effort="Alto"
                desc="~31.200 pagine. Volume enorme, migliorabile solo via generatore parametrico potenziato." />
            </ol>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

function SummaryCard({ label, value, accent, warn }: { label: string; value: string; accent?: boolean; warn?: boolean }) {
  return (
    <div className={`rounded-xl border p-4 ${accent ? "border-emerald-300 bg-emerald-50" : warn ? "border-red-300 bg-red-50" : "border-border bg-card"}`}>
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className={`text-2xl font-bold tabular-nums ${accent ? "text-emerald-700" : warn ? "text-red-700" : "text-foreground"}`}>{value}</p>
    </div>
  );
}

function PriorityItem({ n, label, impact, effort, desc }: { n: number; label: string; impact: string; effort: string; desc: string }) {
  return (
    <li className="flex gap-3 p-4 rounded-xl border border-border bg-card">
      <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">{n}</span>
      <div className="space-y-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-foreground">{label}</span>
          <span className="text-xs px-2 py-0.5 rounded bg-amber-100 text-amber-800">Impatto: {impact}</span>
          <span className="text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-800">Sforzo: {effort}</span>
        </div>
        <p className="text-muted-foreground text-xs">{desc}</p>
      </div>
    </li>
  );
}
