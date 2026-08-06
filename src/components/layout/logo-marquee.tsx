import Image from "next/image";
import { stackLogos } from "@/lib/data";
import Marquee from "./marquee";

export default function LogoMarquee() {
  const items = stackLogos.map((logo) => (
    <div key={logo.name} className="flex items-center gap-3 opacity-70 transition-opacity hover:opacity-100">
      <Image src={logo.src} alt="" width={28} height={28} className="h-7 w-7 object-contain" />
      <span className="font-mono text-sm uppercase tracking-wider text-ink-muted">{logo.name}</span>
    </div>
  ));

  return <Marquee items={items} speed={28} />;
}
