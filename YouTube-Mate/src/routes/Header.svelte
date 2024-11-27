<script lang="ts">
	/* eslint-disable import/no-unresolved */
	/* eslint-disable import-x/no-unresolved */
	/* eslint-disable @typescript-eslint/no-unsafe-call */
	/* eslint-disable @typescript-eslint/no-unsafe-member-access */
	import { AppBar, LightSwitch } from '@skeletonlabs/skeleton';
	import { signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	const userSignout = () => signOut();
	const goSettings = () => goto('/settings');
	const goUserProfile = () => goto('/me');

	let isDropdownOpen = true; // default state (dropdown close)

	const handleDropdownClick = () => {
		isDropdownOpen = !isDropdownOpen; // togle state on click
	};

	const handleDropdownFocusLoss = ({ relatedTarget, currentTarget }) => {
		// use "focusout" event to ensure that we can close the dropdown when clicking outside or when we leave the dropdown with the "Tab" button
		if (relatedTarget instanceof HTMLElement && currentTarget.contains(relatedTarget)) return; // check if the new focus target doesn't present in the dropdown tree (exclude ul\li padding area because relatedTarget, in this case, will be null)
		isDropdownOpen = false;
	};
</script>

<AppBar
	gridColumns="grid-cols-3"
	slotLead="place-self-start"
	slotTrail="place-content-end"
	class="top-0 z-10"
>
	<svelte:fragment slot="lead"><a href="/">YouTube Mate</a></svelte:fragment>
	<svelte:fragment slot="trail">
		<div class="dropdown" on:focusout={handleDropdownFocusLoss}>
			<button class="variant-glass-primary btn-icon w-7 p-0" on:click={handleDropdownClick}>
				{#if isDropdownOpen}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						class="inline-block h-6 w-6 stroke-current"
					>
						<title>Close Dropdown</title>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				{:else}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						class="inline-block h-6 w-6 stroke-current"
					>
						<title>Open Dropdown</title>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
				{/if}
			</button>
			<nav class="list-nav">
				<p>Menu</p>
				<ul
					class="dropdown-content menu bg-base-100 rounded-box w-52 p-2 shadow"
					style:visibility={isDropdownOpen ? 'visible' : 'hidden'}
				>
					{#if $page.data.session?.user}
						<div class="flex items-center gap-2">
							<img
								src={$page.data.session.user.image}
								class="avatar h-7 w-7 rounded-full"
								referrerpolicy="no-referrer"
								alt="User Avatar"
							/>
							<p class="hidden font-bold md:block">
								{$page.data.session.user.name}
							</p>
						</div>
					{/if}
					<li>
						<a class="variant-ringed-tertiary btn" href="/">
							<span class="badge bg-primary-500"></span>
							<span class="flex-auto">Home</span>
						</a>
					</li>
					<li>
						<a class="variant-ringed-tertiary btn" href="/">
							<span class="badge bg-primary-500"></span>
							<span class="flex-auto">About</span>
						</a>
					</li>
					<li>
						<a class="variant-ringed-tertiary btn" href="/">
							<span class="badge bg-primary-500"></span>
							<span class="flex-auto">Blog</span>
						</a>
					</li>
					<!-- <hr class="opacity-20" /> -->
					{#if $page.data.session?.user}
						<li>
							<a on:click={goUserProfile} class="variant-ringed-tertiary btn" href="/me">
								<span class="badge bg-primary-500"></span>
								<span class="flex-auto">Profile</span>
							</a>
						</li>
						<li>
							<a on:click={goSettings} class="variant-ringed-tertiary btn" href="/settings">
								<span class="badge bg-primary-500"></span>
								<span class="flex-auto">Settings</span>
							</a>
						</li>
						<li>
							<a on:click={userSignout} class="variant-ringed-tertiary btn" href="/">
								<span class="badge bg-primary-500"></span>
								<span class="flex-auto">Logout</span>
							</a>
						</li>
					{/if}
					<li><LightSwitch height="h-6" rounded="rounded-full" /></li>
				</ul>
			</nav>
		</div>
	</svelte:fragment>
</AppBar>
