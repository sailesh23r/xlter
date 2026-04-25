"use client";

import { motion } from "framer-motion";
import { MessageSquare, Phone, ArrowRight, Mail } from "lucide-react";
import Link from "next/link";

interface LeadGenSectionProps {
  title?: string;
  description?: string;
  whatsappNumber?: string;
  phoneNumber?: string;
  email?: string;
}

export default function LeadGenSection({
  title = "Ready to Scale Your Brand?",
  description = "Join the elite studios who have transformed their digital presence with Xlter. Let's build something legendary together.",
  whatsappNumber = "+91XXXXXXXXXX",
  phoneNumber = "+91XXXXXXXXXX",
  email = "hello@xlter.com",
}: LeadGenSectionProps) {
  return (
    <section className="py-32 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#111111] border border-white/10 rounded-[3rem] p-12 md:p-24 relative overflow-hidden group">
          {/* Animated Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-8 block"
              >
                Let&apos;s Talk
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] text-white mb-8"
              >
                {title}
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-muted-foreground text-lg md:text-xl font-medium max-w-xl leading-relaxed mb-12"
              >
                {description}
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-4"
              >
                <Link 
                  href="/contact" 
                  className="bg-primary text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20"
                >
                  Start Project <ArrowRight size={16} />
                </Link>
                <a 
                  href={`https://wa.me/${whatsappNumber.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/5 border border-white/10 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] flex items-center gap-3 hover:bg-white/10 transition-all"
                >
                  <MessageSquare size={16} className="text-primary" /> WhatsApp
                </a>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <motion.a 
                href={`tel:${phoneNumber}`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="p-8 bg-white/2 border border-white/5 rounded-3xl hover:border-primary/30 transition-all group/card"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover/card:scale-110 transition-transform">
                  <Phone size={20} />
                </div>
                <h3 className="text-xs font-black uppercase tracking-widest text-white/40 mb-2">Call Us</h3>
                <p className="text-lg font-bold text-white uppercase tracking-tight">{phoneNumber}</p>
              </motion.a>

              <motion.a 
                href={`mailto:${email}`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="p-8 bg-white/2 border border-white/5 rounded-3xl hover:border-primary/30 transition-all group/card"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover/card:scale-110 transition-transform">
                  <Mail size={20} />
                </div>
                <h3 className="text-xs font-black uppercase tracking-widest text-white/40 mb-2">Email Us</h3>
                <p className="text-lg font-bold text-white uppercase tracking-tight">{email}</p>
              </motion.a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background Decorative Blob */}
      <div className="absolute -bottom-1/2 -right-1/4 w-[800px] h-[800px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
}
