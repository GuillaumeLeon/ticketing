<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { writable } from 'svelte/store';
    import { Editor } from '@tiptap/core';
    import StarterKit from '@tiptap/starter-kit';
    import { Mail, Pen } from 'lucide-svelte';

    // @todo this throws a 'process is not defined' error in the Svelte REPL.
    // Uncomment the next line to see the REPL issue.
    // import BubbleMenu from '@tiptap/extension-bubble-menu'
    export let content = '';
    export let to: string;

    const contentStore = writable(content);

    let element: Element;
    let editor: Editor;

    onMount(() => {
        editor = new Editor({
            element,
            extensions: [StarterKit],
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
        editor.destroy();
    });
</script>

<div class="wrapper w-full focus:bg-slate-500">
    <div class="to border-b-slate-100 flex">
        <select name="type" class="select select-ghosted select-sm">
            <option selected value="mail"><Mail /> Mail</option>
            <option value="internal_note"><Pen /> Internal note</option>
        </select>
        <span>To <input class="input" name="to" /></span>
    </div>
    <div class="element-wrapper" bind:this={element} />
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
</style>
