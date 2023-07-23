<script>
	export let percentage = 100;
</script>

<span class={`relative block aspect-square h-12 ${$$props.class}`}>
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5">
		<!-- star with only the fill -->
		<use
			href="#star"
			class="absolute inset-0 fill-[--fill-color,theme(colors.gray.50)] stroke-transparent transition-[fill,clip-path] duration-500"
			style="clip-path: polygon(0 0, {percentage}% 0, {percentage}% 100%, 0 100%);"
		/>
		<!-- star with only the stroke -->
		<use
			href="#star"
			class="absolute inset-0 fill-transparent stroke-[--stroke-color,theme(colors.gray.800)] transition-[fill] duration-500"
		/>
	</svg>
</span>
