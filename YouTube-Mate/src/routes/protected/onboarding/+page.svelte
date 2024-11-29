<script lang="ts">
	/* eslint-disable import/no-unresolved */
	/* eslint-disable import-x/no-unresolved */
	import { LL } from '$lib/i18n/i18n-svelte';
	import { page } from '$app/stores';
</script>

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
		<button class="variant-filled-success btn">Lets Go!</button>
	</div>
</form>
