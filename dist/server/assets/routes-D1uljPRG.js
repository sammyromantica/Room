import { r as kawaiiAudio } from "./admin-DTYQ9p9N.js";
import { n as useSettings } from "./siteSettings-D1KHlKFM.js";
import { i as PixelHeart, n as FloatingDecor, o as Marquee, r as gifs, s as RetroWindow } from "./FloatingDecor-BR3__uCs.js";
import { t as EditableText } from "./EditableText-Dz5goY0b.js";
import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
//#region src/assets/portada.jpeg
var portada_default = "/Room/assets/portada-CmHpVjuh.jpeg";
//#endregion
//#region src/assets/portada2.jpg
var portada2_default = "/Room/assets/portada2-BLY2UmdE.jpg";
//#endregion
//#region src/routes/index.tsx?tsr-split=component
function Index() {
	const { s, set } = useSettings();
	const [imgX] = useState(useMemo(() => Math.random() < .5 ? portada_default : portada2_default, []));
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(Marquee, { items: [
			"welcome to sammy room",
			"est. 2010",
			"best viewed @ 800x600",
			"pudding gang 4ever",
			"♡ pompompurin ♡",
			"sign my guestbook!!"
		] }),
		/* @__PURE__ */ jsx("main", {
			className: "flex min-h-[calc(100vh-40px)] items-center justify-center p-4",
			children: /* @__PURE__ */ jsx(RetroWindow, {
				title: "C:\\\\Sammy\\\\index.html",
				className: "sparkle-bg",
				children: /* @__PURE__ */ jsxs("div", {
					className: "relative",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "absolute -left-3 -top-3 z-10 rotate-[-12deg] border-2 border-beret bg-butter px-2 py-0.5 font-silk text-[8px] text-beret shadow-[2px_2px_0_var(--beret)] animate-wiggle",
							children: "⚠ under construction"
						}),
						/* @__PURE__ */ jsx("div", {
							className: "absolute -right-3 -top-3 z-10 rotate-[10deg] border-2 border-beret bg-strawberry px-2 py-0.5 font-silk text-[8px] text-cream shadow-[2px_2px_0_var(--beret)]",
							children: "♡ est. 2010"
						}),
						/* @__PURE__ */ jsx(EditableText, {
							as: "h1",
							value: s.welcomeLine,
							onChange: (v) => set({ welcomeLine: v }),
							className: "block text-center font-cherry text-[14px] text-cocoa animate-blink"
						}),
						/* @__PURE__ */ jsxs("h2", {
							className: "mt-2 flex items-center justify-center gap-2 text-center font-cherry text-[22px] glow-text",
							children: [
								/* @__PURE__ */ jsx(PixelHeart, {
									size: 18,
									color: "var(--strawberry)"
								}),
								/* @__PURE__ */ jsx(EditableText, {
									value: s.siteTitle,
									onChange: (v) => set({ siteTitle: v }),
									className: "animate-rainbow uppercase"
								}),
								/* @__PURE__ */ jsx(PixelHeart, {
									size: 18,
									color: "var(--strawberry)"
								})
							]
						}),
						/* @__PURE__ */ jsx(EditableText, {
							as: "p",
							value: s.welcomeSub,
							onChange: (v) => set({ welcomeSub: v }),
							className: "mt-1 block text-center font-silk text-[9px] text-cocoa"
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "relative mx-auto mt-6 h-[280px] w-[300px]",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "absolute inset-0 animate-spin-slow opacity-60",
									children: [
										/* @__PURE__ */ jsx("div", {
											className: "absolute left-1/2 top-0 -translate-x-1/2 text-[18px]",
											children: "✦"
										}),
										/* @__PURE__ */ jsx("div", {
											className: "absolute right-0 top-1/2 -translate-y-1/2 text-[18px]",
											children: "✧"
										}),
										/* @__PURE__ */ jsx("div", {
											className: "absolute bottom-0 left-1/2 -translate-x-1/2 text-[18px]",
											children: "✦"
										}),
										/* @__PURE__ */ jsx("div", {
											className: "absolute left-0 top-1/2 -translate-y-1/2 text-[18px]",
											children: "✧"
										})
									]
								}),
								/* @__PURE__ */ jsxs("svg", {
									viewBox: "0 0 300 280",
									className: "absolute inset-0 h-full w-full",
									"aria-hidden": true,
									children: [
										/* @__PURE__ */ jsxs("defs", { children: [/* @__PURE__ */ jsx("clipPath", {
											id: "heartClip",
											children: /* @__PURE__ */ jsx("path", { d: "M150,260 C150,260 20,180 20,100 C20,55 55,25 90,25 C115,25 140,40 150,65 C160,40 185,25 210,25 C245,25 280,55 280,100 C280,180 150,260 150,260 Z" })
										}), /* @__PURE__ */ jsx("filter", {
											id: "dither",
											children: /* @__PURE__ */ jsx("feColorMatrix", {
												type: "matrix",
												values: "1.1 0 0 0 0  0 1 0 0 0  0 0 1.05 0 0  0 0 0 1 0"
											})
										})] }),
										/* @__PURE__ */ jsx("image", {
											href: imgX,
											x: "30",
											y: "35",
											width: "240",
											height: "210",
											preserveAspectRatio: "xMidYMid slice",
											clipPath: "url(#heartClip)",
											filter: "url(#dither)"
										}),
										/* @__PURE__ */ jsx("path", {
											d: "M150,260 C150,260 20,180 20,100 C20,55 55,25 90,25 C115,25 140,40 150,65 C160,40 185,25 210,25 C245,25 280,55 280,100 C280,180 150,260 150,260 Z",
											fill: "none",
											stroke: "var(--strawberry)",
											strokeWidth: "8"
										}),
										/* @__PURE__ */ jsx("path", {
											d: "M150,260 C150,260 20,180 20,100 C20,55 55,25 90,25 C115,25 140,40 150,65 C160,40 185,25 210,25 C245,25 280,55 280,100 C280,180 150,260 150,260 Z",
											fill: "none",
											stroke: "var(--beret)",
											strokeWidth: "3"
										})
									]
								}),
								/* @__PURE__ */ jsx(FloatingDecor, { items: [
									{
										src: gifs.pomHearts.url,
										alt: "pom hearts",
										className: "-left-8 -top-4 w-16",
										size: 64
									},
									{
										src: gifs.pomCheek.url,
										alt: "pom cheek",
										className: "-right-8 top-10 w-16",
										size: 64,
										delay: "0.6s"
									},
									{
										src: gifs.pompompurin.url,
										alt: "pom",
										className: "-right-4 -bottom-4 w-20",
										size: 80,
										delay: "1.1s"
									},
									{
										src: gifs.pomSleep.url,
										alt: "pom sleep",
										className: "-left-6 bottom-2 w-16",
										size: 64,
										delay: "0.3s"
									}
								] })
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-8 flex flex-col items-center gap-2",
							children: [/* @__PURE__ */ jsx(Link, {
								to: "/home",
								onClick: () => kawaiiAudio.play("success"),
								className: "candy-btn hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_var(--beret),inset_0_-4px_0_0_rgba(255,93,143,0.6)]",
								children: "☆彡 ENTER ☆彡"
							}), /* @__PURE__ */ jsx("p", {
								className: "font-silk text-[9px] text-cocoa animate-blink",
								children: ">> click to enter <<"
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-6 flex items-center justify-center gap-2 font-silk text-[9px] text-beret",
							children: [/* @__PURE__ */ jsx("span", { children: "visitors:" }), /* @__PURE__ */ jsx("div", {
								className: "flex gap-0.5",
								children: "000420".split("").map((d, i) => /* @__PURE__ */ jsx("span", {
									className: "inline-block w-3 border border-beret bg-beret text-center font-pixel text-[8px] text-butter",
									children: d
								}, i))
							})]
						})
					]
				})
			})
		}),
		/* @__PURE__ */ jsx(Marquee, { items: [
			"♡ thx 4 visiting ♡",
			"leave a note in the guestbook",
			"made with love + html",
			"pom pom purin <3",
			"pixels 4ever"
		] })
	] });
}
//#endregion
export { Index as component };
