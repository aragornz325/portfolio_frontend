import { Command } from '@/types/Command';
import missions from '../messages/missions.json';

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const runMissionLogs = async (
  cmd: string,
  setHistory: React.Dispatch<React.SetStateAction<Command[]>>,
  setInput: React.Dispatch<React.SetStateAction<string>>,
  waitForKey: () => Promise<void>
) => {
  setHistory((prev) => [
    ...prev,
    { text: cmd, output: '[ACCESSING OPERATIONAL HISTORY...]', style: 'text-default' },
  ]);
  await delay(400);

  let index = 1;

  for (const mission of missions) {
    const block: Command[] = [];

    block.push({ text: '', output: '>>> Decrypting...', style: 'text-blue-300 animate-pulse' });
    await delay(400);

    const header = `<span class="text-green-400 animate-fade-in">→ [${mission.organization}] ${mission.title} | ${mission.period}</span>`;
    block.push({ text: '', output: header, style: '' });
    await delay(400);

    for (const detail of mission.details) {
      const labelMatch = detail.match(/^(FIELD|DEPLOYMENT|IMPACT|OPS):\s*/);
      const style = 'text-white pl-4';

      if (labelMatch) {
        const label = labelMatch[1];
        const content = detail.replace(labelMatch[0], '');
        let labelColor = '';

        switch (label) {
          case 'FIELD':
            labelColor = 'text-cyan-400';
            break;
          case 'DEPLOYMENT':
            labelColor = 'text-yellow-300';
            break;
          case 'IMPACT':
            labelColor = 'text-pink-400';
            break;
          case 'OPS':
            labelColor = 'text-purple-400';
            break;
        }

        block.push({
          text: '',
          output: `<span class=\"${labelColor}\">${label}:</span> ${content}`,
          style: '',
        });
      } else if (detail.startsWith('Status:')) {
        const isActive = detail.includes('Active');
        const statusColor = isActive ? 'text-green-400' : 'text-red-400';
        const statusLabel = isActive ? '[ACTIVE]' : '[TERMINATED]';
        block.push({
          text: '',
          output: `Status: <span class=\"${statusColor} animate-pulse\">${statusLabel}</span>`,
          style: '',
        });
      } else {
        block.push({ text: '', output: detail, style });
      }

      await delay(60);
    }

    block.push({
      text: '',
      output: `[MISSION LOG ENTRY ${String(index).padStart(3, '0')}]`,
      style: 'text-gray-400',
    });
    block.push({ text: '', output: 'Press <Enter> to continue...', style: 'text-gray-400' });

    setHistory((prev) => [...prev, ...block]);
    index++;

    await waitForKey();
  }

  await delay(500);
  setHistory((prev) => [...prev, { text: '', output: '[MISSIONS LOG COMPLETE.]', style: 'text-default' }]);
  setInput('');
};