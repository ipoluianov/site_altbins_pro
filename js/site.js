// Shared page behaviour: copy buttons, latest-release info, OS detection.
(function () {
  // Copy buttons: <button data-copy="element-id">
  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var src = document.getElementById(btn.dataset.copy);
      if (!src || !navigator.clipboard) return;
      navigator.clipboard.writeText(src.textContent.trim()).then(function () {
        btn.classList.add('copy-btn--copied');
        setTimeout(function () { btn.classList.remove('copy-btn--copied'); }, 1500);
      });
    });
  });

  // Partner card: show "Download started" when a download is clicked
  var promo = document.querySelector('[data-promo]');
  if (promo) {
    document.querySelectorAll('.file-row .btn, .download-card .btn, [data-copy="install-cmd"]').forEach(function (el) {
      el.addEventListener('click', function () {
        promo.classList.add('promo--started');
        promo.classList.remove('promo--pulse');
        void promo.offsetWidth; // restart the animation
        promo.classList.add('promo--pulse');
      });
    });
  }

  // Screenshot viewer: <a class="screenshot" href="full.png" data-zoom>
  var shots = Array.prototype.slice.call(document.querySelectorAll('[data-zoom]'));
  if (shots.length && window.HTMLDialogElement) {
    var dlg = document.createElement('dialog');
    dlg.className = 'zoom';
    dlg.tabIndex = -1;
    dlg.innerHTML = '<img alt="">' +
      '<button class="zoom__btn zoom__close" type="button" aria-label="Close">&times;</button>' +
      '<button class="zoom__btn zoom__prev" type="button" aria-label="Previous">&lsaquo;</button>' +
      '<button class="zoom__btn zoom__next" type="button" aria-label="Next">&rsaquo;</button>';
    document.body.appendChild(dlg);
    var big = dlg.querySelector('img');
    var prev = dlg.querySelector('.zoom__prev');
    var next = dlg.querySelector('.zoom__next');
    var current = 0;
    var show = function (i) {
      current = (i + shots.length) % shots.length;
      big.src = shots[current].href;
      big.alt = shots[current].querySelector('img').alt;
    };
    prev.hidden = next.hidden = shots.length < 2;
    shots.forEach(function (a, i) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        show(i);
        dlg.showModal();
        dlg.focus(); // keep the focus ring off the close button
      });
    });
    prev.addEventListener('click', function (e) { e.stopPropagation(); show(current - 1); });
    next.addEventListener('click', function (e) { e.stopPropagation(); show(current + 1); });
    dlg.addEventListener('click', function () { dlg.close(); });
    dlg.addEventListener('keydown', function (e) {
      if (shots.length < 2) return;
      if (e.key === 'ArrowLeft') show(current - 1);
      if (e.key === 'ArrowRight') show(current + 1);
    });
  }

  // Highlight the visitor's OS: <a data-os="windows|macos|linux">
  var osCards = document.querySelectorAll('[data-os]');
  if (osCards.length) {
    var p = ((navigator.userAgentData && navigator.userAgentData.platform) ||
             navigator.platform || navigator.userAgent).toLowerCase();
    var os = /win/.test(p) ? 'windows'
           : /mac/.test(p) && !('ontouchend' in document) ? 'macos'
           : /linux|x11/.test(p) && !/android/.test(navigator.userAgent.toLowerCase()) ? 'linux'
           : '';
    osCards.forEach(function (el) {
      if (el.dataset.os === os) el.classList.add('os-card--detected');
    });
  }

  // Latest release of <body data-repo="owner/name">:
  //   [data-release-version]  gets the tag and is unhidden
  //   [data-asset="regex"]    gets the asset's download URL as href
  //   [data-asset-name="re"]  gets the asset's file name
  //   [data-asset-size="re"]  gets the asset's size
  var repo = document.body.dataset.repo;
  if (!repo) return;

  function formatSize(bytes) {
    return bytes >= 1048576 ? (bytes / 1048576).toFixed(1) + ' MB'
                            : Math.max(1, Math.round(bytes / 1024)) + ' KB';
  }

  fetch('https://api.github.com/repos/' + repo + '/releases/latest')
    .then(function (res) { return res.ok ? res.json() : Promise.reject(res.status); })
    .then(function (release) {
      var assets = release.assets || [];
      function find(re) {
        var rx = new RegExp(re, 'i');
        for (var i = 0; i < assets.length; i++) if (rx.test(assets[i].name)) return assets[i];
        return null;
      }

      document.querySelectorAll('[data-release-version]').forEach(function (el) {
        el.textContent = release.tag_name;
        el.hidden = false;
      });
      document.querySelectorAll('[data-asset]').forEach(function (el) {
        var a = find(el.dataset.asset);
        if (a) el.href = a.browser_download_url;
      });
      document.querySelectorAll('[data-asset-name]').forEach(function (el) {
        var a = find(el.dataset.assetName);
        if (a) el.textContent = a.name;
      });
      document.querySelectorAll('[data-asset-size]').forEach(function (el) {
        var a = find(el.dataset.assetSize);
        if (a) el.textContent = formatSize(a.size);
      });
    })
    .catch(function () { /* keep the static fallback links */ });
})();
