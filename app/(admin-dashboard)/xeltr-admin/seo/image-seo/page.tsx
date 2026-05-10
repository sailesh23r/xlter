"use client";

import { useState, useEffect } from "react";
import { 
    Image as ImageIcon, 
    Search, 
    Filter, 
    Save, 
    AlertCircle, 
    CheckCircle2, 
    Edit,
    Table as TableIcon
} from "lucide-react";
import { 
    SeoPageHeader, 
    SeoTable, 
    SeoStatusBadge, 
    SeoSectionCard 
} from "@/Components/Admin/Seo/SeoComponents";
import Image from "next/image";

interface MediaItem {
    _id: string;
    url: string;
    filename: string;
    alt: string;
    title: string;
    caption: string;
    size: number;
    dimensions: string;
}

export default function ImageSeoPage() {
    const [media, setMedia] = useState<MediaItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const fetchMedia = async () => {
            try {
                const res = await fetch("/api/admin/system/media"); // Using existing media API
                const data = await res.json();
                if (data.success) {
                    setMedia(data.media);
                }
            } catch (err) {
                console.error("Failed to fetch media:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchMedia();
    }, []);

    const handleUpdate = async (item: MediaItem) => {
        setIsSaving(true);
        try {
            const res = await fetch(`/api/admin/system/media?id=${item._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(item),
            });
            const data = await res.json();
            if (data.success) {
                setMedia(media.map(m => m._id === item._id ? item : m));
                setSelectedItem(null);
            }
        } catch (err) {
            console.error("Update failed:", err);
        } finally {
            setIsSaving(false);
        }
    };

    const isSeoFriendly = (filename: string) => {
        // Simple check: lowercase, no spaces, uses hyphens
        return /^[a-z0-9-]+(\.[a-z0-9]+)+$/.test(filename);
    };

    const columns = [
        {
            header: "Preview",
            accessor: (item: MediaItem) => (
                <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white/5 border border-white/10">
                    <Image src={item.url} alt={item.alt} fill className="object-cover" />
                </div>
            )
        },
        {
            header: "Filename",
            accessor: (item: MediaItem) => (
                <div className="space-y-1">
                    <p className="font-bold truncate max-w-[200px]">{item.filename}</p>
                    {isSeoFriendly(item.filename) ? (
                        <span className="text-[9px] text-green-400 font-bold uppercase tracking-widest">SEO Friendly</span>
                    ) : (
                        <span className="text-[9px] text-yellow-400 font-bold uppercase tracking-widest">Rename Recommended</span>
                    )}
                </div>
            )
        },
        {
            header: "Alt Text",
            accessor: (item: MediaItem) => (
                <div className="flex items-center gap-2">
                    {item.alt ? (
                        <span className="text-gray-400 italic line-clamp-1">"{item.alt}"</span>
                    ) : (
                        <SeoStatusBadge status="Missing ALT" type="error" />
                    )}
                </div>
            )
        },
        {
            header: "Score",
            accessor: (item: MediaItem) => {
                const score = (item.alt ? 50 : 0) + (item.title ? 30 : 0) + (isSeoFriendly(item.filename) ? 20 : 0);
                return (
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${score > 70 ? 'bg-green-500' : score > 40 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${score}%` }} />
                        </div>
                        <span className="text-[10px] font-black">{score}%</span>
                    </div>
                );
            }
        },
        {
            header: "Actions",
            className: "text-right",
            accessor: (item: MediaItem) => (
                <button 
                    onClick={() => setSelectedItem(item)}
                    className="p-2 hover:bg-white/5 rounded-xl text-gray-500 hover:text-white transition-all"
                >
                    <Edit size={18} />
                </button>
            )
        }
    ];

    return (
        <div className="space-y-8 pb-20">
            <SeoPageHeader 
                title="Image SEO" 
                description="Manage alt text, titles, and filenames to rank higher in image search."
                badge="Media Optimization"
                actions={
                    <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white font-black py-3.5 px-8 rounded-2xl transition-all border border-white/10 uppercase tracking-widest text-xs">
                        Bulk Update
                    </button>
                }
            />

            <SeoTable 
                data={media.filter(m => m.filename.toLowerCase().includes(search.toLowerCase()) || m.alt.toLowerCase().includes(search.toLowerCase()))}
                columns={columns as any}
                onSearch={setSearch}
                searchPlaceholder="Search media by filename or alt text..."
            />

            {/* Edit Modal */}
            {selectedItem && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setSelectedItem(null)} />
                    <div className="relative w-full max-w-4xl bg-[#020617] border border-white/10 rounded-[3rem] shadow-2xl overflow-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-2">
                            {/* Preview Side */}
                            <div className="bg-black/40 p-10 flex flex-col items-center justify-center border-r border-white/5">
                                <div className="relative w-full aspect-square rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                                    <Image src={selectedItem.url} alt={selectedItem.alt} fill className="object-contain" />
                                </div>
                                <div className="mt-8 w-full space-y-4">
                                    <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-gray-500">
                                        <span>Dimensions</span>
                                        <span className="text-white">{selectedItem.dimensions || "1920x1080"}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-gray-500">
                                        <span>File Size</span>
                                        <span className="text-white">{(selectedItem.size / 1024).toFixed(2)} KB</span>
                                    </div>
                                </div>
                            </div>

                            {/* Form Side */}
                            <div className="p-10 space-y-8">
                                <div>
                                    <h3 className="text-2xl font-black text-white">Optimize Image</h3>
                                    <p className="text-gray-500 text-sm mt-1">Update image metadata for better SEO indexing.</p>
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Alt Text (Critical)</label>
                                        <input 
                                            type="text" 
                                            value={selectedItem.alt}
                                            onChange={(e) => setSelectedItem({...selectedItem, alt: e.target.value})}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 px-5 text-sm text-white outline-none focus:border-blue-500/50"
                                            placeholder="Describe the image for screen readers and search engines..."
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Title Attribute</label>
                                        <input 
                                            type="text" 
                                            value={selectedItem.title}
                                            onChange={(e) => setSelectedItem({...selectedItem, title: e.target.value})}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 px-5 text-sm text-white outline-none focus:border-blue-500/50"
                                            placeholder="Image title for tooltips..."
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Caption</label>
                                        <textarea 
                                            rows={3}
                                            value={selectedItem.caption}
                                            onChange={(e) => setSelectedItem({...selectedItem, caption: e.target.value})}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 px-5 text-sm text-white outline-none focus:border-blue-500/50 resize-none"
                                            placeholder="Displayed below the image..."
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <button 
                                        onClick={() => setSelectedItem(null)}
                                        className="flex-1 py-4 bg-white/5 border border-white/10 text-gray-400 font-bold rounded-2xl hover:bg-white/10 transition-all uppercase tracking-widest text-xs"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        onClick={() => handleUpdate(selectedItem)}
                                        disabled={isSaving}
                                        className="flex-1 py-4 bg-white text-black font-black rounded-2xl hover:scale-105 transition-all shadow-xl uppercase tracking-widest text-xs disabled:opacity-50"
                                    >
                                        {isSaving ? "Saving..." : "Save Changes"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
