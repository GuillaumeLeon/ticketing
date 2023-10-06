<script lang="ts">
    import clsx from 'clsx';
    import type { Message } from '../../app';
    import { UserCircle } from 'lucide-svelte';

    export let message: Message;

    const container = clsx(
        'ticket-message flex items-end w-full px-8 pt-[4px] pb-4 hover:bg-slate-500',
    );

    const contentClass = clsx('rounded-lg inline-block w-full');
</script>

<div class={container}>
    <div class="profile-picture">
        <img
            class="w-10 h-10 rounded"
            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
            alt="Default avatar"
        />
    </div>
    <div class="content-wrapper px-4 w-full">
        <div class="message-header flex justify-between">
            <div
                class={clsx('author flex items-center gap-2', {
                    'text-primary': message.direction === 'outbound',
                    'text-secondary': message.direction === 'inbound',
                })}
            >
                {#if message.direction === 'outbound'}
                    <UserCircle size={16} />
                {/if}
                todo
            </div>

            <div class="created_at">{new Date(message.created_at).toDateString()}</div>
        </div>
        <span class={contentClass}>{@html message.content_html ?? message.content_text}</span>
    </div>
</div>
