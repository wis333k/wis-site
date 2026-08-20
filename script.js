/* =============================================================
   script.js — catwraith.com style: settings, themes, parallax,
   shooting stars, rain, mood, player, navigation panels
   ============================================================= */

"use strict";

/* -------------------------------------------------------------
   SITE_DATA — nội dung thật của mày, chỉnh ở đây
   ------------------------------------------------------------- */
const SITE_DATA = {
  name: "WIS",
  tagline: "xIn chAo. <b>Welcome to my first personal website!</b>",
  facts: [
    "i'm Vietnamese. this is my first personal website",
    "my main coding language is python",
    "i like taking photos, this is my album",
    "i want to be a professional cyber security",
    "i code websites, automation tools and bots",
  ],
  posts: [],
  projects: [
    { name: "ODownloader", desc: "download tool", url: "https://github.com/wis333k/otools-app" },
    { name: "Ostudio", desc: "studio tool", url: "https://github.com/wis333k/ai-studio-landing" },
  ],
  nav: [
    { label: "home", href: "#top", panel: "panel-home" },
    { label: "projects", href: "#projects", panel: "panel-projects" },
    { label: "album", href: "#album", panel: "panel-album" },
    { label: "links", href: "#links", panel: "panel-links" },
    { label: "contact", href: "#contact", panel: "panel-contact" },
  ],
  links: [
    { label: "github", url: "#" },
    { label: "bluesky", url: "#" },
    { label: "discord", url: "#" },
  ],
  email: { user: "wis", domain: "email" },
  socials: [
    { icon: "github", url: "#" },
    { icon: "bluesky", url: "#" },
    { icon: "discord", url: "#" },
  ],
  tracks: [
    { title: "i see your monsters", artist: "nightcore", src: "music/nightcore-i-see-your-monsters.mp3" },
  ],
  status: { text: "building something, probably.", time: "2 min ago" },
  // TODO: album ảnh của mày — thêm file ảnh vào, vd { src: "photo1.jpg", cap: "canh pho" }
  album: [],
};

const $ = (id) => document.getElementById(id);
const esc = (s) => String(s).replace(/[&<>"']/g,
  (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* -------------------------------------------------------------
   RENDER — populate DOM from SITE_DATA
   ------------------------------------------------------------- */
function renderAll() {
  const D = SITE_DATA;

  document.title = D.name;
  const titleEl = $("site-title");
  if (titleEl) titleEl.textContent = D.name;

  const wisWall = $("wis-wall");
  if (wisWall) {
    const h = new Date().getHours();
    let greeting;
    if (h < 6) greeting = "chao buoi sang som";
    else if (h < 12) greeting = "chao buoi sang";
    else if (h < 18) greeting = "chao buoi chieu";
    else greeting = "chao buoi toi";
    wisWall.textContent = greeting + ", user ...";
    fetch("https://racing-join-multi-actively.trycloudflare.com/api/visit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uid: localStorage.getItem("visitor_uid") || "" })
    }).then(function(r) { return r.json(); }).then(function(d) {
      if (!localStorage.getItem("visitor_uid")) localStorage.setItem("visitor_uid", "v_" + d.visitorNumber);
      wisWall.textContent = greeting + ", user " + d.visitorNumber;
    }).catch(function() {
      wisWall.textContent = greeting + ", user ?";
    });
  }

  // profile emoji
  const profileImg = $("profile-img");
  if (profileImg) profileImg.classList.add("has-img");

  // nav
  const navList = $("nav-list");
  if (navList) {
    navList.innerHTML = D.nav
      .map((n, i) => `<li><a href="${esc(n.href)}" data-panel="${esc(n.panel)}"><span class="num">${String(i + 1).padStart(2, "0")}</span>${esc(n.label)}</a></li>`)
      .join("");
    const home = navList.querySelector('[data-panel="panel-home"]');
    if (home) home.classList.add("is-active");
  }

  // intro + facts
  const intro = $("intro");
  if (intro) intro.innerHTML = D.tagline;
  const factsList = $("facts-list");
  if (factsList) factsList.innerHTML = D.facts.map((f) => `<li>${esc(f)}</li>`).join("");

  // blog
  const blogList = $("blog-list");
  if (blogList) {
    blogList.innerHTML = D.posts
      .map((p) => `<li><span style="opacity:.6;margin-right:8px">${esc(p.date)}</span><a href="${esc(p.url)}">${esc(p.title)}</a></li>`)
      .join("");
  }

  // projects
  const projectsList = $("projects-list");
  if (projectsList) {
    projectsList.innerHTML = D.projects
      .map((p) => `<div style="margin-bottom:12px;padding-bottom:12px;border-bottom:1px dotted var(--stroke)">
        <h3 style="color:var(--link-hover);font-size:1rem">${esc(p.name)}</h3>
        <p style="font-size:.85rem;opacity:.7;margin:2px 0">${esc(p.desc)}</p>
        <a href="${esc(p.url)}" target="_blank" rel="noopener noreferrer" style="font-size:.8rem">[source]</a>
      </div>`)
      .join("");
  }

  // links
  const linksList = $("links-list");
  if (linksList) {
    linksList.innerHTML = D.links
      .map((l) => `<a href="${esc(l.url)}" target="_blank" rel="noopener noreferrer" style="display:inline-block;padding:6px 14px;border:1px solid var(--stroke);border-radius:4px;font-size:.85rem">${esc(l.label)}</a>`)
      .join("");
  }

  // album
  const albumList = $("album-list");
  if (albumList && D.album && D.album.length) {
    albumList.innerHTML = D.album
      .map((a) => `<figure style="display:inline-block;margin:6px"><img src="${esc(a.src)}" alt="${esc(a.cap)}" style="width:140px;height:140px;object-fit:cover;border:2px solid var(--stroke)"><figcaption style="font-size:.7rem;margin-top:4px;color:var(--text)">${esc(a.cap)}</figcaption></figure>`)
      .join("");
  }

  // social
  const socialList = $("social-list");
  if (socialList) {
    socialList.innerHTML = D.socials
      .map((s) => `<a href="${esc(s.url)}" style="display:inline-block;padding:6px 14px;border:1px solid var(--stroke);border-radius:4px;font-size:.85rem;text-transform:uppercase">${esc(s.icon)}</a>`)
      .join("");
  }

  // contact
  const contactEmail = $("contact-email");
  if (contactEmail) {
    const { user, domain } = D.email;
    contactEmail.innerHTML = `Email: <button class="email-btn" id="email-btn" type="button" style="background:none;border:none;cursor:pointer;color:var(--link);font-family:inherit;font-size:inherit;text-decoration:underline dotted;text-underline-offset:3px">[${user} at ${domain.replace(/\./g, " dot ")}]</button>`;
    const emailBtn = $("email-btn");
    if (emailBtn) emailBtn.addEventListener("click", () => {
      window.location.href = "mai" + "lto:" + user + "@" + domain;
    });
  }

  // status
  const statusText = $("status-text");
  if (statusText) statusText.textContent = D.status.text;
  const statusTime = $("status-time");
  if (statusTime) statusTime.textContent = D.status.time;
}
renderAll();

/* -------------------------------------------------------------
   NAVIGATION — panel switching
   ------------------------------------------------------------- */
const Navigation = (() => {
  let currentPanel = "panel-home";
  let transitioning = false;

  function show(panelId) {
    if (transitioning || panelId === currentPanel) return;
    transitioning = true;
    const prev = $(currentPanel);
    const next = $(panelId);
    if (!prev || !next) { transitioning = false; return; }

    document.querySelectorAll(".nav a").forEach((a) =>
      a.classList.toggle("is-active", a.dataset.panel === panelId));

    const prevInner = prev.querySelector(".inner");
    if (prevInner) prevInner.classList.add("is-dim");

    setTimeout(() => {
      prev.classList.remove("is-open");
      prev.classList.add("is-closed");
      if (prevInner) prevInner.classList.remove("is-dim");

      next.classList.remove("is-closed");
      next.classList.add("is-open");
      next.scrollTop = 0;
      currentPanel = panelId;
      transitioning = false;
    }, parseInt(getComputedStyle(document.documentElement).getPropertyValue("--fade-ms")) || 250);
  }

  document.addEventListener("click", (e) => {
    const link = e.target.closest("[data-panel]");
    if (link) {
      e.preventDefault();
      show(link.dataset.panel);
      document.documentElement.classList.remove("menu-open");
    }
  });

  return { show };
})();

/* -------------------------------------------------------------
   THEME — dark / light / downtown
   ------------------------------------------------------------- */
const Theme = (() => {
  const themes = ["dark", "light", "downtown"];
  let idx = 0;

  function apply(t) {
    document.documentElement.setAttribute("data-theme", t);
    $("theme-current").textContent = t;
    try { localStorage.setItem("theme", t); } catch (e) {}
  }

  function next() { idx = (idx + 1) % themes.length; apply(themes[idx]); }
  function prev() { idx = (idx - 1 + themes.length) % themes.length; apply(themes[idx]); }

  // init
  const saved = localStorage.getItem("theme");
  if (saved && themes.includes(saved)) idx = themes.indexOf(saved);
  apply(themes[idx]);

  $("theme-next").addEventListener("click", next);
  $("theme-prev").addEventListener("click", prev);
})();

/* -------------------------------------------------------------
   SETTINGS PANEL
   ------------------------------------------------------------- */
const Settings = (() => {
  const btn = $("settings-btn");
  const panel = $("settings-panel");
  let open = false;

  function toggle() {
    open = !open;
    panel.classList.toggle("is-open", open);
  }

  btn.addEventListener("click", toggle);

  // font size
  let fontSize = parseInt(localStorage.getItem("fontSize") || "16", 10);
  function applyFont() {
    document.documentElement.style.fontSize = fontSize + "px";
    try { localStorage.setItem("fontSize", String(fontSize)); } catch (e) {}
  }
  $("font-small").addEventListener("click", () => { fontSize = Math.max(10, fontSize - 1); applyFont(); });
  $("font-big").addEventListener("click", () => { fontSize = Math.min(24, fontSize + 1); applyFont(); });
  $("font-reset").addEventListener("click", () => { fontSize = 16; applyFont(); });
  applyFont();

  // toggles
  $("toggle-motion").addEventListener("click", function () {
    const off = this.getAttribute("aria-pressed") === "true";
    this.setAttribute("aria-pressed", String(!off));
    this.textContent = off ? "off" : "on";
    document.documentElement.setAttribute("data-reduce-motion", String(off));
  });

  $("toggle-parallax").addEventListener("click", function () {
    const on = this.getAttribute("aria-pressed") === "true";
    this.setAttribute("aria-pressed", String(!on));
    this.textContent = on ? "off" : "on";
    const pl = $("parallax");
    if (pl) pl.style.display = on ? "none" : "";
  });

  $("toggle-effects").addEventListener("click", function () {
    const on = this.getAttribute("aria-pressed") === "true";
    this.setAttribute("aria-pressed", String(!on));
    this.textContent = on ? "off" : "on";
    const sc = $("shooting-stars-canvas");
    const rc = $("rain-canvas");
    if (sc) sc.style.display = on ? "none" : "";
    if (rc) rc.style.display = on ? "none" : "";
  });
})();

/* -------------------------------------------------------------
   MOBILE MENU
   ------------------------------------------------------------- */
const MobileMenu = (() => {
  $("menu-toggle").addEventListener("click", () => {
    document.documentElement.classList.toggle("menu-open");
  });
  $("menu-overlay").addEventListener("click", () => {
    document.documentElement.classList.remove("menu-open");
  });
})();

/* -------------------------------------------------------------
   SHOOTING STARS — canvas
   ------------------------------------------------------------- */
const ShootingStars = (() => {
  const canvas = $("shooting-stars-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let W, H, stars = [];

  function resize() { W = canvas.width = canvas.clientWidth; H = canvas.height = canvas.clientHeight; }

  function newStar() {
    return {
      x: Math.random() * W * 0.8,
      y: Math.random() * H * 0.4,
      len: 40 + Math.random() * 80,
      speed: 4 + Math.random() * 6,
      angle: Math.PI / 6 + Math.random() * 0.3,
      life: 0,
      maxLife: 30 + Math.random() * 40,
    };
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (let i = stars.length - 1; i >= 0; i--) {
      const s = stars[i];
      s.x += Math.cos(s.angle) * s.speed;
      s.y += Math.sin(s.angle) * s.speed;
      s.life++;
      const alpha = s.life < 10 ? s.life / 10 : s.life > s.maxLife - 10 ? (s.maxLife - s.life) / 10 : 1;
      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(s.x - Math.cos(s.angle) * s.len, s.y - Math.sin(s.angle) * s.len);
      ctx.strokeStyle = `rgba(255,255,255,${alpha * 0.8})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      if (s.life > s.maxLife || s.x > W + 50 || s.y > H + 50) stars.splice(i, 1);
    }
    if (Math.random() < 0.03 && stars.length < 5) stars.push(newStar());
    requestAnimationFrame(draw);
  }

  resize();
  addEventListener("resize", resize);
  draw();
})();

/* -------------------------------------------------------------
   RAIN — canvas
   ------------------------------------------------------------- */
const Rain = (() => {
  const canvas = $("rain-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let W, H, drops = [];

  const COLORS = ["#cfe0ff", "#ffffff", "#bcd4ff"];

  function resize() { W = canvas.width = canvas.clientWidth; H = canvas.height = canvas.clientHeight; }

  function newDrop(anyY) {
    return {
      x: Math.random() * W,
      y: anyY ? Math.random() * H : -20,
      len: 8 + Math.random() * 12,
      speed: 3 + Math.random() * 5,
      sway: Math.random() * Math.PI * 2,
      swayAmp: 4 + Math.random() * 10,
      swaySpd: 0.005 + Math.random() * 0.015,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    };
  }

  function seed() {
    drops = [];
    const n = Math.min(60, Math.floor(W / 25));
    for (let i = 0; i < n; i++) drops.push(newDrop(true));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (const d of drops) {
      d.sway += d.swaySpd;
      d.y += d.speed;
      d.x += Math.sin(d.sway) * 0.4;
      if (d.y > H + 20) Object.assign(d, newDrop(false));
      ctx.globalAlpha = 0.4;
      ctx.strokeStyle = d.color;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(d.x, d.y);
      ctx.lineTo(d.x + Math.sin(d.sway) * 1.5, d.y + d.len);
      ctx.stroke();
    }
    requestAnimationFrame(draw);
  }

  resize();
  addEventListener("resize", () => { resize(); seed(); });
  seed();
  draw();
})();

/* -------------------------------------------------------------
   MOOD — time-based emoji + favicon
   ------------------------------------------------------------- */
const Mood = (() => {
  const TABLE = [
    [5, "\uD83C\uDF05", "waking up"],
    [11, "\u2600\uFE0F", "nice day, going for a walk"],
    [14, "\uD83C\uDF3F", "tea done, time to code"],
    [17, "\uD83C\uDF07", "sunset, watching the suburbs"],
    [20, "\uD83C\uDF19", "evening, listening to music"],
    [23, "\uD83C\uDF1C", "late, still awake"],
    [24, "\uD83D\uDE34", "fell asleep"],
  ];

  function current() {
    const h = new Date().getHours();
    for (const row of TABLE) if (h < row[0]) return row;
    return TABLE[TABLE.length - 1];
  }

  function render() {
    const [, emoji, label] = current();
    const titleEl = $("site-title");
    if (titleEl) titleEl.setAttribute("title", `${emoji} ${label}`);
  }

  render();
  setInterval(render, 60000);
})();

/* -------------------------------------------------------------
   PLAYER — simulated now playing
   ------------------------------------------------------------- */
const Player = (() => {
  const tracks = SITE_DATA.tracks;
  let i = 0;
  let audio = new Audio();
  audio.preload = "metadata";

  function load() {
    const tr = tracks[i];
    const titleEl = $("mp-title");
    if (titleEl) titleEl.textContent = `${tr.title} - ${tr.artist}`;
    if (tr.src) {
      audio.src = tr.src;
    } else {
      audio.removeAttribute("src");
    }
    audio.load();
  }

  function setIcon() {
    const btn = $("mp-play");
    if (btn) btn.textContent = audio.paused ? ">" : "||";
    const disc = $("mp-disc");
    if (disc) disc.classList.toggle("spinning", !audio.paused);
  }

  function play() {
    if (!audio.src) return;
    audio.volume = 0.7;
    audio.play().catch(() => {});
  }

  function next() { i = (i + 1) % tracks.length; load(); setIcon(); if (!audio.paused) play(); }
  function prev() { i = (i - 1 + tracks.length) % tracks.length; load(); setIcon(); if (!audio.paused) play(); }

  $("mp-next").addEventListener("click", next);
  $("mp-prev").addEventListener("click", prev);
  $("mp-play").addEventListener("click", function () {
    if (!audio.src) return;
    if (audio.paused) play(); else audio.pause();
  });

  audio.addEventListener("play", setIcon);
  audio.addEventListener("pause", setIcon);
  audio.addEventListener("ended", next);

  load();
  setIcon();
  return { play, next, prev };
})();

/* -------------------------------------------------------------
   MISC — hit counter, year
   ------------------------------------------------------------- */
(function misc() {
  const KEY = "hits";
  let hits = parseInt(localStorage.getItem(KEY) || "", 10);
  if (!Number.isFinite(hits)) hits = 10000 + Math.floor(Math.random() * 500);
  hits++;
  try { localStorage.setItem(KEY, String(hits)); } catch (e) {}
})();

/* -------------------------------------------------------------
   EASTER EGG
   ------------------------------------------------------------- */
(function egg() {
  const trigger = document.querySelector('[data-panel="panel-contact"]');
  const overlay = $("easter-egg");
  const closeBtn = $("egg-close");

  // double-click on site title to show easter egg
  const titleEl = $("site-title");
  if (titleEl && overlay) {
    titleEl.addEventListener("dblclick", () => { overlay.hidden = false; });
  }
  if (closeBtn && overlay) {
    closeBtn.addEventListener("click", () => { overlay.hidden = true; });
  }
})();
