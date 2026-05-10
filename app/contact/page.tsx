"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
    Mail,
    Phone,
    MapPin,
    MessageSquare,
    Send,
    User,
    Briefcase,
    Moon,
    Sun,
    Loader2
} from "lucide-react";
import { toast } from "sonner";
import {
    FaInstagram,
    FaFacebook,
    FaTwitter,
    FaGithub,
    FaLinkedin,
    FaWhatsapp
} from "react-icons/fa6";
import { fadeUp, stagger } from "@/lib/animations";
import { useTheme } from "next-themes";
import React, { useState, useEffect } from "react";
import GridBackground from "@/Components/Animations/GridBackground";
import Squares from "@/Components/Animations/Squares";

const contactInfo = [
    {
        icon: <Mail size={20} />,
        label: "Email",
        value: "contact@xeltr.com",
        href: "mailto:contact@xeltr.com"
    },
    {
        icon: <Phone size={20} />,
        label: "Phone",
        value: "+91 94950 91659",
        href: "tel:+919495091659"
    },
    {
        icon: <FaWhatsapp size={20} />,
        label: "WhatsApp",
        value: "+91 94950 91659",
        href: "https://wa.me/919495091659"
    },
    {
        icon: <MapPin size={20} />,
        label: "Office",
        value: "L R Towers, Suite #i40, South Janatha Road, Palarivattom, Kochi, Kerala - 682022",
        href: "https://maps.google.com/?q=Palarivattom,Kochi,Kerala"
    }
];

const socials = [
    { icon: <FaInstagram size={18} />, href: "https://www.instagram.com/xeltrcom", label: "Instagram" },
    { icon: <FaFacebook size={18} />, href: "https://www.facebook.com/xeltrcom", label: "Facebook" },
    { icon: <FaLinkedin size={18} />, href: "https://www.linkedin.com/company/xeltrcom/", label: "LinkedIn" },
    { icon: <FaTwitter size={18} />, href: "https://x.com/xeltrcom", label: "Twitter" },
];

const services = [
    "Web Development",
    "UI/UX Design",
    "Branding",
    "AI Strategy",
    "Graphic Design",
    "Other"
];

export default function ContactPage() {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: ""
    });

    useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = resolvedTheme === "dark";

    if (!mounted) return null;

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.phone || !formData.message) {
            toast.error("Please fill in all required fields.");
            return;
        }
        setSubmitting(true);
        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify({
                    access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
                    subject: `New Contact: ${formData.name}`,
                    from_name: "Xeltr Contact Page",
                    ...formData
                })
            });
            const result = await response.json();
            if (result.success) {
                toast.success("Message sent! We'll get back to you within 24 hours.");
                setFormData({ name: "", email: "", phone: "", service: "", message: "" });
            } else {
                toast.error("Something went wrong. Please try again.");
            }
        } catch {
            toast.error("Network error. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground relative overflow-x-clip selection:bg-primary/30 transition-colors duration-500">
            {/* Background Animations */}
            {/* Background elements removed for cleaner look */}

            <div className="relative z-10 pt-0 pb-20">
                <GridBackground />

                {/* Standardized Hero Section */}
                <section className="relative w-full h-auto py-16 md:py-20 bg-background border-b border-border/10">
                    <div className="max-w-7xl mx-auto px-6 text-center">
                        <div className="flex flex-col items-center gap-4">
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-primary font-bold tracking-[0.4em] uppercase text-[10px] bg-primary/10 px-6 py-2 rounded-[4px] border border-primary/20 w-fit mx-auto"
                            >
                                Get In Touch
                            </motion.p>
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-4xl md:text-[64px] font-bold leading-[1.1] uppercase tracking-tighter mb-6 mt-6"
                            >
                                Let&apos;s Build Something <span className="text-primary">Amazing</span>
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-muted-foreground text-base md:text-lg font-medium leading-relaxed max-w-2xl mb-10 mx-auto"
                            >
                                Have a project in mind? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
                            </motion.p>
                        </div>
                    </div>
                </section>

                <section id="contact-form" className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

                        {/* Left Side: Contact Information */}
                        <div className="space-y-12">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="space-y-4"
                            >
                                <h2 className="text-[42px] font-bold uppercase tracking-tighter leading-tight">
                                    Contact <span className="text-primary">Information</span>
                                </h2>
                                <p className="text-muted-foreground text-sm font-medium leading-relaxed">
                                    Fill out the form and our team will get back to you within 24 hours.
                                </p>
                            </motion.div>

                            <motion.div
                                variants={stagger}
                                initial="hidden"
                                animate="show"
                                className="space-y-6"
                            >
                                {contactInfo.map((info, i) => (
                                    <motion.a
                                        key={i}
                                        href={info.href}
                                        variants={fadeUp}
                                        whileHover={{ y: -5 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="group relative bg-card/40 backdrop-blur-md border border-border/50 p-6 md:p-8 rounded-[20px] shadow-xl shadow-black/5 hover:border-primary/50 transition-all duration-500 flex items-start gap-6 overflow-hidden cursor-pointer"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[40px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors duration-700 pointer-events-none" />

                                        <div className="w-14 h-14 shrink-0 rounded-[14px] bg-background/50 backdrop-blur-sm flex items-center justify-center text-primary border border-border/50 group-hover:bg-primary group-hover:text-white group-hover:scale-110 group-hover:border-primary/50 transition-all duration-500 shadow-sm relative z-10">
                                            <div className="group-hover:rotate-12 transition-transform duration-500">
                                                {info.icon}
                                            </div>
                                        </div>
                                        <div className="space-y-2 relative z-10 flex-1">
                                            <p className="text-[10px] font-black tracking-widest uppercase text-primary/70 group-hover:text-primary transition-colors">{info.label}</p>
                                            <p className="text-foreground text-sm font-bold leading-relaxed max-w-[280px] group-hover:translate-x-1 transition-transform duration-500">
                                                {info.value}
                                            </p>
                                        </div>
                                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] w-0 group-hover:w-[60%] transition-all duration-700 rounded-t-full bg-primary" />
                                    </motion.a>
                                ))}
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="space-y-8 pt-8 border-t border-border/50"
                            >
                                <div className="flex flex-col gap-2">
                                    <h3 className="text-[10px] font-black tracking-widest uppercase text-primary">Social Connectivity</h3>
                                    <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">Connect with our digital ecosystem</p>
                                </div>

                                <div className="flex flex-wrap gap-4">
                                    {socials.map((social, i) => (
                                        <motion.a
                                            key={i}
                                            href={social.href}
                                            whileHover={{ y: -5, scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="w-14 h-14 flex items-center justify-center rounded-[14px] bg-card/40 backdrop-blur-md border border-border/50 text-muted-foreground hover:text-white hover:bg-primary hover:border-primary hover:shadow-[0_10px_30px_rgba(37,99,235,0.3)] transition-all duration-500 group relative"
                                        >
                                            <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[14px]" />
                                            <div className="relative z-10 text-xl group-hover:rotate-12 transition-transform duration-500">
                                                {social.icon}
                                            </div>

                                            {/* Tooltip-like Label */}
                                            <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[8px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap bg-background/80 backdrop-blur-md border border-border/50 px-3 py-1.5 rounded-[6px] shadow-xl">
                                                {social.label}
                                            </span>
                                        </motion.a>
                                    ))}
                                </div>
                            </motion.div>
                        </div>

                        {/* Right Side: Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="group relative bg-card/40 backdrop-blur-md border border-border/50 p-8 md:p-10 rounded-[24px] shadow-2xl shadow-black/5 transition-all duration-500 hover:border-primary/50 overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors duration-700 pointer-events-none" />
                            
                            <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold flex items-center gap-1">
                                        Full Name <span className="text-primary">*</span>
                                    </label>
                                    <div className="relative group/input">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within/input:text-primary group-focus-within/input:scale-110 transition-all duration-300" size={18} />
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            placeholder="John Doe"
                                            className="w-full bg-background/50 backdrop-blur-sm border border-border/50 rounded-[12px] pl-12 pr-6 py-4 text-sm focus:outline-none focus:border-primary/50 focus:bg-background hover:border-border transition-all duration-300 placeholder:text-muted-foreground/30 focus:shadow-[0_0_20px_rgba(37,99,235,0.1)]"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold flex items-center gap-1">
                                        Email Address <span className="text-primary">*</span>
                                    </label>
                                    <div className="relative group/input">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within/input:text-primary group-focus-within/input:scale-110 transition-all duration-300" size={18} />
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="john@example.com"
                                            className="w-full bg-background/50 backdrop-blur-sm border border-border/50 rounded-[12px] pl-12 pr-6 py-4 text-sm focus:outline-none focus:border-primary/50 focus:bg-background hover:border-border transition-all duration-300 placeholder:text-muted-foreground/30 focus:shadow-[0_0_20px_rgba(37,99,235,0.1)]"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold flex items-center gap-1">
                                        Phone Number <span className="text-primary">*</span>
                                    </label>
                                    <div className="relative group/input">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within/input:text-primary group-focus-within/input:scale-110 transition-all duration-300" size={18} />
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                            placeholder="+91 94950 91659"
                                            className="w-full bg-background/50 backdrop-blur-sm border border-border/50 rounded-[12px] pl-12 pr-6 py-4 text-sm focus:outline-none focus:border-primary/50 focus:bg-background hover:border-border transition-all duration-300 placeholder:text-muted-foreground/30 focus:shadow-[0_0_20px_rgba(37,99,235,0.1)]"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold flex items-center gap-1">
                                        Select Service <span className="text-primary">*</span>
                                    </label>
                                    <div className="relative group/input">
                                        <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within/input:text-primary group-focus-within/input:scale-110 transition-all duration-300 pointer-events-none" size={18} />
                                        <select
                                            name="service"
                                            value={formData.service}
                                            onChange={handleChange}
                                            className="w-full bg-background/50 backdrop-blur-sm border border-border/50 rounded-[12px] pl-12 pr-10 py-4 text-sm focus:outline-none focus:border-primary/50 focus:bg-background hover:border-border transition-all duration-300 appearance-none cursor-pointer focus:shadow-[0_0_20px_rgba(37,99,235,0.1)]"
                                        >
                                            <option value="" disabled>Select a service</option>
                                            {services.map((service) => (
                                                <option key={service} value={service} className="bg-background">{service}</option>
                                            ))}
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                                            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold flex items-center gap-1">
                                        Project Details <span className="text-primary">*</span>
                                    </label>
                                    <div className="relative group/input">
                                        <MessageSquare className="absolute left-4 top-4 text-muted-foreground group-focus-within/input:text-primary group-focus-within/input:scale-110 transition-all duration-300" size={18} />
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows={5}
                                            required
                                            placeholder="Tell us about your project..."
                                            className="w-full bg-background/50 backdrop-blur-sm border border-border/50 rounded-[12px] pl-12 pr-6 py-4 text-sm focus:outline-none focus:border-primary/50 focus:bg-background hover:border-border transition-all duration-300 placeholder:text-muted-foreground/30 resize-none focus:shadow-[0_0_20px_rgba(37,99,235,0.1)]"
                                        ></textarea>
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="w-full bg-primary text-white py-4 rounded-[12px] font-black uppercase tracking-widest text-xs hover:brightness-110 active:scale-[0.98] hover:shadow-[0_10px_30px_rgba(37,99,235,0.3)] transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 group overflow-hidden relative disabled:opacity-70"
                                    >
                                        <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                                        <span className="relative z-10">{submitting ? "Sending..." : "Send Message"}</span>
                                        {submitting
                                            ? <Loader2 size={14} className="relative z-10 animate-spin" />
                                            : <Send size={14} className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        }
                                    </button>
                                </div>
                            </form>
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] w-0 group-hover:w-[60%] transition-all duration-700 rounded-t-full bg-primary" />
                        </motion.div>
                    </div>
                </section>
            </div>
        </div>
    );
}
