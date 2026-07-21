"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  LineChart,
  Search,
  Brain,
  Bot,
  TrendingUp,
  Share2,
  Target,
  Zap,
  Cpu,
  BarChart,
  Globe,
  Maximize
} from "lucide-react";
import {
  SiOpenai,
  SiGoogleanalytics,
  SiGoogleads,
  SiMeta,
  SiGooglesearchconsole
} from "react-icons/si";
import Squares from "@/Components/Animations/Squares";
import { useTheme } from "next-themes";
import React, { useState, useEffect } from "react";
import GridBackground from "@/Components/Animations/GridBackground";
import TechScrollTicker from "@/Components/Animations/TechScrollTicker";
import { SectionWrapper } from "@/Components/Common/SectionWrapper";
import { SectionHeading } from "@/Components/Common/SectionHeading";
import { PremiumCard } from "@/Components/Common/PremiumCard";

export default function AIStrategyPage() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark";
  if (!mounted) return null;

  const openContact = () => {
    window.dispatchEvent(new CustomEvent("openContactModal"));
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
      },
    }),
  };

  const words = "AI-POWERED STRATEGIES FOR DIGITAL GROWTH".split(" ");

  return (
    <div className="bg-background text-foreground transition-colors duration-500">

      {/* Hero Section */}
      <SectionWrapper className="border-b border-border/10">
        <div className="relative z-10 space-y-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="inline-flex items-center gap-3 px-5 h-10 rounded-full border border-primary/25 bg-primary/[0.06] backdrop-blur-xl shadow-[0_0_24px_hsl(var(--primary)/0.15)] w-fit mx-auto">
              <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary)/0.8)] animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.24em] text-primary/90">
                AI Digital Strategy
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="visible"
            className="text-[clamp(1.8rem,4.5vw,3.25rem)] font-bold leading-[1.1] uppercase tracking-tighter mb-6 break-words"
          >
            {words.map((word, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={textVariants}
                className="inline-block mr-[0.2em]"
              >
                {word === "AI-POWERED" || word === "DIGITAL" || word === "GROWTH" ? <span className="text-primary">{word}</span> : word}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-body text-muted-foreground font-medium max-w-2xl mx-auto"
          >
            We help brands leverage AI, automation, and data-driven systems to unlock smarter workflows, scalable growth, and future-ready digital experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <button
              onClick={openContact}
              className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold text-sm shadow-xl shadow-primary/20 hover:-translate-y-1 transition-all active:scale-95 flex items-center gap-3 group"
            >
              Get Started <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <Link href="/casestudy">
              <button
                className="bg-transparent border border-border text-foreground px-8 py-4 rounded-full font-bold text-sm hover:bg-accent transition-all active:scale-95 flex items-center gap-3"
              >
                View Portfolio <ChevronRight size={18} />
              </button>
            </Link>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* Expertise Section */}
      <SectionWrapper className="bg-transparent transition-colors duration-500 relative overflow-hidden">
        <SectionHeading
          title={<>Precision <span className="text-primary">Digital Services</span></>}
          subtitle="Our ecosystem handles everything from core technical SEO to the latest in generative engine optimization."
          centered={true}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 relative z-10">
          {[
            {
              title: "AI SEO Optimization",
              icon: Globe,
              desc: "Real-time keyword intent analysis and automated semantic structure implementation using our custom LLM stack.",
              span: "md:col-span-2"
            },
            {
              title: "AEO & GEO",
              icon: Bot,
              desc: "Dominate Perplexity, ChatGPT, and Google SGE with specialized Generative Engine Optimization."
            },
            {
              title: "Performance Marketing",
              icon: TrendingUp,
              desc: "Precision-targeted ad campaigns driven by predictive modeling and automated bid adjustments."
            },
            {
              title: "AI Content Automation",
              icon: Cpu,
              desc: "High-quality, human-resonant content generated at scale and fact-checked by secondary AI agents.",
              span: "md:col-span-2"
            }
          ].map((item, i) => (
            <PremiumCard key={i} delay={i * 0.1} className={item.span || ""}>
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 group-hover:scale-110">
                <item.icon size={22} />
              </div>
              <h3 className="text-card font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">{item.title}</h3>
              <p className="text-body text-muted-foreground opacity-80 font-normal">{item.desc}</p>
            </PremiumCard>
          ))}
        </div>
      </SectionWrapper>

      {/* Methodology Section */}
      <SectionWrapper className="bg-background relative border-y border-border/10 overflow-hidden">
        <GridBackground />
        <div className="relative z-10 flex flex-col items-center">
          <SectionHeading
            title={<>A Methodical <span className="text-primary">Approach</span></>}
            subtitle="Structure is the soul of strategy. Our process ensures every data point serves a purpose."
            centered={true}
          />

          <div className="flex flex-col gap-6 md:gap-8 max-w-4xl mx-auto text-left w-full">
            {[
              {
                name: "Research & Audit",
                step: "01",
                desc: "Deep-dive into your brand's digital landscape — competitor analysis, keyword opportunity mapping, and technical SEO audit.",
                icon: Search
              },
              {
                name: "AI Analysis",
                step: "02",
                desc: "Leveraging large language models and predictive analytics to identify high-value growth opportunities and content gaps.",
                icon: Brain
              },
              {
                name: "Strategy Design",
                step: "03",
                desc: "Building a precision roadmap — defining channels, content clusters, and KPIs aligned with your business objectives.",
                icon: Target
              },
              {
                name: "Execution",
                step: "04",
                desc: "Deploying campaigns, AI-generated content, and optimized assets at scale with meticulous attention to quality.",
                icon: Zap
              },
              {
                name: "Optimization",
                step: "05",
                desc: "Continuous monitoring and A/B testing with AI-driven adjustments to maximize ROI and reduce wasted spend.",
                icon: BarChart
              },
              {
                name: "Scaling",
                step: "06",
                desc: "Expanding winning strategies across new channels and markets to drive compounding, long-term growth.",
                icon: Maximize
              }
            ].map((step, i) => (
              <PremiumCard key={i} delay={i * 0.1} hoverLift={false} className="!p-6 md:!p-8 !rounded-[20px] flex-col sm:flex-row items-start sm:items-center gap-6">
                <div className="text-5xl font-black text-primary/10 group-hover:text-primary transition-colors duration-500 shrink-0">
                  {step.step}
                </div>
                <div className="w-12 h-12 rounded-full bg-background/50 border border-border/50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shrink-0">
                  <step.icon size={20} />
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-semibold tracking-tight text-foreground mb-2 group-hover:text-primary transition-colors">{step.name}</h4>
                  <p className="text-body text-muted-foreground opacity-80 font-normal">{step.desc}</p>
                </div>
              </PremiumCard>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Tech Stack Section */}
      <SectionWrapper className="bg-background relative overflow-hidden border-t border-border/10">
        <GridBackground />
        <div className="relative z-10">
          <SectionHeading
            title={<>Powered by <span className="text-primary">Modern Tech</span></>}
            subtitle="We leverage an elite stack of industry-leading tools and frameworks to ensure your digital growth is built on the most advanced foundations available."
            centered={true}
          />
        </div>
        <TechScrollTicker
          items={[
            { icon: <SiOpenai size={32} style={{ color: "#10a37f" }} />, name: "ChatGPT Enterprise", category: "Generative AI", size: "large", desc: "The foundational LLM powering our advanced conversational workflows and text generation pipelines." },
            { icon: <SiGoogleanalytics size={32} style={{ color: "#E37400" }} />, name: "Google Analytics", category: "Analytics Core", size: "medium" },
            { icon: <SiGoogleads size={32} style={{ color: "#4285F4" }} />, name: "Google Ads", category: "Performance", size: "small" },
            { icon: <SiMeta size={32} style={{ color: "#0668E1" }} />, name: "Meta Ads", category: "Performance", size: "small" },
          ]}
        />
      </SectionWrapper>

    </div>
  );
}
