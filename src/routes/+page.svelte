<script>
	import { onMount } from 'svelte';
	import PlayGrid from '../components/PlayGrid.svelte';
	import { fly } from 'svelte/transition';

	let visible = false;

	onMount(() => {
		visible = true;
	});
</script>

<div class="w-full max-w-[33rem] p-5 pt-8 mx-auto font-inter text-gray-200">
	{#if visible}
		<div class="w-full flex flex-col gap-8 items-center" in:fly={{ duration: 1400 }}>
			<h1
				class="bg-clip-text text-transparent font-extrabold text-6xl bg-gradient-to-r from-accent1-400 to-accent2-400 uppercase"
			>
				harakiri
			</h1>
			<PlayGrid />
		</div>
	{/if}
</div>
