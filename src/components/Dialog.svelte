<script>
	export let dialog;
	export let text;
</script>

<dialog
	class="p-8 bg-[#111111] text-accent1-200 font-bold text-xl shadow-lg border-2 border-accent1-600 max-w-xs text-center pointer-events-none"
	bind:this={dialog}
	on:close
>
	<slot />
</dialog>
