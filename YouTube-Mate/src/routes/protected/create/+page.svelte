<script lang="ts">
	/* eslint-disable import/no-unresolved */
	/* eslint-disable import-x/no-unresolved */
	/* eslint-disable @typescript-eslint/no-floating-promises */
	/* eslint-disable @typescript-eslint/no-unsafe-call */
	/* eslint-disable @typescript-eslint/no-unsafe-member-access */
	/* eslint-disable @typescript-eslint/restrict-template-expressions */
	//import Seo from '$/routes/SEO.svelte';
	import { browser } from '$app/environment';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import SEO from '$lib/SEO/components/index.svelte';
	import { LL } from '$lib/i18n/i18n-svelte';
	import type { ActionData, PageData } from '../../$types';
	import type { YouTubeChannelMetaAPIResponse } from '$/lib/YouTubeAPI';
	import ChannelCard from '../../ChannelCard.svelte';
	import ChannelCardActions from '../../ChannelActions.svelte';
	import ChannelSearch from '../../ChannelSearch.svelte';
	export let data: PageData;
	export let form: ActionData;

	let channels: YouTubeChannelMetaAPIResponse[] = [];
	$: channelIds = channels.reduce((byId, channel, index) => {
		if (channel.originId) {
			byId.set(channel.originId, index);
		}
		return byId;
	}, new Map<string, number>());
	$: channelIdList = [...channelIds.keys()];

	$: if (form?.success) {
		const url = `/list/${form.listId}`;
		if (browser) {
			goto(url);
		}
	}
	let title = 'Create List';
	let metadescription = 'Create List with title, description and visiblity options';
	const breadcrumbs = [
		{
			name: 'Home',
			slug: '',
		},
		{
			name: 'Protected Onboarding',
			slug: 'onboarding',
		},
	];
	const seoProps = {
		breadcrumbs,
		title,
		metadescription,
		slug: 'create',
		datePublished: '2024-11-29T14:19:33.000+0100',
		lastUpdated: '2024-11-29T14:19:33.000+0100',
	};
</script>

<SEO {...seoProps} />
<form action="?/create" class="mx-auto mt-4 flex max-w-lg flex-col gap-4" method="post" use:enhance>
	{#if form?.error}
		<aside class="alert variant-filled-error">
			<div class="alert-message">
				<p class="whitespace-pre-line">{form.error}</p>
			</div>
		</aside>
	{/if}
	<label class="label">
		<span>{$LL.labels.title()}</span>
		<input class="input" type="text" name="title" required />
	</label>
	<label class="label">
		<span>{$LL.labels.description()}</span>
		<textarea class="textarea" name="description"></textarea>
	</label>
	<label class="label">
		<span>{$LL.labels.visibility()}</span>
		<select class="select" name="visibility" value={data.visibility.Unlisted} required>
			{#each data.visibilities as visibility}
				<option value={visibility}>{$LL.enums.visibility[visibility]()}</option>
			{/each}
		</select>
	</label>
	<span class="label">Channels</span>
	{#if !channels.length}
		<span class="block text-gray-400">Search for a channel below to add it to the list.</span>
	{:else}
		<div class="grid max-h-96 grid-cols-2 overflow-y-auto">
			{#each channels as channel}
				<ChannelCard compact locale={data.locale} {channel}>
					<ChannelCardActions {channel} bind:channels bind:channelIds />
				</ChannelCard>
			{/each}
		</div>
	{/if}
	<select name="channelIds" multiple bind:value={channelIdList} class="hidden">
		{#each channelIdList as channelId}
			<option value={channelId}>{channelId}</option>
		{/each}
	</select>
	<ChannelSearch {form} {data} bind:channels bind:channelIds />
	<div class="flex justify-end">
		<button class="variant-filled-secondary btn">{$LL.buttons.create()}</button>
	</div>
</form>
