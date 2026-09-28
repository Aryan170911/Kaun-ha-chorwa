# Kawan Hawe Chorwa

`#birthbash-Arya Special Edition`

A mobile-first Roman Bhojpuri pass-and-play game for 3–12 players. Everyone except one player receives the same word; the odd player receives a related word. Players give clues, discuss, vote, and build points across a full session.

## Run it

For the production-like local build, run:

```sh
npm start
```

Then open `http://127.0.0.1:8080`. There are no package dependencies or build steps. Serving over HTTP enables installation and offline caching; opening `index.html` directly still works without those PWA features.

Run the complete automated checks with:

```sh
npm test
```

## Publish on GitHub Pages

This repository includes a GitHub Actions workflow that tests the game, builds a clean static artifact, and deploys it to GitHub Pages whenever `main` is pushed.

1. Push the project to a GitHub repository with `main` as its default branch.
2. Open **Settings → Pages** in that repository.
3. Under **Build and deployment**, choose **GitHub Actions** as the source.
4. Open the **Actions** tab to follow the first deployment; GitHub will show the public Pages URL when it finishes.

The game saves automatically with browser `localStorage`. A save belongs to that exact site address and browser profile, so a save made from `index.html` on the computer will not transfer to the GitHub Pages address. Private browsing or clearing site data can also remove it.

## Included

- Dynamic 3–12 player setup with add/remove controls
- Instant unique character assignment with reroll or manual choice from sixteen anime characters
- Optional 3, 5, 7, or unlimited-round sessions with visible progress
- One-time 20-second first-play tutorial
- Ravi Kishan meme-host commentary cards
- Shared clue/discussion timer adjustable from 60 seconds to 3 minutes mid-game
- 156 approachable word pairs across ten packs
- Private pass-the-phone reveals and voting
- Press-and-hold secret cards that hide instantly when released
- Responsive manga-panel interface with mobile-first controls
- Tie and final-guess rules
- Session scoring and detailed stats
- Same-toli instant replay, shareable results, and playful session awards
- Recent-word protection to reduce repeated pairs
- Optional sound and vibration feedback
- Browser autosave and session resume
- Post-session install prompt on supported browsers
- GitHub Pages build and deployment workflow
- Installable PWA with local/offline visual assets
- Dependency-free server with CSP and private-file allowlisting

Anime character images were sourced from MyAnimeList and Ravi Kishan photos from Wikimedia Commons, then stored locally for reliability. See `THIRD_PARTY_ASSETS.md`; this private family edition requires an asset-rights review before public or commercial release.
