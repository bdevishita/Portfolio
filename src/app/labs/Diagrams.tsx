"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

/* Line-drawn process diagrams for the case study pages.
   - Fully drawn and readable with no JavaScript and under prefers-reduced-motion.
   - With motion allowed, outlines draw in once when scrolled into view, then small loops run
     (timer ring, tap, blinking caret, filling grid). Styles live in lab.css (.steps, .ln, .draw). */

type Step = { title: string; text: string; icon: ReactNode };

const delay = (s: string) => ({ ["--e" as string]: s }) as CSSProperties;

export function StepStrip({ label, steps }: { label: string; steps: Step[] }) {
    const ref = useRef<HTMLOListElement>(null);
    const [phase, setPhase] = useState<"idle" | "armed" | "in">("idle");

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduce || !("IntersectionObserver" in window)) return; // stay fully drawn
        setPhase("armed");
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setPhase("in");
                    io.disconnect();
                }
            },
            { threshold: 0.3 },
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    const cls = `steps${phase !== "idle" ? " armed" : ""}${phase === "in" ? " in" : ""}`;
    return (
        <ol ref={ref} className={cls} aria-label={label} style={{ ["--n" as string]: steps.length } as CSSProperties}>
            {steps.map((s, i) => (
                <li key={s.title} className="step" style={{ ["--d" as string]: `${(i * 0.28).toFixed(2)}s` } as CSSProperties}>
                    <div className="step-tile">{s.icon}</div>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                </li>
            ))}
        </ol>
    );
}

/* ---------- icons (viewBox 120 x 80) ---------- */

function Svg({ children }: { children: ReactNode }) {
    return (
        <svg viewBox="0 0 120 80" aria-hidden="true" focusable="false">
            {children}
        </svg>
    );
}

function ButtonIcon({ label }: { label: string }) {
    return (
        <Svg>
            <rect className="ln draw" pathLength={1} x="12" y="24" width="96" height="32" rx="16" />
            <text className="tx" x="60" y="43.5" textAnchor="middle">
                {label}
            </text>
            <circle className="ln b ripple" cx="94" cy="48" r="9" />
            <path className="ln b tap" d="M94 48 L94 64 L98.2 60.2 L101.2 66.8 L104 65.5 L101 59 L106.5 59 Z" />
        </Svg>
    );
}

function TopicIcon() {
    return (
        <Svg>
            <rect className="ln draw" pathLength={1} x="16" y="8" width="88" height="64" rx="10" />
            <text className="tx b" x="28" y="29">
                #214
            </text>
            <path className="ln draw" pathLength={1} d="M28 41 H92" style={delay("0.3s")} />
            <path className="ln draw" pathLength={1} d="M28 51 H80" style={delay("0.5s")} />
            <path className="ln draw" pathLength={1} d="M28 61 H68" style={delay("0.7s")} />
        </Svg>
    );
}

function TimerIcon() {
    return (
        <Svg>
            <circle className="ln track draw" pathLength={1} cx="60" cy="40" r="28" />
            <circle className="ln b ring" pathLength={1} cx="60" cy="40" r="28" transform="rotate(-90 60 40)" />
            <text className="tx lg" x="60" y="44" textAnchor="middle">
                30:00
            </text>
        </Svg>
    );
}

function RevisitIcon() {
    return (
        <Svg>
            <rect className="ln draw" pathLength={1} x="8" y="26" width="54" height="28" rx="8" />
            <text className="tx b" x="17" y="43.5">
                #214
            </text>
            <path className="ln b caret" d="M41 33 V47" />
            <path className="ln draw" pathLength={1} d="M66 40 H84 M80 36 L84 40 L80 44" style={delay("0.3s")} />
            <text className="tx sm" x="75" y="55" textAnchor="middle">
                Open
            </text>
            <rect className="ln draw" pathLength={1} x="90" y="16" width="24" height="48" rx="6" style={delay("0.5s")} />
            <path className="ln draw" pathLength={1} d="M95 28 H109 M95 36 H106 M95 44 H102" style={delay("0.7s")} />
        </Svg>
    );
}

function ChooseIcon() {
    return (
        <Svg>
            <rect className="ln draw" pathLength={1} x="6" y="18" width="32" height="48" rx="8" />
            <rect className="ln b draw" pathLength={1} x="44" y="10" width="32" height="48" rx="8" style={delay("0.2s")} />
            <rect className="ln draw" pathLength={1} x="82" y="18" width="32" height="48" rx="8" style={delay("0.4s")} />
            <path className="ln draw" pathLength={1} d="M12 32 H32 M12 42 H26" style={delay("0.5s")} />
            <path className="ln draw" pathLength={1} d="M88 32 H108 M88 42 H102" style={delay("0.7s")} />
            <path className="ln b draw" pathLength={1} d="M52 34 L58 40 L68 27" style={delay("0.9s")} />
        </Svg>
    );
}

function BuildIcon() {
    return (
        <Svg>
            <path className="ln draw" pathLength={1} d="M40 22 L20 40 L40 58" />
            <path className="ln draw" pathLength={1} d="M80 22 L100 40 L80 58" style={delay("0.2s")} />
            <path className="ln b draw" pathLength={1} d="M68 18 L52 62" style={delay("0.4s")} />
            <path className="ln b caret" d="M104 62 H114" />
        </Svg>
    );
}

function LogIcon() {
    return (
        <Svg>
            <rect className="ln draw" pathLength={1} x="18" y="8" width="84" height="64" rx="10" />
            <path className="ln draw" pathLength={1} d="M30 26 H90" style={delay("0.3s")} />
            <path className="ln draw" pathLength={1} d="M30 38 H74" style={delay("0.5s")} />
            <circle className="ln b draw" pathLength={1} cx="82" cy="56" r="9" style={delay("0.7s")} />
            <path className="ln b draw" pathLength={1} d="M77.5 56 L81 59.5 L87 52.5" style={delay("0.9s")} />
        </Svg>
    );
}

function StreakIcon() {
    const cells = Array.from({ length: 18 }, (_, i) => ({
        x: 14 + (i % 6) * 16,
        y: 10 + Math.floor(i / 6) * 16,
        on: i < 7,
        d: `${(i * 0.14).toFixed(2)}s`,
    }));
    return (
        <Svg>
            {cells.map((c, i) => (
                <rect
                    key={i}
                    className={`cell${c.on ? " on" : ""}`}
                    x={c.x}
                    y={c.y}
                    width="12"
                    height="12"
                    rx="2.5"
                    style={{ ["--c" as string]: c.d } as CSSProperties}
                />
            ))}
            <text className="tx sm" x="60" y="73" textAnchor="middle">
                7 day streak
            </text>
        </Svg>
    );
}

/* ---------- the two diagrams used on the Daily Brief page ---------- */

export function TopicFlow() {
    return (
        <StepStrip
            label="How a topic session runs"
            steps={[
                { title: "Draw", text: "One tap picks a topic from 615. The colours change with every draw.", icon: <ButtonIcon label="Draw a topic" /> },
                { title: "Read", text: "Every topic has a number, like #214, so you can find it again.", icon: <TopicIcon /> },
                { title: "Time-box", text: "Set 1 to 600 minutes, 30 by default. Start, pause or reset. The clock pulses when time is up.", icon: <TimerIcon /> },
                { title: "Revisit", text: "Type a number under Go to # and press Open to bring any topic back. Copy topic saves it with its number.", icon: <RevisitIcon /> },
            ]}
        />
    );
}

export function DailyLoop() {
    return (
        <StepStrip
            label="A day in 100 Days of AI"
            steps={[
                { title: "Reveal", text: "Three challenges appear, each from a different area of life.", icon: <ButtonIcon label="Reveal" /> },
                { title: "Choose", text: "Pick the one you can ship today, or ask for three different ones.", icon: <ChooseIcon /> },
                { title: "Build", text: "Read the problem, key topics and hints. Started challenges wait under In progress.", icon: <BuildIcon /> },
                { title: "Log", text: "Mark the day complete with an optional project link and a one-line learning.", icon: <LogIcon /> },
                { title: "Streak", text: "Your streak and the 100-day grid update. The next three unlock tomorrow.", icon: <StreakIcon /> },
            ]}
        />
    );
}
