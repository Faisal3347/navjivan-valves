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

    /* ---------- Contact / enquiry form (mailto fallback, no backend) ---------- */
    var form = document.getElementById("enquiry-form");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var status = document.getElementById("form-status");
        var name = form.querySelector("#name").value.trim();
        var email = form.querySelector("#email").value.trim();
        var phone = form.querySelector("#phone") ? form.querySelector("#phone").value.trim() : "";
        var product = form.querySelector("#product") ? form.querySelector("#product").value : "";
        var message = form.querySelector("#message").value.trim();

        if (!name || !email || !message) {
          status.textContent = "Please fill in your name, email and requirement.";
          status.style.color = "#C4151C";
          return;
        }

        var subject = encodeURIComponent("Product Enquiry from " + name + (product ? " — " + product : ""));
        var body = encodeURIComponent(
          "Name: " + name +
          "\nEmail: " + email +
          (phone ? "\nPhone: " + phone : "") +
          (product ? "\nProduct: " + product : "") +
          "\n\nRequirement:\n" + message
        );

        window.location.href = "mailto:Navjivanvalves@gmail.com?subject=" + subject + "&body=" + body;
        status.textContent = "Opening your email app to send this enquiry to Navjivan Valves…";
        status.style.color = "#101828";
      });
    }

    /* ---------- Current year in footer ---------- */
    var yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  });
})();
