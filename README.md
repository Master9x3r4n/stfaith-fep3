# stfaith

A visual novel–style web game built with Svelte 5 (runes) + Vite, bundled to a
single-file HTML build via [`vite-plugin-singlefile`](https://github.com/richardtallent/vite-plugin-singlefile).

## Quick start

```bash
npm install
npm run dev      # local dev server
npm run build    # production build -> dist/
npm run preview  # preview the production build
```

## How the game works

Each **scene** shows a background image, a dialogue box (speaker + line), and
either a single "next" button or 2–3 choice buttons. Picking a choice updates
the player's score and jumps to the next scene. A scene with no choices is an
ending.

```
0 choices  -> story ends, no button/panel shown
1 choice   -> NextSceneButton only (applies that choice's scoring on click)
2-3 choices-> ChoicesPanel of ChoiceBoxes (each applies its own scoring)
```

## Where things live

```
public/
  scenes.json          <- all scene content (fetched at runtime, see below)
  images/               <- put scene background images here (see below)
src/
  App.svelte            <- orchestrates loading + which UI to show per scene
  app.css                <- design tokens (colors, fonts) + global styles
  main.js                <- Svelte mount entrypoint
  lib/
    gameState.svelte.js  <- all game state + logic (see below)
    SceneDisplay.svelte   <- bg image, falls back to solid color if empty
    DialogBox.svelte      <- speaker tab + dialogue text + hosts NextSceneButton
    ChoicesPanel.svelte   <- vertical stack of ChoiceBox, shown for 2-3 choices
    ChoiceBox.svelte      <- single clickable choice
    NextSceneButton.svelte<- "next >" trigger, shown for exactly 1 choice
```

### `src/lib/gameState.svelte.js`

This is the single source of truth, using Svelte 5 runes (`$state`) instead
of a `writable` store. Exports:

- `player` — reactive object: `name`, `gender`, `score: { believe, doing, trust }`.
  Currently hardcoded (no intro/setup screen yet).
- `gameState` — reactive object: `scenes` (loaded array), `currentSceneId`,
  `status` (`'loading' | 'ready' | 'error'`), `error`.
- `currentScene()` — **function**, not a plain export, because Svelte 5
  modules can't export `$derived` values directly. Call it inside a
  component's own `$derived(...)` to get a reactive current-scene lookup
  (see `App.svelte`).
- `loadScenes(url = '/scenes.json')` — fetches scene data and starts the
  game at the first scene in the array. Called once from `App.svelte`'s
  `onMount`.
- `selectChoice(choice)` — applies `choice.scoring` deltas to `player.score`
  (any key missing from `scoring` is treated as +0) and moves
  `currentSceneId` to `choice.nextSceneId`.
- `interpolate(text)` — resolves `{player.name}` / `{player.gender}`
  placeholders in dialogue strings against the live `player` object.

### `public/scenes.json`

Scene data is a **separate static file fetched at runtime**, not bundled
into the JS. This was a deliberate choice: `vite-plugin-singlefile` bundles
`src/` into one `index.html`, which is great for portability but means a
rebuild is needed for every content change. Keeping scenes in
`public/scenes.json` means anyone can edit dialogue/choices/branching and
just refresh — no rebuild required. The tradeoff is the shipped app is
technically two files (`index.html` + `scenes.json`), not fully
self-contained.

Shape of a scene:

```jsonc
{
  "sceneId": 1,
  "speaker": "Clair",       // null/omit for narration (hides the speaker tab)
  "dialogue": "Hi there! {player.name}!",
  "display": "",             // image path, see below. "" = fallback bg color
  "choices": [                // 0, 1, or 2-3 entries — see table above
    {
      "choiceNumber": 1,
      "description": "Sure thing",
      "nextSceneId": 6,
      "scoring": { "trust": 2, "doing": 1 }  // omitted keys = +0. Can be null.
    }
  ]
}
```

### Scene images

Not wired up with real assets yet — `display` is `""` for every sample
scene, which falls back to a solid background color in `SceneDisplay.svelte`.
When ready, drop images in `public/images/` and reference them by root-relative
path:

```
public/images/scene1.jpg
```
```jsonc
"display": "/images/scene1.jpg"
```

Same reasoning as `scenes.json`: files in `public/` are copied as-is into
`dist/` alongside the bundled HTML, so images stay swappable without a
rebuild, instead of being `import`ed and inlined/base64'd by the bundler.

## Known gaps / not-yet-built

- No player name/gender intro screen — `player` is hardcoded in
  `gameState.svelte.js` for now.
- Styling is a first pass matching the early mockups — expect it to change.
