import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";
import AuroraBackground from "@/components/layout/aurora-background";
import { profile } from "@/lib/data";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[100svh] flex-col overflow-hidden bg-bg text-ink">
      <AuroraBackground />

      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(circle at 50% 44%, color-mix(in srgb, var(--color-accent) 10%, transparent), transparent 34%)",
        }}
      />

      <header className="relative z-10 flex items-center justify-between px-6 py-6 sm:px-10 lg:px-16">
        <Link
          href="/"
          className="font-display flex items-center gap-1.5 text-lg font-semibold tracking-tight"
          data-cursor-hover
        >
          {profile.initials}
          <span className="text-accent">.</span>
        </Link>

        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-faint sm:text-xs">
          Portfolio / Error 404
        </span>
      </header>

      <main className="relative z-10 flex flex-1 items-center justify-center px-6 py-10 sm:px-10 lg:px-16">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center text-center">
          <div className="mb-5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.32em] text-accent-soft sm:text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_14px_var(--color-accent)]" />
            Route not found
          </div>

          <div className="relative isolate w-full">
            <span
              className="font-display block select-none text-[clamp(8rem,28vw,20rem)] font-semibold leading-[0.78] tracking-[-0.09em]"
              aria-hidden="true"
              style={{
                color: "transparent",
                WebkitTextStroke: "1px var(--color-border-strong)",
              }}
            >
              404
            </span>

            <svg
              className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 h-28 w-full -translate-y-1/2 sm:h-36"
              viewBox="0 0 1200 150"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M20 76C135 30 220 118 337 73S505 31 563 69"
                stroke="var(--color-border-strong)"
                strokeWidth="1.2"
                strokeDasharray="7 11"
              />
              <path
                d="M637 81C706 122 786 30 891 73S1045 118 1180 68"
                stroke="var(--color-border-strong)"
                strokeWidth="1.2"
                strokeDasharray="7 11"
              />
              <circle cx="20" cy="76" r="4" fill="var(--color-accent)" />
              <circle cx="1180" cy="68" r="4" fill="var(--color-accent)" />
              <path d="M582 61L597 76L582 91" stroke="var(--color-accent)" strokeWidth="1.5" />
              <path d="M618 61L603 76L618 91" stroke="var(--color-accent)" strokeWidth="1.5" />
            </svg>
          </div>

          <div className="relative -mt-1 max-w-xl sm:-mt-4">
            <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              This page went off-grid.
            </h1>
            <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-ink-muted sm:text-base">
              The route may have moved, changed, or never existed. Let&apos;s get you back to
              the portfolio.
            </p>

            <Link
              href="/"
              className="group mx-auto mt-8 inline-flex items-center gap-3 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-bg transition-transform duration-300 hover:-translate-y-0.5"
              data-cursor-hover
            >
              <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
              Back to homepage
              <Home className="h-4 w-4 opacity-60" />
            </Link>
          </div>
        </div>
      </main>

      <footer className="relative z-10 flex items-center justify-between border-t border-border px-6 py-5 font-mono text-[9px] uppercase tracking-[0.24em] text-ink-faint sm:px-10 sm:text-[10px] lg:px-16">
        <span>Error code / 404</span>
        <span className="hidden sm:inline">Manojkumar Portfolio</span>
        <span>Return / 00</span>
      </footer>
    </div>
  );
}
