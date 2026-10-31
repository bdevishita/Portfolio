import Link from "next/link";

const LINKS = [
    { label: "About", href: "/#about" },
    { label: "Projects", href: "/#projects" },
    { label: "Lab", href: "/lab", highlight: true },
    { label: "Contact", href: "/#contact" },
];

export default function Header() {
    return (
        <header className="fixed inset-x-0 top-0 z-50 bg-gradient-to-b from-black/60 to-transparent backdrop-blur-[2px]">
            <nav
                aria-label="Primary"
                className="flex items-center justify-between px-6 md:px-24 py-5 text-sm text-neutral-300"
            >
                <Link href="/" className="text-base font-medium tracking-tight text-white hover:opacity-80 transition-opacity">
                    Ishita Dev
                </Link>
                <ul className="flex items-center gap-5 md:gap-8">
                    {LINKS.map((l) => (
                        <li key={l.label}>
                            <Link
                                href={l.href}
                                className="inline-flex items-center gap-1.5 transition-colors hover:text-white focus-visible:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/70 rounded-sm"
                            >
                                {l.label}
                                {l.highlight && (
                                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#2d6dc3]" />
                                )}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}
