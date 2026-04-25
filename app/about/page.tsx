"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
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
    ArrowRight
} from "lucide-react";
import { fadeUp, stagger } from "@/lib/animations";
import { useTheme } from "next-themes";
import GridBackground from "@/Components/Animations/GridBackground";
import Squares from "@/Components/Animations/Squares";

const philosophy = [
    {
        title: "Experience",
        desc: "Designing digital journeys that feel intuitive, human, and unforgettable.",
        icon: Sparkles
    },
    {
        title: "Elevate",
        desc: "Taking brands from ordinary to extraordinary through high-fidelity visual systems.",
        icon: TrendingUp
    },
    {
        title: "Lead",
        desc: "Navigating the digital frontier with bold innovation and technical mastery.",
        icon: ShieldCheck
    },
    {
        title: "Transform",
        desc: "Restructuring how businesses communicate and operate in an AI-first world.",
        icon: Zap
    },
    {
        title: "Reinvent",
        desc: "Breaking the mold to build future-proof identities and technology platforms.",
        icon: Rocket
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
    const [scrollTarget, setScrollTarget] = useState<HTMLElement | null>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = resolvedTheme === "dark";

    const { scrollYProgress } = useScroll({
        target: scrollTarget ? { current: scrollTarget } : undefined,
        offset: ["start end", "end start"]
    });

    const xTransform = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

    if (!mounted) return null;

    return (
        <div className="bg-background text-foreground selection:bg-primary selection:text-white pb-16 pt-0 transition-colors duration-500 relative overflow-hidden">
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
                                at <span className="text-primary font-bold">Xlter</span>, we are more than a digital agency; we are a fusion of human creativity and artificial intelligence.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Philosophy Section */}
                <section className="max-w-7xl mx-auto px-4 md:px-6 mb-16 md:mb-32 overflow-hidden" ref={(el) => setScrollTarget(el)}>
                    <div className="text-center mb-12 md:mb-20">
                        <h2 className="text-[26px] sm:text-[34px] md:text-[42px] font-bold uppercase tracking-tighter leading-tight text-primary mb-4">Core Philosophy</h2>
                        <p className="text-muted-foreground text-sm md:text-base font-medium leading-relaxed opacity-60">&quot;Experience, Elevate, Lead, Transform, and Reinvent.&quot;</p>
                    </div>

                    <motion.div
                        style={{ x: xTransform }}
                        className="flex gap-6 mb-8 px-4"
                    >
                        {philosophy.map((item, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ y: -5, borderColor: "rgba(37,99,235,0.3)" }}
                                className="bg-card border border-border p-8 md:p-10 rounded-[8px] shadow-2xl shadow-black/5 min-w-[260px] md:min-w-[380px] transition-all duration-500 group"
                            >
                                <div className="w-14 h-14 bg-background border border-border rounded-[8px] flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm">
                                    <item.icon size={24} />
                                </div>
                                <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight mb-4">{item.title}</h3>
                                <p className="text-muted-foreground text-sm md:text-base font-medium leading-relaxed opacity-80">{item.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
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
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            whileHover={{ y: -10 }}
                            viewport={{ once: true }}
                            className="bg-card border border-border p-8 md:p-12 rounded-[8px] relative overflow-hidden group shadow-2xl shadow-black/5"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[60px] rounded-full -translate-y-1/2 translate-x-1/2" />
                            <h3 className="flex items-center gap-3 text-primary text-[10px] font-black tracking-widest uppercase mb-8">
                                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                                Our Mission
                            </h3>
                            <p className="text-foreground font-bold leading-[1.8] text-lg uppercase tracking-tight opacity-90">
                                At Xlter, Our Mission Is To Blend Human Creativity With The Power Of Artificial Intelligence To Craft Experiences That Elevate Brands And Transform Businesses.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            whileHover={{ y: -10 }}
                            viewport={{ once: true }}
                            className="bg-card border border-border p-8 md:p-12 rounded-[8px] relative overflow-hidden group shadow-2xl shadow-black/5"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[60px] rounded-full -translate-y-1/2 translate-x-1/2" />
                            <h3 className="flex items-center gap-3 text-primary text-[10px] font-black tracking-widest uppercase mb-8">
                                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                                Our Vision
                            </h3>
                            <p className="text-foreground font-bold leading-[1.8] text-lg uppercase tracking-tight opacity-90">
                                Our Vision Is To Create A Future Where AI And Human Innovation Work Hand In Hand, Empowering Businesses Worldwide To Experience Growth And Reinvent Continuously.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Quote & CTA */}
                <section className="px-4 md:px-6 text-center max-w-5xl mx-auto pb-16 md:pb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-card border border-border p-16 md:p-24 rounded-[16px] relative overflow-hidden shadow-3xl"
                    >
                        <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
                        <div className="relative z-10 flex flex-col items-center gap-12">
                            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary shadow-inner">
                                <Quote size={40} className="fill-primary/20" />
                            </div>

                            <h2 className="text-[28px] md:text-[42px] font-bold uppercase tracking-tighter leading-tight max-w-3xl mx-auto group cursor-default">
                                <span className="group-hover:text-primary transition-colors duration-500">Xlter Strives</span> To Be The Bridge Between <span className="text-primary underline decoration-2 underline-offset-8">Imagination</span> And <span className="text-primary">Technology</span> In The Digital Era.
                            </h2>

                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(37,99,235,0.2)" }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-primary text-white px-12 py-5 rounded-[4px] font-black uppercase tracking-[0.3em] text-xs flex items-center gap-4 group transition-all"
                            >
                                Build the Future with Us
                                <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                            </motion.button>
                        </div>
                    </motion.div>
                </section>
            </div>
        </div>
    );
}