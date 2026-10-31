import Link from "next/link";
import type { ReactNode } from "react";
import "./lab.css";

/** Shared page frame (nav, content width, footer) for every page under /labs. */
export default function LabShell({ children }: { children: ReactNode }) {
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
                            <Link className="on" href="/labs" aria-current="page">
                                Lab
                            </Link>
                        </li>
                    </ul>
                </nav>

                {children}

                <footer>
                    <span>Last updated: November 1st</span>
                </footer>
            </div>
        </div>
    );
}
