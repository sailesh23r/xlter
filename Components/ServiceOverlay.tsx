"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
    TerminalSquare,
    LineChart,
    MousePointerClick,
    Triangle,
    PenTool,
    Cpu,
    Sparkles,
    ArrowRight
} from "lucide-react";

interface ServiceItem {
    title: string;
    desc: string;
    icon: any;
    href: string;
    accent: string;
}

const services: ServiceItem[] = [
    {
        title: "Web Development",
        desc: "High-performance digital experiences",
        icon: TerminalSquare,
        href: "/web-development",
        accent: "from-blue-500/10 to-cyan-500/10"
    },
    {
        title: "Software Development",
        desc: "Custom enterprise-grade systems",
        icon: Cpu,
        href: "/soft-dev",
        accent: "from-emerald-500/10 to-teal-500/10"
    },
    {
        title: "AI Digital Strategy",
        desc: "Intelligence-driven growth & data",
        icon: LineChart,
        href: "/ai-strategy",
        accent: "from-purple-500/10 to-indigo-500/10"
    },
    {
        title: "UI/UX Design",
        desc: "Intuitive & resonant interfaces",
        icon: MousePointerClick,
        href: "/ui-ux",
        accent: "from-pink-500/10 to-rose-500/10"
    },
    {
        title: "Branding",
        desc: "Iconic visuals & brand narratives",
        icon: Triangle,
        href: "/branding",
        accent: "from-orange-500/10 to-amber-500/10"
    },
    {
        title: "Graphic Design",
        desc: "Creative assets for global reach",
        icon: PenTool,
        href: "/graphic-design",
        accent: "from-violet-500/10 to-fuchsia-500/10"
    }
];

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export default function NebulaMenu({ isOpen, onClose }: Props) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Invisible Backdrop */}
                    <div
                        className="fixed inset-0 z-[40]"
                        onClick={onClose}
                    />

                    {/* Dropdown Panel */}
                    <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.96 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute top-full mt-5 left-0 w-[420px] bg-background/95 backdrop-blur-2xl border border-border rounded-[24px] shadow-2xl z-[50] overflow-hidden p-2 transition-colors duration-300"
                    >
                        {/* Subtle primary glow — respects theme */}
                        <div className="absolute -top-16 -left-16 w-48 h-48 bg-primary/10 blur-[80px] rounded-full pointer-events-none" />
                        <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-primary/5 blur-[80px] rounded-full pointer-events-none" />

                        {/* Header */}
                        <div className="px-4 py-3 border-b border-border mb-1 flex items-center justify-between">
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">
                                Our Services
                            </span>
                            <Sparkles size={12} className="text-primary" />
                        </div>

                        {/* Service List */}
                        <div className="flex flex-col gap-0.5 py-1">
                            {services.map((service, idx) => (
                                <Link
                                    key={idx}
                                    href={service.href}
                                    onClick={onClose}
                                    className="group relative flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-accent transition-all duration-200"
                                >
                                    {/* Per-service accent glow on hover */}
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-r ${service.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl z-0`}
                                    />

                                    {/* Icon */}
                                    <div className="relative z-10 w-10 h-10 shrink-0 rounded-xl bg-accent border border-border flex items-center justify-center text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300">
                                        <service.icon size={18} strokeWidth={1.5} />
                                    </div>

                                    {/* Text */}
                                    <div className="relative z-10 flex flex-col min-w-0">
                                        <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors tracking-tight leading-snug">
                                            {service.title}
                                        </span>
                                        <span className="text-[11px] text-muted-foreground font-medium leading-snug truncate">
                                            {service.desc}
                                        </span>
                                    </div>

                                    {/* Arrow */}
                                    <ArrowRight
                                        size={14}
                                        className="relative z-10 ml-auto shrink-0 text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-200"
                                    />
                                </Link>
                            ))}
                        </div>

                        {/* Footer CTA */}
                        <div className="mt-1 p-2 border-t border-border">
                            <Link
                                href="/contact"
                                onClick={onClose}
                                className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-primary/10 hover:bg-primary hover:text-primary-foreground text-primary text-[10px] font-black uppercase tracking-widest transition-all duration-200 group"
                            >
                                Explore All Solutions
                                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
