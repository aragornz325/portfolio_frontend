import { hailingSequence } from '@/core/messages/Haling';
import { sendHailingSignal } from '@/lib/repositories/sendHailingSignal';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

function isMobileDevice() {
    if (typeof window === 'undefined') return false;
    return /Mobi|Android/i.test(navigator.userAgent);
}

export default function HailingSignal({ onComplete }: { onComplete: () => void }) {
    const [step, setStep] = useState<'confirm' | 'email' | 'phone' | 'location' | 'message' | 'review' | 'sending' | 'done'>('confirm');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [location, setLocation] = useState('');
    const [message, setMessage] = useState('');
    const [log, setLog] = useState<string[]>([]);
    const [error, setError] = useState('');
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(isMobileDevice());
    }, []);

    const isEmailValid = (value: string) => /.+@.+\..+/.test(value);
    const isPhoneValid = (value: string) => /^\+?\d+$/.test(value);

    const handleKey = (
        e: React.KeyboardEvent<HTMLInputElement>,
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

    const mutation = useMutation({
        mutationFn: sendHailingSignal,
      });

      const sendBeacon = async () => {
        setStep('sending');
        setLog([]); 
      
        const payload = { email, phone, location, message };
      
        for (let i = 0; i < hailingSequence.length; i++) {
          await new Promise((res) => setTimeout(res, 800));
          setLog((prev) => [...prev, hailingSequence[i]]);
        }
      
        try {
          const res = await mutation.mutateAsync(payload);
          console.log('✅ Beacon sent:', res);
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

    if (step === 'confirm') {
        return (
            <div className="pl-8 text-white animate-pulse">
                ⚠ This action will initiate a hailing signal to Spartan-rmq-117.<br />
                Are you sure you want to proceed?
                <br />
                {isMobile ? (
                    <div className="flex gap-4 mt-2">
                        <button className="px-4 py-1 bg-green-600 rounded blink" onClick={() => setStep('email')}>YES</button>
                        <button className="px-4 py-1 bg-red-600 rounded blink" onClick={() => onComplete()}>NO</button>
                    </div>
                ) : (
                    <>
                        (<span className="text-green-400"> Y </span>) / (<span className="text-red-400"> N </span>)
                        <br />
                        <input
                            className="text-white bg-transparent outline-none"
                            onKeyDown={(e) => {
                                if (e.key.toLowerCase() === 'y') setStep('email');
                                if (e.key.toLowerCase() === 'n') onComplete();
                            }}
                            autoFocus
                        />
                    </>
                )}
            </div>
        );
    }

    if (step === 'email') {
        return (
            <div className="pl-8 text-white">
                {'>'} Enter your serial ID (email):<br />
                <input
                    className="w-full text-white bg-transparent outline-none"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => handleKey(e, setEmail, 'phone', () => isEmailValid(email))}
                    autoFocus
                />
                {error && <div className="mt-2 text-red-500">{error}</div>}
            </div>
        );
    }

    if (step === 'phone') {
        return (
            <div className="pl-8 text-white">
                {'>'} Enter your badge number (phone / whatsapp - optional):<br />
                <input
                    className="w-full text-white bg-transparent outline-none"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    onKeyDown={(e) => handleKey(e, setPhone, 'location', () => !phone || isPhoneValid(phone))}
                    autoFocus
                />
                {error && <div className="mt-2 text-red-500">{error}</div>}
            </div>
        );
    }

    if (step === 'location') {
        return (
            <div className="pl-8 text-white">
                {'>'} Indicate your location (optional):<br />
                <input
                    className="w-full text-white bg-transparent outline-none"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    onKeyDown={(e) => handleKey(e, setLocation, 'message')}
                    autoFocus
                />
            </div>
        );
    }

    if (step === 'message') {
        return (
            <div className="pl-8 text-white">
                {'>'} Message:<br />
                <input
                    className="w-full text-white bg-transparent outline-none"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => handleKey(e, setMessage, 'review', () => message.length > 0)}
                    autoFocus
                />
                {error && <div className="mt-2 text-red-500">{error}</div>}
            </div>
        );
    }

    if (step === 'review') {
        return (
            <div className="pl-8 text-white">
                All fields collected.<br />
                Proceed to transmit the beacon?
                <br />
                {isMobile ? (
                    <div className="flex gap-4 mt-2">
                        <button className="px-4 py-1 bg-green-600 rounded blink" onClick={sendBeacon}>YES</button>
                        <button className="px-4 py-1 bg-red-600 rounded blink" onClick={onComplete}>NO</button>
                    </div>
                ) : (
                    <>
                        (<span className="text-green-400"> Y </span>) / (<span className="text-red-400"> N </span>)<br />
                        <input
                            className="text-white bg-transparent outline-none"
                            onKeyDown={(e) => {
                                if (e.key.toLowerCase() === 'y') sendBeacon();
                                if (e.key.toLowerCase() === 'n') onComplete();
                            }}
                            autoFocus
                        />
                    </>
                )}
            </div>
        );
    }

    if (step === 'sending') {
        return (
            <div className="pl-8 text-white">
                {log.map((line, i) => (
                    <div key={i}>{line}</div>
                ))}
            </div>
        );
    }

    if (step === 'done') {
        return (
            <div className="pl-8 text-white animate-pulse">
                Hailing frequency opened.<br />
                Awaiting acknowledgement from Spartan-rmq-117<br />
                Frequency closed...
            </div>
        );
    }

    return null;
}
