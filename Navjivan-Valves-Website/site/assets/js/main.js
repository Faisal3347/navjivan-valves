/* Navjivan Valves — main.js (vanilla, no dependencies) */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    /* ---------- Mobile nav toggle ---------- */
    var hamburger = document.querySelector(".hamburger");
    var nav = document.querySelector(".main-nav");
    var overlay = document.querySelector(".nav-overlay");
    var body = document.body;

    function closeNav() {
      hamburger && hamburger.classList.remove("open");
      nav && nav.classList.remove("open");
      body.classList.remove("nav-open");
      hamburger && hamburger.setAttribute("aria-expanded", "false");
    }
    function toggleNav() {
      var isOpen = nav && nav.classList.toggle("open");
      hamburger && hamburger.classList.toggle("open", isOpen);
      body.classList.toggle("nav-open", isOpen);
      hamburger && hamburger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    }
    if (hamburger) hamburger.addEventListener("click", toggleNav);
    if (overlay) overlay.addEventListener("click", closeNav);

    /* ---------- Mobile dropdown accordion ---------- */
    var dropdownParents = document.querySelectorAll(".has-dropdown > a");
    dropdownParents.forEach(function (link) {
      link.addEventListener("click", function (e) {
        if (window.innerWidth <= 860) {
          e.preventDefault();
          var parent = link.parentElement;
          var wasOpen = parent.classList.contains("open");
          document.querySelectorAll(".has-dropdown.open").forEach(function (el) {
            el.classList.remove("open");
          });
          if (!wasOpen) parent.classList.add("open");
        }
      });
    });

    /* Close mobile nav on resize to desktop */
    window.addEventListener("resize", function () {
      if (window.innerWidth > 860) closeNav();
    });

    /* Contact form is handled by contact-form.js (EmailJS) */

    /* ---------- Current year in footer ---------- */
    var yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  });
})();
