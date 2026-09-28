/**
 * Pondok Assunah — app.js
 * Merender halaman dari data/villas.js (variabel global SITE_DATA).
 * Tidak perlu diedit untuk menambah vila / mengganti foto —
 * cukup edit data/villas.js saja.
 */

(function () {
  "use strict";

  var data = window.SITE_DATA;
  if (!data) {
    console.error("SITE_DATA tidak ditemukan — pastikan data/villas.js dimuat sebelum js/app.js");
    return;
  }

  /* ---------------- Helper: WhatsApp link ---------------- */
  function buildWaLink(villa) {
    var number = (villa && villa.whatsapp) ? villa.whatsapp : data.site.whatsapp;
    var villaName = villa ? villa.name : data.site.name;
    var template = data.site.whatsappMessageTemplate.replace("{villa}", villaName);
    return "https://wa.me/" + number + "?text=" + encodeURIComponent(template);
  }

  /* ---------------- Helper: placeholder gambar ---------------- */
  function placeholderDataUri(label) {
    var initial = (label || "?").trim().charAt(0).toUpperCase();
    var svg =
      '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="450">' +
      '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="#7a9b76"/><stop offset="1" stop-color="#3a5a40"/>' +
      "</linearGradient></defs>" +
      '<rect width="600" height="450" fill="url(#g)"/>' +
      '<text x="50%" y="52%" font-family="Georgia, serif" font-size="120" fill="rgba(255,255,255,0.55)" text-anchor="middle" dominant-baseline="middle">' +
      initial +
      "</text>" +
      '<text x="50%" y="88%" font-family="Arial, sans-serif" font-size="20" fill="rgba(255,255,255,0.75)" text-anchor="middle">Foto segera ditambahkan</text>' +
      "</svg>";
    return "data:image/svg+xml," + encodeURIComponent(svg);
  }

  function imgWithFallback(src, alt) {
    var img = document.createElement("img");
    img.src = src;
    img.alt = alt;
    img.loading = "lazy";
    if (src.indexOf("data:") === 0) img.classList.add("is-placeholder");
    img.addEventListener(
      "error",
      function () {
        img.onerror = null;
        img.src = placeholderDataUri(alt);
        img.classList.add("is-placeholder");
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
      if (!el) return;
      el.href = buildWaLink(null);
      el.target = "_blank";
      el.rel = "noopener";
    });
  }

  /* ---------------- Fasilitas umum ---------------- */
  function renderFacilities() {
    var grid = document.getElementById("facilityGrid");
    if (!grid) return;
    (data.commonFacilities || []).forEach(function (f) {
      var item = document.createElement("div");
      item.className = "facility-item";
      item.innerHTML =
        '<div class="facility-icon">' + f.icon + "</div>" +
        '<div class="facility-label">' + f.label + "</div>";
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

      var coverSrc = (villa.images && villa.images[0]) || placeholderDataUri(villa.name);
      var img = imgWithFallback(coverSrc, villa.name);
      img.className = "villa-card-img";
      card.appendChild(img);

      var body = document.createElement("div");
      body.className = "villa-card-body";
      body.innerHTML =
        "<h3>" + villa.name + "</h3>" +
        '<div class="villa-meta">' + villa.capacity + "</div>" +
        '<p class="villa-desc">' + villa.shortDescription + "</p>" +
        '<div class="villa-price">' + villa.pricePerNight + " <small>/ malam</small></div>";

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
      waBtn.className = "btn btn-primary btn-wa";
      waBtn.innerHTML = '<span class="ico-wa">💬</span> Booking';
      waBtn.href = buildWaLink(villa);
      waBtn.target = "_blank";
      waBtn.rel = "noopener";

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
    metaEl.textContent = villa.capacity;
    priceEl.textContent = villa.pricePerNight + " / malam";

    facilitiesEl.innerHTML = "";
    (villa.facilities || []).forEach(function (f) {
      var li = document.createElement("li");
      li.textContent = f;
      facilitiesEl.appendChild(li);
    });

    waBtnEl.href = buildWaLink(villa);
    waBtnEl.target = "_blank";
    waBtnEl.rel = "noopener";

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

  /* ---------------- Mobile nav ---------------- */
  function initNavToggle() {
    var toggle = document.getElementById("navToggle");
    var nav = document.getElementById("mainNav");
    if (!toggle || !nav) return;
    function setOpen(open) {
      nav.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
      toggle.textContent = open ? "✕" : "☰";
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
    renderStaticContent();
    renderFacilities();
    initModalRefs();
    renderVillas();
    initNavToggle();
  });
})();
