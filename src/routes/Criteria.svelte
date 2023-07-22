<script>
	import Star from './Star.svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let criteria = 'Criteria';
	/** @type {number | undefined} */
	let hoveredIndex;
	/** @type {number | undefined} */
	let selectedIndex;
</script>

<div class="text-center">
	<p class="py-4 text-2xl capitalize">{criteria}</p>
	<div class="flex justify-center" on:mouseleave={() => (hoveredIndex = undefined)} role="group">
		{#each Array.from({ length: 5 }) as _, i}
			<button
				class={`
					${selectedIndex === 0 && i <= selectedIndex ? '![--fill-color:theme(colors.red.400)]' : ''}
					${selectedIndex === 1 && i <= selectedIndex ? '![--fill-color:theme(colors.orange.400)]' : ''}
					${
						selectedIndex && selectedIndex > 1 && i <= selectedIndex
							? '![--fill-color:theme(colors.yellow.400)]'
							: ''
					}
					${hoveredIndex && i <= hoveredIndex ? '[--fill-color:theme(colors.yellow.400/50%)]' : ''}
				`}
				on:mouseenter={() => (hoveredIndex = i)}
				on:click={() => {
					if (selectedIndex === i) {
						selectedIndex = undefined;
						dispatch('rating', undefined);
						return;
					}
					selectedIndex = i;
					dispatch('rating', i + 1);
				}}
			>
				<Star />
			</button>
		{/each}
	</div>
</div>
