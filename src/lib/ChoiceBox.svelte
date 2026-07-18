<script>
	/** @type {{ description: string, onclick?: () => void }} */
	let { description, onclick } = $props()
</script>

<button class="choice-box" {onclick}>
	{description}
</button>

<style>
	.choice-box {
		width: 100%;
		text-align: center;
		background: var(--color-box);
		border: none;
		border-radius: var(--radius);
		padding: 16px 24px;
		font-family: var(--font-body);
		font-size: 1.05rem;
		font-weight: 600;
		color: var(--color-text);
		cursor: pointer;
		box-shadow: var(--shadow-box);
		transition: background 0.15s ease, transform 0.15s ease;
	}

	.choice-box:hover {
		background: var(--color-box-hover);
		transform: translateY(-2px);
	}

	.choice-box:active {
		transform: translateY(0);
		background: var(--color-box-deep);
	}

	.choice-box:focus-visible {
		outline: 2px solid var(--color-text);
		outline-offset: 2px;
	}
</style>
