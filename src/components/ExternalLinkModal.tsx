import { createContext, useCallback, useContext, useState, type ReactNode } from "react";

type Ctx = { confirm: (url: string) => void };
const C = createContext<Ctx | null>(null);

export function ExternalLinkProvider({ children }: { children: ReactNode }) {
  const [target, setTarget] = useState<string | null>(null);

  const confirm = useCallback((url: string) => setTarget(url), []);

  return (
    <C.Provider value={{ confirm }}>
      {children}
      {target && (
        <div className="fixed inset-0 z-[10001] flex items-center justify-center bg-beret/40 p-4">
          <div className="w-full max-w-sm border-2 border-beret bg-cream shadow-[6px_6px_0_var(--beret)]">
            <div className="flex items-center justify-between bg-[#000080] px-2 py-1 font-silk text-[10px] text-white">
              <span className="flex items-center gap-1">
                <span className="inline-block h-3 w-3 border border-white bg-yellow-300" />
                Sammy Room — External Link
              </span>
              <button
                onClick={() => setTarget(null)}
                className="inline-flex h-4 w-5 items-center justify-center border-2 border-r-beret border-b-beret border-t-cream border-l-cream bg-butter text-[8px] text-beret"
                aria-label="close"
              >✕</button>
            </div>
            <div className="flex gap-3 p-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center border-2 border-beret bg-butter text-[26px]">⚠</div>
              <div className="flex-1 space-y-2 font-dot text-[14px] text-beret">
                <p className="font-silk text-[11px]">¡cuidado! ♡</p>
                <p>
                  Estás a punto de salir de <b>sammy room</b> e ir a un sitio
                  externo:
                </p>
                <p className="break-all border-2 border-t-beret border-l-beret border-r-cream border-b-cream bg-white px-2 py-1 font-silk text-[10px]">
                  {target}
                </p>
                <p className="text-[12px] opacity-80">¿continuar?</p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 border-t-2 border-beret bg-butter px-3 py-2">
              <button onClick={() => setTarget(null)} className="win-btn">Cancel</button>
              <button
                onClick={() => {
                  const t = target;
                  setTarget(null);
                  if (t) window.open(t, "_blank", "noopener,noreferrer");
                }}
                className="win-btn"
              >
                ♡ OK
              </button>
            </div>
          </div>
        </div>
      )}
    </C.Provider>
  );
}

export function useExternalLink() {
  const v = useContext(C);
  if (!v) throw new Error("useExternalLink must be inside provider");
  return v;
}

export function ExtLink({
  href,
  className,
  children,
}: { href: string; className?: string; children: ReactNode }) {
  const { confirm } = useExternalLink();
  return (
    <a
      href={href}
      onClick={(e) => { e.preventDefault(); confirm(href); }}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}