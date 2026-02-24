import React from "react";

export default function Skills() {
    const skillCategories = [
        {
            title: "UX Design",
            items: ["User Research", "Information Architecture", "Rapid Prototyping", "Wireframes", "Prototypes", "Usability Testing", "Storyboarding", "Affinity diagram", "User flow", "Journey mapping"]
        },
        {
            title: "Product",
            items: ["Design Sprints", "Product Thinking", "Data Analysis", "SCAMPER", "A/B Testing", "SWOT Analysis"]
        },
        {
            title: "Visual Design",
            items: ["Typography", "Layout", "Grid System", "Color Theory", "Logo Design", "Brand Identity", "Responsive Design", "Micro interactions", "Carousels", "Mockups"]
        },
        {
            title: "Tools & Tech",
            items: ["Figma", "Figjam", "Notion", "Adobe Photoshop", "Adobe Illustrator", "Adobe Indesign", "Adobe XD", "Spline", "Dora", "Autocad", "Fusion 360", "Adobe Premiere Pro"]
        }
    ];

    return (
        <section className="relative z-20 w-full bg-background py-32 px-6 md:px-24 border-t border-white/5">
            <div className="max-w-7xl mx-auto">

                <div className="mb-20">
                    <h2 className="text-4xl md:text-6xl font-medium tracking-tight text-white mb-6 font-serif italic">
                        Skills & Arsenal
                    </h2>
                    <p className="text-neutral-400 text-lg md:text-xl max-w-2xl font-light">
                        A comprehensive toolkit combining deep user empathy, strategic product thinking, and precise visual execution.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {skillCategories.map((category, idx) => (
                        <div key={idx} className="flex flex-col">
                            <h3 className="text-2xl font-medium text-white mb-6 tracking-tight border-b border-white/10 pb-4">
                                {category.title}
                            </h3>
                            <ul className="flex flex-col gap-3">
                                {category.items.map((item, i) => (
                                    <li key={i} className="text-neutral-400 font-light flex items-center gap-3">
                                        <div className="w-1 h-1 rounded-full bg-white/30" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
