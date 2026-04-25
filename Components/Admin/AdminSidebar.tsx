"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
    LayoutDashboard, 
    FileText, 
    MessageSquare, 
    Layers, 
    Globe, 
    ArrowRightLeft, 
    Code, 
    Home,
    LogOut,
    ChevronLeft,
    ChevronRight,
    Search
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { logoutAdmin } from "@/app/xlter-admin/actions";

const menuItems = [
    { name: "Dashboard", href: "/xlter-admin/dashboard", icon: LayoutDashboard },
    { name: "Blog Posts", href: "/xlter-admin/blog", icon: FileText },
    { name: "Testimonials", href: "/xlter-admin/testimonials", icon: MessageSquare },
    { name: "Case Studies", href: "/xlter-admin/casestudy", icon: Layers },
    { name: "Global SEO", href: "/xlter-admin/seo", icon: Globe },
    { name: "Redirects", href: "/xlter-admin/redirects", icon: ArrowRightLeft },
    { name: "Script Injection", href: "/xlter-admin/scripts", icon: Code },
    { name: "Landing Pages", href: "/xlter-admin/pages", icon: LayoutDashboard },
];

import { Menu } from "lucide-react";

export default function AdminSidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const [isCollapsed, setIsCollapsed] = useState(true); // Start collapsed on mobile

    const handleSignOut = async () => {
        await logoutAdmin();
    };

    return (
        <>
            {/* Mobile Toggle Button (Visible only on mobile when collapsed) */}
            <button 
                className={cn(
                    "lg:hidden fixed top-6 left-6 z-40 p-2 bg-[#111] border border-white/10 rounded-xl text-white shadow-xl transition-all",
                    !isCollapsed ? "opacity-0 pointer-events-none" : "opacity-100"
                )}
                onClick={() => setIsCollapsed(false)}
            >
                <Menu className="w-5 h-5" />
            </button>

            {/* Mobile Overlay */}
            {!isCollapsed && (
                <div 
                    className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40" 
                    onClick={() => setIsCollapsed(true)} 
                />
            )}

        <aside 
            className={cn(
                "h-screen sticky top-0 bg-[#0a0a0a] border-r border-white/10 transition-all duration-300 flex flex-col z-50",
                "fixed inset-y-0 left-0 lg:relative lg:translate-x-0 transition-transform",
                isCollapsed ? "w-20" : "w-64",
                !isCollapsed ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
            )}
        >
            {/* Header */}
            <div className="p-6 flex items-center justify-between">
                {!isCollapsed && (
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                            <span className="font-bold text-white">X</span>
                        </div>
                        <span className="font-bold text-xl tracking-tight text-white hidden lg:block">Admin</span>
                    </div>
                )}
                {isCollapsed && (
                    <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center mx-auto">
                        <span className="font-bold text-white">X</span>
                    </div>
                )}
                
                {/* Mobile Toggle inside sidebar */}
                <button 
                    className="lg:hidden p-2 bg-white/5 rounded-md text-gray-400 hover:text-white"
                    onClick={() => setIsCollapsed(!isCollapsed)}
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-grow px-4 space-y-2 mt-4">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-3 rounded-xl transition-all group",
                                isActive 
                                    ? "bg-purple-600/10 text-purple-400 border border-purple-600/20" 
                                    : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                            )}
                        >
                            <item.icon className={cn("w-5 h-5 shrink-0", isActive ? "text-purple-400" : "group-hover:scale-110 transition-transform")} />
                            {!isCollapsed && <span className="font-medium">{item.name}</span>}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer Actions */}
            <div className="p-4 border-t border-white/10 space-y-2">
                <Link
                    href="/"
                    className="flex items-center gap-3 px-3 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                >
                    <Home className="w-5 h-5 shrink-0" />
                    {!isCollapsed && <span className="font-medium">View Site</span>}
                </Link>
                
                <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-red-400/70 hover:text-red-400 hover:bg-red-400/5 transition-all"
                >
                    <LogOut className="w-5 h-5 shrink-0" />
                    {!isCollapsed && <span className="font-medium">Sign Out</span>}
                </button>

                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                >
                    {isCollapsed ? <ChevronRight className="w-5 h-5 shrink-0" /> : <ChevronLeft className="w-5 h-5 shrink-0" />}
                    {!isCollapsed && <span className="font-medium">Collapse</span>}
                </button>
            </div>
        </aside>
        </>
    );
}
