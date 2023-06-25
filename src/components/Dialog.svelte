<script>
	export let dialog;
</script>

<dialog
	class="p-8 bg-[#111111] text-accent1-200 font-bold font-inter text-xl shadow-lg border-2 border-accent1-600 max-w-xs text-center pointer-events-none"
	bind:this={dialog}
	on:close
>
	<slot />
</dialog>
