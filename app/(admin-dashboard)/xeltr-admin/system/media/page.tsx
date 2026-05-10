"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Image as ImageIcon, 
    Plus, 
    Search, 
    Filter, 
    Trash2, 
    Download, 
    Info, 
    X, 
    UploadCloud, 
    Loader2,
    CheckCircle2,
    AlertCircle,
    FileImage,
    LayoutGrid,
    List,
    MoreVertical
} from "lucide-react";

interface MediaItem {
    _id: string;
    name: string;
    url: string;
    alt: string;
    type: string;
    size: number;
    category: string;
    createdAt: string;
}

export default function MediaLibrary() {
    const [media, setMedia] = useState<MediaItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
    const [isUploadOpen, setIsUploadOpen] = useState(false);
    const [toast, setToast] = useState<{ type: "success" | "error"; msg: string } | null>(null);

    const categories = ["All", "General", "Blog", "Case Study", "Testimonial", "UI/UX"];

    const showToast = useCallback((type: "success" | "error", msg: string) => {
        setToast({ type, msg });
        setTimeout(() => setToast(null), 3500);
    }, []);

    const fetchMedia = useCallback(async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (category !== "All") params.append("category", category);
            if (search) params.append("search", search);
            
            const res = await fetch(`/api/admin/system/media?${params.toString()}`);
            const data = await res.json();
            if (data.success) {
                setMedia(data.media);
            }
        } catch {
            showToast("error", "Failed to load media library");
        } finally {
            setLoading(false);
        }
    }, [category, search, showToast]);

    useEffect(() => {
        fetchMedia();
    }, [fetchMedia]);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("category", category === "All" ? "General" : category);

        try {
            const res = await fetch("/api/admin/system/media", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            if (data.success) {
                showToast("success", "File uploaded successfully");
                setIsUploadOpen(false);
                fetchMedia();
            } else {
                showToast("error", data.error || "Upload failed");
            }
        } catch {
            showToast("error", "Network error");
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this file?")) return;
        try {
            const res = await fetch(`/api/admin/system/media?id=${id}`, { method: "DELETE" });
            const data = await res.json();
            if (data.success) {
                showToast("success", "File deleted");
                setSelectedItem(null);
                fetchMedia();
            }
        } catch {
            showToast("error", "Delete failed");
        }
    };

    const formatSize = (bytes: number) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    return (
        <div className="space-y-10 min-h-screen">
            <AnimatePresence>
                {toast && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className={`fixed top-6 right-6 z-[100] flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl text-sm font-medium border backdrop-blur-xl
                            ${toast.type === "success" ? "bg-green-500/10 border-green-500/20 text-green-400" : "bg-red-500/10 border-red-500/20 text-red-400"}
                        `}
                    >
                        {toast.type === "success" ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                        {toast.msg}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-bold text-white tracking-tight flex items-center gap-3">
                        <ImageIcon className="w-10 h-10 text-purple-500" /> Media Library
                    </h1>
                    <p className="text-gray-400 mt-2 text-lg">Manage and optimize your studio's visual assets.</p>
                </div>
                <button 
                    onClick={() => setIsUploadOpen(true)}
                    className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-bold py-3.5 px-8 rounded-2xl transition-all shadow-lg shadow-purple-600/20"
                >
                    <Plus className="w-5 h-5" />
                    <span>Upload Media</span>
                </button>
            </div>

            {/* Toolbar */}
            <div className="bg-[#020617] border border-white/10 p-4 rounded-[2.5rem] flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-grow w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input 
                        type="text" 
                        placeholder="Search media files..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-11 pr-4 text-sm text-white focus:outline-none focus:border-purple-500/50"
                    />
                </div>
                
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setCategory(cat)}
                                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                                    category === cat ? "bg-white/10 text-white" : "text-gray-500 hover:text-gray-300"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                    
                    <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
                        <button 
                            onClick={() => setViewMode("grid")}
                            className={`p-2 rounded-lg transition-all ${viewMode === "grid" ? "bg-white/10 text-white" : "text-gray-500 hover:text-gray-300"}`}
                        >
                            <LayoutGrid size={18} />
                        </button>
                        <button 
                            onClick={() => setViewMode("list")}
                            className={`p-2 rounded-lg transition-all ${viewMode === "list" ? "bg-white/10 text-white" : "text-gray-500 hover:text-gray-300"}`}
                        >
                            <List size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Media Grid/List */}
            <div className="min-h-[400px]">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="w-10 h-10 animate-spin text-purple-600 mb-4" />
                        <p className="text-gray-500 font-medium">Scanning assets...</p>
                    </div>
                ) : media.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-white/[0.02] border border-dashed border-white/10 rounded-[3rem]">
                        <ImageIcon className="w-16 h-16 text-gray-800 mb-4" />
                        <p className="text-gray-500 text-lg">No media found in this category.</p>
                        <button onClick={() => setIsUploadOpen(true)} className="mt-4 text-purple-400 font-bold hover:underline">Upload your first file</button>
                    </div>
                ) : (
                    <div className={viewMode === "grid" 
                        ? "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6" 
                        : "space-y-2"
                    }>
                        {media.map((item) => (
                            <motion.div
                                key={item._id}
                                layoutId={item._id}
                                onClick={() => setSelectedItem(item)}
                                className={viewMode === "grid"
                                    ? "group relative aspect-square bg-[#020617] border border-white/10 rounded-3xl overflow-hidden cursor-pointer hover:border-purple-500/50 transition-all"
                                    : "group flex items-center gap-4 bg-[#020617] border border-white/10 p-3 rounded-2xl cursor-pointer hover:border-purple-500/50 transition-all"
                                }
                            >
                                {viewMode === "grid" ? (
                                    <>
                                        <img src={item.url} alt={item.alt} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                                            <p className="text-white text-[10px] font-bold truncate">{item.name}</p>
                                            <p className="text-gray-400 text-[8px] uppercase tracking-widest">{formatSize(item.size)}</p>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0">
                                            <img src={item.url} alt={item.alt} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-grow min-w-0">
                                            <p className="text-white text-sm font-bold truncate">{item.name}</p>
                                            <p className="text-gray-500 text-[10px]">{item.category} • {formatSize(item.size)}</p>
                                        </div>
                                        <div className="text-gray-500 text-[10px] px-4 hidden md:block">
                                            {new Date(item.createdAt).toLocaleDateString()}
                                        </div>
                                        <MoreVertical className="text-gray-600 w-4 h-4" />
                                    </>
                                )}
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* Upload Modal */}
            <AnimatePresence>
                {isUploadOpen && (
                    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                        <motion.div 
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setIsUploadOpen(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-xl bg-[#020617] border border-white/10 rounded-[3rem] shadow-2xl overflow-hidden"
                        >
                            <div className="p-10 text-center">
                                <div className="w-20 h-20 bg-purple-600/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                                    <UploadCloud className="w-10 h-10 text-purple-500" />
                                </div>
                                <h3 className="text-2xl font-bold text-white">Upload Media</h3>
                                <p className="text-gray-500 mt-2">Images, SVGs, or WebP files. Max 10MB.</p>
                                
                                <div className="mt-8 border-2 border-dashed border-white/10 rounded-[2.5rem] p-12 relative group hover:border-purple-500/50 transition-all">
                                    <input 
                                        type="file" 
                                        onChange={handleUpload}
                                        disabled={uploading}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                        accept="image/*"
                                    />
                                    {uploading ? (
                                        <div className="flex flex-col items-center gap-4">
                                            <Loader2 className="w-10 h-10 animate-spin text-purple-500" />
                                            <p className="text-white font-bold">Uploading asset...</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            <p className="text-gray-400 font-medium">Drag & drop your files here</p>
                                            <p className="text-gray-600 text-sm">or click to browse</p>
                                        </div>
                                    )}
                                </div>
                                
                                <button onClick={() => setIsUploadOpen(false)} className="mt-8 text-gray-500 hover:text-white transition-all text-sm font-bold">Cancel</button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Asset Detail Sidebar/Modal */}
            <AnimatePresence>
                {selectedItem && (
                    <div className="fixed inset-0 z-[110] flex justify-end">
                        <motion.div 
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setSelectedItem(null)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="relative w-full max-w-md h-full bg-[#0a0a0a] border-l border-white/10 shadow-2xl p-8 overflow-y-auto"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-xl font-bold text-white">Asset Details</h3>
                                <button onClick={() => setSelectedItem(null)} className="p-2 hover:bg-white/5 rounded-xl text-gray-500 hover:text-white">
                                    <X size={20} />
                                </button>
                            </div>
                            
                            <div className="aspect-video bg-white/5 rounded-3xl overflow-hidden mb-8">
                                <img src={selectedItem.url} alt={selectedItem.alt} className="w-full h-full object-contain" />
                            </div>
                            
                            <div className="space-y-6">
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 block">File Name</label>
                                    <p className="text-white font-bold break-all">{selectedItem.name}</p>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 block">Size</label>
                                        <p className="text-gray-300 font-medium">{formatSize(selectedItem.size)}</p>
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 block">Type</label>
                                        <p className="text-gray-300 font-medium uppercase">{selectedItem.type.split("/")[1]}</p>
                                    </div>
                                </div>
                                
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 block">Public URL</label>
                                    <div className="flex gap-2">
                                        <input 
                                            readOnly 
                                            value={window.location.origin + selectedItem.url} 
                                            className="flex-grow bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs text-gray-400 focus:outline-none"
                                        />
                                        <button 
                                            onClick={() => {
                                                navigator.clipboard.writeText(window.location.origin + selectedItem.url);
                                                showToast("success", "URL copied to clipboard");
                                            }}
                                            className="p-2 bg-purple-600/10 text-purple-400 border border-purple-600/20 rounded-xl hover:bg-purple-600 hover:text-white transition-all"
                                        >
                                            <Download size={16} />
                                        </button>
                                    </div>
                                </div>
                                
                                <div className="pt-6 border-t border-white/5 space-y-4">
                                    <button className="w-full flex items-center justify-center gap-2 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-white font-bold transition-all">
                                        <ImageIcon className="w-4 h-4" />
                                        <span>Edit Alt Text</span>
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(selectedItem._id)}
                                        className="w-full flex items-center justify-center gap-2 py-4 bg-red-600/10 hover:bg-red-600 text-red-400 hover:text-white border border-red-600/20 rounded-2xl font-bold transition-all"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        <span>Delete Forever</span>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
