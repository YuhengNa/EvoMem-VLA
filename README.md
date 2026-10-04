# EvoMem-VLA project page

Research project website for **EvoMem-VLA: State-Evolution Memory for Long-Horizon Robot Manipulation**.

Live site: https://yuhengna.github.io/EvoMem-VLA/

## Structure

- `index.html`: title, authors, demos, overview, method, evaluation, ablations, and BibTeX.
- `app.js`: four task tabs, demonstration selectors, accessible keyboard navigation, and citation copying.
- `styles.css`: responsive layout and styling.
- `video-index.html`: direct access to all 20 recordings, including a JavaScript-free fallback.
- `assets/images/`: figures rendered from the latest manuscript figure PDFs without changing their content.
- `assets/videos/`: 20 unique recordings with frame-extracted poster images, drawn from the supplementary material and the author's corrected Route Recall head-camera clip.

This repository is the **project website**, not the model implementation. The **Code** button links to [EvoMem-VLA-Code](https://github.com/YuhengNa/EvoMem-VLA-Code), where the final implementation will be released. **Checkpoint** displays “Coming Soon” when clicked; **Paper** is disabled until the arXiv link is available. The paper PDF is intentionally omitted. No weights, credentials, training data, or supplementary source code are included. The citation uses `@misc` and this project URL until an arXiv identifier is available.

## Preview and check

Use any static HTTP server, for example `python3 -m http.server 8765`, then visit http://localhost:8765/.

```sh
node --check app.js
node scripts/check-site.mjs
```

Deploy with GitHub Pages from the `main` branch, repository root. All local asset links are relative, so the project subpath works without a build process.

## Updating media

Do not mix old manuscript images into this website. Render updated figure PDFs into the matching `assets/images/` filenames. Keep the abstract in sync with the approved manuscript. Do not add the paper PDF until authorized.

After adding or renaming demos, update the `tasks` map in `app.js` and regenerate the complete gallery with `node scripts/generate-video-index.mjs`. On macOS, `swift scripts/prepare-posters.swift "$PWD"` regenerates video posters. Each clip remains at its supplied playback speed. The Route Recall third view is the AgileX COBOT head camera; other tasks use a Franka wrist-camera view. Its author-supplied replacement was remuxed for web playback with audio and metadata removed, without re-encoding the picture or changing timing. The videos are representative successes, not a complete evaluation set; camera views are independent recordings.

## Sources and attribution

Content, authors, figures, abstract, and numbers follow the authors' current manuscript. Task descriptions use its Appendix B (including uncovering ducks in pink–green–blue order). Videos come from the previously assembled supplementary material and the author's corrected Route Recall head-camera recording. The high-level academic-page organization is inspired by [FlowVLA](https://irpn-lab.github.io/FlowVLA/); the HTML, CSS, and interactions here were implemented specifically for EvoMem-VLA, without copying FlowVLA research text or media.

No blanket redistribution license for the paper, media, or website is asserted on the authors' behalf.
