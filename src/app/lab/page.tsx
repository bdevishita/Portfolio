import type { Metadata } from "next";
import Link from "next/link";
import "./lab.css";

export const metadata: Metadata = {
    title: "Lab — Ishita Dev",
    description: "Small experiments, side projects and daily challenges by Ishita Dev.",
};

const BRIEFS = ["A bank for night owls", "A recipe app for one", "A library for lost things", "A bank for night owls"];
const PROJECT_URL = "https://design-topic-generator.vercel.app";

export default function LabPage() {
    return (
        <div className="lab">
            <div className="wrap">
                <nav>
                    <Link className="logo" href="/">
                        Ishita Dev
                    </Link>
                    <ul>
                        <li>
                            <Link href="/">Work</Link>
                        </li>
                        <li>
                            <Link className="on" href="/lab">
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

                <main className="gallery">
                    <a className="item" href={PROJECT_URL} target="_blank" rel="noopener noreferrer">
                        <div className="media m-brief">
                            <div className="dg">
                                {Array.from({ length: 100 }, (_, i) => (
                                    <i key={i} style={{ animationDelay: `${(i * 0.035).toFixed(3)}s` }} />
                                ))}
                            </div>
                            <div className="pill">
                                <div className="pill-slide">
                                    <div>
                                        {BRIEFS.map((b, i) => (
                                            <span key={i}>{b}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="cap">
                            <b>Daily Brief</b>
                            <span>Topic generator + 100 Days of AI · 2026</span>
                        </div>
                    </a>
                </main>

                <footer>
                    <span>Last updated: October 31st</span>
                </footer>
            </div>
        </div>
    );
}
