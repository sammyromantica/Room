export function Marquee({ items }: { items: string[] }) {
  // duplicate for seamless loop
  const loop = [...items, ...items];
  return (
    <div className="marquee">
      <div className="marquee__track text-[12px]">
        {loop.map((t, i) => (
          <span key={i} className="px-2">
            ♥ {t} ♥
          </span>
        ))}
      </div>
      <div className="marquee__track text-[12px]" aria-hidden>
        {loop.map((t, i) => (
          <span key={i} className="px-2">
            ♥ {t} ♥
          </span>
        ))}
      </div>
    </div>
  );
}
