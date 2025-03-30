'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Terminal from '../components/Terminal';

const BootScreen = dynamic(() => import('../components/BootScreen'), {
  ssr: false,
});

export default function Home() {
  const [bootComplete, setBootComplete] = useState(false);

  return (
    <div className="flex items-start justify-start w-full h-screen p-4 overflow-y-auto font-mono text-sm text-green-400 bg-black">
      <div className="flex flex-col-reverse w-full max-w-screen-md">
      <div className="p-4 text-terminal-error font-terminal animate-glitch">
          Diagnóstico confirmado, Jefe.
        </div>
        {!bootComplete ? (
          <BootScreen onFinish={() => setBootComplete(true)} />
        ) : (
          <Terminal />
        )}
      </div>
    </div>
  );
}
