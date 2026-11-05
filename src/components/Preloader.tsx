"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Greeting-only preloader for ishitadev.com (Next.js + Framer Motion)
 *
 * Usage (app/layout.tsx): render <Preloader /> as the first child of <body>.
 *
 * - Cycles greetings, then a curved curtain lifts away.
 * - Plays once per browser session (sessionStorage).
 * - Respects prefers-reduced-motion.
 * - Locks scroll while loading.
 */

const WORDS = ["Hello", "नमस्ते", "Hola", "Bonjour", "Ciao", "ನಮಸ್ಕಾರ"]; // last one is Kannada (Bengaluru)
const WORD_MS = 100; // time each greeting stays on screen
const BG = "#f4efe6"; // portfolio cream
const FG = "#2d6dc3"; // portfolio blue
// Bricolage Grotesque is loaded in app/layout.tsx and exposed as --font-bricolage
const FONT = 'var(--font-bricolage), "Bricolage Grotesque", system-ui, -apple-system, sans-serif';

export default function Preloader() {
  const [show, setShow] = useState(true);
  const [wordIndex, setWordIndex] = useState(0);
  const [dim, setDim] = useState({ w: 0, h: 0 });

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("preloader-seen") === "1";
    } catch {}
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduce) setShow(false);
    setDim({ w: window.innerWidth, h: window.innerHeight });
  }, []);

  useEffect(() => {
    document.body.style.overflow = show ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [show]);

  // Cycle greetings, then exit
  useEffect(() => {
    if (!show) return;
    let i = 0;
    const timer = setInterval(() => {
      i += 1;
      if (i < WORDS.length) {
        setWordIndex(i);
      } else {
        clearInterval(timer);
        const finish = () => {
          setTimeout(() => {
            try {
              sessionStorage.setItem("preloader-seen", "1");
            } catch {}
            setShow(false);
          }, 300);
        };
        if (document.readyState === "complete") finish();
        else window.addEventListener("load", finish, { once: true });
      }
    }, WORD_MS);
    return () => clearInterval(timer);
  }, [show]);

  const { w, h } = dim;
  const curved = `M0 0 L${w} 0 L${w} ${h} Q${w / 2} ${h + 300} 0 ${h} L0 0`;
  const flat = `M0 0 L${w} 0 L${w} ${h} Q${w / 2} ${h} 0 ${h} L0 0`;
  const exitEase = [0.76, 0, 0.24, 1] as const;

  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          key="preloader"
          aria-hidden
          initial={{ top: 0 }}
          exit={{ top: "-100vh", transition: { duration: 1.0, ease: exitEase, delay: 0.1 } }}
          style={{
            position: "fixed",
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 9999,
            backgroundColor: BG, // covers the page before the curved SVG mounts
            fontFamily: FONT,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: FG,
          }}
        >
          {w > 0 && (
            <svg
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "calc(100% + 300px)",
                pointerEvents: "none",
              }}
            >
              <motion.path
                fill={BG}
                initial={{ d: curved }}
                exit={{ d: flat, transition: { duration: 1.0, ease: exitEase, delay: 0.1 } }}
              />
            </svg>
          )}

          {/* Words swap instantly: no fade, blur or slide */}
          <motion.div exit={{ opacity: 0, transition: { duration: 0.4 } }} style={{ position: "relative" }}>
            <span
              style={{
                display: "block",
                fontSize: "clamp(1.5rem, 3.5vw, 2.75rem)",
                fontWeight: 500,
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
              }}
            >
              {WORDS[wordIndex]}
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
