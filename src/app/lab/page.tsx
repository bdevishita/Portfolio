import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import "./lab.css";

export const metadata: Metadata = {
    title: "Lab — Ishita Dev",
    description: "Small experiments, side projects and daily challenges by Ishita Dev.",
};

const LANGS = ["Hello", "नमस्ते", "Hola", "Bonjour", "こんにちは", "Ciao", "안녕하세요"];
const MAZE = "111111111,1p1ppp1p1,1p1p1p1p1,1ppp1pppp,111p1p111,1ppp1ppp1,1p111p1p1,1ppppppp1,111111111"
    .split(",")
    .join("")
    .split("");
const TOPIC_URL = "https://design-topic-generator.vercel.app";

function Item({
    title,
    meta,
    href,
    wide,
    children,
}: {
    title: string;
    meta: string;
    href?: string;
    wide?: boolean;
    children: ReactNode;
}) {
    const cls = `item${wide ? " wide" : ""}`;
    const body = (
        <>
            {children}
            <div className="cap">
                <b>{title}</b>
                <span>{meta}</span>
            </div>
        </>
    );
    return href ? (
        <a className={cls} href={href} target="_blank" rel="noopener noreferrer">
            {body}
        </a>
    ) : (
        <div className={cls}>{body}</div>
    );
}

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
                    <Item wide title="100 Days of AI" meta="Challenge · 2026" href={TOPIC_URL}>
                        <div className="media m-100">
                            <div className="dg">
                                {Array.from({ length: 100 }, (_, i) => (
                                    <i key={i} style={{ animationDelay: `${(i * 0.035).toFixed(3)}s` }} />
                                ))}
                            </div>
                            <div className="big">100</div>
                        </div>
                    </Item>

                    <Item title="Design Topic Generator" meta="Tool · 2026" href={TOPIC_URL}>
                        <div className="media m-topic">
                            <div className="topics">
                                <div>
                                    <span>A bank for night owls</span>
                                    <span>A recipe app for one</span>
                                    <span>A library for lost things</span>
                                    <span>A bank for night owls</span>
                                </div>
                            </div>
                        </div>
                    </Item>

                    <Item title="Seven-language loader" meta="Animation · 2026">
                        <div className="media m-hello">
                            <div className="hello">
                                {LANGS.map((t, i) => (
                                    <span key={t} style={{ animationDelay: `${i}s` }}>
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </Item>

                    <Item title="Logo morph" meta="Interaction design · 2026">
                        <div className="media m-logo">
                            <div className="morph">
                                <span className="a">Logo</span>
                                <span className="b">Ishita Dev</span>
                            </div>
                        </div>
                    </Item>

                    <Item title="The Maze" meta="Game · 2026">
                        <div className="media m-maze">
                            <div className="maze">
                                {MAZE.map((c, i) => (
                                    <i key={i} className={c === "p" ? "p" : undefined} />
                                ))}
                                <div className="dot" />
                            </div>
                        </div>
                    </Item>

                    <Item title="Maison S." meta="Website · 2026">
                        <div className="media m-maison">
                            <span>MAISON S.</span>
                        </div>
                    </Item>

                    <Item title="Snaps" meta="Photography · 2026">
                        <div className="media m-snaps">
                            <b />
                            <b />
                            <b />
                            <b />
                        </div>
                    </Item>
                </main>

                <footer>
                    <span>Last updated: October 31st</span>
                </footer>
            </div>
        </div>
    );
}
