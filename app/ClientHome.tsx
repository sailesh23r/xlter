"use client";

import Hero from "@/Components/HomePage/Hero";
import Testimonials from "@/Components/HomePage/Testimonials";
import Work from "@/Components/HomePage/WorkSection";
import TechStack from "@/Components/HomePage/TechStack";
import Ecosystem from "@/Components/HomePage/Ecosystem";
import FAQSection from "@/Components/HomePage/FAQSection";
import { motion } from "framer-motion";

const revealAnimation = {
  hidden: { opacity: 0, y: 50, filter: "blur(10px)" },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }
  }
};

export default function ClientHome() {
  return (
    <main className="relative">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={revealAnimation}>
        <Hero />
      </motion.div>
      
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={revealAnimation}>
        <Ecosystem />
      </motion.div>
      
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={revealAnimation}>
        <Work />
      </motion.div>
      
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={revealAnimation}>
        <TechStack />
      </motion.div>
      
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={revealAnimation}>
        <Testimonials />
      </motion.div>
      
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={revealAnimation}>
        <FAQSection />
      </motion.div>
    </main>
  );
}
