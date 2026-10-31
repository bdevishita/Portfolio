"use client";

import React from "react";
import { motion } from "framer-motion";

export default function About() {
    return (
        <section id="about" className="scroll-mt-16 relative z-20 w-full bg-[#121212] py-40 px-6 md:px-24">
            <div className="max-w-7xl mx-auto flex flex-col gap-16">

                {/* Massive Creative Statement & Polaroid Container */}
                <div className="w-full relative">
                    <motion.h2
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="text-5xl md:text-7xl lg:text-[6rem] font-medium tracking-tighter text-white leading-[1.1] relative z-10"
                    >
                        I craft spaces <br className="hidden md:block" />
                        where <span className="font-serif italic text-blue-400 font-light pr-2">engineering</span> <br className="hidden md:block" />
                        meets <span className="font-serif italic text-orange-400 font-light">emotion.</span>
                    </motion.h2>

                    {/* Draggable Polaroid inspired by Gowtham/Arpit */}
                    <motion.div
                        drag
                        dragConstraints={{ left: -100, right: 300, top: -100, bottom: 300 }}
                        whileDrag={{ scale: 1.1, rotate: 2, cursor: "grabbing" }}
                        initial={{ opacity: 0, scale: 0.8, rotate: 8 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 8 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="hidden lg:flex absolute right-12 top-0 w-64 h-72 bg-[#fdfdfd] p-3 flex-col shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-20 cursor-grab border border-white/20 origin-bottom hover:z-30"
                    >
                        <div className="w-full h-[85%] bg-neutral-200 overflow-hidden relative flex items-center justify-center border border-black/5 shadow-inner group">
                            <img
                                src="/me.jpg"
                                alt="Selfie"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    // Fallback if me.jpg doesn't exist yet
                                    e.currentTarget.style.display = 'none';
                                    e.currentTarget.parentElement?.classList.add('bg-gradient-to-br', 'from-blue-200', 'to-purple-200');
                                    const span = document.createElement('span');
                                    span.className = 'absolute z-10 text-neutral-500 font-mono text-[10px] uppercase tracking-widest font-semibold flex flex-col items-center justify-center text-center px-4 w-full h-full opacity-70';
                                    span.innerHTML = 'Image not found<br/><br/>Save your photo as <br/><b>public/me.jpg</b>';
                                    e.currentTarget.parentElement?.appendChild(span);
                                }}
                            />
                        </div>
                        <div className="w-full h-[15%] flex items-end justify-center pb-2">
                            <span className="font-serif text-black/80 font-medium italic tracking-tight text-xl">Ishita @ Night</span>
                        </div>

                        {/* Tape effect */}
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-white/40 backdrop-blur-md rotate-[-4deg] shadow-sm transform border border-white/50 z-30"></div>
                    </motion.div>
                </div>

                <div className="flex flex-col md:flex-row gap-16 md:gap-32 mt-12">

                    {/* Bio Text */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="md:w-1/2 flex flex-col gap-8"
                    >
                        <p className="text-2xl md:text-3xl text-neutral-300 font-light leading-snug">
                            I'm a UI/UX & Product Designer obsessed with dismantling complexity.
                        </p>
                        <p className="text-lg md:text-xl text-neutral-400 leading-relaxed font-light">
                            Currently building the future as a Founding Designer at <span className="text-white font-medium">Cekura AI (YC 24)</span>.
                            My process relies on rigorous user research, iterative data analysis, and a relentless pursuit of the perfect micro-interaction. I believe the best products aren't just usable—they're memorable.
                        </p>

                        <div className="mt-8 flex items-center gap-4">
                            <div className="flex -space-x-4">
                                <div className="w-12 h-12 rounded-full border-2 border-[#121212] bg-blue-500/20 flex items-center justify-center backdrop-blur-md">
                                    <span className="text-xs font-mono text-blue-400">UX</span>
                                </div>
                                <div className="w-12 h-12 rounded-full border-2 border-[#121212] bg-orange-500/20 flex items-center justify-center backdrop-blur-md">
                                    <span className="text-xs font-mono text-orange-400">UI</span>
                                </div>
                                <div className="w-12 h-12 rounded-full border-2 border-[#121212] bg-emerald-500/20 flex items-center justify-center backdrop-blur-md">
                                    <span className="text-xs font-mono text-emerald-400">3D</span>
                                </div>
                            </div>
                            <span className="text-sm font-mono tracking-widest text-neutral-500 uppercase ml-4">Disciplinary Spectrum</span>
                        </div>
                    </motion.div>

                    {/* Interactive Stats Grid */}
                    <div className="md:w-1/2 grid grid-cols-2 gap-4">
                        <motion.div
                            whileHover={{ scale: 0.95, borderRadius: "2rem" }}
                            transition={{ duration: 0.4 }}
                            className="bg-white/[0.03] border border-white/5 p-8 rounded-3xl flex flex-col justify-end min-h-[200px]"
                        >
                            <span className="text-5xl md:text-6xl font-medium text-white mb-2">02+</span>
                            <span className="text-neutral-500 uppercase tracking-widest text-xs font-semibold">Years Exp.</span>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 0.95, borderRadius: "2rem" }}
                            transition={{ duration: 0.4 }}
                            className="bg-blue-500/[0.03] border border-blue-500/10 p-8 rounded-3xl flex flex-col justify-end min-h-[200px]"
                        >
                            <span className="text-5xl md:text-6xl font-medium text-blue-400 mb-2 font-serif italic">YC</span>
                            <span className="text-blue-500/50 uppercase tracking-widest text-xs font-semibold">Founding Designer</span>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 0.95, borderRadius: "2rem" }}
                            transition={{ duration: 0.4 }}
                            className="bg-orange-500/[0.03] border border-orange-500/10 p-8 rounded-3xl flex flex-col justify-end min-h-[200px] col-span-2"
                        >
                            <span className="text-4xl md:text-5xl font-medium text-orange-400 mb-2">Plexus Award</span>
                            <span className="text-orange-500/50 uppercase tracking-widest text-xs font-semibold">Designathon Winner</span>
                        </motion.div>
                    </div>
                </div>

            </div>
        </section>
    );
}
