import { createFileRoute, Link } from "@tanstack/react-router";
import { RetroWindow } from "@/components/RetroWindow";
import { Marquee } from "@/components/Marquee";
import { EditableText } from "@/components/EditableText";
import { gifs } from "@/components/FloatingDecor";
import { useSettings } from "@/lib/siteSettings";

export const Route = createFileRoute("/bio")({
  head: () => ({
    meta: [
      { title: "Sammy Room ♥ Bio" },
      { name: "description", content: "About sammy: interests, music, movies and more." },
    ],
  }),
  component: Bio,
});

const INTERESTS = [
  { label: "General", items: "Blood Soup, Underworld Capital Incident, Skullgirls, Miitopia, DS/3DS Games, Minecraft, Pony Town, Brawl Stars, School Supervisor Saori Sato, RPG Maker horror games, Magic Rampage." },
  { label: "Music",   items: "System of a Down, Soda Stereo, Gustavo Cerati, Mindless Self Indulgence, Three Days Grace, Ely Otto. My fav vocaloid is Gakupo! 💜" },
  { label: "Movies",  items: "Uh… Invader Zim movie 👽 ? And Osomatsu-san movies tho." },
  { label: "TV",      items: "Osomatsu-san, Randy Cunningham 9th Grade Ninja, Invader Zim, Panty and Stocking, Law of Talos and Endzone, Assassination Classroom, Game Of Thrones, Skins, Westworld. Anime in general." },
  { label: "Books",   items: "Welcome to the Eltingville Club and TF2 comics… ig it counts…" },
  { label: "Heroes",  items: "Pompompurin! 🍮" },
];

function Bio() {
  const { s, set } = useSettings();

  return (
    <>
      <Marquee items={["♡ about me ♡", "venezuela 🇻🇪", "15 y/o ✿", "pudin gang"]} />

      <main className="flex min-h-[calc(100vh-40px)] items-center justify-center p-4">
        <RetroWindow title="C:\\Sammy\\bio.html" className="sparkle-bg">
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2">
              <img src={gifs.pomHearts.url} alt="" width={42} height={42} />
              <h2 className="font-cherry text-[18px] puddle-text">sammy's blurbs ♡</h2>
              <img src={gifs.pomCheek.url} alt="" width={42} height={42} />
            </div>

            {/* About me */}
            <section className="border-2 border-beret bg-butter p-3 shadow-[3px_3px_0_var(--beret)]">
              <h3 className="mb-2 font-cherry text-[14px] text-strawberry">★ about me</h3>
              <p className="mb-2 flex flex-wrap items-center gap-1 font-dot text-[14px] text-beret">
                I 💖 my bf, <b>Maximo</b>! · 🪽 <u>she/her</u> 🪽
              </p>
              <div className="mb-2 flex items-center justify-center gap-1 text-[18px]">
                🍮🍩🍪🍩🍮🍩
              </div>
              <EditableText
                as="p"
                multiline
                value={s.bioAbout}
                onChange={(v) => set({ bioAbout: v })}
                className="block font-dot text-[14px] text-beret"
              />
            </section>

            {/* who I want to meet */}
            <section className="border-2 border-beret bg-cream p-3 shadow-[3px_3px_0_var(--beret)]">
              <h3 className="mb-2 font-cherry text-[14px] text-strawberry">★ who I'd like to meet</h3>
              <EditableText
                as="p"
                multiline
                value={s.bioMeetYes}
                onChange={(v) => set({ bioMeetYes: v })}
                className="block whitespace-pre-line font-dot text-[14px] text-beret"
              />
            </section>

            <section className="border-2 border-beret bg-cream p-3 shadow-[3px_3px_0_var(--beret)]">
              <h3 className="mb-2 font-cherry text-[14px] text-strawberry">✗ who I DON'T like to meet</h3>
              <EditableText
                as="p"
                multiline
                value={s.bioMeetNo}
                onChange={(v) => set({ bioMeetNo: v })}
                className="block whitespace-pre-line font-dot text-[14px] text-beret"
              />
            </section>

            {/* Interests */}
            <section className="border-2 border-beret bg-butter p-3 shadow-[3px_3px_0_var(--beret)]">
              <h3 className="mb-2 font-cherry text-[14px] text-strawberry">★ sammy's interests</h3>
              <table className="w-full border-collapse text-left font-dot text-[13px] text-beret">
                <tbody>
                  {INTERESTS.map((row) => (
                    <tr key={row.label} className="border-b border-beret align-top">
                      <th className="w-20 border-r border-beret bg-cream px-2 py-1 font-silk text-[10px] text-cocoa">
                        {row.label}
                      </th>
                      <td className="px-2 py-1">{row.items}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            <div className="pt-2 text-center">
              <Link to="/home" className="win-btn">← back</Link>
            </div>
          </div>
        </RetroWindow>
      </main>

      <Marquee items={["♡ ♡ ♡", "thx for reading", "♡ ♡ ♡"]} />
    </>
  );
}