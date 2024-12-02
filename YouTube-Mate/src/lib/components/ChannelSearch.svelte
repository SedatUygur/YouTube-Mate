<script lang="ts">
	/* eslint-disable import/no-unresolved */

	/* eslint-disable @typescript-eslint/no-misused-promises */
	import { LL } from '$lib/i18n/i18n-svelte';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import type { YouTubeChannelMetaAPIResponse } from '$lib/YouTubeAPI';
	//import type { ActionData, PageData } from '../../routes/$types';
	import { applyAction, enhance } from '$app/forms';
	import ChannelCard from './ChannelCard.svelte';
	import ChannelCardActions from './ChannelActions.svelte';

	/*export let form: ActionData;
	export let data: PageData;*/
	export let results: YouTubeChannelMetaAPIResponse[] | undefined;
	export let locale: string;
	export let channels: YouTubeChannelMetaAPIResponse[];
	export let channelIds: Map<string, number>;

	let loading = false;
	let hasSearched = false;
</script>

<form
	class="mt-4 flex flex-col gap-4"
	action="/protected/create?/search"
	use:enhance={() => {
		loading = true;
		hasSearched = true;
		return ({ result }) => {
			loading = false;
			return applyAction(result);
		};
	}}
	method="post">
	<label class="label">
		<span>{$LL.pages.create.labels.channelSearch()}</span>
		<input
			class="input"
			type="text"
			name="search"
			placeholder={$LL.pages.create.messages.channelSearch()} />
	</label>
</form>
<div class="my-4">
	<div class="overflow-y-auto" class:h-96={hasSearched}>
		{#if loading}
			<div class="grid place-content-center">
				<ProgressRadial class="ml-2 h-6 w-6" stroke={100} />
			</div>
		{/if}
		{#if results}
			<div class="results h-full" class:hidden={loading}>
				{#each results as result}
					<ChannelCard {locale} channel={result}>
						<ChannelCardActions channel={result} bind:channels bind:channelIds />
					</ChannelCard>
				{/each}
			</div>
		{:else}
			<span class="my-4 block text-gray-400"
				>Search for a channel above to add it to the list.</span>
		{/if}
	</div>
</div>
