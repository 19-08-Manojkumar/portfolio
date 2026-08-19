"use client";

import { useState } from "react";
import { Plus, HelpCircle } from "lucide-react";
import { SectionHeading } from "./about";

const faqs = [
  {
    q: "What kind of roles are you looking for?",
    a: "Full-stack positions centered on React/Next.js and Node.js/NestJS — I'm equally comfortable owning a backend service end-to-end or building out the frontend that consumes it. Open to full-time roles and select freelance/contract work.",
  },
  {
    q: "Do you work with existing codebases, or only greenfield projects?",
    a: "Mostly existing, production codebases — that has been the bulk of my experience at Bytize: extending live ERP and product systems, restructuring service layers, and shipping features without breaking what teams already rely on.",
  },
  {
    q: "What does your typical stack look like?",
    a: "React in 6+ projects, Next.js and Node.js in 8+, NestJS in 6+, TypeScript in 10+, MongoDB in 12+, and MySQL in 10+. My usual setup is React or Next.js on the frontend, NestJS or Express on the backend, with TypeScript and JWT/RBAC where the product calls for it.",
  },
  {
    q: "Are you open to remote work?",
    a: "Yes — based in Chennai, India, and comfortable working remote with distributed teams across time zones.",
  },
  {
    q: "What's the best way to reach you?",
    a: "The contact form below goes straight to my inbox, or email me directly — both are checked regularly. I usually respond within a day.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative px-6 py-32">
      <div className="mx-auto max-w-3xl">
        <SectionHeading eyebrow="FAQ" title="Things people usually ask." icon={HelpCircle} />

        <div className="mt-14 divide-y divide-border border-y border-border">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  data-cursor-hover
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="font-display text-lg font-medium md:text-xl">{item.q}</span>
                  <Plus
                    className={`h-5 w-5 flex-shrink-0 text-accent transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  />
                </button>
                <div
                  className="grid overflow-hidden transition-[grid-template-rows] duration-[400ms] ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-xl pb-6 text-sm leading-relaxed text-ink-muted">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
