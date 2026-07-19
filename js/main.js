/* Il Vecchio Forno di Affori — Via Astesani 15, Milano.
   Sopra: PLUMBING_V 2 dal boilerplate del Toolkit, adattato nella sola
   costante SITE. Sotto il marcatore: il codice-firma — i due pannelli del
   nome che si avvicinano, come le due insegne attorno allo spigolo.
   ⚠️ La firma agisce SOLO su `transform`: senza GSAP i pannelli restano
   al loro posto, perfettamente visibili. */

(function () {
  'use strict';
  var root = document.documentElement;
  root.classList.add('js');
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) root.classList.add('reduced-motion');

  /* ══════════ CONFIG PER-SITO ══════════ */
  var SITE = {
    slug: 'vecchio-forno-affori',
    whatsapp: { number: '', message: '', ids: [] },
    /* orari letti a schermo (19/7/2026): domenica chiuso, lun–ven doppia
       finestra, sabato SOLO mattina.
       ⚠️ Su Maps risultano aggiornati «da altre persone», non dal titolare:
       da riconfermare col cliente prima del pitch. */
    hours: {
      0: [],
      1: [['06:30', '13:30'], ['16:30', '19:30']],
      2: [['06:30', '13:30'], ['16:30', '19:30']],
      3: [['06:30', '13:30'], ['16:30', '19:30']],
      4: [['06:30', '13:30'], ['16:30', '19:30']],
      5: [['06:30', '13:30'], ['16:30', '19:30']],
      6: [['06:30', '13:30']],
    },
    hoursStatusId: 'orarioStato',
    hoursTableSelector: '[data-day]',
    todayClass: 'is-today',
    introId: 'intro',
    introDuration: 1500,
    revealSelector: '.reveal',
    inViewClass: 'in-view',
    breakpointMenu: 960,
    EN: {
      'skip': 'Skip to content',
      'brand.aria': 'Il Vecchio Forno di Affori, back to top',
      'burger.aria': 'Open menu',
      'lang.aria': 'Passa all’italiano',
      'lang.txt': 'IT',
      'nav.pane': 'The bread', 'nav.past': 'Pastry', 'nav.feste': 'Christmas',
      'nav.voci': 'Reviews', 'nav.dove': 'Find us', 'nav.cta': 'Call',

      'nome.1': 'The Old Bakery of',
      'hero.nota': 'On the building the name sits on two signs, one either side of the corner. You read it as you walk.',
      'hero.cit': '“It was my bakery when I was a girl. […] I came back after years and found the very same quality. <strong>It has stayed exactly the same.</strong>”',
      'hero.cite': 'Celeste, Google review',
      'hero.rating': 'from 67 reviews',

      'pane.eyebrow': 'The bread',
      'pane.h': 'Still good<br>the next day.',
      'pane.p1': 'It is the detail that keeps coming back in the reviews, and it is not a figure of speech: bread bought in the morning is still itself the day after. The person who wrote it was comparing it with the bread of twenty years earlier.',
      'pane.p2': 'On the counter there is bread for every taste — plain, <strong>wholemeal</strong>, <strong>multigrain</strong> — alongside focaccia and pizza. A <strong>charcoal black bread</strong> has appeared in the window too.',
      'pane.cap': 'Via Astesani 15, the shopping street of Affori.',

      'past.eyebrow': 'Pastry',
      'past.h': 'Made on the premises.<br>It is painted on the glass.',
      'past.sub': 'Not a slogan: it is written on the front door. The cakes are made here and ordered at the counter.',
      'past.p1': 'These are the two that come up first on their listing, but the window changes with the seasons and the occasions.',
      'past.p2': 'On cakes to order, one true anecdote is worth telling: a customer rang asking for <strong>a cake for fifteen people, for that same day</strong>, and they made it.',
      'past.tip': 'For a cake with lettering or a particular decoration, a few days ahead is better. But it is always worth asking.',

      'feste.eyebrow': 'At Christmas',
      'feste.h': 'The sign<br>gets longer.',
      'feste.p1': 'In the weeks around the holidays a yellow sheet written in marker pen appears in the window, and the list grows long: <strong>filled panettoni</strong>, savoury panettoni, canapés and vol-au-vents, tiramisù, chocolate houses.',
      'feste.p2': 'Of the one-kilo artisan panettone a customer writes that it was “really delicious, full of flavour and <strong>not too sweet</strong>”.',
      'feste.p3': 'And one line on the sign says everything about the trade: bread orders are taken <strong>only if special</strong> — stars, trees, comets, pan focaccia, milk rolls.',
      'feste.nota': 'Photograph of their own sign taken in the shop: the Christmas list should be confirmed each year.',
      'feste.cap': 'The Christmas sign, handwritten and taped to the door.',

      'voci.eyebrow': 'Google reviews',
      'voci.h': '4.5 out of 67.',
      'v1.p': '“It was my bakery when I was a child and a girl. The best products in Affori… from the focaccia to the fragrant bread, which the next day was still delicious. I came back after years and found the very same quality.”',
      'v1.c': 'Celeste, Local Guide',
      'v2.p': '“This shop is a real paradise of bread and cakes! When you walk in you are greeted by the kindest assistants, always smiling. Sara above all is always sweet, kind and willing to help with anything.”',
      'v2.c': 'Cherry Flyning',
      'v3.p': '“Without a doubt, the best bakery in Affori. Bread for every taste, including wholemeal and multigrain. Quality cakes for every occasion, good and genuine baked goods.”',
      'v3.c': 'Nicola Barreca',
      'v4.p': '“I called yesterday to ask for a cake for 15 people for that same day and despite the short notice they managed it, making a beautiful cake that everybody loved! Thank you so much.”',
      'v4.c': 'Chiara Ferri',
      'v5.p': '“We got a one-kilo artisan panettone for Christmas, really delicious, full of flavour and not too sweet. Lovely, helpful staff.”',
      'v5.c': 'Yle Mura',
      'v6.p': '“What a wonderful discovery this pastry shop in Affori is!”',
      'v6.c': 'Deb P.',

      'vetr.eyebrow': 'From outside', 'vetr.h': 'The two signs.',
      'vetr.a1': 'Enlarge: the shopfront',
      'vetr.a2': 'Enlarge: the signs on the door',
      'vetr.a3': 'Enlarge: the Mimosa cake',
      'vetr.nota': 'There are few public photos and none show the counter: these are the verified ones. The bakery deserves a proper shoot.',

      'dove.eyebrow': 'Where we are', 'dove.h': 'Via Astesani 15,<br>Affori.',
      'dove.serv': 'Take away · card payments accepted',
      'dove.cta': 'Call the bakery',
      'dove.maptitle': 'Map: Il Vecchio Forno di Affori, Via Astesani 15, Milan',
      'd.lun': 'Monday', 'd.mar': 'Tuesday', 'd.mer': 'Wednesday', 'd.gio': 'Thursday',
      'd.ven': 'Friday', 'd.sab': 'Saturday', 'd.dom': 'Sunday',
      'd.sabora': '6:30–13:30, mornings only', 'd.chiuso': 'closed',

      'faq.h': 'Questions',
      'f1.q': 'What time do you open?',
      'f1.a': 'Monday to Friday 6:30–13:30 and 16:30–19:30. Saturday mornings only, 6:30–13:30. We are closed on Sunday.',
      'f2.q': 'Can I order a cake?',
      'f2.a': 'Yes, the pastry is made on the premises. A few days ahead is better, although they have managed a cake for fifteen people on the same day.',
      'f3.q': 'What bread do you make?',
      'f3.a': 'Plain bread and bread for every taste, including wholemeal and multigrain, plus focaccia and pizza. A charcoal black bread has appeared in the window too.',
      'f4.q': 'Do you make panettone?',
      'f4.a': 'At Christmas yes: one-kilo artisan panettone, filled panettoni and savoury ones. For those it is best to order ahead.',
      'f5.q': 'Where exactly are you?',
      'f5.a': 'Via Alessandro Astesani 15, in Affori. The sign is split across two panels around the corner of the building: “Il Vecchio Forno di” on one, “Affori” on the other.',

      'foot.orari': 'Mon–Fri 6:30–13:30 and 16:30–19:30',
      'foot.sab': 'Saturday mornings only · closed Sunday',
      'foot.demo': 'Demo website made by',
      'ab.call': 'Call', 'ab.map': 'Find us', 'lb.close': 'Close',
    },
  };
  /* ═════════════════════════════════════════════════════════════════ */

  if (SITE.whatsapp.number) {
    var waHref = 'https://wa.me/' + SITE.whatsapp.number + '?text=' + encodeURIComponent(SITE.whatsapp.message);
    SITE.whatsapp.ids.forEach(function (id) {
      var el = document.getElementById(id);
      if (el) { el.href = waHref; el.target = '_blank'; el.rel = 'noopener'; }
    });
  }

  /* ---------- GSAP: registrazione IMMEDIATA + reveal + watchdog ---------- */
  var hasGsap = typeof gsap !== 'undefined';
  var hasST = hasGsap && typeof ScrollTrigger !== 'undefined';
  if (hasST) gsap.registerPlugin(ScrollTrigger);

  function showAllReveals() {
    var els = document.querySelectorAll(SITE.revealSelector);
    els.forEach(function (el) { el.classList.add(SITE.inViewClass); });
    if (hasGsap) {
      if (hasST) {
        els.forEach(function (el) {
          ScrollTrigger.getAll().forEach(function (st) { if (st.trigger === el && !st.progress) st.kill(); });
        });
      }
      gsap.set(els, { opacity: 1, y: 0, x: 0 });
    }
  }
  setTimeout(function () { if (!hasGsap || reducedMotion) showAllReveals(); }, 1500);

  if (hasGsap && !reducedMotion) {
    gsap.utils.toArray(SITE.revealSelector).forEach(function (el) {
      gsap.fromTo(el, { opacity: 0, y: 24 }, {
        opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', immediateRender: false,
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      });
    });
  } else if ('IntersectionObserver' in window && !reducedMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add(SITE.inViewClass); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(SITE.revealSelector).forEach(function (el) { io.observe(el); });
  } else {
    showAllReveals();
  }

  /* ---------- FIRMA (definita PRIMA del blocco intro) ----------
     Il plumbing cattura `window.bespokeHeroEntrance` quando monta l'intro:
     se la si definisse più in basso verrebbe catturata la funzione vuota.
     I due pannelli del nome partono staccati e si accostano, come le due
     insegne che si compongono mentre cammini lungo il marciapiede.
     Solo `x`/`transform`: nessuna opacità, quindi non possono sparire. */
  window.bespokeHeroEntrance = function () {
    if (!hasGsap || reducedMotion) return;
    var p1 = document.querySelector('.np-1');
    var p2 = document.querySelector('.np-2');
    if (!p1 || !p2) return;
    gsap.from(p1, { x: -40, duration: 0.9, ease: 'power3.out' });
    gsap.from(p2, { x: 46, duration: 0.9, ease: 'power3.out', delay: 0.12 });
  };

  /* ---------- intro ---------- */
  var intro = document.getElementById(SITE.introId);
  var heroEntrance = window.bespokeHeroEntrance || function () {};
  function hideIntro() {
    if (!intro) return;
    var el = intro; intro = null;
    el.classList.add('hide');
    setTimeout(function () { el.remove(); }, 700);
    heroEntrance();
  }
  function killIntroNow() {
    if (!intro) return;
    var el = intro; intro = null;
    el.remove();
    heroEntrance();
  }
  if (reducedMotion || !intro) {
    if (intro) { intro.remove(); intro = null; }
    heroEntrance();
  } else {
    setTimeout(hideIntro, SITE.introDuration);
    setTimeout(hideIntro, 6000);
    intro.addEventListener('click', hideIntro);
  }

  /* ---------- burger ---------- */
  var burger = document.getElementById('burger');
  var nav = document.getElementById('mainNav');
  if (burger && nav) {
    var lastFocus = null;
    var closeNav = function () {
      nav.classList.remove('nav-open');
      burger.setAttribute('aria-expanded', 'false');
      if (lastFocus) { lastFocus.focus(); lastFocus = null; }
    };
    var openNav = function () {
      killIntroNow();
      lastFocus = document.activeElement;
      nav.classList.add('nav-open');
      burger.setAttribute('aria-expanded', 'true');
      var first = nav.querySelector('a, button');
      if (first) first.focus();
    };
    burger.addEventListener('click', function () {
      nav.classList.contains('nav-open') ? closeNav() : openNav();
    });
    nav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeNav); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('nav-open')) closeNav();
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > SITE.breakpointMenu) closeNav();
    });
  }

  /* ---------- lightbox ---------- */
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxClose = document.getElementById('lightboxClose');
  if (lightbox && lightboxImg) {
    var opener = null;
    var openLb = function (src, alt) {
      lightboxImg.src = src; lightboxImg.alt = alt || '';
      lightbox.hidden = false;
      document.body.style.overflow = 'hidden';
      if (lightboxClose) lightboxClose.focus();
    };
    var closeLb = function () {
      lightbox.hidden = true; lightboxImg.src = '';
      document.body.style.overflow = '';
      if (opener) { opener.focus(); opener = null; }
    };
    document.querySelectorAll('[data-full]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        opener = btn;
        var img = btn.querySelector('img');
        openLb(btn.getAttribute('data-full'), img ? img.alt : '');
      });
    });
    if (lightboxClose) lightboxClose.addEventListener('click', closeLb);
    lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLb(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !lightbox.hidden) closeLb(); });
  }

  /* ---------- orari dinamici Europe/Rome (doppia finestra) ---------- */
  function romeNow() {
    try {
      var f = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Rome', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false });
      var p = f.formatToParts(new Date());
      var map = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
      var get = function (t) { return p.find(function (x) { return x.type === t; }).value; };
      return { day: map[get('weekday')], mins: parseInt(get('hour'), 10) * 60 + parseInt(get('minute'), 10) };
    } catch (e) {
      var d = new Date();
      return { day: d.getDay(), mins: d.getHours() * 60 + d.getMinutes() };
    }
  }
  var toMin = function (hm) { var a = hm.split(':'); return parseInt(a[0], 10) * 60 + parseInt(a[1], 10); };
  var fmt = function (m) { m = m % 1440; return ('0' + Math.floor(m / 60)).slice(-2) + ':' + ('0' + (m % 60)).slice(-2); };
  var DAYS_IT = ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'];
  var DAYS_EN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  function hoursState() {
    var now = romeNow();
    var wins = SITE.hours[now.day] || [];
    for (var i = 0; i < wins.length; i++) {
      var s = toMin(wins[i][0]), e = toMin(wins[i][1]);
      if (now.mins >= s && now.mins < Math.min(e, 1440)) return { open: true, day: now.day, closesAt: fmt(e) };
    }
    var prev = (now.day + 6) % 7;
    var pw = SITE.hours[prev] || [];
    for (var j = 0; j < pw.length; j++) {
      var pe = toMin(pw[j][1]);
      if (pe > 1440 && now.mins < pe - 1440) return { open: true, day: prev, closesAt: fmt(pe) };
    }
    for (var k = 0; k < wins.length; k++) {
      if (now.mins < toMin(wins[k][0])) return { open: false, day: now.day, opensToday: fmt(toMin(wins[k][0])) };
    }
    for (var d = 1; d <= 7; d++) {
      var nd = (now.day + d) % 7;
      var nw = SITE.hours[nd] || [];
      if (nw.length) return { open: false, day: now.day, opensDay: nd, opensAt: fmt(toMin(nw[0][0])) };
    }
    return { open: false, day: now.day };
  }

  function renderHours() {
    var el = document.getElementById(SITE.hoursStatusId);
    var st = hoursState();
    document.querySelectorAll(SITE.hoursTableSelector).forEach(function (row) {
      row.classList.toggle(SITE.todayClass, parseInt(row.getAttribute('data-day'), 10) === st.day);
    });
    if (!el) return;
    var en = root.lang === 'en';
    var txt;
    if (st.open) txt = (en ? 'Open now' : 'Aperto ora') + ' · ' + (en ? 'closes at ' : 'chiude alle ') + st.closesAt;
    else if (st.opensToday) txt = (en ? 'Closed · opens today at ' : 'Chiuso · apre oggi alle ') + st.opensToday;
    else if (st.opensAt !== undefined) txt = (en ? 'Closed · opens ' + DAYS_EN[st.opensDay] + ' at ' : 'Chiuso · apre ' + DAYS_IT[st.opensDay] + ' alle ') + st.opensAt;
    else txt = en ? 'Closed' : 'Chiuso';
    el.textContent = txt;
  }
  renderHours();
  setInterval(renderHours, 60000);

  /* ---------- i18n overlay ---------- */
  var originals = {};
  var I18N_ATTRS = [
    ['data-i18n', null],
    ['data-i18n-aria', 'aria-label'],
    ['data-i18n-alt', 'alt'],
    ['data-i18n-placeholder', 'placeholder'],
    ['data-i18n-title', 'title'],
  ];
  function setLang(lang) {
    root.lang = lang === 'en' ? 'en' : 'it';
    I18N_ATTRS.forEach(function (pair) {
      var dattr = pair[0], target = pair[1];
      if (!originals[dattr]) originals[dattr] = {};
      document.querySelectorAll('[' + dattr + ']').forEach(function (el) {
        var key = el.getAttribute(dattr);
        var store = originals[dattr];
        if (!(key in store)) store[key] = target ? el.getAttribute(target) : el.innerHTML;
        var val = lang === 'en' && SITE.EN[key] !== undefined ? SITE.EN[key] : store[key];
        if (target) el.setAttribute(target, val); else el.innerHTML = val;
      });
    });
    renderHours();
    try { localStorage.setItem(SITE.slug + '-lang', lang); } catch (e) {}
  }
  var langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.addEventListener('click', function () { setLang(root.lang === 'en' ? 'it' : 'en'); });
  }
  try { if (localStorage.getItem(SITE.slug + '-lang') === 'en') setLang('en'); } catch (e) {}

  /* ---------- action-bar mobile ---------- */
  var actionBar = document.getElementById('actionBar');
  if (actionBar) {
    var onScroll = function () {
      actionBar.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.6);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ══════════ FINE PLUMBING — sotto, il resto della firma ══════════ */

  var header = document.getElementById('header');
  if (header) {
    var headerScroll = function () { header.classList.toggle('scrolled', window.scrollY > 10); };
    window.addEventListener('scroll', headerScroll, { passive: true });
    headerScroll();
  }
})();
