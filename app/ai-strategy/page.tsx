"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
    ArrowRight,
    ChevronRight,
    LineChart,
    Search,
    Brain,
    Bot,
    TrendingUp,
    Share2,
    Target,
    Zap,
    Cpu,
    BarChart,
    Globe,
    Maximize
} from "lucide-react";
import {
    SiOpenai,
    SiGoogleanalytics,
    SiGoogleads,
    SiMeta,
    SiGooglesearchconsole
} from "react-icons/si";
import Squares from "@/Components/Animations/Squares";
import { useTheme } from "next-themes";
import React, { useState, useEffect } from "react";
import GridBackground from "@/Components/Animations/GridBackground";

export default function AIStrategyPage() {
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

    const words = "AI-Powered Digital Growth & SEO That Scales".split(" ");

    return (
        <div className="bg-background text-foreground min-h-screen pt-0 transition-colors duration-500">

            {/* Hero Section */}
            <section className="relative w-full py-16 md:py-20 bg-background border-b border-border/10">
                <div className="px-6 md:px-12 max-w-7xl mx-auto space-y-12 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center gap-4"
                    >
                        <p className="text-primary font-bold tracking-[0.4em] uppercase text-[10px] bg-primary/10 px-6 py-2 rounded-[4px] border border-primary/20 w-fit mx-auto">
                            REDEFINING EXCELLENCE
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
                                {word === "AI-Powered" || word === "SEO" || word === "Scales" ? <span className="text-primary">{word}</span> : word}
                            </motion.span>
                        ))}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-muted-foreground text-base md:text-lg font-medium leading-relaxed max-w-2xl mb-10 mx-auto"
                    >
                        Master the future with AI strategies that don&apos;t just keep pace—they set the standard. We combine advanced data science with creative intuition to build intelligent systems that scale.
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
                            Get Started <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
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
                            <motion.p className="text-primary font-bold tracking-[0.4em] uppercase text-[10px] mb-6">EXPERTISE</motion.p>
                            <h2 className="text-[32px] md:text-[54px] font-black uppercase tracking-tighter leading-tight text-primary">
                                Precision <br /> Digital Services
                            </h2>
                        </div>
                        <div className="max-w-sm">
                            <p className="text-muted-foreground text-sm md:text-base font-medium leading-relaxed opacity-70">
                                Our ecosystem handles everything from core technical SEO to the latest in generative engine optimization.
                            </p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "AI SEO Optimization",
                                icon: Globe,
                                desc: "Real-time keyword intent analysis and automated semantic structure implementation using our custom LLM stack."
                            },
                            {
                                title: "AEO & GEO",
                                icon: Bot,
                                desc: "Dominate Perplexity, ChatGPT, and Google SGE with specialized Generative Engine Optimization."
                            },
                            {
                                title: "Performance Marketing",
                                icon: TrendingUp,
                                desc: "Precision-targeted ad campaigns driven by predictive modeling and automated bid adjustments."
                            },
                            {
                                title: "AI Content Automation",
                                icon: Cpu,
                                desc: "High-quality, human-resonant content generated at scale and fact-checked by secondary AI agents."
                            },
                            {
                                title: "Viral Social Strategy",
                                icon: Share2,
                                desc: "Algorithm-aware content clusters designed to trigger exponential social sharing and brand lift."
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
            <section className="py-16 md:py-24 lg:py-32 px-6 md:px-12 bg-background relative border-y border-border/10 overflow-hidden">
                <GridBackground />
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-[42px] font-bold uppercase tracking-tighter leading-tight mb-24"
                    >
                        A Methodical <span className="text-primary">Approach</span>
                    </motion.h2>
                    <p className="text-muted-foreground text-sm md:text-lg font-medium leading-relaxed max-w-xl mx-auto mb-24">
                        Structure is the soul of strategy. Our process ensures every data point serves a purpose.
                    </p>

                    <div className="flex flex-col gap-12 max-w-4xl mx-auto text-left">
                        {[
                            { 
                                name: "Research & Audit", 
                                step: "01",
                                desc: "Deep-dive into your brand's digital landscape — competitor analysis, keyword opportunity mapping, and technical SEO audit.",
                                icon: Search
                            },
                            { 
                                name: "AI Analysis", 
                                step: "02",
                                desc: "Leveraging large language models and predictive analytics to identify high-value growth opportunities and content gaps.",
                                icon: Brain
                            },
                            { 
                                name: "Strategy Design", 
                                step: "03",
                                desc: "Building a precision roadmap — defining channels, content clusters, and KPIs aligned with your business objectives.",
                                icon: Target
                            },
                            { 
                                name: "Execution", 
                                step: "04",
                                desc: "Deploying campaigns, AI-generated content, and optimized assets at scale with meticulous attention to quality.",
                                icon: Zap
                            },
                            { 
                                name: "Optimization", 
                                step: "05",
                                desc: "Continuous monitoring and A/B testing with AI-driven adjustments to maximize ROI and reduce wasted spend.",
                                icon: BarChart
                            },
                            { 
                                name: "Scaling", 
                                step: "06",
                                desc: "Expanding winning strategies across new channels and markets to drive compounding, long-term growth.",
                                icon: Maximize
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
            <section className="py-16 md:py-24 lg:py-32 px-6 md:px-12 bg-background relative overflow-hidden">
                <GridBackground />
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="mb-24"
                    >
                        <h2 className="text-[32px] md:text-[54px] font-black uppercase tracking-tighter leading-tight mb-6">
                            Powered by <span className="text-primary">Modern Tech</span>
                        </h2>
                        <p className="text-muted-foreground text-sm md:text-base font-medium leading-relaxed max-w-xl mx-auto">
                            We leverage an elite stack of industry-leading tools and frameworks to ensure your digital growth is built on the most advanced foundations available.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
                        {[
                            { icon: SiGoogleanalytics, name: "Google Analytics", color: "#E37400" },
                            { icon: SiGoogleads, name: "Google Ads", color: "#4285F4" },
                            { icon: SiMeta, name: "Meta Ads", color: "#0668E1" },
                            { icon: SiGooglesearchconsole, name: "Search Console", color: "#4285F4" },
                            { icon: SiOpenai, name: "ChatGPT", color: "#10a37f" }
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
                                    <tech.icon size={32} style={{ color: i === 4 && !isDark ? "#000" : tech.color }} />
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
