"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

export default function AdminBreadcrumbs() {
  const pathname = usePathname();

  if (pathname === "/xeltr-admin/dashboard") return null;

  const paths = pathname.split("/").filter((path) => path !== "");
  
  // Find index of 'Xeltr-admin' to start breadcrumbs after it, or include it as 'Dashboard'
  const adminIndex = paths.indexOf("Xeltr-admin");
  const relevantPaths = adminIndex !== -1 ? paths.slice(adminIndex + 1) : paths;

  return (
    <nav className="mb-6 flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 text-sm font-medium text-slate-400">
        <li>
          <Link href="/xeltr-admin/dashboard" className="flex items-center hover:text-white transition-colors">
            <Home className="h-4 w-4" />
          </Link>
        </li>
        {relevantPaths.map((path, index) => {
          const isLast = index === relevantPaths.length - 1;
          const href = `/xeltr-admin/${relevantPaths.slice(0, index + 1).join("/")}`;
          
          // Format label: capitalize words, replace hyphens with spaces
          const label = path
            .split("-")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");

          return (
            <li key={path} className="flex items-center">
              <ChevronRight className="h-4 w-4 mx-1 text-slate-600" />
              {isLast ? (
                <span className="text-white font-semibold">{label}</span>
              ) : (
                <Link href={href} className="hover:text-white transition-colors">
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
