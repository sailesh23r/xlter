"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
    TerminalSquare, 
    LineChart, 
    MousePointerClick, 
    Triangle, 
    PenTool,
} from "lucide-react";

interface ServiceItem {
    title: string;
    desc: string;
    icon: any;
    href: string;
}

const services: ServiceItem[] = [
    {
        title: "Web Development",
        desc: "Building high-performance websites",
        icon: TerminalSquare,
        href: "/Web-Development"
    },
    {
        title: "AI Digital Strategy",
        desc: "Data-driven insights & AI strategy",
        icon: LineChart,
        href: "/AI-Strategy"
    },
    {
        title: "UI/UX Design",
        desc: "Intuitive user-centric interfaces",
        icon: MousePointerClick,
        href: "/UI-UX"
    },
    {
        title: "Branding",
        desc: "Crafting iconic visuals & narratives",
        icon: Triangle,
        href: "/Branding"
    },
    {
        title: "Graphic Design",
        desc: "Creative assets for every touchpoint",
        icon: PenTool,
        href: "/Graphic-Design"
    }
];

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export default function ServiceDropdown({ isOpen, onClose }: Props) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Invisible Backdrop for closing */}
                    <div 
                        className="fixed inset-0 z-[40]" 
                        onClick={onClose} 
                    />

                    {/* Dropdown Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-full mt-4 left-0 w-80 bg-background/90 backdrop-blur-xl border border-border rounded-2xl shadow-2xl z-[50] overflow-hidden p-2 transition-colors duration-500"
                    >
                        <div className="flex flex-col gap-1">
                            {services.map((service, idx) => (
                                <Link 
                                    key={idx} 
                                    href={service.href}
                                    onClick={onClose}
                                    className="group flex items-center gap-4 p-3 rounded-xl hover:bg-accent transition-all duration-200"
                                >
                                    {/* Icon Box */}
                                    <div className="w-10 h-10 shrink-0 rounded-lg bg-accent border border-border flex items-center justify-center text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300">
                                        <service.icon size={18} />
                                    </div>

                                    {/* Text */}
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                                            {service.title}
                                        </span>
                                        <span className="text-[11px] text-muted-foreground font-medium line-clamp-1">
                                            {service.desc}
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
