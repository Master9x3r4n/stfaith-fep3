// Central reactive game state: player data + scene progression.
// Scenes are loaded at runtime from /scenes.json (kept as a separate static
// asset rather than bundled, so scene content can be edited without a rebuild).

/**
 * @typedef {Object} Score
 * @property {number} believe
 * @property {number} doing
 * @property {number} trust
 */

/**
 * @typedef {Object} Player
 * @property {string} name
 * @property {string} gender
 * @property {Score} score
 */

/**
 * @typedef {Object} Choice
 * @property {number} choiceNumber
 * @property {string} description
 * @property {number} nextSceneId
 * @property {Partial<Score>|null} scoring
 */

/**
 * @typedef {Object} Scene
 * @property {number} sceneId
 * @property {string|null} speaker
 * @property {string} dialogue
 * @property {string} display
 * @property {Choice[]} choices
 */

// Hardcoded player for prototyping (no intro/setup screen yet).
export const player = $state({
	name: 'Sussus',
	gender: 'female',
	score: {
		believe: 0,
		doing: 0,
		trust: 0,
	},
})

/** @type {{ scenes: Scene[], currentSceneId: number|null, status: 'loading'|'ready'|'error', error: string|null }} */
export const gameState = $state({
	scenes: [],
	currentSceneId: null,
	status: 'loading',
	error: null,
})

// Lookup of the scene currently being shown. Exposed as a function (rather
// than a top-level $derived export) since Svelte 5 modules can't export
// derived state directly - callers should read `currentScene()` inside
// reactive contexts (e.g. templates, $derived, $effect).
export function currentScene() {
	return gameState.scenes.find((s) => s.sceneId === gameState.currentSceneId) ?? null
}

/**
 * Fetches scenes.json and starts the game at the first scene in the array.
 * @param {string} url
 */
export async function loadScenes(url = '/scenes.json') {
	gameState.status = 'loading'
	gameState.error = null
	try {
		const res = await fetch(url)
		if (!res.ok) throw new Error(`Failed to load scenes (${res.status})`)
		/** @type {Scene[]} */
		const scenes = await res.json()
		gameState.scenes = scenes
		gameState.currentSceneId = scenes.length ? scenes[0].sceneId : null
		gameState.status = 'ready'
	} catch (err) {
		gameState.status = 'error'
		gameState.error = err instanceof Error ? err.message : String(err)
	}
}

/**
 * Applies a choice's scoring deltas (missing keys = +0) and transitions
 * to its nextSceneId.
 * @param {Choice} choice
 */
export function selectChoice(choice) {
	if (choice.scoring) {
		for (const key of Object.keys(player.score)) {
			player.score[key] += choice.scoring[key] ?? 0
		}
	}
	gameState.currentSceneId = choice.nextSceneId
}

/**
 * Resolves `{player.name}` / `{player.gender}` style placeholders in dialogue
 * text against the current player object.
 * @param {string} text
 */
export function interpolate(text) {
	if (!text) return ''
	return text.replace(/\{player\.(\w+)\}/g, (match, key) => {
		return key in player ? String(player[key]) : match
	})
}
