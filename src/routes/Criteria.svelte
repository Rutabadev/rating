<script>
	import Star from './Star.svelte';
	import { createEventDispatcher, tick } from 'svelte';

	const dispatch = createEventDispatcher();

	export let criteria = 'Criteria';
	/** @type {number | undefined} */
	let hoveredIndex;
	/** @type {number | undefined} */
	let selectedIndex;
	let jump = false;

	/**
	 * @param {number | undefined} selectedIndex
	 * @param {number | undefined} hoveredIndex
	 * @param {number} i
	 */
	function getColor(selectedIndex, hoveredIndex, i) {
		if (selectedIndex === 0 && i <= selectedIndex) return '[--fill-color:theme(colors.red.400)]';
		if (selectedIndex === 1 && i <= selectedIndex) return '[--fill-color:theme(colors.orange.400)]';
		if (selectedIndex && selectedIndex > 1 && i <= selectedIndex)
			return '[--fill-color:theme(colors.yellow.400)]';
		if (hoveredIndex && i <= hoveredIndex) return '[--fill-color:theme(colors.yellow.400/50%)]';
		return '[--fill-color:theme(colors.gray.50)]';
	}
</script>

<div class="text-center">
	<p class="py-4 text-2xl capitalize">{criteria}</p>
	<div class="flex justify-center" on:mouseleave={() => (hoveredIndex = undefined)} role="group">
		{#each Array.from({ length: 5 }) as _, i}
			<button
				class={`group ${getColor(selectedIndex, hoveredIndex, i)}`}
				class:jump={jump && selectedIndex !== undefined && selectedIndex >= i}
				style="animation-delay: {i * 100}ms"
				on:mouseenter={() => (hoveredIndex = i)}
				on:click={async () => {
					jump = false;
					setTimeout(() => (jump = true));
					if (selectedIndex === i) {
						selectedIndex = undefined;
						dispatch('rating', undefined);
						return;
					}
					selectedIndex = i;
					dispatch('rating', i + 1);
				}}
			>
				<Star class="transition-transform group-hover:scale-125 " />
			</button>
		{/each}
	</div>
</div>

<style lang="postcss">
	@keyframes jump {
		0% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-0.5rem);
		}
		100% {
			transform: translateY(0);
		}
	}

	.jump {
		animation: jump 0.5s ease-in-out;
	}
</style>
