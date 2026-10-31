import type { Metadata } from "next";
import Link from "next/link";
import LabShell from "./LabShell";
import { EXPERIMENTS } from "./experiments";

export const metadata: Metadata = {
    title: "Lab — Ishita Dev",
    description: "Small experiments, side projects and daily challenges by Ishita Dev.",
};

export default function LabsPage() {
    return (
        <LabShell>
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
                            <Link className="item" href={`/labs/${e.slug}`}>
                                {e.visual}
                                <div className="cap">
                                    <b>{e.title}</b>
                                    <span>{e.meta}</span>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </main>
        </LabShell>
    );
}
