'use client';

import { useEffect, useRef, useState } from 'react';
import { commandAvailable } from '../core/messages/CommandAvailable';
import { runWeaponsSequence } from '@/core/commands/runWeaponsSequence';
import { runTacticsSequence } from '@/core/commands/runTacticsSequence';
import { runMissionLogs } from '@/core/commands/runMissionLogs';
import DistressBeacon from './DistressBeacon';
import { runWhoami } from '@/core/commands/runWhoami';
import { runInfo } from '@/core/commands/runInfo';

type Command = {
    text: string;
    output: string | string[];
    style: string;
};

export default function Terminal() {
    const [history, setHistory] = useState<Command[]>([]);
    const [input, setInput] = useState('');
    const [showWelcome, setShowWelcome] = useState(true);
    const inputRef = useRef<HTMLInputElement>(null);
    const [distressActive, setDistressActive] = useState(false);
    const [isLocked, setIsLocked] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const endOfTerminalRef = useRef<HTMLDivElement>(null);
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [historyIndex, setHistoryIndex] = useState<number | null>(null);


    useEffect(() => {
        const timeout = setTimeout(() => {
            endOfTerminalRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        return () => clearTimeout(timeout);
    }, [history]);


    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const waitForKey = (): Promise<void> => {
        return new Promise((resolve) => {
            const handleKey = (e: KeyboardEvent) => {
                if (e.key === 'Enter') {
                    window.removeEventListener('keydown', handleKey);
                    resolve();
                }
            };
            window.addEventListener('keydown', handleKey);
        });
    };

    const handleCommand = async (cmd: string) => {
        if (isLocked) return;
        if (showWelcome) {
            setShowWelcome(false);
        }

        const lower = cmd.toLowerCase();

        let output: string | string[] = '';

        switch (lower) {
            case 'info':
            case 'info -all':
            case 'info -origin':
            case 'info -identity':
            case 'info -stack':
            case 'info -mission':
            case 'info -design':
            case 'info -purpose':
            case 'info -system':
            case 'info -status':
                setIsLocked(true);
                runInfo(cmd, setHistory, setInput).then(() => {
                    setIsLocked(false);
                });
                return;
            case 'clear':
                setHistory([]);
                setInput('');
                return;
            case 'distress':
                setDistressActive(true);
                setHistory((prev) => [...prev, { text: cmd, output: '', style: 'text-white' }]);
                setInput('');
                return;
            case 'weapons':
                setIsLocked(true);
                runWeaponsSequence(cmd, setHistory, setInput).then(() => {
                    setIsLocked(false);
                });
                return;
            case 'tactics':
                setIsLocked(true);
                runTacticsSequence(cmd, setHistory, setInput).then(() => {
                    setIsLocked(false);
                });
                return;
            case 'tactics':
                setIsLocked(true);
                runTacticsSequence(cmd, setHistory, setInput).then(() => {
                    setIsLocked(false);
                });
                return;
            case 'missions':
                setIsLocked(true);
                runMissionLogs(cmd, setHistory, setInput, waitForKey).then(() => {
                    setIsLocked(false);
                });
                return;
            case 'whoami':
                setIsLocked(true);
                runWhoami(cmd, setHistory, setInput).then(() => {
                    setIsLocked(false);
                })
                return;
            case 'help':
                output = commandAvailable.map((c) => `${c.command} - ${c.description}`);
                break;
            default:
                output = `Unknown command: ${cmd}`;
        }

        setHistory((prev) => [...prev, { text: cmd, output, style: 'text-white' }]);
        setInput('');
    };


    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && input.trim() !== '') {
            setCommandHistory((prev) => [...prev, input]);
            setHistoryIndex(null); // resetea después del enter
            handleCommand(input.trim());
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setHistoryIndex((prev) => {
                const newIndex = prev === null ? commandHistory.length - 1 : Math.max(prev - 1, 0);
                setInput(commandHistory[newIndex] || '');
                return newIndex;
            });
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            setHistoryIndex((prev) => {
                if (prev === null) return null;
                const newIndex = Math.min(prev + 1, commandHistory.length - 1);
                setInput(commandHistory[newIndex] || '');
                return newIndex;
            });
        }
    };

    return (
        <div
            ref={containerRef}
            className="flex flex-col w-full h-full px-4 pt-4 overflow-y-auto font-mono text-sm"
            onClick={() => inputRef.current?.focus()}
        >
            <div className="flex flex-col flex-grow">
                {showWelcome && (
                    <div className="pl-8 mb-2 text-white">
                        <div>Welcome to Spartan-rmq-117&apos;s terminal.</div>
                        <div>Type &quot;help&quot; to see available commands.</div>
                        <div className="mt-2 text-gray-400">
                            System Note: Some functions are restricted to personnel with{' '}
                            <span className="font-bold text-blue-400 animate-pulse">ONI</span> clearance.
                        </div>
                    </div>
                )}

                {history.map((entry, index) => (
                    <div key={index} className="mb-1">
                        {entry.text && (
                            <div className="flex">
                                <span className="text-green-400">spartan.rmq@cortana.ai:~λ</span>&nbsp;
                                <span className="text-white">{entry.text}</span>
                            </div>
                        )}
                        {Array.isArray(entry.output) ? (
                            entry.output.map((line, i) => (
                                <div key={i} className="pl-8 text-white">{line}</div>
                            ))
                        ) : (
                            <div
                                className={entry.style || 'text-white pl-8'}
                                dangerouslySetInnerHTML={{ __html: String(entry.output) }}
                            />


                        )}
                    </div>
                ))}
            </div>

            <div className="flex mt-2">
                <span className="text-green-400">
                    spartan@cortana.ai:~<span className="animate-pulse">λ_</span>
                </span>&nbsp;
                <input
                    ref={inputRef}
                    className="flex-1 text-white bg-transparent outline-none"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    autoFocus
                />
            </div>

            {distressActive && (
                <DistressBeacon onComplete={() => setDistressActive(false)} />
            )}
            <div ref={endOfTerminalRef} />
        </div>
    );
}
