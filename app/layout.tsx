import React, { Suspense } from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Preloader from "@/Components/Preloader";
import { ThemeProvider } from "@/lib/ThemeProvider";
import MatchingCursor from "@/Components/Animations/MatchingCursor";
import { Toaster } from "sonner";
import GridBackground from "@/Components/Animations/GridBackground";
import ConditionalLayout from "./ConditionalLayout";
import connectToDatabase, { withTimeout } from "@/lib/mongodb";
import ScriptInjection from "@/models/ScriptInjection";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Xeltr",
  description: "Digital Excellence Studio",
  icons: {
    icon: "/Transparent-06.png",
  },
};

export const dynamic = "force-dynamic";

async function getInjectedScripts() {
  try {
    // Parallelize connection and fetching with a strict timeout
    await withTimeout(connectToDatabase(), 5000);
    return await withTimeout(
      ScriptInjection.find({ enabled: true }).lean() as Promise<any[]>,
      5000
    );
  } catch (error) {
    console.error("Layout data fetch failed:", error);
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
  const bodyScripts = scripts.filter((s: any) => s.location === "body_start" || s.location === "body_end");

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Xeltr Studio",
    "url": "https://Xeltr.com",
    "logo": "https://Xeltr.com/Transparent-06.png",
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
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
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
      <body className="min-h-screen overflow-x-hidden bg-background text-foreground selection:bg-primary/30">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Preloader />
          <MatchingCursor />
          <Toaster position="top-center" richColors />
          
          <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
            <GridBackground />
          </div>

          <ConditionalLayout>
            <Suspense fallback={<div className="min-h-screen bg-background" />}>
              {children}
            </Suspense>
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
        </ThemeProvider>
      </body>
    </html>
  );
}
