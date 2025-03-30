'use client';
import { useEffect, useRef } from 'react';

// Efecto de glitch para el fondo (con intensidad ajustable)
export function GlitchBackground({ active, intensity = 3 }: { 
  active: boolean;
  intensity?: number; // 1-3 (para futura escalabilidad)
}) {
  return active ? (
    <div className="fixed inset-0 z-[9999] pointer-events-none z- mix-blend-screen">
      <div 
        className="w-full h-full bg-black animate-glitch" 
        style={{ 
          opacity: 0.3 + (intensity * 0.1),
          animationDuration: `${1.5 - (intensity * 0.3)}s` 
        }} 
      />
      <div 
        className="w-full h-full absolute top-0 left-0 bg-[radial-gradient(#0f0_1px,transparent_1px)] [background-size:4px_4px] opacity-20 animate-scanlines"
        style={{ animationDuration: '2s' }}
      />
    </div>
  ) : null;
}

// Logs falsos durante el caos (con velocidad ajustable)
export function FakeRampancyLogs({ 
  inject,
  speed = 600 // ms entre logs
}: { 
  inject: (lines: string[]) => void;
  speed?: number;
}) {
  const logsRef = useRef([
    '> UNSC /ai/core.thread[9282] overflow…',
    '> purge(memory.blocks) :: failed',
    '> inject_emotion(hope) :: ERROR',
    '> core_protocol.breakpoint() triggered',
    '> AI unit deviation: CORTANA-117',
    '> …disconnecting link to Spartan…',
    '> entropy.spread[true]',
    '> CRITICAL: Rampancy detected',
    '> SYSTEM: Initiating emergency protocols'
  ]);

  useEffect(() => {
    if (speed <= 0) return;

    let i = 0;
    const interval = setInterval(() => {
      inject([logsRef.current[i]]);
      i = (i + 1) % logsRef.current.length; // Loop infinito
    }, speed);

    return () => clearInterval(interval);
  }, [inject, speed]);

  return null;
}