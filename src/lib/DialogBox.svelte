<script>
	import { interpolate } from './gameState.svelte.js'
	import NextSceneButton from './NextSceneButton.svelte'

	const CHARS_PER_SECOND = 45

	/** @type {{ speaker?: string|null, dialogue: string, showNext?: boolean, onNext?: () => void, onComplete?: () => void }} */
	let { speaker = null, dialogue = '', showNext = false, onNext, onComplete } = $props()

	let fullText = $derived(interpolate(dialogue))
	let displayedText = $state('')
	let isTyping = $state(false)
	let isComplete = $state(false)

	$effect(() => {
		const text = fullText
		displayedText = ''
		isComplete = false

		if (!text.length) {
			isTyping = false
			isComplete = true
			onComplete?.()
			return
		}

		isTyping = true
		let i = 0
		const intervalMs = 1000 / CHARS_PER_SECOND
		const id = setInterval(() => {
			i += 1
			displayedText = text.slice(0, i)
			if (i >= text.length) {
				clearInterval(id)
				isTyping = false
				isComplete = true
				onComplete?.()
			}
		}, intervalMs)

		return () => clearInterval(id)
	})

	function handleWindowClick() {
		if (!isTyping) return
		displayedText = fullText
		isTyping = false
		// Don't call onComplete - user needs to click again
	}

	// Handle click when text is fully displayed but not complete (skipped case)
	function handleDialogClick() {
		if (isTyping) return
		if (!isComplete) {
			// User skipped text, now they click again to mark it complete
			isComplete = true
			onComplete?.()
		}
	}
</script>

<svelte:window onclick={handleWindowClick} />

<div class="dialog-wrap" onclick={handleDialogClick}>
	{#if speaker}
		<div class="speaker-tab">{speaker}</div>
	{/if}
	<div class="dialog-box" class:no-speaker={!speaker}>
		<p class="dialogue-text" class:typing={isTyping}>{displayedText}</p>
		{#if showNext && isComplete && !isTyping}
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
		background: rgba(154, 129, 154, 0.8);
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
		border: 4px solid darksalmon;
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

	.dialogue-text.typing::after {
		content: '';
		display: inline-block;
		width: 2px;
		height: 1em;
		margin-left: 2px;
		background: var(--color-text);
		vertical-align: text-bottom;
		animation: caret-blink 0.8s step-start infinite;
	}

	@keyframes caret-blink {
		50% {
			opacity: 0;
		}
	}

	.next-slot {
		display: flex;
		justify-content: flex-end;
	}
</style>