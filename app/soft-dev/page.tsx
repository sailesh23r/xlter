"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
    ArrowRight,
    ChevronRight,
    Terminal,
    Cpu,
    Zap,
    Cloud,
    Shield,
    Database,
    Code,
    Layout,
    Search,
    Layers,
    Server,
    Activity
} from "lucide-react";
import {
    SiNextdotjs,
    SiReact,
    SiTailwindcss,
    SiTypescript,
    SiNodedotjs,
    SiMongodb,
    SiDocker,
    SiGooglecloud,
    SiPython,
    SiJavascript,
    SiCplusplus,
} from "react-icons/si";
import { FaGithub } from "react-icons/fa";
import { useTheme } from "next-themes";
import React, { useState, useEffect } from "react";
import GridBackground from "@/Components/Animations/GridBackground";

export default function SoftwareDevelopmentPage() {
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

    const firstLine = "Intelligent Software Solutions";
    const secondLine = "Engineered for Growth";

    return (
        <div className="bg-background text-foreground min-h-screen pt-0 transition-colors duration-500">

            {/* Hero Section */}
            <section className="relative w-full h-auto py-16 sm:py-20 lg:py-28 bg-background border-b border-border/10">

                <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 space-y-12 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center gap-4"
                    >
                        <p className="text-primary font-bold tracking-[0.4em] uppercase text-[10px] bg-primary/10 px-6 py-2 rounded-[4px] border border-primary/20 w-fit mx-auto">
                            PREMIUM SOFTWARE ENGINEERING
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
                        We build high-performance, scalable, and secure software systems tailored to solve complex business challenges. Our engineering approach prioritizes architectural integrity and long-term maintainability.
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

            {/* Software Capabilities Section */}
            <section className="py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-transparent transition-colors duration-500 border-t border-border/10 relative overflow-hidden">
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="flex flex-col lg:flex-row justify-between items-center mb-12 sm:mb-16 lg:mb-24 gap-12 text-center lg:text-left">
                        <div className="max-w-2xl">
                            <motion.p className="text-primary font-bold tracking-[0.4em] uppercase text-[10px] mb-6 relative">CORE CAPABILITIES</motion.p>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tighter leading-tight text-foreground">
                                Enterprise-Grade <br /> <span className="text-primary">Engineering</span>
                            </h2>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Custom Enterprise Software",
                                icon: Terminal,
                                desc: "Scalable, secure, and robust software solutions designed specifically to meet unique organizational requirements and workflows.",
                                span: "md:col-span-2"
                            },
                            {
                                title: "Cloud-Native Solutions",
                                icon: Cloud,
                                desc: "Building resilient applications optimized for modern cloud environments like AWS and Azure, ensuring high availability."
                            },
                            {
                                title: "Legacy Modernization",
                                icon: Zap,
                                desc: "Revitalizing outdated systems with modern architectures, improving performance, security, and user experience."
                            },
                            {
                                title: "System Integration",
                                icon: Layers,
                                desc: "Ensuring seamless communication between disparate systems through robust API development and middleware solutions.",
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

            {/* Engineering Principles Section */}
            <section className="py-16 md:py-24 lg:py-32 px-6 md:px-12 bg-background relative border-y border-border/10 overflow-hidden">
                <GridBackground />
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-[42px] font-bold uppercase tracking-tighter leading-tight mb-24 relative"
                    >
                        Engineering <span className="text-primary">Principles</span>
                    </motion.h2>

                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Reliability Path */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="bg-accent/20 p-12 rounded-[8px] border border-border text-left relative"
                        >
                            <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight mb-8">Built for Reliability</h3>
                            <ul className="space-y-6">
                                {[
                                    { icon: Shield, text: "Strict Security Audits" },
                                    { icon: Server, text: "High Availability Clusters" },
                                    { icon: Activity, text: "Real-time Monitoring" }
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-4 text-muted-foreground font-bold uppercase tracking-widest text-xs">
                                        <item.icon size={18} className="text-primary" />
                                        {item.text}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Performance Path */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="bg-accent/20 p-12 rounded-[8px] border border-border text-left relative"
                        >
                            <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight mb-8">Built for Performance</h3>
                            <ul className="space-y-6">
                                {[
                                    { icon: Cpu, text: "Optimized Algorithms" },
                                    { icon: Database, text: "Efficient Data Access" },
                                    { icon: Zap, text: "Ultra-Low Latency" }
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

            {/* Development Lifecycle Section */}
            <section className="py-16 md:py-24 lg:py-32 px-6 md:px-12 bg-background relative border-y border-border/10 overflow-hidden">
                <GridBackground />
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-[42px] font-bold uppercase tracking-tighter leading-tight mb-16 relative"
                    >
                        A Structured <span className="text-primary">Lifecycle</span>
                    </motion.h2>
                    <p className="text-muted-foreground text-sm md:text-lg font-medium leading-relaxed max-w-xl mx-auto mb-24">
                        We follow an elite development lifecycle to ensure predictable delivery and uncompromising software quality.
                    </p>

                    <div className="flex flex-col gap-12 max-w-4xl mx-auto text-left">
                        {[
                            {
                                name: "Requirements & Discovery",
                                step: "01",
                                desc: "Deep-dive into business processes, functional requirements, and technical constraints to build a solid foundation.",
                                icon: Search
                            },
                            {
                                name: "System Architecture",
                                step: "02",
                                desc: "Designing high-level architecture, choosing the right stack, and blueprinting system components and data flow.",
                                icon: Layout
                            },
                            {
                                name: "Agile Development",
                                step: "03",
                                desc: "Iterative coding cycles with continuous feedback, ensuring the product evolves exactly according to your needs.",
                                icon: Code
                            },
                            {
                                name: "Quality Engineering",
                                step: "04",
                                desc: "Automated testing, security scanning, and performance benchmarking to ensure a resilient final product.",
                                icon: Shield
                            },
                            {
                                name: "Deployment & Scaling",
                                step: "05",
                                desc: "Cloud-native deployment with CI/CD pipelines for smooth transitions and effortless future scaling.",
                                icon: Zap
                            }
                        ].map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] as any }}
                                className="group flex flex-col md:flex-row gap-8 items-start md:items-center p-12 rounded-[8px] bg-accent/10 border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-500 relative"
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

            {/* Software Tech Stack Section */}
            <section className="py-16 md:py-24 lg:py-32 px-6 md:px-12 bg-background relative overflow-hidden">
                <GridBackground />
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="mb-24 relative"
                    >
                        <h2 className="text-[42px] font-bold uppercase tracking-tighter leading-tight mb-6">
                            The <span className="text-primary">Engineering Stack</span>
                        </h2>
                        <p className="text-muted-foreground text-sm md:text-base font-medium leading-relaxed max-w-xl mx-auto">
                            We leverage an elite selection of programming languages and infrastructure tools to build high-performance systems.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 max-w-6xl mx-auto">
                        {[
                            { icon: SiNextdotjs, name: "Next.js", color: "#000000" },
                            { icon: SiTypescript, name: "TypeScript", color: "#3178C6" },
                            { icon: SiNodedotjs, name: "Node.js", color: "#339933" },
                            { icon: SiPython, name: "Python", color: "#3776AB" },
                            { icon: SiJavascript, name: "JavaScript", color: "#F7DF1E" },
                            { icon: SiCplusplus, name: "C++", color: "#00599C" },
                            { icon: SiDocker, name: "Docker", color: "#2496ED" },
                            { icon: SiGooglecloud, name: "GCP", color: "#4285F4" },
                            { icon: SiMongodb, name: "MongoDB", color: "#47A248" },
                            { icon: FaGithub, name: "GitHub", color: "#181717" },
                            { icon: SiReact, name: "React.js", color: "#61DAFB" },
                            { icon: SiTailwindcss, name: "Tailwind", color: "#06B6D4" },
                        ].map((tech, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.05 }}
                                className="group flex flex-col items-center gap-6 relative"
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

        </div>
    );
}
