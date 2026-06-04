"use client";

import React from "react";

export type TechItem = {
    icon: React.ReactNode;
    name: string;
    category?: string;
    desc?: string;
    size?: "large" | "medium" | "small";
};

interface TechScrollTickerProps {
    items: TechItem[];
    /** speed is kept for backwards compatibility but ignored */
    speed?: number;
}

export default function TechScrollTicker({ items }: TechScrollTickerProps) {
    if (!items || items.length === 0) return null;

    // Helper to extract the brand color from the icon props for dynamic glows
    const getGlowColor = (tech: TechItem) => {
        if (React.isValidElement(tech.icon)) {
            const element = tech.icon as React.ReactElement<any>;
            if (element.props?.style?.color) {
                return element.props.style.color;
            }
        }
        return "#3b82f6"; // Fallback to premium blue glow
    };

    // Duplicate the array sufficiently to ensure it always overflows screens seamlessly
    const repeatedItems = [...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items];

    return (
        <div className="w-full relative overflow-hidden py-12 md:py-16 select-none">
            {/* Inject self-contained keyframe styles */}
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee-infinite {
                    display: flex;
                    width: max-content;
                    animation: marquee 35s linear infinite;
                }
                .animate-marquee-infinite:hover {
                    animation-play-state: paused;
                }
            `}} />

            {/* Left and Right Luxury Faded Edge Overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />

            {/* Scrolling Track Container */}
            <div className="w-full overflow-hidden flex items-center">
                <div className="animate-marquee-infinite gap-6 px-4 md:px-6">
                    {repeatedItems.map((tech, i) => {
                        const glowColor = getGlowColor(tech);
                        return (
                            <div
                                key={i}
                                className="group relative flex items-center gap-4 px-6 py-4 rounded-3xl bg-card/25 backdrop-blur-xl border border-border/30 hover:border-transparent transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl shrink-0 min-w-[220px]"
                            >
                                {/* Glowing neon border & background drop-shadow on hover */}
                                <div 
                                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"
                                    style={{
                                        boxShadow: `0 0 25px ${glowColor}20`,
                                        border: `1.5px solid ${glowColor}40`,
                                        background: `radial-gradient(circle at 50% 50%, ${glowColor}05 0%, transparent 100%)`
                                    }}
                                />

                                {/* Icon container with dynamic background glow matching brand */}
                                <div 
                                    className="relative z-10 w-12 h-12 rounded-2xl flex items-center justify-center bg-muted/40 border border-border/50 text-foreground transition-all duration-500 group-hover:scale-110"
                                    style={{
                                        boxShadow: `inset 0 0 10px rgba(0,0,0,0.05)`
                                    }}
                                >
                                    <div 
                                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                        style={{
                                            background: `${glowColor}12`
                                        }}
                                    />
                                    <div className="transition-transform duration-500 group-hover:rotate-[12deg] z-10 flex items-center justify-center">
                                        {tech.icon}
                                    </div>
                                </div>

                                {/* Text info */}
                                <div className="relative z-10 flex flex-col justify-center">
                                    <span 
                                        className="font-black text-sm uppercase tracking-wider text-foreground group-hover:text-primary transition-colors"
                                        style={{
                                            transition: "color 0.4s ease"
                                        }}
                                    >
                                        {tech.name}
                                    </span>
                                    {tech.category ? (
                                        <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground mt-0.5 opacity-80">
                                            {tech.category}
                                        </span>
                                    ) : (
                                        <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground mt-0.5 opacity-50">
                                            Technology
                                        </span>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
