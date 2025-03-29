import { Command } from '@/types/Command';

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const fullInfoBlock: Command[] = [
  {
    text: '',
    output: '<span class="text-blue-300">System Name:</span> Spartan-rmq-117 Terminal Interface',
    style: '',
  },
  {
    text: '',
    output: '<span class="text-blue-300">Real Identity:</span> Rodrigo Martín Quintero',
    style: '',
  },
  {
    text: '',
    output: '<span class="text-blue-300">Technology Stack:</span> Next.js, React, TailwindCSS, TypeScript, Serverpod, PostgreSQL',
    style: '',
  },
  {
    text: '',
    output: '<span class="text-blue-300">AI Integration:</span> Fully designed and developed with assistance from advanced AI systems',
    style: '',
  },
  {
    text: '',
    output: '<span class="text-blue-300">Design Philosophy:</span> Inspired by Spartan tactical systems and Halo universe aesthetics.',
    style: '',
  },
  {
    text: '',
    output: '<span class="text-blue-300">Core Purpose:</span> Showcase of skills, values, and technological mastery.',
    style: '',
  },
  {
    text: '',
    output: '<span class="text-blue-300">Location:</span> Parana, Argentina',
    style: '',
  },
  {
    text: '',
    output: '<span class="text-blue-300">Mission:</span> Empower the web through backend innovation, decentralization, and purposeful design.',
    style: '',
  },
];

const filteredBlocks: Record<string, Command[]> = {
    '--origin': [
      fullInfoBlock[6],
      {
        text: '',
        output: '<span class="text-blue-300">Additional Info:</span> Hailing from Hasenkamp, a small town with a big heart, rooted in culture and resilience.',
        style: '',
      },
    ],
    '--identity': [
      fullInfoBlock[1],
      {
        text: '',
        output: '<span class="text-blue-300">Background:</span> Developer, father, husband, and relentless problem-solver shaped by life´s challenges.',
        style: '',
      },
    ],
    '--stack': [
      fullInfoBlock[2],
      {
        text: '',
        output: '<span class="text-blue-300">Focus:</span> Advancing backend technologies with Dart and Serverpod.',
        style: '',
      },
    ],
    '--mission': [
      fullInfoBlock[7],
      {
        text: '',
        output: '<span class="text-blue-300">Vision:</span> Enable freedom and innovation through crypto-integrated commerce.',
        style: '',
      },
    ],
    '--design': [
      fullInfoBlock[4],
      fullInfoBlock[3],
      {
        text: '',
        output: '<span class="text-blue-300">Philosophy:</span> A fusion of aesthetics, practicality, and AI synergy.',
        style: '',
      },
    ],
    '--purpose': [
      fullInfoBlock[5],
      {
        text: '',
        output: '<span class="text-blue-300">Drive:</span> To inspire others by leading with resilience and passion.',
        style: '',
      },
    ],
    '--system': [
      fullInfoBlock[0],
      {
        text: '',
        output: '<span class="text-blue-300">Mode:</span> Constantly evolving, guided by real-time cognitive sync with Cortana AI.',
        style: '',
      },
    ],
    '--status': [
      fullInfoBlock[0],
      {
        text: '',
        output: '<span class="text-blue-300">Mode:</span> Active, ready to deploy new features and updates.',
        style: '',
      },
    ],
    '--all': fullInfoBlock,
  };

export const runInfo = async (
  cmd: string,
  setHistory: React.Dispatch<React.SetStateAction<Command[]>>,
  setInput: React.Dispatch<React.SetStateAction<string>>
) => {
  setHistory((prev) => [
    ...prev,
    { text: cmd, output: '[RETRIEVING SYSTEM INFORMATION...]', style: 'text-green-400' },
  ]);

  await delay(400);

  const parts = cmd.trim().split(/\s+/);
  const modifier = parts.length > 1 ? parts[1].toLowerCase() : '--all';

  const infoToDisplay = filteredBlocks[modifier];

  if (!infoToDisplay) {
    setHistory((prev) => [
      ...prev,
      { text: '', output: `Unknown modifier: ${modifier}`, style: 'text-red-400' },
    ]);
    setInput('');
    return;
  }

  for (const line of infoToDisplay) {
    setHistory((prev) => [...prev, line]);
    await delay(200);
  }

  if (modifier === '--all') {
    setHistory((prev) => [
      ...prev,
      {
        text: '',
        output:
          '<span class="text-gray-400">Tip:</span> Use info -origin, info -status, etc. to access specific modules.',
        style: '',
      },
    ]);
  }

  setInput('');
};