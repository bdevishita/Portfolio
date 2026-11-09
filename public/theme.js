/* Light / dark switch for the static pages. Loaded in <head> (no defer) so the saved
   choice is applied before the first paint. With no saved choice it follows the system. */
(function () {
  "use strict";
  var root = document.documentElement, KEY = "theme";
  function stored() {
    try { var v = localStorage.getItem(KEY); return v === "light" || v === "dark" ? v : null; } catch (e) { return null; }
  }
  var saved = stored();
  if (saved) root.setAttribute("data-theme", saved);
  var mq = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)");
  function current() { return root.getAttribute("data-theme") || (mq && mq.matches ? "dark" : "light"); }
  function label(btn) {
    var next = current() === "dark" ? "light" : "dark";
    btn.setAttribute("aria-label", "Switch to " + next + " mode");
    btn.title = "Switch to " + next + " mode";
  }
  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.querySelector(".theme-btn");
    if (!btn) return;
    label(btn);
    btn.addEventListener("click", function () {
      var next = current() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem(KEY, next); } catch (e) { /* private mode: the choice just won't be remembered */ }
      label(btn);
    });
    if (mq && mq.addEventListener) mq.addEventListener("change", function () { label(btn); });
  });
})();
