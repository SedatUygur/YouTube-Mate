<script lang="ts">
	/* eslint-disable import/no-unresolved */
	/* eslint-disable import-x/no-duplicates */
	/* eslint-disable @typescript-eslint/no-non-null-assertion */
	/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
	/* eslint-disable @typescript-eslint/no-unsafe-argument */
	/* eslint-disable @typescript-eslint/no-unsafe-assignment */
	/* eslint-disable @typescript-eslint/no-unsafe-call */
	/* eslint-disable @typescript-eslint/no-unsafe-member-access */
	/* eslint-disable @typescript-eslint/no-unsafe-return */
	/* eslint-disable @typescript-eslint/restrict-template-expressions */
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import anchorme from 'anchorme';
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import { MessageSquareText, ThumbsUp } from 'lucide-svelte';
	import { formatNumberCompact, formatRelativeDate, parseDescription } from '$lib/formatters';
	import { inview, type ObserverEventDetails, type Options } from 'svelte-inview';
	import VideoPlayerStore from '$lib/stores/VideoPlayerStore.ts';
	import ViewCount from '$lib/components/ViewCount.svelte';
	import YouTubeVideo from '$lib/components/YouTubeVideo.svelte';
	import Avatar from '$lib/components/Avatar.svelte';

	export let data;
	export let username = $page.params.username;

	let breadcrumbs: HTMLDivElement;
	let videoStats: HTMLDivElement;
	let videoWrapperElement: HTMLDivElement;

	let descriptionVisible = false;
	const anchorClassnames = 'text-secondary-500 underline';

	$: videoPromise = data.streamed.videos.then((videos) =>
		videos.find((v) => v.videoId === $page.params.videoid)
	);

	$: channelPromise = videoPromise.then((video) =>
		data.list.items.find((item) => item.meta.originId === video?.channelId)
	);

	beforeNavigate((navigation) => {
		if (navigation.from?.url.pathname === navigation.to?.url.pathname) {
			window.history.replaceState(null, '', navigation.to?.url);
			const seconds = navigation.to?.url.searchParams.get('t');
			if (seconds) {
				VideoPlayerStore.set({
					type: 'seekTo',
					value: Number(seconds),
				});
				videoWrapperElement.scrollIntoView({
					behavior: 'smooth',
				});
			}
			navigation.cancel();
		}
	});

	afterNavigate((navigation) => {
		breadcrumbs.scrollIntoView({
			behavior: 'smooth',
		});
		descriptionVisible = false;
		VideoPlayerStore.set({
			type: 'setVideoId',
			value: navigation.to?.params?.videoid!,
		});
		const seconds = navigation.to?.url.searchParams.get('t');
		if (seconds) {
			VideoPlayerStore.set({
				type: 'seekTo',
				value: Number(seconds),
			});
		}
	});

	const toggleDescription = () => {
		descriptionVisible = !descriptionVisible;
		if (!descriptionVisible) {
			videoStats.scrollIntoView({
				behavior: 'smooth',
			});
		}
	};

	let isInView;

	const options: Options = {
		rootMargin: '50px',
		unobserveOnEnter: true,
	};
	const handleChange = ({ detail }: CustomEvent<ObserverEventDetails>) =>
		(isInView = detail.inView);
</script>

<div bind:this={breadcrumbs} class="flex w-full flex-wrap gap-2 text-2xl">
	<a href={`/${username}/${data.list.slug}`}>{data.list.title}</a>
	<span class="crumb-separator" aria-hidden="true">&rsaquo;</span>
	<span class="overflow-hidden break-words">
		{#await videoPromise}
			Loading...
		{:then video}
			{#if video}
				{video.title}
			{:else}
				Not Found...
			{/if}
		{/await}
	</span>
</div>
<div class="my-4 w-full">
	{#await videoPromise}
		<span class="grid w-full place-items-center p-4">
			<ProgressRadial class="ml-2 h-8 w-8" stroke={100} />
		</span>
	{:then video}
		{#if video}
			<div bind:this={videoWrapperElement} class="aspect-video w-full">
				<YouTubeVideo videoId={video.videoId} />
			</div>
			<div class="light:text-gray-200 unstyled card p-4 text-2xl dark:text-gray-400">
				{#await channelPromise}
					<span class="grid w-full place-items-center p-4">
						<ProgressRadial class="ml-2 h-8 w-8" stroke={100} />
					</span>
				{:then channel}
					{#if channel}
						<div
							use:inview={options}
							on:inview_change={handleChange}
							class="mb-2 flex items-center gap-2">
							{#if isInView}
								<Avatar
									avatarUrl={channel.meta.imageUrl}
									altText={channel.name}
									channelId={channel.id.toString()}
									listId={data.list.id} />
							{/if}
							<div class="font-bold">{channel.name}</div>
						</div>
					{/if}
				{/await}
				<div bind:this={videoStats} class="mb-4 flex items-center gap-4">
					<span class="variant-soft-primary chip flex gap-2 text-2xl"
						>{formatNumberCompact(video.likeCount, data.locale)} <ThumbsUp /></span>
					<span class="variant-soft-primary chip flex gap-2 text-2xl"
						>{formatNumberCompact(video.commentCount, data.locale)} <MessageSquareText /></span>
					<ViewCount locale={data.locale} viewCount={video.viewCount} />
					<span>{formatRelativeDate(video.publishedAt, data.locale)}</span>
				</div>
			</div>
			<div
				data-testid="video-description"
				class:h-16={!descriptionVisible}
				class="light:text-gray-200 unstyled card relative mt-4 overflow-hidden whitespace-pre-wrap break-words p-4 text-2xl dark:text-gray-400">
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				{@html anchorme({
					input: parseDescription(video.description, anchorClassnames),
					options: {
						attributes: {
							rel: 'noopener noreferrer',
							target: '_blank',
							class: anchorClassnames,
						},
					},
				})}
				<button
					class="absolute bottom-[1px] right-4 inline-block bg-gradient-to-r from-transparent from-5% via-surface-100 p-2 pl-6 font-bold hover:cursor-pointer hover:text-primary-500 dark:via-surface-800"
					on:click={toggleDescription}>{descriptionVisible ? 'Show less' : '...more'}</button>
			</div>
		{:else}
			<h2>Not Found</h2>
		{/if}
	{/await}
</div>
