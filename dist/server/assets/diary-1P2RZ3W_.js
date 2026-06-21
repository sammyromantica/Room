import { t as supabase } from "./supabase-Bg4692CC.js";
import { n as useAdmin, r as kawaiiAudio } from "./admin-DTYQ9p9N.js";
import { o as Marquee, r as gifs, s as RetroWindow } from "./FloatingDecor-BR3__uCs.js";
import { t as StickerPicker } from "./StickerPicker-BSFYfiv0.js";
import { useCallback, useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
//#region src/lib/diaryStore.ts
var LOCAL_KEY = "sammy.diary.v1";
function todayISO() {
	return (/* @__PURE__ */ new Date()).toISOString().slice(0, 10).replace(/-/g, "/");
}
var SEED = [{
	id: "seed-1",
	title: "primer post ♡",
	description: "hola hola, soy sammy y este es mi rinconcito. aqui voy a postear todo lo que se me ocurra ✿ pudin gang 4ever 🍮",
	images: [],
	links: [{
		label: "instagram",
		url: "https://instagram.com/sammyromantica"
	}],
	at: todayISO(),
	likes: 7,
	comments: [{
		id: "c1",
		name: "anon",
		text: "te amo sammy ♡",
		at: todayISO()
	}]
}];
async function fetchPostsFromSupabase() {
	try {
		const { decrypt } = await import("./encryption-GpcqfWGq.js");
		const { data: posts, error } = await supabase.from("diary_posts").select("*").order("created_at", { ascending: false });
		if (error || !posts) return null;
		const { data: comments } = await supabase.from("diary_comments").select("*").order("created_at", { ascending: true });
		return posts.map((p) => ({
			id: p.id,
			title: p.title ? decrypt(p.title) : void 0,
			description: p.description ? decrypt(p.description) : void 0,
			images: p.images ?? [],
			links: p.links ? JSON.parse(decrypt(p.links)) : void 0,
			at: p.at,
			likes: p.likes ?? 0,
			likedByMe: false,
			comments: (comments ?? []).filter((c) => c.post_id === p.id).map((c) => ({
				id: c.id,
				name: decrypt(c.name ?? ""),
				text: decrypt(c.text ?? ""),
				at: c.at,
				fromAdmin: c.from_admin ?? false,
				reply: c.reply ? decrypt(c.reply) : void 0
			}))
		}));
	} catch {
		return null;
	}
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
function writeLocal(posts) {
	try {
		localStorage.setItem(LOCAL_KEY, JSON.stringify(posts));
	} catch {}
	window.dispatchEvent(new CustomEvent("sammy:diary"));
}
function useDiary() {
	const [posts, setPosts] = useState([]);
	const [useDb, setUseDb] = useState(false);
	const load = useCallback(async () => {
		const remote = await fetchPostsFromSupabase();
		if (remote !== null) {
			setPosts(remote);
			setUseDb(true);
		} else {
			setPosts(readLocal());
			setUseDb(false);
		}
	}, []);
	useEffect(() => {
		load();
		const onLocal = () => {
			if (!useDb) setPosts(readLocal());
		};
		window.addEventListener("sammy:diary", onLocal);
		window.addEventListener("storage", onLocal);
		return () => {
			window.removeEventListener("sammy:diary", onLocal);
			window.removeEventListener("storage", onLocal);
		};
	}, [load, useDb]);
	return {
		posts,
		async addPost(p) {
			const at = todayISO();
			if (useDb) {
				const { encrypt } = await import("./encryption-GpcqfWGq.js");
				const { data, error } = await supabase.from("diary_posts").insert({
					title: p.title ? encrypt(p.title) : null,
					description: p.description ? encrypt(p.description) : null,
					images: p.images,
					links: p.links ? encrypt(JSON.stringify(p.links)) : null,
					at,
					likes: 0
				}).select("id").single();
				if (!error && data) {
					await load();
					return;
				}
			}
			writeLocal([{
				...p,
				id: crypto.randomUUID(),
				at,
				likes: 0,
				comments: []
			}, ...readLocal()]);
		},
		async updatePost(id, patch) {
			if (useDb) {
				const { encrypt } = await import("./encryption-GpcqfWGq.js");
				const updateObj = {};
				if (patch.title !== void 0) updateObj.title = patch.title ? encrypt(patch.title) : null;
				if (patch.description !== void 0) updateObj.description = patch.description ? encrypt(patch.description) : null;
				await supabase.from("diary_posts").update(updateObj).eq("id", id);
				setPosts((prev) => prev.map((x) => x.id === id ? {
					...x,
					...patch
				} : x));
			} else writeLocal(readLocal().map((x) => x.id === id ? {
				...x,
				...patch
			} : x));
		},
		async deletePost(id) {
			if (useDb) {
				await supabase.from("diary_posts").delete().eq("id", id);
				setPosts((prev) => prev.filter((x) => x.id !== id));
			} else writeLocal(readLocal().filter((x) => x.id !== id));
		},
		async toggleLike(id) {
			setPosts((prev) => {
				const updated = prev.map((x) => x.id === id ? {
					...x,
					likedByMe: !x.likedByMe,
					likes: x.likes + (x.likedByMe ? -1 : 1)
				} : x);
				if (useDb) {
					const target = updated.find((x) => x.id === id);
					if (target) supabase.from("diary_posts").update({ likes: target.likes }).eq("id", id);
				} else writeLocal(updated);
				return updated;
			});
		},
		async addComment(postId, name, text, fromAdmin = false) {
			const at = todayISO();
			if (useDb) {
				const { encrypt } = await import("./encryption-GpcqfWGq.js");
				const { data, error } = await supabase.from("diary_comments").insert({
					post_id: postId,
					name: encrypt(name),
					text: encrypt(text),
					at,
					from_admin: fromAdmin
				}).select("id").single();
				if (!error && data) {
					const newComment = {
						id: data.id,
						name,
						text,
						at,
						fromAdmin
					};
					setPosts((prev) => prev.map((p) => p.id === postId ? {
						...p,
						comments: [...p.comments, newComment]
					} : p));
					return;
				}
			}
			writeLocal(readLocal().map((p) => p.id === postId ? {
				...p,
				comments: [...p.comments, {
					id: crypto.randomUUID(),
					name,
					text,
					at,
					fromAdmin
				}]
			} : p));
		},
		async replyComment(postId, commentId, reply) {
			if (useDb) {
				const { encrypt } = await import("./encryption-GpcqfWGq.js");
				await supabase.from("diary_comments").update({ reply: encrypt(reply) }).eq("id", commentId);
				setPosts((prev) => prev.map((p) => p.id === postId ? {
					...p,
					comments: p.comments.map((c) => c.id === commentId ? {
						...c,
						reply
					} : c)
				} : p));
			} else writeLocal(readLocal().map((p) => p.id === postId ? {
				...p,
				comments: p.comments.map((c) => c.id === commentId ? {
					...c,
					reply
				} : c)
			} : p));
		},
		async deleteComment(postId, commentId) {
			if (useDb) {
				await supabase.from("diary_comments").delete().eq("id", commentId);
				setPosts((prev) => prev.map((p) => p.id === postId ? {
					...p,
					comments: p.comments.filter((c) => c.id !== commentId)
				} : p));
			} else writeLocal(readLocal().map((p) => p.id === postId ? {
				...p,
				comments: p.comments.filter((c) => c.id !== commentId)
			} : p));
		}
	};
}
//#endregion
//#region src/routes/diary.tsx?tsr-split=component
function readFiles(fs) {
	if (!fs) return Promise.resolve([]);
	const arr = Array.from(fs).slice(0, 10);
	return Promise.all(arr.map((f) => new Promise((res, rej) => {
		const r = new FileReader();
		r.onload = () => res(String(r.result));
		r.onerror = rej;
		r.readAsDataURL(f);
	})));
}
function NewPostForm({ onCreate }) {
	const [title, setTitle] = useState("");
	const [desc, setDesc] = useState("");
	const [links, setLinks] = useState([]);
	const [imgs, setImgs] = useState([]);
	const [linkLabel, setLinkLabel] = useState("");
	const [linkUrl, setLinkUrl] = useState("");
	function insertSticker(s) {
		setDesc((d) => d + " " + s);
	}
	return /* @__PURE__ */ jsxs("form", {
		onSubmit: (e) => {
			e.preventDefault();
			if (!title && !desc && imgs.length === 0) return;
			onCreate({
				title: title || void 0,
				description: desc || void 0,
				links: links.length ? links : void 0,
				images: imgs
			});
			setTitle("");
			setDesc("");
			setLinks([]);
			setImgs([]);
			setLinkLabel("");
			setLinkUrl("");
		},
		className: "space-y-2 border-2 border-dashed border-strawberry bg-butter p-3 shadow-[3px_3px_0_var(--beret)]",
		children: [
			/* @__PURE__ */ jsx("h4", {
				className: "font-cherry text-[14px] text-strawberry",
				children: "♥ nuevo post (admin)"
			}),
			/* @__PURE__ */ jsx("input", {
				value: title,
				onChange: (e) => setTitle(e.target.value),
				placeholder: "título (opcional)",
				className: "block w-full border-2 border-t-beret border-l-beret border-r-cream border-b-cream bg-white px-2 py-1 font-dot text-[14px] text-beret outline-none"
			}),
			/* @__PURE__ */ jsx("textarea", {
				value: desc,
				onChange: (e) => setDesc(e.target.value),
				placeholder: "descripción (opcional) — usa stickers ♡",
				rows: 3,
				className: "block w-full resize-y border-2 border-t-beret border-l-beret border-r-cream border-b-cream bg-white px-2 py-1 font-dot text-[14px] text-beret outline-none"
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ jsx(StickerPicker, { onPick: insertSticker }),
					/* @__PURE__ */ jsxs("label", {
						className: "border-2 border-beret bg-cream px-2 py-0.5 font-silk text-[10px] text-beret shadow-[2px_2px_0_var(--beret)] cursor-pointer",
						children: ["📷 imágenes (max 10)", /* @__PURE__ */ jsx("input", {
							type: "file",
							accept: "image/*",
							multiple: true,
							hidden: true,
							onChange: async (e) => {
								const more = await readFiles(e.target.files);
								setImgs((prev) => [...prev, ...more].slice(0, 10));
								e.target.value = "";
							}
						})]
					}),
					/* @__PURE__ */ jsxs("span", {
						className: "font-silk text-[9px] text-cocoa",
						children: [imgs.length, "/10"]
					})
				]
			}),
			imgs.length > 0 && /* @__PURE__ */ jsx("div", {
				className: "grid grid-cols-5 gap-1",
				children: imgs.map((src, i) => /* @__PURE__ */ jsxs("div", {
					className: "relative",
					children: [/* @__PURE__ */ jsx("img", {
						src,
						alt: "",
						className: "h-16 w-full object-cover border border-beret"
					}), /* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: () => setImgs(imgs.filter((_, j) => j !== i)),
						className: "absolute -right-1 -top-1 h-5 w-5 border border-beret bg-strawberry text-[10px] text-white",
						children: "✕"
					})]
				}, i))
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "space-y-1",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex gap-1",
					children: [
						/* @__PURE__ */ jsx("input", {
							value: linkLabel,
							onChange: (e) => setLinkLabel(e.target.value),
							placeholder: "label",
							className: "flex-1 border-2 border-t-beret border-l-beret border-r-cream border-b-cream bg-white px-2 py-1 font-dot text-[12px] text-beret outline-none"
						}),
						/* @__PURE__ */ jsx("input", {
							value: linkUrl,
							onChange: (e) => setLinkUrl(e.target.value),
							placeholder: "https://…",
							className: "flex-[2] border-2 border-t-beret border-l-beret border-r-cream border-b-cream bg-white px-2 py-1 font-dot text-[12px] text-beret outline-none"
						}),
						/* @__PURE__ */ jsx("button", {
							type: "button",
							onClick: () => {
								if (linkLabel && linkUrl) {
									setLinks([...links, {
										label: linkLabel,
										url: linkUrl
									}]);
									setLinkLabel("");
									setLinkUrl("");
								}
							},
							className: "border-2 border-beret bg-butter px-2 font-silk text-[10px] text-beret",
							children: "+ link"
						})
					]
				}), links.map((l, i) => /* @__PURE__ */ jsxs("div", {
					className: "flex items-center justify-between border border-beret bg-cream px-2 py-0.5 font-silk text-[10px] text-beret",
					children: [/* @__PURE__ */ jsxs("span", { children: [
						"♥ ",
						l.label,
						" → ",
						l.url
					] }), /* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: () => setLinks(links.filter((_, j) => j !== i)),
						className: "text-strawberry",
						children: "✕"
					})]
				}, i))]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "text-right",
				children: /* @__PURE__ */ jsx("button", {
					type: "submit",
					className: "win-btn",
					children: "♥ publicar"
				})
			})
		]
	});
}
function PostCard({ p }) {
	const { isAdmin } = useAdmin();
	const { toggleLike, addComment, replyComment, deleteComment, deletePost, updatePost } = useDiary();
	const [name, setName] = useState("");
	const [text, setText] = useState("");
	const [replyDraft, setReplyDraft] = useState({});
	const [editing, setEditing] = useState(false);
	const [draftTitle, setDraftTitle] = useState(p.title ?? "");
	const [draftDesc, setDraftDesc] = useState(p.description ?? "");
	return /* @__PURE__ */ jsxs("article", {
		className: "border-2 border-beret bg-cream p-3 shadow-[3px_3px_0_var(--beret)]",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "mb-2 flex items-center justify-between font-silk text-[10px] text-beret",
				children: [/* @__PURE__ */ jsxs("span", { children: ["📅 ", p.at] }), /* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ jsxs("button", {
						onClick: () => {
							kawaiiAudio.play("sparkle");
							toggleLike(p.id);
						},
						className: "border border-beret bg-butter px-2 py-0.5",
						children: [
							p.likedByMe ? "💖" : "🤍",
							" ",
							p.likes
						]
					}), isAdmin && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("button", {
						onClick: () => {
							kawaiiAudio.play("blip");
							setEditing((v) => !v);
						},
						className: "border border-beret bg-butter px-2 py-0.5",
						children: "✎"
					}), /* @__PURE__ */ jsx("button", {
						onClick: () => {
							kawaiiAudio.play("pop");
							if (confirm("¿borrar post?")) deletePost(p.id);
						},
						className: "border border-beret bg-strawberry px-2 py-0.5 text-white",
						children: "🗑"
					})] })]
				})]
			}),
			editing && isAdmin ? /* @__PURE__ */ jsxs("div", {
				className: "space-y-2",
				children: [
					/* @__PURE__ */ jsx("input", {
						value: draftTitle,
						onChange: (e) => setDraftTitle(e.target.value),
						className: "block w-full border-2 border-dashed border-strawberry bg-white px-2 py-1 font-cherry text-[14px] text-beret outline-none"
					}),
					/* @__PURE__ */ jsx("textarea", {
						value: draftDesc,
						onChange: (e) => setDraftDesc(e.target.value),
						rows: 3,
						className: "block w-full border-2 border-dashed border-strawberry bg-white px-2 py-1 font-dot text-[14px] text-beret outline-none"
					}),
					/* @__PURE__ */ jsx("div", {
						className: "text-right",
						children: /* @__PURE__ */ jsx("button", {
							onClick: () => {
								updatePost(p.id, {
									title: draftTitle || void 0,
									description: draftDesc || void 0
								});
								setEditing(false);
							},
							className: "win-btn",
							children: "guardar"
						})
					})
				]
			}) : /* @__PURE__ */ jsxs(Fragment, { children: [p.title && /* @__PURE__ */ jsx("h3", {
				className: "font-cherry text-[16px] text-beret",
				children: p.title
			}), p.description && /* @__PURE__ */ jsx("p", {
				className: "mt-1 whitespace-pre-wrap font-dot text-[14px] text-beret",
				children: p.description
			})] }),
			p.images.length > 0 && /* @__PURE__ */ jsx("div", {
				className: `mt-2 grid gap-1 ${p.images.length === 1 ? "grid-cols-1" : p.images.length <= 4 ? "grid-cols-2" : "grid-cols-3"}`,
				children: p.images.map((src, i) => /* @__PURE__ */ jsx("div", {
					className: "border-2 border-beret bg-butter p-1",
					children: /* @__PURE__ */ jsx("img", {
						src,
						alt: "",
						className: "h-32 w-full object-cover"
					})
				}, i))
			}),
			p.links && p.links.length > 0 && /* @__PURE__ */ jsx("div", {
				className: "mt-2 flex flex-wrap gap-1",
				children: p.links.map((l, i) => /* @__PURE__ */ jsxs("a", {
					href: l.url,
					target: "_blank",
					rel: "noreferrer",
					className: "border border-beret bg-blush px-2 py-0.5 font-silk text-[10px] text-beret hover:bg-strawberry hover:text-white",
					children: ["♥ ", l.label]
				}, i))
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "mt-3 border-t-2 border-dashed border-beret pt-2",
				children: [
					/* @__PURE__ */ jsxs("h4", {
						className: "mb-1 font-silk text-[10px] text-cocoa",
						children: [
							"─ comentarios (",
							p.comments.length,
							") ─"
						]
					}),
					/* @__PURE__ */ jsx("ul", {
						className: "space-y-2",
						children: p.comments.map((c) => /* @__PURE__ */ jsxs("li", {
							className: `border-2 border-beret p-2 ${c.fromAdmin ? "bg-blush" : "bg-butter"}`,
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center justify-between font-silk text-[9px] text-beret",
									children: [/* @__PURE__ */ jsxs("span", { children: [
										c.fromAdmin && "♥ ",
										c.name,
										" · ",
										c.at
									] }), isAdmin && /* @__PURE__ */ jsx("button", {
										onClick: () => {
											kawaiiAudio.play("pop");
											deleteComment(p.id, c.id);
										},
										className: "text-strawberry",
										children: "✕"
									})]
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mt-1 font-dot text-[13px] text-beret",
									children: c.text
								}),
								c.reply && /* @__PURE__ */ jsxs("div", {
									className: "mt-1 border-l-2 border-strawberry bg-cream px-2 py-1 font-dot text-[12px] text-beret",
									children: [
										/* @__PURE__ */ jsx("span", {
											className: "font-silk text-[9px] text-strawberry",
											children: "♥ sammy:"
										}),
										" ",
										c.reply
									]
								}),
								isAdmin && !c.reply && /* @__PURE__ */ jsxs("div", {
									className: "mt-1 flex gap-1",
									children: [/* @__PURE__ */ jsx("input", {
										value: replyDraft[c.id] ?? "",
										onChange: (e) => setReplyDraft({
											...replyDraft,
											[c.id]: e.target.value
										}),
										placeholder: "responder…",
										className: "flex-1 border border-beret bg-white px-1 py-0.5 font-dot text-[12px] text-beret outline-none"
									}), /* @__PURE__ */ jsx("button", {
										onClick: () => {
											kawaiiAudio.play("blip");
											const r = replyDraft[c.id]?.trim();
											if (r) replyComment(p.id, c.id, r);
										},
										className: "border border-beret bg-strawberry px-2 font-silk text-[9px] text-white",
										children: "ok"
									})]
								})
							]
						}, c.id))
					}),
					/* @__PURE__ */ jsxs("form", {
						onSubmit: (e) => {
							e.preventDefault();
							if (!name.trim() || !text.trim()) return;
							addComment(p.id, name.trim(), text.trim(), isAdmin);
							setName("");
							setText("");
						},
						className: "mt-2 flex flex-wrap gap-1",
						children: [
							/* @__PURE__ */ jsx("input", {
								value: name,
								onChange: (e) => setName(e.target.value),
								placeholder: isAdmin ? "sammy" : "tu nombre",
								className: "w-24 border border-beret bg-white px-1 py-0.5 font-dot text-[12px] text-beret outline-none"
							}),
							/* @__PURE__ */ jsx("input", {
								value: text,
								onChange: (e) => setText(e.target.value),
								placeholder: "deja un comentario…",
								className: "flex-1 border border-beret bg-white px-1 py-0.5 font-dot text-[12px] text-beret outline-none"
							}),
							/* @__PURE__ */ jsx("button", {
								type: "submit",
								className: "border border-beret bg-butter px-2 font-silk text-[10px] text-beret",
								onClick: () => kawaiiAudio.play("pop"),
								children: "enviar"
							})
						]
					})
				]
			})
		]
	});
}
function Diary() {
	const { isAdmin } = useAdmin();
	const { posts, addPost } = useDiary();
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(Marquee, { items: [
			"♡ dear diary ♡",
			"today i feel...",
			"pudding o'clock",
			"♡ ♡ ♡"
		] }),
		/* @__PURE__ */ jsx("main", {
			className: "flex min-h-[calc(100vh-40px)] items-center justify-center p-4",
			children: /* @__PURE__ */ jsxs(RetroWindow, {
				title: "C:\\\\Sammy\\\\diary.html",
				className: "sparkle-bg",
				children: [/* @__PURE__ */ jsxs("div", {
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
							children: "♡ dear diary ♡"
						}),
						/* @__PURE__ */ jsx("img", {
							src: gifs.pomCheek.url,
							alt: "",
							width: 42,
							height: 42
						})
					]
				}), /* @__PURE__ */ jsxs("div", {
					className: "mt-4 space-y-4",
					children: [
						isAdmin && /* @__PURE__ */ jsx(NewPostForm, { onCreate: addPost }),
						posts.length === 0 && !isAdmin && /* @__PURE__ */ jsx("p", {
							className: "border-2 border-dashed border-beret bg-cream p-4 text-center font-dot text-[14px] text-beret",
							children: "no hay posts todavía ♡"
						}),
						posts.map((p) => /* @__PURE__ */ jsx(PostCard, { p }, p.id)),
						/* @__PURE__ */ jsx("div", {
							className: "pt-2 text-center",
							children: /* @__PURE__ */ jsx(Link, {
								to: "/home",
								className: "win-btn",
								children: "← back"
							})
						})
					]
				})]
			})
		}),
		/* @__PURE__ */ jsx(Marquee, { items: [
			"♡ ♡ ♡",
			"today was nice",
			"pom pom approves",
			"sweet dreams"
		] })
	] });
}
//#endregion
export { Diary as component };
