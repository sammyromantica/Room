import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { kawaiiAudio } from "@/lib/kawaiiAudio";

const STORAGE_KEY = "sammy.admin.v1";
const FIRST_FACTOR_PASSWORD = "pompompurin2025";
const DISCORD_WEBHOOK = "https://discord.com/api/webhooks/1518349938894045287/G_U7q7AVZJsD3Z-VJ2RT-e9nBINmLLRk4tKNjKI7jzPUebogsbxNUDyM1DUT2-BC9M08";
// URL de tu Edge Function en Supabase (debe ser pública)
const SUPABASE_FUNCTION_URL = "https://ailxagjsbvnlqilfxuvp.supabase.co/functions/v1/auth-decision";

type AdminState = "idle" | "awaiting_2fa" | "approved";

type AdminCtx = {
  isAdmin: boolean;
  adminState: AdminState;
  login: (pw: string) => Promise<{ ok: boolean; message: string }>;
  logout: () => void;
};

const Ctx = createContext<AdminCtx | null>(null);

async function getClientInfo(): Promise<{ ip: string; region: string; country: string }> {
  try {
    const res = await fetch("https://ipapi.co/json/");
    const data = await res.json();
    return {
      ip: data.ip ?? "desconocida",
      region: data.region ?? "desconocida",
      country: data.country_name ?? "desconocido",
    };
  } catch {
    return { ip: "no disponible", region: "no disponible", country: "no disponible" };
  }
}

async function sendDiscordRequest(
  requestToken: string,
  ip: string,
  region: string,
  country: string
): Promise<boolean> {
  const approveUrl = `${SUPABASE_FUNCTION_URL}?token=${requestToken}&decision=approve`;
  const rejectUrl = `${SUPABASE_FUNCTION_URL}?token=${requestToken}&decision=reject`;

  const payload = {
    username: "🍮 Sammy Room Guard",
    avatar_url: "https://cdn.discordapp.com/embed/avatars/0.png",
    embeds: [
      {
        title: "🔐 Solicitud de acceso Admin",
        description: "Alguien quiere entrar al **modo admin** de tu página. ¿Lo apruebas?",
        color: 0xf9c76e,
        fields: [
          { name: "🌐 IP Pública", value: `\`${ip}\``, inline: true },
          { name: "📍 Región", value: `${region}, ${country}`, inline: true },
          { name: "🕐 Hora", value: new Date().toLocaleString("es-VE", { timeZone: "America/Caracas" }), inline: false },
          { name: "✅ Aprobar", value: `[Haz clic aquí para aprobar](${approveUrl})`, inline: true },
          { name: "❌ Rechazar", value: `[Haz clic aquí para rechazar](${rejectUrl})`, inline: true },
        ],
        footer: { text: "Sammy Room · Sistema de verificación 2FA" },
        thumbnail: { url: "https://sanrio.com/cdn/shop/files/pompompurin-hero.png" },
      },
    ],
  };

  try {
    const res = await fetch(DISCORD_WEBHOOK, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    return res.ok;
  } catch {
    return false;
  }
}

async function persistAuthRequest(token: string, ip: string, region: string): Promise<boolean> {
  try {
    const { supabase } = await import("@/lib/supabase");
    const { encrypt } = await import("@/lib/encryption");
    const { error } = await supabase.from("admin_auth_requests").insert({
      token,
      status: "pending",
      ip_address: encrypt(ip),
      region: encrypt(region),
    });
    return !error;
  } catch {
    return true;
  }
}

async function pollAuthStatus(token: string): Promise<"pending" | "approved" | "rejected" | "error"> {
  try {
    const { supabase } = await import("@/lib/supabase");
    const { data, error } = await supabase
      .from("admin_auth_requests")
      .select("status")
      .eq("token", token)
      .single();
    if (error || !data) return "error";
    return (data.status as "pending" | "approved" | "rejected") ?? "error";
  } catch {
    return "error";
  }
}

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminState, setAdminState] = useState<AdminState>("idle");
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const tokenRef = useRef<string>("");

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

  const login = useCallback(async (pw: string): Promise<{ ok: boolean; message: string }> => {
    if (pw !== FIRST_FACTOR_PASSWORD) {
      return { ok: false, message: "clave incorrecta ♡" };
    }

    setAdminState("awaiting_2fa");

    const { ip, region, country } = await getClientInfo();
    const token = crypto.randomUUID();
    tokenRef.current = token;

    await persistAuthRequest(token, ip, region);

    const discordOk = await sendDiscordRequest(token, ip, region, country);

    if (!discordOk) {
      setAdminState("idle");
      return { ok: false, message: "error enviando verificación ♡ intenta de nuevo" };
    }

    let elapsed = 0;
    const MAX_WAIT = 180_000;
    const POLL_INTERVAL = 3_000;

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
        try { localStorage.setItem(STORAGE_KEY, "1"); } catch {}
      } else if (status === "rejected") {
        stopPolling();
        setAdminState("idle");
      }
    }, POLL_INTERVAL);

    return { ok: true, message: "verificando con Discord... espera la notificación ♡" };
  }, [stopPolling]);

  const logout = useCallback(() => {
    stopPolling();
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
    setIsAdmin(false);
    setAdminState("idle");
    tokenRef.current = "";
  }, [stopPolling]);

  const value = useMemo(
    () => ({ isAdmin, adminState, login, logout }),
    [isAdmin, adminState, login, logout]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAdmin() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAdmin must be used inside AdminProvider");
  return v;
}