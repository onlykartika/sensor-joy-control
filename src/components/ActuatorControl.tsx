import { Power } from "lucide-react";

interface ActuatorControlProps {
  name: string;
  description: string;
  icon: React.ReactNode;
  isOn: boolean;
  onToggle: () => void;
}

const ActuatorControl = ({ name, description, icon, isOn, onToggle }: ActuatorControlProps) => {
  return (
    <div className={`card-glass p-6 animate-slide-up transition-all duration-300 ${isOn ? "glow-primary border-primary/30" : ""}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-xl transition-colors duration-300 ${isOn ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}>
            {icon}
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{name}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>

        <button
          onClick={onToggle}
          className={`relative w-16 h-9 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 ${
            isOn ? "bg-primary glow-primary" : "bg-muted"
          }`}
        >
          <div
            className={`absolute top-1 w-7 h-7 rounded-full transition-all duration-300 flex items-center justify-center ${
              isOn
                ? "left-8 bg-primary-foreground"
                : "left-1 bg-secondary-foreground/20"
            }`}
          >
            <Power size={14} className={isOn ? "text-primary" : "text-muted-foreground"} />
          </div>
        </button>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${isOn ? "bg-success animate-pulse-glow" : "bg-muted-foreground/30"}`} />
        <span className={`text-xs font-mono uppercase tracking-wider ${isOn ? "text-success" : "text-muted-foreground"}`}>
          {isOn ? "Aktif" : "Nonaktif"}
        </span>
      </div>
    </div>
  );
};

export default ActuatorControl;
