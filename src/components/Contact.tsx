import React from "react";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Contact() {
    return (
        <section className="relative z-20 w-full bg-[#0a0a0a] overflow-hidden rounded-t-[3rem] mt-[-2rem] border-t border-white/10 shadow-[0_-20px_40px_rgba(0,0,0,0.5)]">

            {/* Massive Marquee */}
            <div className="relative flex overflow-x-hidden border-b border-white/5 bg-[#121212] py-8">
                <div className="animate-marquee whitespace-nowrap flex items-center gap-12">
                    {[...Array(4)].map((_, i) => (
                        <span key={i} className="text-7xl md:text-9xl font-medium tracking-tighter text-white opacity-20 hover:opacity-100 transition-opacity duration-500 cursor-default">
                            LET'S TALK <span className="font-serif italic text-blue-500">IDEAS.</span>
                        </span>
                    ))}
                </div>
                {/* Second duplicated marquee for seamless looping */}
                <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex items-center gap-12 py-8">
                    {[...Array(4)].map((_, i) => (
                        <span key={i} className="text-7xl md:text-9xl font-medium tracking-tighter text-white opacity-20 hover:opacity-100 transition-opacity duration-500 cursor-default">
                            LET'S TALK <span className="font-serif italic text-blue-500">IDEAS.</span>
                        </span>
                    ))}
                </div>
            </div>

            <div className="max-w-7xl mx-auto flex flex-col pt-32 pb-16 px-6 md:px-24">

                <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-32">

                    <div className="flex flex-col gap-6 md:w-1/2">
                        <div className="flex items-center gap-4 mb-4">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                            </span>
                            <span className="text-neutral-400 font-mono text-sm uppercase tracking-widest">Available for new opportunities</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-light text-white leading-tight">
                            Got a project <br />
                            in mind? <br />
                            <span className="font-serif italic text-blue-400">Let's build it.</span>
                        </h2>
                    </div>

                    <div className="flex flex-col gap-12 md:w-1/2 md:items-end">
                        <a
                            href="mailto:b.devishita@gmail.com"
                            className="group flex flex-col md:items-end"
                        >
                            <span className="text-sm font-mono tracking-widest text-neutral-500 uppercase mb-3">Drop a line</span>
                            <span className="text-xl md:text-2xl font-medium tracking-tight text-white group-hover:text-blue-400 transition-colors duration-500 flex items-center gap-4">
                                b.devishita@gmail.com
                                <span className="p-3 rounded-full bg-white/5 group-hover:bg-blue-500 group-hover:text-white transition-all duration-500 transform group-hover:rotate-45 group-hover:scale-110">
                                    <ArrowUpRight size={24} className="stroke-[1.5]" />
                                </span>
                            </span>
                            <div className="h-[2px] w-0 bg-blue-500 group-hover:w-full transition-all duration-500 mt-2"></div>
                        </a>

                        <a
                            href="https://linkedin.com/in/ishita-dev"
                            target="_blank"
                            rel="noreferrer"
                            className="group flex flex-col md:items-end"
                        >
                            <span className="text-sm font-mono tracking-widest text-neutral-500 uppercase mb-3">Connect Professionally</span>
                            <span className="text-xl md:text-2xl font-medium tracking-tight text-white group-hover:text-blue-400 transition-colors duration-500 flex items-center gap-4">
                                LinkedIn
                                <span className="p-3 rounded-full bg-white/5 group-hover:bg-blue-500 group-hover:text-white transition-all duration-500 transform group-hover:rotate-45 group-hover:scale-110">
                                    <ArrowUpRight size={24} className="stroke-[1.5]" />
                                </span>
                            </span>
                            <div className="h-[2px] w-0 bg-blue-500 group-hover:w-full transition-all duration-500 mt-2"></div>
                        </a>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-neutral-500 text-sm font-mono gap-4">
                    <div className="flex items-center gap-8">
                        <span>© {new Date().getFullYear()} Ishita Dev</span>
                        <span>Built with Next.js & Framer Motion</span>
                    </div>
                    <div className="flex gap-8">
                        <span className="hover:text-white cursor-pointer transition-colors">Varanasi, UP</span>
                        <a href="https://behance.net/devishita" target="_blank" rel="noreferrer" className="hover:text-white transition-colors underline decoration-white/20 underline-offset-4">Behance</a>
                        <a href="https://dribbble.com/b_ishita" target="_blank" rel="noreferrer" className="hover:text-white transition-colors underline decoration-white/20 underline-offset-4">Dribbble</a>
                    </div>
                </div>
            </div>
        </section>
    );
}
