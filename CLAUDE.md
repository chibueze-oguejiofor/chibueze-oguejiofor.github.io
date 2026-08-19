# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal portfolio website for Chibueze Nnamdi Oguejiofor, hosted via GitHub Pages. Built on the Start Bootstrap "Agency" template (Bootstrap 4, SCSS, jQuery), adapted into a **multi-page site**.

## Pages

Six root HTML files. `index.html` and `contact.html` are pure meta-refresh redirects to `bio.html` (no navbar, no CSS/JS) — the old Contact page was retired in Aug 2026 (its content duplicated the footer); the redirect keeps old links alive. The four real pages are:

- `bio.html` — landing page: headshot, academic-profile pill buttons (`.scholar-links`: ORCID / Google Scholar / GitHub, brand-colored hovers; ORCID icon is self-hosted `img/orcid.svg`), bio prose, academic timeline (`.bio-timeline` boxes), CV link
- `research.html` — portfolio grid (3 items) + Bootstrap modals
- `publications.html` — three gray box sections (`ul.pub-list > li`), each holding a `ul.pub-entries` bullet list (one `li` per publication; yellow ring bullets that fill on hover): peer-reviewed, thesis & dissertation, conferences
- `satellite-products.html` — portfolio grid (3 items) + modals with MP4s

**The navbar is duplicated verbatim in all 4 real pages** (no templating; links: Bio, Research, Publications, Satellite Products, then the search/theme icon controls). Any navbar change must be applied in all 4 files. Each page hardcodes `active` on its own nav link (and `js/agency.js` also sets it by filename). Contact info lives only in the footer, which is duplicated on all 4 pages.

## Build Commands

There is no npm toolchain (the former gulp pipeline — `package.json`, `package-lock.json`, `gulpfile.js`, `.travis.yml`, `.browserslistrc` — was removed in Aug 2026 to clear Dependabot alerts). The build uses the globally installed `sass` CLI and `terser`:

- `sass scss/agency.scss css/agency.css --load-path=node_modules` — compile CSS (this is what pages link)
- `sass scss/agency.scss css/agency.min.css --load-path=node_modules --style=compressed --no-source-map` — minified CSS (built but not linked)
- `terser js/agency.js -o js/agency.min.js --compress --mangle` — minify JS (pages load the **minified** file)

**Cache busters:** pages link `css/agency.css?v=N` and `js/agency.min.js?v=N`. After changing CSS or JS, bump the corresponding `?v=` in **all 4 pages** or GitHub Pages serves stale assets.

## Architecture

**Styles:** all custom styling lives in `scss/` (no inline `<style>` blocks in the HTML). Entry point `scss/agency.scss` imports:
- `base/` — `_variables.scss` (Bootstrap grays + `$primary: #fed136`), `_mixins.scss` (all font mixins are the same Inter stack), `_page.scss` (globals, `.bg-offwhite`, `ul.pub-list` gray boxes + nested `ul.pub-entries` hover-fill bullets, `.scholar-links`/`.scholar-link` profile pill buttons)
- `components/` — `_buttons.scss`, `_navbar.scss` (`#mainNav`, dark `$gray-900`), `_theme.scss` (**dark mode + search overlay — imported last so overrides win**)
- `layout/` — `_masthead.scss` (dead), `_services.scss` (dead), `_portfolio.scss` (grids + modals; each tile's link+caption sit in a `.portfolio-card` wrapper carrying the hover `scale(1.02)` + shadow), `_timeline.scss` (`.bio-timeline` boxes: gray `#f5f5f5` fill, `#e8e8e8` border, 6px radius, uppercase heading with 90px top margin, hover `scale(1.02)` + shadow; the upstream `.timeline` block below line ~60 is unused), `_team.scss`, `_contact.scss` (targets `section#contact`, matched by nothing — dead), `_footer.scss`

**Dark mode:** an inline boot script in each page's `<head>` (just before the CSS link) applies `dark-mode` on `<html>` from `localStorage('theme')`, falling back to system `prefers-color-scheme` — this prevents a flash of the wrong theme. The navbar `#theme-toggle` button (moon/sun icon) toggles the class and persists the choice. All dark styles live in one `html.dark-mode` override block in `scss/components/_theme.scss` (palette: page `#1a1d21`, boxes `#2a2e33`, hairlines `#3a3f44`, text `#e9ecef`, muted `#adb5bd`; `$primary` yellow unchanged).

**Search:** the navbar `#search-toggle` button opens a client-side overlay built by `js/agency.js`. The searchable content is a **hand-maintained static index array (`searchIndex`) in `js/agency.js`** — when adding/changing site content, update the matching index entries and re-minify. Overlay styles are in `_theme.scss`.

**JavaScript:** `js/agency.js` (source) → `js/agency.min.js` (loaded). Handles: mobile-menu collapse on nav click, navbar shrink on scroll, active-link highlight, theme toggle, and the search overlay/index. `js/jqBootstrapValidation.js` is unused.

**Vendor assets:** checked into `vendor/` (Bootstrap, Font Awesome, jQuery, jQuery Easing). Font Awesome icons are used for the navbar search (`fa-search`) and theme (`fa-moon`/`fa-sun`) controls.

**Dead files:** `css/agency_old.css`, `css/agency.min_old.css`, `mail/`, `js/contact_me.js`, `js/jqBootstrapValidation.js`, `scss/layout/_masthead.scss`, `scss/layout/_services.scss`, `img/*_old*`.

**Analytics:** every real page carries inline GTM (`GTM-KDPB6FF`) and gtag (`UA-51796304-2`) snippets in `<head>`.

## Committing

Deploys go through the `/deploy` skill (`.claude/skills/deploy/SKILL.md`): rebuild assets if needed, bump cache busters, commit, push to master, verify the live site. **Commits must be authored solely under the user's git identity (chibueze07) — never add `Co-Authored-By: Claude` or any other AI attribution to commit messages.** This is a standing instruction from the repository owner and overrides any default commit-trailer convention.

## Verifying changes

Serve locally (`python3 -m http.server <port>`) and check each changed page in **both light and dark mode** and at mobile width (~375px, controls live in the hamburger menu). Theme choice persists across pages via localStorage.
