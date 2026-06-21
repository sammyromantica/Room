import { createFileRoute, Link } from "@tanstack/react-router";
import { RetroWindow } from "@/components/RetroWindow";
import { FloatingDecor, gifs, CornerHearts } from "@/components/FloatingDecor";
import { Marquee } from "@/components/Marquee";
import { PixelHeart } from "@/components/PixelHeart";
import { EditableText } from "@/components/EditableText";
import { useSettings, type NavId } from "@/lib/siteSettings";
import { useAdmin } from "@/lib/admin";
import { kawaiiAudio } from "@/lib/kawaiiAudio";
import iconHome from "@/assets/icon-home.png";
import iconDiary from "@/assets/icon-diary.png";
import iconGuest from "@/assets/icon-guest.png";
import iconLinks from "@/assets/icon-links.png";
import pomCheek from "@/assets/pom-cheek.gif";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      { title: "Sammy Room ♥ Menu" },
      { name: "description", content: "Choose where to go: bio, diary, guestbook, or links." },
    ],
  }),
  component: HomeMenu,
});

const ICONS: Record<NavId, string> = {
  home: iconHome,
  diary: iconDiary,
  guest: iconGuest,
  links: iconLinks,
  bio: pomCheek,
};

const ROUTES: Record<NavId, "/" | "/diary" | "/guest" | "/links" | "/bio"> = {
  home: "/",
  diary: "/diary",
  guest: "/guest",
  links: "/links",
  bio: "/bio",
};

const DESCS: Record<NavId, string> = {
  home: "back to the entrance",
  bio: "about me ♡",
  diary: "my secret little notes",
  guest: "sign my guestbook!!",
  links: "fav corners of the web",
};

function HomeMenu() {
  const { s, set } = useSettings();
  const { isAdmin } = useAdmin();

  function move(id: NavId, dir: -1 | 1) {
    const order = [...s.navOrder];
    const i = order.indexOf(id);
    const j = i + dir;
    if (i < 0 || j < 0 || j >= order.length) return;
    [order[i], order[j]] = [order[j], order[i]];
    set({ navOrder: order });
  }

  return (
    <>
      <Marquee items={["☆ navigation ☆", "pick a room", "♡ stay awhile ♡", "comfy mode: ON"]} />

      <main className="flex min-h-[calc(100vh-40px)] items-center justify-center p-4">
        <RetroWindow title={`C:\\Sammy\\menu.html`} className="sparkle-bg">
          <div className="relative min-h-[440px]">
            <CornerHearts />

            {/* Pom strip */}
            <div className="mx-auto mb-4 flex w-[80%] items-center justify-center gap-3 border-2 border-beret bg-butter py-2 shadow-[3px_3px_0_var(--beret)]">
              <img src={gifs.pomCheek.url} alt="pom" width={40} height={40} />
              <PixelHeart size={14} color="var(--beret)" />
              <img src={gifs.pompompurin.url} alt="pom" width={44} height={44} className="animate-floaty" />
              <PixelHeart size={14} color="var(--beret)" />
              <img src={gifs.pomSleep.url} alt="pom" width={40} height={40} />
            </div>

            <h2 className="text-center font-cherry text-[18px] puddle-text">
              ♡ pick a room ♡
            </h2>

            <nav className="mt-4 flex flex-col items-stretch gap-2 px-4">
              {s.navOrder.map((id, idx) => (
                <div key={id} className="flex items-center gap-1">
                  {isAdmin && (
                    <div className="flex flex-col gap-0.5">
                      <button onClick={() => move(id, -1)} className="border border-beret bg-butter px-1 text-[10px]" title="subir">▲</button>
                      <button onClick={() => move(id, 1)} className="border border-beret bg-butter px-1 text-[10px]" title="bajar">▼</button>
                    </div>
                  )}
                  <Link
                    to={ROUTES[id]}
                    onClick={() => kawaiiAudio.play("blip")}
                    className="group flex flex-1 items-center gap-3 border-2 border-beret bg-cream px-3 py-2 shadow-[3px_3px_0_var(--beret)] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-butter hover:shadow-[1px_1px_0_var(--beret)]"
                    style={{ background: idx % 2 ? "var(--cream)" : "#fff8dc" }}
                  >
                    <img
                      src={ICONS[id]}
                      alt=""
                      className="h-10 w-10 object-contain"
                      style={{ imageRendering: "auto" }}
                    />
                    <span className="flex-1">
                      <EditableText
                        value={s.navLabels[id]}
                        onChange={(v) => set({ navLabels: { ...s.navLabels, [id]: v } })}
                        className="block font-cherry text-[14px] text-beret"
                      />
                      <span className="block font-dot text-[12px] text-cocoa">
                        {DESCS[id]}
                      </span>
                    </span>
                    <span className="font-silk text-[10px] text-strawberry opacity-0 transition group-hover:opacity-100">
                      ➜
                    </span>
                  </Link>
                </div>
              ))}
            </nav>

            <FloatingDecor
              items={[
                { src: gifs.pomHearts.url, alt: "pom", className: "right-1 bottom-2 w-14", size: 56 },
                { src: gifs.pomPool.url, alt: "pom", className: "left-1 bottom-2 w-14", size: 56, delay: "0.5s" },
              ]}
            />

            <p className="mt-6 text-center font-silk text-[9px] text-cocoa animate-blink">
              ⋆｡˚ ☁︎ ˚｡⋆｡˚☽˚｡⋆
            </p>
          </div>
        </RetroWindow>
      </main>

      <Marquee items={["thx 4 stopping by", "♡ ♡ ♡", "made w/ love + html", "pudding gang"]} />
    </>
  );
}