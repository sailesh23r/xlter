"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { MessageSquare, Quote, ChevronRight, ChevronLeft } from "lucide-react";

interface Testimonial {
    _id: string;
    name: string;
    role: string;
    text: string;
    avatar: string;
}

export default function Testimonials() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [radius, setRadius] = useState(160);

    useEffect(() => {
        const handleResize = () => {
            setRadius(window.innerWidth < 768 ? 120 : 160);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        fetch("/api/admin/content/testimonials")
            .then(res => res.json())
            .then(data => {
                if (data && Array.isArray(data)) setTestimonials(data);
            })
            .catch(err => console.error(err));
    }, []);

    const displayItems = testimonials.length > 0 ? testimonials : [
        { _id: '1', name: "Sara Rahmani", role: "Product Designer", text: "I build designs that solve problems, inspire action, and drive success.", avatar: "https://i.pravatar.cc/150?u=sara" },
        { _id: '2', name: "Alex Chen", role: "CEO, TechFlow", text: "The team delivered an exceptional product that exceeded our expectations.", avatar: "https://i.pravatar.cc/150?u=alex" },
        { _id: '3', name: "Elena Rodriguez", role: "Marketing Director", text: "Their strategic approach to design helped us double our conversion rates.", avatar: "https://i.pravatar.cc/150?u=elena" },
        { _id: '4', name: "Marcus Thorne", role: "Founder, GreenScale", text: "A truly visionary studio. They understand the intersection of AI and human experience.", avatar: "https://i.pravatar.cc/150?u=marcus" },
        { _id: '5', name: "Lisa Wong", role: "CTO, NextGen", text: "Highly professional and technically skilled. The best partner for digital growth.", avatar: "https://i.pravatar.cc/150?u=lisa" },
        { _id: '6', name: "David Miller", role: "Operations Lead", text: "Seamless integration and beautiful design. Highly recommended.", avatar: "https://i.pravatar.cc/150?u=david" }
    ];

    return (
        <section className="py-16 sm:py-20 lg:py-24 bg-background text-foreground relative overflow-x-clip min-h-[600px] flex flex-col items-center justify-center transition-colors duration-500 px-4 sm:px-6 lg:px-8">

            {/* Background Decorative Elements - Reduced blur on mobile */}
            <div className="absolute inset-0 pointer-events-none opacity-40 md:opacity-100">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-primary/5 blur-[80px] md:blur-[120px] rounded-full" />
                <div className="absolute top-1/4 left-1/4 w-[200px] md:w-[300px] h-[200px] md:h-[300px] bg-blue-600/5 blur-[60px] md:blur-[100px] rounded-full" />
                <div className="absolute bottom-1/4 right-1/4 w-[200px] md:w-[300px] h-[200px] md:h-[300px] bg-indigo-600/5 blur-[60px] md:blur-[100px] rounded-full" />
            </div>

            {/* Header Text */}
            <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 relative z-30 text-center mb-12 sm:mb-16 lg:mb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-tight">
                        CLIENT <span className="text-primary">VOICES</span>
                    </h2>
                    <p className="text-muted-foreground mt-6 max-w-3xl mx-auto text-sm sm:text-base md:text-lg font-medium leading-relaxed opacity-80">
                        Stories of digital transformation and creative collaboration.
                    </p>
                </motion.div>
            </div>

            {/* ── Desktop Orbit System (md and up) ── */}
            <div className="hidden md:flex relative w-full max-w-5xl h-[500px] items-center justify-center">
                {/* Central Core */}
                <motion.div
                    animate={{ scale: [1, 1.1, 1], rotate: 360 }}
                    transition={{
                        scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                        rotate: { duration: 20, repeat: Infinity, ease: "linear" }
                    }}
                    className="relative z-10 w-28 h-28 rounded-full bg-primary flex items-center justify-center shadow-[0_0_60px_rgba(37,99,235,0.4)] border-4 border-background"
                >
                    <MessageSquare className="text-primary-foreground w-10 h-10" />
                </motion.div>

                {/* Rotating Orbit Container */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                    {displayItems.map((t, i) => {
                        const angle = (i * (360 / displayItems.length));
                        return (
                            <div
                                key={t._id}
                                className="absolute pointer-events-auto"
                                style={{ transform: `rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg)` }}
                            >
                                <motion.div
                                    animate={{ rotate: -360 }}
                                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                                >
                                    <motion.div
                                        onHoverStart={() => setActiveIndex(i)}
                                        onHoverEnd={() => setActiveIndex(null)}
                                        onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                                        whileHover={{ scale: 1.1, zIndex: 50 }}
                                        className={`relative w-20 h-20 lg:w-24 lg:h-24 rounded-full cursor-pointer transition-all duration-500 border-4 ${activeIndex === i ? 'border-primary shadow-[0_0_40px_rgba(37,99,235,0.4)]' : 'border-background shadow-xl'}`}
                                    >
                                        <div className="relative w-full h-full rounded-full overflow-hidden">
                                            <Image src={t.avatar} alt={t.name} fill sizes="120px" className="object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                                        </div>

                                        <AnimatePresence>
                                            {activeIndex === i && (
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                                    exit={{ opacity: 0, scale: 0.9, y: 10 }}
                                                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-6 w-72 p-6 bg-card border border-border rounded-3xl shadow-2xl z-[100] pointer-events-none"
                                                >
                                                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-card border-r border-b border-border rotate-45" />
                                                    <div className="flex items-center gap-3 mb-3">
                                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary"><Quote size={14} /></div>
                                                        <div>
                                                            <h4 className="font-bold text-xs leading-tight">{t.name}</h4>
                                                            <p className="text-primary font-bold tracking-widest uppercase text-[9px]">{t.role}</p>
                                                        </div>
                                                    </div>
                                                    <p className="text-[11px] text-muted-foreground leading-relaxed italic font-medium">"{t.text}"</p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                </motion.div>
                            </div>
                        );
                    })}
                </motion.div>
            </div>

            {/* ── Mobile Orbit System (hidden on md) ── */}
            <div className="md:hidden flex flex-col items-center w-full gap-12">
                {/* Rotating Mobile Orbit */}
                <div className="relative w-full h-[320px] flex items-center justify-center">
                    {/* Central Core */}
                    <motion.div
                        animate={{ scale: [1, 1.1, 1], rotate: 360 }}
                        transition={{
                            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                            rotate: { duration: 20, repeat: Infinity, ease: "linear" }
                        }}
                        className="relative z-10 w-20 h-20 rounded-full bg-primary flex items-center justify-center shadow-[0_0_40px_rgba(37,99,235,0.3)] border-2 border-background"
                    >
                        <MessageSquare className="text-primary-foreground w-8 h-8" />
                    </motion.div>

                    {/* Rotating Orbit Container */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    >
                        {displayItems.map((t, i) => {
                            const angle = (i * (360 / displayItems.length));
                            const mobileRadius = 110;
                            const isSelected = activeIndex === i || (activeIndex === null && i === 0);

                            return (
                                <div
                                    key={t._id}
                                    className="absolute pointer-events-auto"
                                    style={{ transform: `rotate(${angle}deg) translate(${mobileRadius}px) rotate(-${angle}deg)` }}
                                >
                                    <motion.div
                                        animate={{ rotate: -360 }}
                                        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                                    >
                                        <button
                                            onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                                            className={`relative w-14 h-14 rounded-full transition-all duration-500 border-2 overflow-hidden shadow-md ${isSelected ? 'border-primary scale-125 z-20 shadow-[0_0_20px_rgba(37,99,235,0.3)]' : 'border-background grayscale opacity-60 scale-100 z-10'}`}
                                        >
                                            <Image src={t.avatar} alt={t.name} fill className="object-cover" />
                                        </button>

                                        {/* Mobile Testimonial Bubble */}
                                        <AnimatePresence>
                                            {activeIndex === i && (
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                                    exit={{ opacity: 0, scale: 0.9, y: 10 }}
                                                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-60 p-5 bg-card border border-border rounded-[2rem] shadow-2xl z-[100] pointer-events-none"
                                                >
                                                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-card border-r border-b border-border rotate-45" />
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary"><Quote size={12} /></div>
                                                        <div className="min-w-0">
                                                            <h4 className="font-bold text-[11px] leading-tight truncate">{t.name}</h4>
                                                            <p className="text-primary font-black tracking-widest uppercase text-[8px] truncate">{t.role}</p>
                                                        </div>
                                                    </div>
                                                    <p className="text-[10px] text-muted-foreground leading-relaxed italic font-medium">"{t.text}"</p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                </div>
                            );
                        })}
                    </motion.div>
                </div>
                
                {/* Mobile Interaction Hint */}
                <p className="text-primary font-black tracking-[0.4em] uppercase text-[9px] opacity-40">
                    Tap an avatar to hear their story
                </p>
            </div>
        </section>
    );
}
