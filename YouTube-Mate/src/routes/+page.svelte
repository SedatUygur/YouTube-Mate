<script lang="ts">
	import { SignIn } from '@auth/sveltekit/components';
	import { LL } from '../lib/i18n/i18n-svelte.ts';
	//import { IconBrandYoutubeFilled } from '@tabler/icons-svelte';
</script>

<div class="hero-container flex flex-col items-center justify-center p-4">
	<h2>What is Lorem Ipsum?</h2>
	<p class="my-4 text-center">{$LL.tagline()}</p>
	<h2>Why do we use it?</h2>
	<p class="my-4">
		It is a long established fact that a reader will be distracted by the readable content of a
		page when looking at its layout. The point of using Lorem Ipsum is that it has a
		more-or-less normal distribution of letters, as opposed to using 'Content here, content
		here', making it look like readable English. Many desktop publishing packages and web page
		editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will
		uncover many web sites still in their infancy. Various versions have evolved over the years,
		sometimes by accident, sometimes on purpose (injected humour and the like).
	</p>
	<SignIn provider="google" signInPage="signin" />
	<!--<a href="/onboarding" class="variant-filled-primary btn btn-base cursor-pointer">
		{$LL.signUp()}
		<IconBrandYoutubeFilled class="ml-1" size={36} stroke={1.5} />
	</a>-->
</div>
