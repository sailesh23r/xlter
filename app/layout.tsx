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
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Xeltr",
  description: "Digital Excellence Studio",
  icons: {
    icon: "/Transparent-06.png",
  },
};

import { unstable_cache } from "next/cache";

const getInjectedScripts = unstable_cache(
  async () => {
    try {
      await withTimeout(connectToDatabase(), 5000);
      const scripts = await withTimeout(
        ScriptInjection.find({ enabled: true }).lean(),
        5000
      );
      // Serialize ObjectIds to strings to avoid passing complex objects
      return (scripts as any[]).map(s => ({
        ...s,
        _id: s._id.toString()
      }));
    } catch (error) {
      console.error("Layout data fetch failed:", error);
      return [];
    }
  },
  ["injected-scripts"],
  { revalidate: 60 }
);

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
            key={s._id}
            id={`head-script-${s._id}`}
            dangerouslySetInnerHTML={{ 
              __html: s.content.replace(/<\/?script[^>]*>/gi, '') 
            }}
          />
        ))}
      </head>
      <body className="min-h-screen bg-background text-foreground selection:bg-primary/30" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Preloader />
          <div className="hidden lg:block">
            <MatchingCursor />
          </div>
          <Toaster position="top-center" richColors />
          
          <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
            <GridBackground />
          </div>

          <ConditionalLayout>
            <Suspense>
              {children}
            </Suspense>
          </ConditionalLayout>
          
          {/* Inject body scripts */}
          {bodyScripts.map((s: any) => (
            <script
              key={s._id}
              id={`body-script-${s._id}`}
              dangerouslySetInnerHTML={{
                __html: s.content.replace(/<\/?script[^>]*>/gi, '')
              }}
            />
          ))}
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
