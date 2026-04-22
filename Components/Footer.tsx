"use client";

import Link from "next/link";
import Logo from "./Logo";
import { ArrowUpRight, Mail, Phone, MapPin } from "lucide-react";
import { FaGithub, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Portfolio", href: "/casestudy" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const serviceLinks = [
    { name: "Web Development", href: "/web-development" },
    { name: "AI Strategy", href: "/ai-strategy" },
    { name: "UI/UX Design", href: "/ui-ux" },
    { name: "Branding", href: "/branding" },
    { name: "Graphic Design", href: "/graphic-design" },
  ];

  const socialLinks = [
    { name: "Twitter", icon: <FaTwitter size={18} />, href: "#" },
    { name: "Instagram", icon: <FaInstagram size={18} />, href: "#" },
    { name: "LinkedIn", icon: <FaLinkedin size={18} />, href: "#" },
    { name: "GitHub", icon: <FaGithub size={18} />, href: "#" },
  ];

  return (
    <footer className="w-full bg-background border-t border-border transition-colors duration-300 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        {/* Middle Section: Links & Info */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 py-16">
          
          {/* Logo & Brief */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <Link href="/" className="inline-block w-fit">
              <Logo />
            </Link>
            <p className="text-muted-foreground leading-relaxed max-w-sm font-medium">
              A premium digital agency focused on crafting beautiful, high-performance web and mobile applications for modern brands.
            </p>
            <div className="flex flex-wrap gap-3 mt-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-accent border border-border flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all hover:scale-110 shadow-sm"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="md:col-span-3">
            <h3 className="text-xs font-black uppercase tracking-widest text-foreground mb-6">
              Services
            </h3>
            <ul className="flex flex-col gap-4">
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary font-bold uppercase tracking-wider text-xs transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2">
            <h3 className="text-xs font-black uppercase tracking-widest text-foreground mb-6">
              Studio
            </h3>
            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary font-bold uppercase tracking-wider text-xs transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-3">
            <h3 className="text-xs font-black uppercase tracking-widest text-foreground mb-6">
              Get in Touch
            </h3>
            <ul className="flex flex-col gap-5">
              <li>
                <a href="mailto:connect@nextodigital.in" className="group flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    <Mail size={14} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Email</p>
                    <p className="text-xs font-bold text-foreground">connect@nextodigital.in</p>
                  </div>
                </a>
              </li>
              <li>
                <a href="tel:+917871110997" className="group flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    <Phone size={14} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Phone</p>
                    <p className="text-xs font-bold text-foreground">+91 78711 10997</p>
                  </div>
                </a>
              </li>
              <li className="group flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-primary">
                  <MapPin size={14} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Location</p>
                  <p className="text-xs font-bold text-foreground leading-relaxed">
                    10/14 Syndicate Apartments,<br /> T.Nagar, Chennai - 600017
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-border text-xs font-bold uppercase tracking-widest text-muted-foreground/60">
          <p>© {currentYear} Xlter. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
