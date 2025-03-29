import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { sendHailingSignal } from '@/lib/repositories/sendHailingSignal';
import { hailingSequence } from '@/core/messages/Haling';

function isMobileDevice() {
  if (typeof window === 'undefined') return false;
  return /Mobi|Android/i.test(navigator.userAgent);
}

export function useHailingForm(onComplete: () => void) {
  const [step, setStep] = useState<'confirm' | 'email' | 'phone' | 'location' | 'message' | 'review' | 'sending' | 'done'>('confirm');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');
  const [log, setLog] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  const mutation = useMutation({ mutationFn: sendHailingSignal });

  useEffect(() => {
    setIsMobile(isMobileDevice());
  }, []);

  const isEmailValid = (value: string) => /.+@.+\..+/.test(value);
  const isPhoneValid = (value: string) => /^\+?\d+$/.test(value);

  const handleKey = (
    e: React.KeyboardEvent<HTMLInputElement>,
    value: string,
    setter: (val: string) => void,
    nextStep: typeof step,
    validate?: () => boolean
  ) => {
    if (e.key === 'Enter') {
      if (validate && !validate()) {
        setError('> Invalid input.');
        return;
      }
      setError('');
      setStep(nextStep);
    } else {
      setError('');
    }
  };

  const sendBeacon = async () => {
    setStep('sending');
    setLog([]);
    const payload = { email, phone, location, message };

    for (let i = 0; i < hailingSequence.length; i++) {
      await new Promise((res) => setTimeout(res, 800));
      setLog((prev) => [...prev, hailingSequence[i]]);
    }

    try {
      await mutation.mutateAsync(payload);
      setTimeout(() => setStep('done'), 1000);
    } catch (err) {
      console.error('❌ Beacon transmission failed:', err);
      setLog((prev) => [
        ...prev,
        '',
        '[CRITICAL FAILURE]',
        '> Beacon transmission failed.',
        '> Position may have been compromised.',
      ]);
    }
  };

  return {
    step,
    email,
    phone,
    location,
    message,
    log,
    error,
    isMobile,
    setStep,
    setEmail,
    setPhone,
    setLocation,
    setMessage,
    handleKey,
    sendBeacon,
    setError,
    isEmailValid,
    isPhoneValid,
    onComplete,
  };
}
