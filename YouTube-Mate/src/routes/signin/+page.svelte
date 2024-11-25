<script lang="ts">
	/* eslint-disable import/no-unresolved */
	import { SignIn } from '@auth/sveltekit/components';
	//import { LL } from '../../lib/i18n/i18n-svelte.ts';
	import { IconBrandYoutubeFilled } from '@tabler/icons-svelte';
</script>

<div class="hero-container flex flex-col items-center justify-center p-4">
	<SignIn
		className="btn btn-lg variant-filled"
		provider="google"
		signInPage="signin"
		options={{
			redirectTo: `/onboarding`,
		}}
	>
		<span slot="submitButton">Sign in with Google</span>
		<IconBrandYoutubeFilled class="ml-1" size={36} stroke={1.5} />
	</SignIn>
</div>
