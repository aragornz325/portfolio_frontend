import { Command } from '../../types/Command';

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const runWeaponsSequence = async (
  cmd: string,
  setHistory: React.Dispatch<React.SetStateAction<Command[]>>,
  setInput: React.Dispatch<React.SetStateAction<string>>
) => {
  setHistory((prev) => [
    ...prev,
    { text: cmd, output: '[ACCESSING SPARTAN-RMQ-117 COMBAT INTERFACE...]', style: ' text-red-300 text-sm sm:text-base md:text-base lg:text-lg leading-snug break-words'  },
  ]);
  await delay(600);
  setHistory((prev) => [
    ...prev,
    { text: '', output: '[LOADING TACTICAL LOADOUT...]', style: ' text-yellow-300 text-sm sm:text-base md:text-base lg:text-lg leading-snug break-words'  },
  ]);

  const loadout = [
    '[PRIMARY FIREARM]      Node.js – Backend assault module',
    '[SIDEARM]              TypeScript – Precision type safety',
    '[TACTICAL MODULE]      NestJS – Structured backend deployment',
    '[STEALTH UNIT]         Express.js – Lightweight API runner',
    '[EXPERIMENTAL]         Dart + Serverpod – High-velocity backend prototype',
    '[DATA CORE]            PostgreSQL – Relational fortress',
    '[AUXILIARY SYSTEM]     MongoDB – Flexible NoSQL recon',
    '[CLOUD OPS]            Firebase, Supabase – Realtime support',
    '[COMMAND PROTOCOLS]    GraphQL / REST – Comms suite online',
    '[DEPLOYMENT]           Docker / Railway / GCP – Rapid deployment shell',
    '[FRONTLINE DISPLAY]    React / Next.js / Flutter – Multi-environment HUD',
    '[SECURITY]             JWT / WebSockets – Auth & live comms secured',
    '[TACTICAL ARCHITECTURE] Microservices – Modular combat pattern',
    '[OPS SUPPORT]          Git / CI-CD / Agile – Continuous mission flow',
    '[INTEL NETWORK]        Linux / macOS / Windows – OS infiltration ready',
    '[AI INTERFACE]         ChatGPT / Copilot – Enhanced decision-making layer',
  ];

  for (const line of loadout) {
    await delay(150);
    setHistory((prev) => [
      ...prev,
      { text: '', output: `→ ${line}`, style: ' text-white text-sm sm:text-base md:text-base lg:text-lg leading-snug break-words' }
    ]);
  }

  await delay(600);
  setHistory((prev) => [
    ...prev,
    { text: '', output: '[LOADOUT COMPLETE.]', style: ' text-yellow-300 text-sm sm:text-base md:text-base lg:text-lg leading-snug break-words' }
  ]);
  setInput('');
};
