import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";

const LOCAL_KEY = "sammy.diary.v1";

export type DiaryComment = {
  id: string;
  name: string;
  text: string;
  at: string;
  fromAdmin?: boolean;
  reply?: string;
};

export type DiaryPost = {
  id: string;
  title?: string;
  description?: string;
  links?: { label: string; url: string }[];
  images: string[];
  at: string;
  likes: number;
  likedByMe?: boolean;
  comments: DiaryComment[];
};

function todayISO() {
  return new Date().toISOString().slice(0, 10).replace(/-/g, "/");
}

const SEED: DiaryPost[] = [
  {
    id: "seed-1",
    title: "primer post ♡",
    description: "hola hola, soy sammy y este es mi rinconcito. aqui voy a postear todo lo que se me ocurra ✿ pudin gang 4ever 🍮",
    images: [],
    links: [{ label: "instagram", url: "https://instagram.com/sammyromantica" }],
    at: todayISO(),
    likes: 7,
    comments: [{ id: "c1", name: "anon", text: "te amo sammy ♡", at: todayISO() }],
  },
];

// ---------- Supabase helpers ----------

async function fetchPostsFromSupabase(): Promise<DiaryPost[] | null> {
  try {
    const { decrypt } = await import("@/lib/encryption");
    const { data: posts, error } = await supabase
      .from("diary_posts")
      .select("*")
      .order("created_at", { ascending: false });
    if (error || !posts) return null;

    const { data: comments } = await supabase
      .from("diary_comments")
      .select("*")
      .order("created_at", { ascending: true });

    return posts.map((p: any) => ({
      id: p.id,
      title: p.title ? decrypt(p.title) : undefined,
      description: p.description ? decrypt(p.description) : undefined,
      images: p.images ?? [],
      links: p.links ? JSON.parse(decrypt(p.links)) : undefined,
      at: p.at,
      likes: p.likes ?? 0,
      likedByMe: false,
      comments: (comments ?? [])
        .filter((c: any) => c.post_id === p.id)
        .map((c: any) => ({
          id: c.id,
          name: decrypt(c.name ?? ""),
          text: decrypt(c.text ?? ""),
          at: c.at,
          fromAdmin: c.from_admin ?? false,
          reply: c.reply ? decrypt(c.reply) : undefined,
        })),
    }));
  } catch {
    return null;
  }
}

// ---------- LocalStorage fallback ----------

function readLocal(): DiaryPost[] {
  if (typeof window === "undefined") return SEED;
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    if (!raw) return SEED;
    return JSON.parse(raw) as DiaryPost[];
  } catch {
    return SEED;
  }
}

function writeLocal(posts: DiaryPost[]) {
  try { localStorage.setItem(LOCAL_KEY, JSON.stringify(posts)); } catch {}
  window.dispatchEvent(new CustomEvent("sammy:diary"));
}

// ---------- Hook ----------

export function useDiary() {
  const [posts, setPosts] = useState<DiaryPost[]>([]);
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
    const onLocal = () => { if (!useDb) setPosts(readLocal()); };
    window.addEventListener("sammy:diary", onLocal);
    window.addEventListener("storage", onLocal);
    return () => {
      window.removeEventListener("sammy:diary", onLocal);
      window.removeEventListener("storage", onLocal);
    };
  }, [load, useDb]);

  return {
    posts,

    async addPost(p: Omit<DiaryPost, "id" | "at" | "likes" | "comments">) {
      const at = todayISO();
      if (useDb) {
        const { encrypt } = await import("@/lib/encryption");
        const { data, error } = await supabase
          .from("diary_posts")
          .insert({
            title: p.title ? encrypt(p.title) : null,
            description: p.description ? encrypt(p.description) : null,
            images: p.images,
            links: p.links ? encrypt(JSON.stringify(p.links)) : null,
            at,
            likes: 0,
          })
          .select("id")
          .single();
        if (!error && data) {
          await load();
          return;
        }
      }
      const newPost: DiaryPost = { ...p, id: crypto.randomUUID(), at, likes: 0, comments: [] };
      writeLocal([newPost, ...readLocal()]);
    },

    async updatePost(id: string, patch: Partial<DiaryPost>) {
      if (useDb) {
        const { encrypt } = await import("@/lib/encryption");
        const updateObj: any = {};
        if (patch.title !== undefined) updateObj.title = patch.title ? encrypt(patch.title) : null;
        if (patch.description !== undefined) updateObj.description = patch.description ? encrypt(patch.description) : null;
        await supabase.from("diary_posts").update(updateObj).eq("id", id);
        setPosts((prev) => prev.map((x) => (x.id === id ? { ...x, ...patch } : x)));
      } else {
        writeLocal(readLocal().map((x) => (x.id === id ? { ...x, ...patch } : x)));
      }
    },

    async deletePost(id: string) {
      if (useDb) {
        await supabase.from("diary_posts").delete().eq("id", id);
        setPosts((prev) => prev.filter((x) => x.id !== id));
      } else {
        writeLocal(readLocal().filter((x) => x.id !== id));
      }
    },

    async toggleLike(id: string) {
      setPosts((prev) => {
        const updated = prev.map((x) =>
          x.id === id
            ? { ...x, likedByMe: !x.likedByMe, likes: x.likes + (x.likedByMe ? -1 : 1) }
            : x
        );
        if (useDb) {
          const target = updated.find((x) => x.id === id);
          if (target) supabase.from("diary_posts").update({ likes: target.likes }).eq("id", id);
        } else {
          writeLocal(updated);
        }
        return updated;
      });
    },

    async addComment(postId: string, name: string, text: string, fromAdmin = false) {
      const at = todayISO();
      if (useDb) {
        const { encrypt } = await import("@/lib/encryption");
        const { data, error } = await supabase
          .from("diary_comments")
          .insert({ post_id: postId, name: encrypt(name), text: encrypt(text), at, from_admin: fromAdmin })
          .select("id")
          .single();
        if (!error && data) {
          const newComment: DiaryComment = { id: data.id, name, text, at, fromAdmin };
          setPosts((prev) =>
            prev.map((p) => p.id === postId ? { ...p, comments: [...p.comments, newComment] } : p)
          );
          return;
        }
      }
      writeLocal(
        readLocal().map((p) =>
          p.id === postId
            ? { ...p, comments: [...p.comments, { id: crypto.randomUUID(), name, text, at, fromAdmin }] }
            : p
        )
      );
    },

    async replyComment(postId: string, commentId: string, reply: string) {
      if (useDb) {
        const { encrypt } = await import("@/lib/encryption");
        await supabase.from("diary_comments").update({ reply: encrypt(reply) }).eq("id", commentId);
        setPosts((prev) =>
          prev.map((p) =>
            p.id === postId
              ? { ...p, comments: p.comments.map((c) => (c.id === commentId ? { ...c, reply } : c)) }
              : p
          )
        );
      } else {
        writeLocal(
          readLocal().map((p) =>
            p.id === postId
              ? { ...p, comments: p.comments.map((c) => (c.id === commentId ? { ...c, reply } : c)) }
              : p
          )
        );
      }
    },

    async deleteComment(postId: string, commentId: string) {
      if (useDb) {
        await supabase.from("diary_comments").delete().eq("id", commentId);
        setPosts((prev) =>
          prev.map((p) =>
            p.id === postId ? { ...p, comments: p.comments.filter((c) => c.id !== commentId) } : p
          )
        );
      } else {
        writeLocal(
          readLocal().map((p) =>
            p.id === postId
              ? { ...p, comments: p.comments.filter((c) => c.id !== commentId) }
              : p
          )
        );
      }
    },
  };
}