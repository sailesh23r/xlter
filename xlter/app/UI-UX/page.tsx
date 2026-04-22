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

export default function UIUXPage() {
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

    const words = "Intuitive Interfaces, Human-Centric Experiences".split(" ");

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
        <main className="bg-background text-foreground min-h-screen pt-32 transition-colors duration-500">
            {/* Hero Section */}
            <section className="relative w-full flex flex-col items-center text-center overflow-hidden min-h-screen justify-center bg-background border-b border-border/10">

                {/* Background animations removed for cleaner look */}
                
                <div className="px-6 md:px-12 max-w-7xl mx-auto relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center gap-4"
                    >
                        <p className="text-primary font-bold tracking-[0.4em] uppercase text-[10px] bg-primary/10 px-6 py-2 rounded-full backdrop-blur-md border border-primary/20">
                            Digital Experience Strategy
                        </p>
                    </motion.div>

                    <motion.h1
                        initial="hidden"
                        animate="visible"
                        className="text-[42px] font-bold leading-[1.1] uppercase tracking-tighter mt-12 mb-12"
                    >
                        {words.map((word, i) => (
                            <motion.span
                                key={i}
                                custom={i}
                                variants={textVariants}
                                className="inline-block mr-4 last:mr-0"
                            >
                                {word === "Interfaces," || word === "Human-Centric" ? <span className="text-primary">{word}</span> : word}
                            </motion.span>
                        ))}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-muted-foreground text-sm md:text-xl font-medium uppercase tracking-[0.2em] max-w-2xl mx-auto mb-16 leading-relaxed"
                    >
                        Architecting high-conversion digital ecosystems where aesthetic beauty meets mathematical precision.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.7 }}
                        className="flex flex-col md:flex-row items-center justify-center gap-8"
                    >
                        <button 
                            onClick={openContact}
                            className="group relative px-10 py-5 bg-primary text-white rounded-[6px] overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95 shadow-2xl shadow-primary/20"
                        >
                            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                            <span className="relative z-10 font-black uppercase tracking-[0.3em] text-[10px]">Start Project</span>
                        </button>
                        
                        <Link href="#services" className="group flex items-center gap-4 text-muted-foreground hover:text-primary transition-all duration-300">
                            <span className="font-black uppercase tracking-[0.3em] text-[10px]">Explore Services</span>
                            <div className="w-10 h-[1px] bg-muted-foreground group-hover:w-16 group-hover:bg-primary transition-all duration-500" />
                            <ArrowRight className="group-hover:translate-x-2 transition-transform duration-500" size={16} />
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
            <section id="services" className="py-24 md:py-32 lg:py-40 px-6 md:px-12 bg-accent/30 transition-colors duration-500 border-t border-border/10 relative overflow-hidden">
                <GridBackground />
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="flex flex-col md:flex-row items-end justify-between gap-12 mb-32">
                        <div className="max-w-2xl">
                            <motion.p className="text-primary font-bold tracking-[0.4em] uppercase text-[10px] mb-6">EXPERTISE</motion.p>
                            <h2 className="text-[42px] font-bold uppercase tracking-tighter leading-tight text-primary">
                                Comprehensive Visual <br /> Engineering
                            </h2>
                        </div>
                        <div className="max-w-sm">
                            <p className="text-muted-foreground text-sm md:text-base font-medium leading-relaxed opacity-70">
                                Meticulously designed touchpoints that communicate authority and luxury at every scale.
                            </p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "User Research",
                                icon: Users,
                                desc: "Understanding the audience at a psychological level to create interfaces that fulfill their deepest needs."
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
                                desc: "Iterative cycles of feedback and refinement to ensure a frictionless user journey."
                            },
                            {
                                title: "Interaction Design",
                                icon: MousePointerClick,
                                desc: "Subtle micro-animations and motion design that make digital interfaces feel alive and responsive."
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group relative overflow-hidden rounded-[8px] bg-card border border-border hover:border-primary/50 transition-all duration-500"
                            >
                                <div className="p-10 relative z-10 flex flex-col h-full min-h-[300px]">
                                    <div className="w-12 h-12 rounded-2xl bg-accent text-primary flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-500 group-hover:rotate-[360deg]">
                                        <item.icon size={24} />
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight mb-4">{item.title}</h3>
                                    <p className="text-muted-foreground text-sm font-medium leading-relaxed max-w-xs">{item.desc}</p>
                                    
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
            <section className="py-24 md:py-32 lg:py-40 px-6 md:px-12 bg-background relative border-y border-border/10 overflow-hidden">
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
            <section className="py-24 md:py-32 lg:py-40 px-6 md:px-12 bg-background relative overflow-hidden">
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
                            We use industry-standard tools to craft interfaces that are both visually stunning and technically precise.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
                        {[
                            { icon: SiFigma, name: "Figma", color: "#F24E1E" },
                            { icon: SiFramer, name: "Framer", color: "#0055FF" },
                            { icon: SiSketch, name: "Sketch", color: "#F7B500" },
                            { icon: XDIcon, name: "Adobe XD", color: "#FF61F6" },
                            { icon: CCIcon, name: "Creative Cloud", color: "#DA1F26" }
                        ].map((tech, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.05 }}
                                className="group flex flex-col items-center gap-6"
                            >
                                <motion.div
                                    whileHover={{ scale: 1.2, rotate: 5 }}
                                    className="w-20 h-20 rounded-3xl bg-accent/50 flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:bg-primary/5 transition-all duration-500 shadow-xl"
                                >
                                    <tech.icon size={32} style={{ color: i === 5 && !isDark ? "#000" : tech.color }} />
                                </motion.div>
                                <h5 className="font-black uppercase tracking-widest text-[10px] opacity-50 group-hover:opacity-100 transition-opacity">
                                    {tech.name}
                                </h5>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

        </main>
    );
}
