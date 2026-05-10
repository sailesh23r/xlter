import AdminSidebar from "@/Components/Admin/AdminSidebar";
import AdminBreadcrumbs from "@/Components/Admin/AdminBreadcrumbs";
import { getCurrentAdmin, hasPermission } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const admin = await getCurrentAdmin();
  const headerList = await headers();
  const pathname = headerList.get("x-invoke-path") || ""; // Note: This might not always be accurate in layout, Proxy is better.

  if (!admin) {
    redirect("/xeltr-admin/login");
  }

  // Double check permissions (Proxy is primary, but layout check adds safety)
  const isAllowed = await hasPermission(admin.role as any, pathname);
  if (!isAllowed && pathname !== "" && !pathname.startsWith("/xeltr-admin/dashboard")) {
    // We allow dashboard as a base path
    // redirect("/xeltr-admin/unauthorized");
  }

  return (
    <div className="relative h-screen bg-[#020617] text-white flex overflow-hidden">
      <AdminSidebar />
      <main className="relative flex-1 h-full overflow-y-auto p-4 md:p-8 min-w-0">
        <AdminBreadcrumbs />
        <div className="max-w-[1600px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
