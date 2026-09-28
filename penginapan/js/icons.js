/**
 * Pondok Assunah — icons.js
 * Kumpulan ikon SVG (garis, gaya Lucide) pengganti emoji.
 *
 * Pemakaian di HTML : <span data-icon="whatsapp"></span>
 * Pemakaian di JS   : ICON.svg("wifi")
 *
 * Nama ikon yang bisa dipakai di data/villas.js (field "icon" fasilitas):
 *   musholla, dapur, parkir, pemandangan, wifi, air-hangat,
 *   kamar, kamar-mandi, tamu, taman, teras, kulkas, tv, bbq, kolam
 * Kalau nama tidak dikenali, teks aslinya (misalnya emoji) tetap ditampilkan.
 */

(function () {
  "use strict";

  var P = {
    whatsapp:
      '<path fill="currentColor" stroke="none" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    close: '<path d="M18 6 6 18M6 6l12 12"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    arrow: '<path d="M5 12h14M12 5l7 7-7 7"/>',
    pin: '<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
    navigate: '<path d="M3 11 22 2l-9 19-2-8-8-2z"/>',
    tamu: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
    kamar: '<path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8"/><path d="M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4"/><path d="M12 4v6M2 18h20"/>',
    "kamar-mandi": '<path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/><path d="M10 5 8 7M2 12h20M7 19v2M17 19v2"/>',
    musholla:
      '<path d="M12 2.5v1.5"/><path d="M7.5 11c0-3 2.2-4.6 4.5-6.2 2.3 1.6 4.5 3.2 4.5 6.2"/><path d="M6.5 11h11v10h-11z"/><path d="M10.5 21v-3.5a1.5 1.5 0 0 1 3 0V21"/><path d="M3.5 21V11.5l.75-2 .75 2V21M19 21V11.5l.75-2 .75 2V21"/><path d="M2 21h20"/>',
    dapur: '<path d="M2 12h20"/><path d="M20 12v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8"/><path d="m4 8 16-4"/><path d="m8.86 6.78-.45-1.81a2 2 0 0 1 1.45-2.43l1.94-.48a2 2 0 0 1 2.43 1.46l.45 1.8"/>',
    parkir: '<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/>',
    pemandangan: '<path d="m2 20 7-11 4 6 2.5-3.5L22 20z"/><circle cx="17.5" cy="5.5" r="2"/>',
    wifi: '<path d="M12 20h.01M2 8.82a15 15 0 0 1 20 0M5 12.86a10 10 0 0 1 14 0M8.5 16.43a5 5 0 0 1 7 0"/>',
    "air-hangat": '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
    taman: '<path d="M12 22v-7"/><path d="M9 9a3 3 0 1 1 6 0 3 3 0 0 1 1 5.83V15H8v-.17A3 3 0 0 1 9 9z"/><path d="M5 22h14"/>',
    teras: '<path d="M3 10 12 4l9 6"/><path d="M5 10v11M19 10v11M3 21h18M5 15h14M9 15v6M15 15v6"/>',
    kulkas: '<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M5 10h14M9 5v2M9 13v3"/>',
    tv: '<rect x="2" y="7" width="20" height="13" rx="2"/><path d="m17 2-5 5-5-5"/>',
    bbq: '<path d="M4 10h16a8 8 0 0 1-16 0z"/><path d="M8 18l-2 4M16 18l2 4M9 2c-.5 1 .5 2 0 3M12 2c-.5 1 .5 2 0 3M15 2c-.5 1 .5 2 0 3"/>',
    kolam: '<path d="M2 16c1.5 1 3 1 4.5 0s3-1 4.5 0 3 1 4.5 0 3-1 4.5 0M2 20c1.5 1 3 1 4.5 0s3-1 4.5 0 3 1 4.5 0 3-1 4.5 0"/><path d="M8 13V5a2 2 0 0 1 4 0M16 13V5a2 2 0 0 0-4 0M8 8h8"/>',
    calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18M9 16l2 2 4-4"/>',
    home: '<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
    chat: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22z"/><path d="M8 12h.01M12 12h.01M16 12h.01"/>',
    shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
    leaf: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>',
    tag: '<path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r="1.5" fill="currentColor"/>',
    camera: '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3z"/><circle cx="12" cy="13" r="3"/>',
  };

  // Alias supaya data lama (emoji) otomatis tampil sebagai ikon
  var ALIAS = {
    "🕌": "musholla", "🍳": "dapur", "🚗": "parkir", "🌄": "pemandangan",
    "📶": "wifi", "🔥": "air-hangat", "🛏️": "kamar", "🛁": "kamar-mandi",
    "👨‍👩‍👧‍👦": "tamu", "🌳": "taman", "📺": "tv", "🏊": "kolam",
  };

  function resolve(name) {
    if (!name) return null;
    if (P[name]) return name;
    if (ALIAS[name]) return ALIAS[name];
    return null;
  }

  function svg(name, cls) {
    var key = resolve(name);
    if (!key) return null;
    return (
      '<svg class="icon' + (cls ? " " + cls : "") + '" viewBox="0 0 24 24" fill="none" ' +
      'stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" ' +
      'aria-hidden="true" focusable="false">' + P[key] + "</svg>"
    );
  }

  /** Ikon kalau dikenali, kalau tidak kembalikan teks aslinya (misalnya emoji). */
  function svgOrText(name, cls) {
    return svg(name, cls) || '<span class="icon-text">' + (name || "") + "</span>";
  }

  function hydrate(root) {
    (root || document).querySelectorAll("[data-icon]").forEach(function (el) {
      var html = svg(el.getAttribute("data-icon"), el.getAttribute("data-icon-class"));
      if (html) el.outerHTML = html;
    });
  }

  window.ICON = { svg: svg, svgOrText: svgOrText, hydrate: hydrate };
})();
