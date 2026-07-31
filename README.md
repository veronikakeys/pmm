# Veronika Lab — Personal Landing (MVP)

Лендинг-портфолио Product Marketing / Growth.

**Дизайн-концепция:** Apple × Linear × Vercel (light)  
белый фон · тёмный текст · акценты forest green + warm brown  
воздух · минималистичная типографика · плавный motion

## Стек

- Чистый HTML / CSS / JS (без сборки)
- Google Fonts: Inter + JetBrains Mono
- Анимации: soft blur reveal, word-by-word, subtle parallax, cursor glow, magnetic buttons, restrained 3D tilt

## Запуск

```bash
cd ~/veronika-lab
# любой статический сервер, например:
python3 -m http.server 5173
# или
npx serve .
```

Открой: [http://localhost:5173](http://localhost:5173)

## Структура

```
veronika-lab/
├── index.html          # весь контент и секции
├── css/styles.css      # дизайн-система лаборатории
├── js/main.js          # интерактив
├── assets/lab/         # скачиваемые xlsx-шаблоны (AI Lab)
│   ├── 01_backlog_hypotheses_template.xlsx
│   ├── 02_channel_analytics_demo.xlsx
│   ├── 03_market_research_brief_template.xlsx
│   ├── 04_content_positioning_segments_template.xlsx
│   └── 05_team_capacity_template.xlsx
├── assets/lab-docs/    # исходники Google Sheets (не для паблика)
├── versions/           # cian / general сборки
└── README.md
```

### AI Lab (шаблоны)

Шесть обезличенных Excel-шаблонов в `#ai-lab` + визуальный CJM-preview:

1. Backlog & гипотезы  
2. Multi-channel analytics (demo)  
3. Market research brief  
4. Контент / позиционирование  
5. Team capacity + RACI  
6. **CJM · путь клиента** (7 листов: funnel, journey matrix, touchpoints, questions bank…)

Клиентские исходники и Miro PDF лежат только в `assets/lab-docs/`, на сайт не отдаются.

## Секции MVP

1. **Hero** — кто я, зачем, цифры, теги
2. **Process strip** — ограничения → точки роста → система → гипотезы → scale
3. **Lab Wall** — карточки экспериментов на стене
4. **Кейсы** — Challenge → Actions → Result → Learnings
5. **Опыт** — end-to-end, рынки, skills
6. **Метод** — research → scale + frameworks
7. **AI Lab** — tools / шаблоны (lead magnets)
8. **Обо мне** — личность, ценности, зоны роста
9. **Match** — чем полезна + competency bars
10. **Контакты**

## Что заменить перед отправкой HR

В `index.html` секция `#contact`:

- `mailto:hello@veronika.lab` → реальный email
- `https://t.me/` → Telegram
- `https://www.linkedin.com/` → LinkedIn

При желании добавь фото, PDF CV, точные метрики в кейсы.

## Следующие итерации (не в MVP)

- [ ] Реальные метрики в кейсах (с NDA-safe формулировками)
- [ ] Блог / заметки (MD → статическая генерация)
- [ ] Отдельные страницы экспериментов
- [ ] CMS или Notion-синк
- [ ] EN-версия
- [ ] Deploy: Vercel / Netlify / Cloudflare Pages
- [ ] OG-image и favicon
- [ ] Форма «match quiz» для hiring managers
