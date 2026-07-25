/* ==========================================================================
   B FREE — SITE MACHINERY
   Content now loads from content.json — edit that file (or use the
   /admin dashboard) instead of this one.
   ========================================================================== */

var SITE_CONTENT = null;

(function () {
  "use strict";

  function filled(v) {
    return typeof v === "string" && v.trim() !== "" && v.toUpperCase().indexOf("[FILL IN") === -1;
  }

  function byId(id) {
    return document.getElementById(id);
  }

  function isExternal(href) {
    return /^https?:\/\//i.test(href) || /^mailto:/i.test(href);
  }

  function linkAttrs(href) {
    return isExternal(href) ? ' target="_blank" rel="noopener"' : "";
  }

  function currentPage() {
    var p = window.location.pathname.split("/").pop();
    return p && p.indexOf(".html") !== -1 ? p : "index.html";
  }

  var SOCIAL_FULL  = { instagram: "Instagram", tiktok: "TikTok", youtube: "YouTube" };

  /* Simple line-icon glyphs (not the brand's official logo files) used in
     the compact nav bar so IG/TikTok/YouTube read as icons instead of
     letters. Each is a link straight to the matching URL in
     SITE_CONTENT.footer.socials. */
  var SOCIAL_ICONS = {
    instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="17.4" cy="6.6" r="1.15" fill="currentColor"/></svg>',
    tiktok: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M16.6 3h-3.2v12.4a3 3 0 1 1-2.1-2.86V9.32a6.2 6.2 0 1 0 5.3 6.14V9.9a7.6 7.6 0 0 0 4.2 1.27V8.06A4.4 4.4 0 0 1 16.6 3Z"/></svg>',
    youtube: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="5" width="20" height="14" rx="4" fill="none" stroke="currentColor" stroke-width="1.6"/><path fill="currentColor" d="M10.4 9.4v5.2l4.6-2.6-4.6-2.6Z"/></svg>'
  };

  function socialLinks(labels, cls) {
    var out = "";
    var socials = SITE_CONTENT.footer.socials;
    for (var key in socials) {
      if (filled(socials[key])) {
        out += '<a class="' + cls + '" href="' + socials[key] + '"' + linkAttrs(socials[key]) + ">" +
               labels[key] + "</a>";
      }
    }
    return out;
  }

  function socialIconLinks(cls) {
    var out = "";
    var socials = SITE_CONTENT.footer.socials;
    for (var key in socials) {
      if (filled(socials[key]) && SOCIAL_ICONS[key]) {
        out += '<a class="' + cls + '" href="' + socials[key] + '"' + linkAttrs(socials[key]) +
               ' aria-label="' + SOCIAL_FULL[key] + '">' + SOCIAL_ICONS[key] + "</a>";
      }
    }
    return out;
  }

  function renderNav() {
    var header = byId("site-header");
    if (!header) return;

    var current = currentPage();
    var links = "";
    for (var i = 0; i < SITE_CONTENT.nav.length; i++) {
      var item = SITE_CONTENT.nav[i];
      var active = item.href === current;
      links += '<a href="' + item.href + '" class="nav-link' + (active ? " active" : "") + '"' +
               (active ? ' aria-current="page"' : "") + ">" + item.label + "</a>";
    }

    header.innerHTML =
      '<div class="nav-inner">' +
        '<a class="brand" href="index.html">' + SITE_CONTENT.artistName + "</a>" +
        '<nav class="nav-links" aria-label="Primary">' +
          links +
          '<span class="nav-sep" aria-hidden="true"></span>' +
          socialIconLinks("nav-social") +
        "</nav>" +
        '<button class="nav-toggle" type="button" aria-expanded="false" aria-label="Open menu">' +
          "<span></span><span></span>" +
        "</button>" +
      "</div>";

    var menu = document.createElement("div");
    menu.className = "mobile-menu";
    menu.id = "mobile-menu";
    var menuLinks = "";
    for (var j = 0; j < SITE_CONTENT.nav.length; j++) {
      var m = SITE_CONTENT.nav[j];
      menuLinks += '<a href="' + m.href + '" class="mobile-link' +
                   (m.href === current ? " active" : "") + '">' + m.label + "</a>";
    }
    menu.innerHTML =
      '<nav class="mobile-links" aria-label="Menu">' + menuLinks + "</nav>" +
      '<div class="mobile-socials">' + socialLinks(SOCIAL_FULL, "mobile-social") + "</div>";
    document.body.appendChild(menu);

    var toggle = header.querySelector(".nav-toggle");
    toggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("menu-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && document.body.classList.contains("menu-open")) {
        toggle.click();
      }
    });

    if (document.body.getAttribute("data-page") !== "home") {
      header.classList.add("solid");
    }
    var onScroll = function () {
      header.classList.toggle("scrolled", window.scrollY > 24);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function renderFooter() {
    var footer = byId("site-footer");
    if (!footer) return;

    var f = SITE_CONTENT.footer;

    footer.innerHTML =
      '<div class="footer-inner">' +
        '<p class="footer-ghost" aria-hidden="true">' + SITE_CONTENT.artistName + "</p>" +
        '<div class="footer-grid">' +
          '<div class="footer-col">' +
            '<p class="eyebrow">Follow</p>' +
            '<div class="footer-socials">' + socialLinks(SOCIAL_FULL, "footer-social") + "</div>" +
          "</div>" +
        "</div>" +
        '<p class="footer-copy">' + f.copyright + "</p>" +
      "</div>";
  }

  function styledHeadline(text) {
    var words = text.trim().split(/\s+/);
    if (words.length === 1) {
      return '<span class="hollow">' + words[0] + "</span>";
    }
    var last = words.pop();
    return words.join(" ") + ' <span class="hollow">' + last + "</span>";
  }

  function renderHome() {
    var h = SITE_CONTENT.home;

    var eyebrow = byId("hero-eyebrow");
    if (eyebrow) eyebrow.textContent = SITE_CONTENT.location;

    var title = byId("hero-headline");
    if (title) title.innerHTML = styledHeadline(h.headline);

    var sub = byId("hero-subhead");
    if (sub) {
      sub.textContent = h.subhead;
      if (!filled(h.subhead)) sub.classList.add("is-todo");
    }

    var ctas = byId("hero-ctas");
    if (ctas) {
      ctas.innerHTML =
        '<a class="btn btn-primary" href="' + h.ctaPrimary.href + '">' + h.ctaPrimary.label + "</a>" +
        '<a class="btn btn-ghost" href="' + h.ctaSecondary.href + '">' + h.ctaSecondary.label + "</a>";
    }

    var marquee = byId("marquee-track");
    if (marquee && filled(SITE_CONTENT.music.currentSingle)) {
      var phrase = '<span class="marquee-item">' + SITE_CONTENT.music.currentSingle +
                   '</span><span class="marquee-dot" aria-hidden="true">&bull;</span>' +
                   '<span class="marquee-item">Out now</span>' +
                   '<span class="marquee-dot" aria-hidden="true">&bull;</span>';
      var group = '<div class="marquee-group">' + phrase + phrase + phrase + "</div>";
      marquee.innerHTML = group + '<div class="marquee-group" aria-hidden="true">' + phrase + phrase + phrase + "</div>";
    }
  }

  var PLATFORM_LABELS = {
    spotify: "Spotify",
    appleMusic: "Apple Music",
    youtube: "YouTube",
    soundcloud: "SoundCloud"
  };

  function renderMusic() {
    var m = SITE_CONTENT.music;

    var cover = byId("single-cover");
    if (cover) {
      if (filled(m.coverImage)) {
        cover.src = m.coverImage;
        cover.alt = filled(m.currentSingle) ? m.currentSingle + " cover art" : "Cover art";
        cover.hidden = false;
      } else {
        cover.hidden = true;
      }
    }

    var title = byId("single-title");
    if (title) title.textContent = m.currentSingle;

    var blurb = byId("single-blurb");
    if (blurb) {
      blurb.textContent = m.singleBlurb;
      if (!filled(m.singleBlurb)) blurb.classList.add("is-todo");
    }

    var list = byId("streaming-links");
    if (list) {
      var rows = "";
      for (var key in PLATFORM_LABELS) {
        var url = m.streamingLinks[key];
        if (url === undefined) continue;
        if (filled(url)) {
          rows += '<li><a class="stream-link" href="' + url + '"' + linkAttrs(url) + ">" +
                  '<span>' + PLATFORM_LABELS[key] + "</span>" +
                  '<span class="stream-arrow" aria-hidden="true">&#8599;</span></a></li>';
        } else {
          rows += '<li><span class="stream-link is-todo">' +
                  '<span>' + PLATFORM_LABELS[key] + "</span>" +
                  '<span class="stream-note">add link in content.json</span></span></li>';
        }
      }
      list.innerHTML = rows;
    }

    var discoGrid = byId("discography-grid");
    if (discoGrid) {
      var releases = m.previousReleases || [];
      var cards = "";
      for (var i = 0; i < releases.length; i++) {
        var r = releases[i];
        cards += '<a class="discography-item reveal" href="' + r.url + '"' + linkAttrs(r.url) + ">" +
          '<div class="discography-art"><img src="' + r.image + '" alt="' + r.title +
          ' cover art" loading="lazy"></div>' +
          '<p class="discography-name">' + r.title + "</p>" +
          '<p class="discography-meta">' + r.type + " &bull; " + r.year + "</p>" +
        "</a>";
      }
      discoGrid.innerHTML = cards;
    }
  }

  function renderStore() {
    var grid = byId("product-grid");
    if (!grid) return;

    var products = SITE_CONTENT.store.products;
    var cards = "";
    for (var i = 0; i < products.length; i++) {
      var p = products[i];
      var name = filled(p.name) ? p.name : p.name;
      var live = filled(p.buyLink);
      var media = '<img src="' + p.image + '" alt="' + (filled(p.name) ? p.name : "Product photo") +
                  '" loading="lazy">';

      cards +=
        '<article class="product reveal">' +
          (live
            ? '<a class="product-media" href="' + p.buyLink + '"' + linkAttrs(p.buyLink) + ">" + media + "</a>"
            : '<div class="product-media">' + media + "</div>") +
          '<div class="product-row">' +
            '<h3 class="product-name' + (filled(p.name) ? "" : " is-todo") + '">' + name + "</h3>" +
            '<p class="product-price' + (filled(p.price) ? "" : " is-todo") + '">' + p.price + "</p>" +
          "</div>" +
          (live
            ? '<a class="product-buy" href="' + p.buyLink + '"' + linkAttrs(p.buyLink) + '>Buy <span aria-hidden="true">&#8599;</span></a>'
            : '<span class="product-buy is-todo">Buy &mdash; add checkout link</span>') +
        "</article>";
    }
    grid.innerHTML = cards;
  }

  function renderAbout() {
    var a = SITE_CONTENT.about;

    var bio = byId("about-bio");
    if (bio) bio.textContent = a.bio;

    var list = byId("highlights");
    if (list) {
      var items = "";
      for (var i = 0; i < a.highlights.length; i++) {
        items += "<li>" + a.highlights[i] + "</li>";
      }
      list.innerHTML = items;
    }

    var press = byId("press-grid");
    if (press) {
      var photos = "";
      for (var j = 0; j < a.pressPhotos.length; j++) {
        photos += '<figure class="press-photo reveal"><img src="' + a.pressPhotos[j] +
                  '" alt="' + SITE_CONTENT.artistName + " press photo " + (j + 1) + '" loading="lazy"></figure>';
      }
      press.innerHTML = photos;
    }

    var email = byId("booking-email");
    if (email) {
      if (filled(a.booking.email)) {
        email.innerHTML = '<a class="btn btn-primary" href="mailto:' + a.booking.email + '">' +
                          a.booking.email + "</a>";
      } else {
        email.innerHTML = '<span class="btn btn-primary is-todo">' + a.booking.email + "</span>";
      }
    }

    var handles = byId("booking-handles");
    if (handles) {
      var rows = "";
      var b = a.booking;
      if (filled(b.instagram)) rows += '<li><span class="handle-label">Instagram</span><span>' + b.instagram + "</span></li>";
      if (filled(b.tiktok))    rows += '<li><span class="handle-label">TikTok</span><span>' + b.tiktok + "</span></li>";
      if (filled(b.youtube))   rows += '<li><span class="handle-label">YouTube</span><a href="' + b.youtube + '"' + linkAttrs(b.youtube) + ">Channel <span aria-hidden=\"true\">&#8599;</span></a></li>";
      handles.innerHTML = rows;
    }

    var epk = byId("epk-button");
    if (epk) {
      epk.setAttribute("href", a.epkDownload);
    }
  }

  function setupReveals() {
    var nodes = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      for (var i = 0; i < nodes.length; i++) nodes[i].classList.add("in");
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
          entries[i].target.classList.add("in");
          io.unobserve(entries[i].target);
        }
      }
    }, { threshold: 0.12, rootMargin: "0px 0px -5% 0px" });

    for (var j = 0; j < nodes.length; j++) {
      nodes[j].style.transitionDelay = (j % 4) * 70 + "ms";
      io.observe(nodes[j]);
    }
  }

  /* Builds the muted/looping YouTube background embed for the home hero,
     using the video ID set in content.json (home.heroYoutubeId). If that
     field is blank, the poster image just stays put.

     Browsers only allow autoplay when video starts muted, so it always
     loads silent. enablejsapi=1 lets the #hero-sound-toggle button send
     mute/unMute commands to the player via postMessage so a visitor can
     turn the sound on with one click. */
  function renderHeroVideo() {
    var wrap = byId("hero-video");
    if (!wrap) return;
    var id = SITE_CONTENT.home.heroYoutubeId;
    if (!filled(id)) return;

    var origin = window.location.origin;
    var src = "https://www.youtube-nocookie.com/embed/" + id +
      "?autoplay=1&mute=1&loop=1&playlist=" + id +
      "&controls=0&modestbranding=1&playsinline=1&rel=0&iv_load_policy=3" +
      "&enablejsapi=1&origin=" + encodeURIComponent(origin);

    var iframe = document.createElement("iframe");
    iframe.className = "hero-video-frame";
    iframe.id = "hero-video-frame";
    iframe.src = src;
    iframe.title = "Background video";
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("allow", "autoplay; encrypted-media; picture-in-picture");
    iframe.setAttribute("aria-hidden", "true");
    iframe.setAttribute("tabindex", "-1");
    wrap.appendChild(iframe);

    var toggle = byId("hero-sound-toggle");
    var icon = byId("hero-sound-icon") || (toggle && toggle.querySelector(".hero-sound-icon"));
    if (!toggle) return;

    var muted = true;
    var sendCommand = function (func) {
      if (!iframe.contentWindow) return;
      iframe.contentWindow.postMessage(JSON.stringify({ event: "command", func: func, args: [] }), "*");
    };

    toggle.addEventListener("click", function () {
      muted = !muted;
      sendCommand(muted ? "mute" : "unMute");
      toggle.classList.toggle("is-unmuted", !muted);
      toggle.setAttribute("aria-pressed", String(!muted));
      toggle.setAttribute("aria-label", muted ? "Unmute background video" : "Mute background video");
      if (icon) icon.innerHTML = muted ? "&#128263;" : "&#128266;";
    });
  }

  function init() {
    renderNav();
    renderFooter();

    var page = document.body.getAttribute("data-page");
    if (page === "home")  renderHome();
    if (page === "music") renderMusic();
    if (page === "store") renderStore();
    if (page === "about") renderAbout();

    setupReveals();
    renderHeroVideo();
  }

  function boot() {
    fetch("content.json")
      .then(function (res) { return res.json(); })
      .then(function (data) {
        SITE_CONTENT = data;
        init();
      })
      .catch(function (e) {
        console.error("Could not load content.json", e);
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
