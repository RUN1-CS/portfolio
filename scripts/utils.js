export const $ = (s) => document.querySelector(s);
export const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---- text scramble ---- */
export function scramble(el, text, ms = 900) {
  if (reduce) {
    el.textContent = text;
    return;
  }
  const chars = "!<>-_\\/[]{}=+*^?#01",
    t0 = performance.now();
  (function f(now) {
    const p = Math.min((now - t0) / ms, 1),
      n = Math.floor(p * text.length);
    el.textContent = text
      .split("")
      .map((c, i) =>
        c === " " || i < n ? c : chars[(Math.random() * chars.length) | 0],
      )
      .join("");
    if (p < 1) requestAnimationFrame(f);
  })(t0);
}
