<script lang="ts">
	// @ts-nocheck
	/* eslint-disable @typescript-eslint/restrict-template-expressions */
	/* eslint-disable @typescript-eslint/no-unsafe-assignment */
	/* eslint-disable @typescript-eslint/no-unnecessary-condition */
	import ogSquareImageSrc from '../assets/home-open-graph-square.jpg';
	import ogImageSrc from '../assets/home-open-graph.jpg';
	import twitterImageSrc from '../assets/home-twitter.jpg';
	import featuredImageSrc from '../assets/home.jpg';
	import website from '../config/website';
	import OpenGraph from './OpenGraph.svelte';
	import SchemaOrg from './SchemaOrg.svelte';
	import Twitter from './Twitter.svelte';

	const {
		author,
		entity,
		facebookAuthorPage,
		facebookPage,
		ogLanguage,
		siteLanguage,
		siteShortTitle,
		siteTitle,
		siteUrl,
		githubPage,
		linkedinProfile,
		telegramUsername,
		twitterUsername,
	} = website;

	export let article = false;
	export let breadcrumbs = [];
	export let entityMeta = null;
	export let lastUpdated;
	export let datePublished;
	export let metadescription;
	export let slug;
	export let timeToRead = 0;
	export let title;

	const defaultAlt =
		'picture of a person with long, curly hair, wearing a red had taking a picture with an analogue camera';

	export let featuredImage = {
		url: featuredImageSrc,
		alt: defaultAlt,
		width: 672,
		height: 448,
		caption: 'Home page',
	};
	export let ogImage = {
		url: ogImageSrc,
		alt: defaultAlt,
	};
	export let ogSquareImage = {
		url: ogSquareImageSrc,
		alt: defaultAlt,
	};
	export let twitterImage = {
		url: twitterImageSrc,
		alt: defaultAlt,
	};
	const url = `${siteUrl}/${slug}`;
	const pageTitle = `${siteTitle} ${title}`;
	const openGraphProps = {
		article,
		datePublished,
		lastUpdated,
		image: ogImage,
		squareImage: ogSquareImage,
		metadescription,
		ogLanguage,
		pageTitle,
		siteTitle,
		url,
		...(article ? { datePublished, lastUpdated, facebookPage, facebookAuthorPage } : {}),
	};
	const schemaOrgProps = {
		article,
		author,
		breadcrumbs,
		datePublished,
		entity,
		lastUpdated,
		entityMeta,
		featuredImage,
		metadescription,
		siteLanguage,
		siteTitle,
		siteTitleAlt: siteShortTitle,
		siteUrl,
		title: pageTitle,
		url,
		facebookPage,
		githubPage,
		linkedinProfile,
		telegramUsername,
		twitterUsername,
	};
	const twitterProps = {
		article,
		author,
		twitterUsername,
		image: twitterImage,
		timeToRead,
	};
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={metadescription} />
	<meta
		name="robots"
		content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
	/>
</svelte:head>
<Twitter {...twitterProps} />
<OpenGraph {...openGraphProps} />
<SchemaOrg {...schemaOrgProps} />
