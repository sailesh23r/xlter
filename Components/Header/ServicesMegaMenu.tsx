"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    TerminalSquare,
    Cpu,
    LineChart,
    MousePointerClick,
    Triangle,
    PenTool,
    ArrowRight,
    Sparkles,
} from "lucide-react";
import { useLenis } from "../Animations/SmoothScroll";

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
        desc: "Fast, scalable websites built to convert.",
        icon: TerminalSquare,
        href: "/web-development",
        accent: "group-hover:text-blue-500",
    },
    {
        title: "UI/UX Design",
        desc: "Interfaces that feel effortless and premium.",
        icon: MousePointerClick,
        href: "/ui-ux",
        accent: "group-hover:text-pink-500",
    },
    {
        title: "Branding",
        desc: "Identities that command attention globally.",
        icon: Triangle,
        href: "/branding",
        accent: "group-hover:text-amber-500",
    },
    {
        title: "Software Development",
        desc: "Custom enterprise-grade digital systems.",
        icon: Cpu,
        href: "/soft-dev",
        accent: "group-hover:text-emerald-500",
    },
    {
        title: "AI Digital Strategy",
        desc: "Intelligence-driven growth and analytics.",
        icon: LineChart,
        href: "/ai-strategy",
        accent: "group-hover:text-purple-500",
    },
    {
        title: "Graphic Design",
        desc: "Visual assets crafted for every touchpoint.",
        icon: PenTool,
        href: "/graphic-design",
        accent: "group-hover:text-violet-500",
    },
];

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export default function ServicesMegaMenu({ isOpen, onClose }: Props) {
    const pathname = usePathname();
    const lenis = useLenis();

    useEffect(() => {
        onClose();
    }, [pathname]);

    useEffect(() => {
        if (isOpen && lenis) {
            lenis.stop();
        } else if (lenis) {
            lenis.start();
        }
    }, [isOpen, lenis]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 z-[45]"
                        onClick={onClose}
                    />

                    {/* Mega Menu Panel — centered below the full navbar */}
                    <motion.div
                        initial={{ opacity: 0, y: 16, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 12, scale: 0.98 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed left-1/2 -translate-x-1/2 top-[5.5rem] z-[50] w-full max-w-5xl px-4"
                    >
                        <div className="rounded-3xl bg-background/95 backdrop-blur-2xl border border-border shadow-2xl overflow-hidden transition-colors duration-300">

                            {/* ── Main Content ── */}
                            <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-0">

                                {/* ── Left: Feature Card ── */}
                                <div className="relative p-8 flex flex-col justify-between bg-primary/5 border-r border-border overflow-hidden">
                                    {/* Background Glow */}
                                    <div className="absolute -top-20 -left-20 w-56 h-56 bg-primary/15 blur-[80px] rounded-full pointer-events-none" />
                                    <div className="absolute -bottom-20 -right-10 w-40 h-40 bg-primary/10 blur-[60px] rounded-full pointer-events-none" />

                                    <div className="relative z-10">
                                        <div className="flex items-center gap-2 mb-5">
                                            <Sparkles size={14} className="text-primary" />
                                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">
                                                Our Ecosystem
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-black uppercase tracking-tighter leading-tight text-foreground mb-3">
                                            Explore Our<br />
                                            <span className="text-primary">Services</span>
                                        </h3>
                                        <p className="text-xs text-muted-foreground font-medium leading-relaxed max-w-[200px]">
                                            End-to-end digital solutions for brands that want speed, scale, and premium execution.
                                        </p>
                                    </div>

                                    <div className="relative z-10 mt-8">
                                        <Link
                                            href="/casestudy"
                                            onClick={onClose}
                                            className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-primary/30"
                                        >
                                            View All Services
                                            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </div>

                                {/* ── Right: Services Grid ── */}
                                <div className="p-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                                        {services.map((service, idx) => (
                                            <Link
                                                key={idx}
                                                href={service.href}
                                                onClick={onClose}
                                                className="group relative flex items-start gap-3.5 p-3.5 rounded-2xl hover:bg-accent transition-all duration-200"
                                            >
                                                {/* Icon */}
                                                <div className={`mt-0.5 w-9 h-9 shrink-0 rounded-xl bg-accent border border-border flex items-center justify-center text-muted-foreground transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary group-hover:scale-110`}>
                                                    <service.icon size={16} strokeWidth={1.5} />
                                                </div>

                                                {/* Text */}
                                                <div className="flex flex-col min-w-0 flex-1">
                                                    <span className={`text-[13px] font-bold text-foreground transition-colors duration-200 tracking-tight ${service.accent}`}>
                                                        {service.title}
                                                    </span>
                                                    <span className="text-[11px] text-muted-foreground font-medium leading-snug mt-0.5 opacity-80">
                                                        {service.desc}
                                                    </span>
                                                </div>

                                                {/* Arrow */}
                                                <ArrowRight
                                                    size={13}
                                                    className="mt-1 shrink-0 text-muted-foreground/20 group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-200"
                                                />
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
