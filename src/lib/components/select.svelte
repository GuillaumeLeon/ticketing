<script lang="ts">
    import { createSelect, melt } from '@melt-ui/svelte';
    import { Check, ChevronDown } from 'lucide-svelte';
    import { fade } from 'svelte/transition';

    type Option = {
        label: string;
        value: string | number | boolean;
    };

    export let options: Option[] = [];
    export let onChange: ({ curr, next }: { curr: any; next: any }) => void;

    const {
        elements: { trigger, menu, option, group, groupLabel, label },
        states: { selectedLabel, open },
        helpers: { isSelected },
    } = createSelect({
        forceVisible: true,
        positioning: {
            placement: 'bottom',
            fitViewport: true,
            sameWidth: true,
        },
        onSelectedChange: onChange,
    });
</script>

<div class="flex flex-col gap-1">
    <button
        class="flex h-10 items-center justify-between rounded-lg bg-white px-3 py-2
    text-primary-700 shadow transition-opacity hover:opacity-90"
        use:melt={$trigger}
        aria-label="Food"
    >
        <ChevronDown class="square-5" />
    </button>
    {#if $open}
        <div
            class="z-10 flex max-h-[300px] flex-col min-w-[250px]
      overflow-y-auto rounded-lg bg-white p-1
      shadow focus:!ring-0"
            use:melt={$menu}
            transition:fade={{ duration: 150 }}
        >
            {#each options as item}
                <div
                    class="relative cursor-pointer rounded-lg py-1 pl-8 pr-4 text-neutral-800
                hover:bg-primary-100 focus:z-10
                focus:text-primary-700
                data-[highlighted]:bg-primary-200 data-[highlighted]:text-primary-900
                data-[disabled]:opacity-50"
                    use:melt={$option({ value: item.value, label: item.label })}
                >
                    <div class="check {$isSelected(item) ? 'block' : 'hidden'}">
                        <Check class="square-4" />
                    </div>

                    {item.label}
                </div>
            {/each}
        </div>
    {/if}
</div>
