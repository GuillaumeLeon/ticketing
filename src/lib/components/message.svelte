<script lang="ts">
    import clsx from 'clsx';
    import type { Message } from '../../app';
    import { UserCircle } from 'lucide-svelte';

    export let message: Message;

    const { firstname, lastname, created_by } = message;

    const container = clsx(
        'ticket-message flex items-end w-full px-8 pt-[4px] pb-4 hover:bg-base-200',
    );

    const contentClass = clsx('rounded-lg inline-block w-full');

    $: display = () => {
        if (firstname && lastname) {
            return `${firstname} ${lastname}`;
        }

        if (created_by) {
            return message.created_by;
        }

        if (!firstname && !lastname && !created_by) {
            return 'Ticketing tool bot';
        }

        return;
    };
</script>

<div class={container}>
    <div class="profile-picture">
        {#if firstname && lastname}
            <div
                class="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600"
            >
                <span class="font-medium text-gray-600 dark:text-gray-300"
                    >{firstname[0]}{lastname[0]}</span
                >
            </div>
        {:else}
            <div
                class="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600"
            >
                <svg
                    class="absolute w-12 h-12 text-gray-400 -left-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    ><path
                        fill-rule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clip-rule="evenodd"
                    /></svg
                >
            </div>
        {/if}
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
                {display()}
            </div>

            <div class="created_at">{new Date(message.created_at).toDateString()}</div>
        </div>
        <span class={contentClass}>{@html message.content_html ?? message.content_text}</span>
    </div>
</div>
