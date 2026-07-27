<script>
	import { onMount } from 'svelte'
	import { gameState, currentScene, loadScenes, selectChoice, loadStart, player } from './lib/gameState.svelte.js'
	import SceneDisplay from './lib/SceneDisplay.svelte'
	import DialogBox from './lib/DialogBox.svelte'
	import ChoicesPanel from './lib/ChoicesPanel.svelte'
    import TextInput from './lib/TextInput.svelte';

	onMount(() => {
		loadStart()
	})

	let scene = $derived(currentScene())

	/** @param {number} choiceNumber */
	function handleSelect(choiceNumber) {
		const choice = scene?.choices.find((c) => c.choiceNumber === choiceNumber)
		if (choice) selectChoice(choice)
	}

	function handleNext() {
		const choice = scene?.choices[0]
		if (choice?.description === 'final') {
			gameState.status = 'final'
		}
		else if (choice) selectChoice(choice)
	}

	function handleStart() {
		loadScenes()
	}
</script>

<main class="stage">
	{#if gameState.status === 'loading'}
		<div class="status-message">Loading…</div>
	{:else if gameState.status === 'error'}
		<div class="status-message">Couldn't load scenes: {gameState.error}</div>
	{:else if gameState.status === 'start'}
		<div class="status-message">
			<div>STFAITH FEP3</div>
			<button onclick={handleStart}>Start Game</button>
		</div>
	{:else if gameState.status === 'final'}
		<div class="status-message">
			<div>The story has ended.</div>
			<div>Believe: {player.score.believe}</div>
			<div>Doing: {player.score.doing}</div>
			<div>Trust: {player.score.trust}</div>
			<button onclick={loadStart}>Restart</button>
		</div>
	{:else if scene}
		<SceneDisplay bg={scene.bg} char1={scene.char1} char2={scene.char2}/>

		<div class="overlay">
			{#if scene.choices.length > 1}
				<ChoicesPanel choices={scene.choices} onSelect={handleSelect} />
			{:else if scene.choices[0]?.description === 'Text'}
				<TextInput onclick={handleNext}/>
			{/if}
	<br><br><br>
			<DialogBox
				speaker={scene.speaker}
				dialogue={scene.dialogue}
				showNext={scene.choices.length === 1 && scene.choices[0].description != 'Text'}
				onNext={handleNext}
			/>
		</div>
	{/if}

	<footer>credits</footer>
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
		flex-direction: column;
		gap: 12px;
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
