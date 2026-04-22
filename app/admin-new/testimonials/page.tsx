"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, ArrowLeft, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch("/api/testimonials");
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
      const res = await fetch("/api/testimonials", {
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
      const res = await fetch(`/api/testimonials/${id}`, {
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
    <div className="min-h-screen bg-black text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <Link href="/xlter-admin/dashboard" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft size={20} /> Back to Dashboard
          </Link>
          <button
            onClick={() => setIsAdding(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all"
          >
            <Plus size={20} /> Add Testimonial
          </button>
        </div>

        <h1 className="text-4xl font-bold mb-8">Manage Testimonials</h1>

        {isAdding && (
          <div className="bg-[#111111] border border-white/10 p-8 rounded-3xl mb-12">
            <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Name"
                className="bg-black border border-white/10 rounded-xl px-4 py-3 focus:border-indigo-500 outline-none"
                value={newT.name}
                onChange={(e) => setNewT({ ...newT, name: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Role (e.g. CEO, TechCorp)"
                className="bg-black border border-white/10 rounded-xl px-4 py-3 focus:border-indigo-500 outline-none"
                value={newT.role}
                onChange={(e) => setNewT({ ...newT, role: e.target.value })}
                required
              />
              
              <div className="md:col-span-2 space-y-4">
                <label className="block text-sm font-bold text-gray-400">Avatar Image (Max 200KB)</label>
                <div className="flex items-center gap-6">
                  {newT.avatar && (
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-indigo-500">
                      <Image
                        src={newT.avatar}
                        alt="Preview"
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-400
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-indigo-600 file:text-white
                      hover:file:bg-indigo-700 cursor-pointer"
                  />
                </div>
              </div>

              <textarea
                placeholder="Testimonial Text"
                className="bg-black border border-white/10 rounded-xl px-4 py-3 focus:border-indigo-500 outline-none md:col-span-2 h-32"
                value={newT.text}
                onChange={(e) => setNewT({ ...newT, text: e.target.value })}
                required
              />
              <div className="flex gap-4 md:col-span-2">
                <button type="submit" className="bg-indigo-600 px-8 py-3 rounded-xl font-bold">Save</button>
                <button type="button" onClick={() => setIsAdding(false)} className="text-gray-400">Cancel</button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-indigo-500" size={40} /></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t) => (
              <div key={t._id} className="bg-[#111111] border border-white/10 p-6 rounded-3xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src={t.avatar}
                        alt={t.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold">{t.name}</h4>
                      <p className="text-gray-500 text-sm">{t.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm italic mb-6">"{t.text}"</p>
                </div>
                <button
                  onClick={() => handleDelete(t._id)}
                  className="text-red-500 hover:text-red-400 transition-colors flex items-center gap-2 text-sm font-bold mt-4"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
