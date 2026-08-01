"use client";

import { useEffect, useState } from "react";
import { User, Layers, Briefcase, FolderGit2, Send, Sparkles } from "lucide-react";
import { profile } from "@/lib/data";

const links = [
  { href: "#about", label: "About", icon: User },
  { href: "#stack", label: "Stack", icon: Layers },
  { href: "#experience", label: "Experience", icon: Briefcase },
  { href: "#projects", label: "Projects", icon: FolderGit2 },
  { href: "#contact", label: "Contact", icon: Send },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-6"
      }`}
    >
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-full px-6 transition-all duration-500 ${
          scrolled ? "glass py-2.5 mx-4 md:mx-auto" : "py-2"
        }`}
      >
        <a
          href="#"
          className="font-display flex items-center gap-1.5 text-lg font-semibold tracking-tight"
          data-cursor-hover
        >
          {profile.initials}
          <span className="text-accent">.</span>
        </a>

        <ul className="hidden md:flex items-center gap-8 text-sm text-ink-muted">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="group flex items-center gap-1.5 transition-colors hover:text-ink"
                data-cursor-hover
              >
                <link.icon className="h-3.5 w-3.5 text-ink-faint transition-colors group-hover:text-accent" />
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="group flex items-center gap-1.5 rounded-full border border-border-strong px-4 py-2 text-sm transition-colors hover:border-accent hover:text-accent"
          data-cursor-hover
        >
          <Sparkles className="h-3.5 w-3.5" />
          Hire Me
        </a>
      </nav>
    </header>
  );
}
