"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
    Sparkles,
    TrendingUp,
    ShieldCheck,
    Zap,
    Rocket,
    MousePointer2,
    Shield,
    Repeat,
    RotateCcw,
    Quote,
    ArrowRight,
    Target,
    Eye,
    Users,
    Lightbulb
} from "lucide-react";
import { fadeUp, stagger } from "@/lib/animations";
import { useTheme } from "next-themes";
import GridBackground from "@/Components/Animations/GridBackground";
import Squares from "@/Components/Animations/Squares";

const coreValues = [
    {
        title: "Client-Centric",
        desc: "Designing tailored digital experiences that put the client's needs and audience first.",
        icon: Users
    },
    {
        title: "Integrity",
        desc: "Operating with transparency, ethical practices, and an unwavering commitment to quality.",
        icon: ShieldCheck
    },
    {
        title: "Innovation",
        desc: "Continuously pushing the boundaries of design and technology to deliver future-proof solutions.",
        icon: Lightbulb
    }
];

const framework = [
    {
        letter: "X",
        title: "eXperience",
        icon: MousePointer2,
        desc: "Customer-first design, immersive web & app experiences that focus on the emotional resonance of every click."
    },
    {
        letter: "E",
        title: "Elevate",
        icon: TrendingUp,
        desc: "Your brand's presence and performance through data-driven refinement and world-class aesthetics."
    },
    {
        letter: "L",
        title: "Lead",
        icon: Shield,
        desc: "The digital frontier with innovation. We don't follow trends; we define the next technological standard."
    },
    {
        letter: "T",
        title: "Transform",
        icon: Repeat,
        desc: "Businesses through strategy + design, creating cohesive ecosystems where technology and brand are one."
    },
    {
        letter: "R",
        title: "Reinvent",
        icon: RotateCcw,
        desc: "Marketing, tech, identity—everything. Continuous evolution for an ever-shifting digital landscape."
    }
];

export default function AboutPage() {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = resolvedTheme === "dark";

    if (!mounted) return null;

    return (
        <div className="bg-background text-foreground selection:bg-primary selection:text-white pb-16 pt-0 transition-colors duration-500 relative overflow-x-clip">
            {/* Background Animations */}
            {/* Background elements removed for cleaner look */}

            <div className="relative z-10">
                <GridBackground />

                {/* Standardized Hero Section */}
                <section className="relative w-full h-auto py-16 md:py-20 bg-background border-b border-border/10">
                    <div className="max-w-7xl mx-auto px-6 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-col items-center gap-4"
                        >
                            <p className="text-primary font-bold tracking-[0.4em] uppercase text-[10px] bg-primary/10 px-6 py-2 rounded-[4px] border border-primary/20 w-fit mx-auto">
                                About Us
                            </p>
                            <h1 className="text-4xl md:text-[64px] font-bold leading-[1.1] uppercase tracking-tighter mb-6 mt-6">
                                BLEND OF <span className="text-primary">AI AND HUMAN</span> CREATIVITY
                            </h1>
                            <p className="text-muted-foreground text-base md:text-lg font-medium leading-relaxed max-w-2xl mb-10 mx-auto">
                                at <span className="text-primary font-bold">Xeltr</span>, we are more than a digital agency; we are a fusion of human creativity and artificial intelligence.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Core Values Section */}
                <section className="max-w-7xl mx-auto px-4 md:px-6 mb-16 md:mb-32">
                    <div className="text-center mb-12 md:mb-20">
                        <h2 className="text-[26px] sm:text-[34px] md:text-[42px] font-bold uppercase tracking-tighter leading-tight text-primary mb-4">Our Core Value</h2>
                        <p className="text-muted-foreground text-sm md:text-base font-medium leading-relaxed opacity-60 max-w-xl mx-auto">
                            &quot;Client-Centric, Integrity, and Innovation.&quot;
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 px-4">
                        {coreValues.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                whileHover={{ y: -10 }}
                                className="group relative bg-card/40 backdrop-blur-md border border-border/50 p-8 md:p-10 rounded-[24px] shadow-2xl shadow-black/5 transition-all duration-500 hover:border-primary/50 overflow-hidden cursor-default"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[40px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors duration-700" />
                                
                                <div className="relative z-10">
                                    <div className="w-16 h-16 bg-background/50 backdrop-blur-md border border-border/50 rounded-[16px] flex items-center justify-center text-primary mb-8 group-hover:scale-110 group-hover:bg-primary group-hover:text-white group-hover:border-primary/50 transition-all duration-500 shadow-sm">
                                        <item.icon size={28} className="group-hover:rotate-12 transition-transform duration-500" />
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight mb-4 group-hover:text-primary transition-colors duration-300">{item.title}</h3>
                                    <p className="text-muted-foreground text-sm md:text-base font-medium leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity duration-300">{item.desc}</p>
                                </div>
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] w-0 group-hover:w-[60%] transition-all duration-700 rounded-t-full bg-primary" />
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Framework Section */}
                <section className="max-w-7xl mx-auto px-4 md:px-6 mb-16 md:mb-32">
                    <div className="text-center mb-12 md:mb-20">
                        <h2 className="text-[26px] sm:text-[34px] md:text-[42px] font-bold uppercase tracking-tighter leading-tight text-primary mb-4">The X.E.L.T.R Framework</h2>
                        <p className="text-muted-foreground text-sm md:text-base font-medium leading-relaxed max-w-xl mx-auto opacity-60">
                            Our methodology is a systematic approach to creative problem-solving.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        {framework.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                whileHover={{ scale: 1.01, x: 10 }}
                                viewport={{ once: true, margin: "-100px" }}
                                className="group flex flex-col md:flex-row items-start md:items-center gap-8 p-8 rounded-[8px] border border-border bg-card/50 backdrop-blur-xl hover:border-primary/30 transition-all duration-500"
                            >
                                <div className="w-20 h-20 shrink-0 bg-background border border-border rounded-[8px] flex items-center justify-center text-4xl font-black text-primary shadow-xl group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                    {item.letter}
                                </div>
                                <div className="flex-1 space-y-2">
                                    <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight flex items-center gap-3">
                                        {item.title} <item.icon size={18} className="text-primary group-hover:text-white transition-colors" />
                                    </h3>
                                    <p className="text-muted-foreground text-sm md:text-base font-medium leading-relaxed opacity-80 group-hover:text-foreground/80 transition-colors">
                                        {item.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Mission & Vision */}
                <section className="max-w-7xl mx-auto px-4 md:px-6 mb-16 md:mb-32">
                    <div className="text-center mb-12 md:mb-24">
                        <h2 className="text-[28px] md:text-[42px] font-bold uppercase tracking-tighter leading-tight">Our Mission & Vision</h2>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -12 }}
                            className="group relative bg-card/20 backdrop-blur-sm border border-border/50 p-8 md:p-12 rounded-[32px] overflow-hidden shadow-2xl shadow-black/5 transition-all duration-500 hover:border-primary/50 cursor-default"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors duration-700" />

                            <div className="relative z-10 flex flex-col h-full">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-3 px-4 py-2 rounded-full text-[10px] font-black tracking-widest uppercase backdrop-blur-xl border border-primary/20 text-primary shadow-xl bg-primary/10">
                                        <span className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_10px_rgba(37,99,235,0.8)]" />
                                        Our Mission
                                    </div>
                                    <div className="w-14 h-14 rounded-full bg-background border border-border flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm">
                                        <Target size={24} className="group-hover:rotate-12 transition-transform duration-500" />
                                    </div>
                                </div>

                                <p className="text-foreground font-bold leading-[1.6] text-xl md:text-2xl uppercase tracking-tight opacity-90 group-hover:text-primary transition-colors duration-500 mt-auto">
                                    At Xeltr, Our Mission Is To Blend Human Creativity With The Power Of Artificial Intelligence To Craft Experiences That Elevate Brands And Transform Businesses.
                                </p>
                            </div>

                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[4px] w-0 group-hover:w-[60%] transition-all duration-700 rounded-t-full bg-primary" />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -12 }}
                            transition={{ delay: 0.1 }}
                            className="group relative bg-card/20 backdrop-blur-sm border border-border/50 p-8 md:p-12 rounded-[32px] overflow-hidden shadow-2xl shadow-black/5 transition-all duration-500 hover:border-primary/50 cursor-default"
                        >
                            <div className="absolute inset-0 bg-gradient-to-bl from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors duration-700" />

                            <div className="relative z-10 flex flex-col h-full">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-3 px-4 py-2 rounded-full text-[10px] font-black tracking-widest uppercase backdrop-blur-xl border border-primary/20 text-primary shadow-xl bg-primary/10">
                                        <span className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_10px_rgba(37,99,235,0.8)]" />
                                        Our Vision
                                    </div>
                                    <div className="w-14 h-14 rounded-full bg-background border border-border flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm">
                                        <Eye size={24} className="group-hover:scale-110 transition-transform duration-500" />
                                    </div>
                                </div>

                                <p className="text-foreground font-bold leading-[1.6] text-xl md:text-2xl uppercase tracking-tight opacity-90 group-hover:text-primary transition-colors duration-500 mt-auto">
                                    Our Vision Is To Create A Future Where AI And Human Innovation Work Hand In Hand, Empowering Businesses Worldwide To Experience Growth And Reinvent Continuously.
                                </p>
                            </div>

                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[4px] w-0 group-hover:w-[60%] transition-all duration-700 rounded-t-full bg-primary" />
                        </motion.div>
                    </div>
                </section>

                {/* Section removed */}
            </div>
        </div>
    );
}
