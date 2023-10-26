<script lang="ts">
    import { invalidate } from '$app/navigation';
    import { onMount } from 'svelte';
    import { Ticket } from 'lucide-svelte';
    import '../app.scss';

    export let data;

    let { supabase, session } = data;
    $: ({ supabase, session } = data);

    onMount(() => {
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_: any, _session: any) => {
            if (_session?.expires_at !== session?.expires_at) {
                invalidate('supabase:auth');
            }
        });

        return () => subscription.unsubscribe();
    });
</script>

{#if session}
    <div class="bg-base-200 drawer drawer-open text-base-content h-screen">
        <input id="sidebar" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content bg-base-100">
            <div class="p-6 pb-16">
                <slot />
            </div>
        </div>
        <div class="drawer-side w-80 h-full">
            <label for="sidebar" class="drawer-overlay" />
            <ul class="menu menu-sm lg:menu-md px-4 py-0 h-full w-80 border-r-neutral">
                <div
                    class="sticky top-0 z-20 hidden items-center gap-2 px-4 py-2 backdrop-blur lg:flex shadow-sm"
                >
                    <a
                        href="/"
                        aria-current="page"
                        aria-label="Homepage"
                        class="flex-0 btn btn-ghost px-2"
                        data-svelte-h="svelte-pw6yxt"
                        ><Ticket />
                        <div class="font-title inline-flex text-lg md:text-2xl">
                            <span class="">Ticketing</span>
                        </div></a
                    >
                </div>
                <!-- Sidebar content here -->
                <li><a href="/tickets">tickets</a></li>
                <li><a href="/users">users</a></li>
            </ul>
            <a href="/auth/logout" class="btn btn-primary">Logout</a>
        </div>
    </div>
{:else}
    <slot />
{/if}
