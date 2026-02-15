import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const RetroLoader = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [text, setText] = useState("");
    const fullText = "INITIALIZING SYSTEM...";

    useEffect(() => {
        // Typing effect
        let i = 0;
        const typingInterval = setInterval(() => {
            if (i < fullText.length) {
                setText(prev => prev + fullText.charAt(i));
                i++;
            } else {
                clearInterval(typingInterval);
            }
        }, 50);

        // Progress bar
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    setTimeout(onComplete, 800); // Wait a bit before finishing
                    return 100;
                }
                return prev + 2;
            });
        }, 30);

        return () => {
            clearInterval(typingInterval);
            clearInterval(progressInterval);
        };
    }, [onComplete]);

    return (
        <div className="fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center font-mono text-white">
            {/* Scanline Effect */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none" />

            <div className="relative z-20 text-center space-y-8">
                <motion.h1
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-4xl md:text-6xl font-black tracking-tighter text-red-600 drop-shadow-[4px_4px_0_rgba(255,255,255,0.2)]"
                    style={{ fontFamily: "'Press Start 2P', cursive, monospace" }} // Fallback
                >
                    BOOKMARK<br />CONTRA
                </motion.h1>

                <div className="text-blue-400 text-xl md:text-2xl animate-pulse font-bold tracking-widest">
                    {text}<span className="inline-block w-3 h-6 bg-blue-400 ml-1 animate-pulse"></span>
                </div>

                {/* Retro Progress Bar */}
                <div className="w-64 md:w-96 h-8 border-4 border-white p-1 mx-auto relative">
                    <div
                        className="h-full bg-red-600 transition-all duration-75 ease-linear"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <div className="text-xs text-slate-500 mt-4">
                    PLAYER 1 READY
                </div>
            </div>
        </div>
    );
};

export default RetroLoader;
