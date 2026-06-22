import { t as pompompurin_default } from "./pompompurin-DDSiQiqT.js";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
//#region src/components/RetroWindow.tsx
function RetroWindow({ title = "Sammy Room", children, className = "" }) {
	return /* @__PURE__ */ jsxs("div", {
		className: `retro-window w-full max-w-md ${className}`,
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "retro-titlebar flex items-center justify-between px-2 py-1.5 text-[10px]",
				children: [/* @__PURE__ */ jsxs("span", {
					className: "flex items-center gap-1",
					children: [/* @__PURE__ */ jsx("span", { className: "inline-block h-3 w-3 bg-butter border border-cream" }), title]
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex gap-1",
					children: [
						/* @__PURE__ */ jsx("span", {
							className: "inline-flex h-4 w-5 items-center justify-center border-2 border-r-beret border-b-beret border-t-cream border-l-cream bg-butter text-beret font-pixel text-[8px]",
							children: "_"
						}),
						/* @__PURE__ */ jsx("span", {
							className: "inline-flex h-4 w-5 items-center justify-center border-2 border-r-beret border-b-beret border-t-cream border-l-cream bg-butter text-beret font-pixel text-[8px]",
							children: "□"
						}),
						/* @__PURE__ */ jsx("span", {
							className: "inline-flex h-4 w-5 items-center justify-center border-2 border-r-beret border-b-beret border-t-cream border-l-cream bg-butter text-beret font-pixel text-[8px]",
							children: "✕"
						})
					]
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "relative p-4",
				children
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "retro-titlebar flex items-center gap-2 px-2 py-1 text-[9px]",
				children: [/* @__PURE__ */ jsx("span", {
					className: "win-btn !py-0.5 !px-2 !text-[8px] !shadow-none",
					children: "🍮 start"
				}), /* @__PURE__ */ jsx("span", {
					className: "opacity-80 ml-auto",
					children: "12:34 PM ♡"
				})]
			})
		]
	});
}
//#endregion
//#region src/components/Marquee.tsx
function Marquee({ items }) {
	const loop = [...items, ...items];
	return /* @__PURE__ */ jsxs("div", {
		className: "marquee",
		children: [/* @__PURE__ */ jsx("div", {
			className: "marquee__track text-[12px]",
			children: loop.map((t, i) => /* @__PURE__ */ jsxs("span", {
				className: "px-2",
				children: [
					"♥ ",
					t,
					" ♥"
				]
			}, i))
		}), /* @__PURE__ */ jsx("div", {
			className: "marquee__track text-[12px]",
			"aria-hidden": true,
			children: loop.map((t, i) => /* @__PURE__ */ jsxs("span", {
				className: "px-2",
				children: [
					"♥ ",
					t,
					" ♥"
				]
			}, i))
		})]
	});
}
//#endregion
//#region src/assets/pom-hearts.gif
var pom_hearts_default = "/Room/assets/pom-hearts-CZOT3DQK.gif";
//#endregion
//#region src/assets/pom-cheek.gif
var pom_cheek_default = "/Room/assets/pom-cheek-CyxuxYwM.gif";
//#endregion
//#region src/assets/pom-pool.gif
var pom_pool_default = "/Room/assets/pom-pool-CfRimUg6.gif";
//#endregion
//#region src/assets/pom-sleep.gif
var pom_sleep_default = "/Room/assets/pom-sleep-DAszKRZb.gif";
//#endregion
//#region src/components/PixelHeart.tsx
function PixelHeart({ size = 24, color = "var(--beret)", className = "" }) {
	const px = size / 8;
	return /* @__PURE__ */ jsx("svg", {
		width: size,
		height: size / 8 * 7,
		viewBox: `0 0 ${size} ${size / 8 * 7}`,
		className,
		shapeRendering: "crispEdges",
		"aria-hidden": true,
		children: [
			"01100110",
			"11111111",
			"11111111",
			"11111111",
			"01111110",
			"00111100",
			"00011000"
		].map((row, y) => row.split("").map((c, x) => c === "1" ? /* @__PURE__ */ jsx("rect", {
			x: x * px,
			y: y * px,
			width: px,
			height: px,
			fill: color
		}, `${x}-${y}`) : null))
	});
}
//#endregion
//#region src/components/FloatingDecor.tsx
var gifs = {
	pomHearts: { url: pom_hearts_default },
	pomCheek: { url: pom_cheek_default },
	pomPool: { url: pom_pool_default },
	pomSleep: { url: pom_sleep_default },
	pompompurin: { url: pompompurin_default }
};
function FloatingDecor({ items }) {
	return /* @__PURE__ */ jsx(Fragment, { children: items.map((it, i) => /* @__PURE__ */ jsx("img", {
		src: it.src,
		alt: it.alt,
		width: it.size ?? 64,
		height: it.size ?? 64,
		className: `pointer-events-none absolute animate-floaty ${it.className}`,
		style: { animationDelay: it.delay ?? `${i * .4}s` }
	}, i)) });
}
function CornerHearts() {
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx("div", {
			className: "absolute left-2 top-2 animate-blink",
			children: /* @__PURE__ */ jsx(PixelHeart, {
				size: 20,
				color: "var(--cocoa)"
			})
		}),
		/* @__PURE__ */ jsx("div", {
			className: "absolute right-2 top-2 animate-blink",
			style: { animationDelay: "0.4s" },
			children: /* @__PURE__ */ jsx(PixelHeart, {
				size: 20,
				color: "var(--cocoa)"
			})
		}),
		/* @__PURE__ */ jsx("div", {
			className: "absolute bottom-2 left-2 animate-blink",
			style: { animationDelay: "0.8s" },
			children: /* @__PURE__ */ jsx(PixelHeart, {
				size: 20,
				color: "var(--cocoa)"
			})
		}),
		/* @__PURE__ */ jsx("div", {
			className: "absolute bottom-2 right-2 animate-blink",
			style: { animationDelay: "1.2s" },
			children: /* @__PURE__ */ jsx(PixelHeart, {
				size: 20,
				color: "var(--cocoa)"
			})
		})
	] });
}
//#endregion
export { pom_cheek_default as a, PixelHeart as i, FloatingDecor as n, Marquee as o, gifs as r, RetroWindow as s, CornerHearts as t };
