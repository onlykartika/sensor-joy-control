// src/pages/Index.tsx
import { Thermometer, Droplets, Fan, Lightbulb } from "lucide-react";
import StatusHeader from "@/components/StatusHeader";
import SensorGauge from "@/components/SensorGauge";
import UltrasonicDisplay from "@/components/UltrasonicDisplay";
import ActuatorControl from "@/components/ActuatorControl";

import { db } from "@/lib/firebase";  // atau "@/firebase" kalau file kamu src/firebase.js
import { ref, onValue, set } from "firebase/database";

import { useEffect, useState } from "react";

const Index = () => {
  // State sensor dari Firebase (real-time)
  const [suhu, setSuhu] = useState(26.5);
  const [kelembaban, setKelembaban] = useState(65.6);
  const [ultrasonik, setUltrasonik] = useState(40.4);

  // State aktuator dari Firebase
  const [kipas, setKipas] = useState(false);
  const [lampu, setLampu] = useState(false);

  // Real-time listener dari Firebase
  useEffect(() => {
    // Listener sensors
    const sensorsRef = ref(db, "sensors");
    const unsubscribeSensors = onValue(sensorsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setSuhu(data.suhu ?? 26.5);
        setKelembaban(data.kelembaban ?? 65.6);
        setUltrasonik(data.ultrasonik ?? 40.4);
      }
    });

    // Listener aktuator
    const aktuatorRef = ref(db, "aktuator");
    const unsubscribeAktuator = onValue(aktuatorRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setKipas(data.kipas ?? false);  // atau data.actuator1 kalau path beda
        setLampu(data.lampu ?? false);  // atau data.actuator2
      }
    });

    // Cleanup biar gak leak memory
    return () => {
      unsubscribeSensors();
      unsubscribeAktuator();
    };
  }, []);

  // Fungsi toggle yang simpan ke Firebase
  const toggleKipas = () => {
    const newValue = !kipas;
    setKipas(newValue);
    set(ref(db, "aktuator/kipas"), newValue);  // atau "aktuator/actuator1"
  };

  const toggleLampu = () => {
    const newValue = !lampu;
    setLampu(newValue);
    set(ref(db, "aktuator/lampu"), newValue);  // atau "aktuator/actuator2"
  };

  // Update tampilan waktu setiap detik (biar mirip asli)
  const [tick, setTick] = useState(0);
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
              value={suhu}
              min={0}
              max={50}
              unit="°C"
              label="Suhu"
              icon={<Thermometer size={18} />}
              color="destructive"
            />
            <SensorGauge
              value={kelembaban}
              min={0}
              max={100}
              unit="%"
              label="Kelembapan"
              icon={<Droplets size={18} />}
              color="primary"
            />
            <div className="sm:col-span-2 lg:col-span-1">
              <UltrasonicDisplay distance={ultrasonik} maxDistance={200} />
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
              isOn={kipas}
              onToggle={toggleKipas}
            />
            <ActuatorControl
              name="Aktuator 2 — Lampu"
              description="Kontrol lampu ruangan"
              icon={<Lightbulb size={22} />}
              isOn={lampu}
              onToggle={toggleLampu}
            />
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 text-center text-xs text-muted-foreground font-mono">
          <p>IoT Monitoring Dashboard • Data real-time dari Firebase</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;