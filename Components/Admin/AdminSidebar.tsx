"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Search,
  Megaphone,
  Gauge,
  Settings,
  Home,
  Sun,
  Grid2X2,
  Menu,
  ChevronDown,
  ChevronRight,
  BarChart3,
  LogOut,
} from "lucide-react";
import { useState, useEffect } from "react";
import { logoutAdmin } from "@/app/(admin-dashboard)/xeltr-admin/actions";

const menu = [
  {
    title: "Overview",
    href: "/xeltr-admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Content",
    icon: FileText,
    children: [
      { title: "Blogs", href: "/xeltr-admin/content/blog" },
      { title: "Case Studies", href: "/xeltr-admin/content/casestudy" },
      { title: "Testimonials", href: "/xeltr-admin/content/testimonials" },
    ],
  },
  {
    title: "SEO",
    icon: Search,
    children: [
      {
        title: "On Page",
        icon: ChevronRight,
        isGroup: true,
        children: [
          { title: "Homepage", href: "/xeltr-admin/seo/homepage" },
          { title: "Services", href: "/xeltr-admin/seo/services" },
          { title: "Case Study", href: "/xeltr-admin/seo/case-study" },
          { title: "About", href: "/xeltr-admin/seo/about" },
          { title: "Contact", href: "/xeltr-admin/seo/contact" },
        ],
      },
      {
        title: "Control",
        icon: ChevronRight,
        isGroup: true,
        children: [
          { title: "Schema Markup", href: "/xeltr-admin/seo/schema" },
          { title: "Technical SEO", href: "/xeltr-admin/seo/technical" },
          { title: "Image SEO", href: "/xeltr-admin/seo/image-seo" },
          { title: "URL & Redirects", href: "/xeltr-admin/seo/url-redirects" },
          { title: "Header Scripts", href: "/xeltr-admin/seo/header-scripts" },
          { title: "404 Page", href: "/xeltr-admin/seo/404" },
          { title: "Security & Indexing", href: "/xeltr-admin/seo/security-indexing" },
        ],
      },
    ],
  },
  {
    title: "Marketing",
    icon: BarChart3,
    children: [
      { title: "Analytics", href: "/xeltr-admin/marketing/analytics" },
      { title: "Landing Pages", href: "/xeltr-admin/marketing/landing-pages" },
      { title: "Leads", href: "/xeltr-admin/marketing/leads" },
    ],
  },
  {
    title: "Settings",
    icon: Settings,
    children: [
      { title: "General", href: "/xeltr-admin/settings/general" },
      { title: "SEO Settings", href: "/xeltr-admin/settings/seo" },
      { title: "Security", href: "/xeltr-admin/settings/security" },
      { title: "Users & Roles", href: "/xeltr-admin/settings/users" },
      { title: "Integrations", href: "/xeltr-admin/settings/integrations" },
      { title: "Backup & Restore", href: "/xeltr-admin/settings/backup" },
    ],
  },
];

const systemMenu = [
  { title: "Users & Roles", href: "/xeltr-admin/system/users", icon: Settings },
  { title: "General Settings", href: "/xeltr-admin/system/settings", icon: Settings },
  { title: "Backup", href: "/xeltr-admin/system/backup", icon: Settings },
  { title: "History Logs", href: "/xeltr-admin/system/history", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const isSystemPage = pathname.startsWith("/xeltr-admin/system");
  const isSettingsPage = pathname.startsWith("/xeltr-admin/settings");
  const isPerformancePage = pathname.startsWith("/xeltr-admin/performance");
  const [open, setOpen] = useState<string>("Content");
  const [openGroup, setOpenGroup] = useState<string>("On Page");
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  // Auto-open the correct section based on current route
  useEffect(() => {
    if (pathname.startsWith("/xeltr-admin/seo")) setOpen("SEO");
    else if (pathname.startsWith("/xeltr-admin/marketing")) setOpen("Marketing");
    else if (pathname.startsWith("/xeltr-admin/content")) setOpen("Content");
    else if (pathname.startsWith("/xeltr-admin/settings")) { setOpen("Settings"); setIsCollapsed(false); }
    else if (pathname.startsWith("/xeltr-admin/performance")) { setOpen("Performance"); setIsCollapsed(false); }
  }, [pathname]);

  const handleSettingsClick = () => {
    setOpen("Settings");
    setIsCollapsed(false);
  };

  const handlePerformanceClick = () => {
    setOpen("Performance");
    setIsCollapsed(false);
  };

  return (
    <aside className="sticky top-0 flex h-screen bg-[#020617] text-white flex-shrink-0">
      {/* Icon Rail */}
      <div className="relative z-50 flex w-24 flex-col items-center border-r border-white/10 py-8">
        <button className="mb-10 flex h-14 w-14 items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors overflow-hidden">
          <img src="/Transparent-06.png" alt="Xeltr" className="w-10 h-10 object-contain" />
        </button>

        <div className="space-y-6">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`flex h-14 w-14 items-center justify-center rounded-full transition-colors ${
              isCollapsed ? "bg-white/10 hover:bg-white/20" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            <Menu />
          </button>
          <Link
            href="/xeltr-admin/dashboard"
            className={`group relative flex h-14 w-14 items-center justify-center rounded-full transition-colors ${
              pathname === "/xeltr-admin/dashboard" ? "bg-blue-600 text-white" : "bg-white/10 hover:bg-white/20"
            }`}
          >
            <Grid2X2 />
            <div className="pointer-events-none absolute left-full top-1/2 z-50 ml-4 -translate-y-1/2 rounded-md border border-white/10 bg-black/50 px-3 py-1.5 text-sm font-medium text-white opacity-0 shadow-xl backdrop-blur-md transition-opacity group-hover:opacity-100 whitespace-nowrap">
              Dashboard
            </div>
          </Link>
          <Link
            href="/xeltr-admin/performance/core-web-vitals"
            onClick={handlePerformanceClick}
            className={`group relative flex h-14 w-14 items-center justify-center rounded-full transition-colors ${
              pathname.startsWith("/xeltr-admin/performance") ? "bg-blue-600 text-white" : "bg-white/10 hover:bg-white/20"
            }`}
          >
            <Gauge />
            <div className="pointer-events-none absolute left-full top-1/2 z-50 ml-4 -translate-y-1/2 rounded-md border border-white/10 bg-black/50 px-3 py-1.5 text-sm font-medium text-white opacity-0 shadow-xl backdrop-blur-md transition-opacity group-hover:opacity-100 whitespace-nowrap">
              Performance
            </div>
          </Link>
          <Link
            href="/xeltr-admin/settings/general"
            onClick={handleSettingsClick}
            className={`group relative flex h-14 w-14 items-center justify-center rounded-full transition-colors ${
              pathname.startsWith("/xeltr-admin/settings") || pathname.startsWith("/xeltr-admin/system") ? "bg-blue-600 text-white" : "bg-white/10 hover:bg-white/20"
            }`}
          >
            <Settings />
            <div className="pointer-events-none absolute left-full top-1/2 z-50 ml-4 -translate-y-1/2 rounded-md border border-white/10 bg-black/50 px-3 py-1.5 text-sm font-medium text-white opacity-0 shadow-xl backdrop-blur-md transition-opacity group-hover:opacity-100 whitespace-nowrap">
              Settings
            </div>
          </Link>
        </div>

        <div className="mt-auto space-y-6">
          <div className="h-px w-14 bg-white/10" />
          <Link
            href="/"
            className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <Home />
            <div className="pointer-events-none absolute left-full top-1/2 z-50 ml-4 -translate-y-1/2 rounded-md border border-white/10 bg-black/50 px-3 py-1.5 text-sm font-medium text-white opacity-0 shadow-xl backdrop-blur-md transition-opacity group-hover:opacity-100 whitespace-nowrap">
              Live site
            </div>
          </Link>
          <button
            onClick={() => logoutAdmin()}
            className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10 hover:bg-red-500/20 text-red-500 transition-colors"
          >
            <LogOut />
            <div className="pointer-events-none absolute left-full top-1/2 z-50 ml-4 -translate-y-1/2 rounded-md border border-red-500/10 bg-black/50 px-3 py-1.5 text-sm font-medium text-red-500 opacity-0 shadow-xl backdrop-blur-md transition-opacity group-hover:opacity-100 whitespace-nowrap">
              Secure Logout
            </div>
          </button>
          <div className="h-14 w-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-bold">AD</div>
        </div>
      </div>

      {/* Main Sidebar */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden flex flex-col border-r border-white/10 ${
          isCollapsed ? "w-0 opacity-0" : "w-64 opacity-100"
        }`}
      >
        <div className="w-64 px-4 py-8 h-full flex flex-col overflow-y-auto no-scrollbar">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center">
                <img src="/Transparent-06.png" alt="Xeltr" className="w-full h-full object-contain" />
              </div>
              <h1 className="text-3xl font-bold text-white">Xeltr</h1>
            </div>
            <button
              onClick={() => setIsCollapsed(true)}
              className="bg-blue-600 text-white p-2 rounded-lg"
            >
              <Menu size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="space-y-1 flex-1">
            {isSettingsPage || isSystemPage ? (
              <>
                <p className="px-5 pt-2 pb-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-600">Settings</p>
                {[
                  { title: "General", href: "/xeltr-admin/settings/general" },
                  { title: "SEO Settings", href: "/xeltr-admin/settings/seo" },
                  { title: "Security", href: "/xeltr-admin/settings/security" },
                  { title: "Users & Roles", href: "/xeltr-admin/settings/users" },
                  { title: "Integrations", href: "/xeltr-admin/settings/integrations" },
                  { title: "Backup & Restore", href: "/xeltr-admin/settings/backup" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative flex items-center gap-4 px-5 py-4 font-semibold transition overflow-hidden ${
                      pathname === item.href
                        ? "bg-gradient-to-r from-blue-600/20 to-transparent text-white border-l-4 border-blue-600"
                        : "text-slate-400 border-l-4 border-transparent hover:text-white hover:bg-gradient-to-r hover:from-white/5 hover:to-transparent hover:text-white hover:border-white/20"
                    }`}
                  >
                    {item.title}
                  </Link>
                ))}
              </>
            ) : isPerformancePage ? (
              <>
                <p className="px-5 pt-2 pb-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-600">Performance</p>
                {[
                  { title: "Core Web Vitals", href: "/xeltr-admin/performance/core-web-vitals" },
                  { title: "Page Speed", href: "/xeltr-admin/performance/page-speed" },
                  { title: "Image Optimization", href: "/xeltr-admin/performance/image-optimization" },
                  { title: "Cache Management", href: "/xeltr-admin/performance/cache-management" },
                  { title: "Lazy Loading", href: "/xeltr-admin/performance/lazy-loading" },
                  { title: "Monitoring", href: "/xeltr-admin/performance/monitoring" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative flex items-center gap-4 px-5 py-4 font-semibold transition overflow-hidden ${
                      pathname === item.href
                        ? "bg-gradient-to-r from-blue-600/20 to-transparent text-white border-l-4 border-blue-600"
                        : "text-slate-400 border-l-4 border-transparent hover:text-white hover:bg-gradient-to-r hover:from-white/5 hover:to-transparent hover:text-white hover:border-white/20"
                    }`}
                  >
                    {item.title}
                  </Link>
                ))}
              </>
            ) : (
              menu.map((item) => {
                const Icon = item.icon;
                const isActive =
                  item.href === pathname ||
                  item.children?.some((child: any) =>
                    child.href ? pathname.startsWith(child.href) : child.children?.some((c: any) => pathname.startsWith(c.href))
                  );

                if (!item.children) {
                  return (
                    <Link
                      key={item.title}
                      href={item.href!}
                      className={`relative flex items-center gap-4 px-5 py-4 font-semibold transition overflow-hidden ${
                        isActive
                          ? "bg-gradient-to-r from-blue-600/20 to-transparent text-white border-l-4 border-blue-600"
                          : "text-slate-400 border-l-4 border-transparent hover:bg-gradient-to-r hover:from-white/5 hover:to-transparent hover:text-white hover:border-white/20"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      {item.title}
                    </Link>
                  );
                }

                return (
                  <div key={item.title}>
                    <button
                      onClick={() => setOpen(open === item.title ? "" : item.title)}
                      className={`relative flex w-full items-center gap-4 px-5 py-4 font-semibold transition overflow-hidden ${
                        isActive
                          ? "bg-gradient-to-r from-blue-600/20 to-transparent text-white border-l-4 border-blue-600"
                          : "text-slate-400 border-l-4 border-transparent hover:bg-gradient-to-r hover:from-white/5 hover:to-transparent hover:text-white hover:border-white/20"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="flex-1 text-left">{item.title}</span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
                          open === item.title ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {open === item.title && (
                      <div className="ml-14 mt-1 space-y-1">
                        {item.children.map((child: any) => {
                          if (child.isGroup) {
                            const isGroupActive = child.children?.some((c: any) => pathname.startsWith(c.href));
                            return (
                              <div key={child.title}>
                                <button
                                  onClick={() => setOpenGroup(openGroup === child.title ? "" : child.title)}
                                  className={`flex w-full items-center justify-between px-4 py-2 text-xs font-black uppercase tracking-[0.15em] transition-colors ${
                                    isGroupActive ? "text-blue-400" : "text-gray-600 hover:text-gray-400"
                                  }`}
                                >
                                  {child.title}
                                  <ChevronDown
                                    className={`h-3 w-3 transition-transform duration-200 ${
                                      openGroup === child.title ? "rotate-180" : ""
                                    }`}
                                  />
                                </button>
                                {openGroup === child.title && (
                                  <div className="ml-3 space-y-1 border-l border-white/5 pl-3">
                                    {child.children.map((sub: any) => (
                                      <Link
                                        key={sub.href}
                                        href={sub.href}
                                        className={`block text-sm font-semibold py-2 px-2 rounded-lg transition-all duration-200 ${
                                          pathname === sub.href
                                            ? "text-blue-400 bg-blue-600/10"
                                            : "text-slate-500 hover:text-white hover:bg-white/5"
                                        }`}
                                      >
                                        {sub.title}
                                      </Link>
                                    ))}
                                  </div>
                                )}
                              </div>
                            );
                          }

                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={`block text-sm font-semibold relative border-l-2 pl-4 py-2 transition-all duration-200 ${
                                pathname === child.href
                                  ? "border-blue-500 text-blue-500"
                                  : "border-white/10 text-slate-500 hover:border-blue-500 hover:text-white"
                              }`}
                            >
                              {child.title}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </nav>
        </div>
      </div>
    </aside>
  );
}
