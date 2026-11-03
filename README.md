# Buana Studios

The site is a static multi-page site built with GitHub Pages' Jekyll support. Each root-level `.html` file remains its own page and URL; Jekyll only assembles shared Liquid layouts and includes when the site is published.

## Shared structure

- `_layouts/default.html` contains the document shell and loads shared components.
- `_includes/header.html`, `footer.html`, and `mobile-nav.html` are the shared site chrome.
- `_includes/sidebar.html` is an optional navigation sidebar.
- Page-specific content and metadata stay in each root-level `.html` file.

To add a sidebar to a page, add a `sidebar` list to that page's YAML front matter:

```yaml
sidebar_title: On this page
sidebar:
  - title: About
    url: /about.html
  - title: Contact
    url: /contact.html
```

Edit a shared include once to update it across all pages. GitHub Pages builds the templates into regular HTML pages; there is no client-side routing.
