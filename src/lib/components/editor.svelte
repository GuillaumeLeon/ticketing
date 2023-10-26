<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { writable } from 'svelte/store';
    import { Editor } from '@tiptap/core';
    import StarterKit from '@tiptap/starter-kit';
    import {
        Mail,
        Pen,
        Bold,
        Italic,
        Strikethrough,
        AlignLeft,
        AlignCenter,
        AlignRight,
        List,
    } from 'lucide-svelte';

    import { createToolbar, melt } from '@melt-ui/svelte';
    import BubbleMenu from '@tiptap/extension-bubble-menu';
    import TextAlign from '@tiptap/extension-text-align';
    import Image from '@tiptap/extension-image';
    import Link from '@tiptap/extension-link';
    import AddLink from './add-link.svelte';
    import Select from './select.svelte';

    // @todo this throws a 'process is not defined' error in the Svelte REPL.
    // Uncomment the next line to see the REPL issue.
    export let content = '';
    export let to: string = '';
    let menu: HTMLElement;

    const contentStore = writable(content);

    let element: Element;
    let editor: Editor;

    const tmp = Link as any;
    onMount(() => {
        editor = new Editor({
            element,
            extensions: [
                StarterKit,
                BubbleMenu.configure({
                    element: menu,
                }),
                TextAlign.configure({
                    types: ['heading', 'paragraph'],
                }),
                Image.configure({
                    inline: true,
                    allowBase64: true,
                }),
                tmp.configure({
                    HTMLAttributes: {
                        class: 'editorLink',
                    },
                }),
            ],
            content,
            onTransaction: () => {
                editor = editor;
            },
        });
        editor.on('update', ({ editor }) => {
            console.log('editor html', editor.getHTML());
            contentStore.set(editor.getHTML());
        });
    });

    onDestroy(() => {
        editor?.destroy();
    });
    const {
        elements: { root, button, link, separator },
        builders: { createToolbarGroup },
    } = createToolbar();
    const {
        elements: { group: fontGroup, item: fontItem },
    } = createToolbarGroup({
        type: 'multiple',
    });
</script>

<div class="wrapper w-full focus:bg-slate-500">
    <div class="to border-b-base-100 flex">
        <Select
            onChange={(data) => console.log(data)}
            options={[
                { label: 'mail', value: 'mail' },
                { label: 'internal note', value: 'internal' },
            ]}
        />
        <span>To: <input class="input input-sm input-bordered" name="to" bind:value={to} /></span>
    </div>
    <div class="separator bg-black" use:melt={$separator} />
    <div class="element-wrapper" bind:this={element} />
</div>
<div
    bind:this={menu}
    use:melt={$root}
    class="flex min-w-max items-center gap-6 rounded-md bg-base-200 shadow-xl px-3 py-3 text-neutral-700"
>
    <div class="flex space-x-2 p-2 border-b border-gray-200 dark:border-gray-800">
        <button
            class="toolbar-button"
            use:melt={$fontItem('bold')}
            on:click={() => editor.chain().toggleBold().run()}
        >
            <span class="sr-only">Bold</span>
            <Bold class="square-5" />
        </button>
        <button
            class="toolbar-button"
            use:melt={$fontItem('italic')}
            on:click={() => editor.chain().toggleItalic().run()}
        >
            <span class="sr-only">Italic</span>

            <Italic class="square-5" />
        </button>
        <button
            class="toolbar-button"
            use:melt={$fontItem('underline')}
            on:click={() => editor.chain().toggleStrike().run()}
        >
            <span class="sr-only">Stike</span>
            <Strikethrough class="square-5" />
        </button>
        <button
            class="toolbar-button"
            use:melt={$fontItem('alignLeft')}
            on:click={() => editor.commands.setTextAlign('left')}
        >
            <span class="sr-only">Left Align</span>
            <AlignLeft class="square-5" />
        </button>
        <button
            class="toolbar-button"
            use:melt={$fontItem('alignCenter')}
            on:click={() => editor.commands.setTextAlign('center')}
        >
            <span class="sr-only">Center Align</span>

            <AlignCenter class="square-5" />
        </button>
        <button
            class="toolbar-button"
            use:melt={$fontItem('alignRight')}
            on:click={() => editor.commands.setTextAlign('right')}
        >
            <span class="sr-only">Right align</span>

            <AlignRight class="square-5" />
        </button>
        <button
            class="toolbar-button"
            use:melt={$fontItem('bulletList')}
            on:click={() => editor.chain().toggleBulletList().run()}
        >
            <span class="sr-only">Bulleted List</span>
            <List class="square-5" />
        </button>
        <AddLink {editor} />
    </div>
</div>

<style>
    .wrapper {
        border: 1px solid #ccc;
        max-height: 200px;
        display: inline-flex;
        flex-direction: column;
    }

    .element-wrapper {
        padding: 1rem;
        flex: 1 1 0%;
        resize: both;
        overflow: auto;
    }

    .element-wrapper :global(p:first-of-type) {
        margin-top: 0;
    }

    .element-wrapper :global(p:last-of-type) {
        margin-bottom: 0;
    }

    .element-wrapper > :global(.ProseMirror) {
        outline: 0;
    }

    :global(.editorLink) {
        cursor: pointer;
        @apply text-primary underline;
    }
    :global(:hover .editorLink) {
        @apply text-primary-focus;
    }

    .separator {
        width: 1px;
        align-self: stretch;
    }
</style>
