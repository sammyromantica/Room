import { t as ExtLink } from "./ExternalLinkModal-D_ZRJfHu.js";
import { o as Marquee, r as gifs, s as RetroWindow } from "./FloatingDecor-BR3__uCs.js";
import { Link } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
//#region src/routes/links.tsx?tsr-split=component
var buttons = [
	{
		label: "@sammyromantica",
		url: "https://instagram.com/sammyromantica",
		bg: "linear-gradient(135deg,#f9ce34,#ee2a7b,#6228d7)",
		fg: "#fff",
		icon: "📷"
	},
	{
		label: "la barbicueva (whatsapp)",
		url: "https://whatsapp.com/channel/0029Vb6AyU69Gv7W3SVUoB3o",
		bg: "linear-gradient(180deg,#25d366,#128c7e)",
		fg: "#fff",
		icon: "💬"
	},
	{
		label: "pompompurin.fan",
		url: "https://www.sanrio.com/collections/pompompurin",
		bg: "var(--butter)",
		fg: "var(--beret)",
		icon: "🍮"
	}
];
function Links() {
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(Marquee, { items: [
			"♡ my real links ♡",
			"click to visit",
			"♡ ♡ ♡",
			"88x31 4ever"
		] }),
		/* @__PURE__ */ jsx("main", {
			className: "flex min-h-[calc(100vh-40px)] items-center justify-center p-4",
			children: /* @__PURE__ */ jsx(RetroWindow, {
				title: "C:\\\\Sammy\\\\links.html",
				className: "sparkle-bg",
				children: /* @__PURE__ */ jsxs("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-center gap-2",
							children: [/* @__PURE__ */ jsx("img", {
								src: gifs.pompompurin.url,
								alt: "",
								width: 48,
								height: 48,
								className: "animate-floaty"
							}), /* @__PURE__ */ jsx("h2", {
								className: "font-cherry text-[18px] puddle-text",
								children: "my real links ♡"
							})]
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-center font-silk text-[9px] text-cocoa",
							children: "★ ⋆. 𐙚 ˚ saldrás del sitio — te avisaré ★"
						}),
						/* @__PURE__ */ jsx("div", {
							className: "grid grid-cols-1 gap-3",
							children: buttons.map((b) => /* @__PURE__ */ jsx(ExtLink, {
								href: b.url,
								className: "flex h-12 w-full items-center justify-center gap-2 border-2 border-t-cream border-l-cream border-r-beret border-b-beret font-silk text-[11px] transition hover:translate-x-[1px] hover:translate-y-[1px]",
								children: /* @__PURE__ */ jsxs("span", {
									className: "flex h-full w-full items-center justify-center gap-2 px-2",
									style: {
										background: b.bg,
										color: b.fg,
										boxShadow: "2px 2px 0 0 var(--beret)"
									},
									children: [/* @__PURE__ */ jsx("span", {
										className: "text-[18px]",
										children: b.icon
									}), /* @__PURE__ */ jsxs("span", {
										style: { textShadow: "1px 1px 0 rgba(0,0,0,0.3)" },
										children: ["♥ ", b.label]
									})]
								})
							}, b.label))
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "border-2 border-beret bg-butter p-3 text-center font-silk text-[9px] text-beret shadow-[3px_3px_0_var(--beret)]",
							children: [/* @__PURE__ */ jsx("p", { children: "★ webring ★" }), /* @__PURE__ */ jsx("p", {
								className: "mt-1",
								children: "[prev] · [random] · [next]"
							})]
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-center font-silk text-[9px] text-cocoa",
							children: "best viewed @ 800×600 ☆ no ie6 plz"
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
			"♡ link me back ♡",
			"thx 4 visiting",
			"♡ ♡ ♡"
		] })
	] });
}
//#endregion
export { Links as component };
