import { useState, useMemo } from "react";
import { Search, Mic, X, ChevronDown, Loader2, Brain, AlertCircle, Gauge } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { SYMPTOM_CATEGORIES, COMMON_SYMPTOMS, ALL_SYMPTOMS, mockPredict, type PredictionResponse } from "@/data/symptoms";
import { useToast } from "@/hooks/use-toast";

interface SymptomPanelProps {
  onResult: (result: PredictionResponse) => void;
}

const SymptomPanel = ({ onResult }: SymptomPanelProps) => {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedCat, setExpandedCat] = useState<string | null>(null);
  const { toast } = useToast();

  // human‑friendly display (underscores → spaces, capitalize)
  const pretty = (s: string) =>
    s
      .replace(/_/g, " ")
      .replace(/\b\w/g, (m) => m.toUpperCase());

  const filtered = useMemo(
    () => ALL_SYMPTOMS.filter((s) => s.toLowerCase().includes(search.toLowerCase()) && !selected.includes(s)),
    [search, selected]
  );

  const toggle = (s: string) => {
    setSelected((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));
  };

  const riskScore = useMemo(() => Math.min(100, selected.length * 12), [selected]);

  const handlePredict = async () => {
    if (selected.length < 2) {
      toast({ title: "Select at least 2 symptoms", description: "We need more data for an accurate prediction.", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const result = await mockPredict(selected);
      onResult(result);
    } catch (err: any) {
      toast({ title: "Prediction failed", description: String(err), variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="symptom-panel" className="py-20">
      <div className="section-container max-w-4xl">
        <div className="text-center mb-12 opacity-0 animate-fade-in">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-medium text-primary mb-4">
            <Brain className="h-3.5 w-3.5" /> Symptom Analysis Engine
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground">
            Smart Symptom Input
          </h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
            Select your symptoms below. Our AI analyzes patterns to predict possible conditions.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-8 glow-cyan">
          {/* Risk indicator */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
              <span className="flex items-center gap-1"><Gauge className="h-3.5 w-3.5" /> Risk Indicator</span>
              <span>{selected.length} symptom{selected.length !== 1 ? "s" : ""} selected</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${riskScore}%`,
                  background: riskScore < 30 ? "hsl(140 65% 50%)" : riskScore < 60 ? "hsl(45 90% 55%)" : "hsl(0 72% 55%)",
                }}
              />
            </div>
          </div>

          {/* Common symptoms quick-select */}
          <div className="mb-5">
            <p className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wider">Common Symptoms</p>
            <div className="flex flex-wrap gap-2">
              {COMMON_SYMPTOMS.map((s) => (
                <button
                  key={s}
                  onClick={() => toggle(s)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                    selected.includes(s)
                      ? "gradient-primary text-primary-foreground shadow-glow"
                      : "bg-muted text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
                  }`}
                >
                  {pretty(s)}
                </button>
              ))}
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search symptoms…"
              className="pl-10 pr-10 bg-muted/50 border-border/50 rounded-xl text-foreground placeholder:text-muted-foreground"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors" title="Voice input (demo)">
              <Mic className="h-4 w-4" />
            </button>
          </div>

          {/* Selected tags */}
          {selected.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {selected.map((s) => (
                <Badge
                  key={s}
                  className="pl-3 pr-1.5 py-1.5 text-xs gap-1 cursor-pointer gradient-primary text-primary-foreground border-0 hover:opacity-80 transition-opacity"
                  onClick={() => toggle(s)}
                >
                  {pretty(s)}
                  <X className="h-3 w-3" />
                </Badge>
              ))}
            </div>
          )}

          {/* Category accordion */}
          {!search && (
            <div className="space-y-2 mb-6 max-h-64 overflow-y-auto pr-1">
              {SYMPTOM_CATEGORIES.map((cat) => (
                <div key={cat.name} className="rounded-xl bg-muted/30 border border-border/30 overflow-hidden">
                  <button
                    onClick={() => setExpandedCat(expandedCat === cat.name ? null : cat.name)}
                    className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-foreground hover:bg-muted/50 transition-colors"
                  >
                    <span>{cat.icon} {cat.name}</span>
                    <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${expandedCat === cat.name ? "rotate-180" : ""}`} />
                  </button>
                  {expandedCat === cat.name && (
                    <div className="px-4 pb-3 flex flex-wrap gap-1.5">
                      {cat.symptoms.map((s) => (
                        <button
                          key={s}
                          onClick={() => toggle(s)}
                          className={`px-2.5 py-1 rounded-lg text-xs transition-all ${
                            selected.includes(s)
                              ? "gradient-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {pretty(s)}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Search results dropdown */}
          {search && (
            <div className="bg-muted/30 border border-border/30 rounded-xl max-h-48 overflow-y-auto mb-6">
              {filtered.length === 0 ? (
                <p className="text-sm text-muted-foreground p-4 text-center">No matching symptoms</p>
              ) : (
                filtered.slice(0, 15).map((s) => (
                  <button
                    key={s}
                    onClick={() => { toggle(s); setSearch(""); }}
                    className="w-full text-left px-4 py-2.5 text-sm hover:bg-muted/50 transition-colors text-foreground border-b border-border/20 last:border-0"
                  >
                    {pretty(s)}
                  </button>
                ))
              )}
            </div>
          )}

          {/* Minimum validation hint */}
          {selected.length > 0 && selected.length < 2 && (
            <p className="text-xs text-destructive flex items-center gap-1 mb-4">
              <AlertCircle className="h-3.5 w-3.5" /> Select at least 2 symptoms for prediction
            </p>
          )}

          {/* Submit */}
          <button
            onClick={handlePredict}
            disabled={loading}
            className="btn-glow w-full py-4 text-base flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" /> AI Scanning…
              </>
            ) : (
              <>
                <Brain className="h-5 w-5" /> Run AI Analysis
              </>
            )}
          </button>

          {/* Loading animation */}
          {loading && (
            <div className="mt-6 text-center">
              <div className="inline-flex items-center gap-3 glass-card rounded-full px-6 py-3">
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full bg-primary"
                      style={{ animation: `pulse-ring 1.2s ease-in-out ${i * 0.2}s infinite` }}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">Analyzing symptom patterns…</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SymptomPanel;
