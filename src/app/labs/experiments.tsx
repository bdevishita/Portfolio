import type { ReactNode } from "react";
import { DailyLoop, TopicFlow } from "./Diagrams";

export type Section = {
    heading: string;
    paragraphs?: string[];
    bullets?: string[];
    /** A line diagram shown full width under the text */
    visual?: ReactNode;
};

export type Experiment = {
    /** URL segment: /labs/<slug> */
    slug: string;
    title: string;
    /** Short line shown under the card and in page metadata */
    meta: string;
    /** One-sentence pitch shown under the title on the project page */
    tagline: string;
    /** Where the working app lives. A path starting with "/" opens on this site in the same tab */
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

function PresenceVisual() {
    return (
        <div className="media m-presence" aria-hidden="true">
            <div className="pr-tap">
                <span className="pr-ring" />
                <span className="pr-ring" />
                <span className="pr-ring" />
                <div className="pr-link">presence/ishitadev</div>
            </div>
            <div className="pr-chips">
                <span>Designer</span>
                <span>Cekura</span>
                <span>Speaker</span>
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
        liveUrl: "/labs/daily-brief/live/",
        liveLabel: "Open the live app",
        facts: [
            { label: "Year", value: "2026" },
            { label: "Type", value: "Tool + daily challenge" },
            { label: "Built with", value: "Claude, Figma, React, Vite, Vercel" },
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
                heading: "How the topic generator works",
                bullets: [
                    "Draw a topic from a shuffled deck of 615. A topic does not come back until you have been through the whole deck.",
                    "Every topic has a number, from #1 to #615, shown above it.",
                    "Set a timer for your research, from 1 to 600 minutes (30 by default). Start, pause, resume or reset it, and the clock pulses when time is up.",
                    "To revisit a topic, type its number under Go to # and press Open. Copy topic saves it with its number.",
                    "The colours change with every draw.",
                ],
                visual: <TopicFlow />,
            },
            {
                heading: "How the 100 Days mode works",
                bullets: [
                    "Each day offers three project challenges. You pick the one you want to build.",
                    "There are 108 challenges across nine areas of life and three difficulty levels. The ideas come from real problems people face.",
                    "Every challenge has the problem, key topics to cover and hints to get started.",
                    "A GitHub-style streak and a full 100-day grid track your progress.",
                    "Challenges you have started stay in an In progress section, so nothing gets lost.",
                ],
                visual: <DailyLoop />,
            },
            {
                heading: "Why I built it",
                paragraphs: [
                    "I wanted to build something every day and learn AI by making things, not only reading about them. A small daily challenge keeps me consistent.",
                    "The topic generator comes from the same habit: a prompt and a timer, so there is always something to start on.",
                ],
            },
        ],
        visual: <DailyBriefVisual />,
    },
    {
        slug: "presence",
        title: "Presence",
        meta: "Link-first networking profile · 2026",
        tagline: "One link, tapped from an NFC tag, that shows the right version of me to each person I meet and lets them share their details back.",
        liveUrl: "https://presence-wine-beta.vercel.app/ishitadev",
        liveLabel: "Open my Presence page",
        facts: [
            { label: "Year", value: "2026" },
            { label: "Type", value: "Web app" },
            { label: "Built with", value: "Claude, Next.js, Supabase, Vercel" },
            { label: "Status", value: "Prototype" },
        ],
        sections: [
            {
                heading: "What it is",
                paragraphs: [
                    "Presence is a link that stands in for a business card. Tap an NFC tag or scan a code and a page opens on the other person's phone. They do not need an app.",
                    "From that page they can save my contact, connect on LinkedIn, and send their own details back to me.",
                ],
            },
            {
                heading: "The problem",
                paragraphs: [
                    "At events I meet people and then forget to follow up. A business card gives them my details, but it gives me nothing of theirs.",
                    "Presence turns the exchange around. Whoever opens my link can share their name and LinkedIn or email in a few seconds, so I leave the conversation with their details already saved.",
                ],
            },
            {
                heading: "How it works",
                bullets: [
                    "Personas. I keep different versions of myself, such as designer, Cekura or speaker. Each has its own headline, story, links and its own link to share.",
                    "I choose what is shared. Each persona decides whether email, phone and LinkedIn go into the contact card.",
                    "Share yours back. The visitor sends their details to a private People list in my dashboard.",
                    "Follow-up. Each person gets a prepared LinkedIn message that mentions where we met. I read it, change it and send it myself. Presence never sends messages for me.",
                    "Login is by email link. There are no passwords to remember.",
                ],
            },
            {
                heading: "Why I built it",
                paragraphs: [
                    "I wanted to see how far a designer with no coding background could take a real product with Claude: from a sketch to accounts, a database and a live site.",
                    "I started from the moment of meeting someone, and designed the rest around making that moment easy.",
                ],
            },
        ],
        visual: <PresenceVisual />,
    },
];

export function getExperiment(slug: string) {
    return EXPERIMENTS.find((e) => e.slug === slug);
}
