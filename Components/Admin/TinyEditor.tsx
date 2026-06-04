"use client";

import { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";

interface TinyEditorProps {
  value: string;
  onChange: (content: string) => void;
}

export default function TinyEditor({ value, onChange }: TinyEditorProps) {
  const [mounted, setMounted] = useState(false);

  // Prevent SSR — TinyMCE requires window/document
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className="w-full border border-white/10 rounded-2xl bg-[#0a0d18] flex items-center justify-center"
        style={{ height: 500 }}
      >
        <span className="text-gray-500 text-sm animate-pulse">
          Loading editor…
        </span>
      </div>
    );
  }

  return (
    <div className="w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
      <Editor
        apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
        value={value}
        onEditorChange={(newValue: string) => onChange(newValue)}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "lists",
            "link",
            "image",
            "table",
            "code",
            "preview",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | bold italic underline | " +
            "alignleft aligncenter alignright | bullist numlist | " +
            "blockquote | link image table | code preview",

          /* ── Dark theme ── */
          skin: "oxide-dark",
          content_css: "dark",

          /* ── Content body styles matching dashboard font ── */
          content_style: `
            body {
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI",
                Roboto, "Helvetica Neue", Arial, sans-serif;
              font-size: 14px;
              line-height: 1.75;
              color: #e2e8f0;
              background-color: #030303;
              padding: 20px 24px;
              margin: 0;
              max-width: 100%;
              box-sizing: border-box;
            }
            p  { margin: 0 0 1em 0; }
            h1,h2,h3,h4,h5,h6 { color: #f1f5f9; font-weight: 700; line-height: 1.3; margin: 1.4em 0 0.5em; }
            a  { color: #3b82f6; text-decoration: underline; }
            img { max-width: 100%; height: auto; border-radius: 12px; margin: 1em 0; display: block; }
            pre { background: #0a0d18; border: 1px solid rgba(255,255,255,0.08); padding: 1em; border-radius: 10px; overflow-x: auto; }
            code { font-family: "Courier New", Courier, monospace; font-size: 13px; color: #93c5fd; }
            blockquote { border-left: 3px solid #3b82f6; margin: 1em 0; padding: 0.5em 1em; color: #94a3b8; background: rgba(59,130,246,0.05); border-radius: 0 8px 8px 0; }
            table { border-collapse: collapse; width: 100%; margin: 1em 0; }
            th, td { border: 1px solid #1e293b; padding: 0.5em 1em; text-align: left; }
            th { background: #0a0d18; color: #f1f5f9; font-weight: 700; }
            ul, ol { padding-left: 1.5em; margin: 0 0 1em 0; }
            li { margin-bottom: 0.25em; }
            hr { border: none; border-top: 1px solid rgba(255,255,255,0.08); margin: 2em 0; }
          `,

          /* ── Behaviour ── */
          branding: false,
          promotion: false,
          resize: false,
          statusbar: true,
          width: "100%",

          /* ── Autoresize ── */
          autoresize_min_height: 500,
          autoresize_max_height: 900,
          autoresize_overflow_padding: 24,

          /* ── Image: URL insertion only (no file upload unless backend supports it) ── */
          image_advtab: true,
          image_uploadtab: false,
          automatic_uploads: false,
          file_picker_types: "image",

          /* ── Mobile ── */
          mobile: {
            menubar: false,
            toolbar_mode: "sliding",
          },
        }}
      />
    </div>
  );
}
