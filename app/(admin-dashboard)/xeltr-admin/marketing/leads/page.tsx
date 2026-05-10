"use client";

import { useState, useEffect } from "react";
import { 
    Users, 
    Search, 
    Download, 
    Mail, 
    Phone, 
    Tag, 
    Calendar, 
    MoreHorizontal,
    UserPlus,
    Filter,
    CheckCircle2,
    Clock,
    X
} from "lucide-react";
import { 
    MarketingHeader, 
    MarketingTable, 
    MarketingStatusBadge, 
    MarketingFilterBar 
} from "@/Components/Admin/Marketing/MarketingComponents";

interface Lead {
    _id: string;
    name: string;
    email: string;
    phone: string;
    source: string;
    status: "New" | "Contacted" | "Qualified" | "Converted" | "Closed";
    createdAt: string;
}

export default function LeadsPage() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [selectedStatus, setSelectedStatus] = useState<string>("All");

    useEffect(() => {
        const fetchLeads = async () => {
            try {
                const res = await fetch("/api/admin/marketing/leads");
                const json = await res.json();
                if (json.success) setLeads(json.leads);
            } catch (err) {
                console.error("Failed to fetch leads:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchLeads();
    }, []);

    const updateStatus = async (id: string, status: string) => {
        try {
            await fetch(`/api/admin/marketing/leads?id=${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            });
            setLeads(leads.map(l => l._id === id ? { ...l, status: status as any } : l));
        } catch (err) {
            console.error("Status update failed:", err);
        }
    };

    const handleExport = () => {
        const headers = ["Name", "Email", "Phone", "Source", "Status", "Date"];
        const rows = leads.map(l => [
            l.name,
            l.email,
            l.phone,
            l.source,
            l.status,
            new Date(l.createdAt).toLocaleDateString()
        ]);
        
        const csvContent = "data:text/csv;charset=utf-8," 
            + headers.join(",") + "\n"
            + rows.map(e => e.join(",")).join("\n");
            
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `leads_export_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const filteredLeads = leads.filter(l => 
        (l.name.toLowerCase().includes(search.toLowerCase()) || l.email.toLowerCase().includes(search.toLowerCase())) &&
        (selectedStatus === "All" || l.status === selectedStatus)
    );

    const getStatusType = (status: string) => {
        switch (status) {
            case "Converted": return "success";
            case "Closed": return "error";
            case "Qualified": return "warning";
            case "Contacted": return "info";
            default: return "neutral";
        }
    };

    return (
        <div className="space-y-8 pb-20">
            <MarketingHeader 
                title="Leads Management" 
                description="Track and manage potential customers across all marketing channels."
                badge="CRM Lite"
                actions={
                    <button 
                        onClick={handleExport}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-black py-3.5 px-8 rounded-2xl transition-all shadow-xl shadow-blue-600/20 uppercase tracking-widest text-xs"
                    >
                        <Download size={18} />
                        <span>Export CSV</span>
                    </button>
                }
            />

            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input 
                        type="text" 
                        placeholder="Search leads by name or email..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-5 text-sm text-white outline-none focus:border-blue-500/50"
                    />
                </div>
                <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
                    {["All", "New", "Contacted", "Qualified", "Converted", "Closed"].map((s) => (
                        <button
                            key={s}
                            onClick={() => setSelectedStatus(s)}
                            className={`px-5 py-3.5 rounded-2xl border text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                                selectedStatus === s 
                                    ? "bg-blue-600 border-blue-500 text-white" 
                                    : "bg-white/5 border-white/10 text-gray-500 hover:text-white"
                            }`}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>

            {loading ? (
                <div className="p-20 text-center text-gray-500 uppercase tracking-widest animate-pulse font-black">Syncing CRM Data...</div>
            ) : filteredLeads.length === 0 ? (
                <div className="bg-[#020617] border border-white/10 rounded-[40px] p-20 text-center flex flex-col items-center justify-center space-y-4">
                    <div className="w-16 h-16 rounded-3xl bg-blue-500/10 flex items-center justify-center text-blue-500 mb-4">
                        <Users size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-white">No leads available.</h3>
                    <p className="text-gray-500 max-w-sm">Once potential customers fill out forms on your site or landing pages, they will appear here.</p>
                </div>
            ) : (
                <MarketingTable headers={["Customer Info", "Contact Details", "Source", "Status", "Date Received", "Actions"]}>
                    {filteredLeads.map((lead) => (
                        <tr key={lead._id} className="group hover:bg-white/[0.02] transition-colors">
                            <td className="px-8 py-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-white/10 flex items-center justify-center text-blue-400 font-black text-xs">
                                        {lead.name.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="text-white font-bold">{lead.name}</span>
                                </div>
                            </td>
                            <td className="px-8 py-6 space-y-1">
                                <div className="flex items-center gap-2 text-xs text-gray-400">
                                    <Mail size={12} className="text-blue-500" />
                                    {lead.email}
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-400">
                                    <Phone size={12} className="text-gray-600" />
                                    {lead.phone || "N/A"}
                                </div>
                            </td>
                            <td className="px-8 py-6">
                                <div className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                                    <Tag size={12} className="text-blue-500" />
                                    {lead.source}
                                </div>
                            </td>
                            <td className="px-8 py-6">
                                <select 
                                    value={lead.status}
                                    onChange={(e) => updateStatus(lead._id, e.target.value)}
                                    className={`bg-transparent outline-none border-none p-0 text-[9px] font-black uppercase tracking-widest cursor-pointer ${
                                        lead.status === "Converted" ? "text-green-400" : 
                                        lead.status === "Closed" ? "text-red-400" :
                                        lead.status === "Qualified" ? "text-orange-400" : "text-blue-400"
                                    }`}
                                >
                                    <option value="New">New</option>
                                    <option value="Contacted">Contacted</option>
                                    <option value="Qualified">Qualified</option>
                                    <option value="Converted">Converted</option>
                                    <option value="Closed">Closed</option>
                                </select>
                            </td>
                            <td className="px-8 py-6">
                                <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                                    <Calendar size={12} />
                                    {new Date(lead.createdAt).toLocaleDateString()}
                                </div>
                            </td>
                            <td className="px-8 py-6 text-right">
                                <button className="p-2 hover:bg-white/5 rounded-xl text-gray-500 hover:text-white transition-all">
                                    <MoreHorizontal size={18} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </MarketingTable>
            )}
        </div>
    );
}
