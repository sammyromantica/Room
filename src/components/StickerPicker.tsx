import { useState } from "react";

export const STICKERS = [
  "🍮", "♡", "♥", "✿", "☆", "★", "✦", "✧", "♪", "♫",
  "(｡･ω･｡)ﾉ♡", "(づ｡◕‿‿◕｡)づ", "(｡>﹏<｡)", "✧･ﾟ:*", "(◕ᴗ◕✿)",
  "(｡♥‿♥｡)", "ʕ•ᴥ•ʔ", "(◍•ᴗ•◍)♡", "₊˚⊹♡", "꒰ ♡ ꒱",
  "🐶", "🌸", "🎀", "🍓", "🧁", "🌟", "💛", "🤎", "🌼", "☁︎",
];

export function StickerPicker({ onPick }: { onPick: (s: string) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="border-2 border-beret bg-butter px-2 py-0.5 font-silk text-[10px] text-beret shadow-[2px_2px_0_var(--beret)]"
      >
        🍮 stickers
      </button>
      {open && (
        <div className="absolute bottom-full left-0 z-50 mb-1 grid w-56 grid-cols-6 gap-1 border-2 border-beret bg-cream p-2 shadow-[3px_3px_0_var(--beret)]">
          {STICKERS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => { onPick(s); }}
              className="flex h-7 items-center justify-center border border-beret bg-butter text-[12px] hover:bg-blush"
              title={s}
            >{s}</button>
          ))}
        </div>
      )}
    </div>
  );
}