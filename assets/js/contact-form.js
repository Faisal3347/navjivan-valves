/* Navjivan Valves — contact-form.js (EmailJS) */
(function () {
  "use strict";

  var EMAILJS = {
    SERVICE_ID: "service_5mh3y8j",
    TEMPLATE_ID: "template_vnuj6zx",   // <- paste your Template ID here
    PUBLIC_KEY: "GADB0mnrb1fI_GGLQ"    // public key only, never the private key
  };
  var MAX_MSG = 1000;

  document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("enquiry-form");
    if (!form) return;
    var $ = function (id) { return document.getElementById(id); };
    var fields = { name: $("name"), email: $("email"), phone: $("phone"), product: $("product"), message: $("message") };
    var btn = $("submit-btn");
    var alertBox = $("form-alert");
    var counter = $("char-count");

    if (window.emailjs) window.emailjs.init({ publicKey: EMAILJS.PUBLIC_KEY });

    /* ---------- validation (runs only when Send Message is clicked) ---------- */
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
        if (!/^[+\d][\d\s\-()]*$/.test(v) || digits.length < 8 || digits.length > 15) {
  return "Enter a valid phone number (8–15 digits).";
}
        return "";
      },
      message: function (v) {
        if (!v) return "Please tell us your requirement.";
        if (v.length < 10) return "Please add a few more details (at least 10 characters).";
        return "";
      }
    };
    function setError(key, msg) {
      var input = fields[key], err = $("err-" + key);
      if (!input || !err) return;
      err.textContent = msg;
      input.classList.toggle("invalid", !!msg);
      input.setAttribute("aria-invalid", msg ? "true" : "false");
    }
    function check(key) {
      var msg = validators[key](fields[key].value.trim());
      setError(key, msg);
      return !msg;
    }

    /* typing only clears that field's old error; it does not validate */
    ["name", "email", "phone", "message"].forEach(function (k) {
      fields[k].addEventListener("input", function () {
        if (fields[k].classList.contains("invalid")) setError(k, "");
        if (k === "message") updateCounter();
      });
    });
    function updateCounter() {
      var n = fields.message.value.length;
      counter.textContent = n + " / " + MAX_MSG;
      counter.classList.toggle("near-limit", n > MAX_MSG * 0.9);
    }
    updateCounter();

    /* ---------- alerts + loading ---------- */
    function showAlert(type, html) {
      alertBox.className = "form-alert " + type;
      alertBox.innerHTML = html;
      alertBox.hidden = false;
    }
    function hideAlert() { alertBox.hidden = true; alertBox.innerHTML = ""; }
    function setLoading(on) {
      btn.disabled = on;
      btn.classList.toggle("loading", on);
      btn.querySelector(".btn-label").textContent = on ? "Sending…" : "Send Message";
    }
    function fallback() {
      return ' You can also <a href="tel:+919769282217">call us</a>, <a href="https://wa.me/919769282217" target="_blank" rel="noopener">WhatsApp</a> or email <a href="mailto:Navjivanvalves@gmail.com">Navjivanvalves@gmail.com</a>.';
    }

    /* ---------- submit ---------- */
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (btn.disabled) return;
      hideAlert();

      if ($("website").value) {   // spam trap: bots fill this hidden field
        showAlert("success", "Your message has been sent. Our sales representative will contact you soon.");
        form.reset(); updateCounter();
        return;
      }

      var ok = true, firstBad = null;
      ["name", "email", "phone", "message"].forEach(function (k) {
        if (!check(k)) { ok = false; if (!firstBad) firstBad = fields[k]; }
      });
      if (!ok) { firstBad.focus(); return; }

      if (!window.emailjs) {
        showAlert("error", "Email service could not load. Check your internet connection and try again." + fallback());
        return;
      }
      setLoading(true);
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
          setLoading(false);
          form.reset();
          updateCounter();
          ["name", "email", "phone", "message"].forEach(function (k) { setError(k, ""); });
          showAlert("success", "Your message has been sent. Our sales representative will contact you soon.");
          alertBox.scrollIntoView({ behavior: "smooth", block: "center" });
        },
        function (err) {
          setLoading(false);
          console.error("EmailJS error:", err);
          var msg = "Sorry, we couldn't send your message.";
          if (err && err.status === 429) msg = "Too many requests right now. Please try again in a minute.";
          else if (!navigator.onLine) msg = "You appear to be offline. Please reconnect and try again.";
          showAlert("error", msg + fallback());
        }
      );
    });
  });
})();