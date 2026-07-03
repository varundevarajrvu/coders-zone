/* Blueprint grid (light) crossfading to twinkling starfield (dark) —
   positions transcribed from the design prototype. */

const STARS: [number, number, number, number, number, string?][] = [
  [2, 12, 2, 3.2, 0],
  [4, 64, 2, 4.1, 0.6],
  [1.5, 84, 3, 2.7, 1.1, "0 0 6px rgba(255,255,255,.8)"],
  [7, 38, 1.5, 3.8, 0.3],
  [9, 5, 2, 4.6, 1.8],
  [11, 92, 2, 3.4, 0.9],
  [14, 52, 1.5, 3.1, 0.5],
  [17, 22, 2, 5, 2.2],
  [20, 74, 2.5, 4.3, 0.2, "0 0 5px rgba(255,255,255,.7)"],
  [24, 9, 1.5, 3.6, 2.6],
  [27, 60, 2, 4.8, 1],
  [31, 88, 2, 3, 1.4],
  [34, 34, 1.5, 4, 1.6],
  [38, 70, 2, 3.9, 2],
  [42, 16, 2.5, 3.3, 0.7, "0 0 5px rgba(255,255,255,.6)"],
  [46, 94, 1.5, 4.4, 1.9],
  [50, 48, 2, 3.7, 0.4],
  [54, 6, 2, 4.2, 2.4],
  [58, 80, 1.5, 3.5, 1.2],
  [62, 28, 2, 4.7, 0.8],
  [66, 66, 2.5, 3.2, 2.1, "0 0 5px rgba(255,255,255,.6)"],
  [70, 10, 1.5, 4.5, 1.5],
  [74, 90, 2, 3.8, 0.1],
  [79, 42, 2, 4.1, 2.7],
  [83, 76, 1.5, 3.4, 1.7],
  [87, 20, 2, 4.9, 0.9],
  [91, 56, 2.5, 3.6, 2.3, "0 0 5px rgba(255,255,255,.6)"],
  [95, 86, 2, 4.3, 1.3],
  [97, 32, 1.5, 3.9, 0.6],
];

export function CzBackdrop() {
  return (
    <>
      <div className="cz-bg-grid" />
      <div className="cz-bg-stars">
        <div className="cz-nebula" style={{ top: "-6%", left: "30%", width: "44%", height: "10%", background: "radial-gradient(ellipse, rgba(255,255,255,.05), transparent 70%)" }} />
        <div className="cz-nebula" style={{ top: "38%", left: "-10%", width: "38%", height: "8%", background: "radial-gradient(ellipse, rgba(255,255,255,.035), transparent 70%)" }} />
        <div className="cz-nebula" style={{ top: "78%", right: "-8%", width: "36%", height: "8%", background: "radial-gradient(ellipse, rgba(255,255,255,.04), transparent 70%)" }} />
        {STARS.map(([top, left, size, dur, delay, glow], i) => (
          <span
            key={i}
            className="cz-star"
            style={{
              top: `${top}%`,
              left: `${left}%`,
              width: size,
              height: size,
              boxShadow: glow,
              animation: `czTwinkle ${dur}s ease-in-out ${delay}s infinite`,
            }}
          />
        ))}
      </div>
    </>
  );
}
