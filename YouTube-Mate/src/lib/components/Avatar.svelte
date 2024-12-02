<script lang="ts">
	/* eslint-disable import/no-unresolved */
	import { onMount } from 'svelte';
	import { setupViewTransition } from 'sveltekit-view-transition';

	export let avatarUrl = '';
	export let altText = '';
	export let channelId = '';

	let currentUrl = '';
	let showFallback = false;

	const fallbackText =
		altText
			.split(' ')
			.slice(0, 3)
			.map((w) => w[0])
			.join('') || '??';
	onMount(() => {
		currentUrl = avatarUrl;
	});
	const { transition } = setupViewTransition();
</script>

{#if !showFallback}
	<img
		class="mr-1 inline-block h-14 w-14 rounded-full"
		referrerpolicy="no-referrer"
		src={currentUrl}
		alt={altText}
		use:transition={`avatar-${channelId}`}
		on:error={() => {
			showFallback = true;
		}} />
{:else}
	<span class="mr-1 inline-flex h-14 w-14 items-center justify-center rounded-full bg-secondary-500"
		>{fallbackText}</span>
{/if}
