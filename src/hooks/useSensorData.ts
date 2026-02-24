import { useState, useEffect, useCallback } from "react";

interface SensorData {
  temperature: number;
  humidity: number;
  distance: number;
}

interface ActuatorState {
  actuator1: boolean;
  actuator2: boolean;
}

export const useSensorData = () => {
  const [sensors, setSensors] = useState<SensorData>({
    temperature: 28.5,
    humidity: 65.2,
    distance: 45.3,
  });

  const [actuators, setActuators] = useState<ActuatorState>({
    actuator1: false,
    actuator2: false,
  });

  // Simulate sensor data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSensors((prev) => ({
        temperature: Math.max(15, Math.min(50, prev.temperature + (Math.random() - 0.5) * 1.5)),
        humidity: Math.max(20, Math.min(100, prev.humidity + (Math.random() - 0.5) * 2)),
        distance: Math.max(2, Math.min(200, prev.distance + (Math.random() - 0.5) * 5)),
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const toggleActuator = useCallback((id: "actuator1" | "actuator2") => {
    setActuators((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  return { sensors, actuators, toggleActuator };
};
