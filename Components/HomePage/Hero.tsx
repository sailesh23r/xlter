"use client";

import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { fadeUp, stagger } from "@/lib/animations";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";
import Squares from "../Animations/Squares";
import Magnetic from "../Animations/Magnetic";
import { useLenis } from "../Animations/SmoothScroll";

const scrollText = [
    "STRATEGY", "DESIGN", "DEVELOPMENT", "BRANDING", "MARKETING", "AI SOLUTIONS", "EXPERIENCE", "INNOVATION"
];

interface HeroProps {
    data?: {
        heroLabel?: string;
        h1?: string;
        highlightedWord?: string;
        description?: string;
        primaryCTA?: {
            text: string;
            link: string;
        };
        secondaryCTA?: {
            text: string;
            link: string;
        };
    } | null;
}

export default function Hero({ data }: HeroProps) {
    const lenis = useLenis();
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
            if (lenis) {
                lenis.scrollTo(y);
            } else {
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        }
    };

    // Use dynamic data with fallbacks
    const heroLabel = data?.heroLabel || "Digital Excellence Studio";
    const h1 = data?.h1 || "EVERYTHING DIGITAL. DONE RIGHT.";
    const highlightedWord = data?.highlightedWord || "DONE RIGHT.";
    const description = data?.description || "We craft compelling digital solutions—from high-performance websites to branding and AI-driven experiences.";

    // Split H1 to style the highlighted word
    const renderH1 = () => {
        if (!h1 || !highlightedWord) return h1;
        
        // Case insensitive split
        const parts = h1.split(new RegExp(`(${highlightedWord})`, 'gi'));
        
        return parts.map((part, index) => {
            if (part.toLowerCase() === highlightedWord.toLowerCase()) {
                return (
                    <span key={index} className="text-primary">
                        {part}
                    </span>
                );
            }
            return <span key={index}>{part}</span>;
        });
    };

    return (
        <motion.section
            ref={sectionRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            variants={stagger}
            initial="hidden"
            animate="show"
            className="relative overflow-hidden min-h-[calc(100vh-90px)] lg:min-h-[calc(100vh-110px)] pt-20 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center text-center w-full bg-transparent will-change-transform"
            style={{ perspective: "1200px" }}
        >
            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    scale: scrollScale,
                    opacity: scrollOpacity,
                    y: scrollYValue,
                    transformStyle: "preserve-3d",
                }}
                className="relative z-10 max-w-5xl mx-auto flex flex-col items-center"
            >
                <Magnetic>
                    <motion.div
                        variants={fadeUp}
                        style={{ translateZ: "50px" }}
                    >
                        <div className="inline-flex items-center gap-3 px-5 h-10 rounded-full border border-primary/25 bg-primary/[0.06] backdrop-blur-xl shadow-[0_0_24px_hsl(var(--primary)/0.15)]">
                            <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary)/0.8)] animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-[0.24em] text-primary/90">
                                {heroLabel}
                            </span>
                        </div>
                    </motion.div>
                </Magnetic>

                <motion.h1
                    variants={fadeUp}
                    className="mt-6 sm:mt-8 max-w-4xl mx-auto text-[2.6rem] sm:text-5xl md:text-6xl lg:text-[72px] xl:text-[84px] font-black uppercase tracking-tight md:tracking-tighter leading-[0.9]"
                    style={{ translateZ: "100px" }}
                >
                    <span className="block">
                        {renderH1()}
                    </span>
                </motion.h1>

                <motion.p
                    variants={fadeUp}
                    className="text-muted-foreground text-sm sm:text-base md:text-lg font-medium uppercase tracking-[0.12em] mt-6 sm:mt-8 max-w-2xl leading-relaxed opacity-80"
                    style={{ translateZ: "40px" }}
                >
                    {description}
                </motion.p>

                <motion.div
                    variants={fadeUp}
                    className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-5 mt-8 sm:mt-10"
                    style={{ translateZ: "80px" }}
                >
                    {/* Primary CTA */}
                    <Magnetic>
                        <button
                            onClick={() => {
                                const link = data?.primaryCTA?.link;
                                if (!link || link === "/services" || link === "#services" || link === "/#services") {
                                    handleGetStarted();
                                } else if (link.startsWith('#casestudy')) {
                                    const el = document.getElementById(link.substring(1));
                                    if (el && lenis) {
                                        lenis.scrollTo(el);
                                    } else {
                                        el?.scrollIntoView({ behavior: 'smooth' });
                                    }
                                } else {
                                    window.location.href = link;
                                }
                            }}
                            className="group relative h-12 sm:h-14 px-6 sm:px-10 w-full sm:w-auto max-w-[280px] sm:max-w-none mx-auto rounded-full overflow-hidden bg-primary text-white font-black uppercase tracking-[0.2em] text-[10px] transition-all duration-500 shadow-xl shadow-primary/30"
                        >
                            <div className="absolute inset-0 bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                            <span className="relative z-10 group-hover:text-primary transition-colors duration-500">
                                {data?.primaryCTA?.text || "EXPLORE SERVICES"}
                            </span>
                        </button>
                    </Magnetic>

                    {/* Secondary CTA */}
                    <Magnetic>
                        <button
                            onClick={() => {
                                let link = data?.secondaryCTA?.link;
                                if (link === "/portfolio" || link === "/work") {
                                    link = "/casestudy";
                                }

                                if (link && link.startsWith('#')) {
                                    const el = document.getElementById(link.substring(1));
                                    if (el && lenis) {
                                        lenis.scrollTo(el);
                                    } else {
                                        el?.scrollIntoView({ behavior: 'smooth' });
                                    }
                                } else if (link) {
                                    window.location.href = link;
                                } else {
                                    const workEl = document.getElementById('work');
                                    if (workEl && lenis) {
                                        lenis.scrollTo(workEl);
                                    } else {
                                        workEl?.scrollIntoView({ behavior: 'smooth' });
                                    }
                                }
                            }}
                            className="group relative h-12 sm:h-14 px-6 sm:px-10 w-full sm:w-auto max-w-[280px] sm:max-w-none mx-auto rounded-full overflow-hidden border border-border text-foreground font-black uppercase tracking-[0.2em] text-[10px] flex items-center justify-center sm:justify-start gap-4 transition-all duration-300"
                        >
                            <div className="absolute w-2 h-2 bg-primary rounded-full left-6 group-hover:scale-[25] transition-transform duration-700 ease-in-out -z-0 opacity-0 group-hover:opacity-10" />
                            <span className="relative z-10 flex items-center gap-4 group-hover:translate-x-1 transition-transform">
                                {data?.secondaryCTA?.text || "VIEW PORTFOLIO"} <ArrowRight size={14} />
                            </span>
                        </button>
                    </Magnetic>
                </motion.div>
            </motion.div>
        </motion.section>
    );
}
