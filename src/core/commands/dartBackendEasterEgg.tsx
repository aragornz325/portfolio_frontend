import { Dispatch, SetStateAction, useState } from "react";
import { ONIDirectiveVerification } from "@/components/ONIDirectiveVerification";
import { Command } from "@/types/Command";

type DartBackendEasterEggProps = {
  cmd: string;
  setHistory: Dispatch<SetStateAction<Command[]>>;
  setInput: Dispatch<SetStateAction<string>>;
};

export default function DartBackendEasterEgg({
}: DartBackendEasterEggProps) {
  const [showEgg, setShowEgg] = useState(false);

  return (
    <div className="flex flex-col items-start justify-start w-full text-sm bg-black">
      {!showEgg ? (
        <ONIDirectiveVerification onComplete={() => setShowEgg(true)} />
      ) : (
        <pre className="p-4 overflow-x-auto font-mono text-xs text-green-400 md:text-sm">
{`┌────────────────────────────────────────────────────────────┐
│                                                            │
│        _____              _               _                │
│       |  __ \\            | |             | |               │
│       | |  | | __ _ _ __ | |__   ___  ___| |__             │
│       | |  | |/ _\` | '_ \\| '_ \\ / _ \\/ __| '_ \\            │
│       | |__| | (_| | | | | | | |  __/\\__ \\ | | |           │
│       |_____/ \\__,_|_| |_|_| |_|\\___||___/_| |_|           │
│                                                            │
│        🛠  Dart Backend Operative Framework Active         │
│                                                            │
│        ▸ Serverpod ready      ▸ Supabase linked            │
│        ▸ PostgreSQL engaged   ▸ AWS/GCP deployment stable  │
│                                                            │
│        env: PROD       region: South America [🇦🇷 ARG]      │
│        operator: Spartan-rmq-117 / Hasenkamp node          │
│                                                            │
│        ❯ APIs secured         ❯ DB schema migrated         │
│        ❯ Auth validated       ❯ WebSocket: 🔒 TLS OK       │
│                                                            │
│   "Fight backend latency like you fight the Covenant."     │
│                                                            │
└────────────────────────────────────────────────────────────┘`}
        </pre>
      )}
    </div>
  );
}
