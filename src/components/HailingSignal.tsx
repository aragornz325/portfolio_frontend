// HailingSignal.tsx

import { InputPrompt } from "@/core/commands/InputPrompt";
import { useHailingForm } from "@/core/hooks/useHailingForm";


export default function HailingSignal({ onComplete }: { onComplete: () => void }) {
  const {
    step, email, phone, location, message,
    log, error, isMobile,
    setStep, setEmail, setPhone, setLocation, setMessage,
    handleKey, sendBeacon, 
    isEmailValid, isPhoneValid,
    onComplete: completeFn
  } = useHailingForm(onComplete);

  if (step === 'confirm') {
    return (
      <div className="pl-8 text-white animate-pulse">
        ⚠ This action will initiate a hailing signal to Spartan-rmq-117.<br />
        Are you sure you want to proceed?
        <br />
        {isMobile ? (
          <div className="flex gap-4 mt-2">
            <button className="px-4 py-1 bg-green-600 rounded blink" onClick={() => setStep('email')}>YES</button>
            <button className="px-4 py-1 bg-red-600 rounded blink" onClick={completeFn}>NO</button>
          </div>
        ) : (
          <>
            (<span className="text-green-400"> Y </span>) / (<span className="text-red-400"> N </span>)
            <br />
            <input
              className="text-white bg-transparent outline-none"
              onKeyDown={(e) => {
                if (e.key.toLowerCase() === 'y') setStep('email');
                if (e.key.toLowerCase() === 'n') completeFn();
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
      <InputPrompt
        label={"> Enter your serial ID (email):"}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyDown={(e) => handleKey(e, email, setEmail, 'phone', () => isEmailValid(email))}
        error={error}
      />
    );
  }

  if (step === 'phone') {
    return (
      <InputPrompt
        label={"> Enter your badge number (phone / whatsapp - optional):"}
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        onKeyDown={(e) => handleKey(e, phone, setPhone, 'location', () => !phone || isPhoneValid(phone))}
        error={error}
      />
    );
  }

  if (step === 'location') {
    return (
      <InputPrompt
        label={"> Indicate your location (optional):"}
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        onKeyDown={(e) => handleKey(e, location, setLocation, 'message')}
      />
    );
  }

  if (step === 'message') {
    return (
      <InputPrompt
        label={"> Message:"}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => handleKey(e, message, setMessage, 'review', () => message.length > 0)}
        error={error}
      />
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
            <button className="px-4 py-1 bg-red-600 rounded blink" onClick={completeFn}>NO</button>
          </div>
        ) : (
          <>
            (<span className="text-green-400"> Y </span>) / (<span className="text-red-400"> N </span>)<br />
            <input
              className="text-white bg-transparent outline-none"
              onKeyDown={(e) => {
                if (e.key.toLowerCase() === 'y') sendBeacon();
                if (e.key.toLowerCase() === 'n') completeFn();
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
