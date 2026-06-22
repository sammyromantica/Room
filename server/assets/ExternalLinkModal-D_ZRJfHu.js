import { createContext, useCallback, useContext, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/ExternalLinkModal.tsx
var C = createContext(null);
function ExternalLinkProvider({ children }) {
	const [target, setTarget] = useState(null);
	const confirm = useCallback((url) => setTarget(url), []);
	return /* @__PURE__ */ jsxs(C.Provider, {
		value: { confirm },
		children: [children, target && /* @__PURE__ */ jsx("div", {
			className: "fixed inset-0 z-[10001] flex items-center justify-center bg-beret/40 p-4",
			children: /* @__PURE__ */ jsxs("div", {
				className: "w-full max-w-sm border-2 border-beret bg-cream shadow-[6px_6px_0_var(--beret)]",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-center justify-between bg-[#000080] px-2 py-1 font-silk text-[10px] text-white",
						children: [/* @__PURE__ */ jsxs("span", {
							className: "flex items-center gap-1",
							children: [/* @__PURE__ */ jsx("span", { className: "inline-block h-3 w-3 border border-white bg-yellow-300" }), "Sammy Room — External Link"]
						}), /* @__PURE__ */ jsx("button", {
							onClick: () => setTarget(null),
							className: "inline-flex h-4 w-5 items-center justify-center border-2 border-r-beret border-b-beret border-t-cream border-l-cream bg-butter text-[8px] text-beret",
							"aria-label": "close",
							children: "✕"
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex gap-3 p-4",
						children: [/* @__PURE__ */ jsx("div", {
							className: "flex h-12 w-12 shrink-0 items-center justify-center border-2 border-beret bg-butter text-[26px]",
							children: "⚠"
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex-1 space-y-2 font-dot text-[14px] text-beret",
							children: [
								/* @__PURE__ */ jsx("p", {
									className: "font-silk text-[11px]",
									children: "¡cuidado! ♡"
								}),
								/* @__PURE__ */ jsxs("p", { children: [
									"Estás a punto de salir de ",
									/* @__PURE__ */ jsx("b", { children: "sammy room" }),
									" e ir a un sitio externo:"
								] }),
								/* @__PURE__ */ jsx("p", {
									className: "break-all border-2 border-t-beret border-l-beret border-r-cream border-b-cream bg-white px-2 py-1 font-silk text-[10px]",
									children: target
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-[12px] opacity-80",
									children: "¿continuar?"
								})
							]
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-center justify-end gap-2 border-t-2 border-beret bg-butter px-3 py-2",
						children: [/* @__PURE__ */ jsx("button", {
							onClick: () => setTarget(null),
							className: "win-btn",
							children: "Cancel"
						}), /* @__PURE__ */ jsx("button", {
							onClick: () => {
								const t = target;
								setTarget(null);
								if (t) window.open(t, "_blank", "noopener,noreferrer");
							},
							className: "win-btn",
							children: "♡ OK"
						})]
					})
				]
			})
		})]
	});
}
function useExternalLink() {
	const v = useContext(C);
	if (!v) throw new Error("useExternalLink must be inside provider");
	return v;
}
function ExtLink({ href, className, children }) {
	const { confirm } = useExternalLink();
	return /* @__PURE__ */ jsx("a", {
		href,
		onClick: (e) => {
			e.preventDefault();
			confirm(href);
		},
		className,
		target: "_blank",
		rel: "noopener noreferrer",
		children
	});
}
//#endregion
export { ExternalLinkProvider as n, ExtLink as t };
