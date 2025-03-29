'use client';

import { getStatusClass } from '@/core/helpers/getStatusClass';
import { bootMessages, useBootScreen } from '@/core/hooks/useBootScreen';
import { useEffect } from 'react';


export default function BootScreen({ onFinish }: { onFinish: () => void }) {

  const {
    visibleLines,
    currentIndex,
    dots,
    isComplete,
    isClient,
    isPreBootDone,
    isTouchDevice
  } = useBootScreen();



  useEffect(() => {
    if (isComplete) {
      const timeout = setTimeout(() => {
        onFinish(); // ✅ Ejecutás onFinish desde el componente
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [isComplete, onFinish]);

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
          <p className="mt-4 text-blue-400 animate-pulse">
            {isTouchDevice ? 'Tap anywhere to initialize...' : 'Press any key to initialize immediately...'}
          </p>
        </div>
      </div>
    );
  }

  if (!isClient) return null;


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
