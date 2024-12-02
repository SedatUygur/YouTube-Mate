<script lang="ts">
	/* eslint-disable import/no-unresolved */
	/* eslint-disable @typescript-eslint/no-non-null-assertion */
	import '../app.postcss';
	import Header from './Header.svelte';
	import { setLocale } from '../lib/i18n/i18n-svelte.ts';
	import type { LayoutData } from './$types.js';
	/*import ogSquareImageSrc from '$lib/SEO/assets/home-open-graph-square.jpg';
	import ogImageSrc from '$lib/SEO/assets/home-open-graph.jpg';
	import twitterImageSrc from '$lib/SEO/assets/home-twitter.jpg';
	import featuredImageSrc from '$lib/SEO/assets/home.jpg';*/
	import { afterNavigate } from '$app/navigation';
	import { setupViewTransition } from 'sveltekit-view-transition';
	import SEO from '$lib/SEO/components/index.svelte';
	import website from '$lib/SEO/config/website';

	export let data: LayoutData;

	setLocale(data.locale);
	setupViewTransition();

	afterNavigate(() => {
		// Fix for firefox
		// Issue: https://github.com/sveltejs/kit/issues/2733
		document.querySelector('#page')!.scrollTo({
			behavior: 'smooth',
			left: 0,
			top: 0,
		});
	});

	const { author, siteUrl } = website;
	let title = 'Home';
	const breadcrumbs = [
		{
			name: 'Home',
			slug: '',
		},
	];
	let metadescription = 'YouTube Mate is an app allow users to create and share YouTube watchlists';
	/*const featuredImageAlt = 'picture of a person with long, curly hair, wearing a red had taking a picture with an analogue camera';
	const featuredImage = {
		url: featuredImageSrc,
		alt: featuredImageAlt,
		width: 672,
		height: 448,
		caption: 'Home page',
	};
	const ogImage = {
		url: ogImageSrc,
		alt: featuredImageAlt,
	};
	const ogSquareImage = {
		url: ogSquareImageSrc,
		alt: featuredImageAlt,
	};

	const twitterImage = {
		url: twitterImageSrc,
		alt: featuredImageAlt,
	};*/
	const entityMeta = {
		url: `${siteUrl}/`,
		faviconWidth: 512,
		faviconHeight: 512,
		caption: author,
	};
	const seoProps = {
		title,
		slug: '',
		entityMeta,
		datePublished: '2024-11-28T14:19:33.000+0100',
		lastUpdated: '2021-11-28T14:19:33.000+0100',
		breadcrumbs,
		metadescription,
		/*featuredImage,
		ogImage,
		ogSquareImage,
		twitterImage,*/
	};
</script>

<SEO {...seoProps} />

<div id="page" class="grid grid-rows-[auto_1fr_auto]">
	<Header />
	<!-- Page -->
	<div class="container mx-auto grid grid-cols-1">
		<!-- Sidebar (Left) -->
		<!-- NOTE: hidden in smaller screen sizes -->
		<!-- <aside class="sticky top-0 col-span-1 hidden h-screen bg-yellow-500 p-4 xl:block">(sidebar)</aside> -->
		<!-- Main 
    <main class="col-span-1 space-y-4 bg-green-500 p-4">
      <p class="h-[512px] bg-purple-500 p-4">Paragraph 1</p>
      <p class="h-[512px] bg-purple-500 p-4">Paragraph 2</p>
      <p class="h-[512px] bg-purple-500 p-4">Paragraph 3</p>
    </main> 
	-->
		<main class="w-full px-2 pt-2 md:px-4 lg:px-8">
			<slot />
		</main>
		<!-- Sidebar (Right) -->
		<!-- NOTE: hidden in smaller screen sizes -->
		<!-- <aside class="sticky top-0 col-span-1 hidden h-screen bg-yellow-500 p-4 xl:block">(sidebar)</aside> -->
	</div>
	<!-- Footer -->
	<footer class="bg-blue-500 p-4">(footer)</footer>
</div>
