import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import LabShell from "../LabShell";
import { EXPERIMENTS, getExperiment } from "../experiments";

type Props = { params: { slug: string } };

export function generateStaticParams() {
    return EXPERIMENTS.map((e) => ({ slug: e.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
    const e = getExperiment(params.slug);
    if (!e) return {};
    return {
        title: `${e.title} — Lab — Ishita Dev`,
        description: e.tagline,
    };
}

export default function ExperimentPage({ params }: Props) {
    const e = getExperiment(params.slug);
    if (!e) notFound();

    return (
        <LabShell>
            <main>
                <header className="detail-head">
                    <Link className="crumb" href="/labs">
                        <span aria-hidden="true">←</span> Lab
                    </Link>
                    <h1>{e.title}</h1>
                    <p className="tagline">{e.tagline}</p>
                    {e.liveUrl.startsWith("/") ? (
                        // Plain anchor on purpose: this path is proxied to another app, so it needs a full page load
                        <a className="cta" href={e.liveUrl}>
                            {e.liveLabel} <span aria-hidden="true">→</span>
                        </a>
                    ) : (
                        <a className="cta" href={e.liveUrl} target="_blank" rel="noopener noreferrer">
                            {e.liveLabel} <span aria-hidden="true">↗</span>
                            <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                    )}
                </header>

                <div className="hero">{e.visual}</div>

                <dl className="facts">
                    {e.facts.map((f) => (
                        <div key={f.label}>
                            <dt>{f.label}</dt>
                            <dd>{f.value}</dd>
                        </div>
                    ))}
                </dl>

                <div className="stories">
                    {e.sections.map((s) => (
                        <section className="story" key={s.heading}>
                            <h2>{s.heading}</h2>
                            <div className="story-body">
                                {s.paragraphs?.map((p, i) => <p key={i}>{p}</p>)}
                                {s.bullets && (
                                    <ul>
                                        {s.bullets.map((b, i) => (
                                            <li key={i}>{b}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </section>
                    ))}
                </div>
            </main>
        </LabShell>
    );
}
