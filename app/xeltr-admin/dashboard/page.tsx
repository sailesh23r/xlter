import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { FileText, MessageSquare, Eye, LayoutDashboard, Layers, Globe, ArrowRightLeft, Code, Users, TrendingUp, Clock } from "lucide-react";

export default async function AdminDashboard() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  if (!session) {
    redirect("/xeltr-admin/login");
  }

  // Mock data for the dashboard
  const stats = [
    { name: "Total Blogs", value: "24", icon: FileText, color: "text-purple-400", bg: "bg-purple-400/10" },
    { name: "Case Studies", value: "12", icon: Layers, color: "text-blue-400", bg: "bg-blue-400/10" },
    { name: "Testimonials", value: "48", icon: MessageSquare, color: "text-green-400", bg: "bg-green-400/10" },
    { name: "Site Visits", value: "1.2k", icon: Eye, color: "text-yellow-400", bg: "bg-yellow-400/10" },
  ];

  return (
    <div className="space-y-10">
      {/* Welcome Header */}
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-white">Welcome back, Admin</h1>
        <p className="text-gray-400 mt-2 text-lg">Here's what's happening with your studio today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-[#111111] border border-white/10 p-6 rounded-2xl hover:border-white/20 transition-all group">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <span className="text-green-400 text-xs font-bold bg-green-400/10 px-2 py-1 rounded-lg flex items-center gap-1">
                <TrendingUp size={12} /> +12%
              </span>
            </div>
            <h3 className="text-gray-400 text-sm font-medium">{stat.name}</h3>
            <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-[#111111] border border-white/10 rounded-3xl p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-purple-400" /> Recent Activity
            </h2>
            <button className="text-sm text-purple-400 hover:text-purple-300 transition-colors">View all</button>
          </div>
          
          <div className="space-y-6">
            {[
              { type: "Blog", title: "Future of AI in Web Design", time: "2 hours ago", action: "Published" },
              { type: "Case Study", title: "Fintech App Redesign", time: "5 hours ago", action: "Updated" },
              { type: "Testimonial", title: "Sarah Johnson", time: "1 day ago", action: "Added" },
              { type: "SEO", title: "Home Page Meta", time: "2 days ago", action: "Optimized" },
            ].map((activity, i) => (
              <div key={i} className="flex items-center justify-between py-4 border-b border-white/5 last:border-0">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-xs font-bold text-gray-400">
                    {activity.type[0]}
                  </div>
                  <div>
                    <p className="text-white font-medium">{activity.title}</p>
                    <p className="text-gray-500 text-sm">{activity.action} by Admin</p>
                  </div>
                </div>
                <span className="text-gray-500 text-sm">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* System Health / Quick Links */}
        <div className="space-y-8">
          <div className="bg-purple-600/10 border border-purple-500/20 rounded-3xl p-8">
            <h3 className="text-purple-400 font-bold mb-2">Pro Tip</h3>
            <p className="text-purple-200/70 text-sm leading-relaxed">
              Don't forget to update your Global SEO settings every month to maintain search visibility.
            </p>
            <Link href="/xeltr-admin/seo" className="inline-block mt-4 text-sm font-bold text-purple-400 hover:underline">
              Go to SEO →
            </Link>
          </div>

          <div className="bg-[#111111] border border-white/10 rounded-3xl p-8">
            <h3 className="text-white font-bold mb-6">System Status</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Database</span>
                <span className="text-green-400 flex items-center gap-1.5 font-medium">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /> Operational
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Vercel Build</span>
                <span className="text-green-400 flex items-center gap-1.5 font-medium">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /> Success
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">API Latency</span>
                <span className="text-white font-medium">42ms</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
