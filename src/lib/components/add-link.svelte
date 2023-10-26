<script lang="ts">
    import type { Editor } from '@tiptap/core';
    import { createPopover, melt } from '@melt-ui/svelte';
    import { Check, Link, Settings2, X } from 'lucide-svelte';
    import { fade } from 'svelte/transition';
    import type { KeyboardEventHandler } from 'svelte/elements';

    export let editor: any;

    let url: string | null = null;

    const {
        elements: { trigger, content, arrow, close },
        states: { open },
    } = createPopover({
        forceVisible: true,
    });

    const createLink = () => {
        console.log(url);
        if (url === null) {
            return;
        }

        editor.commands.toggleLink({ href: url });
    };

    const handleKeyDown = (event: any) => {
        if (url !== null && event.key === 'enter') {
            createLink();
        }
    };
</script>

<button class="toolbar-button" use:melt={$trigger}>
    <span class="sr-only">Add Link</span>
    <Link />
</button>

{#if $open}
    <div use:melt={$content} transition:fade={{ duration: 100 }} class="content">
        <div use:melt={$arrow} />
        <div class="flex flex-col gap-2.5">
            <div class="join">
                <input
                    bind:value={url}
                    on:keydown={handleKeyDown}
                    class="input input-bordered join-item"
                />
                <div class="indicator">
                    <button
                        class="btn join-item disabled:opacity-5"
                        disabled={url === null}
                        on:click={createLink}><Check /></button
                    >
                </div>
            </div>
        </div>
    </div>
{/if}

<style lang="scss">
    .input {
        @apply flex h-8 w-full rounded-md border border-magnum-800 bg-transparent px-2.5 text-sm;
        @apply ring-offset-magnum-300 focus-visible:ring;
        @apply focus-visible:ring-magnum-400 focus-visible:ring-offset-1;
        @apply flex-1 items-center justify-center;
        @apply px-2.5 text-sm leading-none text-magnum-700;
    }

    .trigger {
        @apply inline-flex h-9 w-9 items-center justify-center rounded-full bg-white p-0;
        @apply text-sm font-medium text-magnum-900 transition-colors hover:bg-white/90;
        @apply focus-visible:ring focus-visible:ring-magnum-400 focus-visible:ring-offset-2;
    }

    .close {
        @apply absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full;
        @apply text-magnum-900 transition-colors hover:bg-magnum-500/10;
        @apply focus-visible:ring focus-visible:ring-magnum-400 focus-visible:ring-offset-2;
        @apply bg-white p-0 text-sm font-medium;
    }

    .content {
        @apply z-10 w-60 rounded-[4px] bg-white p-5 shadow-sm;
    }
</style>
