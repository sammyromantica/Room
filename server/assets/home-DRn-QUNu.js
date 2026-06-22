import { n as useAdmin, r as kawaiiAudio } from "./admin-DTYQ9p9N.js";
import { n as useSettings } from "./siteSettings-D1KHlKFM.js";
import { a as pom_cheek_default, i as PixelHeart, n as FloatingDecor, o as Marquee, r as gifs, s as RetroWindow, t as CornerHearts } from "./FloatingDecor-BR3__uCs.js";
import { t as EditableText } from "./EditableText-Dz5goY0b.js";
import { Link } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
//#endregion
//#region src/routes/home.tsx?tsr-split=component
var ICONS = {
	home: "/Room/assets/icon-home-C2kx35ZA.png",
	diary: "/Room/assets/icon-diary-BtzkQ8b-.png",
	guest: "/Room/assets/icon-guest-DvT_XfVP.png",
	links: "/Room/assets/icon-links-B_omEj__.png",
	bio: pom_cheek_default
};
var ROUTES = {
	home: "/",
	diary: "/diary",
	guest: "/guest",
	links: "/links",
	bio: "/bio"
};
var DESCS = {
	home: "back to the entrance",
	bio: "about me ♡",
	diary: "my secret little notes",
	guest: "sign my guestbook!!",
	links: "fav corners of the web"
};
function HomeMenu() {
	const { s, set } = useSettings();
	const { isAdmin } = useAdmin();
	function move(id, dir) {
		const order = [...s.navOrder];
		const i = order.indexOf(id);
		const j = i + dir;
		if (i < 0 || j < 0 || j >= order.length) return;
		[order[i], order[j]] = [order[j], order[i]];
		set({ navOrder: order });
	}
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(Marquee, { items: [
			"☆ navigation ☆",
			"pick a room",
			"♡ stay awhile ♡",
			"comfy mode: ON"
		] }),
		/* @__PURE__ */ jsx("main", {
			className: "flex min-h-[calc(100vh-40px)] items-center justify-center p-4",
			children: /* @__PURE__ */ jsx(RetroWindow, {
				title: `C:\\Sammy\\menu.html`,
				className: "sparkle-bg",
				children: /* @__PURE__ */ jsxs("div", {
					className: "relative min-h-[440px]",
					children: [
						/* @__PURE__ */ jsx(CornerHearts, {}),
						/* @__PURE__ */ jsxs("div", {
							className: "mx-auto mb-4 flex w-[80%] items-center justify-center gap-3 border-2 border-beret bg-butter py-2 shadow-[3px_3px_0_var(--beret)]",
							children: [
								/* @__PURE__ */ jsx("img", {
									src: gifs.pomCheek.url,
									alt: "pom",
									width: 40,
									height: 40
								}),
								/* @__PURE__ */ jsx(PixelHeart, {
									size: 14,
									color: "var(--beret)"
								}),
								/* @__PURE__ */ jsx("img", {
									src: gifs.pompompurin.url,
									alt: "pom",
									width: 44,
									height: 44,
									className: "animate-floaty"
								}),
								/* @__PURE__ */ jsx(PixelHeart, {
									size: 14,
									color: "var(--beret)"
								}),
								/* @__PURE__ */ jsx("img", {
									src: gifs.pomSleep.url,
									alt: "pom",
									width: 40,
									height: 40
								})
							]
						}),
						/* @__PURE__ */ jsx("h2", {
							className: "text-center font-cherry text-[18px] puddle-text",
							children: "♡ pick a room ♡"
						}),
						/* @__PURE__ */ jsx("nav", {
							className: "mt-4 flex flex-col items-stretch gap-2 px-4",
							children: s.navOrder.map((id, idx) => /* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-1",
								children: [isAdmin && /* @__PURE__ */ jsxs("div", {
									className: "flex flex-col gap-0.5",
									children: [/* @__PURE__ */ jsx("button", {
										onClick: () => move(id, -1),
										className: "border border-beret bg-butter px-1 text-[10px]",
										title: "subir",
										children: "▲"
									}), /* @__PURE__ */ jsx("button", {
										onClick: () => move(id, 1),
										className: "border border-beret bg-butter px-1 text-[10px]",
										title: "bajar",
										children: "▼"
									})]
								}), /* @__PURE__ */ jsxs(Link, {
									to: ROUTES[id],
									onClick: () => kawaiiAudio.play("blip"),
									className: "group flex flex-1 items-center gap-3 border-2 border-beret bg-cream px-3 py-2 shadow-[3px_3px_0_var(--beret)] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-butter hover:shadow-[1px_1px_0_var(--beret)]",
									style: { background: idx % 2 ? "var(--cream)" : "#fff8dc" },
									children: [
										/* @__PURE__ */ jsx("img", {
											src: ICONS[id],
											alt: "",
											className: "h-10 w-10 object-contain",
											style: { imageRendering: "auto" }
										}),
										/* @__PURE__ */ jsxs("span", {
											className: "flex-1",
											children: [/* @__PURE__ */ jsx(EditableText, {
												value: s.navLabels[id],
												onChange: (v) => set({ navLabels: {
													...s.navLabels,
													[id]: v
												} }),
												className: "block font-cherry text-[14px] text-beret"
											}), /* @__PURE__ */ jsx("span", {
												className: "block font-dot text-[12px] text-cocoa",
												children: DESCS[id]
											})]
										}),
										/* @__PURE__ */ jsx("span", {
											className: "font-silk text-[10px] text-strawberry opacity-0 transition group-hover:opacity-100",
											children: "➜"
										})
									]
								})]
							}, id))
						}),
						/* @__PURE__ */ jsx(FloatingDecor, { items: [{
							src: gifs.pomHearts.url,
							alt: "pom",
							className: "right-1 bottom-2 w-14",
							size: 56
						}, {
							src: gifs.pomPool.url,
							alt: "pom",
							className: "left-1 bottom-2 w-14",
							size: 56,
							delay: "0.5s"
						}] }),
						/* @__PURE__ */ jsx("p", {
							className: "mt-6 text-center font-silk text-[9px] text-cocoa animate-blink",
							children: "⋆｡˚ ☁︎ ˚｡⋆｡˚☽˚｡⋆"
						})
					]
				})
			})
		}),
		/* @__PURE__ */ jsx(Marquee, { items: [
			"thx 4 stopping by",
			"♡ ♡ ♡",
			"made w/ love + html",
			"pudding gang"
		] })
	] });
}
//#endregion
export { HomeMenu as component };
