# AGENTS.md

Static coursework site for 《高级网页设计》. There is no build, test, lint, or package manager — do not invent `npm` commands. Verify changes by opening pages in a browser.

## Repo layout

- Git root is this folder (`wuhuixian`); the site itself lives in `24002120213+吴慧贤/`. Serve from that subfolder.
- `24002120213+吴慧贤/index.html` is the course hub. When adding a lesson page, also add a card plus nav/footer link there.
- `css/` holds shared styles (`flex_css005.css`, `svg.css`). Most other pages keep CSS/JS inline.
- `cdn/` holds vendored Font Awesome (`cdn/css/all.min.css`, `cdn/webfonts/`) and `lucide.min.js`.
- `font/` holds the local iconfont kit; `font/demo_index.html` is the icon demo page.
- `skills/frontend-design/SKILL.md` is design guidance only, not shipped/runtime code.

## Preview

From `24002120213+吴慧贤/`:

```powershell
python -m http.server 8080
```

Open http://localhost:8080/ (matches `.vscode/launch.json`; no server task is configured).

## Conventions

- Native HTML/CSS/JS only. Keep new assets local under `cdn/` or `font/`; do not add new remote CDN links. Existing exceptions: `svg.html` and `font/demo_index.html` still load alicdn scripts.
- Filenames contain Chinese and spaces; URL-encode spaces in links (`data%20Type.html`). Keep existing names such as `obg005.html`, `js-boj-apply.html`, and `JS-obj-fun005.html` — `index.html` links to them.
- UI text and code comments are Chinese; keep them Chinese.
- New HTML files carry a header comment right after `<!DOCTYPE html>`, containing author, creation date, model used, and the page's function name, e.g. `<!-- 作者：吴慧贤 | 建立时间：2026-11-04 | 使用大模型：GLM-5.3-Flash | 功能名称：<页面功能> -->`.
- Every JS function has a one-line Chinese comment directly above it describing what the function mainly does.

## Known issues in `index.html`

- Duplicate closing `</body></html>` at EOF.
- Footer says "王垚" while the page theme is "吴慧贤".
- Several standalone demos are not linked from the hub: `event005.html`, `function.apply.html`, `JS-obj-fun005.html`, `iconfont-1..4.html`.

## Git

- Single `master` branch, Gitee remote `origin`. Commit messages are Chinese, e.g. `更新项目: ...`.
- `.git-credentials` is tracked at the repo root. Never print, edit, or stage it; avoid `git add -A` / `git add .`.
