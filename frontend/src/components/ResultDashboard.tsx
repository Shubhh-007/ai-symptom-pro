import { RotateCcw, UserCheck, Clock, ArrowRight, Heart, Salad, Dumbbell, Shield } from "lucide-react";
import CircularProgress from "./CircularProgress";
import SeverityMeter from "./SeverityMeter";
import type { PredictionResponse } from "@/data/symptoms";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { useToast } from "@/hooks/use-toast";

interface ResultDashboardProps {
  result: PredictionResponse;
  onClear: () => void;
}

const CHART_COLORS = ["hsl(185, 75%, 55%)", "hsl(210, 80%, 55%)", "hsl(170, 65%, 45%)", "hsl(45, 90%, 55%)"];

const ResultDashboard = ({ result, onClear }: ResultDashboardProps) => {
  const { primary, alternatives, symptomContributions } = result;
  const { toast } = useToast();

  const riskClass = primary.riskLevel === "Low" ? "risk-badge-low" : primary.riskLevel === "Moderate" ? "risk-badge-moderate" : "risk-badge-high";

  const allDiseases = [
    { name: primary.disease, value: primary.confidence },
    ...alternatives.map((a) => ({ name: a.disease, value: a.confidence })),
  ];


  return (
    <section className="py-16" id="results">
      <div className="section-container max-w-5xl">
        <div className="text-center mb-10 opacity-0 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground">
            AI Analysis <span className="gradient-text">Complete</span>
          </h2>
        </div>

        {/* Main result card */}
        <div className="glass-card rounded-2xl p-6 md:p-8 glow-cyan-strong opacity-0 animate-fade-in-scale mb-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <CircularProgress value={primary.confidence} size={140} label="Confidence" />

            <div className="flex-1 text-center md:text-left">
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Predicted Disease</p>
              <h3 className="text-3xl font-bold text-foreground font-display">{primary.disease}</h3>

              <div className="flex flex-wrap items-center gap-3 mt-3 justify-center md:justify-start">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${riskClass}`}>
                  {primary.riskLevel} Risk
                </span>
                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                  <UserCheck className="h-4 w-4 text-primary" /> {primary.doctor}
                </span>
                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 text-primary" /> {primary.recoveryTime}
                </span>
              </div>

              <p className="mt-4 text-sm text-muted-foreground flex items-start gap-2">
                <ArrowRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                {primary.nextAction}
              </p>
            </div>
          </div>

          {/* Severity */}
          <div className="mt-8">
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Severity Scale</p>
            <SeverityMeter value={primary.severity} />
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-wrap gap-3 justify-center md:justify-start">
            <button onClick={onClear} className="px-5 py-2.5 text-sm rounded-full glass text-foreground hover:bg-muted transition-colors flex items-center gap-2">
              <RotateCcw className="h-4 w-4" /> Predict Again
            </button>
          </div>
        </div>

        {/* Charts row */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Disease probability chart */}
          <div className="glass-card rounded-2xl p-6 opacity-0" style={{ animation: "fade-in 0.6s ease-out 0.2s forwards" }}>
            <h4 className="text-sm font-semibold text-foreground mb-4 font-display">Disease Probability Comparison</h4>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={allDiseases} layout="vertical" margin={{ left: 10, right: 10 }}>
                <XAxis type="number" domain={[0, 100]} tick={{ fill: "hsl(215 15% 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" width={100} tick={{ fill: "hsl(210 40% 96%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: "hsl(220 25% 12%)", border: "1px solid hsl(220 20% 20%)", borderRadius: 8, color: "hsl(210 40% 96%)" }}
                  formatter={(v: number) => [`${v}%`, "Confidence"]}
                />
                <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={20}>
                  {allDiseases.map((_, i) => (
                    <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Symptom contribution */}
          <div className="glass-card rounded-2xl p-6 opacity-0" style={{ animation: "fade-in 0.6s ease-out 0.35s forwards" }}>
            <h4 className="text-sm font-semibold text-foreground mb-4 font-display">Symptom Contribution</h4>
            <div className="space-y-3">
              {symptomContributions.slice(0, 6).map((sc, i) => (
                <div key={sc.symptom}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-foreground">{sc.symptom}</span>
                    <span className="text-muted-foreground">{sc.weight}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700 ease-out"
                      style={{
                        width: `${sc.weight}%`,
                        background: CHART_COLORS[i % CHART_COLORS.length],
                        transitionDelay: `${i * 100}ms`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Health Insights */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 opacity-0" style={{ animation: "fade-in 0.6s ease-out 0.5s forwards" }}>
          {[
            { icon: Heart, title: "Health Tips", items: primary.healthTips, color: "hsl(0, 72%, 55%)" },
            { icon: Salad, title: "Diet Suggestions", items: primary.dietSuggestions, color: "hsl(140, 65%, 50%)" },
            { icon: Dumbbell, title: "Lifestyle Advice", items: primary.lifestyleAdvice, color: "hsl(45, 90%, 55%)" },
            { icon: Shield, title: "Prevention", items: primary.preventiveMeasures, color: "hsl(185, 75%, 55%)" },
          ].map((panel) => (
            <div key={panel.title} className="glass-card rounded-xl p-5 hover:glow-cyan transition-all duration-300">
              <div className="flex items-center gap-2 mb-3">
                <panel.icon className="h-4 w-4" style={{ color: panel.color }} />
                <h5 className="text-sm font-semibold text-foreground">{panel.title}</h5>
              </div>
              <ul className="space-y-2">
                {panel.items.map((item, i) => (
                  <li key={i} className="text-xs text-muted-foreground leading-relaxed">• {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResultDashboard;
