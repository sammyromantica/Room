import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

const KEY = "sammy.site.v1";

export type NavId = "home" | "diary" | "guest" | "links" | "bio";

export type SiteSettings = {
  siteTitle: string;
  welcomeLine: string;
  welcomeSub: string;
  navOrder: NavId[];
  navLabels: Record<NavId, string>;
  bioAbout: string;
  bioMeetYes: string;
  bioMeetNo: string;
};

const DEFAULTS: SiteSettings = {
  siteTitle: "Sammy Room",
  welcomeLine: "✿ welcome to ✿",
  welcomeSub: "⋆｡˚ ☁︎ a pudding-soft corner ☁︎ ˚｡⋆",
  navOrder: ["home", "bio", "diary", "guest", "links"],
  navLabels: {
    home: "HOME",
    bio: "BIO",
    diary: "DIARY",
    guest: "GUESTBOOK",
    links: "LINKS",
  },
  bioAbout:
    "Hi, I'm Sammy. I'm from Venezuela and I'm fifteen years old. I like yellow, coral and pink and I really REALLY like Pompompurin, it's my favorite character!! ♡",
  bioMeetYes:
    "People who match my interest.\nSkullgirls, Pony Town and Brawl Stars players!\nPeople who speak Spanish.\nPompompurin, Panty and Stocking, Eltingville Club and Pusheen fans!",
  bioMeetNo:
    "Proshippers, darkshippers, compshippers.\n-13 and +20.\nPpl normalizing SH, SA, eating disorders, harrassing, gore, etc.\nHomophobic, transphobic, racist, zoophiles, classist. In general weird ppl…",
};

type Ctx = {
  s: SiteSettings;
  set: (patch: Partial<SiteSettings>) => void;
  reset: () => void;
};

const SettingsCtx = createContext<Ctx | null>(null);

function read(): SiteSettings {
  if (typeof window === "undefined") return DEFAULTS;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return DEFAULTS;
    return { ...DEFAULTS, ...JSON.parse(raw) };
  } catch { return DEFAULTS; }
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [s, setS] = useState<SiteSettings>(DEFAULTS);
  useEffect(() => { setS(read()); }, []);

  const set = useCallback((patch: Partial<SiteSettings>) => {
    setS((prev) => {
      const next = { ...prev, ...patch };
      try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);
  const reset = useCallback(() => {
    try { localStorage.removeItem(KEY); } catch {}
    setS(DEFAULTS);
  }, []);

  const value = useMemo(() => ({ s, set, reset }), [s, set, reset]);
  return <SettingsCtx.Provider value={value}>{children}</SettingsCtx.Provider>;
}

export function useSettings() {
  const v = useContext(SettingsCtx);
  if (!v) throw new Error("useSettings must be used inside SettingsProvider");
  return v;
}