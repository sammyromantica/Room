import { createFileRoute, Link } from "@tanstack/react-router";
import { RetroWindow } from "@/components/RetroWindow";
import { Marquee } from "@/components/Marquee";
import { gifs } from "@/components/FloatingDecor";
import { ExtLink } from "@/components/ExternalLinkModal";

export const Route = createFileRoute("/links")({
  head: () => ({
    meta: [
      { title: "Sammy Room ♥ Links" },
      { name: "description", content: "Sammy's real links — instagram, whatsapp channel and more." },
    ],
  }),
  component: Links,
});

const buttons: { label: string; url: string; bg: string; fg: string; icon: string }[] = [
  { label: "@sammyromantica", url: "https://instagram.com/sammyromantica", bg: "linear-gradient(135deg,#f9ce34,#ee2a7b,#6228d7)", fg: "#fff", icon: "📷" },
  { label: "la barbicueva (whatsapp)", url: "https://whatsapp.com/channel/0029Vb6AyU69Gv7W3SVUoB3o", bg: "linear-gradient(180deg,#25d366,#128c7e)", fg: "#fff", icon: "💬" },
  { label: "pompompurin.fan", url: "https://www.sanrio.com/collections/pompompurin", bg: "var(--butter)", fg: "var(--beret)", icon: "🍮" },
];

function Links() {
  return (
    <>
      <Marquee items={["♡ my real links ♡", "click to visit", "♡ ♡ ♡", "88x31 4ever"]} />

      <main className="flex min-h-[calc(100vh-40px)] items-center justify-center p-4">
        <RetroWindow title="C:\\Sammy\\links.html" className="sparkle-bg">
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2">
              <img src={gifs.pompompurin.url} alt="" width={48} height={48} className="animate-floaty" />
              <h2 className="font-cherry text-[18px] puddle-text">my real links ♡</h2>
            </div>

            <p className="text-center font-silk text-[9px] text-cocoa">
              ★ ⋆. 𐙚 ˚ saldrás del sitio — te avisaré ★
            </p>

            <div className="grid grid-cols-1 gap-3">
              {buttons.map((b) => (
                <ExtLink
                  key={b.label}
                  href={b.url}
                  className="flex h-12 w-full items-center justify-center gap-2 border-2 border-t-cream border-l-cream border-r-beret border-b-beret font-silk text-[11px] transition hover:translate-x-[1px] hover:translate-y-[1px]"
                >
                  <span
                    className="flex h-full w-full items-center justify-center gap-2 px-2"
                    style={{ background: b.bg, color: b.fg, boxShadow: "2px 2px 0 0 var(--beret)" }}
                  >
                    <span className="text-[18px]">{b.icon}</span>
                    <span style={{ textShadow: "1px 1px 0 rgba(0,0,0,0.3)" }}>♥ {b.label}</span>
                  </span>
                </ExtLink>
              ))}
            </div>

            <div className="border-2 border-beret bg-butter p-3 text-center font-silk text-[9px] text-beret shadow-[3px_3px_0_var(--beret)]">
              <p>★ webring ★</p>
              <p className="mt-1">[prev] · [random] · [next]</p>
            </div>

            <p className="text-center font-silk text-[9px] text-cocoa">
              best viewed @ 800×600 ☆ no ie6 plz
            </p>

            <div className="pt-2 text-center">
              <Link to="/home" className="win-btn">← back</Link>
            </div>
          </div>
        </RetroWindow>
      </main>

      <Marquee items={["♡ link me back ♡", "thx 4 visiting", "♡ ♡ ♡"]} />
    </>
  );
}