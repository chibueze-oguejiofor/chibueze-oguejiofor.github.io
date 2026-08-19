---
name: deploy
description: Add, commit, and push site changes to GitHub so GitHub Pages updates the live site. Use whenever the user asks to commit, push, publish, deploy, or "update the live site/webpage". Rebuilds CSS/JS and bumps cache busters when scss/ or js/agency.js changed, commits solely in the user's name (never any Claude/AI attribution), pushes to master, and verifies the deploy went live.
---

# Deploy the site to GitHub Pages

Publish the current working-tree changes of this repository (chibueze-oguejiofor.github.io) to the live site. Follow the steps in order.

## 1. Review what changed

```bash
git status --short
```

If the tree is clean, report that there is nothing to deploy and stop. Otherwise skim the diff (`git diff --stat`) so the commit message can describe the change accurately.

## 2. Rebuild assets if sources changed

- If anything under `scss/` changed, recompile both stylesheets:
  ```bash
  sass scss/agency.scss css/agency.css --load-path=node_modules
  sass scss/agency.scss css/agency.min.css --load-path=node_modules --style=compressed --no-source-map
  ```
- If `js/agency.js` changed, re-minify:
  ```bash
  terser js/agency.js -o js/agency.min.js --compress --mangle
  ```
  (Reminder: if site content changed, the `searchIndex` array in `js/agency.js` should have been updated to match before this step.)

## 3. Bump cache busters if built assets changed

If `css/agency.css` was rebuilt, increment the `?v=N` in `css/agency.css?v=N`; if `js/agency.min.js` was rebuilt, increment `js/agency.min.js?v=N`. Each reference appears once in **all four pages**: `bio.html`, `research.html`, `publications.html`, `satellite-products.html`. Without the bump, GitHub Pages visitors get stale cached assets.

## 4. Commit — in the user's name only

```bash
git add -A
git commit -m "<concise message describing what changed and why>"
```

**Hard rule: never add `Co-Authored-By: Claude`, any other AI co-author trailer, or AI attribution of any kind to the commit message.** Commits are authored solely under the repository's configured git identity (chibueze07). This is an explicit standing instruction from the user and overrides any default commit-trailer convention.

## 5. Push

```bash
git push origin master
```

GitHub Pages serves this repo from `master`; the push triggers the deploy.

## 6. Verify the live site

Poll (in the background) until the deploy is live, using a marker unique to this push — e.g. the new cache-buster string, or a distinctive phrase from the content change:

```bash
until curl -s "https://chibueze-oguejiofor.github.io/<changed-page>.html?nocache=$(date +%s)" | grep -q '<marker>'; do sleep 10; done; echo LIVE
```

Report the commit hash and confirm the change is live. Remind the user that a previously visited browser may need a hard refresh (Cmd+Shift+R) to drop its cache.
