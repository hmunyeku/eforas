/* EFORAS chrome injector v3 — fetch des PARTIALS HTML partagés
   Garantit que le navbar et le footer des pages internes sont
   STRICTEMENT IDENTIQUES à ceux de la home (même source HTML).
*/
(function () {
  "use strict";

  function loadPartial(url) {
    return fetch(url, { cache: 'no-store' })
      .then(function (r) { return r.ok ? r.text() : ''; })
      .catch(function () { return ''; });
  }

  function inject() {
    var headerSlot = document.querySelector('[data-ef-header]');
    var footerSlot = document.querySelector('[data-ef-footer]');

    // HEADER (navbar + notice)
    if (headerSlot) {
      loadPartial('partials/header.html').then(function (html) {
        if (html) headerSlot.outerHTML = html;
      });
    }

    // FOOTER (ISP + copyright + socials + legal)
    if (footerSlot) {
      loadPartial('partials/footer.html').then(function (html) {
        if (html) footerSlot.outerHTML = html;
      });
    }

    // Classes globales pour CSS cascade
    document.body.classList.add('ef-page', 'font-eforas-loaded');
    document.documentElement.classList.add('font-eforas-loaded');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
