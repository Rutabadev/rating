<script>
	import Star from './Star.svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let criteria = 'Criteria';
	/** @type {number | undefined} */
	let hoveredIndex;
	/** @type {number | undefined | null} */
	let selectedIndex;
	/** @type {number | undefined | null} */
	let lastSelectedIndex;
	let triggerAnimations = false;

	/**
	 * @param {number | undefined | null} selectedIndex
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

	/**
	 * @param {number | undefined | null} selectedIndex
	 * @param {number} i
	 */
	function shouldJump(selectedIndex, i) {
		return (selectedIndex || selectedIndex === 0) && i <= selectedIndex;
	}

	/**
	 * @param {number | undefined | null} selectedIndex
	 * @param {number | undefined | null} lastSelectedIndex
	 * @param {number} i
	 */
	function shouldWiggle(selectedIndex, lastSelectedIndex, i) {
		// deselect criteria
		if (selectedIndex === null) return true;
		// select criteria lower than selected
		if (
			(!!selectedIndex || selectedIndex === 0) &&
			!!lastSelectedIndex &&
			selectedIndex < lastSelectedIndex &&
			i > selectedIndex &&
			i <= lastSelectedIndex
		)
			return true;
		return false;
	}
</script>

<div class="text-center">
	<p class="py-4 text-2xl capitalize">{criteria}</p>
	<div class="flex justify-center" on:mouseleave={() => (hoveredIndex = undefined)} role="group">
		{#each Array.from({ length: 5 }) as _, i}
			<button
				class={`group ${getColor(selectedIndex, hoveredIndex, i)}`}
				class:jump={triggerAnimations && shouldJump(selectedIndex, i)}
				style="animation-delay: {i * 100}ms"
				class:wiggle={triggerAnimations && shouldWiggle(selectedIndex, lastSelectedIndex, i)}
				on:mouseenter={() => (hoveredIndex = i)}
				on:click={async () => {
					// remove the animtion classes
					triggerAnimations = false;
					// re compute wich animation to play
					setTimeout(() => (triggerAnimations = true));
					if (selectedIndex === i) {
						selectedIndex = null;
						dispatch('rating', undefined);
						return;
					}
					lastSelectedIndex = selectedIndex;
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

	@keyframes wiggle {
		0% {
			transform: translateX(0);
		}
		25% {
			transform: translateX(-3px) rotate(-1deg);
		}
		50% {
			transform: translateX(3px) rotate(1deg);
		}
		75% {
			transform: translateX(-3px) rotate(-1deg);
		}
		100% {
			transform: translateX(0);
		}
	}

	.wiggle {
		animation: wiggle 0.3s ease-in-out;
		animation-delay: 0ms; /* override delay from jump */
	}
</style>
