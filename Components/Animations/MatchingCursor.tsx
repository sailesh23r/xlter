"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function MatchingCursor() {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    
    const springConfig = { damping: 25, stiffness: 200 };
    const springX = useSpring(cursorX, springConfig);
    const springY = useSpring(cursorY, springConfig);

    const ringX = useSpring(cursorX, { damping: 30, stiffness: 100 });
    const ringY = useSpring(cursorY, { damping: 30, stiffness: 100 });

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        window.addEventListener("mousemove", moveCursor);
        return () => window.removeEventListener("mousemove", moveCursor);
    }, [cursorX, cursorY]);

    return (
        <>
            {/* Main Precision Dot */}
            <motion.div
                className="fixed top-0 left-0 w-1.5 h-1.5 bg-primary rounded-full z-[9999] pointer-events-none"
                style={{
                    x: springX,
                    y: springY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            />

            {/* Elastic Precision Ring */}
            <motion.div
                className="fixed top-0 left-0 w-10 h-10 border border-primary/30 rounded-full z-[9998] pointer-events-none flex items-center justify-center"
                style={{
                    x: ringX,
                    y: ringY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            >
                {/* Crosshair Lines */}
                <div className="absolute w-full h-[1px] bg-primary/10" />
                <div className="absolute w-[1px] h-full bg-primary/10" />
            </motion.div>
        </>
    );
}
