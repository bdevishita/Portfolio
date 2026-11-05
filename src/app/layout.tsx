import type { Metadata } from "next";
import { Inter, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Preloader from "@/components/Preloader";
import { EyeTracker } from "@/components/EyeTracker";

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
            <body className={cn(inter.variable, bricolage.variable, "font-sans min-h-screen bg-background text-foreground tracking-tight")}>
                <Preloader />
                {children}
                {/* watches the cursor from the bottom-right corner; within="body" = the whole page */}
                <div className="eyt-dock">
                    <EyeTracker size={72} shape="Cube" within="body" />
                </div>
            </body>
        </html>
    );
}
