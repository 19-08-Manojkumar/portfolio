"use client";

import { MoonStar, SunMedium } from "lucide-react";
import { useTheme } from "@/components/theme/theme-provider";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        setTheme(isDark ? "light" : "dark");
      }}
      data-cursor-hover
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={!isDark}
      className="group flex items-center gap-2 rounded-full border border-border-strong bg-surface/70 px-3.5 py-2 text-sm text-ink transition-colors hover:border-accent hover:text-accent"
    >
      <span className="relative flex h-5 w-5 items-center justify-center">
        <MoonStar
          className={`absolute h-4 w-4 transition-all duration-300 ${
            isDark ? "scale-100 opacity-100" : "scale-75 opacity-0"
          }`}
        />
        <SunMedium
          className={`absolute h-4 w-4 transition-all duration-300 ${
            isDark ? "scale-75 opacity-0" : "scale-100 opacity-100"
          }`}
        />
      </span>
      <span className="font-mono text-[11px] uppercase tracking-[0.18em]">
        {isDark ? "Light" : "Dark"}
      </span>
    </button>
  );
}
