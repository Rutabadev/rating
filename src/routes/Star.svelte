<script>
	export let percentage = 100;
</script>

<span class={`relative block aspect-square h-12 ${$$props.class}`}>
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5">
		<symbol id="star">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
			/>
		</symbol>
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
