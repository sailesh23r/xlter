"use client";

import { motion } from "framer-motion";
import {
    SiNextdotjs,
    SiReact,
    SiTailwindcss,
    SiWordpress,
    SiFirebase,
    SiPostgresql,
    SiMysql,
    SiPrisma,
    SiSanity,
    SiVercel,
} from "react-icons/si";
import { FaGithub } from "react-icons/fa";

const techItems = [
    { name: "WordPress", icon: () => <SiWordpress size="100%" className="text-[#21759B]" /> },
    { name: "GitHub", icon: () => <FaGithub size="100%" className="text-white" /> },
    { name: "Firebase", icon: () => <SiFirebase size="100%" className="text-[#FFCA28]" /> },
    { name: "PostgreSQL", icon: () => <SiPostgresql size="100%" className="text-[#4169E1]" /> },
    
    { name: "MySQL", icon: () => <SiMysql size="100%" className="text-[#4479A1]" /> },
    { name: "Next.js", icon: () => <SiNextdotjs size="100%" className="text-white" /> },
    { name: "React", icon: () => <SiReact size="100%" className="text-[#61DAFB]" /> },
    { name: "Prisma", icon: () => <SiPrisma size="100%" className="text-white" /> },
    
    { name: "Tailwind CSS", icon: () => <SiTailwindcss size="100%" className="text-[#06B6D4]" /> },
    { name: "Sanity", icon: () => <SiSanity size="100%" className="text-[#F03E2F]" /> },
    { name: "Vercel", icon: () => <SiVercel size="100%" className="text-white" /> },
];

export default function TechStack() {
    return (
        <section className="bg-background text-foreground py-16 sm:py-20 lg:py-32 overflow-hidden relative">
            {/* Heading */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center mb-24 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-tight">
                        OUR <span className="text-primary">TECH STACK</span>
                    </h2>
                    <p className="text-muted-foreground mt-6 max-w-2xl mx-auto text-sm sm:text-base md:text-lg font-medium leading-relaxed">
                        Leveraging industry-leading tools to build high-performance digital ecosystems.
                    </p>
                </motion.div>
            </div>

            {/* Premium Icon-only layout (4-4-3 Desktop) */}
            {/* 4 items need 860px (4*140 + 3*100). 5 items need 1100px. A max-w of 1000px perfectly forces 4 per row. */}
            <div className="max-w-[1000px] mx-auto px-4 sm:px-6 relative z-10 flex flex-wrap justify-center gap-x-12 gap-y-16 md:gap-x-16 md:gap-y-20 lg:gap-x-[100px] lg:gap-y-[80px]">
                {techItems.map((tech, i) => (
                    <motion.div
                        key={tech.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        className="group flex flex-col items-center justify-center bg-transparent border-none shadow-none w-[calc(50%-24px)] md:w-[calc(33.33%-44px)] lg:w-[140px]"
                    >
                        {/* Wrapper for Floating Animation & Hover Scale */}
                        <motion.div 
                            animate={{ y: [0, i % 2 === 0 ? -4 : 4, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="w-[52px] h-[52px] md:w-[64px] md:h-[64px] lg:w-[80px] lg:h-[80px] transition-all duration-300 group-hover:scale-[1.10] group-hover:drop-shadow-[0_0_24px_rgba(59,130,246,0.6)] flex items-center justify-center"
                        >
                            {tech.icon()}
                        </motion.div>
                        
                        <span className="mt-6 text-[12px] font-bold tracking-[0.15em] uppercase text-white/70 group-hover:text-[#3B82F6] transition-colors duration-300 text-center">
                            {tech.name}
                        </span>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
