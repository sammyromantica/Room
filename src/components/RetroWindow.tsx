import type { ReactNode } from "react";

export function RetroWindow({
  title = "Sammy Room",
  children,
  className = "",
}: {
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`retro-window w-full max-w-md ${className}`}>
      <div className="retro-titlebar flex items-center justify-between px-2 py-1.5 text-[10px]">
        <span className="flex items-center gap-1">
          <span className="inline-block h-3 w-3 bg-butter border border-cream" />
          {title}
        </span>
        <div className="flex gap-1">
          <span className="inline-flex h-4 w-5 items-center justify-center border-2 border-r-beret border-b-beret border-t-cream border-l-cream bg-butter text-beret font-pixel text-[8px]">_</span>
          <span className="inline-flex h-4 w-5 items-center justify-center border-2 border-r-beret border-b-beret border-t-cream border-l-cream bg-butter text-beret font-pixel text-[8px]">□</span>
          <span className="inline-flex h-4 w-5 items-center justify-center border-2 border-r-beret border-b-beret border-t-cream border-l-cream bg-butter text-beret font-pixel text-[8px]">✕</span>
        </div>
      </div>
      <div className="relative p-4">{children}</div>
      <div className="retro-titlebar flex items-center gap-2 px-2 py-1 text-[9px]">
        <span className="win-btn !py-0.5 !px-2 !text-[8px] !shadow-none">🍮 start</span>
        <span className="opacity-80 ml-auto">12:34 PM ♡</span>
      </div>
    </div>
  );
}
