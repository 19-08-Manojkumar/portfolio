"use client";

import Image from "next/image";
import { Quote } from "lucide-react";
import { SectionHeading } from "./about";

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  avatar?: string;
};

/**
 * Not wired into page.tsx yet — add real quotes here once available,
 * then render <Testimonials /> in src/app/page.tsx.
 */
export const testimonials: Testimonial[] = [];

export default function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Testimonials" title="What it's like to work together." icon={Quote} />

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {testimonials.map((t) => (
            <div key={t.name} className="glass flex flex-col gap-6 rounded-2xl p-8">
              <Quote className="h-6 w-6 text-accent" />
              <p className="text-base leading-relaxed text-ink-muted">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-auto flex items-center gap-3">
                {t.avatar ? (
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full object-cover grayscale"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-2 font-display text-sm text-ink-muted">
                    {t.name[0]}
                  </div>
                )}
                <div>
                  <div className="font-display text-sm font-medium">{t.name}</div>
                  <div className="text-xs text-ink-faint">
                    {t.role} · {t.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
