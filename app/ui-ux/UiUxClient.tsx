"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
    ArrowRight,
    ChevronRight,
    MousePointerClick,
    Users,
    Layout,
    Layers,
    Eye,
    Zap,
    Search,
    Edit3,
    Heart,
    Lightbulb,
    Clipboard,
    CheckCircle
} from "lucide-react";
import {
    SiFigma,
    SiFramer,
    SiSketch
} from "react-icons/si";
import Squares from "@/Components/Animations/Squares";
import { useTheme } from "next-themes";
import React, { useState, useEffect } from "react";
import GridBackground from "@/Components/Animations/GridBackground";
import TechScrollTicker from "@/Components/Animations/TechScrollTicker";

// --- Custom Brand SVG Icons for Tech ---
const XDIcon = ({ size = 32, style = {} }: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" style={style} width={size} height={size}>
        <rect x="0" y="0" width="24" height="24" rx="4" fill="currentColor" opacity="0.1" />
        <text x="12" y="15.5" fontSize="8" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle" fill="currentColor">Xd</text>
    </svg>
);

const CCIcon = ({ size = 32, style = {} }: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" style={style} width={size} height={size}>
        <rect x="0" y="0" width="24" height="24" rx="4" fill="currentColor" opacity="0.1" />
        <text x="12" y="15.5" fontSize="8" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle" fill="currentColor">Cc</text>
    </svg>
);

export default function UiUxClient() {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = resolvedTheme === "dark";

    const openContact = () => {
        if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent("openContactModal"));
        }
    };

    const words = "DESIGNED FOR HUMANS. BUILT FOR RESULTS.".split(" ");

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

    if (!mounted) return null;

    return (
        <div className="bg-background text-foreground min-h-screen pt-0 transition-colors duration-500">
            {/* Hero Section */}
            <section className="relative w-full h-auto py-16 sm:py-20 lg:py-28 bg-background border-b border-border/10">

                {/* Background animations removed for cleaner look */}

                <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 space-y-12 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center gap-4"
                    >
                        <div className="inline-flex items-center gap-3 px-5 h-10 rounded-full border border-primary/25 bg-primary/[0.06] backdrop-blur-xl shadow-[0_0_24px_hsl(var(--primary)/0.15)] w-fit mx-auto">
                            <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary)/0.8)] animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-[0.24em] text-primary/90">
                                UI/UX Design
                            </span>
                        </div>
                    </motion.div>

                    <motion.h1
                        initial="hidden"
                        animate="visible"
                        className="text-[32px] md:text-[42px] lg:text-[52px] font-bold leading-[1.1] uppercase tracking-tighter mb-6 mt-6 lg:whitespace-nowrap"
                    >
                        {words.map((word, i) => (
                            <motion.span
                                key={i}
                                custom={i}
                                variants={textVariants}
                                className="inline-block mr-[0.2em]"
                            >
                                {word === "HUMANS." || word === "RESULTS." ? <span className="text-primary">{word}</span> : word}
                            </motion.span>
                        ))}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-muted-foreground text-base md:text-lg font-medium leading-relaxed max-w-2xl mb-10 mx-auto"
                    >
                        We create intuitive, modern interfaces and seamless user experiences that increase engagement, usability, and customer satisfaction.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-wrap justify-center items-center gap-4"
                    >
                        <button
                            onClick={openContact}
                            className="bg-primary text-primary-foreground px-6 sm:px-8 py-4 sm:py-5 rounded-full font-black uppercase tracking-widest text-[10px] md:text-xs shadow-2xl shadow-primary/40 hover:scale-105 transition-all active:scale-95 flex items-center gap-3 group"
                        >
                            Start Project <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                        </button>

                        <Link href="#services">
                            <button className="bg-transparent border border-border text-foreground px-6 sm:px-10 py-4 sm:py-5 rounded-full font-black uppercase tracking-widest text-[10px] md:text-xs hover:bg-accent transition-all active:scale-95 flex items-center gap-3">
                                Explore Services <ChevronRight size={18} />
                            </button>
                        </Link>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
                >
                    <div className="w-[1px] h-20 bg-gradient-to-b from-primary to-transparent" />
                </motion.div>
            </section>

            {/* Expertise Section */}
            <section id="services" className="py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-transparent transition-colors duration-500 border-t border-border/10 relative overflow-hidden">
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="flex flex-col items-center mb-12 sm:mb-16 lg:mb-24 gap-6 text-center">
                        <div className="max-w-3xl">
                            <h2 className="text-[50px] font-bold uppercase tracking-tighter leading-tight text-foreground">
                                Comprehensive Visual & <span className="text-primary">Engineering</span>
                            </h2>
                        </div>
                        <div className="max-w-2xl">
                            <p className="text-muted-foreground text-sm md:text-base font-medium leading-relaxed opacity-70 mx-auto">
                                Meticulously designed touchpoints that communicate authority and luxury at every scale.
                            </p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "User Research",
                                icon: Users,
                                desc: "Understanding the audience at a psychological level to create interfaces that fulfill their deepest needs.",
                                span: "md:col-span-2"
                            },
                            {
                                title: "UI Design",
                                icon: Layout,
                                desc: "High-fidelity, architectural visual design that balances aesthetic beauty with functional clarity."
                            },
                            {
                                title: "Wireframing",
                                icon: Layers,
                                desc: "Structural blueprints that define the hierarchy and flow of information across every digital screen."
                            },
                            {
                                title: "Usability Testing",
                                icon: Eye,
                                desc: "Iterative cycles of feedback and refinement to ensure a frictionless user journey.",
                                span: "md:col-span-2"
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className={`group relative overflow-hidden rounded-[24px] bg-card/40 backdrop-blur-md border border-border/50 hover:border-primary/50 hover:bg-card/80 transition-all duration-500 shadow-lg hover:shadow-xl ${item.span || ""}`}
                            >
                                <div className="p-6 sm:p-8 lg:p-10 relative z-10 flex flex-col h-full min-h-[250px]">
                                    <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 group-hover:rotate-[360deg] group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]">
                                        <item.icon size={24} />
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight mb-4 group-hover:text-primary transition-colors">{item.title}</h3>
                                    <p className="text-muted-foreground text-sm font-medium leading-relaxed max-w-md">{item.desc}</p>

                                    <div className="absolute inset-0 z-[-1] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2" />
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
                        Structure is the soul of design. Our process ensures every pixel serves a purpose.
                    </p>

                    <div className="flex flex-col gap-12 max-w-4xl mx-auto text-left">
                        {[
                            {
                                name: "Discovery",
                                step: "01",
                                desc: "Uncovering user needs, business goals, and technological constraints through deep stakeholder interviews.",
                                icon: Search
                            },
                            {
                                name: "Empathize",
                                step: "02",
                                desc: "Developing a profound understanding of the users' challenges and aspirations through qualitative research.",
                                icon: Heart
                            },
                            {
                                name: "Define",
                                step: "03",
                                desc: "Synthesizing research findings into clear, actionable problem statements and design requirements.",
                                icon: Clipboard
                            },
                            {
                                name: "Ideate",
                                step: "04",
                                desc: "Exploring creative solutions and architectural layouts that address the defined user challenges.",
                                icon: Lightbulb
                            },
                            {
                                name: "Prototype",
                                step: "05",
                                desc: "Building interactive models to validate design assumptions and test user interactions early.",
                                icon: Edit3
                            },
                            {
                                name: "Verify",
                                step: "06",
                                desc: "Final quality assurance and usability testing to ensure the product meets our elite standards.",
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
                                <div className="text-6xl font-black text-primary/10 group-hover:text-primary transition-colors duration-500">
                                    {step.step}
                                </div>
                                <div className="w-12 h-12 rounded-full bg-background border border-border flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shrink-0">
                                    <step.icon size={20} />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-lg md:text-xl font-black uppercase tracking-tight mb-4">{step.name}</h4>
                                    <p className="text-muted-foreground text-sm font-medium leading-relaxed max-w-2xl">{step.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>


            {/* Tech Stack Section */}
            <section className="py-16 md:py-24 lg:py-32 bg-background relative overflow-hidden">
                <GridBackground />
                <div className="max-w-7xl mx-auto text-center relative z-10 px-6 md:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="mb-16"
                    >
                        <h2 className="text-[42px] font-bold uppercase tracking-tighter leading-tight mb-6">
                            Powered by <span className="text-primary">Modern Tech</span>
                        </h2>
                        <p className="text-muted-foreground text-sm md:text-base font-medium leading-relaxed max-w-xl mx-auto">
                            We use industry-standard tools to craft interfaces that are both visually stunning and technically precise.
                        </p>
                    </motion.div>
                </div>
                <TechScrollTicker
                    items={[
                        { icon: <SiFigma size={32} style={{ color: "#F24E1E" }} />, name: "Figma" },
                        { icon: <SiFramer size={32} style={{ color: "#0055FF" }} />, name: "Framer" },
                        { icon: <SiSketch size={32} style={{ color: "#F7B500" }} />, name: "Sketch" },
                        { icon: <XDIcon size={32} style={{ color: "#FF61F6" }} />, name: "Adobe XD" },
                        { icon: <CCIcon size={32} style={{ color: "#DA1F26" }} />, name: "Creative Cloud" },
                    ]}
                />
            </section>

        </div>
    );
}
