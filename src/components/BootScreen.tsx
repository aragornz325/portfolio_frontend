'use client';

import { getStatusClass } from '@/core/helpers/getStatusClass';
import { commandBooting } from '@/types/Command';
import { useEffect, useState } from 'react';

const bootMessages: commandBooting[] = [
  { label: '[BOOT SEQUENCE INITIATED]', status: 'info' },
  { label: '[LINKING TO SPARTAN-117 SYSTEMS]', status: 'ok' },
  { label: '[PROTOCOL CORTANA ONLINE]', status: 'ok' },
  { label: '[LOADING ARMOR BIOS]', status: 'ok' },
  { label: '[LOADING WEAPON SYSTEMS]', status: 'ok' },
  { label: '[WEAPON SYSTEMS FAILURE]', status: 'error' },
  { label: '[LOADING AI PROTOCOL]', status: 'ok' },
  { label: '[LOADING NAVIGATION SYSTEM]', status: 'ok' },
  { label: '[LOADING COMMUNICATIONS]', status: 'ok' },
  { label: '[CALIBRATING NEURAL INTERFACE]', status: 'warn' },
  { label: '[MISSION FILES ACQUIRED]', status: 'ok' },
];


export default function BootScreen({ onFinish }: { onFinish: () => void }) {
  const [visibleLines, setVisibleLines] = useState<commandBooting[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dots, setDots] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isPreBootDone, setIsPreBootDone] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || isPreBootDone) return;
  
    const preBootTimeout = setTimeout(() => {
      setIsPreBootDone(true);
    }, 8000); 
  
    const handleKey = () => {
      clearTimeout(preBootTimeout);
      setIsPreBootDone(true);
    };
  
    window.addEventListener('keydown', handleKey);
    return () => {
      clearTimeout(preBootTimeout);
      window.removeEventListener('keydown', handleKey);
    };
  }, [isClient, isPreBootDone]);

  useEffect(() => {
    if (!isPreBootDone || currentIndex > bootMessages.length) return;
  
    // Si terminó
    if (currentIndex === bootMessages.length) {
      setIsComplete(true);
      setVisibleLines((lines) => [...lines, { label: '[READY]', status: 'ok' }]);
      setTimeout(onFinish, 1000);
      return;
    }
  
    let dotCount = 0;
    const dotInterval = setInterval(() => {
      dotCount++;
      setDots('.'.repeat(dotCount % 4));
    }, 300);
  
    const fullMessage = bootMessages[currentIndex];
    const delay = Math.random() * 650;
  
    const finishLine = setTimeout(() => {
      clearInterval(dotInterval);
      setDots('');
      setVisibleLines((lines) => [...lines, { label: fullMessage.label, status: fullMessage.status }]);
      setCurrentIndex((i) => i + 1);
    }, delay);
  
    return () => {
      clearInterval(dotInterval);
      clearTimeout(finishLine);
    };
  }, [currentIndex, onFinish, isPreBootDone]);

  if (!isClient) return null;

  // === PREBOOT MESSAGE ===
  if (!isPreBootDone) {
    return (
      <div className="flex items-center justify-center w-screen h-screen px-4 font-mono text-sm text-center text-green-400 bg-black">
        <div>
          <p>Thank you for visiting my site.</p>
          <p className="mt-2">
            You&apos;re about to enter a fully interactive portfolio,
            <br />
            designed to emulate a Spartan HUD from the Halo universe.
          </p>
          <p className="mt-2">Engage, explore, and execute commands as if you were inside ONI Command.</p>
          <p className="mt-4 text-blue-400 animate-pulse">Press any key to initialize immediately...</p>
        </div>
      </div>
    );
  }

  // === BOOT SEQUENCE ===
  return (
    <div className="flex flex-col px-4 text-sm font-terminal sm:text-base">
      {visibleLines.map((line, i) => (
  <div key={i} className="whitespace-pre">
    <span className="text-terminal-neutro">{line.label}</span>
    {line.status && (
      <span className={`ml-2 font-bold ${getStatusClass(line.status)}`}>
        {line.status.toUpperCase()}
      </span>
    )}
  </div>
))}
  
      {!isComplete && currentIndex < bootMessages.length && (
        <div className={`${getStatusClass(bootMessages[currentIndex].status || 'info')} whitespace-pre`}>
          {bootMessages[currentIndex].label}
          {dots}
        </div>
      )}
  
      {isComplete && (
        <div className="mt-2 text-terminal-ok">
          λ
        </div>
      )}
    </div>
  );
}
