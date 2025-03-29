import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { messagesONIDirectiveVerification } from "@/core/messages/ONIVerification";

// Reusable verification intro for all easter eggs
export function ONIDirectiveVerification({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => {
        if (prev >= 2) {
          clearInterval(timer);
          setTimeout(() => {
            onComplete();
          }, 0);
          return prev;
        }
        return prev + 1;
      });
    }, 1000);
  
    return () => clearInterval(timer);
  }, [onComplete]);

  ;

  return (
    <div className="p-4 space-y-2 font-mono text-lg text-green-400">
      {messagesONIDirectiveVerification.slice(0, step + 1).map((msg, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {msg}
        </motion.div>
      ))}
    </div>
  );
}