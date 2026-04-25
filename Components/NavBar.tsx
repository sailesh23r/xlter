"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "./Logo";
import { Menu, X, ChevronDown, Sun, Moon, TerminalSquare, LineChart, MousePointerClick, Triangle, PenTool } from "lucide-react";
import { useTheme } from "next-themes";
import ContactModal from "./Contact/ContactModal";
import ServiceOverlay from "./ServiceOverlay";

const navLinks = [
    { name: "HOME", href: "/" },
    { name: "SERVICES", href: "#" },
    { name: "PORTFOLIO", href: "/casestudy" },
    { name: "BLOG", href: "/blog" },
    { name: "ABOUT", href: "/about" },
    { name: "CONTACT", href: "/contact" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isContactOpen, setIsContactOpen] = useState(false);
    const [isServiceOpen, setIsServiceOpen] = useState(false);
    const [isMobileServiceOpen, setIsMobileServiceOpen] = useState(false);
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Avoid hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    // Close mobile menu when resizing to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsOpen(false);
                setIsMobileServiceOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Listen for global modal triggers
    useEffect(() => {
        const handleOpen = () => setIsContactOpen(true);
        window.addEventListener('openContactModal', handleOpen);
        return () => window.removeEventListener('openContactModal', handleOpen);
    }, []);

    const toggleTheme = () => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
    };

    return (
        <header className="fixed top-4 md:top-6 inset-x-0 z-50 flex justify-center pointer-events-none px-4 md:px-0">
            <div className="relative w-full max-w-6xl md:px-6 pointer-events-auto">
                <div className="w-full flex items-center justify-between px-3 md:px-8 h-14 md:h-16 bg-background/90 backdrop-blur-2xl border border-white/10 rounded-full shadow-2xl transition-all duration-300">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 shrink-0">
                    <div className="h-5 md:h-7">
                        <Logo />
                    </div>
                </Link>

                {/* Desktop Menu */}
                <nav className="hidden md:flex items-center gap-8 text-sm font-semibold uppercase tracking-wider">
                    {navLinks.map((link) => (
                        <div key={link.name} className="relative">
                            {link.name === "SERVICES" ? (
                                <>
                                    <button
                                        onClick={() => setIsServiceOpen(!isServiceOpen)}
                                        className="relative group flex items-center gap-1 text-foreground/80 hover:text-primary transition-colors uppercase tracking-wider"
                                    >
                                        {link.name}
                                        <ChevronDown size={14} className={`mt-0.5 opacity-50 group-hover:opacity-100 transition-all ${isServiceOpen ? 'rotate-180' : ''}`} />
                                        <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
                                    </button>
                                    
                                    <ServiceOverlay 
                                        isOpen={isServiceOpen}
                                        onClose={() => setIsServiceOpen(false)}
                                    />
                                </>
                            ) : (
                                <Link
                                    href={link.href}
                                    className="relative group flex items-center gap-1 text-foreground/80 hover:text-primary transition-colors uppercase tracking-wider"
                                >
                                    {link.name}
                                    <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                            )}
                        </div>
                    ))}
                </nav>

                <div className="flex items-center gap-1 md:gap-3 shrink-0">
                    {/* Theme Toggle */}
                    {mounted && (
                        <button
                            onClick={toggleTheme}
                            className="p-2.5 rounded-full hover:bg-accent text-foreground transition-all active:scale-95"
                            aria-label="Toggle theme"
                        >
                            {resolvedTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                        </button>
                    )}

                    <button
                        onClick={() => {
                            const event = new CustomEvent('openContactModal');
                            window.dispatchEvent(event);
                        }}
                        className="hidden md:block bg-primary text-primary-foreground hover:brightness-110 active:scale-95 transition-all px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-md shadow-primary/20"
                    >
                        GET IN TOUCH
                    </button>

                    {/* Hamburger */}
                    <button
                        className="md:hidden p-2 rounded-xl bg-accent/50 text-foreground transition-colors shrink-0"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu — inside pointer-events-auto wrapper */}
            <div
                className={`absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 w-[93%] md:hidden bg-background/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 dark:border-white/10 transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-[80vh] py-6 opacity-100 pointer-events-auto" : "max-h-0 py-0 opacity-0 pointer-events-none"
                }`}
            >
                {/* Scrollable nav area */}
                <nav className="flex flex-col gap-5 px-6 text-sm font-bold uppercase tracking-widest overflow-y-auto max-h-[calc(80vh-80px)]">
                    {navLinks.map((link) => (
                        <div key={link.name} className="flex flex-col gap-3">
                            {link.name === "SERVICES" ? (
                                <>
                                    <button
                                        onClick={() => setIsMobileServiceOpen(!isMobileServiceOpen)}
                                        className="text-foreground/70 hover:text-primary transition-colors text-left w-full flex items-center justify-between"
                                    >
                                        {link.name}
                                        <ChevronDown size={16} className={`transition-transform duration-300 ${isMobileServiceOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    {/* Mobile Sub-Links (Accordion) */}
                                    <div className={`flex flex-col gap-2 pl-3 overflow-hidden transition-all duration-300 ${isMobileServiceOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                        {[
                                            { name: "Web Development", href: "/web-development", icon: TerminalSquare },
                                            { name: "AI Digital Strategy", href: "/ai-strategy", icon: LineChart },
                                            { name: "UI/UX Design", href: "/ui-ux", icon: MousePointerClick },
                                            { name: "Branding", href: "/branding", icon: Triangle },
                                            { name: "Graphic Design", href: "/graphic-design", icon: PenTool },
                                        ].map((sub) => (
                                            <Link
                                                key={sub.name}
                                                href={sub.href}
                                                onClick={() => {
                                                    setIsOpen(false);
                                                    setIsMobileServiceOpen(false);
                                                }}
                                                className="flex items-center gap-3 text-xs text-muted-foreground hover:text-primary transition-colors py-1.5 normal-case tracking-normal font-semibold"
                                            >
                                                <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center text-muted-foreground shrink-0">
                                                    <sub.icon size={13} />
                                                </div>
                                                {sub.name}
                                            </Link>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-foreground/70 hover:text-primary transition-colors"
                                >
                                    {link.name}
                                </Link>
                            )}
                        </div>
                    ))}
                </nav>

                {/* GET IN TOUCH — always pinned at bottom */}
                <div className="px-6 pt-4">
                    <button
                        onClick={() => {
                            setIsOpen(false);
                            setIsContactOpen(true);
                        }}
                        className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg shadow-primary/20"
                    >
                        GET IN TOUCH
                    </button>
                </div>
            </div>

            </div>

            <ContactModal
                isOpen={isContactOpen}
                onClose={() => setIsContactOpen(false)}
            />
        </header>
    );
}
