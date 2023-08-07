<script>
	import { cubicIn, cubicOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import Star from './Star.svelte';

	/** @type {number[]}*/
	export let ratings;

	$: total = ratings.reduce((acc, rating) => acc + rating, 0) / ratings.length;
</script>

{#if ratings.every((rating) => !!rating)}
	<div class={$$props.class + ' text-center'}>
		<p
			in:fly={{ y: 37, opacity: 0, duration: 500, easing: cubicOut }}
			out:fly={{ y: 37, opacity: 0, delay: 300, duration: 500, easing: cubicIn }}
			class="py-4 text-2xl capitalize"
		>
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
				<span
					in:fly|global={{ y: 37, duration: 500, delay: 100 * i, easing: cubicOut }}
					out:fly|global={{ y: 37, duration: 500, delay: 100 * i, easing: cubicIn }}
				>
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
