# EvoMem-VLA project page

Research project website for **EvoMem-VLA: State-Evolution Memory for Long-Horizon Robot Manipulation**.

Live site: https://yuhengna.github.io/EvoMem-VLA/

## Structure

- `index.html`: title, authors, paper link, demos, overview, method, evaluation, ablations, and BibTeX.
- `app.js`: four task tabs, demonstration selectors, accessible keyboard navigation, and citation copying.
- `styles.css`: responsive layout and styling.
- `video-index.html`: direct access to all 20 recordings, including a JavaScript-free fallback.
- `assets/EvoMem-VLA.pdf`: current author-visible arXiv-style manuscript.
- `assets/images/`: figures rendered from the latest manuscript figure PDFs without changing their content.
- `assets/videos/`: all 20 unique recordings from the supplementary material, with frame-extracted poster images. Source MP4s are unchanged.

This repository is the **project website**, not the model implementation. No weights, credentials, training data, or supplementary source code are included. arXiv and model-code links have not been invented; add them when the authors provide official release URLs. The citation uses `@misc` and this project URL until an arXiv identifier is available.

## Preview and check

Use any static HTTP server, for example `python3 -m http.server 8765`, then visit http://localhost:8765/.

```sh
node --check app.js
node scripts/check-site.mjs
```

Deploy with GitHub Pages from the `main` branch, repository root. All local asset links are relative, so the project subpath works without a build process.

## Updating media

Do not mix old manuscript images into this website. Render updated figure PDFs into the matching `assets/images/` filenames. Keep the paper link and abstract in sync with the approved manuscript.

After adding or renaming demos, update the `tasks` map in `app.js` and regenerate the complete gallery with `node scripts/generate-video-index.mjs`. On macOS, `swift scripts/prepare-posters.swift "$PWD"` regenerates video posters. Each clip remains at its supplied playback speed. The videos are representative successes, not a complete evaluation set; external and wrist views are independent recordings.

## Sources and attribution

Content, authors, figures, abstract, and numbers follow the authors' current manuscript. Task descriptions use its Appendix B (including uncovering ducks in pink–green–blue order). Videos come from the previously assembled supplementary material. The high-level academic-page organization is inspired by [FlowVLA](https://irpn-lab.github.io/FlowVLA/); the HTML, CSS, and interactions here were implemented specifically for EvoMem-VLA, without copying FlowVLA research text or media.

No blanket redistribution license for the paper, media, or website is asserted on the authors' behalf.
