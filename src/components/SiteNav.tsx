"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/** Same navigation as the static pages in /public (logo, links, light/dark dot). */
export default function SiteNav({ current }: { current?: "lab" }) {
    const [dark, setDark] = useState(false);

    // Follow the choice saved by the switch (shared with the static pages).
    useEffect(() => {
        let saved: string | null = null;
        try {
            saved = localStorage.getItem("theme");
        } catch {
            /* private mode */
        }
        if (saved === "light" || saved === "dark") document.documentElement.setAttribute("data-theme", saved);
        const mq = window.matchMedia("(prefers-color-scheme: dark)");
        setDark(saved ? saved === "dark" : mq.matches);
    }, []);

    function toggle() {
        const next = dark ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        try {
            localStorage.setItem("theme", next);
        } catch {
            /* the choice just won't be remembered */
        }
        setDark(!dark);
    }

    return (
        <nav className="site-nav" aria-label="Primary">
            <Link className="brand" href="/" aria-label="By Ishita Dev">
                <svg className="logo" viewBox="0 0 222 181" fill="currentColor" aria-hidden="true">
                    <path d="M11.5 180.75C4.75 180.75 2.6077e-08 175.75 2.6077e-08 169.75C2.6077e-08 159 15.5 137.75 15.5 103.25V77.5C15.5 42.75 2.6077e-08 21.5 2.6077e-08 10.75C2.6077e-08 4.74999 4.75 -1.23978e-05 11.5 -1.23978e-05H58C65 -1.23978e-05 69.75 4.74999 69.75 10.75C69.75 21.5 54.25 42.75 54.25 77.5V103.25C54.25 137.75 69.75 159 69.75 169.75C69.75 175.75 65 180.75 58 180.75H11.5ZM148.934 12.75H146.184C128.434 12.75 129.934 67.5 129.934 77.5V103.25C129.934 113 128.434 167.75 146.184 167.75H148.934C163.184 167.75 172.684 136.75 172.684 90.25C172.684 43.75 163.184 12.75 148.934 12.75ZM149.434 180.75H87.1836C80.4336 180.75 75.6836 175.75 75.6836 169.75C75.6836 159 91.1836 137.75 91.1836 103.25V77.5C91.1836 42.75 75.6836 21.5 75.6836 10.75C75.6836 4.74999 80.4336 -1.23978e-05 87.1836 -1.23978e-05H149.434C208.434 -1.23978e-05 221.934 46.25 221.934 90.25C221.934 134.5 208.434 180.75 149.434 180.75Z"/>
                </svg>
            </Link>
            <a href="/#work">Work</a>
            <Link href="/labs" className={current === "lab" ? "on" : undefined} aria-current={current === "lab" ? "page" : undefined}>
                Lab
            </Link>
            <a href="/writing.html">Writing</a>
            <a href="/about">About</a>
            <a href="mailto:b.devishita@gmail.com">Contact</a>
            <button
                type="button"
                className="theme-dot"
                onClick={toggle}
                aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
                title={dark ? "Switch to light mode" : "Switch to dark mode"}
            >
                <span aria-hidden="true" />
            </button>
        </nav>
    );
}
