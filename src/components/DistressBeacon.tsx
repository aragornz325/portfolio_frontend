import { useState } from 'react';

export default function DistressBeacon({ onComplete }: { onComplete: () => void }) {
    const [step, setStep] = useState<'confirm' | 'email' | 'phone' | 'location' | 'message' | 'review' | 'sending' | 'done'>('confirm');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [location, setLocation] = useState('');
    const [message, setMessage] = useState('');
    const [log, setLog] = useState<string[]>([]);
    const [error, setError] = useState('');

    const isEmailValid = (value: string) => /.+@.+\..+/.test(value);
    const isPhoneValid = (value: string) => /^\+?\d+$/.test(value);

    const handleKey = (e: React.KeyboardEvent<HTMLInputElement>, setter: (val: string) => void,
        nextStep: 'confirm' | 'email' | 'phone' | 'location' | 'message' | 'review' | 'sending' | 'done', validate?: () => boolean) => {
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
        const payload = { email, phone, location, message };
        console.log('Distress Beacon Payload:', payload);
        const sequence = [
            '[COMPILING PAYLOAD...]',
            '[COMPRESSING DATA...]',
            '[CALIBRATING SIGNAL...]',
            '[INITIATING CLASS-7 EMERGENCY BEACON...]',
            '[SIGNAL LAUNCHED.]',
        ];
        for (let i = 0; i < sequence.length; i++) {
            await new Promise((res) => setTimeout(res, 800));
            setLog((prev) => [...prev, sequence[i]]);
        }
        setTimeout(() => setStep('done'), 1000);
    };

    if (step === 'confirm') {
        return (
            <div className="text-white pl-8 animate-pulse">
                ⚠ This action will send a distress beacon to Spartan-rmq-117.<br />
                Are you sure you want to proceed? (<span className="text-green-400">y</span> / <span className="text-red-400">n</span>)
                <br />
                <input
                    className="bg-transparent text-white outline-none"
                    onKeyDown={(e) => {
                        if (e.key.toLowerCase() === 'y') setStep('email');
                        if (e.key.toLowerCase() === 'n') onComplete();
                    }}
                    autoFocus
                />
            </div>
        );
    }

    if (step === 'email') {
        return (
            <div className="text-white pl-8">
                {'>'} Enter your serial ID (email):<br />
                <input
                    className="bg-transparent text-white outline-none w-full"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => handleKey(e, setEmail, 'phone', () => isEmailValid(email))}
                    autoFocus
                />
                {error && <div className="text-red-500 mt-2">{error}</div>}
            </div>
        );
    }

    if (step === 'phone') {
        return (
            <div className="text-white pl-8">
                {'>'} Enter your badge number (phone / whatsapp - optional):<br />
                <input
                    className="bg-transparent text-white outline-none w-full"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    onKeyDown={(e) => handleKey(e, setPhone, 'location', () => !phone || isPhoneValid(phone))}
                    autoFocus
                />
                {error && <div className="text-red-500 mt-2">{error}</div>}
            </div>
        );
    }

    if (step === 'location') {
        return (
            <div className="text-white pl-8">
                {'>'} Indicate your location (optional):<br />
                <input
                    className="bg-transparent text-white outline-none w-full"
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
            <div className="text-white pl-8">
                {'>'} Message:<br />
                <input
                    className="bg-transparent text-white outline-none w-full"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => handleKey(e, setMessage, 'review', () => message.length > 0)}
                    autoFocus
                />
                {error && <div className="text-red-500 mt-2">{error}</div>}
            </div>
        );
    }

    if (step === 'review') {
        return (
            <div className="text-white pl-8">
                All fields collected.<br />
                Proceed to transmit the beacon? (<span className="text-green-400">y</span> / <span className="text-red-400">n</span>)
                <br />
                <input
                    className="bg-transparent text-white outline-none"
                    onKeyDown={(e) => {
                        if (e.key.toLowerCase() === 'y') sendBeacon();
                        if (e.key.toLowerCase() === 'n') onComplete();
                    }}
                    autoFocus
                />
            </div>
        );
    }

    if (step === 'sending') {
        return (
            <div className="text-white pl-8">
                {log.map((line, i) => (
                    <div key={i}>{line}</div>
                ))}
            </div>
        );
    }

    if (step === 'done') {
        return (
            <div className="text-white pl-8 animate-pulse">
                A distress signal has been sent.<br />
                Await response from Spartan-rmq-117
                Connection closed...
            </div>
        );
    }

    return null;
}
