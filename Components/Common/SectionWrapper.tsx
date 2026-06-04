import { ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
  noPadding?: boolean;
}

export function SectionWrapper({
  children,
  className = "",
  containerClassName = "",
  id,
  noPadding = false,
}: SectionWrapperProps) {
  return (
    <section 
      id={id} 
      className={`relative w-full ${noPadding ? "" : "section-padding"} ${className}`}
    >
      <div className={`max-w-7xl mx-auto container-padding w-full ${containerClassName}`}>
        {children}
      </div>
    </section>
  );
}
