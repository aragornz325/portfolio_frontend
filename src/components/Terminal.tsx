'use client';


import HailingSignal from './DistressBeacon';
import { GlitchBackground, FakeRampancyLogs } from './RampancyVisuals';
import RampancyGlitchOverlay from './RampancyGlitchOverlay';
import { useTerminalLogic } from '@/core/hooks/useTerminalLogic';
import RampancyWarningOverlay from './RampancyWarningOverlay';
import { useEffect, useState } from 'react';


export default function Terminal() {
    const [showOverride, setShowOverride] = useState(false);
    const {
        setHistoryIndex,
        handleKeyDown,
        inputRef,
        endOfTerminalRef,
        history,
        input,
        setInput,
        showWelcome,
        hailingActive,
        setHailingActive,
        rampancyActive,
        triggerRampancy,
        completeRampancy,
        injectFakeLogs,
        containerRef,
        showWarning,
        injectChaosLogs
    } = useTerminalLogic();

    useEffect(() => {
        if (triggerRampancy && rampancyActive) {
            injectChaosLogs(); // inyecta los logs fase 2

            const timeout = setTimeout(() => {
                setShowOverride(true); // muestra el cartel luego de 4 segundos
            }, 1500);

            return () => clearTimeout(timeout);
        }
    }, [triggerRampancy]);

    console.log({
        rampancyActive,
        triggerRampancy
    });

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

                        {typeof entry.output === 'string' || Array.isArray(entry.output) ? (
                            Array.isArray(entry.output) ? (
                                entry.output.map((line, i) => (
                                    <div key={i} className="pl-8 text-white">{line}</div>
                                ))
                            ) : (
                                <div
                                    className={entry.style || 'text-white pl-8'}
                                    dangerouslySetInnerHTML={{ __html: String(entry.output) }}
                                />
                            )
                        ) : (
                            <div className="pl-8">{entry.output}</div>
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
                    onChange={(e) => {
                        setInput(e.target.value);
                        setHistoryIndex(null); // resetea si escribe algo nuevo
                    }}
                    onKeyDown={handleKeyDown}
                    autoFocus
                />
            </div>

            {hailingActive && (
                <HailingSignal onComplete={() => setHailingActive(false)} />
            )}
            {showWarning && <RampancyWarningOverlay />}
            {rampancyActive && (
                <>
                    <FakeRampancyLogs inject={injectFakeLogs} />
                    <GlitchBackground active />
                </>
            )}

            {showOverride && rampancyActive && (
                <RampancyGlitchOverlay onCodeAccepted={completeRampancy} />
            )}
            <div ref={endOfTerminalRef} />

        </div>
    );
}
