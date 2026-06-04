import { ReactNode } from "react";
import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: ReactNode;
  subtitle?: ReactNode;
  label?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  label,
  centered = false,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`flex flex-col ${centered ? "items-center text-center mx-auto" : "items-start text-left"} mb-12 sm:mb-16 lg:mb-20 gap-5 max-w-3xl ${className}`}>
      {label && (
        <div className="px-3 py-1.5 rounded-full text-[11px] md:text-xs font-semibold tracking-widest uppercase border border-primary/20 text-primary bg-primary/[0.03] w-fit">
          {label}
        </div>
      )}
      <h2 className="text-section font-semibold text-foreground tracking-tight leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-body text-muted-foreground opacity-80 leading-relaxed font-normal max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
