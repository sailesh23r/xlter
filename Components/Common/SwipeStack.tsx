"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { ArrowRight, ArrowLeft, RefreshCw, X } from "lucide-react";

interface SwipeStackProps<T> {
  items: T[];
  renderCard: (item: T, index: number) => React.ReactNode;
  onSwipeRight?: (item: T) => void;
  onSwipeLeft?: (item: T) => void;
  emptyState?: React.ReactNode;
  loop?: boolean;
}

export function SwipeStack<T extends { _id: string }>({
  items,
  renderCard,
  onSwipeRight,
  onSwipeLeft,
  emptyState,
  loop = true,
}: SwipeStackProps<T>) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [exitDirection, setExitDirection] = useState<number | null>(null);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);
  
  const likeOpacity = useTransform(x, [50, 150], [0, 1]);
  const nopeOpacity = useTransform(x, [-150, -50], [1, 0]);

  const handleDragEnd = (event: any, info: any) => {
    const threshold = 80;
    if (info.offset.x > threshold) {
      setExitDirection(1);
      onSwipeRight?.(items[currentIndex]);
      setTimeout(() => {
        if (loop && currentIndex >= items.length - 1) {
          setCurrentIndex(0);
        } else {
          setCurrentIndex((prev) => prev + 1);
        }
        setExitDirection(null);
        x.set(0);
      }, 150);
    } else if (info.offset.x < -threshold) {
      setExitDirection(-1);
      onSwipeLeft?.(items[currentIndex]);
      setTimeout(() => {
        if (loop && currentIndex >= items.length - 1) {
          setCurrentIndex(0);
        } else {
          setCurrentIndex((prev) => prev + 1);
        }
        setExitDirection(null);
        x.set(0);
      }, 150);
    }
  };

  const reset = () => {
    setCurrentIndex(0);
  };

  const swipe = (direction: number) => {
    setExitDirection(direction);
    if (direction === 1) onSwipeRight?.(items[currentIndex]);
    if (direction === -1) onSwipeLeft?.(items[currentIndex]);
    
    setTimeout(() => {
      if (loop && currentIndex >= items.length - 1) {
        setCurrentIndex(0);
      } else {
        setCurrentIndex((prev) => prev + 1);
      }
      setExitDirection(null);
      x.set(0);
    }, 150);
  };

  if (!loop && currentIndex >= items.length) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-6 text-center space-y-6">
        {emptyState || (
          <>
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary">
              <RefreshCw size={32} />
            </div>
            <div>
              <p className="text-foreground font-bold uppercase tracking-widest text-sm">End of the line</p>
              <p className="text-muted-foreground text-xs mt-2">You&apos;ve seen all the latest content.</p>
            </div>
            <button 
              onClick={reset}
              className="px-8 py-3 bg-primary text-white rounded-full font-black uppercase tracking-widest text-[10px] shadow-xl shadow-primary/20"
            >
              Start Over
            </button>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="relative w-full flex flex-col items-center">
      <div className="relative w-full h-[520px] flex items-center justify-center overflow-hidden">
        <AnimatePresence initial={false}>
          {items.slice(currentIndex, currentIndex + 3).reverse().map((item, index) => {
            const stackSize = items.slice(currentIndex, currentIndex + 3).length;
            const isTop = index === stackSize - 1;
            const depth = stackSize - 1 - index; // 0 for top, 1 for middle, 2 for bottom
            
            return (
              <motion.div
                key={item._id}
                style={{
                  x: isTop ? x : 0,
                  rotate: isTop ? rotate : 0,
                  opacity: isTop ? opacity : 1 - (depth * 0.2),
                  zIndex: 10 - depth,
                }}
                drag={isTop ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleDragEnd}
                className="absolute w-[90vw] max-w-[400px] cursor-grab active:cursor-grabbing"
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ 
                  scale: 1 - (depth * 0.05), 
                  opacity: 1 - (depth * 0.1), 
                  y: depth * 12,
                  transition: { duration: 0.2, ease: "easeOut" }
                }}
                exit={{ 
                  x: exitDirection ? exitDirection * 600 : 0, 
                  opacity: 0,
                  rotate: exitDirection ? exitDirection * 45 : 0,
                  scale: 0.8,
                  transition: { duration: 0.3, ease: "easeInOut" }
                }}
              >
                {isTop && (
                  <>
                    <motion.div 
                      style={{ opacity: likeOpacity }}
                      className="absolute top-10 left-10 z-20 border-4 border-green-500 text-green-500 font-black uppercase tracking-widest px-4 py-2 rounded-lg rotate-[-20deg] pointer-events-none"
                    >
                      LIKE
                    </motion.div>
                    <motion.div 
                      style={{ opacity: nopeOpacity }}
                      className="absolute top-10 right-10 z-20 border-4 border-red-500 text-red-500 font-black uppercase tracking-widest px-4 py-2 rounded-lg rotate-[20deg] pointer-events-none"
                    >
                      NOPE
                    </motion.div>
                  </>
                )}
                <div className="bg-card border border-border/50 rounded-[24px] overflow-hidden shadow-2xl">
                  {renderCard(item, currentIndex)}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
      
      {/* Action Buttons */}
      <div className="flex items-center gap-8 mt-6">
        <button 
          onClick={() => swipe(-1)}
          className="w-14 h-14 rounded-full border border-border bg-card flex items-center justify-center text-red-500 shadow-lg active:scale-90 transition-transform hover:bg-red-500/10"
        >
          <X size={24} />
        </button>
        <button 
          onClick={() => swipe(1)}
          className="w-14 h-14 rounded-full border border-border bg-card flex items-center justify-center text-green-500 shadow-lg active:scale-90 transition-transform hover:bg-green-500/10"
        >
          <ArrowRight size={24} />
        </button>
      </div>

      {/* Swipe Hints */}
      <div className="mt-8 flex justify-center gap-12 pointer-events-none opacity-30">
        <div className="flex flex-col items-center gap-1">
          <ArrowLeft size={16} />
          <span className="text-[8px] font-black uppercase tracking-widest">Skip</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <ArrowRight size={16} />
          <span className="text-[8px] font-black uppercase tracking-widest">View</span>
        </div>
      </div>
    </div>
  );
}
