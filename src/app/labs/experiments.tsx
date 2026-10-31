import type { ReactNode } from "react";

export type Section = {
    heading: string;
    paragraphs?: string[];
    bullets?: string[];
};

export type Experiment = {
    /** URL segment: /labs/<slug> */
    slug: string;
    title: string;
    /** Short line shown under the card and in page metadata */
    meta: string;
    /** One-sentence pitch shown under the title on the project page */
    tagline: string;
    /** Where the working app lives */
    liveUrl: string;
    liveLabel: string;
    facts: { label: string; value: string }[];
    sections: Section[];
    /** A `.media` block (see lab.css), used on the card and the project page */
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
 * To add an experiment, append an entry here. It appears on /labs automatically
 * and gets its own page at /labs/<slug>.
 */
export const EXPERIMENTS: Experiment[] = [
    {
        slug: "daily-brief",
        title: "Daily Brief",
        meta: "Topic generator + 100 Days of AI · 2026",
        tagline: "A random design brief whenever you need one, and a 100-day challenge to build something from each.",
        liveUrl: "https://design-topic-generator.vercel.app",
        liveLabel: "Open the live app",
        facts: [
            { label: "Year", value: "2026" },
            { label: "Type", value: "Tool + daily challenge" },
            { label: "Built with", value: "React, Vite" },
            { label: "Status", value: "In progress" },
        ],
        sections: [
            {
                heading: "What it is",
                paragraphs: [
                    "Daily Brief started as the Design Topic Generator, a small tool that hands you a random design topic when you want to practise and have nothing to work on.",
                    "The 100 Days of AI mode turns that into a daily habit: one challenge a day, for 100 days.",
                ],
            },
            {
                heading: "How the 100 Days mode works",
                bullets: [
                    "Each day offers three project challenges. You pick the one you want to build.",
                    "Every challenge is a product, idea or project to build, with key topics to cover and hints to get started.",
                    "There are more than 100 challenges, and the ideas come from real problems people face.",
                    "A GitHub-style streak and a full 100-day grid track your progress.",
                    "Challenges you have started stay in an In progress section, so nothing gets lost.",
                ],
            },
            {
                heading: "Why I built it",
                paragraphs: [
                    "I wanted a stronger portfolio and a habit to go with it. Building something small every day shows discipline and the way I work through a problem.",
                ],
            },
        ],
        visual: <DailyBriefVisual />,
    },
];

export function getExperiment(slug: string) {
    return EXPERIMENTS.find((e) => e.slug === slug);
}
