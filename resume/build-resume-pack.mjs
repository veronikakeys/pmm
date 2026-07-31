import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle, LevelFormat, ExternalHyperlink } from "docx";
import fs from "fs";

const borderBottom = {
  bottom: { style: BorderStyle.SINGLE, size: 12, color: "2F6B4F", space: 1 },
};

const h1 = (text) =>
  new Paragraph({
    spacing: { before: 0, after: 120 },
    border: borderBottom,
    children: [new TextRun({ text, bold: true, size: 32, font: "Arial", color: "1C1917" })],
  });

const h2 = (text) =>
  new Paragraph({
    spacing: { before: 280, after: 100 },
    children: [new TextRun({ text, bold: true, size: 24, font: "Arial", color: "2F6B4F" })],
  });

const h3 = (text) =>
  new Paragraph({
    spacing: { before: 200, after: 60 },
    children: [new TextRun({ text, bold: true, size: 22, font: "Arial", color: "1C1917" })],
  });

const p = (text, opts = {}) =>
  new Paragraph({
    spacing: { after: 80 },
    children: [new TextRun({ text, size: 20, font: "Arial", color: "292524", ...opts })],
  });

const muted = (text) =>
  new Paragraph({
    spacing: { after: 60 },
    children: [new TextRun({ text, size: 18, font: "Arial", color: "78716C", italics: true })],
  });

const bullet = (text, ref = "bullets") =>
  new Paragraph({
    numbering: { reference: ref, level: 0 },
    spacing: { after: 40 },
    children: [new TextRun({ text, size: 20, font: "Arial", color: "292524" })],
  });

const jobHead = (role, company, dates, loc) => [
  new Paragraph({
    spacing: { before: 160, after: 20 },
    children: [
      new TextRun({ text: role, bold: true, size: 21, font: "Arial" }),
      new TextRun({ text: `  ·  ${dates}`, size: 18, font: "Arial", color: "78716C" }),
    ],
  }),
  new Paragraph({
    spacing: { after: 60 },
    children: [new TextRun({ text: `${company}  ·  ${loc}`, size: 18, font: "Arial", color: "57534E" })],
  }),
];

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 20 } } },
  },
  numbering: {
    config: [
      {
        reference: "bullets",
        levels: [
          {
            level: 0,
            format: LevelFormat.BULLET,
            text: "•",
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 420, hanging: 240 } } },
          },
        ],
      },
      {
        reference: "bullets2",
        levels: [
          {
            level: 0,
            format: LevelFormat.BULLET,
            text: "•",
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 420, hanging: 240 } } },
          },
        ],
      },
      {
        reference: "bullets3",
        levels: [
          {
            level: 0,
            format: LevelFormat.BULLET,
            text: "•",
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 420, hanging: 240 } } },
          },
        ],
      },
      {
        reference: "bullets4",
        levels: [
          {
            level: 0,
            format: LevelFormat.BULLET,
            text: "•",
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 420, hanging: 240 } } },
          },
        ],
      },
      {
        reference: "bullets5",
        levels: [
          {
            level: 0,
            format: LevelFormat.BULLET,
            text: "•",
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 420, hanging: 240 } } },
          },
        ],
      },
      {
        reference: "bullets6",
        levels: [
          {
            level: 0,
            format: LevelFormat.BULLET,
            text: "•",
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 420, hanging: 240 } } },
          },
        ],
      },
      {
        reference: "weak",
        levels: [
          {
            level: 0,
            format: LevelFormat.BULLET,
            text: "•",
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 420, hanging: 240 } } },
          },
        ],
      },
    ],
  },
  sections: [
    {
      properties: {
        page: {
          size: { width: 11906, height: 16838 },
          margin: { top: 720, right: 720, bottom: 720, left: 720 },
        },
      },
      children: [
        // ========== PART 0: HR VERDICT ==========
        h1("0. Вердикт уставшего HR (200 откликов)"),
        muted("По СТАРОМУ Google Doc резюме. Вакансию ты не вставила — оценка «как есть»."),
        h3("Дочитала бы до конца?"),
        p(
          "Скорее нет. Первый абзац — мягкая биография «начинала с офлайна… сильные стороны: системность, эмпатия». На 15-й секунде глаз ищет цифры и title match. Их мало, компании есть — но impact размыт. Закрыла бы после Brainhub или Colife, если не ищу edtech/real estate."
        ),
        h3("Что режет глаз сразу"),
        bullet("Summary без цифр и без целевой роли (PMM? Lead? Growth?).", "weak"),
        bullet("«7 лет» vs «4+ PMM» — звучит junior-middle, хотя кейсы сильнее.", "weak"),
        bullet("C0, CR, ДРР, пп — жаргон без расшифровки; C0 не все HR знают.", "weak"),
        bullet("Порядок опыта: It's AI внизу при 2024–2025 — хронология ломается.", "weak"),
        bullet("Brainhub: «прокачала стрессоустойчивость» — мило, но не hiring signal.", "weak"),
        bullet("Colife: сильные цифры, но 2023–2023 = 1 год? Выглядит как hop.", "weak"),
        bullet("English B1 при UAE/Istanbul/It's AI US-UK — red flag для international.", "weak"),
        bullet("Нет Aparthomes (Пхукет) — крайний ownership отсутствует.", "weak"),
        h3("Что звучит слабо"),
        bullet("«Запустила 2 канала» — какие? бюджет? результат в лидах?", "weak"),
        bullet("«Сократила % простоя» — без baseline.", "weak"),
        bullet("«Запустила 3 новых продукта» — что изменилось в выручке?", "weak"),
        bullet("It's AI: «строю с 0» без одной метрики PMF.", "weak"),
        h3("Что лишнее"),
        bullet("Интересы web3/SaaS/sport в том же блоке, что skills — шум.", "weak"),
        bullet("Длинный soft-intro. Эмодзи/улыбки в bullets.", "weak"),
        bullet("Дубли кейсов без привязки к компании (на сайте уже сильнее).", "weak"),

        // ========== PART 1: NEW CV ==========
        new Paragraph({ children: [], spacing: { before: 400 } }),
        h1("1. Резюме (переписано) — Senior PMM / Growth Lead"),
        muted(
          "Целевая вилка 300–400k ₽. Под конкретную вакансию — пришли JD, заточу keywords. Не выдумано: только твои факты + цифры из Notion/старого CV."
        ),

        new Paragraph({
          spacing: { before: 200, after: 40 },
          children: [new TextRun({ text: "Вероника Овчинникова", bold: true, size: 36, font: "Arial" })],
        }),
        new Paragraph({
          spacing: { after: 40 },
          children: [
            new TextRun({
              text: "Product Marketing Manager  ·  Growth Marketing Lead",
              size: 22,
              font: "Arial",
              color: "2F6B4F",
              bold: true,
            }),
          ],
        }),
        new Paragraph({
          spacing: { after: 120 },
          children: [
            new TextRun({ text: "veronikasergeevna17@yandex.ru  ·  ", size: 18, font: "Arial", color: "57534E" }),
            new TextRun({ text: "t.me/veronikakeys  ·  ", size: 18, font: "Arial", color: "57534E" }),
            new TextRun({ text: "linkedin.com/in/vovchinnikova", size: 18, font: "Arial", color: "57534E" }),
          ],
        }),

        h2("Profile"),
        p(
          "Product Marketing & Growth с 8+ годами в digital: GTM на рынках РФ, Турции, ОАЭ и Таиланда; CRO и pricing; сбор и координация команд до ~10 человек (in-house + подрядчики). Считаю unit-экономику, веду эксперименты end-to-end (research → launch → funnel → sales enablement). Сильнее всего — когда нужно запустить канал/рынок/продукт и довести до измеримого результата."
        ),
        p(
          "Измеримые результаты: конверсия сайта 2,3%→4,6% (×2); ДРР −5 п.п.; средний чек проектирования +50%; GTM ОАЭ — unit-экономика тестового запуска сошлась; multi-channel growth в real estate (Phuket)."
        ),

        h2("Опыт"),

        ...jobHead(
          "Marketing / Growth Lead",
          "Aparthomes — агентство недвижимости",
          "2025 — present",
          "Phuket, Thailand · remote-friendly"
        ),
        bullet("Владела маркетинговым контуром: Telegram, email, SMM, SEO + paid (контекст, таргет, TG-закупы).", "bullets"),
        bullet(
          "Собрала и координировала команду: in-house (email, SMM, ассистент TG/контент, SEO) и подрядчики (креатив, закупки, таргет, дизайн) — до ~10 человек в пике.",
          "bullets"
        ),
        bullet(
          "Построила Telegram как систему лидогенерации и прогрева (ассистент + закупки + креатив); метрики и бюджет — NDA, готова раскрыть на собеседовании.",
          "bullets"
        ),
        bullet(
          "Приоритизировала каналы: в части — заметный рост; честно фиксировала, где не хватило ресурса довести до scale.",
          "bullets"
        ),

        ...jobHead(
          "Product Marketing Manager",
          "It's AI — AI-детектор текста (AI vs human)",
          "2024 — 2025",
          "US / UK market · remote"
        ),
        bullet("Строила маркетинг 0→1: стратегия, команда, трафик, аналитика.", "bullets2"),
        bullet("Искала PMF: custdev, первые платящие пользователи, цикл гипотез.", "bullets2"),
        bullet("Работала с англоязычными рынками US/UK (продукт и коммуникация).", "bullets2"),

        ...jobHead(
          "Lead of Marketing",
          "Brainhub — онлайн-школа программирования для детей",
          "2023 — 2024",
          "Москва"
        ),
        bullet("Разработала стратегию привлечения; запустила 2 новых канала лидогенерации.", "bullets3"),
        bullet("Ресерч рынка, конкурентов; глубинные интервью с ЦА.", "bullets3"),
        bullet(
          "Переупаковала продукт и позиционирование: C0 ×2, CR в покупку +5 п.п.",
          "bullets3"
        ),
        bullet("Гипотезы retention/вовлечённости учеников; инициировала продуктовые изменения.", "bullets3"),

        ...jobHead(
          "Product Marketing Manager",
          "Colife — сервис аренды жилья",
          "2023",
          "Стамбул · Дубай"
        ),
        p("Стамбул:", { bold: true, size: 19 }),
        bullet("Собрала команду маркетинга; запустила лидген (таргет, посевы, Instagram).", "bullets4"),
        bullet("Конверсия сайта ×2,5; сократила % простоя объектов.", "bullets4"),
        p("Дубай:", { bold: true, size: 19 }),
        bullet("Лиды +200%: гипотезы, CRO, масштаб и новые каналы.", "bullets4"),
        bullet("С командой — рост выручки в несезон.", "bullets4"),

        ...jobHead(
          "Project / Product Marketing Manager",
          "Remont.io — ремонтный холдинг",
          "2020 — 2022",
          "Москва · Дубай"
        ),
        bullet(
          "Вывела проект ремонта/дизайна на рынок ОАЭ (LP turnkeyd.com): research, команда, аналитика, paid; тестовый запуск — 6 лидов → 2 замера → 1 продажа, unit-экономика сошлась.",
          "bullets5"
        ),
        bullet("ДРР −5 п.п.; конверсия в целевой лид 2,3%→4,6% (A/B, 3 мес., Flagman-линейка).", "bullets5"),
        bullet("Запуск премиум-линейки: ДРР старта 10%, средний чек 750k ₽ (×2 к среднему по компании).", "bullets5"),
        bullet("Запустила 3 новых продукта; менторила junior по интерфейсам и воронкам.", "bullets5"),

        ...jobHead(
          "Product Marketing Manager",
          "De Club — студия дизайна интерьеров",
          "2019 — 2022",
          "Москва"
        ),
        bullet("Средний чек проектирования +50% (цена за м²); sales enablement и портфолио ≥100 м².", "bullets6"),
        bullet("Контент-система + Instagram @de_club_ru: первая продажа из IG за 9 мес., лиды +10%.", "bullets6"),
        bullet("Прокачка конверсий по воронке AARRR; рекорд продаж в конце года.", "bullets6"),

        h2("Ключевые навыки"),
        p(
          "GTM · Positioning & Messaging · Value Proposition · Growth experiments · CRO / A/B · Funnel & lifecycle · Telegram & multi-channel leadgen · CustDev / JTBD / CJM · Unit-экономика · Team lead (5 in-house + contractors) · GA / Metrica / Sheets · SQL (base) · Figma · AI (ChatGPT, Claude, Cursor)"
        ),

        h2("Образование и курсы"),
        bullet("ЮФУ, Бизнес-информатика, 2019 (красный диплом).", "weak"),
        bullet("GoPractice — Activation Framework, 2025.", "weak"),
        bullet("Product University — Product Management, 2020; Udacity Product Design, 2020.", "weak"),
        bullet("Google Academy for Ads (Ads & Analytics), 2019.", "weak"),
        p("English: B1 (рабочий reading/writing; speaking — в прокачке). Готова к remote RU/CIS; international — с оговоркой по языку."),

        // ========== PART 2: VACANCY NOTE ==========
        h1("2. Под конкретную вакансию"),
        p(
          "В запросе блок [вакансия] пустой. Когда пришлёшь текст JD — сделаю: keyword map «их требование → мой bullet», вторую версию CV на 1 страницу и subject line для отклика."
        ),
        p("Пока резюме заточено под: Senior PMM / Growth Marketing Lead / Marketing Lead (hands-on), 300–400k ₽."),

        // ========== PART 3: WEIGHTY BULLETS EXAMPLE ==========
        h1("3. Как превращать «обязанности» в вес"),
        muted("Шаблон: Глагол + что сделала + масштаб (рынок/команда/бюджет) + результат (цифра или NDA)."),
        h3("Было → стало (примеры)"),
        p("Было: «Занималась лидогенерацией»"),
        p("Стало: «Запустила multi-channel лидген (TG, paid, SMM): команда 5+подрядчики; метрики TG — NDA, готовы на call»."),
        p("Было: «Улучшала сайт»"),
        p("Стало: «Провела A/B за 3 мес.: CR в целевой лид 2,3%→4,6%; ДРР −5 п.п. на таргете без внешних изменений»."),
        p("Было: «Работала с командой»"),
        p("Стало: «Собрала и вела контур до ~10 человек (email, SMM, SEO, ассистент + context/target/design подряд)»."),
        h3("Какие цифры добавить (если вспомнишь / можно)"),
        bullet("Месячный ad spend (порядок), CAC, CPL, CR lead→sale", "weak"),
        bullet("Размер команды FTE vs подряд; бюджет найма", "weak"),
        bullet("Выручка / pipeline / % простоя (Colife) baseline→after", "weak"),
        bullet("It's AI: # платящих, conversion waitlist→paid", "weak"),

        // ========== PART 4: COVER LETTER ==========
        h1("4. Сопроводительное (черновик)"),
        muted("Замени [Компания] / [роль]. Старт не с «меня зовут»."),
        p(
          "Когда команда выходит на новый рынок или упирается в потолок воронки, обычно не хватает не «ещё креативов», а человека, который свяжет research, канал, лендинг, sales и команду в один цикл. Этим я и занимаюсь."
        ),
        p(
          "За последние годы: GTM в ОАЭ (тестовый запуск с сошедшейся unit-экономикой), marketing-функция в Стамбуле (команда + стабильные продажи), CRO ×2 и −5 п.п. ДРР в repair, +50% к чеку в дизайн-студии, multi-channel growth в real estate на Пхукете с координацией до ~10 человек."
        ),
        p(
          "В [Компания] на роли [PMM / Growth Lead] мне близко [1–2 факта о компании: продукт, рынок, этап]. Мой козырь — [end-to-end ownership запусков / CRO+pricing / multi-market GTM]: не слайды, а гипотезы с цифрами и командой, которая их исполняет."
        ),
        p(
          "Буду рада 20 минутам: могу разобрать ваш текущий bottleneck (activation, GTM, leadgen) и показать, как подходила к похожему кейсу. Портфолио: notion + veronika-lab. Контакты ниже."
        ),
        p("Вероника Овчинникова · veronikasergeevna17@yandex.ru · t.me/veronikakeys"),

        // ========== PART 5: TELL ME ABOUT YOURSELF ==========
        h1("5. «Расскажите о себе» — 60 секунд"),
        p(
          "Я маркетолог, который собирает системы роста: от research и позиционирования до канала, воронки и команды. Начинала с клиентов в офлайне, быстро ушла в продукт и performance — поняла, что сильнее всего, когда владею цепочкой целиком."
        ),
        p(
          "В ремонте и интерьерах научилась считать unit-экономику и дожимать CRO: конверсию сайта поднимала вдвое, чек проектирования — наполовину. Потом вывела продукт в Дубай и собирала маркетинг в Стамбуле — там без локальной команды и custdev ничего не взлетает. В edtech переупаковала продукт и удвоила ключевые конверсии. В AI-стартапе строила маркетинг с нуля и искала PMF. Сейчас в real estate на Пхукете веду multi-channel growth и команду in-house плюс подрядчики."
        ),
        p(
          "Ищу роль, где можно отвечать за направление — PMM или Growth Lead — с метриками, экспериментами и влиянием на продукт. Не «посты ради постов», а движение цифр."
        ),

        // ========== PART 6: WEAK SPOTS ==========
        h1("6. Слабые места — найдут на собесе (подготовься)"),
        bullet("English B1 vs US/UK/UAE в резюме — готовь честный ответ + план апгрейда.", "weak"),
        bullet("Job hopping 2023 (Colife, Brainhub) — нарратив: market expansion / project-based / crisis.", "weak"),
        bullet("NDA-метрики Aparthomes — имей one-pager «под NDA» в голове (бюджет, ×, лиды).", "weak"),
        bullet("Stakeholder soft — готовь STAR: когда настояла на гипотезе и выиграла.", "weak"),
        bullet("CMO-track — не обещай; говори Senior IC / Lead hands-on.", "weak"),
        bullet("It's AI без цифр — либо 1 метрика, либо «early stage, focus on learning».", "weak"),
        bullet("Выгорание / увольнения — коротко, без драмы: boundaries + systems.", "weak"),

        h2("Как залить в Google Doc"),
        p("1) Открой этот файл → Выделить всё → Копировать."),
        p("2) В Google Doc: Правка → Вставить без форматирования (или File → Open → upload .docx)."),
        p("3) Для отклика: страницы 1–2 (раздел «Резюме») — отдельно скопируй в чистый Doc «CV_Veronika_PMM_2026»."),
        p("4) Пришли текст вакансии — сделаю v2 строго под JD."),
      ],
    },
  ],
});

const buf = await Packer.toBuffer(doc);
fs.writeFileSync("/Users/veronika/veronika-lab/resume/Veronika_Ovchinnikova_CV_pack.docx", buf);
console.log("OK", buf.length);
