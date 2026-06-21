export function PixelHeart({
  size = 24,
  color = "var(--beret)",
  className = "",
}: {
  size?: number;
  color?: string;
  className?: string;
}) {
  // 8x7 pixel heart
  const px = size / 8;
  const grid = [
    "01100110",
    "11111111",
    "11111111",
    "11111111",
    "01111110",
    "00111100",
    "00011000",
  ];
  return (
    <svg
      width={size}
      height={(size / 8) * 7}
      viewBox={`0 0 ${size} ${(size / 8) * 7}`}
      className={className}
      shapeRendering="crispEdges"
      aria-hidden
    >
      {grid.map((row, y) =>
        row.split("").map((c, x) =>
          c === "1" ? (
            <rect key={`${x}-${y}`} x={x * px} y={y * px} width={px} height={px} fill={color} />
          ) : null
        )
      )}
    </svg>
  );
}
