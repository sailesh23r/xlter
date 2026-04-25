"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowRight, MessageSquare, Phone } from "lucide-react";
import GridBackground from "@/Components/Animations/GridBackground";

export default function NotFound() {
  return (
    <main className="relative min-h-screen bg-background flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      <GridBackground />
      
      <div className="relative z-10 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-primary font-black tracking-[0.4em] uppercase text-[10px] bg-primary/10 px-6 py-2 rounded-full border border-primary/20 mb-8 inline-block">
            404 Error
          </span>
          
          <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-none mb-6">
            PAGE <span className="text-primary">LOST</span>
          </h1>
          
          <p className="text-muted-foreground text-lg md:text-xl font-medium leading-relaxed mb-12">
            The digital frontier is vast, and it seems you&apos;ve wandered into a void. Let&apos;s get you back on track.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
            <Link 
              href="/" 
              className="flex items-center justify-center gap-3 bg-primary text-white py-4 px-8 rounded-xl font-bold uppercase tracking-widest text-xs hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Home size={16} /> Return Home
            </Link>
            <Link 
              href="/blog" 
              className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 text-foreground py-4 px-8 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-all"
            >
              Latest Stories <ArrowRight size={16} />
            </Link>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
            <p>Need immediate help?</p>
            <div className="flex items-center gap-6">
              <a href="https://wa.me/XXXXXXXXXX" className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity">
                <MessageSquare size={14} /> WhatsApp Us
              </a>
              <a href="tel:+91XXXXXXXXXX" className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity">
                <Phone size={14} /> Call Now
              </a>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[800px] h-[800px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
    </main>
  );
}
