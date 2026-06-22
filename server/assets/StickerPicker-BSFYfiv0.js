import { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/StickerPicker.tsx
var STICKERS = [
	"🍮",
	"♡",
	"♥",
	"✿",
	"☆",
	"★",
	"✦",
	"✧",
	"♪",
	"♫",
	"(｡･ω･｡)ﾉ♡",
	"(づ｡◕‿‿◕｡)づ",
	"(｡>﹏<｡)",
	"✧･ﾟ:*",
	"(◕ᴗ◕✿)",
	"(｡♥‿♥｡)",
	"ʕ•ᴥ•ʔ",
	"(◍•ᴗ•◍)♡",
	"₊˚⊹♡",
	"꒰ ♡ ꒱",
	"🐶",
	"🌸",
	"🎀",
	"🍓",
	"🧁",
	"🌟",
	"💛",
	"🤎",
	"🌼",
	"☁︎"
];
function StickerPicker({ onPick }) {
	const [open, setOpen] = useState(false);
	return /* @__PURE__ */ jsxs("div", {
		className: "relative inline-block",
		children: [/* @__PURE__ */ jsx("button", {
			type: "button",
			onClick: () => setOpen((v) => !v),
			className: "border-2 border-beret bg-butter px-2 py-0.5 font-silk text-[10px] text-beret shadow-[2px_2px_0_var(--beret)]",
			children: "🍮 stickers"
		}), open && /* @__PURE__ */ jsx("div", {
			className: "absolute bottom-full left-0 z-50 mb-1 grid w-56 grid-cols-6 gap-1 border-2 border-beret bg-cream p-2 shadow-[3px_3px_0_var(--beret)]",
			children: STICKERS.map((s) => /* @__PURE__ */ jsx("button", {
				type: "button",
				onClick: () => {
					onPick(s);
				},
				className: "flex h-7 items-center justify-center border border-beret bg-butter text-[12px] hover:bg-blush",
				title: s,
				children: s
			}, s))
		})]
	});
}
//#endregion
export { StickerPicker as t };
