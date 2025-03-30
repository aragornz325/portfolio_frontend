'use client';

import { Command } from "@/types/Command";
import { ReactNode, useEffect, useRef, useState } from "react";
import { useRampancySystem } from "./useRampancySystem";
import { runInfo } from "../commands/runInfo";
import { runWeaponsSequence } from "../commands/runWeaponsSequence";
import DartBackendEasterEgg from "../commands/dartBackendEasterEgg";
import { runTacticsSequence } from "../commands/runTacticsSequence";
import { runMissionLogs } from "../commands/runMissionLogs";
import { runWhoami } from "../commands/runWhoami";
import { commandAvailable } from "../messages/CommandAvailable";

export function useTerminalLogic() {
    const [history, setHistory] = useState<Command[]>([]);
    const [input, setInput] = useState('');
    const [showWelcome, setShowWelcome] = useState(true);
    const inputRef = useRef<HTMLInputElement>(null);
    const [hailingActive, setHailingActive] = useState(false);
    const [isLocked, setIsLocked] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const endOfTerminalRef = useRef<HTMLDivElement>(null);
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState<number | null>(null);
    const [commandCount, setCommandCount] = useState(0);

    useEffect(() => {
        const timeout = setTimeout(() => {
            endOfTerminalRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        return () => clearTimeout(timeout);
    }, [history]);

    useEffect(() => {
        if (historyIndex !== null) {
            const cmd = commandHistory[historyIndex];
            if (cmd) setInput(cmd);
        }
    }, [commandHistory, historyIndex]);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const {
        showWarning,
        triggerRampancy,
        rampancyActive,
        completeRampancy,
    } = useRampancySystem(commandCount, () => {
        setHistory((prev) => [
            ...prev,
            {
                text: '',
                output: `CORTANA: Override accepted...<br/>Stability restored. Thank you, Jefe... I thought I was lost.`,
                style: 'text-blue-400 font-mono italic pl-8',
            },
        ]);
    });

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

    const injectFakeLogs = (lines: string[]) => {
        setHistory((prev) => [
          ...prev,
          ...lines.map((line) => ({
            text: '',
            output: (
              <div className="animate-fade-in text-terminal-error font-terminal">
                {line}
              </div>
            ),
          })),
        ]);
      };

    const handleCommand = async (cmd: string) => {
        if (isLocked) return;
        if (showWelcome) {
            setShowWelcome(false);
        }
        setCommandCount((prev) => prev + 1);
        const lower = cmd.toLowerCase();
        let output: string | string[] | ReactNode = '';

        switch (lower) {
            case 'info':
            case 'info --all':
            case 'info --origin':
            case 'info --identity':
            case 'info --stack':
            case 'info --mission':
            case 'info --design':
            case 'info --purpose':
            case 'info --system':
            case 'info --status':
                setIsLocked(true);
                await runInfo(cmd, setHistory, setInput);
                setIsLocked(false);
                return;

            case 'clear':
                setHistory([]);
                setInput('');
                return;

            case 'hail':
                setHailingActive(true);
                setHistory((prev) => [
                    ...prev,
                    { text: cmd, output: '', style: 'text-white' },
                ]);
                setInput('');
                return;

            case 'weapons':
                setIsLocked(true);
                await runWeaponsSequence(cmd, setHistory, setInput);
                setIsLocked(false);
                return;

            case 'init.backend.dart':
                setIsLocked(true);
                setHistory((prev) => [
                    ...prev,
                    {
                        text: cmd,
                        output: (
                            <DartBackendEasterEgg
                                cmd={cmd}
                                setHistory={setHistory}
                                setInput={setInput}
                            />
                        ),
                    },
                ]);
                setInput('');
                setIsLocked(false);
                return;

            case 'tactics':
                setIsLocked(true);
                await runTacticsSequence(cmd, setHistory, setInput);
                setIsLocked(false);
                return;

            case 'missions':
            case 'missions --deep':
            case 'missions --download':
                setIsLocked(true);
                await runMissionLogs(cmd, setHistory, setInput, waitForKey);
                setIsLocked(false);
                return;

            case 'whoami':
                setIsLocked(true);
                await runWhoami(cmd, setHistory, setInput);
                setIsLocked(false);
                return;

            case 'help':
                output = commandAvailable.map(
                    (c) => `${c.command} - ${c.description}`
                );
                break;

            default:
                output = `Unknown command: ${cmd}`;
        }

        setHistory((prev) => [
            ...prev,
            { text: cmd, output, style: 'text-white' },
        ]);
        setInput('');
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && input.trim() !== '') {
            setCommandHistory((prev) => [...prev, input]);
            setHistoryIndex(null);
            handleCommand(input.trim());
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setHistoryIndex((prev) => {
                const newIndex =
                    prev === null ? commandHistory.length - 1 : Math.max(prev - 1, 0);
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
    }
    return {
        handleKeyDown,
        inputRef,
        endOfTerminalRef,
        history,
        input,
        setInput,
        handleCommand,
        setHistoryIndex,
        historyIndex,
        commandHistory,
        setCommandHistory,
        showWelcome,
        hailingActive,
        setHailingActive,
        rampancyActive,
        triggerRampancy,
        completeRampancy,
        injectFakeLogs,
        showWarning,
        containerRef
    };
}
