// Componente visual del efecto glitch para fondo y fake logs
import { useEffect, useState } from 'react';
import { fakeLogs } from '../messages/Rampancy';

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

// Animaciones CSS sugeridas en Tailwind config:
// .animate-glitch { animation: glitch 1s infinite; }
// .animate-scanlines { animation: scanlines 2s infinite linear; }
// @keyframes glitch { 0%, 100% { transform: none; } 50% { transform: translateX(2px) skewX(5deg); } }
// @keyframes scanlines { 0% { background-position: 0 0; } 100% { background-position: 0 100%; } }

// Hook actualizado con rampancy activación visual completa y control de ciclo
export function useRampancySystem(commandCount: number, onRampancyResolved: () => void) {
  const [warningShown, setWarningShown] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [rampancyActive, setRampancyActive] = useState(false);
  const [triggerRampancy, setTriggerRampancy] = useState(false);
  

  useEffect(() => {
    const rampancyTriggered = sessionStorage.getItem('rampancyTriggered');
    if (rampancyTriggered === 'true') return;

    if (commandCount >= 6 && !warningShown) {
      setShowWarning(true);
      setWarningShown(true);
      setTimeout(() => {
        setShowWarning(false);
      }, 5000);
    }

    if (commandCount >= 10 && rampancyTriggered !== 'true') {
      setRampancyActive(true);
      sessionStorage.setItem('rampancyTriggered', 'true');
    
      // Asegura que el efecto suceda incluso si el componente se vuelve a montar
      setTimeout(() => {
        setTriggerRampancy(true);
      }, 2000); // activá rápido, para debug visual, luego volvés a 4000
    }
  }, [commandCount, warningShown]);

  const completeRampancy = () => {
    setRampancyActive(false);
    setTriggerRampancy(false);
    onRampancyResolved();
  };

  return {
    showWarning,
    rampancyActive,
    triggerRampancy,
    completeRampancy,
  };
}

