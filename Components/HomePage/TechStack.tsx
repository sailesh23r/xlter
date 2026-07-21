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
} from "react-icons/si";
import { FaGithub } from "react-icons/fa";

const techItems = [
    { name: "WordPress", icon: () => <SiWordpress size="100%" className="text-[#21759B]" /> },
    { name: "GitHub", icon: () => <FaGithub size="100%" className="text-foreground" /> },
    { name: "Firebase", icon: () => <SiFirebase size="100%" className="text-[#FFCA28]" /> },
    { name: "PostgreSQL", icon: () => <SiPostgresql size="100%" className="text-[#4169E1]" /> },
    
    { name: "MySQL", icon: () => <SiMysql size="100%" className="text-[#4479A1]" /> },
    { name: "Next.js", icon: () => <SiNextdotjs size="100%" className="text-foreground" /> },
    { name: "React", icon: () => <SiReact size="100%" className="text-[#61DAFB]" /> },
    { name: "Prisma", icon: () => <SiPrisma size="100%" className="text-foreground" /> },
    
    { name: "Tailwind CSS", icon: () => <SiTailwindcss size="100%" className="text-[#06B6D4]" /> },
    { name: "Sanity", icon: () => <SiSanity size="100%" className="text-[#F03E2F]" /> },
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

            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {techItems.map((tech, i) => (
                    <motion.article
                        key={tech.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        className="group flex flex-col min-h-28 items-center justify-center rounded-2xl p-5"
                    >
                        {/* Wrapper for Floating Animation & Hover Scale */}
                        <motion.div 
                            animate={{ y: [0, i % 2 === 0 ? -4 : 4, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="h-14 w-14 sm:h-16 sm:w-16 lg:h-20 lg:w-20 transition-all duration-300 group-hover:scale-[1.10] group-hover:drop-shadow-[0_0_24px_rgba(59,130,246,0.6)] flex items-center justify-center shrink-0"
                        >
                            {tech.icon()}
                        </motion.div>
                        
                        <span className="mt-6 text-[12px] font-bold tracking-[0.15em] uppercase text-muted-foreground group-hover:text-[#3B82F6] transition-colors duration-300 text-center min-w-0 break-words">
                            {tech.name}
                        </span>
                    </motion.article>
                ))}
                </div>
            </div>
        </section>
    );
}
