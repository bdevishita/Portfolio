"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

export default function Overlay() {
    const overlayRef = useRef<HTMLDivElement>(null);

    // Track scroll inside the 500vh boundary
    const { scrollYProgress } = useScroll({
        target: overlayRef,
        offset: ["start start", "end end"],
    });

    // Smooth, Awwwards-tier stagger map
    // Section 1: Hero (visible initially, fades out quickly as user starts scrolling)
    const opacity1 = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0]);
    const y1 = useTransform(scrollYProgress, [0, 0.25], [0, -150]);
    const scale1 = useTransform(scrollYProgress, [0, 0.25], [1, 0.95]);
    const blur1 = useTransform(scrollYProgress, [0, 0.15, 0.25], ["blur(0px)", "blur(0px)", "blur(20px)"]);

    // Section 2: Statement (scrolls up from bottom, pauses, leaves)
    const opacity2 = useTransform(scrollYProgress, [0.2, 0.35, 0.5, 0.65], [0, 1, 1, 0]);
    const y2 = useTransform(scrollYProgress, [0.2, 0.4, 0.5, 0.65], [100, 0, 0, -100]);
    const blur2 = useTransform(scrollYProgress, [0.2, 0.35, 0.5, 0.65], ["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"]);

    // Section 3: Connection (final text block mapping to sequence completion)
    const opacity3 = useTransform(scrollYProgress, [0.6, 0.75, 0.9, 1], [0, 1, 1, 0]);
    const y3 = useTransform(scrollYProgress, [0.6, 0.8, 0.9, 1], [100, 0, 0, -100]);
    const blur3 = useTransform(scrollYProgress, [0.6, 0.75, 0.9, 1], ["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"]);

    return (
        <div ref={overlayRef} className="absolute top-0 left-0 w-full h-[250vh] md:h-[500vh] z-10 pointer-events-none">
            <div className="sticky top-0 h-screen w-full flex flex-col justify-center px-6 md:px-24">

                {/* Section 1: Left-Aligned Hero (To avoid face block) */}
                <motion.div
                    style={{ opacity: opacity1, y: y1, scale: scale1, filter: blur1 }}
                    className="absolute inset-y-0 left-6 md:left-24 flex items-center p-8 will-change-transform"
                >
                    <div className="flex flex-col">
                        <div className="overflow-hidden mb-2">
                            <motion.h1
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                                className="text-6xl md:text-8xl lg:text-[9rem] font-medium tracking-tighter text-white drop-shadow-2xl leading-[0.9]"
                            >
                                Ishita Dev.
                            </motion.h1>
                        </div>
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                        >
                            <span className="text-xl md:text-3xl lg:text-3xl text-neutral-400 font-light tracking-wide uppercase mt-4 block">
                                UI/UX Designer.
                            </span>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Section 2: Left Aligned Statement */}
                <motion.div
                    style={{ opacity: opacity2, y: y2, filter: blur2 }}
                    className="absolute inset-y-0 left-6 md:left-24 flex items-center p-8 max-w-3xl will-change-transform"
                >
                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight text-white drop-shadow-xl leading-[1.1]">
                        I design <br className="hidden md:block" />
                        <span className="text-blue-400 font-serif italic font-light">intuitive</span> <br />
                        experiences.
                    </h2>
                </motion.div>

                {/* Section 3: Right Aligned Connection */}
                <motion.div
                    style={{ opacity: opacity3, y: y3, filter: blur3 }}
                    className="absolute inset-y-0 right-6 md:right-24 flex items-center p-8 max-w-3xl justify-end text-right will-change-transform"
                >
                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight text-white drop-shadow-xl leading-[1.1]">
                        Bridging design <br className="hidden md:block" />
                        <span className="text-orange-400 font-serif italic font-light">and people.</span>
                    </h2>
                </motion.div>

            </div>
        </div>
    );
}
