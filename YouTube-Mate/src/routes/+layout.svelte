<script lang="ts">
	import '../app.postcss';
	import { AppBar, AppShell, LightSwitch } from '@skeletonlabs/skeleton';
</script>

<div class="grid grid-rows-[auto_1fr_auto]">
  <!-- Header -->
  <AppBar class="sticky top-0 z-10">
		<svelte:fragment slot="lead"><a href="/">YouTube Mate</a></svelte:fragment>
		<svelte:fragment slot="trail">
			<LightSwitch />
		</svelte:fragment>
  </AppBar>
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
	<main class="pt-2 max-w-sm w-80 mx-auto">
		<slot />
	</main>
    <!-- Sidebar (Right) -->
    <!-- NOTE: hidden in smaller screen sizes -->
    <!-- <aside class="sticky top-0 col-span-1 hidden h-screen bg-yellow-500 p-4 xl:block">(sidebar)</aside> -->
  </div>
  <!-- Footer -->
  <footer class="bg-blue-500 p-4">(footer)</footer>
</div>
