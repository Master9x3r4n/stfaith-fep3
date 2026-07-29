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
		width: 80vw;
		max-width: 850px;
		margin-left: 50%;
		transform: translateX(-50%);
	}

	.speaker-tab {
		position: absolute;
		top: -45px;
		left: 24px;
		background: #9A819A;
		color: #FDF6E3;
		font-family: var(--font-body);
		font-weight: 700;
		font-size: 1rem;
		padding: 8px 20px;
		border-radius: var(--radius) var(--radius) 0 0;
		border: 3px solid rgb(246, 133, 96);
		border-bottom-style: none;
	}

	.dialog-box {
		background: var(--color-box);
		border-radius: var(--radius);
		padding: 22px 26px 16px;
		box-shadow: var(--shadow-box);
		min-height: 130px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 10px;
		border: 5px solid darksalmon;
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
