"use client";  // <-- penting kalau Next.js App Router

import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';  // sesuaikan path
import { ref, onValue, set } from "firebase/database";

export default function Home() {
  const [nilaiSensor, setNilaiSensor] = useState(0);

  useEffect(() => {
    const sensorRef = ref(db, 'sensor/nilai');  // path yang kamu buat di console

    // Dengar perubahan real-time
    const unsubscribe = onValue(sensorRef, (snapshot) => {
      const value = snapshot.val();
      setNilaiSensor(value ?? 0);  // update UI otomatis
    });

    return () => unsubscribe();  // bersihkan listener
  }, []);

  // Fungsi buat ubah nilai dari app
  const ubahNilai = (newValue) => {
    const sensorRef = ref(db, 'sensor/nilai');
    set(sensorRef, newValue)
      .then(() => console.log("Berhasil ubah!"))
      .catch((err) => console.error("Gagal:", err));
  };

  return (
    <div>
      <h1>Nilai Sensor Saat Ini: {nilaiSensor}</h1>
      <button onClick={() => ubahNilai(100)}>Set ke 100</button>
      <button onClick={() => ubahNilai(0)}>Reset ke 0</button>
      {/* atau input/slider kalau mau */}
    </div>
  );
}