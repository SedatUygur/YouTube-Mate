<script lang="ts">
	/* eslint-disable import/no-unresolved */

	import { LL } from '$lib/i18n/i18n-svelte';
	import { page } from '$app/stores';
	import SEO from '$lib/SEO/components/index.svelte';

	let title = 'Onboarding | YouTubeMate';
	let metadescription = 'Onboarding page for YouTubeMate';
	const breadcrumbs = [
		{
			name: 'Home',
			slug: '',
		},
		{
			name: 'Protected Onboarding',
			slug: 'protected-onboarding',
		},
		{
			name: 'Create List',
			slug: 'create-list',
		},
	];
	const seoProps = {
		breadcrumbs,
		title,
		metadescription,
		slug: 'protected-onboarding',
		datePublished: '2024-11-29T14:19:33.000+0100',
		lastUpdated: '2024-11-29T14:19:33.000+0100',
	};
</script>

<SEO {...seoProps} />
<div class="mx-auto max-w-lg">
	<p>{$LL.pages.onboarding.messages.main()}</p>
	<form class="pt-4" method="POST">
		<label for="name" class="label">
			<span>{$LL.pages.onboarding.labels.username()}</span>
			<input
				class="disabled input"
				type="text"
				id="name"
				name="name"
				value={$page.data.session?.user.name}
				disabled
				minlength="4"
				required />
		</label>
		<p class="pt-4">{$LL.pages.onboarding.messages.final()}</p>
		<div class="my-4 flex justify-end">
			<button class="variant-filled-success btn">{$LL.pages.onboarding.buttons.letsGo()}</button>
		</div>
	</form>
</div>
