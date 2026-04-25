"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

export default function ContactModal({ isOpen, onClose }: Props) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Elite Web3Forms Integration
        const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
        
        const submissionData = {
            access_key: accessKey,
            subject: `New Lead: ${formData.name}`,
            from_name: "Xlter Studio Leads",
            ...formData
        };

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(submissionData)
        });

        const result = await response.json();

        if (result.success) {
            toast.success("Thank you! Your message has been sent directly to our team.");
            setFormData({ name: "", email: "", phone: "", message: "" });
            onClose();
        } else {
            toast.error("Something went wrong. Please try again.");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">

                    {/* High-End Backdrop Overlay */}
                    <motion.div
                        className="absolute inset-0 bg-background/80 backdrop-blur-md"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Cinematic Modal Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 100 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 100 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as any }}
                        className="relative w-full max-w-4xl bg-card text-foreground rounded-2xl md:rounded-[3rem] p-6 md:p-16 shadow-[0_0_100px_rgba(0,0,0,0.1)] border border-border overflow-hidden"
                    >
                        {/* Decorative Background Glow */}
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />

                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-8 right-8 p-3 rounded-full hover:bg-accent text-muted-foreground hover:text-foreground transition-all active:scale-90"
                        >
                            <X size={24} />
                        </button>

                        {/* Header Section */}
                        <div className="mb-12">
                            <motion.h2
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-3xl md:text-[42px] font-bold mb-4 tracking-tighter uppercase"
                            >
                                Let&apos;s Talk
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-muted-foreground text-lg md:text-xl font-medium"
                            >
                                Start a Conversation. <br />
                                <span className="text-muted-foreground/60 text-lg">Share your requirements and we&apos;ll get back to you with how we can help.</span>
                            </motion.p>
                        </div>

                        {/* Form Section */}
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 md:gap-y-10">

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="relative group"
                            >
                                <label className="block text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground mb-3 ml-1 group-focus-within:text-primary transition-colors">Name <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter your name here"
                                    className="w-full bg-transparent border-b border-border pb-4 text-lg md:text-xl focus:outline-none focus:border-primary transition-all placeholder:text-muted-foreground/20"
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="relative group"
                            >
                                <label className="block text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground mb-3 ml-1 group-focus-within:text-primary transition-colors">E-Mail</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email address"
                                    className="w-full bg-transparent border-b border-border pb-4 text-lg md:text-xl focus:outline-none focus:border-primary transition-all placeholder:text-muted-foreground/20"
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="relative group"
                            >
                                <label className="block text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground mb-3 ml-1 group-focus-within:text-primary transition-colors">Phone Number <span className="text-red-500">*</span></label>
                                <div className="flex items-center gap-4 border-b border-border pb-4 group-focus-within:border-primary transition-all">
                                    <span className="text-lg md:text-xl text-muted-foreground">+91</span>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        placeholder="Phone number"
                                        className="w-full bg-transparent text-lg md:text-xl focus:outline-none placeholder:text-muted-foreground/20"
                                    />
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 }}
                                className="relative group md:col-span-2"
                            >
                                <label className="block text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground mb-3 ml-1 group-focus-within:text-primary transition-colors">Project Details <span className="text-red-500">*</span></label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    placeholder="Tell us about your project or vision..."
                                    rows={1}
                                    className="w-full bg-transparent border-b border-border pb-4 text-lg md:text-xl focus:outline-none focus:border-primary transition-all placeholder:text-muted-foreground/20 resize-none min-h-[60px]"
                                />
                            </motion.div>

                            {/* Submit Button */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.8 }}
                                className="md:col-span-2 flex justify-end pt-6"
                            >
                                <button
                                    type="submit"
                                    className="group relative bg-primary text-primary-foreground px-12 py-5 rounded-full font-black uppercase tracking-[0.2em] text-xs hover:brightness-110 active:scale-95 transition-all shadow-[0_10px_40px_rgba(var(--primary),0.3)] flex items-center gap-3"
                                >
                                    Send Lead
                                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                                </button>
                            </motion.div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}