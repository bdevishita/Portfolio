import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Header from "@/components/Header";

export default function Home() {
    return (
        <main className="bg-background min-h-screen relative font-sans selection:bg-white/20 selection:text-white">
            <Header />

            {/* 
        The top-level container for the scroll sequence.
        Using 250vh-500vh ensures we have plenty of physical scrolling room 
        for the canvas to animate through the frames.
      */}
            <div className="relative w-full">
                {/* The canvas renderer responsible for the scrolling images */}
                <ScrollyCanvas numFrames={120} />

                {/* The beautiful staggered typography overlay */}
                <Overlay />
            </div>

            {/* 
        The rest of the sections flow naturally below the cinematic scroll context 
      */}
            <div className="flex flex-col">
                <About />
                <Skills />
                <Experience />
                <Projects />
                <Contact />
            </div>

        </main>
    );
}
