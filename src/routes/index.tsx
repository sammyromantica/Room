import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { RetroWindow } from "@/components/RetroWindow";
import { FloatingDecor, gifs } from "@/components/FloatingDecor";
import { Marquee } from "@/components/Marquee";
import { PixelHeart } from "@/components/PixelHeart";
import { EditableText } from "@/components/EditableText";
import { useSettings } from "@/lib/siteSettings";
import portada1 from "@/assets/portada.jpeg";
import portada2 from "@/assets/portada2.jpg";
import { kawaiiAudio } from "@/lib/kawaiiAudio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sammy Room ♥ Welcome" },
      { name: "description", content: "A cozy webcore kawaii corner of the internet, decorated with Pompompurin vibes." },
      { property: "og:title", content: "Sammy Room ♥" },
      { property: "og:description", content: "Welcome to my pudding-yellow corner of the web." },
    ],
  }),
  component: Index,
});

function Index() {
  const { s, set } = useSettings();
  // Random portada per page-load (refresh changes it)
  const cover = useMemo(() => (Math.random() < 0.5 ? portada1 : portada2), []);
  const [imgX] = useState(cover);

  return (
    <>
      <Marquee items={["welcome to sammy room", "est. 2010", "best viewed @ 800x600", "pudding gang 4ever", "♡ pompompurin ♡", "sign my guestbook!!"]} />

      <main className="flex min-h-[calc(100vh-40px)] items-center justify-center p-4">
        <RetroWindow title="C:\\Sammy\\index.html" className="sparkle-bg">
          <div className="relative">
            {/* under construction sticker */}
            <div className="absolute -left-3 -top-3 z-10 rotate-[-12deg] border-2 border-beret bg-butter px-2 py-0.5 font-silk text-[8px] text-beret shadow-[2px_2px_0_var(--beret)] animate-wiggle">
              ⚠ under construction
            </div>
            <div className="absolute -right-3 -top-3 z-10 rotate-[10deg] border-2 border-beret bg-strawberry px-2 py-0.5 font-silk text-[8px] text-cream shadow-[2px_2px_0_var(--beret)]">
              ♡ est. 2010
            </div>

            <EditableText
              as="h1"
              value={s.welcomeLine}
              onChange={(v) => set({ welcomeLine: v })}
              className="block text-center font-cherry text-[14px] text-cocoa animate-blink"
            />
            <h2 className="mt-2 flex items-center justify-center gap-2 text-center font-cherry text-[22px] glow-text">
              <PixelHeart size={18} color="var(--strawberry)" />
              <EditableText
                value={s.siteTitle}
                onChange={(v) => set({ siteTitle: v })}
                className="animate-rainbow uppercase"
              />
              <PixelHeart size={18} color="var(--strawberry)" />
            </h2>
            <EditableText
              as="p"
              value={s.welcomeSub}
              onChange={(v) => set({ welcomeSub: v })}
              className="mt-1 block text-center font-silk text-[9px] text-cocoa"
            />

            <div className="relative mx-auto mt-6 h-[280px] w-[300px]">
              {/* sparkle ring spinning behind heart */}
              <div className="absolute inset-0 animate-spin-slow opacity-60">
                <div className="absolute left-1/2 top-0 -translate-x-1/2 text-[18px]">✦</div>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[18px]">✧</div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[18px]">✦</div>
                <div className="absolute left-0 top-1/2 -translate-y-1/2 text-[18px]">✧</div>
              </div>

              {/* Heart frame with portada */}
              <svg viewBox="0 0 300 280" className="absolute inset-0 h-full w-full" aria-hidden>
                <defs>
                  <clipPath id="heartClip">
                    <path d="M150,260 C150,260 20,180 20,100 C20,55 55,25 90,25 C115,25 140,40 150,65 C160,40 185,25 210,25 C245,25 280,55 280,100 C280,180 150,260 150,260 Z" />
                  </clipPath>
                  <filter id="dither">
                    <feColorMatrix type="matrix" values="1.1 0 0 0 0  0 1 0 0 0  0 0 1.05 0 0  0 0 0 1 0" />
                  </filter>
                </defs>
                <image
                  href={imgX}
                  x="30"
                  y="35"
                  width="240"
                  height="210"
                  preserveAspectRatio="xMidYMid slice"
                  clipPath="url(#heartClip)"
                  filter="url(#dither)"
                />
                {/* double stroke for chunky pixel feel */}
                <path
                  d="M150,260 C150,260 20,180 20,100 C20,55 55,25 90,25 C115,25 140,40 150,65 C160,40 185,25 210,25 C245,25 280,55 280,100 C280,180 150,260 150,260 Z"
                  fill="none"
                  stroke="var(--strawberry)"
                  strokeWidth="8"
                />
                <path
                  d="M150,260 C150,260 20,180 20,100 C20,55 55,25 90,25 C115,25 140,40 150,65 C160,40 185,25 210,25 C245,25 280,55 280,100 C280,180 150,260 150,260 Z"
                  fill="none"
                  stroke="var(--beret)"
                  strokeWidth="3"
                />
              </svg>

              <FloatingDecor
                items={[
                  { src: gifs.pomHearts.url, alt: "pom hearts", className: "-left-8 -top-4 w-16", size: 64 },
                  { src: gifs.pomCheek.url, alt: "pom cheek", className: "-right-8 top-10 w-16", size: 64, delay: "0.6s" },
                  { src: gifs.pompompurin.url, alt: "pom", className: "-right-4 -bottom-4 w-20", size: 80, delay: "1.1s" },
                  { src: gifs.pomSleep.url, alt: "pom sleep", className: "-left-6 bottom-2 w-16", size: 64, delay: "0.3s" },
                ]}
              />
            </div>

            <div className="mt-8 flex flex-col items-center gap-2">
              <Link
                to="/home"
                onClick={() => kawaiiAudio.play("success")}
                className="candy-btn hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_var(--beret),inset_0_-4px_0_0_rgba(255,93,143,0.6)]"
              >
                ☆彡 ENTER ☆彡
              </Link>
              <p className="font-silk text-[9px] text-cocoa animate-blink">
                &gt;&gt; click to enter &lt;&lt;
              </p>
            </div>

            {/* visitor counter */}
            <div className="mt-6 flex items-center justify-center gap-2 font-silk text-[9px] text-beret">
              <span>visitors:</span>
              <div className="flex gap-0.5">
                {"000420".split("").map((d, i) => (
                  <span key={i} className="inline-block w-3 border border-beret bg-beret text-center font-pixel text-[8px] text-butter">
                    {d}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </RetroWindow>
      </main>

      <Marquee items={["♡ thx 4 visiting ♡", "leave a note in the guestbook", "made with love + html", "pom pom purin <3", "pixels 4ever"]} />
    </>
  );
}
