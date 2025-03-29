'use client';

import { commandBooting } from "@/types/Command";
import { useEffect, useState } from "react";

export const bootMessages: commandBooting[] = [
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

export function useBootScreen() {
     const [visibleLines, setVisibleLines] = useState<commandBooting[]>([]);
      const [currentIndex, setCurrentIndex] = useState(0);
      const [dots, setDots] = useState('');
      const [isComplete, setIsComplete] = useState(false);
      const [isClient, setIsClient] = useState(false);
      const [isPreBootDone, setIsPreBootDone] = useState(false);
      const [isTouchDevice, setIsTouchDevice] = useState(false);
      
    
      useEffect(() => {
        setIsClient(true);
        setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
      }, []);
    
      useEffect(() => {
        if (!isClient || isPreBootDone) return;
    
        const preBootTimeout = setTimeout(() => {
          setIsPreBootDone(true);
        }, 8000);
    
        const handleInit = () => {
          clearTimeout(preBootTimeout);
          setIsPreBootDone(true);
        };
    
        window.addEventListener('keydown', handleInit);
        window.addEventListener('touchstart', handleInit);
        return () => {
          clearTimeout(preBootTimeout);
          window.removeEventListener('keydown', handleInit);
          window.removeEventListener('touchstart', handleInit);
        };
      }, [isClient, isPreBootDone]);
    
      useEffect(() => {
        if (!isPreBootDone || currentIndex > bootMessages.length) return;
    
        if (currentIndex === bootMessages.length) {
          setIsComplete(true);
          setVisibleLines((lines) => [...lines, { label: '[READY]', status: 'ok' }]);
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
          setVisibleLines((lines) => [...lines, fullMessage]);
          setCurrentIndex((i) => i + 1);
        }, delay);
    
        return () => {
          clearInterval(dotInterval);
          clearTimeout(finishLine);
        };
      }, [currentIndex, isPreBootDone]);
    
    
    
    return {
      bootMessages,
  visibleLines,
  currentIndex,
  dots,
  isComplete,
  isClient,
  isPreBootDone,
  isTouchDevice,
    };
}
