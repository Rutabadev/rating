<script>
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
		<div class="flex justify-center">
			{#each Array.from({ length: 5 }) as _, i}
				<span class="[--stroke-color:theme(colors.gray.800)]">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						class="aspect-square h-8 fill-[--fill-color,white] stroke-[--stroke-color]"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
						/>
					</svg>
				</span>
			{/each}
		</div>
	</div>
{/if}
