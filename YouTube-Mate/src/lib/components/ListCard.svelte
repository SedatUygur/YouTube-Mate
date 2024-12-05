<script lang="ts">
	/* eslint-disable import/no-unresolved */
	import Avatar from './Avatar.svelte';
	import { setupViewTransition } from 'sveltekit-view-transition';
	import { Eye, Pencil } from 'lucide-svelte';
	import { LL } from '$lib/i18n/i18n-svelte';
	import { userStore } from '$/lib/stores/UserStore';
	import type { ListWithItems } from '../config/prisma.list.ts';

	export let list: ListWithItems;

	const truncatedItems =
		list.items?.length === 4 ? list.items.slice() : (list.items?.slice(0, 3) ?? []);
	const hiddenItems = (list.items?.length ?? 0) - truncatedItems.length;
	const { transition } = setupViewTransition();
</script>

<div class="card flex flex-col justify-between p-4">
	<div>
		<a
			use:transition={{
				name: 'title',
				shouldApply({ navigation }) {
					return navigation.to?.params?.id === list.id;
				},
				applyImmediately({ navigation, isInViewport }) {
					return isInViewport && navigation.from?.params?.id === list.id;
				},
			}}
			class="text-xl hover:text-primary-500 hover:underline"
			href="/{$userStore.user?.username}/{list.slug}">{list.title}</a>
		{#if list.items}
			<div class="mt-4">
				{#each truncatedItems as item}
					<Avatar
						avatarUrl={item.meta?.youtubeMeta?.avatarUrl}
						altText={item.meta?.youtubeMeta?.name}
						channelId={item.meta?.youtubeMeta?.originId}
						listId={list.id} />
				{/each}
				{#if hiddenItems > 0}
					<span
						class="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary-500 text-white"
						>+{hiddenItems}</span>
				{/if}
			</div>
		{/if}
		<p class="mt-4">{list.description}</p>
	</div>
	<div class="mt-4 flex justify-end gap-2">
		<a
			type="button"
			title={$LL.buttons.view()}
			class="variant-filled-primary btn-icon btn-icon-sm"
			href="/{$userStore.user?.username}/{list.slug}">
			<Eye class="h-4 w-4" />
		</a>
		<a
			type="button"
			title={$LL.buttons.edit()}
			class="variant-filled-secondary btn-icon btn-icon-sm"
			href="/protected/list/{list.id}/edit">
			<Pencil class="h-4 w-4" />
		</a>
	</div>
</div>
