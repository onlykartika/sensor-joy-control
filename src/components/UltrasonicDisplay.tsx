import { Waves } from "lucide-react";
import { useEffect, useState } from "react";

interface UltrasonicDisplayProps {
  distance: number;
  maxDistance: number;
}

const UltrasonicDisplay = ({ distance, maxDistance }: UltrasonicDisplayProps) => {
  const [animated, setAnimated] = useState(0);
  const fillPercent = Math.min((animated / maxDistance) * 100, 100);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(distance), 100);
    return () => clearTimeout(timer);
  }, [distance]);

  const getStatus = () => {
    if (distance < 10) return { label: "Sangat Dekat", cls: "text-destructive" };
    if (distance < 30) return { label: "Dekat", cls: "text-accent" };
    return { label: "Normal", cls: "text-success" };
  };

  const status = getStatus();

  return (
    <div className="card-glass p-6 animate-slide-up">
      <div className="flex items-center gap-2 mb-4">
        <span className="bg-primary/10 text-primary p-1.5 rounded-lg">
          <Waves size={18} />
        </span>
        <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Sensor Ultrasonik
        </span>
      </div>

      <div className="flex items-end gap-4">
        <div className="flex-1">
          <div className="text-4xl font-bold font-mono text-primary mb-1">
            {animated.toFixed(1)}
            <span className="text-lg text-muted-foreground ml-1">cm</span>
          </div>
          <span className={`text-sm font-medium ${status.cls}`}>{status.label}</span>
        </div>

        {/* Visual bar */}
        <div className="w-16 h-24 bg-muted rounded-lg overflow-hidden relative border border-border/50">
          <div
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary to-primary/30 transition-all duration-1000 ease-out"
            style={{ height: `${100 - fillPercent}%` }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Waves size={20} className="text-primary/50 animate-pulse-glow" />
          </div>
        </div>
      </div>

      <div className="mt-4 h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-success via-accent to-destructive rounded-full transition-all duration-1000"
          style={{ width: `${fillPercent}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-muted-foreground font-mono mt-1">
        <span>0 cm</span>
        <span>{maxDistance} cm</span>
      </div>
    </div>
  );
};

export default UltrasonicDisplay;
