import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { RetroWindow } from "@/components/RetroWindow";
import { Marquee } from "@/components/Marquee";
import { gifs } from "@/components/FloatingDecor";
import { useAdmin } from "@/lib/admin";
import { useDiary, type DiaryPost } from "@/lib/diaryStore";
import { StickerPicker } from "@/components/StickerPicker";
import { kawaiiAudio } from "@/lib/kawaiiAudio";

export const Route = createFileRoute("/diary")({
  head: () => ({
    meta: [
      { title: "Sammy Room ♥ Diary" },
      { name: "description", content: "Little diary entries from Sammy's room." },
    ],
  }),
  component: Diary,
});

function readFiles(fs: FileList | null): Promise<string[]> {
  if (!fs) return Promise.resolve([]);
  const arr = Array.from(fs).slice(0, 10);
  return Promise.all(
    arr.map(
      (f) =>
        new Promise<string>((res, rej) => {
          const r = new FileReader();
          r.onload = () => res(String(r.result));
          r.onerror = rej;
          r.readAsDataURL(f);
        }),
    ),
  );
}

function NewPostForm({ onCreate }: { onCreate: (p: Omit<DiaryPost, "id" | "at" | "likes" | "comments">) => void }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [links, setLinks] = useState<{ label: string; url: string }[]>([]);
  const [imgs, setImgs] = useState<string[]>([]);
  const [linkLabel, setLinkLabel] = useState("");
  const [linkUrl, setLinkUrl] = useState("");

  function insertSticker(s: string) { setDesc((d) => d + " " + s); }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!title && !desc && imgs.length === 0) return;
        onCreate({ title: title || undefined, description: desc || undefined, links: links.length ? links : undefined, images: imgs });
        setTitle(""); setDesc(""); setLinks([]); setImgs([]); setLinkLabel(""); setLinkUrl("");
      }}
      className="space-y-2 border-2 border-dashed border-strawberry bg-butter p-3 shadow-[3px_3px_0_var(--beret)]"
    >
      <h4 className="font-cherry text-[14px] text-strawberry">♥ nuevo post (admin)</h4>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="título (opcional)"
        className="block w-full border-2 border-t-beret border-l-beret border-r-cream border-b-cream bg-white px-2 py-1 font-dot text-[14px] text-beret outline-none" />
      <textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="descripción (opcional) — usa stickers ♡" rows={3}
        className="block w-full resize-y border-2 border-t-beret border-l-beret border-r-cream border-b-cream bg-white px-2 py-1 font-dot text-[14px] text-beret outline-none" />
      <div className="flex flex-wrap items-center gap-2">
        <StickerPicker onPick={insertSticker} />
        <label className="border-2 border-beret bg-cream px-2 py-0.5 font-silk text-[10px] text-beret shadow-[2px_2px_0_var(--beret)] cursor-pointer">
          📷 imágenes (max 10)
          <input type="file" accept="image/*" multiple hidden
            onChange={async (e) => {
              const more = await readFiles(e.target.files);
              setImgs((prev) => [...prev, ...more].slice(0, 10));
              e.target.value = "";
            }} />
        </label>
        <span className="font-silk text-[9px] text-cocoa">{imgs.length}/10</span>
      </div>
      {imgs.length > 0 && (
        <div className="grid grid-cols-5 gap-1">
          {imgs.map((src, i) => (
            <div key={i} className="relative">
              <img src={src} alt="" className="h-16 w-full object-cover border border-beret" />
              <button type="button" onClick={() => setImgs(imgs.filter((_, j) => j !== i))}
                className="absolute -right-1 -top-1 h-5 w-5 border border-beret bg-strawberry text-[10px] text-white">✕</button>
            </div>
          ))}
        </div>
      )}
      <div className="space-y-1">
        <div className="flex gap-1">
          <input value={linkLabel} onChange={(e) => setLinkLabel(e.target.value)} placeholder="label"
            className="flex-1 border-2 border-t-beret border-l-beret border-r-cream border-b-cream bg-white px-2 py-1 font-dot text-[12px] text-beret outline-none" />
          <input value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} placeholder="https://…"
            className="flex-[2] border-2 border-t-beret border-l-beret border-r-cream border-b-cream bg-white px-2 py-1 font-dot text-[12px] text-beret outline-none" />
          <button type="button"
            onClick={() => { if (linkLabel && linkUrl) { setLinks([...links, { label: linkLabel, url: linkUrl }]); setLinkLabel(""); setLinkUrl(""); } }}
            className="border-2 border-beret bg-butter px-2 font-silk text-[10px] text-beret">+ link</button>
        </div>
        {links.map((l, i) => (
          <div key={i} className="flex items-center justify-between border border-beret bg-cream px-2 py-0.5 font-silk text-[10px] text-beret">
            <span>♥ {l.label} → {l.url}</span>
            <button type="button" onClick={() => setLinks(links.filter((_, j) => j !== i))} className="text-strawberry">✕</button>
          </div>
        ))}
      </div>
      <div className="text-right">
        <button type="submit" className="win-btn">♥ publicar</button>
      </div>
    </form>
  );
}

function PostCard({ p }: { p: DiaryPost }) {
  const { isAdmin } = useAdmin();
  const { toggleLike, addComment, replyComment, deleteComment, deletePost, updatePost } = useDiary();
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [replyDraft, setReplyDraft] = useState<Record<string, string>>({});
  const [editing, setEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(p.title ?? "");
  const [draftDesc, setDraftDesc] = useState(p.description ?? "");

  return (
    <article className="border-2 border-beret bg-cream p-3 shadow-[3px_3px_0_var(--beret)]">
      <div className="mb-2 flex items-center justify-between font-silk text-[10px] text-beret">
        <span>📅 {p.at}</span>
        <div className="flex items-center gap-2">
          <button onClick={() => { kawaiiAudio.play("sparkle"); toggleLike(p.id); }} className="border border-beret bg-butter px-2 py-0.5">
            {p.likedByMe ? "💖" : "🤍"} {p.likes}
          </button>
          {isAdmin && (
            <>
              <button onClick={() => { kawaiiAudio.play("blip"); setEditing((v) => !v); }} className="border border-beret bg-butter px-2 py-0.5">✎</button>
              <button onClick={() => { kawaiiAudio.play("pop"); if (confirm("¿borrar post?")) deletePost(p.id); }} className="border border-beret bg-strawberry px-2 py-0.5 text-white">🗑</button>
            </>
          )}
        </div>
      </div>

      {editing && isAdmin ? (
        <div className="space-y-2">
          <input value={draftTitle} onChange={(e) => setDraftTitle(e.target.value)}
            className="block w-full border-2 border-dashed border-strawberry bg-white px-2 py-1 font-cherry text-[14px] text-beret outline-none" />
          <textarea value={draftDesc} onChange={(e) => setDraftDesc(e.target.value)} rows={3}
            className="block w-full border-2 border-dashed border-strawberry bg-white px-2 py-1 font-dot text-[14px] text-beret outline-none" />
          <div className="text-right">
            <button
              onClick={() => { updatePost(p.id, { title: draftTitle || undefined, description: draftDesc || undefined }); setEditing(false); }}
              className="win-btn"
            >guardar</button>
          </div>
        </div>
      ) : (
        <>
          {p.title && <h3 className="font-cherry text-[16px] text-beret">{p.title}</h3>}
          {p.description && <p className="mt-1 whitespace-pre-wrap font-dot text-[14px] text-beret">{p.description}</p>}
        </>
      )}

      {p.images.length > 0 && (
        <div className={`mt-2 grid gap-1 ${p.images.length === 1 ? "grid-cols-1" : p.images.length <= 4 ? "grid-cols-2" : "grid-cols-3"}`}>
          {p.images.map((src, i) => (
            <div key={i} className="border-2 border-beret bg-butter p-1">
              <img src={src} alt="" className="h-32 w-full object-cover" />
            </div>
          ))}
        </div>
      )}

      {p.links && p.links.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {p.links.map((l, i) => (
            <a key={i} href={l.url} target="_blank" rel="noreferrer"
               className="border border-beret bg-blush px-2 py-0.5 font-silk text-[10px] text-beret hover:bg-strawberry hover:text-white">
              ♥ {l.label}
            </a>
          ))}
        </div>
      )}

      {/* comments */}
      <div className="mt-3 border-t-2 border-dashed border-beret pt-2">
        <h4 className="mb-1 font-silk text-[10px] text-cocoa">─ comentarios ({p.comments.length}) ─</h4>
        <ul className="space-y-2">
          {p.comments.map((c) => (
            <li key={c.id} className={`border-2 border-beret p-2 ${c.fromAdmin ? "bg-blush" : "bg-butter"}`}>
              <div className="flex items-center justify-between font-silk text-[9px] text-beret">
                <span>{c.fromAdmin && "♥ "}{c.name} · {c.at}</span>
                {isAdmin && (
                  <button onClick={() => { kawaiiAudio.play("pop"); deleteComment(p.id, c.id); }} className="text-strawberry">✕</button>
                )}
              </div>
              <p className="mt-1 font-dot text-[13px] text-beret">{c.text}</p>
              {c.reply && (
                <div className="mt-1 border-l-2 border-strawberry bg-cream px-2 py-1 font-dot text-[12px] text-beret">
                  <span className="font-silk text-[9px] text-strawberry">♥ sammy:</span> {c.reply}
                </div>
              )}
              {isAdmin && !c.reply && (
                <div className="mt-1 flex gap-1">
                  <input
                    value={replyDraft[c.id] ?? ""}
                    onChange={(e) => setReplyDraft({ ...replyDraft, [c.id]: e.target.value })}
                    placeholder="responder…"
                    className="flex-1 border border-beret bg-white px-1 py-0.5 font-dot text-[12px] text-beret outline-none"
                  />
                  <button onClick={() => { kawaiiAudio.play("blip"); const r = replyDraft[c.id]?.trim(); if (r) replyComment(p.id, c.id, r); }}
                    className="border border-beret bg-strawberry px-2 font-silk text-[9px] text-white"
                  >ok</button>
                </div>
              )}
            </li>
          ))}
        </ul>
        <form
          onSubmit={(e) => { e.preventDefault(); if (!name.trim() || !text.trim()) return; addComment(p.id, name.trim(), text.trim(), isAdmin); setName(""); setText(""); }}
          className="mt-2 flex flex-wrap gap-1"
        >
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder={isAdmin ? "sammy" : "tu nombre"}
            className="w-24 border border-beret bg-white px-1 py-0.5 font-dot text-[12px] text-beret outline-none" />
          <input value={text} onChange={(e) => setText(e.target.value)} placeholder="deja un comentario…"
            className="flex-1 border border-beret bg-white px-1 py-0.5 font-dot text-[12px] text-beret outline-none" />
          <button type="submit" className="border border-beret bg-butter px-2 font-silk text-[10px] text-beret" onClick={() => kawaiiAudio.play("pop")}>enviar</button>
        </form>
      </div>
    </article>
  );
}

function Diary() {
  const { isAdmin } = useAdmin();
  const { posts, addPost } = useDiary();

  return (
    <>
      <Marquee items={["♡ dear diary ♡", "today i feel...", "pudding o'clock", "♡ ♡ ♡"]} />

      <main className="flex min-h-[calc(100vh-40px)] items-center justify-center p-4">
        <RetroWindow title="C:\\Sammy\\diary.html" className="sparkle-bg">
          <div className="flex items-center justify-center gap-2">
            <img src={gifs.pomHearts.url} alt="" width={42} height={42} />
            <h2 className="font-cherry text-[18px] puddle-text">♡ dear diary ♡</h2>
            <img src={gifs.pomCheek.url} alt="" width={42} height={42} />
          </div>

          <div className="mt-4 space-y-4">
            {isAdmin && <NewPostForm onCreate={addPost} />}

            {posts.length === 0 && !isAdmin && (
              <p className="border-2 border-dashed border-beret bg-cream p-4 text-center font-dot text-[14px] text-beret">
                no hay posts todavía ♡
              </p>
            )}

            {posts.map((p) => <PostCard key={p.id} p={p} />)}

            <div className="pt-2 text-center">
              <Link to="/home" className="win-btn">← back</Link>
            </div>
          </div>
        </RetroWindow>
      </main>

      <Marquee items={["♡ ♡ ♡", "today was nice", "pom pom approves", "sweet dreams"]} />
    </>
  );
}