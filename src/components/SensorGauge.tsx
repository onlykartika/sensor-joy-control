import { useEffect, useState } from "react";

interface SensorGaugeProps {
  value: number;
  min: number;
  max: number;
  unit: string;
  label: string;
  icon: React.ReactNode;
  color: "primary" | "success" | "accent" | "destructive";
}

const colorMap = {
  primary: {
    stroke: "hsl(185, 80%, 50%)",
    glow: "glow-primary",
    text: "text-primary",
    bg: "bg-primary/10",
  },
  success: {
    stroke: "hsl(155, 70%, 45%)",
    glow: "glow-success",
    text: "text-success",
    bg: "bg-success/10",
  },
  accent: {
    stroke: "hsl(35, 90%, 55%)",
    glow: "glow-accent",
    text: "text-accent",
    bg: "bg-accent/10",
  },
  destructive: {
    stroke: "hsl(0, 72%, 55%)",
    glow: "glow-destructive",
    text: "text-destructive",
    bg: "bg-destructive/10",
  },
};

const SensorGauge = ({ value, min, max, unit, label, icon, color }: SensorGaugeProps) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  const percentage = ((animatedValue - min) / (max - min)) * 100;
  const circumference = 2 * Math.PI * 54;
  const strokeDashoffset = circumference - (percentage / 100) * circumference * 0.75;
  const colors = colorMap[color];

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedValue(value), 100);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div className="card-glass p-6 flex flex-col items-center gap-3 animate-slide-up">
      <div className="flex items-center gap-2 mb-1">
        <span className={`${colors.bg} ${colors.text} p-1.5 rounded-lg`}>{icon}</span>
        <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{label}</span>
      </div>

      <div className="relative w-32 h-32">
        <svg className="w-full h-full -rotate-[135deg]" viewBox="0 0 120 120">
          <circle
            cx="60" cy="60" r="54"
            fill="none"
            stroke="hsl(220, 15%, 14%)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * 0.25}
          />
          <circle
            cx="60" cy="60" r="54"
            fill="none"
            stroke={colors.stroke}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
            style={{ filter: `drop-shadow(0 0 6px ${colors.stroke})` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-3xl font-bold font-mono ${colors.text}`}>
            {animatedValue.toFixed(1)}
          </span>
          <span className="text-xs text-muted-foreground font-mono">{unit}</span>
        </div>
      </div>

      <div className="flex justify-between w-full text-xs text-muted-foreground font-mono px-2">
        <span>{min}{unit}</span>
        <span>{max}{unit}</span>
      </div>
    </div>
  );
};

export default SensorGauge;
