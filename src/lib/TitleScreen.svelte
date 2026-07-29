<script>
    /** @type {{onclick?: () => void}} */
    let {onclick} = $props()

    function handleClick() {
        onclick?.()
    }
</script>

<div class="holder">
    <div class="title">STFAITH FEP3</div>
    <button onclick={handleClick}>Start</button>
</div>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Oleo+Script:wght@400;700&display=swap');

    .holder {
        background-image: url('../../public/scenes/bg.png');
        height: 100%;
		display: flex;
		flex-direction: column;
		gap: 25rem;
		align-items: center;
		justify-content: center;
		font-size: 3rem;
        font-family: var(--font-display);
		color: var(--color-text-soft);
		text-align: center;
		padding: 24px;
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

    .title {
		font-family: "Oleo Script", system-ui;
        font-weight: 700;
        font-style: normal;
        color:snow;
        -webkit-text-fill-color: var(--color-box);
        -webkit-text-stroke: 2px var(--color-text-soft);
    }
</style>