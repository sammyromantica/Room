import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { RetroWindow } from "@/components/RetroWindow";
import { Marquee } from "@/components/Marquee";
import { PixelHeart } from "@/components/PixelHeart";
import { gifs } from "@/components/FloatingDecor";
import { useGuest } from "@/lib/guestStore";
import { useAdmin } from "@/lib/admin";
import { StickerPicker } from "@/components/StickerPicker";
import { kawaiiAudio } from "@/lib/kawaiiAudio";

export const Route = createFileRoute("/guest")({
  head: () => ({
    meta: [
      { title: "Sammy Room ♥ Guestbook" },
      { name: "description", content: "Sign Sammy's pudding-yellow guestbook." },
    ],
  }),
  component: Guest,
});

function Guest() {
  const { items, add, remove, toggleLike, reply } = useGuest();
  const { isAdmin } = useAdmin();
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [replyDraft, setReplyDraft] = useState<Record<string, string>>({});

  return (
    <>
      <Marquee items={["♡ guestbook ♡", "sign it !!", "say hi ✿", "no spam plz"]} />

      <main className="flex min-h-[calc(100vh-40px)] items-center justify-center p-4">
        <RetroWindow title="C:\\Sammy\\guestbook.html" className="sparkle-bg">
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2">
              <img src={gifs.pomCheek.url} alt="" width={42} height={42} />
              <h2 className="font-cherry text-[18px] puddle-text">sign my book ♡</h2>
              <img src={gifs.pomHearts.url} alt="" width={42} height={42} />
            </div>

            <form
              onSubmit={(e) => { e.preventDefault(); if (!name.trim() || !text.trim()) return; kawaiiAudio.play("sparkle"); add(name.trim(), text.trim()); setName(""); setText(""); }}
              className="space-y-2 border-2 border-beret bg-butter p-3 shadow-[3px_3px_0_var(--beret)]"
            >
              <label className="block font-silk text-[10px] text-beret">
                ★ name:
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="enter your name..."
                  className="mt-1 block w-full border-2 border-t-beret border-l-beret border-r-cream border-b-cream bg-cream px-2 py-1 font-dot text-[14px] text-beret outline-none focus:bg-white" />
              </label>
              <label className="block font-silk text-[10px] text-beret">
                ✿ message:
                <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="leave a sweet note..." rows={3}
                  className="mt-1 block w-full resize-none border-2 border-t-beret border-l-beret border-r-cream border-b-cream bg-cream px-2 py-1 font-dot text-[14px] text-beret outline-none focus:bg-white" />
              </label>
              <div className="flex items-center justify-between gap-2">
                <StickerPicker onPick={(s) => setText((t) => t + " " + s)} />
                <span className="font-silk text-[9px] text-cocoa">{text.length}/200</span>
                <button type="submit" className="win-btn">♥ submit</button>
              </div>
            </form>

            <h3 className="font-silk text-[10px] text-beret">─── ♡ recent notes ♡ ───</h3>

            <ul className="space-y-3">
              {items.map((m) => (
                <li key={m.id} className="border-2 border-beret bg-cream p-3 shadow-[2px_2px_0_var(--beret)]">
                  <div className="flex items-center justify-between font-silk text-[9px] text-cocoa">
                    <span className="flex items-center gap-1">
                      <PixelHeart size={12} color="var(--strawberry)" />
                      <span className="text-beret">{m.name}</span>
                    </span>
                    <span className="flex items-center gap-2">
                      <button onClick={() => { kawaiiAudio.play("sparkle"); toggleLike(m.id); }} className="border border-beret bg-butter px-1.5">
                        {m.likedByMe ? "💖" : "🤍"} {m.likes}
                      </button>
                      <span>{m.at}</span>
                      {isAdmin && (
                        <button onClick={() => { kawaiiAudio.play("pop"); if (confirm("¿borrar mensaje?")) remove(m.id); }} className="border border-beret bg-strawberry px-1.5 text-white">🗑</button>
                      )}
                    </span>
                  </div>
                  <p className="mt-2 font-dot text-[14px] text-beret">{m.text}</p>
                  {m.reply && (
                    <div className="mt-2 border-l-2 border-strawberry bg-blush px-2 py-1 font-dot text-[13px] text-beret">
                      <span className="font-silk text-[9px] text-strawberry">♥ sammy:</span> {m.reply}
                    </div>
                  )}
                  {isAdmin && !m.reply && (
                    <div className="mt-2 flex gap-1">
                      <input value={replyDraft[m.id] ?? ""} onChange={(e) => setReplyDraft({ ...replyDraft, [m.id]: e.target.value })}
                        placeholder="responder…" className="flex-1 border border-beret bg-white px-1 py-0.5 font-dot text-[12px] text-beret outline-none" />
                      <button onClick={() => { const r = replyDraft[m.id]?.trim(); if (r) { kawaiiAudio.play("blip"); reply(m.id, r); } }}
                        className="border border-beret bg-strawberry px-2 font-silk text-[9px] text-white">ok</button>
                    </div>
                  )}
                </li>
              ))}
            </ul>

            <div className="pt-2 text-center">
              <Link to="/home" className="win-btn">← back</Link>
            </div>
          </div>
        </RetroWindow>
      </main>

      <Marquee items={["♡ thx 4 signing ♡", "you r so sweet", "♡ ♡ ♡"]} />
    </>
  );
}