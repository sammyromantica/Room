import { useEffect, useRef, useState } from "react";
import song from "@/assets/pom-pom-beat.ogg";

const KEY = "sammy.music.on";

export function MusicPlayer() {
  const ref = useRef<HTMLAudioElement | null>(null);
  const [on, setOn] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const want = localStorage.getItem(KEY);
      if (want === "1") setOn(true);
    } catch {}
  }, []);

  useEffect(() => {
    const a = ref.current;
    if (!a) return;
    a.volume = 0.5;
    if (on) {
      a.play().then(() => setReady(true)).catch(() => setReady(false));
    } else {
      a.pause();
    }
    try { localStorage.setItem(KEY, on ? "1" : "0"); } catch {}
  }, [on]);

  return (
    <div className="fixed bottom-3 left-3 z-[10000] flex items-center gap-2">
      <audio ref={ref} src={song} loop preload="none" />
      <button
        onClick={() => setOn((v) => !v)}
        className="flex items-center gap-2 border-2 border-beret bg-butter px-3 py-1.5 font-silk text-[10px] text-beret shadow-[3px_3px_0_var(--beret)] transition hover:translate-x-[1px] hover:translate-y-[1px]"
        aria-label={on ? "mute music" : "play music"}
        title={on ? "click to mute" : "click for music ♡"}
      >
        <span className="text-[14px]">{on ? "🔊" : "🔇"}</span>
        <span>{on ? "♫ pom pom beat" : "music: off"}</span>
        {on && ready && (
          <span className="flex items-end gap-[2px]">
            <span className="inline-block h-2 w-[2px] animate-eq bg-beret" />
            <span className="inline-block h-3 w-[2px] animate-eq bg-beret" style={{ animationDelay: "0.15s" }} />
            <span className="inline-block h-2 w-[2px] animate-eq bg-beret" style={{ animationDelay: "0.3s" }} />
          </span>
        )}
      </button>
    </div>
  );
}