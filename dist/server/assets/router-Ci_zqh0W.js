import { n as useAdmin, r as kawaiiAudio, t as AdminProvider } from "./admin-DTYQ9p9N.js";
import { n as useSettings, t as SettingsProvider } from "./siteSettings-D1KHlKFM.js";
import { n as ExternalLinkProvider } from "./ExternalLinkModal-D_ZRJfHu.js";
import { t as pompompurin_default } from "./pompompurin-DDSiQiqT.js";
import { useEffect, useRef, useState } from "react";
import { HeadContent, Link, Outlet, Scripts, createFileRoute, createHashHistory, createRootRouteWithContext, createRouter, lazyRouteComponent, useRouter, useRouterState } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
//#region src/styles.css?url
var styles_default = "/Room/assets/styles-cDKTxf2Y.css";
//#endregion
//#region src/components/AdminBubble.tsx
function AdminBubble() {
	const { isAdmin, adminState, login, logout } = useAdmin();
	const { reset } = useSettings();
	const [open, setOpen] = useState(false);
	const [pw, setPw] = useState("");
	const [err, setErr] = useState("");
	const [loading, setLoading] = useState(false);
	function handleOpen() {
		kawaiiAudio.play("blip");
		setOpen(true);
		setErr("");
		setPw("");
	}
	async function handleSubmit(e) {
		e.preventDefault();
		if (loading) return;
		setLoading(true);
		setErr("");
		const result = await login(pw);
		if (!result.ok) {
			kawaiiAudio.play("pop");
			setErr(result.message);
			setLoading(false);
		} else {
			setErr(result.message);
			setLoading(false);
		}
	}
	if (isAdmin && open) setOpen(false);
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx("button", {
			onClick: handleOpen,
			title: "?",
			"aria-label": "secret",
			className: "fixed bottom-2 right-2 z-[10000] h-8 w-8 opacity-40 transition hover:opacity-100 hover:scale-110",
			children: /* @__PURE__ */ jsx("img", {
				src: pompompurin_default,
				alt: "",
				className: "h-full w-full"
			})
		}),
		isAdmin && /* @__PURE__ */ jsxs("div", {
			className: "fixed top-2 right-2 z-[10000] flex items-center gap-2 border-2 border-beret bg-strawberry px-2 py-1 font-silk text-[10px] text-white shadow-[3px_3px_0_var(--beret)]",
			children: [
				/* @__PURE__ */ jsx("span", { children: "♥ ADMIN MODE" }),
				/* @__PURE__ */ jsx("button", {
					onClick: () => {
						kawaiiAudio.play("pop");
						if (confirm("¿restablecer todos los textos/orden por defecto?")) reset();
					},
					className: "border border-white px-1 hover:bg-white hover:text-strawberry",
					title: "reset textos",
					children: "↺"
				}),
				/* @__PURE__ */ jsx("button", {
					onClick: () => {
						kawaiiAudio.play("blip");
						logout();
					},
					className: "border border-white px-1 hover:bg-white hover:text-strawberry",
					children: "salir"
				})
			]
		}),
		open && /* @__PURE__ */ jsx("div", {
			className: "fixed inset-0 z-[10002] flex items-center justify-center bg-beret/40 p-4",
			onClick: () => {
				kawaiiAudio.play("blip");
				setOpen(false);
			},
			children: /* @__PURE__ */ jsxs("div", {
				className: "w-full max-w-xs border-2 border-beret bg-cream shadow-[6px_6px_0_var(--beret)]",
				onClick: (e) => e.stopPropagation(),
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex items-center justify-between bg-[#000080] px-2 py-1 font-silk text-[10px] text-white",
					children: [/* @__PURE__ */ jsx("span", { children: "🔒 admin login" }), /* @__PURE__ */ jsx("button", {
						onClick: () => {
							kawaiiAudio.play("blip");
							setOpen(false);
						},
						className: "inline-flex h-4 w-5 items-center justify-center border-2 border-r-beret border-b-beret border-t-cream border-l-cream bg-butter text-[8px] text-beret",
						children: "✕"
					})]
				}), /* @__PURE__ */ jsxs("form", {
					className: "space-y-3 p-4",
					onSubmit: handleSubmit,
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "flex items-center justify-center",
							children: /* @__PURE__ */ jsx("img", {
								src: "/Room/assets/pompompurin-sqU1NvDa.gif",
								alt: "",
								className: `h-16 w-16 ${adminState === "awaiting_2fa" ? "animate-spin-slow" : "animate-floaty"}`
							})
						}),
						adminState === "awaiting_2fa" ? /* @__PURE__ */ jsxs("div", {
							className: "text-center space-y-2",
							children: [
								/* @__PURE__ */ jsx("p", {
									className: "font-silk text-[9px] text-beret",
									children: "♡ verificando en Discord..."
								}),
								/* @__PURE__ */ jsx("p", {
									className: "font-dot text-[12px] text-cocoa",
									children: "Revisa la notificación del bot y aprueba el acceso desde allí."
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex justify-center gap-[3px] pt-1",
									children: [
										/* @__PURE__ */ jsx("span", { className: "inline-block h-2 w-[3px] animate-eq bg-beret" }),
										/* @__PURE__ */ jsx("span", {
											className: "inline-block h-3 w-[3px] animate-eq bg-beret",
											style: { animationDelay: "0.15s" }
										}),
										/* @__PURE__ */ jsx("span", {
											className: "inline-block h-2 w-[3px] animate-eq bg-beret",
											style: { animationDelay: "0.3s" }
										})
									]
								})
							]
						}) : /* @__PURE__ */ jsxs("label", {
							className: "block font-silk text-[10px] text-beret",
							children: ["clave secreta:", /* @__PURE__ */ jsx("input", {
								type: "password",
								value: pw,
								onChange: (e) => setPw(e.target.value),
								autoFocus: true,
								disabled: loading,
								className: "mt-1 block w-full border-2 border-t-beret border-l-beret border-r-cream border-b-cream bg-white px-2 py-1 font-dot text-[14px] text-beret outline-none disabled:opacity-50"
							})]
						}),
						err && /* @__PURE__ */ jsx("p", {
							className: `font-silk text-[10px] ${err.includes("verificando") ? "text-beret" : "text-strawberry"}`,
							children: err
						}),
						adminState !== "awaiting_2fa" && /* @__PURE__ */ jsxs("div", {
							className: "flex justify-end gap-2",
							children: [/* @__PURE__ */ jsx("button", {
								type: "button",
								onClick: () => {
									kawaiiAudio.play("blip");
									setOpen(false);
								},
								className: "win-btn",
								children: "Cancel"
							}), /* @__PURE__ */ jsx("button", {
								type: "submit",
								disabled: loading,
								className: "win-btn disabled:opacity-50",
								onClick: () => {
									if (!loading) kawaiiAudio.play("pop");
								},
								children: "♥ entrar"
							})]
						})
					]
				})]
			})
		})
	] });
}
//#endregion
//#region src/assets/pom-pom-beat.ogg
var pom_pom_beat_default = "/Room/assets/pom-pom-beat-6U7l3TSl.ogg";
//#endregion
//#region src/components/MusicPlayer.tsx
var KEY = "sammy.music.on";
function MusicPlayer() {
	const ref = useRef(null);
	const [on, setOn] = useState(false);
	const [ready, setReady] = useState(false);
	useEffect(() => {
		try {
			if (localStorage.getItem(KEY) === "1") setOn(true);
		} catch {}
	}, []);
	useEffect(() => {
		const a = ref.current;
		if (!a) return;
		a.volume = .5;
		if (on) a.play().then(() => setReady(true)).catch(() => setReady(false));
		else a.pause();
		try {
			localStorage.setItem(KEY, on ? "1" : "0");
		} catch {}
	}, [on]);
	return /* @__PURE__ */ jsxs("div", {
		className: "fixed bottom-3 left-3 z-[10000] flex items-center gap-2",
		children: [/* @__PURE__ */ jsx("audio", {
			ref,
			src: pom_pom_beat_default,
			loop: true,
			preload: "none"
		}), /* @__PURE__ */ jsxs("button", {
			onClick: () => setOn((v) => !v),
			className: "flex items-center gap-2 border-2 border-beret bg-butter px-3 py-1.5 font-silk text-[10px] text-beret shadow-[3px_3px_0_var(--beret)] transition hover:translate-x-[1px] hover:translate-y-[1px]",
			"aria-label": on ? "mute music" : "play music",
			title: on ? "click to mute" : "click for music ♡",
			children: [
				/* @__PURE__ */ jsx("span", {
					className: "text-[14px]",
					children: on ? "🔊" : "🔇"
				}),
				/* @__PURE__ */ jsx("span", { children: on ? "♫ pom pom beat" : "music: off" }),
				on && ready && /* @__PURE__ */ jsxs("span", {
					className: "flex items-end gap-[2px]",
					children: [
						/* @__PURE__ */ jsx("span", { className: "inline-block h-2 w-[2px] animate-eq bg-beret" }),
						/* @__PURE__ */ jsx("span", {
							className: "inline-block h-3 w-[2px] animate-eq bg-beret",
							style: { animationDelay: "0.15s" }
						}),
						/* @__PURE__ */ jsx("span", {
							className: "inline-block h-2 w-[2px] animate-eq bg-beret",
							style: { animationDelay: "0.3s" }
						})
					]
				})
			]
		})]
	});
}
//#endregion
//#region src/components/PageTransition.tsx
/**
* Cute transition: pompompurin slides across the screen "dragging" the page.
* Triggers on every pathname change.
*/
function PageTransition() {
	const path = useRouterState({ select: (s) => s.location.pathname });
	const [active, setActive] = useState(false);
	const first = useRef(true);
	useEffect(() => {
		if (first.current) {
			first.current = false;
			return;
		}
		setActive(true);
		const t = setTimeout(() => setActive(false), 900);
		return () => clearTimeout(t);
	}, [path]);
	if (!active) return null;
	return /* @__PURE__ */ jsxs("div", {
		className: "pointer-events-none fixed inset-0 z-[9997] overflow-hidden",
		children: [
			/* @__PURE__ */ jsx("div", { className: "absolute inset-0 origin-left animate-curtain bg-butter" }),
			/* @__PURE__ */ jsx("div", {
				className: "absolute top-1/2 -translate-y-1/2 animate-pom-drag",
				"aria-hidden": true,
				children: /* @__PURE__ */ jsx("img", {
					src: pompompurin_default,
					alt: "",
					className: "h-28 w-28 drop-shadow-[4px_4px_0_var(--beret)]"
				})
			}),
			/* @__PURE__ */ jsx("div", {
				className: "absolute inset-x-0 top-[55%] flex justify-center font-cherry text-[18px] text-beret opacity-0 animate-pom-text",
				children: "♡ loading ♡"
			})
		]
	});
}
//#endregion
//#region src/routes/__root.tsx
function NotFoundComponent() {
	return /* @__PURE__ */ jsx("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ jsx("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ jsx("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-6",
					children: /* @__PURE__ */ jsx(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	return /* @__PURE__ */ jsx("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ jsx("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ jsx("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ jsx("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$6 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Sammy Room ♥ Welcome" },
			{
				name: "description",
				content: "A cozy webcore kawaii corner of the internet, decorated with Pompompurin vibes."
			},
			{
				name: "author",
				content: "Sammy"
			},
			{
				property: "og:title",
				content: "Sammy Room"
			},
			{
				property: "og:description",
				content: "Welcome to my pudding-yellow corner of the web."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Press+Start+2P&family=DotGothic16&family=VT323&family=Silkscreen&family=Pixelify+Sans:wght@400..700&family=Cherry+Bomb+One&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ jsxs("html", {
		lang: "en",
		children: [/* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }), /* @__PURE__ */ jsxs("body", { children: [children, /* @__PURE__ */ jsx(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$6.useRouteContext();
	return /* @__PURE__ */ jsx(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ jsx(SettingsProvider, { children: /* @__PURE__ */ jsx(AdminProvider, { children: /* @__PURE__ */ jsx(ExternalLinkProvider, { children: /* @__PURE__ */ jsxs("div", {
			className: "crt-screen",
			children: [
				/* @__PURE__ */ jsx(Outlet, {}),
				/* @__PURE__ */ jsx(PageTransition, {}),
				/* @__PURE__ */ jsx(MusicPlayer, {}),
				/* @__PURE__ */ jsx(AdminBubble, {})
			]
		}) }) }) })
	});
}
//#endregion
//#region src/routes/links.tsx
var $$splitComponentImporter$5 = () => import("./links-ClPeDvpa.js");
var Route$5 = createFileRoute("/links")({
	head: () => ({ meta: [{ title: "Sammy Room ♥ Links" }, {
		name: "description",
		content: "Sammy's real links — instagram, whatsapp channel and more."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
//#endregion
//#region src/routes/home.tsx
var $$splitComponentImporter$4 = () => import("./home-DRn-QUNu.js");
var Route$4 = createFileRoute("/home")({
	head: () => ({ meta: [{ title: "Sammy Room ♥ Menu" }, {
		name: "description",
		content: "Choose where to go: bio, diary, guestbook, or links."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
//#endregion
//#region src/routes/guest.tsx
var $$splitComponentImporter$3 = () => import("./guest-Dz5FeerL.js");
var Route$3 = createFileRoute("/guest")({
	head: () => ({ meta: [{ title: "Sammy Room ♥ Guestbook" }, {
		name: "description",
		content: "Sign Sammy's pudding-yellow guestbook."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
//#endregion
//#region src/routes/diary.tsx
var $$splitComponentImporter$2 = () => import("./diary-1P2RZ3W_.js");
var Route$2 = createFileRoute("/diary")({
	head: () => ({ meta: [{ title: "Sammy Room ♥ Diary" }, {
		name: "description",
		content: "Little diary entries from Sammy's room."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
//#endregion
//#region src/routes/bio.tsx
var $$splitComponentImporter$1 = () => import("./bio-B3nVcooq.js");
var Route$1 = createFileRoute("/bio")({
	head: () => ({ meta: [{ title: "Sammy Room ♥ Bio" }, {
		name: "description",
		content: "About sammy: interests, music, movies and more."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
//#endregion
//#region src/routes/index.tsx
var $$splitComponentImporter = () => import("./routes-D1uljPRG.js");
var Route = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "Sammy Room ♥ Welcome" },
		{
			name: "description",
			content: "A cozy webcore kawaii corner of the internet, decorated with Pompompurin vibes."
		},
		{
			property: "og:title",
			content: "Sammy Room ♥"
		},
		{
			property: "og:description",
			content: "Welcome to my pudding-yellow corner of the web."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
//#region src/routeTree.gen.ts
var LinksRoute = Route$5.update({
	id: "/links",
	path: "/links",
	getParentRoute: () => Route$6
});
var HomeRoute = Route$4.update({
	id: "/home",
	path: "/home",
	getParentRoute: () => Route$6
});
var GuestRoute = Route$3.update({
	id: "/guest",
	path: "/guest",
	getParentRoute: () => Route$6
});
var DiaryRoute = Route$2.update({
	id: "/diary",
	path: "/diary",
	getParentRoute: () => Route$6
});
var BioRoute = Route$1.update({
	id: "/bio",
	path: "/bio",
	getParentRoute: () => Route$6
});
var rootRouteChildren = {
	IndexRoute: Route.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$6
	}),
	BioRoute,
	DiaryRoute,
	GuestRoute,
	HomeRoute,
	LinksRoute
};
var routeTree = Route$6._addFileChildren(rootRouteChildren)._addFileTypes();
//#endregion
//#region src/router.tsx
var getRouter = () => {
	const queryClient = new QueryClient();
	const history = createHashHistory();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0,
		history
	});
};
//#endregion
export { getRouter };
