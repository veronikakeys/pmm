# Версии сайта

| Папка | Назначение |
|-------|------------|
| `general/` | Исходная версия (PMM / Growth) — оливково-зелёный/коричневый акцент, до редизайна v2 |
| `cian/` | Версия под Циан Senior PMM / short-term rental |
| `v2/` | **Сейчас в корне сайта.** Дизайн: белый / свежий зелёный `#518233` / терракотовый коричневый `#6B3F23` (60% / 25% / 15%); кейсы без лишних фото между блоками, укороченные метрики результатов |

## Как переключить активную версию

```bash
# Сделать общей (как сейчас)
cp versions/general/index.html index.html
cp versions/general/styles.css css/styles.css

# Сделать версией под Циан
cp versions/cian/index.html index.html
cp versions/cian/styles.css css/styles.css

# Сделать версией v2 (хаки / тёмно-коричневый)
cp versions/v2/index.html index.html
cp versions/v2/css/styles.css css/styles.css
```

`assets/` и `js/` общие с корнем — своя копия внутри `v2/` (и в `general/`, `cian/`) нужна только для автономного превью самой папки. После смены версии в корне: hard refresh.

## Открыть v2 напрямую для превью

```bash
cd versions/v2
python3 -m http.server 5174
```

Открой [http://localhost:5174](http://localhost:5174) — версия полностью автономна (свои `css/`, `js/`, `assets/`).
