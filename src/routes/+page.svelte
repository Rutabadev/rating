<script>
	import Criteria from './Criteria.svelte';
	import SvgInjection from './SvgInjection.svelte';
	import Total from './Total.svelte';

	const criterias = ['design', 'fonctionnement', 'animations', 'feeling general'];
	/** @type {number[]} */
	let ratings = new Array(criterias.length).fill(null);
</script>

<main
	class="mx-auto mt-24 grid max-w-2xl grid-cols-2 place-content-center gap-6 px-10 font-extrabold tracking-tighter [font-family:Futura,ui-serif,Georgia,Cambria,'Times_New_Roman',Times,serif]"
>
	{#each criterias as criteria, i}
		<Criteria on:rating={(event) => (ratings[i] = event.detail)} {criteria} />
	{/each}
	<Total {ratings} class="col-span-2" />
	<SvgInjection />
</main>
