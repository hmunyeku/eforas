/* EFORAS chrome injector
   Injecte la navbar Axxess et le footer Axxess sur toutes les pages
   internes. Cherche un placeholder <div data-ef-header></div> et
   <div data-ef-footer></div> ; sinon, prepend/append au body.
*/
(function () {
  "use strict";

  // Nav identique à la home : 4 items courts pour cohérence visuelle Axxess
  var navItems = [
    { label: 'Services',     href: 'cabinet-etudes.html', caret: true },
    { label: 'Charte',       href: 'charte-independance.html', flame: true },
    { label: 'Institutionnel', href: 'a-propos.html', caret: true },
    { label: 'Engagement',   href: 'etudes.html', dot: true }
  ];

  function buildNav() {
    var here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    var html = '';
    navItems.forEach(function (it) {
      var active = (here === it.href.toLowerCase()) ? ' class="active"' : '';
      var prefix = '';
      if (it.flame) prefix = '<span class="ef-flame" aria-hidden="true"></span> ';
      if (it.dot) prefix = '<span class="ef-dot" aria-hidden="true"></span> ';
      var suffix = it.caret ? ' <span aria-hidden="true">▾</span>' : '';
      html += '<li><a href="' + it.href + '"' + active + '>' + prefix + it.label + suffix + '</a></li>';
    });
    return html;
  }

  function buildHeader() {
    return (
      '<div class="ef-navbar">' +
        '<button class="ef-burger" type="button" aria-label="Ouvrir le menu" aria-expanded="false">' +
          '<span></span><span></span><span></span>' +
        '</button>' +
        '<a href="index.html" class="eforas-logo" aria-label="EFORAS — Accueil">' +
          '<img src="img/logo-eforas.svg" class="eforas-logo-mark" width="52" height="52" alt="">' +
          '<span class="eforas-logo-text">' +
            '<strong>eforas</strong>' +
            '<em>Études, sondages, data</em>' +
          '</span>' +
        '</a>' +
        '<nav aria-label="Navigation principale">' +
          '<ul class="ef-nav">' + buildNav() + '</ul>' +
        '</nav>' +
        '<a class="ef-cta" href="contact.html">Demander un devis</a>' +
      '</div>' +
      '<section class="ef-notice-bar" aria-label="Annonces EFORAS">' +
        '<p><span aria-hidden="true">📊</span> <strong>Baromètre démocratique RDC</strong> — synthèse publique gratuite. <a href="etudes.html">Découvrir</a></p>' +
        '<p><span aria-hidden="true">⚖️</span> <strong>Charte d\'indépendance signée</strong> &amp; opposable. <a href="charte-independance.html">Lire</a></p>' +
      '</section>'
    );
  }

  function buildFooter() {
    var year = new Date().getFullYear();
    return (
      '<footer class="ef-footer-axxess">' +
        '<div class="ef-footer-row">' +
          '<span class="ef-isp" title="Cabinet d\'études RDC">EF</span>' +
          '<span class="ef-copy">© ' + year + ' EFORAS SARL — Kinshasa, RDC. Tous droits réservés.</span>' +
          '<a class="ef-support" href="contact.html">Contact &amp; Support</a>' +
          '<nav class="ef-socials" aria-label="Réseaux sociaux">' +
            '<a href="#" aria-label="Facebook"><svg viewBox="0 0 24 24"><path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.464.099 2.796.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.407 24 24 23.407 24 22.676V1.325C24 .593 23.407 0 22.675 0z"/></svg></a>' +
            '<a href="#" aria-label="X (Twitter)"><svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>' +
            '<a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg></a>' +
            '<a href="#" aria-label="YouTube"><svg viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>' +
            '<a href="#" aria-label="LinkedIn"><svg viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>' +
            '<a href="#" aria-label="WhatsApp"><svg viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.978-.607zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/></svg></a>' +
          '</nav>' +
          '<nav class="ef-legal" aria-label="Liens légaux">' +
            '<a href="mentions-legales.html">* Mentions légales</a>' +
            '<span aria-hidden="true">·</span>' +
            '<a href="charte-independance.html">Charte</a>' +
            '<span aria-hidden="true">·</span>' +
            '<a href="mentions-legales.html#confidentialite">Confidentialité</a>' +
          '</nav>' +
        '</div>' +
      '</footer>'
    );
  }

  function inject() {
    // Replace existing header/footer placeholders or prepend/append
    var headerSlot = document.querySelector('[data-ef-header]');
    var footerSlot = document.querySelector('[data-ef-footer]');

    if (headerSlot) {
      headerSlot.innerHTML = buildHeader();
    } else {
      // Try to find and replace existing .site-header
      var oldHeader = document.querySelector('header.site-header');
      var headerWrapper = document.createElement('div');
      headerWrapper.innerHTML = buildHeader();
      if (oldHeader) {
        oldHeader.parentNode.replaceChild(headerWrapper, oldHeader);
      } else {
        document.body.insertBefore(headerWrapper, document.body.firstChild);
      }
    }

    if (footerSlot) {
      footerSlot.innerHTML = buildFooter();
    } else {
      var oldFooter = document.querySelector('footer.site-footer');
      var footerWrapper = document.createElement('div');
      footerWrapper.innerHTML = buildFooter();
      if (oldFooter) {
        oldFooter.parentNode.replaceChild(footerWrapper, oldFooter);
      } else {
        document.body.appendChild(footerWrapper);
      }
    }

    // Body class for styling
    document.body.classList.add('ef-page', 'font-eforas-loaded');
    document.documentElement.classList.add('font-eforas-loaded');

    // Burger toggle
    var burger = document.querySelector('.ef-burger');
    var nav = document.querySelector('.ef-nav');
    if (burger && nav) {
      burger.addEventListener('click', function () {
        var open = burger.classList.toggle('is-open');
        nav.classList.toggle('is-open', open);
        burger.setAttribute('aria-expanded', String(open));
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
