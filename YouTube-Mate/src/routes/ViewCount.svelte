<script lang="ts">
	/* eslint-disable import/no-unresolved */
	import { LL } from '$lib/i18n/i18n-svelte';
	import { formatNumberCompact } from '$lib/formatters';
	export let locale: string;
	export let viewCount: number;
</script>

<span class="font-bold">{$LL.labels.views(formatNumberCompact(viewCount, locale))}</span>
