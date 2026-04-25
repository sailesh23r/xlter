"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { motion } from "framer-motion";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const pathname = usePathname();

  // Don't show breadcrumbs on homepage
  if (pathname === "/") return null;

  // Don't show breadcrumbs on admin pages (optional, depending on preference)
  if (pathname.startsWith("/xlter-admin")) return null;

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    if (items) return items;

    const paths = pathname.split("/").filter((path) => path !== "");
    return paths.map((path, index) => {
      const href = `/${paths.slice(0, index + 1).join("/")}`;
      const label = path
        .replace(/-/g, " ")
        .replace(/^\w/, (c) => c.toUpperCase());
      return { label, href };
    });
  };

  const breadcrumbs = generateBreadcrumbs();

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://xlter.com",
      },
      ...breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": crumb.label,
        "item": `https://xlter.com${crumb.href}`,
      })),
    ],
  };

  return (
    <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-6 pt-24 md:pt-32 pb-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ol className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-[0.2em]">
        <li>
          <Link
            href="/"
            className="flex items-center text-muted-foreground hover:text-primary transition-colors"
          >
            <Home size={12} className="mr-1" />
            Home
          </Link>
        </li>
        {breadcrumbs.map((crumb, index) => (
          <li key={crumb.href} className="flex items-center space-x-2">
            <ChevronRight size={10} className="text-muted-foreground/30" />
            {index === breadcrumbs.length - 1 ? (
              <span className="text-primary cursor-default" aria-current="page">
                {crumb.label}
              </span>
            ) : (
              <Link
                href={crumb.href}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {crumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
