import { NextResponse, type NextRequest } from "next/server";

/**
 * The Daily Brief app is proxied at /labs/daily-brief/live/ and loads its files
 * with relative paths, so the URL must end in a slash. Next.js treats /live and
 * /live/ as the same route inside redirects(), so the redirect has to live here.
 */
export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    if (pathname === "/labs/daily-brief/live") {
        // Plain URL on purpose: NextURL drops the trailing slash when serialized
        return NextResponse.redirect(new URL(`${pathname}/`, request.url), 307);
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/labs/daily-brief/live"],
};
