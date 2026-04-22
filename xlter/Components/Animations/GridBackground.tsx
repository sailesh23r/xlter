"use client";

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

export default function GridBackground() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
            {/* Architectural Grid Pattern */}
            <div 
                className="absolute inset-0" 
                style={{
                    backgroundImage: `
                        linear-gradient(to right, currentColor 1px, transparent 1px),
                        linear-gradient(to bottom, currentColor 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px',
                    maskImage: 'radial-gradient(ellipse at center, black, transparent 80%)',
                    WebkitMaskImage: 'radial-gradient(ellipse at center, black, transparent 80%)',
                    color: 'rgba(59, 130, 246, 0.1)'
                }}
            />
            
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-[10%] left-[10%] w-[1px] h-20 bg-primary/20" />
                <div className="absolute top-[10%] left-[10%] w-20 h-[1px] bg-primary/20" />
                <div className="absolute bottom-[10%] right-[10%] w-[1px] h-20 bg-primary/20" />
                <div className="absolute bottom-[10%] right-[10%] w-20 h-[1px] bg-primary/20" />
            </div>
        </div>
    );
}
