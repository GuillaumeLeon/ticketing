<script lang="ts">
    import Editor from '$lib/components/editor.svelte';
    import Message from '$lib/components/message.svelte';
    import { onMount } from 'svelte';
    import { messages } from './messages';
    import { Check, Clock, GripVertical } from 'lucide-svelte';
    import type { Message as IMessage } from '../../../app';
    import type { SupabaseClient } from '@supabase/supabase-js';
    import type { Database } from '../../../database.types';

    export let data;
    const supabase: SupabaseClient<Database> = data.supabase;

    onMount(() => {
        messages.set(data.ticket.messages);
        const sub = supabase
            .channel('any')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'messagges',
                    filter: `ticket_id=eq.${data.ticket.id}`,
                },
                (payload: IMessage) => {
                    messages.update((previousMessages) => {
                        return {
                            ...previousMessages,
                            payload,
                        };
                    });
                },
            )
            .subscribe();

        return () => {
            sub.unsubscribe();
        };
    });
</script>

<div class="flex flex-col h-full max-h-full overflow-auto gap-1">
    <div class="header flex justify-between items-center">
        <div class="subject w-full">
            {data.ticket.subject}
        </div>
        <div class="flex">
            <button class="btn btn-ghost btn-sm px-1">
                <Clock size="20" />
            </button>
            <button class="btn btn-ghost btn-sm px-1">
                <GripVertical size="20" />
            </button>
        </div>
    </div>
    <div class="flex justify-between items-center">
        <div class="flex items-center gap-2">
            <button class="btn btn-neutral btn-sm">
                <Check /> Close
            </button>
            <button class="btn btn-sm btn-ghost">+ add tags</button>
        </div>
        <div>Assigned</div>
    </div>
    <div
        id="messages"
        class="flex flex-col p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
    >
        {#each $messages as message}
            <Message {message} />
        {/each}
    </div>
    <div class="px-4 pt-4 mb-2 sm:mb-0">
        <div class="relative flex">
            <Editor
                to={(
                    $messages.findLast((message) => message.direction === 'inbound') ??
                    $messages[$messages.length - 1]
                ).from}
            />
        </div>
    </div>
</div>

<style>
    :global(.ticket-message) {
        min-height: 4rem;
    }
</style>
