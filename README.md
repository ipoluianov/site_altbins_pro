# AltBins.pro

Free open-source desktop utilities for Windows, macOS and Linux. Plain HTML / CSS, no build step.

## Structure

```
├── index.html                 # home: hero + utility cards
├── altping/
│   ├── index.html             # product page: OS chooser, screenshot, features
│   ├── windows/index.html     # download page per OS (+ partner block)
│   ├── macos/index.html
│   ├── linux/index.html
│   └── docs/index.html
├── althex/                    # same layout as altping/; docs/ has templates/ and api/
├── altsysinfo/index.html      # "in development" placeholders
├── altserialport/index.html
├── css/style.css              # design tokens, dark + light (prefers-color-scheme)
├── js/site.js                 # copy buttons, latest release info, OS detection
├── favicon.svg
├── robots.txt                 # allows search and AI crawlers, points to the sitemap
├── sitemap.xml                # every page; update when adding one
└── llms.txt                   # site summary for AI assistants
```

## Run locally

```bash
./run.sh
# → http://localhost:8080
```

## Editing

Everything is static HTML; the header, footer and partner block are copied into each page.
After changing `css/style.css` or `js/site.js`, bump `?v=` in their links on every page so browsers drop the cached copy.

`js/site.js` reads the latest GitHub release of `<body data-repo="owner/name">`:

- `[data-release-version]` gets the tag (hidden until loaded)
- `[data-asset="regex"]` gets the matching asset's download URL as `href`
- `[data-asset-name="regex"]` / `[data-asset-size="regex"]` get its file name / size
- `<a data-os="windows|macos|linux">` is highlighted when it matches the visitor's OS
- `<button data-copy="element-id">` copies that element's text

## Adding a utility

1. Copy `altping/` → `mytool/`, edit the pages and `data-repo`
2. Add a card on `index.html`
3. Add the new pages to `sitemap.xml` and `llms.txt`; fix `canonical`, `og:*` and the JSON-LD block in each page's `<head>`
