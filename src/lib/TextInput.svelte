<script>
    import { player } from "./gameState.svelte";

    /** @type {{onclick?: () => void}} */
    let {onclick} = $props()
    let name = $state('');

    function handleClick() {
        player.name = name;
        onclick?.()
    }
</script>

<div class='text-input'>
    <input bind:value={name}/>
    <button onclick={handleClick}>next</button>
</div>

<style>
    .text-input {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 5px;
        padding: 150px;
    }

    button {
        background: var(--color-box);
		border-radius: var(--radius);
		box-shadow: var(--shadow-box);
		transition: background 0.15s ease, transform 0.15s ease;
		border: 5px solid darksalmon;
		cursor: pointer;
		color: var(--color-text);
		border-radius: var(--radius);
		padding: 10px 10px;
		font-family: var(--font-body);
		font-size: 1.05rem;
		font-weight: 600;
        width: 5rem;
    }

    button:hover {
		background: var(--color-box-hover);
		transform: translateY(-2px);
		color: var(--color-text-soft);
	}

    input {
        width: 20rem;
        background: var(--color-box);
		border-radius: var(--radius);
		border: 5px solid darksalmon;
		color: var(--color-text);
		font-family: var(--font-body);
		font-size: 1.05rem;
		font-weight: 600;
		padding: 10px 10px;
    }
</style>