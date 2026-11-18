/* Главная: лента кейсов (из макета v5) и aria-expanded у бургера */
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var rail = document.getElementById('dzRail');
  if (rail) {
    var btns = document.querySelectorAll('.dz-rail-btn');
    btns.forEach(function (b) {
      b.addEventListener('click', function () {
        var card = rail.querySelector('.dz-case');
        var step = card ? card.getBoundingClientRect().width + 20 : 360;
        rail.scrollBy({ left: Number(b.dataset.dir) * step, behavior: reduce ? 'auto' : 'smooth' });
      });
    });
    var sync = function () {
      if (btns.length < 2) return;
      var max = rail.scrollWidth - rail.clientWidth - 2;
      btns[0].disabled = rail.scrollLeft <= 2;
      btns[1].disabled = rail.scrollLeft >= max;
    };
    rail.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    sync();
  }

  var burger = document.getElementById('burger');
  var menu = document.getElementById('mobileMenu');
  if (burger && menu) {
    var syncAria = function () {
      var open = menu.classList.contains('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', open ? 'Закрыть меню' : 'Меню');
    };
    new MutationObserver(syncAria).observe(menu, { attributes: true, attributeFilter: ['class'] });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('open')) { burger.click(); burger.focus(); }
    });
    syncAria();
  }
})();

/* Цели Яндекс Метрики 69183895 (имена из v11): делегированный клик по ссылкам с data-goal.
   Переход по ссылке не блокируется; если счётчик не загрузился, ничего не происходит. */
(function () {
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[data-goal]');
    if (!a) return;
    try { if (typeof window.ym === 'function') window.ym(69183895, 'reachGoal', a.getAttribute('data-goal')); } catch (err) {}
  }, true);
})();
