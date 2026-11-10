import SiteNav from "@/components/SiteNav";
import type { ReactNode } from "react";
import "./lab.css";

/** Shared page frame (nav, content width, footer) for every page under /labs. */
export default function LabShell({ children }: { children: ReactNode }) {
    return (
        <div className="lab">
            <div className="wrap">
                <SiteNav current="lab" />

                {children}

                <footer>
                    <span>Last updated: November 1st</span>
                </footer>
            </div>
        </div>
    );
}
