<script>
    import { player, gameState } from "./gameState.svelte";
    let onclick = $props()

    function handleClick() {
        onclick?.()
    }
</script>

<div class="bg">
    <div class="status-message">
        <div class="title">The story has ended.</div>
        <div class="scores">
            <div class="inner">
                <div>Believe: {player.score.believe}</div>
                <div>Doing: {player.score.doing}</div>
                <div>Trust: {player.score.trust}</div>
            </div>
            <div>
                {#if gameState.endingCategory === 'integral'}
                    You have obtained <span class="ending">total integral faith.</span>
                {:else if gameState.endingCategory === 'leaning'}
                    You lean towards <span class="ending">{gameState.ending}.</span>
                {:else}
                    You heavily lean towards <span class="ending">{gameState.ending}.</span>
                {/if}
            </div>
        </div>
        <button onclick={handleClick}>Restart</button>
    </div>
</div>

<style>
    .bg {
        background-image: url('/scenes/ending.png');
        background-size: cover;
        background-repeat: no-repeat;
        width: 100%;
        min-height: 100vh;           
    }

    .status-message {
		height: 100%;
		display: flex;
		flex-direction: column;
		gap: 10rem;
		align-items: center;
		justify-content: center;
		font-family: var(--font-display);
		font-size: 1.3rem;
		color: var(--color-text-soft);
		text-align: center;
		padding: 24px;
	}

    .scores {
        display: flex;
        flex-direction: column;
        gap: 3rem;
    }

    .inner {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .title {
		font-family: "Oleo Script", system-ui;
        font-weight: 700;
        font-style: normal;
        font-size: 3rem;
        color:snow;
        -webkit-text-fill-color: var(--color-box);
        -webkit-text-stroke: 2px var(--color-text-soft);
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
		padding: 10px;
		font-family: var(--font-body);
		font-size: 1.05rem;
		font-weight: 600;
        width: 7rem;
    }

    button:hover {
		background: var(--color-box-hover);
		transform: translateY(-2px);
		color: var(--color-text-soft);
	}

    .ending {
        -webkit-text-fill-color:tomato;
        -webkit-text-stroke: 1px sienna;
    }
</style>