import { useState } from "react";
import { useAdmin } from "@/lib/admin";
import { useSettings } from "@/lib/siteSettings";
import pompompurin from "@/assets/pompompurin.gif";
import { kawaiiAudio } from "@/lib/kawaiiAudio";

export function AdminBubble() {
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

  async function handleSubmit(e: React.FormEvent) {
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
      // Awaiting 2FA — show waiting message, keep dialog open
      setErr(result.message);
      setLoading(false);
    }
  }

  // Auto-close dialog when approved
  if (isAdmin && open) setOpen(false);

  return (
    <>
      {/* hidden pompompurin trigger */}
      <button
        onClick={handleOpen}
        title="?"
        aria-label="secret"
        className="fixed bottom-2 right-2 z-[10000] h-8 w-8 opacity-40 transition hover:opacity-100 hover:scale-110"
      >
        <img src={pompompurin} alt="" className="h-full w-full" />
      </button>

      {isAdmin && (
        <div className="fixed top-2 right-2 z-[10000] flex items-center gap-2 border-2 border-beret bg-strawberry px-2 py-1 font-silk text-[10px] text-white shadow-[3px_3px_0_var(--beret)]">
          <span>♥ ADMIN MODE</span>
          <button
            onClick={() => {
              kawaiiAudio.play("pop");
              if (confirm("¿restablecer todos los textos/orden por defecto?")) reset();
            }}
            className="border border-white px-1 hover:bg-white hover:text-strawberry"
            title="reset textos"
          >↺</button>
          <button
            onClick={() => { kawaiiAudio.play("blip"); logout(); }}
            className="border border-white px-1 hover:bg-white hover:text-strawberry"
          >salir</button>
        </div>
      )}

      {open && (
        <div
          className="fixed inset-0 z-[10002] flex items-center justify-center bg-beret/40 p-4"
          onClick={() => { kawaiiAudio.play("blip"); setOpen(false); }}
        >
          <div
            className="w-full max-w-xs border-2 border-beret bg-cream shadow-[6px_6px_0_var(--beret)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between bg-[#000080] px-2 py-1 font-silk text-[10px] text-white">
              <span>🔒 admin login</span>
              <button
                onClick={() => { kawaiiAudio.play("blip"); setOpen(false); }}
                className="inline-flex h-4 w-5 items-center justify-center border-2 border-r-beret border-b-beret border-t-cream border-l-cream bg-butter text-[8px] text-beret"
              >✕</button>
            </div>
            <form className="space-y-3 p-4" onSubmit={handleSubmit}>
              <div className="flex items-center justify-center">
                <img
                  src={pompompurin}
                  alt=""
                  className={`h-16 w-16 ${adminState === "awaiting_2fa" ? "animate-spin-slow" : "animate-floaty"}`}
                />
              </div>

              {adminState === "awaiting_2fa" ? (
                <div className="text-center space-y-2">
                  <p className="font-silk text-[9px] text-beret">♡ verificando en Discord...</p>
                  <p className="font-dot text-[12px] text-cocoa">Revisa la notificación del bot y aprueba el acceso desde allí.</p>
                  <div className="flex justify-center gap-[3px] pt-1">
                    <span className="inline-block h-2 w-[3px] animate-eq bg-beret" />
                    <span className="inline-block h-3 w-[3px] animate-eq bg-beret" style={{ animationDelay: "0.15s" }} />
                    <span className="inline-block h-2 w-[3px] animate-eq bg-beret" style={{ animationDelay: "0.3s" }} />
                  </div>
                </div>
              ) : (
                <label className="block font-silk text-[10px] text-beret">
                  clave secreta:
                  <input
                    type="password"
                    value={pw}
                    onChange={(e) => setPw(e.target.value)}
                    autoFocus
                    disabled={loading}
                    className="mt-1 block w-full border-2 border-t-beret border-l-beret border-r-cream border-b-cream bg-white px-2 py-1 font-dot text-[14px] text-beret outline-none disabled:opacity-50"
                  />
                </label>
              )}

              {err && (
                <p className={`font-silk text-[10px] ${err.includes("verificando") ? "text-beret" : "text-strawberry"}`}>
                  {err}
                </p>
              )}

              {adminState !== "awaiting_2fa" && (
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => { kawaiiAudio.play("blip"); setOpen(false); }}
                    className="win-btn"
                  >Cancel</button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="win-btn disabled:opacity-50"
                    onClick={() => { if (!loading) kawaiiAudio.play("pop"); }}
                  >♥ entrar</button>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
}