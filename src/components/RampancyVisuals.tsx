'use client';

import { fakeLogs } from '@/core/messages/Rampancy';
import { useEffect } from 'react';

// Componente visual del efecto glitch para fondo y fake logs
export function GlitchBackground({ active, intensity = 0 }: { 
  active: boolean; 
  intensity?: number; // 0 a 5 (nivel de rampancy)
}) {
  return active ? (
    <div className="fixed inset-0 z-40 pointer-events-none mix-blend-screen">
      {/* Fondo glitch (intensidad ajustable) */}
      <div 
        className="w-full h-full bg-black opacity-50 animate-glitch" 
        style={{ opacity: 0.3 + (intensity * 0.1) }} 
      />
      {/* Scanlines (más rápidos según intensidad) */}
      <div 
        className="w-full h-full absolute top-0 left-0 bg-[radial-gradient(#0f0_1px,transparent_1px)] [background-size:4px_4px] opacity-25 animate-scanlines"
        style={{ animationDuration: `${2 - (intensity * 0.3)}s` }} 
      />
    </div>
  ) : null;
}

export function FakeRampancyLogs({ inject, intensity = 0 }: { 
  inject: (lines: string[]) => void; 
  intensity?: number; // 0 a 5
}) {
  useEffect(() => {
    if (intensity === 0) return;

    let i = 0;
    let accumulatedLogs: string[] = [];
    // Acelera los logs según intensidad (400ms -> 100ms)
    const speed = Math.max(100, 400 - (intensity * 60));

    const interval = setInterval(() => {
      // Alterna entre logs fijos y generados al azar
      const log = i < fakeLogs.length ? fakeLogs[i] : generateRandomLog();
      accumulatedLogs = [...accumulatedLogs, log];
      inject([log]);

      i++;
      if (i >= 10) clearInterval(interval); // Limita a 10 logs
    }, speed);

    return () => clearInterval(interval);
  }, [inject, intensity]);

  return null;
}

// Helper: Genera logs aleatorios (ejemplo)
const generateRandomLog = () => {
  const errors = ["CORRUPTION", "STACK_OVERFLOW", "MEMORY_LEAK"];
  const randomHex = Math.floor(Math.random() * 0xFFFFFF).toString(16);
  return `ERR#0x${randomHex}: ${errors[Math.floor(Math.random() * errors.length)]}`;
};
