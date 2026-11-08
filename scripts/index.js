import { runBoot } from "./boot.js";
import { scramble, $, reduce } from "./utils.js";

/* ---- reveal + skill bars ---- */
const io = new IntersectionObserver(
  (es) =>
    es.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("in");
      e.target
        .querySelectorAll(".fill")
        .forEach((f) => (f.style.width = f.dataset.v + "%"));
      io.unobserve(e.target);
    }),
  { threshold: 0.25 },
);
document.querySelectorAll(".rv").forEach((el) => io.observe(el));

/* ---- code rain background ---- */
const cv = $("#rain"),
  cx = cv.getContext("2d");
let cols, drops;
function size() {
  cv.width = innerWidth;
  cv.height = innerHeight;
  cols = Math.floor(cv.width / 18);
  drops = Array.from({ length: cols }, () => Math.random() * -50);
}
size();
addEventListener("resize", size);
(function rain() {
  cx.fillStyle = "rgba(6,7,14,.12)";
  cx.fillRect(0, 0, cv.width, cv.height);
  cx.font = "14px monospace";
  drops.forEach((y, i) => {
    cx.fillStyle = Math.random() > 0.97 ? "#ff2e88" : "#5ef2ff";
    cx.fillText(
      String.fromCharCode(0x30a0 + Math.random() * 96),
      i * 18,
      y * 18,
    );
    drops[i] = y * 18 > cv.height && Math.random() > 0.975 ? 0 : y + 0.5;
  });
  if (!reduce) setTimeout(() => requestAnimationFrame(rain), 50);
})();

/* ---- contact terminal ---- */
const cmds = {
  help: "commands: whoami, email, clear",
  whoami:
    "C and Linux nerd, hopefully making the world better. Glory to Linux.",
  email: "REDACTED@REDACTED.REDACTED",
};
$("#cmd").addEventListener("keydown", (e) => {
  if (e.key !== "Enter") return;
  const v = e.target.value.trim().toLowerCase();
  e.target.value = "";
  const o = $("#out");
  o.classList.toggle("redacted", v === "email");
  if (v === "clear") return (o.textContent = "");
  const r = cmds[v] || `unknown command: ${v || "(empty)"}. try help`;
  o.textContent = "";
  scramble(o, r, 500);
});

runBoot();
