'use client';

import { fakeLogs } from '@/core/messages/Rampancy';
// Componente visual del efecto glitch para fondo y fake logs
import { useEffect } from 'react';


export function GlitchBackground({ active }: { active: boolean }) {
  return active ? (
    <div className="fixed inset-0 z-40 pointer-events-none mix-blend-screen">
      <div className="w-full h-full bg-black animate-glitch opacity-20" />
      <div className="w-full h-full absolute top-0 left-0 bg-[radial-gradient(#0f0_1px,transparent_1px)] [background-size:4px_4px] opacity-10 animate-scanlines" />
    </div>
  ) : null;
}

export function FakeRampancyLogs({ inject }: { inject: (lines: string[]) => void }) {
  useEffect(() => {

    let i = 0;
    const interval = setInterval(() => {
      inject([fakeLogs[i]]);
      i++;
      if (i >= fakeLogs.length) clearInterval(interval);
    }, 400);

    return () => clearInterval(interval);
  }, [inject]);

  return null;
}