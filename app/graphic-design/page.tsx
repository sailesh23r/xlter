"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
    Search,
    Layout,
    Zap,
    ArrowRight,
    ChevronRight,
    PenTool,
    BookOpen,
    CreditCard,
    Share2,
    Megaphone,
    Edit3,
    Layers,
    CheckCircle
} from "lucide-react";
import Squares from "@/Components/Animations/Squares";
import { useTheme } from "next-themes";
import React, { useState, useEffect } from "react";
import GridBackground from "@/Components/Animations/GridBackground";

// --- Custom Brand SVG Icons for Tech ---
const PSIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-[#31A8FF]">
        <rect x="0" y="0" width="24" height="24" rx="4" fill="currentColor" opacity="0.1" />
        <path d="M7 16V8h3.5c1.5 0 2.5.8 2.5 2 0 1.2-1 2-2.5 2H8.5v4H7zm1.5-5.5h1.5c.8 0 1.2-.4 1.2-1s-.4-1-1.2-1H8.5v2zM15 16c-.2-1.2-1-2-2.2-2.2v-1.5c2 0 3.2 1.5 3.5 3.7H15z" />
        <text x="12" y="15.5" fontSize="8" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle" fill="currentColor">Ps</text>
    </svg>
);

const AIIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-[#FF9A00]">
        <rect x="0" y="0" width="24" height="24" rx="4" fill="currentColor" opacity="0.1" />
        <text x="12" y="15.5" fontSize="8" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle" fill="currentColor">Ai</text>
    </svg>
);

const IDIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-[#FF3366]">
        <rect x="0" y="0" width="24" height="24" rx="4" fill="currentColor" opacity="0.1" />
        <text x="12" y="15.5" fontSize="8" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle" fill="currentColor">Id</text>
    </svg>
);

const AEIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-[#D291FF]">
        <rect x="0" y="0" width="24" height="24" rx="4" fill="currentColor" opacity="0.1" />
        <text x="12" y="15.5" fontSize="8" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle" fill="currentColor">Ae</text>
    </svg>
);

export default function GraphicDesignPage() {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = resolvedTheme === "dark";

    const openContact = () => {
        window.dispatchEvent(new CustomEvent("openContactModal"));
    };

    const textVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.05,
            },
        }),
    };

    const words = "Creative Graphic Design That Captures".split(" ");

    return (
        <div className="bg-background text-foreground min-h-screen pt-0 transition-colors duration-500">

            {/* Hero Section */}
            <section className="relative w-full h-auto py-16 md:py-20 bg-background border-b border-border/10">

                {/* Background animations removed for cleaner look */}

                <div className="px-6 md:px-12 max-w-7xl mx-auto relative z-10 space-y-12 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center gap-4"
                    >
                        <p className="text-primary font-bold tracking-[0.4em] uppercase text-[10px] bg-primary/10 px-6 py-2 rounded-[4px] border border-primary/20 w-fit mx-auto">
                            PREMIUM DESIGN STUDIO
                        </p>
                    </motion.div>

                    <motion.h1
                        initial="hidden"
                        animate="visible"
                        className="text-4xl md:text-[64px] font-bold leading-[1.1] uppercase tracking-tighter mb-6"
                    >
                        {words.map((word, i) => (
                            <motion.span
                                key={i}
                                custom={i}
                                variants={textVariants}
                                className="inline-block mr-[0.2em]"
                            >
                                {word === "Captures" ? <span className="text-primary">{word}</span> : word}
                            </motion.span>
                        ))}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-muted-foreground text-base md:text-lg font-medium leading-relaxed max-w-2xl mb-10 mx-auto"
                    >
                        We create visual languages that speak louder than words. From high-impact marketing collateral to intricate digital assets, our designs are engineered to engage and inspire.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-wrap justify-center gap-4"
                    >
                        <button 
                            onClick={openContact}
                            className="bg-primary text-primary-foreground px-12 py-6 rounded-[6px] font-black uppercase tracking-widest text-[10px] md:text-xs shadow-2xl shadow-primary/40 hover:scale-105 transition-all active:scale-95 flex items-center gap-3 group"
                        >
                            Start Your Project <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                        </button>
                        <Link href="/casestudy">
                            <button 
                                className="bg-transparent border border-border text-foreground px-12 py-6 rounded-[6px] font-black uppercase tracking-widest text-[10px] md:text-xs hover:bg-accent transition-all active:scale-95 flex items-center gap-3"
                            >
                                View Portfolio <ChevronRight size={18} />
                            </button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Expertise Section */}
            <section className="py-16 md:py-24 lg:py-32 px-6 md:px-12 bg-accent/30 transition-colors duration-500 border-t border-border/10 relative overflow-hidden">
                <GridBackground />
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-24 gap-12 text-center md:text-left">
                        <div className="max-w-2xl">
                            <motion.p className="text-primary font-bold tracking-[0.4em] uppercase text-[10px] mb-6">OUR EXPERTISE</motion.p>
                            <h2 className="text-[42px] font-bold uppercase tracking-tighter leading-tight text-primary">
                                Architecting <br /> Visual Impact
                            </h2>
                        </div>
                        <div className="flex flex-col items-center md:items-end">
                            <p className="text-muted-foreground text-sm md:text-base font-medium leading-relaxed max-w-sm md:text-right opacity-70">
                                A specialized suite of services designed for brands that value aesthetic restraint and functional clarity.
                            </p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Brochure Design",
                                icon: BookOpen,
                                desc: "Tangible storytelling for high-end developments and corporate reports. Precision in every fold.",
                                span: "md:col-span-2"
                            },
                            {
                                title: "Business Cards",
                                icon: CreditCard,
                                desc: "The first impression, refined to its purest form."
                            },
                            {
                                title: "Social Media Post Design",
                                icon: Share2,
                                desc: "Stopping the scroll with monochromatic depth and editorial layouts for Instagram and LinkedIn."
                            },
                            {
                                title: "Ad Creatives",
                                icon: Megaphone,
                                desc: "High-conversion advertisement visuals that maintain brand luxury while driving engagement.",
                                span: "md:col-span-2"
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className={`group relative overflow-hidden rounded-[8px] bg-card border border-border hover:border-primary/50 transition-all duration-500 ${item.span || ""}`}
                            >
                                <div className="p-10 relative z-10 flex flex-col h-full min-h-[300px]">
                                    <div className="w-12 h-12 rounded-2xl bg-accent text-primary flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-500 group-hover:rotate-[360deg]">
                                        <item.icon size={24} />
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight mb-4">{item.title}</h3>
                                    <p className="text-muted-foreground text-sm font-medium leading-relaxed max-w-xs">{item.desc}</p>
                                    
                                    {/* Modern Background Animation instead of image */}
                                    <div className="absolute inset-0 z-[-1] opacity-0 group-hover:opacity-10 transition-opacity duration-700">
                                        <div className="absolute inset-0 bg-gradient-to-br from-primary via-transparent to-primary blur-3xl animate-pulse" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Methodology Section */}
            <section className="py-16 md:py-24 lg:py-32 px-6 md:px-12 bg-background relative border-y border-border/10 overflow-hidden">
                <GridBackground />
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-[42px] font-bold uppercase tracking-tighter leading-tight mb-16"
                    >
                        A Methodical <span className="text-primary">Approach</span>
                    </motion.h2>
                    <p className="text-muted-foreground text-sm md:text-lg font-medium leading-relaxed max-w-xl mx-auto mb-24">
                        Precision-driven creativity. Every project follows a structured path to ensure maximum visual impact.
                    </p>

                    <div className="flex flex-col gap-12 max-w-4xl mx-auto text-left">
                        {[
                            { 
                                name: "Research & Brief", 
                                step: "01",
                                desc: "We begin by understanding your brand, target audience, competitors, and the story you need your visuals to tell.",
                                icon: Search
                            },
                            { 
                                name: "Concept & Sketching", 
                                step: "02",
                                desc: "Translating the brief into multiple creative directions, exploring layouts, typography, and visual language.",
                                icon: PenTool
                            },
                            { 
                                name: "Design & Refinement", 
                                step: "03",
                                desc: "Developing the chosen concept into high-fidelity artwork with meticulous attention to detail and craft.",
                                icon: Edit3
                            },
                            { 
                                name: "Feedback & Revision", 
                                step: "04",
                                desc: "Collaborative review rounds to ensure the final design exceeds expectations and aligns with your vision.",
                                icon: Layers
                            },
                            { 
                                name: "Final Delivery", 
                                step: "05",
                                desc: "Exporting production-ready assets in all required formats with a comprehensive usage guide.",
                                icon: CheckCircle
                            }
                        ].map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] as any }}
                                className="group flex flex-col md:flex-row gap-8 items-start md:items-center p-12 rounded-[8px] bg-accent/10 border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-500"
                            >
                                <div className="text-6xl font-bold text-primary/10 group-hover:text-primary transition-colors duration-500">
                                    {step.step}
                                </div>
                                <div className="w-12 h-12 rounded-full bg-background border border-border flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shrink-0">
                                    <step.icon size={20} />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-lg md:text-xl font-bold uppercase tracking-tight mb-4">{step.name}</h4>
                                    <p className="text-muted-foreground text-sm font-medium leading-relaxed max-w-2xl">{step.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tech Stack - Redesigned Centered */}
            <section className="py-16 md:py-24 lg:py-32 px-6 md:px-12 bg-background relative overflow-hidden">
                <GridBackground />
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="mb-24"
                    >
                        <h2 className="text-[42px] font-bold uppercase tracking-tighter leading-tight mb-6">
                            Powered by <span className="text-primary">Modern Tech</span>
                        </h2>
                        <p className="text-muted-foreground text-sm md:text-base font-medium leading-relaxed max-w-xl mx-auto">
                            We leverage the industry's most advanced design tools to ensure every project is crafted with absolute precision.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 max-w-5xl mx-auto">
                        {[
                            { icon: PSIcon, name: "Photoshop" },
                            { icon: AIIcon, name: "Illustrator" },
                            { icon: IDIcon, name: "InDesign" },
                            { icon: AEIcon, name: "After Effects" }
                        ].map((tech, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className="group flex flex-col items-center gap-6"
                            >
                                <motion.div 
                                    whileHover={{ scale: 1.2, rotate: 5 }}
                                    className="w-24 h-24 rounded-3xl bg-accent/50 flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:bg-primary/5 transition-all duration-500 shadow-xl"
                                >
                                    <tech.icon />
                                </motion.div>
                                <h5 className="font-black uppercase tracking-widest text-[10px] opacity-50 group-hover:opacity-100 transition-opacity">
                                    {tech.name}
                                </h5>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
}
