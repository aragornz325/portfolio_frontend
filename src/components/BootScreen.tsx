'use client';

import { useEffect, useState } from 'react';

const bootMessages = [
  '[BOOT SEQUENCE INITIATED]',
  '[LINKING TO SPARTAN-117 SYSTEMS]',
  '[PROTOCOL CORTANA ONLINE]',
  '[LOADING ARMOR BIOS]',
  '[LOADING WEAPON SYSTEMS]',
  '[CALIBRATING NEURAL INTERFACE]',
  '[MISSION FILES ACQUIRED]',
];

export default function BootScreen({ onFinish }: { onFinish: () => void }) {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
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
  
    const prebootTimeout = setTimeout(() => {
      setIsPreBootDone(true);
    }, 12000); // más tiempo de lectura si querés
  
    const handleKey = () => {
      clearTimeout(prebootTimeout);
      setIsPreBootDone(true);
    };
  
    window.addEventListener('keydown', handleKey);
    return () => {
      clearTimeout(prebootTimeout);
      window.removeEventListener('keydown', handleKey);
    };
  }, [isClient, isPreBootDone]);

  useEffect(() => {
    if (!isPreBootDone || currentIndex > bootMessages.length) return;
  
    // Si terminó
    if (currentIndex === bootMessages.length) {
      setIsComplete(true);
      setVisibleLines((lines) => [...lines, '[READY]']);
      setTimeout(onFinish, 1000);
      return;
    }
  
    let dotCount = 0;
    const dotInterval = setInterval(() => {
      dotCount++;
      setDots('.'.repeat(dotCount % 4));
    }, 300);
  
    const fullMessage = bootMessages[currentIndex];
    const delay = 400 + Math.random() * 400;
  
    const finishLine = setTimeout(() => {
      clearInterval(dotInterval);
      setDots('');
      setVisibleLines((lines) => [...lines, `${fullMessage} <ok/>`]);
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
    <div className="flex flex-col font-mono text-sm text-green-400">
      {visibleLines.map((line, i) => {
        const [beforeOK, hasOK] = line.split('<ok/>');
        return (
          <div key={i}>
            {beforeOK}
            {hasOK !== undefined && <span className="text-blue-400"> OK</span>}
          </div>
        );
      })}

      {!isComplete && (
        <div>
          {bootMessages[currentIndex]}
          {dots}
        </div>
      )}

      {isComplete && (
        <div className="mt-2 text-green-600">
          λ
        </div>
      )}
    </div>
  );
}
