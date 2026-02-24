import { Activity, Wifi } from "lucide-react";

const StatusHeader = () => {
  const now = new Date();
  const timeStr = now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  const dateStr = now.toLocaleDateString("id-ID", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  return (
    <header className="mb-8 animate-slide-up">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-primary/10 p-2 rounded-xl">
              <Activity className="text-primary" size={24} />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
              IoT <span className="text-gradient-primary">Monitor</span>
            </h1>
          </div>
          <p className="text-muted-foreground text-sm">
            Pemantauan sensor & kontrol aktuator secara real-time
          </p>
        </div>

        <div className="card-glass px-4 py-3 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Wifi size={14} className="text-success animate-pulse-glow" />
            <span className="text-xs font-mono text-success">Terhubung</span>
          </div>
          <div className="w-px h-6 bg-border" />
          <div className="text-right">
            <div className="text-xs text-muted-foreground">{dateStr}</div>
            <div className="text-sm font-mono text-foreground">{timeStr}</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default StatusHeader;
