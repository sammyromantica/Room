import { n as useSettings } from "./siteSettings-D1KHlKFM.js";
import { o as Marquee, r as gifs, s as RetroWindow } from "./FloatingDecor-BR3__uCs.js";
import { t as EditableText } from "./EditableText-Dz5goY0b.js";
import { Link } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
//#region src/routes/bio.tsx?tsr-split=component
var INTERESTS = [
	{
		label: "General",
		items: "Blood Soup, Underworld Capital Incident, Skullgirls, Miitopia, DS/3DS Games, Minecraft, Pony Town, Brawl Stars, School Supervisor Saori Sato, RPG Maker horror games, Magic Rampage."
	},
	{
		label: "Music",
		items: "System of a Down, Soda Stereo, Gustavo Cerati, Mindless Self Indulgence, Three Days Grace, Ely Otto. My fav vocaloid is Gakupo! 💜"
	},
	{
		label: "Movies",
		items: "Uh… Invader Zim movie 👽 ? And Osomatsu-san movies tho."
	},
	{
		label: "TV",
		items: "Osomatsu-san, Randy Cunningham 9th Grade Ninja, Invader Zim, Panty and Stocking, Law of Talos and Endzone, Assassination Classroom, Game Of Thrones, Skins, Westworld. Anime in general."
	},
	{
		label: "Books",
		items: "Welcome to the Eltingville Club and TF2 comics… ig it counts…"
	},
	{
		label: "Heroes",
		items: "Pompompurin! 🍮"
	}
];
function Bio() {
	const { s, set } = useSettings();
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(Marquee, { items: [
			"♡ about me ♡",
			"venezuela 🇻🇪",
			"15 y/o ✿",
			"pudin gang"
		] }),
		/* @__PURE__ */ jsx("main", {
			className: "flex min-h-[calc(100vh-40px)] items-center justify-center p-4",
			children: /* @__PURE__ */ jsx(RetroWindow, {
				title: "C:\\\\Sammy\\\\bio.html",
				className: "sparkle-bg",
				children: /* @__PURE__ */ jsxs("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-center gap-2",
							children: [
								/* @__PURE__ */ jsx("img", {
									src: gifs.pomHearts.url,
									alt: "",
									width: 42,
									height: 42
								}),
								/* @__PURE__ */ jsx("h2", {
									className: "font-cherry text-[18px] puddle-text",
									children: "sammy's blurbs ♡"
								}),
								/* @__PURE__ */ jsx("img", {
									src: gifs.pomCheek.url,
									alt: "",
									width: 42,
									height: 42
								})
							]
						}),
						/* @__PURE__ */ jsxs("section", {
							className: "border-2 border-beret bg-butter p-3 shadow-[3px_3px_0_var(--beret)]",
							children: [
								/* @__PURE__ */ jsx("h3", {
									className: "mb-2 font-cherry text-[14px] text-strawberry",
									children: "★ about me"
								}),
								/* @__PURE__ */ jsxs("p", {
									className: "mb-2 flex flex-wrap items-center gap-1 font-dot text-[14px] text-beret",
									children: [
										"I 💖 my bf, ",
										/* @__PURE__ */ jsx("b", { children: "Maximo" }),
										"! · 🪽 ",
										/* @__PURE__ */ jsx("u", { children: "she/her" }),
										" 🪽"
									]
								}),
								/* @__PURE__ */ jsx("div", {
									className: "mb-2 flex items-center justify-center gap-1 text-[18px]",
									children: "🍮🍩🍪🍩🍮🍩"
								}),
								/* @__PURE__ */ jsx(EditableText, {
									as: "p",
									multiline: true,
									value: s.bioAbout,
									onChange: (v) => set({ bioAbout: v }),
									className: "block font-dot text-[14px] text-beret"
								})
							]
						}),
						/* @__PURE__ */ jsxs("section", {
							className: "border-2 border-beret bg-cream p-3 shadow-[3px_3px_0_var(--beret)]",
							children: [/* @__PURE__ */ jsx("h3", {
								className: "mb-2 font-cherry text-[14px] text-strawberry",
								children: "★ who I'd like to meet"
							}), /* @__PURE__ */ jsx(EditableText, {
								as: "p",
								multiline: true,
								value: s.bioMeetYes,
								onChange: (v) => set({ bioMeetYes: v }),
								className: "block whitespace-pre-line font-dot text-[14px] text-beret"
							})]
						}),
						/* @__PURE__ */ jsxs("section", {
							className: "border-2 border-beret bg-cream p-3 shadow-[3px_3px_0_var(--beret)]",
							children: [/* @__PURE__ */ jsx("h3", {
								className: "mb-2 font-cherry text-[14px] text-strawberry",
								children: "✗ who I DON'T like to meet"
							}), /* @__PURE__ */ jsx(EditableText, {
								as: "p",
								multiline: true,
								value: s.bioMeetNo,
								onChange: (v) => set({ bioMeetNo: v }),
								className: "block whitespace-pre-line font-dot text-[14px] text-beret"
							})]
						}),
						/* @__PURE__ */ jsxs("section", {
							className: "border-2 border-beret bg-butter p-3 shadow-[3px_3px_0_var(--beret)]",
							children: [/* @__PURE__ */ jsx("h3", {
								className: "mb-2 font-cherry text-[14px] text-strawberry",
								children: "★ sammy's interests"
							}), /* @__PURE__ */ jsx("table", {
								className: "w-full border-collapse text-left font-dot text-[13px] text-beret",
								children: /* @__PURE__ */ jsx("tbody", { children: INTERESTS.map((row) => /* @__PURE__ */ jsxs("tr", {
									className: "border-b border-beret align-top",
									children: [/* @__PURE__ */ jsx("th", {
										className: "w-20 border-r border-beret bg-cream px-2 py-1 font-silk text-[10px] text-cocoa",
										children: row.label
									}), /* @__PURE__ */ jsx("td", {
										className: "px-2 py-1",
										children: row.items
									})]
								}, row.label)) })
							})]
						}),
						/* @__PURE__ */ jsx("div", {
							className: "pt-2 text-center",
							children: /* @__PURE__ */ jsx(Link, {
								to: "/home",
								className: "win-btn",
								children: "← back"
							})
						})
					]
				})
			})
		}),
		/* @__PURE__ */ jsx(Marquee, { items: [
			"♡ ♡ ♡",
			"thx for reading",
			"♡ ♡ ♡"
		] })
	] });
}
//#endregion
export { Bio as component };
