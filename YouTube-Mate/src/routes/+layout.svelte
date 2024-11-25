<script lang="ts">
	import '../app.postcss';
	import Header from './Header.svelte';
	import { setLocale } from '../lib/i18n/i18n-svelte.ts';
	import type { LayoutData } from './$types.js';
	export let data: LayoutData;
	setLocale(data.locale);
</script>

<div class="grid grid-rows-[auto_1fr_auto]">
	<Header />
	<!-- Page -->
	<div class="container mx-auto grid grid-cols-1 xl:grid-cols-[200px_minmax(0px,_1fr)_200px]">
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
		<main class="mx-auto w-80 max-w-sm pt-2">
			<slot />
		</main>
		<!-- Sidebar (Right) -->
		<!-- NOTE: hidden in smaller screen sizes -->
		<!-- <aside class="sticky top-0 col-span-1 hidden h-screen bg-yellow-500 p-4 xl:block">(sidebar)</aside> -->
	</div>
	<!-- Footer -->
	<footer class="bg-blue-500 p-4">(footer)</footer>
</div>
