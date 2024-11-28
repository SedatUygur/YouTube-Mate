<script lang="ts">
	/* eslint-disable import/no-unresolved */
	/* eslint-disable import-x/no-unresolved */
	/* eslint-disable @typescript-eslint/no-unsafe-member-access */
	//import { SignIn } from '@auth/sveltekit/components';
	import { signIn } from '@auth/sveltekit/client';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import { LL } from '../lib/i18n/i18n-svelte.ts';
	import { page } from '$app/stores';

	let loading = false;
</script>

<div class="hero-container flex flex-col items-center justify-center p-4">
	{#if $page.data.session}
		<h1>Welcome to YoutubeMate</h1>
		<p class="my-4 text-center">{$LL.tagline()}</p>
		<h2>Why do we use it?</h2>
		<p class="my-4">
			It is a long established fact that a reader will be distracted by the readable content of a
			page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less
			normal distribution of letters, as opposed to using 'Content here, content here', making it
			look like readable English. Many desktop publishing packages and web page editors now use
			Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web
			sites still in their infancy. Various versions have evolved over the years, sometimes by
			accident, sometimes on purpose (injected humour and the like). Lorem ipsum dolor sit amet,
			consectetur adipiscing elit. Phasellus pharetra nisl ipsum, ac vulputate lacus rutrum a. Sed
			quis erat quam. Vestibulum ullamcorper molestie nulla, pharetra fringilla diam accumsan ac.
			Praesent dignissim dapibus aliquam. Nulla dapibus velit leo, at convallis odio molestie
			pretium. Nunc maximus vel lectus eu interdum. Nunc quis nisl lacus.
		</p>
	{:else}
		<h2 id="methods" data-text="Sign-in methods" tabindex="-1" role="presentation">
			<span class="devsite-heading" role="heading" aria-level="2">Sign-in methods</span><button
				type="button"
				class="devsite-heading-link button-flat material-icons"
				aria-label="Copy link to this section: Sign-in methods"
				data-title="Copy link to this section: Sign-in methods"
				data-id="methods"
			></button>
		</h2>
		<p>
			The Sign-in template supports 4 sign-in methods: Provider sign-in, username and password, PIN
			code, and QR code.
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

			<figure class="attempt-right">
				<figcaption>
					<strong>PIN method</strong>: This method displays a mandatory PIN code (up to 12
					characters in length) provided by the app and instructions for where the user should enter
					it. The code can be refreshed as needed if it times out. (Android Auto example)
				</figcaption>
			</figure>
		</div>
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
				this.disabled = true;
				loading = true;
				void signIn('google');
			}}
			class="variant-filled-primary btn cursor-pointer"
		>
			{#if loading}
				{$LL.pleaseWait()} <ProgressRadial class="ml-2 h-6 w-6" stroke={100} />
			{:else}
				{$LL.loginYouTube()}
			{/if}
		</button>
	{/if}
</div>
