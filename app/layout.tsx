import React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Preloader from "@/Components/Preloader";
import { ThemeProvider } from "@/lib/ThemeProvider";
import MatchingCursor from "@/Components/Animations/MatchingCursor";
import { Toaster } from "sonner";
import GridBackground from "@/Components/Animations/GridBackground";
import StarBackground from "@/Components/Animations/StarBackground";
import ConditionalLayout from "./ConditionalLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Xlter ",
  description: "",
  icons: {
    icon: "/Transparent-06.png",
  },
};


import connectToDatabase from "@/lib/mongodb";
import ScriptInjection from "@/models/ScriptInjection";

async function getInjectedScripts() {
  try {
    await connectToDatabase();
    return await ScriptInjection.find({ enabled: true }).lean();
  } catch (error) {
    console.error("Failed to fetch injected scripts:", error);
    return [];
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const scripts = await getInjectedScripts();
  const headScripts = scripts.filter((s: any) => s.location === "head");
  const bodyScripts = scripts.filter((s: any) => s.location === "body");

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Xlter Studio",
    "url": "https://xlter.com",
    "logo": "https://xlter.com/Transparent-06.png",
    "sameAs": [
      "https://www.facebook.com/xeltrcom",
      "https://www.instagram.com/xeltrcom",
      "https://www.linkedin.com/company/xeltrcom/"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-94950-91659",
      "contactType": "customer service"
    }
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {/* Inject head scripts. Note: Using a wrapper because React requires one for dangerouslySetInnerHTML */}
        {headScripts.map((s: any) => (
          <script
            key={s._id.toString()}
            id={`head-script-${s._id.toString()}`}
            dangerouslySetInnerHTML={{ 
              __html: s.content.replace(/<\/?script[^>]*>/gi, '') 
            }}
          />
        ))}
      </head>
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <>
            <Preloader />
            <MatchingCursor />
            <Toaster position="top-center" richColors />
            <StarBackground />
            <div className="fixed inset-0 z-[-2] pointer-events-none">
              <GridBackground />
            </div>
            <ConditionalLayout>
              {children}
            </ConditionalLayout>
            
            {/* Inject body scripts */}
            {bodyScripts.map((s: any) => (
              <div 
                key={s._id.toString()} 
                id={`body-script-${s._id.toString()}`}
                dangerouslySetInnerHTML={{ __html: s.content }} 
                style={{ display: 'none' }}
              />
            ))}
          </>
        </ThemeProvider>
      </body>
    </html>
  );
}
