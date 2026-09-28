/**
 * Pondok Assunah — app.js
 * Merender halaman dari data/villas.js (variabel global SITE_DATA).
 * Tidak perlu diedit untuk menambah vila / mengganti foto —
 * cukup edit data/villas.js saja.
 */

(function () {
  "use strict";

  var data = window.SITE_DATA;
  var ICON = window.ICON;
  if (!data) {
    console.error("SITE_DATA tidak ditemukan — pastikan data/villas.js dimuat sebelum js/app.js");
    return;
  }

  function esc(text) {
    var div = document.createElement("div");
    div.textContent = text == null ? "" : String(text);
    return div.innerHTML;
  }

  /* ---------------- Helper: WhatsApp link ---------------- */
  function buildWaLink(villa) {
    var number = (villa && villa.whatsapp) ? villa.whatsapp : data.site.whatsapp;
    var villaName = villa ? villa.name : data.site.name;
    var template = data.site.whatsappMessageTemplate.replace("{villa}", villaName);
    return "https://wa.me/" + number + "?text=" + encodeURIComponent(template);
  }

  function setWaLink(el, villa) {
    el.href = buildWaLink(villa);
    el.target = "_blank";
    el.rel = "noopener";
  }

  /* ---------------- Helper: kapasitas -> daftar spesifikasi berikon ---------------- */
  // "8–10 orang · 3 kamar tidur · 2 kamar mandi" -> [{icon:"tamu", text:"8–10 orang"}, ...]
  function parseSpecs(capacity) {
    return String(capacity || "")
      .split("·")
      .map(function (s) { return s.trim(); })
      .filter(Boolean)
      .map(function (text) {
        var t = text.toLowerCase();
        var icon = "check";
        if (/orang|tamu|pax/.test(t)) icon = "tamu";
        else if (/kamar tidur|bed/.test(t)) icon = "kamar";
        else if (/kamar mandi|toilet|wc/.test(t)) icon = "kamar-mandi";
        return { icon: icon, text: text };
      });
  }

  function specListHtml(capacity) {
    return parseSpecs(capacity)
      .map(function (s) { return "<li>" + ICON.svg(s.icon) + "<span>" + esc(s.text) + "</span></li>"; })
      .join("");
  }

  // "Rp 950.000" -> 950000 (untuk mencari harga termurah)
  function priceNumber(price) {
    var n = parseInt(String(price || "").replace(/[^\d]/g, ""), 10);
    return isNaN(n) ? null : n;
  }

  /* ---------------- Helper: placeholder gambar ---------------- */
  // Ilustrasi lanskap kecil + teks, dirancang agar tetap rapi walau terpotong (object-fit: cover)
  function placeholderDataUri(label) {
    var svg =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">' +
      '<defs><linearGradient id="s" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0" stop-color="#c9dadd"/><stop offset=".6" stop-color="#eee9da"/></linearGradient>' +
      '<linearGradient id="h" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0" stop-color="#7c9d5c"/><stop offset="1" stop-color="#4f7239"/></linearGradient></defs>' +
      '<rect width="800" height="600" fill="url(#s)"/>' +
      '<circle cx="590" cy="215" r="60" fill="#fff6e0" opacity=".8"/>' +
      '<path d="M0 420 110 330l70 40 120-120 90 80 80-50 150 110 90-40 90 60v190H0z" fill="#a9bcbf"/>' +
      '<path d="M0 470 140 400l100 40 130-70 120 70 110-40 200 80v120H0z" fill="#8aa393"/>' +
      '<path d="M0 520c160-50 330-60 480-30s240 20 320-10v120H0z" fill="url(#h)"/>' +
      '<g transform="translate(364 214) scale(3)" fill="none" stroke="#2f4a35" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" opacity=".7">' +
      '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3z"/>' +
      '<circle cx="12" cy="13" r="3"/></g>' +
      '<text x="400" y="322" font-family="Inter, Arial, sans-serif" font-size="26" font-weight="600" fill="#2f4a35" fill-opacity=".75" text-anchor="middle">Foto segera ditambahkan</text>' +
      "</svg>";
    return "data:image/svg+xml," + encodeURIComponent(svg);
  }

  function imgWithFallback(src, alt) {
    var img = document.createElement("img");
    img.src = src;
    img.alt = alt;
    img.loading = "lazy";
    img.addEventListener(
      "error",
      function () {
        img.onerror = null;
        img.src = placeholderDataUri(alt);
      },
      { once: true }
    );
    return img;
  }

  /* ---------------- Header / hero / about / lokasi ---------------- */
  function renderStaticContent() {
    document.title = data.site.name + " — " + data.site.tagline;

    var heroLoc = document.getElementById("heroLocation");
    var heroTitle = document.getElementById("heroTitle");
    var heroTag = document.getElementById("heroTagline");
    if (heroLoc) heroLoc.textContent = data.site.locationText.split("—")[0].trim();
    if (heroTitle) heroTitle.textContent = data.site.name;
    if (heroTag) heroTag.textContent = data.site.tagline;

    var aboutText = document.getElementById("aboutText");
    if (aboutText) aboutText.textContent = data.site.about;

    var locationText = document.getElementById("locationText");
    if (locationText) locationText.textContent = data.site.locationText;

    var mapFrame = document.getElementById("mapFrame");
    if (mapFrame && data.site.mapsEmbedUrl) mapFrame.src = data.site.mapsEmbedUrl;

    var mapLinkBtn = document.getElementById("mapLinkBtn");
    if (mapLinkBtn) {
      if (data.site.mapsLinkUrl) mapLinkBtn.href = data.site.mapsLinkUrl;
      else mapLinkBtn.parentNode.style.display = "none";
    }

    var year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();

    ["headerWaBtn", "heroWaBtn", "footerWaBtn", "floatWaBtn"].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) setWaLink(el, null);
    });
  }

  /* ---------------- Chip ringkasan di hero ---------------- */
  function renderHeroChips() {
    var list = document.getElementById("heroChips");
    if (!list) return;
    var villas = data.villas || [];
    var chips = [];

    var cheapest = null;
    villas.forEach(function (v) {
      var n = priceNumber(v.pricePerNight);
      if (n !== null && (cheapest === null || n < cheapest.n)) cheapest = { n: n, text: v.pricePerNight };
    });
    if (villas.length) chips.push({ icon: "home", text: villas.length + " pilihan vila" });
    if (cheapest) chips.push({ icon: "tag", text: "Mulai " + cheapest.text + " / malam" });
    chips.push({ icon: "musholla", text: "Area sholat di setiap vila" });

    list.innerHTML = chips
      .map(function (c) { return "<li>" + ICON.svg(c.icon) + "<span>" + esc(c.text) + "</span></li>"; })
      .join("");
  }

  /* ---------------- Fasilitas umum ---------------- */
  function renderFacilities() {
    var grid = document.getElementById("facilityGrid");
    if (!grid) return;
    (data.commonFacilities || []).forEach(function (f) {
      var item = document.createElement("div");
      item.className = "facility-item";
      item.innerHTML =
        '<div class="facility-icon">' + ICON.svgOrText(f.icon) + "</div>" +
        '<div class="facility-label">' + esc(f.label) + "</div>";
      grid.appendChild(item);
    });
  }

  /* ---------------- Villa cards ---------------- */
  function renderVillas() {
    var grid = document.getElementById("villaGrid");
    if (!grid) return;

    (data.villas || []).forEach(function (villa) {
      var card = document.createElement("article");
      card.className = "villa-card";

      var media = document.createElement("button");
      media.type = "button";
      media.className = "villa-card-media";
      media.setAttribute("aria-label", "Lihat detail " + villa.name);
      var coverSrc = (villa.images && villa.images[0]) || placeholderDataUri(villa.name);
      var img = imgWithFallback(coverSrc, villa.name);
      img.className = "villa-card-img";
      media.appendChild(img);
      var badge = document.createElement("span");
      badge.className = "price-badge";
      badge.innerHTML = esc(villa.pricePerNight) + "<small>/malam</small>";
      media.appendChild(badge);
      media.addEventListener("click", function () { openModal(villa); });
      card.appendChild(media);

      var body = document.createElement("div");
      body.className = "villa-card-body";
      body.innerHTML =
        "<h3>" + esc(villa.name) + "</h3>" +
        '<ul class="spec-list">' + specListHtml(villa.capacity) + "</ul>" +
        '<p class="villa-desc">' + esc(villa.shortDescription) + "</p>";

      var actions = document.createElement("div");
      actions.className = "villa-card-actions";

      var detailBtn = document.createElement("button");
      detailBtn.type = "button";
      detailBtn.className = "btn btn-outline";
      detailBtn.textContent = "Lihat Detail";
      detailBtn.addEventListener("click", function () {
        openModal(villa);
      });

      var waBtn = document.createElement("a");
      waBtn.className = "btn btn-wa";
      waBtn.innerHTML = ICON.svg("whatsapp") + " Booking";
      setWaLink(waBtn, villa);

      actions.appendChild(detailBtn);
      actions.appendChild(waBtn);
      body.appendChild(actions);
      card.appendChild(body);
      grid.appendChild(card);
    });
  }

  /* ---------------- Modal detail ---------------- */
  var backdrop, galleryEl, titleEl, metaEl, priceEl, facilitiesEl, waBtnEl, closeBtn, lastFocused;

  function initModalRefs() {
    backdrop = document.getElementById("modalBackdrop");
    galleryEl = document.getElementById("modalGallery");
    titleEl = document.getElementById("modalTitle");
    metaEl = document.getElementById("modalMeta");
    priceEl = document.getElementById("modalPrice");
    facilitiesEl = document.getElementById("modalFacilities");
    waBtnEl = document.getElementById("modalWaBtn");
    closeBtn = document.getElementById("modalClose");

    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    if (backdrop) {
      backdrop.addEventListener("click", function (e) {
        if (e.target === backdrop) closeModal();
      });
    }
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && backdrop.classList.contains("open")) closeModal();
    });
  }

  function openModal(villa) {
    galleryEl.innerHTML = "";
    var imgs = villa.images && villa.images.length ? villa.images : [placeholderDataUri(villa.name)];
    imgs = imgs.slice(0, 3);
    // Layout galeri menyesuaikan jumlah foto (1, 2, atau 3)
    galleryEl.className = "modal-gallery gallery-" + imgs.length;
    imgs.forEach(function (src) {
      galleryEl.appendChild(imgWithFallback(src, villa.name));
    });

    titleEl.textContent = villa.name;
    metaEl.innerHTML = specListHtml(villa.capacity);
    priceEl.innerHTML = esc(villa.pricePerNight) + " <small>/ malam</small>";

    facilitiesEl.innerHTML = "";
    (villa.facilities || []).forEach(function (f) {
      var li = document.createElement("li");
      li.innerHTML = ICON.svg("check") + "<span>" + esc(f) + "</span>";
      facilitiesEl.appendChild(li);
    });

    setWaLink(waBtnEl, villa);

    lastFocused = document.activeElement;
    backdrop.classList.add("open");
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  }

  function closeModal() {
    backdrop.classList.remove("open");
    document.body.style.overflow = "";
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  /* ---------------- Header: solid saat di-scroll ---------------- */
  function initHeaderScroll() {
    var header = document.getElementById("siteHeader");
    if (!header) return;
    function update() {
      header.classList.toggle("scrolled", window.scrollY > 24);
    }
    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  /* ---------------- Mobile nav ---------------- */
  function initNavToggle() {
    var toggle = document.getElementById("navToggle");
    var nav = document.getElementById("mainNav");
    var header = document.getElementById("siteHeader");
    if (!toggle || !nav) return;
    function setOpen(open) {
      nav.classList.toggle("open", open);
      if (header) header.classList.toggle("menu-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
      toggle.innerHTML = ICON.svg(open ? "close" : "menu");
    }
    toggle.addEventListener("click", function () {
      setOpen(!nav.classList.contains("open"));
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        setOpen(false);
      });
    });
  }

  /* ---------------- Init ---------------- */
  document.addEventListener("DOMContentLoaded", function () {
    ICON.hydrate();
    renderStaticContent();
    renderHeroChips();
    renderFacilities();
    initModalRefs();
    renderVillas();
    initHeaderScroll();
    initNavToggle();
  });
})();
