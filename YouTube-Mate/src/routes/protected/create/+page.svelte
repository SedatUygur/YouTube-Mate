<script lang="ts">
	/* eslint-disable import/no-unresolved */
	/* eslint-disable import-x/no-unresolved */
	/* eslint-disable @typescript-eslint/no-floating-promises */
	/* eslint-disable @typescript-eslint/no-unsafe-call */
	/* eslint-disable @typescript-eslint/no-unsafe-member-access */
	/* eslint-disable @typescript-eslint/restrict-template-expressions */
	//import Seo from '$/routes/SEO.svelte';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import SEO from '$lib/SEO/components/index.svelte';
	import { LL } from '$lib/i18n/i18n-svelte';
	import type { ActionData, PageData } from '../../$types';
	export let data: PageData;
	export let form: ActionData;
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
<form class="mt-4 flex flex-col gap-4" method="post">
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
	<div class="flex justify-end">
		<button class="variant-filled-secondary btn">{$LL.buttons.create()}</button>
	</div>
</form>
