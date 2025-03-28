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

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    if (currentIndex >= bootMessages.length) {
      setIsComplete(true);
      setTimeout(() => {
        setVisibleLines((lines) => [...lines, '[READY]']);
        setTimeout(onFinish, 1000);
      }, 1000);
      return;
    }

    let dotCount = 0;
    const dotInterval = setInterval(() => {
      dotCount++;
      setDots('.'.repeat(dotCount % 4));
    }, 300);

    const fullMessage = `${bootMessages[currentIndex]}`;
    const delay = 80;

    const finishLine = setTimeout(() => {
      clearInterval(dotInterval);
      setDots('');
      setVisibleLines((lines) => [
        ...lines,
        
        `${fullMessage} <ok/>`,
      ]);
      setCurrentIndex((i) => i + 1);
    }, delay);

    return () => {
      clearInterval(dotInterval);
      clearTimeout(finishLine);
    };
  }, [currentIndex, onFinish, isClient]);

  if (!isClient) return null;

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
