import { Activity, Github, Linkedin, Code2, Database, Brain } from "lucide-react";

const techStack = [
  { icon: Code2, label: "React + TypeScript" },
  { icon: Brain, label: "ML Model (Random Forest)" },
  { icon: Database, label: "Django / Flask API" },
];

const SiteFooter = () => (
  <footer className="border-t border-border/30 bg-muted/20 py-12">
    <div className="section-container">
      {/* Disclaimer */}
      <div className="glass-card rounded-2xl p-6 text-center mb-10">
        <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          <strong className="text-foreground">AI Disclaimer:</strong> This AI system provides predictive analysis based on machine learning models and is{" "}
          <strong className="text-foreground">not a substitute</strong> for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider.
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-2 font-bold text-lg text-foreground font-display">
          <Activity className="h-5 w-5 text-primary" />
          SymptoAI Pro
        </div>

        <div className="flex flex-wrap items-center gap-4 justify-center">
          {techStack.map((t) => (
            <span key={t.label} className="flex items-center gap-1.5 text-xs text-muted-foreground glass rounded-full px-3 py-1.5">
              <t.icon className="h-3.5 w-3.5 text-primary" /> {t.label}
            </span>
          ))}
        </div>

        <div className="flex flex-col items-center md:items-end gap-2">
          <p className="text-sm text-muted-foreground">
            Built by <span className="font-medium text-foreground">SHUBH GUPTA</span>
          </p>
          <div className="flex items-center gap-3">
            <a href="https://github.com/Shubhh-007" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Github className="h-5 w-5" />
            </a>
            <a href="https://www.linkedin.com/in/shubhh-gupta/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
          <p className="text-xs text-muted-foreground">First Machine Learning Project</p>
        </div>
      </div>
    </div>
  </footer>
);

export default SiteFooter;
