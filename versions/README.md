# Две версии сайта

| Папка | Назначение |
|-------|------------|
| `general/` | Общая версия (PMM / Growth) — **сейчас в корне сайта** |
| `cian/` | Версия под Циан Senior PMM / short-term rental |

## Как переключить активную версию

```bash
# Сделать общей (как сейчас)
cp versions/general/index.html index.html
cp versions/general/styles.css css/styles.css

# Сделать версией под Циан
cp versions/cian/index.html index.html
cp versions/cian/styles.css css/styles.css
```

`assets/` и `js/` общие. После смены: hard refresh.
