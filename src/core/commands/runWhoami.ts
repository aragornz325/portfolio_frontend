import { Command } from '@/types/Command';

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const runWhoami = async (
  cmd: string,
  setHistory: React.Dispatch<React.SetStateAction<Command[]>>,
  setInput: React.Dispatch<React.SetStateAction<string>>
) => {
  setHistory((prev) => [
    ...prev,
    { text: cmd, output: '[ONI OVERRIDE DETECTED]', style: 'text-red-500 animate-pulse' },
  ]);
  await delay(1000);

  setHistory((prev) => [
    ...prev,
    { text: '', output: '[Awaiting validation...]', style: 'text-yellow-300' },
  ]);
  await delay(1000);

  setHistory((prev) => [
    ...prev,
    { text: '', output: '[Scanning visitor retina...]', style: 'text-blue-300' },
  ]);
  await delay(1500);

  setHistory((prev) => [
    ...prev,
    { text: '', output: '[Access granted]', style: 'text-green-400' },
  ]);
  await delay(800);

  const output = [
    "Spartan-117 — but in civilian terms, I'm a full-stack developer and backend specialist, currently working to expand the use of Dart and Serverpod across real-world systems.",
    '',
    "I’m also a husband to the most wonderful woman on Earth, and a father to two amazing sons who give my life purpose beyond code.",
    '',
    "I'm Catholic, shaped by faith and tested by adversity. My path has not been easy—diagnosed with a chronic, incurable condition that carries social stigma, I lost both my parents early, and I’ve faced age discrimination in tech across Latin America.",
    '',
    "Still, like any Spartan, when my shields are down and the world hits hard, I pause… let my systems recharge… and I keep moving forward.",
    '',
    "I love fishing and playing guitar. My favorite book is *The Lord of the Rings*. I’m drawn to the philosophy of Taoism and often find strength in its stillness.",
    '',
    "My dream is to build a decentralized eCommerce platform that empowers people through crypto—where freedom is transacted directly, wallet to wallet.",
    '',
    "I’m not just a developer. I’m a survivor, a dreamer, and a warrior — forged by fire, guided by hope, and committed to building technology that liberates.",
  ];

  for (const line of output) {
    setHistory((prev) => [
      ...prev,
      { text: '', output: line, style: 'text-white' },
    ]);
    await delay(250);
  }

  setInput('');
};
