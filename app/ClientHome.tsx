"use client";

import Hero from "@/Components/HomePage/Hero";
import Testimonials from "@/Components/HomePage/Testimonials";
import Work from "@/Components/HomePage/WorkSection";
import TechStack from "@/Components/HomePage/TechStack";
import Ecosystem from "@/Components/HomePage/Ecosystem";
import FAQSection from "@/Components/HomePage/FAQSection";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as any }
  }
};

export default function ClientHome({ heroData }: {
  heroData: {
    heroLabel?: string;
    h1?: string;
    highlightedWord?: string;
    description?: string;
    primaryCTA?: { text: string; link: string };
    secondaryCTA?: { text: string; link: string };
  } | null;
}) {
  return (
    <main className="relative">
      {/* Hero has its own internal animations, so we keep it clean here */}
      <Hero data={heroData} />
      
      {/* Only wrap key sections with lightweight reveal to avoid overloading the GPU */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
        <Ecosystem />
      </motion.div>
      
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
        <Work />
      </motion.div>
      
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
        <TechStack />
      </motion.div>
      
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
        <Testimonials />
      </motion.div>
      
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
        <FAQSection />
      </motion.div>
    </main>
  );
}
