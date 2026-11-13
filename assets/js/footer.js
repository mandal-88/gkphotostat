/*!
 * G.K. Photostat — Common footer component
 * Loaded right after <div id="site-footer"></div>. Uses window.GK from header.js.
 */
(function () {
  "use strict";

  var GK = window.GK;
  var mount = document.getElementById("site-footer");
  if (!GK || !mount) {
    return;
  }

  var year = new Date().getFullYear();

  var whatsappItem = GK.whatsappEnabled
    ? '<li><i class="bi bi-whatsapp" aria-hidden="true"></i><a href="https://wa.me/' + GK.whatsappNumber +
      '?text=' + encodeURIComponent("Hello G.K. Photostat, I have a printing enquiry.") +
      '" target="_blank" rel="noopener">Chat on WhatsApp</a></li>'
    : "";

  function shop(label, addressHtml, mapLink, phoneTel, phoneDisplay) {
    return (
      '<div class="footer-shop">' +
      '<h3><i class="bi bi-geo-alt-fill" aria-hidden="true"></i>' + label + "</h3>" +
      '<address class="mb-1">' + addressHtml + "</address>" +
      (phoneTel ? '<a class="d-block mb-1" href="tel:' + phoneTel + '"><i class="bi bi-telephone-fill" aria-hidden="true"></i> ' + phoneDisplay + "</a>" : "") +
      '<a href="' + mapLink + '" target="_blank" rel="noopener">View on Google Maps <i class="bi bi-arrow-up-right" aria-hidden="true"></i></a>' +
      "</div>"
    );
  }

  var html =
    '<footer class="site-footer">' +
    '<div class="footer-main"><div class="container"><div class="row g-4 g-lg-5">' +

    // Column 1 — brand
    '<div class="col-lg-4 col-md-6">' +
    '<a class="brand" href="index.html" aria-label="G.K. Photostat — Home"><span class="brand-mark" aria-hidden="true">GK</span>' +
    '<span><span class="brand-name">G.K. PHOTOSTAT</span><span class="brand-tag">Print · Copy · Stationery</span></span></a>' +
    '<p class="footer-about">Specialists in bulk photocopying for legal work — paper books, case files and court sets. Shops at the Delhi High Court, Jangpura &amp; Defence Colony.</p>' +
    '<ul class="footer-contact">' +
    '<li><i class="bi bi-telephone-fill" aria-hidden="true"></i><span><a href="tel:' + GK.phoneTel + '">' + GK.phoneDisplay + "</a>, " +
    '<a href="tel:' + GK.phone2Tel + '">' + GK.phone2Display + "</a></span></li>" +
    '<li><i class="bi bi-envelope-fill" aria-hidden="true"></i><a href="mailto:' + GK.email + '">' + GK.email + "</a></li>" +
    '<li><i class="bi bi-clock-fill" aria-hidden="true"></i><span>' + GK.hoursDays + ", " + GK.hoursTime + "</span></li>" +
    whatsappItem +
    "</ul>" +
    "</div>" +

    // Column 2 — quick links
    '<div class="col-lg-2 col-md-6 col-6">' +
    '<h2 class="footer-title">Quick Links</h2><ul class="footer-links">' +
    '<li><a href="index.html"><i class="bi bi-chevron-right" aria-hidden="true"></i>Home</a></li>' +
    '<li><a href="about-us.html"><i class="bi bi-chevron-right" aria-hidden="true"></i>About Us</a></li>' +
    '<li><a href="services.html"><i class="bi bi-chevron-right" aria-hidden="true"></i>Services</a></li>' +
    '<li><a href="gallery.html"><i class="bi bi-chevron-right" aria-hidden="true"></i>Gallery</a></li>' +
    '<li><a href="contact-us.html"><i class="bi bi-chevron-right" aria-hidden="true"></i>Contact Us</a></li>' +
    "</ul></div>" +

    // Column 3 — services
    '<div class="col-lg-2 col-md-6 col-6">' +
    '<h2 class="footer-title">Our Services</h2><ul class="footer-links">' +
    '<li><a href="services.html#legal-photocopy"><i class="bi bi-chevron-right" aria-hidden="true"></i>Bulk Legal Photocopy</a></li>' +
    '<li><a href="services.html#paper-book"><i class="bi bi-chevron-right" aria-hidden="true"></i>Paper Books</a></li>' +
    '<li><a href="services.html#spiral-binding"><i class="bi bi-chevron-right" aria-hidden="true"></i>Binding &amp; Court Sets</a></li>' +
    '<li><a href="services.html#other-services"><i class="bi bi-chevron-right" aria-hidden="true"></i>Printing &amp; Lamination</a></li>' +
    '<li><a href="services.html#fax"><i class="bi bi-chevron-right" aria-hidden="true"></i>Fax &amp; Stationery</a></li>' +
    "</ul></div>" +

    // Column 4 — contact
    '<div class="col-lg-4 col-md-6">' +
    '<h2 class="footer-title">Our Shops</h2>' +
    shop("Jangpura", "Shop No. 4, DDA Market, Opp. EROS Cinema,<br>Jangpura, New Delhi – 110024", GK.mapsLink) +
    shop("Defence Colony", "Defence Colony Flyover Market,<br>Defence Colony, Delhi", GK.maps2Link) +
    shop("Delhi High Court", GK.address3Line1 + ",<br>" + GK.address3Line2, GK.maps3Link, GK.phone3Tel, GK.phone3Display) +
    "</div>" +

    "</div></div></div>" +

    '<div class="footer-bottom"><div class="container d-flex flex-column flex-md-row justify-content-between gap-2">' +
    "<p class=\"mb-0\">&copy; " + year + " G.K. Photostat, New Delhi. All rights reserved.</p>" +
    '<p class="mb-0"><a href="index.html">Home</a> &middot; <a href="services.html">Services</a> &middot; <a href="contact-us.html">Contact</a></p>' +
    "</div></div>" +
    "</footer>" +

    '<button type="button" class="back-to-top" id="backToTop" aria-label="Back to top"><i class="bi bi-arrow-up" aria-hidden="true"></i></button>' +

    '<nav class="mobile-callbar" aria-label="Quick contact">' +
    '<a class="callbar-primary" href="tel:' + GK.phoneTel + '"><i class="bi bi-telephone-fill" aria-hidden="true"></i>Call Now</a>' +
    '<a href="' + GK.directionsLink + '" target="_blank" rel="noopener"><i class="bi bi-sign-turn-right-fill" aria-hidden="true"></i>Directions</a>' +
    "</nav>";

  mount.innerHTML = html;
})();
