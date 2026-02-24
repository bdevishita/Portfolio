"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PolaroidCamera() {
    const [isPrinted, setIsPrinted] = useState(false);

    const handlePrint = () => {
        if (!isPrinted) {
            setIsPrinted(true);
        }
    };

    return (
        <div className="relative w-full max-w-sm mx-auto flex flex-col items-center justify-start mt-12 mb-32 h-[500px]">

            {/* The Camera Body */}
            <div className="relative z-20 w-[300px] h-[360px] bg-[#e5e5e5] rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/50 flex flex-col items-center p-6">

                {/* Screws */}
                <div className="absolute top-3 left-3 w-1.5 h-1.5 rounded-full bg-black/20" />
                <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-black/20" />
                <div className="absolute bottom-3 left-3 w-1.5 h-1.5 rounded-full bg-black/20" />
                <div className="absolute bottom-3 right-3 w-1.5 h-1.5 rounded-full bg-black/20" />

                {/* Top Section */}
                <div className="w-full flex justify-between items-start mb-8">
                    <div className="bg-[#ff5a00] text-white text-xs font-mono font-bold tracking-widest py-1.5 px-3 rounded-md shadow-inner">
                        OP-CAM-01
                    </div>
                    <div className="w-10 h-8 bg-[#222] rounded mt-1 shadow-inner border border-black/50" />
                </div>

                {/* Middle Section */}
                <div className="w-full flex justify-between items-center relative h-32">
                    {/* Speaker grill / Flash */}
                    <div className="flex flex-col gap-2">
                        <div className="grid grid-cols-3 gap-1 opacity-20">
                            {[...Array(9)].map((_, i) => (
                                <div key={i} className="w-1 h-1 rounded-full bg-black" />
                            ))}
                        </div>
                        <div className="w-10 h-10 rounded-full bg-white/50 shadow-inner mt-2 border border-black/5" />
                    </div>

                    {/* Main Lens */}
                    <button
                        onClick={handlePrint}
                        className="absolute left-1/2 -translate-x-1/2 w-32 h-32 rounded-full bg-[#111] shadow-[inset_0_5px_15px_rgba(0,0,0,1),0_5px_15px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center group active:scale-95 transition-transform"
                    >
                        {/* Lens inner ring */}
                        <div className="w-24 h-24 rounded-full bg-black flex flex-col items-center justify-center border-4 border-[#222] group-hover:border-[#333] transition-colors">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-2 opacity-50 group-hover:opacity-100 transition-opacity">
                                <rect x="3" y="8" width="18" height="12" rx="2" ry="2"></rect>
                                <circle cx="12" cy="14" r="3"></circle>
                                <path d="M7 8v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"></path>
                            </svg>
                            <span className="text-[10px] text-white/50 font-mono tracking-widest group-hover:text-white transition-colors">TAP LENS</span>
                        </div>
                    </button>

                    {/* Right buttons */}
                    <div className="flex flex-col gap-4">
                        <div className="w-6 h-6 rounded-full bg-emerald-50 shadow-inner border border-black/10 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-[#ff5a00]" />
                        </div>
                        <div className="w-6 h-6 rounded-full bg-white shadow-inner border border-black/10 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-black" />
                        </div>
                    </div>
                </div>

                {/* Bottom Section - Slot Cover */}
                <div className="absolute -bottom-8 w-full h-16 bg-[#d4d4d4] rounded-b-xl shadow-[0_10px_20px_rgba(0,0,0,0.3)] border border-white/30 flex flex-col items-center justify-end pb-3 z-30">
                    <span className="text-[10px] text-black/40 font-mono font-bold tracking-[0.2em] mb-3">TE-SYSTEM-01 / FIELD RECORDER</span>
                    {/* The physical slot slit */}
                    <div className="w-[80%] h-1.5 bg-[#111] rounded-full shadow-inner relative overflow-hidden">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-full bg-[#ff5a00] blur-[1px] opacity-80" />
                    </div>
                </div>

            </div>

            {/* The Printed Polaroid */}
            <AnimatePresence>
                {isPrinted && (
                    <motion.div
                        drag
                        dragConstraints={{ left: -200, right: 200, top: 50, bottom: 400 }}
                        whileDrag={{ scale: 1.05, rotate: 2, cursor: "grabbing" }}
                        initial={{ y: -50, opacity: 0, scale: 0.9, rotate: 0 }}
                        animate={{ y: 280, opacity: 1, scale: 1, rotate: -3 }}
                        transition={{
                            type: "spring",
                            stiffness: 80,
                            damping: 20,
                            mass: 1.2,
                            delay: 0.2 // delay simulates printing time
                        }}
                        className="absolute z-10 w-[220px] h-[260px] bg-[#fdfdfd] p-3 pb-10 flex flex-col shadow-[0_25px_50px_rgba(0,0,0,0.4)] cursor-grab origin-top"
                    >
                        <div className="w-full h-full bg-neutral-200 overflow-hidden relative">
                            {/* Fallback pattern / Actual Image */}
                            <img
                                src="/me.jpg"
                                alt="Selfie"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    // Fallback if me.jpg doesn't exist yet
                                    e.currentTarget.style.display = 'none';
                                    e.currentTarget.parentElement?.classList.add('bg-gradient-to-br', 'from-blue-200', 'to-orange-200');
                                }}
                            />
                        </div>
                        <div className="absolute bottom-3 left-0 w-full flex justify-center">
                            <span className="font-serif text-black/80 font-medium italic tracking-tight text-lg">Ishita @ Night</span>
                        </div>
                        {/* Tape effect on printed photo */}
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-6 bg-white/40 backdrop-blur-md rotate-[2deg] shadow-sm border border-white/50 z-20 pointer-events-none"></div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
