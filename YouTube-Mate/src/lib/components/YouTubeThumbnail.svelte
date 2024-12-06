<script lang="ts">
	/* eslint-disable import/no-unresolved */
	import { formatNumberCompact, formatDuration, formatRelativeDate } from '$lib/formatters';
	import type { YouTubeVideoAPIResponse } from '$lib/YouTubeAPI';
	import { page } from '$app/stores';
	import { MessageSquareText, ThumbsUp } from 'lucide-svelte';
	import { inview, type ObserverEventDetails, type Options } from 'svelte-inview';
	import ViewCount from './ViewCount.svelte';

	export let locale: string;
	export let active: boolean;
	export let video: YouTubeVideoAPIResponse;

	let isInView: boolean;

	const options: Options = {
		rootMargin: '50px',
		unobserveOnEnter: true,
	};
	const handleChange = ({ detail }: CustomEvent<ObserverEventDetails>) => {
		isInView = detail.inView;
	};
</script>

<a
	use:inview={options}
	on:inview_change={handleChange}
	href="/{$page.params.username}/{$page.params.slug}/watch/{video.videoId}"
	class:variant-filled-primary={active}
	class="card card-hover block cursor-pointer rounded-lg">
	{#if isInView}
		<div class="relative p-1">
			<img
				loading="lazy"
				class="aspect-video w-full rounded-lg"
				src={video.thumbnails.low}
				alt={video.title} />
			<p
				class="absolute bottom-1 left-1 flex items-end gap-1 rounded-md bg-black bg-opacity-60 px-1.5 py-0.5 text-xs text-white">
				<span class="leading-none">{formatNumberCompact(video.likeCount, locale)}</span>
				<ThumbsUp class="h-4 w-4" />
			</p>
			<p
				class="absolute bottom--1 left-1 flex items-end gap-1 rounded-md bg-black bg-opacity-60 px-1.5 py-0.5 text-xs text-white">
				<span class="leading-none">{formatNumberCompact(video.commentCount, locale)}</span>
				<MessageSquareText class="h-4 w-4" />
			</p>
			<p
				class="absolute bottom-1 right-1 rounded-md bg-white bg-opacity-60 px-1.5 py-0.5 text-white">
				{formatDuration(video.duration)}
			</p>
			<p class="absolute bottom--1 right-1 rounded-md bg-white bg-opacity-60 px-1.5 py-0.5">
				{video.definition}
			</p>
		</div>
		<div class="p-4">
			<p class="font-bold">{video.channelTitle}</p>
			<div
				class:dark:text-gray-400={!active}
				class:light:text-gray-200={!active}
				class="flex justify-between">
				<ViewCount {locale} viewCount={video.viewCount} />
				<span>{formatRelativeDate(video.publishedAt, locale)}</span>
			</div>
			<p class="my-2 line-clamp-2 break-words">{video.title}</p>
			<p class="my-2 line-clamp-2 break-words">{video.description}</p>
		</div>
	{/if}
</a>
