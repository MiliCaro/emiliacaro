# Emilia Caro — personal site

Static one-page site. No build step, no dependencies. Bilingual (EN default / ES toggle).

## Files
- `index.html` — structure and all content (both languages live inline via `data-en` / `data-es`)
- `styles.css` — visual system (Fraunces + Newsreader, neutral palette + single oxblood accent)
- `script.js` — language toggle, mobile menu, scroll behaviour
- `portrait.jpg` — **add this yourself** (see below)

## Before publishing — replace these
1. **Portrait** — add `portrait.jpg` (sober, neutral ground, direct or three-quarter gaze; ~1200×1500px). Until added, a labelled placeholder shows.
2. **Bio** — refine the two paragraphs in the `#bio` section.
3. **Areas of work** — wording is a starting point; adjust to your voice.
4. **Speaking** — replace the three sample entries with real, curated appearances.
5. **Contact emails** — swap the `@emiliacaro.com` addresses for your real routed inboxes.
6. **Footer links** — add real LinkedIn / X URLs (or remove).
7. **English positioning line** — currently a proposed rendering of the locked Spanish; revise as you see fit.

## Publish on GitHub Pages
1. Create a new repository (e.g. `emiliacaro.com` or `site`).
2. Upload these files to the repo root (drag-and-drop in the GitHub web UI works).
3. Repo → **Settings** → **Pages**.
4. Under *Build and deployment*, set **Source: Deploy from a branch**, **Branch: `main` / `root`**, then **Save**.
5. The site goes live at `https://<username>.github.io/<repo>/` within a minute or two.

### Custom domain (optional)
In **Settings → Pages → Custom domain**, enter your domain (e.g. `emiliacaro.com`) and configure the DNS records GitHub shows. A `CNAME` file will be added automatically.

## Local preview
Open `index.html` directly in a browser, or run a tiny server:
```
python3 -m http.server
```
then visit `http://localhost:8000`.
