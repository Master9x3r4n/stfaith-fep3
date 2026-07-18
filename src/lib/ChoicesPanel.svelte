<script>
	import ChoiceBox from './ChoiceBox.svelte'

	/** @type {{ choices: Array<{choiceNumber: number, description: string}>, onSelect?: (choiceNumber: number) => void }} */
	let { choices = [], onSelect } = $props()
</script>

<div class="choices-panel">
	{#each choices as choice (choice.choiceNumber)}
		<ChoiceBox
			description={choice.description}
			onclick={() => onSelect?.(choice.choiceNumber)}
		/>
	{/each}
</div>

<style>
	.choices-panel {
		display: flex;
		flex-direction: column;
		gap: 12px;
		width: 100%;
	}
</style>
