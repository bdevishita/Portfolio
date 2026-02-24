import React from "react";

export default function Experience() {
    const experiences = [
        {
            company: "Cekura AI (YC 24)",
            role: "UI/UX Designer",
            duration: "08.2024 - Present",
            description: "Led the design of product interfaces, improving usability and user experience while collaborating with developers. As the founding designer, I played a key role in the company's selection for Y Combinator and drove design innovation across the platform.",
            color: "from-blue-500/10 to-transparent",
        },
        {
            company: "Drrute",
            role: "UI/UX Designer",
            duration: "07.2023 - 10.2023",
            description: "Led end-to-end creation of Glocal Opportunities, a comprehensive study abroad platform, and Keystone, a sustainable waste-to-green coal initiative. Designed personalized portfolios for employees.",
            color: "from-purple-500/10 to-transparent",
        },
        {
            company: "VS Energy",
            role: "UI/UX Designer",
            duration: "01.2023 - 06.2023",
            description: "Proficiently designed websites, brochures, and pamphlets. Collaborated with a team to create compelling display and space designs for project showcases at exhibitions.",
            color: "from-emerald-500/10 to-transparent",
        },
        {
            company: "Flecks Labs",
            role: "UI/UX Designer",
            duration: "10.2022 - 11.2022",
            description: "Successfully crafted a distinctive company logo and pioneered the user interface design for an innovative goods transportation app, Shippers and Truckers.",
            color: "from-orange-500/10 to-transparent",
        },
        {
            company: "Braynix",
            role: "UI/UX Designer",
            duration: "08.2022 - 11.2022",
            description: "Conducted research and led the design efforts for the comprehensive interface of the event management app, Festa. Additionally designed the interface for the pet care app, Pawzsible.",
            color: "from-rose-500/10 to-transparent",
        },
        {
            company: "ASY",
            role: "Graphic Designer",
            duration: "09.2021 - 11.2021",
            description: "Creating visually engaging materials for online and offline platforms. Develop promotional materials and social media content to enhance company image.",
            color: "from-neutral-500/10 to-transparent",
        }
    ];

    return (
        <section className="relative z-20 w-full bg-background py-32 px-6 md:px-24 border-t border-white/5">
            <div className="max-w-7xl mx-auto">
                <div className="mb-20 flex flex-col border-b border-white/10 pb-8">
                    <h2 className="text-5xl md:text-7xl font-medium tracking-tight text-white mb-6 font-serif italic">
                        Experience
                    </h2>
                    <p className="text-neutral-400 text-lg md:text-xl max-w-2xl font-light">
                        A history of driving design innovation, improving usability, and building zero-to-one products across various domains.
                    </p>
                </div>

                <div className="flex flex-col">
                    {experiences.map((exp, i) => (
                        <div
                            key={i}
                            className="group relative flex flex-col md:flex-row justify-between items-start md:items-center py-12 border-b border-white/5 hover:bg-white/[0.02] transition-colors duration-500 px-6 -mx-6 rounded-2xl"
                        >
                            {/* Ambient Glow */}
                            <div className={`absolute inset-0 bg-gradient-to-r ${exp.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl`} />

                            {/* Left Section: Company & Role */}
                            <div className="relative z-10 w-full md:w-1/3 flex flex-col gap-2 mb-6 md:mb-0">
                                <span className="text-neutral-500 font-mono text-sm uppercase tracking-wider">
                                    {exp.duration}
                                </span>
                                <h3 className="text-3xl font-medium text-white tracking-tight group-hover:translate-x-2 transition-transform duration-500">
                                    {exp.company}
                                </h3>
                                <span className="text-neutral-400 text-lg group-hover:translate-x-2 transition-transform duration-500 delay-75">
                                    {exp.role}
                                </span>
                            </div>

                            {/* Right Section: Description */}
                            <div className="relative z-10 w-full md:w-1/2 flex flex-col gap-4">
                                <p className="text-neutral-300 font-light leading-relaxed">
                                    {exp.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
