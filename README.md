# AltBins.pro

Local command-line utilities for macOS, Windows, and Linux. Plain HTML / CSS, no build step.

## Structure

```
├── index.html
├── altping/index.html
├── altsysinfo/index.html
├── altserialport/index.html
├── css/style.css
└── downloads/            # release binaries
```

## Run locally

```bash
./run.sh
# → http://localhost:8080
```

## Editing

Everything is static HTML. Header and footer are copied into each page:

```html
<header class="site-header">
  <div class="site-brand">
    <a href="/" class="site-logo">Alt<span>Bins</span>.pro</a>
    <span class="site-tagline">portable utilities</span>
  </div>
</header>
```

The tagline is always visible below the logo, header is centered.

## Adding a utility

1. Copy `altping/index.html` → `mytool/index.html`, edit `<main>`
2. Add a card on `index.html`
3. Put binaries in `downloads/mytool/`
