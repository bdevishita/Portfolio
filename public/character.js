/* The square character (bottom right) and its chat popup, for the static pages.
   Same eye maths as src/components/EyeTracker.tsx (eyes sit on a sphere, one spring,
   blinks), in plain JS. The chat is scripted: it answers from the portfolio's own
   content, it is not connected to an AI model. */
(function () {
  "use strict";

  var NAME = "Ishi"; // the character's name; change it here
  var CONTACT_EMAIL = "b.devishita@gmail.com";

  /* ───────────── the character ───────────── */
  var NS = "http://www.w3.org/2000/svg";
  var R = 50, GAP = 0.19, TILT = 64;
  var EYE = { w: 9, h: 15, r: 4.5 };
  var CUBE = "M30 6 H70 A24 24 0 0 1 94 30 V70 A24 24 0 0 1 70 94 H30 A24 24 0 0 1 6 70 V30 A24 24 0 0 1 30 6 Z";
  var FOLLOW = 60, BOUNCE = 30;
  var reduce = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  var clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)); };
  var uid = 0;
  var instances = [];

  function el(name, attrs) {
    var n = document.createElementNS(NS, name);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    return n;
  }

  function createCharacter(host, size) {
    var id = "ch-clip-" + (++uid);
    var svg = el("svg", { viewBox: "0 0 100 100", "class": "ch-svg", width: size, height: size, "aria-hidden": "true" });
    var defs = el("defs", {});
    var clip = el("clipPath", { id: id });
    clip.appendChild(el("path", { d: CUBE }));
    defs.appendChild(clip);
    svg.appendChild(defs);
    svg.appendChild(el("path", { "class": "ch-body", d: CUBE }));
    var g = el("g", { "clip-path": "url(#" + id + ")" });
    var eyes = [0, 1].map(function () {
      var eg = el("g", {});
      eg.appendChild(el("rect", { "class": "ch-eye" }));
      g.appendChild(eg);
      return eg;
    });
    svg.appendChild(g);
    host.appendChild(svg);

    var t = { x: 0, y: 0, vx: 0, vy: 0, tx: 0, ty: 0 };
    var blink = 0, nextBlink = performance.now() + 2200;

    function draw(now) {
      var lid = 1;
      if (now > nextBlink) { blink = now; nextBlink = now + 2600 + Math.random() * 3200; }
      var since = now - blink;
      if (since < 160) lid = 1 - 0.9 * Math.sin((since / 160) * Math.PI);

      var as = function (v) { return Math.asin(clamp(v, -0.92, 0.92)); };
      var yaw = as(t.x), pitch = -as(t.y);
      var cy = Math.cos(yaw), sy = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch);
      var tilt = TILT * t.x * t.y;
      [-GAP, GAP].forEach(function (x0, i) {
        var eg = eyes[i];
        var z0 = Math.sqrt(1 - x0 * x0);
        var x1 = x0 * cy + z0 * sy;
        var z1 = -x0 * sy + z0 * cy;
        var y2 = -z1 * sp;
        var z2 = z1 * cp;
        var near = clamp(z2, 0, 1);
        var k = 0.45 + 0.55 * near;
        var sx = k * (0.7 + 0.3 * near);
        var w = EYE.w * sx, h = Math.max(0.6, EYE.h * k * lid);
        var rect = eg.firstChild;
        rect.setAttribute("x", (-w / 2).toFixed(2));
        rect.setAttribute("y", (-h / 2).toFixed(2));
        rect.setAttribute("width", w.toFixed(2));
        rect.setAttribute("height", h.toFixed(2));
        rect.setAttribute("rx", Math.min(EYE.r, w / 2, h / 2).toFixed(2));
        eg.setAttribute("transform", "translate(" + (50 + x1 * R).toFixed(2) + " " + (50 + y2 * R).toFixed(2) + ") rotate(" + tilt.toFixed(2) + ")");
        eg.style.opacity = z2 < 0.05 ? "0" : "1";
      });
    }

    var inst = {
      svg: svg,
      step: function (now, dt) {
        if (reduce) { t.x = t.tx; t.y = t.ty; }
        else {
          var k = 0.06, d = 0.34 - (BOUNCE / 100) * 0.22;
          t.vx += ((t.tx - t.x) * k - t.vx * d) * dt;
          t.vy += ((t.ty - t.y) * k - t.vy * d) * dt;
          t.x += t.vx * dt; t.y += t.vy * dt;
        }
        draw(now);
      },
      aim: function (e) {
        var r = svg.getBoundingClientRect();
        if (!r.width) return;
        var dx = e.clientX - (r.left + r.width / 2);
        var dy = e.clientY - (r.top + r.height / 2);
        var d = Math.hypot(dx, dy) || 1;
        var reach = Math.max(60, Math.min(window.innerWidth, window.innerHeight) * 0.28);
        var far = Math.min(0.85, Math.tanh(d / reach) * (FOLLOW / 100) * 1.5);
        t.tx = (dx / d) * far; t.ty = (dy / d) * far;
      },
      rest: function () { t.tx = 0; t.ty = 0; }
    };
    instances.push(inst);
    draw(performance.now());
    return inst;
  }

  var raf = 0, prev = 0;
  function loop(now) {
    if (document.hidden) { raf = 0; prev = 0; return; }
    var dt = prev ? Math.min(2.5, (now - prev) / 16.67) : 1;
    prev = now;
    instances.forEach(function (i) { i.step(now, dt); });
    raf = requestAnimationFrame(loop);
  }
  function start() { if (!raf && !document.hidden) raf = requestAnimationFrame(loop); }
  document.addEventListener("visibilitychange", start);
  window.addEventListener("pointermove", function (e) { instances.forEach(function (i) { i.aim(e); }); }, { passive: true });
  document.documentElement.addEventListener("pointerleave", function () { instances.forEach(function (i) { i.rest(); }); });

  /* ───────────── what it knows (from the portfolio's own content) ───────────── */
  var L = {
    work: { label: "Selected work", href: "/#work" },
    lab: { label: "Lab", href: "/labs" },
    about: { label: "About", href: "/about" },
    brand: { label: "Brand & visual identity", href: "/cekura-brand.html" },
    product: { label: "Web app & product screens", href: "/cekura-product.html" },
    behance: { label: "Behance", href: "https://behance.net/devishita" },
    dribbble: { label: "Dribbble", href: "https://dribbble.com/b_ishita" },
    linkedin: { label: "LinkedIn", href: "https://linkedin.com/in/ishita-dev" },
    email: { label: CONTACT_EMAIL, href: "mailto:" + CONTACT_EMAIL },
    brief: { label: "Daily Brief", href: "/labs/daily-brief" },
    presence: { label: "Presence", href: "/labs/presence" }
  };

  var SUGGESTIONS = [
    { q: "What does Ishita do?", a: {
      text: "Ishita is a UI/UX and product designer who likes dismantling complexity. She is the founding designer at Cekura AI (YC F24), and her process leans on user research, data analysis and getting the micro-interactions right.",
      links: [L.about] } },
    { q: "What has she built?", a: {
      text: "At Cekura she designed the brand and the web app screens. Her wider work includes Carience, Coweb, Wet Waste Management, a biomimicry helmet concept, the UHV Chatbot and a Pinterest redesign. In the Lab there are Daily Brief and Presence.",
      links: [L.brand, L.product, L.work, L.lab] } },
    { q: "Is she taking on new work?", a: {
      text: "Yes, she is available for new opportunities. The quickest way to reach her is by email, or on LinkedIn.",
      links: [L.email, L.linkedin] } }
  ];

  var RULES = [
    { re: /\b(hi|hello|hey|hiya|yo)\b/, a: { text: "Hi! Ask me about Ishita's work, her experience or how to reach her." } },
    { re: /(who|what).*(do|are)|about|introduc|designer|role/, a: SUGGESTIONS[0].a },
    { re: /new work|hire|hiring|available|opportunit|freelance|open to|job|contact|reach|email|mail|talk|connect|linkedin|collab/, a: SUGGESTIONS[2].a },
    { re: /cekura|y ?combinator|\byc\b|startup|founding/, a: {
      text: "Since August 2024 Ishita has been the founding designer at Cekura AI (YC F24). She led the design of the product interfaces and helped the company get into Y Combinator. Two case studies cover the brand work and the web app.",
      links: [L.brand, L.product] } },
    { re: /brand|logo|identity|cover|carousel|illustrat/, a: {
      text: "Her Cekura brand work covers the colour and type system, blog cover illustrations, diagrams, a course landing page and LinkedIn carousels.",
      links: [L.brand] } },
    { re: /screen|dashboard|web app|webapp|product ui|metric|billing|onboarding|results/, a: {
      text: "For the Cekura web app she redesigned results and metrics pages, billing, onboarding and monitoring screens. The case study walks through the decisions behind them.",
      links: [L.product] } },
    { re: /daily brief|100 days|topic gen/, a: {
      text: "Daily Brief is a topic generator plus a 100 Days of AI challenge: a random design brief whenever you need one.",
      links: [L.brief] } },
    { re: /presence|nfc|networking/, a: {
      text: "Presence is a link-first networking profile: one link that shows the right version of Ishita to each person she meets.",
      links: [L.presence] } },
    { re: /\blab\b|experiment|side project|tinker/, a: {
      text: "The Lab holds small experiments and side projects, built to learn with no brief attached. Right now: Daily Brief and Presence.",
      links: [L.lab, L.brief, L.presence] } },
    { re: /experience|career|history|work(ed)? (before|previously|earlier)|previous|past (job|role)|intern|drrute|vs energy|flecks|braynix|\basy\b|resume|cv/, a: {
      text: "Before Cekura (2024 to now): Drrute (2023, study abroad platform and a waste-to-green-coal initiative), VS Energy (2023, websites and exhibition design), Flecks Labs (2022, logo and a goods transport app), Braynix (2022, event and pet care apps) and ASY (2021, graphic design).",
      links: [L.about] } },
    { re: /built|build|projects?|portfolio|case stud|\bwork\b|made|make/, a: SUGGESTIONS[1].a },
    { re: /skill|tool|figma|adobe|software|stack|prototyp|research/, a: {
      text: "Day to day: Figma and FigJam, plus Photoshop, Illustrator, InDesign, Spline and Premiere Pro. The skills span user research, wireframes, prototyping, usability testing, brand identity and micro-interactions.",
      links: [L.about] } },
    { re: /award|plexus|win|designathon/, a: { text: "Ishita won the Plexus Award at a designathon." } },
    { re: /where|location|live|based|varanasi|india|city/, a: { text: "Ishita is based in Varanasi, Uttar Pradesh, India." } },
    { re: /behance|dribbble|social/, a: { text: "You can see more of her work on Behance and Dribbble.", links: [L.behance, L.dribbble] } },
    { re: /thank|thanks|cheers|great|cool|nice/, a: { text: "Happy to help! Anything else you'd like to know?" } }
  ];
  var FALLBACK = { text: "I only know what's on this site, so I can't answer that one. Try asking about her work, experience, skills or how to get in touch.", links: [L.about, L.work, L.email] };

  function answer(text) {
    var s = text.toLowerCase();
    for (var i = 0; i < SUGGESTIONS.length; i++) if (SUGGESTIONS[i].q.toLowerCase() === s) return SUGGESTIONS[i].a;
    for (var j = 0; j < RULES.length; j++) if (RULES[j].re.test(s)) return RULES[j].a;
    return FALLBACK;
  }

  /* ───────────── the popup ───────────── */
  function h(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function build() {
    /* dock */
    var dock = h("div", "ch-dock");
    var openBtn = h("button", "ch-open");
    openBtn.type = "button";
    openBtn.setAttribute("aria-label", "Chat with " + NAME);
    openBtn.setAttribute("aria-haspopup", "dialog");
    dock.appendChild(openBtn);
    createCharacter(openBtn, 72);
    /* shown on hover and keyboard focus: what the character is and what it does */
    var tip = h("span", "ch-tip", "I'm " + NAME + ", a small guide to this site.");
    tip.id = "ch-tip";
    tip.setAttribute("role", "tooltip");
    openBtn.setAttribute("aria-describedby", "ch-tip");
    dock.appendChild(tip);

    /* popup */
    var overlay = h("div", "ch-overlay");
    overlay.hidden = true;
    var wrap = h("div", "ch-wrap");
    var avatar = h("div", "ch-avatar");
    createCharacter(avatar, 76);
    var name = h("div", "ch-name", NAME);
    var panel = h("section", "ch-panel");
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-modal", "true");
    panel.setAttribute("aria-label", "Chat with " + NAME);
    var close = h("button", "ch-close");
    close.type = "button";
    close.setAttribute("aria-label", "Close chat");
    close.innerHTML = '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M3 3l12 12M15 3L3 15"/></svg>';
    var log = h("div", "ch-log");
    log.setAttribute("aria-live", "polite");
    var form = h("form", "ch-form");
    form.autocomplete = "off";
    var input = h("input");
    input.type = "text";
    input.id = "ch-input";
    input.placeholder = "Write to " + NAME;
    input.setAttribute("aria-label", "Write to " + NAME);
    input.maxLength = 300;
    var send = h("button");
    send.type = "submit";
    send.setAttribute("aria-label", "Send");
    send.innerHTML = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 16V4M5 9l5-5 5 5"/></svg>';
    form.appendChild(input);
    form.appendChild(send);
    panel.appendChild(close);
    panel.appendChild(log);
    panel.appendChild(form);
    wrap.appendChild(avatar);
    wrap.appendChild(name);
    wrap.appendChild(panel);
    overlay.appendChild(wrap);
    document.body.appendChild(dock);
    document.body.appendChild(overlay);

    /* conversation */
    var asked = {};
    var sugBox = null;
    var greeted = false;
    var lastFocus = null;
    var busy = false;

    function scroll() { log.scrollTop = log.scrollHeight; }

    function bubble(who, text, links) {
      var m = h("div", "ch-msg " + who);
      m.appendChild(document.createTextNode(text));
      if (links && links.length) {
        var row = h("div", "ch-links");
        links.forEach(function (l) {
          var a = h("a", null, l.label);
          a.href = l.href;
          if (/^https?:/.test(l.href)) { a.target = "_blank"; a.rel = "noopener"; }
          row.appendChild(a);
        });
        m.appendChild(row);
      }
      log.insertBefore(m, sugBox);
      scroll();
      return m;
    }

    function renderSuggestions() {
      if (sugBox) sugBox.remove();
      sugBox = null;
      var left = SUGGESTIONS.filter(function (s, i) { return !asked[i]; });
      if (!left.length) return;
      sugBox = h("div", "ch-sug");
      SUGGESTIONS.forEach(function (s, i) {
        if (asked[i]) return;
        var b = h("button");
        b.type = "button";
        b.appendChild(h("span", "arr", "↳"));
        b.appendChild(h("span", "q", s.q));
        var keys = h("span", "keys");
        keys.appendChild(h("kbd", null, "Ctrl"));
        keys.appendChild(h("kbd", null, String(i + 1)));
        b.appendChild(keys);
        b.addEventListener("click", function () { ask(s.q, i); });
        sugBox.appendChild(b);
      });
      log.appendChild(sugBox);
      scroll();
    }

    function ask(text, idx) {
      text = text.trim();
      if (!text || busy) return;
      busy = true;
      if (idx != null) asked[idx] = true;
      else SUGGESTIONS.forEach(function (s, i) { if (s.q.toLowerCase() === text.toLowerCase()) asked[i] = true; });
      if (sugBox) { sugBox.remove(); sugBox = null; }
      bubble("me", text);
      var typing = h("div", "ch-msg bot");
      var dots = h("span", "ch-typing");
      dots.appendChild(h("i")); dots.appendChild(h("i")); dots.appendChild(h("i"));
      typing.appendChild(dots);
      log.appendChild(typing);
      scroll();
      var a = answer(text);
      setTimeout(function () {
        typing.remove();
        bubble("bot", a.text, a.links);
        busy = false;
        renderSuggestions();
      }, reduce ? 0 : 520 + Math.min(700, a.text.length * 4));
    }

    function greet() {
      if (greeted) return;
      greeted = true;
      bubble("bot", "Hi, I'm " + NAME + ". I live on Ishita's portfolio.");
      bubble("bot", "What would you like to know?");
      renderSuggestions();
    }

    function open() {
      lastFocus = document.activeElement;
      overlay.hidden = false;
      dock.setAttribute("data-hidden", "");
      document.body.style.overflow = "hidden";
      greet();
      requestAnimationFrame(function () { overlay.setAttribute("data-open", ""); input.focus({ preventScroll: true }); scroll(); });
    }
    function shut() {
      overlay.removeAttribute("data-open");
      document.body.style.overflow = "";
      dock.removeAttribute("data-hidden");
      setTimeout(function () { overlay.hidden = true; }, reduce ? 0 : 250);
      if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
    }

    openBtn.addEventListener("click", open);
    close.addEventListener("click", shut);
    overlay.addEventListener("pointerdown", function (e) { if (e.target === overlay) shut(); });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var v = input.value;
      input.value = "";
      send.removeAttribute("data-ready");
      ask(v);
    });
    input.addEventListener("input", function () {
      if (input.value.trim()) send.setAttribute("data-ready", ""); else send.removeAttribute("data-ready");
    });
    document.addEventListener("keydown", function (e) {
      if (overlay.hidden) return;
      if (e.key === "Escape") { e.preventDefault(); shut(); return; }
      if (e.ctrlKey && !e.metaKey && !e.altKey && /^[1-3]$/.test(e.key)) {
        var i = Number(e.key) - 1;
        if (!asked[i]) { e.preventDefault(); ask(SUGGESTIONS[i].q, i); }
        return;
      }
      /* keep Tab inside the popup */
      if (e.key === "Tab") {
        var f = panel.querySelectorAll("button, a[href], input");
        if (!f.length) return;
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    start();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", build);
  else build();
})();
