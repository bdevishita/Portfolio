// Where the Daily Brief app is deployed. It is served through this site at
// /labs/daily-brief/live/ so visitors never leave ishitadev.com.
// DAILY_BRIEF_ORIGIN lets you point at a preview deployment when testing.
const DAILY_BRIEF_ORIGIN = process.env.DAILY_BRIEF_ORIGIN || "https://design-topic-generator.vercel.app";

/** @type {import('next').NextConfig} */
const nextConfig = {
    // The proxied app loads its files with relative paths (base: "./"), so its
    // URL must keep the trailing slash: /labs/daily-brief/live/
    // (src/middleware.ts adds the slash when someone leaves it off.)
    skipTrailingSlashRedirect: true,

    async redirects() {
        return [
            // /lab was the first URL for the Lab page; keep old links working
            { source: "/lab", destination: "/labs", permanent: true },
        ];
    },

    async rewrites() {
        return [
            // Serve the app from its own deployment, under this path
            { source: "/labs/daily-brief/live/:path*", destination: `${DAILY_BRIEF_ORIGIN}/:path*` },
        ];
    },
};

export default nextConfig;
