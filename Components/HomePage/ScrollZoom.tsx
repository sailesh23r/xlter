"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function ScrollZoom() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Zoom from 1 to 1.5
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
  
  // Parallax for text
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section 
      ref={containerRef} 
      className="relative h-[150vh] bg-[#020617] overflow-hidden"
    >
      {/* Zooming Image Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.div 
          style={{ scale }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
            alt="Cinematic Zoom"
            fill
            sizes="100vw"
            className="object-cover opacity-60"
            priority
          />
          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617]" />
          <div className="absolute inset-0 bg-black/20" />
        </motion.div>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div 
            style={{ y, opacity }}
            className="text-center px-6"
          >
            <span className="text-primary font-bold tracking-[0.5em] uppercase text-sm mb-6 block">
              The Future of Digital
            </span>
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-none">
              BEYOND <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">
                LIMITS
              </span>
            </h2>
            <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light">
              We push the boundaries of what's possible, engineering digital experiences that resonate, scale, and dominate.
            </p>
          </motion.div>
        </div>

        {/* Decorative Lines */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-white to-transparent" />
          <div className="absolute top-0 right-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-white to-transparent" />
        </div>
      </div>
    </section>
  );
}
