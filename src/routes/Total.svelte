<script>
	import Star from './Star.svelte';

	import { fly } from 'svelte/transition';
	/** @type {number[]}*/
	export let ratings;

	$: total = ratings.reduce((acc, rating) => acc + rating, 0) / ratings.length;
</script>

{#if ratings.every((rating) => !!rating)}
	<div
		transition:fly={{ y: 37, opacity: 0, duration: 700 }}
		class={$$props.class + ' text-center '}
	>
		<p class="py-4 text-2xl capitalize">
			Total ({total.toFixed(1)})
		</p>
		<div
			class={`flex justify-center
			${total < 2 ? '[--fill-color:theme(colors.red.400)]' : ''}
			${total < 3 ? '[--fill-color:theme(colors.orange.400)]' : ''}
			${total >= 3 ? '[--fill-color:theme(colors.yellow.400)]' : ''}
		`}
		>
			{#each Array.from({ length: 5 }) as _, i}
				<span>
					<Star
						percentage={i <= Math.floor(total - 1)
							? 100
							: i > Math.floor(total)
							? 0
							: (total % 1) * 100}
					/>
				</span>
			{/each}
		</div>
	</div>
{/if}
