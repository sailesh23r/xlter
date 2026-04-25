"use client";

import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { fadeUp, stagger } from "@/lib/animations";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";
import Squares from "../Animations/Squares";
import GridBackground from "../Animations/GridBackground";

const scrollText = [
    "STRATEGY", "DESIGN", "DEVELOPMENT", "BRANDING", "MARKETING", "AI SOLUTIONS", "EXPERIENCE", "INNOVATION"
];

export default function Hero() {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"]
    });

    const scrollScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
    const scrollOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scrollYValue = useTransform(scrollYProgress, [0, 1], [0, 100]);

    const handleGetStarted = () => {
        const element = document.getElementById('services');
        if (element) {
            const yOffset = -80;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    return (
        <motion.section
            ref={sectionRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            variants={stagger}
            initial="hidden"
            animate="show"
            className="min-h-screen flex flex-col justify-center items-center text-center w-full bg-transparent will-change-transform overflow-hidden relative"
            style={{ perspective: "1200px" }}
        >
            <GridBackground />
            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    scale: scrollScale,
                    opacity: scrollOpacity,
                    y: scrollYValue,
                    transformStyle: "preserve-3d",
                }}
                className="flex flex-col items-center relative z-10 max-w-7xl mx-auto px-6"
            >
                <motion.div
                    variants={fadeUp}
                    className="text-primary font-bold tracking-[0.4em] uppercase text-[10px] bg-primary/10 px-6 py-2 rounded-[4px] border border-primary/20"
                    style={{ translateZ: "50px" }}
                >
                    Digital Excellence Studio
                </motion.div>

                <motion.h1
                    variants={fadeUp}
                    className="text-[32px] sm:text-[48px] md:text-[64px] lg:text-[72px] font-bold uppercase tracking-tighter leading-[0.95] mt-8 max-w-4xl"
                    style={{ translateZ: "100px" }}
                >
                    EVERYTHING <span className="text-primary">DIGITAL</span>.<br />DONE RIGHT.
                </motion.h1>

                <motion.p
                    variants={fadeUp}
                    className="text-muted-foreground text-xs md:text-sm font-medium uppercase tracking-[0.2em] mt-10 max-w-xl leading-relaxed opacity-80"
                    style={{ translateZ: "40px" }}
                >
                    We craft compelling digital solutions—from high-performance websites to branding and AI-driven experiences.
                </motion.p>

                <motion.div
                    variants={fadeUp}
                    className="flex flex-col sm:flex-row justify-center gap-6 mt-14"
                    style={{ translateZ: "80px" }}
                >
                    {/* Rounded Slide Hover Button */}
                    <button
                        onClick={handleGetStarted}
                        className="group relative h-14 px-10 rounded-full overflow-hidden bg-primary text-white font-black uppercase tracking-[0.2em] text-[10px] transition-all duration-500 shadow-xl shadow-primary/30"
                    >
                        <div className="absolute inset-0 bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                        <span className="relative z-10 group-hover:text-primary transition-colors duration-500">EXPLORE SERVICES</span>
                    </button>

                    {/* Dot Expand Hover Button */}
                    <button
                        onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
                        className="group relative h-14 px-10 rounded-full overflow-hidden border border-border text-foreground font-black uppercase tracking-[0.2em] text-[10px] flex items-center gap-4 transition-all duration-300"
                    >
                        <div className="absolute w-2 h-2 bg-primary rounded-full left-6 group-hover:scale-[25] transition-transform duration-700 ease-in-out -z-0 opacity-0 group-hover:opacity-10" />
                        <span className="relative z-10 flex items-center gap-4 group-hover:translate-x-1 transition-transform">
                            VIEW PORTFOLIO <ArrowRight size={14} />
                        </span>
                    </button>
                </motion.div>
            </motion.div>
        </motion.section>
    );
}