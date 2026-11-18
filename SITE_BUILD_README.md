# Главная: продакшен-сборка по макету v5 (18.11.2026, MSK)

Источник: design/home-draft.html + draft.css (v5). Ничего не опубликовано.

- index.html; css/fonts.css (Inter + JetBrains Mono, self-host woff2, cyrillic+latin, font-display: swap), css/styles.css и services.css (v11, изменён только порядок стека --font: Inter первым), css/draft.css (макет v5 без изменений), css/home.css (правки сборки); js/main.js (v11), js/home.js (лента кейсов из макета, aria-expanded/Esc у бургера); assets/ (только используемые файлы).
- Форматы: блок «Что делаю» убран во всех 4 карточках; строки на subgrid (6 строк) на десктопе, 2×2 на 901–1100 и в свайп-ленте на телефоне.
- Добавлено: skip-link «К содержанию», canonical/OG/Twitter, apple-touch-icon, preload шрифта и hero-фото, новая OG-картинка assets/og/og.jpg (1200×630, под H1).
- Убрано из макета: noindex, подключение Google Fonts.

18.11, 16:10 MSK: подключена Яндекс Метрика 69183895 (код и noscript из v11 без изменений); цели v11 tg_header, tg_hero, tg_final, tg_sticky через data-goal + делегированный клик в js/home.js. Добавлены robots.txt, sitemap.xml (только главная), 404.html (пути от корня, noindex).
Для выкладки: статический хостинг с HTTPS на https://vovchinnikova.ru/, отдача 404.html на несуществующие адреса (настройка хостинга), редирект /services/ -> / (в v11 был services/index.html с JS-редиректом; в этой сборке его нет). Форм на странице нет: все CTA ведут в Telegram.
При открытии через file:// Chrome пишет в консоль CORS-ошибку на preload шрифта (особенность file://); по http(s) ошибок 0.
