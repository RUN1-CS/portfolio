import { scramble, $, reduce } from "./utils.js";

/* ---- boot sequence (the one big moment) ---- */
const lines = [
  "> jacking in…",
  '> bypassing ICE ......... <span class="ok">ok</span>',
  '> decrypting profile ..... <span class="ok">ok</span>',
  "> link established",
];
const boot = $("#boot"),
  log = $("#bootlog");

export function runBoot() {
  if (reduce) {
    boot.classList.add("done");
    start();
    return;
  }
  let i = 0;
  (function next() {
    if (i < lines.length) {
      log.innerHTML += lines[i++] + "\n";
      setTimeout(next, 380);
    } else
      setTimeout(() => {
        boot.classList.add("done");
        start();
      }, 450);
  })();
}

function start() {
  const n = $("#name");
  scramble(n, n.dataset.t, 1000);
  typeRoles();
  setInterval(() => {
    n.classList.add("glitch");
    setTimeout(() => n.classList.remove("glitch"), 360);
  }, 5200);
}

/* ---- typed roles ---- */
const roles = [
  "Software Engineer",
  "Systems Engineer",
  "Backend Developer",
  "Systems Programmer",
  "Software Architect",
  "DevOps Engineer",
  "AI Systems Developer",
  "Full-Stack Developer",
];
function typeRoles() {
  const el = $("#role");
  let r = 0,
    c = 0,
    del = false;
  if (reduce) {
    el.textContent = roles[0];
    return;
  }
  (function tick() {
    const w = roles[r];
    el.textContent = w.slice(0, c);
    if (!del && c === w.length) {
      del = true;
      return setTimeout(tick, 1600);
    }
    if (del && c === 0) {
      del = false;
      r = (r + 1) % roles.length;
    }
    c += del ? -1 : 1;
    setTimeout(tick, del ? 28 : 65);
  })();
}
