import AuroraBackground from "@/components/layout/aurora-background";
import Nav from "@/components/layout/nav";
import Footer from "@/components/layout/footer";
import Preloader from "@/components/layout/preloader";
import Marquee from "@/components/layout/marquee";
import LogoMarquee from "@/components/layout/logo-marquee";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Skills from "@/components/sections/skills";
import Experience from "@/components/sections/experience";
import Projects from "@/components/sections/projects";
import Faq from "@/components/sections/faq";
import Contact from "@/components/sections/contact";
import { profile } from "@/lib/data";

const roleMarqueeItems = profile.roles.map((role) => (
  <span key={role} className="font-display text-3xl font-medium text-ink-faint md:text-4xl">
    {role}
  </span>
));

export default function Home() {
  return (
    <div className="relative flex flex-1 flex-col">
      <Preloader />
      <AuroraBackground />
      <Nav />
      <main className="flex-1">
        <Hero />
        <Marquee items={roleMarqueeItems} />
        <About />
        <Skills />
        <LogoMarquee />
        <Experience />
        <Projects />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
