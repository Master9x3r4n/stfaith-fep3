<script>
	const IMAGE_DIR = '/scenes'
	const IMAGE_EXT = 'png'

	/** @type {{ display?: string }} */
	let { display = '' } = $props()

	let imageUrl = $derived(display ? `${IMAGE_DIR}/${display}.${IMAGE_EXT}` : '')
</script>

<div
	class="scene-display"
	style={imageUrl ? `background-image: url('${imageUrl}')` : ''}
>
	{#if !display}
		<div class="fallback">
			<span>No scene image set</span>
		</div>
	{/if}
</div>

<style>
	.scene-display {
		position: absolute;
		inset: 0;
		background-color: var(--color-bg);
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
	}

	.fallback {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.fallback span {
		font-family: var(--font-body);
		font-size: 0.85rem;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: var(--color-text-soft);
		opacity: 0.5;
	}
</style>
