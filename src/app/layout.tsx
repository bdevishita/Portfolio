import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

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
            <body className={cn(inter.variable, "font-sans min-h-screen bg-background text-foreground tracking-tight")}>
                {children}
            </body>
        </html>
    );
}
