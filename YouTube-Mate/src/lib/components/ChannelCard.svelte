<script lang="ts">
	/* eslint-disable @typescript-eslint/no-unnecessary-condition */
	/* eslint-disable @typescript-eslint/no-unsafe-call */
	import { onMount } from 'svelte';
	import type { YouTubeChannelMetaAPIResponse } from '$/lib/YouTubeAPI';
	import Avatar from './Avatar.svelte';

	export let channel: YouTubeChannelMetaAPIResponse;
	export let locale: string;
	export let compact = false;
	export let shouldFocus = false;

	let element: HTMLDivElement | null = null;

	onMount(() => {
		if (element && shouldFocus) {
			element.scrollIntoView({
				behavior: 'smooth',
			});
		}
	});

	const subscriberFormatter = new Intl.NumberFormat(locale, {
		notation: 'compact',
		compactDisplay: 'short',
	});
</script>

<div
	bind:this={element}
	class="card overflow-hidden p-4"
	class:grid={compact}
	class:content-center={compact}>
	<header>
		<div class="flex gap-2" class:flex-col={compact} class:items-center={compact}>
			<Avatar avatarUrl={channel.avatarUrl} altText={channel.name} />
			{#if compact}
				<div class="text-center font-bold">{channel.name}</div>
			{:else}
				<div>
					<div class="font-bold">{channel.name}</div>
					<div>{channel.customUrl}</div>
					<div>
						{subscriberFormatter.format(Number(channel.subscriberCount))} subscribers
					</div>
					<div>
						{subscriberFormatter.format(Number(channel.viewCount))} views
					</div>
					<div>
						{subscriberFormatter.format(Number(channel.videoCount))} videos
					</div>
				</div>
			{/if}
		</div>
	</header>
	{#if $$slots.default}
		<footer class="card-footer mt-4 flex justify-end" class:justify-center={compact}>
			<slot />
		</footer>
	{/if}
</div>
