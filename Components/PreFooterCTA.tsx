"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import GridBackground from "./Animations/GridBackground";
import { useRouter } from "next/navigation";

export default function PreFooterCTA() {
    const router = useRouter();

    const handleCTA = () => {
        router.push("/Contact");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <section className="relative py-40 bg-background border-t border-border/50 overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 z-0 opacity-40">
                <GridBackground />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }}
                    className="flex flex-col items-center gap-10"
                >
                    {/* Clean Heading */}
                    <h2 className="text-[36px] md:text-[58px] font-black tracking-tight leading-[1.1] text-foreground max-w-4xl uppercase">
                        READY TO BUILD THE <br />
                        <span className="text-primary italic">FUTURE</span> OF YOUR BRAND?
                    </h2>

                    {/* Premium Hover Button */}
                    <div className="mt-4">
                        <motion.button
                            onClick={handleCTA}
                            whileTap={{ scale: 0.97 }}
                            className="group relative h-14 px-12 rounded-full bg-primary text-white font-black uppercase tracking-[0.2em] text-[10px] inline-flex items-center gap-4 overflow-hidden shadow-2xl shadow-primary/30 transition-shadow duration-300 hover:shadow-primary/50 cursor-pointer"
                        >
                            {/* Slide-in white fill */}
                            <div className="absolute inset-0 bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                            {/* Text */}
                            <span className="relative z-10 group-hover:text-primary transition-colors duration-500">
                                START PROJECT NOW
                            </span>
                            <ArrowRight size={14} className="relative z-10 text-white group-hover:text-primary group-hover:translate-x-1.5 transition-all duration-500" />
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
