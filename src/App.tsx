// src/App.tsx
import { useState, useEffect } from 'react';
import { db } from './lib/firebase';  // Pastiin path ini benar ke firebase.js/ts kamu
import { ref, onValue, set } from 'firebase/database';

import { SensorGauge } from './components/SensorGauge';  // Sesuaikan kalau nama file beda
import { UltrasonicDisplay } from './components/UltrasonicDisplay';  // Dari screenshot
import { ActuatorControl } from './components/ActuatorControl';  // Dari screenshot

import { Switch } from './components/ui/switch';  // shadcn-ui

function App() {
  // State sensor (real-time dari Firebase)
  const [suhu, setSuhu] = useState(26.5);
  const [kelembaban, setKelembaban] = useState(65.6);
  const [ultrasonik, setUltrasonik] = useState(40.4);

  // State aktuator (ON/OFF)
  const [kipas, setKipas] = useState(false);
  const [lampu, setLampu] = useState(false);

  // Listener real-time
  useEffect(() => {
    // Sensor listener
    const sensorsRef = ref(db, 'sensors');
    const unsubscribeSensors = onValue(sensorsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setSuhu(data.suhu ?? 26.5);
        setKelembaban(data.kelembaban ?? 65.6);
        setUltrasonik(data.ultrasonik ?? 40.4);
      }
    });

    // Aktuator listener
    const aktuatorRef = ref(db, 'aktuator');
    const unsubscribeAktuator = onValue(aktuatorRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setKipas(data.kipas ?? false);
        setLampu(data.lampu ?? false);
      }
    });

    // Cleanup listener saat component unmount
    return () => {
      unsubscribeSensors();
      unsubscribeAktuator();
    };
  }, []);

  // Fungsi toggle & simpan ke Firebase
  const toggleKipas = () => {
    const newValue = !kipas;
    setKipas(newValue);
    set(ref(db, 'aktuator/kipas'), newValue);
  };

  const toggleLampu = () => {
    const newValue = !lampu;
    setLampu(newValue);
    set(ref(db, 'aktuator/lampu'), newValue);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 md:p-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <span className="text-cyan-400">IoT Monitor</span>
          </h1>
          <p className="text-gray-400">Pemantauan sensor & kontrol aktuator secara real-time</p>
        </div>
        <div className="text-right">
          <div className="bg-green-900/50 px-4 py-2 rounded-full inline-flex items-center gap-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            Terhubung
          </div>
          <p className="text-sm text-gray-500 mt-1">Rabu, 25 Februari 2026 09:01 WIB</p>
        </div>
      </div>

      {/* Sensor Monitoring */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 border-b border-gray-700 pb-2">
          — SENSOR MONITORING —
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SensorGauge 
            title="SUHU" 
            value={suhu} 
            unit="°C" 
            min={0} 
            max={60} 
            // tambah props lain kalau komponen butuh (color, icon, dll.)
          />
          <SensorGauge 
            title="KELEMBABAN" 
            value={kelembaban} 
            unit="%" 
            min={0} 
            max={100} 
          />
          <UltrasonicDisplay 
            value={ultrasonik} 
            // props status, bar, dll. sesuaikan dengan komponen kamu
          />
        </div>
      </section>

      {/* Kontrol Aktuator */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 border-b border-gray-700 pb-2">
          — KONTROL AKTUATOR —
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ActuatorControl
            title="Aktuator 1 — Kipas"
            description="Kontrol kipas pendingin"
            status={kipas ? "AKTIF" : "NONAKTIF"}
            icon="fan"  // asumsi props icon
            switchComponent={
              <Switch 
                checked={kipas} 
                onCheckedChange={toggleKipas} 
              />
            }
          />
          <ActuatorControl
            title="Aktuator 2 — Lampu"
            description="Kontrol lampu ruangan"
            status={lampu ? "AKTIF" : "NONAKTIF"}
            icon="lightbulb"
            switchComponent={
              <Switch 
                checked={lampu} 
                onCheckedChange={toggleLampu} 
              />
            }
          />
        </div>
      </section>
    </div>
  );
}

export default App;