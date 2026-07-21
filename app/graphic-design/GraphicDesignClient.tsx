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
import TechScrollTicker from "@/Components/Animations/TechScrollTicker";
import { SectionWrapper } from "@/Components/Common/SectionWrapper";
import { SectionHeading } from "@/Components/Common/SectionHeading";
import { PremiumCard } from "@/Components/Common/PremiumCard";

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

export default function GraphicDesignClient() {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = resolvedTheme === "dark";
    if (!mounted) return null;

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

    const words = "VISUALS THAT CAPTURE ATTENTION".split(" ");

    return (
        <div className="bg-background text-foreground transition-colors duration-500">

            {/* Hero Section */}
            <SectionWrapper className="border-b border-border/10">
                <div className="relative z-10 space-y-12 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center gap-4"
                    >
                        <div className="inline-flex items-center gap-3 px-5 h-10 rounded-full border border-primary/25 bg-primary/[0.06] backdrop-blur-xl shadow-[0_0_24px_hsl(var(--primary)/0.15)] w-fit mx-auto">
                            <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary)/0.8)] animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-[0.24em] text-primary/90">
                                Graphic Design
                            </span>
                        </div>
                    </motion.div>

                    <motion.h1
                        initial="hidden"
                        animate="visible"
                        className="text-[clamp(1.8rem,4.5vw,3.25rem)] font-bold leading-[1.1] uppercase tracking-tighter mb-6 break-words"
                    >

                        {words.map((word, i) => (
                            <motion.span
                                key={i}
                                custom={i}
                                variants={textVariants}
                                className="inline-block mr-[0.2em]"
                            >
                                {word === "VISUALS" || word === "CAPTURE" || word === "ATTENTION" ? <span className="text-primary">{word}</span> : word}
                            </motion.span>
                        ))}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-body text-muted-foreground font-medium max-w-2xl mx-auto"
                    >
                        From social creatives to premium marketing assets, we design compelling visuals that communicate clearly and elevate your brand presence.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-wrap justify-center gap-4"
                    >
                        <button
                            onClick={openContact}
                            className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold text-sm shadow-xl shadow-primary/20 hover:-translate-y-1 transition-all active:scale-95 flex items-center gap-3 group"
                        >
                            Start Your Project <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                        <Link href="/casestudy">
                            <button
                                className="bg-transparent border border-border text-foreground px-8 py-4 rounded-full font-bold text-sm hover:bg-accent transition-all active:scale-95 flex items-center gap-3"
                            >
                                View Portfolio <ChevronRight size={18} />
                            </button>
                        </Link>
                    </motion.div>
                </div>
            </SectionWrapper>

            {/* Expertise Section */}
            <SectionWrapper className="bg-transparent transition-colors duration-500 relative overflow-hidden">
                <SectionHeading
                    title={<>Architecting <span className="text-primary">Visual Impact</span></>}
                    subtitle="A specialized suite of services designed for brands that value aesthetic restraint and functional clarity."
                    centered={true}
                />

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 relative z-10">
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
                        <PremiumCard key={i} delay={i * 0.1} className={item.span || ""}>
                            <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 group-hover:scale-110">
                                <item.icon size={22} />
                            </div>
                            <h3 className="text-card font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">{item.title}</h3>
                            <p className="text-body text-muted-foreground opacity-80 font-normal">{item.desc}</p>
                        </PremiumCard>
                    ))}
                </div>
            </SectionWrapper>

            {/* Methodology Section */}
            <SectionWrapper className="bg-background relative border-y border-border/10 overflow-hidden">
                <GridBackground />
                <div className="relative z-10 flex flex-col items-center">
                    <SectionHeading
                        title={<>A Methodical <span className="text-primary">Approach</span></>}
                        subtitle="Precision-driven creativity. Every project follows a structured path to ensure maximum visual impact."
                        centered={true}
                    />

                    <div className="flex flex-col gap-6 md:gap-8 max-w-4xl mx-auto text-left w-full">
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
                            <PremiumCard key={i} delay={i * 0.1} hoverLift={false} className="!p-6 md:!p-8 !rounded-[20px] flex-col sm:flex-row items-start sm:items-center gap-6">
                                <div className="text-5xl font-black text-primary/10 group-hover:text-primary transition-colors duration-500 shrink-0">
                                    {step.step}
                                </div>
                                <div className="w-12 h-12 rounded-full bg-background/50 border border-border/50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shrink-0">
                                    <step.icon size={20} />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-xl font-semibold tracking-tight text-foreground mb-2 group-hover:text-primary transition-colors">{step.name}</h4>
                                    <p className="text-body text-muted-foreground opacity-80 font-normal">{step.desc}</p>
                                </div>
                            </PremiumCard>
                        ))}
                    </div>
                </div>
            </SectionWrapper>

            {/* Tech Stack - Redesigned Centered */}
            <SectionWrapper className="bg-background relative overflow-hidden border-t border-border/10">
                <GridBackground />
                <div className="relative z-10">
                    <SectionHeading
                        title={<>Powered by <span className="text-primary">Modern Tech</span></>}
                        subtitle="We leverage the industry's most advanced design tools to ensure every project is crafted with absolute precision."
                        centered={true}
                    />
                </div>
                <TechScrollTicker
                    items={[
                        { icon: <AIIcon />, name: "Adobe Illustrator", category: "Vector Engine", size: "large", desc: "Our primary tool for infinitely scalable brand assets, vector graphics, and precision iconography." },
                        { icon: <PSIcon />, name: "Adobe Photoshop", category: "Raster Editing", size: "medium" },
                        { icon: <IDIcon />, name: "InDesign", category: "Layout & Print", size: "small" },
                        { icon: <AEIcon />, name: "After Effects", category: "Motion", size: "small" },
                    ]}
                />
            </SectionWrapper>

        </div>
    );
}
