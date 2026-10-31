import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import "./lab.css";

export const metadata: Metadata = {
    title: "Lab — Ishita Dev",
    description: "Small experiments, side projects and daily challenges by Ishita Dev.",
};

type Experiment = {
    slug: string;
    title: string;
    meta: string;
    href: string;
    visual: ReactNode;
};

const BRIEFS = ["A bank for night owls", "A recipe app for one", "A library for lost things", "A bank for night owls"];

function DailyBriefVisual() {
    return (
        <div className="media m-brief" aria-hidden="true">
            <div className="dg">
                {Array.from({ length: 100 }, (_, i) => (
                    <i key={i} style={{ animationDelay: `${(i * 0.035).toFixed(3)}s` }} />
                ))}
            </div>
            <div className="pill">
                <div className="pill-slide">
                    <div>
                        {BRIEFS.map((brief, i) => (
                            <span key={i}>{brief}</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

/**
 * To add an experiment, append an entry here. Each one renders as a full-width
 * card in a single column. `visual` should return a `.media` block (see lab.css).
 * Links point at the Vercel app for now; swap `href` once the portfolio route exists.
 */
const EXPERIMENTS: Experiment[] = [
    {
        slug: "daily-brief",
        title: "Daily Brief",
        meta: "Topic generator + 100 Days of AI · 2026",
        href: "https://design-topic-generator.vercel.app",
        visual: <DailyBriefVisual />,
    },
];

export default function LabPage() {
    return (
        <div className="lab">
            <div className="wrap">
                <nav aria-label="Primary">
                    <Link className="logo" href="/">
                        Ishita Dev
                    </Link>
                    <ul>
                        <li>
                            <Link href="/">Work</Link>
                        </li>
                        <li>
                            <Link className="on" href="/lab" aria-current="page">
                                Lab
                            </Link>
                        </li>
                    </ul>
                </nav>

                <header className="intro">
                    <h1>Lab</h1>
                    <p>
                        Small experiments, side projects and daily challenges. Things I build to learn, with no brief
                        attached.
                    </p>
                </header>

                <main>
                    <ul className="gallery" aria-label="Experiments">
                        {EXPERIMENTS.map((e) => (
                            <li key={e.slug}>
                                <a className="item" href={e.href} target="_blank" rel="noopener noreferrer">
                                    {e.visual}
                                    <div className="cap">
                                        <b>{e.title}</b>
                                        <span>{e.meta}</span>
                                    </div>
                                    <span className="sr-only">Opens in a new tab</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </main>

                <footer>
                    <span>Last updated: October 31st</span>
                </footer>
            </div>
        </div>
    );
}
