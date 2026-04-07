# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal portfolio website for Chibueze Nnamdi Oguejiofor, hosted via GitHub Pages. Built on the Start Bootstrap "Agency" template — a single-page Bootstrap 4 theme with SCSS, Gulp build pipeline, and jQuery.

## Build Commands

- `npm install` — install dependencies
- `npm start` / `gulp watch` — dev server with live reload on port 3000
- `gulp` — full production build (vendor + CSS + JS)
- `gulp css` — compile SCSS to CSS and minify
- `gulp js` — minify JS
- `gulp vendor` — copy dependencies from node_modules to vendor/

## Architecture

**Single-page site:** Everything renders from `index.html`. There is no routing or build-time HTML generation.

**Styles:** `scss/agency.scss` is the entry point, importing from `scss/base/` (variables, mixins, page) and `scss/components/` + `scss/layout/` (one file per section). Compiled output goes to `css/agency.css` and `css/agency.min.css`.

**JavaScript:** `js/agency.js` is the main script (minified to `js/agency.min.js`). `js/contact_me.js` and `js/jqBootstrapValidation.js` are excluded from the gulp minification pipeline.

**Vendor assets:** Checked into `vendor/` (Bootstrap, Font Awesome, jQuery, jQuery Easing). Regenerated from node_modules via `gulp vendor`.

**Contact form:** `mail/contact_me.php` handles form submissions server-side.

**Images:** `img/` contains header backgrounds, profile photos, and `img/portfolio/` has project thumbnails/full images.
