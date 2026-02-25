// src/App.tsx (versi minimal untuk test build & Firebase work dulu)
import { useState, useEffect } from 'react';
import { db } from './lib/firebase';
import { ref, onValue, set } from 'firebase/database';

// Comment import yang error dulu
// import { SensorGauge } from './components/SensorGauge';
// import { UltrasonicDisplay } from './components/UltrasonicDisplay';
// import { ActuatorControl } from './components/ActuatorControl';

import { Switch } from './components/ui/switch';  // ini biasanya aman dari shadcn

function App() {
  const [suhu, setSuhu] = useState(26.5);
  const [kelembaban, setKelembaban] = useState(65.6);
  const [ultrasonik, setUltrasonik] = useState(40.4);
  const [kipas, setKipas] = useState(false);
  const [lampu, setLampu] = useState(false);

  useEffect(() => {
    const sensorsRef = ref(db, 'sensors');
    const unsubscribeSensors = onValue(sensorsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setSuhu(data.suhu ?? 26.5);
        setKelembaban(data.kelembaban ?? 65.6);
        setUltrasonik(data.ultrasonik ?? 40.4);
      }
    });

    const aktuatorRef = ref(db, 'aktuator');
    const unsubscribeAktuator = onValue(aktuatorRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setKipas(data.kipas ?? false);
        setLampu(data.lampu ?? false);
      }
    });

    return () => {
      unsubscribeSensors();
      unsubscribeAktuator();
    };
  }, []);

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
      <h1>IoT Monitor (Test Mode)</h1>
      <p>Nilai Suhu dari Firebase: {suhu} °C</p>
      <p>Kelembaban: {kelembaban} %</p>
      <p>Ultrasonik: {ultrasonik} cm</p>
      <div>
        Kipas: {kipas ? 'ON' : 'OFF'}
        <Switch checked={kipas} onCheckedChange={toggleKipas} />
      </div>
      <div>
        Lampu: {lampu ? 'ON' : 'OFF'}
        <Switch checked={lampu} onCheckedChange={toggleLampu} />
      </div>
    </div>
  );
}

export default App;