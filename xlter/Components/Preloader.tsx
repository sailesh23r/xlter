"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import Logo from "./Logo";
import CustomLogo from "./CustomLogo";

const CONFIG = {
    FILL_DURATION: 0.1,
    EXIT_DURATION: 1.2,
    THEME_COLOR: "var(--primary)",
};

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        if (counter >= 100) {
            const timer = setTimeout(() => setIsLoading(false), 200);
            return () => clearTimeout(timer);
        }

        // Fast increment for a snappy feel
        const interval = setInterval(() => {
            setCounter((prev) => {
                const step = Math.floor(Math.random() * 15) + 5;
                const next = prev + step;
                return next > 100 ? 100 : next;
            });
        }, 35);

        return () => clearInterval(interval);
    }, [counter]);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ 
                        y: "-100%",
                        transition: { duration: 0.8, ease: [0.85, 0, 0.15, 1] }
                    }}
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background text-foreground overflow-hidden"
                >
                    <div className="relative z-10 flex flex-col items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="mb-8"
                        >
                            <CustomLogo color="currentColor" monochrome={false} className="h-8 w-auto" />
                        </motion.div>

                        <div className="flex flex-col items-center">
                            {/* Fast Minimal Progress Line */}
                            <div className="w-48 h-[1px] bg-foreground/10 relative overflow-hidden mb-4">
                                <motion.div
                                    initial={{ width: "0%" }}
                                    animate={{ width: `${counter}%` }}
                                    transition={{ ease: "easeInOut", duration: 0.2 }}
                                    className="absolute inset-0 bg-primary"
                                />
                            </div>

                            {/* Premium Minimalist Counter */}
                            <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-black tracking-tighter text-foreground">
                                    {counter.toString().padStart(3, '0')}
                                </span>
                                <span className="text-[10px] font-bold text-primary tracking-widest uppercase">
                                    %
                                </span>
                            </div>

                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.3 }}
                                className="text-[8px] uppercase tracking-[0.8em] text-foreground mt-4 ml-[0.8em]"
                            >
                                Architecture of Digital
                            </motion.span>
                        </div>
                    </div>

                    {/* Minimalist Grid Pattern Background */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                        style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '40px 40px' }}
                    />

                    {/* Premium Gradient Overlay */}
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-foreground/[0.02] to-foreground/[0.05]" />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
