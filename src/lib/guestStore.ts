import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";

const LOCAL_KEY = "sammy.guest.v1";

export type GuestMsg = {
  id: string;
  name: string;
  text: string;
  at: string;
  likes: number;
  likedByMe?: boolean;
  reply?: string;
};

function today() {
  return new Date().toISOString().slice(0, 10).replace(/-/g, "/");
}

const SEED: GuestMsg[] = [
  { id: "g1", name: "gyaruko", at: "2025/06/15", text: "tu room es lo mas tierno ♡ ♡ ♡", likes: 4 },
  { id: "g2", name: "pom_fan", at: "2025/06/17", text: "pudin gang forever 🍮🍮", likes: 8 },
  { id: "g3", name: "anon",    at: "2025/06/19", text: "(｡•̀ᴗ-)✧ saludos desde mi pc", likes: 2 },
];

// ---------- Supabase helpers ----------

async function fetchFromSupabase(): Promise<GuestMsg[] | null> {
  try {
    const { data, error } = await supabase
      .from("guestbook_messages")
      .select("*")
      .order("created_at", { ascending: false });
    if (error || !data) return null;

    const { decrypt } = await import("@/lib/encryption");
    return data.map((row: any) => ({
      id: row.id,
      name: decrypt(row.name ?? ""),
      text: decrypt(row.text ?? ""),
      at: row.at,
      likes: row.likes ?? 0,
      reply: row.reply ? decrypt(row.reply) : undefined,
      likedByMe: false,
    }));
  } catch {
    return null;
  }
}

async function insertToSupabase(name: string, text: string, at: string): Promise<string | null> {
  try {
    const { encrypt } = await import("@/lib/encryption");
    const { data, error } = await supabase
      .from("guestbook_messages")
      .insert({ name: encrypt(name), text: encrypt(text), at, likes: 0 })
      .select("id")
      .single();
    if (error || !data) return null;
    return data.id;
  } catch {
    return null;
  }
}

async function removeFromSupabase(id: string): Promise<void> {
  try {
    await supabase.from("guestbook_messages").delete().eq("id", id);
  } catch {}
}

async function updateLikesInSupabase(id: string, likes: number): Promise<void> {
  try {
    await supabase.from("guestbook_messages").update({ likes }).eq("id", id);
  } catch {}
}

async function saveReplyToSupabase(id: string, reply: string): Promise<void> {
  try {
    const { encrypt } = await import("@/lib/encryption");
    await supabase.from("guestbook_messages").update({ reply: encrypt(reply) }).eq("id", id);
  } catch {}
}

// ---------- LocalStorage fallback ----------

function readLocal(): GuestMsg[] {
  if (typeof window === "undefined") return SEED;
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    if (!raw) return SEED;
    return JSON.parse(raw) as GuestMsg[];
  } catch {
    return SEED;
  }
}

function writeLocal(items: GuestMsg[]) {
  try { localStorage.setItem(LOCAL_KEY, JSON.stringify(items)); } catch {}
  window.dispatchEvent(new CustomEvent("sammy:guest"));
}

// ---------- Hook ----------

export function useGuest() {
  const [items, setItems] = useState<GuestMsg[]>([]);
  const [useSupabase, setUseSupabase] = useState(false);

  const load = useCallback(async () => {
    const remoteItems = await fetchFromSupabase();
    if (remoteItems !== null) {
      setItems(remoteItems);
      setUseSupabase(true);
    } else {
      // Supabase not configured yet — use localStorage
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

    async add(name: string, text: string) {
      const at = today();
      if (useSupabase) {
        const id = await insertToSupabase(name, text, at);
        if (id) {
          const newMsg: GuestMsg = { id, name, text, at, likes: 0 };
          setItems((prev) => [newMsg, ...prev]);
          return;
        }
      }
      // Fallback to local
      const m: GuestMsg = { id: crypto.randomUUID(), name, text, at, likes: 0 };
      writeLocal([m, ...readLocal()]);
    },

    async remove(id: string) {
      if (useSupabase) {
        await removeFromSupabase(id);
        setItems((prev) => prev.filter((x) => x.id !== id));
      } else {
        writeLocal(readLocal().filter((x) => x.id !== id));
      }
    },

    async toggleLike(id: string) {
      setItems((prev) => {
        const updated = prev.map((x) =>
          x.id === id
            ? { ...x, likedByMe: !x.likedByMe, likes: x.likes + (x.likedByMe ? -1 : 1) }
            : x
        );
        if (useSupabase) {
          const target = updated.find((x) => x.id === id);
          if (target) updateLikesInSupabase(id, target.likes);
        } else {
          writeLocal(updated);
        }
        return updated;
      });
    },

    async reply(id: string, reply: string) {
      if (useSupabase) {
        await saveReplyToSupabase(id, reply);
        setItems((prev) => prev.map((x) => (x.id === id ? { ...x, reply } : x)));
      } else {
        writeLocal(readLocal().map((x) => (x.id === id ? { ...x, reply } : x)));
      }
    },
  };
}