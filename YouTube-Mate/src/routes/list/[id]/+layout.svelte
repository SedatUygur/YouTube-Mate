<script lang="ts">
	/* eslint-disable import/no-unresolved */

	/* eslint-disable @typescript-eslint/no-unsafe-argument */
	/* eslint-disable @typescript-eslint/no-unsafe-member-access */
	/* eslint-disable @typescript-eslint/restrict-template-expressions */
	import { LL } from '$lib/i18n/i18n-svelte';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import YouTubeThumbnail from '$lib/components/YouTubeThumbnail.svelte';
	import ChannelCard from '$lib/components/ChannelCard.svelte';
	import type { YouTubeVideoAPIResponse } from '$lib/YouTubeAPI';
	import { page } from '$app/stores';
	import { setupViewTransition } from 'sveltekit-view-transition';

	export let data;

	let filter = '';
	let timeout: NodeJS.Timeout;

	const filterVideos = (videos: YouTubeVideoAPIResponse[], filterString = '') => {
		if (filterString === '') return videos;
		const filterRegexp = new RegExp(filterString, 'i');
		return videos.filter(
			(video) => video.description.match(filterRegexp) ?? video.title.match(filterRegexp)
		);
	};

	const updateFilter = (e: Event & { currentTarget: EventTarget & HTMLInputElement }) => {
		const { value } = e.target as HTMLInputElement;
		clearTimeout(timeout);
		// immediately clear filter when input field is cleared
		if (value === '') {
			filter = value;
			return;
		}
		// debounce filter
		timeout = setTimeout(() => {
			filter = value;
		}, 500);
	};
	const { transition } = setupViewTransition();
</script>

<slot />
{#if !$page.params.videoid}
	<h2 use:transition={'title'} data-testid="list-title" class="inline font-bold">
		{data.list?.title}
	</h2>
	<p>{data.list?.description}</p>
	<div
		class="my-4 grid grid-cols-1 place-content-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
		data-testid="channel-card-list">
		{#each data.list.items as item}
			{#if item.meta.youtubeMeta}
				<ChannelCard locale={data.locale} channel={item.meta.youtubeMeta} />
			{/if}
		{/each}
	</div>
	{#if data.session?.user?.id === data.list.userId}
		<div class="mb-4 flex justify-end">
			<a href={`/protected/edit/${data.list.id}`} class="variant-ghost-primary btn"
				>{$LL.buttons.edit()}</a>
		</div>
	{/if}
{/if}
<div>
	{#await data.streamed.videos}
		<span class="grid w-full place-items-center p-4">
			<ProgressRadial class="ml-2 h-8 w-8" stroke={100} />
		</span>
	{:then videos}
		<div class="my-4">
			<label class="label">
				<span>{$LL.labels.filter()}</span>
				<input on:input={updateFilter} class="input" />
			</label>
		</div>
		<div class="video-grid" data-testid="video-list">
			{#each filterVideos(videos, filter) as video}
				<YouTubeThumbnail
					active={$page.params.videoid === video.videoId}
					locale={data.locale}
					{video} />
			{/each}
		</div>
	{/await}
</div>
