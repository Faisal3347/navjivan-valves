/* Navjivan Valves — contact-form.js
   EmailJS integration + live validation + UX niceties (vanilla JS) */
(function () {
  "use strict";

  /* ========= EmailJS configuration (edit here only) ========= */
  var EMAILJS = {
    SERVICE_ID: "service_5mh3y8j",
    TEMPLATE_ID: "YOUR_TEMPLATE_ID",   // <- paste your Template ID from EmailJS dashboard
    PUBLIC_KEY: "GADB0mnrb1fI_GGLQ"    // public key only. NEVER put the private key in website code
  };
  var COOLDOWN_SECONDS = 60;           // blocks rapid repeat submissions
  var DRAFT_KEY = "nv_enquiry_draft";
  var COOLDOWN_KEY = "nv_enquiry_last_sent";
  var MAX_MSG = 1000;

  document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("enquiry-form");
    if (!form) return;

    var $ = function (id) { return document.getElementById(id); };
    var fields = { name: $("name"), email: $("email"), phone: $("phone"), product: $("product"), message: $("message") };
    var btn = $("submit-btn");
    var statusEl = $("form-status");
    var success = $("form-success");
    var counter = $("char-count");
    var touched = {};

    if (window.emailjs) {
      window.emailjs.init({ publicKey: EMAILJS.PUBLIC_KEY });
    }

    /* ---------- storage helpers (safe if blocked) ---------- */
    function store(type, key, val) {
      try {
        var st = type === "local" ? window.localStorage : window.sessionStorage;
        if (val === undefined) return st.getItem(key);
        if (val === null) st.removeItem(key); else st.setItem(key, val);
      } catch (e) { /* ignore */ }
      return null;
    }

    /* ---------- validation ---------- */
    var validators = {
      name: function (v) {
        if (!v) return "Please enter your name.";
        if (v.length < 2) return "Name looks too short.";
        return "";
      },
      email: function (v) {
        if (!v) return "Please enter your email address.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return "Enter a valid email, e.g. name@company.com";
        return "";
      },
      phone: function (v) {
        if (!v) return "";
        var digits = v.replace(/\D/g, "");
        if (!/^[+\d][\d\s\-()]*$/.test(v) || digits.length < 8 || digits.length > 15) return "Enter a valid phone number (8–15 digits).";
        return "";
      },
      message: function (v) {
        if (!v) return "Please tell us your requirement.";
        if (v.length < 10) return "Please add a few more details (at least 10 characters).";
        return "";
      }
    };

    function setError(key, msg) {
      var input = fields[key];
      var err = $("err-" + key);
      if (!input || !err) return;
      err.textContent = msg;
      input.classList.toggle("invalid", !!msg);
      input.classList.toggle("valid", !msg && input.value.trim() !== "");
      input.setAttribute("aria-invalid", msg ? "true" : "false");
    }
    function check(key) {
      var msg = validators[key] ? validators[key](fields[key].value.trim()) : "";
      setError(key, msg);
      return !msg;
    }

    /* Typo hint for common email domains */
    var typos = { "gmial.com": "gmail.com", "gamil.com": "gmail.com", "gmai.com": "gmail.com", "gmail.co": "gmail.com", "gnail.com": "gmail.com", "yahho.com": "yahoo.com", "yaho.com": "yahoo.com", "hotmial.com": "hotmail.com", "outlok.com": "outlook.com" };
    function emailHint() {
      var v = fields.email.value.trim().toLowerCase();
      var at = v.indexOf("@");
      if (at < 1) return;
      var dom = v.slice(at + 1);
      if (typos[dom]) {
        $("err-email").innerHTML = 'Did you mean <button type="button" class="link-btn" id="fix-email">' + v.slice(0, at) + "@" + typos[dom] + "</button>?";
        $("fix-email").addEventListener("click", function () {
          fields.email.value = v.slice(0, at) + "@" + typos[dom];
          check("email");
        });
      }
    }

    ["name", "email", "phone", "message"].forEach(function (k) {
      fields[k].addEventListener("blur", function () {
        touched[k] = true;
        if (check(k) && k === "email") emailHint();
      });
      fields[k].addEventListener("input", function () {
        if (touched[k]) check(k);
        saveDraft();
        if (k === "message") updateCounter();
      });
    });
    fields.product.addEventListener("change", saveDraft);

    /* ---------- character counter ---------- */
    function updateCounter() {
      var n = fields.message.value.length;
      counter.textContent = n + " / " + MAX_MSG;
      counter.classList.toggle("near-limit", n > MAX_MSG * 0.9);
    }

    /* ---------- draft autosave (restores if user leaves and returns) ---------- */
    function saveDraft() {
      store("local", DRAFT_KEY, JSON.stringify({
        name: fields.name.value, email: fields.email.value, phone: fields.phone.value,
        product: fields.product.value, message: fields.message.value
      }));
    }
    function restoreDraft() {
      var raw = store("local", DRAFT_KEY);
      if (!raw) return;
      try {
        var d = JSON.parse(raw);
        Object.keys(d).forEach(function (k) { if (fields[k] && d[k]) fields[k].value = d[k]; });
      } catch (e) { /* ignore */ }
    }
    restoreDraft();

    /* Pre-select product from URL, e.g. contact.html?product=Ball%20Valves */
    try {
      var qp = new URLSearchParams(window.location.search).get("product");
      if (qp) {
        Array.prototype.forEach.call(fields.product.options, function (o) {
          if (o.text.toLowerCase() === qp.toLowerCase()) fields.product.value = o.value || o.text;
        });
      }
    } catch (e) { /* ignore */ }
    updateCounter();

    /* ---------- UI state helpers ---------- */
    function setStatus(msg, type) {
      statusEl.textContent = msg || "";
      statusEl.className = type ? "status-" + type : "";
    }
    function setLoading(on) {
      btn.disabled = on;
      btn.classList.toggle("loading", on);
      btn.querySelector(".btn-label").textContent = on ? "Sending…" : "Send Message";
      Array.prototype.forEach.call(form.elements, function (el) { if (el !== btn) el.readOnly = on; });
    }
    function fallbackLinks() {
      return ' You can also <a href="tel:+919769282217">call us</a>, <a href="https://wa.me/919769282217" target="_blank" rel="noopener">WhatsApp</a> or email <a href="mailto:Navjivanvalves@gmail.com">Navjivanvalves@gmail.com</a>.';
    }
    function errorWithLinks(msg) {
      statusEl.className = "status-error";
      statusEl.innerHTML = msg + fallbackLinks();
    }

    /* ---------- submit ---------- */
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (btn.disabled) return;

      /* honeypot: bots fill hidden field. Pretend success, send nothing */
      if ($("website").value) { showSuccess(); return; }

      var ok = true, firstBad = null;
      ["name", "email", "phone", "message"].forEach(function (k) {
        touched[k] = true;
        if (!check(k)) { ok = false; if (!firstBad) firstBad = fields[k]; }
      });
      if (!ok) {
        setStatus("Please fix the highlighted fields.", "error");
        firstBad.focus();
        return;
      }

      var last = parseInt(store("session", COOLDOWN_KEY) || "0", 10);
      var wait = COOLDOWN_SECONDS - Math.floor((Date.now() - last) / 1000);
      if (last && wait > 0) {
        setStatus("Your enquiry was just sent. Please wait " + wait + "s before sending another.", "error");
        return;
      }

      if (!window.emailjs) {
        errorWithLinks("Email service could not load. Check your internet connection and try again.");
        return;
      }
      if (!EMAILJS.TEMPLATE_ID || EMAILJS.TEMPLATE_ID === "YOUR_TEMPLATE_ID") {
        errorWithLinks("Form is not fully configured yet.");
        console.error("contact-form.js: set EMAILJS.TEMPLATE_ID.");
        return;
      }

      setStatus("", "");
      setLoading(true);

      /* These names must match the {{variables}} in your EmailJS template */
      var params = {
        name: fields.name.value.trim(),
        user_email: fields.email.value.trim(),
        phone: fields.phone.value.trim() || "Not provided",
        product: fields.product.value || "Not specified",
        message: fields.message.value.trim(),
        page_url: window.location.href,
        time: new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })
      };

      window.emailjs.send(EMAILJS.SERVICE_ID, EMAILJS.TEMPLATE_ID, params).then(
        function () {
          store("session", COOLDOWN_KEY, String(Date.now()));
          store("local", DRAFT_KEY, null);
          setLoading(false);
          showSuccess(params.name);
        },
        function (err) {
          setLoading(false);
          console.error("EmailJS error:", err);
          var msg = "Sorry, we couldn't send your message.";
          if (err && err.status === 429) msg = "Too many requests right now. Please try again in a minute.";
          else if (err && (err.status === 400 || err.status === 412)) msg = "Sending failed due to a configuration issue on our side.";
          else if (!navigator.onLine) msg = "You appear to be offline. Please reconnect and try again.";
          errorWithLinks(msg);
        }
      );
    });

    /* Ctrl/Cmd + Enter submits from the message box */
    fields.message.addEventListener("keydown", function (e) {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        if (form.requestSubmit) form.requestSubmit(); else btn.click();
      }
    });

    /* ---------- success screen ---------- */
    function showSuccess(name) {
      $("success-name").textContent = (name || "").split(" ")[0] || "there";
      form.hidden = true;
      success.hidden = false;
      success.classList.add("show");
      success.focus();
      success.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    $("send-another").addEventListener("click", function () {
      form.reset();
      touched = {};
      ["name", "email", "phone", "message"].forEach(function (k) { setError(k, ""); fields[k].classList.remove("valid"); });
      updateCounter();
      setStatus("", "");
      success.hidden = true;
      success.classList.remove("show");
      form.hidden = false;
      fields.name.focus();
    });
  });
})();
