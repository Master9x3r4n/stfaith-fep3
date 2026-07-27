<script>
	const IMAGE_DIR = '/scenes'
	const IMAGE_EXT = 'png'

	/** @type {{ bg?: string, char1?: string, char2?: string }} */
	let { bg = '', char1 = '', char2 = '' } = $props()

    let bgUrl = $derived(bg ? `${IMAGE_DIR}/${bg}.${IMAGE_EXT}` : '')
    let char1Url = $derived(char1 ? `${IMAGE_DIR}/${char1}.${IMAGE_EXT}` : '')
    let char2Url = $derived(char2 ? `${IMAGE_DIR}/${char2}.${IMAGE_EXT}` : '')
</script>

<div
    class="scene-display"
    style={bgUrl ? `background-image: url('${bgUrl}')` : ''}
>
    {#if char1Url}
        <img class="character char-left" src={char1Url} alt="Character Left" />
    {/if}

    {#if char2Url}
        <img class="character char-right" src={char2Url} alt="Character Right" />
    {/if}

    {#if !bg && !char1 && !char2}
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
        overflow: hidden;
    }

    .character {
        position: absolute;
        bottom: 0;
        max-height: 85%;
        object-fit: contain;
        pointer-events: none;
    }

    .char-left {
        left: 20%;
        transform: translateX(-50%);
    }

    .char-right {
        right: 20%;
        transform: translateX(50%);
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