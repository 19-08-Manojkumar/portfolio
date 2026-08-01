import { profile } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="relative border-t border-border px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
        <p className="font-display text-sm text-ink-faint">
          {profile.name} — {new Date().getFullYear()}
        </p>
        <p className="font-mono text-xs text-ink-faint">
          Built with Next.js, GSAP &amp; Lenis
        </p>
      </div>
    </footer>
  );
}
