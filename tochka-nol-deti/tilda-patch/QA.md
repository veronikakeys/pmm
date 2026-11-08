# QA: remove user-facing messengers on tochkanol.ru

Status: **code written and checked locally. Not saved in the Tilda CMS. Not published.**

No form was submitted. Headless runs abort every non-GET request, and the local preview pages add a submit blocker (`#qa-no-submit`) that is **not** in the paste files.

The repo had no `tochka-nol-deti/` copy. Everything below is built from the public HTML fetched on 2026-11-08 (`https://tochkanol.ru/` and `https://tochkanol.ru/spasibo`). T123 blocks are wrapped in `<!-- nominify begin -->` … `<!-- nominify end -->` and were not minified, so the published inner HTML was editable. Paste `tilda-patch/rec<ID>.new.html` into that block’s T123 field.

The published `<title>` is still «Современный танец для детей от 3х лет» and the description is still the shorter live sentence. Those were not edited. If the CMS editor already holds a different unpublished title/description, leave the page SEO settings alone. If the editor’s T123 source for a block below does not match `backup/live-2026-11-08/rec<ID>.t123.html`, do not paste over it; re-apply the same diff onto the editor source.

## Live block roles (the brief’s ids do not match the published page)

| Record | Published role | Action |
|---|---|---|
| rec4952454803 | Hero, header, sticky bar | Edited. Removed both WhatsApp links. Trial CTAs stay. |
| rec4952530703 | Signup section `#zapis` next to the form, not the footer | Edited. Removed WhatsApp and MAX buttons. Phone link stays. |
| rec4952540703 | Footer «Мессенджеры и соцсети» | **Unchanged.** This is the footer contacts block. |
| rec4952550803 | Signup popup | Edited. Removed «Удобнее написать?» plus WhatsApp and MAX. |
| rec4958844703 | Page form (moved into `#zapis`) | Unchanged. |
| rec4960398603 | Popup form | Unchanged. |
| rec4983233203 | `/spasibo` thank-you page | Edited. Removed «Напишите нам» WhatsApp and MAX. One CSS rule so the address card is not a leftover two-column grid. |
| rec4952501203 | «Пространство» | Unchanged. The word «телеграммы» is about the Alferaki palace post office, not Telegram. |

The brief named rec4952530703 as the footer to keep and rec4952540703 as the popup. On the live page those roles are reversed. Messengers were removed from the signup section and the popup, and left in the real footer.

## Messenger inventory

| Where | What | Decision |
|---|---|---|
| rec4952454803 header | `wa.me` «Написать в WhatsApp» | Removed |
| rec4952454803 sticky | `wa.me` «Написать в WhatsApp» | Removed |
| rec4952530703 signup | «Удобнее написать? Телефон и WhatsApp» plus WhatsApp and MAX buttons | Buttons and the WhatsApp words removed. Text is now «Телефон:» plus `tel:+79885661432` |
| rec4952540703 footer | Phone, WhatsApp, MAX, VK, Instagram, address | Kept, byte-for-byte |
| rec4952550803 popup | «Удобнее написать?» plus WhatsApp and MAX | Removed |
| rec4983233203 thanks | «Не хочется ждать звонка? Напишите нам» plus WhatsApp and MAX | Removed |
| rec4983233203 thanks | «Загляните в нашу жизнь» VK and Instagram follow buttons | Kept. They are a subscribe card, not a contact-channel chooser. Same networks stay in the footer. |
| rec4958844703, rec4960398603 | Fields: name, age radios, phone, consent checkbox, submit «Записаться на пробное». Success URL `/spasibo`. No messenger field, no username field. | Kept |
| Shared block script | Toast «Текст скопирован — вставьте его в чат MAX» on `[data-copy]` | Kept. The footer MAX link still uses `data-copy`. The script does not look up the removed buttons. |
| Client JS | `api.telegram.org`, `t.me`, a Telegram bot fetch | None in the public HTML. Form `POST` handlers were not edited, so a Tilda-side admin notification is untouched. |

Grep of the patched home preview: `wa.me`, `max.ru`, `t.me`, and `api.telegram` occur only inside rec4952540703. The patched thanks page has no `wa.me` and no `max.ru`.

## What was checked

Local preview only (`preview/index.html`, `preview/spasibo.html`) against the fetched live HTML. Chrome headless, no production POST.

### Measured

Horizontal overflow (`scrollWidth - clientWidth`), home and `/spasibo`, popup open and closed:

| Viewport | Home | Thanks | Popup open |
|---|---|---|---|
| 375 | 0 | 0 | 0 |
| 768 | 0 | 0 | 0 |
| 1280 | 0 | 0 | 0 |

Sticky bar (visible below 960px; `display:none` from the existing `min-width:960px` rule, both before and after):

| Viewport | Before | After |
|---|---|---|
| 375 | Trial button 291px + WhatsApp 56px + 8px flex gap. Bar 355px. | One trial button 355px. Unused width 0. |
| 768 | Trial button 684px + WhatsApp 56px + 8px gap. Bar 748px. | One trial button 748px. Unused width 0. |
| 1280 | Not shown (`display:none`). | Not shown (`display:none`). |

Header bar, last visible item’s gap to the right edge:

| Viewport | Before | After |
|---|---|---|
| 1280 | Logo, nav, 42px WhatsApp. Right gap 0. | Logo and nav. Right gap 0. |
| 375 and 768 | Logo and 42px WhatsApp (nav is `display:none`). | Logo only. No 42px circle left in the bar. |

Popup panel after the form has laid out:

| Viewport | Before | After |
|---|---|---|
| 1280 | Third row 145px (the messenger strip). `bottomGap` 0. | Third row 0px. `bottomGap` 0. No WhatsApp/MAX in the panel. |
| 375 | Form slot height 552px once laid out (separate remeasure). Messengers visible under the form. | Form slot height 552px. No messenger row. |

Thank-you «Где мы» card at 1280: before, the card was 1008px wide and the address column was 479px, with the messenger column beside it. After the buttons were removed, that 6fr/5fr rule left an empty column, so the rule is now `display:block` inside the same `min-width:960px` query. Remeasured: one child, card 1008px, content 934px (card padding), overflow 0.

Duplicate `id`s: 0 in the static HTML and 0 in the live DOM after scripts, home and thanks.

Markup balance of the four edited T123 fragments (tags outside `<style>` and `<script>`): no unclosed tags, no leftover stack.

Scripts do not call `querySelector` for `.tz-hero__wa`, `.tz-sticky__wa`, `.tz-popup__alt`, or `.tz-msg`. Those names remain only as unused CSS. A wrapper counted null `querySelector` results during load, scroll, and popup use. The null selectors are Tilda’s own optional nodes (`.t396`, payment box, phone-mask script, and similar). None of them are the removed messenger nodes. The null set matches the baseline. `pageerror` count was 0 on home and thanks at 375, 768, and 1280.

Console `error` lines that did appear are the same on the baseline and the patch: `TildaStat: fail pageview` and `Failed to load resource: net::ERR_FAILED`. Those come from stats/resources while non-GET is aborted in the test. They are not new exceptions from the removed nodes. Thanks pages logged 0 console errors.

Keyboard, home, from the top of the document:

- Baseline at 1280 and 375: tab reaches «Написать в WhatsApp» in the header before the trial CTA.
- Patch at 1280 and 375: that stop is gone. The next control is «Записаться на пробное» (`href="#zapis"`). The focused CTA is visible (about 278×56 at 768/1280, 335×56 at 375).
- Computed focus on that CTA, keyboard Tab, all three widths: `outline: solid 2px rgb(184, 147, 90); outline-offset: 4px`. That is the existing `.tz-hero :focus-visible` rule.

Popup focus, opened with a click on `a.tz-btn.tz-btn--light`, then Escape. Same result before and after:

| Viewport | Focus when opened | Shift+Tab from first control | Tab from last control | After Escape |
|---|---|---|---|---|
| 375, 768 | The panel (`<960` does not move focus into the name field). Panel outline is `none`. | Last control | Close button | Hero CTA, visible |
| 1280 | Name field. Border bottom `solid 1px rgb(212, 180, 131)`, outline `none`. | Last control | Close button | Hero CTA, visible |

Before, the last control was the MAX link. After, it is the submit button «Записаться на пробное». The cycle still wraps. Escape clears `is-visible`. Focus returns to the same hero CTA.

Form controls found in the open popup and in both form records: name text input, five age radios, phone, checkbox «Даю согласие на обработку персональных данных» with links to `/soglasie` and `/politika`, submit button. Labels read from the DOM: «Ваше имя», «Возраст ребенка», «Телефон».

### Seen in the screenshots

Pairs are in `tilda-patch/screenshots/` (`before-*` / `after-*` at 375, 768, 1280).

- Header: the round WhatsApp control is gone at 375, 768, and 1280. The logo, menu (from 960px), and «Записаться на пробное» stay. No empty circle.
- Sticky: at 375 and 768 the green trial button fills the bar. The white WhatsApp circle is gone. At 1280 the bar is hidden by the existing CSS, as on the live page.
- Signup section at 1280: WhatsApp and MAX buttons are gone. «Телефон: +7 988 566-14-32» remains. The form, consent, and submit button remain.
- Popup: at 1280 the right column is the form only. At 375 and 768 the sheet goes from the photo and text straight into the form. No «Удобнее написать?» row and no blank band where it was.
- Thanks at 1280: the address card is a single block. VK and Instagram stay in «Загляните в нашу жизнь».
- Footer at 1280: phone, four messenger/social icons, and the address are still there.

### Not tested

- Screen readers (VoiceOver, NVDA, TalkBack). Not claimed.
- A physical phone. Viewports are headless Chrome at 375, 768, and 1280, height 900 (sticky shots use the scrolled viewport).
- Sticky at 1280, because the existing stylesheet hides it from 960px up.
- A dedicated crop of the signup section at 375 and 768. Overflow for the whole page at those widths is 0, and the block’s HTML is the same one checked at 1280.
- Pasting into Tilda, publishing, or comparing an unpublished CMS draft.
- `/politika` and `/soglasie`.
- Submitting either form, including the success redirect. The `/spasibo` page was opened directly.
- Whether the gold focus ring meets a contrast score. The computed color was recorded; no score was calculated.

## Rollback

1. Do not publish this change from the repo. Tilda is still serving the live page.
2. For each edited block, paste `backup/live-2026-11-08/rec<ID>.t123.html` back into the T123 field:
   - rec4952454803
   - rec4952530703
   - rec4952550803
   - rec4983233203
3. Do not replace rec4952540703, rec4958844703, or rec4960398603. They were not changed.
4. Full fetched pages: `backup/live-2026-11-08/index.html` and `spasibo.html`.
