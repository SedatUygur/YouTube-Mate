<script lang="ts">
	/* eslint-disable import/no-unresolved */
	/* eslint-disable import-x/no-unresolved */
	/* eslint-disable @typescript-eslint/no-floating-promises */
	/* eslint-disable @typescript-eslint/no-unsafe-member-access */
	/* eslint-disable @typescript-eslint/restrict-template-expressions */
	import SEO from '$lib/SEO/components/index.svelte';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import ListForm from '../../../../lib/components/ListForm.svelte';
	export let data;
	export let form;
	$: if (form?.success) {
		if (browser) {
			const url = `/list/${form.listId}`;
			goto(url);
		}
	}

	let title = 'Edit a List';
	let metadescription = 'Edit a List with new component';
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
		slug: 'edit',
		datePublished: '2024-11-29T14:19:33.000+0100',
		lastUpdated: '2024-11-29T14:19:33.000+0100',
	};
</script>

<SEO {...seoProps} />
<ListForm
	action={`/protected/edit/${data.list.id}?/update`}
	list={data.list}
	locale={data.locale}
	results={form?.results}
	error={form?.error} />
