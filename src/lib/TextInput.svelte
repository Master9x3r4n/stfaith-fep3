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
        justify-content: center;
        gap: 5px;
    }
</style>