"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
    const phoneNumber = "919495091659";
    const message = "Hello Xlter! I'm interested in your digital services.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-40 bg-[#25D366] text-white p-3 md:p-4 rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.3)] flex items-center justify-center group"
        >
            <div className="absolute right-full mr-4 bg-white dark:bg-card px-4 py-2 rounded-xl shadow-xl text-black dark:text-white text-xs font-bold uppercase tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0 pointer-events-none">
                Chat with us
            </div>
            <MessageCircle size={28} />
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 -z-10" />
        </motion.a>
    );
}
