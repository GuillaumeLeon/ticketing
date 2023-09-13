    <script lang="ts">
	import type { SvelteComponent } from "svelte";

        export let icon: any;
        export let to: string = "#"
        export let title: SvelteComponent|string;
    </script>
    <li>
      <a href={to} class="flex items-center rounded-lg px-3 py-2 text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700">
        <svelte:component this={icon} />
        <span class="ml-3 flex-1 whitespace-nowrap">{title}</span>
      </a>
    </li>