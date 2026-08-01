"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { User, Mail, MessageSquare, Send, Code2, Link2, CheckCircle2, AlertCircle } from "lucide-react";
import { profile } from "@/lib/data";
import ParallaxTexture from "@/components/layout/parallax-texture";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mrgnzogb";

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
      gsap.to(".contact-glow", { x, y, duration: 0.6, ease: "power2.out" });
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" ref={ref} className="relative isolate overflow-hidden px-6 py-32">
      <ParallaxTexture src="/accents/fiber-optic.avif" opacity={0.5} targetRef={ref} />
      <div
        className="contact-glow pointer-events-none absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-[120px]"
        style={{ background: "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-4xl text-center">
        <p className="font-mono text-sm uppercase tracking-[0.3em] text-accent">Contact</p>
        <h2 className="font-display mx-auto mt-4 max-w-2xl text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
          Let&apos;s build something that{" "}
          <span className="text-gradient">actually ships.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-md text-ink-muted">
          Open to full-stack roles and freelance work. Based in Chennai — happy to work remote.
        </p>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mx-auto mt-12 flex max-w-lg flex-col gap-4 text-left"
        >
          <input type="hidden" name="_subject" value="New message from manojkumar.dev" />

          <div className="relative">
            <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
            <input
              required
              type="text"
              name="name"
              placeholder="Your name"
              disabled={status === "sending"}
              className="w-full rounded-xl border border-border-strong bg-surface/60 py-3.5 pl-11 pr-5 text-sm outline-none transition-colors focus:border-accent disabled:opacity-60"
            />
          </div>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
            <input
              required
              type="email"
              name="email"
              placeholder="Your email"
              disabled={status === "sending"}
              className="w-full rounded-xl border border-border-strong bg-surface/60 py-3.5 pl-11 pr-5 text-sm outline-none transition-colors focus:border-accent disabled:opacity-60"
            />
          </div>
          <div className="relative">
            <MessageSquare className="pointer-events-none absolute left-4 top-4 h-4 w-4 text-ink-faint" />
            <textarea
              required
              rows={4}
              name="message"
              placeholder="What are you building?"
              disabled={status === "sending"}
              className="w-full resize-none rounded-xl border border-border-strong bg-surface/60 py-3.5 pl-11 pr-5 text-sm outline-none transition-colors focus:border-accent disabled:opacity-60"
            />
          </div>
          <button
            type="submit"
            data-cursor-hover
            disabled={status === "sending"}
            className="flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-bg transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-70"
          >
            {status === "sent" && (
              <>
                <CheckCircle2 className="h-4 w-4" />
                Message sent — thank you!
              </>
            )}
            {status === "error" && (
              <>
                <AlertCircle className="h-4 w-4" />
                Something went wrong — try again
              </>
            )}
            {status === "sending" && <>Sending…</>}
            {status === "idle" && (
              <>
                <Send className="h-4 w-4" />
                Send Message
              </>
            )}
          </button>
        </form>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-6 text-sm">
          <a
            href={`mailto:${profile.email}`}
            data-cursor-hover
            className="flex items-center gap-2 text-ink-muted hover:text-accent"
          >
            <Mail className="h-4 w-4" />
            {profile.email}
          </a>
          <span className="text-border-strong">·</span>
          <a
            href={profile.github}
            data-cursor-hover
            className="flex items-center gap-2 text-ink-muted hover:text-accent"
          >
            <Code2 className="h-4 w-4" />
            GitHub
          </a>
          <span className="text-border-strong">·</span>
          <a
            href={profile.linkedin}
            data-cursor-hover
            className="flex items-center gap-2 text-ink-muted hover:text-accent"
          >
            <Link2 className="h-4 w-4" />
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
