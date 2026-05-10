"use client";

import { useState, useEffect, useRef } from "react";
import { Plus, Trash2, Loader2, MessageSquare, Quote, X, UploadCloud, User, Briefcase } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface Testimonial {
  _id: string;
  name: string;
  role: string;
  text: string;
  avatar: string;
}

export default function TestimonialsAdmin() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newT, setNewT] = useState({ name: "", role: "", text: "", avatar: "" });
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch("/api/admin/content/testimonials");
      const data = await res.json();
      setTestimonials(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 200 * 1024) {
        alert("Image size must be less than 200KB");
        e.target.value = "";
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewT({ ...newT, avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newT.avatar) {
      alert("Please upload an avatar");
      return;
    }
    try {
      const res = await fetch("/api/admin/content/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newT),
      });
      if (res.ok) {
        setIsAdding(false);
        setNewT({ name: "", role: "", text: "", avatar: "" });
        fetchTestimonials();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    if (['1', '2', '3', '4', '5', '6'].includes(id)) {
      alert("Note: These are sample testimonials. You can only delete real testimonials you've added.");
      return;
    }
    if (!confirm("Are you sure?")) return;
    try {
      const res = await fetch(`/api/admin/content/testimonials/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchTestimonials();
      } else {
        const errorData = await res.json();
        alert(`Error: ${errorData.error || "Failed to delete"}`);
      }
    } catch (error) {
      console.error(error);
      alert("Network error. Please try again.");
    }
  };

  return (
    <>
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/5">
          <div>
            <div className="flex items-center gap-3 mb-1">
               <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                  <MessageSquare className="w-4 h-4" />
               </div>
               <h1 className="text-2xl font-bold text-white tracking-tight">Testimonial Manager</h1>
            </div>
            <p className="text-gray-400 text-sm">Curate and manage client reviews and feedback</p>
          </div>
          {!isAdding && (
            <button onClick={() => setIsAdding(true)} className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all border border-white/10 shadow-sm">
                <Plus className="w-4 h-4" /> Add Testimonial
            </button>
          )}
        </div>

        <AnimatePresence>
        {isAdding && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-[#020617]/50 backdrop-blur-xl border border-white/10 p-6 md:p-10 rounded-[24px] mb-12 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                <h2 className="text-lg font-bold text-white flex items-center gap-2 uppercase tracking-widest"><Plus size={18} className="text-primary"/> New Testimonial</h2>
                <button type="button" onClick={() => setIsAdding(false)} className="text-gray-500 hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-2 rounded-full"><X size={16}/></button>
            </div>
            <form onSubmit={handleAdd} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Avatar */}
              <div className="lg:col-span-4 space-y-4">
                <label className="text-sm font-bold text-gray-300 flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" /> Client Avatar (Max 200KB)
                </label>
                {newT.avatar ? (
                  <div className="relative rounded-[20px] overflow-hidden border border-white/10 group aspect-square shadow-lg max-w-[240px] mx-auto lg:mx-0">
                    <Image src={newT.avatar} alt="Preview" fill className="object-cover" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                      <button type="button" onClick={() => setNewT({...newT, avatar: ""})} className="bg-red-500 text-white p-3 rounded-full hover:scale-110 hover:bg-red-600 transition-all shadow-xl">
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="w-full aspect-square max-w-[240px] mx-auto lg:mx-0 border-2 border-dashed border-white/10 hover:border-primary/50 bg-white/[0.02] hover:bg-primary/5 rounded-[20px] flex flex-col items-center justify-center gap-3 transition-all group shadow-sm"
                  >
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all">
                       <UploadCloud className="w-6 h-6 text-gray-400 group-hover:text-primary transition-colors" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-primary">Upload Photo</span>
                  </button>
                )}
                <input ref={fileRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
              </div>

              {/* Right Column: Details */}
              <div className="lg:col-span-8 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                          <label className="text-sm font-bold text-gray-300 mb-2 block flex items-center gap-1.5"><User className="w-4 h-4 text-primary" /> Client Name</label>
                          <input
                            type="text"
                            placeholder="John Doe"
                            className="w-full bg-white/[0.03] border border-white/10 text-white rounded-xl py-3 px-4 outline-none focus:border-primary transition-all text-sm shadow-inner"
                            value={newT.name}
                            onChange={(e) => setNewT({ ...newT, name: e.target.value })}
                            required
                          />
                      </div>
                      <div>
                          <label className="text-sm font-bold text-gray-300 mb-2 block flex items-center gap-1.5"><Briefcase className="w-4 h-4 text-primary" /> Role / Company</label>
                          <input
                            type="text"
                            placeholder="CEO, TechCorp"
                            className="w-full bg-white/[0.03] border border-white/10 text-white rounded-xl py-3 px-4 outline-none focus:border-primary transition-all text-sm shadow-inner"
                            value={newT.role}
                            onChange={(e) => setNewT({ ...newT, role: e.target.value })}
                            required
                          />
                      </div>
                  </div>

                  <div>
                      <label className="text-sm font-bold text-gray-300 mb-2 block flex items-center gap-1.5"><Quote className="w-4 h-4 text-primary" /> Testimonial Quote</label>
                      <textarea
                        placeholder="Write the review here..."
                        className="w-full bg-white/[0.03] border border-white/10 text-white rounded-xl py-4 px-5 outline-none focus:border-primary transition-all text-sm resize-none shadow-inner h-32 leading-relaxed"
                        value={newT.text}
                        onChange={(e) => setNewT({ ...newT, text: e.target.value })}
                        required
                      />
                  </div>

                  <div className="flex gap-4 pt-4 border-t border-white/5">
                    <button type="submit" className="flex-1 bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] uppercase tracking-widest text-sm">Save Testimonial</button>
                    <button type="button" onClick={() => setIsAdding(false)} className="px-8 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all font-bold text-xs uppercase tracking-widest">Cancel</button>
                  </div>
              </div>
            </form>
          </motion.div>
        )}
        </AnimatePresence>

        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-primary" size={40} /></div>
        ) : (
          <div className="bg-[#020617]/50 backdrop-blur-xl border border-white/10 rounded-[24px] p-6 md:p-8 shadow-xl">
             <div className="flex items-center justify-between mb-8">
                 <h2 className="text-base font-bold text-white uppercase tracking-widest">Active Testimonials</h2>
                 <span className="text-xs font-bold px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/20">{testimonials.length} Total</span>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {testimonials.map((t) => (
                <div key={t._id} className="group bg-white/[0.02] border border-white/5 p-6 rounded-2xl flex flex-col justify-between hover:bg-white/[0.04] hover:border-white/20 transition-all shadow-sm relative overflow-hidden">
                    {/* Decorative quote icon */}
                    <Quote className="absolute top-4 right-4 w-12 h-12 text-white/[0.03] rotate-180 group-hover:text-primary/10 transition-colors" />
                    
                    <div>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-primary/20 group-hover:border-primary transition-colors">
                        <Image src={t.avatar} alt={t.name} fill sizes="56px" className="object-cover" />
                        </div>
                        <div>
                        <h4 className="font-bold text-white text-sm">{t.name}</h4>
                        <p className="text-primary text-[10px] uppercase tracking-widest font-black mt-0.5">{t.role}</p>
                        </div>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-4 relative z-10">"{t.text}"</p>
                    </div>
                    
                    <div className="mt-auto pt-4 border-t border-white/5 flex justify-end">
                        <button
                            onClick={() => handleDelete(t._id)}
                            className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:text-white hover:bg-red-500 transition-all flex items-center gap-2 text-xs font-bold"
                        >
                            <Trash2 size={14} /> Remove
                        </button>
                    </div>
                </div>
                ))}
             </div>
          </div>
        )}
    </>
  );
}
