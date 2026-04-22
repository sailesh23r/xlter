"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { MessageSquare, Quote } from "lucide-react";
import GridBackground from "../Animations/GridBackground";

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

    useEffect(() => {
        fetch("/api/testimonials")
            .then(res => res.json())
            .then(data => setTestimonials(data))
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
        <section className="py-24 md:py-32 lg:py-40 bg-background text-foreground relative overflow-hidden min-h-[900px] flex flex-col items-center justify-center transition-colors duration-500">
        <GridBackground />
            
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full" />
                <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-blue-600/5 blur-[100px] rounded-full" />
                <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-indigo-600/5 blur-[100px] rounded-full" />
            </div>

            {/* Header Text */}
            <div className="max-w-7xl mx-auto px-6 relative z-30 text-center mb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-[42px] font-bold uppercase tracking-tighter leading-tight">
                        CLIENT <span className="text-primary">VOICES</span>
                    </h2>
                    <p className="max-w-2xl mx-auto">
                        A showcase of our most ambitious projects, pushing the boundaries of design and code.
                    </p>
                </motion.div>
            </div>

            {/* Central Orbit System */}
            <div className="relative w-full max-w-5xl h-[500px] flex items-center justify-center">
                
                {/* Central Core */}
                <motion.div 
                    animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: 360
                    }}
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
                        const radius = typeof window !== 'undefined' && window.innerWidth < 768 ? 160 : 250;
                        
                        return (
                            <div 
                                key={t._id} 
                                className="absolute pointer-events-auto"
                                style={{ 
                                    transform: `rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg)` 
                                }}
                            >
                                {/* Inverse rotation for content so text remains upright */}
                                <motion.div 
                                    animate={{ rotate: -360 }}
                                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                                >
                                    <motion.div
                                        onHoverStart={() => setActiveIndex(i)}
                                        onHoverEnd={() => setActiveIndex(null)}
                                        onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                                        whileHover={{ scale: 1.2, zIndex: 50 }}
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: i * 0.1 }}
                                        className={`relative w-16 h-16 md:w-24 md:h-24 rounded-full cursor-pointer transition-all duration-500 border-4 ${activeIndex === i ? 'border-primary shadow-[0_0_40px_rgba(37,99,235,0.5)] scale-110' : 'border-background shadow-2xl hover:border-primary/50'}`}
                                    >
                                        <div className="relative w-full h-full rounded-full overflow-hidden">
                                            <Image
                                                src={t.avatar}
                                                alt={t.name}
                                                fill
                                                sizes="100px"
                                                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                            />
                                        </div>
                                        
                                        {/* Testimonial Bubble */}
                                        <AnimatePresence>
                                            {activeIndex === i && (
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                                    exit={{ opacity: 0, scale: 0.8, y: 20 }}
                                                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-8 w-72 p-8 bg-card border border-border rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] z-[100] pointer-events-none"
                                                >
                                                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-card border-r border-b border-border rotate-45" />
                                                    <div className="flex items-center gap-3 mb-4">
                                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                                            <Quote size={18} />
                                                        </div>
                                                        <div>
                                                            <h4 className="font-bold text-sm leading-tight">{t.name}</h4>
                                                            <p className="text-primary font-bold tracking-[0.4em] uppercase text-[10px] mt-1">{t.role}</p>
                                                        </div>
                                                    </div>
                                                    <p className="text-xs text-muted-foreground leading-relaxed italic font-medium">"{t.text}"</p>
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

            {/* Interaction Hint */}
            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="mt-24 text-primary font-bold tracking-[0.4em] uppercase text-[10px] text-muted-foreground"
            >
                Hover over avatars to hear their stories
            </motion.p>
        </section>
    );
}