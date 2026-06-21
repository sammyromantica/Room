import { useEffect, useRef, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import pompompurin from "@/assets/pompompurin.gif";

/**
 * Cute transition: pompompurin slides across the screen "dragging" the page.
 * Triggers on every pathname change.
 */
export function PageTransition() {
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

  return (
    <div className="pointer-events-none fixed inset-0 z-[9997] overflow-hidden">
      {/* yellow curtain sweeping in then out */}
      <div className="absolute inset-0 origin-left animate-curtain bg-butter" />
      <div
        className="absolute top-1/2 -translate-y-1/2 animate-pom-drag"
        aria-hidden
      >
        <img src={pompompurin} alt="" className="h-28 w-28 drop-shadow-[4px_4px_0_var(--beret)]" />
      </div>
      <div className="absolute inset-x-0 top-[55%] flex justify-center font-cherry text-[18px] text-beret opacity-0 animate-pom-text">
        ♡ loading ♡
      </div>
    </div>
  );
}