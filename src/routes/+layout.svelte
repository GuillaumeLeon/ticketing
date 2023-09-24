<script lang="ts">
	import { AppBar, AppRail, AppRailAnchor, AppRailTile, AppShell } from '@skeletonlabs/skeleton';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { Ticket } from 'lucide-svelte';
	import '../app.css';

	export let data;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((_: any, _session: any) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => subscription.unsubscribe();
	});
	let currentTile: number = 0;
</script>

{#if session}
	<AppShell>
		<svelte:fragment slot="header"><AppBar>Header</AppBar></svelte:fragment>
		<svelte:fragment slot="sidebarLeft"
			><AppRail>
				<!-- --- -->
				<AppRailTile bind:group={currentTile} name="tile-1" value={0} title="tile-1">
					<svelte:fragment slot="lead"><Ticket /></svelte:fragment>
					<span>Tile 1</span>
				</AppRailTile>
				<AppRailTile bind:group={currentTile} name="tile-2" value={1} title="tile-2">
					<svelte:fragment slot="lead">(icon)</svelte:fragment>
					<span>Tile 2</span>
				</AppRailTile>
				<AppRailTile bind:group={currentTile} name="tile-3" value={2} title="tile-3">
					<svelte:fragment slot="lead">(icon)</svelte:fragment>
					<span>Tile 3</span>
				</AppRailTile>
				<!-- --- -->
				<svelte:fragment slot="trail">
					<AppRailAnchor href="/" target="_blank" title="Account">(icon)</AppRailAnchor>
				</svelte:fragment>
			</AppRail></svelte:fragment
		>
		<slot />
	</AppShell>
{:else}
	<slot />
{/if}

<style>
	:global(body) {
		@apply h-full overflow-hidden;
	}
	:global(html) {
		@apply h-full overflow-hidden;
	}
</style>
