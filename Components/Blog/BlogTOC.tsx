"use client";

import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, List } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export default function BlogTOC() {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  useEffect(() => {
    // We run this after a short delay to ensure the content renderer has processed
    const timer = setTimeout(() => {
      const elements = Array.from(document.querySelectorAll(".prose h2, .prose h3"));
      
      const parsedHeadings: TOCItem[] = elements.map((elem) => {
        // If the element doesn't have an ID, we give it one based on text
        if (!elem.id) {
          elem.id = elem.textContent?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "") || "heading";
        }
        return {
          id: elem.id,
          text: elem.textContent || "",
          level: elem.nodeName === "H2" ? 2 : 3,
        };
      });

      setHeadings(parsedHeadings);

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveId(entry.target.id);
            }
          });
        },
        { rootMargin: "0px 0px -80% 0px" }
      );

      elements.forEach((elem) => observer.observe(elem));

      return () => observer.disconnect();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (headings.length === 0) return null;

  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    setIsOpenMobile(false);
  };

  return (
    <div className="w-full">
      {/* Mobile Accordion */}
      <div className="lg:hidden mb-8 border border-white/10 rounded-2xl bg-white/[0.02] backdrop-blur-md overflow-hidden">
        <button 
          onClick={() => setIsOpenMobile(!isOpenMobile)}
          className="w-full flex items-center justify-between p-4 text-white font-bold"
        >
          <span className="flex items-center gap-2"><List size={18} /> Table of Contents</span>
          {isOpenMobile ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        <AnimatePresence>
          {isOpenMobile && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="p-4 pt-0 border-t border-white/5 space-y-2">
                {headings.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleScroll(item.id)}
                    className={`block w-full text-left text-sm transition-colors py-1 ${
                      item.level === 3 ? "pl-4 text-gray-500" : "font-medium text-gray-300"
                    } ${activeId === item.id ? "text-primary" : "hover:text-white"}`}
                  >
                    {item.text}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop Sticky Sidebar */}
      <div className="hidden lg:block sticky top-32">
        <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2">
          <List size={16} className="text-primary" /> Table of Contents
        </h4>
        <nav className="flex flex-col gap-3 relative border-l border-white/10 pl-4">
          {headings.map((item) => (
            <button
              key={item.id}
              onClick={() => handleScroll(item.id)}
              className={`text-left text-sm transition-colors relative ${
                item.level === 3 ? "ml-4 text-gray-500" : "font-medium text-gray-400"
              } ${activeId === item.id ? "text-primary font-bold" : "hover:text-white"}`}
            >
              {activeId === item.id && (
                <motion.div 
                  layoutId="activeIndicator"
                  className="absolute -left-[17px] top-1/2 -translate-y-1/2 w-[2px] h-4 bg-primary rounded-r-full"
                />
              )}
              {item.text}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
