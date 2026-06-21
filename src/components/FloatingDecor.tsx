import pomHearts from "@/assets/pom-hearts.gif";
import pomCheek from "@/assets/pom-cheek.gif";
import pomPool from "@/assets/pom-pool.gif";
import pomSleep from "@/assets/pom-sleep.gif";
import pompompurin from "@/assets/pompompurin.gif";
import { PixelHeart } from "./PixelHeart";

export const gifs = {
  pomHearts: { url: pomHearts },
  pomCheek: { url: pomCheek },
  pomPool: { url: pomPool },
  pomSleep: { url: pomSleep },
  pompompurin: { url: pompompurin },
};

type Decor = {
  src: string;
  className: string;
  alt: string;
  size?: number;
  delay?: string;
};

export function FloatingDecor({ items }: { items: Decor[] }) {
  return (
    <>
      {items.map((it, i) => (
        <img
          key={i}
          src={it.src}
          alt={it.alt}
          width={it.size ?? 64}
          height={it.size ?? 64}
          className={`pointer-events-none absolute animate-floaty ${it.className}`}
          style={{ animationDelay: it.delay ?? `${i * 0.4}s` }}
        />
      ))}
    </>
  );
}

export function CornerHearts() {
  return (
    <>
      <div className="absolute left-2 top-2 animate-blink">
        <PixelHeart size={20} color="var(--cocoa)" />
      </div>
      <div className="absolute right-2 top-2 animate-blink" style={{ animationDelay: "0.4s" }}>
        <PixelHeart size={20} color="var(--cocoa)" />
      </div>
      <div className="absolute bottom-2 left-2 animate-blink" style={{ animationDelay: "0.8s" }}>
        <PixelHeart size={20} color="var(--cocoa)" />
      </div>
      <div className="absolute bottom-2 right-2 animate-blink" style={{ animationDelay: "1.2s" }}>
        <PixelHeart size={20} color="var(--cocoa)" />
      </div>
    </>
  );
}
