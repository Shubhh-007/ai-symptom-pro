import { useEffect, useState, useRef } from "react";
import { ArrowDown, Sparkles, Activity, Users } from "lucide-react";
import heroImage from "@/assets/hero-ai-health.png";

const stats = [
  { icon: Activity, label: "Diseases Detected", target: 41 },
  { icon: Users, label: "Symptoms Analyzed", target: 95 },
  { icon: Sparkles, label: "Model Accuracy", target: 94, suffix: "%" },
];

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  const ref = useRef(false);

  useEffect(() => {
    if (!start || ref.current) return;
    ref.current = true;
    const step = target / (duration / 16);
    let current = 0;
    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);
    return () => clearInterval(interval);
  }, [target, duration, start]);

  return count;
}

interface HeroSectionProps {
  onStartClick: () => void;
}

const HeroSection = ({ onStartClick }: HeroSectionProps) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setVisible(true); }, []);

  return (
    <section className="relative min-h-screen flex items-center gradient-hero overflow-hidden pt-16">
      {/* Decorative orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[hsl(185_75%_55%/0.05)] rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[hsl(210_80%_55%/0.05)] rounded-full blur-3xl animate-float-delayed" />

      <div className="section-container w-full py-20 md:py-0">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Text */}
          <div className="flex-1 text-center lg:text-left z-10">
            <div
              className="opacity-0"
              style={{ animation: visible ? "fade-in 0.6s ease-out 0.1s forwards" : "none" }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-medium text-primary mb-6">
                <Sparkles className="h-3.5 w-3.5" /> SymptoAI Pro — Intelligent Health Analysis
              </span>
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] opacity-0 font-display"
              style={{ animation: visible ? "fade-in 0.7s ease-out 0.2s forwards" : "none" }}
            >
              AI-Powered Health{" "}
              <span className="gradient-text text-glow">Diagnosis</span>{" "}
              in Seconds
            </h1>

            <p
              className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed opacity-0"
              style={{ animation: visible ? "fade-in 0.7s ease-out 0.35s forwards" : "none" }}
            >
              Smart symptom analysis. Instant insights. Better awareness.
              Powered by advanced machine learning algorithms.
            </p>

            <div
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start opacity-0"
              style={{ animation: visible ? "fade-in 0.7s ease-out 0.5s forwards" : "none" }}
            >
              <button onClick={onStartClick} className="btn-glow px-8 py-4 text-base">
                Start Smart Diagnosis
                <ArrowDown className="inline ml-2 h-4 w-4" />
              </button>
            </div>

            {/* Stats */}
            <div
              className="mt-12 flex flex-wrap gap-8 justify-center lg:justify-start opacity-0"
              style={{ animation: visible ? "fade-in 0.7s ease-out 0.65s forwards" : "none" }}
            >
              {stats.map((s) => {
                const val = useCountUp(s.target, 2000, visible);
                return (
                  <div key={s.label} className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl glass">
                      <s.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xl font-bold text-foreground">
                        {val.toLocaleString()}{s.suffix || "+"}
                      </p>
                      <p className="text-xs text-muted-foreground">{s.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Hero image */}
          <div
            className="flex-1 flex justify-center z-10 opacity-0"
            style={{ animation: visible ? "fade-in 0.8s ease-out 0.4s forwards" : "none" }}
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-[hsl(185_75%_55%/0.08)] blur-3xl scale-110" />
              <img
                src={heroImage}
                alt="AI Health Diagnosis"
                className="w-full max-w-lg relative z-10 drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
