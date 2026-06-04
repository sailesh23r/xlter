"use client";

import DOMPurify from "dompurify";
import { useEffect, useState } from "react";
import { PortableText } from "next-sanity";

interface BlogContentRendererProps {
  content: string | any[];
}

export default function BlogContentRenderer({ content }: BlogContentRendererProps) {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!content || (Array.isArray(content) && content.length === 0)) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-slate-400">
        No article content found. Add content in Sanity Studio and publish the post.
      </div>
    );
  }

  const proseClasses = `prose prose-invert max-w-none 
                 prose-headings:font-serif prose-headings:text-white prose-headings:tracking-tight prose-headings:font-bold
                 prose-h1:text-4xl prose-h1:md:text-5xl prose-h1:mt-16 prose-h1:mb-8
                 prose-h2:text-3xl prose-h2:md:text-4xl prose-h2:mt-14 prose-h2:mb-6
                 prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-4
                 prose-p:leading-[1.8] prose-p:text-gray-300 prose-p:mb-6 prose-p:text-lg
                 prose-a:text-primary prose-a:underline prose-a:underline-offset-4 hover:prose-a:text-primary/80 transition-colors
                 prose-img:rounded-3xl prose-img:w-full prose-img:my-12 prose-img:shadow-[0_20px_50px_rgba(0,0,0,0.5)] prose-img:border prose-img:border-white/10 prose-img:mx-auto
                 prose-ul:list-disc prose-ul:my-6 prose-ul:pl-6 prose-ul:space-y-2 prose-ul:marker:text-primary
                 prose-ol:list-decimal prose-ol:my-6 prose-ol:pl-6 prose-ol:space-y-2 prose-ol:marker:text-primary
                 prose-li:text-gray-300 prose-li:text-lg
                 prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-8 prose-blockquote:my-12 prose-blockquote:italic prose-blockquote:text-white prose-blockquote:text-xl prose-blockquote:bg-white/[0.02] prose-blockquote:py-4 prose-blockquote:pr-4 prose-blockquote:rounded-r-2xl
                 prose-pre:bg-[#0a0d18] prose-pre:border prose-pre:border-white/10 prose-pre:rounded-2xl prose-pre:p-6 prose-pre:my-8 prose-pre:overflow-x-auto prose-pre:shadow-inner
                 prose-code:text-primary prose-code:bg-primary/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:font-mono prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
                 prose-table:w-full prose-table:my-8 prose-table:border-collapse prose-table:border prose-table:border-white/10 prose-table:rounded-xl prose-table:overflow-hidden
                 prose-th:bg-white/[0.04] prose-th:border prose-th:border-white/10 prose-th:p-4 prose-th:text-white prose-th:font-bold prose-th:text-sm prose-th:text-left
                 prose-td:border prose-td:border-white/10 prose-td:p-4 prose-td:text-gray-300 prose-td:text-sm
                 prose-hr:border-white/10 prose-hr:my-12
                 [&>table]:overflow-x-auto [&>table]:block md:[&>table]:table`;

  // Render PortableText for Sanity block content arrays
  if (Array.isArray(content)) {
    return (
      <div className={proseClasses} suppressHydrationWarning>
        <PortableText value={content} />
      </div>
    );
  }

  // Fallback string HTML rendering
  const htmlContent = isClient && DOMPurify.sanitize ? DOMPurify.sanitize(content || "") : (content || "");
  
  return (
    <div 
      className={proseClasses}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
      suppressHydrationWarning
    />
  );
}
