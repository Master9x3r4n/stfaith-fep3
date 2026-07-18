<script>
	/** @type {{ onclick?: () => void }} */
	let { onclick } = $props()
</script>

<button class="next-scene-button" {onclick} aria-label="Next">
	next <span class="chevron">›</span>
</button>

<style>
	.next-scene-button {
		background: none;
		border: none;
		padding: 4px 2px;
		cursor: pointer;
		font-family: var(--font-display);
		font-style: italic;
		font-size: 1.05rem;
		color: var(--color-text);
		display: inline-flex;
		align-items: baseline;
		gap: 4px;
		transition: transform 0.15s ease, opacity 0.15s ease;
	}

	.next-scene-button:hover {
		transform: translateX(3px);
		opacity: 0.75;
	}

	.next-scene-button:focus-visible {
		outline: 2px solid var(--color-text);
		outline-offset: 3px;
		border-radius: 4px;
	}

	.chevron {
		font-size: 1.2rem;
		line-height: 1;
	}
</style>
