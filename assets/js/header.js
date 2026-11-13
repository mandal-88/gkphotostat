/*!
 * G.K. Photostat — Common header component
 * Loaded synchronously right after <div id="site-header"></div> so the header
 * renders before page content (no layout flash). Also defines the shared
 * business details used by footer.js and custom.js.
 */
(function () {
  "use strict";

  // ---- Single source of truth for business details -------------------------
  document.documentElement.classList.add("js-enabled");

  var GK = (window.GK = {
    name: "G.K. Photostat",
    phoneDisplay: "+91 98719 84737",
    phoneTel: "+919871984737",
    phone2Display: "+91 97111 80051",
    phone2Tel: "+919711180051",
    email: "gkphotostat@gmail.com",
    addressLine1: "Shop No. 4, DDA Market, Opposite EROS Cinema",
    addressLine2: "Jangpura, Block M, Jungpura Extension",
    addressLine3: "New Delhi, Delhi – 110024",
    addressFull:
      "Shop No. 4, DDA Market, Opposite EROS Cinema, Jangpura, Block M, Jungpura Extension, New Delhi, Delhi – 110024",
    hoursDays: "Mon – Sat",
    hoursTime: "10:00 AM – 9:00 PM",
    // WhatsApp number that receives contact-form enquiries (country code + number, no "+").
    whatsappEnabled: true,
    whatsappNumber: "+919871984737",
    // Second shop
    address2Line1: "Defence Colony Flyover Market",
    address2Line2: "New Delhi",
    address2Full: "Defence Colony Flyover Market, New Delhi.",
    // Third shop — Delhi High Court (Lawyers Chamber Block III)
    address3Line1: "K-301, 3rd Floor, LCB-III",
    address3Line2: "Delhi High Court, New Delhi – 110003",
    address3Full: "K-301, 3rd Floor, LCB-III, Delhi High Court, New Delhi",
    phone3Display: "+91 81303 24703",
    phone3Tel: "+918130324703",
  });

  var mapsQuery = encodeURIComponent(
    "G.K. Photostat, Shop No. 4, DDA Market, Opposite EROS Cinema, Jangpura, New Delhi 110024",
  );
  GK.mapsLink = "https://www.google.com/maps/search/?api=1&query=" + mapsQuery;
  GK.directionsLink =
    "https://www.google.com/maps/dir/?api=1&destination=" + mapsQuery;

  var maps2Query = encodeURIComponent(
    "G.K. Photostat, Defence Colony Flyover Market, Defence Colony, Delhi",
  );
  GK.maps2Link =
    "https://www.google.com/maps/search/?api=1&query=" + maps2Query;
  GK.directions2Link =
    "https://www.google.com/maps/dir/?api=1&destination=" + maps2Query;

  var maps3Query = encodeURIComponent("Delhi High Court, New Delhi 110003");
  GK.maps3Link =
    "https://www.google.com/maps/search/?api=1&query=" + maps3Query;
  GK.directions3Link =
    "https://www.google.com/maps/dir/?api=1&destination=" + maps3Query;

  var navItems = [
    { id: "home", label: "Home", href: "index.html" },
    { id: "about", label: "About Us", href: "about-us.html" },
    { id: "services", label: "Services", href: "services.html" },
    { id: "gallery", label: "Gallery", href: "gallery.html" },
    { id: "contact", label: "Contact Us", href: "contact-us.html" },
  ];

  var current = document.body.getAttribute("data-page") || "";

  function desktopLinks() {
    return navItems
      .map(function (item) {
        var active = item.id === current;
        return (
          '<li class="nav-item"><a class="nav-link' +
          (active ? " active" : "") +
          '" href="' +
          item.href +
          '"' +
          (active ? ' aria-current="page"' : "") +
          ">" +
          item.label +
          "</a></li>"
        );
      })
      .join("");
  }

  function mobileLinks() {
    return navItems
      .map(function (item) {
        var active = item.id === current;
        return (
          '<li><a class="nav-link' +
          (active ? " active" : "") +
          '" href="' +
          item.href +
          '"' +
          (active ? ' aria-current="page"' : "") +
          ">" +
          item.label +
          ' <i class="bi bi-chevron-right" aria-hidden="true"></i></a></li>'
        );
      })
      .join("");
  }

  var brand =
    '<a class="brand" href="index.html" aria-label="G.K. Photostat — Home">' +
    '<span class="brand-mark" aria-hidden="true">GK</span>' +
    '<span><span class="brand-name">G.K. PHOTOSTAT</span><span class="brand-tag">Print · Copy · Stationery</span></span>' +
    "</a>";

  var html =
    '<div class="site-header-bar">' +
    '<div class="topbar" role="region" aria-label="Shop information">' +
    '<div class="container d-flex justify-content-between align-items-center flex-wrap gap-2">' +
    '<ul class="topbar-list">' +
    '<li><i class="bi bi-geo-alt-fill" aria-hidden="true"></i>Jangpura · Defence Colony · Delhi High Court</li>' +
    '<li><i class="bi bi-clock-fill" aria-hidden="true"></i>Mon-Sat: 10:00 AM – 9:00 PM</li>' +
    "</ul>" +
    '<ul class="topbar-list topbar-contact">' +
    '<li><a href="tel:' +
    GK.phoneTel +
    '"><i class="bi bi-telephone-fill" aria-hidden="true"></i>' +
    GK.phoneDisplay +
    "</a></li>" +
    '<li><a href="mailto:' +
    GK.email +
    '"><i class="bi bi-envelope-fill" aria-hidden="true"></i>' +
    GK.email +
    "</a></li>" +
    "</ul>" +
    "</div></div>" +
    '<nav class="navbar navbar-expand-lg site-navbar" aria-label="Main navigation">' +
    '<div class="container">' +
    brand +
    '<button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#mobileMenu" aria-controls="mobileMenu" aria-label="Open menu">' +
    '<i class="bi bi-list" aria-hidden="true"></i></button>' +
    '<div class="collapse navbar-collapse justify-content-end">' +
    '<ul class="navbar-nav main-nav align-items-lg-center me-lg-3">' +
    desktopLinks() +
    "</ul>" +
    '<a class="btn btn-gk-primary btn-call" href="tel:' +
    GK.phoneTel +
    '"><i class="bi bi-telephone-fill" aria-hidden="true"></i>Call Now</a>' +
    "</div></div></nav>" +
    "</div>" +
    '<div class="offcanvas offcanvas-end gk-offcanvas" tabindex="-1" id="mobileMenu" aria-labelledby="mobileMenuLabel">' +
    '<div class="offcanvas-header">' +
    '<span id="mobileMenuLabel">' +
    brand +
    "</span>" +
    '<button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close menu"></button>' +
    "</div>" +
    '<div class="offcanvas-body d-flex flex-column">' +
    '<ul class="list-unstyled mobile-nav mb-4">' +
    mobileLinks() +
    "</ul>" +
    '<a class="btn btn-gk-primary w-100 mb-2" href="tel:' +
    GK.phoneTel +
    '"><i class="bi bi-telephone-fill" aria-hidden="true"></i>Call ' +
    GK.phoneDisplay +
    "</a>" +
    '<a class="btn btn-gk-outline w-100 mb-2" href="' +
    GK.directionsLink +
    '" target="_blank" rel="noopener"><i class="bi bi-sign-turn-right-fill" aria-hidden="true"></i>Directions – Jangpura</a>' +
    '<a class="btn btn-gk-outline w-100 mb-2" href="' +
    GK.directions2Link +
    '" target="_blank" rel="noopener"><i class="bi bi-sign-turn-right-fill" aria-hidden="true"></i>Directions – Defence Colony</a>' +
    '<a class="btn btn-gk-outline w-100 mb-4" href="' +
    GK.directions3Link +
    '" target="_blank" rel="noopener"><i class="bi bi-sign-turn-right-fill" aria-hidden="true"></i>Directions – Delhi High Court</a>' +
    '<div class="offcanvas-contact mt-auto">' +
    '<p class="mb-2"><i class="bi bi-geo-alt-fill" aria-hidden="true"></i>DDA Market, Opp. EROS Cinema, Jangpura, New Delhi.</p>' +
    '<p class="mb-2"><i class="bi bi-geo-alt-fill" aria-hidden="true"></i>' +
    GK.address2Full +
    "</p>" +
    '<p class="mb-2"><i class="bi bi-geo-alt-fill" aria-hidden="true"></i>' +
    GK.address3Full +
    ' (<a href="tel:' +
    GK.phone3Tel +
    '">' +
    GK.phone3Display +
    "</a>)</p>" +
    '<p class="mb-2"><i class="bi bi-envelope-fill" aria-hidden="true"></i><a href="mailto:' +
    GK.email +
    '">' +
    GK.email +
    "</a></p>" +
    '<p class="mb-0"><i class="bi bi-clock-fill" aria-hidden="true"></i>' +
    GK.hoursDays +
    ", " +
    GK.hoursTime +
    "</p>" +
    "</div></div></div>";

  var mount = document.getElementById("site-header");
  if (mount) {
    mount.innerHTML = html;
  }
})();
