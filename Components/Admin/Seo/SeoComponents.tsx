"use client";

import { type ChangeEvent, type ReactNode } from "react";
import { AlertCircle, CheckCircle2, Globe, Search, Monitor, Share2, Info } from "lucide-react";

// ─── SeoInput ────────────────────────────────────────────────────────────────
interface SeoInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  maxLength?: number;
  hint?: string;
  icon?: ReactNode;
}

export function SeoInput({ label, name, value, onChange, placeholder, maxLength, hint, icon }: SeoInputProps) {
  const remaining = maxLength ? maxLength - value.length : null;
  const isOverLimit = remaining !== null && remaining < 0;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between px-1">
        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
          {icon} {label}
        </label>
        {remaining !== null && (
          <span className={`text-[10px] font-bold ${isOverLimit ? "text-red-400" : remaining < 10 ? "text-yellow-400" : "text-gray-600"}`}>
            {remaining} characters
          </span>
        )}
      </div>
      <div className="relative group">
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          maxLength={maxLength ? maxLength + 20 : undefined}
          className={`w-full bg-white/[0.03] border rounded-xl py-3 px-4 text-sm text-white outline-none transition-all placeholder:text-gray-700 shadow-inner group-hover:bg-white/[0.05] ${
            isOverLimit ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-primary/50"
          }`}
        />
      </div>
      {hint && <p className="text-[10px] text-gray-600 px-1 italic">{hint}</p>}
      {isOverLimit && (
        <p className="text-[10px] text-red-400 flex items-center gap-1 px-1">
          <AlertCircle size={10} /> Exceeds limit by {Math.abs(remaining)} characters
        </p>
      )}
    </div>
  );
}

// ─── SeoTextarea ─────────────────────────────────────────────────────────────
interface SeoTextareaProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  maxLength?: number;
  rows?: number;
  hint?: string;
  icon?: ReactNode;
}

export function SeoTextarea({ label, name, value, onChange, placeholder, maxLength, rows = 4, hint, icon }: SeoTextareaProps) {
  const remaining = maxLength ? maxLength - value.length : null;
  const isOverLimit = remaining !== null && remaining < 0;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between px-1">
        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
          {icon} {label}
        </label>
        {remaining !== null && (
          <span className={`text-[10px] font-bold ${isOverLimit ? "text-red-400" : remaining < 20 ? "text-yellow-400" : "text-gray-600"}`}>
            {remaining} characters
          </span>
        )}
      </div>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className={`w-full bg-white/[0.03] border rounded-xl py-4 px-5 text-sm text-white outline-none transition-all placeholder:text-gray-700 shadow-inner resize-none leading-relaxed hover:bg-white/[0.05] ${
          isOverLimit ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-primary/50"
        }`}
      />
      {hint && <p className="text-[10px] text-gray-600 px-1 italic">{hint}</p>}
    </div>
  );
}

// ─── SeoCTAFields ────────────────────────────────────────────────────────────
interface SeoCTAFieldsProps {
  primaryText: string;
  primaryLink: string;
  secondaryText: string;
  secondaryLink: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function SeoCTAFields({ primaryText, primaryLink, secondaryText, secondaryLink, onChange }: SeoCTAFieldsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="p-6 bg-primary/5 border border-primary/10 rounded-2xl space-y-4">
        <p className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-2">
          Primary Call-to-Action
        </p>
        <div className="space-y-3">
          <input
            type="text"
            name="primaryCTAText"
            value={primaryText}
            onChange={onChange}
            placeholder="Button Text (e.g. GET STARTED)"
            className="w-full bg-white/[0.03] border border-white/10 text-white rounded-xl py-2.5 px-4 text-xs outline-none focus:border-primary/50 shadow-inner"
          />
          <input
            type="text"
            name="primaryCTALink"
            value={primaryLink}
            onChange={onChange}
            placeholder="URL (e.g. /contact)"
            className="w-full bg-white/[0.03] border border-white/10 text-white rounded-xl py-2.5 px-4 text-xs outline-none focus:border-primary/50 font-mono shadow-inner"
          />
        </div>
      </div>
      <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl space-y-4">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
          Secondary Call-to-Action
        </p>
        <div className="space-y-3">
          <input
            type="text"
            name="secondaryCTAText"
            value={secondaryText}
            onChange={onChange}
            placeholder="Button Text (e.g. VIEW WORK)"
            className="w-full bg-white/[0.03] border border-white/10 text-white rounded-xl py-2.5 px-4 text-xs outline-none focus:border-primary/50 shadow-inner"
          />
          <input
            type="text"
            name="secondaryCTALink"
            value={secondaryLink}
            onChange={onChange}
            placeholder="URL (e.g. /work)"
            className="w-full bg-white/[0.03] border border-white/10 text-white rounded-xl py-2.5 px-4 text-xs outline-none focus:border-primary/50 font-mono shadow-inner"
          />
        </div>
      </div>
    </div>
  );
}

// ─── SeoScoreCard ─────────────────────────────────────────────────────────────
interface SeoScoreCardProps {
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
  canonicalUrl: string;
}

export function SeoScoreCard({ metaTitle, metaDescription, focusKeyword, canonicalUrl }: SeoScoreCardProps) {
  const checks = [
    { label: "Meta Title Length", ok: metaTitle.length >= 30 && metaTitle.length <= 60 },
    { label: "Meta Description Length", ok: metaDescription.length >= 120 && metaDescription.length <= 160 },
    { label: "Focus Keyword defined", ok: focusKeyword.length > 2 },
    { label: "Canonical URL format", ok: canonicalUrl.startsWith("http") },
    { label: "Keyword in Meta Title", ok: focusKeyword.length > 0 && metaTitle.toLowerCase().includes(focusKeyword.toLowerCase()) },
  ];
  const score = Math.round((checks.filter((c) => c.ok).length / checks.length) * 100);
  const color = score >= 80 ? "text-green-400" : score >= 50 ? "text-yellow-400" : "text-red-400";
  const bg = score >= 80 ? "bg-green-500" : score >= 50 ? "bg-yellow-500" : "bg-red-500";

  return (
    <div className="bg-[#020617]/50 backdrop-blur-xl border border-white/10 rounded-[24px] p-6 space-y-6 shadow-xl">
      <div className="flex items-center justify-between">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">SEO Health Score</h3>
        <span className={`text-4xl font-black ${color}`}>{score}<span className="text-[10px] text-gray-600 tracking-normal ml-1 uppercase">/100</span></span>
      </div>
      <div className="w-full bg-white/5 rounded-full h-2.5 overflow-hidden border border-white/5 shadow-inner">
        <div className={`h-full rounded-full transition-all duration-700 ease-out ${bg} shadow-[0_0_15px_rgba(34,197,94,0.3)]`} style={{ width: `${score}%` }} />
      </div>
      <div className="space-y-3">
        {checks.map((c) => (
          <div key={c.label} className="flex items-center justify-between text-[11px] font-bold group">
            <span className="text-gray-500 group-hover:text-gray-400 transition-colors uppercase tracking-wider">{c.label}</span>
            <div className={`flex items-center justify-center w-5 h-5 rounded-full border transition-all ${c.ok ? "bg-green-500/10 border-green-500/20 text-green-400" : "bg-red-500/10 border-red-500/20 text-red-400"}`}>
              {c.ok ? <CheckCircle2 size={10} /> : <AlertCircle size={10} />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── SeoPreviewCard ──────────────────────────────────────────────────────────
interface SeoPreviewCardProps {
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  ogImage?: string;
}

export function SeoPreviewCard({ metaTitle, metaDescription, canonicalUrl, ogImage }: SeoPreviewCardProps) {
  const displayUrl = canonicalUrl.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <div className="space-y-6">
      {/* Google Preview */}
      <div className="bg-white rounded-2xl p-6 space-y-2 shadow-xl">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 mb-3">
          <Search size={10} /> Google SERP Preview
        </p>
        <p className="text-[12px] text-[#202124] truncate">{displayUrl || "xeltr.com"}</p>
        <h4 className="text-[#1a0dab] font-medium text-xl leading-tight hover:underline cursor-pointer truncate">
          {metaTitle || "Page Title"}
        </h4>
        <p className="text-[#4d5156] text-[13px] line-clamp-2 leading-relaxed">
          {metaDescription || "Meta description will appear here in Google Search results..."}
        </p>
      </div>

      {/* OG Preview */}
      <div className="bg-[#1a1a2e] border border-white/10 rounded-2xl overflow-hidden shadow-xl group">
        <div className="aspect-[1.91/1] bg-gradient-to-br from-blue-900/30 to-purple-900/30 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[2px] opacity-100 group-hover:opacity-0 transition-opacity z-10">
             <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
               <Share2 size={12} /> Social Preview
             </p>
          </div>
          {ogImage ? (
            <img src={ogImage} alt="OG" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
          ) : (
             <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-8">
                 <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white/10">
                    <Monitor size={24} />
                 </div>
                 <p className="text-[9px] text-white/20 font-black uppercase tracking-[0.2em] text-center">OpenGraph Visualization</p>
             </div>
          )}
        </div>
        <div className="p-5 border-t border-white/5 bg-white/[0.01]">
          <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">xeltr.com</p>
          <h4 className="text-white font-bold text-sm truncate mt-1 group-hover:text-primary transition-colors">{metaTitle || "Page Title"}</h4>
          <p className="text-gray-500 text-[11px] line-clamp-2 mt-1 leading-relaxed">{metaDescription || "Social media description"}</p>
        </div>
      </div>
    </div>
  );
}

// ─── SeoSectionCard ──────────────────────────────────────────────────────────
interface SeoSectionCardProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  status?: "draft" | "published";
  lastUpdated?: string;
}

export function SeoSectionCard({ title, icon, children, status = "draft", lastUpdated }: SeoSectionCardProps) {
  return (
    <div className="bg-[#020617]/50 backdrop-blur-xl border border-white/10 rounded-[24px] overflow-hidden shadow-2xl group transition-all hover:border-white/20">
      <div className="flex items-center justify-between px-8 py-6 border-b border-white/5 bg-white/[0.01]">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
            {icon || <Globe size={18} />}
          </div>
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-widest">{title}</h2>
            {lastUpdated && <p className="text-[10px] text-gray-500 mt-0.5">Last updated {lastUpdated}</p>}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border transition-all ${
            status === "published"
              ? "bg-green-500/10 text-green-400 border-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.1)]"
              : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20 shadow-[0_0_15px_rgba(234,179,8,0.1)]"
          }`}>
            {status}
          </span>
        </div>
      </div>
      <div className="p-8">{children}</div>
    </div>
  );
}

// ─── SeoLayout ───────────────────────────────────────────────────────────────
interface SeoLayoutProps {
  title: string;
  subtitle: string;
  badge: string;
  badgeColor?: string;
  scoreProps: SeoScoreCardProps;
  previewProps: SeoPreviewCardProps;
  onSave: () => void;
  onReset: () => void;
  isSaving?: boolean;
  children: ReactNode;
  headerIcon?: ReactNode;
}

export function SeoLayout({
  title, subtitle, badge, badgeColor = "blue",
  scoreProps, previewProps,
  onSave, onReset, isSaving = false,
  children, headerIcon
}: SeoLayoutProps) {
  return (
    <div className="space-y-10 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-8 border-b border-white/5">
        <div className="flex items-start gap-5">
           <div className="w-14 h-14 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center text-primary shadow-[0_0_30px_rgba(37,99,235,0.2)]">
               {headerIcon || <Globe size={28} />}
           </div>
           <div>
             <div className="flex items-center gap-3 mb-1">
                <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest border bg-${badgeColor}-500/10 text-${badgeColor}-400 border-${badgeColor}-500/20`}>
                    {badge}
                </span>
             </div>
             <h1 className="text-3xl font-black text-white tracking-tight leading-none uppercase">{title}</h1>
             <p className="text-gray-500 mt-2 text-sm font-medium tracking-wide">{subtitle}</p>
           </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={onReset}
            className="px-6 py-3 bg-white/5 border border-white/10 text-gray-400 font-bold rounded-xl hover:bg-white/10 hover:text-white transition-all text-xs uppercase tracking-widest"
          >
            Reset
          </button>
          <button
            onClick={onSave}
            disabled={isSaving}
            className="px-8 py-3 bg-primary text-white font-black rounded-xl hover:scale-105 active:scale-95 transition-all text-xs uppercase tracking-widest shadow-[0_0_25px_rgba(37,99,235,0.3)] disabled:opacity-50"
          >
            {isSaving ? "Syncing..." : "Save Configuration"}
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Content */}
        <div className="lg:col-span-8 space-y-10">{children}</div>

        {/* Right Sidebar */}
        <div className="lg:col-span-4 space-y-8 sticky top-10 h-fit">
          <SeoScoreCard {...scoreProps} />
          <SeoPreviewCard {...previewProps} />
          
          <div className="p-6 bg-primary/5 border border-primary/10 rounded-[24px] space-y-4">
             <div className="flex items-center gap-2 text-primary">
                <Info size={16} />
                <h4 className="text-[10px] font-black uppercase tracking-widest">SEO Optimization Tip</h4>
             </div>
             <p className="text-[11px] text-gray-400 leading-relaxed italic">
                "Keep your Meta Title between 50-60 characters and your Description around 155-160 characters for the best visibility across all search engines."
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── SeoStatsCard ────────────────────────────────────────────────────────────
interface SeoStatsCardProps {
  label: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  description?: string;
}

export function SeoStatsCard({ label, value, icon, trend, description }: SeoStatsCardProps) {
  return (
    <div className="bg-[#020617]/50 backdrop-blur-xl border border-white/10 rounded-[24px] p-6 hover:border-primary/50 transition-all group shadow-xl">
      <div className="flex items-center justify-between mb-5">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform shadow-inner">
          {icon}
        </div>
        {trend && (
          <span className={`text-[10px] font-black px-2.5 py-1.5 rounded-lg border ${trend.isPositive ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-red-500/10 text-red-400 border-red-500/20"}`}>
            {trend.isPositive ? "↑" : "↓"} {trend.value}
          </span>
        )}
      </div>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">{label}</p>
        <h4 className="text-3xl font-black text-white mb-2 tracking-tight">{value}</h4>
        {description && <p className="text-[10px] text-gray-600 font-bold uppercase tracking-tighter">{description}</p>}
      </div>
    </div>
  );
}

// ─── SeoToggle ───────────────────────────────────────────────────────────────
interface SeoToggleProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  description?: string;
}

export function SeoToggle({ label, checked, onChange, description }: SeoToggleProps) {
  return (
    <div className="flex items-center justify-between p-5 bg-white/[0.02] border border-white/10 rounded-xl hover:bg-white/[0.04] transition-all">
      <div>
        <p className="text-sm font-bold text-white uppercase tracking-wide">{label}</p>
        {description && <p className="text-[10px] text-gray-500 mt-1 font-medium">{description}</p>}
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative w-11 h-6 rounded-full transition-all duration-300 shadow-inner ${checked ? "bg-primary" : "bg-white/10"}`}
      >
        <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-all duration-500 shadow-lg ${checked ? "translate-x-5" : "translate-x-0"}`} />
      </button>
    </div>
  );
}

// ─── SeoCodeEditor ───────────────────────────────────────────────────────────
interface SeoCodeEditorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  language?: string;
}

export function SeoCodeEditor({ label, value, onChange, language = "json" }: SeoCodeEditorProps) {
  return (
    <div className="space-y-3">
      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 px-1">{label}</label>
      <div className="relative group">
        <div className="absolute top-4 right-6 text-[10px] font-black text-primary uppercase tracking-widest z-10 bg-primary/10 px-2 py-1 rounded border border-primary/20 backdrop-blur-md">{language}</div>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-80 bg-[#010409] border border-white/10 rounded-2xl p-8 font-mono text-xs text-blue-300 outline-none focus:border-primary/50 resize-none leading-relaxed shadow-2xl transition-all"
          spellCheck={false}
        />
        <div className="absolute bottom-4 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest italic">Read-only in preview mode</span>
        </div>
      </div>
    </div>
  );
}

// ─── SeoStatusBadge ──────────────────────────────────────────────────────────
interface SeoStatusBadgeProps {
  status: string;
  type?: "success" | "warning" | "error" | "info";
}

export function SeoStatusBadge({ status, type = "info" }: SeoStatusBadgeProps) {
  const colors = {
    success: "bg-green-500/10 text-green-400 border-green-500/20 shadow-[0_0_10px_rgba(34,197,94,0.1)]",
    warning: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20 shadow-[0_0_10px_rgba(234,179,8,0.1)]",
    error: "bg-red-500/10 text-red-400 border-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.1)]",
    info: "bg-primary/10 text-primary border-primary/20 shadow-[0_0_10px_rgba(37,99,235,0.1)]",
  };

  return (
    <span className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest border transition-all ${colors[type]}`}>
      {status}
    </span>
  );
}

// ─── SeoTable ────────────────────────────────────────────────────────────────
interface SeoTableProps<T> {
  data: T[];
  columns: {
    header: string;
    accessor: keyof T | ((item: T) => ReactNode);
    className?: string;
  }[];
  onSearch?: (query: string) => void;
  searchPlaceholder?: string;
}

export function SeoTable<T>({ data, columns, onSearch, searchPlaceholder = "Search SEO data..." }: SeoTableProps<T>) {
  return (
    <div className="bg-[#020617]/50 backdrop-blur-xl border border-white/10 rounded-[24px] overflow-hidden shadow-2xl">
      {onSearch && (
        <div className="p-6 border-b border-white/5 bg-white/[0.01]">
          <div className="relative max-w-md group">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-hover:text-primary transition-colors" />
             <input
                type="text"
                placeholder={searchPlaceholder}
                onChange={(e) => onSearch(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-5 text-sm text-white outline-none focus:border-primary/50 transition-all shadow-inner"
             />
          </div>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-white/[0.02] border-b border-white/5">
              {columns.map((col, i) => (
                <th key={i} className={`px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ${col.className}`}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {data.length > 0 ? (
              data.map((item, i) => (
                <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                  {columns.map((col, j) => (
                    <td key={j} className={`px-8 py-5 text-sm text-gray-300 font-medium group-hover:text-white transition-colors ${col.className}`}>
                      {typeof col.accessor === "function" ? col.accessor(item) : (item[col.accessor] as ReactNode)}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-8 py-24 text-center">
                   <div className="flex flex-col items-center justify-center gap-3 opacity-20">
                      <Search size={40} className="text-gray-500" />
                      <p className="text-sm font-black uppercase tracking-[0.3em] text-gray-500">No matching entries found</p>
                   </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── SeoPageHeader ───────────────────────────────────────────────────────────
interface SeoPageHeaderProps {
  title: string;
  description: string;
  badge: string;
  actions?: ReactNode;
  icon?: ReactNode;
}

export function SeoPageHeader({ title, description, badge, actions, icon }: SeoPageHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-10 mb-10 border-b border-white/5">
      <div className="flex items-start gap-5">
         <div className="w-16 h-16 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center text-primary shadow-[0_0_30px_rgba(37,99,235,0.2)]">
             {icon || <Globe size={32} />}
         </div>
         <div>
            <span className="inline-block px-2.5 py-0.5 rounded text-[9px] font-black uppercase tracking-widest border bg-primary/10 text-primary border-primary/20 mb-3 shadow-inner">
              {badge}
            </span>
            <h1 className="text-4xl font-black text-white tracking-tighter uppercase leading-none">{title}</h1>
            <p className="text-gray-500 mt-2 text-lg font-medium max-w-xl">{description}</p>
         </div>
      </div>
      {actions && <div className="flex items-center gap-4">{actions}</div>}
    </div>
  );
}
