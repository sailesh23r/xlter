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

    const firstLine = "Fast, Scalable Websites That";
    const secondLine = "Drive Results";

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
                        <p className="text-primary font-bold tracking-[0.4em] uppercase text-[10px] bg-primary/10 px-6 py-2 rounded-[4px] border border-primary/20 w-fit mx-auto">
                            PREMIUM WEB ENGINEERING
                        </p>
                    </motion.div>

                    <motion.h1
                        initial="hidden"
                        animate="visible"
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] uppercase tracking-tighter mb-6"
                    >
                        {/* First Line */}
                        <div>
                            {firstLine.split(" ").map((word, i) => (
                                <motion.span
                                    key={i}
                                    custom={i}
                                    variants={textVariants}
                                    className="inline-block mr-[0.2em]"
                                >
                                    {word}
                                </motion.span>
                            ))}
                        </div>

                        {/* Second Line */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="block text-primary mt-2"
                        >
                            {secondLine}
                        </motion.div>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-muted-foreground text-base md:text-lg font-medium leading-relaxed max-w-2xl mb-10 mx-auto"
                    >
                        We build high-performance web applications that are as beautiful as they are functional. Our development process prioritizes speed, security, and scalability.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-wrap justify-center gap-4"
                    >
                        <button
                            onClick={openContact}
                            className="bg-primary text-primary-foreground px-6 sm:px-8 py-4 sm:py-5 rounded-full font-black uppercase tracking-widest text-[10px] md:text-xs shadow-2xl shadow-primary/40 hover:scale-105 transition-all active:scale-95 flex items-center gap-3 group"
                        >
                            Start Your Project <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                        </button>
                        <Link href="/casestudy">
                            <button
                                className="bg-transparent border border-border text-foreground px-6 sm:px-10 py-4 sm:py-5 rounded-full font-black uppercase tracking-widest text-[10px] md:text-xs hover:bg-accent transition-all active:scale-95 flex items-center gap-3"
                            >
                                View Portfolio <ChevronRight size={18} />
                            </button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Digital Architecture Section */}
            <section className="py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-transparent transition-colors duration-500 border-t border-border/10 relative overflow-hidden">
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="flex flex-col lg:flex-row justify-between items-center mb-12 sm:mb-16 lg:mb-24 gap-12 text-center lg:text-left">
                        <div className="max-w-2xl">
                            <motion.p className="text-primary font-bold tracking-[0.4em] uppercase text-[10px] mb-6">CORE SERVICES</motion.p>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tighter leading-tight text-foreground">
                                Digital <br /> <span className="text-primary">Architecture</span>
                            </h2>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Static Website Development",
                                icon: Zap,
                                desc: "Ultra-fast, secure, and modern websites built with Next.js & Tailwind CSS for maximum performance and SEO.",
                                span: "md:col-span-2"
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
                                desc: "Modernizing your existing web presence with clean design and performance-focused code.",
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
            <section className="py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-background relative border-y border-border/10 overflow-hidden">
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tighter leading-tight mb-8 sm:mb-12 lg:mb-16"
                    >
                        A Methodical <span className="text-primary">Approach</span>
                    </motion.h2>
                    <p className="text-muted-foreground text-sm md:text-lg font-medium leading-relaxed max-w-xl mx-auto mb-12 sm:mb-16 lg:mb-24">
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
                                className="group flex flex-col lg:flex-row gap-8 items-start lg:items-center p-6 sm:p-8 lg:p-12 rounded-[8px] bg-accent/10 border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-500"
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
            <section className="py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden">
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="mb-12 sm:mb-16 lg:mb-24"
                    >
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tighter leading-tight mb-6">
                            Powered by <span className="text-primary">Modern Tech</span>
                        </h2>
                        <p className="text-muted-foreground text-sm md:text-base font-medium leading-relaxed max-w-xl mx-auto">
                            We leverage the industry's most advanced web technologies to build high-performance digital ecosystems.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 sm:gap-8 lg:gap-12 max-w-6xl mx-auto">
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
                                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-accent/50 flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:bg-primary/5 transition-all duration-500 shadow-xl"
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

        </div>
    );
}
