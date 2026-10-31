/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        // /lab was the first URL for the Lab page; keep old links working
        return [{ source: "/lab", destination: "/labs", permanent: true }];
    },
};

export default nextConfig;
