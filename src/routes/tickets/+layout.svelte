<script lang="ts">
	import Sidebar from '$lib/components/sidebar.svelte';
	import SidebarItem from '$lib/components/sidebar-item.svelte';
	import { Home } from 'lucide-svelte';
	export let data;
	let {session} = data;
</script>

<div class="flex">
	<Sidebar name={session.user.email}>
		<SidebarItem to="/" title="home" icon={Home} />
	</Sidebar>
	<div class="content w-full">
		<slot />
	</div>
</div>
