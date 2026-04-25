"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { motion } from "framer-motion";
import Script from "next/script";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://xlter.com";

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
  if (pathname.startsWith("/xeltr-admin")) return null;

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    if (items) return items;

    const paths = pathname.split("/").filter((path) => path !== "");
    return paths.map((path, index) => {
      const href = `/${paths.slice(0, index + 1).join("/")}`;
      const label = path
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
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
        "item": BASE_URL,
      },
      ...breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": crumb.label,
        "item": `${BASE_URL}${crumb.href}`,
      })),
    ],
  };

  return (
    <div className="w-full pt-28 md:pt-32 bg-background">
      <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-6 pt-0 pb-0">
        <Script
          id="breadcrumb-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ol className="flex flex-wrap items-center gap-y-2 text-xs md:text-sm font-medium tracking-wide">
          <li>
            <Link
              href="/"
              className="flex items-center text-muted-foreground hover:text-primary transition-colors"
            >
              <Home size={14} className="mr-1.5" />
              <span className="truncate">Home</span>
            </Link>
          </li>
          {breadcrumbs.map((crumb, index) => (
            <li key={crumb.href} className="flex items-center">
              <ChevronRight size={12} className="mx-2 text-muted-foreground/60" />
              {index === breadcrumbs.length - 1 ? (
                <span className="text-primary font-semibold truncate max-w-[120px] md:max-w-[200px]" aria-current="page" title={crumb.label}>
                  {crumb.label}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className="text-muted-foreground hover:text-primary transition-colors truncate max-w-[120px] md:max-w-[200px]"
                  title={crumb.label}
                >
                  {crumb.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}
