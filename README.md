# Buana Studios

This is a static, multi-page site. Each page remains its own HTML file; shared
page sections are included from `partials/` by the small loader in `js/main.js`.
No build step or framework is required.

## Shared sections

Edit a file in `partials/` once to update that section across every page that
includes it:

- `header.html` - desktop navigation
- `footer.html` - site footer
- `mobile-nav.html` - mobile navigation
- `whatsapp.html` - floating contact button
- `sidebar.html` - optional site navigation sidebar

To add a shared section to a page, put an include slot where it should appear:

```html
<div data-include="partials/sidebar.html"></div>
```

The path is relative to the page URL. Add the same slot to any other page that
should use that component. Create another HTML file in `partials/` for a
different shared section and use its path in `data-include`.

The includes use `fetch`, so pages need to be served over HTTP (GitHub Pages
already does this); opening an HTML file directly with `file://` will not load
them. The pages themselves are still separate MPA documents with normal links
between them.
