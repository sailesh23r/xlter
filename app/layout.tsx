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


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full flex flex-col">
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
          </>
        </ThemeProvider>
      </body>
    </html>
  );
}
