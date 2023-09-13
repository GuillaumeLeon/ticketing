<script lang="ts">
	import SidebarFooter from './sidebar-footer.svelte';
	import SidebarTitle from './sidebar-title.svelte';
    export let name: string;
</script>

<div class="h-screen w-3/12 bg-slate-900">
	<aside id="sidebar" class="h-screen transition-transform" aria-label="Sidebar">
		<div
			class="flex h-full flex-col overflow-y-auto border-r border-slate-200 bg-white px-3 py-4 dark:border-slate-700 dark:bg-slate-900"
		>
			<SidebarTitle />
			<ul class="space-y-2 text-sm font-medium">
                <slot/>
			</ul>
			<SidebarFooter {name} />
		</div>
	</aside>
</div>
