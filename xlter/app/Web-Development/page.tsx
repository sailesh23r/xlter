"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
    ArrowRight,
    ChevronRight,
    Terminal,
    Globe,
    Zap,
    RefreshCw,
    Shield,
    Database,
    Code,
    Layout,
    Search
} from "lucide-react";
import {
    SiNextdotjs,
    SiReact,
    SiTailwindcss,
    SiTypescript,
    SiNodedotjs,
    SiMongodb,
    SiWordpress,
    SiFirebase,
    SiPostgresql,
    SiMysql,
} from "react-icons/si";
import { FaGithub } from "react-icons/fa";
import Squares from "@/Components/Animations/Squares";
import { useTheme } from "next-themes";
import React, { useState, useEffect } from "react";
import GridBackground from "@/Components/Animations/GridBackground";

export default function WebDevelopmentPage() {
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

    const words = "Fast, Scalable Websites That Drive Results".split(" ");

    return (
        <main className="bg-background text-foreground min-h-screen pt-32 transition-colors duration-500">

            {/* Hero Section */}
            <section className="relative w-full flex flex-col items-center text-center overflow-hidden min-h-screen justify-center bg-background border-b border-border/10">

                {/* Background animations removed for cleaner look */}

                <div className="px-6 md:px-12 max-w-7xl mx-auto relative z-10 space-y-12">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center gap-4"
                    >
                        <p className="text-primary font-bold tracking-[0.4em] uppercase text-[10px] bg-primary/10 px-6 py-2 rounded-full backdrop-blur-md border border-primary/20">
                            PREMIUM WEB ENGINEERING
                        </p>
                    </motion.div>

                    <motion.h1
                        initial="hidden"
                        animate="visible"
                        className="text-[42px] font-bold leading-[1.1] uppercase tracking-tighter"
                    >
                        {words.map((word, i) => (
                            <motion.span
                                key={i}
                                custom={i}
                                variants={textVariants}
                                className="inline-block mr-[0.2em]"
                            >
                                {word === "Results" ? <span className="text-primary">{word}</span> : word}
                            </motion.span>
                        ))}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="text-muted-foreground text-sm md:text-xl font-medium uppercase tracking-[0.2em] max-w-2xl mx-auto leading-relaxed"
                    >
                        Building high-performance, centric, and user-friendly web solutions, with clean code and for growth.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 }}
                        className="flex flex-wrap justify-center gap-6 pt-8"
                    >
                        <button 
                            onClick={openContact}
                            className="bg-primary text-primary-foreground px-12 py-6 rounded-[6px] font-black uppercase tracking-widest text-[10px] md:text-xs shadow-2xl shadow-primary/40 hover:scale-105 transition-all active:scale-95 flex items-center gap-3 group"
                        >
                            Start Your Project <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                        </button>
                        <Link href="/Casestudy">
                            <button 
                                className="bg-transparent border border-border text-foreground px-12 py-6 rounded-[6px] font-black uppercase tracking-widest text-[10px] md:text-xs hover:bg-accent transition-all active:scale-95 flex items-center gap-3"
                            >
                                View Portfolio <ChevronRight size={18} />
                            </button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Digital Architecture Section */}
            <section className="py-24 md:py-32 lg:py-40 px-6 md:px-12 bg-accent/30 transition-colors duration-500 border-t border-border/10 relative overflow-hidden">
                <GridBackground />
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-24 gap-12 text-center md:text-left">
                        <div className="max-w-2xl">
                            <motion.p className="text-primary font-bold tracking-[0.4em] uppercase text-[10px] mb-6">CORE SERVICES</motion.p>
                            <h2 className="text-[42px] font-bold uppercase tracking-tighter leading-tight text-primary">
                                Digital <br /> Architecture
                            </h2>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {[
                            {
                                title: "Static Website Development",
                                icon: Zap,
                                desc: "Ultra-fast, secure, and modern websites built with Next.js & Tailwind CSS for maximum performance and SEO."
                            },
                            {
                                title: "Custom WordPress",
                                icon: Globe,
                                desc: "Flexible, user-friendly CMS solutions designed for easy content management and scalability."
                            },
                            {
                                title: "Landing Pages",
                                icon: Layout,
                                desc: "High-converting landing pages designed to drive leads and maximize your marketing ROI."
                            },
                            {
                                title: "Website Redesign",
                                icon: RefreshCw,
                                desc: "Modernizing your existing web presence with clean design and performance-focused code."
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
                                <div className="p-10 relative z-10 flex flex-col h-full min-h-[250px]">
                                    <div className="w-12 h-12 rounded-2xl bg-accent text-primary flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-500 group-hover:rotate-[360deg]">
                                        <item.icon size={24} />
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight mb-4">{item.title}</h3>
                                    <p className="text-muted-foreground text-sm font-medium leading-relaxed max-w-md">{item.desc}</p>
                                    
                                    <div className="absolute inset-0 z-[-1] opacity-0 group-hover:opacity-10 transition-opacity duration-700">
                                        <div className="absolute inset-0 bg-gradient-to-br from-primary via-transparent to-primary blur-3xl animate-pulse" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Choosing the Right Path Section */}
            <section className="py-24 md:py-32 lg:py-40 px-6 md:px-12 bg-background relative border-y border-border/10 overflow-hidden">
                <GridBackground />
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-[42px] font-bold uppercase tracking-tighter leading-tight mb-24"
                    >
                        Choosing the <span className="text-primary">Right Path</span>
                    </motion.h2>

                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Static Path */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="bg-accent/20 p-12 rounded-[8px] border border-border text-left"
                        >
                            <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight mb-8">The Static Way</h3>
                            <ul className="space-y-6">
                                {[
                                    { icon: Zap, text: "Lightning performance" },
                                    { icon: Shield, text: "Maximum Security" },
                                    { icon: RefreshCw, text: "Zero Maintenance" }
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-4 text-muted-foreground font-bold uppercase tracking-widest text-xs">
                                        <item.icon size={18} className="text-primary" />
                                        {item.text}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* WordPress Path */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="bg-accent/20 p-12 rounded-[8px] border border-border text-left"
                        >
                            <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight mb-8">The WordPress Way</h3>
                            <ul className="space-y-6">
                                {[
                                    { icon: Code, text: "Easy Content Control" },
                                    { icon: Database, text: "Unlimited Features" },
                                    { icon: Globe, text: "Fast Market Entry" }
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-4 text-muted-foreground font-bold uppercase tracking-widest text-xs">
                                        <item.icon size={18} className="text-primary" />
                                        {item.text}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
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
                        From discovery to deployment — a structured process that delivers reliable, high-performance results.
                    </p>

                    <div className="flex flex-col gap-12 max-w-4xl mx-auto text-left">
                        {[
                            { 
                                name: "Discovery & Planning", 
                                step: "01",
                                desc: "Defining project scope, technology stack, architecture decisions, and timelines based on your business objectives.",
                                icon: Search
                            },
                            { 
                                name: "Architecture Design", 
                                step: "02",
                                desc: "Blueprinting the system — database schema, API structure, component hierarchy, and deployment strategy.",
                                icon: Layout
                            },
                            { 
                                name: "Development", 
                                step: "03",
                                desc: "Writing clean, scalable code with performance and SEO at the core. Full-stack development with modern frameworks.",
                                icon: Code
                            },
                            { 
                                name: "Testing & QA", 
                                step: "04",
                                desc: "Rigorous cross-browser, cross-device testing and performance audits to ensure a flawless user experience.",
                                icon: Shield
                            },
                            { 
                                name: "Launch & Support", 
                                step: "05",
                                desc: "Smooth deployment to production with ongoing monitoring, updates, and support post-launch.",
                                icon: Zap
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
                            We leverage the industry's most advanced web technologies to build high-performance digital ecosystems.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 max-w-6xl mx-auto">
                        {[
                            { icon: SiNextdotjs, name: "Next.js", color: "#000000" },
                            { icon: SiReact, name: "React.js", color: "#61DAFB" },
                            { icon: SiTailwindcss, name: "Tailwind", color: "#06B6D4" },
                            { icon: SiTypescript, name: "TypeScript", color: "#3178C6" },
                            { icon: SiNodedotjs, name: "Node.js", color: "#339933" },
                            { icon: SiMongodb, name: "MongoDB", color: "#47A248" },
                            { icon: SiWordpress, name: "WordPress", color: "#21759B" },
                            { icon: FaGithub, name: "GitHub", color: "#181717" },
                            { icon: SiFirebase, name: "Firebase", color: "#FFCA28" },
                            { icon: SiPostgresql, name: "PostgreSQL", color: "#4169E1" },
                            { icon: SiMysql, name: "MySQL", color: "#4479A1" }
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
                                    <tech.icon size={32} style={{ color: i === 0 && !isDark ? "#000" : tech.color }} />
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
