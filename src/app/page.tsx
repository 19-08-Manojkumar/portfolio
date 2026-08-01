import AuroraBackground from "@/components/layout/aurora-background";
import Nav from "@/components/layout/nav";
import Footer from "@/components/layout/footer";
import Preloader from "@/components/layout/preloader";
import Marquee from "@/components/layout/marquee";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Skills from "@/components/sections/skills";
import Experience from "@/components/sections/experience";
import Projects from "@/components/sections/projects";
import Contact from "@/components/sections/contact";
import { profile } from "@/lib/data";

export default function Home() {
  return (
    <div className="relative flex flex-1 flex-col">
      <Preloader />
      <AuroraBackground />
      <Nav />
      <main className="flex-1">
        <Hero />
        <Marquee items={profile.roles} />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
