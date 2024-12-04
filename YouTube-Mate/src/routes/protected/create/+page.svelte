<script lang="ts">
	/* eslint-disable import/no-unresolved */
	/* eslint-disable import-x/no-duplicates */
	/* eslint-disable @typescript-eslint/no-floating-promises */
	/* eslint-disable @typescript-eslint/restrict-template-expressions */
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import SEO from '$lib/SEO/components/index.svelte';
	import type { ActionData, PageData } from '../../$types';
	import ListForm from '$lib/components/ListForm.svelte';

	export let data: PageData;
	export let form: ActionData;

	$: if (form?.success) {
		const url = `/list/${form.listId}`;
		if (browser) {
			goto(url);
		}
	}
	let title = 'Create list';
	let metadescription = 'Create list with new component';
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
<ListForm
	formData={data.form}
	list={undefined}
	action={`/protected/create?/create`}
	locale={data.locale}
	error={form?.error}
	results={form?.results} />
