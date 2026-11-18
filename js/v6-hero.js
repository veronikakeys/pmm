/* v6c: лента «CRM · заявки» в hero. Каждые ~3 с сверху появляется новая заявка
   (по кругу из трёх текстов live). При prefers-reduced-motion лента стоит,
   вне экрана и на скрытой вкладке ставится на паузу. */
(function () {
  var list = document.getElementById('v6Crm');
  if (!list) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var hero = list.closest('.sv-hero') || document.body;
  var visible = true;
  var timer = null;
  var STEP = 3000;

  function tick() {
    if (!visible || document.hidden) return;
    list.classList.remove('is-intro');
    var rows = list.children;
    var last = rows[rows.length - 1];
    var fresh = last.cloneNode(true);
    fresh.classList.add('is-fresh');
    var h = last.offsetHeight;
    list.insertBefore(fresh, rows[0]);
    list.style.transition = 'none';
    list.style.transform = 'translateY(' + -h + 'px)';
    void list.offsetHeight;
    list.style.transition = '';
    list.style.transform = '';
    window.setTimeout(function () {
      if (last.parentNode) last.parentNode.removeChild(last);
      fresh.classList.remove('is-fresh');
    }, 1400);
  }

  function start() { if (!timer) timer = window.setInterval(tick, STEP); }
  function stop() { window.clearInterval(timer); timer = null; }

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (e) {
      visible = e[0].isIntersecting;
      visible ? start() : stop();
    }).observe(hero);
  }
  document.addEventListener('visibilitychange', function () { document.hidden ? stop() : visible && start(); });
  window.setTimeout(start, 2600);
})();
