"use client";

import { motion } from "framer-motion";
import {
    SiNextdotjs,
    SiReact,
    SiTailwindcss,
    SiTypescript,
    SiNodedotjs,
    SiMongodb,
    SiFigma,
    SiWordpress,
    SiFirebase,
    SiPostgresql,
    SiMysql,
} from "react-icons/si";
import { FaGithub } from "react-icons/fa";
import GridBackground from "../Animations/GridBackground";

type Tech = {
    name: string;
    icon: React.ReactNode;
    color: string;
};

const techStack: Tech[] = [
    { name: "Next.js", icon: <SiNextdotjs />, color: "group-hover:text-foreground" },
    { name: "React.js", icon: <SiReact />, color: "group-hover:text-[#61DAFB]" },
    { name: "Tailwind", icon: <SiTailwindcss />, color: "group-hover:text-[#06B6D4]" },
    { name: "TypeScript", icon: <SiTypescript />, color: "group-hover:text-[#3178C6]" },
    { name: "Node.js", icon: <SiNodedotjs />, color: "group-hover:text-[#339933]" },
    { name: "MongoDB", icon: <SiMongodb />, color: "group-hover:text-[#47A248]" },
    { name: "Figma", icon: <SiFigma />, color: "group-hover:text-[#F24E1E]" },
    { name: "WordPress", icon: <SiWordpress />, color: "group-hover:text-[#21759B]" },
    { name: "GitHub", icon: <FaGithub />, color: "group-hover:text-foreground" },
    { name: "Firebase", icon: <SiFirebase />, color: "group-hover:text-[#FFCA28]" },
    { name: "PostgreSQL", icon: <SiPostgresql />, color: "group-hover:text-[#4169E1]" },
    { name: "MySQL", icon: <SiMysql />, color: "group-hover:text-[#4479A1]" },
];

export default function TechStack() {
    return (
        <section className="bg-background text-foreground py-16 md:py-24 lg:py-32 overflow-hidden relative">
        <GridBackground />
            {/* Heading */}
            <div className="max-w-7xl mx-auto px-6 text-center mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-[42px] font-bold uppercase tracking-tighter leading-tight">
                        OUR <span className="text-primary">TECH STACK</span>
                    </h2>
                    <p className="mt-6 max-w-2xl mx-auto">
                        Leveraging industry-leading tools to build high-performance digital ecosystems.
                    </p>
                </motion.div>
            </div>

            {/* Grid */}
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-y-16 gap-x-8">
                {techStack.map((tech, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ y: -12 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ 
                            duration: 0.4, 
                            delay: index * 0.05,
                            type: "spring",
                            stiffness: 200
                        }}
                        className="flex flex-col items-center justify-center transition-all duration-300 group cursor-pointer"
                    >
                        {/* Icon Container */}
                        <div className={`text-6xl md:text-7xl mb-8 text-muted-foreground/30 transition-all duration-500 transform group-hover:scale-110 ${tech.color}`}>
                            {tech.icon}
                        </div>
                        
                        {/* Label */}
                        <div className="relative overflow-hidden">
                            <p className="text-primary font-bold tracking-[0.4em] uppercase text-[10px] text-muted-foreground/40 group-hover:text-foreground transition-colors duration-500">
                                {tech.name}
                            </p>
                            <motion.div 
                                className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-500"
                            />
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}