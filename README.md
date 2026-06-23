# ColorPlate Website

Static landing page for ColorPlate.

## Local preview

```bash
python3 -m http.server 4173 --directory docs
```

Open `http://localhost:4173`.

## GitHub Pages

In the repository settings, enable Pages and choose:

- Source: Deploy from a branch
- Branch: `main`
- Folder: `/docs`

The landing page is `index.html`. Legal links are `privacy.html` and `terms.html`.
Support is available at `support.html`.

## CTA links

Update the `Join TestFlight` links in `index.html` once the TestFlight or App Store URL is available.

## App Store preparation

Use `APP_STORE_CHECKLIST.md` when filling App Store Connect URLs, privacy details, regulatory status, review notes, and support information.
