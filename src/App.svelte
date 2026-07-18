<script>
	import { onMount } from 'svelte'
	import { gameState, currentScene, loadScenes, selectChoice } from './lib/gameState.svelte.js'
	import SceneDisplay from './lib/SceneDisplay.svelte'
	import DialogBox from './lib/DialogBox.svelte'
	import ChoicesPanel from './lib/ChoicesPanel.svelte'

	onMount(() => {
		loadScenes()
	})

	let scene = $derived(currentScene())

	/** @param {number} choiceNumber */
	function handleSelect(choiceNumber) {
		const choice = scene?.choices.find((c) => c.choiceNumber === choiceNumber)
		if (choice) selectChoice(choice)
	}

	function handleNext() {
		const choice = scene?.choices[0]
		if (choice) selectChoice(choice)
	}
</script>

<main class="stage">
	{#if gameState.status === 'loading'}
		<div class="status-message">Loading…</div>
	{:else if gameState.status === 'error'}
		<div class="status-message">Couldn't load scenes: {gameState.error}</div>
	{:else if scene}
		<SceneDisplay display={scene.display} />

		<div class="overlay">
			{#if scene.choices.length > 1}
				<ChoicesPanel choices={scene.choices} onSelect={handleSelect} />
			{/if}
      <br><br><br>
			<DialogBox
				speaker={scene.speaker}
				dialogue={scene.dialogue}
				showNext={scene.choices.length === 1}
				onNext={handleNext}
			/>
		</div>
	{:else}
		<div class="status-message">The story has ended.</div>
	{/if}
</main>

<style>

	.stage {
		position: relative;
		width: 100%;
		height: 100%;
	}

	.status-message {
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: var(--font-display);
		font-size: 1.3rem;
		color: var(--color-text-soft);
		text-align: center;
		padding: 24px;
	}

	.overlay {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		flex-direction: column;
		gap: 14px;
		padding: 24px;
		max-width: 760px;
		margin: 0 auto;
	}

	@media (min-width: 640px) {
		.overlay {
			padding: 32px;
		}
	}
</style>
