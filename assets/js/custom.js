/*!
 * G.K. Photostat — Site interactions
 * Requires: jQuery, Bootstrap bundle, header.js (window.GK), footer.js
 */
(function ($) {
  "use strict";

  var GK = window.GK || {};
  var $win = $(window);
  var $nav = $(".site-navbar");
  var $headerBar = $(".site-header-bar");

  /* ---------------------------------------------------------------
     Sticky header state + shared nav height (used by sticky sub-nav)
     --------------------------------------------------------------- */
  function updateHeader() {
    var scrolled = $win.scrollTop() > 40;
    $nav.toggleClass("is-scrolled", scrolled);
    if ($headerBar.length) {
      // Whole sticky header (topbar + navbar) height, used by the sticky sub-nav
      var h = $headerBar.outerHeight();
      document.documentElement.style.setProperty("--gk-nav-h", h + "px");
      document.documentElement.style.setProperty("--gk-sticky-h", h + 12 + "px");
    }
    $("#backToTop").toggleClass("is-visible", $win.scrollTop() > 500);
  }
  $win.on("scroll resize", updateHeader);
  updateHeader();

  /* ---------------------------------------------------------------
     Back to top
     --------------------------------------------------------------- */
  $(document).on("click", "#backToTop", function () {
    $("html, body").animate({ scrollTop: 0 }, 500);
  });

  /* ---------------------------------------------------------------
     Smooth scrolling for same-page anchors (offset for sticky bars)
     --------------------------------------------------------------- */
  function stickyOffset() {
    var offset = ($headerBar.outerHeight() || 0) + 12;
    var $sub = $(".service-nav");
    if ($sub.length) {
      offset += $sub.outerHeight();
    }
    return offset;
  }

  $(document).on("click", 'a[href^="#"]:not([href="#"])', function (e) {
    var target = this.getAttribute("href");
    var $target = $(target);
    if (!$target.length) {
      return;
    }
    e.preventDefault();
    $("html, body").animate({ scrollTop: $target.offset().top - stickyOffset() }, 550);
    if (history.replaceState) {
      history.replaceState(null, "", target);
    }
  });

  // Correct the landing position when arriving at services.html#section from another page
  if (window.location.hash && $(".service-nav").length) {
    var $initial = $(window.location.hash);
    if ($initial.length) {
      $win.on("load", function () {
        window.scrollTo(0, $initial.offset().top - stickyOffset());
      });
    }
  }

  /* ---------------------------------------------------------------
     Close the mobile offcanvas menu when a link is chosen
     --------------------------------------------------------------- */
  $(document).on("click", "#mobileMenu .nav-link", function () {
    var el = document.getElementById("mobileMenu");
    var instance = window.bootstrap && bootstrap.Offcanvas.getInstance(el);
    if (instance) {
      instance.hide();
    }
  });

  /* ---------------------------------------------------------------
     Scroll reveal animations
     --------------------------------------------------------------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    $(revealEls).addClass("is-visible");
  }

  /* ---------------------------------------------------------------
     Services page: highlight the sub-navigation for the visible section
     --------------------------------------------------------------- */
  var $serviceLinks = $(".service-nav .nav-link");
  if ($serviceLinks.length) {
    var $sections = $(".service-detail");
    var spy = function () {
      var pos = $win.scrollTop() + stickyOffset() + 40;
      var currentId = "";
      $sections.each(function () {
        if ($(this).offset().top <= pos) {
          currentId = this.id;
        }
      });
      $serviceLinks.removeClass("active").removeAttr("aria-current");
      if (currentId) {
        var $active = $serviceLinks.filter('[href="#' + currentId + '"]');
        $active.addClass("active").attr("aria-current", "true");
        var navEl = $active.closest(".nav")[0];
        if (navEl && $active[0]) {
          var left = $active[0].offsetLeft - 24;
          if (left < navEl.scrollLeft || left > navEl.scrollLeft + navEl.clientWidth - 120) {
            navEl.scrollLeft = left;
          }
        }
      }
    };
    $win.on("scroll", spy);
    spy();
  }

  /* ---------------------------------------------------------------
     Gallery: filters + lightbox
     --------------------------------------------------------------- */
  var $gallery = $(".gallery-grid");
  if ($gallery.length) {
    $(".gallery-filters").on("click", ".btn", function () {
      var filter = $(this).data("filter");
      $(this).addClass("active").attr("aria-pressed", "true")
        .siblings().removeClass("active").attr("aria-pressed", "false");
      $gallery.find(".gallery-item").each(function () {
        var show = filter === "all" || $(this).data("category") === filter;
        $(this).toggleClass("is-hidden", !show);
      });
    });

    var modalEl = document.getElementById("lightboxModal");
    var modal = modalEl ? new bootstrap.Modal(modalEl) : null;
    var $lbImg = $("#lightboxImage");
    var $lbTitle = $("#lightboxTitle");
    var visibleItems = [];
    var index = 0;

    var show = function (i) {
      if (!visibleItems.length) {
        return;
      }
      index = (i + visibleItems.length) % visibleItems.length;
      var $card = $(visibleItems[index]).find(".gallery-card");
      $lbImg.attr({ src: $card.data("full"), alt: $card.find("img").attr("alt") });
      $lbTitle.text($card.data("title"));
    };

    $gallery.on("click", ".gallery-card", function () {
      visibleItems = $gallery.find(".gallery-item:not(.is-hidden)").toArray();
      show(visibleItems.indexOf($(this).closest(".gallery-item")[0]));
      if (modal) {
        modal.show();
      }
    });
    $(".lightbox-prev").on("click", function () { show(index - 1); });
    $(".lightbox-next").on("click", function () { show(index + 1); });
    $(document).on("keydown", function (e) {
      if (!modalEl || !modalEl.classList.contains("show")) {
        return;
      }
      if (e.key === "ArrowLeft") { show(index - 1); }
      if (e.key === "ArrowRight") { show(index + 1); }
    });
  }

  /* ---------------------------------------------------------------
     Contact form — validation + honest submission handling.
     No backend is connected, so nothing is "sent" from the browser.
     When WhatsApp is activated (GK.whatsappEnabled), the enquiry opens
     in WhatsApp pre-filled; otherwise the visitor is asked to call.
     --------------------------------------------------------------- */
  var $form = $("#enquiryForm");
  if ($form.length) {
    var $status = $("#formStatus");
    var $waBtn = $("#whatsappSubmit");

    if (!GK.whatsappEnabled) {
      $waBtn.html('<i class="bi bi-whatsapp" aria-hidden="true"></i>Continue on WhatsApp <span class="badge-pending">Requires activation</span>');
    }

    var mobileValid = function (value) {
      var digits = value.replace(/[\s\-()]/g, "").replace(/^(\+?91|0)/, "");
      return /^[6-9]\d{9}$/.test(digits);
    };

    var validateField = function (field) {
      var $f = $(field);
      var value = String($f.val() || "").trim();
      var ok = field.checkValidity();
      if (field.id === "mobile" && value) {
        ok = mobileValid(value);
        field.setCustomValidity(ok ? "" : "Please enter a valid 10-digit Indian mobile number.");
      }
      if (field.id === "fullName" && value && value.length < 2) {
        ok = false;
      }
      $f.toggleClass("is-invalid", !ok).toggleClass("is-valid", ok && value !== "");
      return ok;
    };

    $form.on("blur change", "input, select, textarea", function () {
      validateField(this);
    });
    $form.on("input", ".is-invalid", function () {
      validateField(this);
    });

    $form.on("submit", function (e) {
      e.preventDefault();
      var valid = true;
      $form.find("input, select, textarea").each(function () {
        if (!validateField(this)) {
          valid = false;
        }
      });
      if (!valid) {
        $form.find(".is-invalid").first().trigger("focus");
        $status.removeClass("is-visible");
        return;
      }

      var data = {
        name: String($("#fullName").val() || "").trim(),
        mobile: String($("#mobile").val() || "").trim(),
        email: String($("#email").val() || "").trim(),
        service: $("#service").val(),
        message: String($("#message").val() || "").trim()
      };

      var text =
        "Hello G.K. Photostat,\n\n" +
        "Name: " + data.name + "\n" +
        "Mobile: " + data.mobile + "\n" +
        (data.email ? "Email: " + data.email + "\n" : "") +
        "Service required: " + data.service + "\n" +
        "Message: " + data.message;

      if (GK.whatsappEnabled) {
        var waUrl = "https://wa.me/" + GK.whatsappNumber + "?text=" + encodeURIComponent(text);
        var waWin = window.open(waUrl, "_blank");
        if (waWin) {
          waWin.opener = null;
        } else {
          // Popup blocked (common on mobile browsers) — open WhatsApp in the same tab
          window.location.href = waUrl;
        }
        $form[0].reset();
        $form.find(".is-valid, .is-invalid").removeClass("is-valid is-invalid");
        $status
          .attr("class", "form-status status-success is-visible")
          .html('<strong>WhatsApp opened with your details.</strong> Please press <em>Send</em> in WhatsApp to deliver your enquiry. You can also call us on <a href="tel:' + GK.phoneTel + '">' + GK.phoneDisplay + "</a>.");
      } else {
        $status
          .attr("class", "form-status status-info is-visible")
          .html(
            "<strong>Your details have not been sent.</strong> Online enquiries are not active yet, so please call us " +
            "and mention your requirement (" + $("<span>").text(data.service).html() + "). We’re open " + GK.hoursDays + ", " + GK.hoursTime + ".<br>" +
            '<a class="btn btn-gk-navy btn-sm" href="tel:' + GK.phoneTel + '"><i class="bi bi-telephone-fill" aria-hidden="true"></i>Call ' + GK.phoneDisplay + "</a>"
          );
      }
      $status[0].scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  }
})(jQuery);
