'use client';

import { useEffect, useState, useRef } from 'react';

interface Props {
  onCodeAccepted: () => void;
}

export default function RampancyGlitchOverlay({ onCodeAccepted }: Props) {
  const [code, setCode] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [timeLeft, setTimeLeft] = useState(15);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const generated = Math.floor(100000 + Math.random() * 900000).toString();
    setCode(generated);
    setInputValue('');
    setTimeLeft(15);
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      window.location.reload();
      return;
    }
    const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue === code) {
      onCodeAccepted();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center font-mono text-sm text-green-400 bg-black bg-opacity-95 animate-fade-in">
      <div className="mb-6 space-y-2 text-center">
        <p className="text-lg font-bold text-red-600 animate-pulse">RAMPANCY DETECTED</p>
        <p className="text-sm text-white">System breach containment required</p>
        <p className="text-yellow-400">Enter override code to stabilize Cortana:</p>
        <div className="text-2xl tracking-widest text-cyan-400">{code}</div>
        <div className="text-sm text-gray-400">Time remaining: {timeLeft}s</div>
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          ref={inputRef}
          type="text"
          inputMode="numeric"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-40 px-4 py-1 text-center bg-black border outline-none border-cyan-400 text-cyan-300 focus:ring focus:ring-cyan-500"
          maxLength={6}
          autoFocus
        />
        <button type="submit" className="px-4 py-1 text-white bg-cyan-600 hover:bg-cyan-700">
          Submit
        </button>
      </form>
    </div>
  );
}