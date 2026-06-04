"use client";

import { Link as LinkIcon, Check } from "lucide-react";
import { FaTwitter as Twitter, FaLinkedin as Linkedin, FaFacebook as Facebook } from "react-icons/fa";
import { useState } from "react";

interface ShareButtonsProps {
  url: string;
  title: string;
}

export default function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLinks = [
    {
      name: "Twitter",
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      color: "hover:text-sky-400 hover:border-sky-400/50 hover:bg-sky-400/10"
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
      color: "hover:text-blue-500 hover:border-blue-500/50 hover:bg-blue-500/10"
    },
    {
      name: "Facebook",
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: "hover:text-blue-600 hover:border-blue-600/50 hover:bg-blue-600/10"
    }
  ];

  return (
    <div className="flex items-center gap-3 mt-12 pt-8 border-t border-white/10">
      <span className="text-xs font-bold uppercase tracking-widest text-gray-500 mr-2">Share</span>
      {shareLinks.map((link) => (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${link.name}`}
          className={`w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 transition-all duration-300 ${link.color}`}
        >
          <link.icon size={18} />
        </a>
      ))}
      <button
        onClick={handleCopy}
        aria-label="Copy Link"
        className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${
          copied 
            ? "border-green-500/50 bg-green-500/10 text-green-400" 
            : "border-white/10 text-gray-400 hover:text-white hover:border-white/30 hover:bg-white/5"
        }`}
      >
        {copied ? <Check size={18} /> : <LinkIcon size={18} />}
      </button>
    </div>
  );
}
