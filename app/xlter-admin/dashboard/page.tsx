import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { FileText, MessageSquare, Eye, LayoutDashboard, Layers } from "lucide-react";

export default async function AdminDashboard() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  if (!session) {
    redirect("/xlter-admin/login");
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Header */}
        <header className="flex justify-between items-center mb-12 border-b border-white/10 pb-6">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm">
              <span className="text-lg">←</span> Back to Home
            </Link>
            <div className="h-6 w-px bg-white/10" />
            <div className="flex items-center gap-3">
              <LayoutDashboard className="w-6 h-6 text-purple-400" />
              <h1 className="text-3xl font-bold tracking-tight">Xlter Admin</h1>
            </div>
          </div>
          <form
            action={async () => {
              "use server";
              const cookieStore = await cookies();
              cookieStore.delete("admin_session");
              redirect("/xlter-admin/login");
            }}
          >
            <button className="bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-xl text-sm transition-colors">
              Sign Out
            </button>
          </form>
        </header>

        {/* Quick Links */}
        <h2 className="text-lg font-semibold text-gray-300 mb-4">Manage</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Link
            href="/xlter-admin/blog"
            className="group bg-[#111111] border border-white/10 hover:border-purple-500/30 p-8 rounded-2xl transition-all hover:bg-purple-500/5"
          >
            <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-4 border border-purple-500/20">
              <FileText className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-white">Blog Posts</h3>
            <p className="text-gray-500 mt-2">
              Add, manage and remove blog articles
            </p>
          </Link>

          <Link
            href="/xlter-admin/testimonials"
            className="group bg-[#111111] border border-white/10 hover:border-indigo-500/30 p-8 rounded-2xl transition-all hover:bg-indigo-500/5"
          >
            <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-4 border border-indigo-500/20">
              <MessageSquare className="w-6 h-6 text-indigo-400" />
            </div>
            <h3 className="text-xl font-semibold text-white">Testimonials</h3>
            <p className="text-gray-500 mt-2">
              Manage client feedback and reviews
            </p>
          </Link>

          <Link
            href="/xlter-admin/casestudy"
            className="group bg-[#111111] border border-white/10 hover:border-blue-500/30 p-8 rounded-2xl transition-all hover:bg-blue-500/5"
          >
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4 border border-blue-500/20">
              <Layers className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white">Case Studies</h3>
            <p className="text-gray-500 mt-2">
              Add, manage and remove portfolio case studies
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
