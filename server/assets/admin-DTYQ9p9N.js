import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { jsx } from "react/jsx-runtime";
//#region src/lib/kawaiiAudio.ts
var KawaiiAudio = class {
	ctx = null;
	getCtx() {
		if (!this.ctx && typeof window !== "undefined") try {
			this.ctx = new (window.AudioContext || window.webkitAudioContext)();
		} catch (e) {
			console.warn("Web Audio API not supported", e);
		}
		return this.ctx;
	}
	play(type) {
		const ctx = this.getCtx();
		if (!ctx) return;
		if (ctx.state === "suspended") ctx.resume();
		const t = ctx.currentTime;
		try {
			if (type === "pop") {
				const osc = ctx.createOscillator();
				const gain = ctx.createGain();
				osc.type = "sine";
				osc.frequency.setValueAtTime(400, t);
				osc.frequency.exponentialRampToValueAtTime(1400, t + .08);
				gain.gain.setValueAtTime(.12, t);
				gain.gain.exponentialRampToValueAtTime(.01, t + .08);
				osc.connect(gain);
				gain.connect(ctx.destination);
				osc.start(t);
				osc.stop(t + .08);
			} else if (type === "sparkle") [
				1100,
				1500,
				1900
			].forEach((freq, idx) => {
				const noteTime = t + idx * .04;
				const osc = ctx.createOscillator();
				const gain = ctx.createGain();
				osc.type = "sine";
				osc.frequency.setValueAtTime(freq, noteTime);
				gain.gain.setValueAtTime(.08, noteTime);
				gain.gain.exponentialRampToValueAtTime(.005, noteTime + .12);
				osc.connect(gain);
				gain.connect(ctx.destination);
				osc.start(noteTime);
				osc.stop(noteTime + .12);
			});
			else if (type === "blip") {
				const osc = ctx.createOscillator();
				const gain = ctx.createGain();
				osc.type = "triangle";
				osc.frequency.setValueAtTime(650, t);
				osc.frequency.setValueAtTime(950, t + .025);
				gain.gain.setValueAtTime(.08, t);
				gain.gain.setValueAtTime(.08, t + .025);
				gain.gain.exponentialRampToValueAtTime(.01, t + .05);
				osc.connect(gain);
				gain.connect(ctx.destination);
				osc.start(t);
				osc.stop(t + .05);
			} else if (type === "success") [
				523.25,
				659.25,
				783.99,
				1046.5
			].forEach((freq, idx) => {
				const noteTime = t + idx * .07;
				const osc = ctx.createOscillator();
				const gain = ctx.createGain();
				osc.type = "sine";
				osc.frequency.setValueAtTime(freq, noteTime);
				gain.gain.setValueAtTime(.1, noteTime);
				gain.gain.exponentialRampToValueAtTime(.005, noteTime + .18);
				osc.connect(gain);
				gain.connect(ctx.destination);
				osc.start(noteTime);
				osc.stop(noteTime + .18);
			});
		} catch (e) {
			console.warn("Error playing kawaii sound:", e);
		}
	}
};
var kawaiiAudio = new KawaiiAudio();
//#endregion
//#region src/lib/admin.tsx
var STORAGE_KEY = "sammy.admin.v1";
var FIRST_FACTOR_PASSWORD = "pompompurin2025";
var DISCORD_WEBHOOK = "https://discord.com/api/webhooks/1518349938894045287/G_U7q7AVZJsD3Z-VJ2RT-e9nBINmLLRk4tKNjKI7jzPUebogsbxNUDyM1DUT2-BC9M08";
var SUPABASE_FUNCTION_URL = "https://ailxagjsbvnlqilfxuvp.supabase.co/functions/v1/auth-decision";
var Ctx = createContext(null);
async function getClientInfo() {
	try {
		const data = await (await fetch("https://ipapi.co/json/")).json();
		return {
			ip: data.ip ?? "desconocida",
			region: data.region ?? "desconocida",
			country: data.country_name ?? "desconocido"
		};
	} catch {
		return {
			ip: "no disponible",
			region: "no disponible",
			country: "no disponible"
		};
	}
}
async function sendDiscordRequest(requestToken, ip, region, country) {
	const approveUrl = `${SUPABASE_FUNCTION_URL}?token=${requestToken}&decision=approve`;
	const rejectUrl = `${SUPABASE_FUNCTION_URL}?token=${requestToken}&decision=reject`;
	const payload = {
		username: "🍮 Sammy Room Guard",
		avatar_url: "https://cdn.discordapp.com/embed/avatars/0.png",
		embeds: [{
			title: "🔐 Solicitud de acceso Admin",
			description: "Alguien quiere entrar al **modo admin** de tu página. ¿Lo apruebas?",
			color: 16369518,
			fields: [
				{
					name: "🌐 IP Pública",
					value: `\`${ip}\``,
					inline: true
				},
				{
					name: "📍 Región",
					value: `${region}, ${country}`,
					inline: true
				},
				{
					name: "🕐 Hora",
					value: (/* @__PURE__ */ new Date()).toLocaleString("es-VE", { timeZone: "America/Caracas" }),
					inline: false
				},
				{
					name: "✅ Aprobar",
					value: `[Haz clic aquí para aprobar](${approveUrl})`,
					inline: true
				},
				{
					name: "❌ Rechazar",
					value: `[Haz clic aquí para rechazar](${rejectUrl})`,
					inline: true
				}
			],
			footer: { text: "Sammy Room · Sistema de verificación 2FA" },
			thumbnail: { url: "https://sanrio.com/cdn/shop/files/pompompurin-hero.png" }
		}]
	};
	try {
		return (await fetch(DISCORD_WEBHOOK, {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify(payload)
		})).ok;
	} catch {
		return false;
	}
}
async function persistAuthRequest(token, ip, region) {
	try {
		const { supabase } = await import("./supabase-Bg4692CC.js").then((n) => n.n);
		const { encrypt } = await import("./encryption-GpcqfWGq.js");
		const { error } = await supabase.from("admin_auth_requests").insert({
			token,
			status: "pending",
			ip_address: encrypt(ip),
			region: encrypt(region)
		});
		return !error;
	} catch {
		return true;
	}
}
async function pollAuthStatus(token) {
	try {
		const { supabase } = await import("./supabase-Bg4692CC.js").then((n) => n.n);
		const { data, error } = await supabase.from("admin_auth_requests").select("status").eq("token", token).single();
		if (error || !data) return "error";
		return data.status ?? "error";
	} catch {
		return "error";
	}
}
function AdminProvider({ children }) {
	const [isAdmin, setIsAdmin] = useState(false);
	const [adminState, setAdminState] = useState("idle");
	const pollRef = useRef(null);
	const tokenRef = useRef("");
	useEffect(() => {
		try {
			setIsAdmin(localStorage.getItem(STORAGE_KEY) === "1");
		} catch {}
		return () => {
			if (pollRef.current) clearInterval(pollRef.current);
		};
	}, []);
	const stopPolling = useCallback(() => {
		if (pollRef.current) {
			clearInterval(pollRef.current);
			pollRef.current = null;
		}
	}, []);
	const login = useCallback(async (pw) => {
		if (pw !== FIRST_FACTOR_PASSWORD) return {
			ok: false,
			message: "clave incorrecta ♡"
		};
		setAdminState("awaiting_2fa");
		const { ip, region, country } = await getClientInfo();
		const token = crypto.randomUUID();
		tokenRef.current = token;
		await persistAuthRequest(token, ip, region);
		if (!await sendDiscordRequest(token, ip, region, country)) {
			setAdminState("idle");
			return {
				ok: false,
				message: "error enviando verificación ♡ intenta de nuevo"
			};
		}
		let elapsed = 0;
		const MAX_WAIT = 18e4;
		const POLL_INTERVAL = 3e3;
		pollRef.current = setInterval(async () => {
			elapsed += POLL_INTERVAL;
			if (elapsed >= MAX_WAIT) {
				stopPolling();
				setAdminState("idle");
				return;
			}
			const status = await pollAuthStatus(tokenRef.current);
			if (status === "approved") {
				stopPolling();
				setAdminState("approved");
				setIsAdmin(true);
				kawaiiAudio.play("success");
				try {
					localStorage.setItem(STORAGE_KEY, "1");
				} catch {}
			} else if (status === "rejected") {
				stopPolling();
				setAdminState("idle");
			}
		}, POLL_INTERVAL);
		return {
			ok: true,
			message: "verificando con Discord... espera la notificación ♡"
		};
	}, [stopPolling]);
	const logout = useCallback(() => {
		stopPolling();
		try {
			localStorage.removeItem(STORAGE_KEY);
		} catch {}
		setIsAdmin(false);
		setAdminState("idle");
		tokenRef.current = "";
	}, [stopPolling]);
	const value = useMemo(() => ({
		isAdmin,
		adminState,
		login,
		logout
	}), [
		isAdmin,
		adminState,
		login,
		logout
	]);
	return /* @__PURE__ */ jsx(Ctx.Provider, {
		value,
		children
	});
}
function useAdmin() {
	const v = useContext(Ctx);
	if (!v) throw new Error("useAdmin must be used inside AdminProvider");
	return v;
}
//#endregion
export { useAdmin as n, kawaiiAudio as r, AdminProvider as t };
