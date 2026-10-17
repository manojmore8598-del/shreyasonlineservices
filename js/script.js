/**
 * Shreyas Online Services – Shared JavaScript
 * Static site: no backend. Contact form hands off to WhatsApp.
 */

(function () {
  "use strict";

  /* ============================================================
     SITE CONFIGURATION
     Update these values when real data becomes available.
     ============================================================ */
  var SITE_CONFIG = {
    phone: "+919260020143",
    phoneAlt: "+918421822545",
    whatsapp: "918421822545",
    email: "shreyasonlineservices@gmail.com",
    businessName: "Shreyas Online Services",

    /**
     * GOOGLE MAPS PLACEHOLDER — replace when you have the real link.
     * googleMapsUrl: paste the Google Maps place/share URL here
     * googleMapsEmbedUrl: paste the Google Maps Embed iframe src URL here
     * Leave empty until verified. Do not invent coordinates or map URLs.
     */
    googleMapsUrl: "",
    googleMapsEmbedUrl: ""
  };

  /* Expose config for debugging / future use */
  window.SHREYAS_CONFIG = SITE_CONFIG;

  /* ---------- Year in copyright ---------- */
  function setCopyrightYear() {
    var yearEls = document.querySelectorAll("[data-current-year]");
    var year = new Date().getFullYear();
    yearEls.forEach(function (el) {
      el.textContent = year;
    });
  }

  /* ---------- Sticky header shadow ---------- */
  function initStickyHeader() {
    var header = document.querySelector(".main-header");
    if (!header) return;

    function onScroll() {
      if (window.scrollY > 20) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Back to top ---------- */
  function initBackToTop() {
    var btn = document.getElementById("backToTop");
    if (!btn) return;

    function toggle() {
      if (window.scrollY > 400) {
        btn.classList.add("visible");
      } else {
        btn.classList.remove("visible");
      }
    }

    window.addEventListener("scroll", toggle, { passive: true });
    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    toggle();
  }

  /* ---------- Google Maps placeholders ---------- */
  function initMaps() {
    var directionsBtns = document.querySelectorAll("[data-maps-directions]");
    var mapContainers = document.querySelectorAll("[data-maps-embed]");

    directionsBtns.forEach(function (btn) {
      if (SITE_CONFIG.googleMapsUrl) {
        btn.setAttribute("href", SITE_CONFIG.googleMapsUrl);
        btn.setAttribute("target", "_blank");
        btn.setAttribute("rel", "noopener noreferrer");
      } else {
        btn.addEventListener("click", function (e) {
          e.preventDefault();
          alert(
            "Google Maps link is not configured yet.\n\n" +
              "Address: Gala No. 23, Parmar Plaza, Near Pen Police Station, " +
              "Beside Krushna Dairy, Pen, District Raigad, Maharashtra – 402107.\n\n" +
              "To enable directions, set googleMapsUrl in js/script.js (SITE_CONFIG)."
          );
        });
      }
    });

    mapContainers.forEach(function (container) {
      if (SITE_CONFIG.googleMapsEmbedUrl) {
        container.innerHTML =
          '<div class="map-embed"><iframe src="' +
          SITE_CONFIG.googleMapsEmbedUrl.replace(/"/g, "&quot;") +
          '" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Shreyas Online Services location map"></iframe></div>';
      }
      /* else: keep the HTML placeholder already on the page */
    });
  }

  /* ---------- Service search filter (services.html) ---------- */
  function initServiceSearch() {
    var input = document.getElementById("serviceSearch");
    var cards = document.querySelectorAll("[data-service-card]");
    var noResults = document.getElementById("noResults");
    var categorySections = document.querySelectorAll("[data-service-category]");

    if (!input || !cards.length) return;

    function filter() {
      var query = input.value.trim().toLowerCase();
      var visibleCount = 0;

      cards.forEach(function (card) {
        var title = (card.getAttribute("data-title") || "").toLowerCase();
        var category = (card.getAttribute("data-category") || "").toLowerCase();
        var keywords = (card.getAttribute("data-keywords") || "").toLowerCase();
        var match =
          !query ||
          title.indexOf(query) !== -1 ||
          category.indexOf(query) !== -1 ||
          keywords.indexOf(query) !== -1;

        /* Bootstrap col wrapper */
        var col = card.closest("[class*='col-']") || card;
        col.style.display = match ? "" : "none";
        if (match) visibleCount++;
      });

      categorySections.forEach(function (section) {
        var sectionCards = section.querySelectorAll("[data-service-card]");
        var anyVisible = false;
        sectionCards.forEach(function (card) {
          var col = card.closest("[class*='col-']") || card;
          if (col.style.display !== "none") anyVisible = true;
        });
        section.style.display = anyVisible ? "" : "none";
      });

      if (noResults) {
        if (visibleCount === 0) {
          noResults.classList.add("visible");
        } else {
          noResults.classList.remove("visible");
        }
      }
    }

    input.addEventListener("input", filter);
    input.addEventListener("search", filter);
  }

  /* ---------- Contact form → WhatsApp ---------- */
  function initContactForm() {
    var form = document.getElementById("contactForm");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var nameEl = document.getElementById("fullName");
      var mobileEl = document.getElementById("mobileNumber");
      var emailEl = document.getElementById("emailAddress");
      var serviceEl = document.getElementById("serviceRequired");
      var messageEl = document.getElementById("message");

      var isValid = true;

      function setError(el, message) {
        el.classList.add("is-invalid");
        var feedback = el.parentElement.querySelector(".invalid-feedback");
        if (feedback) feedback.textContent = message;
        isValid = false;
      }

      function clearError(el) {
        el.classList.remove("is-invalid");
      }

      [nameEl, mobileEl, emailEl, serviceEl, messageEl].forEach(clearError);

      var name = nameEl.value.trim();
      var mobile = mobileEl.value.trim();
      var email = emailEl.value.trim();
      var service = serviceEl.value.trim();
      var message = messageEl.value.trim();

      if (!name || name.length < 2) {
        setError(nameEl, "Please enter your full name.");
      }

      var mobileDigits = mobile.replace(/\D/g, "");
      if (!/^[6-9]\d{9}$/.test(mobileDigits) && !/^91[6-9]\d{9}$/.test(mobileDigits)) {
        setError(mobileEl, "Please enter a valid 10-digit Indian mobile number.");
      }

      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setError(emailEl, "Please enter a valid email address.");
      }

      if (!service) {
        setError(serviceEl, "Please select a service.");
      }

      if (!message || message.length < 5) {
        setError(messageEl, "Please enter a brief message (at least 5 characters).");
      }

      /* Block sensitive document numbers in message */
      var sensitivePattern = /\b(\d{12}|\d{4}\s?\d{4}\s?\d{4})\b/;
      if (sensitivePattern.test(message) || /aadhaar|aadhar|uidai/i.test(message)) {
        setError(
          messageEl,
          "Please do not include Aadhaar numbers or other sensitive document IDs in the message."
        );
      }

      if (!isValid) {
        var firstInvalid = form.querySelector(".is-invalid");
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      var text =
        "Hello, I would like to enquire about a service.\n\n" +
        "Name: " + name + "\n" +
        "Mobile: " + mobileDigits.slice(-10) + "\n" +
        (email ? "Email: " + email + "\n" : "") +
        "Service Required: " + service + "\n" +
        "Message: " + message + "\n\n" +
        "Sent via the Shreyas Online Services website contact form.";

      var url =
        "https://wa.me/" +
        SITE_CONFIG.whatsapp +
        "?text=" +
        encodeURIComponent(text);

      var confirmed = window.confirm(
        "Your enquiry looks good.\n\n" +
          "This static website cannot send email directly. " +
          "Click OK to open WhatsApp with your message ready to send."
      );

      if (confirmed) {
        window.open(url, "_blank", "noopener,noreferrer");
      }
    });
  }

  /* ---------- Gallery lightbox ---------- */
  function initLightbox() {
    var items = document.querySelectorAll("[data-lightbox]");
    var lightbox = document.getElementById("lightbox");
    if (!items.length || !lightbox) return;

    var img = lightbox.querySelector(".lightbox-img");
    var caption = lightbox.querySelector(".lightbox-caption");
    var closeBtn = lightbox.querySelector(".lightbox-close");

    function open(src, alt) {
      img.setAttribute("src", src);
      img.setAttribute("alt", alt || "");
      if (caption) caption.textContent = alt || "";
      lightbox.classList.add("active");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }

    function close() {
      lightbox.classList.remove("active");
      lightbox.setAttribute("aria-hidden", "true");
      img.removeAttribute("src");
      document.body.style.overflow = "";
    }

    items.forEach(function (item) {
      item.addEventListener("click", function () {
        var src = item.getAttribute("data-full") || item.querySelector("img").getAttribute("src");
        var alt = item.getAttribute("data-caption") || item.querySelector("img").getAttribute("alt") || "";
        open(src, alt);
      });

      item.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          item.click();
        }
      });
    });

    if (closeBtn) closeBtn.addEventListener("click", close);

    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) close();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && lightbox.classList.contains("active")) close();
    });
  }

  /* ---------- Init ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    setCopyrightYear();
    initStickyHeader();
    initBackToTop();
    initMaps();
    initServiceSearch();
    initContactForm();
    initLightbox();
  });
})();
