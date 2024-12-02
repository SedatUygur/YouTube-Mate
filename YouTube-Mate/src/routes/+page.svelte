<script lang="ts">
	/* eslint-disable import/no-unresolved */

	//import { SignIn } from '@auth/sveltekit/components';
	import { signIn } from '@auth/sveltekit/client';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import { LL } from '../lib/i18n/i18n-svelte.ts';
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import ListCard from '$/lib/components/ListCard.svelte';

	export let data: PageData;
	let loading = false;
</script>

<div class="hero-container flex flex-col items-center justify-center p-4">
	<h1>YouTubeMate</h1>
	{#if $page.data.session}
		{#if !data.lists.length}
			<p class="my-4 text-center">
				{$LL.pages.root.loggedIn.messages.createList()}
			</p>
		{/if}
		<a
			href="/protected/create"
			class="variant-filled-secondary btn max-w-xs"
			data-sveltekit-preload-data="hover">{$LL.buttons.create()}</a>
		<div class="video-grid mt-4">
			{#each data.lists as list}
				<ListCard {list} />
			{/each}
		</div>
	{:else}
		<h2 id="methods" data-text="Sign-in methods" tabindex="-1" role="presentation">
			<span class="devsite-heading" role="heading" aria-level="2">Sign-in methods</span>
		</h2>
		<p>
			The Sign-in template supports 3 sign-in methods: Provider sign-in, username and password, QR
			code.
		</p>
		<figure class="attempt-left">
			<figcaption>
				<strong>Provider sign-in method</strong>: This method lets users sign in using a provider,
				with no input required. In this example (for Android Auto), Google is the provider for the
				primary sign-in option, with PIN code and email sign-in offered as secondary options.
			</figcaption>
		</figure>
		<figure class="attempt-right">
			<figcaption>
				<strong>Username/password method</strong>: This method lets users enter authentication
				information in a single, mandatory form field. This field can be used to enter a username or
				password. In this example (for Android Auto), the other methods are offered as secondary
				options.
			</figcaption>
		</figure>
		<div class="inline-block">
			<figure class="attempt-left">
				<figcaption>
					<strong>QR code method</strong>: This method displays a mandatory PIN code (up to 12
					characters in length) provided by the app and instructions for where the user should enter
					it. The code can be refreshed as needed if it times out. (Android Auto example)
				</figcaption>
			</figure>

			<!--<figure class="attempt-right">
				<figcaption>
					<strong>PIN method</strong>: This method displays a mandatory PIN code (up to 12
					characters in length) provided by the app and instructions for where the user should enter
					it. The code can be refreshed as needed if it times out. (Android Auto example)
				</figcaption>
			</figure>-->
		</div>
		<p class="my-4 text-center">{$LL.pages.root.messages.tagline()}</p>
		<!-- <SignIn
			className="btn btn-lg variant-filled"
			provider="google"
			signInPage="signin"
			options={{
				redirectTo: $page.data.redirectTo
					? `/${decodeURIComponent($page.data.redirectTo).slice(1)}`
					: `/`,
			}}
		>
			<span slot="submitButton">{$LL.signUp()}</span>
			<IconBrandYoutubeFilled class="ml-1" size={36} stroke={1.5} /> 
		</SignIn>-->
		<button
			on:click|once={function loginClick() {
				loading = true;
				void signIn('google');
			}}
			disabled={loading}
			class="variant-filled-primary btn cursor-pointer">
			{#if loading}
				{$LL.messages.pleaseWait()} <ProgressRadial class="ml-2 h-6 w-6" stroke={100} />
			{:else}
				{$LL.buttons.loginYouTube()}
			{/if}
		</button>
	{/if}
</div>
