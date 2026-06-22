import { t as supabase } from "./supabase-Bg4692CC.js";
import { n as useAdmin, r as kawaiiAudio } from "./admin-DTYQ9p9N.js";
import { i as PixelHeart, o as Marquee, r as gifs, s as RetroWindow } from "./FloatingDecor-BR3__uCs.js";
import { t as StickerPicker } from "./StickerPicker-BSFYfiv0.js";
import { useCallback, useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
//#region src/lib/guestStore.ts
var LOCAL_KEY = "sammy.guest.v1";
function today() {
	return (/* @__PURE__ */ new Date()).toISOString().slice(0, 10).replace(/-/g, "/");
}
var SEED = [
	{
		id: "g1",
		name: "gyaruko",
		at: "2025/06/15",
		text: "tu room es lo mas tierno ♡ ♡ ♡",
		likes: 4
	},
	{
		id: "g2",
		name: "pom_fan",
		at: "2025/06/17",
		text: "pudin gang forever 🍮🍮",
		likes: 8
	},
	{
		id: "g3",
		name: "anon",
		at: "2025/06/19",
		text: "(｡•̀ᴗ-)✧ saludos desde mi pc",
		likes: 2
	}
];
async function fetchFromSupabase() {
	try {
		const { data, error } = await supabase.from("guestbook_messages").select("*").order("created_at", { ascending: false });
		if (error || !data) return null;
		const { decrypt } = await import("./encryption-GpcqfWGq.js");
		return data.map((row) => ({
			id: row.id,
			name: decrypt(row.name ?? ""),
			text: decrypt(row.text ?? ""),
			at: row.at,
			likes: row.likes ?? 0,
			reply: row.reply ? decrypt(row.reply) : void 0,
			likedByMe: false
		}));
	} catch {
		return null;
	}
}
async function insertToSupabase(name, text, at) {
	try {
		const { encrypt } = await import("./encryption-GpcqfWGq.js");
		const { data, error } = await supabase.from("guestbook_messages").insert({
			name: encrypt(name),
			text: encrypt(text),
			at,
			likes: 0
		}).select("id").single();
		if (error || !data) return null;
		return data.id;
	} catch {
		return null;
	}
}
async function removeFromSupabase(id) {
	try {
		await supabase.from("guestbook_messages").delete().eq("id", id);
	} catch {}
}
async function updateLikesInSupabase(id, likes) {
	try {
		await supabase.from("guestbook_messages").update({ likes }).eq("id", id);
	} catch {}
}
async function saveReplyToSupabase(id, reply) {
	try {
		const { encrypt } = await import("./encryption-GpcqfWGq.js");
		await supabase.from("guestbook_messages").update({ reply: encrypt(reply) }).eq("id", id);
	} catch {}
}
function readLocal() {
	if (typeof window === "undefined") return SEED;
	try {
		const raw = localStorage.getItem(LOCAL_KEY);
		if (!raw) return SEED;
		return JSON.parse(raw);
	} catch {
		return SEED;
	}
}
function writeLocal(items) {
	try {
		localStorage.setItem(LOCAL_KEY, JSON.stringify(items));
	} catch {}
	window.dispatchEvent(new CustomEvent("sammy:guest"));
}
function useGuest() {
	const [items, setItems] = useState([]);
	const [useSupabase, setUseSupabase] = useState(false);
	const load = useCallback(async () => {
		const remoteItems = await fetchFromSupabase();
		if (remoteItems !== null) {
			setItems(remoteItems);
			setUseSupabase(true);
		} else {
			setItems(readLocal());
			setUseSupabase(false);
		}
	}, []);
	useEffect(() => {
		load();
		const onLocal = () => {
			if (!useSupabase) setItems(readLocal());
		};
		window.addEventListener("sammy:guest", onLocal);
		window.addEventListener("storage", onLocal);
		return () => {
			window.removeEventListener("sammy:guest", onLocal);
			window.removeEventListener("storage", onLocal);
		};
	}, [load, useSupabase]);
	return {
		items,
		async add(name, text) {
			const at = today();
			if (useSupabase) {
				const id = await insertToSupabase(name, text, at);
				if (id) {
					const newMsg = {
						id,
						name,
						text,
						at,
						likes: 0
					};
					setItems((prev) => [newMsg, ...prev]);
					return;
				}
			}
			writeLocal([{
				id: crypto.randomUUID(),
				name,
				text,
				at,
				likes: 0
			}, ...readLocal()]);
		},
		async remove(id) {
			if (useSupabase) {
				await removeFromSupabase(id);
				setItems((prev) => prev.filter((x) => x.id !== id));
			} else writeLocal(readLocal().filter((x) => x.id !== id));
		},
		async toggleLike(id) {
			setItems((prev) => {
				const updated = prev.map((x) => x.id === id ? {
					...x,
					likedByMe: !x.likedByMe,
					likes: x.likes + (x.likedByMe ? -1 : 1)
				} : x);
				if (useSupabase) {
					const target = updated.find((x) => x.id === id);
					if (target) updateLikesInSupabase(id, target.likes);
				} else writeLocal(updated);
				return updated;
			});
		},
		async reply(id, reply) {
			if (useSupabase) {
				await saveReplyToSupabase(id, reply);
				setItems((prev) => prev.map((x) => x.id === id ? {
					...x,
					reply
				} : x));
			} else writeLocal(readLocal().map((x) => x.id === id ? {
				...x,
				reply
			} : x));
		}
	};
}
//#endregion
//#region src/routes/guest.tsx?tsr-split=component
function Guest() {
	const { items, add, remove, toggleLike, reply } = useGuest();
	const { isAdmin } = useAdmin();
	const [name, setName] = useState("");
	const [text, setText] = useState("");
	const [replyDraft, setReplyDraft] = useState({});
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(Marquee, { items: [
			"♡ guestbook ♡",
			"sign it !!",
			"say hi ✿",
			"no spam plz"
		] }),
		/* @__PURE__ */ jsx("main", {
			className: "flex min-h-[calc(100vh-40px)] items-center justify-center p-4",
			children: /* @__PURE__ */ jsx(RetroWindow, {
				title: "C:\\\\Sammy\\\\guestbook.html",
				className: "sparkle-bg",
				children: /* @__PURE__ */ jsxs("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-center gap-2",
							children: [
								/* @__PURE__ */ jsx("img", {
									src: gifs.pomCheek.url,
									alt: "",
									width: 42,
									height: 42
								}),
								/* @__PURE__ */ jsx("h2", {
									className: "font-cherry text-[18px] puddle-text",
									children: "sign my book ♡"
								}),
								/* @__PURE__ */ jsx("img", {
									src: gifs.pomHearts.url,
									alt: "",
									width: 42,
									height: 42
								})
							]
						}),
						/* @__PURE__ */ jsxs("form", {
							onSubmit: (e) => {
								e.preventDefault();
								if (!name.trim() || !text.trim()) return;
								kawaiiAudio.play("sparkle");
								add(name.trim(), text.trim());
								setName("");
								setText("");
							},
							className: "space-y-2 border-2 border-beret bg-butter p-3 shadow-[3px_3px_0_var(--beret)]",
							children: [
								/* @__PURE__ */ jsxs("label", {
									className: "block font-silk text-[10px] text-beret",
									children: ["★ name:", /* @__PURE__ */ jsx("input", {
										value: name,
										onChange: (e) => setName(e.target.value),
										placeholder: "enter your name...",
										className: "mt-1 block w-full border-2 border-t-beret border-l-beret border-r-cream border-b-cream bg-cream px-2 py-1 font-dot text-[14px] text-beret outline-none focus:bg-white"
									})]
								}),
								/* @__PURE__ */ jsxs("label", {
									className: "block font-silk text-[10px] text-beret",
									children: ["✿ message:", /* @__PURE__ */ jsx("textarea", {
										value: text,
										onChange: (e) => setText(e.target.value),
										placeholder: "leave a sweet note...",
										rows: 3,
										className: "mt-1 block w-full resize-none border-2 border-t-beret border-l-beret border-r-cream border-b-cream bg-cream px-2 py-1 font-dot text-[14px] text-beret outline-none focus:bg-white"
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center justify-between gap-2",
									children: [
										/* @__PURE__ */ jsx(StickerPicker, { onPick: (s) => setText((t) => t + " " + s) }),
										/* @__PURE__ */ jsxs("span", {
											className: "font-silk text-[9px] text-cocoa",
											children: [text.length, "/200"]
										}),
										/* @__PURE__ */ jsx("button", {
											type: "submit",
											className: "win-btn",
											children: "♥ submit"
										})
									]
								})
							]
						}),
						/* @__PURE__ */ jsx("h3", {
							className: "font-silk text-[10px] text-beret",
							children: "─── ♡ recent notes ♡ ───"
						}),
						/* @__PURE__ */ jsx("ul", {
							className: "space-y-3",
							children: items.map((m) => /* @__PURE__ */ jsxs("li", {
								className: "border-2 border-beret bg-cream p-3 shadow-[2px_2px_0_var(--beret)]",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "flex items-center justify-between font-silk text-[9px] text-cocoa",
										children: [/* @__PURE__ */ jsxs("span", {
											className: "flex items-center gap-1",
											children: [/* @__PURE__ */ jsx(PixelHeart, {
												size: 12,
												color: "var(--strawberry)"
											}), /* @__PURE__ */ jsx("span", {
												className: "text-beret",
												children: m.name
											})]
										}), /* @__PURE__ */ jsxs("span", {
											className: "flex items-center gap-2",
											children: [
												/* @__PURE__ */ jsxs("button", {
													onClick: () => {
														kawaiiAudio.play("sparkle");
														toggleLike(m.id);
													},
													className: "border border-beret bg-butter px-1.5",
													children: [
														m.likedByMe ? "💖" : "🤍",
														" ",
														m.likes
													]
												}),
												/* @__PURE__ */ jsx("span", { children: m.at }),
												isAdmin && /* @__PURE__ */ jsx("button", {
													onClick: () => {
														kawaiiAudio.play("pop");
														if (confirm("¿borrar mensaje?")) remove(m.id);
													},
													className: "border border-beret bg-strawberry px-1.5 text-white",
													children: "🗑"
												})
											]
										})]
									}),
									/* @__PURE__ */ jsx("p", {
										className: "mt-2 font-dot text-[14px] text-beret",
										children: m.text
									}),
									m.reply && /* @__PURE__ */ jsxs("div", {
										className: "mt-2 border-l-2 border-strawberry bg-blush px-2 py-1 font-dot text-[13px] text-beret",
										children: [
											/* @__PURE__ */ jsx("span", {
												className: "font-silk text-[9px] text-strawberry",
												children: "♥ sammy:"
											}),
											" ",
											m.reply
										]
									}),
									isAdmin && !m.reply && /* @__PURE__ */ jsxs("div", {
										className: "mt-2 flex gap-1",
										children: [/* @__PURE__ */ jsx("input", {
											value: replyDraft[m.id] ?? "",
											onChange: (e) => setReplyDraft({
												...replyDraft,
												[m.id]: e.target.value
											}),
											placeholder: "responder…",
											className: "flex-1 border border-beret bg-white px-1 py-0.5 font-dot text-[12px] text-beret outline-none"
										}), /* @__PURE__ */ jsx("button", {
											onClick: () => {
												const r = replyDraft[m.id]?.trim();
												if (r) {
													kawaiiAudio.play("blip");
													reply(m.id, r);
												}
											},
											className: "border border-beret bg-strawberry px-2 font-silk text-[9px] text-white",
											children: "ok"
										})]
									})
								]
							}, m.id))
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
			"♡ thx 4 signing ♡",
			"you r so sweet",
			"♡ ♡ ♡"
		] })
	] });
}
//#endregion
export { Guest as component };
