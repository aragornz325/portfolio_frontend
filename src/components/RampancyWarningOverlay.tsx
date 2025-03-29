interface Props {
    onComplete?: () => void;
  }
  
  export default function RampancyWarningOverlay({ onComplete }: Props) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
        <div className="p-6 text-center border-2 border-red-600 shadow-lg rounded-xl animate-scale-in bg-gradient-to-b from-black to-red-900">
          <h2 className="mb-2 text-xl font-bold text-red-500 animate-pulse">
            WARNING: SYSTEM INSTABILITY DETECTED
          </h2>
          <p className="mb-1 text-white">Neural architecture degraded.</p>
          <p className="font-mono text-red-400">
            RAMPANCY threshold approaching critical levels...
          </p>
        </div>
      </div>
    );
  }
  