"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";

export default function ScrollyCanvas({
    numFrames = 120, // Based on the 0-119 image sequence
}: {
    numFrames?: number;
}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const currentIndexRef = useRef(0);

    // Map scroll progress over the container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Calculate the current frame smoothly
    const currentFrame = useTransform(scrollYProgress, [0, 1], [0, numFrames - 1]);

    const drawFrame = useCallback((frameIndex: number, imgs: HTMLImageElement[] = images) => {
        if (imgs.length === 0 || !canvasRef.current) return;

        const index = Math.max(0, Math.min(imgs.length - 1, Math.floor(frameIndex)));
        const img = imgs[index];

        // Ensure image is fully loaded and has dimensions before attempting to draw
        if (!img || !img.complete || img.naturalWidth === 0) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d", { alpha: false });
        if (!ctx) return;

        // Use precise intrinsic image boundaries
        if (canvas.width !== img.naturalWidth || canvas.height !== img.naturalHeight) {
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
        }

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }, [images]);

    // Preload all high-res sequence images
    useEffect(() => {
        const loadedImages: HTMLImageElement[] = [];
        let loadedCount = 0;

        // Preload loop
        for (let i = 0; i < numFrames; i++) {
            const img = new Image();
            const frameIndex = i.toString().padStart(3, "0");
            // Using PNG sequence paths from the /public/sequence/ directory
            img.src = `/sequence/frame_${frameIndex}_delay-0.067s.png`;
            loadedImages.push(img);

            img.onload = () => {
                loadedCount++;
                // Draw immediately if it's the first frame or current frame to prevent white flash
                if (i === 0 || i === currentIndexRef.current) {
                    drawFrame(currentIndexRef.current, loadedImages);
                }
            };
        }
        setImages(loadedImages);
    }, [numFrames, drawFrame]);


    // Scrubbing logic via Framer Motion without React re-renders overhead
    useMotionValueEvent(currentFrame, "change", (latest) => {
        const newIndex = Math.floor(latest);
        if (newIndex !== currentIndexRef.current) {
            currentIndexRef.current = newIndex;
            // Use requestAnimationFrame for smoothest 60-120fps sync
            requestAnimationFrame(() => drawFrame(newIndex));
        }
    });

    return (
        <div ref={containerRef} className="relative h-[300vh] md:h-[500vh] w-full bg-background z-0">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-[#121212]">

                {/* We use object-cover directly on the canvas, allowing CSS to handle all window scaling instantly without JS layout math! */}
                <canvas
                    ref={canvasRef}
                    className="block w-full h-full object-cover object-center pointer-events-none"
                />

                {/* Subtle vignette for cinematic feel covering edges */}
                <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,#121212_100%)] opacity-[0.85]" />
            </div>
        </div>
    );
}
