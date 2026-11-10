import type { Metadata } from "next";
import { Inter, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Preloader from "@/components/Preloader";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage" });

export const metadata: Metadata = {
    title: "Ishita Dev — UI/UX Designer",
    description: "Portfolio of Ishita Dev, UI/UX Designer at Cekura AI (YC F24)",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <head>
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
                <link rel="stylesheet" href="/character.css" />
            </head>
            <body className={cn(inter.variable, bricolage.variable, "font-sans min-h-screen bg-background text-foreground tracking-tight")}>
                <Preloader />
                {children}
                {/* the square character (moods, hover card, chat popup): same file as the static pages */}
                <Script src="/character.js" strategy="afterInteractive" />
            </body>
        </html>
    );
}
