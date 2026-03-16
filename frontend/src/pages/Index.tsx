import { useState, useRef } from "react";
import { Activity } from "lucide-react";
import FloatingParticles from "@/components/FloatingParticles";
import HeroSection from "@/components/HeroSection";
import SymptomPanel from "@/components/SymptomPanel";
import ResultDashboard from "@/components/ResultDashboard";
import SiteFooter from "@/components/SiteFooter";
import type { PredictionResponse } from "@/data/symptoms";

const Index = () => {
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const symptomRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const scrollToSymptoms = () => {
    symptomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleResult = (res: PredictionResponse) => {
    setResult(res);
    setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  const handleClear = () => {
    setResult(null);
    scrollToSymptoms();
  };

  return (
    <div className="relative min-h-screen">
      <FloatingParticles />

      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-strong">
        <div className="section-container flex items-center justify-between h-16">
          <div className="flex items-center gap-2 font-bold text-foreground font-display">
            <Activity className="h-5 w-5 text-primary" />
            SymptoAI Pro
          </div>
          <nav className="hidden sm:flex items-center gap-1">
            {[
              { label: "Home", target: "top" },
              { label: "Diagnose", target: "symptom-panel" },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  if (item.target === "top") window.scrollTo({ top: 0, behavior: "smooth" });
                  else document.getElementById(item.target)?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </nav>
          <button onClick={scrollToSymptoms} className="btn-glow px-4 py-2 text-sm">
            Start Diagnosis
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="relative z-10">
        <HeroSection onStartClick={scrollToSymptoms} />

        <div ref={symptomRef}>
          <SymptomPanel onResult={handleResult} />
        </div>

        {result && (
          <div ref={resultRef}>
            <ResultDashboard result={result} onClear={handleClear} />
          </div>
        )}

        <SiteFooter />
      </div>
    </div>
  );
};

export default Index;
