import React from "react";
import { ArrowUpRight } from "lucide-react";

export default function Projects() {
    const caseStudies = [
        {
            title: "Carience: Passion & Profession",
            category: "Educational App · UI/UX Design",
            description: "An educational application built to help people pursue their passions while maintaining a balance with their profession.",
            color: "from-blue-500/10 to-transparent",
            link: "https://www.behance.net/devishita"
        },
        {
            title: "Coweb: Collaborative Community",
            category: "Platform · UX Design",
            description: "A collaborative community platform aiming to connect and empower creatives. Extensively usability tested.",
            color: "from-purple-500/10 to-transparent",
            link: "https://www.behance.net/gallery/220400111/Coweb-a-Collaborative-community-platform"
        },
        {
            title: "Wet Waste Management",
            category: "Sustainability Initiative",
            description: "Sustainable end-to-end wet waste management product design.",
            color: "from-emerald-500/10 to-transparent",
            link: "https://www.behance.net/gallery/220375755/Wet-Waste-Management"
        },
        {
            title: "Biomimicry & Helmet Concept",
            category: "Product Design",
            description: "Industrial product design exploring biomimicry principles applied to safety gear.",
            color: "from-purple-500/10 to-transparent",
            link: "https://www.behance.net/gallery/199117669/Helmet-Concept-Design"
        },
        {
            title: "UHV Chatbot",
            category: "AI · conversational interface",
            description: "An intuitive conversational AI interface designed to help users interact efficiently.",
            color: "from-orange-500/10 to-transparent",
            link: "https://www.behance.net/gallery/191860583/UHV-Chatbot"
        },
        {
            title: "Pinterest Redesign",
            category: "UI Redesign · Concept",
            description: "A comprehensive interface redesign of Pinterest focused on modern aesthetics and improved usability.",
            color: "from-rose-500/10 to-transparent",
            link: "https://www.behance.net/gallery/145771941/Redesigning-Pinterest-Interface"
        }
    ];

    return (
        <section id="projects" className="scroll-mt-16 relative z-20 w-full bg-background pb-40 pt-12 px-6 md:px-24">
            <div className="max-w-7xl mx-auto">
                <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-12">
                    <div>
                        <h2 className="text-5xl md:text-7xl font-medium tracking-tight text-white mb-6 font-serif italic">
                            Selected Works
                        </h2>
                        <p className="text-neutral-400 text-lg md:text-xl max-w-lg font-light">
                            Featured interfaces and platform designs curated from my professional roles.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                    {caseStudies.map((project, i) => (
                        <a
                            key={i}
                            href={project.link}
                            target="_blank"
                            rel="noreferrer"
                            className="group relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-white/5 bg-white/[0.02] backdrop-blur-xl p-8 md:p-12 transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl hover:shadow-black/50 hover:bg-white/[0.04]"
                        >
                            {/* Ambient Glow */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out pointer-events-none`} />

                            {/* Inner Shine */}
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                            <div className="relative z-10 h-full flex flex-col justify-between min-h-[250px] md:min-h-[320px]">
                                <div className="flex justify-between items-start">
                                    <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                                        <span className="text-xs font-semibold tracking-widest text-neutral-300 uppercase">
                                            {project.category}
                                        </span>
                                    </div>
                                    <div className="p-3 rounded-full border border-white/10 bg-white/5 text-neutral-400 group-hover:bg-white text-white group-hover:text-black transition-all duration-500 transform group-hover:rotate-45">
                                        <ArrowUpRight size={20} className="stroke-2" />
                                    </div>
                                </div>

                                <div className="mt-12 group-hover:translate-x-2 transition-transform duration-500 ease-out">
                                    <h3 className="text-4xl md:text-5xl font-medium tracking-tight text-white mb-4">
                                        {project.title}
                                    </h3>
                                    <p className="text-neutral-400 md:text-lg leading-relaxed max-w-md font-light">
                                        {project.description}
                                    </p>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
