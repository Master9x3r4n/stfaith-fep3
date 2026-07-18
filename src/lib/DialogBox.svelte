<script>
	import { interpolate } from './gameState.svelte.js'
	import NextSceneButton from './NextSceneButton.svelte'

	/** @type {{ speaker?: string|null, dialogue: string, showNext?: boolean, onNext?: () => void }} */
	let { speaker = null, dialogue = '', showNext = false, onNext } = $props()
</script>

<div class="dialog-wrap">
	{#if speaker}
		<div class="speaker-tab">{speaker}</div>
	{/if}
	<div class="dialog-box" class:no-speaker={!speaker}>
		<p class="dialogue-text">{interpolate(dialogue)}</p>
		{#if showNext}
			<div class="next-slot">
				<NextSceneButton onclick={onNext} />
			</div>
		{/if}
	</div>
</div>

<style>
	.dialog-wrap {
		position: relative;
		width: 100%;
	}

	.speaker-tab {
		position: absolute;
		top: -34px;
		left: 24px;
		background: var(--color-box);
		color: var(--color-text);
		font-family: var(--font-body);
		font-weight: 700;
		font-size: 1rem;
		padding: 8px 20px;
		border-radius: var(--radius) var(--radius) 0 0;
	}

	.dialog-box {
		background: var(--color-box);
		border-radius: var(--radius);
		padding: 22px 26px 16px;
		box-shadow: var(--shadow-box);
		min-height: 84px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 10px;
	}

	.dialog-box.no-speaker {
		padding-top: 20px;
	}

	.dialogue-text {
		margin: 0;
		font-family: var(--font-body);
		font-size: 1.15rem;
		line-height: 1.5;
		color: var(--color-text);
	}

	.next-slot {
		display: flex;
		justify-content: flex-end;
	}
</style>
