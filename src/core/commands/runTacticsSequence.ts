import { Command } from '../../types/Command';

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const runTacticsSequence = async (
    cmd: string,
    setHistory: React.Dispatch<React.SetStateAction<Command[]>>,
    setInput: React.Dispatch<React.SetStateAction<string>>
) => {
    setHistory((prev) => [
        ...prev,
        { text: cmd, output: '[ENGAGING TACTICAL PROTOCOLS...]', style: ' text-yellow-300 text-sm sm:text-base md:text-base lg:text-lg leading-snug break-words' },
    ]);
    await delay(600);

    const tactics = [
        '[LEADERSHIP CORE]         Guides squads through critical missions',
        '[STRATEGIC THINKING]      Orchestrates long-term operational success',
        '[PROBLEM SOLVING]         Resolves critical threats under pressure',
        '[COMMUNICATION ARRAY]     Ensures clarity between allied units',
        '[EMOTIONAL INTELLIGENCE]  Maintains cohesion under fire',
        '[TEAM COORDINATION]       Operates seamlessly in diverse squads',
        '[ADAPTABILITY]            Reconfigures under changing environments',
        '[CLIENT-FOCUSED MODE]     Delivers precision strikes based on mission needs',
    ];

    for (const line of tactics) {
        await delay(150);
        setHistory((prev) => [...prev, { text: '', output: `→ ${line}`, style: 'text-white text-sm sm:text-base md:text-base lg:text-lg leading-snug break-words' }]);
    }

    await delay(600);
    setHistory((prev) => [...prev, { text: '', output: '[TACTICAL SYSTEMS NOMINAL.]', style: 'text-yellow-300 text-sm sm:text-base md:text-base lg:text-lg leading-snug break-words' }]);
    setInput('');
};
