import { Thermometer, Droplets, Fan, Lightbulb } from "lucide-react";
import StatusHeader from "@/components/StatusHeader";
import SensorGauge from "@/components/SensorGauge";
import UltrasonicDisplay from "@/components/UltrasonicDisplay";
import ActuatorControl from "@/components/ActuatorControl";
import { useSensorData } from "@/hooks/useSensorData";
import { useEffect, useState } from "react";

const Index = () => {
  const { sensors, actuators, toggleActuator } = useSensorData();
  const [, setTick] = useState(0);

  // Update time display every second
  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        <StatusHeader />

        {/* Sensor Section */}
        <section className="mb-8">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-4 flex items-center gap-2">
            <div className="w-6 h-px bg-primary" />
            Sensor Monitoring
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <SensorGauge
              value={sensors.temperature}
              min={0}
              max={50}
              unit="°C"
              label="Suhu"
              icon={<Thermometer size={18} />}
              color="destructive"
            />
            <SensorGauge
              value={sensors.humidity}
              min={0}
              max={100}
              unit="%"
              label="Kelembapan"
              icon={<Droplets size={18} />}
              color="primary"
            />
            <div className="sm:col-span-2 lg:col-span-1">
              <UltrasonicDisplay distance={sensors.distance} maxDistance={200} />
            </div>
          </div>
        </section>

        {/* Actuator Section */}
        <section>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-4 flex items-center gap-2">
            <div className="w-6 h-px bg-accent" />
            Kontrol Aktuator
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ActuatorControl
              name="Aktuator 1 — Kipas"
              description="Kontrol kipas pendingin"
              icon={<Fan size={22} />}
              isOn={actuators.actuator1}
              onToggle={() => toggleActuator("actuator1")}
            />
            <ActuatorControl
              name="Aktuator 2 — Lampu"
              description="Kontrol lampu ruangan"
              icon={<Lightbulb size={22} />}
              isOn={actuators.actuator2}
              onToggle={() => toggleActuator("actuator2")}
            />
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 text-center text-xs text-muted-foreground font-mono">
          <p>IoT Monitoring Dashboard • Data simulasi real-time</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
