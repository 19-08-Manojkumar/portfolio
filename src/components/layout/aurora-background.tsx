export default function AuroraBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div
        className="absolute -top-40 left-1/4 h-[36rem] w-[36rem] rounded-full opacity-30 blur-[120px]"
        style={{ background: "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)" }}
      />
      <div
        className="absolute top-1/3 -right-40 h-[32rem] w-[32rem] rounded-full opacity-20 blur-[130px]"
        style={{ background: "radial-gradient(circle, var(--color-violet) 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-0 left-0 h-[28rem] w-[28rem] rounded-full opacity-20 blur-[120px]"
        style={{ background: "radial-gradient(circle, var(--color-jade) 0%, transparent 70%)" }}
      />
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
    </div>
  );
}
